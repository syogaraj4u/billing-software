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

const saleLineSchema = {
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
};

const saleDraftSchema = {
  type: "object",
  additionalProperties: false,
  required: ["profileId", "customerName", "customerGstin", "customerAddress", "customerPlace", "status", "notes", "reviewMessages", "lines"],
  properties: {
    profileId: { type: "string" },
    customerName: { type: "string" },
    customerGstin: { type: "string" },
    customerAddress: { type: "string" },
    customerPlace: { type: "string" },
    status: { type: "string", enum: ["Paid", "Unpaid", "Partial"] },
    notes: { type: "string" },
    reviewMessages: { type: "array", items: { type: "string" } },
    lines: {
      type: "array",
      items: saleLineSchema
    }
  }
};

const responsiveSaleChatSchema = {
  type: "object",
  additionalProperties: false,
  required: ["ready", "assistantMessage", "missingDetails", "draft"],
  properties: {
    ready: { type: "boolean" },
    assistantMessage: { type: "string" },
    missingDetails: { type: "array", items: { type: "string" } },
    draft: saleDraftSchema
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

    const { message, profiles = [], profileAliases = [], items = [], parties = [], activeProfileId = "" } = await request.json();
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
              text: "You are a responsive B2B Indian GST sale bill assistant. Read the full conversation text and decide if the sale bill has enough details to create a draft. Required details: seller GST profileId from provided profiles, customer business name, customer GSTIN, item name, quantity, and rate. Payment status is not required in chat; set draft.status to Paid by default unless the user explicitly says Unpaid, Partial, credit, or due. Do not ask for payment status. Use HSN/SAC 85171300 by default whenever the user does not mention HSN/SAC. If the user explicitly mentions an HSN/SAC code, use that mentioned code instead of the default. Use GST rate 18 by default for every sale line whenever the user does not mention a GST percentage. If the user explicitly mentions a GST/tax percentage such as GST 12% or 5% GST, use that mentioned percentage instead of 18. Do not ask for GST rate when it is not mentioned. Use profileAliases to understand short company names. For example, 'Nirvana to Lakshmi Jeyapandi' means seller alias Nirvana and buyer alias Lakshmi Jeyapandi. For internal billing between provided GST profiles, infer both companies from names: phrases like 'from X to Y' mean seller profileId is X and customer is Y. If only two provided profile names or aliases are mentioned, use the first as seller and second as customer. When customer matches a provided profile or alias, fill customerName, customerGstin, customerAddress, and customerPlace from that profile. Parse stock-list item formats with headings like Fresh Stock or Activated Stock and bullet lines like 'iPhone 17 256GB - 112 Qty@86000' as invoice lines: item name should include the heading prefix, quantity is the Qty number, and rate is the amount after @/at/rate. Do not treat plain 'Lakshmi' as enough if more than one Lakshmi-related alias could match; ask for clarification. Do not invent unknown customer values. If anything is missing, set ready false, list missingDetails, and write assistantMessage as a short follow-up question asking only for missing details. If complete, set ready true and assistantMessage to a short confirmation. Return only schema fields."
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({ message, activeProfileId, profiles, profileAliases, items, parties })
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "responsive_sale_bill_chat",
          strict: true,
          schema: responsiveSaleChatSchema
        }
      }
    });

    const result = parseJsonOutput(response);
    const draft = result.draft || {};
    if (!draft.profileId && activeProfileId) draft.profileId = activeProfileId;
    draft.customerAddress = draft.customerAddress || "";
    draft.customerPlace = draft.customerPlace || "";
    draft.lines = (draft.lines || []).map((line: SaleLine) => ({
      name: line.name || "",
      hsn: line.hsn || "",
      qty: Number(line.qty) || 0,
      rate: Number(line.rate) || 0,
      gstRate: Number(line.gstRate) || 0
    }));

    return json({
      ready: Boolean(result.ready),
      assistantMessage: result.assistantMessage || "",
      missingDetails: Array.isArray(result.missingDetails) ? result.missingDetails : [],
      draft
    });
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
