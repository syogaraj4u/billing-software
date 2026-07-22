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
    normalizePurchaseImportDocumentForState,
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
