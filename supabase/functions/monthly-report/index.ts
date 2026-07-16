const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const MAX_SOFT_COPY_BYTES = 18 * 1024 * 1024;
const MAX_SINGLE_SOFT_COPY_BYTES = 8 * 1024 * 1024;

type CsvRow = unknown[];
type SoftCopyRecord = {
  kind: string;
  date: string;
  number: string;
  fileName: string;
  bucket: string;
  storagePath: string;
  status: string;
  row: CsvRow;
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

      const report = buildMonthEndReport(data, month);
      const storedSoftCopies = await downloadStoredSoftCopies(supabaseUrl, serviceKey, report.softCopies);
      await sendReportEmail(resendKey, fromEmail, recipients, workspace.name, month, report, storedSoftCopies);
      results.push({
        workspace: workspace.name,
        sentTo: recipients,
        salesCount: report.sales.length,
        creditNoteCount: report.creditNotes.length,
        purchaseCount: report.purchases.length,
        purchaseReturnCount: report.purchaseReturns.length,
        softCopyCount: report.softCopies.length,
        softCopiesAttached: storedSoftCopies.length
      });
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
  report: ReturnType<typeof buildMonthEndReport>,
  storedSoftCopies: Array<{ filename: string; content: string }>
) {
  const csvAttachments = [
    csvAttachment(`sales-register-${month}.csv`, salesRegisterHeader(), report.sales),
    csvAttachment(`credit-note-register-${month}.csv`, creditNoteRegisterHeader(), report.creditNotes),
    csvAttachment(`purchase-register-${month}.csv`, purchaseRegisterHeader(), report.purchases),
    csvAttachment(`purchase-return-register-${month}.csv`, purchaseReturnRegisterHeader(), report.purchaseReturns),
    csvAttachment(`gst-summary-${month}.csv`, gstSummaryHeader(), report.gstSummary),
    csvAttachment(`invoice-soft-copies-${month}.csv`, softCopyHeader(), report.softCopies.map(copy => copy.row))
  ];
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: recipients,
      subject: `${workspaceName} month-end billing report - ${month}`,
      html: `<p>Month-end billing report for ${month} is attached.</p><p>Sales entries: ${report.sales.length}<br>Credit notes: ${report.creditNotes.length}<br>Purchase entries: ${report.purchases.length}<br>Purchase returns: ${report.purchaseReturns.length}<br>GST summary rows: ${report.gstSummary.length}<br>Invoice soft-copy records: ${report.softCopies.length}<br>Soft copies attached: ${storedSoftCopies.length}</p>`,
      attachments: [...csvAttachments, ...storedSoftCopies]
    })
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Email failed: ${error}`);
  }
}

function buildMonthEndReport(data: Record<string, any>, month: string) {
  const sales = salesRows(data, month);
  const creditNotes = creditNoteRows(data, month);
  const purchases = purchaseRows(data, month);
  const purchaseReturns = purchaseReturnRows(data, month);
  const gstSummary = gstSummaryRows(data, month);
  const softCopies = invoiceSoftCopies(data, month);
  return { sales, creditNotes, purchases, purchaseReturns, gstSummary, softCopies };
}

function creditNoteRows(data: Record<string, any>, month: string) {
  const profiles = data.settings?.profiles || [];
  const parties = data.parties || [];
  return monthEntries(data.creditNotes || [], month)
    .sort(sortByDateNumber)
    .map((entry: Record<string, any>) => {
      const profile = byId(profiles, entry.profileId);
      const buyer = byId(parties, entry.partyId);
      return [entry.date || "", entry.number || "", profile.businessName || profile.label || "", profile.gstin || "", buyer.name || "", buyer.gstin || "", entry.originalInvoiceNumber || "", entry.originalInvoiceDate || "", entry.reason || "", entry.restock ? "Yes" : "No", entry.taxMode || "", entry.taxable || 0, entry.cgst || 0, entry.sgst || 0, entry.igst || 0, entry.gst || 0, entry.roundOff || 0, entry.total || 0, isCancelledEntry(entry) ? "Cancelled" : "Active"];
    });
}

function purchaseReturnRows(data: Record<string, any>, month: string) {
  const profiles = data.settings?.profiles || [];
  const parties = data.parties || [];
  return monthEntries(data.purchaseReturns || [], month)
    .sort(sortByDateNumber)
    .map((entry: Record<string, any>) => {
      const profile = byId(profiles, entry.profileId);
      const supplier = byId(parties, entry.partyId);
      return [entry.date || "", entry.number || "", profile.businessName || profile.label || "", profile.gstin || "", supplier.name || "", supplier.gstin || "", entry.originalInvoiceNumber || "", entry.originalInvoiceDate || "", entry.reason || "", entry.restock ? "Yes" : "No", entry.taxable || 0, entry.cgst || 0, entry.sgst || 0, entry.igst || 0, entry.gst || 0, entry.roundOff || 0, entry.total || 0, isCancelledEntry(entry) ? "Cancelled" : "Active"];
    });
}

function salesRows(data: Record<string, any>, month: string) {
  const profiles = data.settings?.profiles || [];
  const parties = data.parties || [];
  return monthEntries(data.sales || [], month)
    .sort(sortByDateNumber)
    .map((entry: Record<string, any>) => {
      const profile = byId(profiles, entry.profileId);
      const buyer = byId(parties, entry.partyId);
      return [
        entry.date || "",
        entry.number || "",
        profile.businessName || profile.label || "",
        profile.gstin || "",
        buyer.name || "",
        buyer.gstin || "",
        entry.taxMode || "",
        entry.taxable || 0,
        entry.cgst || 0,
        entry.sgst || 0,
        entry.igst || 0,
        entry.gst || 0,
        entry.roundOff || 0,
        entry.total || 0,
        isCancelledEntry(entry) ? "Cancelled" : (entry.status || "Saved")
      ];
    });
}

function purchaseRows(data: Record<string, any>, month: string) {
  const profiles = data.settings?.profiles || [];
  const parties = data.parties || [];
  return monthEntries(data.purchases || [], month)
    .sort(sortByDateNumber)
    .map((entry: Record<string, any>) => {
      const profile = byId(profiles, entry.profileId);
      const supplier = byId(parties, entry.partyId);
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

function gstSummaryRows(data: Record<string, any>, month: string) {
  const profiles = data.settings?.profiles || [];
  const sales = monthEntries(data.sales || [], month).filter(entry => !isCancelledEntry(entry));
  const credits = monthEntries(data.creditNotes || [], month).filter(entry => !isCancelledEntry(entry));
  const purchases = monthEntries(data.purchases || [], month).filter(entry => !isCancelledEntry(entry));
  const purchaseReturns = monthEntries(data.purchaseReturns || [], month).filter(entry => !isCancelledEntry(entry));
  return profiles.map((profile: Record<string, any>) => {
    const output = subtractTax(
      sumTax(sales.filter(entry => entry.profileId === profile.id)),
      sumTax(credits.filter(entry => entry.profileId === profile.id))
    );
    const input = subtractTax(
      sumTax(purchases.filter(entry => entry.profileId === profile.id)),
      sumTax(purchaseReturns.filter(entry => entry.profileId === profile.id))
    );
    const netCgst = round2(output.cgst - input.cgst);
    const netSgst = round2(output.sgst - input.sgst);
    const netIgst = round2(output.igst - input.igst);
    const netGst = round2(output.gst - input.gst);
    return [
      profile.businessName || profile.label || "",
      profile.gstin || "",
      output.taxable,
      output.cgst,
      output.sgst,
      output.igst,
      output.gst,
      input.taxable,
      input.cgst,
      input.sgst,
      input.igst,
      input.gst,
      netCgst,
      netSgst,
      netIgst,
      netGst
    ];
  }).filter(row => row.slice(2).some(value => num(value)));
}

function invoiceSoftCopies(data: Record<string, any>, month: string): SoftCopyRecord[] {
  const profiles = data.settings?.profiles || [];
  const parties = data.parties || [];
  const sales = monthEntries(data.sales || [], month);
  const purchases = monthEntries(data.purchases || [], month);
  return [
    ...softCopyRowsForEntries("Sales", sales, profiles, parties),
    ...softCopyRowsForEntries("Purchase", purchases, profiles, parties)
  ].sort((a, b) => `${a.date}-${a.number}`.localeCompare(`${b.date}-${b.number}`));
}

function softCopyRowsForEntries(kind: string, entries: Array<Record<string, any>>, profiles: Array<Record<string, any>>, parties: Array<Record<string, any>>) {
  return entries.flatMap(entry => {
    const profile = byId(profiles, entry.profileId);
    const party = byId(parties, entry.partyId);
    return (entry.attachments || []).map((file: Record<string, any>) => {
      const record = {
        kind,
        date: entry.date || "",
        number: entry.number || "",
        fileName: file.name || "invoice-file",
        bucket: file.bucket || "",
        storagePath: file.storagePath || "",
        status: file.status || "",
        row: [
          kind,
          entry.date || "",
          entry.number || "",
          profile.businessName || profile.label || "",
          profile.gstin || "",
          party.name || "",
          party.gstin || "",
          file.name || "",
          file.bucket || "",
          file.storagePath || "",
          file.status || "",
          file.uploadedAt || ""
        ]
      };
      return record;
    });
  });
}

async function downloadStoredSoftCopies(supabaseUrl: string, serviceKey: string, softCopies: SoftCopyRecord[]) {
  const attachments: Array<{ filename: string; content: string }> = [];
  const usedNames = new Set<string>();
  let totalBytes = 0;
  for (const copy of softCopies) {
    if (!copy.bucket || !copy.storagePath) continue;
    const downloaded = await downloadStoredSoftCopy(supabaseUrl, serviceKey, copy);
    if (!downloaded) continue;
    if (downloaded.bytes.length > MAX_SINGLE_SOFT_COPY_BYTES) continue;
    if (totalBytes + downloaded.bytes.length > MAX_SOFT_COPY_BYTES) continue;
    totalBytes += downloaded.bytes.length;
    attachments.push({
      filename: uniqueAttachmentName(safeFileName(`${copy.kind}-${copy.number}-${copy.fileName}`), usedNames),
      content: base64Bytes(downloaded.bytes)
    });
  }
  return attachments;
}

async function downloadStoredSoftCopy(supabaseUrl: string, serviceKey: string, copy: SoftCopyRecord) {
  const bucket = encodeURIComponent(copy.bucket);
  const path = copy.storagePath.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${path}`, {
    headers: {
      "apikey": serviceKey,
      "Authorization": `Bearer ${serviceKey}`
    }
  });
  if (!response.ok) return null;
  return { bytes: new Uint8Array(await response.arrayBuffer()) };
}

