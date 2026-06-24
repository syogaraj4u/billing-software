const STORAGE_KEY = "billingSoftware.v1";
const GST_PROFILE_VERSION = "2026-06-24-official-8-gst";

const OFFICIAL_GST_PROFILES = [
  {
    id: "gst-1",
    label: "Nirvana Solutions",
    businessName: "Nirvana Solutions",
    legalName: "SENRAYAN YOGARAJ",
    gstin: "37DPPPS0884K2ZX",
    phone: "",
    email: "",
    address: "1st Floor, 21-10-518/a, SivaSri Nilayam, Kranthi Nagar, Near Narayana English Medium School, Jeevakona, Tirupati, Tirupati, Andhra Pradesh - 517507",
    state: "Andhra Pradesh",
    nextSaleNo: 1,
    nextPurchaseNo: 1
  },
  {
    id: "gst-2",
    label: "Kala Nirvana",
    businessName: "Kala Nirvana",
    legalName: "S LAKSHMI",
    gstin: "37ALHPV7427Q1Z1",
    phone: "",
    email: "",
    address: "Ground floor, 21-10-518/A, Sivasri Nilayam, Kranthi Nagar, Near Narayana School, Jeevakona, Tirupati, Tirupati, Andhra Pradesh - 517507",
    state: "Andhra Pradesh",
    nextSaleNo: 1,
    nextPurchaseNo: 1
  },
  {
    id: "gst-3",
    label: "HARIHARA MOBILES",
    businessName: "HARIHARA MOBILES",
    legalName: "NAGARAJU PERUMAL",
    gstin: "37BRSPN8162L1ZT",
    phone: "",
    email: "",
    address: "GROUND FLOOR, 21-8-267, SLV COMPLEX, RAGHAVENDRA NAGAR, Near Raghavendra Nagar Auto Stand, SATHYANARAYANA PURAM, Tirupati, Tirupati, Andhra Pradesh - 517507",
    state: "Andhra Pradesh",
    nextSaleNo: 1,
    nextPurchaseNo: 1
  },
  {
    id: "gst-4",
    label: "Shiva Nandi Communications",
    businessName: "Shiva Nandi Communications",
    legalName: "SELVASOBIA N",
    gstin: "37BRVPN4137L1ZZ",
    phone: "",
    email: "",
    address: "2nd Floor, 21-10-518/A, SivaSri Illam, Kranthi Nagar, Opposite to Gurukrupa Vidyamandir, Jeevakona, Tirupati, Tirupati, Andhra Pradesh - 517507",
    state: "Andhra Pradesh",
    nextSaleNo: 1,
    nextPurchaseNo: 1
  },
  {
    id: "gst-5",
    label: "Skanda Digitals",
    businessName: "Skanda Digitals",
    legalName: "B Yugandhar",
    gstin: "37BSFPB1088P1ZD",
    phone: "",
    email: "",
    address: "Ground Floor, 3-29, Govinda Nagar, Near S.N. Puram, Tirupati, Chittoor, Andhra Pradesh - 517501",
    state: "Andhra Pradesh",
    nextSaleNo: 1,
    nextPurchaseNo: 1
  },
  {
    id: "gst-6",
    label: "Khairanya Infotech",
    businessName: "Khairanya Infotech",
    legalName: "PAGADALA SANDHYA RANI",
    gstin: "37FADPS7142R1ZS",
    phone: "",
    email: "",
    address: "Ground Floor, 22-8-97/2, Upadyay Nagar 11th Cross, Beside Ramulavari Temple, Tirupati, Tirupati, Andhra Pradesh - 517507",
    state: "Andhra Pradesh",
    nextSaleNo: 1,
    nextPurchaseNo: 1
  },
  {
    id: "gst-7",
    label: "LAKSHMI JEYAPANDI TRADERS",
    businessName: "LAKSHMI JEYAPANDI TRADERS",
    legalName: "LAKSHMI",
    gstin: "33BKJPL1188C1ZD",
    phone: "",
    email: "",
    address: "Ground floor, No 5/3, Lakshmi Jeyapandi Traders, Grace Garden 4th Lane, Near KPB Water Supply, Royapuram, Chennai, Chennai, Tamil Nadu - 600021",
    state: "Tamil Nadu",
    nextSaleNo: 1,
    nextPurchaseNo: 1
  },
  {
    id: "gst-8",
    label: "SRI LAKSHMI DIGITALS",
    businessName: "SRI LAKSHMI DIGITALS",
    legalName: "BACHLA DURGAPRASAD",
    gstin: "37CGUPD8962N1ZB",
    phone: "",
    email: "",
    address: "10-8-349, Prakasam Road, Near Om Sakthi Temple, Nagari, Nagari, Chittoor, Andhra Pradesh - 517590",
    state: "Andhra Pradesh",
    nextSaleNo: 1,
    nextPurchaseNo: 1
  }
];

function createDefaultProfiles() {
  return clone(OFFICIAL_GST_PROFILES);
}

const defaultState = {
  settings: {
    currency: "Rs.",
    activeProfileId: "gst-1",
    profiles: createDefaultProfiles()
  },
  items: [
    { id: uid(), name: "Sample Product", hsn: "85171300", gstRate: 18, saleRate: 1000, purchaseRate: 850, openingStock: 10, minStock: 2 }
  ],
  parties: [
    { id: uid(), name: "Cash Customer", type: "Customer", gstin: "", phone: "", place: "Local", address: "" },
    { id: uid(), name: "Default Supplier", type: "Supplier", gstin: "", phone: "", place: "Local", address: "" }
  ],
  sales: [],
  purchases: []
};

