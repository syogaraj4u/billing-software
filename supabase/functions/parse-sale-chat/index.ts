const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

type SaleLine = {
  name: string;
  hsn: string;
  qty: number;
  rate: number;
  gstRate: number;
};

const saleDraftSchema = {
  type: "object",
  additionalProperties: false,
  required: ["profileId", "customerName", "customerGstin", "status", "notes", "reviewMessages", "lines"],
  properties: {
    profileId: { type: "string" },
    customerName: { type: "string" },
    customerGstin: { type: "string" },
    status: { type: "string", enum: ["Paid", "Unpaid", "Partial"] },
    notes: { type: "string" },
    reviewMessages: { type: "array", items: { type: "string" } },
    lines: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "hsn", "qty", "rate", "gstRate"],
        properties: {
          name: { type: "string" },
          hsn: { type: "string" },
          qty: { type: "number" },
          rate: { type: "number" },
          gstRate: { type: "number" }
        }
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
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    const model = Deno.env.get("OPENAI_MODEL");
    if (!apiKey || !model) {
      return json({ error: "OPENAI_API_KEY and OPENAI_MODEL must be configured" }, 500);
    }

    const { message, profiles = [], items = [], parties = [] } = await request.json();
    if (!message || typeof message !== "string") {
      return json({ error: "message is required" }, 400);
    }

    const response = await callOpenAI(apiKey, model, {
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "Extract a B2B Indian GST sale bill draft. Match profileId only from the provided GST profiles. Use reviewMessages for missing GSTIN, unclear item, missing HSN, or uncertain tax rate. Return only schema fields."
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({ message, profiles, items, parties })
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "sale_bill_draft",
          strict: true,
          schema: saleDraftSchema
        }
      }
    });

    const draft = parseJsonOutput(response);
    draft.lines = (draft.lines || []).map((line: SaleLine) => ({
      name: line.name || "Sale Item",
      hsn: line.hsn || "",
      qty: Number(line.qty) || 1,
      rate: Number(line.rate) || 0,
      gstRate: Number(line.gstRate) || 18
    }));

    return json({ draft });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unexpected error" }, 500);
  }
});

async function callOpenAI(apiKey: string, model: string, body: Record<string, unknown>) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ model, ...body })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "OpenAI request failed");
  }
  return data;
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
