import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import { webcrypto } from "node:crypto";

const appSource = await readFile(new URL("../app.js", import.meta.url), "utf8");

function createAppHarness() {
  const storage = new Map();
  const document = {
    activeElement: null,
    body: {
      classList: { add() {}, remove() {}, contains() { return false; }, toggle() {} },
      dataset: {}
    },
    documentElement: { dataset: {} },
    addEventListener() {},
    createElement() { return { click() {}, remove() {}, style: {}, classList: { add() {}, remove() {} } }; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    title: "Billing"
  };
  const sandbox = {
    Blob,
    TextDecoder,
    TextEncoder,
    clearTimeout,
    console,
    crypto: webcrypto,
    document,
    fetch: async () => ({ ok: false }),
    localStorage: {
      getItem(key) { return storage.get(key) ?? null; },
      removeItem(key) { storage.delete(key); },
      setItem(key, value) { storage.set(key, String(value)); }
    },
    location: { href: "http://127.0.0.1/", origin: "http://127.0.0.1", pathname: "/", protocol: "http:", search: "", hash: "" },
    navigator: {},
    setTimeout,
    structuredClone,
    URL,
    URLSearchParams
  };
  sandbox.window = sandbox;
  sandbox.history = { pushState() {}, replaceState() {} };
  sandbox.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  vm.createContext(sandbox);
  vm.runInContext(`${appSource}\n;globalThis.__appTest = {
    defaultStateSnapshot() { return clone(defaultState); },
    mergeCloudStateWithLocalCandidates,
    normalizeEntry(entry, kind) {
      const normalized = clone(entry);
      normalizeEntryForState(normalized, kind, [], []);
      return normalized;
    },
    normalizePurchaseImportDocumentForState,
    parseCell9PurchaseInvoiceText,
    normalizeCell9PurchaseParsed,
    purchaseImportCalculatedTotals,
    syncCloudEntryLineChanges,
    verifyCloudPurchaseRows,
    setCloud(client, workspace, session = { user: { id: "11111111-1111-4111-8111-111111111111" } }) {
      cloudClient = client;
      cloudWorkspace = workspace;
      cloudSession = session;
      cloudRowSyncUnavailableReason = "";
    }
  };`, sandbox, { filename: "app.js" });
  return sandbox.__appTest;
}

function createCloudMock({ foundIds = [] } = {}) {
  const operations = [];
  return {
    operations,
    client: {
      from(table) {
        return {
          upsert(rows, options) {
            operations.push({ type: "upsert", table, rows, options });
            return Promise.resolve({ error: null });
          },
          delete() {
            const filters = [];
            const query = {
              eq(column, value) { filters.push(["eq", column, value]); return query; },
              in(column, values) {
                filters.push(["in", column, values]);
                operations.push({ type: "delete", table, filters: [...filters] });
                return Promise.resolve({ error: null });
              },
              gte(column, value) {
                filters.push(["gte", column, value]);
                operations.push({ type: "delete", table, filters: [...filters] });
                return Promise.resolve({ error: null });
              }
            };
            return query;
          },
          select(columns) {
            const filters = [];
            const query = {
              eq(column, value) { filters.push(["eq", column, value]); return query; },
              in(column, values) {
                filters.push(["in", column, values]);
                operations.push({ type: "select", table, columns, filters });
                return Promise.resolve({ data: values.filter(id => foundIds.includes(id)).map(id => ({ id })), error: null });
              }
            };
            return query;
          }
        };
      }
    }
  };
}

function purchase(id, total, lineCount = 1) {
  return {
    id,
    profileId: "gst-1",
    partyId: "party-1",
    number: `INV-${id}`,
    date: "2026-07-22",
    total,
    lines: Array.from({ length: lineCount }, (_, index) => ({
      itemId: "",
      itemName: `iPhone ${index + 1}`,
      hsn: "85171300",
      qty: 1,
      rate: 100,
      grossRate: 118,
      gstRate: 18
    }))
  };
}

test("purchase import processing step survives state normalization", () => {
  const app = createAppHarness();
  const normalized = app.normalizePurchaseImportDocumentForState({
    id: "doc-1",
    batchId: "batch-1",
    status: "extracting",
    processingStep: "Reading invoice details"
  });
  assert.equal(normalized.processingStep, "Reading invoice details");
  assert.equal(normalized.status, "extracting");
});

test("newer internal invoice cancellation wins over older paid cloud rows", () => {
  const app = createAppHarness();
  const cloud = app.defaultStateSnapshot();
  const local = app.defaultStateSnapshot();
  const paidSale = {
    ...purchase("internal-sale-1", 118),
    number: "NS/SO/26-27/099",
    status: "Paid",
    cancelled: false,
    updatedAt: "2026-07-23T08:00:00.000Z",
    createdAt: "2026-07-23T07:00:00.000Z",
    internalTransfer: { linkedPurchaseId: "internal-purchase-1" }
  };
  const paidPurchase = {
    ...purchase("internal-purchase-1", 118),
    number: paidSale.number,
    status: "Paid",
    cancelled: false,
    updatedAt: "2026-07-23T08:00:00.000Z",
    createdAt: "2026-07-23T07:00:00.000Z",
    internalTransfer: { linkedSaleId: paidSale.id }
  };
  cloud.sales = [structuredClone(paidSale)];
  cloud.purchases = [structuredClone(paidPurchase)];
  local.sales = [{
    ...structuredClone(paidSale),
    status: "Cancelled",
    cancelled: true,
    cancelledAt: "2026-07-23T09:00:00.000Z",
    updatedAt: "2026-07-23T09:00:00.000Z"
  }];
  local.purchases = [{
    ...structuredClone(paidPurchase),
    status: "Cancelled",
    reviewStatus: "Cancelled",
    cancelled: true,
    cancelledAt: "2026-07-23T09:00:00.000Z",
    updatedAt: "2026-07-23T09:00:00.000Z"
  }];

  const merged = app.mergeCloudStateWithLocalCandidates(cloud, [local]).state;
  assert.equal(merged.sales[0].status, "Cancelled");
  assert.equal(merged.sales[0].cancelled, true);
  assert.equal(merged.purchases[0].status, "Cancelled");
  assert.equal(merged.purchases[0].cancelled, true);
});

test("cancelled status always restores the cancellation flag", () => {
  const app = createAppHarness();
  const normalized = app.normalizeEntry({
    id: "sale-cancelled",
    status: "Cancelled",
    cancelled: false,
    lines: []
  }, "sale");
  assert.equal(normalized.cancelled, true);
  assert.equal(normalized.status, "Cancelled");
});

test("unchanged purchase lines do not rewrite the cloud table", async () => {
  const app = createAppHarness();
  const cloud = createCloudMock();
  app.setCloud(cloud.client, { id: "22222222-2222-4222-8222-222222222222" });
  const entry = purchase("same", 118);
  await app.syncCloudEntryLineChanges("billing_purchase_items", "purchase", [entry], [structuredClone(entry)], new Date().toISOString(), null);
  assert.deepEqual(cloud.operations, []);
});

test("changed purchase lines are upserted before obsolete lines are removed", async () => {
  const app = createAppHarness();
  const cloud = createCloudMock();
  app.setCloud(cloud.client, { id: "22222222-2222-4222-8222-222222222222" });
  const previous = purchase("changed", 236, 2);
  const current = purchase("changed", 118, 1);
  await app.syncCloudEntryLineChanges("billing_purchase_items", "purchase", [current], [previous], new Date().toISOString(), null);
  assert.equal(cloud.operations[0].type, "upsert");
  assert.equal(cloud.operations[0].rows.length, 1);
  assert.equal(cloud.operations[1].type, "delete");
  assert.ok(cloud.operations[1].filters.some(filter => filter[0] === "gte" && filter[2] === 1));
});

test("cloud verification returns only purchase IDs that are missing", async () => {
  const app = createAppHarness();
  const cloud = createCloudMock({ foundIds: ["purchase-1", "purchase-3"] });
  app.setCloud(cloud.client, { id: "22222222-2222-4222-8222-222222222222" });
  const entries = [purchase("purchase-1", 118), purchase("purchase-2", 118), purchase("purchase-3", 118)];
  const result = await app.verifyCloudPurchaseRows(entries);
  assert.equal(result.skipped, false);
  assert.equal(Array.from(result.missing, entry => entry.id).join(","), "purchase-2");
});

const cell9OcrCases = [
  {
    number: "CELL/750",
    itemRow: "| 1 |I PHONE:IPHONE 15 | Bl 49,576.2712,92,500.00]",
    color: "BLACK",
    taxRows: "| CGST 9.00% | | |S 208509, 32\n| SGST 9.00% | | [722309 321",
    totalRow: "| TOTAL I 5] 12,92,500.001",
    imeis: ["350795422226408", "350795422281791", "350795422310202", "350795422317165", "350795422410267"]
  },
  {
    number: "CELL/749",
    itemRow: "| 1 |I PHONE:IPHONE 15 | 5B] 49,576.2712,92,500.001",
    color: "BLACK",
    taxRows: "| CGST 9.00% | | L_26W300.32|\n| SGST 9.00% | | E277 3099821",
    totalRow: "| TOTAL 51] 12,92,500.00]",
    imeis: ["350795421647570", "350795421856965", "350795421934887", "350795422089293", "350795422144429"]
  },
  {
    number: "CELL/751",
    itemRow: "| 1 |I PHONE:IPHONE 15 [MEINAT, 576.27 | 2, 92 50000",
    color: "BLUE",
    taxRows: "| CGST 9.00% | | |_229309.32|\n| SGST 9.00% | =| d= 22 S090",
    totalRow: "| TOTAL I 51) 12,92, 500200]",
    imeis: ["350795429134399", "350795429446967", "354196717262628", "354196717472839", "354196717594723"]
  },
  {
    number: "CELL/752",
    itemRow: "| 1 |I PHONE:IPHONE 15 | B| 49,576.2712,92,500.00]",
    color: "BLUE",
    taxRows: "| CGST 9.00% | | | 28300. 32 |\n| SGST 9.00% | | 77, 309.32",
    totalRow: "| TOTAL [BN 5] |2,92,500.00|",
    imeis: ["354196717658841", "359641634210882", "359641634373979", "359641638125771", "359641638804755"]
  }
];

test("Cell9 OCR profile consistently reads all four photographed invoices", () => {
  const app = createAppHarness();
  cell9OcrCases.forEach(invoice => {
    const ocrText = `
      MOBILE STORE GSTIN: 37AJDPM5524D1ZF
      TAX INVOICE
      | SKANDA DIGITALS BILLNO:${invoice.number} |
      |GST : 37BSFPB1088P1ZD |
      | CHITTOOR DATE:20/07/2026 |
      | SNO DESCRIPTION QTY RATE AMOUNT |
      ${invoice.itemRow}
      | | 128GB ${invoice.color} | | | |
      ${invoice.imeis.map(imei => `| 1${imei} | | | |`).join("\n")}
      ${invoice.taxRows}
      ${invoice.totalRow}
      | RUPEES: Two lakh ninety two thousand five hundred |
      | only. |
    `;
    const parsed = app.parseCell9PurchaseInvoiceText(ocrText, `${invoice.number.replace("/", "-")}.jpeg`);
    assert.equal(parsed.invoiceNumber, invoice.number);
    assert.equal(parsed.invoiceDate, "2026-07-20");
    assert.equal(parsed.buyerGstin, "37BSFPB1088P1ZD");
    assert.equal(parsed.taxable, 247881.35);
    assert.equal(parsed.extractedTaxes.cgst, 22309.32);
    assert.equal(parsed.extractedTaxes.sgst, 22309.32);
    assert.equal(parsed.gst, 44618.64);
    assert.equal(parsed.roundOff, 0);
    assert.equal(parsed.total, 292500);
    assert.equal(app.purchaseImportCalculatedTotals(parsed).total, 292500);
    assert.equal(parsed.lines[0].name, "iPhone 15 128GB");
    assert.equal(parsed.lines[0].qty, 5);
    assert.equal(parsed.lines[0].rate, 49576.27);
    assert.equal(parsed.lines[0].grossRate, 58500);
    assert.deepEqual(Array.from(parsed.lines[0].imeiNumbers.split("\n")), invoice.imeis);
  });
});

test("Cell9 profile replaces inconsistent cloud totals with OCR-validated values", () => {
  const app = createAppHarness();
  const invoice = cell9OcrCases[0];
  const ocrText = `
    MOBILE STORE GSTIN: 37AJDPM5524D1ZF
    | SKANDA DIGITALS BILLNO:${invoice.number} |
    |GST : 37BSFPB1088P1ZD |
    | CHITTOOR DATE:20/07/2026 |
    ${invoice.itemRow}
    | | 128GB ${invoice.color} | | | |
    ${invoice.imeis.map(imei => `| 1${imei} |`).join("\n")}
    ${invoice.totalRow}
    RUPEES: Two lakh ninety two thousand five hundred only.
  `;
  const normalized = app.normalizeCell9PurchaseParsed({
    supplierName: "CELL9 MOBILE STORE",
    supplierGstin: "37AJDPM5524D1ZF",
    invoiceNumber: "CELL/750",
    invoiceDate: "2026-07-20",
    taxable: 250621.36,
    gst: 45111.64,
    total: 295733,
    extractedTaxes: { taxable: 250621.36, cgst: 22555.82, sgst: 22555.82, igst: 0, gst: 45111.64, total: 295733 },
    lines: [{ name: "iPhone 15", hsn: "85171300", qty: 5, rate: 50124.27, gstRate: 18 }]
  }, ocrText, "CELL-750.jpeg");
  assert.equal(normalized.taxable, 247881.35);
  assert.equal(normalized.gst, 44618.64);
  assert.equal(normalized.roundOff, 0);
  assert.equal(normalized.total, 292500);
  assert.equal(normalized.lines[0].grossRate, 58500);
});
