const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const GOOGLE_ROUTES_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";
const GOOGLE_DISTANCE_MATRIX_URL = "https://maps.googleapis.com/maps/api/distancematrix/json";

const specialDistanceKm: Record<string, number> = {
  "631001-517501": 80,
  "517501-631001": 80,
  "631001-517507": 80,
  "517507-631001": 80,
  "631001-600021": 92,
  "600021-631001": 92,
  "631001-600013": 92,
  "600013-631001": 92
};

Deno.serve(async request => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const { fromAddress = "", toAddress = "", fromPincode = "", toPincode = "" } = await request.json();
    const fromPin = normalizePincode(fromPincode);
    const toPin = normalizePincode(toPincode);
    const origin = routeAddress(fromAddress, fromPin);
    const destination = routeAddress(toAddress, toPin);
    if (!origin || !destination) {
      return json({ error: "from/to address or pincode is required" }, 400);
    }

    if (fromPin && toPin && fromPin === toPin) {
      return json({ distanceKm: 2, confidence: "high", reason: "Same pincode default" });
    }
    const specialDistance = fixedRouteDistance(fromPin, toPin);
    if (specialDistance) {
      return json({ distanceKm: specialDistance, confidence: "high", reason: "Configured route distance" });
    }

    const apiKey = googleRoutesApiKey();
    if (!apiKey) {
      return json({ error: "GOOGLE_MAPS_API_KEY must be configured in Supabase secrets" }, 500);
    }

    const route = await callGoogleDistance(apiKey, origin, destination);
    const distanceKm = Math.max(1, Math.round(Number(route.distanceMeters || 0) / 1000));
    if (!distanceKm) return json({ error: "Google Routes returned no distance" }, 500);
    return json({
      distanceKm,
      confidence: "high",
      reason: route.reason || "Google driving distance",
      source: route.source || "google",
      distanceMeters: route.distanceMeters || 0,
      duration: route.duration || ""
    });
  } catch (error) {
    return json({ error: publicGoogleRoutesError(error) }, 500);
  }
});

function fixedRouteDistance(fromPincode: unknown, toPincode: unknown) {
  const fromPin = normalizePincode(fromPincode);
  const toPin = normalizePincode(toPincode);
  return specialDistanceKm[`${fromPin}-${toPin}`] || 0;
}

function normalizePincode(value: unknown) {
  const pin = String(value || "").replace(/\D/g, "");
  return pin.length === 6 ? pin : "";
}

function routeAddress(address: unknown, pincode: string) {
  const text = String(address || "").replace(/\s+/g, " ").trim();
  const hasPin = pincode && text.includes(pincode);
  if (text && hasPin) return `${text}, India`;
  if (text && pincode) return `${text}, ${pincode}, India`;
  if (text) return `${text}, India`;
  if (pincode) return `${pincode}, India`;
  return "";
}

function googleRoutesApiKey() {
  return (Deno.env.get("GOOGLE_MAPS_API_KEY") || Deno.env.get("GOOGLE_ROUTES_API_KEY") || "").trim();
}

async function callGoogleDistance(apiKey: string, origin: string, destination: string) {
  try {
    return await callGoogleRoutes(apiKey, origin, destination);
  } catch (routesError) {
    const matrix = await callGoogleDistanceMatrix(apiKey, origin, destination).catch(matrixError => {
      throw new Error(`${errorMessage(routesError)} | ${errorMessage(matrixError)}`);
    });
    return matrix;
  }
}

async function callGoogleRoutes(apiKey: string, origin: string, destination: string) {
  const response = await fetch(GOOGLE_ROUTES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "routes.distanceMeters,routes.duration"
    },
    body: JSON.stringify({
      origin: { address: origin },
      destination: { address: destination },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_UNAWARE",
      units: "METRIC"
    })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "Google Routes request failed");
  }
  const routes = Array.isArray(data?.routes) ? data.routes : [];
  const route = routes[0] || {};
  if (!route.distanceMeters) {
    throw new Error("No route found between the selected pincodes");
  }
  return {
    ...route,
    source: "google-routes",
    reason: "Google Routes driving distance"
  };
}

async function callGoogleDistanceMatrix(apiKey: string, origin: string, destination: string) {
  const url = new URL(GOOGLE_DISTANCE_MATRIX_URL);
  url.searchParams.set("origins", origin);
  url.searchParams.set("destinations", destination);
  url.searchParams.set("mode", "driving");
  url.searchParams.set("units", "metric");
  url.searchParams.set("key", apiKey);
  const response = await fetch(url.toString());
  const data = await response.json();
  if (!response.ok || data?.status !== "OK") {
    throw new Error(data?.error_message || data?.status || "Google Distance Matrix request failed");
  }
  const element = data?.rows?.[0]?.elements?.[0] || {};
  if (element.status !== "OK" || !element.distance?.value) {
    throw new Error(element.status || "No route found between the selected pincodes");
  }
  return {
    distanceMeters: element.distance.value,
    duration: element.duration?.text || "",
    source: "google-distance-matrix",
    reason: "Google Distance Matrix driving distance"
  };
}

function publicGoogleRoutesError(error: unknown) {
  const message = errorMessage(error);
  if (/api key|API_KEY|REQUEST_DENIED|permission|disabled|not authorized/i.test(message)) {
    return "Google API key is invalid or the required Google Maps API is not enabled. Enable Routes API or Distance Matrix API and check GOOGLE_MAPS_API_KEY in Supabase.";
  }
  if (/billing|quota|rate/i.test(message)) {
    return "Google Maps billing/quota issue. Check Google Cloud billing and quota.";
  }
  if (/No route|ZERO_RESULTS|NOT_FOUND/i.test(message)) return "No Google route found. Enter distance manually.";
  return "Google Maps distance request failed. Check Supabase function logs.";
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error || "Unexpected error");
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
