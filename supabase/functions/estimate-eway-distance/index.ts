const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const GOOGLE_ROUTES_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";
const CACHE_WAIT_ATTEMPTS = 90;
const CACHE_WAIT_MS = 500;

const specialDistanceKm: Record<string, number> = {
  "517501-631001": 80,
  "517507-631001": 80,
  "600021-631001": 92,
  "600013-631001": 92
};

type AdminConfig = {
  supabaseUrl: string;
  serviceKey: string;
};

type CachedRoute = {
  route_key?: string;
  distance_km?: number;
  distance_meters?: number;
  duration?: string;
  source?: string;
  confidence?: string;
};

export async function handleRequest(request: Request) {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await safeJson(request);
    const fromPin = normalizePincode(body.fromPincode);
    const toPin = normalizePincode(body.toPincode);
    if (!fromPin || !toPin) {
      return json({
        fallbackRequired: true,
        source: "local-estimate",
        reason: "Two valid six-digit pincodes are required for road distance"
      });
    }

    const routeKey = pinRouteKey(fromPin, toPin);
    if (fromPin === toPin) {
      return json({
        routeKey,
        distanceKm: 2,
        confidence: "high",
        source: "same-pincode",
        reason: "Same pincode default",
        googleCalled: false
      });
    }

    const specialDistance = specialDistanceKm[routeKey] || 0;
    if (specialDistance) {
      return json({
        routeKey,
        distanceKm: specialDistance,
        confidence: "high",
        source: "configured-route",
        reason: "Configured route distance",
        googleCalled: false
      });
    }

    const admin = supabaseAdminConfig();
    const existing = await fetchCachedRoute(admin, routeKey);
    if (existing) return json(cachedRoutePayload(existing));

    const apiKey = googleRoutesApiKey();
    if (!apiKey) {
      return json({
        routeKey,
        fallbackRequired: true,
        source: "local-estimate",
        reason: "GOOGLE_ROUTES_API_KEY or GOOGLE_MAPS_API_KEY is not configured",
        googleCalled: false
      });
    }

    const reservation = await callAdminRpc(admin, "billing_prepare_google_route_request", {
      p_from_pincode: fromPin,
      p_to_pincode: toPin
    });

    if (reservation?.action === "cached") {
      return json({
        ...reservation,
        cached: true,
        source: "shared-cache",
        reason: "Shared PIN-distance cache",
        googleCalled: false
      });
    }

    if (reservation?.action === "limit-reached") {
      return json({
        routeKey,
        fallbackRequired: true,
        source: "local-estimate",
        reason: `${limitLabel(reservation.limit)} Google Routes safety limit reached`,
        limit: reservation.limit,
        usage: reservation.usage,
        googleCalled: false
      });
    }

    if (reservation?.action === "previous-attempt") {
      return json({
        routeKey,
        fallbackRequired: true,
        source: "local-estimate",
        reason: "Google Routes was already attempted for this PIN pair; confirm the estimated distance",
        usage: reservation.usage,
        googleCalled: false
      });
    }

    if (reservation?.action === "wait") {
      const waitedRoute = await waitForCachedRoute(admin, routeKey);
      if (waitedRoute) return json(cachedRoutePayload(waitedRoute, reservation.usage));
      return json({
        routeKey,
        fallbackRequired: true,
        source: "local-estimate",
        reason: "Another user is calculating this route. The shared result is not ready yet",
        usage: reservation.usage,
        googleCalled: false
      });
    }

    if (reservation?.action !== "call-google" || !reservation?.requestToken) {
      throw new Error("Could not reserve a Google Routes request");
    }

    try {
      const route = await callGoogleRoutes(apiKey, fromPin, toPin);
      const distanceKm = Math.max(1, Math.round(Number(route.distanceMeters || 0) / 1000));
      if (!distanceKm) throw new Error("Google Routes returned no distance");

      const completed = await callAdminRpc(admin, "billing_complete_google_route_request", {
        p_request_token: reservation.requestToken,
        p_from_pincode: fromPin,
        p_to_pincode: toPin,
        p_distance_km: distanceKm,
        p_distance_meters: Math.max(0, Number(route.distanceMeters || 0)),
        p_duration: route.duration || "",
        p_source: "google-routes"
      });

      return json({
        ...completed,
        routeKey,
        distanceKm,
        distanceMeters: route.distanceMeters || 0,
        duration: route.duration || "",
        confidence: "high",
        source: "google-routes",
        reason: "Google Routes driving distance",
        cached: false,
        googleCalled: true,
        usage: reservation.usage
      });
    } catch (error) {
      await callAdminRpc(admin, "billing_fail_google_route_request", {
        p_request_token: reservation.requestToken,
        p_error_message: errorMessage(error)
      }).catch(databaseError => console.error("Could not release Google route reservation", databaseError));
      console.error("Google Routes request failed", error);
      return json({
        routeKey,
        fallbackRequired: true,
        source: "local-estimate",
        reason: publicGoogleRoutesError(error),
        usage: reservation.usage,
        googleCalled: true
      });
    }
  } catch (error) {
    console.error("E-way distance service failed", error);
    return json({ error: publicServiceError(error) }, 500);
  }
}

