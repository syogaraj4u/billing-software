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
    "roundOff",
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
    invoiceDate: { type: "string", description: "Tax invoice date normalized to YYYY-MM-DD from any common printed date format. Never use ACK, IRN, e-way, delivery, dispatch, document, generated, or validity dates." },
    taxable: { type: "number" },
    gst: { type: "number" },
    total: { type: "number" },
    roundOff: { type: "number" },
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
              text: "Extract an Indian GST purchase invoice into a purchase register draft. The buyer must be one of the provided GST profiles when possible. invoiceDate must be the Tax Invoice Date, Invoice Date, or Dated value associated with the invoice number. Never use ACK Date, acknowledgement date, IRN date, e-way bill generated date, delivery date, dispatch date, document date, generated date, or validity date as invoiceDate. Recognize all common invoice date formats, including DD/MM/YYYY, DD-MM-YY, DD.MM.YYYY, YYYY-MM-DD, YYYY/MM/DD, DD-MMM-YY, DD Month YYYY, Month DD YYYY, compact DDMMYYYY, compact YYYYMMDD, compact DDMMMYYYY, ordinal dates, and invoice date/time values. Interpret ambiguous numeric dates as Indian day-first dates. Return invoiceDate only as YYYY-MM-DD. If the invoice date is missing or unreadable, return an empty string and add a review message instead of using another date. Extract supplier and buyer address/place when visible; return an empty string when not visible. Keep any visible six digit PIN code inside supplierAddress and buyerAddress. Return clean catalog item names: for Apple/iPhone products keep only product family, model/variant, and storage, for example 'Apple iPhone 17 256GB Blue SKU ABC123' becomes 'iPhone 17 256GB' and 'IPHONE 17 PRO MAX 512 NATURAL TITANIUM' becomes 'iPhone 17 Pro Max 512GB'. Remove colors, SKU/item/model codes, EAN, IMEI, serial, batch, and other supplier-only suffixes from item names. Separate CGST, SGST and IGST exactly as shown. If an item HSN/SAC is not visible, use default HSN 85171300. If payment lines show card cashback, cashback, debit note, or any post-total payment adjustment, return it in roundOff as a negative number; for example CARD CASH BACK - 6000 means roundOff -6000. Keep extractedTaxes.total as the invoice total before cashback, while total may be the net debited/payable total. For invoices that say values are inclusive of GST, including Reliance/Reliance Digital receipts, return each line rate as taxable value before GST, not MRP or paid gross amount, and set total to the net paid/invoice total. For CELL9 MOBILE STORE invoices, the RATE column is taxable unit rate and the printed AMOUNT/TOTAL is the grand total inclusive of GST; for example Qty 5, Rate 49,576.27, CGST 22,309.32, SGST 22,309.32 means taxable 247,881.35, gst 44,618.64, total 292,500.00, and line rate 49,576.27. Do not use IMEI numbers, time, bill number, or the watermark as amounts. If an invoice has a GST receipt summary by HSN, prefer that summary for taxable, tax, and total values. Add reviewMessages for unclear buyer, supplier, GSTIN, address, unreadable values, payment adjustment, or tax mode mismatch."
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
    if (!invoice.invoiceDate) {
      invoice.reviewMessages = Array.isArray(invoice.reviewMessages) ? invoice.reviewMessages : [];
      if (!invoice.reviewMessages.some((message: unknown) => /invoice date/i.test(String(message)))) {
        invoice.reviewMessages.push("Invoice date was not readable. Enter it before saving.");
      }
    }
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
  const cleaned = String(value || "")
    .trim()
    .replace(/(\d)(?:st|nd|rd|th)\b/gi, "$1")
    .replace(/,/g, " ")
    .replace(/\s+/g, " ")
    .replace(/(?:T|\s+)\d{1,2}:\d{2}(?::\d{2})?(?:\.\d+)?(?:\s*[AP]M)?(?:Z|[+\-]\d{2}:?\d{2})?$/i, "");
  const iso = cleaned.match(/^(\d{4})\s*[\/\-.]\s*(\d{1,2})\s*[\/\-.]\s*(\d{1,2})$/);
  if (iso) return dateInputFromParts(iso[1], iso[2], iso[3]);
  const dayFirstNamed = cleaned.match(/^(\d{1,2})[\s\/\-.]+([A-Za-z]{3,9})[\s\/\-.]+(\d{2,4})$/);
  if (dayFirstNamed) return dateInputFromParts(dayFirstNamed[3], invoiceMonthNumber(dayFirstNamed[2]), dayFirstNamed[1]);
  const monthFirstNamed = cleaned.match(/^([A-Za-z]{3,9})[\s\/\-.]+(\d{1,2})[\s\/\-.]+(\d{2,4})$/);
  if (monthFirstNamed) return dateInputFromParts(monthFirstNamed[3], invoiceMonthNumber(monthFirstNamed[1]), monthFirstNamed[2]);
  const yearFirstNamed = cleaned.match(/^(\d{4})[\s\/\-.]+([A-Za-z]{3,9})[\s\/\-.]+(\d{1,2})$/);
  if (yearFirstNamed) return dateInputFromParts(yearFirstNamed[1], invoiceMonthNumber(yearFirstNamed[2]), yearFirstNamed[3]);
  const compactNamed = cleaned.match(/^(\d{1,2})([A-Za-z]{3,9})(\d{2,4})$/);
  if (compactNamed) return dateInputFromParts(compactNamed[3], invoiceMonthNumber(compactNamed[2]), compactNamed[1]);
  const numeric = cleaned.match(/^(\d{1,2})\s*[\/\-.]\s*(\d{1,2})\s*[\/\-.]\s*(\d{2,4})$/);
  if (numeric) return dateInputFromParts(numeric[3], numeric[2], numeric[1]);
  const compact = cleaned.replace(/\s/g, "");
  if (/^\d{8}$/.test(compact)) {
    return /^(?:19|20)/.test(compact)
      ? dateInputFromParts(compact.slice(0, 4), compact.slice(4, 6), compact.slice(6, 8))
      : dateInputFromParts(compact.slice(4, 8), compact.slice(2, 4), compact.slice(0, 2));
  }
  if (/^\d{6}$/.test(compact)) return dateInputFromParts(compact.slice(4, 6), compact.slice(2, 4), compact.slice(0, 2));
  return "";
}

function invoiceMonthNumber(value: string) {
  const token = String(value || "").trim().toLowerCase().slice(0, 3);
  const index = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].indexOf(token);
  return index >= 0 ? index + 1 : 0;
}

function dateInputFromParts(yearValue: string, monthValue: string | number, dayValue: string | number) {
  if (!monthValue) return "";
  const yearText = String(yearValue || "");
  const year = Number(yearText.length === 2 ? `20${yearText}` : yearText);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (!year || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return "";
  }
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