let state = loadState();
let currentView = "dashboard";
let entryMode = "sale";
let editingEntryId = null;
let editingItemId = null;
let editingPartyId = null;
let activeReport = "summary";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return normalizeState(clone(defaultState));
  try {
    return normalizeState({ ...clone(defaultState), ...JSON.parse(saved) });
  } catch {
    return normalizeState(clone(defaultState));
  }
}

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function normalizeState(value) {
  value.settings = value.settings || {};
  const profiles = createDefaultProfiles();
  if (Array.isArray(value.settings.profiles)) {
    value.settings.profiles.slice(0, 8).forEach((profile, index) => {
      profiles[index] = { ...profiles[index], ...profile, id: profile.id || `gst-${index + 1}` };
    });
  } else {
    profiles[0] = {
      ...profiles[0],
      businessName: value.settings.businessName || profiles[0].businessName,
      gstin: value.settings.gstin || "",
      phone: value.settings.phone || "",
      email: value.settings.email || "",
      address: value.settings.address || "",
      state: value.settings.state || profiles[0].state,
      nextSaleNo: num(value.settings.nextSaleNo) || 1,
      nextPurchaseNo: num(value.settings.nextPurchaseNo) || 1
    };
  }
  if (value.settings.gstProfilesLoadedVersion !== GST_PROFILE_VERSION) {
    OFFICIAL_GST_PROFILES.forEach((official, index) => {
      profiles[index] = {
        ...official,
        nextSaleNo: num(profiles[index]?.nextSaleNo) || official.nextSaleNo,
        nextPurchaseNo: num(profiles[index]?.nextPurchaseNo) || official.nextPurchaseNo
      };
    });
  }
  value.settings = {
    currency: value.settings.currency || "Rs.",
    activeProfileId: value.settings.activeProfileId || profiles[0].id,
    profiles,
    gstProfilesLoadedVersion: GST_PROFILE_VERSION
  };
  if (!profiles.some(profile => profile.id === value.settings.activeProfileId)) {
    value.settings.activeProfileId = profiles[0].id;
  }
  value.items = Array.isArray(value.items) ? value.items : [];
  value.parties = Array.isArray(value.parties) ? value.parties : [];
  value.sales = Array.isArray(value.sales) ? value.sales : [];
  value.purchases = Array.isArray(value.purchases) ? value.purchases : [];
  [...value.sales, ...value.purchases].forEach(entry => {
    if (!entry.profileId) entry.profileId = value.settings.activeProfileId;
  });
  return value;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function money(value) {
  const symbol = state.settings.currency || "Rs.";
  return `${symbol}${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function activeProfile() {
  return profileById(state.settings.activeProfileId);
}

function profileById(id) {
  return state.settings.profiles.find(profile => profile.id === id) || state.settings.profiles[0];
}

function profileName(id) {
  const profile = profileById(id);
  const gst = profile.gstin ? ` - ${profile.gstin}` : "";
  return `${profile.label || profile.businessName}${gst}`;
}

function profileOptions(selected = state.settings.activeProfileId) {
  return state.settings.profiles.map(profile => `
    <option value="${profile.id}" ${profile.id === selected ? "selected" : ""}>${escapeHtml(profileName(profile.id))}</option>
  `).join("");
}

function num(value) {
  return Number(value || 0);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(node.timer);
  node.timer = setTimeout(() => node.classList.remove("show"), 2300);
}

function entryList(kind) {
  return kind === "sale" ? state.sales : state.purchases;
}

function entryPrefix(kind) {
  return kind === "sale" ? "SALE" : "PUR";
}

function nextEntryNumber(kind, profileId = state.settings.activeProfileId) {
  const key = kind === "sale" ? "nextSaleNo" : "nextPurchaseNo";
  const profile = profileById(profileId);
  return `${entryPrefix(kind)}-${String(profile[key] || 1).padStart(4, "0")}`;
}

function totals(lines) {
  return lines.reduce((acc, line) => {
    const taxable = num(line.qty) * num(line.rate);
    const gst = taxable * num(line.gstRate) / 100;
    acc.taxable += taxable;
    acc.gst += gst;
    acc.total += taxable + gst;
    return acc;
  }, { taxable: 0, gst: 0, total: 0 });
}

function stockForItem(itemId) {
  const item = state.items.find(row => row.id === itemId);
  let stock = num(item?.openingStock);
  state.purchases.forEach(entry => entry.lines.forEach(line => {
    if (line.itemId === itemId) stock += num(line.qty);
  }));
  state.sales.forEach(entry => entry.lines.forEach(line => {
    if (line.itemId === itemId) stock -= num(line.qty);
  }));
  return stock;
}

function partyName(id) {
  return state.parties.find(row => row.id === id)?.name || "Unknown Party";
}

function itemName(id) {
  return state.items.find(row => row.id === id)?.name || "Unknown Item";
}

function init() {
  $("#todayLabel").textContent = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "short", year: "numeric" });
  bindEvents();
  renderAll();
  registerServiceWorker();
  if (window.lucide) lucide.createIcons();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

function bindEvents() {
  $$(".nav-tab").forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));
  $$("[data-view-link]").forEach(button => button.addEventListener("click", () => showView(button.dataset.viewLink)));
  $("#quickSaleBtn").addEventListener("click", () => openEntry("sale"));
  $("#newSaleBtn").addEventListener("click", () => openEntry("sale"));
  $("#newPurchaseBtn").addEventListener("click", () => openEntry("purchase"));
  $("#purchaseInvoiceInput").addEventListener("change", handlePurchaseInvoiceUpload);
  $("#newItemBtn").addEventListener("click", () => openItem());
  $("#newPartyBtn").addEventListener("click", () => openParty());
  $("#addLineBtn").addEventListener("click", () => addLineRow());
  $("#entryForm").addEventListener("submit", saveEntry);
  $("#itemForm").addEventListener("submit", saveItem);
  $("#partyForm").addEventListener("submit", saveParty);
  $("#saveSettingsBtn").addEventListener("click", saveSettings);
  $("#activeProfileSelect").addEventListener("change", event => {
    state.settings.activeProfileId = event.target.value;
    saveState();
    renderAll();
    toast("GST profile changed");
  });
  $("#settingsForm").elements.profileId.addEventListener("change", renderSettings);
  $("#backupBtn").addEventListener("click", exportBackup);
  $("#restoreInput").addEventListener("change", importBackup);
  $("#closeInvoiceBtn").addEventListener("click", () => $("#invoiceDialog").close());
  $("#printInvoiceBtn").addEventListener("click", () => window.print());
  $("#printReportBtn").addEventListener("click", () => window.print());
  $("#reportFrom").addEventListener("change", renderReport);
  $("#reportTo").addEventListener("change", renderReport);
  $$(".segmented button").forEach(button => button.addEventListener("click", () => {
    activeReport = button.dataset.report;
    $$(".segmented button").forEach(item => item.classList.toggle("active", item === button));
    renderReport();
  }));
}

function showView(view) {
  currentView = view;
  $$(".nav-tab").forEach(button => button.classList.toggle("active", button.dataset.view === view));
  $$(".view").forEach(section => section.classList.remove("active"));
  $(`#${view}View`).classList.add("active");
  $("#viewTitle").textContent = {
    dashboard: "Dashboard",
    sales: "Sales",
    purchases: "Purchases",
    items: "Items",
    parties: "Parties",
    reports: "Reports",
    settings: "Settings"
  }[view];
  renderAll();
}

function renderAll() {
  renderProfileSelectors();
  renderDashboard();
  renderEntries("sale");
  renderEntries("purchase");
  renderItems();
  renderParties();
  renderSettings();
  renderReport();
  if (window.lucide) lucide.createIcons();
}

function renderProfileSelectors() {
  $("#activeProfileSelect").innerHTML = profileOptions(state.settings.activeProfileId);
}

function renderDashboard() {
  const salesTotal = state.sales.reduce((sum, entry) => sum + entry.total, 0);
  const purchaseTotal = state.purchases.reduce((sum, entry) => sum + entry.total, 0);
  const stockValue = state.items.reduce((sum, item) => sum + stockForItem(item.id) * num(item.purchaseRate), 0);
  const receivable = state.sales.filter(entry => entry.status !== "Paid").reduce((sum, entry) => sum + entry.total, 0);
  $("#metricSales").textContent = money(salesTotal);
  $("#metricPurchases").textContent = money(purchaseTotal);
  $("#metricStock").textContent = money(stockValue);
  $("#metricReceivable").textContent = money(receivable);

  const combined = [
    ...state.sales.map(entry => ({ ...entry, kind: "Sale" })),
    ...state.purchases.map(entry => ({ ...entry, kind: "Purchase" }))
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);
  $("#recentEntries").innerHTML = combined.length ? combined.map(entry => `
    <tr><td>${entry.date}</td><td>${entry.kind}</td><td>${escapeHtml(entry.number)}</td><td>${escapeHtml(profileName(entry.profileId))}</td><td>${escapeHtml(partyName(entry.partyId))}</td><td class="num">${money(entry.total)}</td></tr>
  `).join("") : emptyRow(6, "No entries yet");

  const low = state.items.map(item => ({ ...item, stock: stockForItem(item.id) })).filter(item => item.stock <= num(item.minStock));
  $("#lowStockRows").innerHTML = low.length ? low.map(item => `
    <tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.hsn)}</td><td class="num">${item.stock}</td><td class="num">${num(item.minStock)}</td></tr>
  `).join("") : emptyRow(4, "No low stock items");
}

function renderEntries(kind) {
  const rows = entryList(kind).sort((a, b) => b.date.localeCompare(a.date)).map(entry => `
    <tr>
      <td>${entry.date}</td>
      <td>${escapeHtml(entry.number)}</td>
      <td>${escapeHtml(profileName(entry.profileId))}</td>
      <td>${escapeHtml(partyName(entry.partyId))}</td>
      <td><span class="badge ${entry.status === "Unpaid" ? "warn" : ""}">${escapeHtml(entry.status)}</span></td>
      <td class="num">${money(entry.taxable)}</td>
      <td class="num">${money(entry.gst)}</td>
      <td class="num">${money(entry.total)}</td>
      <td>
        <div class="row-actions">
          ${kind === "sale" ? `<button class="mini-btn" title="Invoice" onclick="showInvoice('${entry.id}', '${kind}')"><i data-lucide="file-text"></i></button>` : ""}
          <button class="mini-btn" title="Edit" onclick="openEntry('${kind}', '${entry.id}')"><i data-lucide="pencil"></i></button>
          <button class="mini-btn" title="Delete" onclick="deleteEntry('${kind}', '${entry.id}')"><i data-lucide="trash-2"></i></button>
        </div>
      </td>
    </tr>
  `).join("");
  $(kind === "sale" ? "#salesRows" : "#purchaseRows").innerHTML = rows || emptyRow(9, kind === "sale" ? "No sales entries" : "No purchase entries");
}

function renderItems() {
  $("#itemRows").innerHTML = state.items.map(item => `
    <tr>
      <td>${escapeHtml(item.name)}</td>
      <td>${escapeHtml(item.hsn)}</td>
      <td>${num(item.gstRate)}%</td>
      <td class="num">${money(item.saleRate)}</td>
      <td class="num">${money(item.purchaseRate)}</td>
      <td class="num">${stockForItem(item.id)}</td>
      <td><div class="row-actions">
        <button class="mini-btn" title="Edit" onclick="openItem('${item.id}')"><i data-lucide="pencil"></i></button>
        <button class="mini-btn" title="Delete" onclick="deleteItem('${item.id}')"><i data-lucide="trash-2"></i></button>
      </div></td>
    </tr>
  `).join("") || emptyRow(7, "No items");
}

function renderParties() {
  $("#partyRows").innerHTML = state.parties.map(party => `
    <tr>
      <td>${escapeHtml(party.name)}</td>
      <td>${escapeHtml(party.type)}</td>
      <td>${escapeHtml(party.gstin)}</td>
      <td>${escapeHtml(party.phone)}</td>
      <td>${escapeHtml(party.place)}</td>
      <td><div class="row-actions">
        <button class="mini-btn" title="Edit" onclick="openParty('${party.id}')"><i data-lucide="pencil"></i></button>
        <button class="mini-btn" title="Delete" onclick="deleteParty('${party.id}')"><i data-lucide="trash-2"></i></button>
      </div></td>
    </tr>
  `).join("") || emptyRow(6, "No parties");
}

function renderSettings() {
  const form = $("#settingsForm");
  form.elements.profileId.innerHTML = profileOptions(form.elements.profileId.value || state.settings.activeProfileId);
  const profile = profileById(form.elements.profileId.value);
  ["businessName", "legalName", "gstin", "phone", "email", "address", "state", "nextSaleNo", "nextPurchaseNo"].forEach(key => {
    form.elements[key].value = profile?.[key] ?? "";
  });
  form.elements.currency.value = state.settings.currency || "Rs.";
}

function emptyRow(colspan, label) {
  return `<tr><td colspan="${colspan}" class="empty-row">${label}</td></tr>`;
}

function partyOptions(kind, selected = "") {
  const wanted = kind === "sale" ? ["Customer", "Both"] : ["Supplier", "Both"];
  const choices = state.parties.filter(party => wanted.includes(party.type));
  return choices.map(party => `<option value="${party.id}" ${party.id === selected ? "selected" : ""}>${escapeHtml(party.name)}</option>`).join("");
}

function itemOptions(selected = "") {
  return state.items.map(item => `<option value="${item.id}" ${item.id === selected ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("");
}

function openEntry(kind, id = null, draft = null) {
  entryMode = kind;
  editingEntryId = id;
  const entry = id ? entryList(kind).find(row => row.id === id) : null;
  const source = entry || draft;
  const form = $("#entryForm");
  form.reset();
  $("#entryKindLabel").textContent = kind === "sale" ? "Sales Entry" : "Purchase Entry";
  $("#entryDialogTitle").textContent = id ? "Edit Entry" : "New Entry";
  form.elements.date.value = source?.date || today();
  form.elements.number.value = source?.number || nextEntryNumber(kind, source?.profileId || state.settings.activeProfileId);
  form.elements.profileId.innerHTML = profileOptions(source?.profileId || state.settings.activeProfileId);
  form.elements.profileId.onchange = () => {
    if (!editingEntryId) form.elements.number.value = nextEntryNumber(kind, form.elements.profileId.value);
  };
  form.elements.status.value = source?.status || "Paid";
  form.elements.notes.value = source?.notes || "";
  form.elements.partyId.innerHTML = partyOptions(kind, source?.partyId);
  $("#lineRows").innerHTML = "";
  (source?.lines?.length ? source.lines : [blankLine(kind)]).forEach(line => addLineRow(line));
  updateEntryTotals();
  $("#entryDialog").showModal();
  if (window.lucide) lucide.createIcons();
}

function blankLine(kind) {
  const item = state.items[0];
  return {
    itemId: item?.id || "",
    qty: 1,
    rate: kind === "sale" ? num(item?.saleRate) : num(item?.purchaseRate),
    gstRate: num(item?.gstRate)
  };
}

function addLineRow(line = blankLine(entryMode)) {
  const row = document.createElement("div");
  row.className = "line-row";
  row.innerHTML = `
    <label>Item<select class="line-item">${itemOptions(line.itemId)}</select></label>
    <label>Qty<input class="line-qty" type="number" min="0" step="0.01" value="${num(line.qty)}"></label>
    <label>Rate<input class="line-rate" type="number" min="0" step="0.01" value="${num(line.rate)}"></label>
    <label>GST %<input class="line-gst" type="number" min="0" step="0.01" value="${num(line.gstRate)}"></label>
    <label>Amount<input class="line-amount" disabled></label>
    <button type="button" class="mini-btn" title="Remove"><i data-lucide="x"></i></button>
  `;
  row.querySelector(".line-item").addEventListener("change", event => {
    const item = state.items.find(candidate => candidate.id === event.target.value);
    row.querySelector(".line-rate").value = entryMode === "sale" ? num(item?.saleRate) : num(item?.purchaseRate);
    row.querySelector(".line-gst").value = num(item?.gstRate);
    updateEntryTotals();
  });
  row.querySelectorAll("input, select").forEach(input => input.addEventListener("input", updateEntryTotals));
  row.querySelector("button").addEventListener("click", () => {
    row.remove();
    if (!$("#lineRows").children.length) addLineRow();
    updateEntryTotals();
  });
  $("#lineRows").appendChild(row);
  updateEntryTotals();
  if (window.lucide) lucide.createIcons();
}

function collectLines() {
  return $$(".line-row").map(row => ({
    itemId: row.querySelector(".line-item").value,
    qty: num(row.querySelector(".line-qty").value),
    rate: num(row.querySelector(".line-rate").value),
    gstRate: num(row.querySelector(".line-gst").value)
  })).filter(line => line.itemId && line.qty > 0);
}

function updateEntryTotals() {
  $$(".line-row").forEach(row => {
    const amount = num(row.querySelector(".line-qty").value) * num(row.querySelector(".line-rate").value);
    row.querySelector(".line-amount").value = money(amount);
  });
  const calculated = totals(collectLines());
  $("#entryTaxable").textContent = money(calculated.taxable);
  $("#entryGst").textContent = money(calculated.gst);
  $("#entryTotal").textContent = money(calculated.total);
}

function saveEntry(event) {
  event.preventDefault();
  const form = $("#entryForm");
  const lines = collectLines();
  if (!lines.length) {
    toast("Add at least one item");
    return;
  }
  const calculated = totals(lines);
  const entry = {
    id: editingEntryId || uid(),
    date: form.elements.date.value,
    number: form.elements.number.value.trim(),
    profileId: form.elements.profileId.value,
    partyId: form.elements.partyId.value,
    status: form.elements.status.value,
    notes: form.elements.notes.value.trim(),
    lines,
    ...calculated
  };
  const list = entryList(entryMode);
  const index = list.findIndex(row => row.id === entry.id);
  if (index >= 0) list[index] = entry;
  else {
    list.push(entry);
    const key = entryMode === "sale" ? "nextSaleNo" : "nextPurchaseNo";
    const profile = profileById(entry.profileId);
    profile[key] = num(profile[key]) + 1;
  }
  saveState();
  $("#entryDialog").close();
  renderAll();
  toast(entryMode === "sale" ? "Sale saved" : "Purchase saved");
}

function deleteEntry(kind, id) {
  if (!confirm("Delete this entry?")) return;
  const key = kind === "sale" ? "sales" : "purchases";
  state[key] = state[key].filter(row => row.id !== id);
  saveState();
  renderAll();
  toast("Entry deleted");
}

function openItem(id = null) {
  editingItemId = id;
  const item = state.items.find(row => row.id === id);
  const form = $("#itemForm");
  form.reset();
  ["name", "hsn", "gstRate", "saleRate", "purchaseRate", "openingStock", "minStock"].forEach(key => {
    form.elements[key].value = item?.[key] ?? "";
  });
  $("#itemDialog").showModal();
  if (window.lucide) lucide.createIcons();
}

function saveItem(event) {
  event.preventDefault();
  const form = $("#itemForm");
  const item = {
    id: editingItemId || uid(),
    name: form.elements.name.value.trim(),
    hsn: form.elements.hsn.value.trim(),
    gstRate: num(form.elements.gstRate.value),
    saleRate: num(form.elements.saleRate.value),
    purchaseRate: num(form.elements.purchaseRate.value),
    openingStock: num(form.elements.openingStock.value),
    minStock: num(form.elements.minStock.value)
  };
  const index = state.items.findIndex(row => row.id === item.id);
  if (index >= 0) state.items[index] = item;
  else state.items.push(item);
  saveState();
  $("#itemDialog").close();
  renderAll();
  toast("Item saved");
}

function deleteItem(id) {
  const used = [...state.sales, ...state.purchases].some(entry => entry.lines.some(line => line.itemId === id));
  if (used) {
    toast("Item is used in entries");
    return;
  }
  if (!confirm("Delete this item?")) return;
  state.items = state.items.filter(row => row.id !== id);
  saveState();
  renderAll();
  toast("Item deleted");
}

function openParty(id = null) {
  editingPartyId = id;
  const party = state.parties.find(row => row.id === id);
  const form = $("#partyForm");
  form.reset();
  ["name", "type", "gstin", "phone", "place", "address"].forEach(key => {
    form.elements[key].value = party?.[key] ?? (key === "type" ? "Customer" : "");
  });
  $("#partyDialog").showModal();
  if (window.lucide) lucide.createIcons();
}

function saveParty(event) {
  event.preventDefault();
  const form = $("#partyForm");
  const party = {
    id: editingPartyId || uid(),
    name: form.elements.name.value.trim(),
    type: form.elements.type.value,
    gstin: form.elements.gstin.value.trim(),
    phone: form.elements.phone.value.trim(),
    place: form.elements.place.value.trim(),
    address: form.elements.address.value.trim()
  };
  const index = state.parties.findIndex(row => row.id === party.id);
  if (index >= 0) state.parties[index] = party;
  else state.parties.push(party);
  saveState();
  $("#partyDialog").close();
  renderAll();
  toast("Party saved");
}

function deleteParty(id) {
  const used = [...state.sales, ...state.purchases].some(entry => entry.partyId === id);
  if (used) {
    toast("Party is used in entries");
    return;
  }
  if (!confirm("Delete this party?")) return;
  state.parties = state.parties.filter(row => row.id !== id);
  saveState();
  renderAll();
  toast("Party deleted");
}

function saveSettings(event) {
  event.preventDefault();
  const form = $("#settingsForm");
  const profile = profileById(form.elements.profileId.value);
  profile.businessName = form.elements.businessName.value.trim();
  profile.label = profile.businessName || profile.label;
  profile.legalName = form.elements.legalName.value.trim();
  profile.gstin = form.elements.gstin.value.trim();
  profile.phone = form.elements.phone.value.trim();
  profile.email = form.elements.email.value.trim();
  profile.address = form.elements.address.value.trim();
  profile.state = form.elements.state.value.trim();
  profile.nextSaleNo = Math.max(1, num(form.elements.nextSaleNo.value));
  profile.nextPurchaseNo = Math.max(1, num(form.elements.nextPurchaseNo.value));
  state.settings.currency = form.elements.currency.value.trim() || "Rs.";
  state.settings.activeProfileId = profile.id;
  saveState();
  renderAll();
  toast("GST profile saved");
}

function showInvoice(id, kind) {
  const entry = entryList(kind).find(row => row.id === id);
  const party = state.parties.find(row => row.id === entry.partyId) || {};
  const settings = profileById(entry.profileId);
  $("#invoicePrintArea").innerHTML = `
    <div class="invoice-sheet">
      <div class="invoice-top">
        <div>
          <h2>${escapeHtml(settings.businessName)}</h2>
          <p>${settings.legalName ? `Legal Name: ${escapeHtml(settings.legalName)}` : ""}</p>
          <p>${escapeHtml(settings.address)}</p>
          <p>${escapeHtml(settings.phone)} ${settings.email ? ` | ${escapeHtml(settings.email)}` : ""}</p>
          <p>${settings.gstin ? `GSTIN: ${escapeHtml(settings.gstin)}` : ""}</p>
          <p>${settings.state ? `State: ${escapeHtml(settings.state)}` : ""}</p>
        </div>
        <div class="invoice-meta">
          <h2>Tax Invoice</h2>
          <p>No: ${escapeHtml(entry.number)}</p>
          <p>Date: ${entry.date}</p>
        </div>
      </div>
      <div class="invoice-party">
        <strong>Bill To</strong>
        <p>${escapeHtml(party.name || "")}</p>
        <p>${escapeHtml(party.address || party.place || "")}</p>
        <p>${party.gstin ? `GSTIN: ${escapeHtml(party.gstin)}` : ""}</p>
      </div>
      <table>
        <thead><tr><th>Item</th><th>HSN</th><th class="num">Qty</th><th class="num">Rate</th><th class="num">GST</th><th class="num">Amount</th></tr></thead>
        <tbody>
          ${entry.lines.map(line => {
            const item = state.items.find(row => row.id === line.itemId) || {};
            const taxable = num(line.qty) * num(line.rate);
            const gst = taxable * num(line.gstRate) / 100;
            return `<tr><td>${escapeHtml(item.name || itemName(line.itemId))}</td><td>${escapeHtml(item.hsn || "")}</td><td class="num">${num(line.qty)}</td><td class="num">${money(line.rate)}</td><td class="num">${num(line.gstRate)}%</td><td class="num">${money(taxable + gst)}</td></tr>`;
          }).join("")}
        </tbody>
      </table>
      <div class="invoice-total">
        <div><span>Taxable</span><span>${money(entry.taxable)}</span></div>
        <div><span>GST</span><span>${money(entry.gst)}</span></div>
        <div><strong>Total</strong><strong>${money(entry.total)}</strong></div>
      </div>
    </div>
  `;
  $("#invoiceDialog").showModal();
}

function renderReport() {
  const from = $("#reportFrom").value || "0000-01-01";
  const to = $("#reportTo").value || "9999-12-31";
  const inRange = entry => entry.date >= from && entry.date <= to;
  const sales = state.sales.filter(inRange);
  const purchases = state.purchases.filter(inRange);
  const output = $("#reportOutput");
  if (activeReport === "stock") {
    output.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Item</th><th>HSN</th><th class="num">Stock</th><th class="num">Purchase Rate</th><th class="num">Stock Value</th></tr></thead><tbody>
      ${state.items.map(item => {
        const stock = stockForItem(item.id);
        return `<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.hsn)}</td><td class="num">${stock}</td><td class="num">${money(item.purchaseRate)}</td><td class="num">${money(stock * num(item.purchaseRate))}</td></tr>`;
      }).join("") || emptyRow(5, "No stock")}
    </tbody></table></div>`;
    return;
  }
  if (activeReport === "gst") {
    const saleGst = sales.reduce((sum, entry) => sum + entry.gst, 0);
    const purchaseGst = purchases.reduce((sum, entry) => sum + entry.gst, 0);
    const rows = state.settings.profiles.map(profile => {
      const profileSales = sales.filter(entry => entry.profileId === profile.id);
      const profilePurchases = purchases.filter(entry => entry.profileId === profile.id);
      const outputGst = profileSales.reduce((sum, entry) => sum + entry.gst, 0);
      const inputGst = profilePurchases.reduce((sum, entry) => sum + entry.gst, 0);
      return `<tr><td>${escapeHtml(profileName(profile.id))}</td><td class="num">${money(outputGst)}</td><td class="num">${money(inputGst)}</td><td class="num">${money(outputGst - inputGst)}</td></tr>`;
    }).join("");
    output.innerHTML = `<div class="report-grid">
      <div class="report-card"><span>Output GST</span><strong>${money(saleGst)}</strong></div>
      <div class="report-card"><span>Input GST</span><strong>${money(purchaseGst)}</strong></div>
      <div class="report-card"><span>Net GST</span><strong>${money(saleGst - purchaseGst)}</strong></div>
    </div>
    <div class="table-wrap"><table><thead><tr><th>GST Profile</th><th class="num">Output GST</th><th class="num">Input GST</th><th class="num">Net GST</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    return;
  }
  const salesTotal = sales.reduce((sum, entry) => sum + entry.total, 0);
  const purchaseTotal = purchases.reduce((sum, entry) => sum + entry.total, 0);
  output.innerHTML = `<div class="report-grid">
    <div class="report-card"><span>Sales</span><strong>${money(salesTotal)}</strong></div>
    <div class="report-card"><span>Purchases</span><strong>${money(purchaseTotal)}</strong></div>
    <div class="report-card"><span>Gross Margin</span><strong>${money(salesTotal - purchaseTotal)}</strong></div>
  </div>
  <div class="table-wrap"><table><thead><tr><th>Date</th><th>Type</th><th>No.</th><th>GST</th><th>Party</th><th class="num">Total</th></tr></thead><tbody>
    ${[...sales.map(entry => ({ ...entry, kind: "Sale" })), ...purchases.map(entry => ({ ...entry, kind: "Purchase" }))]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(entry => `<tr><td>${entry.date}</td><td>${entry.kind}</td><td>${escapeHtml(entry.number)}</td><td>${escapeHtml(profileName(entry.profileId))}</td><td>${escapeHtml(partyName(entry.partyId))}</td><td class="num">${money(entry.total)}</td></tr>`)
      .join("") || emptyRow(6, "No entries in this period")}
  </tbody></table></div>`;
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `billing-backup-${today()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!imported.settings || !Array.isArray(imported.items) || !Array.isArray(imported.parties)) throw new Error("Invalid file");
      state = normalizeState(imported);
      saveState();
      renderAll();
      toast("Backup imported");
    } catch {
      toast("Invalid backup file");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

async function handlePurchaseInvoiceUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    toast("Reading purchase invoice...");
    const text = await extractPdfText(file);
    if (!text.trim()) {
      toast("No readable text found in PDF");
      return;
    }
    const parsed = parsePurchaseInvoiceText(text, file.name);
    const draft = buildPurchaseDraft(parsed);
    saveState();
    renderAll();
    openEntry("purchase", null, draft);
    toast("Invoice details filled. Please review before saving.");
  } catch (error) {
    console.error(error);
    toast("Could not read this invoice PDF");
  } finally {
    event.target.value = "";
  }
}