if (import.meta.main) Deno.serve(handleRequest);

function supabaseAdminConfig(): AdminConfig {
  const supabaseUrl = String(Deno.env.get("SUPABASE_URL") || "").replace(/\/$/, "");
  const serviceKey = String(Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "").trim();
  if (!supabaseUrl || !serviceKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured");
  }
  return { supabaseUrl, serviceKey };
}

async function safeJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function normalizePincode(value: unknown) {
  const pin = String(value || "").replace(/\D/g, "");
  return pin.length === 6 ? pin : "";
}

function pinRouteKey(fromPin: string, toPin: string) {
  return [fromPin, toPin].sort().join("-");
}

function googleRoutesApiKey() {
  return String(Deno.env.get("GOOGLE_ROUTES_API_KEY") || Deno.env.get("GOOGLE_MAPS_API_KEY") || "").trim();
}

async function fetchCachedRoute(admin: AdminConfig, routeKey: string): Promise<CachedRoute | null> {
  const select = "route_key,distance_km,distance_meters,duration,source,confidence";
  const url = `${admin.supabaseUrl}/rest/v1/billing_pin_distance_cache?select=${select}&route_key=eq.${encodeURIComponent(routeKey)}&limit=1`;
  const response = await fetch(url, { headers: adminHeaders(admin) });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Shared PIN-distance cache is not ready: ${message || response.status}`);
  }
  const rows = await response.json();
  return Array.isArray(rows) && rows.length ? rows[0] : null;
}

async function waitForCachedRoute(admin: AdminConfig, routeKey: string) {
  for (let attempt = 0; attempt < CACHE_WAIT_ATTEMPTS; attempt += 1) {
    await delay(CACHE_WAIT_MS);
    const cached = await fetchCachedRoute(admin, routeKey);
    if (cached) return cached;
  }
  return null;
}

async function callAdminRpc(admin: AdminConfig, functionName: string, payload: Record<string, unknown>) {
  const response = await fetch(`${admin.supabaseUrl}/rest/v1/rpc/${functionName}`, {
    method: "POST",
    headers: { ...adminHeaders(admin), "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const text = await response.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!response.ok) {
    const message = typeof data === "object" && data && "message" in data
      ? String((data as { message?: unknown }).message || "")
      : String(data || response.status);
    throw new Error(message || `Database request failed (${response.status})`);
  }
  return data as Record<string, any>;
}

function adminHeaders(admin: AdminConfig) {
  return {
    "apikey": admin.serviceKey,
    "Authorization": `Bearer ${admin.serviceKey}`
  };
}

function cachedRoutePayload(route: CachedRoute, usage: unknown = undefined) {
  return {
    routeKey: route.route_key || "",
    distanceKm: Number(route.distance_km || 0),
    distanceMeters: Number(route.distance_meters || 0),
    duration: route.duration || "",
    confidence: route.confidence || "confirmed",
    source: "shared-cache",
    cachedSource: route.source || "",
    reason: "Shared PIN-distance cache",
    cached: true,
    googleCalled: false,
    ...(usage ? { usage } : {})
  };
}

async function callGoogleRoutes(apiKey: string, fromPin: string, toPin: string) {
  const response = await fetch(GOOGLE_ROUTES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "routes.distanceMeters,routes.duration"
    },
    body: JSON.stringify({
      origin: { address: `${fromPin}, India` },
      destination: { address: `${toPin}, India` },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_UNAWARE",
      languageCode: "en-IN",
      regionCode: "IN",
      units: "METRIC"
    })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "Google Routes request failed");
  }
  const route = Array.isArray(data?.routes) ? data.routes[0] : null;
  if (!route?.distanceMeters) {
    throw new Error("No route found between the selected pincodes");
  }
  return route;
}

function limitLabel(value: unknown) {
  if (value === "annual") return "Annual 60,000-call";
  if (value === "monthly") return "Monthly 5,000-call";
  return "Daily 150-call";
}

function publicGoogleRoutesError(error: unknown) {
  const message = errorMessage(error);
  if (/api key|API_KEY|REQUEST_DENIED|permission|disabled|not authorized/i.test(message)) {
    return "Google Routes API key is invalid or Routes API is not enabled";
  }
  if (/billing|quota|rate|RESOURCE_EXHAUSTED/i.test(message)) {
    return "Google Routes billing or quota is unavailable";
  }
  if (/No route|ZERO_RESULTS|NOT_FOUND/i.test(message)) return "No Google route was found";
  return "Google Routes could not calculate the distance";
}

function publicServiceError(error: unknown) {
  const message = errorMessage(error);
  if (/cache is not ready|relation .* does not exist|schema cache/i.test(message)) {
    return "Shared PIN-distance cache is not ready. Run the latest Supabase migration.";
  }
  if (/SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY/i.test(message)) {
    return "Supabase function configuration is incomplete";
  }
  return "Distance service is temporarily unavailable";
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error || "Unexpected error");
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
