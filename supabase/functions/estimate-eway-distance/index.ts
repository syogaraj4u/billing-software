const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const distanceSchema = {
  type: "object",
  additionalProperties: false,
  required: ["distanceKm", "confidence", "reason"],
  properties: {
    distanceKm: { type: "number" },
    confidence: { type: "string", enum: ["high", "medium", "low"] },
    reason: { type: "string" }
  }
};

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
    const apiKey = (Deno.env.get("OPENAI_API_KEY") || "").trim();
    const model = (Deno.env.get("OPENAI_MODEL") || "").trim();
    if (!apiKey || !model) {
      return json({ error: "OPENAI_API_KEY and OPENAI_MODEL must be configured" }, 500);
    }

    const { fromAddress = "", toAddress = "", fromPincode = "", toPincode = "" } = await request.json();
    if (!String(fromAddress).trim() || !String(toAddress).trim()) {
      return json({ error: "fromAddress and toAddress are required" }, 400);
    }

    if (fromPincode && toPincode && String(fromPincode) === String(toPincode)) {
      return json({ distanceKm: 2, confidence: "high", reason: "Same pincode default" });
    }
    const specialDistance = fixedRouteDistance(fromPincode, toPincode);
    if (specialDistance) {
      return json({ distanceKm: specialDistance, confidence: "high", reason: "Configured route distance" });
    }

    const response = await callOpenAI(apiKey, model, {
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: [
                "Estimate practical road transport distance in kilometers for an Indian e-way bill.",
                "Use route distance, not straight-line distance.",
                "Return a realistic integer kilometer value.",
                "If the same pincode is provided for both sides, return 2.",
                "If uncertain, return a reasonable conservative estimate and mark confidence low.",
                "Return only the schema fields."
              ].join(" ")
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({ fromAddress, toAddress, fromPincode, toPincode })
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "eway_distance_estimate",
          strict: true,
          schema: distanceSchema
        }
      }
    });

    const estimate = parseJsonOutput(response);
    const distanceKm = Math.max(1, Math.round(Number(estimate.distanceKm) || 0));
    if (!distanceKm) return json({ error: "OpenAI returned no distance estimate" }, 500);
    return json({
      distanceKm,
      confidence: estimate.confidence || "low",
      reason: estimate.reason || ""
    });
  } catch (error) {
    return json({ error: publicOpenAIError(error) }, 500);
  }
});

function fixedRouteDistance(fromPincode: unknown, toPincode: unknown) {
  const fromPin = String(fromPincode || "").replace(/\D/g, "");
  const toPin = String(toPincode || "").replace(/\D/g, "");
  return specialDistanceKm[`${fromPin}-${toPin}`] || 0;
}

async function callOpenAI(apiKey: string, model: string, body: Record<string, unknown>) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ model: model.trim(), ...body })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "OpenAI request failed");
  }
  return data;
}

function publicOpenAIError(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  if (/Invalid header value|Authorization|Bearer|api key|OPENAI_API_KEY|sk-/i.test(message)) {
    return "OpenAI API key is invalid or has extra spaces/newlines. Reset OPENAI_API_KEY in Supabase.";
  }
  if (/model/i.test(message) && /not found|does not exist|invalid|unsupported/i.test(message)) {
    return "OpenAI model is invalid or not available. Check OPENAI_MODEL in Supabase.";
  }
  return "OpenAI request failed. Check Supabase function logs.";
}

function parseJsonOutput(response: Record<string, unknown>) {
  const text = extractOutputText(response);
  if (!text) throw new Error("OpenAI returned no text output");
  return JSON.parse(text);
}

function extractOutputText(response: Record<string, unknown>) {
  if (typeof response.output_text === "string") return response.output_text;
  const output = Array.isArray(response.output) ? response.output : [];
  for (const item of output as Array<Record<string, unknown>>) {
    const content = Array.isArray(item.content) ? item.content : [];
    for (const part of content as Array<Record<string, unknown>>) {
      if (typeof part.text === "string") return part.text;
      if (typeof part.output_text === "string") return part.output_text;
    }
  }
  return "";
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