async function extractPdfText(file) {
  if (!window.pdfjsLib) throw new Error("PDF reader is not loaded");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const pages = [];
  for (let pageNo = 1; pageNo <= pdf.numPages; pageNo += 1) {
    const page = await pdf.getPage(pageNo);
    const content = await page.getTextContent();
    const rows = new Map();
    content.items.forEach(item => {
      const y = Math.round(item.transform[5] / 4) * 4;
      const x = item.transform[4];
      if (!rows.has(y)) rows.set(y, []);
      rows.get(y).push({ x, text: item.str });
    });
    const lines = Array.from(rows.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([, items]) => items.sort((a, b) => a.x - b.x).map(item => item.text).join(" ").replace(/\s+/g, " ").trim())
      .filter(Boolean);
    pages.push(lines.join("\n"));
  }
  return pages.join("\n");
}

function parsePurchaseInvoiceText(text, fileName) {
  const cleaned = text.replace(/\r/g, "\n").replace(/[ \t]+/g, " ");
  const lines = cleaned.split("\n").map(line => line.trim()).filter(Boolean);
  const gstins = [...new Set(cleaned.match(/\b\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]\b/g) || [])];
  const profile = state.settings.profiles.find(candidate => gstins.includes(candidate.gstin)) || activeProfile();
  const supplierGstin = gstins.find(gstin => gstin !== profile.gstin) || "";
  const supplierName = findSupplierName(lines, supplierGstin) || fileName.replace(/\.pdf$/i, "");
  const invoiceNumber = findInvoiceNumber(lines) || nextEntryNumber("purchase", profile.id);
  const invoiceDate = findInvoiceDate(cleaned) || today();
  const amounts = findInvoiceAmounts(lines);
  const parsedLines = findItemLines(lines);
  const fallbackTaxable = amounts.taxable || Math.max(0, amounts.total - amounts.gst) || amounts.total;
  return {
    fileName,
    profileId: profile.id,
    supplierName,
    supplierGstin,
    invoiceNumber,
    invoiceDate,
    taxable: fallbackTaxable,
    gst: amounts.gst,
    total: amounts.total || fallbackTaxable + amounts.gst,
    lines: parsedLines.length ? parsedLines : [{
      name: "Imported Purchase",
      hsn: "",
      qty: 1,
      rate: fallbackTaxable,
      gstRate: inferGstRate(fallbackTaxable, amounts.gst)
    }]
  };
}

