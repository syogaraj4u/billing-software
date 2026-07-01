const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const pincodeSchema = {
  type: "object",
  additionalProperties: false,
  required: ["supplier", "buyer", "reviewMessages"],
  properties: {
    supplier: { "$ref": "#/$defs/partyPin" },
    buyer: { "$ref": "#/$defs/partyPin" },
    reviewMessages: { type: "array", items: { type: "string" } }
  },
  $defs: {
    partyPin: {
      type: "object",
      additionalProperties: false,
      required: ["pincode", "address", "place", "confidence", "reason"],
      properties: {
        pincode: { type: "string" },
        address: { type: "string" },
        place: { type: "string" },
        confidence: { type: "string", enum: ["high", "medium", "low", "unknown"] },
        reason: { type: "string" }
      }
    }
  }
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

    const { supplier = {}, buyer = {} } = await request.json();
    const normalized = {
      supplier: normalizePartyInput(supplier),
      buyer: normalizePartyInput(buyer)
    };

    const prefilled = {
      supplier: partyPinFromAddress(normalized.supplier),
      buyer: partyPinFromAddress(normalized.buyer)
    };
    if (prefilled.supplier.pincode && prefilled.buyer.pincode) {
      return json({ ...prefilled, reviewMessages: [] });
    }

    const response = await callOpenAI(apiKey, model, {
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: [
                "Resolve missing Indian postal PIN codes for purchase invoice e-way details.",
                "Use the given GSTIN state code, party name, visible address, place, and generally known Indian locality information.",
                "If an address already contains a six digit PIN, return that same PIN.",
                "Return a pincode only when confidence is high.",
                "Use high confidence only when the exact address/locality has one clear six digit PIN or the GSTIN/address pair is well known.",
                "For medium, low, or unknown confidence, pincode must be an empty string and the reason must explain what is missing.",
                "If the GSTIN or address is not enough to identify a specific PIN, return an empty pincode with confidence unknown and add a review message.",
                "Do not return non-Indian PIN codes. Do not invent a PIN only from the GSTIN state code.",
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
              text: JSON.stringify(normalized)
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "purchase_pincode_resolution",
          strict: true,
          schema: pincodeSchema
        }
      }
    });

    const result = parseJsonOutput(response);
    return json({
      supplier: mergeKnownPin(prefilled.supplier, sanitizePartyPin(result.supplier)),
      buyer: mergeKnownPin(prefilled.buyer, sanitizePartyPin(result.buyer)),
      reviewMessages: Array.isArray(result.reviewMessages) ? result.reviewMessages.map(String).filter(Boolean) : []
    });
  } catch (error) {
    return json({ error: publicOpenAIError(error) }, 500);
  }
});

function normalizePartyInput(value: Record<string, unknown>) {
  const gstin = normalizeGstin(String(value?.gstin || ""));
  return {
    name: String(value?.name || "").trim(),
    gstin,
    address: String(value?.address || "").trim(),
    place: String(value?.place || stateNameFromGstin(gstin) || "").trim(),
    gstState: stateNameFromGstin(gstin)
  };
}

function partyPinFromAddress(party: Record<string, string>) {
  const pincode = extractPincode(party.address);
  return {
    pincode,
    address: party.address || "",
    place: party.place || party.gstState || "",
    confidence: pincode ? "high" : "unknown",
    reason: pincode ? "PIN already present in address" : ""
  };
}

function mergeKnownPin(known: Record<string, string>, resolved: Record<string, string>) {
  if (known.pincode) return known;
  return resolved;
}

function sanitizePartyPin(value: Record<string, unknown> = {}) {
  const pincode = extractPincode(String(value.pincode || ""));
  const confidence = ["high", "medium", "low", "unknown"].includes(String(value.confidence)) ? String(value.confidence) : "unknown";
  return {
    pincode,
    address: String(value.address || "").trim(),
    place: String(value.place || "").trim(),
    confidence,
    reason: String(value.reason || "").trim()
  };
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

function normalizeGstin(value = "") {
  return String(value || "").toUpperCase().replace(/[^0-9A-Z]/g, "");
}

function extractPincode(value = "") {
  const match = String(value || "").match(/\b\d{6}\b/);
  return match ? match[0] : "";
}

function stateNameFromGstin(gstin = "") {
  const states: Record<string, string> = {
    "07": "Delhi",
    "27": "Maharashtra",
    "29": "Karnataka",
    "33": "Tamil Nadu",
    "36": "Telangana",
    "37": "Andhra Pradesh"
  };
  const code = normalizeGstin(gstin).slice(0, 2);
  return states[code] || "";
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