function csvAttachment(filename: string, header: CsvRow, rows: CsvRow[]) {
  return {
    filename,
    content: base64(csvFromRows([header, ...rows]))
  };
}

function salesRegisterHeader() {
  return ["Date", "Invoice No", "Seller Business", "Seller GSTIN", "Buyer", "Buyer GSTIN", "Tax Mode", "Taxable", "CGST", "SGST", "IGST", "GST", "Round Off", "Total", "Status"];
}

function purchaseRegisterHeader() {
  return ["Date", "Bill No", "Buyer Business", "Buyer GSTIN", "Supplier", "Supplier GSTIN", "Tax Mode", "Taxable", "CGST", "SGST", "IGST", "GST", "Total", "Review Status", "Review Notes", "Invoice Soft Copy"];
}

function creditNoteRegisterHeader() {
  return ["Date", "Credit Note No", "Seller Business", "Seller GSTIN", "Buyer", "Buyer GSTIN", "Original Invoice", "Original Invoice Date", "Reason", "Stock Updated", "Tax Mode", "Taxable", "CGST", "SGST", "IGST", "GST", "Round Off", "Total", "Status"];
}

function purchaseReturnRegisterHeader() {
  return ["Date", "Credit Note No", "Buyer Business", "Buyer GSTIN", "Supplier", "Supplier GSTIN", "Original Invoice", "Original Invoice Date", "Reason", "Stock Updated", "Taxable", "CGST", "SGST", "IGST", "GST", "Round Off", "Total", "Status"];
}