function findSupplierName(lines, supplierGstin) {
  const skip = /^(tax invoice|invoice|bill of supply|gstin|gst|original|duplicate|date|state|place|ship|bill|to|from)$/i;
  if (supplierGstin) {
    const index = lines.findIndex(line => line.includes(supplierGstin));
    for (let i = Math.max(0, index - 5); i < index; i += 1) {
      const candidate = lines[i].replace(/^(supplier|seller|from|name)\s*[:\-]?\s*/i, "").trim();
      if (candidate.length > 2 && !skip.test(candidate) && !candidate.match(/\b\d{2}[A-Z]{5}\d{4}/)) return candidate;
    }
  }
  return lines.find(line => {
    if (line.length < 4 || line.length > 80) return false;
    if (skip.test(line)) return false;
    if (/\d{2}[A-Z]{5}\d{4}/.test(line)) return false;
    return /[A-Za-z]/.test(line);
  });
}

function findInvoiceNumber(lines) {
  const patterns = [
    /\b(?:invoice|inv|bill)\s*(?:no|number|#)\s*[:\-]?\s*([A-Z0-9\-\/]+)/i,
    /\b(?:invoice|inv|bill)\s*[:\-]\s*([A-Z0-9\-\/]+)/i
  ];
  for (const line of lines) {
    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match) return match[1];
    }
  }
  return "";
}

