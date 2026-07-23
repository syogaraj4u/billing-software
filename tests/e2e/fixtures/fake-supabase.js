(() => {
  const now = new Date().toISOString();
  const workspace = {
    id: "22222222-2222-4222-8222-222222222222",
    owner_id: "11111111-1111-4111-8111-111111111111",
    name: "Automated Test Workspace",
    member_emails: [],
    created_at: now,
    updated_at: now,
    data: {
      settings: { activeProfileId: "gst-1" },
      items: [],
      parties: [{
        id: "party-browser-test",
        name: "Browser Test Buyer",
        type: "Customer",
        gstin: "29AAQFH1863E1Z4",
        phone: "",
        place: "Bengaluru",
        address: "Bengaluru, Karnataka - 560016"
      }],
      sales: [],
      creditNotes: [],
      purchases: [],
      purchaseReturns: [],
      purchaseOrders: [],
      paymentSources: [],
      bankTransactions: [],
      tallySyncRuns: [],
      purchaseImportBatches: [],
      purchaseImportDocuments: [],
      deletionTombstones: []
    }
  };
  let session = null;
  const authListeners = new Set();
  const operations = [];

  function response(data = null, error = null) {
    return { data, error };
  }

  class Query {
    constructor(table) {
      this.table = table;
      this.operation = "select";
      this.payload = null;
      this.filters = [];
      this.singleRow = false;
    }

    select() { return this; }
    order() { return this; }
    range() { return this; }
    eq(column, value) { this.filters.push(["eq", column, value]); return this; }
    in(column, value) { this.filters.push(["in", column, value]); return this; }
    gte(column, value) { this.filters.push(["gte", column, value]); return this; }
    lt(column, value) { this.filters.push(["lt", column, value]); return this; }
    limit() { return this; }
    maybeSingle() { this.singleRow = true; return this; }
    single() { this.singleRow = true; return this; }
    insert(payload) { this.operation = "insert"; this.payload = payload; return this; }
    update(payload) { this.operation = "update"; this.payload = payload; return this; }
    upsert(payload) { this.operation = "upsert"; this.payload = payload; return this; }
    delete() { this.operation = "delete"; return this; }

    execute() {
      operations.push({
        table: this.table,
        operation: this.operation,
        filters: this.filters,
        payload: this.payload
      });
      if (this.table === "billing_cloud_workspaces") {
        if (this.operation === "update" && this.payload) Object.assign(workspace, this.payload);
        if (this.operation === "insert" && this.payload) Object.assign(workspace, this.payload);
        workspace.updated_at = workspace.updated_at || new Date().toISOString();
        return response(this.singleRow ? structuredClone(workspace) : [structuredClone(workspace)]);
      }
      return response(this.singleRow ? null : []);
    }

    then(resolve, reject) {
      return Promise.resolve(this.execute()).then(resolve, reject);
    }
  }

  const client = {
    auth: {
      async getSession() {
        return response({ session });
      },
      onAuthStateChange(callback) {
        authListeners.add(callback);
        return { data: { subscription: { unsubscribe: () => authListeners.delete(callback) } } };
      },
      async signInWithPassword({ email, password }) {
        if (!email || !password) return response(null, { message: "Enter email and password" });
        session = {
          access_token: "browser-test-token",
          user: {
            id: "11111111-1111-4111-8111-111111111111",
            email
          }
        };
        return response({ session, user: session.user });
      },
      async signOut() {
        session = null;
        for (const listener of authListeners) listener("SIGNED_OUT", null);
        return response(null);
      },
      async resetPasswordForEmail() {
        return response({});
      },
      async updateUser() {
        return response({ user: session?.user || null });
      }
    },
    from(table) {
      return new Query(table);
    },
    functions: {
      async invoke() {
        return response(null, { message: "Not available in browser tests" });
      }
    },
    storage: {
      from() {
        return {
          async upload() { return response({ path: "browser-test" }); },
          async createSignedUrl() { return response({ signedUrl: "about:blank" }); },
          async download() { return response(new Blob()); },
          async remove() { return response([]); }
        };
      }
    }
  };

  window.__BILLING_E2E_CLOUD__ = { operations, workspace };
  window.supabase = { createClient: () => client };
})();