function gstSummaryHeader() {
  return ["Company", "GSTIN", "Sales Taxable", "Sales CGST", "Sales SGST", "Sales IGST", "Sales GST", "Purchase Taxable", "Purchase CGST", "Purchase SGST", "Purchase IGST", "Purchase GST", "Net CGST", "Net SGST", "Net IGST", "Net GST"];
}

function softCopyHeader() {
  return ["Type", "Date", "Document No", "Company", "Company GSTIN", "Party", "Party GSTIN", "File Name", "Bucket", "Storage Path", "Status", "Uploaded At"];
}

function monthEntries(entries: Array<Record<string, any>>, month: string) {
  return entries.filter(entry => String(entry.date || "").startsWith(month));
}

function sortByDateNumber(a: Record<string, any>, b: Record<string, any>) {
  return `${a.date || ""}-${a.number || ""}`.localeCompare(`${b.date || ""}-${b.number || ""}`);
}

function byId(rows: Array<Record<string, any>>, id: string) {
  return rows.find(row => row.id === id) || {};
}

function isCancelledEntry(entry: Record<string, any>) {
  return Boolean(entry.cancelled) || entry.status === "Cancelled";
}

function sumTax(entries: Array<Record<string, any>>) {
  return entries.reduce((acc, entry) => {
    acc.taxable = round2(acc.taxable + num(entry.taxable));
    acc.cgst = round2(acc.cgst + num(entry.cgst));
    acc.sgst = round2(acc.sgst + num(entry.sgst));
    acc.igst = round2(acc.igst + num(entry.igst));
    acc.gst = round2(acc.gst + num(entry.gst));
    return acc;
  }, { taxable: 0, cgst: 0, sgst: 0, igst: 0, gst: 0 });
}