function findInvoiceDate(text) {
  const patterns = [
    /\b(?:invoice|bill)?\s*date\s*[:\-]?\s*(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/i,
    /\b(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{4})\b/,
    /\b(\d{4}[\/\-.]\d{1,2}[\/\-.]\d{1,2})\b/
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return toDateInput(match[1]);
  }
  return "";
}

function toDateInput(value) {
  const parts = value.split(/[\/\-.]/).map(part => part.padStart(2, "0"));
  if (parts[0].length === 4) return `${parts[0]}-${parts[1]}-${parts[2]}`;
  const year = parts[2].length === 2 ? `20${parts[2]}` : parts[2];
  return `${year}-${parts[1]}-${parts[0]}`;
}

function findInvoiceAmounts(lines) {
  const result = { taxable: 0, gst: 0, total: 0 };
  for (const line of lines) {
    const lower = line.toLowerCase();
    const amount = lastAmount(line);
    if (!amount) continue;
    if (/taxable|sub\s*total|assessable/.test(lower)) result.taxable = amount;
    if (/(igst|cgst|sgst|gst amount|total tax)/.test(lower)) result.gst += amount;
    if (/(grand total|invoice total|net amount|total amount|amount payable|round off total)/.test(lower)) result.total = amount;
  }
  if (!result.total) {
    const candidates = lines.map(lastAmount).filter(Boolean);
    result.total = Math.max(0, ...candidates);
  }
  return result;
}

function lastAmount(line) {
  const matches = line.replace(/,/g, "").match(/\b\d+(?:\.\d{1,2})?\b/g);
  if (!matches?.length) return 0;
  return Number(matches[matches.length - 1]);
}

function findItemLines(lines) {
  const itemLines = [];
  for (const line of lines) {
    if (!/\b\d{4,8}\b/.test(line)) continue;
    if (!/\b\d+(?:\.\d{1,2})?\b/.test(line.replace(/,/g, ""))) continue;
    if (/gstin|registration|pin code|phone|invoice|total|taxable|cgst|sgst|igst|cess|round off|grand/i.test(line)) continue;
    const hsn = line.match(/\b\d{4,8}\b/)?.[0] || "";
    const numbers = line.replace(/,/g, "").match(/\b\d+(?:\.\d{1,2})?\b/g)?.map(Number) || [];
    const hsnNumberIndex = numbers.findIndex(value => String(Math.trunc(value)) === hsn);
    const afterHsn = hsnNumberIndex >= 0 ? numbers.slice(hsnNumberIndex + 1) : numbers;
    const amount = numbers[numbers.length - 1] || 0;
    const qty = afterHsn.find(value => value > 0 && value <= 10000 && ![0, 3, 5, 12, 18, 28].includes(value)) || 1;
    const listedRate = afterHsn.find(value => value > 0 && value !== qty && value !== amount && ![0, 3, 5, 12, 18, 28].includes(value));
    const rate = listedRate || (qty ? amount / qty : amount);
    const gstRate = [28, 18, 12, 5, 3, 0].find(rateValue => line.includes(`${rateValue}%`) || line.match(new RegExp(`\\b${rateValue}\\b`))) ?? 18;
    const name = line.split(hsn)[0].replace(/^\d+\s*/, "").trim() || "Imported Item";
    if (amount > 0 && name.length > 2) itemLines.push({ name, hsn, qty, rate, gstRate });
  }
  return itemLines.slice(0, 20);
}

function inferGstRate(taxable, gstAmount) {
  if (!taxable || !gstAmount) return 18;
  const rate = Math.round((gstAmount / taxable) * 100);
  return [0, 3, 5, 12, 18, 28].includes(rate) ? rate : 18;
}

function buildPurchaseDraft(parsed) {
  const partyId = ensureImportedSupplier(parsed);
  const lines = parsed.lines.map(line => {
    const item = ensureImportedItem(line);
    return {
      itemId: item.id,
      qty: num(line.qty) || 1,
      rate: num(line.rate),
      gstRate: num(line.gstRate)
    };
  });
  return {
    profileId: parsed.profileId,
    date: parsed.invoiceDate,
    number: parsed.invoiceNumber,
    partyId,
    status: "Unpaid",
    notes: `Auto-filled from ${parsed.fileName}. Review values before saving.`,
    lines
  };
}

function ensureImportedSupplier(parsed) {
  const existing = state.parties.find(party => (
    parsed.supplierGstin && party.gstin.toUpperCase() === parsed.supplierGstin.toUpperCase()
  ) || party.name.toLowerCase() === parsed.supplierName.toLowerCase());
  if (existing) return existing.id;
  const party = {
    id: uid(),
    name: parsed.supplierName,
    type: "Supplier",
    gstin: parsed.supplierGstin,
    phone: "",
    place: "",
    address: ""
  };
  state.parties.push(party);
  return party.id;
}

function ensureImportedItem(line) {
  const existing = state.items.find(item => item.name.toLowerCase() === line.name.toLowerCase() && item.hsn === line.hsn);
  if (existing) return existing;
  const item = {
    id: uid(),
    name: line.name || "Imported Purchase",
    hsn: line.hsn || "",
    gstRate: num(line.gstRate),
    saleRate: num(line.rate),
    purchaseRate: num(line.rate),
    openingStock: 0,
    minStock: 0
  };
  state.items.push(item);
  return item;
}

window.openEntry = openEntry;
window.deleteEntry = deleteEntry;
window.showInvoice = showInvoice;
window.openItem = openItem;
window.deleteItem = deleteItem;
window.openParty = openParty;
window.deleteParty = deleteParty;

document.addEventListener("DOMContentLoaded", init);
