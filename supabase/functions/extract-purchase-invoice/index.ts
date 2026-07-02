const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const invoiceSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "fileName",
    "profileId",
    "supplierName",
    "supplierGstin",
    "supplierAddress",
    "supplierPlace",
    "buyerName",
    "buyerGstin",
    "buyerAddress",
    "buyerPlace",
    "invoiceNumber",
    "invoiceDate",
    "taxable",
    "gst",
    "total",
    "extractedTaxes",
    "reviewMessages",
    "lines"
  ],
  properties: {
    fileName: { type: "string" },
    profileId: { type: "string" },
    supplierName: { type: "string" },
    supplierGstin: { type: "string" },
    supplierAddress: { type: "string" },
    supplierPlace: { type: "string" },
    buyerName: { type: "string" },
    buyerGstin: { type: "string" },
    buyerAddress: { type: "string" },
    buyerPlace: { type: "string" },
    invoiceNumber: { type: "string" },
    invoiceDate: { type: "string" },
    taxable: { type: "number" },
    gst: { type: "number" },
    total: { type: "number" },
    extractedTaxes: {
      type: "object",
      additionalProperties: false,
      required: ["taxable", "cgst", "sgst", "igst", "gst", "total"],
      properties: {
        taxable: { type: "number" },
        cgst: { type: "number" },
        sgst: { type: "number" },
        igst: { type: "number" },
        gst: { type: "number" },
        total: { type: "number" }
      }
    },
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
    const apiKey = (Deno.env.get("OPENAI_API_KEY") || "").trim();
    const model = (Deno.env.get("OPENAI_MODEL") || "").trim();
    if (!apiKey || !model) {
      return json({ error: "OPENAI_API_KEY and OPENAI_MODEL must be configured" }, 500);
    }

    const { fileName, mimeType, base64, profiles = [] } = await request.json();
    if (!fileName || !mimeType || !base64) {
      return json({ error: "fileName, mimeType and base64 are required" }, 400);
    }

    const filePart = String(mimeType).includes("pdf")
      ? { type: "input_file", filename: fileName, file_data: `data:${mimeType};base64,${base64}` }
      : { type: "input_image", image_url: `data:${mimeType};base64,${base64}` };

    const response = await callOpenAI(apiKey, model, {
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "Extract an Indian GST purchase invoice into a purchase register draft. The buyer must be one of the provided GST profiles when possible. Extract supplier and buyer address/place when visible; return an empty string when not visible. Separate CGST, SGST and IGST exactly as shown. If an item HSN/SAC is not visible, use default HSN 85171300. For invoices that say values are inclusive of GST, including Reliance/Reliance Digital receipts, return each line rate as taxable value before GST, not MRP or paid gross amount, and set total to the net paid/invoice total. If an invoice has a GST receipt summary by HSN, prefer that summary for taxable, tax, and total values. Add reviewMessages for unclear buyer, supplier, GSTIN, address, unreadable values, or tax mode mismatch."
            }
          ]
        },
        {
          role: "user",
          content: [
            filePart,
            {
              type: "input_text",
              text: JSON.stringify({ fileName, profiles })
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "purchase_invoice_register_entry",
          strict: true,
          schema: invoiceSchema
        }
      }
    });

    const invoice = parseJsonOutput(response);
    invoice.fileName = invoice.fileName || fileName;
    invoice.invoiceDate = toDateInput(invoice.invoiceDate);
    return json({ invoice });
  } catch (error) {
    return json({ error: publicOpenAIError(error) }, 500);
  }
});

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
    }
  }
  return "";
}

function toDateInput(value: string) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const iso = value.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
  if (iso) return iso[0];
  const parts = value.split(/[\/\-.]/).map(part => part.padStart(2, "0"));
  if (parts.length !== 3) return new Date().toISOString().slice(0, 10);
  if (parts[0].length === 4) return `${parts[0]}-${parts[1]}-${parts[2]}`;
  const year = parts[2].length === 2 ? `20${parts[2]}` : parts[2];
  return `${year}-${parts[1]}-${parts[0]}`;
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