function subtractTax(total: Record<string, number>, adjustment: Record<string, number>) {
  return {
    taxable: round2(total.taxable - adjustment.taxable),
    cgst: round2(total.cgst - adjustment.cgst),
    sgst: round2(total.sgst - adjustment.sgst),
    igst: round2(total.igst - adjustment.igst),
    gst: round2(total.gst - adjustment.gst)
  };
}

function num(value: unknown) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function round2(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function parseEmails(value: string) {
  return [...new Set(String(value || "").split(/[\n,;]/).map(email => email.trim().toLowerCase()).filter(Boolean))];
}

function previousMonth() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toISOString().slice(0, 7);
}

function csvFromRows(rows: CsvRow[]) {
  return rows.map(row => row.map(csvCell).join(",")).join("\n");
}

function csvCell(value: unknown) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function safeFileName(value: string) {
  return String(value || "invoice-file").replace(/[^A-Za-z0-9._-]+/g, "-").replace(/-+/g, "-").slice(0, 140);
}

function uniqueAttachmentName(name: string, usedNames: Set<string>) {
  const baseName = name || "invoice-file";
  if (!usedNames.has(baseName)) {
    usedNames.add(baseName);
    return baseName;
  }
  const dot = baseName.lastIndexOf(".");
  const stem = dot > 0 ? baseName.slice(0, dot) : baseName;
  const ext = dot > 0 ? baseName.slice(dot) : "";
  let counter = 2;
  let candidate = `${stem}-${counter}${ext}`;
  while (usedNames.has(candidate)) {
    counter += 1;
    candidate = `${stem}-${counter}${ext}`;
  }
  usedNames.add(candidate);
  return candidate;
}

function base64(value: string) {
  return base64Bytes(new TextEncoder().encode(value));
}

function base64Bytes(bytes: Uint8Array) {
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
