const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

Deno.serve(async request => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("REPORT_FROM_EMAIL");
    if (!supabaseUrl || !serviceKey || !resendKey || !fromEmail) {
      return json({ error: "SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY and REPORT_FROM_EMAIL must be configured" }, 500);
    }

    const body = await safeJson(request);
    const month = body.month || previousMonth();
    const workspaceId = body.workspaceId || "";
    const workspaces = await fetchWorkspaces(supabaseUrl, serviceKey, workspaceId);
    const results = [];

    for (const workspace of workspaces) {
      const data = workspace.data || {};
      const recipients = parseEmails(data.settings?.reportEmails || "");
      if (!recipients.length) {
        results.push({ workspace: workspace.name, skipped: "No report email IDs configured" });
        continue;
      }
      const rows = purchaseRows(data, month);
      const csv = csvFromRows([
        ["Date", "Bill No", "Buyer Business", "Buyer GSTIN", "Supplier", "Supplier GSTIN", "Tax Mode", "Taxable", "CGST", "SGST", "IGST", "GST", "Total", "Review Status", "Review Notes", "Invoice Soft Copy"],
        ...rows
      ]);
      await sendReportEmail(resendKey, fromEmail, recipients, workspace.name, month, csv, rows);
      results.push({ workspace: workspace.name, sentTo: recipients, purchaseCount: rows.length });
    }

    return json({ month, results });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unexpected error" }, 500);
  }
});

async function fetchWorkspaces(supabaseUrl: string, serviceKey: string, workspaceId: string) {
  const filter = workspaceId ? `&id=eq.${encodeURIComponent(workspaceId)}` : "";
  const response = await fetch(`${supabaseUrl}/rest/v1/billing_cloud_workspaces?select=id,name,data${filter}`, {
    headers: {
      "apikey": serviceKey,
      "Authorization": `Bearer ${serviceKey}`
    }
  });
  if (!response.ok) throw new Error("Could not load cloud workspaces");
  return await response.json();
}

async function sendReportEmail(
  resendKey: string,
  fromEmail: string,
  recipients: string[],
  workspaceName: string,
  month: string,
  csv: string,
  rows: unknown[][]
) {
  const invoiceCount = rows.reduce((count, row) => count + String(row[15] || "").split(" | ").filter(Boolean).length, 0);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: recipients,
      subject: `${workspaceName} purchase report - ${month}`,
      html: `<p>Purchase register for ${month} is attached.</p><p>Purchase entries: ${rows.length}<br>Invoice soft-copy references: ${invoiceCount}</p>`,
      attachments: [
        {
          filename: `purchase-register-${month}.csv`,
          content: base64(csv)
        }
      ]
    })
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Email failed: ${error}`);
  }
}

function purchaseRows(data: Record<string, any>, month: string) {
  const profiles = data.settings?.profiles || [];
  const parties = data.parties || [];
  const purchases = data.purchases || [];
  return purchases
    .filter((entry: Record<string, any>) => String(entry.date || "").startsWith(month))
    .sort((a: Record<string, any>, b: Record<string, any>) => String(a.date).localeCompare(String(b.date)))
    .map((entry: Record<string, any>) => {
      const profile = profiles.find((item: Record<string, any>) => item.id === entry.profileId) || {};
      const supplier = parties.find((item: Record<string, any>) => item.id === entry.partyId) || {};
      return [
        entry.date || "",
        entry.number || "",
        profile.businessName || profile.label || "",
        profile.gstin || "",
        supplier.name || "",
        supplier.gstin || "",
        entry.taxMode || "",
        entry.taxable || 0,
        entry.cgst || 0,
        entry.sgst || 0,
        entry.igst || 0,
        entry.gst || 0,
        entry.total || 0,
        entry.reviewStatus || "",
        (entry.reviewMessages || []).join(" | "),
        (entry.attachments || []).map((file: Record<string, any>) => file.storagePath || file.name).join(" | ")
      ];
    });
}

function parseEmails(value: string) {
  return [...new Set(String(value || "").split(/[\n,;]/).map(email => email.trim().toLowerCase()).filter(Boolean))];
}

function previousMonth() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toISOString().slice(0, 7);
}

function csvFromRows(rows: unknown[][]) {
  return rows.map(row => row.map(csvCell).join(",")).join("\n");
}

function csvCell(value: unknown) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function base64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

async function safeJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
