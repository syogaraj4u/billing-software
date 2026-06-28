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

type ChatAttachment = {
  fileName?: string;
  mimeType?: string;
  base64?: string;
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
    const apiKey = (Deno.env.get("OPENAI_API_KEY") || "").trim();
    const model = (Deno.env.get("OPENAI_MODEL") || "").trim();
    if (!apiKey || !model) {
      return json({ error: "OPENAI_API_KEY and OPENAI_MODEL must be configured" }, 500);
    }

    const {
      message = "",
      attachments = [],
      profiles = [],
      profileAliases = [],
      partyAliases = [],
      items = [],
      parties = [],
      activeProfileId = ""
    } = await request.json();
    const messageText = typeof message === "string" ? message : "";
    const imageAttachments = normalizeImageAttachments(attachments);
    if (!messageText.trim() && !imageAttachments.length) {
      return json({ error: "message or image attachment is required" }, 400);
    }
    const attachmentParts = imageAttachments.map(attachment => ({
      type: "input_image",
      image_url: `data:${attachment.mimeType};base64,${attachment.base64}`
    }));

    const response = await callOpenAI(apiKey, model, {
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: [
                "You are a responsive B2B Indian GST sale bill assistant.",
                "The user has already selected the seller GST company in the app. activeProfileId is always the seller profileId. Never choose or change the seller from chat text or screenshots.",
                "Read the full conversation text and any attached bill-to or ship-to screenshots, then decide if the sale bill has enough details to create a draft.",
                "Required details: customer business name, customer GSTIN, customer bill-to address, item name, quantity, and rate.",
                "This is a B2B billing app. A valid customer GSTIN is mandatory. Never set ready true unless customerGstin is present and looks like a valid Indian GSTIN.",
                "Always set draft.profileId to activeProfileId.",
                "Treat phrases like bill to, buyer, customer, party, to, ship to, and screenshots as buyer/customer information only.",
                "For internal billing between provided GST profiles, if the chat says bill to X, buyer X, customer X, or selected seller to X, X is the customer, not the seller. Fill customerName, customerGstin, customerAddress, and customerPlace from that provided profile.",
                "If the chat says from X to Y, ignore X as seller unless X is activeProfileId; use activeProfileId as seller and use Y as customer.",
                "Use partyAliases to understand saved buyer/customer names and short names. When customer matches a saved buyer in partyAliases, fill customerName, customerGstin, customerAddress, and customerPlace from that buyer.",
                "Payment status is not required in chat; set draft.status to Paid by default unless the user explicitly says Unpaid, Partial, credit, or due. Do not ask for payment status.",
                "Use HSN/SAC 85171300 by default whenever the user does not mention HSN/SAC. If the user explicitly mentions an HSN/SAC code, use that mentioned code instead of the default.",
                "Use GST rate 18 by default for every sale line whenever the user does not mention a GST percentage. If the user explicitly mentions a GST/tax percentage such as GST 12% or 5% GST, use that mentioned percentage instead of 18. Do not ask for GST rate when it is not mentioned.",
                "Sale prices/rates typed in chat are GST-inclusive by default unless the user clearly says plus GST, GST extra, excluding GST, or tax extra. Keep draft.lines.rate as the exact amount the user typed after @/at/rate; the app will split GST later.",
                "For attached screenshots, read buyer, bill-to, ship-to, GSTIN, state, place, pincode, phone, and address blocks. Use the Bill To or Buyer block for customerName, customerGstin, customerAddress, and customerPlace.",
                "If Bill To and Ship To are different, keep Bill To in the customer fields and write the Ship To name/address/GSTIN clearly in draft.notes.",
                "Parse stock-list item formats with headings like Fresh Stock or Activated Stock and bullet lines like 'iPhone 17 256GB - 112 Qty@86000' as invoice lines: item name should include the heading prefix, quantity is the Qty number, and rate is the amount after @/at/rate.",
                "Do not invent unknown customer values. If a short buyer name is ambiguous, ask for clarification.",
                "If buyer name is present but GSTIN is not available in chat, screenshots, partyAliases, or profiles, set ready false and missingDetails to customer GSTIN.",
                "If anything is missing after reading both text and images, set ready false and include only the next one missing detail in missingDetails, using this priority order: customer business name, customer GSTIN, item name, quantity, rate, customer bill-to address.",
                "assistantMessage must ask exactly one short follow-up question for that single missing detail. Do not combine multiple missing details in one question.",
                "If complete, set ready true and assistantMessage to a short confirmation. Return only schema fields."
              ].join(" ")
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({
                message: messageText,
                activeProfileId,
                profiles,
                profileAliases,
                partyAliases,
                items,
                parties,
                attachments: imageAttachments.map(({ fileName, mimeType }) => ({ fileName, mimeType }))
              })
            },
            ...attachmentParts
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
    if (activeProfileId) draft.profileId = activeProfileId;
    draft.customerAddress = draft.customerAddress || "";
    draft.customerPlace = draft.customerPlace || "";
    if (!isValidGstin(draft.customerGstin)) {
      const buyerName = typeof draft.customerName === "string" && draft.customerName.trim() ? draft.customerName.trim() : "the buyer";
      result.ready = false;
      result.missingDetails = ["customer GSTIN"];
      result.assistantMessage = `Please share the GSTIN for ${buyerName}.`;
      draft.customerGstin = "";
    }
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

function normalizeImageAttachments(value: unknown): ChatAttachment[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, 4)
    .map(item => {
      const row = item && typeof item === "object" ? item as Record<string, unknown> : {};
      return {
        fileName: typeof row.fileName === "string" ? row.fileName : "chat-bill-image",
        mimeType: typeof row.mimeType === "string" ? row.mimeType : "",
        base64: typeof row.base64 === "string" ? row.base64 : ""
      };
    })
    .filter(item => ["image/png", "image/jpeg", "image/webp"].includes(item.mimeType || "") && Boolean(item.base64));
}

function normalizeGstin(value: unknown) {
  return String(value || "").toUpperCase().replace(/[^0-9A-Z]/g, "");
}

function isValidGstin(value: unknown) {
  return /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(normalizeGstin(value));
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
