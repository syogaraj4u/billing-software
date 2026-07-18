const STORAGE_KEY = "billingSoftware.v1";
const LOCAL_STATE_BACKUP_KEY = "billingSoftware.localBackup.v1";
const GST_PROFILE_VERSION = "2026-06-24-official-8-gst";
const CLOUD_WORKSPACE_TABLE = "billing_cloud_workspaces";
const CLOUD_ROW_TABLES = {
  parties: "billing_parties",
  items: "billing_items",
  sales: "billing_sales",
  creditNotes: "billing_credit_notes",
  purchases: "billing_purchases",
  purchaseReturns: "billing_purchase_returns",
  purchaseOrders: "billing_purchase_orders",
  saleItems: "billing_sale_items",
  creditNoteItems: "billing_credit_note_items",
  purchaseItems: "billing_purchase_items",
  purchaseReturnItems: "billing_purchase_return_items",
  purchaseOrderItems: "billing_purchase_order_items",
  paymentSources: "billing_payment_sources",
  bankTransactions: "billing_bank_transactions",
  tallySyncRuns: "billing_tally_sync_runs",
  purchaseImportBatches: "billing_purchase_import_batches",
  purchaseImportDocuments: "billing_purchase_import_documents",
  deletionTombstones: "billing_deletion_tombstones",
  auditLogs: "billing_audit_logs",
  backups: "billing_cloud_backups"
};
const CLOUD_SELECTED_WORKSPACE_KEY = "billingSoftware.cloudWorkspaceId";
const DEVICE_ACTIVE_PROFILE_KEY = "billingSoftware.activeProfileId";
const PURCHASE_ATTACHMENT_BUCKET = "purchase-invoices";
const SYNC_STATUS_LOCAL = "Saved locally";
const SYNC_STATUS_SYNCING = "Syncing";
const SYNC_STATUS_SYNCED = "Synced";
const SYNC_STATUS_FAILED = "Sync failed";
const EWAY_DOCUMENT_VERSION = "1.0.0621";
const DEFAULT_SALE_HSN = "85171300";
const DISALLOWED_HSN_CODES = new Set(["85176290"]);
const DEFAULT_SALE_GST_RATE = 18;
const CHAT_BILL_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_CHAT_BILL_ATTACHMENTS = 4;
const MAX_CHAT_BILL_ATTACHMENT_BYTES = 6 * 1024 * 1024;
const EWAY_DISTANCE_FUNCTION = "estimate-eway-distance";
const GSTIN_PINCODE_FUNCTION = "resolve-purchase-pincodes";
const ALL_MONTHS_KEY = "all";

const EWAY_ADDRESS_PRESETS = [
  {
    id: "tirupati-kranthi-nagar",
    label: "Tirupati - Kranthi Nagar",
    toAddr1: "21-10-518/A Kranthi nagar",
    toAddr2: "Jeevakona",
    toPlace: "Tirupati",
    toPincode: 517507,
    actualToStateCode: 37
  },
  {
    id: "tirupati-snr-heights",
    label: "Tirupati - SNR Heights",
    toAddr1: "SNR Heights",
    toAddr2: "Thiminadirupalem Rd",
    toPlace: "Tirupati",
    toPincode: 517507,
    actualToStateCode: 37
  },
  {
    id: "tirupati-upadyay-nagar",
    label: "Tirupati - Upadyay Nagar",
    toAddr1: "22-8-97/2",
    toAddr2: "Upadyay Nagar 11th Cross",
    toPlace: "Tirupati",
    toPincode: 517507,
    actualToStateCode: 37
  },
  {
    id: "chennai-royappuram",
    label: "Chennai - Royappuram",
    toAddr1: "no 5/3 grace garden 4th lane",
    toAddr2: "Royappuram",
    toPlace: "Chennai",
    toPincode: 600021,
    actualToStateCode: 33
  }
];

const EWAY_SPECIAL_DISTANCE_KM = {
  "517501-517507": 2,
  "517507-517501": 2,
  "625516-600021": 545,
  "600021-625516": 545,
  "532222-600021": 981,
  "600021-532222": 981,
  "631001-517501": 80,
  "517501-631001": 80,
  "631001-517507": 80,
  "517507-631001": 80,
  "631001-600021": 92,
  "600021-631001": 92,
  "631001-600013": 92,
  "600013-631001": 92
};

const EWAY_PINCODE_COORDS = {
  517001: [13.21925, 79.09725],
  517501: [13.6288, 79.4192],
  517507: [13.6288, 79.4192],
  517590: [13.3217778, 79.5858333],
  600021: [13.1139, 80.2558],
  625516: [9.7358, 77.2807],
  532222: [18.7667, 84.4167]
};

const EWAY_STATE_NAME_CODES = {
  "andhra pradesh": 37,
  "tamil nadu": 33,
  tamilnadu: 33,
  karnataka: 29,
  telangana: 36,
  maharashtra: 27,
  chhattisgarh: 22,
  delhi: 7,
  haryana: 6,
  gujarat: 24
};

const EWAY_PIN_PREFIX_STATE_CODES = {
  110: 7,
  122: 6,
  380: 24,
  400: 27,
  411: 27,
  425: 27,
  492: 22,
  500: 36,
  504: 36,
  517: 37,
  530: 37,
  532: 37,
  560: 29,
  600: 33,
  625: 33,
  628: 33
};

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
    bankDetails: {
      accountName: "Nirvana Solutions",
      bankName: "Kotak Mahindra Bank",
      branch: "Air Bypass Road, Tirupati",
      accountNumber: "8686839018",
      ifsc: "KKBK0007919"
    },
    nextSaleNo: 4,
    nextPurchaseNo: 1,
    nextPoNo: 1
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
    bankDetails: {
      accountName: "Kala Nirvana",
      bankName: "ICICI Bank",
      branch: "Kupu Chandra Peta Branch",
      accountNumber: "757205000565",
      ifsc: "ICIC0007572"
    },
    nextSaleNo: 2,
    nextPurchaseNo: 1,
    nextPoNo: 1
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
    bankDetails: {
      accountName: "HARIHARA MOBILES",
      bankName: "ICICI Bank",
      branch: "Tirupati Branch",
      accountNumber: "630905039494",
      ifsc: "ICIC0006309"
    },
    nextSaleNo: 1,
    nextPurchaseNo: 1,
    nextPoNo: 1
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
    bankDetails: {
      accountName: "Shiva Nandi Communications",
      bankName: "ICICI Bank",
      branch: "Tirupati Branch",
      accountNumber: "630905039332",
      ifsc: "ICIC0006309"
    },
    nextSaleNo: 5,
    nextPurchaseNo: 1,
    nextPoNo: 1
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
    bankDetails: {
      accountName: "Skanda Digitals",
      bankName: "ICICI Bank",
      branch: "KT Road Branch",
      accountNumber: "720905500069",
      ifsc: "ICIC0007209"
    },
    nextSaleNo: 8,
    nextPurchaseNo: 1,
    nextPoNo: 1
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
    bankDetails: {
      accountName: "Khairanya Infotech",
      bankName: "ICICI Bank",
      branch: "Kupu Chandra Peta Branch",
      accountNumber: "757205000575",
      ifsc: "ICIC0007572"
    },
    nextSaleNo: 3,
    nextPurchaseNo: 1,
    nextPoNo: 1
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
    bankDetails: {
      accountName: "LAKSHMI JEYAPANDI TRADERS",
      bankName: "ICICI Bank",
      branch: "Chennai - Rajaji Salai Branch",
      accountNumber: "793705000262",
      ifsc: "ICIC0007937"
    },
    nextSaleNo: 7,
    nextPurchaseNo: 1,
    nextPoNo: 1
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
    bankDetails: {
      accountName: "SRI LAKSHMI DIGITALS",
      bankName: "ICICI Bank",
      branch: "Punganur Branch",
      accountNumber: "377105500333",
      ifsc: "ICIC0003771"
    },
    nextSaleNo: 6,
    nextPurchaseNo: 1,
    nextPoNo: 1
  }
];

const GST_PROFILE_ALIASES = {
  "gst-1": ["nirvana", "nirvana solutions", "senrayan yogaraj"],
  "gst-2": ["kala", "kala nirvana"],
  "gst-3": ["harihara", "harihara mobiles", "nagaraju perumal"],
  "gst-4": ["shiva nandi", "shiva nandi communications", "nandi communications", "selvasobia"],
  "gst-5": ["skanda", "skanda digitals", "yugandhar"],
  "gst-6": ["khairanya", "khairanya infotech", "sandhya rani"],
  "gst-7": ["lakshmi jeyapandi", "jeyapandi", "lakshmi jeyapandi traders", "lj traders", "jeyapandi traders"],
  "gst-8": ["sri lakshmi", "sri lakshmi digitals", "sld", "durga prasad", "durgaprasad"]
};

const SALE_INVOICE_NUMBER_RULES = {
  "gst-1": { prefix: "NS/SO/26-27", start: 4, width: 3 },
  "gst-2": { prefix: "KN/26-27", start: 2, width: 3 },
  "gst-3": { prefix: "HHM/26-27", start: 1, width: 3 },
  "gst-4": { prefix: "SNC/26-27", start: 5, width: 3 },
  "gst-5": { prefix: "SD/SO/25-26", start: 8, width: 3 },
  "gst-6": { prefix: "KI/25-26", start: 3, width: 3 },
  "gst-7": { prefix: "LJT/26-27", start: 7, width: 3 },
  "gst-8": { prefix: "SLD/26-27", start: 6, width: 3 }
};

const CREDIT_NOTE_NUMBER_RULES = {
  "gst-1": { prefix: "NS/CN/26-27", start: 1, width: 3 },
  "gst-2": { prefix: "KN/CN/26-27", start: 1, width: 3 },
  "gst-3": { prefix: "HHM/CN/26-27", start: 1, width: 3 },
  "gst-4": { prefix: "SNC/CN/26-27", start: 1, width: 3 },
  "gst-5": { prefix: "SD/CN/26-27", start: 1, width: 3 },
  "gst-6": { prefix: "KI/CN/26-27", start: 1, width: 3 },
  "gst-7": { prefix: "LJT/CN/26-27", start: 1, width: 3 },
  "gst-8": { prefix: "SLD/CN/26-27", start: 1, width: 3 }
};

const FIRM_LOGOS = {
  "gst-1": {
    initials: "NS",
    markSrc: "assets/logos/nirvana-solutions-logo.jpg",
    markWidth: 512,
    markHeight: 512,
    primary: "#d6a74e",
    accent: "#c7ccd4",
    ink: "#111827"
  },
  "gst-2": {
    initials: "KN",
    markSrc: "assets/logos/kala-nirvana-mark.jpg",
    markWidth: 320,
    markHeight: 320,
    wordmarkSrc: "assets/logos/kala-nirvana-wordmark.jpg",
    wordmarkWidth: 1400,
    wordmarkHeight: 396,
    primary: "#111827",
    accent: "#1557ff",
    ink: "#111827"
  },
  "gst-3": { initials: "HHM", kind: "dualPhones", primary: "#7c3aed", accent: "#0f766e", ink: "#1e1b4b" },
  "gst-4": { initials: "SNC", kind: "signalPhone", primary: "#1d4ed8", accent: "#0891b2", ink: "#111827" },
  "gst-5": { initials: "SD", kind: "pixelPhone", primary: "#0369a1", accent: "#14b8a6", ink: "#0f172a" },
  "gst-6": { initials: "KI", kind: "cameraChip", primary: "#4f46e5", accent: "#06b6d4", ink: "#111827" },
  "gst-7": { initials: "LJT", kind: "stackedPhones", primary: "#166534", accent: "#64748b", ink: "#111827" },
  "gst-8": { initials: "SLD", kind: "retailDevice", primary: "#b91c1c", accent: "#f59e0b", ink: "#111827" }
};
const FIRM_PDF_LOGO_CACHE = new Map();

const HOME_COMPANY_PROFILE_ORDER = ["gst-1", "gst-2", "gst-7", "gst-5", "gst-6", "gst-8", "gst-4", "gst-3"];
const AMBIGUOUS_PROFILE_ALIASES = new Set(["lakshmi", "s lakshmi"]);
const GENERIC_PARTY_ALIASES = new Set(["cash", "cash customer", "customer", "supplier", "default", "default supplier"]);
const TALLY_BUYER_MASTER_VERSION = "2026-06-27-tally-gst-buyers-v2";
const TALLY_BUYER_MASTER = [
  {"name": "DGB Agency - Chennai", "gstin": "33AEWPM2560B1ZL", "place": "Chennai", "address": "Jones Street,Mannady,12,Chennai, Chennai, Tamil Nadu, 600001", "aliases": ["DGB Agency", "DGB Agency - Chennai"]},
  {"name": "HARSHITH ENTERPRISES - Andhra Pradesh", "gstin": "37ALHPP0600M1Z2", "place": "Chittoor", "address": "AIR BYPASS ROAD,TIRUPATHI,PLOT NO 166,Chittoor, Chittoor, Andhra Pradesh, 517501", "aliases": ["HARSHITH ENTERPRISES", "HARSHITH ENTERPRISES - Andhra Pradesh"]},
  {"name": "I P Express Cargo", "gstin": "07AAEFI4310H1ZR", "place": "New Delhi", "address": "ROAD NO. - 6,New Delhi,H. NO. A-125, G/F KH. NO. 1028/1,New Delhi, New Delhi, Delhi, 110037", "aliases": ["I P Express Cargo"]},
  {"name": "IP Express Cargo - Bangalore", "gstin": "29AAEFI4310H1ZL", "place": "Bengaluru Urban", "address": "3rd Cross, 4th Main Road,Sampangiramnagar,KH Road,Bengaluru,34, Ground Floor,Bengaluru Urban, Bengaluru Urban, Karnataka, 560027", "aliases": ["IP Express Cargo", "I P EXPRESS CARGO", "IP Express Cargo - Bangalore"]},
  {"name": "Kalakriti - Tamilnadu", "gstin": "33AENPD8305E1ZU", "place": "Chennai", "address": "SUNKURAMA STREET,PARRYS CORNER,NO 3,Chennai, Chennai, Tamil Nadu, 600001", "aliases": ["Kalakriti", "Kalakriti - Tamilnadu"]},
  {"name": "Lotus Lakshmi Marketing - Andhra Pradesh", "gstin": "37AMQPP4019E1ZV", "place": "Chittoor", "address": "TILAK ROAD,TIRUPATI,13-3-397,Chittoor, Chittoor, Andhra Pradesh, 517501", "aliases": ["Lotus Lakshmi Marketing", "Lotus Lakshmi Marketing - Andhra Pradesh"]},
  {"name": "Mega Deals - Andhra Pradesh", "gstin": "37APYPV7867D1ZR", "place": "Kurnool", "address": "First Floor,Skanda Business Park,Abdullah Khan Estate Lane,Kurnool,40/321-FF-22,Kurnool, Kurnool, Andhra Pradesh, 518001", "aliases": ["Mega Deals", "Mega Deals - Andhra Pradesh"]},
  {"name": "Nirvana Solutions - Andra Pradesh", "gstin": "37DPPPS0884K2ZX", "place": "Tirupati", "address": "1st Floor,SivaSri Nilayam,Kranthi Nagar,Tirupati,21-10-518/a,Tirupati, Tirupati, Andhra Pradesh, 517507", "aliases": ["Nirvana Solutions", "Nirvana Solutions - Andra Pradesh"]},
  {"name": "Purohit Enterprise - Gujarat", "gstin": "24CRYPR9557C1ZZ", "place": "Ahmedabad", "address": "SHOP NO G-3,Jayanti Dalal Road,Ahmedabad,296-A-1,Ahmedabad, Ahmedabad, Gujarat, 380001", "aliases": ["Purohit Enterprise", "Purohit Enterprise - Gujarat"]},
  {"name": "Reliable Sales", "gstin": "07BFPPS9749B1ZT", "place": "West Delhi", "address": "Basement, First Floor, Second Floor & Third Floor,C-297 & 300,SHIV VIHAR,New Delhi,C-297 & 300,West Delhi, West Delhi, Delhi, 110059", "aliases": ["Reliable Sales"]},
  {"name": "Sama Distributor", "gstin": "27AAHPK5099E1ZH", "place": "Pune", "address": "1st Floor,Shreenath Plaza,Shivajinagar,Pune,Office No. C/23,Pune, Pune, Maharashtra, 411005", "aliases": ["Sama Distributor"]},
  {"name": "Shiva Nandi Communications - Andhra Pradesh", "gstin": "37BRVPN4137L1ZZ", "place": "Tirupati", "address": "2nd Floor,SivaSri Illam,Kranthi Nagar,Tirupati,21-10-518/A,Tirupati, Tirupati, Andhra Pradesh, 517507", "aliases": ["Shiva Nandi Communications", "Shiva Nandi Communications - Andhra Pradesh"]},
  {"name": "Shree Mangalam Communication Private Limited", "gstin": "22ABKCS3913J1ZB", "place": "Raipur", "address": "FIRST FLOOR,EDGE COMPLEX,MOWA,Raipur,shop no. 109&115,Raipur, Raipur, Chhattisgarh, 492001", "aliases": ["Shree Mangalam Communication Private Limited"]},
  {"name": "Sri Lakshmi Digitals - Andhra Pradesh", "gstin": "37CGUPD8962N1ZB", "place": "Chittoor", "address": "Prakasam Road,Nagari,10-8-349,Chittoor, Chittoor, Andhra Pradesh, 517590", "aliases": ["Sri Lakshmi Digitals", "Sri Lakshmi Digitals - Andhra Pradesh"]},
  {"name": "Talk Time Mobile Store", "gstin": "24AAIFT2603G1ZI", "place": "Vadodara", "address": "TULIP COMPLEX,RACE COURSE,ALKAPURI,SR-01/SR-02 AND FF-101,Vadodara, Vadodara, Gujarat, 390007", "aliases": ["Talk Time Mobile Store"]},
  {"name": "United Mobiles", "gstin": "33AQQPM7959N1ZS", "place": "Chennai", "address": "Anna Main Road,Chennai,Old No.58 New No.52/A,Chennai, Chennai, Tamil Nadu, 600078", "aliases": ["United Mobiles"]},
  {"name": "HARINI MOBILES LLP - Karnataka", "gstin": "29AAQFH1863E1Z4", "place": "Bengaluru Urban", "address": "K.C.Nilayam,Bengaluru,#44,Bengaluru Urban, Bengaluru Urban, Karnataka, 560016", "aliases": ["HARINI MOBILES LLP", "HARINI MOBILES LLP - Karnataka"]},
  {"name": "IP Express Cargo - Chennai", "gstin": "27AAEFI4310H1ZP", "place": "Pune", "address": "1st Floor,Shreenath Plaza,Gopal Krishna Gokhale Path,Pune,Office No. C/22,Pune, Pune, Maharashtra, 411005", "aliases": ["IP Express Cargo", "I P EXPRESS CARGO", "IP Express Cargo - Chennai"]},
  {"name": "Iswarya Enterprises", "gstin": "37AXIPB1254E3ZU", "place": "Visakhapatnam", "address": "TSR Apartment,Sivajipalem Road,Visakhapatnam,9-5-67/3(56),Visakhapatnam, Visakhapatnam, Andhra Pradesh, 530017", "aliases": ["Iswarya Enterprises"]},
  {"name": "Kala Nirvana", "gstin": "37ALHPV7427Q1Z1", "place": "Tirupati", "address": "Ground floor,Sivasri Nilayam,Kranthi Nagar,Tirupati,21-10-518/A,Tirupati, Tirupati, Andhra Pradesh, 517507", "aliases": ["Kala Nirvana"]},
  {"name": "Khairanya Infotech", "gstin": "37FADPS7142R1ZS", "place": "Tirupati", "address": "Ground Floor,Upadyay Nagar 11th Cross,Tirupati,22-8-97/2,Tirupati, Tirupati, Andhra Pradesh, 517507", "aliases": ["Khairanya Infotech"]},
  {"name": "Lakshmi Jeyapandi Traders - Tamil Nadu", "gstin": "33BKJPL1188C1ZD", "place": "Chennai", "address": "Ground floor,Lakshmi Jeyapandi Traders,Grace Garden 4th Lane,Chennai,No 5/3,Chennai, Chennai, Tamil Nadu, 600021", "aliases": ["Lakshmi Jeyapandi Traders", "Lakshmi Jeyapandi Traders - Tamil Nadu"]},
  {"name": "Lakshya Enterprise", "gstin": "07AXFPP6207L1Z6", "place": "West Delhi", "address": "FIRST FLOOR,Prem Nagar,PREM NAGAR,New Delhi,HOUSE NO. 71/20,West Delhi, West Delhi, Delhi, 110058", "aliases": ["Lakshya Enterprise"]},
  {"name": "Reliance Retail Limited - Bangalore", "gstin": "29AABCR1718E1ZL", "place": "Bengaluru Urban", "address": "2ND FLOOR,RIL BUILDING,RICHMOND ROAD,BANGALORE,NO 62/2,,Bengaluru Urban, Bengaluru Urban, Karnataka, 560025", "aliases": ["Reliance Retail Limited", "Reliance Retail Limited - Bangalore"]},
  {"name": "SAMA DISTRIBUTORS DELHI", "gstin": "07AAHPK5099E1ZJ", "place": "New Delhi", "address": "Ground Floor,Malik Pur Kohi Rangpuri,New Delhi,RP-41258, H. No. 597,New Delhi, New Delhi, Delhi, 110037", "aliases": ["SAMA DISTRIBUTORS DELHI", "SAMA DISTRIBUTOR"]},
  {"name": "Shree Mangalam Telecom Llp", "gstin": "22AFCFS5432D1ZG", "place": "Raipur", "address": "FIRST FLOOR,EDGE COMPLEX,MOWA,Raipur,SHOP NO. 109& 115,Raipur, Raipur, Chhattisgarh, 492004", "aliases": ["Shree Mangalam Telecom Llp"]},
  {"name": "Superdeals Trading House - Bangaluru", "gstin": "29ADVFS4000N1ZG", "place": "Bengaluru Urban", "address": "ALSA GLENRIDGE,OPP TO ST JOSEPH COLLEGE LANGFORD ROAD SHANTHI NAGAR,BANGALORE,2/3 PORTION OF 2D WEST PART,Bengaluru Urban, Bengaluru Urban, Karnataka, 560025", "aliases": ["Superdeals Trading House", "Superdeals Trading House - Bangaluru"]},
  {"name": "Turbo Trade - TamilNadu", "gstin": "33AARFT7837K1ZF", "place": "Chennai", "address": "Anthony nagar,Chennai,14,Chennai, Chennai, Tamil Nadu, 600099", "aliases": ["Turbo Trade", "Turbo Trade - TamilNadu"]},
  {"name": "Unikorn Distribution Private Limited - Telangana", "gstin": "36ABICS9486L1ZC", "place": "Hyderabad", "address": "Second Floor,Aashreya Heights,Shalivahana Nagar Road,Hyderabad,8-3-720/6,Hyderabad, Hyderabad, Telangana, 500073", "aliases": ["Unikorn Distribution Private Limited", "Unikorn Distribution Private Limited - Telangana"]},
  {"name": "Wireless India - Telangana", "gstin": "36AAEFW7661D1Z0", "place": "Mancherial", "address": "shop no 2,near royal gardens x road,Abdul Gaffar Road,Naspur,10-172/4,Mancherial, Mancherial, Telangana, 504302", "aliases": ["Wireless India", "Wireless India - Telangana"]},
  {"name": "CELL POINT (INDIA) LIMITED - Tirupati", "gstin": "37AAFCC2148H1ZR", "place": "Visakhapatnam", "address": "RAMS ARCADE,DABAGARDENS,30-15-139,Visakhapatnam, Visakhapatnam, Andhra Pradesh, 530020", "aliases": ["CELL POINT (INDIA) LIMITED", "CELL POINT (INDIA) LIMITED - Tirupati"]},
  {"name": "Mangalam Traders", "gstin": "22CWOPA2445K2ZL", "place": "Raipur", "address": "1ST FLOOR,EDGE COMPLEX,Vidhan Sabha Road,Raipur,SHOP NO 109 & 115,Raipur, Raipur, Chhattisgarh, 492005", "aliases": ["Mangalam Traders"]},
  {"name": "Poorvika Mobiles Private Limited - Tamil Nadu", "gstin": "33AAECP9975G1Z0", "place": "Chennai", "address": "ARCOT ROAD,KODAMBAKKAM,53/30A-30B,Chennai, Chennai, Tamil Nadu, 600024", "aliases": ["Poorvika Mobiles Private Limited", "Poorvika Mobiles Private Limited - Tamil Nadu"]},
  {"name": "Sathya Agencies Pvt Ltd - Tamil Nadu", "gstin": "33AAICS8948L1ZN", "place": "Thoothukudi", "address": "PALAYAMCOTTAI ROAD,THOOTHUKUDI,370,Thoothukudi, Thoothukudi, Tamil Nadu, 628002", "aliases": ["Sathya Agencies Pvt Ltd", "SATHYA AGENCIES LIMITED", "Sathya Agencies Pvt Ltd - Tamil Nadu"]},
  {"name": "Skanda Digitals", "gstin": "37BSFPB1088P1ZD", "place": "Tirupati", "address": "Ground Floor,Grand world road,Tirupati,22-8-97/2A,Tirupati, Tirupati, Andhra Pradesh, 517507", "aliases": ["Skanda Digitals"]},
  {"name": "AASHREYA COMMUNICATIONS LLP - Telangana", "gstin": "36AAFFU0823Q1ZS", "place": "Hyderabad", "address": "First Floor,Aashrey,Road Number 7,Hyderabad,8-2-293/82/W/82 Flat No-101,Hyderabad, Hyderabad, Telangana, 500033", "aliases": ["AASHREYA COMMUNICATIONS LLP", "AASHREYA COMMUNICATION", "AASHREYA COMMUNICATIONS LLP - Telangana"]},
  {"name": "CITIFONE DEALS - MUMBAI", "gstin": "27AACFC0029R1ZC", "place": "Mumbai Suburban", "address": "7TH FLOOR,Neelkanth Business Park,OPPOSITE VIDYAVIHAR STATION, NATHANI ROAD,VDYAVIHAR WEST, MUMBAI,C-705,Mumbai Suburban, Mumbai Suburban, Maharashtra, 400086", "aliases": ["CITIFONE DEALS", "CITIFONE DEALS - MUMBAI"]},
  {"name": "Connectivity -Tamilnadu", "gstin": "33BDSPM6331A1ZR", "place": "Chennai", "address": "KARIKALAN STREET,ADAMBAKKAM,NO.3,Chennai, Chennai, Tamil Nadu, 600088", "aliases": ["Connectivity", "Connectivity -Tamilnadu"]},
  {"name": "GLOBE MOBILITY PRIVATE LIMITED - PUNE", "gstin": "27AAFCG3554M1Z9", "place": "Pune", "address": "4th FLOOR,VIKRAM GOLDMINE,CTS NO 1225/C, PLOT NO 606/C,PUNE CITY,OFFICE NO,402, 403,Pune, Pune, Maharashtra, 411004", "aliases": ["GLOBE MOBILITY PRIVATE LIMITED", "GLOBE MOBILITY PRIVATE LIMITED - PUNE"]},
  {"name": "House Of Electronics - Telangana", "gstin": "36AAJFH8661H1Z0", "place": "Hyderabad", "address": "4TH FLOOR,SREE ARCADE,S D ROAD,SECUNDERABAD,UNIT 4A-1, H.NO.1-2-271,Hyderabad, Hyderabad, Telangana, 500003", "aliases": ["House Of Electronics", "House Of Electronics - Telangana"]},
  {"name": "Kgr Enterprises Private Limited", "gstin": "27AAFCK1308M1ZH", "place": "Mumbai", "address": "4TH FLOOR,CORPORATE CENTRE NIRMAL LIFESTYL,LBS MARG MULUND WEST,MUMBAI,401-405,Mumbai, Mumbai, Maharashtra, 400080", "aliases": ["Kgr Enterprises Private Limited"]},
  {"name": "Kothari Agency - Maharashtra", "gstin": "27AMZPK2173K1ZC", "place": "Jalgaon", "address": "1ST Floor,Plot No. 27,Adarsh Nagar Road,JALGAON,Manisha Colony,Jalgaon, Jalgaon, Maharashtra, 425001", "aliases": ["Kothari Agency - Maharashtra", "KOTHARI AGENCIES"]},
  {"name": "Likeon Trading International Private Limited", "gstin": "06AADCL7793B1ZG", "place": "Gurugram", "address": "GROUND FLOOR,HOUSE NO 14,Gali Number 4,Gurugram,PHASE 2,Gurugram, Gurugram, Haryana, 122001", "aliases": ["Likeon Trading International Private Limited"]},
  {"name": "Maximo Ventures LLP - Tamilnadu", "gstin": "33ABZFM0417D1ZD", "place": "Chennai", "address": "JEHANGIR STREET (2nd LINE BEACH ROAD),Chennai,28/4 (12/4),Chennai, Chennai, Tamil Nadu, 600001", "aliases": ["Maximo Ventures LLP", "Maximo Ventures LLP - Tamilnadu"]},
  {"name": "Mobi Impex - Hyderbad", "gstin": "36ABOFM0423E1ZI", "place": "Hyderabad", "address": "1st Floor,Chikoti Garden,Hyderabad,H No 1-10-68/1, Plot No 18,19,Hyderabad, Hyderabad, Telangana, 500016", "aliases": ["Mobi Impex", "Mobi Impex - Hyderbad"]},
  {"name": "Naidu Communications - Andhra Pradesh", "gstin": "37AHOPA1384J1Z6", "place": "Chittoor", "address": "GROUND,NIMMAKAYALA STREET,TIRUPATI,12-2-118,Chittoor, Chittoor, Andhra Pradesh, 517501", "aliases": ["Naidu Communications", "Naidu Communications - Andhra Pradesh"]},
  {"name": "Pannest Integrated Services Private Limited", "gstin": "33AAGCP7171G1ZE", "place": "Chennai", "address": "Mosque Street,Chennai,26/67,Chennai, Chennai, Tamil Nadu, 600015", "aliases": ["Pannest Integrated Services Private Limited"]},
  {"name": "S R Agencies -Andhra Pradesh", "gstin": "37AINPJ5601P1ZR", "place": "Andhra Pradesh", "address": "", "aliases": ["S R Agencies", "S R Agencies -Andhra Pradesh"]},
  {"name": "Aadarsh Telelink Private Limited", "gstin": "07AAYCA6815A1ZL", "place": "West Delhi", "address": "SECOND FLOOR,VILLAGE ASALATPUR,New Delhi,WZ-14B,West Delhi, West Delhi, Delhi, 110058", "aliases": ["Aadarsh Telelink Private Limited"]},
  {"name": "NIVI MOBILE AGENCIES - Tirupati", "gstin": "37AWTPC5562C1ZF", "place": "Tirupati", "address": "REVENUE WARD NO 7,RTC BUS STAND ROAD,Srikalahasti,7-647,Tirupati, Tirupati, Andhra Pradesh, 517644", "aliases": ["NIVI MOBILE AGENCIES", "NIVI MOBILE AGENCIES - Tirupati"]},
  {"name": "SANGEETHA MOBILES PRIVATE LIMITED - Tamil Nadu", "gstin": "33AAMCS5916J1Z1", "place": "Chennai", "address": "Plot No 2,4rthMain Road,V G N Nagar,ayyapanathagal,Door No 2/109,Chennai, Chennai, Tamil Nadu, 600056", "aliases": ["SANGEETHA MOBILES PRIVATE LIMITED", "SANGEETHA MOBILES PRIVATE LIMITED - Tamil Nadu"]},
  {"name": "Shakti Marketing", "gstin": "24ANTPP1226D1Z4", "place": "Ahmedabad", "address": "Sun West Bank,Ashram Road,Ahmedabad,A-822,Ahmedabad, Ahmedabad, Gujarat, 380009", "aliases": ["Shakti Marketing"]},
];

function createDefaultProfiles() {
  return clone(OFFICIAL_GST_PROFILES);
}

function createDefaultPaymentSources() {
  return OFFICIAL_GST_PROFILES.map(profile => {
    const bank = profile.bankDetails || {};
    const last4 = String(bank.accountNumber || "").replace(/\D/g, "").slice(-4);
    return {
      id: `bank-${profile.id}-primary`,
      profileId: profile.id,
      type: "Bank Account",
      name: bank.bankName || "Primary Bank Account",
      institution: bank.bankName || "",
      last4,
      accountName: bank.accountName || profile.businessName || profile.label || "",
      openingBalance: 0,
      statementDay: 0,
      dueDay: 0,
      active: true,
      systemDefault: true
    };
  });
}

const defaultState = {
  settings: {
    currency: "Rs.",
    activeProfileId: "gst-1",
    profiles: createDefaultProfiles(),
    reportEmails: "",
    ewayDefaults: {
      vehicleNo: "",
      distanceKm: 0,
      vehicleType: "R",
      transMode: "1",
      transType: "1"
    },
    ewayRouteDistances: {}
  },
  items: [],
  parties: [
    { id: uid(), name: "Cash Customer", type: "Customer", gstin: "", phone: "", place: "Local", address: "" },
    { id: uid(), name: "Default Supplier", type: "Supplier", gstin: "", phone: "", place: "Local", address: "" }
  ],
  sales: [],
  creditNotes: [],
  purchases: [],
  purchaseReturns: [],
  purchaseOrders: [],
  paymentSources: createDefaultPaymentSources(),
  bankTransactions: [],
  tallySyncRuns: [],
  purchaseImportBatches: [],
  purchaseImportDocuments: [],
  deletionTombstones: []
};

let state = loadState();
let currentView = "dashboard";
let entryMode = "sale";
let editingEntryId = null;
let editingCreditNoteId = null;
let editingItemId = null;
let editingPartyId = null;
let deviceViewMode = "";
let activeReport = "summary";
let activePartyFilter = "Customer";
let cloudClient = null;
let cloudSession = null;
let cloudWorkspaces = [];
let cloudWorkspace = null;
let cloudLoading = false;
let cloudSyncTimer = null;
let cloudWorkspaceAutoSwitchPending = "";
let lastCloudSyncError = "";
let forgotPasswordMode = false;
let passwordRecoveryMode = false;
let selectedPurchaseIds = new Set();
let entryMonthFilters = {};
let purchaseUploadQueue = [];
let purchaseUploadWorkers = 0;
let activePurchaseImportBatchId = "";
let activePurchaseImportDocumentId = "";
let purchaseImportApproving = false;
const purchaseImportFiles = new Map();
const PURCHASE_IMPORT_CONCURRENCY = 2;
let purchaseImportCloudSyncChain = Promise.resolve();
let entryDraftMeta = {};
let partyDialogContext = null;
let chatBillMessages = [];
let chatBillAttachments = [];
let chatBillPreparing = false;
let chatBillHistoryActive = false;
let lastSaleChatCloudError = "";
let pendingSmartBillReview = null;
let companySelectionOpen = true;
let companyPageTransitionTimer = null;
let currentInvoiceFileName = "invoice.pdf";
let currentInvoiceShareContext = null;
let partyAliasDraft = [];
let ewayDistanceEstimateTimer = null;
let ewayDistanceEstimateKey = "";
let activeReconciliationTab = "review";
let reconciliationMonth = "";
let reconciliationSourceFilterId = "";
let editingPaymentSourceId = null;
let reconciliationMatchTransactionId = null;
let pendingTallyImport = null;

const COMPANY_PAGE_TRANSITION_MS = 460;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return restoreDeviceActiveProfile(normalizeState(clone(defaultState)));
  try {
    return restoreDeviceActiveProfile(normalizeState({ ...clone(defaultState), ...JSON.parse(saved) }));
  } catch {
    return restoreDeviceActiveProfile(normalizeState(clone(defaultState)));
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
      nextPurchaseNo: num(value.settings.nextPurchaseNo) || 1,
      nextPoNo: num(value.settings.nextPoNo) || 1
    };
  }
  if (value.settings.gstProfilesLoadedVersion !== GST_PROFILE_VERSION) {
    OFFICIAL_GST_PROFILES.forEach((official, index) => {
      profiles[index] = {
        ...official,
        nextSaleNo: num(profiles[index]?.nextSaleNo) || official.nextSaleNo,
        nextPurchaseNo: num(profiles[index]?.nextPurchaseNo) || official.nextPurchaseNo,
        nextPoNo: num(profiles[index]?.nextPoNo) || official.nextPoNo
      };
    });
  }
  syncSaleNumberingForProfiles(profiles, Array.isArray(value.sales) ? value.sales : []);
  const existingEwayDefaults = value.settings.ewayDefaults || {};
  const existingEwayRouteDistances = value.settings.ewayRouteDistances || {};
  value.settings = {
    currency: value.settings.currency || "Rs.",
    activeProfileId: value.settings.activeProfileId || profiles[0].id,
    profiles,
    gstProfilesLoadedVersion: GST_PROFILE_VERSION,
    reportEmails: value.settings.reportEmails || "",
    tallyBuyerMasterVersion: value.settings.tallyBuyerMasterVersion || "",
    ewayDefaults: {
      vehicleNo: existingEwayDefaults.vehicleNo || "",
      distanceKm: num(existingEwayDefaults.distanceKm),
      vehicleType: existingEwayDefaults.vehicleType || "R",
      transMode: existingEwayDefaults.transMode || "1",
      transType: existingEwayDefaults.transType || "1"
    },
    ewayRouteDistances: normalizeEwayRouteDistances(existingEwayRouteDistances)
  };
  value.settings.profiles.forEach(profile => {
    profile.tallySettings = window.TallySync
      ? window.TallySync.normalizeSettings(profile.tallySettings || {}, profile)
      : (profile.tallySettings || {});
  });
  if (!profiles.some(profile => profile.id === value.settings.activeProfileId)) {
    value.settings.activeProfileId = profiles[0].id;
  }
  value.items = (Array.isArray(value.items) ? value.items : []).filter(item => !isDefaultSampleProduct(item));
  value.items.forEach(item => {
    item.hsn = normalizeLineHsn(item.hsn) || DEFAULT_SALE_HSN;
    normalizeCloudEntityMeta(item);
  });
  value.parties = Array.isArray(value.parties) ? value.parties.map(normalizePartyForState) : [];
  mergeTallyBuyerMaster(value);
  mergeInternalCompanyPartyMaster(value);
  value.sales = Array.isArray(value.sales) ? value.sales : [];
  value.creditNotes = Array.isArray(value.creditNotes) ? value.creditNotes : [];
  value.purchases = Array.isArray(value.purchases) ? value.purchases : [];
  value.purchaseReturns = Array.isArray(value.purchaseReturns) ? value.purchaseReturns : [];
  value.purchaseOrders = Array.isArray(value.purchaseOrders) ? value.purchaseOrders : [];
  value.paymentSources = Array.isArray(value.paymentSources)
    ? value.paymentSources.map(normalizePaymentSourceForState)
    : createDefaultPaymentSources().map(normalizePaymentSourceForState);
  value.bankTransactions = Array.isArray(value.bankTransactions)
    ? value.bankTransactions.map(normalizeBankTransactionForState)
    : [];
  value.tallySyncRuns = Array.isArray(value.tallySyncRuns)
    ? value.tallySyncRuns.map(normalizeTallySyncRunForState)
    : [];
  value.purchaseImportBatches = Array.isArray(value.purchaseImportBatches)
    ? value.purchaseImportBatches.map(normalizePurchaseImportBatchForState)
    : [];
  value.purchaseImportDocuments = Array.isArray(value.purchaseImportDocuments)
    ? value.purchaseImportDocuments.map(normalizePurchaseImportDocumentForState)
    : [];
  value.deletionTombstones = normalizeDeletionTombstones(value.deletionTombstones);
  [...value.sales, ...value.creditNotes, ...value.purchases, ...value.purchaseReturns, ...value.purchaseOrders].forEach(entry => {
    if (!entry.profileId) entry.profileId = value.settings.activeProfileId;
  });
  value.sales.forEach(entry => normalizeEntryForState(entry, "sale", value.parties, value.items));
  value.creditNotes.forEach(entry => normalizeEntryForState(entry, "creditNote", value.parties, value.items));
  value.purchases.forEach(entry => normalizeEntryForState(entry, "purchase", value.parties, value.items));
  value.purchaseReturns.forEach(entry => normalizeEntryForState(entry, "purchaseReturn", value.parties, value.items));
  value.purchaseOrders.forEach(entry => normalizeEntryForState(entry, "po", value.parties, value.items));
  applyDeletionTombstones(value);
  return value;
}

function rememberLocalStateBackup(snapshot = state, workspaceId = cloudWorkspace?.id || localStorage.getItem(CLOUD_SELECTED_WORKSPACE_KEY) || "") {
  try {
    localStorage.setItem(LOCAL_STATE_BACKUP_KEY, JSON.stringify({
      savedAt: new Date().toISOString(),
      workspaceId,
      data: clone(snapshot)
    }));
  } catch {
    // Storage can fail in private mode or when the browser quota is full.
  }
}

function readLocalStateBackup(workspaceId = "") {
  try {
    const raw = localStorage.getItem(LOCAL_STATE_BACKUP_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (workspaceId && parsed?.workspaceId && parsed.workspaceId !== workspaceId) return null;
    return parsed?.data ? normalizeState(parsed.data) : null;
  } catch {
    return null;
  }
}

function mergeCloudStateWithLocalCandidates(cloudData, localCandidates = []) {
  const merged = normalizeState(clone(cloudData || defaultState));
  let changed = false;
  localCandidates.filter(Boolean).forEach(candidate => {
    const local = normalizeState(clone(candidate));
    changed = mergeByIdentity(
      merged.deletionTombstones,
      local.deletionTombstones,
      deletionTombstoneMergeKey,
      mergeExistingDeletionTombstone
    ) || changed;
    changed = mergeByIdentity(merged.parties, local.parties, partyMergeKey, mergeExistingParty) || changed;
    changed = mergeByIdentity(merged.items, local.items, itemMergeKey) || changed;
    changed = mergeByIdentity(merged.sales, local.sales, entryMergeKey) || changed;
    changed = mergeByIdentity(merged.creditNotes, local.creditNotes, entryMergeKey) || changed;
    changed = mergeByIdentity(merged.purchases, local.purchases, entryMergeKey) || changed;
    changed = mergeByIdentity(merged.purchaseReturns, local.purchaseReturns, entryMergeKey) || changed;
    changed = mergeByIdentity(merged.purchaseOrders, local.purchaseOrders, entryMergeKey) || changed;
    changed = mergeByIdentity(merged.paymentSources, local.paymentSources, paymentSourceMergeKey) || changed;
    changed = mergeByIdentity(merged.bankTransactions, local.bankTransactions, bankTransactionMergeKey) || changed;
    changed = mergeByIdentity(merged.tallySyncRuns, local.tallySyncRuns, tallySyncRunMergeKey, mergeExistingTallySyncRun) || changed;
    changed = mergeByIdentity(merged.purchaseImportBatches, local.purchaseImportBatches, purchaseImportBatchMergeKey, mergeNewestCloudEntity) || changed;
    changed = mergeByIdentity(merged.purchaseImportDocuments, local.purchaseImportDocuments, purchaseImportDocumentMergeKey, mergeNewestCloudEntity) || changed;
    mergeProfileCounters(merged.settings.profiles, local.settings.profiles);
    changed = applyDeletionTombstones(merged) || changed;
  });
  return { state: normalizeState(merged), changed };
}

function mergeByIdentity(target = [], source = [], identityFn, mergeExistingFn = null) {
  const ids = new Set(target.map(row => row?.id).filter(Boolean));
  const keys = new Set(target.map(identityFn).filter(Boolean));
  let changed = false;
  source.forEach(row => {
    const id = row?.id || "";
    const key = identityFn(row);
    const existing = target.find(candidate => (
      (id && candidate?.id === id) || (key && identityFn(candidate) === key)
    ));
    if (existing) {
      changed = (mergeExistingFn?.(existing, row) || false) || changed;
      return;
    }
    target.push(clone(row));
    if (id) ids.add(id);
    if (key) keys.add(key);
    changed = true;
  });
  return changed;
}

function mergeExistingParty(target, source) {
  let changed = false;
  const mergedType = mergePartyTypes(target.type, source.type);
  if (normalizePartyType(target.type) !== mergedType) {
    target.type = mergedType;
    changed = true;
  }
  ["name", "gstin", "phone", "email", "place", "address"].forEach(key => {
    if (!String(target[key] || "").trim() && String(source?.[key] || "").trim()) {
      target[key] = source[key];
      changed = true;
    }
  });
  const aliases = cleanPartyAliasList([
    ...partyAliasList(target),
    ...partyAliasList(source)
  ]);
  const aliasText = aliases.join("\n");
  if (aliasText !== String(target.aliases || "")) {
    target.aliases = aliasText;
    changed = true;
  }
  const supplierLocations = mergeSupplierLocations(target.supplierLocations, source?.supplierLocations);
  if (JSON.stringify(supplierLocations) !== JSON.stringify(normalizeSupplierLocations(target.supplierLocations))) {
    target.supplierLocations = supplierLocations;
    changed = true;
  }
  return changed;
}

function partyMergeKey(party = {}) {
  const gstin = normalizeGstin(party.gstin);
  if (gstin) return `gstin:${gstin}`;
  return `party:${normalizeMergeText(party.name)}:${normalizeMergeText(normalizePartyType(party.type))}`;
}

function itemMergeKey(item = {}) {
  return `item:${normalizeMergeText(item.name)}:${String(item.hsn || "").trim()}`;
}

function entryMergeKey(entry = {}) {
  return [
    entry.profileId || "",
    String(entry.number || "").trim().toUpperCase(),
    entry.partyId || "",
    entry.date || "",
    round2(entry.total)
  ].join("|");
}

function paymentSourceMergeKey(source = {}) {
  return source.id || [
    source.profileId || "",
    normalizeMergeText(source.institution),
    String(source.last4 || ""),
    normalizeMergeText(source.name)
  ].join("|");
}

function bankTransactionMergeKey(transaction = {}) {
  return transaction.id || transaction.fingerprint || [
    transaction.profileId || "",
    transaction.paymentSourceId || "",
    transaction.date || "",
    round2(transaction.debit),
    round2(transaction.credit),
    normalizeMergeText(transaction.reference),
    normalizeMergeText(transaction.description)
  ].join("|");
}

function tallySyncRunMergeKey(run = {}) {
  return run.id || [run.profileId || "", run.runType || "", run.fileName || "", run.createdAt || ""].join("|");
}

function purchaseImportBatchMergeKey(batch = {}) {
  return batch.id || "";
}

function purchaseImportDocumentMergeKey(document = {}) {
  return document.id || "";
}

function deletionTombstoneMergeKey(tombstone = {}) {
  const entityType = normalizeDeletionEntityType(tombstone.entityType);
  const entityId = String(tombstone.entityId || "").trim();
  return entityType && entityId ? `${entityType}:${entityId}` : "";
}

function mergeExistingDeletionTombstone(target, source) {
  const targetDeleted = deletionTombstoneTimestamp(target);
  const sourceDeleted = deletionTombstoneTimestamp(source);
  if (sourceDeleted < targetDeleted) return false;
  if (sourceDeleted === targetDeleted && cloudAuditComparable(target) === cloudAuditComparable(source)) return false;
  if (sourceDeleted === targetDeleted && target.beforeData && !source.beforeData) return false;
  Object.assign(target, clone(source));
  return true;
}

function mergeExistingTallySyncRun(target, source) {
  return mergeNewestCloudEntity(target, source);
}

function mergeNewestCloudEntity(target, source) {
  const targetUpdated = new Date(target?.updatedAt || target?.createdAt || 0).getTime() || 0;
  const sourceUpdated = new Date(source?.updatedAt || source?.createdAt || 0).getTime() || 0;
  if (sourceUpdated <= targetUpdated || cloudAuditComparable(target) === cloudAuditComparable(source)) return false;
  Object.assign(target, clone(source));
  return true;
}

function mergeProfileCounters(targetProfiles = [], sourceProfiles = []) {
  sourceProfiles.forEach(source => {
    const target = targetProfiles.find(profile => profile.id === source.id);
    if (!target) return;
    target.nextSaleNo = Math.max(num(target.nextSaleNo), num(source.nextSaleNo));
    target.nextPurchaseNo = Math.max(num(target.nextPurchaseNo), num(source.nextPurchaseNo));
    target.nextPoNo = Math.max(num(target.nextPoNo), num(source.nextPoNo));
    const targetTallyUpdated = new Date(target.tallySettingsUpdatedAt || 0).getTime() || 0;
    const sourceTallyUpdated = new Date(source.tallySettingsUpdatedAt || 0).getTime() || 0;
    if (sourceTallyUpdated > targetTallyUpdated && source.tallySettings) {
      target.tallySettings = clone(source.tallySettings);
      target.tallySettingsUpdatedAt = source.tallySettingsUpdatedAt;
    }
  });
}

function normalizeMergeText(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, " ");
}

function isDefaultSampleProduct(item = {}) {
  return String(item.name || "").trim().toLowerCase() === "sample product"
    && String(item.hsn || "").trim() === DEFAULT_SALE_HSN
    && num(item.saleRate) === 1000
    && num(item.purchaseRate) === 850;
}

function normalizePartyForState(party) {
  const normalized = {
    id: party.id || uid(),
    name: party.name || "",
    type: normalizePartyType(party.type),
    gstin: party.gstin || "",
    phone: party.phone || "",
    email: party.email || "",
    place: party.place || "",
    address: party.address || "",
    aliases: party.aliases || "",
    shippingAddresses: normalizeShippingAddresses(party.shippingAddresses || party.shipToAddresses || []),
    supplierLocations: normalizeSupplierLocations(party.supplierLocations || party.supplierAddresses || [])
  };
  normalizeCloudEntityMeta(normalized, party);
  return normalized;
}

function normalizePartyType(type) {
  const value = String(type || "").trim();
  if (["Customer", "Supplier", "Both"].includes(value)) return value;
  const normalized = value.toLowerCase();
  const customerLike = /customer|buyer|sale/.test(normalized);
  const supplierLike = /supplier|vendor|purchase/.test(normalized);
  if (customerLike && supplierLike) return "Both";
  if (supplierLike) return "Supplier";
  return "Customer";
}

function mergePartyTypes(currentType, addedType) {
  const current = normalizePartyType(currentType);
  const added = normalizePartyType(addedType);
  if (current === added) return current;
  if (current === "Both" || added === "Both") return "Both";
  return "Both";
}

function normalizeShippingAddresses(addresses = []) {
  return (Array.isArray(addresses) ? addresses : []).map(address => ({
    id: address.id || uid(),
    label: address.label || address.name || "Ship To",
    name: address.name || "",
    gstin: normalizeGstin(address.gstin || ""),
    place: address.place || "",
    address: address.address || ""
  })).filter(address => address.address || address.name || address.gstin || address.place);
}

function normalizeSupplierLocations(locations = []) {
  let defaultAssigned = false;
  const normalized = (Array.isArray(locations) ? locations : []).map((location, index) => {
    const address = String(location.address || "").trim();
    const pincode = normalizePincode(location.pincode || extractPreferredPincode(address));
    const requestedDefault = Boolean(location.isDefault || location.default);
    const isDefault = requestedDefault && !defaultAssigned;
    if (isDefault) defaultAssigned = true;
    return {
      id: String(location.id || uid()),
      label: String(location.label || location.name || location.place || (pincode ? `PIN ${pincode}` : `Location ${index + 1}`)).trim(),
      place: String(location.place || "").trim(),
      address: addressWithUpdatedPincode(address, pincode),
      pincode,
      isDefault,
      source: String(location.source || "party-master").trim(),
      verifiedAt: String(location.verifiedAt || location.updatedAt || "").trim()
    };
  }).filter(location => location.address || location.pincode || location.place);
  if (normalized.length === 1 && !defaultAssigned) normalized[0].isDefault = true;
  return normalized;
}

function supplierLocationMergeKey(location = {}) {
  const pincode = normalizePincode(location.pincode || extractPreferredPincode(location.address));
  const address = normalizeSupplierAddressForMatch(location.address);
  const place = normalizeMergeText(location.place);
  return pincode || address ? `${pincode}|${address}` : `place:${place}`;
}

function mergeSupplierLocations(targetLocations = [], sourceLocations = []) {
  const merged = normalizeSupplierLocations(targetLocations).map(location => ({ ...location }));
  normalizeSupplierLocations(sourceLocations).forEach(source => {
    const sourceKey = supplierLocationMergeKey(source);
    const existing = merged.find(location => location.id === source.id || (sourceKey && supplierLocationMergeKey(location) === sourceKey));
    if (!existing) {
      merged.push({ ...source });
      return;
    }
    const existingVerifiedAt = new Date(existing.verifiedAt || 0).getTime() || 0;
    const sourceVerifiedAt = new Date(source.verifiedAt || 0).getTime() || 0;
    ["label", "place", "address", "pincode", "source", "verifiedAt"].forEach(key => {
      if ((sourceVerifiedAt > existingVerifiedAt || !String(existing[key] || "").trim()) && String(source[key] || "").trim()) {
        existing[key] = source[key];
      }
    });
    if (!merged.some(location => location.isDefault) && source.isDefault) existing.isDefault = true;
  });
  return normalizeSupplierLocations(merged);
}

function normalizeEwayRouteDistances(value = {}) {
  return Object.fromEntries(Object.entries(value || {})
    .map(([key, distance]) => {
      const rawKey = String(key || "").trim();
      const pins = rawKey.match(/^(\d{6})-(\d{6})$/);
      const normalizedKey = pins ? ewayRouteKey(pins[1], pins[2]) : rawKey;
      return [normalizedKey, Math.max(0, num(distance))];
    })
    .filter(([key, distance]) => key && distance > 0));
}

function normalizeVehicleNumber(value = "") {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function normalizePurchaseEwayDetails(details = {}) {
  const fromPincode = normalizePincode(details.fromPincode || "");
  const toPincode = normalizePincode(details.toPincode || "");
  const routeKey = ewayRouteKey(fromPincode, toPincode) || String(details.routeKey || "").trim();
  const distanceSource = String(details.distanceSource || "").trim();
  const distanceKm = Math.max(0, num(details.distanceKm));
  return {
    transType: ["1", "2", "3", "4"].includes(String(details.transType || "")) ? String(details.transType) : "1",
    transMode: ["1", "2", "3", "4"].includes(String(details.transMode || "")) ? String(details.transMode) : "1",
    vehicleNo: normalizeVehicleNumber(details.vehicleNo || ""),
    vehicleType: details.vehicleType === "O" ? "O" : "R",
    distanceKm,
    destinationPreset: String(details.destinationPreset || "").trim(),
    dispatchFromAddress: String(details.dispatchFromAddress || "").trim(),
    shipToAddress: String(details.shipToAddress || "").trim(),
    transporterName: String(details.transporterName || "").trim(),
    transporterId: normalizeGstin(details.transporterId || ""),
    transDocNo: String(details.transDocNo || "").trim(),
    transDocDate: String(details.transDocDate || "").trim(),
    fromPincode,
    toPincode,
    routeKey,
    distanceSource,
    distanceConfirmed: distanceKm > 0 && (details.distanceConfirmed === true || distanceSource !== "local-estimate")
  };
}

function formatShippingAddressesForForm(addresses = []) {
  return normalizeShippingAddresses(addresses).map(address => [
    address.label || "Ship To",
    address.name || "",
    address.gstin || "",
    address.place || "",
    address.address || ""
  ].join(" | ")).join("\n");
}

function parseShippingAddressesFromText(value, existingAddresses = []) {
  const existing = normalizeShippingAddresses(existingAddresses);
  return String(value || "")
    .split(/\n+/)
    .map(line => parseShippingAddressLine(line, existing))
    .filter(Boolean);
}

function parseShippingAddressLine(line, existingAddresses = []) {
  const parts = String(line || "").split("|").map(part => part.trim());
  if (!parts.some(Boolean)) return null;
  const [label = "", name = "", gstin = "", place = "", ...addressParts] = parts;
  const address = {
    label: label || name || "Ship To",
    name: name || "",
    gstin: normalizeGstin(gstin),
    place: place || stateNameFromGstin(gstin) || "",
    address: addressParts.join(" | ") || (parts.length === 1 ? parts[0] : "")
  };
  const matched = existingAddresses.find(row => sameAddressSnapshot(shippingAddressSnapshot(row), shippingAddressSnapshot(address)));
  return {
    id: matched?.id || uid(),
    ...address
  };
}

function formatSupplierLocationsForForm(locations = []) {
  return normalizeSupplierLocations(locations).map(location => [
    location.isDefault ? "Default" : (location.label || `PIN ${location.pincode}`),
    location.place || "",
    location.pincode || "",
    location.address || ""
  ].join(" | ")).join("\n");
}

function parseSupplierLocationsFromText(value, existingLocations = []) {
  const existing = normalizeSupplierLocations(existingLocations);
  const parsed = String(value || "")
    .split(/\n+/)
    .map((line, index) => parseSupplierLocationLine(line, existing, index))
    .filter(Boolean);
  if (parsed.length && !parsed.some(location => location.isDefault)) parsed[0].isDefault = true;
  return normalizeSupplierLocations(parsed);
}

function parseSupplierLocationLine(line, existingLocations = [], index = 0) {
  const parts = String(line || "").split("|").map(part => part.trim());
  if (!parts.some(Boolean)) return null;
  const [rawLabel = "", place = "", rawPincode = "", ...addressParts] = parts;
  const pincode = normalizePincode(rawPincode || extractPreferredPincode(addressParts.join(" | ")));
  const address = addressWithUpdatedPincode(addressParts.join(" | "), pincode);
  const isDefault = /^default$/i.test(rawLabel);
  const location = {
    label: isDefault ? (place || (pincode ? `PIN ${pincode}` : "Default")) : (rawLabel || place || `Location ${index + 1}`),
    place,
    address,
    pincode,
    isDefault,
    source: "manual",
    verifiedAt: new Date().toISOString()
  };
  const key = supplierLocationMergeKey(location);
  const matched = existingLocations.find(row => supplierLocationMergeKey(row) === key);
  return { ...location, id: matched?.id || uid() };
}

function mergeTallyBuyerMaster(value) {
  if (value.settings.tallyBuyerMasterVersion === TALLY_BUYER_MASTER_VERSION) return;
  TALLY_BUYER_MASTER.forEach(buyer => {
    const buyerGstin = normalizeGstin(buyer.gstin);
    if (!buyerGstin) return;
    const existing = value.parties.find(party => normalizeGstin(party.gstin) === buyerGstin);
    if (existing) {
      mergeTallyBuyerIntoParty(existing, buyer);
      return;
    }
    value.parties.push({
      id: `tally-buyer-${buyerGstin}`,
      name: buyer.name,
      type: "Customer",
      gstin: buyerGstin,
      phone: "",
      place: buyer.place || stateNameFromGstin(buyerGstin) || "",
      address: buyer.address || "",
      aliases: tallyBuyerAliases(buyer).join("\n")
    });
  });
  value.settings.tallyBuyerMasterVersion = TALLY_BUYER_MASTER_VERSION;
}

function mergeInternalCompanyPartyMaster(value) {
  const profiles = value.settings?.profiles || [];
  profiles.forEach(profile => {
    const gstin = normalizeGstin(profile.gstin);
    if (!gstin) return;
    const existing = value.parties.find(party => normalizeGstin(party.gstin) === gstin);
    const generatedParty = existing?.id === `internal-party-${gstin}`;
    const name = profilePartyName(profile);
    const address = profilePartyAddress(profile);
    const aliases = cleanPartyAliasList([
      ...partyAliasList(existing || {}),
      ...profileAliases(profile)
    ]).join("\n");
    if (!existing) {
      value.parties.push(normalizePartyForState({
        id: `internal-party-${gstin}`,
        name,
        type: "Both",
        gstin,
        phone: profile.phone || "",
        email: profile.email || "",
        place: profile.state || stateNameFromGstin(gstin) || "",
        address,
        aliases,
        shippingAddresses: []
      }));
      return;
    }
    existing.type = mergePartyTypes(existing.type, "Both");
    if (generatedParty || !String(existing.name || "").trim()) existing.name = name;
    if (generatedParty || !String(existing.address || "").trim()) existing.address = address;
    if (generatedParty || !String(existing.place || "").trim()) existing.place = profile.state || stateNameFromGstin(gstin) || "";
    if (!String(existing.phone || "").trim()) existing.phone = profile.phone || "";
    if (!String(existing.email || "").trim()) existing.email = profile.email || "";
    existing.aliases = aliases;
  });
}

function mergeTallyBuyerIntoParty(party, buyer) {
  party.type = mergePartyTypes(party.type, "Customer");
  if (!String(party.name || "").trim() || /^customer\s/i.test(party.name)) party.name = buyer.name;
  if (!normalizeGstin(party.gstin)) party.gstin = normalizeGstin(buyer.gstin);
  if (!String(party.place || "").trim()) party.place = buyer.place || stateNameFromGstin(buyer.gstin) || "";
  if (!String(party.address || "").trim()) party.address = buyer.address || "";
  party.aliases = cleanPartyAliasList([
    ...partyAliasList(party),
    ...tallyBuyerAliases(buyer)
  ]).join("\n");
}

function tallyBuyerAliases(buyer) {
  const aliases = cleanPartyAliasList(buyer.aliases || []);
  return cleanPartyAliasList([
    ...aliases,
    ...aliases.map(initialsAlias).filter(Boolean)
  ]);
}

function initialsAlias(value) {
  const initials = normalizeForAlias(value)
    .split(" ")
    .filter(word => word.length > 1)
    .map(word => word[0])
    .join("")
    .toUpperCase();
  return initials.length >= 3 ? initials : "";
}

function normalizeEntryForState(entry, kind, parties = [], items = []) {
  normalizeCloudEntityMeta(entry);
  entry.paymentSourceId = String(entry.paymentSourceId || "").trim();
  entry.paymentDate = /^\d{4}-\d{2}-\d{2}$/.test(String(entry.paymentDate || "")) ? entry.paymentDate : "";
  entry.paymentReference = String(entry.paymentReference || "").trim();
  entry.reconciledTransactionId = String(entry.reconciledTransactionId || "").trim();
  entry.lines = Array.isArray(entry.lines) ? entry.lines : [];
  const calculated = basicTotals(entry.lines);
  entry.taxable = num(entry.taxable) || calculated.taxable;
  entry.cgst = num(entry.cgst);
  entry.sgst = num(entry.sgst);
  entry.igst = num(entry.igst);
  entry.gst = num(entry.gst) || entry.cgst + entry.sgst + entry.igst || calculated.gst;
  entry.roundOff = num(entry.roundOff);
  entry.total = num(entry.total) || round2(entry.taxable + entry.gst + entry.roundOff);
  entry.taxMode = entry.taxMode || (entry.igst > 0 ? "IGST" : "CGST_SGST");
  entry.reviewMessages = Array.isArray(entry.reviewMessages) ? entry.reviewMessages : [];
  entry.reviewStatus = entry.reviewStatus || (entry.reviewMessages.length ? "Needs Review" : "Ready");
  entry.attachments = Array.isArray(entry.attachments) ? entry.attachments : [];
  entry.rateIncludesGst = true;
  entry.internalTransfer = normalizeInternalTransfer(entry.internalTransfer);
  if (kind === "creditNote" || kind === "purchaseReturn") {
    entry.originalSaleId = String(entry.originalSaleId || "").trim();
    entry.originalInvoiceNumber = String(entry.originalInvoiceNumber || "").trim();
    entry.originalInvoiceDate = String(entry.originalInvoiceDate || "").trim();
    entry.reason = String(entry.reason || "Goods Returned").trim();
    entry.restock = entry.restock !== false;
  }
  entry.lines.forEach(line => {
    const item = items.find(row => row.id === line.itemId);
    if (!String(line.itemName || "").trim() && item?.name) line.itemName = item.name;
    line.hsn = lineHsn(line, item || {});
  });
  if (kind === "sale" || kind === "creditNote") normalizeSaleAddressSnapshots(entry, parties);
  if (kind === "purchase") {
    entry.source = entry.source || "manual";
    entry.ewayDetails = normalizePurchaseEwayDetails(entry.ewayDetails || {});
    if (entry.roundOff) entry.total = round2(entry.taxable + entry.gst + entry.roundOff);
  }
}

function normalizePaymentSourceForState(source = {}) {
  const normalized = {
    id: String(source.id || uid()),
    profileId: String(source.profileId || "gst-1"),
    type: ["Bank Account", "Credit Card", "UPI", "Cash"].includes(source.type) ? source.type : "Bank Account",
    name: String(source.name || source.institution || "Payment Source").trim(),
    institution: String(source.institution || "").trim(),
    last4: String(source.last4 || "").replace(/\D/g, "").slice(-4),
    accountName: String(source.accountName || "").trim(),
    openingBalance: round2(source.openingBalance),
    statementDay: Math.min(31, Math.max(0, Math.round(num(source.statementDay)))),
    dueDay: Math.min(31, Math.max(0, Math.round(num(source.dueDay)))),
    active: source.active !== false,
    systemDefault: Boolean(source.systemDefault)
  };
  normalizeCloudEntityMeta(normalized, source);
  return normalized;
}

function normalizeBankTransactionForState(transaction = {}) {
  const status = ["unmatched", "suggested", "matched", "difference", "ignored"].includes(transaction.status)
    ? transaction.status
    : "unmatched";
  const normalized = {
    id: String(transaction.id || uid()),
    profileId: String(transaction.profileId || "gst-1"),
    paymentSourceId: String(transaction.paymentSourceId || ""),
    date: /^\d{4}-\d{2}-\d{2}$/.test(String(transaction.date || "")) ? transaction.date : "",
    description: String(transaction.description || "").trim(),
    reference: String(transaction.reference || "").trim(),
    debit: Math.max(0, round2(transaction.debit)),
    credit: Math.max(0, round2(transaction.credit)),
    balance: round2(transaction.balance),
    status,
    matchEntryType: ["sale", "purchase"].includes(transaction.matchEntryType) ? transaction.matchEntryType : "",
    matchEntryId: String(transaction.matchEntryId || ""),
    suggestedEntryType: ["sale", "purchase"].includes(transaction.suggestedEntryType) ? transaction.suggestedEntryType : "",
    suggestedEntryId: String(transaction.suggestedEntryId || ""),
    matchedAmount: Math.max(0, round2(transaction.matchedAmount)),
    difference: round2(transaction.difference),
    differenceAccepted: Boolean(transaction.differenceAccepted),
    fingerprint: String(transaction.fingerprint || ""),
    importBatchId: String(transaction.importBatchId || ""),
    sourceFile: String(transaction.sourceFile || "").trim(),
    importedAt: String(transaction.importedAt || "")
  };
  normalizeCloudEntityMeta(normalized, transaction);
  return normalized;
}

function normalizeTallySyncRunForState(run = {}) {
  const normalized = {
    id: String(run.id || uid()),
    profileId: String(run.profileId || "gst-1"),
    runType: ["masters-export", "vouchers-export", "masters-import", "data-import"].includes(run.runType)
      ? run.runType
      : "vouchers-export",
    status: ["Exported", "Imported", "Applied", "Failed"].includes(run.status) ? run.status : "Exported",
    fileName: String(run.fileName || "").trim(),
    sourceFile: String(run.sourceFile || "").trim(),
    fromDate: /^\d{4}-\d{2}-\d{2}$/.test(String(run.fromDate || "")) ? run.fromDate : "",
    toDate: /^\d{4}-\d{2}-\d{2}$/.test(String(run.toDate || "")) ? run.toDate : "",
    documentCount: Math.max(0, Math.round(num(run.documentCount))),
    entryRefs: Array.isArray(run.entryRefs) ? [...new Set(run.entryRefs.map(value => String(value || "").trim()).filter(Boolean))] : [],
    counts: run.counts && typeof run.counts === "object" ? clone(run.counts) : {},
    message: String(run.message || "").trim()
  };
  normalizeCloudEntityMeta(normalized, run);
  return normalized;
}

function normalizePurchaseImportBatchForState(batch = {}) {
  const allowedStatuses = new Set(["extracting", "review", "partial", "completed"]);
  const normalized = {
    id: String(batch.id || uid()),
    status: allowedStatuses.has(batch.status) ? batch.status : "review",
    fileCount: Math.max(0, Math.round(num(batch.fileCount))),
    approvedCount: Math.max(0, Math.round(num(batch.approvedCount))),
    completedAt: String(batch.completedAt || ""),
    label: String(batch.label || "").trim()
  };
  normalizeCloudEntityMeta(normalized, batch);
  return normalized;
}

function normalizePurchaseImportDocumentForState(document = {}) {
  const allowedStatuses = new Set(["queued", "extracting", "ready", "needs-review", "duplicate", "failed", "approving", "approved"]);
  const normalized = {
    id: String(document.id || uid()),
    batchId: String(document.batchId || ""),
    fileName: String(document.fileName || document.parsed?.fileName || "Invoice").trim(),
    mimeType: String(document.mimeType || "application/octet-stream"),
    size: Math.max(0, num(document.size)),
    fileHash: String(document.fileHash || ""),
    status: allowedStatuses.has(document.status) ? document.status : "queued",
    selected: Boolean(document.selected),
    parsed: normalizePurchaseImportParsedForState(document.parsed || {}, document.fileName),
    validationErrors: uniqueMessages(document.validationErrors || []),
    validationWarnings: uniqueMessages(document.validationWarnings || []),
    duplicatePurchaseId: String(document.duplicatePurchaseId || ""),
    approvedPurchaseId: String(document.approvedPurchaseId || ""),
    error: String(document.error || "")
  };
  normalizeCloudEntityMeta(normalized, document);
  return normalized;
}

function normalizeDeletionTombstones(rows = []) {
  const byKey = new Map();
  (Array.isArray(rows) ? rows : []).forEach(row => {
    const normalized = normalizeDeletionTombstoneForState(row);
    if (!normalized) return;
    const key = deletionTombstoneMergeKey(normalized);
    const existing = byKey.get(key);
    if (!existing || deletionTombstoneTimestamp(normalized) >= deletionTombstoneTimestamp(existing)) {
      byKey.set(key, normalized);
    }
  });
  return [...byKey.values()];
}

function normalizeDeletionTombstoneForState(tombstone = {}) {
  const entityType = normalizeDeletionEntityType(tombstone.entityType || tombstone.kind);
  const entityId = String(tombstone.entityId || tombstone.entryId || "").trim();
  if (!entityType || !entityId) return null;
  const deletedAt = cloudTimestamp(tombstone.deletedAt || tombstone.updatedAt || tombstone.createdAt);
  const normalized = {
    id: `${entityType}:${entityId}`,
    entityType,
    entityId,
    profileId: String(tombstone.profileId || tombstone.beforeData?.profileId || ""),
    documentNumber: String(tombstone.documentNumber || tombstone.beforeData?.number || ""),
    deletedAt,
    deletedBy: String(tombstone.deletedBy || tombstone.createdBy || ""),
    beforeData: tombstone.beforeData && typeof tombstone.beforeData === "object"
      ? clone(tombstone.beforeData)
      : null
  };
  normalizeCloudEntityMeta(normalized, tombstone);
  normalized.createdAt = normalized.createdAt || deletedAt;
  normalized.updatedAt = normalized.updatedAt || deletedAt;
  return normalized;
}

function normalizeDeletionEntityType(value) {
  const normalized = String(value || "").trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (["purchase", "purchases"].includes(normalized)) return "purchase";
  if (["po", "purchase_order", "purchase_orders", "purchaseorder", "purchaseorders"].includes(normalized)) return "po";
  return "";
}

function deletionTombstoneTimestamp(tombstone = {}) {
  return new Date(tombstone.deletedAt || tombstone.updatedAt || tombstone.createdAt || 0).getTime() || 0;
}

function applyDeletionTombstones(targetState = {}) {
  const mappings = [
    ["purchase", "purchases"],
    ["po", "purchaseOrders"]
  ];
  let changed = false;
  mappings.forEach(([entityType, stateKey]) => {
    const deletedIds = new Set((targetState.deletionTombstones || [])
      .filter(tombstone => normalizeDeletionEntityType(tombstone.entityType) === entityType)
      .map(tombstone => String(tombstone.entityId || "").trim())
      .filter(Boolean));
    if (!deletedIds.size || !Array.isArray(targetState[stateKey])) return;
    const filtered = targetState[stateKey].filter(entry => !deletedIds.has(String(entry.id || "")));
    if (filtered.length !== targetState[stateKey].length) {
      targetState[stateKey] = filtered;
      changed = true;
    }
  });
  return changed;
}

function normalizePurchaseImportParsedForState(parsed = {}, fallbackFileName = "") {
  const lines = (Array.isArray(parsed.lines) ? parsed.lines : []).map(line => {
    const gstRate = line.gstRate === undefined || line.gstRate === null ? DEFAULT_SALE_GST_RATE : num(line.gstRate);
    const grossRate = num(line.grossRate) || inclusiveRateFromTaxable(line.rate, gstRate);
    return {
      name: String(line.name || line.itemName || "").trim(),
      hsn: normalizeLineHsn(line.hsn) || DEFAULT_SALE_HSN,
      qty: num(line.qty),
      rate: num(line.rate) || taxableRateFromInclusive(grossRate, gstRate),
      grossRate,
      gstRate,
      imeiNumbers: normalizeImeiNumbers(line.imeiNumbers || "")
    };
  });
  const parsedEwayDetails = parsed.ewayDetails && typeof parsed.ewayDetails === "object"
    ? parsed.ewayDetails
    : {};
  const ewayDetails = normalizePurchaseEwayDetails({
    ...parsedEwayDetails,
    fromPincode: parsedEwayDetails.fromPincode
      || extractPreferredPincode(parsed.supplierAddress || parsed.supplierPlace),
    toPincode: parsedEwayDetails.toPincode
      || extractPreferredPincode(parsed.buyerAddress || parsed.buyerPlace),
    destinationPreset: parsedEwayDetails.destinationPreset || "buyer",
    dispatchFromAddress: parsedEwayDetails.dispatchFromAddress || parsed.supplierAddress || ""
  });
  return {
    fileName: String(parsed.fileName || fallbackFileName || "Invoice").trim(),
    profileId: String(parsed.profileId || ""),
    supplierName: String(parsed.supplierName || "").trim(),
    supplierGstin: normalizeGstin(parsed.supplierGstin),
    supplierAddress: String(parsed.supplierAddress || "").trim(),
    supplierPlace: String(parsed.supplierPlace || "").trim(),
    supplierLocationId: String(parsed.supplierLocationId || "").trim(),
    supplierPincodeSource: String(parsed.supplierPincodeSource || "").trim(),
    supplierLocationAmbiguous: Boolean(parsed.supplierLocationAmbiguous),
    buyerName: String(parsed.buyerName || "").trim(),
    buyerGstin: normalizeGstin(parsed.buyerGstin),
    buyerAddress: String(parsed.buyerAddress || "").trim(),
    buyerPlace: String(parsed.buyerPlace || "").trim(),
    invoiceNumber: String(parsed.invoiceNumber || "").trim(),
    invoiceDate: String(parsed.invoiceDate || ""),
    taxable: round2(parsed.taxable),
    gst: round2(parsed.gst),
    total: round2(parsed.total),
    roundOff: round2(parsed.roundOff),
    extractedTaxes: parsed.extractedTaxes && typeof parsed.extractedTaxes === "object" ? clone(parsed.extractedTaxes) : null,
    reviewMessages: uniqueMessages(parsed.reviewMessages || []),
    attachments: Array.isArray(parsed.attachments) ? clone(parsed.attachments) : [],
    ewayDetails,
    lines
  };
}

function normalizeInternalTransfer(value = null) {
  if (!value || typeof value !== "object") return null;
  const normalized = {
    role: String(value.role || "").trim(),
    linkedSaleId: String(value.linkedSaleId || "").trim(),
    linkedPurchaseId: String(value.linkedPurchaseId || "").trim(),
    linkedCreditNoteId: String(value.linkedCreditNoteId || "").trim(),
    linkedPurchaseReturnId: String(value.linkedPurchaseReturnId || "").trim(),
    sellerProfileId: String(value.sellerProfileId || "").trim(),
    buyerProfileId: String(value.buyerProfileId || "").trim(),
    createdAt: String(value.createdAt || "").trim(),
    updatedAt: String(value.updatedAt || "").trim()
  };
  return Object.values(normalized).some(Boolean) ? normalized : null;
}

function normalizeCloudEntityMeta(target, source = target) {
  if (!target) return target;
  target.syncStatus = source.syncStatus || SYNC_STATUS_SYNCED;
  target.createdAt = source.createdAt || source.created_at || "";
  target.updatedAt = source.updatedAt || source.updated_at || "";
  target.createdBy = source.createdBy || source.created_by || "";
  target.lastSyncedAt = source.lastSyncedAt || source.last_synced_at || "";
  return target;
}

function normalizeSaleAddressSnapshots(entry, parties = []) {
  const party = parties.find(row => row.id === entry.partyId) || {};
  entry.billToSnapshot = normalizeAddressSnapshot(entry.billToSnapshot || entry.billTo || partyAddressSnapshot(party));
  entry.shipToSnapshot = normalizeAddressSnapshot(entry.shipToSnapshot || entry.shipTo || entry.billToSnapshot);
  entry.shipToSameAsBillTo = entry.shipToSameAsBillTo ?? sameAddressSnapshot(entry.billToSnapshot, entry.shipToSnapshot);
  entry.shipToAddressId = entry.shipToAddressId || "";
}

function normalizeAddressSnapshot(address = {}) {
  return {
    name: address.name || "",
    gstin: normalizeGstin(address.gstin || ""),
    address: address.address || "",
    place: address.place || "",
    state: address.state || stateNameFromGstin(address.gstin) || address.place || ""
  };
}

function sameAddressSnapshot(a = {}, b = {}) {
  return normalizeForAlias(a.name) === normalizeForAlias(b.name)
    && normalizeGstin(a.gstin) === normalizeGstin(b.gstin)
    && normalizeForAlias(a.address) === normalizeForAlias(b.address)
    && normalizeForAlias(a.place || a.state) === normalizeForAlias(b.place || b.state);
}

function partyAddressSnapshot(party = {}) {
  return normalizeAddressSnapshot({
    name: party.name || "",
    gstin: party.gstin || "",
    address: party.address || "",
    place: party.place || stateNameFromGstin(party.gstin) || "",
    state: stateNameFromGstin(party.gstin) || party.place || ""
  });
}

function shippingAddressSnapshot(address = {}, party = {}) {
  return normalizeAddressSnapshot({
    name: address.name || party.name || "",
    gstin: address.gstin || party.gstin || "",
    address: address.address || "",
    place: address.place || stateNameFromGstin(address.gstin || party.gstin) || "",
    state: stateNameFromGstin(address.gstin || party.gstin) || address.place || ""
  });
}

function saveState(options = {}) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (!options.skipLocalBackup) rememberLocalStateBackup(state);
  if (!options.skipCloud) scheduleCloudSave();
}

function money(value) {
  const symbol = state.settings.currency || "Rs.";
  return `${symbol}${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function activeProfile() {
  return profileById(state.settings.activeProfileId);
}

function activeProfileId() {
  return state.settings.activeProfileId;
}

function restoreDeviceActiveProfile(targetState, preferredProfileId = "") {
  if (!targetState?.settings?.profiles?.length) return targetState;
  let storedProfileId = "";
  try {
    storedProfileId = localStorage.getItem(DEVICE_ACTIVE_PROFILE_KEY) || "";
  } catch {
    storedProfileId = "";
  }
  const profileId = preferredProfileId || storedProfileId || targetState.settings.activeProfileId;
  if (targetState.settings.profiles.some(profile => profile.id === profileId)) {
    targetState.settings.activeProfileId = profileId;
  }
  return targetState;
}

function setActiveProfileId(profileId) {
  if (!state.settings.profiles.some(profile => profile.id === profileId)) return false;
  state.settings.activeProfileId = profileId;
  try {
    localStorage.setItem(DEVICE_ACTIVE_PROFILE_KEY, profileId);
  } catch {
    // The current page still keeps the selection when local storage is unavailable.
  }
  return true;
}

function profileById(id) {
  return state.settings.profiles.find(profile => profile.id === id) || state.settings.profiles[0];
}

function profileName(id) {
  const profile = profileById(id);
  const gst = profile.gstin ? ` - ${profile.gstin}` : "";
  return `${profile.label || profile.businessName}${gst}`;
}

function firmLogoMarkup(profile, className = "firm-logo") {
  const logo = FIRM_LOGOS[profile?.id] || fallbackFirmLogo(profile);
  const title = `${profile?.businessName || profile?.label || "Business"} logo`;
  if (logo.markSrc) {
    const useWordmark = className === "po-firm-logo" && logo.wordmarkSrc;
    const src = useWordmark ? logo.wordmarkSrc : logo.markSrc;
    const variantClass = useWordmark ? "firm-logo-wordmark" : "firm-logo-image";
    return `<span class="${escapeHtml(className)} ${variantClass}" title="${escapeHtml(title)}"><img src="${escapeHtml(src)}" alt="" decoding="async"></span>`;
  }
  return `<span class="${escapeHtml(className)}" title="${escapeHtml(title)}">${firmLogoSvg(logo)}</span>`;
}

async function loadFirmPdfLogo(profile, documentKind = "invoice") {
  const logo = FIRM_LOGOS[profile?.id];
  if (!logo?.markSrc) return null;
  const useWordmark = documentKind === "po" && logo.wordmarkSrc;
  const src = useWordmark ? logo.wordmarkSrc : logo.markSrc;
  const key = `${profile.id}:${src}`;
  if (!FIRM_PDF_LOGO_CACHE.has(key)) {
    FIRM_PDF_LOGO_CACHE.set(key, fetch(src).then(async response => {
      if (!response.ok) throw new Error(`Logo could not be loaded (${response.status})`);
      return {
        key,
        bytes: new Uint8Array(await response.arrayBuffer()),
        width: useWordmark ? logo.wordmarkWidth : logo.markWidth,
        height: useWordmark ? logo.wordmarkHeight : logo.markHeight
      };
    }));
  }
  try {
    return await FIRM_PDF_LOGO_CACHE.get(key);
  } catch {
    FIRM_PDF_LOGO_CACHE.delete(key);
    return null;
  }
}

function fallbackFirmLogo(profile) {
  return {
    initials: companyInitials(profile?.businessName || profile?.label || "B"),
    kind: "orbit",
    primary: "#334155",
    accent: "#0f766e",
    ink: "#0f172a"
  };
}

function firmLogoSvg(logo) {
  const initials = escapeHtml(logo.initials || "");
  const fontSize = initials.length > 2 ? 11 : 14;
  const base = `
    <rect x="5" y="5" width="54" height="54" rx="15" fill="#ffffff" stroke="#d1d5db" stroke-width="1.5"/>
    <path d="M7 47c15-9 32-12 50-6v18H7z" fill="${logo.primary}" opacity=".08"/>
    <path d="M13 50h38" fill="none" stroke="${logo.primary}" stroke-width="3" stroke-linecap="round"/>`;
  const mark = firmLogoMark(logo);
  const text = `<text x="32" y="55" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="800" fill="${logo.ink}" letter-spacing="0">${initials}</text>`;
  return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">${base}${mark}${text}</svg>`;
}

function firmLogoMark(logo) {
  switch (logo.kind) {
    case "phoneOrbit":
      return `
        <rect x="24" y="12" width="16" height="27" rx="4.5" fill="#ffffff" stroke="${logo.primary}" stroke-width="3"/>
        <path d="M28 17h8M31 34h2" stroke="${logo.accent}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M17 25c7-8 24-10 31-1M18 31c8 7 23 7 29-1" fill="none" stroke="${logo.accent}" stroke-width="2.5" stroke-linecap="round"/>`;
    case "deviceSpark":
      return `
        <rect x="21" y="12" width="21" height="28" rx="5" fill="#ffffff" stroke="${logo.primary}" stroke-width="3"/>
        <path d="M26 18h11M28 35h7" stroke="${logo.accent}" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M47 14l1.8 4.1 4.2 1.7-4.2 1.8L47 26l-1.8-4.4-4.2-1.8 4.2-1.7z" fill="${logo.accent}"/>`;
    case "stackedPhones":
      return `
        <rect x="18" y="17" width="16" height="24" rx="4" fill="#ffffff" stroke="${logo.accent}" stroke-width="2.7"/>
        <rect x="29" y="12" width="18" height="29" rx="4.5" fill="#ffffff" stroke="${logo.primary}" stroke-width="3"/>
        <path d="M34 18h8M36 36h4" stroke="${logo.primary}" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="25" cy="35" r="1.3" fill="${logo.accent}"/>`;
    case "pixelPhone":
      return `
        <rect x="20" y="12" width="24" height="30" rx="5" fill="#ffffff" stroke="${logo.primary}" stroke-width="3"/>
        <rect x="25" y="18" width="5" height="5" rx="1.2" fill="${logo.primary}"/>
        <rect x="34" y="18" width="5" height="5" rx="1.2" fill="${logo.accent}"/>
        <rect x="25" y="27" width="5" height="5" rx="1.2" fill="${logo.accent}"/>
        <rect x="34" y="27" width="5" height="5" rx="1.2" fill="${logo.primary}"/>
        <path d="M29 37h6" stroke="${logo.ink}" stroke-width="2.2" stroke-linecap="round"/>`;
    case "cameraChip":
      return `
        <rect x="19" y="14" width="26" height="26" rx="6" fill="#ffffff" stroke="${logo.primary}" stroke-width="3"/>
        <circle cx="32" cy="27" r="7.5" fill="none" stroke="${logo.accent}" stroke-width="3"/>
        <circle cx="32" cy="27" r="2.7" fill="${logo.ink}"/>
        <path d="M16 21h4M16 33h4M44 21h4M44 33h4M26 11v4M38 11v4M26 39v4M38 39v4" stroke="${logo.primary}" stroke-width="2" stroke-linecap="round"/>`;
    case "retailDevice":
      return `
        <rect x="22" y="13" width="17" height="28" rx="5" fill="#ffffff" stroke="${logo.primary}" stroke-width="3"/>
        <path d="M27 18h7M29 36h3" stroke="${logo.accent}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M41 20h8l-1.5 11h-5z" fill="#ffffff" stroke="${logo.accent}" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M43 20c0-3 3-4 4 0" fill="none" stroke="${logo.accent}" stroke-width="2.1" stroke-linecap="round"/>`;
    case "signalPhone":
      return `
        <rect x="22" y="14" width="18" height="27" rx="4.5" fill="#ffffff" stroke="${logo.primary}" stroke-width="3"/>
        <path d="M27 19h8M29 36h4" stroke="${logo.accent}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M42 18c3 2 5 5 5 9s-2 7-5 9M46 13c5 4 8 8 8 14s-3 11-8 15" fill="none" stroke="${logo.accent}" stroke-width="2.5" stroke-linecap="round"/>`;
    case "dualPhones":
      return `
        <rect x="18" y="16" width="16" height="24" rx="4" fill="#ffffff" stroke="${logo.primary}" stroke-width="2.8"/>
        <rect x="31" y="12" width="17" height="29" rx="4.5" fill="#ffffff" stroke="${logo.accent}" stroke-width="2.8"/>
        <path d="M23 21h6M36 18h7M24 36h4M37 37h5" stroke="${logo.ink}" stroke-width="2" stroke-linecap="round"/>
        <path d="M15 29h4M48 25h4" stroke="${logo.primary}" stroke-width="2.4" stroke-linecap="round"/>`;
    case "lotus":
    case "device":
    case "wave":
    case "grid":
    case "node":
    case "trade":
    case "lens":
    case "apex":
    default:
      return `
        <rect x="23" y="13" width="18" height="28" rx="5" fill="#ffffff" stroke="${logo.primary}" stroke-width="3"/>
        <path d="M28 18h8M29 36h6" stroke="${logo.accent}" stroke-width="2.3" stroke-linecap="round"/>
        <circle cx="44" cy="18" r="3" fill="${logo.accent}"/>`;
  }
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

function currentMonthKey() {
  return today().slice(0, 7);
}

function entryMonthKey(entry) {
  return String(entry?.date || "").slice(0, 7) || currentMonthKey();
}

function monthLabel(monthKey) {
  if (monthKey === ALL_MONTHS_KEY) return "All months";
  const [year, month] = String(monthKey || currentMonthKey()).split("-").map(Number);
  if (!year || !month) return "Current month";
  return new Date(year, month - 1, 1).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
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
  if (kind === "sale") return state.sales;
  if (kind === "creditNote") return state.creditNotes;
  if (kind === "purchase") return state.purchases;
  if (kind === "purchaseReturn") return state.purchaseReturns;
  if (kind === "po") return state.purchaseOrders;
  return [];
}

function activeEntries(kind) {
  return entryList(kind).filter(entry => entry.profileId === activeProfileId());
}

function defaultEntryMonth(kind, profileId = activeProfileId()) {
  const months = entryList(kind)
    .filter(entry => entry.profileId === profileId)
    .map(entryMonthKey)
    .filter(Boolean)
    .sort((a, b) => b.localeCompare(a));
  return months[0] || currentMonthKey();
}

function defaultCreditDocumentMonth(profileId = activeProfileId()) {
  const months = [...state.creditNotes, ...state.purchaseReturns]
    .filter(entry => entry.profileId === profileId)
    .map(entryMonthKey)
    .filter(Boolean)
    .sort((a, b) => b.localeCompare(a));
  return months[0] || currentMonthKey();
}

function isMobileDeviceView() {
  return deviceViewMode === "mobile"
    || document.documentElement.dataset.deviceView === "mobile"
    || window.matchMedia?.("(max-width: 820px)").matches;
}

function mobilePurchaseUsesSpecificMonth(kind) {
  return (kind === "purchase" || kind === "po" || kind === "creditNote" || kind === "purchaseReturn") && isMobileDeviceView();
}

function selectedEntryMonth(kind) {
  const selected = entryMonthFilters[kind] || defaultEntryMonth(kind);
  return mobilePurchaseUsesSpecificMonth(kind) && selected === ALL_MONTHS_KEY
    ? defaultEntryMonth(kind)
    : selected;
}

function monthFilteredEntries(kind) {
  const monthKey = selectedEntryMonth(kind);
  if (monthKey === ALL_MONTHS_KEY) return activeEntries(kind);
  return activeEntries(kind).filter(entry => entryMonthKey(entry) === monthKey);
}

function entryMonthOptions(kind) {
  const selected = selectedEntryMonth(kind);
  const entryMonths = activeEntries(kind).map(entryMonthKey);
  const options = mobilePurchaseUsesSpecificMonth(kind)
    ? [selected, ...entryMonths, ...(entryMonths.length ? [] : [currentMonthKey()])]
    : [ALL_MONTHS_KEY, selected, currentMonthKey(), ...entryMonths];
  return [...new Set(options)]
    .filter(Boolean)
    .sort((a, b) => {
      if (a === ALL_MONTHS_KEY) return -1;
      if (b === ALL_MONTHS_KEY) return 1;
      return b.localeCompare(a);
    });
}

function renderEntryMonthFilter(kind) {
  const select = kind === "sale"
    ? $("#salesMonthFilter")
    : kind === "creditNote" || kind === "purchaseReturn"
      ? $("#creditNoteMonthFilter")
      : kind === "purchase"
        ? $("#purchaseMonthFilter")
        : $("#poMonthFilter");
  if (!select) return;
  const selected = selectedEntryMonth(kind);
  select.innerHTML = entryMonthOptions(kind)
    .map(monthKey => `<option value="${escapeHtml(monthKey)}" ${monthKey === selected ? "selected" : ""}>${escapeHtml(monthLabel(monthKey))}</option>`)
    .join("");
  select.value = selected;
}

function isCancelledEntry(entry) {
  return Boolean(entry?.cancelled) || entry?.status === "Cancelled";
}

function activeAccountingEntries(kind) {
  return activeEntries(kind).filter(entry => !isCancelledEntry(entry));
}

function entryPrefix(kind) {
  if (kind === "sale") return "SALE";
  if (kind === "creditNote") return "CN";
  if (kind === "purchase") return "PUR";
  if (kind === "purchaseReturn") return "PR";
  return "PO";
}

function nextEntryNumber(kind, profileId = state.settings.activeProfileId) {
  if (kind === "sale") return nextSaleInvoiceNumber(profileId);
  if (kind === "creditNote") return nextCreditNoteNumber(profileId);
  const key = kind === "purchase" ? "nextPurchaseNo" : "nextPoNo";
  const profile = profileById(profileId);
  return `${entryPrefix(kind)}-${String(profile[key] || 1).padStart(4, "0")}`;
}

function saleNumberRule(profileId) {
  return SALE_INVOICE_NUMBER_RULES[profileId] || null;
}

function formatSaleInvoiceNumber(profileId, sequence) {
  const rule = saleNumberRule(profileId);
  if (!rule) return `${entryPrefix("sale")}-${String(sequence || 1).padStart(4, "0")}`;
  return `${rule.prefix}/${String(Math.max(rule.start, num(sequence))).padStart(rule.width, "0")}`;
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function saleInvoiceSequenceFromNumber(profileId, value) {
  const rule = saleNumberRule(profileId);
  if (!rule) return null;
  const match = String(value || "").trim().match(new RegExp(`^${escapeRegExp(rule.prefix)}\\/(\\d+)$`));
  return match ? num(match[1]) : null;
}

function nextSaleSequence(profileId, salesEntries = []) {
  const rule = saleNumberRule(profileId);
  if (!rule) return 1;
  const highestSaved = salesEntries.reduce((highest, entry) => {
    if (entry.profileId !== profileId) return highest;
    const sequence = saleInvoiceSequenceFromNumber(profileId, entry.number);
    return sequence ? Math.max(highest, sequence) : highest;
  }, rule.start - 1);
  return Math.max(rule.start, highestSaved + 1);
}

function nextSaleInvoiceNumber(profileId, excludeId = "") {
  return formatSaleInvoiceNumber(
    profileId,
    nextSaleSequence(profileId, state.sales.filter(entry => entry.id !== excludeId))
  );
}

function saleInvoiceNumberExists(number, excludeId = "") {
  const target = String(number || "").trim();
  return state.sales.some(entry => entry.id !== excludeId && String(entry.number || "").trim() === target);
}

function saleInvoiceNumberForDialog(source, profileId) {
  if (!source?.number) return nextSaleInvoiceNumber(profileId);
  const sequence = saleInvoiceSequenceFromNumber(profileId, source.number);
  if (!sequence) return nextSaleInvoiceNumber(profileId, source.id || editingEntryId);
  const formatted = formatSaleInvoiceNumber(profileId, sequence);
  return saleInvoiceNumberExists(formatted, source.id || editingEntryId)
    ? nextSaleInvoiceNumber(profileId, source.id || editingEntryId)
    : formatted;
}

function saleInvoiceNumberForSave(profileId, requestedNumber, excludeId = "") {
  const sequence = saleInvoiceSequenceFromNumber(profileId, requestedNumber);
  if (sequence) {
    const formatted = formatSaleInvoiceNumber(profileId, sequence);
    if (!saleInvoiceNumberExists(formatted, excludeId)) return formatted;
  }
  return nextSaleInvoiceNumber(profileId, excludeId);
}

function syncSaleNumberingForProfiles(profiles, salesEntries = []) {
  profiles.forEach(profile => {
    if (saleNumberRule(profile.id)) profile.nextSaleNo = nextSaleSequence(profile.id, salesEntries);
  });
}

function creditNoteNumberRule(profileId) {
  return CREDIT_NOTE_NUMBER_RULES[profileId] || null;
}

function formatCreditNoteNumber(profileId, sequence) {
  const rule = creditNoteNumberRule(profileId);
  if (!rule) return `${entryPrefix("creditNote")}-${String(sequence || 1).padStart(4, "0")}`;
  return `${rule.prefix}/${String(Math.max(rule.start, num(sequence))).padStart(rule.width, "0")}`;
}

function creditNoteSequenceFromNumber(profileId, value) {
  const rule = creditNoteNumberRule(profileId);
  if (!rule) return null;
  const match = String(value || "").trim().match(new RegExp(`^${escapeRegExp(rule.prefix)}\\/(\\d+)$`));
  return match ? num(match[1]) : null;
}

function nextCreditNoteSequence(profileId, entries = state.creditNotes) {
  const rule = creditNoteNumberRule(profileId);
  if (!rule) return 1;
  const highestSaved = entries.reduce((highest, entry) => {
    if (entry.profileId !== profileId) return highest;
    const sequence = creditNoteSequenceFromNumber(profileId, entry.number);
    return sequence ? Math.max(highest, sequence) : highest;
  }, rule.start - 1);
  return Math.max(rule.start, highestSaved + 1);
}

function nextCreditNoteNumber(profileId, excludeId = "") {
  return formatCreditNoteNumber(
    profileId,
    nextCreditNoteSequence(profileId, state.creditNotes.filter(entry => entry.id !== excludeId))
  );
}

function creditNoteNumberExists(number, excludeId = "") {
  const target = String(number || "").trim();
  return state.creditNotes.some(entry => entry.id !== excludeId && String(entry.number || "").trim() === target);
}

function normalizeGstin(value) {
  return String(value || "").toUpperCase().replace(/[^0-9A-Z]/g, "");
}

function isValidGstin(value) {
  return /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(normalizeGstin(value));
}

function stateCodeFromGstin(gstin) {
  const normalized = normalizeGstin(gstin);
  return /^\d{2}/.test(normalized) ? normalized.slice(0, 2) : "";
}

function profileByGstin(gstin) {
  const normalized = normalizeGstin(gstin);
  return state.settings.profiles.find(profile => normalizeGstin(profile.gstin) === normalized);
}

function partyById(id) {
  return state.parties.find(row => row.id === id);
}

function internalBuyerProfileForSale(entry = {}) {
  const buyerGstin = normalizeGstin(entry.buyerGstin || partyById(entry.partyId)?.gstin);
  if (!buyerGstin) return null;
  const buyerProfile = profileByGstin(buyerGstin);
  if (!buyerProfile || buyerProfile.id === entry.profileId) return null;
  return buyerProfile;
}

function profilePartyName(profile = {}) {
  return profile.businessName || profile.label || profile.legalName || "Internal Company";
}

function profilePartyAddress(profile = {}) {
  return profile.address || profile.state || "";
}

function ensureInternalCompanyParty(profile, role = "Supplier") {
  const gstin = normalizeGstin(profile?.gstin);
  if (!gstin) return null;
  const existing = state.parties.find(party => normalizeGstin(party.gstin) === gstin);
  const next = {
    ...(existing || {}),
    id: existing?.id || `internal-party-${gstin}`,
    name: existing?.name || profilePartyName(profile),
    type: mergePartyTypes(existing?.type || role, role),
    gstin,
    phone: existing?.phone || profile.phone || "",
    email: existing?.email || profile.email || "",
    place: existing?.place || profile.state || stateNameFromGstin(gstin) || "",
    address: existing?.address || profilePartyAddress(profile),
    aliases: existing?.aliases || (GST_PROFILE_ALIASES[profile.id] || []).join("\n"),
    shippingAddresses: existing?.shippingAddresses || []
  };
  const party = entityWithLocalMeta(next, existing);
  const index = state.parties.findIndex(row => row.id === party.id);
  if (index >= 0) state.parties[index] = party;
  else state.parties.push(party);
  return party;
}

function findLinkedInternalPurchaseForSale(entry = {}) {
  const linkedId = entry.internalTransfer?.linkedPurchaseId;
  if (linkedId) {
    const linked = state.purchases.find(purchase => purchase.id === linkedId);
    if (linked) return linked;
  }
  const bySaleId = state.purchases.find(purchase => purchase.internalTransfer?.linkedSaleId === entry.id);
  if (bySaleId) return bySaleId;
  const buyerProfile = internalBuyerProfileForSale(entry);
  if (!buyerProfile) return null;
  const sellerGstin = normalizeGstin(entry.sellerGstin || profileById(entry.profileId)?.gstin);
  const invoiceNumber = String(entry.number || "").trim();
  return state.purchases.find(purchase => (
    purchase.profileId === buyerProfile.id
    && normalizeGstin(purchase.sellerGstin) === sellerGstin
    && String(purchase.number || "").trim() === invoiceNumber
  )) || null;
}

function internalPurchaseLinesFromSale(entry = {}) {
  return clone(entry.lines || []).map(line => ({
    ...line,
    hsn: lineHsn(line),
    itemName: line.itemName || itemName(line.itemId)
  }));
}

function internalPurchaseReviewMessages(saleEntry = {}, sellerProfile = {}, buyerProfile = {}) {
  return uniqueMessages([
    `Internal purchase auto-created from sales bill ${saleEntry.number}.`,
    `${profilePartyName(sellerProfile)} to ${profilePartyName(buyerProfile)}.`
  ]);
}

function internalPurchaseEwayDetailsFromSale(saleEntry = {}, sellerProfile = {}, buyerProfile = {}) {
  const fromPincode = normalizePincode(extractPreferredPincode(sellerProfile.address || ""));
  const toPincode = normalizePincode(extractPreferredPincode(saleEntry.shipToSnapshot?.address || buyerProfile.address || ""));
  const route = purchaseEwayRouteFromValues(buyerProfile, { name: profilePartyName(sellerProfile), address: sellerProfile.address, place: sellerProfile.state }, {
    transType: "1",
    destinationPreset: "buyer",
    dispatchFromAddress: sellerProfile.address || "",
    shipToAddress: saleEntry.shipToSnapshot?.address || buyerProfile.address || "",
    fromPincode,
    toPincode
  });
  return normalizePurchaseEwayDetails({
    transType: "1",
    transMode: "1",
    destinationPreset: "buyer",
    dispatchFromAddress: sellerProfile.address || "",
    shipToAddress: saleEntry.shipToSnapshot?.address || buyerProfile.address || "",
    fromPincode: route.fromPincode || fromPincode,
    toPincode: route.toPincode || toPincode,
    distanceKm: route.distanceKm || 0,
    routeKey: route.routeKey || ""
  });
}

function syncInternalPurchaseForSale(saleEntry = {}, previousSaleEntry = null) {
  if (!saleEntry || isCancelledEntry(saleEntry)) return cancelLinkedInternalPurchase(previousSaleEntry || saleEntry, "Linked sales bill was cancelled.");
  const buyerProfile = internalBuyerProfileForSale(saleEntry);
  const previousPurchase = findLinkedInternalPurchaseForSale(previousSaleEntry || saleEntry);
  if (!buyerProfile) {
    return cancelLinkedInternalPurchase(previousSaleEntry || saleEntry, "Sales bill is no longer billed to an internal GST company.");
  }
  const affectedPurchases = [];
  const sellerProfile = profileById(saleEntry.profileId);
  const supplierParty = ensureInternalCompanyParty(sellerProfile, "Supplier");
  if (!supplierParty) return { action: "none", linkedPurchase: null, supplierParty: null };
  if (previousPurchase && previousPurchase.profileId !== buyerProfile.id) {
    cancelPurchaseEntry(previousPurchase, "Internal sale buyer company changed.");
    affectedPurchases.push(previousPurchase);
  }
  const existingPurchase = previousPurchase && previousPurchase.profileId === buyerProfile.id ? previousPurchase : null;
  const lines = internalPurchaseLinesFromSale(saleEntry);
  const calculated = calculateEntryTotals(lines, buyerProfile, supplierParty, "purchase");
  const now = new Date().toISOString();
  const transfer = normalizeInternalTransfer({
    role: "purchase",
    linkedSaleId: saleEntry.id,
    linkedPurchaseId: existingPurchase?.id || "",
    sellerProfileId: sellerProfile.id,
    buyerProfileId: buyerProfile.id,
    createdAt: existingPurchase?.internalTransfer?.createdAt || now,
    updatedAt: now
  });
  const purchase = entityWithLocalMeta({
    ...(existingPurchase || {}),
    id: existingPurchase?.id || uid(),
    date: saleEntry.date,
    number: saleEntry.number,
    profileId: buyerProfile.id,
    partyId: supplierParty.id,
    status: existingPurchase?.status && existingPurchase.status !== "Cancelled" ? existingPurchase.status : "Paid",
    notes: `Auto-created from internal sales bill ${saleEntry.number}`,
    lines,
    ...calculated,
    roundOff: num(saleEntry.roundOff),
    total: round2(num(calculated.total) + num(saleEntry.roundOff)),
    attachments: clone(saleEntry.attachments || []),
    extractedTaxes: null,
    source: "internal-sale",
    rateIncludesGst: true,
    sellerGstin: normalizeGstin(sellerProfile.gstin),
    buyerGstin: normalizeGstin(buyerProfile.gstin),
    ewayDetails: internalPurchaseEwayDetailsFromSale(saleEntry, sellerProfile, buyerProfile),
    reviewMessages: internalPurchaseReviewMessages(saleEntry, sellerProfile, buyerProfile),
    reviewStatus: "Ready",
    internalTransfer: transfer,
    cancelled: false,
    cancelledAt: ""
  }, existingPurchase);
  purchase.internalTransfer.linkedPurchaseId = purchase.id;
  const index = state.purchases.findIndex(row => row.id === purchase.id);
  if (index >= 0) state.purchases[index] = purchase;
  else state.purchases.push(purchase);
  const saleTransfer = normalizeInternalTransfer({
    role: "sale",
    linkedSaleId: saleEntry.id,
    linkedPurchaseId: purchase.id,
    sellerProfileId: sellerProfile.id,
    buyerProfileId: buyerProfile.id,
    createdAt: saleEntry.internalTransfer?.createdAt || now,
    updatedAt: now
  });
  saleEntry.internalTransfer = saleTransfer;
  Object.assign(saleEntry, entityWithLocalMeta(saleEntry, saleEntry));
  return {
    action: existingPurchase ? "updated" : "created",
    linkedPurchase: purchase,
    affectedPurchases: [...affectedPurchases, purchase],
    supplierParty
  };
}

function cancelLinkedInternalPurchase(saleEntry = {}, reason = "Linked sales bill was cancelled.") {
  const linkedPurchase = findLinkedInternalPurchaseForSale(saleEntry);
  if (!linkedPurchase) return { action: "none", linkedPurchase: null, supplierParty: null };
  cancelPurchaseEntry(linkedPurchase, reason);
  return { action: "cancelled", linkedPurchase, affectedPurchases: [linkedPurchase], supplierParty: null };
}

function cancelPurchaseEntry(purchase, reason = "Purchase cancelled.") {
  if (!purchase || isCancelledEntry(purchase)) return;
  purchase.cancelled = true;
  purchase.cancelledAt = new Date().toISOString();
  purchase.status = "Cancelled";
  purchase.reviewStatus = "Cancelled";
  purchase.reviewMessages = uniqueMessages([...(purchase.reviewMessages || []), reason]);
  Object.assign(purchase, entityWithLocalMeta(purchase, purchase));
}

function findLinkedPurchaseReturnForCreditNote(entry = {}) {
  const linkedId = entry.internalTransfer?.linkedPurchaseReturnId;
  if (linkedId) {
    const linked = state.purchaseReturns.find(purchaseReturn => purchaseReturn.id === linkedId);
    if (linked) return linked;
  }
  const byCreditNoteId = state.purchaseReturns.find(purchaseReturn => purchaseReturn.internalTransfer?.linkedCreditNoteId === entry.id);
  if (byCreditNoteId) return byCreditNoteId;
  const buyerProfile = internalBuyerProfileForSale(entry);
  if (!buyerProfile) return null;
  const sellerGstin = normalizeGstin(entry.sellerGstin || profileById(entry.profileId)?.gstin);
  return state.purchaseReturns.find(purchaseReturn => (
    purchaseReturn.profileId === buyerProfile.id
    && normalizeGstin(purchaseReturn.sellerGstin) === sellerGstin
    && String(purchaseReturn.number || "").trim() === String(entry.number || "").trim()
  )) || null;
}

function syncInternalPurchaseReturnForCreditNote(creditNote = {}, previousCreditNote = null) {
  if (!creditNote || isCancelledEntry(creditNote)) {
    return cancelLinkedPurchaseReturn(previousCreditNote || creditNote, "Linked credit note was cancelled.");
  }
  const buyerProfile = internalBuyerProfileForSale(creditNote);
  const previousReturn = findLinkedPurchaseReturnForCreditNote(previousCreditNote || creditNote);
  if (!buyerProfile) {
    return cancelLinkedPurchaseReturn(previousCreditNote || creditNote, "Credit note is no longer linked to an internal GST company.");
  }
  const affectedPurchaseReturns = [];
  const sellerProfile = profileById(creditNote.profileId);
  const supplierParty = ensureInternalCompanyParty(sellerProfile, "Supplier");
  if (!supplierParty) return { action: "none", linkedPurchaseReturn: null, supplierParty: null };
  if (previousReturn && previousReturn.profileId !== buyerProfile.id) {
    cancelPurchaseReturnEntry(previousReturn, "Internal credit-note buyer company changed.");
    affectedPurchaseReturns.push(previousReturn);
  }
  const existingReturn = previousReturn && previousReturn.profileId === buyerProfile.id ? previousReturn : null;
  const now = new Date().toISOString();
  const transfer = normalizeInternalTransfer({
    role: "purchaseReturn",
    linkedSaleId: creditNote.originalSaleId,
    linkedCreditNoteId: creditNote.id,
    linkedPurchaseReturnId: existingReturn?.id || "",
    sellerProfileId: sellerProfile.id,
    buyerProfileId: buyerProfile.id,
    createdAt: existingReturn?.internalTransfer?.createdAt || now,
    updatedAt: now
  });
  const lines = clone(creditNote.lines || []).map(line => ({ ...line, hsn: lineHsn(line) }));
  const calculated = calculateEntryTotals(lines, buyerProfile, supplierParty, "purchase");
  const purchaseReturn = entityWithLocalMeta({
    ...(existingReturn || {}),
    id: existingReturn?.id || uid(),
    date: creditNote.date,
    number: creditNote.number,
    profileId: buyerProfile.id,
    partyId: supplierParty.id,
    status: "Active",
    lines,
    ...calculated,
    roundOff: num(creditNote.roundOff),
    total: round2(num(calculated.total) + num(creditNote.roundOff)),
    source: "internal-credit-note",
    rateIncludesGst: true,
    sellerGstin: normalizeGstin(sellerProfile.gstin),
    buyerGstin: normalizeGstin(buyerProfile.gstin),
    originalSaleId: creditNote.originalSaleId,
    originalInvoiceNumber: creditNote.originalInvoiceNumber,
    originalInvoiceDate: creditNote.originalInvoiceDate,
    reason: creditNote.reason,
    restock: creditNote.restock,
    reviewMessages: [`Internal purchase return created from credit note ${creditNote.number}.`],
    reviewStatus: "Ready",
    internalTransfer: transfer,
    cancelled: false,
    cancelledAt: ""
  }, existingReturn);
  purchaseReturn.internalTransfer.linkedPurchaseReturnId = purchaseReturn.id;
  const index = state.purchaseReturns.findIndex(row => row.id === purchaseReturn.id);
  if (index >= 0) state.purchaseReturns[index] = purchaseReturn;
  else state.purchaseReturns.push(purchaseReturn);
  creditNote.internalTransfer = normalizeInternalTransfer({
    role: "creditNote",
    linkedSaleId: creditNote.originalSaleId,
    linkedCreditNoteId: creditNote.id,
    linkedPurchaseReturnId: purchaseReturn.id,
    sellerProfileId: sellerProfile.id,
    buyerProfileId: buyerProfile.id,
    createdAt: creditNote.internalTransfer?.createdAt || now,
    updatedAt: now
  });
  Object.assign(creditNote, entityWithLocalMeta(creditNote, creditNote));
  return {
    action: existingReturn ? "updated" : "created",
    linkedPurchaseReturn: purchaseReturn,
    affectedPurchaseReturns: [...affectedPurchaseReturns, purchaseReturn],
    supplierParty
  };
}

function cancelLinkedPurchaseReturn(creditNote = {}, reason = "Linked credit note was cancelled.") {
  const linkedReturn = findLinkedPurchaseReturnForCreditNote(creditNote);
  if (!linkedReturn) return { action: "none", linkedPurchaseReturn: null, supplierParty: null };
  cancelPurchaseReturnEntry(linkedReturn, reason);
  return { action: "cancelled", linkedPurchaseReturn: linkedReturn, affectedPurchaseReturns: [linkedReturn], supplierParty: null };
}

function cancelPurchaseReturnEntry(purchaseReturn, reason = "Purchase return cancelled.") {
  if (!purchaseReturn || isCancelledEntry(purchaseReturn)) return;
  purchaseReturn.cancelled = true;
  purchaseReturn.cancelledAt = new Date().toISOString();
  purchaseReturn.status = "Cancelled";
  purchaseReturn.reviewMessages = uniqueMessages([...(purchaseReturn.reviewMessages || []), reason]);
  Object.assign(purchaseReturn, entityWithLocalMeta(purchaseReturn, purchaseReturn));
}

function lineTaxableAmount(line = {}) {
  return round2(num(line.qty) * num(line.rate));
}

function lineInclusiveUnitRate(line = {}) {
  const taxableRate = num(line.rate);
  const grossRate = num(line.grossRate);
  const gstRate = num(line.gstRate);
  if (grossRate > 0 && (gstRate <= 0 || grossRate > taxableRate)) return round2(grossRate);
  return inclusiveRateFromTaxable(taxableRate, gstRate);
}

function lineGrossAmount(line = {}) {
  return round2(num(line.qty) * lineInclusiveUnitRate(line));
}

function lineGstAmount(line = {}) {
  const taxable = lineTaxableAmount(line);
  return round2(lineGrossAmount(line) - taxable);
}

function basicTotals(lines) {
  return lines.reduce((acc, line) => {
    const taxable = lineTaxableAmount(line);
    const gst = lineGstAmount(line);
    acc.taxable += taxable;
    acc.gst += gst;
    acc.total += lineGrossAmount(line);
    return acc;
  }, { taxable: 0, gst: 0, cgst: 0, sgst: 0, igst: 0, total: 0 });
}

function taxModeFromGstins(sellerGstin, buyerGstin) {
  const sellerState = stateCodeFromGstin(sellerGstin);
  const buyerState = stateCodeFromGstin(buyerGstin);
  if (!sellerState || !buyerState) {
    return {
      mode: "CGST_SGST",
      review: "GSTIN state code missing. Please confirm whether CGST/SGST or IGST applies."
    };
  }
  return sellerState === buyerState
    ? { mode: "CGST_SGST", review: "" }
    : { mode: "IGST", review: "" };
}

function calculateEntryTotals(lines, profile, party, kind) {
  const isInward = kind === "purchase" || kind === "po";
  const sellerGstin = isInward ? party?.gstin : profile?.gstin;
  const buyerGstin = isInward ? profile?.gstin : party?.gstin;
  const { mode, review } = taxModeFromGstins(sellerGstin, buyerGstin);
  const calculated = lines.reduce((acc, line) => {
    const taxable = lineTaxableAmount(line);
    const gst = lineGstAmount(line);
    acc.taxable += taxable;
    acc.gst += gst;
    if (mode === "IGST") acc.igst += gst;
    else {
      acc.cgst += gst / 2;
      acc.sgst += gst / 2;
    }
    acc.total += lineGrossAmount(line);
    return acc;
  }, { taxable: 0, gst: 0, cgst: 0, sgst: 0, igst: 0, total: 0 });
  calculated.taxMode = mode;
  calculated.reviewMessages = review ? [review] : [];
  return calculated;
}

function totals(lines) {
  const form = $("#entryForm");
  const profile = profileById(form?.elements?.profileId?.value || state.settings.activeProfileId);
  const party = partyById(form?.elements?.partyId?.value);
  return calculateEntryTotals(lines, profile, party, entryMode);
}

function amountsClose(a, b, tolerance = 1) {
  return Math.abs(num(a) - num(b)) <= tolerance;
}

function stockForItem(itemId, profileId = activeProfileId()) {
  const item = state.items.find(row => row.id === itemId);
  let stock = num(item?.openingStock);
  state.purchases.filter(entry => (!profileId || entry.profileId === profileId) && !isCancelledEntry(entry)).forEach(entry => entry.lines.forEach(line => {
    if (line.itemId === itemId) stock += num(line.qty);
  }));
  state.sales.filter(entry => (!profileId || entry.profileId === profileId) && !isCancelledEntry(entry)).forEach(entry => entry.lines.forEach(line => {
    if (line.itemId === itemId) stock -= num(line.qty);
  }));
  state.creditNotes.filter(entry => (!profileId || entry.profileId === profileId) && !isCancelledEntry(entry) && entry.restock).forEach(entry => entry.lines.forEach(line => {
    if (line.itemId === itemId) stock += num(line.qty);
  }));
  state.purchaseReturns.filter(entry => (!profileId || entry.profileId === profileId) && !isCancelledEntry(entry) && entry.restock).forEach(entry => entry.lines.forEach(line => {
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

function itemNameByLine(line = {}, item = null, serialNo = 0) {
  const sourceItem = item || state.items.find(row => row.id === line.itemId) || {};
  const storedName = String(line.itemName || line.name || line.productName || line.productDesc || "").trim();
  const matchedItem = sourceItem.name ? sourceItem : itemByLineRate(line);
  const fallbackName = lineHsn(line, matchedItem) === DEFAULT_SALE_HSN ? "Mobile Phone" : `Item ${serialNo || ""}`.trim();
  return sourceItem.name || storedName || matchedItem.name || fallbackName;
}

function itemByLineRate(line = {}) {
  const hsn = lineHsn(line);
  const rate = num(line.rate);
  if (!hsn || !rate) return {};
  const candidates = state.items.filter(item => {
    if (normalizeLineHsn(item.hsn) !== hsn) return false;
    const purchaseRate = num(item.purchaseRate);
    const saleRate = num(item.saleRate);
    return amountsClose(purchaseRate, rate, Math.max(1, rate * 0.02))
      || amountsClose(saleRate, rate, Math.max(1, rate * 0.02));
  });
  return candidates.length === 1 ? candidates[0] : {};
}

async function init() {
  $("#todayLabel").textContent = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "short", year: "numeric" });
  updateDeviceViewMode();
  bindEvents();
  renderAll();
  registerServiceWorker();
  await initCloud();
  if (window.lucide) lucide.createIcons();
}

function updateDeviceViewMode() {
  const nextMode = window.matchMedia("(max-width: 820px)").matches ? "mobile" : "desktop";
  if (deviceViewMode === nextMode) return;
  deviceViewMode = nextMode;
  document.documentElement.dataset.deviceView = nextMode;
  if (!document.body) return;
  document.body.dataset.deviceView = nextMode;
  document.body.classList.toggle("mobile-device-view", nextMode === "mobile");
  document.body.classList.toggle("desktop-device-view", nextMode === "desktop");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
  navigator.serviceWorker
    .register("./service-worker.js", { updateViaCache: "none" })
    .then(registration => registration.update())
    .catch(() => {});
}

function bindIf(selector, eventName, handler) {
  const element = $(selector);
  if (element) element.addEventListener(eventName, handler);
}

function bindEvents() {
  $$(".nav-tab").forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));
  $$("[data-view-link]").forEach(button => button.addEventListener("click", () => showView(button.dataset.viewLink)));
  $$("[data-close-dialog]").forEach(button => button.addEventListener("click", () => closeDialog(button.dataset.closeDialog)));
  $("#dashboardSaleEntryBtn").addEventListener("click", () => openEntry("sale"));
  $("#dashboardPurchaseEntryBtn").addEventListener("click", openPurchaseInvoiceUpload);
  bindIf("#dashboardPoBtn", "click", () => openEntry("po"));
  $("#newSaleBtn").addEventListener("click", () => openEntry("sale"));
  $("#salesMonthFilter").addEventListener("change", event => {
    entryMonthFilters.sale = event.target.value;
    renderEntries("sale");
  });
  bindIf("#newCreditNoteBtn", "click", () => openCreditNote());
  bindIf("#creditNoteMonthFilter", "change", event => {
    entryMonthFilters.creditNote = event.target.value;
    entryMonthFilters.purchaseReturn = event.target.value;
    renderCreditNotes();
  });
  bindIf("#creditNoteForm", "submit", saveCreditNote);
  bindIf("#creditNoteRegisterBtn", "click", exportCreditNoteRegister);
  bindIf("#reportCreditNoteRegisterBtn", "click", exportCreditNoteRegister);
  bindIf("#chatBillBtn", "click", openChatBillDialog);
  bindIf("#newChatSaleBtn", "click", openChatBillDialog);
  $("#newPurchaseBtn").addEventListener("click", () => openEntry("purchase"));
  $("#purchaseMonthFilter").addEventListener("change", event => {
    entryMonthFilters.purchase = event.target.value;
    selectedPurchaseIds.clear();
    renderEntries("purchase");
  });
  bindIf("#newPoBtn", "click", () => openEntry("po"));
  bindIf("#newPaymentSourceBtn", "click", () => openPaymentSource());
  bindIf("#paymentSourceForm", "submit", savePaymentSource);
  bindIf("#bankStatementInput", "change", handleBankStatementUpload);
  bindIf("#reconciliationMonth", "change", event => {
    reconciliationMonth = event.target.value;
    renderReconciliation();
  });
  bindIf("#reconciliationSourceFilter", "change", event => {
    reconciliationSourceFilterId = event.target.value;
    renderReconciliation();
  });
  $$('[data-reconciliation-tab]').forEach(button => button.addEventListener("click", () => {
    activeReconciliationTab = button.dataset.reconciliationTab || "review";
    renderReconciliation();
  }));
  bindIf("#reconciliationMatchForm", "submit", saveManualReconciliationMatch);
  bindIf("#reconciliationBookEntrySelect", "change", updateReconciliationMatchDifference);
  bindIf("#tallySettingsForm", "submit", saveTallySettings);
  bindIf("#tallyExportMastersBtn", "click", exportTallyMasters);
  bindIf("#tallyExportVouchersBtn", "click", exportTallyVouchers);
  bindIf("#tallyMasterImportInput", "change", handleTallyDataImport);
  bindIf("#tallyApplyImportBtn", "click", applyTallyDataImport);
  bindIf("#tallyDiscardImportBtn", "click", discardTallyDataImport);
  bindIf("#tallyHistory", "click", handleTallyHistoryAction);
  bindIf("#poMonthFilter", "change", event => {
    entryMonthFilters.po = event.target.value;
    renderEntries("po");
  });
  $("#purchaseInvoiceInput").addEventListener("change", handlePurchaseInvoiceUpload);
  bindIf("#purchaseImportAddInput", "change", handlePurchaseInvoiceUpload);
  bindIf("#purchaseImportInboxBtn", "click", openPurchaseImportInbox);
  bindIf("#purchaseImportBatchSelect", "change", handlePurchaseImportBatchChange);
  bindIf("#purchaseImportDocumentList", "click", handlePurchaseImportDocumentClick);
  bindIf("#purchaseImportDocumentList", "change", handlePurchaseImportDocumentSelection);
  bindIf("#purchaseImportSelectAll", "change", toggleReadyPurchaseImports);
  bindIf("#purchaseImportApproveBtn", "click", approveSelectedPurchaseImports);
  bindIf("#purchaseImportDiscardBtn", "click", discardActivePurchaseImportBatch);
  bindIf("#purchaseImportReviewPanel", "submit", savePurchaseImportReview);
  bindIf("#purchaseImportReviewPanel", "click", handlePurchaseImportReviewClick);
  bindIf("#purchaseImportReviewPanel", "change", handlePurchaseImportReviewChange);
  bindIf("#purchaseImportReviewPanel", "input", updatePurchaseImportReviewTotals);
  $("#ewayJsonBtn").addEventListener("click", exportSelectedEwayJson);
  $("#selectAllPurchases").addEventListener("change", toggleAllPurchases);
  $("#newItemBtn").addEventListener("click", () => openItem());
  $("#newPartyBtn").addEventListener("click", () => openParty(null, newPartyDialogOptions()));
  $$("[data-party-filter]").forEach(button => {
    button.addEventListener("click", () => {
      activePartyFilter = button.dataset.partyFilter || "Customer";
      renderParties();
    });
  });
  $("#addLineBtn").addEventListener("click", () => addLineRow());
  $("#entryAddBuyerBtn").addEventListener("click", openBuyerFromEntry);
  bindIf("#entryPartySearch", "input", handleEntryPartySearchInput);
  bindIf("#entryPartySearch", "keydown", handleEntryPartySearchKeydown);
  $("#entryForm").addEventListener("submit", saveEntry);
  $("#entryForm").elements.shipToSame.addEventListener("change", updateSalesAddressPanel);
  $("#entryForm").elements.shipToAddressId.addEventListener("change", updateSalesAddressPanel);
  ["shipToName", "shipToGstin", "shipToPlace", "shipToAddress"].forEach(name => {
    $("#entryForm").elements[name].addEventListener("input", updateSalesAddressPanel);
  });
  bindIf("#chatBillForm", "submit", event => event.preventDefault());
  bindIf("#closeChatBillBtn", "click", closeChatBillDialog);
  bindIf("#chatBillAttachmentInput", "change", handleChatBillAttachmentInput);
  bindIf("#chatBillInput", "input", resizeChatBillInput);
  bindIf("#chatBillInput", "keydown", handleChatBillInputKeydown);
  bindIf("#chatSampleBtn", "click", fillChatBillSample);
  bindIf("#prepareChatBillBtn", "click", prepareChatBillDraft);
  $("#itemForm").addEventListener("submit", saveItem);
  $("#partyForm").addEventListener("submit", saveParty);
  $("#addPartyAliasBtn").addEventListener("click", addPartyAliasFromInput);
  $("#partyAliasInput").addEventListener("keydown", handlePartyAliasInputKeydown);
  $("#saveSettingsBtn").addEventListener("click", saveSettings);
  $("#changeCompanyBtn").addEventListener("click", openCompanySelector);
  $("#settingsForm").elements.profileId.addEventListener("change", renderSettings);
  $("#topbarLogoffBtn").addEventListener("click", signOutFromCloud);
  $("#selectorLogoffBtn").addEventListener("click", signOutFromCloud);
  $("#backupBtn").addEventListener("click", exportBackup);
  $("#restoreInput").addEventListener("change", importBackup);
  $("#appLoginForm").addEventListener("submit", signInToBillingApp);
  $("#appForgotPasswordBtn").addEventListener("click", openForgotPassword);
  $("#appBackToLoginBtn").addEventListener("click", backToLogin);
  $("#appSendResetBtn").addEventListener("click", sendPasswordResetLink);
  $("#appUpdatePasswordBtn").addEventListener("click", updateRecoveredPassword);
  bindIf("#cloudBtn", "click", openCloudDialog);
  bindIf("#openCloudSettingsBtn", "click", openCloudDialog);
  $("#cloudForm").addEventListener("submit", event => event.preventDefault());
  $("#cloudSignInBtn").addEventListener("click", signInToCloud);
  $("#cloudForgotPasswordBtn").addEventListener("click", () => {
    $("#cloudDialog")?.close();
    openForgotPassword();
  });
  $("#cloudSignOutBtn").addEventListener("click", signOutFromCloud);
  $("#cloudWorkspaceSelect").addEventListener("change", event => selectCloudWorkspace(event.target.value));
  $("#cloudNewWorkspaceBtn").addEventListener("click", () => createCloudWorkspace("New Workspace"));
  $("#cloudSyncNowBtn").addEventListener("click", () => syncCloudNow(true));
  $("#cloudSaveWorkspaceBtn").addEventListener("click", saveCloudWorkspaceSettings);
  $("#closeInvoiceBtn").addEventListener("click", closeInvoiceDialog);
  $("#invoiceDialog").addEventListener("close", clearInvoicePreviewFit);
  $("#printInvoiceBtn").addEventListener("click", printInvoice);
  $("#downloadInvoicePdfBtn").addEventListener("click", downloadInvoicePdf);
  $("#shareInvoiceWhatsappBtn").addEventListener("click", shareInvoiceToWhatsApp);
  $("#shareInvoicePdfBtn").addEventListener("click", shareInvoicePdf);
  $("#printReportBtn").addEventListener("click", () => window.print());
  window.addEventListener("afterprint", clearInvoicePrintMode);
  window.addEventListener("resize", updateDeviceViewMode);
  window.addEventListener("resize", fitInvoicePreview);
  window.addEventListener("orientationchange", updateDeviceViewMode);
  window.addEventListener("orientationchange", fitInvoicePreview);
  $("#purchaseRegisterBtn").addEventListener("click", exportPurchaseRegister);
  $("#reportFrom").addEventListener("change", renderReport);
  $("#reportTo").addEventListener("change", renderReport);
  $$('[data-report]').forEach(button => button.addEventListener("click", () => {
    activeReport = button.dataset.report;
    $$('[data-report]').forEach(item => item.classList.toggle("active", item === button));
    renderReport();
  }));
  window.addEventListener("popstate", closeChatBillOnBack);
}

function openPurchaseInvoiceUpload() {
  showView("purchases");
  const input = $("#purchaseInvoiceInput");
  if (!input) return toast("Upload invoice option is not available");
  input.click();
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
    creditNotes: "Credit Notes",
    purchaseOrders: "Purchase Orders",
    items: "Items",
    parties: "Party Master",
    reconciliation: "Banking",
    tallySync: "Tally Sync",
    reports: "Reports",
    settings: "Settings"
  }[view];
  renderAll();
}

function renderAll() {
  renderCompanySelector();
  renderAppVisibility();
  renderProfileSelectors();
  renderDashboard();
  renderEntries("sale");
  renderCreditNotes();
  renderEntries("purchase");
  renderEntries("po");
  renderItems();
  renderParties();
  renderReconciliation();
  renderTallySync();
  renderPurchaseImportInbox();
  renderSettings();
  renderReport();
  renderCloudUi();
  if (window.lucide) lucide.createIcons();
}

function renderProfileSelectors() {
  $("#activeCompanyName").textContent = profileName(activeProfileId());
}

function renderAppVisibility() {
  const locked = passwordRecoveryMode || !cloudConfigured() || !cloudSession;
  $("#loginGate").hidden = !locked;
  if (locked) {
    clearCompanyPageTransition();
    $("#companySelector").hidden = true;
    $("#appShell").hidden = true;
    return;
  }
  if (document.body.classList.contains("company-page-transitioning")) return;
  $("#companySelector").hidden = !companySelectionOpen;
  $("#appShell").hidden = companySelectionOpen;
}

function renderCompanySelector() {
  const activeId = activeProfileId();
  $("#companyCards").innerHTML = homeCompanyProfiles().map(profile => {
    return `
      <button class="company-card ${profile.id === activeId ? "selected" : ""}" type="button" data-profile-id="${profile.id}">
        ${firmLogoMarkup(profile, "company-logo-mark")}
        <span class="company-card-main">
          <strong>${escapeHtml(profile.businessName || profile.label || "")}</strong>
          <small>${escapeHtml(profile.gstin || "GSTIN not entered")}</small>
          <em>${escapeHtml(profile.state || stateNameFromGstin(profile.gstin) || "-")}</em>
        </span>
      </button>
    `;
  }).join("");
  $$(".company-card").forEach(card => card.addEventListener("click", () => selectCompany(card.dataset.profileId)));
}

function homeCompanyProfiles() {
  const order = new Map(HOME_COMPANY_PROFILE_ORDER.map((id, index) => [id, index]));
  return [...state.settings.profiles].sort((a, b) => {
    const aIndex = order.has(a.id) ? order.get(a.id) : HOME_COMPANY_PROFILE_ORDER.length;
    const bIndex = order.has(b.id) ? order.get(b.id) : HOME_COMPANY_PROFILE_ORDER.length;
    return aIndex - bIndex;
  });
}

function companyInitials(value) {
  const words = String(value || "Company").replace(/[^A-Za-z0-9 ]+/g, " ").trim().split(/\s+/).filter(Boolean);
  return (words[0]?.[0] || "C") + (words[1]?.[0] || "");
}

function openCompanySelector() {
  if (companySelectionOpen) return;
  if ($("#companySelector") && $("#appShell")) {
    slideToCompanySelector();
    return;
  }
  companySelectionOpen = true;
  renderAll();
}

function selectCompany(profileId) {
  const profile = state.settings.profiles.find(row => row.id === profileId);
  if (!profile) return;
  const shouldSlide = companySelectionOpen && canSlideCompanyPages();
  setActiveProfileId(profileId);
  entryMonthFilters = {
    sale: defaultEntryMonth("sale", profileId),
    creditNote: defaultCreditDocumentMonth(profileId),
    purchaseReturn: defaultCreditDocumentMonth(profileId),
    purchase: defaultEntryMonth("purchase", profileId),
    po: defaultEntryMonth("po", profileId)
  };
  selectedPurchaseIds.clear();
  reconciliationMonth = defaultReconciliationMonth(profileId);
  reconciliationSourceFilterId = "";
  saveState({ skipCloud: true });
  if (shouldSlide) {
    slideToCompanyWorkspace(profileId);
    return;
  }
  companySelectionOpen = false;
  showView("dashboard");
  toast(`${profileName(profileId)} selected`);
}

function canSlideCompanyPages() {
  return Boolean($("#companySelector") && $("#appShell"));
}

function clearCompanyPageTransition() {
  window.clearTimeout(companyPageTransitionTimer);
  companyPageTransitionTimer = null;
  document.body.classList.remove("company-page-transitioning");
  $("#companySelector")?.classList.remove("page-slide-exit-left", "page-slide-enter-left", "is-active");
  $("#appShell")?.classList.remove("page-slide-enter-right", "page-slide-exit-right", "is-active");
}

function slideToCompanyWorkspace(profileId) {
  const selector = $("#companySelector");
  const appShell = $("#appShell");
  clearCompanyPageTransition();
  companySelectionOpen = false;
  document.body.classList.add("company-page-transitioning");
  selector.hidden = false;
  appShell.hidden = false;
  appShell.classList.add("page-slide-enter-right");
  showView("dashboard");
  requestAnimationFrame(() => {
    selector.classList.add("page-slide-exit-left", "is-active");
    appShell.classList.add("is-active");
  });
  companyPageTransitionTimer = window.setTimeout(() => {
    clearCompanyPageTransition();
    renderAppVisibility();
    toast(`${profileName(profileId)} selected`);
  }, COMPANY_PAGE_TRANSITION_MS);
}

function slideToCompanySelector() {
  const selector = $("#companySelector");
  const appShell = $("#appShell");
  clearCompanyPageTransition();
  companySelectionOpen = true;
  renderCompanySelector();
  document.body.classList.add("company-page-transitioning");
  selector.hidden = false;
  appShell.hidden = false;
  selector.classList.add("page-slide-enter-left");
  requestAnimationFrame(() => {
    selector.classList.add("is-active");
    appShell.classList.add("page-slide-exit-right", "is-active");
  });
  companyPageTransitionTimer = window.setTimeout(() => {
    clearCompanyPageTransition();
    renderAppVisibility();
  }, COMPANY_PAGE_TRANSITION_MS);
}

function cloudConfig() {
  return window.CLOUD_CONFIG || {};
}

function cloudConfigured() {
  const config = cloudConfig();
  return Boolean(config.supabaseUrl && config.supabaseAnonKey && window.supabase);
}

function isPasswordRecoveryUrl() {
  const searchParams = new URLSearchParams(window.location.search || "");
  const hashParams = new URLSearchParams(String(window.location.hash || "").replace(/^#/, ""));
  return searchParams.get("type") === "recovery" || hashParams.get("type") === "recovery";
}

function passwordResetRedirectUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

function clearPasswordRecoveryUrl() {
  const url = new URL(window.location.href);
  ["access_token", "code", "expires_at", "expires_in", "refresh_token", "token_type", "type"].forEach(key => url.searchParams.delete(key));
  url.hash = "";
  window.history.replaceState({}, document.title, `${url.pathname}${url.search}`);
}

async function initCloud() {
  renderCloudUi();
  if (!cloudConfigured()) return;
  const config = cloudConfig();
  passwordRecoveryMode = isPasswordRecoveryUrl();
  cloudClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      storage: window.sessionStorage,
      persistSession: true
    }
  });
  const { data, error } = await cloudClient.auth.getSession();
  if (error) {
    toast("Cloud session could not be loaded");
    return;
  }
  cloudSession = data.session;
  if (cloudSession && isPasswordRecoveryUrl()) passwordRecoveryMode = true;
  cloudClient.auth.onAuthStateChange(async (event, session) => {
    if (event === "PASSWORD_RECOVERY") {
      passwordRecoveryMode = true;
      forgotPasswordMode = false;
    }
    cloudSession = session;
    if (session && !passwordRecoveryMode) {
      await loadCloudWorkspaces();
      renderAll();
    }
    else if (session && passwordRecoveryMode) {
      renderAll();
      requestAnimationFrame(() => $("#appNewPassword")?.focus());
    }
    else {
      cloudWorkspaces = [];
      cloudWorkspace = null;
      renderAll();
    }
  });
  if (cloudSession && !passwordRecoveryMode) await loadCloudWorkspaces();
  renderCloudUi();
}

function openCloudDialog() {
  renderCloudUi();
  $("#cloudDialog").showModal();
  if (window.lucide) lucide.createIcons();
}

function renderCloudUi() {
  const configured = cloudConfigured();
  const hasSession = Boolean(cloudSession);
  const showPasswordRecovery = configured && passwordRecoveryMode;
  const signedIn = hasSession && !showPasswordRecovery;
  const showForgotPassword = configured && !hasSession && forgotPasswordMode && !showPasswordRecovery;
  const showLogin = configured && !hasSession && !showForgotPassword && !showPasswordRecovery;
  const email = cloudSession?.user?.email || "-";
  $("#appLoginFields").hidden = !showLogin;
  $("#appForgotPasswordFields").hidden = !showForgotPassword;
  $("#appPasswordRecoveryFields").hidden = !showPasswordRecovery;
  $("#appLoginNotConfigured").hidden = configured;
  const cloudBtnText = $("#cloudBtnText");
  if (cloudBtnText) cloudBtnText.textContent = !configured ? "Local" : showPasswordRecovery ? "Reset" : signedIn ? (cloudWorkspace?.name || "Cloud") : "Sign in";
  $("#cloudModeLabel").textContent = !configured ? "Local browser storage" : showPasswordRecovery ? "Password reset in progress" : signedIn ? "Cloud sync enabled" : "Cloud ready, not signed in";
  $("#cloudWorkspaceLabel").textContent = cloudWorkspace?.name || "Not connected";
  $("#cloudLastSyncLabel").textContent = cloudWorkspace?.updated_at ? new Date(cloudWorkspace.updated_at).toLocaleString("en-IN") : "-";
  $("#cloudNotConfigured").hidden = configured;
  $("#cloudSignedOut").hidden = !configured || hasSession || showPasswordRecovery;
  $("#cloudSignedIn").hidden = !configured || !signedIn;
  $("#cloudUserEmail").textContent = email;
  $("#cloudWorkspaceSelect").innerHTML = cloudWorkspaces.map(workspace => `
    <option value="${workspace.id}" ${workspace.id === cloudWorkspace?.id ? "selected" : ""}>${escapeHtml(cloudWorkspaceOptionLabel(workspace))}</option>
  `).join("");
  $("#cloudWorkspaceName").value = cloudWorkspace?.name || "";
  $("#cloudMemberEmails").value = (cloudWorkspace?.member_emails || []).join("\n");
  renderAppVisibility();
}

async function signInToBillingApp(event) {
  event.preventDefault();
  if (passwordRecoveryMode) return updateRecoveredPassword();
  if (forgotPasswordMode) return sendPasswordResetLink();
  await signInWithCredentials({
    email: $("#appLoginEmail").value.trim(),
    password: $("#appLoginPassword").value,
    button: $("#appLoginBtn")
  });
}

async function signInToCloud() {
  await signInWithCredentials({
    email: $("#cloudEmail").value.trim(),
    password: $("#cloudPassword").value,
    button: $("#cloudSignInBtn")
  });
}

function openForgotPassword() {
  if (!cloudConfigured() || !cloudClient) return toast("Login is not configured");
  forgotPasswordMode = true;
  passwordRecoveryMode = false;
  const email = $("#appLoginEmail").value.trim() || $("#cloudEmail").value.trim();
  $("#appResetEmail").value = email;
  renderCloudUi();
  requestAnimationFrame(() => $("#appResetEmail")?.focus());
}

function backToLogin() {
  forgotPasswordMode = false;
  renderCloudUi();
  requestAnimationFrame(() => $("#appLoginEmail")?.focus());
}

async function signInWithCredentials({ email, password, button }) {
  if (!cloudClient) return toast("Login is not configured");
  if (!email || !password) return toast("Enter email and password");
  button.disabled = true;
  const { data, error } = await cloudClient.auth.signInWithPassword({ email, password });
  button.disabled = false;
  if (error) return toast(error.message);
  await finishSuccessfulSignIn(data?.session);
  $("#cloudDialog")?.close();
  $("#appLoginPassword").value = "";
  $("#cloudPassword").value = "";
  toast("Logged in");
}

async function finishSuccessfulSignIn(session = null) {
  if (session) cloudSession = session;
  if (!cloudSession) {
    const { data, error } = await cloudClient.auth.getSession();
    if (error) return toast("Login session could not be loaded");
    cloudSession = data.session;
  }
  if (!cloudSession) return;
  passwordRecoveryMode = false;
  forgotPasswordMode = false;
  await loadCloudWorkspaces();
  renderAll();
}

async function sendPasswordResetLink() {
  if (!cloudClient) return toast("Login is not configured");
  const email = $("#appResetEmail").value.trim() || $("#appLoginEmail").value.trim() || $("#cloudEmail").value.trim();
  if (!email) return toast("Enter your email");
  $("#appSendResetBtn").disabled = true;
  const { error } = await cloudClient.auth.resetPasswordForEmail(email, {
    redirectTo: passwordResetRedirectUrl()
  });
  $("#appSendResetBtn").disabled = false;
  if (error) return toast(error.message);
  forgotPasswordMode = false;
  $("#appLoginEmail").value = email;
  renderCloudUi();
  toast("Password reset link sent. Check your email.");
}

async function updateRecoveredPassword() {
  if (!cloudClient) return toast("Login is not configured");
  if (!cloudSession) return toast("Open the reset link from your email again");
  const password = $("#appNewPassword").value;
  const confirmPassword = $("#appConfirmPassword").value;
  if (password.length < 6) return toast("Password must be at least 6 characters");
  if (password !== confirmPassword) return toast("Passwords do not match");
  $("#appUpdatePasswordBtn").disabled = true;
  const { error } = await cloudClient.auth.updateUser({ password });
  $("#appUpdatePasswordBtn").disabled = false;
  if (error) return toast(error.message);
  passwordRecoveryMode = false;
  forgotPasswordMode = false;
  $("#appNewPassword").value = "";
  $("#appConfirmPassword").value = "";
  clearPasswordRecoveryUrl();
  if (cloudSession) await loadCloudWorkspaces();
  renderAll();
  toast("Password updated");
}

async function signUpForCloud() {
  if (!cloudClient) return toast("Cloud is not configured");
  const email = $("#cloudEmail").value.trim();
  const password = $("#cloudPassword").value;
  if (!email || !password) return toast("Enter email and password");
  const { data, error } = await cloudClient.auth.signUp({ email, password });
  if (error) return toast(error.message);
  if (!data.session) toast("Account created. Check your email to confirm sign in.");
  else toast("Account created");
}

async function signOutFromCloud() {
  if (!cloudClient) return;
  await syncCloudNow(false);
  await cloudClient.auth.signOut();
  cloudSession = null;
  cloudWorkspace = null;
  cloudWorkspaces = [];
  renderCloudUi();
  toast("Signed out");
}

async function loadCloudWorkspaces() {
  if (!cloudClient || !cloudSession) return;
  cloudLoading = true;
  const { data, error } = await cloudClient
    .from(CLOUD_WORKSPACE_TABLE)
    .select("id,name,owner_id,member_emails,data,updated_at,created_at")
    .order("updated_at", { ascending: false });
  cloudLoading = false;
  if (error) {
    renderCloudUi();
    toast("Cloud table is not ready. Run the database setup.");
    return;
  }
  cloudWorkspaces = await Promise.all((data || []).map(enrichCloudWorkspaceWithRows));
  if (!cloudWorkspaces.length) {
    await createCloudWorkspace("Main Business");
    return;
  }
  const savedId = localStorage.getItem(CLOUD_SELECTED_WORKSPACE_KEY);
  const savedWorkspace = cloudWorkspaces.find(row => row.id === savedId);
  const workspace = preferredCloudWorkspace(cloudWorkspaces, savedWorkspace);
  applyCloudWorkspace(workspace, "Cloud data loaded");
}

function preferredCloudWorkspace(workspaces = [], savedWorkspace = null) {
  const bestWorkspace = bestCloudWorkspace(workspaces);
  if (!savedWorkspace) return bestWorkspace || workspaces[0];
  const savedScore = cloudWorkspaceScore(savedWorkspace);
  const bestScore = cloudWorkspaceScore(bestWorkspace);
  return bestWorkspace && bestScore > savedScore ? bestWorkspace : savedWorkspace;
}

function bestCloudWorkspace(workspaces = []) {
  return [...workspaces].sort((a, b) => {
    const scoreDiff = cloudWorkspaceScore(b) - cloudWorkspaceScore(a);
    if (scoreDiff) return scoreDiff;
    return String(b?.updated_at || "").localeCompare(String(a?.updated_at || ""));
  })[0] || null;
}

function cloudWorkspaceScore(workspace = {}) {
  const counts = cloudWorkspaceCounts(workspace);
  return (counts.purchases * 1000) + (counts.sales * 100) + (counts.creditNotes * 75) + (counts.purchaseReturns * 75) + (counts.purchaseOrders * 50) + (counts.parties * 10) + counts.items + counts.bankTransactions;
}

function cloudWorkspaceCounts(workspace = {}) {
  const data = workspace?.data || {};
  return {
    sales: Array.isArray(data.sales) ? data.sales.length : 0,
    creditNotes: Array.isArray(data.creditNotes) ? data.creditNotes.length : 0,
    purchases: Array.isArray(data.purchases) ? data.purchases.length : 0,
    purchaseReturns: Array.isArray(data.purchaseReturns) ? data.purchaseReturns.length : 0,
    purchaseOrders: Array.isArray(data.purchaseOrders) ? data.purchaseOrders.length : 0,
    bankTransactions: Array.isArray(data.bankTransactions) ? data.bankTransactions.length : 0,
    parties: Array.isArray(data.parties) ? data.parties.length : 0,
    items: Array.isArray(data.items) ? data.items.length : 0
  };
}

function cloudWorkspaceOptionLabel(workspace = {}) {
  const counts = cloudWorkspaceCounts(workspace);
  const detail = counts.purchases || counts.sales
    ? ` - ${counts.purchases} purchases, ${counts.sales} sales`
    : " - empty";
  return `${workspace.name || "Workspace"}${detail}`;
}

function bestPurchaseWorkspace() {
  const bestWorkspace = bestCloudWorkspace(cloudWorkspaces);
  const currentCounts = cloudWorkspaceCounts(cloudWorkspace);
  const bestCounts = cloudWorkspaceCounts(bestWorkspace);
  if (!bestWorkspace?.id || bestWorkspace.id === cloudWorkspace?.id) return null;
  return bestCounts.purchases > currentCounts.purchases && bestCounts.purchases > 0 ? bestWorkspace : null;
}

function maybeSwitchToPurchaseWorkspace() {
  if (!cloudSession || !cloudWorkspace || !cloudWorkspaces.length || entryList("purchase").length) return false;
  const workspace = bestPurchaseWorkspace();
  if (!workspace || cloudWorkspaceAutoSwitchPending === workspace.id) return false;
  cloudWorkspaceAutoSwitchPending = workspace.id;
  setTimeout(() => {
    cloudWorkspaceAutoSwitchPending = "";
    if (cloudWorkspace?.id !== workspace.id) applyCloudWorkspace(workspace, "Purchase workspace loaded");
  }, 0);
  return true;
}

async function createCloudWorkspace(name) {
  if (!cloudClient || !cloudSession) return toast("Sign in to create a workspace");
  const workspaceName = String(name || "Main Business").trim() || "Main Business";
  const existingWorkspace = cloudWorkspaces.find(row => normalizeCloudWorkspaceName(row.name) === normalizeCloudWorkspaceName(workspaceName));
  if (existingWorkspace) {
    applyCloudWorkspace(existingWorkspace, "Existing workspace opened");
    return;
  }
  const { data, error } = await cloudClient
    .from(CLOUD_WORKSPACE_TABLE)
    .insert({
      owner_id: cloudSession.user.id,
      name: workspaceName,
      member_emails: [],
      data: clone(state)
    })
    .select("id,name,owner_id,member_emails,data,updated_at,created_at")
    .single();
  if (error) {
    if (/duplicate|unique/i.test(error.message || "")) {
      await loadCloudWorkspaces();
      toast("Existing workspace opened");
      return;
    }
    return toast(error.message);
  }
  cloudWorkspaces = [data, ...cloudWorkspaces.filter(row => row.id !== data.id)];
  applyCloudWorkspace(data, "Cloud workspace created");
}

function normalizeCloudWorkspaceName(value) {
  return String(value || "").trim().toLowerCase();
}

function applyCloudWorkspace(workspace, message) {
  const selectedProfileId = activeProfileId();
  const localBeforeCloud = normalizeState(clone(state || defaultState));
  const previousWorkspaceId = cloudWorkspace?.id || localStorage.getItem(CLOUD_SELECTED_WORKSPACE_KEY) || "";
  const canUseCurrentLocal = !previousWorkspaceId || previousWorkspaceId === workspace.id;
  const localBackup = readLocalStateBackup(workspace.id);
  if (canUseCurrentLocal) rememberLocalStateBackup(localBeforeCloud, workspace.id);
  const merged = mergeCloudStateWithLocalCandidates(workspace.data || defaultState, [localBackup, canUseCurrentLocal ? localBeforeCloud : null]);
  cloudWorkspace = workspace;
  localStorage.setItem(CLOUD_SELECTED_WORKSPACE_KEY, workspace.id);
  state = restoreDeviceActiveProfile(merged.state, selectedProfileId);
  saveState({ skipCloud: true, skipLocalBackup: true });
  renderAll();
  if (merged.changed) syncCloudNow(false);
  if (message) toast(merged.changed ? `${message}. Local saved entries kept.` : message);
}

async function enrichCloudWorkspaceWithRows(workspace = {}) {
  const rowState = await readNormalizedCloudState(workspace.id);
  if (!rowState) return workspace;
  const merged = mergeCloudStateWithLocalCandidates(workspace.data || defaultState, [rowState]);
  return { ...workspace, data: merged.state };
}

async function readNormalizedCloudState(workspaceId) {
  if (!cloudClient || !workspaceId) return null;
  const [parties, items, sales, creditNotes, purchases, purchaseReturns, purchaseOrders, paymentSources, bankTransactions, tallySyncRuns, purchaseImportBatches, purchaseImportDocuments, deletionTombstones] = await Promise.all([
    readCloudTableRows(CLOUD_ROW_TABLES.parties, workspaceId),
    readCloudTableRows(CLOUD_ROW_TABLES.items, workspaceId),
    readCloudTableRows(CLOUD_ROW_TABLES.sales, workspaceId),
    readCloudTableRows(CLOUD_ROW_TABLES.creditNotes, workspaceId),
    readCloudTableRows(CLOUD_ROW_TABLES.purchases, workspaceId),
    readCloudTableRows(CLOUD_ROW_TABLES.purchaseReturns, workspaceId),
    readCloudTableRows(CLOUD_ROW_TABLES.purchaseOrders, workspaceId),
    readCloudTableRows(CLOUD_ROW_TABLES.paymentSources, workspaceId),
    readCloudTableRows(CLOUD_ROW_TABLES.bankTransactions, workspaceId),
    readCloudTableRows(CLOUD_ROW_TABLES.tallySyncRuns, workspaceId),
    readCloudTableRows(CLOUD_ROW_TABLES.purchaseImportBatches, workspaceId),
    readCloudTableRows(CLOUD_ROW_TABLES.purchaseImportDocuments, workspaceId),
    readCloudTableRows(CLOUD_ROW_TABLES.deletionTombstones, workspaceId)
  ]);
  if ([parties, items, sales, purchases, purchaseOrders].some(result => result === null)) return null;
  const hasRows = [parties, items, sales, creditNotes || [], purchases, purchaseReturns || [], purchaseOrders, paymentSources || [], bankTransactions || [], tallySyncRuns || [], purchaseImportBatches || [], purchaseImportDocuments || [], deletionTombstones || []].some(rows => rows.length);
  if (!hasRows) return null;
  return normalizeState({
    ...clone(defaultState),
    parties: parties.map(row => cloudRowData(row, {
      id: row.id,
      name: row.name,
      type: row.type,
      gstin: row.gstin,
      phone: row.phone,
      email: row.email,
      place: row.place
    })),
    items: items.map(row => cloudRowData(row, {
      id: row.id,
      name: row.name,
      hsn: row.hsn,
      gstRate: row.gst_rate,
      saleRate: row.sale_rate,
      purchaseRate: row.purchase_rate
    })),
    sales: sales.map(row => cloudRowData(row, cloudEntryFallback(row, "sale"))),
    creditNotes: (creditNotes || []).map(row => cloudRowData(row, cloudEntryFallback(row, "creditNote"))),
    purchases: purchases.map(row => cloudRowData(row, cloudEntryFallback(row, "purchase"))),
    purchaseReturns: (purchaseReturns || []).map(row => cloudRowData(row, cloudEntryFallback(row, "purchaseReturn"))),
    purchaseOrders: purchaseOrders.map(row => cloudRowData(row, cloudEntryFallback(row, "po"))),
    paymentSources: (paymentSources || []).map(row => cloudRowData(row, {
      id: row.id,
      profileId: row.profile_id,
      name: row.name,
      type: row.type,
      institution: row.institution,
      last4: row.last4,
      accountName: row.account_name,
      openingBalance: row.opening_balance,
      statementDay: row.statement_day,
      dueDay: row.due_day,
      active: row.active,
      systemDefault: row.system_default
    })),
    bankTransactions: (bankTransactions || []).map(row => cloudRowData(row, {
      id: row.id,
      profileId: row.profile_id,
      paymentSourceId: row.payment_source_id,
      date: row.transaction_date,
      description: row.description,
      reference: row.reference,
      debit: row.debit,
      credit: row.credit,
      balance: row.balance,
      status: row.status,
      matchEntryType: row.match_entry_type,
      matchEntryId: row.match_entry_id,
      suggestedEntryType: row.suggested_entry_type,
      suggestedEntryId: row.suggested_entry_id,
      matchedAmount: row.matched_amount,
      difference: row.difference,
      differenceAccepted: row.difference_accepted,
      fingerprint: row.fingerprint,
      importBatchId: row.import_batch_id,
      sourceFile: row.source_file,
      importedAt: row.imported_at
    })),
    tallySyncRuns: (tallySyncRuns || []).map(row => cloudRowData(row, {
      id: row.id,
      profileId: row.profile_id,
      runType: row.run_type,
      status: row.status,
      fileName: row.file_name,
      sourceFile: row.source_file,
      fromDate: row.from_date,
      toDate: row.to_date,
      documentCount: row.document_count,
      entryRefs: row.entry_refs,
      counts: row.counts,
      message: row.message
    })),
    purchaseImportBatches: (purchaseImportBatches || []).map(row => cloudRowData(row, {
      id: row.id,
      status: row.status,
      fileCount: row.file_count,
      approvedCount: row.approved_count,
      completedAt: row.completed_at,
      label: row.label
    })),
    purchaseImportDocuments: (purchaseImportDocuments || []).map(row => cloudRowData(row, {
      id: row.id,
      batchId: row.batch_id,
      fileName: row.file_name,
      mimeType: row.mime_type,
      size: row.file_size,
      fileHash: row.file_hash,
      status: row.status,
      selected: row.selected,
      duplicatePurchaseId: row.duplicate_purchase_id,
      approvedPurchaseId: row.approved_purchase_id,
      error: row.error
    })),
    deletionTombstones: (deletionTombstones || []).map(row => cloudRowData(row, {
      id: `${row.entity_type}:${row.entity_id}`,
      entityType: row.entity_type,
      entityId: row.entity_id,
      profileId: row.profile_id,
      documentNumber: row.document_number,
      deletedAt: row.deleted_at,
      deletedBy: row.deleted_by,
      beforeData: row.before_data
    }))
  });
}

async function readCloudTableRows(table, workspaceId) {
  const { data, error } = await cloudClient
    .from(table)
    .select("*")
    .eq("workspace_id", workspaceId);
  if (!error) return data || [];
  if (isMissingCloudTableError(error)) return null;
  console.warn("Cloud row table read failed", table, error);
  return [];
}

function isMissingCloudTableError(error = {}) {
  return error.code === "42P01" || /does not exist|schema cache|Could not find the table/i.test(error.message || "");
}

function cloudRowData(row = {}, fallback = {}) {
  return normalizeCloudEntityMeta({ ...fallback, ...(row.data || {}) }, {
    syncStatus: row.sync_status || SYNC_STATUS_SYNCED,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    createdBy: row.created_by,
    lastSyncedAt: row.last_synced_at
  });
}

function cloudEntryFallback(row = {}, kind = "purchase") {
  const number = kind === "po"
    ? row.po_number
    : kind === "creditNote"
      ? row.credit_note_number
      : kind === "purchaseReturn"
        ? row.return_number
        : row.invoice_number;
  const date = kind === "po"
    ? row.po_date
    : kind === "creditNote"
      ? row.credit_note_date
      : kind === "purchaseReturn"
        ? row.return_date
        : row.invoice_date;
  return {
    id: row.id,
    profileId: row.profile_id,
    partyId: row.party_id,
    number,
    date,
    status: row.status,
    taxable: row.taxable,
    cgst: row.cgst,
    sgst: row.sgst,
    igst: row.igst,
    gst: row.gst,
    total: row.total,
    sellerGstin: row.seller_gstin,
    buyerGstin: row.buyer_gstin,
    reviewStatus: row.review_status,
    cancelled: row.cancelled,
    originalSaleId: row.original_sale_id,
    originalInvoiceNumber: row.original_invoice_number,
    originalInvoiceDate: row.original_invoice_date,
    reason: row.reason,
    restock: row.restock
  };
}

function parseMemberEmails(value) {
  return [...new Set(value
    .split(/[\n,;]/)
    .map(email => email.trim().toLowerCase())
    .filter(Boolean))];
}

async function selectCloudWorkspace(id) {
  const workspace = cloudWorkspaces.find(row => row.id === id);
  if (!workspace) return;
  await syncCloudNow(false);
  applyCloudWorkspace(workspace, "Workspace changed");
}

async function saveCloudWorkspaceSettings() {
  if (!cloudClient || !cloudWorkspace) return toast("Sign in to save workspace");
  const name = $("#cloudWorkspaceName").value.trim() || "Main Business";
  const memberEmails = parseMemberEmails($("#cloudMemberEmails").value);
  const { data, error } = await cloudClient
    .from(CLOUD_WORKSPACE_TABLE)
    .update({
      name,
      member_emails: memberEmails,
      data: clone(state),
      updated_at: new Date().toISOString()
    })
    .eq("id", cloudWorkspace.id)
    .select("id,name,owner_id,member_emails,data,updated_at,created_at")
    .single();
  if (error) return toast(error.message);
  cloudWorkspace = data;
  cloudWorkspaces = cloudWorkspaces.map(row => row.id === data.id ? data : row);
  renderCloudUi();
  toast("Workspace saved");
}

function scheduleCloudSave() {
  if (!cloudClient || !cloudSession || !cloudWorkspace || cloudLoading) return;
  clearTimeout(cloudSyncTimer);
  cloudSyncTimer = setTimeout(() => syncCloudNow(false), 900);
}

async function syncCloudNow(showToast) {
  if (!cloudClient || !cloudSession || !cloudWorkspace) {
    if (showToast) toast("Sign in to sync cloud data");
    return false;
  }
  clearTimeout(cloudSyncTimer);
  const selectedProfileId = activeProfileId();
  const selectColumns = "id,name,owner_id,member_emails,data,updated_at,created_at";
  const { data: latestWorkspace, error: readError } = await cloudClient
    .from(CLOUD_WORKSPACE_TABLE)
    .select(selectColumns)
    .eq("id", cloudWorkspace.id)
    .single();
  if (readError) {
    lastCloudSyncError = cloudErrorText(readError);
    if (showToast) toast(readError.message);
    else toast("Cloud sync failed");
    return false;
  }
  const normalizedCloudState = await readNormalizedCloudState(cloudWorkspace.id);
  const latestMerge = mergeCloudStateWithLocalCandidates(latestWorkspace.data || defaultState, [normalizedCloudState]);
  const latestCloudState = latestMerge.state;
  const latestChangedElsewhere = latestMerge.changed || String(latestWorkspace?.updated_at || "") !== String(cloudWorkspace?.updated_at || "");
  const previousState = normalizeState(clone(latestCloudState));
  let uploadState = normalizeState(clone(state));
  if (latestChangedElsewhere) {
    const merged = mergeCloudStateWithLocalCandidates(latestCloudState, [uploadState]);
    uploadState = merged.state;
  }
  const syncedAt = new Date().toISOString();
  uploadState = markStateSyncStatus(uploadState, SYNC_STATUS_SYNCED, syncedAt);
  restoreDeviceActiveProfile(uploadState, selectedProfileId);
  try {
    await syncNormalizedCloudTables(uploadState, previousState, syncedAt);
  } catch (syncError) {
    lastCloudSyncError = cloudErrorText(syncError);
    console.warn("Normalized cloud sync failed", syncError);
    if (showToast) toast(normalizedSyncErrorMessage(syncError));
    else toast("Cloud row sync failed");
    return false;
  }
  const { data, error } = await cloudClient
    .from(CLOUD_WORKSPACE_TABLE)
    .update({
      data: clone(uploadState),
      updated_at: syncedAt
    })
    .eq("id", cloudWorkspace.id)
    .select(selectColumns)
    .single();
  if (error) {
    lastCloudSyncError = cloudErrorText(error);
    if (showToast) toast(error.message);
    else toast("Cloud sync failed");
    return false;
  }
  lastCloudSyncError = "";
  cloudWorkspace = data;
  cloudWorkspaces = cloudWorkspaces.map(row => row.id === data.id ? data : row);
  state = restoreDeviceActiveProfile(normalizeState(clone(data.data || uploadState)), selectedProfileId);
  saveState({ skipCloud: true, skipLocalBackup: true });
  renderAll();
  if (showToast) toast("Cloud synced");
  return true;
}

function normalizedSyncErrorMessage(error = {}) {
  if (isMissingCloudTableError(error)) return "Cloud row tables are not ready. Run the latest database setup.";
  return error.message || "Cloud row sync failed";
}

function cloudErrorText(error = {}) {
  return [error.message, error.details, error.hint, error.code]
    .map(value => String(value || "").trim())
    .filter(Boolean)
    .join(" | ");
}

async function syncNormalizedCloudTables(nextState, previousState, syncedAt) {
  const workspaceId = cloudWorkspace?.id;
  if (!cloudClient || !workspaceId) return;
  const userId = currentCloudUserId();
  await syncCloudDeletionTombstones(nextState.deletionTombstones, syncedAt, userId);
  await purgeCloudDeletedEntries(nextState.deletionTombstones);
  await Promise.all([
    syncCloudEntityTable(CLOUD_ROW_TABLES.parties, "id", nextState.parties, previousState.parties, row => cloudPartyRow(workspaceId, row, syncedAt, userId)),
    syncCloudEntityTable(CLOUD_ROW_TABLES.items, "id", nextState.items, previousState.items, row => cloudItemRow(workspaceId, row, syncedAt, userId)),
    syncCloudEntityTable(CLOUD_ROW_TABLES.sales, "id", nextState.sales, previousState.sales, row => cloudEntryRow(workspaceId, row, "sale", syncedAt, userId)),
    syncCloudEntityTable(CLOUD_ROW_TABLES.purchases, "id", nextState.purchases, previousState.purchases, row => cloudEntryRow(workspaceId, row, "purchase", syncedAt, userId)),
    syncCloudEntityTable(CLOUD_ROW_TABLES.purchaseOrders, "id", nextState.purchaseOrders, previousState.purchaseOrders, row => cloudEntryRow(workspaceId, row, "po", syncedAt, userId))
  ]);
  await Promise.all([
    syncOptionalCloudEntityTable(CLOUD_ROW_TABLES.creditNotes, "id", nextState.creditNotes, previousState.creditNotes, row => cloudEntryRow(workspaceId, row, "creditNote", syncedAt, userId)),
    syncOptionalCloudEntityTable(CLOUD_ROW_TABLES.purchaseReturns, "id", nextState.purchaseReturns, previousState.purchaseReturns, row => cloudEntryRow(workspaceId, row, "purchaseReturn", syncedAt, userId)),
    syncOptionalCloudEntityTable(CLOUD_ROW_TABLES.paymentSources, "id", nextState.paymentSources, previousState.paymentSources, row => cloudPaymentSourceRow(workspaceId, row, syncedAt, userId)),
    syncOptionalCloudEntityTable(CLOUD_ROW_TABLES.bankTransactions, "id", nextState.bankTransactions, previousState.bankTransactions, row => cloudBankTransactionRow(workspaceId, row, syncedAt, userId)),
    syncOptionalCloudEntityTable(CLOUD_ROW_TABLES.tallySyncRuns, "id", nextState.tallySyncRuns, previousState.tallySyncRuns, row => cloudTallySyncRunRow(workspaceId, row, syncedAt, userId)),
    syncOptionalCloudEntityTable(CLOUD_ROW_TABLES.purchaseImportBatches, "id", nextState.purchaseImportBatches, previousState.purchaseImportBatches, row => cloudPurchaseImportBatchRow(workspaceId, row, syncedAt, userId))
  ]);
  await syncOptionalCloudEntityTable(
    CLOUD_ROW_TABLES.purchaseImportDocuments,
    "id",
    nextState.purchaseImportDocuments,
    previousState.purchaseImportDocuments,
    row => cloudPurchaseImportDocumentRow(workspaceId, row, syncedAt, userId)
  );
  await Promise.all([
    replaceCloudLineRows(CLOUD_ROW_TABLES.saleItems, nextState.sales.flatMap(entry => cloudLineRows(workspaceId, entry, "sale", syncedAt, userId))),
    replaceCloudLineRows(CLOUD_ROW_TABLES.purchaseItems, nextState.purchases.flatMap(entry => cloudLineRows(workspaceId, entry, "purchase", syncedAt, userId))),
    replaceCloudLineRows(CLOUD_ROW_TABLES.purchaseOrderItems, nextState.purchaseOrders.flatMap(entry => cloudLineRows(workspaceId, entry, "po", syncedAt, userId)))
  ]);
  await Promise.all([
    replaceOptionalCloudLineRows(CLOUD_ROW_TABLES.creditNoteItems, nextState.creditNotes.flatMap(entry => cloudLineRows(workspaceId, entry, "creditNote", syncedAt, userId))),
    replaceOptionalCloudLineRows(CLOUD_ROW_TABLES.purchaseReturnItems, nextState.purchaseReturns.flatMap(entry => cloudLineRows(workspaceId, entry, "purchaseReturn", syncedAt, userId)))
  ]);
  await insertCloudAuditRows(buildCloudAuditRows(previousState, nextState, syncedAt, userId));
  await saveDailyCloudBackup(nextState, syncedAt, userId);
}

async function syncSingleEntryToCloud(kind, entry) {
  if (!cloudClient || !cloudSession || !cloudWorkspace || !entry?.id) return false;
  const syncedAt = new Date().toISOString();
  const userId = currentCloudUserId();
  const table = cloudEntryTable(kind);
  const lineTable = cloudEntryLineTable(kind);
  const parentColumn = cloudEntryLineParentColumn(kind);
  if (!table || !lineTable || !parentColumn) return false;
  const { error: entryError } = await cloudClient
    .from(table)
    .upsert(cloudEntryRow(cloudWorkspace.id, entry, kind, syncedAt, userId), { onConflict: "workspace_id,id" });
  if (entryError) throw entryError;
  await replaceCloudLineRowsForEntry(
    lineTable,
    parentColumn,
    entry.id,
    cloudLineRows(cloudWorkspace.id, entry, kind, syncedAt, userId)
  );
  markEntitySyncStatus(entry, SYNC_STATUS_SYNCED, syncedAt);
  saveState({ skipCloud: true, skipLocalBackup: true });
  return true;
}

async function syncSinglePartyToCloud(party) {
  if (!cloudClient || !cloudSession || !cloudWorkspace || !party?.id) return false;
  const syncedAt = new Date().toISOString();
  const userId = currentCloudUserId();
  const { error } = await cloudClient
    .from(CLOUD_ROW_TABLES.parties)
    .upsert(cloudPartyRow(cloudWorkspace.id, party, syncedAt, userId), { onConflict: "workspace_id,id" });
  if (error) throw error;
  markEntitySyncStatus(party, SYNC_STATUS_SYNCED, syncedAt);
  saveState({ skipCloud: true, skipLocalBackup: true });
  return true;
}

function markLinkedPurchaseSyncFailed(internalSyncResult = null) {
  const purchases = internalSyncResult?.affectedPurchases?.length
    ? internalSyncResult.affectedPurchases
    : (internalSyncResult?.linkedPurchase ? [internalSyncResult.linkedPurchase] : []);
  if (!purchases.length) return;
  purchases.forEach(purchase => markEntitySyncStatus(purchase, SYNC_STATUS_FAILED));
  saveState({ skipCloud: true });
  renderEntries("purchase");
}

function saleSaveToast(synced, canSyncNow, internalSyncResult = null) {
  const internalAction = internalSyncResult?.action;
  const syncText = synced ? " and synced" : canSyncNow ? ` locally. Cloud sync failed${cloudFailureSuffix()}` : " locally";
  if (internalAction === "created") return `Sale saved${syncText}. Internal purchase created`;
  if (internalAction === "updated") return `Sale saved${syncText}. Internal purchase updated`;
  if (internalAction === "cancelled") return `Sale saved${syncText}. Internal purchase cancelled`;
  return synced ? "Sale saved and synced" : canSyncNow ? `Sale saved locally. Cloud sync failed${cloudFailureSuffix()}` : "Sale saved locally";
}

function cloudFailureSuffix() {
  return lastCloudSyncError ? `: ${lastCloudSyncError.slice(0, 110)}` : "";
}

function cloudEntryTable(kind) {
  if (kind === "sale") return CLOUD_ROW_TABLES.sales;
  if (kind === "creditNote") return CLOUD_ROW_TABLES.creditNotes;
  if (kind === "purchase") return CLOUD_ROW_TABLES.purchases;
  if (kind === "purchaseReturn") return CLOUD_ROW_TABLES.purchaseReturns;
  if (kind === "po") return CLOUD_ROW_TABLES.purchaseOrders;
  return "";
}

function cloudEntryLineTable(kind) {
  if (kind === "sale") return CLOUD_ROW_TABLES.saleItems;
  if (kind === "creditNote") return CLOUD_ROW_TABLES.creditNoteItems;
  if (kind === "purchase") return CLOUD_ROW_TABLES.purchaseItems;
  if (kind === "purchaseReturn") return CLOUD_ROW_TABLES.purchaseReturnItems;
  if (kind === "po") return CLOUD_ROW_TABLES.purchaseOrderItems;
  return "";
}

function cloudEntryLineParentColumn(kind) {
  if (kind === "sale") return "sale_id";
  if (kind === "creditNote") return "credit_note_id";
  if (kind === "purchase") return "purchase_id";
  if (kind === "purchaseReturn") return "purchase_return_id";
  if (kind === "po") return "purchase_order_id";
  return "";
}

async function syncCloudEntityTable(table, idColumn, currentRows = [], previousRows = [], mapRow) {
  const workspaceId = cloudWorkspace.id;
  const currentIds = new Set(currentRows.map(row => row.id).filter(Boolean));
  const removedIds = previousRows.map(row => row.id).filter(id => id && !currentIds.has(id));
  const mappedRows = currentRows.map(mapRow);
  for (let index = 0; index < mappedRows.length; index += 250) {
    const batch = mappedRows.slice(index, index + 250);
    const { error } = await cloudClient.from(table).upsert(batch, { onConflict: `workspace_id,${idColumn}` });
    if (error) throw error;
  }
  for (let index = 0; index < removedIds.length; index += 250) {
    const batch = removedIds.slice(index, index + 250);
    const { error } = await cloudClient
      .from(table)
      .delete()
      .eq("workspace_id", workspaceId)
      .in(idColumn, batch);
    if (error) throw error;
  }
}

async function syncCloudDeletionTombstones(tombstones = [], syncedAt, userId) {
  const rows = tombstones.map(tombstone => cloudDeletionTombstoneRow(
    cloudWorkspace.id,
    tombstone,
    syncedAt,
    userId
  ));
  for (let index = 0; index < rows.length; index += 250) {
    const { error } = await cloudClient
      .from(CLOUD_ROW_TABLES.deletionTombstones)
      .upsert(rows.slice(index, index + 250), { onConflict: "workspace_id,entity_type,entity_id" });
    if (error) throw error;
  }
}

async function purgeCloudDeletedEntries(tombstones = []) {
  for (const kind of ["purchase", "po"]) {
    const ids = [...new Set(tombstones
      .filter(tombstone => normalizeDeletionEntityType(tombstone.entityType) === kind)
      .map(tombstone => String(tombstone.entityId || "").trim())
      .filter(Boolean))];
    const entryTable = cloudEntryTable(kind);
    const lineTable = cloudEntryLineTable(kind);
    const parentColumn = cloudEntryLineParentColumn(kind);
    for (let index = 0; index < ids.length; index += 250) {
      const batch = ids.slice(index, index + 250);
      const { error: lineError } = await cloudClient
        .from(lineTable)
        .delete()
        .eq("workspace_id", cloudWorkspace.id)
        .in(parentColumn, batch);
      if (lineError) throw lineError;
      const { error: entryError } = await cloudClient
        .from(entryTable)
        .delete()
        .eq("workspace_id", cloudWorkspace.id)
        .in("id", batch);
      if (entryError) throw entryError;
    }
  }
}

async function syncOptionalCloudEntityTable(table, idColumn, currentRows = [], previousRows = [], mapRow) {
  try {
    await syncCloudEntityTable(table, idColumn, currentRows, previousRows, mapRow);
    return true;
  } catch (error) {
    if (isMissingCloudTableError(error)) return false;
    throw error;
  }
}

async function replaceCloudLineRows(table, rows = []) {
  const { error: deleteError } = await cloudClient
    .from(table)
    .delete()
    .eq("workspace_id", cloudWorkspace.id);
  if (deleteError) throw deleteError;
  if (!rows.length) return;
  const { error } = await cloudClient.from(table).insert(rows);
  if (error) throw error;
}

async function replaceOptionalCloudLineRows(table, rows = []) {
  try {
    await replaceCloudLineRows(table, rows);
    return true;
  } catch (error) {
    if (isMissingCloudTableError(error)) return false;
    throw error;
  }
}

async function replaceCloudLineRowsForEntry(table, parentColumn, entryId, rows = []) {
  const query = cloudClient
    .from(table)
    .delete()
    .eq("workspace_id", cloudWorkspace.id)
    .eq(parentColumn, entryId);
  const { error: deleteError } = await query;
  if (deleteError) throw deleteError;
  if (!rows.length) return;
  const { error } = await cloudClient.from(table).insert(rows);
  if (error) throw error;
}

function cloudPartyRow(workspaceId, party, syncedAt, userId) {
  return {
    workspace_id: workspaceId,
    id: party.id,
    name: party.name || "",
    type: normalizePartyType(party.type),
    gstin: normalizeGstin(party.gstin),
    phone: party.phone || "",
    email: party.email || "",
    place: party.place || "",
    data: clone(party),
    ...cloudSyncColumns(party, syncedAt, userId)
  };
}

function cloudItemRow(workspaceId, item, syncedAt, userId) {
  return {
    workspace_id: workspaceId,
    id: item.id,
    name: item.name || "",
    hsn: normalizeLineHsn(item.hsn) || DEFAULT_SALE_HSN,
    gst_rate: num(item.gstRate),
    sale_rate: num(item.saleRate),
    purchase_rate: num(item.purchaseRate),
    data: clone(item),
    ...cloudSyncColumns(item, syncedAt, userId)
  };
}

function cloudPaymentSourceRow(workspaceId, source, syncedAt, userId) {
  return {
    workspace_id: workspaceId,
    id: source.id,
    profile_id: source.profileId || "",
    name: source.name || "",
    type: source.type || "Bank Account",
    institution: source.institution || "",
    last4: source.last4 || "",
    account_name: source.accountName || "",
    opening_balance: round2(source.openingBalance),
    statement_day: Math.round(num(source.statementDay)),
    due_day: Math.round(num(source.dueDay)),
    active: source.active !== false,
    system_default: Boolean(source.systemDefault),
    data: clone(source),
    ...cloudSyncColumns(source, syncedAt, userId)
  };
}

function cloudBankTransactionRow(workspaceId, transaction, syncedAt, userId) {
  return {
    workspace_id: workspaceId,
    id: transaction.id,
    profile_id: transaction.profileId || "",
    payment_source_id: transaction.paymentSourceId || "",
    transaction_date: cloudDate(transaction.date),
    description: transaction.description || "",
    reference: transaction.reference || "",
    debit: round2(transaction.debit),
    credit: round2(transaction.credit),
    balance: round2(transaction.balance),
    status: transaction.status || "unmatched",
    match_entry_type: transaction.matchEntryType || "",
    match_entry_id: transaction.matchEntryId || "",
    suggested_entry_type: transaction.suggestedEntryType || "",
    suggested_entry_id: transaction.suggestedEntryId || "",
    matched_amount: round2(transaction.matchedAmount),
    difference: round2(transaction.difference),
    difference_accepted: Boolean(transaction.differenceAccepted),
    fingerprint: transaction.fingerprint || "",
    import_batch_id: transaction.importBatchId || "",
    source_file: transaction.sourceFile || "",
    imported_at: cloudTimestamp(transaction.importedAt) || null,
    data: clone(transaction),
    ...cloudSyncColumns(transaction, syncedAt, userId)
  };
}

function cloudTallySyncRunRow(workspaceId, run, syncedAt, userId) {
  return {
    workspace_id: workspaceId,
    id: run.id,
    profile_id: run.profileId || "",
    run_type: run.runType || "vouchers-export",
    status: run.status || "Exported",
    file_name: run.fileName || "",
    source_file: run.sourceFile || "",
    from_date: cloudDate(run.fromDate),
    to_date: cloudDate(run.toDate),
    document_count: Math.max(0, Math.round(num(run.documentCount))),
    entry_refs: Array.isArray(run.entryRefs) ? run.entryRefs : [],
    counts: run.counts && typeof run.counts === "object" ? clone(run.counts) : {},
    message: run.message || "",
    data: clone(run),
    ...cloudSyncColumns(run, syncedAt, userId)
  };
}

function cloudPurchaseImportBatchRow(workspaceId, batch, syncedAt, userId) {
  return {
    workspace_id: workspaceId,
    id: batch.id,
    status: batch.status || "review",
    file_count: Math.max(0, Math.round(num(batch.fileCount))),
    approved_count: Math.max(0, Math.round(num(batch.approvedCount))),
    completed_at: cloudTimestamp(batch.completedAt) || null,
    label: batch.label || "",
    data: clone(batch),
    ...cloudSyncColumns(batch, syncedAt, userId)
  };
}

function cloudPurchaseImportDocumentRow(workspaceId, document, syncedAt, userId) {
  const parsed = document.parsed || {};
  return {
    workspace_id: workspaceId,
    id: document.id,
    batch_id: document.batchId || "",
    file_name: document.fileName || "Invoice",
    mime_type: document.mimeType || "application/octet-stream",
    file_size: Math.max(0, Math.round(num(document.size))),
    file_hash: document.fileHash || "",
    status: document.status || "queued",
    selected: Boolean(document.selected),
    profile_id: parsed.profileId || "",
    supplier_gstin: normalizeGstin(parsed.supplierGstin),
    invoice_number: parsed.invoiceNumber || "",
    invoice_date: cloudDate(parsed.invoiceDate),
    total: round2(purchaseImportCalculatedTotals(parsed).total),
    duplicate_purchase_id: document.duplicatePurchaseId || null,
    approved_purchase_id: document.approvedPurchaseId || null,
    error: document.error || "",
    data: clone(document),
    ...cloudSyncColumns(document, syncedAt, userId)
  };
}

function cloudDeletionTombstoneRow(workspaceId, tombstone, syncedAt, userId) {
  return {
    workspace_id: workspaceId,
    entity_type: normalizeDeletionEntityType(tombstone.entityType),
    entity_id: tombstone.entityId || "",
    profile_id: tombstone.profileId || "",
    document_number: tombstone.documentNumber || "",
    deleted_at: cloudTimestamp(tombstone.deletedAt) || syncedAt,
    deleted_by: tombstone.deletedBy || userId,
    before_data: tombstone.beforeData ? clone(tombstone.beforeData) : null,
    data: clone(tombstone),
    ...cloudSyncColumns(tombstone, syncedAt, userId)
  };
}

function cloudEntryRow(workspaceId, entry, kind, syncedAt, userId) {
  const base = {
    workspace_id: workspaceId,
    id: entry.id,
    profile_id: entry.profileId || "",
    party_id: entry.partyId || "",
    status: entry.status || "",
    taxable: round2(entry.taxable),
    cgst: round2(entry.cgst),
    sgst: round2(entry.sgst),
    igst: round2(entry.igst),
    gst: round2(entry.gst),
    total: round2(entry.total),
    data: clone(entry),
    ...cloudSyncColumns(entry, syncedAt, userId)
  };
  if (kind === "po") {
    return {
      ...base,
      po_number: entry.number || "",
      po_date: cloudDate(entry.date)
    };
  }
  if (kind === "purchase") {
    return {
      ...base,
      invoice_number: entry.number || "",
      invoice_date: cloudDate(entry.date),
      seller_gstin: normalizeGstin(entry.sellerGstin),
      buyer_gstin: normalizeGstin(entry.buyerGstin),
      review_status: entry.reviewStatus || ""
    };
  }
  if (kind === "creditNote") {
    return {
      ...base,
      credit_note_number: entry.number || "",
      credit_note_date: cloudDate(entry.date),
      original_sale_id: entry.originalSaleId || null,
      original_invoice_number: entry.originalInvoiceNumber || "",
      original_invoice_date: cloudDate(entry.originalInvoiceDate),
      seller_gstin: normalizeGstin(entry.sellerGstin),
      buyer_gstin: normalizeGstin(entry.buyerGstin),
      reason: entry.reason || "",
      restock: Boolean(entry.restock),
      cancelled: isCancelledEntry(entry)
    };
  }
  if (kind === "purchaseReturn") {
    return {
      ...base,
      return_number: entry.number || "",
      return_date: cloudDate(entry.date),
      original_sale_id: entry.originalSaleId || null,
      original_invoice_number: entry.originalInvoiceNumber || "",
      original_invoice_date: cloudDate(entry.originalInvoiceDate),
      seller_gstin: normalizeGstin(entry.sellerGstin),
      buyer_gstin: normalizeGstin(entry.buyerGstin),
      reason: entry.reason || "",
      restock: Boolean(entry.restock),
      cancelled: isCancelledEntry(entry)
    };
  }
  return {
    ...base,
    invoice_number: entry.number || "",
    invoice_date: cloudDate(entry.date),
    cancelled: isCancelledEntry(entry)
  };
}

function cloudLineRows(workspaceId, entry, kind, syncedAt, userId) {
  const parentColumn = cloudEntryLineParentColumn(kind);
  return (entry.lines || []).map((line, index) => {
    const item = state.items.find(row => row.id === line.itemId) || {};
    const base = {
      workspace_id: workspaceId,
      [parentColumn]: entry.id,
      line_index: index,
      item_id: line.itemId || "",
      item_name: line.itemName || item.name || itemNameByLine(line, item, index + 1),
      hsn: lineHsn(line, item),
      qty: num(line.qty),
      rate: num(line.rate),
      gst_rate: num(line.gstRate),
      taxable: lineTaxableAmount(line),
      gst: lineGstAmount(line),
      total: lineGrossAmount(line),
      data: clone(line),
      sync_status: SYNC_STATUS_SYNCED,
      created_at: syncedAt,
      updated_at: syncedAt,
      created_by: userId,
      last_synced_at: syncedAt
    };
    if (kind !== "sale") base.gross_rate = lineGrossRate(line);
    if (kind === "creditNote" || kind === "purchaseReturn") base.original_line_index = num(line.originalLineIndex);
    return base;
  });
}

function cloudSyncColumns(entity = {}, syncedAt, userId) {
  return {
    sync_status: SYNC_STATUS_SYNCED,
    created_at: cloudTimestamp(entity.createdAt) || syncedAt,
    updated_at: cloudTimestamp(entity.updatedAt) || syncedAt,
    created_by: entity.createdBy || userId,
    last_synced_at: syncedAt
  };
}

function cloudDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) ? value : null;
}

function cloudTimestamp(value) {
  const date = new Date(value || "");
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function markStateSyncStatus(sourceState, status, syncedAt = "") {
  const nextState = normalizeState(clone(sourceState || defaultState));
  [...nextState.parties, ...nextState.items, ...nextState.sales, ...nextState.creditNotes, ...nextState.purchases, ...nextState.purchaseReturns, ...nextState.purchaseOrders, ...nextState.paymentSources, ...nextState.bankTransactions, ...nextState.tallySyncRuns, ...nextState.purchaseImportBatches, ...nextState.purchaseImportDocuments, ...nextState.deletionTombstones]
    .forEach(entity => markEntitySyncStatus(entity, status, syncedAt));
  return nextState;
}

function markEntitySyncStatus(entity, status, syncedAt = "") {
  if (!entity) return entity;
  entity.syncStatus = status;
  if (status === SYNC_STATUS_SYNCED && syncedAt) entity.lastSyncedAt = syncedAt;
  return entity;
}

function currentCloudUserId() {
  return cloudSession?.user?.id || null;
}

function cloudReadyForSync() {
  return Boolean(cloudClient && cloudSession && cloudWorkspace);
}

function buildCloudAuditRows(previousState, nextState, syncedAt, userId) {
  const groups = [
    ["party", previousState.parties, nextState.parties],
    ["item", previousState.items, nextState.items],
    ["sale", previousState.sales, nextState.sales],
    ["credit_note", previousState.creditNotes, nextState.creditNotes],
    ["purchase", previousState.purchases, nextState.purchases],
    ["purchase_return", previousState.purchaseReturns, nextState.purchaseReturns],
    ["purchase_order", previousState.purchaseOrders, nextState.purchaseOrders],
    ["payment_source", previousState.paymentSources, nextState.paymentSources],
    ["bank_transaction", previousState.bankTransactions, nextState.bankTransactions],
    ["tally_sync_run", previousState.tallySyncRuns, nextState.tallySyncRuns],
    ["purchase_import_batch", previousState.purchaseImportBatches, nextState.purchaseImportBatches],
    ["purchase_import_document", previousState.purchaseImportDocuments, nextState.purchaseImportDocuments]
  ];
  return groups.flatMap(([entityType, beforeRows, afterRows]) => buildCloudAuditRowsForGroup(entityType, beforeRows, afterRows, syncedAt, userId));
}

function buildCloudAuditRowsForGroup(entityType, beforeRows = [], afterRows = [], syncedAt, userId) {
  const beforeById = new Map(beforeRows.map(row => [row.id, row]));
  const afterById = new Map(afterRows.map(row => [row.id, row]));
  const ids = new Set([...beforeById.keys(), ...afterById.keys()].filter(Boolean));
  return [...ids].flatMap(id => {
    const before = beforeById.get(id);
    const after = afterById.get(id);
    if (!before && after) return [cloudAuditRow(entityType, id, "created", null, after, syncedAt, userId)];
    if (before && !after) return [cloudAuditRow(entityType, id, "deleted", before, null, syncedAt, userId)];
    if (cloudAuditComparable(before) !== cloudAuditComparable(after)) {
      return [cloudAuditRow(entityType, id, "updated", before, after, syncedAt, userId)];
    }
    return [];
  });
}

function cloudAuditRow(entityType, entityId, action, before, after, syncedAt, userId) {
  return {
    workspace_id: cloudWorkspace.id,
    entity_type: entityType,
    entity_id: entityId,
    action,
    before_data: before ? clone(before) : null,
    after_data: after ? clone(after) : null,
    source: "web-app",
    created_by: userId,
    created_at: syncedAt
  };
}

function cloudAuditComparable(entity = {}) {
  const copy = clone(entity || {});
  delete copy.syncStatus;
  delete copy.lastSyncedAt;
  delete copy.updatedAt;
  return JSON.stringify(copy);
}

async function insertCloudAuditRows(rows = []) {
  for (let index = 0; index < rows.length; index += 250) {
    const { error } = await cloudClient.from(CLOUD_ROW_TABLES.auditLogs).insert(rows.slice(index, index + 250));
    if (error) throw error;
  }
}

async function saveDailyCloudBackup(nextState, syncedAt, userId) {
  const { error } = await cloudClient
    .from(CLOUD_ROW_TABLES.backups)
    .upsert({
      workspace_id: cloudWorkspace.id,
      backup_date: today(),
      data: clone(nextState),
      created_by: userId,
      created_at: syncedAt
    }, { onConflict: "workspace_id,backup_date" });
  if (error) throw error;
}

function newLocalSyncStatus() {
  return cloudClient && cloudSession && cloudWorkspace ? SYNC_STATUS_SYNCING : SYNC_STATUS_LOCAL;
}

function entityWithLocalMeta(entity, existingEntity = null) {
  const now = new Date().toISOString();
  return {
    ...entity,
    syncStatus: newLocalSyncStatus(),
    createdAt: existingEntity?.createdAt || now,
    updatedAt: now,
    createdBy: existingEntity?.createdBy || currentCloudUserId() || "",
    lastSyncedAt: existingEntity?.lastSyncedAt || ""
  };
}

function markEntrySyncFailed(kind, id) {
  const entry = entryList(kind).find(row => row.id === id);
  if (!entry) return;
  markEntitySyncStatus(entry, SYNC_STATUS_FAILED);
  saveState({ skipCloud: true });
  if (kind === "creditNote" || kind === "purchaseReturn") renderCreditNotes();
  else renderEntries(kind);
}

function syncStatusBadge(entity = {}) {
  const status = entity.syncStatus || SYNC_STATUS_SYNCED;
  if (status === SYNC_STATUS_SYNCED) return "";
  const className = status === SYNC_STATUS_FAILED ? "danger" : status === SYNC_STATUS_SYNCING ? "warn" : "";
  return `<span class="sync-status-badge ${className}">${escapeHtml(status)}</span>`;
}

function renderDashboard() {
  if (window.lucide) lucide.createIcons();
}

function defaultReconciliationMonth() {
  return today().slice(0, 7);
}

function reconciliationMonthMatches(date, month = reconciliationMonth || defaultReconciliationMonth()) {
  return String(date || "").slice(0, 7) === month;
}

function reconciliationTransactionAmount(transaction = {}) {
  return round2(num(transaction.debit) || num(transaction.credit));
}

function reconciliationTransactionDirection(transaction = {}) {
  return num(transaction.debit) > 0 ? "debit" : num(transaction.credit) > 0 ? "credit" : "";
}

function reconciliationBookEntries(profileId = activeProfileId()) {
  const purchases = state.purchases
    .filter(entry => entry.profileId === profileId && !isCancelledEntry(entry))
    .map(entry => reconciliationBookEntry(entry, "purchase"));
  const sales = state.sales
    .filter(entry => entry.profileId === profileId && !isCancelledEntry(entry))
    .map(entry => reconciliationBookEntry(entry, "sale"));
  return [...purchases, ...sales];
}

function reconciliationBookEntry(entry, type) {
  return {
    id: entry.id,
    key: `${type}:${entry.id}`,
    type,
    direction: type === "purchase" ? "debit" : "credit",
    date: entry.paymentDate || entry.date || "",
    invoiceDate: entry.date || "",
    number: entry.number || "",
    party: partyName(entry.partyId),
    amount: round2(entry.total),
    paymentSourceId: entry.paymentSourceId || "",
    paymentReference: entry.paymentReference || "",
    entry
  };
}

function reconciliationBookEntryByKey(type, id) {
  if (!type || !id) return null;
  return reconciliationBookEntries(activeProfileId()).find(entry => entry.type === type && entry.id === id) || null;
}

function reconciliationMatchedBookKeys(excludeTransactionId = "") {
  return new Set(state.bankTransactions
    .filter(transaction => transaction.id !== excludeTransactionId && ["matched", "difference"].includes(transaction.status))
    .filter(transaction => transaction.matchEntryType && transaction.matchEntryId)
    .map(transaction => `${transaction.matchEntryType}:${transaction.matchEntryId}`));
}

function reconciliationDateGap(first, second) {
  const a = new Date(`${first || "1970-01-01"}T00:00:00`);
  const b = new Date(`${second || "1970-01-01"}T00:00:00`);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 9999;
  return Math.abs(Math.round((a.getTime() - b.getTime()) / 86400000));
}

function reconciliationComparableText(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function reconciliationCandidateScore(transaction, entry) {
  const transactionText = reconciliationComparableText(`${transaction.reference} ${transaction.description}`);
  const invoiceText = reconciliationComparableText(entry.number);
  const partyText = reconciliationComparableText(entry.party);
  let score = reconciliationDateGap(transaction.date, entry.date) * 10;
  score += Math.min(999, Math.abs(reconciliationTransactionAmount(transaction) - entry.amount));
  if (invoiceText.length >= 3 && transactionText.includes(invoiceText)) score -= 80;
  if (partyText.length >= 4 && transactionText.includes(partyText)) score -= 30;
  return score;
}

function reconciliationCandidates(transaction, options = {}) {
  const direction = reconciliationTransactionDirection(transaction);
  const matchedKeys = reconciliationMatchedBookKeys(transaction.id);
  const maximumDays = options.maximumDays ?? 7;
  return reconciliationBookEntries(transaction.profileId)
    .filter(entry => entry.direction === direction)
    .filter(entry => !matchedKeys.has(entry.key))
    .filter(entry => !entry.paymentSourceId || entry.paymentSourceId === transaction.paymentSourceId)
    .filter(entry => reconciliationDateGap(transaction.date, entry.date) <= maximumDays)
    .sort((a, b) => reconciliationCandidateScore(transaction, a) - reconciliationCandidateScore(transaction, b));
}

function markReconciliationEntityChanged(entity) {
  const now = new Date().toISOString();
  entity.syncStatus = newLocalSyncStatus();
  entity.createdAt = entity.createdAt || now;
  entity.updatedAt = now;
  entity.createdBy = entity.createdBy || currentCloudUserId() || "";
}

function applyReconciliationMatch(transaction, bookEntry) {
  if (!transaction || !bookEntry) return false;
  const previousEntry = reconciliationBookEntryByKey(transaction.matchEntryType, transaction.matchEntryId)?.entry;
  if (previousEntry && previousEntry.id !== bookEntry.id && previousEntry.reconciledTransactionId === transaction.id) {
    previousEntry.reconciledTransactionId = "";
    markReconciliationEntityChanged(previousEntry);
  }
  const amount = reconciliationTransactionAmount(transaction);
  const difference = round2(amount - bookEntry.amount);
  transaction.matchEntryType = bookEntry.type;
  transaction.matchEntryId = bookEntry.id;
  transaction.suggestedEntryType = "";
  transaction.suggestedEntryId = "";
  transaction.matchedAmount = bookEntry.amount;
  transaction.difference = difference;
  transaction.differenceAccepted = false;
  transaction.status = Math.abs(difference) <= 1 ? "matched" : "difference";
  markReconciliationEntityChanged(transaction);

  const entry = bookEntry.entry;
  if (!entry.paymentSourceId) entry.paymentSourceId = transaction.paymentSourceId;
  if (!entry.paymentDate) entry.paymentDate = transaction.date;
  if (!entry.paymentReference) entry.paymentReference = transaction.reference;
  entry.reconciledTransactionId = transaction.id;
  markReconciliationEntityChanged(entry);
  return true;
}

function suggestReconciliationMatch(transaction, bookEntry) {
  transaction.status = "suggested";
  transaction.suggestedEntryType = bookEntry?.type || "";
  transaction.suggestedEntryId = bookEntry?.id || "";
  markReconciliationEntityChanged(transaction);
}

function autoReconcileTransactions(transactionIds = []) {
  const targetIds = new Set(transactionIds);
  const transactions = state.bankTransactions.filter(transaction => (
    (!targetIds.size || targetIds.has(transaction.id))
    && transaction.status === "unmatched"
  ));
  let matched = 0;
  let suggested = 0;
  transactions.forEach(transaction => {
    const amount = reconciliationTransactionAmount(transaction);
    const candidates = reconciliationCandidates(transaction);
    const exact = candidates.filter(entry => Math.abs(entry.amount - amount) <= 1);
    if (exact.length === 1) {
      applyReconciliationMatch(transaction, exact[0]);
      matched += 1;
      return;
    }
    if (exact.length > 1) {
      const transactionText = reconciliationComparableText(`${transaction.reference} ${transaction.description}`);
      const referenced = exact.filter(entry => {
        const invoiceText = reconciliationComparableText(entry.number);
        return invoiceText.length >= 3 && transactionText.includes(invoiceText);
      });
      if (referenced.length === 1) {
        applyReconciliationMatch(transaction, referenced[0]);
        matched += 1;
      } else {
        suggestReconciliationMatch(transaction, exact[0]);
        suggested += 1;
      }
      return;
    }
    const near = candidates.filter(entry => {
      const tolerance = Math.max(100, entry.amount * 0.01);
      return Math.abs(entry.amount - amount) <= tolerance;
    });
    if (near.length) {
      suggestReconciliationMatch(transaction, near[0]);
      suggested += 1;
    }
  });
  return { matched, suggested };
}

function reconciliationSourceTransactions(profileId, sourceId, month) {
  return state.bankTransactions.filter(transaction => (
    transaction.profileId === profileId
    && reconciliationMonthMatches(transaction.date, month)
    && (sourceId === "all" || transaction.paymentSourceId === sourceId)
  ));
}

function reconciliationBooksMissing(profileId, sourceId, month) {
  const matchedKeys = reconciliationMatchedBookKeys();
  return reconciliationBookEntries(profileId)
    .filter(entry => reconciliationMonthMatches(entry.date, month))
    .filter(entry => sourceId === "all" || !entry.paymentSourceId || entry.paymentSourceId === sourceId)
    .filter(entry => !matchedKeys.has(entry.key));
}

function reconciliationDuePayments(profileId, month) {
  return state.paymentSources
    .filter(source => source.profileId === profileId && source.active && source.type === "Credit Card")
    .map(source => {
      const cycle = reconciliationStatementCycle(month, source.statementDay);
      const transactions = state.bankTransactions.filter(transaction => (
        transaction.profileId === profileId
        && transaction.paymentSourceId === source.id
        && transaction.date >= cycle.start
        && transaction.date <= cycle.end
      ));
      const debits = round2(transactions.reduce((sum, transaction) => sum + num(transaction.debit), 0));
      const credits = round2(transactions.reduce((sum, transaction) => sum + num(transaction.credit), 0));
      return {
        source,
        cycle,
        transactionCount: transactions.length,
        debits,
        credits,
        amount: Math.max(0, round2(debits - credits)),
        dueDate: reconciliationDueDate(month, source.dueDay)
      };
    });
}

function reconciliationStatementCycle(month, statementDay) {
  const [year, monthNumber] = String(month || "").split("-").map(Number);
  if (!year || !monthNumber) return { start: "", end: "" };
  const monthIndex = monthNumber - 1;
  const selectedMonthDays = new Date(year, monthNumber, 0).getDate();
  const requestedCloseDay = num(statementDay) ? Math.min(31, Math.max(1, Math.round(num(statementDay)))) : 0;
  const closeDay = requestedCloseDay ? Math.min(selectedMonthDays, requestedCloseDay) : selectedMonthDays;
  const end = new Date(year, monthIndex, closeDay);
  if (!num(statementDay)) return { start: dateToIso(new Date(year, monthIndex, 1)), end: dateToIso(end) };
  const previousMonthDays = new Date(year, monthIndex, 0).getDate();
  const previousClose = new Date(year, monthIndex - 1, Math.min(previousMonthDays, requestedCloseDay));
  const start = new Date(previousClose);
  start.setDate(start.getDate() + 1);
  return { start: dateToIso(start), end: dateToIso(end) };
}

function reconciliationDueDate(month, dueDay) {
  const [year, monthNumber] = String(month || "").split("-").map(Number);
  if (!year || !monthNumber || !num(dueDay)) return "";
  const lastDayOfNextMonth = new Date(year, monthNumber + 1, 0).getDate();
  const day = Math.min(lastDayOfNextMonth, Math.max(1, Math.round(num(dueDay))));
  return dateToIso(new Date(year, monthNumber, day));
}

function renderReconciliation() {
  const list = $("#reconciliationList");
  const monthControl = $("#reconciliationMonth");
  const sourceControl = $("#reconciliationSourceFilter");
  if (!list || !monthControl || !sourceControl) return;

  const profileId = activeProfileId();
  reconciliationMonth = reconciliationMonth || defaultReconciliationMonth(profileId);
  monthControl.value = reconciliationMonth;
  const sources = state.paymentSources.filter(source => source.profileId === profileId);
  const sourceIds = new Set(sources.map(source => source.id));
  if (!reconciliationSourceFilterId || (reconciliationSourceFilterId !== "all" && !sourceIds.has(reconciliationSourceFilterId))) {
    reconciliationSourceFilterId = sources.find(source => source.active)?.id || sources[0]?.id || "all";
  }
  sourceControl.innerHTML = `<option value="all">All accounts</option>${sources.map(source => `
    <option value="${escapeHtml(source.id)}">${escapeHtml(paymentSourceLabel(source))}${source.active ? "" : " (Inactive)"}</option>
  `).join("")}`;
  sourceControl.value = reconciliationSourceFilterId;
  const statementInput = $("#bankStatementInput");
  if (statementInput) statementInput.disabled = !sources.length;

  const transactions = reconciliationSourceTransactions(profileId, reconciliationSourceFilterId, reconciliationMonth);
  const review = transactions.filter(transaction => ["unmatched", "suggested"].includes(transaction.status));
  const matched = transactions.filter(transaction => transaction.status === "matched");
  const differences = transactions.filter(transaction => transaction.status === "difference");
  const ignored = transactions.filter(transaction => transaction.status === "ignored");
  const booksMissing = reconciliationBooksMissing(profileId, reconciliationSourceFilterId, reconciliationMonth);
  const duePayments = reconciliationDuePayments(profileId, reconciliationMonth);
  const differenceAmount = differences.reduce((sum, transaction) => sum + Math.abs(num(transaction.difference)), 0);

  $("#reconciliationSummary").innerHTML = [
    ["Statement Entries", transactions.length],
    ["Matched", matched.length],
    ["Needs Review", review.length + differences.length],
    ["Difference", money(differenceAmount)]
  ].map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(String(value))}</strong></div>`).join("");
  $("#paymentSourceStrip").innerHTML = renderPaymentSourceStrip(sources, transactions);
  $("#reconReviewCount").textContent = review.length;
  $("#reconMatchedCount").textContent = matched.length;
  $("#reconDifferenceCount").textContent = differences.length;
  $("#reconBooksCount").textContent = booksMissing.length;
  $("#reconDueCount").textContent = duePayments.filter(payment => payment.amount > 1).length;
  $("#reconIgnoredCount").textContent = ignored.length;
  $$('[data-reconciliation-tab]').forEach(button => button.classList.toggle("active", button.dataset.reconciliationTab === activeReconciliationTab));

  if (activeReconciliationTab === "books") {
    list.innerHTML = booksMissing.map(renderReconciliationBookCard).join("") || reconciliationEmptyState("All book entries are matched for this month");
  } else if (activeReconciliationTab === "due") {
    list.innerHTML = duePayments.map(renderReconciliationDueCard).join("") || reconciliationEmptyState("No credit-card payment sources are configured");
  } else {
    const selectedTransactions = activeReconciliationTab === "matched"
      ? matched
      : activeReconciliationTab === "differences"
        ? differences
        : activeReconciliationTab === "ignored"
          ? ignored
          : review;
    list.innerHTML = selectedTransactions
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
      .map(renderReconciliationTransactionCard)
      .join("") || reconciliationEmptyState(reconciliationEmptyLabel(activeReconciliationTab));
  }
  if (window.lucide) lucide.createIcons();
}

function renderPaymentSourceStrip(sources = [], visibleTransactions = []) {
  if (!sources.length) return reconciliationEmptyState("Add a bank account or card to begin");
  return sources.map(source => {
    const count = state.bankTransactions.filter(transaction => transaction.paymentSourceId === source.id && reconciliationMonthMatches(transaction.date)).length;
    const selected = reconciliationSourceFilterId === source.id;
    return `<div class="payment-source-card ${selected ? "selected" : ""} ${source.active ? "" : "inactive"}">
      <button class="payment-source-main" type="button" onclick="selectReconciliationSource('${escapeHtml(source.id)}')">
        <span class="payment-source-icon"><i data-lucide="${source.type === "Credit Card" ? "credit-card" : source.type === "Cash" ? "banknote" : "landmark"}"></i></span>
        <span><strong>${escapeHtml(paymentSourceLabel(source))}</strong><small>${escapeHtml(source.type)} · ${count} entries</small></span>
      </button>
      <button class="mini-btn" type="button" title="Edit account" onclick="openPaymentSource('${escapeHtml(source.id)}')"><i data-lucide="pencil"></i></button>
    </div>`;
  }).join("");
}

function reconciliationStatusMarkup(transaction) {
  if (transaction.status === "matched") return `<span class="badge ok">Matched</span>`;
  if (transaction.status === "difference") return `<span class="badge warn">Difference</span>`;
  if (transaction.status === "suggested") return `<span class="badge warn">Suggested</span>`;
  if (transaction.status === "ignored") return `<span class="badge">Ignored</span>`;
  return `<span class="badge danger">Unmatched</span>`;
}

function renderReconciliationTransactionCard(transaction) {
  const direction = reconciliationTransactionDirection(transaction);
  const amount = reconciliationTransactionAmount(transaction);
  const source = paymentSourceById(transaction.paymentSourceId) || {};
  const matchedEntry = reconciliationBookEntryByKey(transaction.matchEntryType, transaction.matchEntryId);
  const suggestedEntry = reconciliationBookEntryByKey(transaction.suggestedEntryType, transaction.suggestedEntryId);
  const linkedEntry = matchedEntry || suggestedEntry;
  const matchText = linkedEntry
    ? `${linkedEntry.type === "purchase" ? "Purchase" : "Sale"} ${linkedEntry.number} · ${linkedEntry.party} · ${money(linkedEntry.amount)}`
    : "No book entry linked";
  let actions = "";
  if (["unmatched", "suggested"].includes(transaction.status)) {
    actions = `${suggestedEntry ? `<button class="primary-btn compact-btn" type="button" onclick="acceptReconciliationSuggestion('${escapeHtml(transaction.id)}')"><i data-lucide="check"></i><span>Accept</span></button>` : ""}
      <button class="secondary-btn compact-btn" type="button" onclick="openReconciliationMatch('${escapeHtml(transaction.id)}')"><i data-lucide="link"></i><span>Match</span></button>
      <button class="icon-btn" type="button" title="Ignore" onclick="ignoreReconciliationTransaction('${escapeHtml(transaction.id)}')"><i data-lucide="eye-off"></i></button>`;
  } else if (transaction.status === "difference") {
    actions = `<button class="primary-btn compact-btn" type="button" onclick="acceptReconciliationDifference('${escapeHtml(transaction.id)}')"><i data-lucide="check"></i><span>Accept</span></button>
      <button class="secondary-btn compact-btn" type="button" onclick="openReconciliationMatch('${escapeHtml(transaction.id)}')"><i data-lucide="link"></i><span>Change</span></button>
      <button class="icon-btn" type="button" title="Unmatch" onclick="unmatchReconciliationTransaction('${escapeHtml(transaction.id)}')"><i data-lucide="unlink"></i></button>`;
  } else if (transaction.status === "matched") {
    actions = `<button class="secondary-btn compact-btn" type="button" onclick="unmatchReconciliationTransaction('${escapeHtml(transaction.id)}')"><i data-lucide="unlink"></i><span>Unmatch</span></button>`;
  } else {
    actions = `<button class="secondary-btn compact-btn" type="button" onclick="restoreReconciliationTransaction('${escapeHtml(transaction.id)}')"><i data-lucide="rotate-ccw"></i><span>Restore</span></button>`;
  }
  return `<article class="reconciliation-row">
    <div class="reconciliation-row-main">
      <time>${escapeHtml(formatInvoiceDate(transaction.date) || transaction.date || "-")}</time>
      <strong>${escapeHtml(transaction.description || "Bank transaction")}</strong>
      <small>${escapeHtml([transaction.reference, paymentSourceLabel(source)].filter(Boolean).join(" · ") || "-")}</small>
    </div>
    <div class="reconciliation-amount ${direction}"><span>${direction === "debit" ? "Debit" : "Credit"}</span><strong>${money(amount)}</strong></div>
    <div class="reconciliation-link"><span>${reconciliationStatusMarkup(transaction)}</span><strong>${escapeHtml(matchText)}</strong>${transaction.status === "difference" ? `<small>Difference ${money(transaction.difference)}</small>` : ""}</div>
    <div class="reconciliation-row-actions">${actions}</div>
  </article>`;
}

function renderReconciliationBookCard(entry) {
  const source = paymentSourceById(entry.paymentSourceId);
  return `<article class="reconciliation-row book-missing-row">
    <div class="reconciliation-row-main">
      <time>${escapeHtml(formatInvoiceDate(entry.date) || entry.date || "-")}</time>
      <strong>${escapeHtml(entry.type === "purchase" ? `Purchase ${entry.number}` : `Sale ${entry.number}`)}</strong>
      <small>${escapeHtml(entry.party)}</small>
    </div>
    <div class="reconciliation-amount ${entry.direction}"><span>${entry.direction === "debit" ? "Expected Debit" : "Expected Credit"}</span><strong>${money(entry.amount)}</strong></div>
    <div class="reconciliation-link"><span class="badge warn">Not in statement</span><strong>${escapeHtml(source ? paymentSourceLabel(source) : "Payment source not selected")}</strong></div>
    <div class="reconciliation-row-actions"><button class="secondary-btn compact-btn" type="button" onclick="openEntry('${entry.type}', '${escapeHtml(entry.id)}')"><i data-lucide="pencil"></i><span>Edit Bill</span></button></div>
  </article>`;
}

function renderReconciliationDueCard(payment) {
  const { source } = payment;
  const overdue = payment.amount > 1 && payment.dueDate && payment.dueDate < today();
  const status = payment.amount <= 1 ? "No balance due" : overdue ? "Overdue" : "Payment due";
  const statusClass = payment.amount <= 1 ? "ok" : overdue ? "danger" : "warn";
  const statementMeta = [
    payment.transactionCount ? `${payment.transactionCount} statement entries` : "No statement entries",
    payment.cycle.start && payment.cycle.end
      ? `${formatInvoiceDate(payment.cycle.start)} to ${formatInvoiceDate(payment.cycle.end)}`
      : "Statement cycle not set"
  ].join(" · ");
  return `<article class="reconciliation-row due-payment-row">
    <div class="reconciliation-row-main">
      <time>${escapeHtml(payment.dueDate ? `Due ${formatInvoiceDate(payment.dueDate)}` : "Due day not set")}</time>
      <strong>${escapeHtml(paymentSourceLabel(source))}</strong>
      <small>${escapeHtml(statementMeta)}</small>
    </div>
    <div class="reconciliation-amount debit"><span>Estimated Due</span><strong>${money(payment.amount)}</strong></div>
    <div class="reconciliation-link"><span class="badge ${statusClass}">${escapeHtml(status)}</span><strong>Debits ${escapeHtml(money(payment.debits))} · Credits ${escapeHtml(money(payment.credits))}</strong></div>
    <div class="reconciliation-row-actions"><button class="secondary-btn compact-btn" type="button" onclick="openPaymentSource('${escapeHtml(source.id)}')"><i data-lucide="pencil"></i><span>Edit Card</span></button></div>
  </article>`;
}

function reconciliationEmptyState(label) {
  return `<div class="reconciliation-empty"><i data-lucide="circle-check"></i><strong>${escapeHtml(label)}</strong></div>`;
}

function reconciliationEmptyLabel(tab) {
  if (tab === "matched") return "No matched entries for this month";
  if (tab === "differences") return "No amount differences for this month";
  if (tab === "due") return "No card payments are due for this month";
  if (tab === "ignored") return "No ignored entries for this month";
  return "No statement entries need review";
}

function selectReconciliationSource(sourceId) {
  reconciliationSourceFilterId = sourceId || "all";
  renderReconciliation();
}

function openPaymentSource(id = "") {
  editingPaymentSourceId = id || null;
  const source = id ? paymentSourceById(id) : null;
  const form = $("#paymentSourceForm");
  if (!form) return;
  form.reset();
  $("#paymentSourceDialogTitle").textContent = source ? "Edit Account" : "Add Account";
  form.elements.profileId.innerHTML = profileOptions(source?.profileId || activeProfileId());
  form.elements.profileId.value = source?.profileId || activeProfileId();
  form.elements.type.value = source?.type || "Bank Account";
  form.elements.name.value = source?.name || "";
  form.elements.institution.value = source?.institution || "";
  form.elements.last4.value = source?.last4 || "";
  form.elements.accountName.value = source?.accountName || "";
  form.elements.openingBalance.value = num(source?.openingBalance) || 0;
  form.elements.statementDay.value = num(source?.statementDay) || "";
  form.elements.dueDay.value = num(source?.dueDay) || "";
  form.elements.active.checked = source?.active !== false;
  $("#paymentSourceDialog").showModal();
  if (window.lucide) lucide.createIcons();
}

async function savePaymentSource(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const existing = editingPaymentSourceId ? paymentSourceById(editingPaymentSourceId) : null;
  const source = entityWithLocalMeta(normalizePaymentSourceForState({
    id: existing?.id || uid(),
    profileId: form.elements.profileId.value || activeProfileId(),
    type: form.elements.type.value,
    name: form.elements.name.value.trim(),
    institution: form.elements.institution.value.trim(),
    last4: form.elements.last4.value,
    accountName: form.elements.accountName.value.trim(),
    openingBalance: form.elements.openingBalance.value,
    statementDay: form.elements.statementDay.value,
    dueDay: form.elements.dueDay.value,
    active: form.elements.active.checked,
    systemDefault: Boolean(existing?.systemDefault)
  }), existing);
  if (!source.name) return toast("Enter an account name");
  const index = state.paymentSources.findIndex(row => row.id === source.id);
  if (index >= 0) state.paymentSources[index] = source;
  else state.paymentSources.push(source);
  reconciliationSourceFilterId = source.id;
  saveState();
  $("#paymentSourceDialog").close();
  renderAll();
  await syncCloudNow(false);
  toast(existing ? "Account updated" : "Account added");
}

async function handleBankStatementUpload(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  const sources = activePaymentSources(activeProfileId());
  const sourceId = reconciliationSourceFilterId !== "all" ? reconciliationSourceFilterId : (sources.length === 1 ? sources[0].id : "");
  if (!sourceId || !paymentSourceById(sourceId)) return toast("Select one bank account or card before uploading the statement");
  try {
    const matrix = await readBankStatementMatrix(file);
    const imported = parseBankStatementTransactions(matrix, {
      fileName: file.name,
      profileId: activeProfileId(),
      paymentSourceId: sourceId,
      sourceType: paymentSourceById(sourceId)?.type || "Bank Account"
    });
    if (!imported.length) return toast("No debit or credit entries were found in this statement");
    const existingFingerprints = new Set(state.bankTransactions.map(transaction => transaction.fingerprint).filter(Boolean));
    const newTransactions = imported.filter(transaction => !existingFingerprints.has(transaction.fingerprint));
    if (!newTransactions.length) return toast("This statement has already been imported");
    const rows = newTransactions.map(transaction => entityWithLocalMeta(normalizeBankTransactionForState(transaction)));
    state.bankTransactions.push(...rows);
    const result = autoReconcileTransactions(rows.map(row => row.id));
    saveState();
    renderAll();
    const synced = await syncCloudNow(false);
    const duplicateCount = imported.length - newTransactions.length;
    toast(`${newTransactions.length} entries imported · ${result.matched} matched${duplicateCount ? ` · ${duplicateCount} duplicates skipped` : ""}${synced ? "" : " · saved locally"}`);
  } catch (error) {
    console.warn("Bank statement import failed", error);
    toast(error.message || "Could not read this bank statement");
  }
}

async function readBankStatementMatrix(file) {
  if (window.XLSX) {
    const buffer = await file.arrayBuffer();
    const workbook = window.XLSX.read(buffer, { type: "array", cellDates: true, raw: true });
    const sheets = workbook.SheetNames.map(name => window.XLSX.utils.sheet_to_json(workbook.Sheets[name], {
      header: 1,
      raw: true,
      defval: ""
    })).filter(rows => rows.length);
    if (!sheets.length) throw new Error("The statement file is empty");
    return sheets.sort((a, b) => statementLayoutScore(b) - statementLayoutScore(a))[0];
  }
  if (!/\.csv$/i.test(file.name)) throw new Error("Excel reader is unavailable. Upload a CSV file instead");
  return parseCsvMatrix(await file.text());
}

function parseCsvMatrix(text) {
  const firstLine = String(text || "").split(/\r?\n/, 1)[0] || "";
  const delimiters = [",", "\t", ";"];
  const delimiter = delimiters.sort((a, b) => firstLine.split(b).length - firstLine.split(a).length)[0];
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '"') {
      if (quoted && text[index + 1] === '"') {
        value += '"';
        index += 1;
      } else quoted = !quoted;
    } else if (character === delimiter && !quoted) {
      row.push(value);
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && text[index + 1] === "\n") index += 1;
      row.push(value);
      if (row.some(cell => String(cell).trim())) rows.push(row);
      row = [];
      value = "";
    } else value += character;
  }
  row.push(value);
  if (row.some(cell => String(cell).trim())) rows.push(row);
  return rows;
}

function normalizeStatementHeader(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function statementHeaderMap(row = []) {
  const headers = row.map(normalizeStatementHeader);
  const find = patterns => headers.findIndex(header => patterns.some(pattern => pattern.test(header)));
  return {
    date: find([/^transaction date$/, /^transaction dt$/, /^txn date$/, /^txn dt$/, /^tran date$/, /^date$/, /^value date$/, /^value dt$/, /^posting date$/]),
    description: find([/narration/, /description/, /particular/, /transaction detail/, /^details$/, /remarks/, /merchant/]),
    reference: find([/reference/, /ref no/, /cheque/, /chq/, /utr/, /transaction id/]),
    debit: find([/^debit/, /withdrawal/, /withdraw amount/, /^dr amount$/, /paid out/]),
    credit: find([/^credit/, /deposit/, /^cr amount$/, /paid in/]),
    amount: find([/^amount(?: inr)?$/, /transaction amount/, /txn amount/]),
    type: find([/dr cr/, /debit credit/, /^type$/, /transaction type/, /indicator/]),
    balance: find([/balance/])
  };
}

function statementLayoutScore(matrix = []) {
  return matrix.slice(0, 25).reduce((best, row) => {
    const map = statementHeaderMap(row);
    const score = (map.date >= 0 ? 4 : 0)
      + (map.debit >= 0 ? 2 : 0)
      + (map.credit >= 0 ? 2 : 0)
      + (map.amount >= 0 ? 2 : 0)
      + (map.description >= 0 ? 1 : 0)
      + (map.reference >= 0 ? 1 : 0);
    return Math.max(best, score);
  }, 0);
}

function detectStatementLayout(matrix = []) {
  let best = null;
  matrix.slice(0, 30).forEach((row, index) => {
    const map = statementHeaderMap(row);
    const score = (map.date >= 0 ? 4 : 0)
      + (map.debit >= 0 ? 2 : 0)
      + (map.credit >= 0 ? 2 : 0)
      + (map.amount >= 0 ? 2 : 0)
      + (map.description >= 0 ? 1 : 0)
      + (map.reference >= 0 ? 1 : 0);
    if (!best || score > best.score) best = { index, map, score };
  });
  if (!best || best.map.date < 0 || (best.map.debit < 0 && best.map.credit < 0 && best.map.amount < 0)) {
    throw new Error("Could not identify the Date and Debit/Credit columns in this statement");
  }
  return best;
}

function parseBankStatementTransactions(matrix, context) {
  const layout = detectStatementLayout(matrix);
  const batchId = uid();
  const occurrence = new Map();
  return matrix.slice(layout.index + 1).flatMap(row => {
    const date = parseStatementDate(row[layout.map.date]);
    if (!date) return [];
    let debit = layout.map.debit >= 0 ? Math.abs(parseStatementNumber(row[layout.map.debit])) : 0;
    let credit = layout.map.credit >= 0 ? Math.abs(parseStatementNumber(row[layout.map.credit])) : 0;
    if (!debit && !credit && layout.map.amount >= 0) {
      const rawAmount = row[layout.map.amount];
      const amount = parseStatementNumber(rawAmount);
      const typeIndicator = String(layout.map.type >= 0 ? row[layout.map.type] : "").trim().toUpperCase();
      const indicator = `${typeIndicator} ${rawAmount} ${layout.map.description >= 0 ? row[layout.map.description] : ""}`.toUpperCase();
      if (/^(D|DR|DEBIT)$/.test(typeIndicator) || /\bDR\b|DEBIT|WITHDRAW/.test(indicator) || amount < 0) debit = Math.abs(amount);
      else if (/^(C|CR|CREDIT)$/.test(typeIndicator) || /\bCR\b|CREDIT|DEPOSIT|REFUND|REVERSAL/.test(indicator)) credit = Math.abs(amount);
      else if (context.sourceType === "Credit Card" && amount > 0) debit = Math.abs(amount);
      else if (amount > 0) credit = Math.abs(amount);
    }
    if (!debit && !credit) return [];
    const description = String(layout.map.description >= 0 ? row[layout.map.description] : "").trim();
    const reference = String(layout.map.reference >= 0 ? row[layout.map.reference] : "").trim();
    const balance = layout.map.balance >= 0 ? parseStatementNumber(row[layout.map.balance]) : 0;
    const base = [context.profileId, context.paymentSourceId, date, round2(debit), round2(credit), round2(balance), reference, description]
      .map(value => String(value || "").trim())
      .join("|");
    const baseHash = hashStatementText(base);
    const count = (occurrence.get(baseHash) || 0) + 1;
    occurrence.set(baseHash, count);
    const fingerprint = `${baseHash}:${count}`;
    return [{
      id: `banktx-${fingerprint}`,
      profileId: context.profileId,
      paymentSourceId: context.paymentSourceId,
      date,
      description: description || "Bank transaction",
      reference,
      debit,
      credit,
      balance,
      status: "unmatched",
      fingerprint,
      importBatchId: batchId,
      sourceFile: context.fileName,
      importedAt: new Date().toISOString()
    }];
  });
}

function parseStatementNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const text = String(value ?? "").trim();
  if (!text) return 0;
  const negative = /^\(.*\)$/.test(text) || /^-/.test(text);
  const cleaned = text.replace(/[^0-9.-]/g, "");
  const parsed = Number(cleaned);
  if (!Number.isFinite(parsed)) return 0;
  return negative ? -Math.abs(parsed) : parsed;
}

function parseStatementDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return dateToIso(value);
  if (typeof value === "number" && value > 20000 && value < 80000) {
    const date = new Date(Date.UTC(1899, 11, 30) + Math.round(value * 86400000));
    return date.toISOString().slice(0, 10);
  }
  const text = String(value || "").trim();
  if (!text) return "";
  const iso = text.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (iso) return validIsoDate(`${iso[1]}-${String(iso[2]).padStart(2, "0")}-${String(iso[3]).padStart(2, "0")}`);
  const indian = text.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})/);
  if (indian) {
    const year = indian[3].length === 2 ? `20${indian[3]}` : indian[3];
    return validIsoDate(`${year}-${String(indian[2]).padStart(2, "0")}-${String(indian[1]).padStart(2, "0")}`);
  }
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? "" : dateToIso(parsed);
}

function dateToIso(date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

function validIsoDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return dateToIso(date) === value ? value : "";
}

function hashStatementText(value) {
  let hash = 2166136261;
  for (const character of String(value || "")) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function openReconciliationMatch(transactionId) {
  const transaction = state.bankTransactions.find(row => row.id === transactionId);
  if (!transaction) return;
  reconciliationMatchTransactionId = transactionId;
  const candidates = reconciliationCandidates(transaction, { maximumDays: 90 });
  const selectedKey = transaction.matchEntryType && transaction.matchEntryId
    ? `${transaction.matchEntryType}:${transaction.matchEntryId}`
    : transaction.suggestedEntryType && transaction.suggestedEntryId
      ? `${transaction.suggestedEntryType}:${transaction.suggestedEntryId}`
      : candidates[0]?.key || "";
  $("#reconciliationMatchTransaction").innerHTML = `<span>${escapeHtml(formatInvoiceDate(transaction.date) || transaction.date || "-")}</span><strong>${escapeHtml(transaction.description || "Bank transaction")}</strong><em>${money(reconciliationTransactionAmount(transaction))}</em>`;
  $("#reconciliationBookEntrySelect").innerHTML = candidates.map(entry => `
    <option value="${escapeHtml(entry.key)}" ${entry.key === selectedKey ? "selected" : ""}>${escapeHtml(entry.type === "purchase" ? "Purchase" : "Sale")} ${escapeHtml(entry.number)} · ${escapeHtml(entry.party)} · ${escapeHtml(money(entry.amount))}</option>
  `).join("") || `<option value="">No available book entries</option>`;
  updateReconciliationMatchDifference();
  $("#reconciliationMatchDialog").showModal();
  if (window.lucide) lucide.createIcons();
}

function updateReconciliationMatchDifference() {
  const transaction = state.bankTransactions.find(row => row.id === reconciliationMatchTransactionId);
  const [type, id] = String($("#reconciliationBookEntrySelect")?.value || "").split(":");
  const entry = reconciliationBookEntryByKey(type, id);
  const target = $("#reconciliationMatchDifference");
  if (!target) return;
  if (!transaction || !entry) {
    target.textContent = "Select a book entry";
    return;
  }
  const difference = round2(reconciliationTransactionAmount(transaction) - entry.amount);
  target.textContent = Math.abs(difference) <= 1 ? "Amounts match" : `Amount difference: ${money(difference)}`;
}

async function saveManualReconciliationMatch(event) {
  event.preventDefault();
  const transaction = state.bankTransactions.find(row => row.id === reconciliationMatchTransactionId);
  const [type, id] = String($("#reconciliationBookEntrySelect").value || "").split(":");
  const entry = reconciliationBookEntryByKey(type, id);
  if (!transaction || !entry) return toast("Select a book entry to match");
  applyReconciliationMatch(transaction, entry);
  saveState();
  $("#reconciliationMatchDialog").close();
  renderAll();
  await syncCloudNow(false);
  toast(transaction.status === "difference" ? "Matched with amount difference" : "Entry matched");
}

function acceptReconciliationSuggestion(transactionId) {
  const transaction = state.bankTransactions.find(row => row.id === transactionId);
  const entry = reconciliationBookEntryByKey(transaction?.suggestedEntryType, transaction?.suggestedEntryId);
  if (!transaction || !entry) return;
  applyReconciliationMatch(transaction, entry);
  saveState();
  renderAll();
  toast(transaction.status === "difference" ? "Matched with amount difference" : "Entry matched");
}

function acceptReconciliationDifference(transactionId) {
  const transaction = state.bankTransactions.find(row => row.id === transactionId);
  if (!transaction || transaction.status !== "difference") return;
  transaction.status = "matched";
  transaction.differenceAccepted = true;
  markReconciliationEntityChanged(transaction);
  saveState();
  renderAll();
  toast("Difference accepted");
}

function unmatchReconciliationTransaction(transactionId) {
  const transaction = state.bankTransactions.find(row => row.id === transactionId);
  if (!transaction) return;
  const entry = reconciliationBookEntryByKey(transaction.matchEntryType, transaction.matchEntryId)?.entry;
  if (entry?.reconciledTransactionId === transaction.id) {
    entry.reconciledTransactionId = "";
    markReconciliationEntityChanged(entry);
  }
  transaction.status = "unmatched";
  transaction.matchEntryType = "";
  transaction.matchEntryId = "";
  transaction.matchedAmount = 0;
  transaction.difference = 0;
  transaction.differenceAccepted = false;
  markReconciliationEntityChanged(transaction);
  saveState();
  renderAll();
  toast("Match removed");
}

function ignoreReconciliationTransaction(transactionId) {
  const transaction = state.bankTransactions.find(row => row.id === transactionId);
  if (!transaction) return;
  transaction.status = "ignored";
  transaction.suggestedEntryType = "";
  transaction.suggestedEntryId = "";
  markReconciliationEntityChanged(transaction);
  saveState();
  renderAll();
}

function restoreReconciliationTransaction(transactionId) {
  const transaction = state.bankTransactions.find(row => row.id === transactionId);
  if (!transaction) return;
  transaction.status = "unmatched";
  markReconciliationEntityChanged(transaction);
  autoReconcileTransactions([transaction.id]);
  saveState();
  renderAll();
}

function renderEntries(kind) {
  renderEntryMonthFilter(kind);
  const entries = monthFilteredEntries(kind);
  const allEntries = activeEntries(kind);
  const emptyColspan = kind === "purchase" ? 10 : 9;
  if (kind === "purchase" && maybeSwitchToPurchaseWorkspace()) {
    $("#purchaseRows").innerHTML = emptyRow(emptyColspan, "Loading saved purchases from the correct workspace...");
    return;
  }
  if (kind === "purchase") {
    const visibleIds = new Set(entries.map(entry => entry.id));
    selectedPurchaseIds = new Set([...selectedPurchaseIds].filter(id => visibleIds.has(id)));
  }
  const rows = entries.sort((a, b) => b.date.localeCompare(a.date)).map(entry => {
    const cancelled = isCancelledEntry(entry);
    const statusLabel = cancelled ? "Cancelled" : (entry.status || "-");
    const statusClass = cancelled ? "danger" : (entry.status === "Unpaid" ? "warn" : "");
    const purchaseSelect = kind === "purchase" ? `
      <td>${cancelled ? "" : `<input class="purchase-select" type="checkbox" aria-label="Select ${escapeHtml(entry.number)}" data-purchase-id="${entry.id}" ${selectedPurchaseIds.has(entry.id) ? "checked" : ""}>`}</td>
    ` : "";
    const statusCell = kind === "purchase"
      ? `<td>${cancelled ? `<span class="badge danger">Cancelled</span>` : ewayReviewBadge(entry)}</td>`
      : `<td><span class="badge ${statusClass}">${escapeHtml(statusLabel)}</span></td>`;
    return `
    <tr class="${cancelled ? "cancelled-row" : ""}">
      ${purchaseSelect}
      <td>${entry.date}</td>
      <td>${escapeHtml(entry.number)}${syncStatusBadge(entry)}</td>
      <td>${escapeHtml(profileName(entry.profileId))}</td>
      <td>${escapeHtml(partyName(entry.partyId))}</td>
      ${statusCell}
      <td class="num">${money(entry.taxable)}</td>
      <td class="num">${money(entry.gst)}</td>
      <td class="num">${money(entry.total)}</td>
      <td>
        <div class="row-actions">
          ${kind === "sale" ? `<button class="mini-btn" title="Invoice" onclick="showInvoice('${entry.id}', '${kind}')"><i data-lucide="file-text"></i></button>` : ""}
          ${kind === "sale" && !cancelled ? `<button class="mini-btn" title="Create Credit Note" onclick="openCreditNote(null, '${entry.id}')"><i data-lucide="rotate-ccw"></i></button>` : ""}
          ${kind === "po" ? `<button class="mini-btn" title="Purchase Order" onclick="showInvoice('${entry.id}', '${kind}')"><i data-lucide="file-text"></i></button>` : ""}
          ${cancelled ? "" : `<button class="mini-btn" title="Edit" onclick="openEntry('${kind}', '${entry.id}')"><i data-lucide="pencil"></i></button>`}
          ${kind === "sale"
            ? (cancelled ? "" : `<button class="mini-btn danger-btn" title="Cancel Bill" onclick="cancelEntry('${kind}', '${entry.id}')"><i data-lucide="ban"></i></button>`)
            : `<button class="mini-btn" title="Delete" onclick="deleteEntry('${kind}', '${entry.id}')"><i data-lucide="trash-2"></i></button>`}
        </div>
      </td>
    </tr>
  `;
  }).join("");
  const emptyLabel = emptyEntriesLabel(kind, allEntries.length);
  const filterNote = entryMonthFilterNote(kind, entries.length, allEntries.length, emptyColspan);
  const target = kind === "sale" ? "#salesRows" : kind === "purchase" ? "#purchaseRows" : "#poRows";
  $(target).innerHTML = (rows || emptyRow(emptyColspan, emptyLabel)) + filterNote;
  if (kind === "purchase") bindPurchaseSelectors();
}

function renderCreditNotes() {
  const allCreditDocuments = [...activeEntries("creditNote"), ...activeEntries("purchaseReturn")];
  const months = [...new Set(allCreditDocuments.map(entryMonthKey).filter(Boolean))].sort((a, b) => b.localeCompare(a));
  const fallbackMonth = months[0] || currentMonthKey();
  let monthKey = entryMonthFilters.creditNote || fallbackMonth;
  if (isMobileDeviceView() && monthKey === ALL_MONTHS_KEY) monthKey = fallbackMonth;
  const options = isMobileDeviceView()
    ? [...new Set([monthKey, ...months, currentMonthKey()])]
    : [...new Set([ALL_MONTHS_KEY, monthKey, currentMonthKey(), ...months])];
  $("#creditNoteMonthFilter").innerHTML = options
    .sort((a, b) => a === ALL_MONTHS_KEY ? -1 : b === ALL_MONTHS_KEY ? 1 : b.localeCompare(a))
    .map(value => `<option value="${escapeHtml(value)}" ${value === monthKey ? "selected" : ""}>${escapeHtml(monthLabel(value))}</option>`)
    .join("");
  entryMonthFilters.creditNote = monthKey;
  entryMonthFilters.purchaseReturn = monthKey;
  const notes = activeEntries("creditNote")
    .filter(entry => monthKey === ALL_MONTHS_KEY || entryMonthKey(entry) === monthKey)
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  const returns = activeEntries("purchaseReturn")
    .filter(entry => monthKey === ALL_MONTHS_KEY || entryMonthKey(entry) === monthKey)
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  const selectedLabel = monthLabel(monthKey);
  const noteRows = notes.map(entry => {
    const cancelled = isCancelledEntry(entry);
    return `<tr class="${cancelled ? "cancelled-row" : ""}">
      <td>${escapeHtml(entry.date || "")}</td>
      <td>${escapeHtml(entry.number || "")}${syncStatusBadge(entry)}</td>
      <td>${escapeHtml(profileName(entry.profileId))}</td>
      <td>${escapeHtml(partyName(entry.partyId))}</td>
      <td>${escapeHtml(entry.originalInvoiceNumber || "-")}</td>
      <td>${escapeHtml(entry.reason || "-")}</td>
      <td><span class="badge ${cancelled ? "danger" : "ok"}">${cancelled ? "Cancelled" : "Active"}</span></td>
      <td class="num">${money(entry.taxable)}</td>
      <td class="num">${money(entry.gst)}</td>
      <td class="num">${money(entry.total)}</td>
      <td><div class="row-actions">
        <button class="mini-btn" title="Credit Note" onclick="showInvoice('${entry.id}', 'creditNote')"><i data-lucide="file-text"></i></button>
        ${cancelled ? "" : `<button class="mini-btn" title="Edit" onclick="openCreditNote('${entry.id}')"><i data-lucide="pencil"></i></button>`}
        ${cancelled ? "" : `<button class="mini-btn danger-btn" title="Cancel Credit Note" onclick="cancelCreditNote('${entry.id}')"><i data-lucide="ban"></i></button>`}
      </div></td>
    </tr>`;
  }).join("");
  $("#creditNoteRows").innerHTML = noteRows || emptyRow(11, `No credit notes for ${selectedLabel}`);
  const returnRows = returns.map(entry => {
    const cancelled = isCancelledEntry(entry);
    return `<tr class="${cancelled ? "cancelled-row" : ""}">
      <td>${escapeHtml(entry.date || "")}</td>
      <td>${escapeHtml(entry.number || "")}${syncStatusBadge(entry)}</td>
      <td>${escapeHtml(profileName(entry.profileId))}</td>
      <td>${escapeHtml(partyName(entry.partyId))}</td>
      <td>${escapeHtml(entry.originalInvoiceNumber || "-")}</td>
      <td>${escapeHtml(entry.reason || "-")}</td>
      <td><span class="badge ${cancelled ? "danger" : "ok"}">${cancelled ? "Cancelled" : "Active"}</span></td>
      <td class="num">${money(entry.total)}</td>
    </tr>`;
  }).join("");
  $("#purchaseReturnRows").innerHTML = returnRows || emptyRow(8, `No internal purchase returns for ${selectedLabel}`);
  if (window.lucide) lucide.createIcons();
}

function emptyEntriesLabel(kind, activeCount = activeEntries(kind).length) {
  const label = kind === "sale" ? "sales entries" : kind === "purchase" ? "purchase entries" : "purchase orders";
  const selectedMonthLabel = monthLabel(selectedEntryMonth(kind));
  const totalAcrossCompanies = entryList(kind).length;
  if (!activeCount && totalAcrossCompanies > 0) {
    return `No ${label} under ${profileName(activeProfileId())}. ${totalAcrossCompanies} ${label} are saved under other GST companies. Select the correct GST company.`;
  }
  if (kind === "purchase" && !totalAcrossCompanies && cloudWorkspaces.length > 1) {
    const bestWorkspace = bestCloudWorkspace(cloudWorkspaces);
    const bestCounts = cloudWorkspaceCounts(bestWorkspace);
    if (bestWorkspace?.id && bestWorkspace.id !== cloudWorkspace?.id && bestCounts.purchases > 0) {
      const currentName = cloudWorkspace?.name || "this workspace";
      const bestName = bestWorkspace.name && bestWorkspace.name !== currentName
        ? bestWorkspace.name
        : `another ${currentName} workspace`;
      return `No purchases in ${currentName}. ${bestName} has ${bestCounts.purchases} purchases. Loading that workspace...`;
    }
  }
  return kind === "sale"
    ? `No sales entries for ${selectedMonthLabel}`
    : kind === "purchase"
      ? `No purchase entries for ${selectedMonthLabel}`
      : `No purchase orders for ${selectedMonthLabel}`;
}

function entryMonthFilterNote(kind, visibleCount, totalCount, colspan) {
  if (selectedEntryMonth(kind) === ALL_MONTHS_KEY || totalCount <= visibleCount) return "";
  const label = kind === "sale" ? "sales" : kind === "purchase" ? "purchases" : "purchase orders";
  return `<tr class="filter-note-row"><td colspan="${colspan}">Showing ${visibleCount} of ${totalCount} ${label}. Select All months or another month to view older entries.</td></tr>`;
}

function ewayReviewBadge(entry) {
  const messages = ewayReviewMessages(entry);
  if (!messages.length) return `<span class="badge ok">OK</span>`;
  const shortName = ewayReviewShortName(messages);
  return `<span class="badge warn eway-review-badge" title="${escapeHtml(messages.join(" | "))}">${escapeHtml(shortName)}</span>`;
}

function ewayReviewMessages(entry) {
  return buildEwayBill(entry).reviewMessages;
}

function ewayReviewShortName(messages = []) {
  const text = messages.join(" ").toLowerCase();
  const codes = [];
  if (text.includes("vehicle")) codes.push("VEH");
  if (text.includes("distance")) codes.push("DIST");
  if (text.includes("pincode")) codes.push("PIN");
  if (text.includes("gstin")) codes.push("GSTIN");
  if (text.includes("hsn")) codes.push("HSN");
  if (text.includes("quantity") || text.includes("item")) codes.push("ITEM");
  return codes.length ? codes.slice(0, 3).join("/") : "CHECK";
}

function bindPurchaseSelectors() {
  $$(".purchase-select").forEach(input => {
    input.addEventListener("change", event => {
      const id = event.target.dataset.purchaseId;
      if (event.target.checked) selectedPurchaseIds.add(id);
      else selectedPurchaseIds.delete(id);
      updateSelectAllPurchases();
    });
  });
  updateSelectAllPurchases();
}

function updateSelectAllPurchases() {
  const control = $("#selectAllPurchases");
  if (!control) return;
  const ids = monthFilteredEntries("purchase").filter(entry => !isCancelledEntry(entry)).map(entry => entry.id);
  const selectedCount = ids.filter(id => selectedPurchaseIds.has(id)).length;
  control.checked = ids.length > 0 && selectedCount === ids.length;
  control.indeterminate = selectedCount > 0 && selectedCount < ids.length;
}

function toggleAllPurchases(event) {
  selectedPurchaseIds = event.target.checked
    ? new Set(monthFilteredEntries("purchase").filter(entry => !isCancelledEntry(entry)).map(entry => entry.id))
    : new Set();
  renderEntries("purchase");
}

function renderItems() {
  $("#itemRows").innerHTML = state.items.map(item => `
    <tr>
      <td>${escapeHtml(item.name)}${syncStatusBadge(item)}</td>
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
  updatePartyRoleTabs();
  const rows = partyMasterRows();
  $("#partyRows").innerHTML = rows.map(party => `
    <tr>
      <td>${escapeHtml(party.name)}${syncStatusBadge(party)}</td>
      <td>${escapeHtml(normalizePartyType(party.type))}</td>
      <td>${escapeHtml(party.gstin)}</td>
      <td>${escapeHtml(party.address || "-")}</td>
      <td>${renderPartyShipTo(party)}</td>
      <td>${renderPartyContact(party)}</td>
      <td>${escapeHtml(party.place)}</td>
      <td>${escapeHtml(partyAliasList(party).join(", "))}</td>
      <td><div class="row-actions">
        <button class="mini-btn" title="Edit" onclick="openParty('${party.id}')"><i data-lucide="pencil"></i></button>
        <button class="mini-btn" title="Delete" onclick="deleteParty('${party.id}')"><i data-lucide="trash-2"></i></button>
      </div></td>
    </tr>
  `).join("") || emptyRow(9, partyEmptyLabel());
}

function partyMasterRows() {
  return state.parties.filter(party => partyMatchesActiveFilter(party)).sort((a, b) => {
    const typeRank = partyTypeRank(a.type) - partyTypeRank(b.type);
    if (typeRank) return typeRank;
    return String(a.name || "").localeCompare(String(b.name || ""));
  });
}

function partyTypeRank(type) {
  const normalized = normalizePartyType(type);
  if (normalized === "Customer") return 0;
  if (normalized === "Both") return 1;
  return 2;
}

function partyMatchesActiveFilter(party) {
  return partyMatchesRoleFilter(party, activePartyFilter);
}

function partyMatchesRoleFilter(party, filter = "Customer") {
  const type = normalizePartyType(party?.type);
  if (filter === "All") return true;
  if (filter === "Both") return type === "Both";
  return type === filter || type === "Both";
}

function partyFilterCount(filter) {
  return state.parties.filter(party => partyMatchesRoleFilter(party, filter)).length;
}

function updatePartyRoleTabs() {
  $$("[data-party-filter]").forEach(button => {
    button.classList.toggle("active", button.dataset.partyFilter === activePartyFilter);
  });
  const customerCount = $("#partyCustomerCount");
  const supplierCount = $("#partySupplierCount");
  const bothCount = $("#partyBothCount");
  const allCount = $("#partyAllCount");
  if (customerCount) customerCount.textContent = partyFilterCount("Customer");
  if (supplierCount) supplierCount.textContent = partyFilterCount("Supplier");
  if (bothCount) bothCount.textContent = partyFilterCount("Both");
  if (allCount) allCount.textContent = partyFilterCount("All");
  const newPartyLabel = $("#newPartyBtn span");
  if (newPartyLabel) newPartyLabel.textContent = newPartyButtonLabel();
}

function partyEmptyLabel() {
  if (activePartyFilter === "Supplier") return "No suppliers added";
  if (activePartyFilter === "Both") return "No parties marked as both customer and supplier";
  if (activePartyFilter === "All") return "No parties added";
  return "No customers added";
}

function newPartyDialogOptions() {
  const type = activePartyFilter === "Supplier" ? "Supplier" : activePartyFilter === "Both" ? "Both" : "Customer";
  const label = type === "Supplier" ? "Supplier" : type === "Both" ? "Customer / Supplier" : "Customer";
  return {
    type,
    title: `New ${label}`,
    saveLabel: `Save ${label}`
  };
}

function newPartyButtonLabel() {
  if (activePartyFilter === "Supplier") return "New Supplier";
  if (activePartyFilter === "Both") return "New Customer/Supplier";
  if (activePartyFilter === "All") return "New Party";
  return "New Customer";
}

function renderPartyContact(party) {
  const values = [party.phone, party.email].map(value => String(value || "").trim()).filter(Boolean);
  return values.length ? values.map(escapeHtml).join("<br>") : "-";
}

function renderPartyShipTo(party) {
  const addresses = normalizeShippingAddresses(party.shippingAddresses || []);
  if (!addresses.length) return "-";
  return addresses
    .map(address => escapeHtml(address.label || address.name || address.place || "Ship To"))
    .join("<br>");
}

function renderSettings() {
  const form = $("#settingsForm");
  syncSaleNumberingForProfiles(state.settings.profiles, state.sales);
  form.elements.profileId.innerHTML = profileOptions(form.elements.profileId.value || state.settings.activeProfileId);
  const profile = profileById(form.elements.profileId.value);
  ["businessName", "legalName", "gstin", "phone", "email", "address", "state", "nextSaleNo", "nextPurchaseNo", "nextPoNo"].forEach(key => {
    form.elements[key].value = profile?.[key] ?? "";
  });
  form.elements.nextSaleNo.readOnly = Boolean(saleNumberRule(profile?.id));
  form.elements.nextSaleNo.title = saleNumberRule(profile?.id)
    ? "Sales invoice number is locked to the approved company sequence."
    : "";
  form.elements.currency.value = state.settings.currency || "Rs.";
  form.elements.reportEmails.value = state.settings.reportEmails || "";
  form.elements.ewayVehicleNo.value = state.settings.ewayDefaults?.vehicleNo || "";
  form.elements.ewayDistanceKm.value = num(state.settings.ewayDefaults?.distanceKm) || "";
}

function emptyRow(colspan, label) {
  return `<tr><td colspan="${colspan}" class="empty-row">${label}</td></tr>`;
}

function entryPartyTypes(kind) {
  const wanted = kind === "sale" ? ["Customer", "Both"] : ["Supplier", "Both"];
  return wanted;
}

function isSelectedCompanyParty(party = {}) {
  const selectedGstin = normalizeGstin(activeProfile()?.gstin);
  return Boolean(selectedGstin) && normalizeGstin(party.gstin) === selectedGstin;
}

function entryPartyChoices(kind) {
  return state.parties
    .filter(party => (
      entryPartyTypes(kind).includes(normalizePartyType(party.type))
      && !isSelectedCompanyParty(party)
    ))
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
}

function entryPartyOptionLabel(party = {}) {
  return [party.name, normalizeGstin(party.gstin)]
    .filter(Boolean)
    .join(" - ");
}

function entryPartySearchText(party = {}) {
  return normalizeForAlias([
    party.name,
    party.gstin,
    party.place,
    party.address,
    partyAliasList(party).join(" ")
  ].filter(Boolean).join(" "));
}

function partyMatchesEntrySearch(party, query) {
  const normalizedQuery = normalizeForAlias(query);
  if (!normalizedQuery) return true;
  const searchText = entryPartySearchText(party);
  return normalizedQuery.split(" ").every(part => searchText.includes(part));
}

function filteredEntryPartyChoices(kind, query = "") {
  return entryPartyChoices(kind).filter(party => partyMatchesEntrySearch(party, query));
}

function partyOptions(kind, selected = "", query = "") {
  const choices = entryPartyChoices(kind);
  const filteredChoices = filteredEntryPartyChoices(kind, query);
  const label = kind === "sale" ? "buyer" : "supplier";
  const showSelectBuyer = kind === "sale" && !normalizeForAlias(query);
  if (!choices.length) {
    return `<option value="">${kind === "sale" ? "Add buyer first" : "Add supplier first"}</option>`;
  }
  if (!filteredChoices.length) {
    return `<option value="">No ${label} found</option>`;
  }
  const placeholder = showSelectBuyer ? `<option value="" ${selected ? "" : "selected"}>Select buyer</option>` : "";
  const options = filteredChoices
    .map(party => `<option value="${party.id}" ${party.id === selected ? "selected" : ""}>${escapeHtml(entryPartyOptionLabel(party))}</option>`)
    .join("");
  return `${placeholder}${options}`;
}

function paymentSourceById(id) {
  return state.paymentSources.find(source => source.id === id) || null;
}

function activePaymentSources(profileId = activeProfileId(), includeInactiveId = "") {
  return state.paymentSources
    .filter(source => source.profileId === profileId && (source.active || source.id === includeInactiveId))
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
}

function paymentSourceLabel(source = {}) {
  const suffix = source.last4 ? ` •••• ${source.last4}` : "";
  return `${source.name || source.institution || source.type || "Payment Source"}${suffix}`;
}

function paymentSourceOptions(profileId, selected = "", includeAll = false) {
  const sources = activePaymentSources(profileId, selected);
  const allOption = includeAll ? `<option value="all">All accounts</option>` : `<option value="">Not selected</option>`;
  return allOption + sources.map(source => `
    <option value="${escapeHtml(source.id)}" ${source.id === selected ? "selected" : ""}>${escapeHtml(paymentSourceLabel(source))}</option>
  `).join("");
}

function setupEntryPaymentPanel(kind, source = null) {
  const form = $("#entryForm");
  if (!form) return;
  const visible = kind === "sale" || kind === "purchase";
  ["#entryPaymentSourceLabel", "#entryPaymentDateLabel", "#entryPaymentReferenceLabel"].forEach(selector => {
    const element = $(selector);
    if (element) element.hidden = !visible;
  });
  if (!visible) return;
  const profileId = source?.profileId || state.settings.activeProfileId;
  $("#entryPaymentSourceText").textContent = kind === "sale" ? "Received In" : "Paid Through";
  form.elements.paymentSourceId.innerHTML = paymentSourceOptions(profileId, source?.paymentSourceId || "");
  form.elements.paymentSourceId.value = source?.paymentSourceId || "";
  form.elements.paymentDate.value = source?.paymentDate || "";
  form.elements.paymentReference.value = source?.paymentReference || "";
  form.elements.paymentSourceId.onchange = () => {
    if (form.elements.paymentSourceId.value && !form.elements.paymentDate.value) {
      form.elements.paymentDate.value = form.elements.date.value || today();
    }
  };
}

function setupEntryPartySearch(kind, selectedId = "") {
  const search = $("#entryPartySearch");
  const hint = $("#entryPartySearchHint");
  if (!search) return;
  const isSale = kind === "sale";
  search.hidden = !isSale;
  if (hint) {
    hint.hidden = true;
    hint.textContent = "";
  }
  if (!isSale) {
    search.value = "";
    return;
  }
  const selectedParty = partyById(selectedId);
  search.value = selectedParty ? entryPartyOptionLabel(selectedParty) : "";
}

function updateEntryPartySearchHint(matchCount, query) {
  const hint = $("#entryPartySearchHint");
  if (!hint) return;
  if (!normalizeForAlias(query)) {
    hint.hidden = true;
    hint.textContent = "";
    return;
  }
  hint.hidden = false;
  hint.textContent = matchCount
    ? `${matchCount} buyer${matchCount === 1 ? "" : "s"} found`
    : "No buyer found. Add it as a new buyer.";
}

function syncEntryPartySearchValue() {
  if (entryMode !== "sale") return;
  const search = $("#entryPartySearch");
  const hint = $("#entryPartySearchHint");
  const form = $("#entryForm");
  if (!search || !form) return;
  const party = partyById(form.elements.partyId.value);
  search.value = party ? entryPartyOptionLabel(party) : "";
  if (hint) {
    hint.hidden = true;
    hint.textContent = "";
  }
}

function handleEntryPartySearchInput(event) {
  if (entryMode !== "sale") return;
  const form = $("#entryForm");
  const query = event.target.value;
  const matches = filteredEntryPartyChoices("sale", query);
  const selectedId = normalizeForAlias(query) ? matches[0]?.id || "" : "";
  form.elements.partyId.innerHTML = partyOptions("sale", selectedId, query);
  form.elements.partyId.value = selectedId;
  updateEntryPartySearchHint(matches.length, query);
  updateSalesAddressPanel();
  updateEntryTotals();
}

function handleEntryPartySearchKeydown(event) {
  if (event.key !== "Enter" || entryMode !== "sale") return;
  event.preventDefault();
  syncEntryPartySearchValue();
  updateSalesAddressPanel();
  updateEntryTotals();
}

function itemOptions(selected = "", fallbackName = "") {
  if (!state.items.length) return `<option value="">Add item first</option>`;
  const hasSelected = state.items.some(item => item.id === selected);
  const fallbackOption = selected && !hasSelected
    ? `<option value="${escapeHtml(selected)}" selected>${escapeHtml(fallbackName || "Saved Item")}</option>`
    : "";
  return `${fallbackOption}${state.items.map(item => `<option value="${item.id}" ${item.id === selected ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}`;
}

function openEntry(kind, id = null, draft = null) {
  entryMode = kind;
  editingEntryId = id;
  const entry = id ? entryList(kind).find(row => row.id === id) : null;
  const source = entry || draft;
  const isSale = kind === "sale";
  const isPurchase = kind === "purchase";
  const isPo = kind === "po";
  entryDraftMeta = {
    attachments: clone(source?.attachments || []),
    reviewStatus: source?.reviewStatus || "Ready",
    reviewMessages: clone(source?.reviewMessages || []),
    source: source?.source || (draft ? "imported" : "manual"),
    extractedTaxes: clone(source?.extractedTaxes || null),
    ewayDetails: normalizePurchaseEwayDetails(source?.ewayDetails || {}),
    sellerGstin: source?.sellerGstin || "",
    buyerGstin: source?.buyerGstin || "",
    roundOff: num(source?.roundOff),
    purchaseReviewAccepted: Boolean(id && kind === "purchase"),
    purchaseReviewSignature: "",
    preserveInitialReviewAcceptance: Boolean(id && kind === "purchase")
  };
  const form = $("#entryForm");
  form.reset();
  $("#entryKindLabel").textContent = isSale ? "Sales Bill" : isPo ? "Purchase Order" : "Purchase Entry";
  $("#entryDialogTitle").textContent = id
    ? (isPo ? "Edit Purchase Order" : isPurchase ? "Edit Purchase" : "Edit Entry")
    : (isPo ? "New Purchase Order" : isSale ? "New Sales Invoice" : "Purchase Review");
  $("#entryDialog").classList.toggle("sale-entry-dialog", isSale);
  $("#entryDialog").classList.toggle("purchase-entry-dialog", isPurchase);
  $("#entryDialog").classList.toggle("po-entry-dialog", isPo);
  $("#entryMetaLabel").textContent = isSale ? "Invoice Details" : isPo ? "PO Details" : "Editable Details";
  $("#entryMetaTitle").textContent = isSale ? "Check the basic details" : isPo ? "Select supplier and required items" : "Correct supplier, buyer GST, invoice number and date";
  $("#entryProfileLabelText").textContent = isSale ? "Business GST" : "Buyer GST";
  $("#lineEditorTitle").textContent = isSale ? "Items" : isPo ? "Items for PO" : "Items from invoice";
  $("#lineEditorHint").textContent = isSale ? "" : isPo ? "Items in this PO do not change stock until purchase entry is made." : "Edit item, quantity, rate per quantity, GST or IMEI before saving.";
  $("#saveEntryBtn span").textContent = isSale ? "Save Entry" : isPo ? "Save PO" : "Save Purchase";
  form.elements.date.value = source?.date || today();
  form.elements.date.oninput = updateEntryTotals;
  form.elements.number.value = isSale
    ? saleInvoiceNumberForDialog(source, source?.profileId || state.settings.activeProfileId)
    : (source?.number || nextEntryNumber(kind, source?.profileId || state.settings.activeProfileId));
  form.elements.number.readOnly = isSale;
  form.elements.number.oninput = updateEntryTotals;
  form.elements.profileId.innerHTML = profileOptions(source?.profileId || state.settings.activeProfileId);
  form.elements.profileId.disabled = true;
  form.elements.profileId.onchange = () => {
    if (!editingEntryId) form.elements.number.value = nextEntryNumber(kind, form.elements.profileId.value);
    updateEntryTotals();
  };
  form.elements.status.innerHTML = isPo
    ? "<option>Draft</option><option>Sent</option><option>Closed</option><option>Cancelled</option>"
    : "<option>Paid</option><option>Unpaid</option><option>Partial</option>";
  form.elements.status.value = source?.status || (isPo ? "Draft" : "Paid");
  $("#entryStatusLabel").hidden = !isPo;
  setupEntryPaymentPanel(kind, source);
  $("#entryNotesLabel")?.setAttribute("hidden", "");
  if (form.elements.notes) form.elements.notes.value = isSale ? "" : (source?.notes || "");
  $("#entryPartyLabelText").textContent = isSale ? "Buyer" : "Supplier";
  $("#entryAddBuyerBtn").hidden = !isSale;
  form.elements.partyId.innerHTML = partyOptions(kind, source?.partyId);
  form.elements.partyId.value = source?.partyId || (isSale ? "" : form.elements.partyId.value);
  setupEntryPartySearch(kind, form.elements.partyId.value);
  form.elements.partyId.onchange = () => {
    syncEntryPartySearchValue();
    updateSalesAddressPanel();
    updatePurchaseEwayPanel();
    updateEntryTotals();
  };
  setupSalesAddressPanel(kind, source);
  setupPurchaseEwayPanel(kind, source);
  $("#purchaseReviewPanel").innerHTML = "";
  $("#lineRows").innerHTML = "";
  (source?.lines?.length ? source.lines : [blankLine(kind)]).forEach(line => addLineRow(line));
  updateEntryTotals();
  $("#entryDialog").showModal();
  if (window.lucide) lucide.createIcons();
}

function closeDialog(dialogId) {
  const dialog = $(`#${dialogId}`);
  if (dialog?.open) dialog.close();
  if (dialogId === "partyDialog") {
    partyDialogContext = null;
    partyAliasDraft = [];
  }
}

function setupSalesAddressPanel(kind, source = null) {
  const panel = $("#salesAddressPanel");
  const form = $("#entryForm");
  if (!panel || !form) return;
  const isSale = kind === "sale";
  panel.hidden = !isSale;
  if (!isSale) return;
  const party = partyById(form.elements.partyId.value) || {};
  const billTo = normalizeAddressSnapshot(source?.billToSnapshot || partyAddressSnapshot(party));
  const shipTo = normalizeAddressSnapshot(source?.shipToSnapshot || billTo);
  const same = source?.shipToSameAsBillTo ?? sameAddressSnapshot(billTo, shipTo);
  form.elements.shipToSame.checked = same;
  form.elements.shipToAddressId.innerHTML = shipToAddressOptions(party, source?.shipToAddressId || "", shipTo, same);
  const useCustom = !same && form.elements.shipToAddressId.value === "custom";
  form.elements.shipToName.value = useCustom ? shipTo.name : "";
  form.elements.shipToGstin.value = useCustom ? shipTo.gstin : "";
  form.elements.shipToPlace.value = useCustom ? (shipTo.place || shipTo.state || "") : "";
  form.elements.shipToAddress.value = useCustom ? shipTo.address : "";
  form.elements.saveShipTo.checked = false;
  updateSalesAddressPanel();
}

function setupPurchaseEwayPanel(kind, source = null) {
  const panel = $("#purchaseEwayPanel");
  const form = $("#entryForm");
  if (!panel || !form) return;
  const isPurchase = kind === "purchase";
  panel.hidden = !isPurchase;
  if (!isPurchase) return;
  const details = normalizePurchaseEwayDetails(source?.ewayDetails || {});
  const supplier = partyById(source?.partyId) || {};
  const supplierDefaultAddress = purchaseSupplierAddressForEway(details, supplier);
  const supplierDefaultPincode = normalizePincode(details.fromPincode)
    || normalizePincode(extractPreferredPincode(supplierDefaultAddress));
  form.elements.ewayTransType.value = details.transType || "1";
  form.elements.ewayTransMode.value = details.transMode || "1";
  form.elements.ewayVehicleNoEntry.value = details.vehicleNo || "";
  form.elements.ewaySupplierPincodeEntry.value = supplierDefaultPincode || "";
  form.elements.ewayDestinationPreset.innerHTML = ewayDestinationPresetOptions(details.destinationPreset);
  form.elements.ewayDestinationPreset.value = details.destinationPreset || (details.shipToAddress ? "custom" : "buyer");
  form.elements.ewayDispatchFromAddress.value = supplierDefaultAddress || "";
  form.elements.ewayShipToAddress.value = details.shipToAddress || "";
  form.elements.ewayDistanceKmEntry.value = details.distanceKm || "";
  form.elements.ewayDistanceKmEntry.dataset.distanceSource = details.distanceSource || (details.distanceKm ? "saved" : "");
  form.elements.ewayTransporterName.value = details.transporterName || "";
  form.elements.ewayTransporterId.value = details.transporterId || "";
  form.elements.ewayTransDocNo.value = details.transDocNo || "";
  form.elements.ewayTransDocDate.value = details.transDocDate || "";
  form.elements.ewayDistanceKmEntry.dataset.autoRouteKey = "";
  form.elements.ewayDistanceConfirmed.checked = Boolean(details.distanceConfirmed);
  $("#ewayDistanceConfirmRow").hidden = !(details.distanceSource === "local-estimate" && !details.distanceConfirmed);
  ["ewayTransType", "ewayTransMode", "ewayVehicleNoEntry", "ewaySupplierPincodeEntry", "ewayDestinationPreset", "ewayDispatchFromAddress", "ewayShipToAddress", "ewayTransporterName", "ewayTransporterId", "ewayTransDocNo", "ewayTransDocDate"].forEach(name => {
    form.elements[name].oninput = updatePurchaseEwayPanel;
    form.elements[name].onchange = updatePurchaseEwayPanel;
  });
  form.elements.ewayDistanceKmEntry.oninput = () => {
    form.elements.ewayDistanceKmEntry.dataset.autoRouteKey = "";
    form.elements.ewayDistanceKmEntry.dataset.distanceSource = num(form.elements.ewayDistanceKmEntry.value) ? "manual-confirmed" : "";
    form.elements.ewayDistanceConfirmed.checked = Boolean(num(form.elements.ewayDistanceKmEntry.value));
    $("#ewayDistanceConfirmRow").hidden = true;
    updatePurchaseEwayPanel();
  };
  form.elements.ewayDistanceKmEntry.onchange = updatePurchaseEwayPanel;
  form.elements.ewayDistanceConfirmed.onchange = () => {
    if (form.elements.ewayDistanceConfirmed.checked) {
      form.elements.ewayDistanceKmEntry.dataset.distanceSource = "manual-confirmed";
      $("#ewayDistanceConfirmRow").hidden = true;
    }
    updatePurchaseEwayPanel();
  };
  updatePurchaseEwayPanel();
}

function updatePurchaseEwayPanel() {
  if (entryMode !== "purchase") return;
  const panel = $("#purchaseEwayPanel");
  const form = $("#entryForm");
  if (!panel || panel.hidden || !form) return;
  const profile = profileById(form.elements.profileId.value);
  const supplier = partyById(form.elements.partyId.value) || {};
  const transType = form.elements.ewayTransType.value || "1";
  const route = purchaseEwayRouteFromValues(profile, supplier, {
    transType,
    fromPincode: form.elements.ewaySupplierPincodeEntry.value,
    destinationPreset: form.elements.ewayDestinationPreset.value,
    dispatchFromAddress: form.elements.ewayDispatchFromAddress.value,
    shipToAddress: form.elements.ewayShipToAddress.value
  });
  $("#ewayDestinationPresetLabel").hidden = !ewayUsesShipTo(transType);
  $("#ewayDispatchFromLabel").hidden = !ewayUsesDispatchFrom(transType);
  $("#ewayShipToLabel").hidden = !ewayUsesShipTo(transType) || form.elements.ewayDestinationPreset.value !== "custom";
  if (!form.elements.ewayDispatchFromAddress.value.trim() && route.defaultFromAddress) {
    form.elements.ewayDispatchFromAddress.value = route.defaultFromAddress;
  }
  if (ewayUsesShipTo(transType) && form.elements.ewayDestinationPreset.value === "custom" && !form.elements.ewayShipToAddress.value.trim()) {
    form.elements.ewayShipToAddress.value = route.defaultToAddress;
  }
  const refreshedRoute = purchaseEwayRouteFromValues(profile, supplier, {
    transType,
    fromPincode: form.elements.ewaySupplierPincodeEntry.value,
    destinationPreset: form.elements.ewayDestinationPreset.value,
    dispatchFromAddress: form.elements.ewayDispatchFromAddress.value,
    shipToAddress: form.elements.ewayShipToAddress.value
  });
  applyEwayDistanceSuggestion(refreshedRoute, form);
  $("#ewaySupplierPincodeLabel").hidden = Boolean(refreshedRoute.defaultFromPincode) && !form.elements.ewaySupplierPincodeEntry.value.trim();
  $("#ewayBillToPreview").hidden = !ewayUsesShipTo(transType);
  $("#ewayFromPreview").innerHTML = ewayAddressPreview(ewayUsesDispatchFrom(transType) ? "Dispatch From" : "From", refreshedRoute.fromName, refreshedRoute.fromAddress, refreshedRoute.fromPincode);
  $("#ewayBillToPreview").innerHTML = ewayAddressPreview("Bill To", refreshedRoute.billToName, refreshedRoute.billToAddress, refreshedRoute.billToPincode);
  $("#ewayToPreview").innerHTML = ewayAddressPreview(ewayUsesShipTo(transType) ? "Ship To" : "To", refreshedRoute.toName, refreshedRoute.toAddress, refreshedRoute.toPincode);
  $("#ewayDistanceHint").textContent = ewayDistanceHint(
    refreshedRoute,
    form.elements.ewayDistanceKmEntry.value,
    form.elements.ewayDistanceKmEntry.dataset.distanceSource,
    form.elements.ewayDistanceConfirmed.checked
  );
  updatePurchaseEwayRequiredHighlights(refreshedRoute, form);
}

function applyEwayDistanceSuggestion(route, form) {
  const distanceInput = form.elements.ewayDistanceKmEntry;
  const routeKey = ewayDistanceEstimateRouteKey(route);
  const fixedRouteDistance = fixedEwayRouteDistance(route.fromPincode, route.toPincode);
  if (fixedRouteDistance && num(distanceInput.value) !== fixedRouteDistance) {
    clearTimeout(ewayDistanceEstimateTimer);
    setEwayDistanceValue(form, fixedRouteDistance, routeKey, "configured-route");
    return;
  }
  if (num(distanceInput.value) && distanceInput.dataset.autoRouteKey && distanceInput.dataset.autoRouteKey !== routeKey) {
    distanceInput.value = "";
    distanceInput.dataset.autoRouteKey = "";
    distanceInput.dataset.distanceSource = "";
    form.elements.ewayDistanceConfirmed.checked = false;
    $("#ewayDistanceConfirmRow").hidden = true;
  }
  if (num(distanceInput.value)) {
    clearTimeout(ewayDistanceEstimateTimer);
    return;
  }
  const samePinDistance = samePincodeDistanceKm(route);
  if (samePinDistance) {
    clearTimeout(ewayDistanceEstimateTimer);
    setEwayDistanceValue(form, samePinDistance, routeKey, "same-pincode");
    return;
  }
  scheduleEwayDistanceEstimate(route);
}

function setEwayDistanceValue(form, distanceKm, autoRouteKey, source, needsConfirmation = false) {
  const distanceInput = form.elements.ewayDistanceKmEntry;
  distanceInput.value = Math.max(1, Math.round(num(distanceKm)));
  distanceInput.dataset.autoRouteKey = autoRouteKey || "";
  distanceInput.dataset.distanceSource = source || "";
  form.elements.ewayDistanceConfirmed.checked = !needsConfirmation;
  $("#ewayDistanceConfirmRow").hidden = !needsConfirmation;
  if (needsConfirmation) {
    $("#ewayDistanceConfirmText").textContent = `Confirm the estimated ${distanceInput.value} KM or enter the correct distance`;
  }
}

function samePincodeDistanceKm(route) {
  return route.fromPincode && route.toPincode && String(route.fromPincode) === String(route.toPincode) ? 2 : 0;
}

function calculateEwayDistance(fromPincode, toPincode) {
  const fromPin = Number(String(fromPincode || "").replace(/\D/g, ""));
  const toPin = Number(String(toPincode || "").replace(/\D/g, ""));
  if (!fromPin || !toPin) return 0;
  if (fromPin === toPin) return 2;
  const special = fixedEwayRouteDistance(fromPin, toPin);
  if (special) return special;
  const coordA = EWAY_PINCODE_COORDS[fromPin];
  const coordB = EWAY_PINCODE_COORDS[toPin];
  if (coordA && coordB) return Math.round(haversineKm(coordA, coordB) * 1.18);
  return estimateDistanceFromPinCodes(fromPin, toPin);
}

function fixedEwayRouteDistance(fromPincode, toPincode) {
  const fromPin = Number(String(fromPincode || "").replace(/\D/g, ""));
  const toPin = Number(String(toPincode || "").replace(/\D/g, ""));
  return EWAY_SPECIAL_DISTANCE_KM[`${fromPin}-${toPin}`] || 0;
}

function haversineKm(a, b) {
  const [lat1Raw, lon1Raw] = a;
  const [lat2Raw, lon2Raw] = b;
  const lat1 = radians(lat1Raw);
  const lat2 = radians(lat2Raw);
  const dlat = radians(lat2Raw - lat1Raw);
  const dlon = radians(lon2Raw - lon1Raw);
  const hav = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(hav));
}

function radians(value) {
  return value * Math.PI / 180;
}

function estimateDistanceFromPinCodes(fromPin, toPin) {
  const fromPrefix = Math.floor(fromPin / 1000);
  const toPrefix = Math.floor(toPin / 1000);
  if (fromPrefix === toPrefix) {
    const digitGap = Math.abs(fromPin - toPin);
    return Math.max(5, Math.round(digitGap / 18) + 4);
  }
  const prefixGap = Math.abs(fromPrefix - toPrefix);
  const digitGap = Math.abs(fromPin - toPin);
  return Math.max(2, prefixGap * 45 + Math.round(digitGap / 12000));
}

function ewayUsesShipTo(transType) {
  return transType === "2" || transType === "4";
}

function ewayUsesDispatchFrom(transType) {
  return transType === "3" || transType === "4";
}

function ewayDestinationPresetOptions(selected = "buyer") {
  const options = [
    `<option value="buyer" ${selected === "buyer" ? "selected" : ""}>Buyer billing address</option>`,
    ...EWAY_ADDRESS_PRESETS.map(preset => `<option value="${escapeHtml(preset.id)}" ${selected === preset.id ? "selected" : ""}>${escapeHtml(preset.label)}</option>`),
    `<option value="custom" ${selected === "custom" ? "selected" : ""}>Custom Ship To address</option>`
  ];
  return options.join("");
}

function ewayPresetById(id) {
  return EWAY_ADDRESS_PRESETS.find(preset => preset.id === id) || null;
}

function purchaseSupplierAddressForEway(details = {}, supplier = {}) {
  const address = String(details.dispatchFromAddress || supplier.address || supplier.place || "").trim();
  const pincode = normalizePincode(details.fromPincode) || normalizePincode(extractPreferredPincode(address));
  return addressWithUpdatedPincode(address, pincode);
}

function purchaseEwayRouteFromValues(profile = {}, supplier = {}, details = {}) {
  const transType = String(details.transType || "1");
  const destinationPreset = String(details.destinationPreset || "buyer");
  const selectedPreset = ewayUsesShipTo(transType) ? ewayPresetById(destinationPreset) : null;
  const defaultFromAddress = purchaseSupplierAddressForEway(details, supplier);
  const defaultToAddress = profile.address || profile.state || "";
  const billToAddress = defaultToAddress;
  const fromAddress = ewayUsesDispatchFrom(transType)
    ? (String(details.dispatchFromAddress || "").trim() || defaultFromAddress)
    : defaultFromAddress;
  const toAddress = ewayUsesShipTo(transType)
    ? selectedPreset
      ? ewayPresetAddressText(selectedPreset)
      : destinationPreset === "custom"
        ? (String(details.shipToAddress || "").trim() || defaultToAddress)
        : defaultToAddress
    : defaultToAddress;
  const defaultFromPincode = extractPreferredPincode(fromAddress);
  const fromPincode = normalizePincode(details.fromPincode) || defaultFromPincode;
  const billToPincode = extractPreferredPincode(billToAddress);
  const toPincode = selectedPreset ? String(selectedPreset.toPincode) : extractPreferredPincode(toAddress);
  const routeKey = ewayRouteKey(fromPincode, toPincode);
  return {
    defaultFromAddress,
    defaultToAddress,
    destinationPreset: selectedPreset?.id || destinationPreset,
    destinationPresetData: selectedPreset,
    fromName: supplier.name || "Supplier",
    billToName: profile.businessName || profile.label || "Buyer GST",
    billToAddress,
    billToPincode,
    toName: selectedPreset?.label || (ewayUsesShipTo(transType) ? "Delivery Address" : (profile.businessName || profile.label || "Buyer GST")),
    fromAddress,
    toAddress,
    defaultFromPincode,
    fromPincode,
    toPincode,
    routeKey,
    savedDistance: savedEwayRouteDistance(routeKey)
  };
}

function ewayPresetAddressText(preset = {}) {
  return [preset.toAddr1, preset.toAddr2, preset.toPlace, preset.toPincode].filter(Boolean).join(", ");
}

function ewayRouteKey(fromPincode, toPincode) {
  const fromPin = normalizePincode(fromPincode);
  const toPin = normalizePincode(toPincode);
  return fromPin && toPin ? [fromPin, toPin].sort().join("-") : "";
}

function savedEwayRouteDistance(routeKey) {
  if (!routeKey) return 0;
  const normalizedKey = normalizeEwayRouteKey(routeKey);
  const [fromPin, toPin] = String(routeKey).split("-");
  return num(state.settings.ewayRouteDistances?.[normalizedKey])
    || num(state.settings.ewayRouteDistances?.[`${fromPin}-${toPin}`])
    || num(state.settings.ewayRouteDistances?.[`${toPin}-${fromPin}`]);
}

function normalizeEwayRouteKey(routeKey) {
  const pins = String(routeKey || "").match(/^(\d{6})-(\d{6})$/);
  return pins ? ewayRouteKey(pins[1], pins[2]) : "";
}

function ewayAddressPreview(title, name, address, pincode) {
  return `<span>${escapeHtml(title)}</span>
    <strong>${escapeHtml(name || "-")}</strong>
    <p>${escapeHtml(address || "-")}</p>
    <small>PIN: ${escapeHtml(pincode || "-")}</small>`;
}

function ewayDistanceHint(route, currentDistance, source = "", confirmed = true) {
  if (samePincodeDistanceKm(route) && num(currentDistance) === 2) return "Same seller and buyer PIN, distance set to 2 KM.";
  if (source === "local-estimate" && !confirmed) return `Estimated ${Math.round(num(currentDistance))} KM. Confirm or correct it before saving.`;
  if (source === "shared-cache") return `Shared saved distance ${Math.round(num(currentDistance))} KM.`;
  if (source === "google-routes") return `Google Routes calculated ${Math.round(num(currentDistance))} KM and saved it for future invoices.`;
  if (source === "manual-confirmed") return `Confirmed distance ${Math.round(num(currentDistance))} KM.`;
  if (num(currentDistance)) return route.routeKey ? `Distance saved for route ${route.routeKey}.` : "Distance entered.";
  if (ewayDistanceEstimateKey === ewayDistanceEstimateRouteKey(route)) return "Checking the shared distance cache...";
  if (route.savedDistance) return `Previously saved route distance ${route.savedDistance} KM.`;
  if (!route.fromPincode || !route.toPincode) return "Add supplier and buyer pincodes to remember route distance.";
  return "Google Maps will calculate distance when Cloud is connected.";
}

function ewayDistanceEstimateRouteKey(route = {}) {
  return [
    route.fromPincode || "",
    route.toPincode || "",
    route.fromAddress || "",
    route.toAddress || ""
  ].join("|");
}

function scheduleEwayDistanceEstimate(route) {
  const key = ewayDistanceEstimateRouteKey(route);
  if (!route.fromPincode || !route.toPincode || !key.replace(/\|/g, "").trim()) return;
  ewayDistanceEstimateKey = key;
  clearTimeout(ewayDistanceEstimateTimer);
  ewayDistanceEstimateTimer = setTimeout(() => estimateEwayDistanceWithCloud(route, key), 700);
}

async function estimateEwayDistanceWithCloud(route, key) {
  const form = $("#entryForm");
  if (!form || entryMode !== "purchase" || num(form.elements.ewayDistanceKmEntry.value)) return;
  if (!cloudConfigured() || !cloudClient || !cloudSession) {
    applyLocalEwayDistanceFallback(route, key, "Cloud is unavailable");
    return;
  }
  try {
    const { data, error } = await cloudClient.functions.invoke(EWAY_DISTANCE_FUNCTION, {
      body: {
        fromAddress: route.fromAddress,
        toAddress: route.toAddress,
        fromPincode: route.fromPincode,
        toPincode: route.toPincode
      }
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    if (data?.fallbackRequired) {
      applyLocalEwayDistanceFallback(route, key, data.reason || "Google Routes is unavailable");
      return;
    }
    const distanceKm = Math.max(1, Math.round(num(data?.distanceKm)));
    if (!distanceKm || ewayDistanceEstimateKey !== key) return;
    const profile = profileById(form.elements.profileId.value);
    const supplier = partyById(form.elements.partyId.value) || {};
    const currentRoute = purchaseEwayRouteFromValues(profile, supplier, {
      transType: form.elements.ewayTransType.value || "1",
      fromPincode: form.elements.ewaySupplierPincodeEntry.value,
      destinationPreset: form.elements.ewayDestinationPreset.value,
      dispatchFromAddress: form.elements.ewayDispatchFromAddress.value,
      shipToAddress: form.elements.ewayShipToAddress.value
    });
    if (ewayDistanceEstimateRouteKey(currentRoute) !== key || num(form.elements.ewayDistanceKmEntry.value)) return;
    const distanceSource = data?.source === "shared-cache" ? "shared-cache" : data?.source || "google-routes";
    setEwayDistanceValue(form, distanceKm, key, distanceSource);
    $("#ewayDistanceHint").textContent = data?.source === "shared-cache"
      ? `Shared saved distance ${distanceKm} KM.`
      : `Google Routes calculated ${distanceKm} KM and saved it for future invoices.`;
  } catch (error) {
    const message = await ewayDistanceCloudErrorMessage(error);
    applyLocalEwayDistanceFallback(route, key, message);
    console.warn("E-way distance estimate unavailable", error);
  }
}

function applyLocalEwayDistanceFallback(route, key, reason) {
  const form = $("#entryForm");
  if (!form || entryMode !== "purchase" || ewayDistanceEstimateKey !== key || num(form.elements.ewayDistanceKmEntry.value)) return;
  const profile = profileById(form.elements.profileId.value);
  const supplier = partyById(form.elements.partyId.value) || {};
  const currentRoute = purchaseEwayRouteFromValues(profile, supplier, {
    transType: form.elements.ewayTransType.value || "1",
    fromPincode: form.elements.ewaySupplierPincodeEntry.value,
    destinationPreset: form.elements.ewayDestinationPreset.value,
    dispatchFromAddress: form.elements.ewayDispatchFromAddress.value,
    shipToAddress: form.elements.ewayShipToAddress.value
  });
  if (ewayDistanceEstimateRouteKey(currentRoute) !== key) return;
  if (route.savedDistance) {
    setEwayDistanceValue(form, route.savedDistance, key, "saved-route");
    $("#ewayDistanceHint").textContent = `${reason}. Using the previously saved ${route.savedDistance} KM distance.`;
    return;
  }
  const estimatedDistance = calculateEwayDistance(route.fromPincode, route.toPincode);
  if (!estimatedDistance) {
    $("#ewayDistanceHint").textContent = `${reason}. Enter the distance manually.`;
    return;
  }
  setEwayDistanceValue(form, estimatedDistance, key, "local-estimate", true);
  $("#ewayDistanceHint").textContent = `${reason}. Estimated ${estimatedDistance} KM; confirm or correct it before saving.`;
}

async function ewayDistanceCloudErrorMessage(error) {
  let responseMessage = "";
  try {
    const response = error?.context;
    if (response && typeof response.clone === "function") {
      const body = await response.clone().json();
      responseMessage = body?.error || body?.message || "";
    }
  } catch {}
  const message = [responseMessage, error?.message, error?.details, error?.hint]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (/Shared PIN-distance cache|latest Supabase migration|schema cache/i.test(message)) {
    return "Shared PIN-distance cache is not ready";
  }
  if (/GOOGLE_(MAPS|ROUTES)_API_KEY/i.test(message) && /configured|missing/i.test(message)) {
    return "Google Routes API key is not configured in Supabase";
  }
  if (/api key|API_KEY|REQUEST_DENIED|permission|disabled|not authorized/i.test(message)) {
    return "Google API key is invalid or Routes API is not enabled";
  }
  if (/billing|quota|rate|RESOURCE_EXHAUSTED/i.test(message)) {
    return "Google Routes billing or quota is unavailable";
  }
  if (/No route|ZERO_RESULTS|NOT_FOUND/i.test(message)) return "No Google route found. Enter KM manually.";
  if (/Failed to fetch|NetworkError|Could not resolve|resolve host|Load failed|fetch/i.test(message)) {
    return "Distance service could not be reached.";
  }
  if (/401|403|JWT|auth|login|session/i.test(message)) return "Cloud login/session is not valid. Please logout and login again.";
  return message || "Distance calculation failed. Enter KM manually.";
}

function collectPurchaseEwayDetails(form, profile, supplier) {
  const transType = form.elements.ewayTransType.value || "1";
  const transMode = form.elements.ewayTransMode.value || "1";
  const route = purchaseEwayRouteFromValues(profile, supplier, {
    transType,
    fromPincode: form.elements.ewaySupplierPincodeEntry.value,
    destinationPreset: form.elements.ewayDestinationPreset.value,
    dispatchFromAddress: form.elements.ewayDispatchFromAddress.value,
    shipToAddress: form.elements.ewayShipToAddress.value
  });
  const dispatchFromAddress = purchaseSupplierAddressForEway({
    ...(entryDraftMeta.ewayDetails || {}),
    dispatchFromAddress: form.elements.ewayDispatchFromAddress.value,
    fromPincode: form.elements.ewaySupplierPincodeEntry.value || route.fromPincode
  }, supplier);
  const distanceSource = String(form.elements.ewayDistanceKmEntry.dataset.distanceSource || "");
  return normalizePurchaseEwayDetails({
    transType,
    transMode,
    vehicleNo: form.elements.ewayVehicleNoEntry.value,
    vehicleType: "R",
    distanceKm: num(form.elements.ewayDistanceKmEntry.value) || 0,
    distanceSource,
    distanceConfirmed: form.elements.ewayDistanceConfirmed.checked || distanceSource !== "local-estimate",
    destinationPreset: form.elements.ewayDestinationPreset.value,
    dispatchFromAddress,
    shipToAddress: form.elements.ewayShipToAddress.value,
    transporterName: form.elements.ewayTransporterName.value,
    transporterId: form.elements.ewayTransporterId.value,
    transDocNo: form.elements.ewayTransDocNo.value,
    transDocDate: form.elements.ewayTransDocDate.value,
    fromPincode: form.elements.ewaySupplierPincodeEntry.value || route.fromPincode,
    toPincode: route.toPincode,
    routeKey: route.routeKey
  });
}

async function rememberPurchaseEwayRoute(details = {}) {
  const normalized = normalizePurchaseEwayDetails(details);
  const routeKey = ewayRouteKey(normalized.fromPincode, normalized.toPincode) || normalizeEwayRouteKey(normalized.routeKey);
  if (!routeKey || !normalized.distanceKm) return false;
  state.settings.ewayRouteDistances = {
    ...(state.settings.ewayRouteDistances || {}),
    [routeKey]: normalized.distanceKm
  };
  const alreadyShared = ["google-routes", "shared-cache"].includes(normalized.distanceSource);
  if (alreadyShared || !normalized.distanceConfirmed || !cloudConfigured() || !cloudClient || !cloudSession) return true;
  try {
    const { error } = await cloudClient.rpc("billing_save_pin_distance", {
      p_from_pincode: normalized.fromPincode,
      p_to_pincode: normalized.toPincode,
      p_distance_km: Math.round(normalized.distanceKm),
      p_source: "manual-confirmed"
    });
    if (error) throw error;
    return true;
  } catch (error) {
    console.warn("Could not save shared PIN distance", error);
    return false;
  }
}

function shipToAddressOptions(party = {}, selectedId = "", shipTo = {}, same = true) {
  const saved = normalizeShippingAddresses(party.shippingAddresses || []);
  const matchingSaved = saved.find(address => sameAddressSnapshot(shippingAddressSnapshot(address, party), shipTo));
  const selected = selectedId || matchingSaved?.id || (!same && shipTo.address ? "custom" : "");
  const options = [
    `<option value="">Select saved address</option>`,
    ...saved.map(address => `<option value="${escapeHtml(address.id)}" ${address.id === selected ? "selected" : ""}>${escapeHtml(address.label || address.name || "Ship To")}</option>`),
    `<option value="custom" ${selected === "custom" ? "selected" : ""}>Different Ship To</option>`
  ];
  return options.join("");
}

function updateSalesAddressPanel() {
  if (entryMode !== "sale") return;
  const form = $("#entryForm");
  const panel = $("#salesAddressPanel");
  if (!form || !panel || panel.hidden) return;
  const party = partyById(form.elements.partyId.value) || {};
  const billTo = partyAddressSnapshot(party);
  const shipTo = currentShipToSnapshot(party);
  $("#billToPreview").innerHTML = salesAddressPreview("Bill To", billTo);
  $("#shipToPreview").innerHTML = salesAddressPreview("Ship To", shipTo);
  const same = form.elements.shipToSame.checked;
  const savedLabel = $("#shipToSavedLabel");
  const customFields = $("#shipToCustomFields");
  form.elements.shipToAddressId.disabled = same;
  savedLabel.hidden = same;
  customFields.hidden = same || form.elements.shipToAddressId.value !== "custom";
}

function currentShipToSnapshot(party = {}) {
  const form = $("#entryForm");
  const billTo = partyAddressSnapshot(party);
  if (form.elements.shipToSame.checked) return billTo;
  const savedId = form.elements.shipToAddressId.value;
  if (savedId && savedId !== "custom") {
    const saved = normalizeShippingAddresses(party.shippingAddresses || []).find(address => address.id === savedId);
    if (saved) return shippingAddressSnapshot(saved, party);
  }
  return normalizeAddressSnapshot({
    name: form.elements.shipToName.value.trim() || party.name || "",
    gstin: normalizeGstin(form.elements.shipToGstin.value) || party.gstin || "",
    place: form.elements.shipToPlace.value.trim() || party.place || stateNameFromGstin(party.gstin) || "",
    address: form.elements.shipToAddress.value.trim()
  });
}

function salesAddressPreview(title, address = {}) {
  const snapshot = normalizeAddressSnapshot(address);
  return `<span>${escapeHtml(title)}</span>
    <strong>${escapeHtml(snapshot.name || "-")}</strong>
    <p>${escapeHtml(snapshot.address || "-")}</p>
    <p>GSTIN: ${escapeHtml(snapshot.gstin || "-")}</p>
    <p>${escapeHtml(snapshot.place || snapshot.state || "-")}</p>`;
}

function collectSaleAddressDetails(form, party) {
  const billToSnapshot = partyAddressSnapshot(party);
  const shipToSnapshot = currentShipToSnapshot(party);
  const shipToSameAsBillTo = form.elements.shipToSame.checked || sameAddressSnapshot(billToSnapshot, shipToSnapshot);
  return {
    billToSnapshot,
    shipToSnapshot,
    shipToSameAsBillTo,
    shipToAddressId: shipToSameAsBillTo ? "" : form.elements.shipToAddressId.value
  };
}

function saveShipToAddressIfNeeded(form, party, saleAddress) {
  if (!party?.id || saleAddress.shipToSameAsBillTo || !form.elements.saveShipTo.checked) return;
  const snapshot = saleAddress.shipToSnapshot;
  if (!snapshot.address) return;
  const existing = normalizeShippingAddresses(party.shippingAddresses || []).find(address => (
    sameAddressSnapshot(shippingAddressSnapshot(address, party), snapshot)
  ));
  if (existing) return;
  party.shippingAddresses = normalizeShippingAddresses(party.shippingAddresses || []);
  party.shippingAddresses.push({
    id: uid(),
    label: snapshot.place || snapshot.name || `Ship To ${party.shippingAddresses.length + 1}`,
    name: snapshot.name || party.name || "",
    gstin: snapshot.gstin || party.gstin || "",
    place: snapshot.place || snapshot.state || "",
    address: snapshot.address
  });
}

function renderPurchaseUploadReview(kind, source) {
  if (kind !== "purchase" || !source) return "";
  const profile = profileById(source.profileId || activeProfileId());
  const supplier = partyById(source.partyId) || {};
  const sourceEwayDetails = normalizePurchaseEwayDetails(source.ewayDetails || entryDraftMeta.ewayDetails || {});
  const supplierReviewAddress = sourceEwayDetails.dispatchFromAddress || supplier.address || "";
  const supplierReviewPincode = sourceEwayDetails.fromPincode || normalizePincode(extractPreferredPincode(supplierReviewAddress || supplier.place));
  const calculated = calculateEntryTotals(source.lines || [], profile, supplier, "purchase");
  const extracted = source.extractedTaxes || {};
  const messages = uniqueMessages([
    ...activePurchaseReviewMessages(source.reviewMessages || []),
    ...purchaseMissingReviewMessages(source, profile, supplier, source.lines || []),
    ...purchaseTaxReviewMessages(extracted, calculated),
    ...purchaseDuplicateReviewMessages(source, source.id || editingEntryId)
  ]);
  syncPurchaseReviewAcceptance(messages);
  const attachments = source.attachments || [];
  const taxModeLabel = calculated.taxMode === "IGST" ? "IGST" : "CGST/SGST";
  const roundOff = purchaseRoundOffForSource(source, calculated);
  const payableTotal = purchaseTotalWithRoundOff(calculated, roundOff);
  return `<section class="purchase-review-panel">
    <div class="purchase-review-head">
      <div>
        <span>${source.source === "purchase-upload" ? "Purchase Upload Review" : "Purchase Review"}</span>
        <strong>${escapeHtml(source.number || "-")}</strong>
      </div>
      <div>
        <span>${messages.length ? "Needs Review" : "Ready"} | ${taxModeLabel}</span>
        <strong>${money(payableTotal)}</strong>
      </div>
    </div>
    <div class="purchase-review-grid">
      ${purchaseReviewCard("Supplier", supplier.name || "-", `GSTIN: ${supplier.gstin || source.sellerGstin || "-"}`, supplierReviewAddress ? `Address: ${supplierReviewAddress}` : `Place: ${supplier.place || "-"}`, supplierReviewPincode ? `PIN: ${supplierReviewPincode}` : "")}
      ${purchaseReviewCard("Buyer GST", profile.businessName || profile.label || "-", `GSTIN: ${source.buyerGstin || profile.gstin || "-"}`, profile.address ? `Address: ${profile.address}` : `Place: ${profile.state || "-"}`)}
      ${purchaseReviewCard("Invoice No.", source.number || "-", "Supplier invoice number", "")}
      ${purchaseReviewCard("Invoice Date", formatInvoiceDate(source.date || today()), "Supplier invoice date", "")}
    </div>
    ${messages.length ? `<div class="purchase-review-warnings">${messages.map(renderPurchaseWarning).join("")}</div>` : ""}
    ${renderPurchaseItemReview(source.lines || [])}
    ${renderExtractedTaxReview(extracted, calculated)}
    <div class="purchase-review-totals">
      <span>Taxable</span><strong>${money(calculated.taxable)}</strong>
      <span>CGST</span><strong>${money(calculated.cgst)}</strong>
      <span>SGST</span><strong>${money(calculated.sgst)}</strong>
      <span>IGST</span><strong>${money(calculated.igst)}</strong>
      <span>GST</span><strong>${money(calculated.gst)}</strong>
      <span>${escapeHtml(purchaseAdjustmentLabel(roundOff))}</span><strong>${money(roundOff)}</strong>
      <span>Total</span><strong>${money(payableTotal)}</strong>
    </div>
    ${renderPurchaseAttachmentReview(attachments)}
    ${renderPurchaseReviewAcceptance(messages)}
  </section>`;
}

function syncPurchaseReviewAcceptance(messages = []) {
  const signature = messages.join(" | ");
  if (!signature) {
    entryDraftMeta.purchaseReviewSignature = "";
    entryDraftMeta.purchaseReviewAccepted = false;
    entryDraftMeta.preserveInitialReviewAcceptance = false;
    return;
  }
  if (entryDraftMeta.purchaseReviewSignature !== signature) {
    const keepAccepted = entryDraftMeta.preserveInitialReviewAcceptance
      && entryDraftMeta.purchaseReviewAccepted
      && !entryDraftMeta.purchaseReviewSignature;
    entryDraftMeta.purchaseReviewSignature = signature;
    entryDraftMeta.purchaseReviewAccepted = keepAccepted;
    entryDraftMeta.preserveInitialReviewAcceptance = false;
  }
}

function renderPurchaseReviewAcceptance(messages = []) {
  if (!messages.length) return "";
  return `<label class="purchase-review-accept">
    <input id="purchaseReviewAccept" type="checkbox" ${entryDraftMeta.purchaseReviewAccepted ? "checked" : ""}>
    <span>I reviewed these warnings and want to save this purchase.</span>
  </label>`;
}

function bindPurchaseReviewControls() {
  const control = $("#purchaseReviewAccept");
  if (!control) return;
  control.addEventListener("change", event => {
    entryDraftMeta.purchaseReviewAccepted = event.target.checked;
  });
}

function rememberPurchaseReviewAcceptance() {
  const control = $("#purchaseReviewAccept");
  if (control) entryDraftMeta.purchaseReviewAccepted = control.checked;
}

function currentPurchaseReviewSource(lines = collectLines()) {
  const form = $("#entryForm");
  const profile = profileById(form?.elements?.profileId?.value || activeProfileId());
  const party = partyById(form?.elements?.partyId?.value) || {};
  const purchaseEwayDetails = normalizePurchaseEwayDetails({
    ...(entryDraftMeta.ewayDetails || {}),
    fromPincode: form?.elements?.ewaySupplierPincodeEntry?.value || entryDraftMeta.ewayDetails?.fromPincode || "",
    destinationPreset: form?.elements?.ewayDestinationPreset?.value || entryDraftMeta.ewayDetails?.destinationPreset || "",
    dispatchFromAddress: form?.elements?.ewayDispatchFromAddress?.value || entryDraftMeta.ewayDetails?.dispatchFromAddress || "",
    shipToAddress: form?.elements?.ewayShipToAddress?.value || entryDraftMeta.ewayDetails?.shipToAddress || ""
  });
  purchaseEwayDetails.dispatchFromAddress = purchaseSupplierAddressForEway(purchaseEwayDetails, party);
  return {
    id: editingEntryId || "",
    profileId: profile.id,
    date: form?.elements?.date?.value || today(),
    number: form?.elements?.number?.value?.trim() || "",
    partyId: form?.elements?.partyId?.value || "",
    lines,
    attachments: clone(entryDraftMeta.attachments || []),
    extractedTaxes: clone(entryDraftMeta.extractedTaxes || null),
    ewayDetails: purchaseEwayDetails,
    roundOff: num(entryDraftMeta.roundOff),
    sellerGstin: normalizeGstin(party.gstin || entryDraftMeta.sellerGstin),
    buyerGstin: normalizeGstin(profile.gstin || entryDraftMeta.buyerGstin),
    reviewMessages: clone(entryDraftMeta.reviewMessages || []),
    source: entryDraftMeta.source || "manual"
  };
}

function purchaseReviewCard(title, main, detail, extra, note) {
  return `<div class="purchase-review-card">
    <span>${escapeHtml(title)}</span>
    <strong>${escapeHtml(main || "-")}</strong>
    ${detail ? `<p>${escapeHtml(detail)}</p>` : ""}
    ${extra ? `<p>${escapeHtml(extra)}</p>` : ""}
    ${note ? `<p>${escapeHtml(note)}</p>` : ""}
  </div>`;
}

function purchaseRoundOffForSource(source = {}, calculated = {}) {
  const explicitRoundOff = num(source?.roundOff);
  const extractedAdjustment = purchaseExtractedRoundOffForSource(source, calculated);
  if (Math.abs(explicitRoundOff) >= 0.01) return round2(explicitRoundOff + extractedAdjustment);
  if (Math.abs(extractedAdjustment) >= 0.01) return extractedAdjustment;
  const roundedAdjustment = round2(Math.round(num(calculated.total)) - num(calculated.total));
  return Math.abs(roundedAdjustment) >= 0.01 ? roundedAdjustment : 0;
}

function purchaseExtractedRoundOffForSource(source = {}, calculated = {}) {
  const extractedTotal = num(source?.extractedTaxes?.total);
  if (extractedTotal) {
    const adjustment = round2(extractedTotal - num(calculated.total));
    return Math.abs(adjustment) <= 1 && Math.abs(adjustment) >= 0.01 ? adjustment : 0;
  }
  return 0;
}

function purchaseTotalWithRoundOff(calculated = {}, roundOff = 0) {
  return round2(num(calculated.total) + num(roundOff));
}

function purchaseAdjustmentLabel(roundOff = 0) {
  return Math.abs(num(roundOff)) > 1 ? "Adjustment" : "Round Off";
}

function renderExtractedTaxReview(extracted = {}, calculated = {}) {
  if (!Object.values(extracted).some(value => num(value))) return "";
  const comparisons = [
    ["Taxable", extracted.taxable, calculated.taxable],
    ["CGST", extracted.cgst, calculated.cgst],
    ["SGST", extracted.sgst, calculated.sgst],
    ["IGST", extracted.igst, calculated.igst],
    ["GST", num(extracted.gst) || num(extracted.cgst) + num(extracted.sgst) + num(extracted.igst), calculated.gst],
    ["Total", extracted.total, calculated.total]
  ].filter(([label, uploaded, appValue]) => num(uploaded) || num(appValue) || ["GST", "Total"].includes(label));
  const rows = comparisons.map(([label, uploaded, appValue]) => {
    const mismatch = (num(uploaded) || num(appValue)) && !amountsClose(uploaded, appValue);
    const difference = round2(num(uploaded) - num(appValue));
    return `<div class="${mismatch ? "tax-mismatch" : "tax-match"}">
      <span>${escapeHtml(label)}</span>
      ${mismatch
        ? `<strong>Difference ${money(Math.abs(difference))}</strong><small>Uploaded ${money(uploaded)} | App ${money(appValue)}</small>`
        : `<strong class="tax-match-mark">✓ Matched</strong>`}
    </div>`;
  }).join("");
  return `<div class="purchase-review-extracted">
    <span>GST Mistake Check</span>
    <div class="tax-comparison-grid">${rows}</div>
  </div>`;
}

function renderPurchaseWarning(message) {
  return `<span class="${purchaseWarningClass(message)}"><strong>${purchaseWarningLabel(message)}</strong>${escapeHtml(cleanPurchaseWarningText(message))}</span>`;
}

function purchaseWarningClass(message) {
  const value = String(message || "");
  if (isDuplicatePurchaseWarning(value)) return "duplicate-warning";
  if (/CGST|SGST|IGST|GST amount|taxable value|invoice total/i.test(value)) return "tax-warning";
  if (/^Missing detail:/i.test(value)) return "missing-warning";
  return "general-warning";
}

function purchaseWarningLabel(message) {
  const value = String(message || "");
  if (isDuplicatePurchaseWarning(value)) return "Duplicate: ";
  if (/CGST|SGST|IGST|GST amount|taxable value|invoice total/i.test(value)) return "GST: ";
  if (/^Missing detail:/i.test(value)) return "Missing: ";
  return "Review: ";
}

function cleanPurchaseWarningText(message) {
  return String(message || "")
    .replace(/^Duplicate purchase invoice warning:\s*/i, "")
    .replace(/^Missing detail:\s*/i, "");
}

function renderPurchaseItemReview(lines = []) {
  if (!lines.length) return "";
  const rows = lines.map(line => {
    const item = state.items.find(row => row.id === line.itemId) || {};
    const hsn = lineHsn(line, item);
    return `<tr>
      <td data-label="Item">${escapeHtml(item.name || itemName(line.itemId))}</td>
      <td data-label="HSN/SAC">${escapeHtml(hsn)}</td>
      <td data-label="Qty" class="num">${num(line.qty)}</td>
      <td data-label="Rate per quantity" class="num">${money(lineGrossRate(line))}</td>
      <td data-label="GST" class="num">${num(line.gstRate)}%</td>
      <td data-label="Taxable" class="num">${money(lineTaxableAmount(line))}</td>
    </tr>`;
  }).join("");
  return `<div class="purchase-review-items">
    <span>Items detected from invoice</span>
    <table>
      <thead><tr><th>Item</th><th>HSN/SAC</th><th class="num">Qty</th><th class="num">Rate per quantity</th><th class="num">GST</th><th class="num">Taxable</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

function renderPurchaseAttachmentReview(attachments = []) {
  if (!attachments.length) return "";
  return `<div class="purchase-review-attachments">
    <span>Invoice Soft Copy</span>
    ${attachments.map(file => `<strong>${escapeHtml(file.name || "Invoice file")}</strong><small>${escapeHtml(file.status || "Attached")}${file.storagePath ? ` | ${escapeHtml(file.storagePath)}` : ""}${file.error ? ` | ${escapeHtml(file.error)}` : ""}</small>`).join("")}
  </div>`;
}

function blankLine(kind) {
  const item = state.items[0];
  const gstRate = item && item.gstRate !== undefined ? num(item.gstRate) : DEFAULT_SALE_GST_RATE;
  const inclusiveRate = kind === "sale" ? num(item?.saleRate) : num(item?.purchaseRate);
  return {
    itemId: item?.id || "",
    itemName: item?.name || "",
    qty: 1,
    rate: taxableRateFromInclusive(inclusiveRate, gstRate),
    grossRate: inclusiveRate,
    gstRate,
    imeiNumbers: ""
  };
}

function imeiNumbersFromText(value) {
  return String(value || "")
    .replace(/\bimei(?:\s*(?:nos?|numbers?))?\b\s*[:#-]?/ig, " ")
    .split(/[\s,;|]+/)
    .map(part => part.trim())
    .filter(part => part.length >= 5);
}

function normalizeImeiNumbers(value) {
  return [...new Set(imeiNumbersFromText(value))].join("\n");
}

function invoiceImeiMarkup(value) {
  const numbers = imeiNumbersFromText(value);
  if (!numbers.length) return "";
  return `<small class="invoice-imei-list"><span>IMEI:</span> ${escapeHtml([...new Set(numbers)].join(", "))}</small>`;
}

function lineInputRate(line = {}) {
  return lineInclusiveUnitRate(line);
}

function lineInputHsn(line = {}) {
  const item = state.items.find(row => row.id === line.itemId) || {};
  return lineHsn(line, item);
}

function normalizeLineRateForEntry(line = {}) {
  const inclusiveRate = num(line.rate);
  return {
    ...line,
    grossRate: inclusiveRate,
    rate: taxableRateFromInclusive(inclusiveRate, line.gstRate)
  };
}

function addLineRow(line = blankLine(entryMode)) {
  const row = document.createElement("div");
  row.className = "line-row";
  row.innerHTML = `
    <label>Item<select class="line-item">${itemOptions(line.itemId, line.itemName || line.name)}</select></label>
    <label class="line-hsn-field">HSN/SAC<input class="line-hsn" inputmode="numeric" maxlength="8" value="${escapeHtml(lineInputHsn(line))}" placeholder="85171300"></label>
    <label>Qty<input class="line-qty" type="number" min="0" step="0.01" value="${num(line.qty)}"></label>
    <label>Rate per quantity<input class="line-rate" type="number" min="0" step="0.01" value="${lineInputRate(line)}"></label>
    <label>GST %<input class="line-gst" type="number" min="0" step="0.01" value="${num(line.gstRate)}"></label>
    <label>Amount<input class="line-amount" disabled></label>
    <button type="button" class="mini-btn" title="Remove"><i data-lucide="x"></i></button>
    <label class="line-imei-field">IMEI numbers<textarea class="line-imei" rows="2" placeholder="Optional: paste IMEI numbers">${escapeHtml(line.imeiNumbers || "")}</textarea></label>
  `;
  row.querySelector(".line-item").addEventListener("change", event => {
    const item = state.items.find(candidate => candidate.id === event.target.value);
    row.querySelector(".line-hsn").value = lineHsn({}, item || {});
    row.querySelector(".line-rate").value = entryMode === "sale" ? num(item?.saleRate) : num(item?.purchaseRate);
    row.querySelector(".line-gst").value = item && item.gstRate !== undefined ? num(item.gstRate) : DEFAULT_SALE_GST_RATE;
    updateEntryTotals();
  });
  row.querySelectorAll("input, select, textarea").forEach(input => input.addEventListener("input", updateEntryTotals));
  row.querySelector("button").addEventListener("click", () => {
    row.remove();
    if (!$("#lineRows").children.length) addLineRow();
    updateEntryTotals();
  });
  $("#lineRows").appendChild(row);
  updateEntryTotals();
  if (window.lucide) lucide.createIcons();
}

function collectLines(options = {}) {
  const { normalizeRates = true } = options;
  const lines = $$(".line-row").map(row => {
    const itemId = row.querySelector(".line-item").value;
    const item = state.items.find(candidate => candidate.id === itemId) || {};
    const selectedName = row.querySelector(".line-item").selectedOptions?.[0]?.textContent?.trim() || "";
    return {
      itemId,
      itemName: item.name || selectedName,
      hsn: lineHsn({ hsn: row.querySelector(".line-hsn")?.value }, item),
      qty: num(row.querySelector(".line-qty").value),
      rate: num(row.querySelector(".line-rate").value),
      grossRate: num(row.querySelector(".line-rate").value),
      gstRate: num(row.querySelector(".line-gst").value),
      imeiNumbers: normalizeImeiNumbers(row.querySelector(".line-imei")?.value || "")
    };
  }).filter(line => line.itemId && line.qty > 0);
  return normalizeRates ? lines.map(normalizeLineRateForEntry) : lines;
}

function normalizeLineHsn(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 8);
  return digits.length >= 4 && !DISALLOWED_HSN_CODES.has(digits) ? digits : "";
}

function lineHsn(line = {}, item = null) {
  const sourceItem = item || state.items.find(row => row.id === line.itemId) || {};
  return normalizeLineHsn(line.hsn)
    || normalizeLineHsn(sourceItem.hsn)
    || DEFAULT_SALE_HSN;
}

function applyLineHsnToItems(lines = []) {
  lines.forEach(line => {
    const hsn = lineHsn(line);
    if (!hsn) return;
    const item = state.items.find(row => row.id === line.itemId);
    if (item && normalizeLineHsn(item.hsn) !== hsn) item.hsn = hsn;
  });
}

function updateEntryTotals() {
  $$(".line-row").forEach(row => {
    const qty = num(row.querySelector(".line-qty").value);
    const inclusiveRate = num(row.querySelector(".line-rate").value);
    row.querySelector(".line-amount").value = money(qty * inclusiveRate);
  });
  const lines = collectLines();
  const calculated = totals(lines);
  const purchaseSource = entryMode === "purchase" ? currentPurchaseReviewSource(lines) : null;
  const purchaseRoundOff = entryMode === "purchase" ? purchaseRoundOffForSource(purchaseSource, calculated) : 0;
  const payableTotal = entryMode === "purchase" ? purchaseTotalWithRoundOff(calculated, purchaseRoundOff) : calculated.total;
  $("#entryTaxable").textContent = money(calculated.taxable);
  $("#entryCgst").textContent = money(calculated.cgst);
  $("#entrySgst").textContent = money(calculated.sgst);
  $("#entryIgst").textContent = money(calculated.igst);
  $("#entryGst").textContent = money(calculated.gst);
  $("#entryRoundOffBlock").hidden = entryMode !== "purchase";
  $("#entryRoundOffBlock span").textContent = purchaseAdjustmentLabel(purchaseRoundOff);
  $("#entryRoundOff").textContent = money(purchaseRoundOff);
  $("#entryTotal").textContent = money(payableTotal);
  if (entryMode === "purchase") {
    rememberPurchaseReviewAcceptance();
    $("#purchaseReviewPanel").innerHTML = renderPurchaseUploadReview("purchase", purchaseSource);
    bindPurchaseReviewControls();
    updatePurchaseRequiredHighlights(purchaseSource);
  }
}

function updatePurchaseRequiredHighlights(source = null) {
  if (entryMode !== "purchase") return;
  const form = $("#entryForm");
  if (!form) return;
  const profile = profileById(form.elements.profileId.value);
  const supplier = partyById(form.elements.partyId.value) || {};
  const invoiceNumber = String(source?.number || form.elements.number.value || "").trim();
  setRequiredAttention(form.elements.number, !invoiceNumber || isGeneratedPurchaseNumber(invoiceNumber), "Actual supplier invoice number required");
  setRequiredAttention(form.elements.date, !String(source?.date || form.elements.date.value || "").trim(), "Invoice date required");
  setRequiredAttention(form.elements.partyId, !supplier?.name || /^imported supplier$/i.test(supplier.name), "Supplier required");
  const supplierGstin = normalizeGstin(supplier.gstin || source?.sellerGstin);
  if (supplier?.name && !isValidGstin(supplierGstin)) {
    setRequiredAttention(form.elements.partyId, true, "Supplier GSTIN required");
  }
  const buyerGstin = normalizeGstin(profile?.gstin || source?.buyerGstin);
  setRequiredAttention(form.elements.profileId, !isValidGstin(buyerGstin), "Buyer GSTIN required");
  updateLineRequiredHighlights();
  const route = purchaseEwayRouteFromValues(profile, supplier, {
    transType: form.elements.ewayTransType.value || "1",
    fromPincode: form.elements.ewaySupplierPincodeEntry.value,
    destinationPreset: form.elements.ewayDestinationPreset.value,
    dispatchFromAddress: form.elements.ewayDispatchFromAddress.value,
    shipToAddress: form.elements.ewayShipToAddress.value
  });
  updatePurchaseEwayRequiredHighlights(route, form);
}

function updateLineRequiredHighlights() {
  $$(".line-row").forEach(row => {
    const itemSelect = row.querySelector(".line-item");
    const hsnInput = row.querySelector(".line-hsn");
    const qtyInput = row.querySelector(".line-qty");
    const rateInput = row.querySelector(".line-rate");
    const item = state.items.find(candidate => candidate.id === itemSelect?.value) || {};
    const itemNeedsReview = !item.name || /^imported purchase|imported item$/i.test(item.name);
    setRequiredAttention(itemSelect, itemNeedsReview, "Review item name");
    setRequiredAttention(hsnInput, !lineHsn({ hsn: hsnInput?.value, itemId: itemSelect?.value }, item), "HSN/SAC required");
    setRequiredAttention(qtyInput, num(qtyInput?.value) <= 0, "Quantity required");
    setRequiredAttention(rateInput, num(rateInput?.value) <= 0, "Rate per quantity required");
  });
}

function updatePurchaseEwayRequiredHighlights(route = null, form = $("#entryForm")) {
  if (entryMode !== "purchase" || !form) return;
  const currentRoute = route || purchaseEwayRouteFromValues(profileById(form.elements.profileId.value), partyById(form.elements.partyId.value) || {}, {
    transType: form.elements.ewayTransType.value || "1",
    fromPincode: form.elements.ewaySupplierPincodeEntry.value,
    destinationPreset: form.elements.ewayDestinationPreset.value,
    dispatchFromAddress: form.elements.ewayDispatchFromAddress.value,
    shipToAddress: form.elements.ewayShipToAddress.value
  });
  const supplierPinMissing = !currentRoute.fromPincode;
  if (supplierPinMissing) $("#ewaySupplierPincodeLabel").hidden = false;
  setRequiredAttention(form.elements.ewaySupplierPincodeEntry, supplierPinMissing, "Supplier PIN required for E-Way");
}

function setRequiredAttention(control, required, message = "Required") {
  if (!control) return;
  const target = control.closest("label") || control;
  target.classList.toggle("required-attention", Boolean(required));
  control.classList.toggle("required-control", Boolean(required));
  if (required) control.setAttribute("aria-invalid", "true");
  else control.removeAttribute("aria-invalid");
  let hint = Array.from(target.children || []).find(child => child.classList?.contains("required-hint"));
  if (required) {
    if (!hint) {
      hint = document.createElement("small");
      hint.className = "required-hint";
      target.appendChild(hint);
    }
    hint.textContent = message;
  } else if (hint) {
    hint.remove();
  }
}

function uniqueMessages(messages) {
  return [...new Set(messages.map(message => String(message || "").trim()).filter(Boolean))];
}

function purchaseMissingReviewMessages(source, profile, supplier, lines = []) {
  if (!source || source.source !== "purchase-upload") return [];
  const messages = [];
  const supplierGstin = normalizeGstin(source.sellerGstin || supplier?.gstin);
  const buyerGstin = normalizeGstin(source.buyerGstin || profile?.gstin);
  const invoiceNumber = String(source.number || "").trim();
  if (!invoiceNumber) messages.push("Missing detail: supplier invoice number is required.");
  if (isGeneratedPurchaseNumber(invoiceNumber)) messages.push("Missing detail: supplier invoice number was not detected. Replace app draft number with actual invoice number.");
  if (!source.date) messages.push("Missing detail: invoice date is required.");
  if (!supplier?.name || /^imported supplier$/i.test(supplier.name)) messages.push("Missing detail: supplier name is required.");
  if (!isValidGstin(supplierGstin)) messages.push("Missing detail: supplier GSTIN is required for B2B purchase.");
  if (!isValidGstin(buyerGstin)) messages.push("Missing detail: buyer GSTIN must match one of your companies.");
  if (!lines.length) messages.push("Missing detail: at least one purchase item is required.");
  lines.forEach((line, index) => {
    const label = `Item ${index + 1}`;
    const item = state.items.find(row => row.id === line.itemId) || {};
    if (!item.name || /^imported purchase|imported item$/i.test(item.name)) messages.push(`Missing detail: ${label} name should be reviewed.`);
    if (!lineHsn(line, item)) messages.push(`Missing detail: ${label} HSN/SAC is required.`);
    if (num(line.qty) <= 0) messages.push(`Missing detail: ${label} quantity is required.`);
    if (num(line.rate) <= 0) messages.push(`Missing detail: ${label} rate is required.`);
  });
  if (source.attachments && !source.attachments.length) messages.push("Missing detail: invoice soft copy is not attached.");
  if (!source.attachments) messages.push("Missing detail: invoice soft copy is not attached.");
  return uniqueMessages(messages);
}

function isGeneratedPurchaseNumber(value) {
  return /^PUR-\d+$/i.test(String(value || "").trim());
}

function purchaseTaxReviewMessages(extractedTaxes, calculated) {
  if (!extractedTaxes) return [];
  const messages = [];
  const extractedCgst = num(extractedTaxes.cgst);
  const extractedSgst = num(extractedTaxes.sgst);
  const extractedIgst = num(extractedTaxes.igst);
  const extractedGst = num(extractedTaxes.gst) || extractedCgst + extractedSgst + extractedIgst;
  const extractedTotal = num(extractedTaxes.total);
  const extractedTaxable = num(extractedTaxes.taxable);
  if (calculated.taxMode === "IGST" && (extractedCgst > 0 || extractedSgst > 0)) {
    messages.push("Supplier and buyer GSTIN states differ, so IGST is expected. Uploaded invoice shows CGST/SGST.");
  }
  if (calculated.taxMode === "CGST_SGST" && extractedIgst > 0) {
    messages.push("Supplier and buyer GSTIN states match, so CGST/SGST is expected. Uploaded invoice shows IGST.");
  }
  if (extractedGst && !amountsClose(extractedGst, calculated.gst)) {
    messages.push(`Uploaded GST amount ${money(extractedGst)} differs from calculated GST ${money(calculated.gst)}.`);
  }
  if (extractedCgst && !amountsClose(extractedCgst, calculated.cgst)) {
    messages.push(`Uploaded CGST ${money(extractedCgst)} differs from calculated CGST ${money(calculated.cgst)}.`);
  }
  if (extractedSgst && !amountsClose(extractedSgst, calculated.sgst)) {
    messages.push(`Uploaded SGST ${money(extractedSgst)} differs from calculated SGST ${money(calculated.sgst)}.`);
  }
  if (extractedIgst && !amountsClose(extractedIgst, calculated.igst)) {
    messages.push(`Uploaded IGST ${money(extractedIgst)} differs from calculated IGST ${money(calculated.igst)}.`);
  }
  if (extractedTaxable && !amountsClose(extractedTaxable, calculated.taxable)) {
    messages.push(`Uploaded taxable value ${money(extractedTaxable)} differs from calculated taxable ${money(calculated.taxable)}.`);
  }
  if (extractedTotal && !amountsClose(extractedTotal, calculated.total)) {
    messages.push(`Uploaded invoice total ${money(extractedTotal)} differs from calculated total ${money(calculated.total)}.`);
  }
  return messages;
}

function purchaseDuplicateReviewMessages(source, excludeId = "") {
  return findDuplicatePurchaseInvoices(source, excludeId).map(duplicatePurchaseInvoiceMessage);
}

function activePurchaseReviewMessages(messages) {
  return (messages || []).filter(message => !isDuplicatePurchaseWarning(message));
}

function isDuplicatePurchaseWarning(message) {
  return String(message || "").startsWith("Duplicate purchase invoice warning:");
}

function findDuplicatePurchaseInvoice(source, excludeId = "") {
  return findDuplicatePurchaseInvoices(source, excludeId)[0] || null;
}

function findDuplicatePurchaseInvoices(source, excludeId = "") {
  const invoiceNumber = normalizePurchaseInvoiceNumber(source?.number);
  if (!invoiceNumber) return [];
  const supplierKey = purchaseSupplierKey(source);
  if (!supplierKey) return [];
  return state.purchases.filter(entry => {
    if (entry.id === excludeId) return false;
    if (normalizePurchaseInvoiceNumber(entry.number) !== invoiceNumber) return false;
    if (purchaseSupplierKey(entry) !== supplierKey) return false;
    return true;
  });
}

function purchaseSupplierKey(source) {
  const party = partyById(source?.partyId) || {};
  const gstin = normalizeGstin(source?.sellerGstin || party.gstin);
  if (gstin) return `gstin:${gstin}`;
  if (source?.partyId) return `party:${source.partyId}`;
  return "";
}

function normalizePurchaseInvoiceNumber(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function duplicatePurchaseInvoiceMessage(duplicate) {
  const supplier = partyById(duplicate.partyId) || {};
  const profile = profileById(duplicate.profileId);
  const supplierName = supplier.name || "this supplier";
  const invoiceNo = duplicate.number || "this invoice number";
  const date = formatInvoiceDate(duplicate.date) || duplicate.date || "saved earlier";
  const profileLabel = profile?.businessName || profile?.label || "selected GST";
  return `Duplicate purchase invoice warning: ${supplierName} invoice ${invoiceNo} already exists on ${date} under ${profileLabel}.`;
}

async function saveEntry(event) {
  event.preventDefault();
  const form = $("#entryForm");
  const existingEntry = editingEntryId ? entryList(entryMode).find(row => row.id === editingEntryId) : null;
  let internalSyncResult = null;
  if (entryMode === "sale" && isCancelledEntry(existingEntry)) {
    toast("Cancelled sales bill cannot be edited");
    return;
  }
  const lines = collectLines();
  if (!lines.length) {
    toast("Add at least one item");
    return;
  }
  if (entryMode === "purchase") applyLineHsnToItems(lines);
  const profile = profileById(form.elements.profileId.value);
  const party = partyById(form.elements.partyId.value);
  if (entryMode === "purchase" && purchaseEwayDistanceNeedsConfirmation(form)) {
    toast("Confirm the estimated transport distance or enter the correct KM");
    form.elements.ewayDistanceConfirmed.focus();
    return;
  }
  if (entryMode === "sale" && !isValidGstin(party?.gstin)) {
    toast("Buyer GSTIN is required for B2B sale");
    return;
  }
  const saleAddress = entryMode === "sale" ? collectSaleAddressDetails(form, party || {}) : null;
  if (entryMode === "sale" && !saleAddress.billToSnapshot.address) {
    toast("Buyer billing address is required");
    return;
  }
  if (entryMode === "sale" && !saleAddress.shipToSnapshot.address) {
    toast("Ship To address is required");
    return;
  }
  const calculated = calculateEntryTotals(lines, profile, party, entryMode);
  const purchaseReviewSource = entryMode === "purchase" ? currentPurchaseReviewSource(lines) : null;
  const purchaseRoundOff = entryMode === "purchase" ? purchaseRoundOffForSource(purchaseReviewSource, calculated) : 0;
  const entryTotals = entryMode === "purchase"
    ? { ...calculated, roundOff: purchaseRoundOff, total: purchaseTotalWithRoundOff(calculated, purchaseRoundOff) }
    : calculated;
  const purchaseEwayDetails = entryMode === "purchase" ? collectPurchaseEwayDetails(form, profile, party || {}) : null;
  const reviewMessages = uniqueMessages([
    ...calculated.reviewMessages,
    ...(entryMode === "purchase" ? activePurchaseReviewMessages(entryDraftMeta.reviewMessages) : (entryDraftMeta.reviewMessages || [])),
    ...(entryMode === "purchase" ? purchaseMissingReviewMessages(purchaseReviewSource, profile, party, lines) : []),
    ...(entryMode === "purchase" ? purchaseTaxReviewMessages(entryDraftMeta.extractedTaxes, calculated) : [])
  ]);
  const entryNumber = entryMode === "sale"
    ? saleInvoiceNumberForSave(form.elements.profileId.value, form.elements.number.value, editingEntryId)
    : form.elements.number.value.trim();
  const entryId = editingEntryId || uid();
  const entry = entityWithLocalMeta({
    id: entryId,
    date: form.elements.date.value,
    number: entryNumber,
    profileId: form.elements.profileId.value,
    partyId: form.elements.partyId.value,
    status: form.elements.status.value,
    paymentSourceId: entryMode === "po" ? "" : form.elements.paymentSourceId.value,
    paymentDate: entryMode === "po" ? "" : form.elements.paymentDate.value,
    paymentReference: entryMode === "po" ? "" : form.elements.paymentReference.value.trim(),
    notes: entryMode === "sale" ? "" : (form.elements.notes?.value || "").trim(),
    lines,
    ...entryTotals,
    attachments: clone(entryDraftMeta.attachments || []),
    extractedTaxes: clone(entryDraftMeta.extractedTaxes || null),
    source: entryDraftMeta.source || "manual",
    rateIncludesGst: true,
    sellerGstin: normalizeGstin(entryMode !== "sale" ? (party?.gstin || entryDraftMeta.sellerGstin) : profile?.gstin),
    buyerGstin: normalizeGstin(entryMode !== "sale" ? profile?.gstin : (party?.gstin || entryDraftMeta.buyerGstin)),
    billToSnapshot: saleAddress?.billToSnapshot || null,
    shipToSnapshot: saleAddress?.shipToSnapshot || null,
    shipToSameAsBillTo: saleAddress?.shipToSameAsBillTo ?? true,
    shipToAddressId: saleAddress?.shipToAddressId || "",
    ewayDetails: purchaseEwayDetails,
    reviewMessages,
    reviewStatus: reviewMessages.length ? "Needs Review" : "Ready"
  }, existingEntry);
  if (entryMode === "purchase") {
    const duplicateMessages = purchaseDuplicateReviewMessages(entry, editingEntryId);
    if (duplicateMessages.length) {
      entry.reviewMessages = uniqueMessages([...entry.reviewMessages, ...duplicateMessages]);
      entry.reviewStatus = "Needs Review";
    }
    if (entry.reviewMessages.length) {
      $("#purchaseReviewPanel").innerHTML = renderPurchaseUploadReview("purchase", entry);
      bindPurchaseReviewControls();
      if (!$("#purchaseReviewAccept")?.checked) {
        toast("Review purchase warnings and tick the checkbox before saving");
        return;
      }
    }
  }
  if (entryMode === "purchase") await rememberPurchaseEwayRoute(entry.ewayDetails);
  if (entryMode === "sale") saveShipToAddressIfNeeded(form, party, saleAddress);
  const list = entryList(entryMode);
  const index = list.findIndex(row => row.id === entry.id);
  if (index >= 0) list[index] = entry;
  else {
    list.push(entry);
  }
  const savedProfile = profileById(entry.profileId);
  if (entryMode === "sale") {
    savedProfile.nextSaleNo = nextSaleSequence(entry.profileId, state.sales);
    internalSyncResult = syncInternalPurchaseForSale(entry, existingEntry);
  } else if (entryMode === "purchase" && index < 0) {
    savedProfile.nextPurchaseNo = num(savedProfile.nextPurchaseNo) + 1;
  } else if (entryMode === "po" && index < 0) {
    savedProfile.nextPoNo = num(savedProfile.nextPoNo) + 1;
  }
  entryMonthFilters[entryMode] = entryMonthKey(entry);
  saveState();
  $("#entryDialog").close();
  renderAll();
  const canSyncNow = cloudReadyForSync();
  let synced = canSyncNow ? await syncCloudNow(false) : false;
  if (canSyncNow && !synced) {
    try {
      if (internalSyncResult?.supplierParty) {
        try {
          await syncSinglePartyToCloud(internalSyncResult.supplierParty);
        } catch (partyError) {
          lastCloudSyncError = cloudErrorText(partyError);
          console.warn("Single party cloud sync failed", partyError);
        }
      }
      const entrySynced = await syncSingleEntryToCloud(entryMode, entry);
      const affectedPurchases = internalSyncResult?.affectedPurchases?.length
        ? internalSyncResult.affectedPurchases
        : (internalSyncResult?.linkedPurchase ? [internalSyncResult.linkedPurchase] : []);
      const linkedResults = [];
      for (const purchase of affectedPurchases) {
        linkedResults.push(await syncSingleEntryToCloud("purchase", purchase));
      }
      synced = entrySynced && linkedResults.every(Boolean);
      if (synced) renderAll();
    } catch (error) {
      lastCloudSyncError = cloudErrorText(error);
      console.warn("Single entry cloud sync failed", error);
    }
  }
  if (entryMode === "purchase") {
    if (canSyncNow && !synced) markEntrySyncFailed(entryMode, entry.id);
    toast(synced ? "Purchase saved and synced" : canSyncNow ? `Purchase saved locally. Cloud sync failed${cloudFailureSuffix()}` : "Purchase saved locally");
    processQueuedPurchaseInvoiceUpload();
  } else if (entryMode === "po") {
    if (canSyncNow && !synced) markEntrySyncFailed(entryMode, entry.id);
    toast(synced ? "PO saved and synced" : canSyncNow ? `PO saved locally. Cloud sync failed${cloudFailureSuffix()}` : "PO saved locally");
  } else {
    if (canSyncNow && !synced) {
      markEntrySyncFailed(entryMode, entry.id);
      markLinkedPurchaseSyncFailed(internalSyncResult);
    }
    toast(saleSaveToast(synced, canSyncNow, internalSyncResult));
  }
}

function purchaseEwayDistanceNeedsConfirmation(form) {
  return form.elements.ewayDistanceKmEntry.dataset.distanceSource === "local-estimate"
    && num(form.elements.ewayDistanceKmEntry.value) > 0
    && !form.elements.ewayDistanceConfirmed.checked;
}

async function deleteEntry(kind, id) {
  if (kind === "sale") {
    cancelEntry(kind, id);
    return;
  }
  const entry = entryList(kind).find(row => row.id === id);
  if (!entry) return toast("Entry not found");
  if (kind === "purchase" && entry?.source === "internal-sale") {
    toast("Internal purchase is linked. Cancel the sales bill instead");
    return;
  }
  if (!confirm("Delete this entry?")) return;
  const key = kind === "purchase" ? "purchases" : "purchaseOrders";
  const tombstone = recordEntryDeletion(kind, entry);
  state[key] = state[key].filter(row => row.id !== id);
  if (kind === "purchase") selectedPurchaseIds.delete(id);
  saveState({ skipCloud: true });
  renderAll();
  if (!cloudReadyForSync()) {
    toast("Entry deleted locally. It will sync after cloud login");
    return;
  }
  const synced = await syncCloudNow(false);
  if (synced) {
    toast("Entry deleted and synced");
    return;
  }
  const pendingTombstone = state.deletionTombstones.find(row => deletionTombstoneMergeKey(row) === deletionTombstoneMergeKey(tombstone));
  markEntitySyncStatus(pendingTombstone, SYNC_STATUS_FAILED);
  saveState({ skipCloud: true });
  renderAll();
  toast(`Entry deleted locally. Cloud sync failed${cloudFailureSuffix()}`);
}

function recordEntryDeletion(kind, entry) {
  const entityType = normalizeDeletionEntityType(kind);
  const entityId = String(entry?.id || "").trim();
  const now = new Date().toISOString();
  const key = `${entityType}:${entityId}`;
  const existingIndex = state.deletionTombstones.findIndex(row => deletionTombstoneMergeKey(row) === key);
  const existing = existingIndex >= 0 ? state.deletionTombstones[existingIndex] : null;
  const tombstone = normalizeDeletionTombstoneForState({
    id: key,
    entityType,
    entityId,
    profileId: entry?.profileId || "",
    documentNumber: entry?.number || "",
    deletedAt: now,
    deletedBy: currentCloudUserId() || "",
    beforeData: clone(entry),
    syncStatus: newLocalSyncStatus(),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    createdBy: existing?.createdBy || currentCloudUserId() || "",
    lastSyncedAt: existing?.lastSyncedAt || ""
  });
  if (existingIndex >= 0) state.deletionTombstones[existingIndex] = tombstone;
  else state.deletionTombstones.push(tombstone);
  return tombstone;
}

function cancelEntry(kind, id) {
  if (kind !== "sale") {
    deleteEntry(kind, id);
    return;
  }
  const entry = state.sales.find(row => row.id === id);
  if (!entry) return toast("Sales bill not found");
  if (isCancelledEntry(entry)) return toast("Sales bill is already cancelled");
  const activeCredits = state.creditNotes.filter(note => note.originalSaleId === entry.id && !isCancelledEntry(note));
  if (activeCredits.length) return toast("Cancel the linked credit notes before cancelling this sales bill");
  if (!confirm(`Cancel sales bill ${entry.number}? This number will not be reused.`)) return;
  entry.cancelled = true;
  entry.cancelledAt = new Date().toISOString();
  entry.status = "Cancelled";
  const internalSyncResult = cancelLinkedInternalPurchase(entry, "Linked sales bill was cancelled.");
  Object.assign(entry, entityWithLocalMeta(entry, entry));
  const profile = profileById(entry.profileId);
  profile.nextSaleNo = nextSaleSequence(entry.profileId, state.sales);
  saveState();
  renderAll();
  toast(internalSyncResult?.action === "cancelled"
    ? `Sales bill ${entry.number} cancelled. Internal purchase cancelled`
    : `Sales bill ${entry.number} cancelled`);
}

function creditableSales(profileId = activeProfileId(), includeSaleId = "") {
  return state.sales
    .filter(sale => sale.profileId === profileId && !isCancelledEntry(sale))
    .filter(sale => sale.id === includeSaleId || sale.lines.some((line, index) => creditAvailableQuantity(sale.id, index) > 0))
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function creditAvailableQuantity(saleId, originalLineIndex, excludeCreditNoteId = "") {
  const sale = state.sales.find(entry => entry.id === saleId);
  const billed = num(sale?.lines?.[originalLineIndex]?.qty);
  const credited = state.creditNotes
    .filter(note => note.id !== excludeCreditNoteId && note.originalSaleId === saleId && !isCancelledEntry(note))
    .reduce((sum, note) => sum + (note.lines || []).reduce((lineSum, line) => (
      num(line.originalLineIndex) === originalLineIndex ? lineSum + num(line.qty) : lineSum
    ), 0), 0);
  return Math.max(0, round2(billed - credited));
}

function creditNoteSaleOption(sale, selectedId = "") {
  const buyer = partyById(sale.partyId) || {};
  return `<option value="${sale.id}" ${sale.id === selectedId ? "selected" : ""}>${escapeHtml(`${sale.number} | ${buyer.name || "Buyer"} | ${formatInvoiceDate(sale.date)} | ${money(invoicePayableTotal(sale))}`)}</option>`;
}

function openCreditNote(id = null, saleId = "") {
  editingCreditNoteId = id;
  const existing = id ? state.creditNotes.find(note => note.id === id) : null;
  if (existing && isCancelledEntry(existing)) return toast("Cancelled credit note cannot be edited");
  const selectedSaleId = existing?.originalSaleId || saleId;
  const sales = creditableSales(activeProfileId(), selectedSaleId);
  if (!sales.length) return toast("No sales invoice has quantity available for credit");
  const form = $("#creditNoteForm");
  form.reset();
  form.elements.originalSaleId.innerHTML = sales.map(sale => creditNoteSaleOption(sale, selectedSaleId || sales[0].id)).join("");
  form.elements.originalSaleId.value = selectedSaleId || sales[0].id;
  form.elements.originalSaleId.disabled = Boolean(existing);
  form.elements.date.value = existing?.date || today();
  form.elements.number.value = existing?.number || nextCreditNoteNumber(activeProfileId());
  form.elements.reason.value = existing?.reason || "Goods Returned";
  form.elements.restock.checked = existing ? existing.restock !== false : true;
  $("#creditNoteDialogTitle").textContent = existing ? "Edit Credit Note" : "New Credit Note";
  form.elements.originalSaleId.onchange = () => renderCreditNoteEditor(null);
  form.elements.reason.onchange = () => {
    form.elements.restock.checked = ["Goods Returned", "Defective Goods"].includes(form.elements.reason.value);
    updateCreditNoteTotals();
  };
  form.elements.restock.onchange = updateCreditNoteTotals;
  renderCreditNoteEditor(existing);
  $("#creditNoteDialog").showModal();
  if (window.lucide) lucide.createIcons();
}

function renderCreditNoteEditor(existing = null) {
  const form = $("#creditNoteForm");
  const sale = state.sales.find(entry => entry.id === form.elements.originalSaleId.value);
  if (!sale) return;
  const buyer = partyById(sale.partyId) || {};
  $("#creditOriginalSummary").innerHTML = `
    <div><span>Buyer</span><strong>${escapeHtml(buyer.name || "-")}</strong></div>
    <div><span>GSTIN</span><strong>${escapeHtml(buyer.gstin || "-")}</strong></div>
    <div><span>Invoice</span><strong>${escapeHtml(sale.number || "-")}</strong></div>
    <div><span>Invoice Total</span><strong>${money(invoicePayableTotal(sale))}</strong></div>`;
  $("#creditNoteLineRows").innerHTML = (sale.lines || []).map((line, originalLineIndex) => {
    const item = state.items.find(row => row.id === line.itemId) || {};
    const savedLine = existing?.lines?.find(row => num(row.originalLineIndex) === originalLineIndex);
    const available = creditAvailableQuantity(sale.id, originalLineIndex, existing?.id || "");
    const selected = num(savedLine?.qty) > 0;
    const quantity = selected ? num(savedLine.qty) : 0;
    const inclusiveRate = lineGrossRate(savedLine || line);
    const imeis = savedLine?.imeiNumbers || (selected && quantity === num(line.qty) ? line.imeiNumbers || "" : "");
    return `<div class="credit-note-line ${selected ? "selected" : ""}" data-original-line-index="${originalLineIndex}" data-item-id="${escapeHtml(line.itemId || "")}" data-item-name="${escapeHtml(line.itemName || item.name || itemNameByLine(line, item, originalLineIndex + 1))}" data-hsn="${escapeHtml(lineHsn(line, item))}" data-gst-rate="${num(line.gstRate)}" data-max-qty="${available}">
      <label class="credit-line-select" title="Include this item"><input class="credit-line-enabled" type="checkbox" ${selected ? "checked" : ""}><span></span></label>
      <div class="credit-line-product"><strong>${escapeHtml(line.itemName || item.name || itemNameByLine(line, item, originalLineIndex + 1))}</strong><small>HSN ${escapeHtml(lineHsn(line, item))} | Billed ${formatQty(line.qty)} | Available ${formatQty(available)}</small></div>
      <label>Credit Qty<input class="credit-line-qty" type="number" min="0" max="${available}" step="0.01" value="${quantity}" ${selected ? "" : "disabled"}></label>
      <label>Rate per quantity<input class="credit-line-rate" type="number" min="0" step="0.01" value="${inclusiveRate}" ${selected ? "" : "disabled"}></label>
      <label>GST<input class="credit-line-gst" value="${num(line.gstRate)}%" readonly></label>
      <label class="credit-line-imei">Returned IMEI (optional)<input class="credit-line-imeis" value="${escapeHtml(imeis)}" ${selected ? "" : "disabled"}></label>
      <div class="credit-line-total"><span>Credit</span><strong>${money(selected ? quantity * inclusiveRate : 0)}</strong></div>
    </div>`;
  }).join("");
  $$(".credit-note-line").forEach(row => {
    row.querySelector(".credit-line-enabled").addEventListener("change", () => toggleCreditNoteLine(row));
    row.querySelector(".credit-line-qty").addEventListener("input", updateCreditNoteTotals);
    row.querySelector(".credit-line-rate").addEventListener("input", updateCreditNoteTotals);
  });
  updateCreditNoteTotals();
}

function toggleCreditNoteLine(row) {
  const enabled = row.querySelector(".credit-line-enabled").checked;
  row.classList.toggle("selected", enabled);
  [".credit-line-qty", ".credit-line-rate", ".credit-line-imeis"].forEach(selector => {
    row.querySelector(selector).disabled = !enabled;
  });
  const qty = row.querySelector(".credit-line-qty");
  if (enabled && num(qty.value) <= 0) qty.value = row.dataset.maxQty;
  if (!enabled) qty.value = 0;
  updateCreditNoteTotals();
}

function collectCreditNoteLines(validate = false) {
  const lines = [];
  for (const row of $$(".credit-note-line")) {
    if (!row.querySelector(".credit-line-enabled").checked) continue;
    const qty = num(row.querySelector(".credit-line-qty").value);
    const maxQty = num(row.dataset.maxQty);
    const grossRate = num(row.querySelector(".credit-line-rate").value);
    const gstRate = num(row.dataset.gstRate);
    if (validate && (!qty || qty > maxQty)) {
      row.querySelector(".credit-line-qty").focus();
      throw new Error(`Credit quantity must be between 0 and ${formatQty(maxQty)}`);
    }
    if (validate && grossRate <= 0) {
      row.querySelector(".credit-line-rate").focus();
      throw new Error("Rate per quantity is required");
    }
    if (!qty || !grossRate) continue;
    lines.push({
      originalLineIndex: num(row.dataset.originalLineIndex),
      itemId: row.dataset.itemId || "",
      itemName: row.dataset.itemName || "",
      hsn: normalizeLineHsn(row.dataset.hsn) || DEFAULT_SALE_HSN,
      qty,
      rate: taxableRateFromInclusive(grossRate, gstRate),
      grossRate,
      gstRate,
      imeiNumbers: row.querySelector(".credit-line-imeis").value.trim()
    });
  }
  return lines;
}

function creditNoteCalculation() {
  const form = $("#creditNoteForm");
  const sale = state.sales.find(entry => entry.id === form.elements.originalSaleId.value);
  const profile = profileById(sale?.profileId || activeProfileId());
  const buyer = partyById(sale?.partyId) || {};
  const lines = collectCreditNoteLines(false);
  const calculated = calculateEntryTotals(lines, profile, buyer, "sale");
  const rawTotal = round2(calculated.taxable + calculated.gst);
  const roundOff = Math.abs(Math.round(rawTotal) - rawTotal) >= 0.01 ? round2(Math.round(rawTotal) - rawTotal) : 0;
  return { lines, calculated, roundOff, total: round2(rawTotal + roundOff) };
}

function updateCreditNoteTotals() {
  if (!$("#creditNoteForm")) return;
  const { lines, calculated, roundOff, total } = creditNoteCalculation();
  $("#creditNoteTaxable").textContent = money(calculated.taxable);
  $("#creditNoteCgst").textContent = money(calculated.cgst);
  $("#creditNoteSgst").textContent = money(calculated.sgst);
  $("#creditNoteIgst").textContent = money(calculated.igst);
  $("#creditNoteGst").textContent = money(calculated.gst);
  $("#creditNoteRoundOff").textContent = money(roundOff);
  $("#creditNoteTotal").textContent = money(total);
  $$(".credit-note-line").forEach(row => {
    const enabled = row.querySelector(".credit-line-enabled").checked;
    const amount = enabled ? num(row.querySelector(".credit-line-qty").value) * num(row.querySelector(".credit-line-rate").value) : 0;
    row.querySelector(".credit-line-total strong").textContent = money(amount);
  });
  return lines;
}

async function saveCreditNote(event) {
  event.preventDefault();
  const form = $("#creditNoteForm");
  const existing = editingCreditNoteId ? state.creditNotes.find(note => note.id === editingCreditNoteId) : null;
  const sale = state.sales.find(entry => entry.id === form.elements.originalSaleId.value);
  if (!sale || isCancelledEntry(sale)) return toast("Select an active sales invoice");
  let lines;
  try {
    lines = collectCreditNoteLines(true);
  } catch (error) {
    return toast(error.message);
  }
  if (!lines.length) return toast("Select at least one item to credit");
  const profile = profileById(sale.profileId);
  const buyer = partyById(sale.partyId) || {};
  const calculated = calculateEntryTotals(lines, profile, buyer, "sale");
  const rawTotal = round2(calculated.taxable + calculated.gst);
  const roundOff = Math.abs(Math.round(rawTotal) - rawTotal) >= 0.01 ? round2(Math.round(rawTotal) - rawTotal) : 0;
  const requestedNumber = existing?.number || form.elements.number.value;
  const number = creditNoteNumberExists(requestedNumber, existing?.id || "")
    ? nextCreditNoteNumber(sale.profileId, existing?.id || "")
    : requestedNumber;
  const note = entityWithLocalMeta({
    ...(existing || {}),
    id: existing?.id || uid(),
    profileId: sale.profileId,
    partyId: sale.partyId,
    date: form.elements.date.value,
    number,
    status: "Active",
    originalSaleId: sale.id,
    originalInvoiceNumber: sale.number,
    originalInvoiceDate: sale.date,
    reason: form.elements.reason.value,
    restock: form.elements.restock.checked,
    lines,
    ...calculated,
    roundOff,
    total: round2(rawTotal + roundOff),
    sellerGstin: normalizeGstin(profile.gstin),
    buyerGstin: normalizeGstin(buyer.gstin),
    billToSnapshot: clone(sale.billToSnapshot || partyAddressSnapshot(buyer)),
    shipToSnapshot: clone(sale.shipToSnapshot || sale.billToSnapshot || partyAddressSnapshot(buyer)),
    shipToSameAsBillTo: sale.shipToSameAsBillTo ?? true,
    shipToAddressId: sale.shipToAddressId || "",
    source: "sales-credit-note",
    rateIncludesGst: true,
    cancelled: false,
    cancelledAt: ""
  }, existing);
  const index = state.creditNotes.findIndex(row => row.id === note.id);
  if (index >= 0) state.creditNotes[index] = note;
  else state.creditNotes.push(note);
  const internalSyncResult = syncInternalPurchaseReturnForCreditNote(note, existing);
  entryMonthFilters.creditNote = entryMonthKey(note);
  entryMonthFilters.purchaseReturn = entryMonthKey(note);
  saveState();
  $("#creditNoteDialog").close();
  renderAll();
  const canSyncNow = cloudReadyForSync();
  let synced = canSyncNow ? await syncCloudNow(false) : false;
  if (canSyncNow && !synced) {
    try {
      if (internalSyncResult?.supplierParty) await syncSinglePartyToCloud(internalSyncResult.supplierParty);
      const results = [await syncSingleEntryToCloud("creditNote", note)];
      for (const purchaseReturn of internalSyncResult?.affectedPurchaseReturns || []) {
        results.push(await syncSingleEntryToCloud("purchaseReturn", purchaseReturn));
      }
      synced = results.every(Boolean);
    } catch (error) {
      lastCloudSyncError = cloudErrorText(error);
      console.warn("Credit note cloud sync failed", error);
    }
  }
  if (canSyncNow && !synced) markEntrySyncFailed("creditNote", note.id);
  const internalText = internalSyncResult?.action === "created"
    ? ". Internal purchase return created"
    : internalSyncResult?.action === "updated"
      ? ". Internal purchase return updated"
      : "";
  toast(synced ? `Credit note saved and synced${internalText}` : canSyncNow ? `Credit note saved locally. Cloud sync failed${cloudFailureSuffix()}${internalText}` : `Credit note saved locally${internalText}`);
}

function cancelCreditNote(id) {
  const note = state.creditNotes.find(row => row.id === id);
  if (!note) return toast("Credit note not found");
  if (isCancelledEntry(note)) return toast("Credit note is already cancelled");
  if (!confirm(`Cancel credit note ${note.number}? This number will not be reused.`)) return;
  note.cancelled = true;
  note.cancelledAt = new Date().toISOString();
  note.status = "Cancelled";
  const internalSyncResult = cancelLinkedPurchaseReturn(note, "Linked credit note was cancelled.");
  Object.assign(note, entityWithLocalMeta(note, note));
  saveState();
  renderAll();
  toast(internalSyncResult?.action === "cancelled"
    ? `Credit note ${note.number} cancelled. Internal purchase return cancelled`
    : `Credit note ${note.number} cancelled`);
}

function openItem(id = null) {
  editingItemId = id;
  const item = state.items.find(row => row.id === id);
  const form = $("#itemForm");
  form.reset();
  ["name", "hsn", "gstRate", "saleRate", "purchaseRate", "openingStock", "minStock"].forEach(key => {
    form.elements[key].value = key === "hsn"
      ? (normalizeLineHsn(item?.hsn) || DEFAULT_SALE_HSN)
      : (item?.[key] ?? "");
  });
  $("#itemDialog").showModal();
  if (window.lucide) lucide.createIcons();
}

function saveItem(event) {
  event.preventDefault();
  const form = $("#itemForm");
  const existingItem = state.items.find(row => row.id === editingItemId);
  const item = entityWithLocalMeta({
    id: editingItemId || uid(),
    name: form.elements.name.value.trim(),
    hsn: normalizeLineHsn(form.elements.hsn.value) || DEFAULT_SALE_HSN,
    gstRate: num(form.elements.gstRate.value),
    saleRate: num(form.elements.saleRate.value),
    purchaseRate: num(form.elements.purchaseRate.value),
    openingStock: num(form.elements.openingStock.value),
    minStock: num(form.elements.minStock.value)
  }, existingItem);
  const index = state.items.findIndex(row => row.id === item.id);
  if (index >= 0) state.items[index] = item;
  else state.items.push(item);
  saveState();
  $("#itemDialog").close();
  renderAll();
  toast("Item saved");
}

function deleteItem(id) {
  const used = [...state.sales, ...state.creditNotes, ...state.purchases, ...state.purchaseReturns, ...state.purchaseOrders]
    .some(entry => entry.lines.some(line => line.itemId === id));
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

function openBuyerFromEntry() {
  if (entryMode !== "sale") return;
  openParty(null, {
    type: "Customer",
    title: "New Buyer",
    saveLabel: "Save Buyer",
    context: "entry-buyer"
  });
}

function openParty(id = null, options = {}) {
  editingPartyId = id;
  partyDialogContext = options.context ? { source: options.context } : null;
  const party = state.parties.find(row => row.id === id);
  const form = $("#partyForm");
  form.reset();
  $("#partyDialogTitle").textContent = party ? "Edit Buyer / Supplier" : (options.title || "New Party");
  $("#savePartyBtn span").textContent = options.saveLabel || "Save Party";
  ["name", "type", "gstin", "phone", "email", "place", "address"].forEach(key => {
    form.elements[key].value = key === "type"
      ? normalizePartyType(party?.type || options.type || "Customer")
      : (party?.[key] ?? "");
  });
  form.elements.shippingAddresses.value = formatShippingAddressesForForm(party?.shippingAddresses || []);
  form.elements.supplierLocations.value = formatSupplierLocationsForForm(party?.supplierLocations || []);
  partyAliasDraft = partyAliasList(party || {});
  renderPartyAliasManager();
  $("#partyDialog").showModal();
  if (window.lucide) lucide.createIcons();
}

function handlePartyAliasInputKeydown(event) {
  if (event.key !== "Enter" && event.key !== ",") return;
  event.preventDefault();
  addPartyAliasFromInput();
}

function addPartyAliasFromInput() {
  commitPendingPartyAliasInput();
}

function commitPendingPartyAliasInput() {
  const input = $("#partyAliasInput");
  const values = splitPartyAliases(input.value);
  if (!values.length) {
    renderPartyAliasManager("Enter a short name first");
    return false;
  }
  let added = false;
  let blocked = false;
  values.forEach(alias => {
    if (addPartyAlias(alias)) added = true;
    else blocked = true;
  });
  input.value = "";
  if (added) renderPartyAliasManager("Alias added");
  return !blocked;
}

function addPartyAlias(alias) {
  const cleaned = cleanPartyAlias(alias);
  if (!cleaned) return false;
  const normalized = normalizeForAlias(cleaned);
  if (GENERIC_PARTY_ALIASES.has(normalized)) {
    renderPartyAliasManager("That short name is too common");
    return false;
  }
  if (partyAliasDraft.some(item => normalizeForAlias(item) === normalized)) {
    renderPartyAliasManager("Short name already added");
    return false;
  }
  const conflict = partyAliasConflict(cleaned, editingPartyId);
  if (conflict) {
    renderPartyAliasManager(`Already used by ${conflict.name}`);
    return false;
  }
  partyAliasDraft.push(cleaned);
  return true;
}

function renderPartyAliasManager(message = "") {
  const form = $("#partyForm");
  const aliases = cleanPartyAliasList(partyAliasDraft);
  partyAliasDraft = aliases;
  form.elements.aliases.value = aliases.join("\n");
  const chipHolder = $("#partyAliasChips");
  chipHolder.innerHTML = aliases.map(alias => `
    <span class="alias-chip">
      <span>${escapeHtml(alias)}</span>
      <button type="button" class="mini-btn" data-party-alias="${escapeHtml(alias)}" title="Remove ${escapeHtml(alias)}"><i data-lucide="x"></i></button>
    </span>
  `).join("") || `<span class="alias-empty">No short names added</span>`;
  $$("[data-party-alias]", chipHolder).forEach(button => {
    button.addEventListener("click", () => {
      removePartyAlias(button.dataset.partyAlias);
    });
  });
  $("#partyAliasHint").textContent = message || aliasManagerHint();
  if (window.lucide) lucide.createIcons();
}

function removePartyAlias(alias) {
  const normalized = normalizeForAlias(alias);
  partyAliasDraft = partyAliasDraft.filter(item => normalizeForAlias(item) !== normalized);
  renderPartyAliasManager("Alias removed");
}

function aliasManagerHint() {
  return "Example: Lakshmi, LJT, Lakshmi Jeyapandi.";
}

function partyAliasConflict(alias, ownerId = editingPartyId) {
  const normalized = normalizeForAlias(alias);
  if (!normalized) return null;
  return state.parties.find(party => party.id !== ownerId && partyAliases(party).some(existing => normalizeForAlias(existing) === normalized)) || null;
}

function splitPartyAliases(value) {
  return String(value || "")
    .split(/[\n,;]/)
    .map(cleanPartyAlias)
    .filter(Boolean);
}

function cleanPartyAlias(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanPartyAliasList(value) {
  const aliases = Array.isArray(value) ? value : splitPartyAliases(value);
  const seen = new Set();
  return aliases.map(cleanPartyAlias).filter(alias => {
    const normalized = normalizeForAlias(alias);
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function saveParty(event) {
  event.preventDefault();
  const form = $("#partyForm");
  if ($("#partyAliasInput").value.trim() && !commitPendingPartyAliasInput()) return;
  renderPartyAliasManager();
  const type = normalizePartyType(form.elements.type.value);
  const gstin = normalizeGstin(form.elements.gstin.value);
  const address = form.elements.address.value.trim();
  if (isBuyerType(type) && !isValidGstin(gstin)) {
    toast("Buyer GSTIN is required");
    return;
  }
  if (isBuyerType(type) && !address) {
    toast("Buyer address is required");
    return;
  }
  const duplicate = findPartyByGstin(gstin, editingPartyId);
  if (duplicate) {
    toast(`GSTIN already exists for ${duplicate.name}`);
    return;
  }
  const existingParty = state.parties.find(row => row.id === editingPartyId);
  const party = entityWithLocalMeta({
    id: editingPartyId || uid(),
    name: form.elements.name.value.trim(),
    type,
    gstin,
    aliases: cleanPartyAliasList(form.elements.aliases.value).join("\n"),
    phone: form.elements.phone.value.trim(),
    email: form.elements.email.value.trim(),
    place: form.elements.place.value.trim() || stateNameFromGstin(gstin) || "",
    address,
    shippingAddresses: parseShippingAddressesFromText(
      form.elements.shippingAddresses.value,
      existingParty?.shippingAddresses || []
    ),
    supplierLocations: parseSupplierLocationsFromText(
      form.elements.supplierLocations.value,
      existingParty?.supplierLocations || []
    )
  }, existingParty);
  const index = state.parties.findIndex(row => row.id === party.id);
  if (index >= 0) state.parties[index] = party;
  else state.parties.push(party);
  saveState();
  $("#partyDialog").close();
  renderAll();
  selectSavedPartyInOpenEntry(party);
  toast("Party saved for all GST companies");
  partyDialogContext = null;
}

function isBuyerType(type) {
  return type === "Customer" || type === "Both";
}

function findPartyByGstin(gstin, excludeId = "") {
  const normalized = normalizeGstin(gstin);
  if (!normalized) return null;
  return state.parties.find(party => party.id !== excludeId && normalizeGstin(party.gstin) === normalized) || null;
}

function ensurePartyRole(party, role) {
  if (!party) return;
  const nextType = mergePartyTypes(party.type, role);
  if (normalizePartyType(party.type) === nextType) return;
  Object.assign(party, entityWithLocalMeta({
    ...party,
    type: nextType
  }, party));
}

function selectSavedPartyInOpenEntry(party) {
  if (partyDialogContext?.source !== "entry-buyer" || !$("#entryDialog")?.open || entryMode !== "sale") return;
  const form = $("#entryForm");
  form.elements.partyId.innerHTML = partyOptions("sale", party.id);
  form.elements.partyId.value = party.id;
  setupEntryPartySearch("sale", party.id);
  setupSalesAddressPanel("sale", null);
  updateEntryTotals();
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

function renderTallySync() {
  const view = $("#tallySyncView");
  if (!view || !window.TallySync) return;
  const profile = activeProfile();
  const settings = window.TallySync.normalizeSettings(profile.tallySettings || {}, profile);
  const companyLabel = $("#tallyCompanyLabel");
  if (companyLabel) companyLabel.textContent = `${profile.businessName || profile.label} - ${profile.gstin || "GSTIN not entered"}`;
  const form = $("#tallySettingsForm");
  if (form && !form.contains(document.activeElement)) {
    Object.entries(settings).forEach(([name, value]) => {
      if (form.elements[name]) form.elements[name].value = value;
    });
  }
  const fromInput = $("#tallyFromDate");
  const toInput = $("#tallyToDate");
  if (fromInput && !fromInput.value) fromInput.value = `${currentMonthKey()}-01`;
  if (toInput && !toInput.value) toInput.value = today();
  renderTallySummary();
  renderTallyImportReview();
  renderTallyHistory();
}

function renderTallySummary() {
  const summary = $("#tallySyncSummary");
  if (!summary) return;
  const profileId = activeProfileId();
  const pending = tallyVoucherCandidates(profileId, "", "", false).length;
  const runs = state.tallySyncRuns
    .filter(run => run.profileId === profileId)
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  const lastImport = runs.find(run => /-import$/.test(run.runType));
  const imported = runs.filter(run => run.status === "Imported" || run.status === "Applied").length;
  summary.innerHTML = `
    <div><span>Last Import</span><strong>${lastImport ? formatTallyRunDate(lastImport.createdAt) : "-"}</strong><small>${lastImport ? `${num(lastImport.documentCount)} documents` : "No import yet"}</small></div>
    <div><span>Ready to Export</span><strong>${pending}</strong><small>new documents</small></div>
    <div><span>Completed</span><strong>${imported}</strong><small>sync runs</small></div>
  `;
}

function tallySettingsFromForm() {
  const form = $("#tallySettingsForm");
  const profile = activeProfile();
  if (!form || !window.TallySync) return profile.tallySettings || {};
  const values = {};
  Object.keys(window.TallySync.defaultSettings(profile)).forEach(name => {
    values[name] = form.elements[name]?.value?.trim() || "";
  });
  return window.TallySync.normalizeSettings(values, profile);
}

function saveTallySettings(event) {
  event?.preventDefault();
  const profile = activeProfile();
  profile.tallySettings = tallySettingsFromForm();
  profile.tallySettingsUpdatedAt = new Date().toISOString();
  saveState();
  renderTallySync();
  toast("Tally settings saved");
}

function persistTallySettingsFromForm() {
  const profile = activeProfile();
  profile.tallySettings = tallySettingsFromForm();
  profile.tallySettingsUpdatedAt = new Date().toISOString();
  return profile.tallySettings;
}

function tallyPartyRoles(profileId) {
  const roles = new Map();
  const add = (entries, role) => entries.filter(entry => entry.profileId === profileId).forEach(entry => {
    const current = roles.get(entry.partyId) || { customer: false, supplier: false };
    current[role] = true;
    roles.set(entry.partyId, current);
  });
  add(state.sales, "customer");
  add(state.creditNotes, "customer");
  add(state.purchases, "supplier");
  add(state.purchaseReturns, "supplier");
  return roles;
}

function tallyMasterParties(profileId = activeProfileId()) {
  const roles = tallyPartyRoles(profileId);
  return state.parties.map(party => {
    const role = roles.get(party.id) || {};
    const supplierOnly = role.supplier && !role.customer;
    return {
      ...party,
      state: stateNameFromGstin(party.gstin) || party.place || "",
      tallyParent: supplierOnly ? "Sundry Creditors" : "Sundry Debtors"
    };
  });
}

function tallyMasterItems() {
  return state.items.map(item => ({
    ...item,
    hsn: normalizeLineHsn(item.hsn) || DEFAULT_SALE_HSN,
    gstRate: num(item.gstRate) || DEFAULT_SALE_GST_RATE
  }));
}

function exportTallyMasters() {
  if (!window.TallySync) return toast("Tally XML module is not ready");
  const profile = activeProfile();
  const settings = persistTallySettingsFromForm();
  const parties = tallyMasterParties(profile.id);
  const items = tallyMasterItems();
  const xmlText = window.TallySync.buildMastersXml({ profile, settings, parties, items });
  const fileName = `TALLY_${tallyFileSlug(profile.businessName)}_MASTERS_${today().replaceAll("-", "")}.xml`;
  const run = createTallySyncRun({
    profileId: profile.id,
    runType: "masters-export",
    status: "Exported",
    fileName,
    documentCount: parties.length + items.length + 7,
    counts: { parties: parties.length, items: items.length, ledgers: 6, units: 1 },
    message: "Party, item, unit and accounting masters"
  });
  state.tallySyncRuns.unshift(run);
  saveState();
  downloadTallyXml(xmlText, fileName);
  renderTallySync();
  toast(`Tally masters exported: ${parties.length} parties, ${items.length} items`);
}

function tallyDocumentGroups() {
  return [
    ["sale", state.sales],
    ["purchase", state.purchases],
    ["creditNote", state.creditNotes],
    ["purchaseReturn", state.purchaseReturns]
  ];
}

function tallyEntryRef(kind, entry, operation = "create") {
  return `${kind}:${entry.id}${operation === "cancel" ? ":cancel" : ""}`;
}

function exportedTallyEntryRefs(profileId) {
  return new Set(state.tallySyncRuns
    .filter(run => run.profileId === profileId && run.runType === "vouchers-export" && run.status !== "Failed")
    .flatMap(run => run.entryRefs || []));
}

function tallyVoucherCandidates(profileId, fromDate = "", toDate = "", includeExported = false) {
  const exported = exportedTallyEntryRefs(profileId);
  const records = [];
  tallyDocumentGroups().forEach(([kind, entries]) => entries.forEach(entry => {
    if (entry.profileId !== profileId) return;
    if (fromDate && String(entry.date || "") < fromDate) return;
    if (toDate && String(entry.date || "") > toDate) return;
    const originalRef = tallyEntryRef(kind, entry);
    if (isCancelledEntry(entry)) {
      const cancelRef = tallyEntryRef(kind, entry, "cancel");
      if (exported.has(originalRef) && (includeExported || !exported.has(cancelRef))) {
        records.push({ kind, entry, operation: "cancel", ref: cancelRef });
      }
      return;
    }
    if (includeExported || !exported.has(originalRef)) {
      records.push({ kind, entry, operation: "create", ref: originalRef });
    }
  }));
  return records.sort((a, b) => String(a.entry.date || "").localeCompare(String(b.entry.date || "")) || String(a.entry.number || "").localeCompare(String(b.entry.number || "")));
}

function prepareTallyVoucherRecord(record) {
  const entry = record.entry || {};
  const party = state.parties.find(row => row.id === entry.partyId) || {};
  return {
    ...record,
    party: {
      ...party,
      state: stateNameFromGstin(party.gstin) || party.place || ""
    },
    entry: {
      ...entry,
      cancelled: record.operation === "cancel" || isCancelledEntry(entry),
      lines: (entry.lines || []).map((line, index) => {
        const item = state.items.find(row => row.id === line.itemId) || {};
        return {
          ...line,
          name: itemNameByLine(line, item, index + 1),
          hsn: lineHsn(line, item),
          taxable: lineTaxableAmount(line)
        };
      })
    }
  };
}

function tallyVoucherRecordsForExport(profileId, fromDate, toDate, includeExported) {
  return tallyVoucherCandidates(profileId, fromDate, toDate, includeExported)
    .map(prepareTallyVoucherRecord)
    .filter(record => record.operation === "cancel" || (record.party.name && record.entry.lines.length));
}

function exportTallyVouchers() {
  if (!window.TallySync) return toast("Tally XML module is not ready");
  const profile = activeProfile();
  const settings = persistTallySettingsFromForm();
  const fromDate = $("#tallyFromDate")?.value || "";
  const toDate = $("#tallyToDate")?.value || "";
  const includeExported = Boolean($("#tallyReexportDocuments")?.checked);
  if (!fromDate || !toDate) return toast("Select From and To dates");
  if (fromDate > toDate) return toast("From date cannot be after To date");
  const records = tallyVoucherRecordsForExport(profile.id, fromDate, toDate, includeExported);
  if (!records.length) return toast("No new Tally vouchers in this date range");
  const xmlText = window.TallySync.buildVouchersXml({ profile, settings, entries: records });
  const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 12);
  const fileName = `TALLY_${tallyFileSlug(profile.businessName)}_VOUCHERS_${fromDate.replaceAll("-", "")}_${toDate.replaceAll("-", "")}_${stamp}.xml`;
  const counts = tallyVoucherCounts(records);
  state.tallySyncRuns.unshift(createTallySyncRun({
    profileId: profile.id,
    runType: "vouchers-export",
    status: "Exported",
    fileName,
    fromDate,
    toDate,
    documentCount: records.length,
    entryRefs: records.map(record => record.ref),
    counts,
    message: tallyRunCountText(counts)
  }));
  saveState();
  downloadTallyXml(xmlText, fileName);
  renderTallySync();
  toast(`${records.length} Tally voucher${records.length === 1 ? "" : "s"} exported`);
}

function createTallySyncRun(values = {}) {
  return normalizeTallySyncRunForState(entityWithLocalMeta({
    id: uid(),
    profileId: activeProfileId(),
    runType: "vouchers-export",
    status: "Exported",
    fileName: "",
    sourceFile: "",
    fromDate: "",
    toDate: "",
    documentCount: 0,
    entryRefs: [],
    counts: {},
    message: "",
    ...values
  }));
}

function tallyVoucherCounts(records = []) {
  return records.reduce((counts, record) => {
    const key = record.operation === "cancel" ? "cancellations" : ({
      sale: "sales",
      purchase: "purchases",
      creditNote: "creditNotes",
      purchaseReturn: "purchaseReturns"
    }[record.kind] || "other");
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function tallyRunCountText(counts = {}) {
  const labels = {
    sales: "sales",
    purchases: "purchases",
    creditNotes: "credit notes",
    purchaseReturns: "purchase returns",
    cancellations: "cancellations",
    parties: "parties",
    items: "items",
    ledgers: "ledgers",
    units: "units",
    added: "added",
    updated: "updated",
    partiesAdded: "parties added",
    partiesUpdated: "parties updated",
    itemsAdded: "items added",
    itemsUpdated: "items updated",
    duplicates: "duplicates skipped",
    skipped: "vouchers skipped",
    internalPurchases: "internal purchases created",
    internalPurchaseReturns: "internal purchase returns created"
  };
  return Object.entries(counts)
    .filter(([, count]) => num(count) > 0)
    .map(([key, count]) => `${count} ${labels[key] || key}`)
    .join(" | ");
}

function downloadTallyXml(xmlText, fileName) {
  downloadBlob(new Blob([xmlText], { type: "application/xml;charset=utf-8" }), fileName);
}

function tallyFileSlug(value) {
  return String(value || "COMPANY")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 28) || "COMPANY";
}

async function handleTallyDataImport(event) {
  const file = event.target.files?.[0];
  if (!file || !window.TallySync) return;
  try {
    const text = await file.text();
    const profile = activeProfile();
    const result = window.TallySync.parseDataXml(text, {
      profile,
      settings: window.TallySync.normalizeSettings(profile.tallySettings || {}, profile)
    });
    pendingTallyImport = prepareTallyImportReview(result, file.name, profile.id);
    renderTallyImportReview();
    if (result.errors?.length) toast(result.errors[0]);
    else toast(`${result.vouchers.length} vouchers and ${result.parties.length + result.items.length} masters ready to review`);
  } catch (error) {
    pendingTallyImport = {
      parties: [],
      items: [],
      vouchers: [],
      warnings: [],
      errors: [error.message || "Unable to read Tally XML"],
      fileName: file.name,
      profileId: activeProfileId()
    };
    renderTallyImportReview();
    toast("Unable to read Tally XML");
  }
}

function prepareTallyImportReview(result, fileName, profileId) {
  const parties = result.parties || [];
  const profile = profileById(profileId);
  const companyMismatch = result.companyName && !tallyCompanyMatchesProfile(result.companyName, profile);
  return {
    ...result,
    errors: uniqueMessages([
      ...(result.errors || []),
      companyMismatch
        ? `This XML belongs to ${result.companyName}. Select that GST company or update its Tally Company Name mapping before importing.`
        : ""
    ]),
    fileName,
    profileId,
    profileName: profileName(profileId),
    vouchers: (result.vouchers || []).map(voucher => reviewTallyImportVoucher(voucher, parties, profileId))
  };
}

function tallyCompanyMatchesProfile(companyName, profile = {}) {
  const actual = normalizeMergeText(companyName);
  if (!actual) return true;
  return [
    profile.tallySettings?.companyName,
    profile.businessName,
    profile.legalName,
    profile.label
  ].filter(Boolean).some(value => {
    const expected = normalizeMergeText(value);
    return actual === expected || actual.startsWith(`${expected} `);
  });
}

function reviewTallyImportVoucher(voucher, importedParties, profileId) {
  const party = tallyImportPartySource(voucher, importedParties);
  const existing = findExistingTallyVoucher(voucher, party, profileId);
  const messages = [...(voucher.warnings || [])];
  const saleSide = voucher.kind === "sale" || voucher.kind === "creditNote";
  if (!saleSide && !isValidGstin(party.gstin)) messages.push("Supplier GSTIN is missing; review the supplier master after import.");
  if (!saleSide && !String(party.address || "").trim()) messages.push("Supplier address is missing; review the supplier master after import.");
  let importAction = "add";
  if (voucher.cancelled) {
    if (!existing) {
      importAction = "skip";
      messages.push("The cancelled voucher is not already in the billing app.");
    } else if (isCancelledEntry(existing)) {
      importAction = "duplicate";
      messages.push("This voucher is already cancelled in the billing app.");
    } else {
      importAction = "cancel";
    }
  } else if (existing) {
    importAction = "duplicate";
    messages.push("This voucher already exists and will not be imported again.");
  } else if (!party?.name) {
    importAction = "skip";
    messages.push("Party ledger is missing.");
  } else if (saleSide && !isValidGstin(party.gstin)) {
    importAction = "skip";
    messages.push("Buyer GSTIN is required for B2B sales and credit notes.");
  } else if (saleSide && !String(party.address || "").trim()) {
    importAction = "skip";
    messages.push("Buyer address is required for B2B sales and credit notes.");
  } else if (!(voucher.lines || []).length) {
    importAction = "skip";
    messages.push("Inventory item lines are missing.");
  } else if (!num(voucher.total)) {
    importAction = "skip";
    messages.push("Voucher total is missing.");
  }
  return {
    ...voucher,
    resolvedParty: party,
    existingId: existing?.id || "",
    importAction,
    importMessages: uniqueMessages(messages)
  };
}

function tallyImportPartySource(voucher, importedParties = []) {
  const gstin = normalizeGstin(voucher.partyGstin);
  const master = importedParties.find(party => gstin && normalizeGstin(party.gstin) === gstin)
    || importedParties.find(party => normalizeMergeText(party.name) === normalizeMergeText(voucher.partyName))
    || state.parties.find(party => gstin && normalizeGstin(party.gstin) === gstin)
    || state.parties.find(party => normalizeMergeText(party.name) === normalizeMergeText(voucher.partyName));
  return {
    ...(master || {}),
    name: voucher.partyName || master?.name || "",
    gstin: gstin || normalizeGstin(master?.gstin),
    address: voucher.partyAddress || master?.address || "",
    place: voucher.partyState || master?.place || stateNameFromGstin(gstin || master?.gstin) || "",
    pincode: voucher.partyPincode || master?.pincode || ""
  };
}

function tallyVoucherImportKey(voucher) {
  const identity = voucher.tallyId || [voucher.number, voucher.date, voucher.partyGstin || voucher.partyName].join("|");
  return `${voucher.kind}|${normalizeMergeText(identity)}`;
}

function findExistingTallyVoucher(voucher, party, profileId = activeProfileId()) {
  const list = entryList(voucher.kind);
  const importKey = tallyVoucherImportKey(voucher);
  const number = normalizePurchaseInvoiceNumber(voucher.number);
  const partyKey = tallyImportPartyKey(party);
  return list.find(entry => entry.profileId === profileId && entry.tallyImportKey === importKey)
    || list.find(entry => {
      if (entry.profileId !== profileId || normalizePurchaseInvoiceNumber(entry.number) !== number) return false;
      if (voucher.kind === "sale" || voucher.kind === "creditNote") return true;
      return partyKey && tallyImportPartyKey(partyById(entry.partyId) || {}) === partyKey;
    })
    || null;
}

function tallyImportPartyKey(party = {}) {
  const gstin = normalizeGstin(party.gstin);
  return gstin ? `gstin:${gstin}` : (party.name ? `name:${normalizeMergeText(party.name)}` : "");
}

function tallyPendingImportCounts() {
  const counts = {
    sales: 0,
    purchases: 0,
    creditNotes: 0,
    purchaseReturns: 0,
    cancellations: 0,
    duplicates: 0,
    skipped: num(pendingTallyImport?.skippedVoucherCount)
  };
  (pendingTallyImport?.vouchers || []).forEach(voucher => {
    if (voucher.importAction === "cancel") counts.cancellations += 1;
    else if (voucher.importAction === "duplicate") counts.duplicates += 1;
    else if (voucher.importAction === "skip") counts.skipped += 1;
    else {
      const countKey = ({ sale: "sales", purchase: "purchases", creditNote: "creditNotes", purchaseReturn: "purchaseReturns" })[voucher.kind];
      if (countKey) counts[countKey] += 1;
      else counts.skipped += 1;
    }
  });
  return counts;
}

function renderTallyImportReview() {
  const panel = $("#tallyImportReview");
  const applyButton = $("#tallyApplyImportBtn");
  const discardButton = $("#tallyDiscardImportBtn");
  if (!panel || !applyButton || !discardButton) return;
  if (!pendingTallyImport) {
    panel.hidden = true;
    applyButton.hidden = true;
    discardButton.hidden = true;
    panel.innerHTML = "";
    return;
  }
  const errors = pendingTallyImport.errors || [];
  const parties = pendingTallyImport.parties || [];
  const items = pendingTallyImport.items || [];
  const vouchers = pendingTallyImport.vouchers || [];
  const warnings = pendingTallyImport.warnings || [];
  const counts = tallyPendingImportCounts();
  const actionable = counts.sales + counts.purchases + counts.creditNotes + counts.purchaseReturns + counts.cancellations;
  panel.hidden = false;
  applyButton.hidden = Boolean(errors.length || (!parties.length && !items.length && !actionable));
  discardButton.hidden = false;
  const applyLabel = applyButton.querySelector("span");
  if (applyLabel) applyLabel.textContent = "Apply Tally Data";
  panel.innerHTML = errors.length ? `
    <div class="tally-import-error"><i data-lucide="circle-alert"></i><strong>${escapeHtml(errors[0])}</strong></div>
  ` : `
    <div class="tally-import-review-head">
      <div><span>File</span><strong>${escapeHtml(pendingTallyImport.fileName || "Tally XML")}</strong></div>
      <div><span>Parties</span><strong>${parties.length}</strong></div>
      <div><span>Items</span><strong>${items.length}</strong></div>
      <div><span>Vouchers</span><strong>${vouchers.length}</strong></div>
    </div>
    <div class="tally-import-count-grid">
      <div><span>Sales</span><strong>${counts.sales}</strong></div>
      <div><span>Purchases</span><strong>${counts.purchases}</strong></div>
      <div><span>Credit Notes</span><strong>${counts.creditNotes}</strong></div>
      <div><span>Debit Notes</span><strong>${counts.purchaseReturns}</strong></div>
      <div class="tally-count-muted"><span>Duplicates</span><strong>${counts.duplicates}</strong></div>
      <div class="${counts.skipped ? "tally-count-warn" : "tally-count-muted"}"><span>Skipped</span><strong>${counts.skipped}</strong></div>
    </div>
    <div class="tally-import-preview-list">
      ${vouchers.slice(0, 8).map(voucher => `
        <div class="tally-voucher-preview">
          <i data-lucide="${tallyVoucherImportIcon(voucher.kind)}"></i>
          <span><strong>${escapeHtml(voucher.number)} | ${escapeHtml(voucher.partyName || "Party missing")}</strong><small>${escapeHtml(tallyVoucherKindLabel(voucher.kind))} | ${escapeHtml(voucher.date)} | ${money(voucher.total)}</small></span>
          <em class="tally-import-state ${escapeHtml(voucher.importAction)}">${escapeHtml(tallyImportActionLabel(voucher.importAction))}</em>
        </div>
      `).join("")}
    </div>
    ${(warnings.length || vouchers.some(voucher => voucher.importMessages?.length)) ? `
      <div class="tally-import-warning-list">
        ${uniqueMessages([
          ...warnings,
          ...vouchers.flatMap(voucher => (voucher.importMessages || []).map(message => `${voucher.number}: ${message}`))
        ]).slice(0, 8).map(message => `<div><i data-lucide="triangle-alert"></i><span>${escapeHtml(message)}</span></div>`).join("")}
      </div>
    ` : ""}
  `;
  if (window.lucide) lucide.createIcons();
}

function tallyVoucherImportIcon(kind) {
  if (kind === "purchase") return "shopping-cart";
  if (kind === "creditNote") return "rotate-ccw";
  if (kind === "purchaseReturn") return "undo-2";
  return "receipt-text";
}

function tallyVoucherKindLabel(kind) {
  if (kind === "purchase") return "Purchase";
  if (kind === "creditNote") return "Credit Note";
  if (kind === "purchaseReturn") return "Debit Note";
  return "Sale";
}

function tallyImportActionLabel(action) {
  if (action === "cancel") return "Cancel";
  if (action === "duplicate") return "Exists";
  if (action === "skip") return "Skipped";
  return "Import";
}

async function applyTallyDataImport() {
  if (!pendingTallyImport || pendingTallyImport.errors?.length) return;
  if (pendingTallyImport.profileId !== activeProfileId()) {
    toast(`Select ${pendingTallyImport.profileName || "the original company"} before applying this file`);
    return;
  }
  const counts = {
    partiesAdded: 0,
    partiesUpdated: 0,
    itemsAdded: 0,
    itemsUpdated: 0,
    sales: 0,
    purchases: 0,
    creditNotes: 0,
    purchaseReturns: 0,
    cancellations: 0,
    duplicates: 0,
    skipped: num(pendingTallyImport.skippedVoucherCount),
    internalPurchases: 0,
    internalPurchaseReturns: 0
  };
  (pendingTallyImport.parties || []).forEach(imported => {
    upsertTallyImportedParty(imported, imported.type || "Customer", counts);
  });
  (pendingTallyImport.items || []).forEach(imported => {
    upsertTallyImportedItem(imported, "", counts);
  });

  (pendingTallyImport.vouchers || []).forEach(reviewedVoucher => {
    const partySource = tallyImportPartySource(reviewedVoucher, pendingTallyImport.parties || []);
    const existing = findExistingTallyVoucher(reviewedVoucher, partySource, pendingTallyImport.profileId);
    if (reviewedVoucher.importAction === "skip") {
      counts.skipped += 1;
      return;
    }
    if (reviewedVoucher.importAction === "duplicate" || (existing && reviewedVoucher.importAction !== "cancel")) {
      counts.duplicates += 1;
      return;
    }
    if (reviewedVoucher.importAction === "cancel") {
      if (existing && !isCancelledEntry(existing)) {
        applyTallyVoucherCancellation(reviewedVoucher, existing);
        counts.cancellations += 1;
      } else {
        counts.duplicates += 1;
      }
      return;
    }
    const role = reviewedVoucher.kind === "sale" || reviewedVoucher.kind === "creditNote" ? "Customer" : "Supplier";
    const party = upsertTallyImportedParty(partySource, role, counts);
    if (!party) {
      counts.skipped += 1;
      return;
    }
    const entry = tallyVoucherToEntry(reviewedVoucher, party, counts);
    if (!entry) {
      counts.skipped += 1;
      return;
    }
    entryList(reviewedVoucher.kind).push(entry);
    const countKey = ({ sale: "sales", purchase: "purchases", creditNote: "creditNotes", purchaseReturn: "purchaseReturns" })[reviewedVoucher.kind];
    if (countKey) counts[countKey] += 1;
    if (reviewedVoucher.kind === "sale") {
      const result = syncInternalPurchaseForSale(entry);
      if (result.action === "created") counts.internalPurchases += 1;
    } else if (reviewedVoucher.kind === "creditNote") {
      const result = syncInternalPurchaseReturnForCreditNote(entry);
      if (result.action === "created") counts.internalPurchaseReturns += 1;
    }
  });

  syncSaleNumberingForProfiles([profileById(pendingTallyImport.profileId)], state.sales);
  const importedDocuments = counts.sales + counts.purchases + counts.creditNotes + counts.purchaseReturns + counts.cancellations;
  state.tallySyncRuns.unshift(createTallySyncRun({
    profileId: pendingTallyImport.profileId,
    runType: "data-import",
    status: "Applied",
    sourceFile: pendingTallyImport.fileName || "",
    documentCount: importedDocuments,
    counts,
    message: tallyInboundRunMessage(counts)
  }));
  pendingTallyImport = null;
  const input = $("#tallyMasterImportInput");
  if (input) input.value = "";
  saveState();
  renderAll();
  const canSync = cloudReadyForSync();
  const synced = canSync ? await syncCloudNow(false) : false;
  if (canSync && !synced) toast(`Tally data saved locally; cloud sync failed: ${lastCloudSyncError || "try Sync Now"}`);
  else if (synced) toast(`${importedDocuments} Tally document${importedDocuments === 1 ? "" : "s"} imported and synced`);
  else toast(`${importedDocuments} Tally document${importedDocuments === 1 ? "" : "s"} imported locally`);
}

function upsertTallyImportedParty(imported, role, counts) {
  if (!String(imported?.name || "").trim()) return null;
  const gstin = normalizeGstin(imported.gstin);
  const existing = state.parties.find(party => gstin && normalizeGstin(party.gstin) === gstin)
    || state.parties.find(party => normalizeMergeText(party.name) === normalizeMergeText(imported.name));
  const source = {
    ...imported,
    type: mergePartyTypes(imported.type || role, role),
    aliases: cleanPartyAliasList([...(partyAliasList(imported)), imported.name]).join("\n"),
    address: imported.address || imported.pincode || ""
  };
  if (existing) {
    const before = cloudAuditComparable(existing);
    mergeExistingParty(existing, source);
    if (cloudAuditComparable(existing) !== before) {
      Object.assign(existing, entityWithLocalMeta(existing, existing));
      counts.partiesUpdated += 1;
    }
    return existing;
  }
  const party = normalizePartyForState(entityWithLocalMeta({ id: uid(), ...source }));
  state.parties.push(party);
  counts.partiesAdded += 1;
  return party;
}

function upsertTallyImportedItem(imported, voucherKind, counts) {
  if (!String(imported?.name || imported?.itemName || "").trim()) return null;
  const name = imported.name || imported.itemName;
  const existing = state.items.find(item => normalizeMergeText(item.name) === normalizeMergeText(name));
  const importedHsn = normalizeLineHsn(imported.hsn) || DEFAULT_SALE_HSN;
  const inclusiveRate = num(imported.grossRate);
  const saleSide = voucherKind === "sale" || voucherKind === "creditNote";
  const purchaseSide = voucherKind === "purchase" || voucherKind === "purchaseReturn";
  if (existing) {
    const before = cloudAuditComparable(existing);
    if ((!normalizeLineHsn(existing.hsn) || normalizeLineHsn(existing.hsn) === DEFAULT_SALE_HSN) && importedHsn !== DEFAULT_SALE_HSN) existing.hsn = importedHsn;
    if (!num(existing.gstRate) && num(imported.gstRate)) existing.gstRate = num(imported.gstRate);
    if (saleSide && !num(existing.saleRate) && inclusiveRate) existing.saleRate = inclusiveRate;
    if (purchaseSide && !num(existing.purchaseRate) && inclusiveRate) existing.purchaseRate = inclusiveRate;
    if (cloudAuditComparable(existing) !== before) {
      Object.assign(existing, entityWithLocalMeta(existing, existing));
      counts.itemsUpdated += 1;
    }
    return existing;
  }
  const item = entityWithLocalMeta({
    id: uid(),
    name,
    hsn: importedHsn,
    gstRate: num(imported.gstRate) || DEFAULT_SALE_GST_RATE,
    saleRate: saleSide ? inclusiveRate : 0,
    purchaseRate: purchaseSide ? inclusiveRate : 0,
    openingStock: 0,
    minStock: 0
  });
  state.items.push(item);
  counts.itemsAdded += 1;
  return item;
}

function tallyVoucherToEntry(voucher, party, counts) {
  const profile = profileById(pendingTallyImport.profileId);
  const lines = (voucher.lines || []).map(line => {
    const item = upsertTallyImportedItem(line, voucher.kind, counts);
    if (!item) return null;
    const qty = Math.abs(num(line.qty));
    const rate = qty ? round2(num(line.taxable) / qty) : num(line.rate);
    const gstRate = num(line.gstRate) || num(item.gstRate) || DEFAULT_SALE_GST_RATE;
    return {
      itemId: item.id,
      itemName: item.name,
      hsn: normalizeLineHsn(line.hsn) || normalizeLineHsn(item.hsn) || DEFAULT_SALE_HSN,
      qty,
      rate,
      grossRate: num(line.grossRate) || inclusiveRateFromTaxable(rate, gstRate),
      gstRate,
      imeiNumbers: []
    };
  }).filter(Boolean);
  if (!lines.length) return null;
  const saleSide = voucher.kind === "sale" || voucher.kind === "creditNote";
  const address = normalizeAddressSnapshot({
    name: party.name,
    gstin: party.gstin,
    address: voucher.partyAddress || party.address,
    place: voucher.partyState || party.place,
    state: voucher.partyState || stateNameFromGstin(party.gstin) || party.place
  });
  const entry = entityWithLocalMeta({
    id: uid(),
    date: voucher.date,
    number: voucher.number,
    profileId: profile.id,
    partyId: party.id,
    status: "Active",
    paymentSourceId: "",
    paymentDate: "",
    paymentReference: "",
    notes: "",
    lines,
    taxable: num(voucher.taxable),
    cgst: num(voucher.cgst),
    sgst: num(voucher.sgst),
    igst: num(voucher.igst),
    gst: num(voucher.gst),
    roundOff: num(voucher.roundOff),
    total: num(voucher.total),
    taxMode: num(voucher.igst) > 0 ? "IGST" : "CGST_SGST",
    attachments: [],
    source: "tally-import",
    rateIncludesGst: true,
    sellerGstin: normalizeGstin(saleSide ? profile.gstin : party.gstin),
    buyerGstin: normalizeGstin(saleSide ? party.gstin : profile.gstin),
    billToSnapshot: saleSide ? address : null,
    shipToSnapshot: saleSide ? address : null,
    shipToSameAsBillTo: true,
    shipToAddressId: "",
    reviewMessages: [],
    reviewStatus: "Ready",
    tallyImportKey: tallyVoucherImportKey(voucher),
    tallyId: voucher.tallyId || "",
    tallyVoucherType: voucher.voucherType || "",
    tallySourceFile: pendingTallyImport.fileName || "",
    tallyNarration: voucher.narration || "",
    originalSaleId: "",
    originalInvoiceNumber: "",
    originalInvoiceDate: "",
    reason: voucher.narration || "Imported from Tally",
    restock: true,
    cancelled: false,
    cancelledAt: ""
  });
  normalizeEntryForState(entry, voucher.kind, state.parties, state.items);
  return entry;
}

function applyTallyVoucherCancellation(voucher, existing) {
  const previous = clone(existing);
  existing.cancelled = true;
  existing.cancelledAt = new Date().toISOString();
  existing.status = "Cancelled";
  existing.reviewStatus = "Cancelled";
  existing.tallyImportKey = tallyVoucherImportKey(voucher);
  existing.tallyId = voucher.tallyId || existing.tallyId || "";
  existing.tallySourceFile = pendingTallyImport.fileName || existing.tallySourceFile || "";
  existing.reviewMessages = uniqueMessages([...(existing.reviewMessages || []), "Cancelled in Tally and synced to the billing app."]);
  Object.assign(existing, entityWithLocalMeta(existing, existing));
  if (voucher.kind === "sale") syncInternalPurchaseForSale(existing, previous);
  if (voucher.kind === "creditNote") syncInternalPurchaseReturnForCreditNote(existing, previous);
}

function tallyInboundRunMessage(counts) {
  const documents = tallyRunCountText(counts);
  return documents || "Tally data reviewed; no new documents were added";
}

function discardTallyDataImport() {
  pendingTallyImport = null;
  const input = $("#tallyMasterImportInput");
  if (input) input.value = "";
  renderTallyImportReview();
}

function renderTallyHistory() {
  const container = $("#tallyHistory");
  if (!container) return;
  const runs = state.tallySyncRuns
    .filter(run => run.profileId === activeProfileId())
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  if (!runs.length) {
    container.innerHTML = `<div class="tally-empty"><i data-lucide="history"></i><strong>No Tally activity yet</strong></div>`;
    if (window.lucide) lucide.createIcons();
    return;
  }
  container.innerHTML = runs.map(run => `
    <div class="tally-history-row">
      <div class="tally-history-icon"><i data-lucide="${tallyRunIsImport(run) ? "file-input" : "file-output"}"></i></div>
      <div class="tally-history-main">
        <strong>${escapeHtml(tallyRunTypeLabel(run.runType))}</strong>
        <small>${escapeHtml(run.fileName || run.sourceFile || "Tally XML")}</small>
        <span>${escapeHtml(run.message || tallyRunCountText(run.counts))}</span>
      </div>
      <div class="tally-history-meta">
        <time>${escapeHtml(formatTallyRunDate(run.createdAt))}</time>
        <span class="tally-status ${run.status.toLowerCase()}">${escapeHtml(run.status)}</span>
      </div>
      <div class="tally-history-actions">
        ${!tallyRunIsImport(run) ? `<button class="icon-btn" type="button" data-tally-action="download" data-run-id="${escapeHtml(run.id)}" title="Download again"><i data-lucide="download"></i></button>` : ""}
        ${run.status === "Exported" ? `<button class="secondary-btn compact-btn" type="button" data-tally-action="confirm" data-run-id="${escapeHtml(run.id)}"><i data-lucide="check"></i><span>Imported</span></button>` : ""}
      </div>
    </div>
  `).join("");
  if (window.lucide) lucide.createIcons();
}

function tallyRunIsImport(run = {}) {
  return /-import$/.test(run.runType || "");
}

function tallyRunTypeLabel(runType) {
  if (runType === "masters-export") return "Masters Export";
  if (runType === "masters-import") return "Masters Import";
  if (runType === "data-import") return "Tally Data Import";
  return "Voucher Export";
}

function formatTallyRunDate(value) {
  const date = new Date(value || "");
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

function handleTallyHistoryAction(event) {
  const button = event.target.closest("[data-tally-action]");
  if (!button) return;
  const run = state.tallySyncRuns.find(row => row.id === button.dataset.runId);
  if (!run) return toast("Tally history entry not found");
  if (button.dataset.tallyAction === "confirm") {
    Object.assign(run, entityWithLocalMeta({ ...run, status: "Imported" }, run));
    saveState();
    renderTallySync();
    toast("Tally import confirmed");
    return;
  }
  redownloadTallyRun(run);
}

function redownloadTallyRun(run) {
  if (!window.TallySync) return;
  if (tallyRunIsImport(run)) return toast("Imported source files are not stored for re-download");
  const profile = profileById(run.profileId);
  const settings = window.TallySync.normalizeSettings(profile.tallySettings || {}, profile);
  if (run.runType === "masters-export") {
    const xmlText = window.TallySync.buildMastersXml({
      profile,
      settings,
      parties: tallyMasterParties(profile.id),
      items: tallyMasterItems()
    });
    downloadTallyXml(xmlText, run.fileName || `TALLY_${tallyFileSlug(profile.businessName)}_MASTERS.xml`);
    return;
  }
  const records = (run.entryRefs || []).map(tallyRecordFromRef).filter(Boolean).map(prepareTallyVoucherRecord);
  if (!records.length) return toast("The vouchers in this export are no longer available");
  const xmlText = window.TallySync.buildVouchersXml({ profile, settings, entries: records });
  downloadTallyXml(xmlText, run.fileName || `TALLY_${tallyFileSlug(profile.businessName)}_VOUCHERS.xml`);
}

function tallyRecordFromRef(reference) {
  const [kind, id, action] = String(reference || "").split(":");
  const entry = entryList(kind).find(row => row.id === id);
  if (!entry) return null;
  return { kind, entry, operation: action === "cancel" ? "cancel" : "create", ref: reference };
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
  profile.nextSaleNo = saleNumberRule(profile.id)
    ? nextSaleSequence(profile.id, state.sales)
    : Math.max(1, num(form.elements.nextSaleNo.value));
  profile.nextPurchaseNo = Math.max(1, num(form.elements.nextPurchaseNo.value));
  profile.nextPoNo = Math.max(1, num(form.elements.nextPoNo.value));
  state.settings.currency = form.elements.currency.value.trim() || "Rs.";
  state.settings.reportEmails = form.elements.reportEmails.value.trim();
  state.settings.ewayDefaults = {
    ...(state.settings.ewayDefaults || {}),
    vehicleNo: form.elements.ewayVehicleNo.value.trim().toUpperCase(),
    distanceKm: Math.max(0, num(form.elements.ewayDistanceKm.value))
  };
  setActiveProfileId(profile.id);
  saveState();
  renderAll();
  toast("GST profile saved");
}

function showInvoice(id, kind) {
  const entry = entryList(kind).find(row => row.id === id);
  if (!entry) return toast(kind === "po" ? "Purchase order not found" : "Invoice not found");
  const party = state.parties.find(row => row.id === entry.partyId) || {};
  const settings = profileById(entry.profileId);
  if (kind === "po") {
    showPurchaseOrder(entry, party, settings);
    return;
  }
  const isCreditNote = kind === "creditNote";
  const billTo = normalizeAddressSnapshot(entry.billToSnapshot || partyAddressSnapshot(party));
  const shipTo = normalizeAddressSnapshot(entry.shipToSnapshot || billTo);
  const totalQty = entry.lines.reduce((sum, line) => sum + num(line.qty), 0);
  const roundOff = invoiceRoundOff(entry);
  const payableTotal = invoicePayableTotal(entry);
  currentInvoiceFileName = isCreditNote ? creditNotePdfFileName(entry, party) : invoicePdfFileName(entry, party);
  currentInvoiceShareContext = { entry, party, settings, documentKind: isCreditNote ? "creditNote" : "invoice" };
  $("#invoicePrintArea").innerHTML = `
    <div class="invoice-preview-frame">
      <div class="invoice-sheet modern-invoice">
      <div class="modern-invoice-head">
        <div class="invoice-brand-block">
          ${firmLogoMarkup(settings, "invoice-firm-logo")}
          <div class="invoice-title-block">
            <span class="invoice-kicker">${isCreditNote ? "Sales Adjustment" : "Sales Bill"}</span>
            <h2>${isCreditNote ? "Credit Note" : "Tax Invoice"}</h2>
            <p>${escapeHtml(settings.businessName || settings.label || state.selectedOrg?.name || "Business")}</p>
          </div>
        </div>
        <div class="modern-header-metrics">
          ${invoiceMetaCell(isCreditNote ? "Credit Note No." : "Invoice No.", entry.number, "Dated", formatInvoiceDate(entry.date))}
        </div>
      </div>
      <div class="invoice-seller-strip">
        ${invoiceSellerBlock(settings)}
      </div>
      <div class="modern-party-grid">
        ${invoicePartyBlock("Buyer (Bill to)", billTo)}
        ${invoicePartyBlock("Consignee (Ship to)", shipTo)}
      </div>
      ${isCreditNote ? `<div class="credit-note-reference-strip"><span>Original Invoice</span><strong>${escapeHtml(entry.originalInvoiceNumber || "-")}</strong><span>Dated</span><strong>${escapeHtml(formatInvoiceDate(entry.originalInvoiceDate) || "-")}</strong><span>Reason</span><strong>${escapeHtml(entry.reason || "-")}</strong></div>` : ""}
      ${isCancelledEntry(entry) ? `<div class="invoice-cancelled-banner">CANCELLED</div>` : ""}
      <table class="invoice-items-table">
        <thead>
          <tr>
            <th class="sl-col">Sl<br>No.</th>
            <th>Description of Goods</th>
            <th>HSN/SAC</th>
            <th class="num">Quantity</th>
            <th class="num">Rate per<br>quantity</th>
            <th class="num">Taxable</th>
            <th class="num">GST %</th>
            <th class="num">GST Amt</th>
            <th class="num">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${entry.lines.map((line, index) => {
            const item = state.items.find(row => row.id === line.itemId) || {};
            const taxable = lineTaxableAmount(line);
            const gstAmount = lineGstAmount(line);
            const lineTotal = lineGrossAmount(line);
            return `<tr class="invoice-item-row">
              <td class="num">${index + 1}</td>
              <td class="item-name">${escapeHtml(item.name || itemName(line.itemId))}${invoiceImeiMarkup(line.imeiNumbers)}</td>
              <td>${escapeHtml(lineHsn(line, item))}</td>
              <td class="num strong">${formatQty(line.qty)}</td>
              <td class="num">${formatInvoiceMoney(lineGrossRate(line))}</td>
              <td class="num strong">${formatInvoiceMoney(taxable)}</td>
              <td class="num">${num(line.gstRate)}%</td>
              <td class="num">${formatInvoiceMoney(gstAmount)}</td>
              <td class="num strong">${formatInvoiceMoney(lineTotal)}</td>
            </tr>`;
          }).join("")}
          ${invoiceAdjustmentRows(roundOff)}
          <tr class="invoice-total-row">
            <td></td>
            <td class="num">Total</td>
            <td></td>
            <td class="num strong">${formatQty(totalQty)}</td>
            <td></td>
            <td class="num strong">${formatInvoiceMoney(entry.taxable)}</td>
            <td></td>
            <td class="num strong">${formatInvoiceMoney(entry.gst)}</td>
            <td class="num grand-total">Rs. ${formatInvoiceMoney(payableTotal)}</td>
          </tr>
        </tbody>
      </table>
      <div class="amount-words-row">
        <span>${isCreditNote ? "Credit Amount (in words)" : "Amount Chargeable (in words)"}</span>
        <em>E. &amp; O.E</em>
        <strong>${escapeHtml(amountInWords(payableTotal))}</strong>
      </div>
      ${invoiceTaxSummary(entry)}
      <div class="tax-words-row">
        <span>Tax Amount (in words) :</span>
        <strong>${escapeHtml(amountInWords(entry.gst))}</strong>
      </div>
      ${isCreditNote ? "" : invoiceBankBlock(settings)}
      <div class="invoice-footer-grid">
        <div>
          <span>Declaration</span>
          <p>${isCreditNote ? `This credit note is issued against invoice ${escapeHtml(entry.originalInvoiceNumber || "-")} for ${escapeHtml(entry.reason || "the stated adjustment")}.` : "We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct."}</p>
        </div>
        <div class="signature-box">
          <strong>for ${escapeHtml(settings.businessName || settings.label)}</strong>
          <span>Authorised Signatory</span>
        </div>
      </div>
      <p class="computer-note">This is a Computer Generated ${isCreditNote ? "Credit Note" : "Invoice"}</p>
      </div>
    </div>
  `;
  $("#invoiceDialog").showModal();
  $("#invoicePrintArea").scrollTo({ top: 0, left: 0 });
  requestAnimationFrame(fitInvoicePreview);
}

function showPurchaseOrder(entry, supplier, settings) {
  const details = purchaseOrderTemplateDetails(entry, supplier, settings);
  const totalQty = entry.lines.reduce((sum, line) => sum + num(line.qty), 0);
  const payableTotal = invoicePayableTotal(entry);
  currentInvoiceFileName = purchaseOrderPdfFileName(entry, supplier);
  currentInvoiceShareContext = { entry, party: supplier, settings, documentKind: "po" };
  $("#invoicePrintArea").innerHTML = `
    <div class="invoice-preview-frame">
      <div class="invoice-sheet po-template">
        <header class="po-template-head">
          <div class="po-gstin-line">GSTIN&nbsp;&nbsp;:&nbsp;&nbsp;${escapeHtml(settings.gstin || "-")}</div>
          <div class="po-logo-box">${firmLogoMarkup(settings, "po-firm-logo")}</div>
          <div class="po-company-block">
            <h2>Purchase Order</h2>
            <h1>${escapeHtml(details.companyName)}</h1>
            <p>${escapeHtml(details.companyAddress)}</p>
            <p>PAN : ${escapeHtml(details.companyPan || "-")}</p>
            <p><em>email : ${escapeHtml(settings.email || "-")}</em></p>
          </div>
        </header>
        <section class="po-info-grid">
          <div class="po-party-box">
            <h3>Party Details :</h3>
            <strong>${escapeHtml(supplier.name || "-")}</strong>
            <p>${escapeHtml(details.supplierAddress)}</p>
            ${poDetailLine("Party PAN", details.supplierPan)}
            ${poDetailLine("Party E-Mail ID", supplier.email)}
            ${poDetailLine("Party Mobile No", supplier.phone)}
            ${poDetailLine("Party AadhaarNo", "")}
            ${poDetailLine("Party State", details.supplierState)}
            ${poDetailLine("GSTIN / UIN", supplier.gstin)}
          </div>
          <div class="po-order-box">
            ${poOrderLine("Order No.", entry.number)}
            ${poOrderLine("Dated", formatInvoiceDate(entry.date))}
            ${poOrderLine("Terms of Payment", details.paymentTerms)}
            ${poOrderLine("Delivery Terms", details.deliveryTerms)}
            ${poOrderLine("Pickup Date", details.pickupDate)}
            ${poOrderLine("Delivery Date", details.deliveryDate)}
            ${poOrderLine("Dipatch from City", details.dispatchCity)}
            ${poOrderLine("Destination City", details.destinationCity)}
            <div class="po-bank-box">
              <strong>BANK DETAILS : ${escapeHtml(details.bankName)}</strong>
              <strong>Account No. : ${escapeHtml(details.accountNumber)}</strong>
              <strong>IFSC CODE : ${escapeHtml(details.ifsc)}</strong>
            </div>
          </div>
        </section>
        <table class="po-items-table">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Description of Goods</th>
              <th>Country of Origin</th>
              <th>HSN Code</th>
              <th>Qty.</th>
              <th>Unit</th>
              <th>Price<br>(Tax Inc.)</th>
              <th>Amount (Rs.)<br>(Tax Inc.)</th>
            </tr>
          </thead>
          <tbody>
            ${entry.lines.map((line, index) => {
              const item = state.items.find(row => row.id === line.itemId) || {};
              return `<tr>
                <td class="num">${index + 1}.</td>
                <td><strong>${escapeHtml(item.name || itemName(line.itemId))}</strong>${invoiceImeiMarkup(line.imeiNumbers)}</td>
                <td></td>
                <td>${escapeHtml(lineHsn(line, item))}</td>
                <td class="num">${formatPoQty(line.qty)}</td>
                <td>Pcs.</td>
                <td class="num">${formatInvoiceMoney(lineGrossRate(line))}</td>
                <td class="num">${formatInvoiceMoney(lineGrossAmount(line))}</td>
              </tr>`;
            }).join("")}
            <tr class="po-filler-row"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
          <tfoot>
            <tr class="po-grand-total-row">
              <td colspan="4" class="num">Grand Total</td>
              <td class="num">${formatPoQty(totalQty)}</td>
              <td>Pcs.</td>
              <td class="num">Rs.</td>
              <td class="num">${formatInvoiceMoney(payableTotal)}</td>
            </tr>
          </tfoot>
        </table>
        <section class="po-bottom-grid">
          <div>
            ${purchaseOrderTaxSummary(entry)}
            <p class="po-amount-words">${escapeHtml(amountInWords(payableTotal))}</p>
            <div class="po-terms">
              <h3>TERMS AND CONDITIONS:</h3>
              ${purchaseOrderTermsMarkup(entry)}
            </div>
          </div>
          <div class="po-signature">
            <strong>FOR ${escapeHtml(details.companyName)}</strong>
            <span>Authorised Signatory</span>
          </div>
        </section>
        </div>
    </div>
  `;
  $("#invoiceDialog").showModal();
  $("#invoicePrintArea").scrollTo({ top: 0, left: 0 });
  requestAnimationFrame(fitInvoicePreview);
}

function purchaseOrderTemplateDetails(entry, supplier, settings) {
  const bank = settings.bankDetails || {};
  const supplierAddress = supplier.address || supplier.place || "";
  const supplierState = stateNameFromGstin(supplier.gstin) || supplier.place || "";
  const companyState = settings.state || stateNameFromGstin(settings.gstin) || "";
  const parsedNotes = purchaseOrderParsedNotes(entry.notes || "");
  return {
    companyName: settings.businessName || settings.label || "Business",
    companyAddress: settings.address || companyState || "-",
    companyPan: panFromGstin(settings.gstin),
    supplierAddress: supplierAddress || "-",
    supplierPan: panFromGstin(supplier.gstin),
    supplierState: supplierState ? `${supplierState}${stateCodeFromGstin(supplier.gstin) ? ` (${stateCodeFromGstin(supplier.gstin)})` : ""}` : "",
    paymentTerms: parsedNotes.paymentTerms || "Full Advance",
    deliveryTerms: parsedNotes.deliveryTerms || "As agreed",
    pickupDate: parsedNotes.pickupDate || formatDateDots(entry.date),
    deliveryDate: parsedNotes.deliveryDate || "",
    dispatchCity: parsedNotes.dispatchCity || supplier.place || supplierState || "",
    destinationCity: parsedNotes.destinationCity || companyState || "",
    bankName: bank.bankName || "-",
    accountNumber: bank.accountNumber || "-",
    ifsc: bank.ifsc || "-"
  };
}

function purchaseOrderParsedNotes(notes) {
  const values = {};
  const labels = ["payment terms", "delivery terms", "pickup date", "delivery date", "dispatch city", "destination city"];
  const source = String(notes || "").replace(/\s+/g, " ").trim();
  labels.forEach((label, index) => {
    const nextLabels = labels.slice(index + 1).map(escapeRegExp).join("|");
    const pattern = nextLabels
      ? new RegExp(`${escapeRegExp(label)}\\s*[:=-]\\s*(.*?)(?=\\s+(?:${nextLabels})\\s*[:=-]|$)`, "i")
      : new RegExp(`${escapeRegExp(label)}\\s*[:=-]\\s*(.*)$`, "i");
    const match = source.match(pattern);
    if (!match) return;
    const key = label.replace(/\s+([a-z])/g, (_, char) => char.toUpperCase());
    values[key] = match[1].trim();
  });
  return values;
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function poDetailLine(label, value) {
  return `<div class="po-detail-line"><span>${escapeHtml(label)}</span><b>:</b><strong>${escapeHtml(value || "")}</strong></div>`;
}

function poOrderLine(label, value) {
  return `<div class="po-order-line"><span>${escapeHtml(label)}</span><b>:</b><strong>${escapeHtml(value || "")}</strong></div>`;
}

function panFromGstin(gstin) {
  const normalized = normalizeGstin(gstin);
  return normalized.length >= 12 ? normalized.slice(2, 12) : "";
}

function formatDateDots(dateValue) {
  if (!dateValue) return "";
  const [year, month, day] = String(dateValue).split("-");
  return year && month && day ? `${day}.${month}.${year}` : dateValue;
}

function lineGrossRate(line) {
  return lineInclusiveUnitRate(line);
}

function formatPoQty(value) {
  return Number(num(value)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function purchaseOrderTaxSummary(entry) {
  const groups = invoiceTaxGroups(entry);
  const isIgst = num(entry.igst) > 0;
  return `<table class="po-tax-summary">
    <thead>
      <tr>
        <th>HSN/SAC</th>
        <th>Tax Rate</th>
        <th>Taxable Amt.</th>
        <th>${isIgst ? "IGST Amt." : "CGST Amt."}</th>
        ${isIgst ? "" : "<th>SGST Amt.</th>"}
        <th>Total Tax</th>
      </tr>
    </thead>
    <tbody>
      ${groups.map(group => isIgst
        ? `<tr><td>${escapeHtml(group.hsn)}</td><td>${group.rate}%</td><td class="num">${formatInvoiceMoney(group.taxable)}</td><td class="num">${formatInvoiceMoney(group.tax)}</td><td class="num">${formatInvoiceMoney(group.tax)}</td></tr>`
        : `<tr><td>${escapeHtml(group.hsn)}</td><td>${group.rate}%</td><td class="num">${formatInvoiceMoney(group.taxable)}</td><td class="num">${formatInvoiceMoney(group.tax / 2)}</td><td class="num">${formatInvoiceMoney(group.tax / 2)}</td><td class="num">${formatInvoiceMoney(group.tax)}</td></tr>`
      ).join("")}
    </tbody>
  </table>`;
}

function purchaseOrderTermsList(entry) {
  const customTerms = String(entry?.notes || "")
    .split(/\r?\n/)
    .filter(line => /^term\s*\d*\s*[:=-]/i.test(line))
    .map(line => line.replace(/^term\s*\d*\s*[:=-]\s*/i, "").trim())
    .filter(Boolean);
  return customTerms.length ? customTerms : [
    "Following documents required during Dispatch of goods: GST Invoice, IMEI List, Eway bill, L.R Copy / Docket Copy, and corresponding PO Acceptance with Sign & Stamp.",
    "We will accept only clean, sealed, and non damage stock.",
    "Penalty per pcs will be charged if supplier fails to fulfill this deal for any reason whatsoever.",
    "Supplier to ensure timely filing of GSTR1 on or before 11th day of every month.",
    "The supplier must follow all compliances under GST law at all time.",
    "By accepting this PO the supplier declares that all terms and conditions mentioned in the PO will be strictly adhered to."
  ];
}

function purchaseOrderTermsMarkup(entry) {
  const terms = purchaseOrderTermsList(entry);
  return `<ol>${terms.map(term => `<li>${escapeHtml(term)}</li>`).join("")}</ol>`;
}

function closeInvoiceDialog() {
  $("#invoiceDialog").close();
  clearInvoicePreviewFit();
}

function printInvoice() {
  const dialog = $("#invoiceDialog");
  const printArea = $("#invoicePrintArea");
  if (!dialog?.open || !printArea?.textContent.trim()) {
    toast("Open an invoice before printing");
    return;
  }
  document.body.classList.add("invoice-print-mode");
  window.print();
}

function clearInvoicePrintMode() {
  document.body.classList.remove("invoice-print-mode");
  fitInvoicePreview();
}

function fitInvoicePreview() {
  const dialog = $("#invoiceDialog");
  const printArea = $("#invoicePrintArea");
  const frame = printArea?.querySelector(".invoice-preview-frame");
  const sheet = printArea?.querySelector(".modern-invoice, .po-template");
  if (!dialog?.open || !printArea || !frame || !sheet || document.body.classList.contains("invoice-print-mode") || document.body.classList.contains("invoice-pdf-capture")) return;
  clearInvoicePreviewFit();
  if (!window.matchMedia("(max-width: 820px)").matches) return;
  const areaStyle = getComputedStyle(printArea);
  const horizontalPadding = parseFloat(areaStyle.paddingLeft || "0") + parseFloat(areaStyle.paddingRight || "0");
  const availableWidth = Math.max(280, printArea.clientWidth - horizontalPadding);
  const sheetWidth = Math.max(1, sheet.scrollWidth || sheet.offsetWidth);
  const sheetHeight = Math.max(1, sheet.scrollHeight || sheet.offsetHeight);
  const scale = Math.min(1, availableWidth / sheetWidth);
  frame.style.width = `${sheetWidth}px`;
  frame.style.height = `${Math.ceil(sheetHeight * scale)}px`;
  frame.style.transform = `scale(${scale})`;
}

function clearInvoicePreviewFit() {
  const frame = $("#invoicePrintArea")?.querySelector(".invoice-preview-frame");
  if (!frame) return;
  frame.style.width = "";
  frame.style.height = "";
  frame.style.transform = "";
}

async function downloadInvoicePdf() {
  try {
    setInvoicePdfBusy(true);
    const blob = await buildInvoicePdfBlob();
    downloadBlob(blob, currentInvoiceFileName);
    toast("PDF downloaded");
  } catch (error) {
    console.error(error);
    toast("Could not create PDF. Try Print instead.");
  } finally {
    setInvoicePdfBusy(false);
  }
}

async function shareInvoicePdf() {
  try {
    setInvoicePdfBusy(true);
    const blob = await buildInvoicePdfBlob();
    const file = new File([blob], currentInvoiceFileName, { type: "application/pdf" });
    if (canTryNativeInvoiceFileShare(file)) {
      const shareTitle = currentInvoiceShareContext?.documentKind === "po"
        ? "Purchase Order PDF"
        : currentInvoiceShareContext?.documentKind === "creditNote"
          ? "Credit Note PDF"
          : "Invoice PDF";
      await shareNativeInvoiceFile(file, shareTitle);
      toast("PDF shared");
      return;
    }
    downloadBlob(blob, currentInvoiceFileName);
    toast("Sharing is not supported here. PDF downloaded.");
  } catch (error) {
    if (error?.name !== "AbortError") {
      console.error(error);
      toast("Could not share PDF");
    }
  } finally {
    setInvoicePdfBusy(false);
  }
}

async function shareInvoiceToWhatsApp() {
  if (!currentInvoiceShareContext?.entry) {
    toast("Open a document before sharing");
    return;
  }
  const message = invoiceWhatsAppMessage(currentInvoiceShareContext);
  const phone = whatsappPhoneNumber(currentInvoiceShareContext.party?.phone);
  try {
    setInvoicePdfBusy(true);
    const blob = await buildInvoicePdfBlob();
    const file = new File([blob], currentInvoiceFileName, { type: "application/pdf" });
    if (canTryNativeInvoiceFileShare(file)) {
      toast("Choose WhatsApp to send the PDF attachment");
      await shareNativeInvoiceFile(file, message);
      toast("PDF shared");
      return;
    }
    downloadBlob(blob, currentInvoiceFileName);
    openWhatsAppMessage(phone, message);
    toast("PDF downloaded. WhatsApp links can send text only.");
  } catch (error) {
    if (error?.name !== "AbortError") {
      console.error(error);
      openWhatsAppMessage(phone, message);
      toast("WhatsApp opened. Attach the downloaded PDF if needed.");
    }
  } finally {
    setInvoicePdfBusy(false);
  }
}

function canTryNativeInvoiceFileShare(file) {
  if (typeof navigator.share !== "function") return false;
  if (typeof navigator.canShare !== "function") return true;
  try {
    return navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
}

async function shareNativeInvoiceFile(file, text) {
  await navigator.share({
    title: currentInvoiceFileName.replace(/\.pdf$/i, ""),
    text,
    files: [file]
  });
}

function invoiceWhatsAppMessage({ entry, party, settings }) {
  const sellerName = settings.businessName || settings.label || "Nirvana Solutions";
  const isPo = currentInvoiceShareContext?.documentKind === "po";
  const isCreditNote = currentInvoiceShareContext?.documentKind === "creditNote";
  const buyerName = party.name || (isPo ? "Supplier" : "Customer");
  const amount = `${state.settings.currency || "Rs."} ${formatInvoiceMoney(invoicePayableTotal(entry))}`;
  if (isPo) {
    return [
      `Dear ${buyerName},`,
      `Please find Purchase Order ${entry.number || ""} dated ${formatInvoiceDate(entry.date)} from ${sellerName}.`,
      `PO amount: ${amount}.`,
      "Please find the purchase order PDF attached.",
      "Thank you."
    ].join("\n");
  }
  if (isCreditNote) {
    return [
      `Dear ${buyerName},`,
      `Please find Credit Note ${entry.number || ""} dated ${formatInvoiceDate(entry.date)} from ${sellerName}.`,
      `Original invoice: ${entry.originalInvoiceNumber || "-"}.`,
      `Credit amount: ${amount}.`,
      "Please find the credit note PDF attached.",
      "Thank you."
    ].join("\n");
  }
  return [
    `Dear ${buyerName},`,
    `Please find Tax Invoice ${entry.number || ""} dated ${formatInvoiceDate(entry.date)} from ${sellerName}.`,
    `Invoice amount: ${amount}.`,
    "Please find the invoice PDF attached.",
    "Thank you."
  ].join("\n");
}

function openWhatsAppMessage(phone, message) {
  const baseUrl = phone ? `https://wa.me/${phone}` : "https://wa.me/";
  const url = `${baseUrl}?text=${encodeURIComponent(message)}`;
  const opened = window.open(url, "_blank");
  if (opened) {
    try {
      opened.opener = null;
    } catch {}
  } else {
    window.location.href = url;
  }
}

function whatsappPhoneNumber(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  return digits.length >= 10 ? digits : "";
}

async function buildInvoicePdfBlob() {
  if (!currentInvoiceShareContext?.entry) throw new Error("Document is not open");
  const pdf = createInvoicePdfDocument();
  const pdfLogo = await loadFirmPdfLogo(
    currentInvoiceShareContext.settings,
    currentInvoiceShareContext.documentKind || "invoice"
  );
  renderInvoiceVectorPdf(pdf, { ...currentInvoiceShareContext, pdfLogo });
  return pdf.output("blob");
}

function createInvoicePdfDocument() {
  if (window.jspdf?.jsPDF) {
    return new window.jspdf.jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });
  }
  return new InvoiceVectorPdf();
}

// Offline-friendly vector PDF writer for invoices; avoids screenshot-based PDFs and external PDF libraries.
class InvoiceVectorPdf {
  constructor() {
    this.pageWidth = 210;
    this.pageHeight = 297;
    this.pageWidthPt = this.mmToPt(this.pageWidth);
    this.pageHeightPt = this.mmToPt(this.pageHeight);
    this.pages = [[]];
    this.images = [];
    this.pageIndex = 0;
    this.fontSize = 10;
    this.fontStyle = "normal";
    this.drawColor = [0, 0, 0];
    this.fillColor = [255, 255, 255];
    this.textColor = [0, 0, 0];
    this.lineWidth = 0.2;
    this.internal = {
      pageSize: {
        getWidth: () => this.pageWidth,
        getHeight: () => this.pageHeight
      }
    };
  }

  mmToPt(value) {
    return value * 72 / 25.4;
  }

  page() {
    return this.pages[this.pageIndex];
  }

  add(command) {
    this.page().push(command);
  }

  addPage() {
    this.pages.push([]);
    this.pageIndex = this.pages.length - 1;
  }

  addImage(imageData, _format, x, y, width, height) {
    if (!imageData?.bytes?.length) return;
    let image = this.images.find(row => row.key === imageData.key);
    if (!image) {
      image = {
        ...imageData,
        name: `Im${this.images.length + 1}`
      };
      this.images.push(image);
    }
    this.add(`q ${this.pt(width)} 0 0 ${this.pt(height)} ${this.pt(x)} ${this.yPt(y + height)} cm /${image.name} Do Q`);
  }

  setPage(pageNo) {
    this.pageIndex = Math.max(0, Math.min(this.pages.length - 1, pageNo - 1));
  }

  getNumberOfPages() {
    return this.pages.length;
  }

  setFont(_family, style = "normal") {
    this.fontStyle = style || "normal";
  }

  setFontSize(size) {
    this.fontSize = Number(size) || 10;
  }

  setDrawColor(r, g = r, b = r) {
    this.drawColor = [r, g, b].map(color => Math.max(0, Math.min(255, Number(color) || 0)));
  }

  setFillColor(r, g = r, b = r) {
    this.fillColor = [r, g, b].map(color => Math.max(0, Math.min(255, Number(color) || 0)));
  }

  setTextColor(r, g = r, b = r) {
    this.textColor = [r, g, b].map(color => Math.max(0, Math.min(255, Number(color) || 0)));
  }

  setLineWidth(width) {
    this.lineWidth = Number(width) || 0.2;
  }

  line(x1, y1, x2, y2) {
    this.writeStrokeState();
    this.add(`${this.pt(x1)} ${this.yPt(y1)} m ${this.pt(x2)} ${this.yPt(y2)} l S`);
  }

  rect(x, y, w, h, style = "S") {
    this.writeStrokeState();
    this.writeFillState();
    const op = style === "F" ? "f" : style === "FD" || style === "DF" ? "B" : "S";
    this.add(`${this.pt(x)} ${this.yPt(y + h)} ${this.pt(w)} ${this.pt(h)} re ${op}`);
  }

  text(value, x, y, options = {}) {
    const lines = Array.isArray(value) ? value : String(value ?? "").split("\n");
    const align = options.align || "left";
    const lineHeight = this.fontSize * 0.352777778 * 1.15;
    lines.forEach((line, index) => {
      const text = pdfClean(line);
      let tx = x;
      if (align === "right") tx -= this.getTextWidth(text);
      if (align === "center") tx -= this.getTextWidth(text) / 2;
      this.writeTextState();
      this.add(`BT /${this.fontKey()} ${this.num(this.fontSize)} Tf ${this.pt(tx)} ${this.yPt(y + (index * lineHeight))} Td (${this.escapePdfText(text)}) Tj ET`);
    });
  }

  splitTextToSize(value, maxWidth) {
    const sourceLines = String(value ?? "").split("\n");
    const result = [];
    sourceLines.forEach(sourceLine => {
      const words = pdfClean(sourceLine).split(/\s+/).filter(Boolean);
      let line = "";
      words.forEach(word => {
        const candidate = line ? `${line} ${word}` : word;
        if (this.getTextWidth(candidate) <= maxWidth) {
          line = candidate;
          return;
        }
        if (line) result.push(line);
        if (this.getTextWidth(word) <= maxWidth) {
          line = word;
          return;
        }
        const chunks = this.splitLongWord(word, maxWidth);
        result.push(...chunks.slice(0, -1));
        line = chunks[chunks.length - 1] || "";
      });
      if (line) result.push(line);
      if (!words.length) result.push("");
    });
    return result.length ? result : [""];
  }

  splitLongWord(word, maxWidth) {
    const chunks = [];
    let chunk = "";
    String(word || "").split("").forEach(char => {
      const candidate = `${chunk}${char}`;
      if (this.getTextWidth(candidate) <= maxWidth || !chunk) {
        chunk = candidate;
      } else {
        chunks.push(chunk);
        chunk = char;
      }
    });
    if (chunk) chunks.push(chunk);
    return chunks;
  }

  getTextWidth(value) {
    return String(value ?? "").length * this.fontSize * 0.352777778 * 0.48;
  }

  output(type) {
    const bytes = this.pdfBytes();
    if (type === "blob") return new Blob([bytes], { type: "application/pdf" });
    return new TextDecoder().decode(bytes);
  }

  pdfBytes() {
    const objects = [];
    const addObject = body => {
      objects.push(body);
      return objects.length;
    };
    const catalogId = addObject("<< /Type /Catalog /Pages 2 0 R >>");
    const pagesId = addObject("");
    const fontRegularId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
    const fontBoldId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
    const fontItalicId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>");
    const imageIds = new Map();
    this.images.forEach(image => {
      const hex = Array.from(image.bytes, byte => byte.toString(16).padStart(2, "0")).join("");
      const imageId = addObject(`<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter [/ASCIIHexDecode /DCTDecode] /Length ${hex.length + 2} >>\nstream\n${hex}>\nendstream`);
      imageIds.set(image.name, imageId);
    });
    const imageResources = this.images.length
      ? `/XObject << ${this.images.map(image => `/${image.name} ${imageIds.get(image.name)} 0 R`).join(" ")} >>`
      : "";
    const pageIds = [];
    this.pages.forEach(commands => {
      const stream = commands.join("\n");
      const contentId = addObject(`<< /Length ${this.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
      const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${this.num(this.pageWidthPt)} ${this.num(this.pageHeightPt)}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R /F3 ${fontItalicId} 0 R >> ${imageResources} >> /Contents ${contentId} 0 R >>`);
      pageIds.push(pageId);
    });
    objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map(id => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;
    const chunks = ["%PDF-1.4\n%Billing\n"];
    const offsets = [0];
    objects.forEach((body, index) => {
      offsets.push(this.byteLength(chunks.join("")));
      chunks.push(`${index + 1} 0 obj\n${body}\nendobj\n`);
    });
    const xrefOffset = this.byteLength(chunks.join(""));
    chunks.push(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`);
    for (let i = 1; i <= objects.length; i += 1) {
      chunks.push(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
    }
    chunks.push(`trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
    return new TextEncoder().encode(chunks.join(""));
  }

  writeStrokeState() {
    this.add(`${this.color(this.drawColor)} RG`);
    this.add(`${this.num(this.mmToPt(this.lineWidth))} w`);
  }

  writeFillState() {
    this.add(`${this.color(this.fillColor)} rg`);
  }

  writeTextState() {
    this.add(`${this.color(this.textColor)} rg`);
  }

  fontKey() {
    if (this.fontStyle === "bold") return "F2";
    if (this.fontStyle === "italic") return "F3";
    return "F1";
  }

  pt(value) {
    return this.num(this.mmToPt(value));
  }

  yPt(y) {
    return this.num(this.pageHeightPt - this.mmToPt(y));
  }

  num(value) {
    return (Math.round(Number(value) * 1000) / 1000).toFixed(3).replace(/\.?0+$/, "");
  }

  color(values) {
    return values.map(value => this.num(value / 255)).join(" ");
  }

  escapePdfText(value) {
    return String(value ?? "").replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  }

  byteLength(value) {
    return new TextEncoder().encode(value).length;
  }
}

function renderInvoiceVectorPdf(pdf, context) {
  if (context?.documentKind === "po") {
    renderPurchaseOrderVectorPdf(pdf, context);
    return;
  }
  const details = invoicePdfDetails(context);
  const layout = invoicePdfLayout(pdf);
  let y = renderInvoicePdfPageHeader(pdf, details, layout, false, true);
  y = renderInvoicePdfItems(pdf, details, layout, y);
  y = ensureInvoicePdfSpace(pdf, details, layout, y, 94, false);
  y = renderInvoicePdfTotals(pdf, details, layout, y);
  renderInvoicePdfFooters(pdf, layout, details);
}

function drawFirmPdfLogo(pdf, details, x, y, width, height) {
  if (!details.pdfLogo?.bytes?.length || typeof pdf.addImage !== "function") return false;
  if (pdf instanceof InvoiceVectorPdf) {
    pdf.addImage(details.pdfLogo, "JPEG", x, y, width, height);
  } else {
    pdf.addImage(details.pdfLogo.bytes, "JPEG", x, y, width, height, undefined, "FAST");
  }
  return true;
}

function renderPurchaseOrderVectorPdf(pdf, context) {
  const details = invoicePdfDetails(context);
  const poDetails = purchaseOrderTemplateDetails(details.entry, details.party, details.settings);
  details.poDetails = poDetails;
  const layout = invoicePdfLayout(pdf);
  let y = renderPurchaseOrderPdfHeader(pdf, details, layout, false);
  y = renderPurchaseOrderPdfItems(pdf, details, layout, y);
  y = renderPurchaseOrderPdfTotalsAndTerms(pdf, details, layout, y);
  renderPurchaseOrderPdfFooters(pdf, layout);
}

function renderPurchaseOrderPdfHeader(pdf, details, layout, continued = false) {
  const { margin, contentWidth, pageWidth } = layout;
  const po = details.poDetails;
  pdf.setTextColor(10, 10, 10);
  pdf.setDrawColor(10, 10, 10);
  pdf.setLineWidth(0.25);
  let y = margin;
  pdf.rect(margin, y, contentWidth, continued ? 26 : 112);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(continued ? 11 : 9);
  pdf.text(`GSTIN : ${pdfClean(details.settings.gstin || "-")}`, margin + 3, y + 6);
  pdf.setFontSize(continued ? 13 : 11);
  pdf.text("Purchase Order", pageWidth / 2, y + 8, { align: "center" });
  if (!continued && details.pdfLogo) {
    const logoWidth = 43;
    const logoHeight = logoWidth * details.pdfLogo.height / details.pdfLogo.width;
    drawFirmPdfLogo(pdf, details, margin + 3, y + 11, logoWidth, logoHeight);
  }
  pdf.setFontSize(continued ? 11 : 15);
  pdf.text(pdfClean(po.companyName || details.sellerName), pageWidth / 2, y + (continued ? 16 : 18), { align: "center" });
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(continued ? 7 : 8);
  if (continued) {
    pdf.text(`PO No.: ${pdfClean(details.entry.number || "-")}  |  Date: ${pdfClean(formatInvoiceDate(details.entry.date) || "-")}`, pageWidth / 2, y + 23, { align: "center" });
    return y + 31;
  }
  pdf.text(pdfWrap(pdf, po.companyAddress || "-", 94, 2), pageWidth / 2, y + 24, { align: "center" });
  pdf.text(`PAN : ${pdfClean(po.companyPan || "-")}`, pageWidth / 2, y + 34, { align: "center" });
  pdf.text(`email : ${pdfClean(details.settings.email || "-")}`, pageWidth / 2, y + 39, { align: "center" });
  y += 45;
  const boxWidth = contentWidth / 2;
  pdf.line(margin, y, margin + contentWidth, y);
  pdf.line(margin + boxWidth, y, margin + boxWidth, margin + 112);
  drawPurchaseOrderPdfPartyBox(pdf, details, margin + 2, y + 3, boxWidth - 4, 38);
  drawPurchaseOrderPdfOrderBox(pdf, details, margin + boxWidth + 2, y + 3, boxWidth - 4, 38);
  return margin + 116;
}

function drawPurchaseOrderPdfPartyBox(pdf, details, x, y, w, h) {
  const po = details.poDetails;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text("Party Details :", x, y + 4);
  pdf.setFontSize(8);
  pdf.text(pdfWrap(pdf, details.party.name || "-", w - 2, 2), x, y + 10);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6.8);
  pdf.text(pdfWrap(pdf, po.supplierAddress || "-", w - 2, 3), x, y + 18);
  const rows = [
    ["Party PAN", po.supplierPan],
    ["Party E-Mail ID", details.party.email],
    ["Party Mobile No", details.party.phone],
    ["Party State", po.supplierState],
    ["GSTIN / UIN", details.party.gstin]
  ];
  drawPurchaseOrderPdfFieldRows(pdf, rows, x, y + 31, w);
}

function drawPurchaseOrderPdfOrderBox(pdf, details, x, y, w, h) {
  const po = details.poDetails;
  const rows = [
    ["Order No.", details.entry.number],
    ["Dated", formatInvoiceDate(details.entry.date)],
    ["Terms of Payment", po.paymentTerms],
    ["Delivery Terms", po.deliveryTerms],
    ["Pickup Date", po.pickupDate],
    ["Delivery Date", po.deliveryDate],
    ["Dispatch from City", po.dispatchCity],
    ["Destination City", po.destinationCity],
    ["Bank", po.bankName],
    ["Account No.", po.accountNumber],
    ["IFSC Code", po.ifsc]
  ];
  drawPurchaseOrderPdfFieldRows(pdf, rows, x, y + 2, w);
}

function drawPurchaseOrderPdfFieldRows(pdf, rows, x, y, w) {
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6.5);
  rows.forEach((row, index) => {
    const rowY = y + index * 4.2;
    pdf.text(pdfClean(row[0]), x, rowY);
    pdf.text(":", x + 28, rowY);
    pdf.setFont("helvetica", "bold");
    pdf.text(pdfWrap(pdf, row[1] || "", w - 34, 1), x + 32, rowY);
    pdf.setFont("helvetica", "normal");
  });
}

function purchaseOrderPdfColumns(layout) {
  const widths = [10, 62, 22, 22, 16, 12, 22, 24];
  let x = layout.margin;
  return [
    ["sn", "S.N.", "right"],
    ["desc", "Description of Goods", "left"],
    ["origin", "Country of Origin", "left"],
    ["hsn", "HSN Code", "left"],
    ["qty", "Qty.", "right"],
    ["unit", "Unit", "center"],
    ["price", "Price\n(Tax Inc.)", "right"],
    ["amount", "Amount (Rs.)\n(Tax Inc.)", "right"]
  ].map((column, index) => {
    const result = { key: column[0], label: column[1], align: column[2], x, w: widths[index] };
    x += widths[index];
    return result;
  });
}

function renderPurchaseOrderPdfItemHeader(pdf, layout, y) {
  const columns = purchaseOrderPdfColumns(layout);
  const h = 11;
  pdf.setFillColor(242, 242, 242);
  pdf.setDrawColor(10, 10, 10);
  pdf.rect(layout.margin, y, layout.contentWidth, h, "FD");
  columns.slice(1).forEach(col => pdf.line(col.x, y, col.x, y + h));
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(6.4);
  columns.forEach(col => {
    const tx = col.align === "right" ? col.x + col.w - 1.2 : col.align === "center" ? col.x + col.w / 2 : col.x + 1.2;
    pdf.text(col.label.split("\n"), tx, y + 4.3, { align: col.align });
  });
  return y + h;
}

function renderPurchaseOrderPdfItems(pdf, details, layout, startY) {
  let y = renderPurchaseOrderPdfItemHeader(pdf, layout, startY);
  details.entry.lines.forEach((line, index) => {
    const item = state.items.find(row => row.id === line.itemId) || {};
    const row = purchaseOrderPdfLineRow(line, item, index);
    const descLines = pdfWrap(pdf, row.desc, 58, 8);
    const rowHeight = Math.max(9, descLines.length * 3.4 + 5);
    y = ensurePurchaseOrderPdfSpace(pdf, details, layout, y, rowHeight, true);
    drawPurchaseOrderPdfRow(pdf, layout, y, rowHeight, { ...row, descLines });
    y += rowHeight;
  });
  return y;
}

function purchaseOrderPdfLineRow(line, item, index) {
  const imeis = imeiNumbersFromText(line.imeiNumbers);
  return {
    sn: `${index + 1}.`,
    desc: [
      item.name || itemName(line.itemId),
      imeis.length ? `IMEI: ${[...new Set(imeis)].join(", ")}` : ""
    ].filter(Boolean).join("\n"),
    origin: "",
    hsn: lineHsn(line, item),
    qty: formatPoQty(line.qty),
    unit: "Pcs.",
    price: formatInvoiceMoney(lineGrossRate(line)),
    amount: formatInvoiceMoney(lineGrossAmount(line))
  };
}

function drawPurchaseOrderPdfRow(pdf, layout, y, h, row) {
  const columns = purchaseOrderPdfColumns(layout);
  pdf.setDrawColor(10, 10, 10);
  pdf.rect(layout.margin, y, layout.contentWidth, h);
  columns.slice(1).forEach(col => pdf.line(col.x, y, col.x, y + h));
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6.7);
  columns.forEach(col => {
    const tx = col.align === "right" ? col.x + col.w - 1.2 : col.align === "center" ? col.x + col.w / 2 : col.x + 1.2;
    const value = col.key === "desc" ? row.descLines : row[col.key];
    pdf.text(Array.isArray(value) ? value : pdfClean(value || ""), tx, y + 4.8, { align: col.align });
  });
}

function renderPurchaseOrderPdfTotalsAndTerms(pdf, details, layout, startY) {
  let y = ensurePurchaseOrderPdfSpace(pdf, details, layout, startY, 11, false);
  pdf.setFillColor(242, 242, 242);
  pdf.setDrawColor(10, 10, 10);
  pdf.rect(layout.margin, y, layout.contentWidth, 9, "FD");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  pdf.text("Grand Total", layout.margin + layout.contentWidth - 78, y + 5.8);
  pdf.text(formatPoQty(details.totalQty), layout.margin + layout.contentWidth - 45, y + 5.8, { align: "right" });
  pdf.text("Pcs.", layout.margin + layout.contentWidth - 32, y + 5.8, { align: "center" });
  pdf.text(pdfMoney(details.payableTotal), layout.margin + layout.contentWidth - 2, y + 5.8, { align: "right" });
  y += 13;
  y = renderPurchaseOrderPdfTaxSummary(pdf, details, layout, y);
  y = ensurePurchaseOrderPdfSpace(pdf, details, layout, y, 14, false);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.text("Amount (in words)", layout.margin, y);
  pdf.setFont("helvetica", "bold");
  y += drawInvoicePdfWrapped(pdf, amountInWords(details.payableTotal), layout.margin, y + 4, layout.contentWidth, 3.8) + 3;
  y = renderPurchaseOrderPdfTerms(pdf, details, layout, y);
  y = ensurePurchaseOrderPdfSpace(pdf, details, layout, y, 28, false);
  pdf.setDrawColor(10, 10, 10);
  pdf.rect(layout.margin + layout.contentWidth * 0.58, y, layout.contentWidth * 0.42, 24);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  pdf.text(`FOR ${pdfClean(details.poDetails.companyName || details.sellerName)}`, layout.margin + layout.contentWidth - 3, y + 5, { align: "right" });
  pdf.setFont("helvetica", "normal");
  pdf.text("Authorised Signatory", layout.margin + layout.contentWidth - 3, y + 21, { align: "right" });
  return y + 26;
}

function renderPurchaseOrderPdfTerms(pdf, details, layout, startY) {
  let y = ensurePurchaseOrderPdfSpace(pdf, details, layout, startY, 12, false);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.text("TERMS AND CONDITIONS:", layout.margin, y + 4);
  y += 8;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6.8);
  purchaseOrderTermsList(details.entry).forEach((term, index) => {
    const lines = pdfWrap(pdf, `${index + 1}. ${term}`, layout.contentWidth - 3, 12);
    const h = Math.max(4, lines.length * 3.6);
    y = ensurePurchaseOrderPdfSpace(pdf, details, layout, y, h + 1, false);
    pdf.text(lines, layout.margin + 2, y);
    y += h + 1;
  });
  return y + 2;
}

function renderPurchaseOrderPdfTaxSummary(pdf, details, layout, startY) {
  const rowHeight = 7;
  const headerHeight = 8;
  const tableHeight = headerHeight + (details.taxGroups.length + 1) * rowHeight;
  let y = ensurePurchaseOrderPdfSpace(pdf, details, layout, startY, tableHeight + 4, false);
  const columns = details.isIgst
    ? [
        { label: "HSN/SAC", w: 38, align: "left" },
        { label: "Taxable Value", w: 38, align: "right" },
        { label: "IGST Rate", w: 30, align: "right" },
        { label: "IGST Amount", w: 38, align: "right" },
        { label: "Total Tax", w: 46, align: "right" }
      ]
    : [
        { label: "HSN/SAC", w: 32, align: "left" },
        { label: "Taxable Value", w: 32, align: "right" },
        { label: "CGST Rate", w: 22, align: "right" },
        { label: "CGST Amt", w: 28, align: "right" },
        { label: "SGST Rate", w: 22, align: "right" },
        { label: "SGST Amt", w: 28, align: "right" },
        { label: "Total Tax", w: 26, align: "right" }
      ];
  drawInvoicePdfMiniTableHeader(pdf, layout.margin, y, columns, headerHeight);
  y += headerHeight;
  details.taxGroups.forEach(group => {
    const row = details.isIgst
      ? [group.hsn, formatInvoiceMoney(group.taxable), `${group.rate}%`, formatInvoiceMoney(group.tax), formatInvoiceMoney(group.tax)]
      : [group.hsn, formatInvoiceMoney(group.taxable), `${group.rate / 2}%`, formatInvoiceMoney(group.tax / 2), `${group.rate / 2}%`, formatInvoiceMoney(group.tax / 2), formatInvoiceMoney(group.tax)];
    drawInvoicePdfMiniTableRow(pdf, layout.margin, y, columns, row, rowHeight, false);
    y += rowHeight;
  });
  const totalRow = details.isIgst
    ? ["Total", formatInvoiceMoney(details.entry.taxable), "", formatInvoiceMoney(details.entry.igst), formatInvoiceMoney(details.entry.igst)]
    : ["Total", formatInvoiceMoney(details.entry.taxable), "", formatInvoiceMoney(details.entry.cgst), "", formatInvoiceMoney(details.entry.sgst), formatInvoiceMoney(details.entry.gst)];
  drawInvoicePdfMiniTableRow(pdf, layout.margin, y, columns, totalRow, rowHeight, true);
  return y + rowHeight + 3;
}

function ensurePurchaseOrderPdfSpace(pdf, details, layout, y, requiredHeight, includeTableHeader) {
  if (y + requiredHeight <= layout.bottom) return y;
  return addPurchaseOrderPdfContinuationPage(pdf, details, layout, includeTableHeader);
}

function addPurchaseOrderPdfContinuationPage(pdf, details, layout, includeTableHeader = true) {
  pdf.addPage();
  const y = renderPurchaseOrderPdfHeader(pdf, details, layout, true);
  return includeTableHeader ? renderPurchaseOrderPdfItemHeader(pdf, layout, y) : y;
}

function renderPurchaseOrderPdfFooters(pdf, layout) {
  const totalPages = pdf.getNumberOfPages();
  for (let pageNo = 1; pageNo <= totalPages; pageNo += 1) {
    pdf.setPage(pageNo);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.5);
    pdf.setTextColor(88, 88, 88);
    pdf.text("Purchase Order", layout.pageWidth / 2, layout.pageHeight - 6, { align: "center" });
    pdf.text(`Page ${pageNo} of ${totalPages}`, layout.pageWidth - layout.margin, layout.pageHeight - 6, { align: "right" });
  }
  pdf.setTextColor(20, 34, 35);
}

function invoicePdfDetails({ entry, party, settings, documentKind = "invoice", pdfLogo = null }) {
  const isPo = documentKind === "po";
  const isCreditNote = documentKind === "creditNote";
  const buyerProfile = normalizeAddressSnapshot({
    name: settings.businessName || settings.label || "",
    gstin: settings.gstin || "",
    address: settings.address || "",
    place: settings.state || stateNameFromGstin(settings.gstin) || ""
  });
  const billTo = isPo ? normalizeAddressSnapshot(partyAddressSnapshot(party)) : normalizeAddressSnapshot(entry.billToSnapshot || partyAddressSnapshot(party));
  const shipTo = isPo ? buyerProfile : normalizeAddressSnapshot(entry.shipToSnapshot || billTo);
  const totalQty = entry.lines.reduce((sum, line) => sum + num(line.qty), 0);
  return {
    entry,
    party,
    settings,
    documentKind,
    pdfLogo,
    documentTitle: isPo ? "PURCHASE ORDER" : isCreditNote ? "CREDIT NOTE" : "TAX INVOICE",
    numberLabel: isPo ? "PO No." : isCreditNote ? "Credit Note No." : "Invoice No.",
    firstPartyLabel: isPo ? "Supplier" : "Buyer (Bill to)",
    secondPartyLabel: isPo ? "Ship To" : "Consignee (Ship to)",
    amountWordsLabel: isPo ? "Amount (in words)" : isCreditNote ? "Credit Amount (in words)" : "Amount Chargeable (in words)",
    finalTaxWordsLabel: isPo ? "Tax Amount (in words):" : "Tax Amount (in words):",
    declarationText: isPo
      ? "This purchase order is a request to supply the goods listed. Stock and purchase accounts will update only after purchase entry is saved."
      : isCreditNote
        ? `This credit note is issued against invoice ${entry.originalInvoiceNumber || "-"} for ${entry.reason || "the stated adjustment"}.`
      : "We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.",
    sellerName: settings.businessName || settings.label || "Business",
    sellerAddress: settings.address || "",
    sellerState: settings.state || stateNameFromGstin(settings.gstin) || "",
    billTo,
    shipTo,
    totalQty,
    roundOff: invoiceRoundOff(entry),
    payableTotal: invoicePayableTotal(entry),
    taxGroups: invoiceTaxGroups(entry),
    isIgst: num(entry.igst) > 0,
    isCreditNote,
    cancelled: isCancelledEntry(entry)
  };
}

function invoicePdfLayout(pdf) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const contentWidth = pageWidth - margin * 2;
  const columns = [
    { key: "sl", label: "Sl", x: margin, w: 8, align: "center" },
    { key: "desc", label: "Description of Goods", x: margin + 8, w: 50, align: "left" },
    { key: "hsn", label: "HSN/SAC", x: margin + 58, w: 17, align: "left" },
    { key: "qty", label: "Qty", x: margin + 75, w: 15, align: "right" },
    { key: "rate", label: "Rate/Qty", x: margin + 90, w: 20, align: "right" },
    { key: "taxable", label: "Taxable", x: margin + 110, w: 20, align: "right" },
    { key: "gstRate", label: "GST %", x: margin + 130, w: 12, align: "right" },
    { key: "gst", label: "GST Amt", x: margin + 142, w: 20, align: "right" },
    { key: "amount", label: "Amount", x: margin + 162, w: 28, align: "right" }
  ];
  return {
    pageWidth,
    pageHeight,
    margin,
    contentWidth,
    bottom: pageHeight - margin - 8,
    columns
  };
}

function renderInvoicePdfPageHeader(pdf, details, layout, continued, includeTableHeader = true) {
  const { margin, contentWidth, pageWidth } = layout;
  pdf.setFont("helvetica", "normal");
  pdf.setDrawColor(51, 66, 66);
  pdf.setTextColor(20, 34, 35);
  pdf.setLineWidth(0.25);
  let y = margin;
  pdf.setFillColor(245, 248, 248);
  pdf.rect(margin, y, contentWidth, continued ? 30 : 34, "F");
  const logoSize = continued ? 16 : 20;
  const hasLogo = drawFirmPdfLogo(pdf, details, margin + 3, y + 3, logoSize, logoSize);
  const sellerTextX = margin + (hasLogo ? logoSize + 7 : 3);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(15);
  pdf.text(pdfClean(details.sellerName), sellerTextX, y + 7);
  pdf.setFontSize(13);
  pdf.text(details.documentTitle, pageWidth - margin - 3, y + 7, { align: "right" });
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  const addressLines = pdfWrap(pdf, details.sellerAddress, hasLogo ? 70 : 95, 2);
  pdf.text(addressLines, sellerTextX, y + 13);
  pdf.text(`GSTIN/UIN: ${pdfClean(details.settings.gstin || "-")}`, margin + 3, y + 24);
  pdf.text(`State: ${pdfClean(details.sellerState || "-")} | Code: ${pdfClean(stateCodeFromGstin(details.settings.gstin) || "-")}`, margin + 3, y + 28);
  drawInvoicePdfMeta(pdf, details, pageWidth - margin - 64, y + 11, 61);
  if (details.cancelled) {
    pdf.setTextColor(164, 44, 44);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("CANCELLED", pageWidth - margin - 3, y + 31, { align: "right" });
    pdf.setTextColor(20, 34, 35);
  }
  y += continued ? 35 : 39;
  if (!continued) {
    const boxWidth = (contentWidth - 4) / 2;
    const boxHeight = 34;
    drawInvoicePdfPartyBox(pdf, details.firstPartyLabel, details.billTo, margin, y, boxWidth, boxHeight);
    drawInvoicePdfPartyBox(pdf, details.secondPartyLabel, details.shipTo, margin + boxWidth + 4, y, boxWidth, boxHeight);
    y += boxHeight + 5;
    if (details.isCreditNote) {
      drawInvoicePdfCreditReference(pdf, details, margin, y, contentWidth, 11);
      y += 15;
    }
  }
  return includeTableHeader ? renderInvoicePdfItemHeader(pdf, layout, y) : y;
}

function drawInvoicePdfCreditReference(pdf, details, x, y, w, h) {
  pdf.setDrawColor(185, 196, 196);
  pdf.setFillColor(247, 249, 249);
  pdf.rect(x, y, w, h, "FD");
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6.5);
  pdf.text("Original Invoice", x + 2, y + 4);
  pdf.text("Dated", x + 70, y + 4);
  pdf.text("Reason", x + 112, y + 4);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.text(pdfClean(details.entry.originalInvoiceNumber || "-"), x + 2, y + 9);
  pdf.text(pdfClean(formatInvoiceDate(details.entry.originalInvoiceDate) || "-"), x + 70, y + 9);
  pdf.text(pdfClean(details.entry.reason || "-"), x + 112, y + 9, { maxWidth: w - 114 });
}

function drawInvoicePdfMeta(pdf, details, x, y, w) {
  pdf.setDrawColor(170, 184, 184);
  pdf.rect(x, y, w, 18);
  pdf.line(x, y + 9, x + w, y + 9);
  pdf.line(x + w / 2, y, x + w / 2, y + 18);
  pdf.setFontSize(6.5);
  pdf.setFont("helvetica", "normal");
  pdf.text(details.numberLabel, x + 2, y + 4);
  pdf.text("Dated", x + w / 2 + 2, y + 4);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.text(pdfClean(details.entry.number || "-"), x + 2, y + 8);
  pdf.text(pdfClean(formatInvoiceDate(details.entry.date) || "-"), x + w / 2 + 2, y + 8);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6.5);
  pdf.text("Total Qty", x + 2, y + 13);
  pdf.text("Total", x + w / 2 + 2, y + 13);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.text(pdfClean(formatQty(details.totalQty)), x + 2, y + 17);
  pdf.text(pdfMoney(details.payableTotal), x + w - 2, y + 17, { align: "right" });
}

function drawInvoicePdfPartyBox(pdf, title, party, x, y, w, h) {
  pdf.setDrawColor(185, 196, 196);
  pdf.rect(x, y, w, h);
  pdf.setFillColor(247, 249, 249);
  pdf.rect(x, y, w, 7, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.text(pdfClean(title), x + 2, y + 5);
  pdf.setFontSize(8.5);
  pdf.text(pdfClean(party.name || "-"), x + 2, y + 12);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.text(pdfWrap(pdf, party.address || party.place || "-", w - 4, 3), x + 2, y + 17);
  pdf.text(`GSTIN/UIN: ${pdfClean(party.gstin || "-")}`, x + 2, y + h - 8);
  pdf.text(`State: ${pdfClean(stateNameFromGstin(party.gstin) || party.place || "-")} | Code: ${pdfClean(stateCodeFromGstin(party.gstin) || "-")}`, x + 2, y + h - 4);
}

function renderInvoicePdfItemHeader(pdf, layout, y) {
  const { margin, contentWidth, columns } = layout;
  const h = 8;
  pdf.setDrawColor(60, 74, 74);
  pdf.setFillColor(232, 239, 239);
  pdf.rect(margin, y, contentWidth, h, "FD");
  columns.slice(1).forEach(col => pdf.line(col.x, y, col.x, y + h));
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(6.6);
  columns.forEach(col => {
    const tx = col.align === "right" ? col.x + col.w - 1.5 : col.align === "center" ? col.x + col.w / 2 : col.x + 1.5;
    pdf.text(col.label, tx, y + 5.2, { align: col.align });
  });
  return y + h;
}

function renderInvoicePdfItems(pdf, details, layout, startY) {
  let y = startY;
  details.entry.lines.forEach((line, index) => {
    const item = state.items.find(row => row.id === line.itemId) || {};
    const row = invoicePdfLineRow(line, item, index, details.documentKind);
    y = renderInvoicePdfLineRow(pdf, row, details, layout, y);
  });
  if (Math.abs(details.roundOff) >= 0.01) {
    y = ensureInvoicePdfSpace(pdf, details, layout, y, 8, true);
    drawInvoicePdfSimpleRow(pdf, layout, y, "Round Off", pdfMoney(details.roundOff));
    y += 8;
  }
  y = ensureInvoicePdfSpace(pdf, details, layout, y, 9, true);
  drawInvoicePdfTotalRow(pdf, details, layout, y);
  return y + 9;
}

function invoicePdfLineRow(line, item, index, documentKind = "invoice") {
  const imeis = imeiNumbersFromText(line.imeiNumbers);
  const description = [
    item.name || itemName(line.itemId),
    imeis.length ? `IMEI: ${[...new Set(imeis)].join(", ")}` : ""
  ].filter(Boolean).join("\n");
  return {
    sl: String(index + 1),
    description,
    hsn: lineHsn(line, item),
    qty: formatQty(line.qty),
    rate: formatInvoiceMoney(lineGrossRate(line)),
    taxable: formatInvoiceMoney(lineTaxableAmount(line)),
    gstRate: `${num(line.gstRate)}%`,
    gst: formatInvoiceMoney(lineGstAmount(line)),
    amount: formatInvoiceMoney(lineGrossAmount(line))
  };
}

function renderInvoicePdfLineRow(pdf, row, details, layout, startY) {
  const descColumn = layout.columns.find(col => col.key === "desc");
  const descriptionLines = pdfWrap(pdf, row.description || "-", descColumn.w - 3, 80);
  let offset = 0;
  let y = startY;
  let firstChunk = true;
  while (offset < descriptionLines.length) {
    const availableLines = Math.max(1, Math.floor((layout.bottom - y - 4) / 3.4));
    if (availableLines < 2) {
      y = addInvoicePdfContinuationPage(pdf, details, layout);
      continue;
    }
    const chunk = descriptionLines.slice(offset, offset + availableLines);
    const rowHeight = Math.max(8, chunk.length * 3.4 + 4);
    y = ensureInvoicePdfSpace(pdf, details, layout, y, rowHeight, true);
    drawInvoicePdfRowFrame(pdf, layout, y, rowHeight);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.8);
    drawInvoicePdfCell(pdf, layout.columns[1], y, chunk.join("\n"), rowHeight, "left");
    if (firstChunk) {
      drawInvoicePdfCell(pdf, layout.columns[0], y, row.sl, rowHeight, "center");
      drawInvoicePdfCell(pdf, layout.columns[2], y, row.hsn || "-", rowHeight, "left");
      drawInvoicePdfCell(pdf, layout.columns[3], y, row.qty, rowHeight, "right");
      drawInvoicePdfCell(pdf, layout.columns[4], y, row.rate, rowHeight, "right");
      drawInvoicePdfCell(pdf, layout.columns[5], y, row.taxable, rowHeight, "right");
      drawInvoicePdfCell(pdf, layout.columns[6], y, row.gstRate, rowHeight, "right");
      drawInvoicePdfCell(pdf, layout.columns[7], y, row.gst, rowHeight, "right");
      drawInvoicePdfCell(pdf, layout.columns[8], y, row.amount, rowHeight, "right");
    } else {
      drawInvoicePdfCell(pdf, layout.columns[0], y, row.sl, rowHeight, "center");
      pdf.setFont("helvetica", "italic");
      drawInvoicePdfCell(pdf, layout.columns[2], y, "cont.", rowHeight, "left");
      pdf.setFont("helvetica", "normal");
    }
    y += rowHeight;
    offset += chunk.length;
    firstChunk = false;
  }
  return y;
}

function drawInvoicePdfRowFrame(pdf, layout, y, h) {
  pdf.setDrawColor(185, 196, 196);
  pdf.rect(layout.margin, y, layout.contentWidth, h);
  layout.columns.slice(1).forEach(col => pdf.line(col.x, y, col.x, y + h));
}

function drawInvoicePdfCell(pdf, col, y, text, h, align = col.align) {
  const tx = align === "right" ? col.x + col.w - 1.5 : align === "center" ? col.x + col.w / 2 : col.x + 1.5;
  const lines = String(text || "").split("\n");
  pdf.text(lines, tx, y + 4.6, { align, maxWidth: col.w - 3 });
}

function drawInvoicePdfSimpleRow(pdf, layout, y, label, amount) {
  drawInvoicePdfRowFrame(pdf, layout, y, 8);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  drawInvoicePdfCell(pdf, layout.columns[1], y, label, 8, "left");
  drawInvoicePdfCell(pdf, layout.columns[8], y, amount, 8, "right");
}

function drawInvoicePdfTotalRow(pdf, details, layout, y) {
  pdf.setFillColor(232, 239, 239);
  pdf.rect(layout.margin, y, layout.contentWidth, 9, "F");
  drawInvoicePdfRowFrame(pdf, layout, y, 9);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  drawInvoicePdfCell(pdf, layout.columns[1], y, "Total", 9, "right");
  drawInvoicePdfCell(pdf, layout.columns[3], y, formatQty(details.totalQty), 9, "right");
  drawInvoicePdfCell(pdf, layout.columns[5], y, formatInvoiceMoney(details.entry.taxable), 9, "right");
  drawInvoicePdfCell(pdf, layout.columns[7], y, formatInvoiceMoney(details.entry.gst), 9, "right");
  drawInvoicePdfCell(pdf, layout.columns[8], y, pdfMoney(details.payableTotal), 9, "right");
}

function renderInvoicePdfTotals(pdf, details, layout, startY) {
  let y = startY + 4;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.text(details.amountWordsLabel, layout.margin, y);
  pdf.setFont("helvetica", "bold");
  y += drawInvoicePdfWrapped(pdf, amountInWords(details.payableTotal), layout.margin, y + 4, layout.contentWidth - 34, 3.8);
  pdf.setFont("helvetica", "normal");
  pdf.text("E. & O.E", layout.pageWidth - layout.margin, startY + 4, { align: "right" });
  y += 2;
  y = renderInvoicePdfTaxSummary(pdf, details, layout, y);
  y = ensureInvoicePdfSpace(pdf, details, layout, y, 42, false);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.text("Tax Amount (in words):", layout.margin, y);
  pdf.setFont("helvetica", "bold");
  y += drawInvoicePdfWrapped(pdf, amountInWords(details.entry.gst), layout.margin + 28, y, layout.contentWidth - 28, 3.8);
  y += 4;
  y = renderInvoicePdfBankAndSignature(pdf, details, layout, y);
  return y;
}

function renderInvoicePdfTaxSummary(pdf, details, layout, startY) {
  const rowHeight = 7;
  const headerHeight = 8;
  const tableHeight = headerHeight + (details.taxGroups.length + 1) * rowHeight;
  let y = ensureInvoicePdfSpace(pdf, details, layout, startY, tableHeight + 4, false);
  const columns = details.isIgst
    ? [
        { label: "HSN/SAC", w: 38, align: "left" },
        { label: "Taxable Value", w: 38, align: "right" },
        { label: "IGST Rate", w: 30, align: "right" },
        { label: "IGST Amount", w: 38, align: "right" },
        { label: "Total Tax", w: 46, align: "right" }
      ]
    : [
        { label: "HSN/SAC", w: 32, align: "left" },
        { label: "Taxable Value", w: 32, align: "right" },
        { label: "CGST Rate", w: 22, align: "right" },
        { label: "CGST Amt", w: 28, align: "right" },
        { label: "SGST Rate", w: 22, align: "right" },
        { label: "SGST Amt", w: 28, align: "right" },
        { label: "Total Tax", w: 26, align: "right" }
      ];
  drawInvoicePdfMiniTableHeader(pdf, layout.margin, y, columns, headerHeight);
  y += headerHeight;
  details.taxGroups.forEach(group => {
    const row = details.isIgst
      ? [group.hsn, formatInvoiceMoney(group.taxable), `${group.rate}%`, formatInvoiceMoney(group.tax), formatInvoiceMoney(group.tax)]
      : [group.hsn, formatInvoiceMoney(group.taxable), `${group.rate / 2}%`, formatInvoiceMoney(group.tax / 2), `${group.rate / 2}%`, formatInvoiceMoney(group.tax / 2), formatInvoiceMoney(group.tax)];
    drawInvoicePdfMiniTableRow(pdf, layout.margin, y, columns, row, rowHeight, false);
    y += rowHeight;
  });
  const totalRow = details.isIgst
    ? ["Total", formatInvoiceMoney(details.entry.taxable), "", formatInvoiceMoney(details.entry.igst), formatInvoiceMoney(details.entry.igst)]
    : ["Total", formatInvoiceMoney(details.entry.taxable), "", formatInvoiceMoney(details.entry.cgst), "", formatInvoiceMoney(details.entry.sgst), formatInvoiceMoney(details.entry.gst)];
  drawInvoicePdfMiniTableRow(pdf, layout.margin, y, columns, totalRow, rowHeight, true);
  return y + rowHeight + 3;
}

function drawInvoicePdfMiniTableHeader(pdf, x, y, columns, h) {
  pdf.setFillColor(232, 239, 239);
  pdf.setDrawColor(90, 106, 106);
  pdf.rect(x, y, columns.reduce((sum, col) => sum + col.w, 0), h, "FD");
  let cursor = x;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(6.5);
  columns.forEach((col, index) => {
    if (index) pdf.line(cursor, y, cursor, y + h);
    pdf.text(col.label, col.align === "right" ? cursor + col.w - 1.5 : cursor + 1.5, y + 5, { align: col.align });
    cursor += col.w;
  });
}

function drawInvoicePdfMiniTableRow(pdf, x, y, columns, values, h, bold) {
  pdf.setDrawColor(185, 196, 196);
  pdf.rect(x, y, columns.reduce((sum, col) => sum + col.w, 0), h);
  let cursor = x;
  pdf.setFont("helvetica", bold ? "bold" : "normal");
  pdf.setFontSize(6.6);
  columns.forEach((col, index) => {
    if (index) pdf.line(cursor, y, cursor, y + h);
    pdf.text(pdfClean(values[index] || ""), col.align === "right" ? cursor + col.w - 1.5 : cursor + 1.5, y + 4.8, { align: col.align });
    cursor += col.w;
  });
}

function renderInvoicePdfBankAndSignature(pdf, details, layout, startY) {
  const bank = details.settings.bankDetails || {};
  const leftWidth = layout.contentWidth * 0.58;
  const rightX = layout.margin + leftWidth + 5;
  const rightWidth = layout.contentWidth - leftWidth - 5;
  let y = startY;
  pdf.setDrawColor(185, 196, 196);
  pdf.rect(layout.margin, y, leftWidth, 40);
  pdf.rect(rightX, y, rightWidth, 40);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.text(details.documentKind === "po" ? "Terms" : details.isCreditNote ? "Credit Note Details" : "Bank Details", layout.margin + 2, y + 5);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  const leftLines = details.documentKind === "po"
    ? [
        "Supply as per the items and rates mentioned above.",
        "This PO does not update inventory until converted to purchase entry.",
        details.entry.notes ? `Notes: ${details.entry.notes}` : ""
      ].filter(Boolean)
    : details.isCreditNote
      ? [
          `Original Invoice: ${details.entry.originalInvoiceNumber || "-"}`,
          `Invoice Date: ${formatInvoiceDate(details.entry.originalInvoiceDate) || "-"}`,
          `Reason: ${details.entry.reason || "-"}`,
          `Stock updated: ${details.entry.restock ? "Yes" : "No"}`
        ]
      : [
        `Bank: ${bank.bankName || "-"}`,
        `Account Name: ${bank.accountName || details.sellerName}`,
        `Branch: ${bank.branch || "-"}`,
        `A/c No.: ${bank.accountNumber || "-"}`,
        `IFSC: ${bank.ifsc || "-"}`
      ];
  pdf.text(leftLines.map(pdfClean), layout.margin + 2, y + 10);
  pdf.setFont("helvetica", "bold");
  pdf.text(`for ${pdfClean(details.sellerName)}`, rightX + rightWidth - 2, y + 6, { align: "right" });
  pdf.setFont("helvetica", "normal");
  pdf.text("Authorised Signatory", rightX + rightWidth - 2, y + 36, { align: "right" });
  y += 45;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  pdf.text("Declaration", layout.margin, y);
  pdf.setFont("helvetica", "normal");
  y += drawInvoicePdfWrapped(pdf, details.declarationText, layout.margin, y + 4, layout.contentWidth, 3.6);
  return y + 2;
}

function ensureInvoicePdfSpace(pdf, details, layout, y, requiredHeight, includeTableHeader) {
  if (y + requiredHeight <= layout.bottom) return y;
  return addInvoicePdfContinuationPage(pdf, details, layout, includeTableHeader);
}

function addInvoicePdfContinuationPage(pdf, details, layout, includeTableHeader = true) {
  pdf.addPage();
  return renderInvoicePdfPageHeader(pdf, details, layout, true, includeTableHeader);
}

function renderInvoicePdfFooters(pdf, layout, details = {}) {
  const totalPages = pdf.getNumberOfPages();
  for (let pageNo = 1; pageNo <= totalPages; pageNo += 1) {
    pdf.setPage(pageNo);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.5);
    pdf.setTextColor(88, 105, 105);
    pdf.text(`This is a Computer Generated ${details.isCreditNote ? "Credit Note" : "Invoice"}`, layout.pageWidth / 2, layout.pageHeight - 6, { align: "center" });
    pdf.text(`Page ${pageNo} of ${totalPages}`, layout.pageWidth - layout.margin, layout.pageHeight - 6, { align: "right" });
  }
  pdf.setTextColor(20, 34, 35);
}

function drawInvoicePdfWrapped(pdf, text, x, y, maxWidth, lineHeight) {
  const lines = pdfWrap(pdf, text, maxWidth, 20);
  pdf.text(lines, x, y);
  return Math.max(lineHeight, lines.length * lineHeight);
}

function pdfWrap(pdf, text, maxWidth, maxLines = 20) {
  const lines = pdf.splitTextToSize(pdfClean(text || "-"), maxWidth);
  return lines.slice(0, maxLines);
}

function pdfMoney(value) {
  return `Rs. ${formatInvoiceMoney(value)}`;
}

function pdfClean(value) {
  return String(value ?? "")
    .replace(/\u20b9/g, "Rs.")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/\u00a0/g, " ")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function pauseInvoicePreviewFit() {
  document.body.classList.add("invoice-pdf-capture");
  clearInvoicePreviewFit();
  return () => {
    document.body.classList.remove("invoice-pdf-capture");
    requestAnimationFrame(fitInvoicePreview);
  };
}

function nextFrame() {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

function setInvoicePdfBusy(isBusy) {
  ["#downloadInvoicePdfBtn", "#shareInvoiceWhatsappBtn", "#shareInvoicePdfBtn"].forEach(selector => {
    const button = $(selector);
    if (button) button.disabled = isBusy;
  });
}

function invoicePdfFileName(entry, party) {
  return `${safeFileName(entry.number || "invoice")}-${safeFileName(party.name || "customer")}.pdf`;
}

function creditNotePdfFileName(entry, party) {
  return `${safeFileName(entry.number || "credit-note")}-${safeFileName(party.name || "customer")}.pdf`;
}

function purchaseOrderPdfFileName(entry, supplier) {
  return `${safeFileName(entry.number || "purchase-order")}-${safeFileName(supplier.name || "supplier")}.pdf`;
}

function safeFileName(value) {
  return String(value || "file").replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "file";
}

function invoiceSellerBlock(profile) {
  return `<div class="invoice-party-block seller-block">
    <span>Seller</span>
    <strong>${escapeHtml(profile.businessName || profile.label || "")}</strong>
    <p>${escapeHtml(profile.address || "")}</p>
    <p>GSTIN/UIN: ${escapeHtml(profile.gstin || "-")}</p>
    <p>State Name : ${escapeHtml(profile.state || stateNameFromGstin(profile.gstin) || "-")}, Code : ${escapeHtml(stateCodeFromGstin(profile.gstin) || "-")}</p>
  </div>`;
}

function invoicePartyBlock(title, party) {
  return `<div class="invoice-party-block">
    <span>${escapeHtml(title)}</span>
    <strong>${escapeHtml(party.name || "")}</strong>
    <p>${escapeHtml(party.address || party.place || "")}</p>
    <p>GSTIN/UIN : ${escapeHtml(party.gstin || "-")}</p>
    <p>State Name : ${escapeHtml(stateNameFromGstin(party.gstin) || party.place || "-")}, Code : ${escapeHtml(stateCodeFromGstin(party.gstin) || "-")}</p>
  </div>`;
}

function invoiceBankBlock(profile) {
  const details = profile.bankDetails || {};
  if (!details.accountNumber && !details.ifsc) return "";
  return `<div class="invoice-bank-details">
    <div><span>Bank Details</span><strong>${escapeHtml(details.bankName || "-")}</strong></div>
    <div><span>Account Name</span><strong>${escapeHtml(details.accountName || profile.businessName || profile.label || "-")}</strong></div>
    <div><span>Branch</span><strong>${escapeHtml(details.branch || "-")}</strong></div>
    <div><span>A/c No.</span><strong>${escapeHtml(details.accountNumber || "-")}</strong></div>
    <div><span>IFSC</span><strong>${escapeHtml(details.ifsc || "-")}</strong></div>
  </div>`;
}

function invoiceMetaCell(labelA, valueA, labelB, valueB) {
  return `<div><span>${escapeHtml(labelA)}</span><strong>${escapeHtml(valueA)}</strong></div>
    <div><span>${escapeHtml(labelB)}</span><strong>${escapeHtml(valueB)}</strong></div>`;
}

function invoiceAdjustmentRows(roundOff) {
  if (Math.abs(num(roundOff)) < 0.01) return "";
  return `<tr class="tax-line-row">
    <td></td>
    <td class="tax-label">Round Off</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td class="num strong">${formatInvoiceMoney(roundOff)}</td>
  </tr>`;
}

function invoiceRawTotal(entry) {
  return round2(num(entry.taxable) + num(entry.gst));
}

function invoiceRoundOff(entry) {
  const rawTotal = invoiceRawTotal(entry);
  const roundedTotal = Math.round(rawTotal);
  const adjustment = round2(roundedTotal - rawTotal);
  return Math.abs(adjustment) >= 0.01 ? adjustment : 0;
}

function invoicePayableTotal(entry) {
  return round2(invoiceRawTotal(entry) + invoiceRoundOff(entry));
}

function invoiceTaxSummary(entry) {
  const groups = invoiceTaxGroups(entry);
  const isIgst = num(entry.igst) > 0;
  if (isIgst) {
    return `<table class="tax-summary-table">
      <thead>
        <tr><th rowspan="2">HSN/SAC</th><th rowspan="2" class="num">Taxable<br>Value</th><th colspan="2">IGST</th><th rowspan="2" class="num">Total<br>Tax Amount</th></tr>
        <tr><th class="num">Rate</th><th class="num">Amount</th></tr>
      </thead>
      <tbody>
        ${groups.map(group => `<tr><td>${escapeHtml(group.hsn)}</td><td class="num">${formatInvoiceMoney(group.taxable)}</td><td class="num">${group.rate}%</td><td class="num">${formatInvoiceMoney(group.tax)}</td><td class="num">${formatInvoiceMoney(group.tax)}</td></tr>`).join("")}
        <tr class="summary-total"><td>Total</td><td class="num">${formatInvoiceMoney(entry.taxable)}</td><td></td><td class="num">${formatInvoiceMoney(entry.igst)}</td><td class="num">${formatInvoiceMoney(entry.igst)}</td></tr>
      </tbody>
    </table>`;
  }
  return `<table class="tax-summary-table">
    <thead>
      <tr><th rowspan="2">HSN/SAC</th><th rowspan="2" class="num">Taxable<br>Value</th><th colspan="2">CGST</th><th colspan="2">SGST</th><th rowspan="2" class="num">Total<br>Tax Amount</th></tr>
      <tr><th class="num">Rate</th><th class="num">Amount</th><th class="num">Rate</th><th class="num">Amount</th></tr>
    </thead>
    <tbody>
      ${groups.map(group => {
        const halfRate = group.rate / 2;
        const halfTax = group.tax / 2;
        return `<tr><td>${escapeHtml(group.hsn)}</td><td class="num">${formatInvoiceMoney(group.taxable)}</td><td class="num">${halfRate}%</td><td class="num">${formatInvoiceMoney(halfTax)}</td><td class="num">${halfRate}%</td><td class="num">${formatInvoiceMoney(halfTax)}</td><td class="num">${formatInvoiceMoney(group.tax)}</td></tr>`;
      }).join("")}
      <tr class="summary-total"><td>Total</td><td class="num">${formatInvoiceMoney(entry.taxable)}</td><td></td><td class="num">${formatInvoiceMoney(entry.cgst)}</td><td></td><td class="num">${formatInvoiceMoney(entry.sgst)}</td><td class="num">${formatInvoiceMoney(entry.gst)}</td></tr>
    </tbody>
  </table>`;
}

function invoiceTaxGroups(entry) {
  const map = new Map();
  entry.lines.forEach(line => {
    const item = state.items.find(row => row.id === line.itemId) || {};
    const hsn = lineHsn(line, item);
    const key = `${hsn}-${num(line.gstRate)}`;
    const taxable = lineTaxableAmount(line);
    const existing = map.get(key) || { hsn, rate: num(line.gstRate), taxable: 0, tax: 0 };
    existing.taxable += taxable;
    existing.tax += lineGstAmount(line);
    map.set(key, existing);
  });
  return Array.from(map.values()).map(group => ({
    ...group,
    taxable: round2(group.taxable),
    tax: round2(group.tax)
  }));
}

function formatInvoiceMoney(value) {
  return Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatQty(value) {
  return `${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })} Pcs`;
}

function formatInvoiceDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }).replace(/ /g, "-");
}

function stateNameFromGstin(gstin) {
  const states = {
    "07": "Delhi",
    "27": "Maharashtra",
    "29": "Karnataka",
    "33": "Tamil Nadu",
    "36": "Telangana",
    "37": "Andhra Pradesh"
  };
  return states[stateCodeFromGstin(gstin)] || "";
}

function amountInWords(value) {
  const totalPaise = Math.round(num(value) * 100);
  const rupees = Math.floor(totalPaise / 100);
  const paise = totalPaise % 100;
  const rupeeWords = indianNumberWords(rupees);
  if (paise) return `INR ${rupeeWords} and ${indianNumberWords(paise)} paise Only`;
  return `INR ${rupeeWords} Only`;
}

function indianNumberWords(value) {
  const ones = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const twoDigits = number => {
    if (number < 20) return ones[number];
    return `${tens[Math.floor(number / 10)]}${number % 10 ? ` ${ones[number % 10]}` : ""}`;
  };
  const threeDigits = number => {
    const hundred = Math.floor(number / 100);
    const rest = number % 100;
    return `${hundred ? `${ones[hundred]} Hundred` : ""}${hundred && rest ? " " : ""}${rest ? twoDigits(rest) : ""}`.trim();
  };
  let number = Math.floor(num(value));
  if (!number) return "Zero";
  const parts = [];
  const crore = Math.floor(number / 10000000);
  number %= 10000000;
  const lakh = Math.floor(number / 100000);
  number %= 100000;
  const thousand = Math.floor(number / 1000);
  number %= 1000;
  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${threeDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${threeDigits(thousand)} Thousand`);
  if (number) parts.push(threeDigits(number));
  return parts.join(" ");
}

function renderReport() {
  const from = $("#reportFrom").value || "0000-01-01";
  const to = $("#reportTo").value || "9999-12-31";
  const inRange = entry => entry.date >= from && entry.date <= to;
  const profile = activeProfile();
  const sales = activeAccountingEntries("sale").filter(inRange);
  const creditNotes = activeAccountingEntries("creditNote").filter(inRange);
  const purchases = activeAccountingEntries("purchase").filter(inRange);
  const purchaseReturns = activeAccountingEntries("purchaseReturn").filter(inRange);
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
    const grossSaleGst = sales.reduce((sum, entry) => sum + entry.gst, 0);
    const creditGst = creditNotes.reduce((sum, entry) => sum + entry.gst, 0);
    const grossPurchaseGst = purchases.reduce((sum, entry) => sum + entry.gst, 0);
    const returnGst = purchaseReturns.reduce((sum, entry) => sum + entry.gst, 0);
    const saleGst = round2(grossSaleGst - creditGst);
    const purchaseGst = round2(grossPurchaseGst - returnGst);
    const rows = `<tr><td>${escapeHtml(profileName(profile.id))}</td><td class="num">${money(saleGst)}</td><td class="num">${money(purchaseGst)}</td><td class="num">${money(saleGst - purchaseGst)}</td></tr>`;
    output.innerHTML = `<div class="report-grid">
      <div class="report-card"><span>Output GST</span><strong>${money(saleGst)}</strong></div>
      <div class="report-card"><span>Input GST</span><strong>${money(purchaseGst)}</strong></div>
      <div class="report-card"><span>Net GST</span><strong>${money(saleGst - purchaseGst)}</strong></div>
    </div>
    <div class="table-wrap"><table><thead><tr><th>GST Profile</th><th class="num">Output GST</th><th class="num">Input GST</th><th class="num">Net GST</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    return;
  }
  const creditNoteTotal = creditNotes.reduce((sum, entry) => sum + entry.total, 0);
  const purchaseReturnTotal = purchaseReturns.reduce((sum, entry) => sum + entry.total, 0);
  const salesTotal = round2(sales.reduce((sum, entry) => sum + entry.total, 0) - creditNoteTotal);
  const purchaseTotal = round2(purchases.reduce((sum, entry) => sum + entry.total, 0) - purchaseReturnTotal);
  const stockValue = state.items.reduce((sum, item) => sum + stockForItem(item.id) * num(item.purchaseRate), 0);
  const receivable = Math.max(0, round2(sales.filter(entry => entry.status !== "Paid").reduce((sum, entry) => sum + entry.total, 0) - creditNoteTotal));
  const low = state.items.map(item => ({ ...item, stock: stockForItem(item.id) })).filter(item => item.stock <= num(item.minStock));
  output.innerHTML = `<div class="report-grid">
    <div class="report-card"><span>Net Sales</span><strong>${money(salesTotal)}</strong></div>
    <div class="report-card"><span>Credit Notes</span><strong>${money(creditNoteTotal)}</strong></div>
    <div class="report-card"><span>Net Purchases</span><strong>${money(purchaseTotal)}</strong></div>
    <div class="report-card"><span>Purchase Returns</span><strong>${money(purchaseReturnTotal)}</strong></div>
    <div class="report-card"><span>Stock Value</span><strong>${money(stockValue)}</strong></div>
    <div class="report-card"><span>Receivable</span><strong>${money(receivable)}</strong></div>
    <div class="report-card"><span>Gross Margin</span><strong>${money(salesTotal - purchaseTotal)}</strong></div>
  </div>
  <div class="table-wrap"><table><thead><tr><th>Date</th><th>Type</th><th>No.</th><th>GST</th><th>Party</th><th class="num">Total</th></tr></thead><tbody>
    ${[
      ...sales.map(entry => ({ ...entry, kind: "Sale", signedTotal: entry.total })),
      ...creditNotes.map(entry => ({ ...entry, kind: "Credit Note", signedTotal: -entry.total })),
      ...purchases.map(entry => ({ ...entry, kind: "Purchase", signedTotal: entry.total })),
      ...purchaseReturns.map(entry => ({ ...entry, kind: "Purchase Return", signedTotal: -entry.total }))
    ]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(entry => `<tr><td>${entry.date}</td><td>${entry.kind}</td><td>${escapeHtml(entry.number)}</td><td>${escapeHtml(profileName(entry.profileId))}</td><td>${escapeHtml(partyName(entry.partyId))}</td><td class="num">${money(entry.signedTotal)}</td></tr>`)
      .join("") || emptyRow(6, "No entries in this period")}
  </tbody></table></div>
  <div class="table-wrap report-secondary-table"><table><thead><tr><th>Low Stock Item</th><th>HSN</th><th class="num">Stock</th><th class="num">Min</th></tr></thead><tbody>
    ${low.map(item => `<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.hsn)}</td><td class="num">${item.stock}</td><td class="num">${num(item.minStock)}</td></tr>`).join("") || emptyRow(4, "No low stock items")}
  </tbody></table></div>`;
}

function exportSelectedEwayJson() {
  const purchases = monthFilteredEntries("purchase").filter(entry => selectedPurchaseIds.has(entry.id) && !isCancelledEntry(entry));
  if (!purchases.length) return toast("Select purchase bills first");
  let warningCount = 0;
  const billLists = purchases.map(entry => {
    const result = buildEwayBill(entry);
    if (result.reviewMessages.length) warningCount += 1;
    return result.bill;
  });
  const payload = {
    version: EWAY_DOCUMENT_VERSION,
    billLists
  };
  const payloadMessages = validateEwayPayload(payload);
  if (payloadMessages.length) warningCount += 1;
  downloadJson(payload, ewayJsonFileName(purchases));
  toast(warningCount ? "E-way JSON downloaded. Check E-Way badges for warnings." : "E-way JSON downloaded");
}

function ewayJsonFileName(purchases = []) {
  const supplierName = partyName(purchases[0]?.partyId);
  const supplierPrefix = String(supplierName || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 5) || "EWAY";
  return `${supplierPrefix}${dateTimeStampForFileName()}.json`;
}

function dateTimeStampForFileName(date = new Date()) {
  const pad = value => String(value).padStart(2, "0");
  const dd = pad(date.getDate());
  const mm = pad(date.getMonth() + 1);
  const yy = String(date.getFullYear()).slice(-2);
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  return `${dd}${mm}${yy}${hh}${min}`;
}

function ewayAddressParts(address = "", preset = null, fallbackPlace = "", fallbackStateCode = 0) {
  if (preset) {
    return {
      addr1: preset.toAddr1 || "",
      addr2: preset.toAddr2 || "",
      place: preset.toPlace || fallbackPlace || "",
      pincode: Number(preset.toPincode) || 0,
      actualStateCode: Number(preset.actualToStateCode) || fallbackStateCode || 0
    };
  }
  const value = String(address || "").trim();
  const segments = value.split(",").map(part => part.trim()).filter(Boolean);
  const pincode = Number(extractPreferredPincode(value)) || 0;
  const place = fallbackPlace || ewayPlaceFromAddressSegments(segments) || "";
  return {
    addr1: segments[0] || value || fallbackPlace || "",
    addr2: segments.slice(1, 3).join(", "),
    place,
    pincode,
    actualStateCode: stateCodeFromAddress(value, pincode, fallbackStateCode)
  };
}

function ewayPlaceFromAddressSegments(segments = []) {
  return [...segments].reverse().find(part => !/^\d{6}$/.test(part) && !stateCodeFromAddress(part, 0, 0)) || "";
}

function stateCodeFromAddress(address = "", pincode = 0, fallback = 0) {
  const lower = String(address || "").toLowerCase();
  for (const [name, code] of Object.entries(EWAY_STATE_NAME_CODES)) {
    if (lower.includes(name)) return code;
  }
  const prefix = Number(String(pincode || "").slice(0, 3));
  return EWAY_PIN_PREFIX_STATE_CODES[prefix] || fallback || 0;
}

function ewayEntryOtherValue(entry = {}) {
  const expected = round2(num(entry.taxable) + num(entry.cgst) + num(entry.sgst) + num(entry.igst));
  const difference = round2(num(entry.total) - expected);
  return Math.abs(difference) >= 0.01 ? difference : 0;
}

function mainHsnCodeForEntry(entry = {}) {
  const firstHsn = (entry.lines || [])
    .map(line => {
      const item = state.items.find(row => row.id === line.itemId) || {};
      return lineHsn(line, item);
    })
    .find(Boolean);
  return Number(firstHsn || DEFAULT_SALE_HSN);
}

function buildEwayBill(entry) {
  const profile = profileById(entry.profileId);
  const supplier = partyById(entry.partyId) || {};
  const ewayDetails = normalizePurchaseEwayDetails(entry.ewayDetails || {});
  const fromGstin = normalizeGstin(supplier.gstin);
  const toGstin = normalizeGstin(profile.gstin);
  const fromStateCode = Number(stateCodeFromGstin(fromGstin) || stateCodeFromGstin(entry.sellerGstin));
  const toStateCode = Number(stateCodeFromGstin(toGstin) || stateCodeFromGstin(entry.buyerGstin));
  const route = purchaseEwayRouteFromValues(profile, supplier, ewayDetails);
  const fromPincode = route.fromPincode || extractPreferredPincode(supplier.address || supplier.place);
  const toPincode = route.toPincode || extractPreferredPincode(profile.address);
  const fromParts = ewayAddressParts(route.fromAddress || supplier.address || supplier.place, null, supplier.place, fromStateCode);
  const toParts = ewayAddressParts(route.toAddress || profile.address, route.destinationPresetData, profile.state, toStateCode);
  const distanceKm = fixedEwayRouteDistance(fromPincode, toPincode) || ewayDetails.distanceKm || savedEwayRouteDistance(route.routeKey);
  const otherValue = ewayEntryOtherValue(entry);
  const bill = {
    userGstin: toGstin,
    supplyType: "I",
    subSupplyType: 1,
    subSupplyDesc: "",
    docType: "INV",
    docNo: entry.number,
    docDate: ewayDate(entry.date),
    transType: ewayDetails.transType || "1",
    fromGstin: fromGstin || "URP",
    fromTrdName: supplier.name || partyName(entry.partyId),
    fromAddr1: fromParts.addr1,
    fromAddr2: fromParts.addr2,
    fromPlace: fromParts.place,
    fromPincode: Number(fromPincode) || fromParts.pincode || 0,
    fromStateCode: fromStateCode || 0,
    actualFromStateCode: fromParts.actualStateCode || fromStateCode || 0,
    toGstin,
    toTrdName: profile.businessName || profile.label,
    toAddr1: toParts.addr1,
    toAddr2: toParts.addr2,
    toPlace: toParts.place,
    toPincode: Number(toPincode) || toParts.pincode || 0,
    toStateCode: toStateCode || 0,
    actualToStateCode: toParts.actualStateCode || toStateCode || 0,
    totalValue: round2(entry.taxable),
    cgstValue: round2(entry.cgst),
    sgstValue: round2(entry.sgst),
    igstValue: round2(entry.igst),
    cessValue: 0,
    TotNonAdvolVal: 0,
    OthValue: otherValue,
    totInvValue: round2(entry.total),
    transMode: ewayDetails.transMode || "1",
    transDistance: String(num(distanceKm) || 0),
    transporterName: ewayDetails.transporterName || "",
    transporterId: ewayDetails.transporterId || "",
    transDocNo: ewayDetails.transDocNo || "",
    transDocDate: ewayDetails.transDocDate ? ewayDate(ewayDetails.transDocDate) : "",
    vehicleNo: ewayDetails.vehicleNo || "",
    vehicleType: ewayDetails.vehicleType || "R",
    mainHsnCode: mainHsnCodeForEntry(entry),
    itemList: entry.lines.map((line, index) => ewayItem(line, index + 1, entry.taxMode))
  };
  return { bill, reviewMessages: validateEwayBill(bill) };
}

function ewayItem(line, serialNo, taxMode) {
  const item = state.items.find(row => row.id === line.itemId) || {};
  const taxable = lineTaxableAmount(line);
  const gstRate = num(line.gstRate);
  const imeis = imeiNumbersFromText(line.imeiNumbers);
  const name = itemNameByLine(line, item, serialNo);
  return {
    itemNo: serialNo,
    productName: name,
    productDesc: imeis.length ? [...new Set(imeis)].join(", ") : name,
    hsnCode: lineHsn(line, item),
    quantity: num(line.qty),
    qtyUnit: "PCS",
    taxableAmount: round2(taxable),
    sgstRate: taxMode === "IGST" ? 0 : gstRate / 2,
    cgstRate: taxMode === "IGST" ? 0 : gstRate / 2,
    igstRate: taxMode === "IGST" ? gstRate : 0,
    cessRate: 0,
    cessNonAdvol: 0
  };
}

function validateEwayBill(bill) {
  const messages = [];
  if (!Array.isArray(bill.itemList)) messages.push("E-way bill itemList missing.");
  if (bill.userGstin && bill.toGstin && bill.userGstin !== bill.toGstin) messages.push("userGstin must match buyer toGstin.");
  if (bill.supplyType !== "I") messages.push("Supply type must be I for inward purchase.");
  if (!bill.transType || Object.prototype.hasOwnProperty.call(bill, "transactionType")) messages.push("transType missing or wrong field name used.");
  if (!bill.userGstin) messages.push("Buyer GSTIN missing.");
  if (!bill.fromGstin || bill.fromGstin === "URP") messages.push("Supplier GSTIN missing.");
  if (!bill.docNo) messages.push("Document number missing.");
  if (!bill.docDate) messages.push("Document date missing.");
  if (!bill.fromPincode) messages.push("Supplier pincode missing.");
  if (!bill.toPincode) messages.push("Buyer pincode missing.");
  if (!bill.vehicleNo) messages.push("Vehicle number missing in Purchase Review E-Way Details.");
  if (!bill.transDistance || bill.transDistance === "0") messages.push("Transport distance missing in Purchase Review E-Way Details.");
  if (!bill.itemList.length) messages.push("No item lines found.");
  bill.itemList.forEach(item => {
    if (!item.hsnCode) messages.push(`${item.productName}: HSN missing.`);
    if (!item.quantity) messages.push(`${item.productName}: quantity missing.`);
  });
  const itemTaxable = round2(bill.itemList.reduce((sum, item) => sum + num(item.taxableAmount), 0));
  if (!amountsClose(itemTaxable, bill.totalValue, 1)) messages.push("Item taxable values do not match e-way totalValue.");
  const taxablePlusTaxes = round2(num(bill.totalValue) + num(bill.cgstValue) + num(bill.sgstValue) + num(bill.igstValue) + num(bill.OthValue));
  if (!amountsClose(taxablePlusTaxes, bill.totInvValue, 1)) messages.push("E-way totalValue plus taxes does not match invoice total.");
  return uniqueMessages(messages);
}

function validateEwayPayload(payload = {}) {
  const messages = [];
  if (!Array.isArray(payload.billLists)) messages.push("E-way JSON billLists must be an array.");
  if (!payload.version) messages.push("E-way JSON version missing.");
  return messages;
}

function exportPurchaseRegister() {
  const from = $("#reportFrom").value || "0000-01-01";
  const to = $("#reportTo").value || "9999-12-31";
  const rows = activeAccountingEntries("purchase")
    .filter(entry => entry.date >= from && entry.date <= to)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(entry => {
      const profile = profileById(entry.profileId);
      const supplier = partyById(entry.partyId) || {};
      return [
        entry.date,
        entry.number,
        profile.businessName || profile.label,
        profile.gstin,
        supplier.name || "",
        supplier.gstin || "",
        entry.taxMode || "",
        round2(entry.taxable),
        round2(entry.cgst),
        round2(entry.sgst),
        round2(entry.igst),
        round2(entry.gst),
        round2(entry.total),
        entry.reviewStatus || "",
        (entry.reviewMessages || []).join(" | "),
        (entry.attachments || []).map(file => file.storagePath || file.name).join(" | ")
      ];
    });
  const header = ["Date", "Bill No", "Buyer Business", "Buyer GSTIN", "Supplier", "Supplier GSTIN", "Tax Mode", "Taxable", "CGST", "SGST", "IGST", "GST", "Total", "Review Status", "Review Notes", "Invoice Soft Copy"];
  downloadCsv([header, ...rows], `purchase-register-${profileName(activeProfileId()).replace(/[^A-Za-z0-9]+/g, "-")}-${today()}.csv`);
  toast("Purchase register downloaded");
}

function exportCreditNoteRegister() {
  const from = $("#reportFrom")?.value || "0000-01-01";
  const to = $("#reportTo")?.value || "9999-12-31";
  const rows = activeEntries("creditNote")
    .filter(entry => entry.date >= from && entry.date <= to)
    .sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")))
    .map(entry => {
      const profile = profileById(entry.profileId);
      const buyer = partyById(entry.partyId) || {};
      return [
        entry.date,
        entry.number,
        profile.businessName || profile.label,
        profile.gstin,
        buyer.name || "",
        buyer.gstin || "",
        entry.originalInvoiceNumber || "",
        entry.originalInvoiceDate || "",
        entry.reason || "",
        entry.restock ? "Yes" : "No",
        entry.taxMode || "",
        round2(entry.taxable),
        round2(entry.cgst),
        round2(entry.sgst),
        round2(entry.igst),
        round2(entry.gst),
        round2(entry.roundOff),
        round2(entry.total),
        isCancelledEntry(entry) ? "Cancelled" : "Active"
      ];
    });
  const header = ["Date", "Credit Note No", "Seller Business", "Seller GSTIN", "Buyer", "Buyer GSTIN", "Original Invoice", "Original Invoice Date", "Reason", "Stock Updated", "Tax Mode", "Taxable", "CGST", "SGST", "IGST", "GST", "Round Off", "Total", "Status"];
  downloadCsv([header, ...rows], `credit-note-register-${profileName(activeProfileId()).replace(/[^A-Za-z0-9]+/g, "-")}-${today()}.csv`);
  toast("Credit note register downloaded");
}

function downloadJson(payload, fileName) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  downloadBlob(blob, fileName);
}

function downloadCsv(rows, fileName) {
  const csv = rows.map(row => row.map(csvCell).join(",")).join("\n");
  downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), fileName);
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function extractPincode(value) {
  const match = String(value || "").match(/\b\d{6}\b/);
  return match ? Number(match[0]) : 0;
}

function extractPincodes(value) {
  return [...String(value || "").matchAll(/\b\d{6}\b/g)].map(match => Number(match[0])).filter(Boolean);
}

function extractPreferredPincode(value) {
  const pins = extractPincodes(value);
  return pins.length ? pins[pins.length - 1] : 0;
}

function normalizePincode(value) {
  const match = String(value || "").match(/\b\d{6}\b/);
  return match ? match[0] : "";
}

function ewayDate(value) {
  const [year, month, day] = String(value || today()).split("-");
  return `${day}/${month}/${year}`;
}

function round2(value) {
  return Math.round(num(value) * 100) / 100;
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  downloadBlob(blob, `billing-backup-${today()}.json`);
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

function openChatBillDialog() {
  chatBillMessages = [];
  chatBillAttachments = [];
  pendingSmartBillReview = null;
  setChatBillBusy(false);
  $("#chatBillInput").value = "";
  $("#chatBillAttachmentInput").value = "";
  $("#chatBillThread").innerHTML = "";
  renderChatBillAttachments();
  $("#chatBillSummary").innerHTML = "";
  $("#chatBillDialog").showModal();
  pushChatBillHistory();
  resizeChatBillInput();
  setTimeout(() => {
    try {
      $("#chatBillInput").focus({ preventScroll: true });
    } catch {
      $("#chatBillInput").focus();
    }
  }, 80);
  if (window.lucide) lucide.createIcons();
}

function closeChatBillDialog(options = {}) {
  const dialog = $("#chatBillDialog");
  if (dialog?.open) dialog.close();
  if (!chatBillHistoryActive) return;
  chatBillHistoryActive = false;
  if (!options.fromHistory && window.history?.state?.chatBillOpen) {
    window.history.back();
  }
}

function pushChatBillHistory() {
  if (chatBillHistoryActive || !window.history?.pushState) return;
  try {
    const currentState = window.history.state && typeof window.history.state === "object" ? window.history.state : {};
    window.history.pushState({ ...currentState, chatBillOpen: true }, "", window.location.href);
    chatBillHistoryActive = true;
  } catch {
    chatBillHistoryActive = false;
  }
}

function closeChatBillOnBack() {
  if ($("#chatBillDialog")?.open) {
    closeChatBillDialog({ fromHistory: true });
  } else {
    chatBillHistoryActive = false;
  }
}

function fillChatBillSample() {
  $("#chatBillInput").value = "ABC Traders GSTIN 29ABCDE1234F1Z5, 2 iPhone 15 @65000";
  resizeChatBillInput();
}

function handleChatBillInputKeydown(event) {
  if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
  event.preventDefault();
  prepareChatBillDraft();
}

function resizeChatBillInput() {
  const input = $("#chatBillInput");
  if (!input) return;
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 150)}px`;
}

function setChatBillBusy(isBusy) {
  chatBillPreparing = isBusy;
  const sendButton = $("#prepareChatBillBtn");
  const sampleButton = $("#chatSampleBtn");
  if (sendButton) sendButton.disabled = isBusy;
  if (sampleButton) sampleButton.disabled = isBusy;
}

async function handleChatBillAttachmentInput(event) {
  const files = Array.from(event.target.files || []);
  event.target.value = "";
  if (!files.length) return;
  const openSlots = Math.max(0, MAX_CHAT_BILL_ATTACHMENTS - chatBillAttachments.length);
  if (!openSlots) return toast(`Attach up to ${MAX_CHAT_BILL_ATTACHMENTS} images`);
  for (const file of files.slice(0, openSlots)) {
    if (!CHAT_BILL_IMAGE_TYPES.includes(file.type)) {
      toast("Use PNG, JPG or WebP screenshots");
      continue;
    }
    if (file.size > MAX_CHAT_BILL_ATTACHMENT_BYTES) {
      toast(`${file.name} is too large. Use image below 6 MB.`);
      continue;
    }
    chatBillAttachments.push({
      id: uid(),
      name: file.name,
      type: file.type,
      size: file.size,
      base64: await fileToBase64(file)
    });
  }
  renderChatBillAttachments();
}

function renderChatBillAttachments() {
  const holder = $("#chatBillAttachments");
  if (!holder) return;
  holder.innerHTML = chatBillAttachments.map(file => `
    <span class="attachment-chip" title="${escapeHtml(file.name)}">
      <i data-lucide="image"></i>
      <span>${escapeHtml(file.name)}</span>
      <small>${escapeHtml(formatFileSize(file.size))}</small>
      <button type="button" class="mini-btn" data-chat-attachment-id="${escapeHtml(file.id)}" title="Remove"><i data-lucide="x"></i></button>
    </span>
  `).join("");
  $$("[data-chat-attachment-id]", holder).forEach(button => {
    button.addEventListener("click", () => {
      chatBillAttachments = chatBillAttachments.filter(file => file.id !== button.dataset.chatAttachmentId);
      renderChatBillAttachments();
    });
  });
  if (window.lucide) lucide.createIcons();
}

function formatFileSize(size) {
  const bytes = num(size);
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(bytes >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
}

async function prepareChatBillDraft() {
  if (chatBillPreparing) return;
  pendingSmartBillReview = null;
  const message = $("#chatBillInput").value.trim();
  const attachments = chatBillAttachments.slice();
  if (!message && !attachments.length) return toast("Enter sale details or attach image");
  setChatBillBusy(true);
  const userMessage = message || "Please read bill-to and ship-to details from attached screenshot.";
  appendChatBillMessage("user", formatChatBillUserMessage(userMessage, attachments), attachments, message);
  $("#chatBillInput").value = "";
  resizeChatBillInput();
  chatBillAttachments = [];
  renderChatBillAttachments();
  $("#chatBillSummary").innerHTML = `<span class="help-text">Checking details...</span>`;
  try {
    const fullMessage = chatBillMessages.filter(row => row.role === "user").map(row => row.text).join("\n");
    const allAttachments = chatBillMessages.filter(row => row.role === "user").flatMap(row => row.attachments || []);
    const cloudResult = await parseSaleChatWithCloud(fullMessage, allAttachments);
    const cloudError = lastSaleChatCloudError;
    if (!cloudResult) {
      const reason = cloudError || "ChatGPT did not return a response.";
      appendChatBillMessage("assistant", `Smart Bill needs ChatGPT for this. ${reason} Please fix the Cloud/OpenAI connection and send again.`);
      $("#chatBillSummary").innerHTML = `<strong>ChatGPT not connected</strong><span class="help-text">${escapeHtml(reason)}</span>`;
      return;
    }
    const parsed = applySaleChatDefaults(cloudResult.draft || {}, fullMessage);
    const cloudMissing = cloudResult.ready ? [] : (cloudResult.missingDetails?.length ? cloudResult.missingDetails : ["more sale bill details"]);
    const missing = saleChatMissingDetails([...cloudMissing, ...missingSaleBillDetails(parsed, fullMessage)]);
    if (missing.length) {
      const nextMissing = nextSaleMissingDetail(missing);
      const question = (cloudResult && cleanSaleAssistantMessage(cloudResult.assistantMessage))
        || buildMissingSaleQuestion(nextMissing, parsed);
      appendChatBillMessage("assistant", question);
      $("#chatBillSummary").innerHTML = `<strong>Need 1 more detail</strong><span class="help-text">${escapeHtml(shortMissingDetailLabel(nextMissing))}</span>`;
      return;
    }
    showSmartBillReview(parsed, fullMessage);
    appendChatBillMessage("assistant", "Please review the bill details below. If everything looks right, create the sale draft.");
  } finally {
    setChatBillBusy(false);
  }
}

function formatChatBillUserMessage(message, attachments = []) {
  const names = attachments.map(file => file.name).filter(Boolean);
  return names.length ? `${message}\nAttached image${names.length > 1 ? "s" : ""}: ${names.join(", ")}` : message;
}

function appendChatBillMessage(role, text, attachments = [], rawText = text) {
  chatBillMessages.push({ role, text, attachments, rawText });
  const node = document.createElement("div");
  node.className = `chat-message ${role}`;
  node.innerHTML = escapeHtml(text).replace(/\n/g, "<br>");
  $("#chatBillThread").appendChild(node);
  $("#chatBillThread").scrollTop = $("#chatBillThread").scrollHeight;
}

async function parseSaleChatWithCloud(message, attachments = []) {
  lastSaleChatCloudError = "";
  if (!cloudConfigured()) {
    lastSaleChatCloudError = "Cloud login is not loaded on this page.";
    return null;
  }
  if (!cloudClient) {
    lastSaleChatCloudError = "Cloud client is not ready. Refresh and login again.";
    return null;
  }
  if (!cloudSession) {
    lastSaleChatCloudError = "Please login to the billing app first.";
    return null;
  }
  try {
    const { data, error } = await cloudClient.functions.invoke("parse-sale-chat", {
      body: {
        message,
        attachments: attachments.map(file => ({
          fileName: file.name,
          mimeType: file.type,
          base64: file.base64
        })),
        activeProfileId: state.settings.activeProfileId,
        profiles: state.settings.profiles,
        profileAliases: buildProfileAliasPayload(),
        partyAliases: buildPartyAliasPayload(),
        items: state.items,
        parties: state.parties
      }
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  } catch (error) {
    lastSaleChatCloudError = await saleChatCloudErrorMessage(error);
    console.warn("Cloud sale parser unavailable", error);
    return null;
  }
}

async function saleChatCloudErrorMessage(error) {
  let responseMessage = "";
  try {
    const response = error?.context;
    if (response && typeof response.clone === "function") {
      const body = await response.clone().json();
      responseMessage = body?.error || body?.message || "";
    }
  } catch {}
  const message = [responseMessage, error?.message, error?.details, error?.hint]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (/Invalid header value|Authorization|Bearer|api key|OPENAI_API_KEY|sk-/i.test(message)) {
    return "OpenAI API key is invalid or has extra spaces/newlines. Reset OPENAI_API_KEY in Supabase.";
  }
  if (/OPENAI_API_KEY|OPENAI_MODEL/i.test(message)) return "OpenAI API key/model is not configured in Supabase.";
  if (/Failed to fetch|NetworkError|Could not resolve|resolve host|Load failed|fetch/i.test(message)) return "Cloud function could not be reached from this browser.";
  if (/401|403|JWT|auth|login|session/i.test(message)) return "Cloud login/session is not valid. Please logout and login again.";
  return message || "Cloud function did not return a valid response.";
}

function parseSaleChatLocal(message) {
  const explicitGstin = normalizeGstin(message.match(/\b\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]\b/i)?.[0] || "");
  const profile = activeProfile();
  const internalBuyer = extractInternalBuyerProfileFromMessage(message, { excludeProfileId: profile.id });
  const savedBuyer = internalBuyer ? null : extractBuyerPartyFromMessage(message, explicitGstin);
  const gstin = normalizeGstin(internalBuyer?.gstin || savedBuyer?.gstin || explicitGstin);
  const mentionedSeller = extractSellerProfileFromMessage(message, internalBuyer);
  const customerName = internalBuyer?.businessName || internalBuyer?.label || savedBuyer?.name || extractCustomerName(message, gstin) || (gstin ? `Customer ${gstin.slice(0, 6)}` : "Chat Customer");
  const status = /unpaid|credit|due/i.test(message) ? "Unpaid" : /partial/i.test(message) ? "Partial" : "Paid";
  const lines = parseSaleLines(message);
  const reviewMessages = uniqueMessages([
    gstin ? "" : "B2B customer GSTIN not found in chat. Please add GSTIN before final billing.",
    mentionedSeller && mentionedSeller.id !== profile.id
      ? `Chat mentioned seller ${profileName(mentionedSeller.id)}, but selected company is ${profileName(profile.id)}. Draft kept under selected company.`
      : ""
  ]);
  return {
    profileId: profile.id,
    customerName,
    customerGstin: gstin,
    status,
    notes: "Prepared from chat details. Review values before saving.",
    lines: lines.length ? lines : [{
      name: "Smart Bill Item",
      hsn: extractHsnCode(message) || DEFAULT_SALE_HSN,
      qty: 0,
      rate: lastAmount(message) || 0,
      gstRate: extractGstRate(message)
    }],
    customerAddress: internalBuyer?.address || savedBuyer?.address || extractCustomerAddress(message),
    customerPlace: internalBuyer?.state || savedBuyer?.place || "",
    reviewMessages
  };
}

function missingSaleBillDetails(parsed, sourceMessage) {
  const missing = [];
  const lines = Array.isArray(parsed.lines) ? parsed.lines : [];
  if (!String(parsed.customerName || "").trim() || /^chat customer$/i.test(parsed.customerName)) missing.push("customer business name");
  if (!isValidGstin(parsed.customerGstin)) missing.push("customer GSTIN");
  if (!String(parsed.customerAddress || "").trim()) missing.push("customer address");
  if (!lines.length) {
    missing.push("item name");
    missing.push("item quantity");
    missing.push("item rate");
  }
  lines.forEach((line, index) => {
    const isFallbackName = /^(chat sale|smart bill) item$/i.test(line.name || "");
    const label = line.name && !isFallbackName ? line.name : `item ${index + 1}`;
    if (!line.name || isFallbackName) missing.push(`${label} name`);
    if (!num(line.qty)) missing.push(`${label} quantity`);
    if (!num(line.rate)) missing.push(`${label} rate`);
    if (!String(line.hsn || "").trim()) missing.push(`${label} HSN/SAC`);
  });
  return uniqueMessages(missing);
}

function nextSaleMissingDetail(missing) {
  const details = uniqueMessages(Array.isArray(missing) ? missing : [missing]);
  const priority = [
    /customer business name|buyer name|party name|customer name|party/i,
    /customer gstin|buyer gstin|\bgstin\b/i,
    /item name|product name/i,
    /\bqty\b|\bquantity\b/i,
    /\brate\b|\bprice\b|\bamount\b/i,
    /customer address|buyer address|bill.?to address|ship.?to address|\baddress\b/i
  ];
  return priority.map(pattern => details.find(detail => pattern.test(detail))).find(Boolean) || details[0] || "more sale bill details";
}

function buildMissingSaleQuestion(missing, parsed) {
  const detail = nextSaleMissingDetail(missing);
  const buyer = parsed.customerName && !/^chat customer$/i.test(parsed.customerName) ? parsed.customerName : "the buyer";
  if (/customer business name|buyer name|party name|customer name|party/i.test(detail)) {
    return "Please share the buyer/party business name.";
  }
  if (/customer gstin|buyer gstin|\bgstin\b/i.test(detail)) {
    return `Please share the GSTIN for ${buyer}.`;
  }
  if (/item name|product name/i.test(detail)) {
    return "Please share the item name.";
  }
  if (/\bqty\b|\bquantity\b/i.test(detail)) {
    return `Please share the quantity${itemLabelFromMissing(detail)}.`;
  }
  if (/\brate\b|\bprice\b|\bamount\b/i.test(detail)) {
    return `Please share the rate${itemLabelFromMissing(detail)}.`;
  }
  if (/customer address|buyer address|bill.?to address|ship.?to address|\baddress\b/i.test(detail)) {
    return `Please share the bill-to address for ${buyer}.`;
  }
  return `Please share ${shortMissingDetailLabel(detail)}.`;
}

function itemLabelFromMissing(detail) {
  const cleaned = String(detail || "").replace(/\b(quantity|qty|rate|price|amount)\b/ig, "").trim();
  return cleaned && !/^item$/i.test(cleaned) ? ` for ${cleaned}` : "";
}

function shortMissingDetailLabel(detail) {
  if (/customer business name|buyer name|party name|customer name|party/i.test(detail)) return "Buyer/party name";
  if (/customer gstin|buyer gstin|\bgstin\b/i.test(detail)) return "Buyer GSTIN";
  if (/item name|product name/i.test(detail)) return "Item name";
  if (/\bqty\b|\bquantity\b/i.test(detail)) return "Quantity";
  if (/\brate\b|\bprice\b|\bamount\b/i.test(detail)) return "Rate";
  if (/customer address|buyer address|bill.?to address|ship.?to address|\baddress\b/i.test(detail)) return "Bill-to address";
  return String(detail || "More sale bill details");
}

function saleChatMissingDetails(details) {
  return uniqueMessages(details).filter(detail => !/\bgst\s*(rate|percentage|%)?\b/i.test(detail) && !/\b(payment\s*)?status\b|\bpaid\b|\bunpaid\b|\bpartial\b/i.test(detail));
}

function cleanSaleAssistantMessage(message) {
  const cleaned = typeof message === "string" ? message.trim() : "";
  if (!cleaned) return "";
  return !/\bgst\s*(rate|percentage|%)?\b|\b(payment\s*)?status\b|\bpaid\b|\bunpaid\b|\bpartial\b/i.test(cleaned) ? cleaned : "";
}

function extractProfileFromMessage(message) {
  return profileMentions(message)[0];
}

function extractSellerProfileFromMessage(message, buyerProfile) {
  const explicit = extractProfileNearKeyword(message, ["bill from", "sold by", "seller", "from", "our company"]);
  if (explicit && explicit.id !== buyerProfile?.id) return explicit;
  const mentions = profileMentions(message).filter(profile => profile.id !== buyerProfile?.id);
  return mentions[0];
}

function extractInternalBuyerProfileFromMessage(message, options = {}) {
  const excludeProfileId = options.excludeProfileId || "";
  const explicit = extractProfileNearKeyword(message, ["bill to", "ship to", "buyer", "customer", "to"]);
  if (explicit && explicit.id !== excludeProfileId) return explicit;
  const mentions = profileMentions(message).filter(profile => profile.id !== excludeProfileId);
  if (excludeProfileId) return mentions[0] || null;
  return mentions.length > 1 ? mentions[1] : null;
}

function extractBuyerPartyFromMessage(message, explicitGstin = "") {
  if (explicitGstin) {
    const byGstin = customerParties().find(party => normalizeGstin(party.gstin) === explicitGstin);
    if (byGstin) return byGstin;
  }
  return extractPartyNearKeyword(message, ["bill to", "ship to", "buyer", "customer", "party", "to"]) || partyMentions(message)[0] || null;
}

function extractPartyNearKeyword(message, keywords) {
  for (const keyword of keywords) {
    const pattern = new RegExp(`\\b${escapeRegExp(keyword).replace(/\s+/g, "\\s+")}\\b`, "ig");
    let keywordMatch;
    while ((keywordMatch = pattern.exec(message))) {
      const afterKeyword = message.slice(keywordMatch.index + keywordMatch[0].length, keywordMatch.index + keywordMatch[0].length + 140);
      const match = partyMentions(afterKeyword)[0];
      if (match) return match;
    }
  }
  return null;
}

function extractProfileNearKeyword(message, keywords) {
  for (const keyword of keywords) {
    const pattern = new RegExp(`\\b${escapeRegExp(keyword).replace(/\s+/g, "\\s+")}\\b`, "ig");
    let keywordMatch;
    while ((keywordMatch = pattern.exec(message))) {
      const afterKeyword = message.slice(keywordMatch.index + keywordMatch[0].length, keywordMatch.index + keywordMatch[0].length + 140);
      const match = profileMentions(afterKeyword)[0];
      if (match) return match;
    }
  }
  return null;
}

function profileMentions(message) {
  return profileMentionRows(message).map(row => row.profile);
}

function profileMentionRows(message) {
  return state.settings.profiles
    .map(profile => ({ profile, ...profileAliasMatch(profile, message) }))
    .filter(row => row.index >= 0)
    .sort((a, b) => a.index - b.index || b.score - a.score);
}

function profileAliasMatch(profile, message) {
  const rawMessage = String(message || "");
  const normalizedText = ` ${normalizeForAlias(rawMessage)} `;
  const rawUpper = rawMessage.toUpperCase();
  const gstin = normalizeGstin(profile.gstin);
  let best = { index: -1, score: 0 };
  if (gstin) {
    const gstIndex = rawUpper.indexOf(gstin);
    if (gstIndex >= 0) best = { index: gstIndex, score: 1000 };
  }
  profileAliases(profile).forEach(alias => {
    const normalizedAlias = normalizeForAlias(alias);
    if (!normalizedAlias || AMBIGUOUS_PROFILE_ALIASES.has(normalizedAlias)) return;
    const search = ` ${normalizedAlias} `;
    const aliasIndex = normalizedText.indexOf(search);
    if (aliasIndex < 0) return;
    const score = normalizedAlias.length;
    const plainIndex = Math.max(0, aliasIndex - 1);
    if (best.index < 0 || plainIndex < best.index || (plainIndex === best.index && score > best.score)) {
      best = { index: plainIndex, score };
    }
  });
  return best;
}

function buildProfileAliasPayload() {
  return state.settings.profiles.map(profile => ({
    id: profile.id,
    businessName: profile.businessName || profile.label || "",
    legalName: profile.legalName || "",
    gstin: normalizeGstin(profile.gstin),
    state: profile.state || "",
    address: profile.address || "",
    aliases: profileAliases(profile)
  }));
}

function profileAliases(profile) {
  return uniqueMessages([
    profile.businessName,
    profile.label,
    profile.legalName,
    profile.gstin,
    ...(GST_PROFILE_ALIASES[profile.id] || [])
  ]).filter(alias => {
    const normalized = normalizeForAlias(alias);
    return normalized && !AMBIGUOUS_PROFILE_ALIASES.has(normalized);
  });
}

function normalizeForAlias(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function customerParties() {
  return partiesForRole("Customer");
}

function supplierParties() {
  return partiesForRole("Supplier");
}

function partiesForRole(role) {
  const wanted = role === "Supplier" ? ["Supplier", "Both"] : ["Customer", "Both"];
  return state.parties.filter(party => wanted.includes(normalizePartyType(party.type)));
}

function partyMentions(message) {
  return customerParties()
    .map(party => ({ party, ...partyAliasMatch(party, message) }))
    .filter(row => row.index >= 0)
    .sort((a, b) => a.index - b.index || b.score - a.score)
    .map(row => row.party);
}

function partyAliasMatch(party, message) {
  const rawMessage = String(message || "");
  const normalizedText = ` ${normalizeForAlias(rawMessage)} `;
  const rawUpper = rawMessage.toUpperCase();
  const gstin = normalizeGstin(party.gstin);
  let best = { index: -1, score: 0 };
  if (gstin) {
    const gstIndex = rawUpper.indexOf(gstin);
    if (gstIndex >= 0) best = { index: gstIndex, score: 1000 };
  }
  partyAliases(party).forEach(alias => {
    const normalizedAlias = normalizeForAlias(alias);
    if (!normalizedAlias || GENERIC_PARTY_ALIASES.has(normalizedAlias)) return;
    const search = ` ${normalizedAlias} `;
    const aliasIndex = normalizedText.indexOf(search);
    if (aliasIndex < 0) return;
    const score = normalizedAlias.length;
    const plainIndex = Math.max(0, aliasIndex - 1);
    if (best.index < 0 || plainIndex < best.index || (plainIndex === best.index && score > best.score)) {
      best = { index: plainIndex, score };
    }
  });
  return best;
}

function buildPartyAliasPayload() {
  return customerParties().map(party => ({
    id: party.id,
    name: party.name || "",
    gstin: normalizeGstin(party.gstin),
    phone: party.phone || "",
    email: party.email || "",
    place: party.place || "",
    address: party.address || "",
    aliases: partyAliases(party)
  }));
}

function partyAliases(party) {
  return uniqueMessages([
    party.name,
    party.gstin,
    ...partyAliasList(party),
    ...derivedPartyAliases(party.name)
  ]).filter(alias => {
    const normalized = normalizeForAlias(alias);
    return normalized && !GENERIC_PARTY_ALIASES.has(normalized);
  });
}

function derivedPartyAliases(name) {
  const words = normalizeForAlias(name).split(" ").filter(word => word.length > 1);
  const aliases = [];
  if (words[0] && words[0].length >= 3) aliases.push(words[0]);
  const initials = words.map(word => word[0]).join("");
  if (initials.length >= 3) aliases.push(initials);
  const withoutSuffix = words.filter(word => !/^(traders?|digitals?|mobiles?|communications?|solutions?|infotech|enterprises?|services?)$/.test(word));
  if (withoutSuffix.length && withoutSuffix.length !== words.length) {
    aliases.push(withoutSuffix.join(" "));
  }
  return aliases;
}

function partyAliasList(party) {
  return cleanPartyAliasList(party?.aliases || "");
}

function extractCustomerName(message, gstin) {
  const beforeGstin = gstin ? message.slice(0, message.toUpperCase().indexOf(gstin)) : message;
  const match = beforeGstin.match(/(?:bill\s*to|customer|party|to|for)\s+([^,\n]+)/i);
  const namedPart = match?.[1] || leadingCustomerName(beforeGstin);
  if (!namedPart) return "";
  return namedPart
    .replace(/\bgstin\b.*$/i, "")
    .replace(/\baddress\b.*$/i, "")
    .replace(/\b(invoice|bill|sale)\b/ig, "")
    .trim();
}

function extractCustomerAddress(message) {
  const match = String(message || "").match(/\b(?:bill\s*to\s*address|billing\s*address|buyer\s*address|customer\s*address|address|addr)\s*[:\-]?\s*([^;\n]+)/i);
  if (!match) return "";
  return match[1]
    .split(/\s*,\s*(?=\d+(?:\.\d+)?\s*[A-Za-z]|[A-Za-z][^,]*(?:@|at|rate)\s*\d)/i)[0]
    .replace(/\b(?:ship\s*to|item|product|gstin)\b.*$/i, "")
    .trim();
}

function leadingCustomerName(message) {
  const firstPart = String(message || "").split(/[,\n;]/)[0].trim();
  if (!/^[A-Za-z]/.test(firstPart)) return "";
  if (/\b(?:@|at|rate|qty|nos?|pcs?|pieces?|iphone|ipad|macbook|airpods)\b/i.test(firstPart)) return "";
  return firstPart;
}

function extractGstRate(text) {
  return extractExplicitGstRate(text) || DEFAULT_SALE_GST_RATE;
}

function extractExplicitGstRate(text) {
  const value = String(text || "");
  const match = value.match(/\b(?:gst|tax)\s*(?:rate)?\s*[:\-]?\s*(0|3|5|12|18|28)\s*%?/i)
    || value.match(/\b(0|3|5|12|18|28)\s*%\s*(?:gst|tax)\b/i)
    || value.match(/\b(0|3|5|12|18|28)\s*%\b/i);
  return match ? Number(match[1]) : 0;
}

function extractHsnCode(text) {
  const value = String(text || "");
  const match = value.match(/\b(?:hsn|sac)(?:\s*code)?\s*(?:is|=|:|-)?\s*([0-9]{4,8})\b/i)
    || value.match(/\b([0-9]{4,8})\s*(?:hsn|sac)\b/i);
  return match ? match[1] : "";
}

function applySaleChatDefaults(parsed, sourceMessage) {
  const draft = enforceSelectedSellerSmartBill(parsed || {}, sourceMessage);
  const explicitHsn = extractHsnCode(sourceMessage);
  const explicitGstRate = extractExplicitGstRate(sourceMessage);
  const lines = Array.isArray(draft.lines) ? draft.lines : [];
  const ratesIncludeGst = saleChatRatesIncludeGst(sourceMessage);
  const hasPricedLines = lines.some(line => num(line.rate) > 0);
  const selectedProfileId = activeProfileId();
  const parsedProfile = state.settings.profiles.find(profile => profile.id === parsed?.profileId);
  const reviewMessages = uniqueMessages([
    ...(Array.isArray(draft.reviewMessages) ? draft.reviewMessages : []),
    parsedProfile && parsedProfile.id !== selectedProfileId
      ? `Chat mentioned seller ${profileName(parsedProfile.id)}, but selected company is ${profileName(selectedProfileId)}. Draft kept under selected company.`
      : "",
    ratesIncludeGst && hasPricedLines ? "Smart Bill treated the entered rates as GST-inclusive." : ""
  ]);
  return {
    ...draft,
    profileId: selectedProfileId,
    status: draft.status || "Paid",
    reviewMessages,
    lines: lines.map(line => {
      const gstRate = resolveSaleLineGstRate(line, explicitGstRate);
      const taxableRate = ratesIncludeGst ? taxableRateFromInclusive(line.rate, gstRate) : num(line.rate);
      return {
        ...line,
        hsn: resolveSaleLineHsn(line, explicitHsn),
        rate: taxableRate,
        grossRate: ratesIncludeGst ? num(line.rate) : inclusiveRateFromTaxable(taxableRate, gstRate),
        gstRate
      };
    })
  };
}

function enforceSelectedSellerSmartBill(draft, sourceMessage) {
  const selectedProfile = activeProfile();
  const result = { ...draft };
  const internalBuyer = extractInternalBuyerProfileFromMessage(sourceMessage, { excludeProfileId: selectedProfile.id });
  const savedBuyer = internalBuyer ? null : extractBuyerPartyFromMessage(sourceMessage, normalizeGstin(result.customerGstin));
  if (internalBuyer) {
    applySmartBillBuyerProfile(result, internalBuyer);
  } else if (savedBuyer && shouldUseSavedSmartBillBuyer(result, savedBuyer, selectedProfile)) {
    applySmartBillBuyerParty(result, savedBuyer);
  } else if (smartBillCustomerMatchesProfile(result, selectedProfile)) {
    result.customerName = "";
    result.customerGstin = "";
    result.customerAddress = "";
    result.customerPlace = "";
  }
  result.profileId = selectedProfile.id;
  return result;
}

function shouldUseSavedSmartBillBuyer(draft, party, selectedProfile) {
  return smartBillCustomerMatchesProfile(draft, selectedProfile)
    || !String(draft.customerName || "").trim()
    || !normalizeGstin(draft.customerGstin)
    || partyAliasMatch(party, draft.customerName).index >= 0
    || normalizeGstin(draft.customerGstin) === normalizeGstin(party.gstin);
}

function applySmartBillBuyerProfile(draft, profile) {
  draft.customerName = profile.businessName || profile.label || "";
  draft.customerGstin = normalizeGstin(profile.gstin);
  draft.customerAddress = profile.address || "";
  draft.customerPlace = profile.state || stateNameFromGstin(profile.gstin) || "";
}

function applySmartBillBuyerParty(draft, party) {
  draft.customerName = party.name || "";
  draft.customerGstin = normalizeGstin(party.gstin);
  draft.customerAddress = party.address || "";
  draft.customerPlace = party.place || stateNameFromGstin(party.gstin) || "";
}

function smartBillCustomerMatchesProfile(draft, profile) {
  if (!profile) return false;
  const customerGstin = normalizeGstin(draft.customerGstin);
  const profileGstin = normalizeGstin(profile.gstin);
  if (customerGstin && profileGstin && customerGstin === profileGstin) return true;
  const customerName = String(draft.customerName || "").trim();
  return Boolean(customerName && profileAliasMatch(profile, customerName).index >= 0);
}

function saleChatRatesIncludeGst(sourceMessage) {
  const text = String(sourceMessage || "");
  return !/\b(?:plus|add|extra|excluding|excluded|exclusive|without|before)\s+(?:gst|tax)\b|\b(?:gst|tax)\s+(?:extra|additional|separate|excluded|exclusive)\b|\+\s*(?:gst|tax)\b|\bex[-\s]?(?:gst|tax)\b/i.test(text);
}

function taxableRateFromInclusive(rate, gstRate) {
  const inclusiveRate = num(rate);
  const taxRate = num(gstRate);
  if (!inclusiveRate || !taxRate) return inclusiveRate;
  return Number((inclusiveRate / (1 + taxRate / 100)).toFixed(6));
}

function inclusiveRateFromTaxable(rate, gstRate) {
  const taxableRate = num(rate);
  const taxRate = num(gstRate);
  if (!taxableRate || !taxRate) return taxableRate;
  return round2(taxableRate * (1 + taxRate / 100));
}

function resolveSaleLineHsn(line, explicitHsn = "") {
  const currentHsn = normalizeLineHsn(line?.hsn);
  const requestedHsn = normalizeLineHsn(explicitHsn);
  if (requestedHsn && (!currentHsn || currentHsn === DEFAULT_SALE_HSN)) return requestedHsn;
  return currentHsn || requestedHsn || inferHsnFromItemName(line?.name);
}

function resolveSaleLineGstRate(line, explicitGstRate = 0) {
  if (explicitGstRate) return explicitGstRate;
  return DEFAULT_SALE_GST_RATE;
}

function parseSaleLines(message) {
  const stockLines = parseStockStyleSaleLines(message);
  const chunks = message.split(/[\n;]/).flatMap(part => part.split(/\s*,\s*(?=\d+(?:\.\d+)?\s*[A-Za-z]|[A-Za-z][^,]*(?:@|at|rate)\s*\d)/i));
  const lines = [...stockLines];
  for (const chunk of chunks) {
    const pattern = /\b(\d+(?:\.\d+)?)\s*(?:x|nos?|pcs?|pieces?|qty)?\s+([A-Za-z0-9][A-Za-z0-9 \-+/().]{1,70}?)\s+(?:at|@|rate)\s*(\d+(?:,\d{3})*(?:\.\d+)?)/ig;
    let match;
    while ((match = pattern.exec(chunk))) {
      const name = cleanSaleItemName(match[2]);
      const rate = Number(match[3].replace(/,/g, ""));
      if (name && rate > 0 && !hasSimilarSaleLine(lines, name, num(match[1]) || 1, rate)) {
        lines.push({
          name,
          hsn: hsnForSaleLine(name, chunk, message),
          qty: num(match[1]) || 1,
          rate,
          gstRate: extractGstRate(chunk)
        });
      }
    }
    if (!hasSalePartyContext(chunk)) {
      const noQtyPattern = /\b([A-Za-z][A-Za-z0-9 \-+/().]{1,70}?)\s+(?:at|@|rate)\s*(\d+(?:,\d{3})*(?:\.\d+)?)/ig;
      while ((match = noQtyPattern.exec(chunk))) {
        const name = cleanSaleItemName(match[1]);
        const rate = Number(match[2].replace(/,/g, ""));
        const hasSameNameAndRate = lines.some(line => line.name.toLowerCase() === name.toLowerCase() && num(line.rate) === rate);
        if (name && rate > 0 && !hasSameNameAndRate) {
          lines.push({
            name,
            hsn: hsnForSaleLine(name, chunk, message),
            qty: 0,
            rate,
            gstRate: extractGstRate(chunk)
          });
        }
      }
    }
    if (!/(?:@|at|rate)\s*\d/i.test(chunk) && !hasSalePartyContext(chunk)) {
      const noRatePattern = /\b(\d+(?:\.\d+)?)\s*(?:x|nos?|pcs?|pieces?|qty)?\s+([A-Za-z][A-Za-z0-9 \-+/().]{1,70})\b/ig;
      while ((match = noRatePattern.exec(chunk))) {
        const name = cleanSaleItemName(match[2]);
        const qty = num(match[1]);
        if (name && qty > 0 && !hasSimilarSaleLine(lines, name, qty, 0)) {
          lines.push({
            name,
            hsn: hsnForSaleLine(name, chunk, message),
            qty,
            rate: 0,
            gstRate: extractGstRate(chunk)
          });
        }
      }
    }
  }
  return lines.slice(0, 20);
}

function hasSalePartyContext(value) {
  return /\b(?:gstin|bill\s*to|ship\s*to|customer|party|address|addr)\b/i.test(String(value || ""));
}

function parseStockStyleSaleLines(message) {
  const lines = [];
  let currentSection = "";
  String(message || "").split(/[\n;]/).forEach(rawLine => {
    const line = cleanStockInputLine(rawLine);
    if (!line) return;
    const section = stockSectionLabel(line);
    if (section && !/\b(?:qty|nos?|pcs?|pieces?|@|rate|at)\b/i.test(line)) {
      currentSection = section;
      return;
    }
    const match = line.match(/^(.+?)\s*(?:[-\u2013\u2014:]|\s)\s*(\d+(?:\.\d+)?)\s*(?:qty|nos?|pcs?|pieces?)\s*(?:@|at|rate)\s*(\d+(?:,\d{3})*(?:\.\d+)?)/i);
    if (!match) return;
    const lineSection = stockSectionLabel(match[1]) || currentSection;
    const baseName = cleanSaleItemName(match[1].replace(/^(?:fresh|activated|activation|sealed|open box|demo|used)\s+stock\b/i, ""));
    const rate = Number(match[3].replace(/,/g, ""));
    if (!baseName || rate <= 0) return;
    const name = lineSection ? `${lineSection} - ${baseName}` : baseName;
    lines.push({
      name,
      hsn: hsnForSaleLine(baseName, line, message),
      qty: num(match[2]) || 1,
      rate,
      gstRate: extractGstRate(line)
    });
  });
  return lines;
}

function cleanStockInputLine(value) {
  return String(value || "")
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, "")
    .replace(/^[\s*\u2022+\-\u2013\u2014]+/g, "")
    .replace(/[*_]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stockSectionLabel(value) {
  const match = String(value || "").match(/\b(fresh|activated|activation|sealed|open box|demo|used)\s+stock\b/i);
  if (!match) return "";
  const normalized = match[0].replace(/\s+/g, " ").toLowerCase();
  if (normalized.startsWith("fresh")) return "Fresh Stock";
  if (normalized.startsWith("activated") || normalized.startsWith("activation")) return "Activated Stock";
  if (normalized.startsWith("open box")) return "Open Box Stock";
  return normalized.split(" ").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function cleanSaleItemName(value) {
  return String(value || "")
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, "")
    .replace(/\b(each|hsn|sac|gst|tax|paid|unpaid|partial)\b.*$/i, "")
    .replace(/[-\u2013\u2014:]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function hasSimilarSaleLine(lines, name, qty, rate) {
  const normalizedName = name.toLowerCase();
  return lines.some(line => line.name.toLowerCase() === normalizedName && num(line.qty) === qty && num(line.rate) === rate);
}

function hsnForSaleLine(name, lineText, sourceMessage) {
  return extractHsnCode(lineText) || extractHsnCode(sourceMessage) || inferHsnFromItemName(name);
}

function inferHsnFromItemName(name) {
  const normalizedName = String(name || "").replace(/^(?:fresh|activated|activation|sealed|open box|demo|used)\s+stock\s+-\s+/i, "").toLowerCase();
  const existing = state.items.find(item => {
    const itemName = item.name.toLowerCase();
    return itemName === String(name || "").toLowerCase() || itemName === normalizedName;
  });
  if (existing?.hsn) return existing.hsn;
  return DEFAULT_SALE_HSN;
}

function inferGstRateFromItemName(name) {
  return DEFAULT_SALE_GST_RATE;
}

function isApplePhoneItem(name) {
  return /\biphone\b/i.test(String(name || ""));
}

function buildChatSaleDraft(parsed, sourceMessage) {
  const profileId = activeProfileId();
  const partyId = ensureChatCustomer(parsed);
  const lines = parsed.lines.map(line => {
    const item = ensureChatItem(line);
    return {
      itemId: item.id,
      itemName: item.name || line.name || "",
      qty: num(line.qty) || 1,
      rate: num(line.rate),
      grossRate: lineInclusiveUnitRate(line),
      gstRate: num(line.gstRate)
    };
  });
  return {
    profileId,
    date: today(),
    number: nextEntryNumber("sale", profileId),
    partyId,
    status: parsed.status || "Paid",
    notes: parsed.notes || `Prepared from chat: ${sourceMessage.slice(0, 160)}`,
    lines,
    reviewMessages: parsed.reviewMessages || [],
    reviewStatus: parsed.reviewMessages?.length ? "Needs Review" : "Ready",
    source: "chat"
  };
}

function ensureChatCustomer(parsed) {
  const normalizedGstin = normalizeGstin(parsed.customerGstin);
  const customerName = String(parsed.customerName || "").trim();
  const existing = state.parties.find(party => (
    normalizedGstin && normalizeGstin(party.gstin) === normalizedGstin
  ) || String(party.name || "").toLowerCase() === customerName.toLowerCase() || partyAliasMatch(party, customerName).index >= 0);
  if (existing) {
    ensurePartyRole(existing, "Customer");
    updateExistingChatCustomer(existing, parsed, normalizedGstin);
    return existing.id;
  }
  const party = {
    id: uid(),
    name: parsed.customerName || "Chat Customer",
    type: "Customer",
    gstin: normalizedGstin,
    phone: "",
    place: parsed.customerPlace || stateNameFromGstin(normalizedGstin) || stateCodeFromGstin(normalizedGstin) || "",
    address: parsed.customerAddress || ""
  };
  state.parties.push(party);
  return party.id;
}

function updateExistingChatCustomer(party, parsed, normalizedGstin) {
  if (!normalizeGstin(party.gstin) && normalizedGstin) party.gstin = normalizedGstin;
  if (!String(party.address || "").trim() && parsed.customerAddress) party.address = parsed.customerAddress;
  if (!String(party.place || "").trim()) {
    party.place = parsed.customerPlace || stateNameFromGstin(normalizedGstin) || stateCodeFromGstin(normalizedGstin) || "";
  }
  if (parsed.customerName) appendPartyAlias(party, parsed.customerName);
}

function ensureChatItem(line) {
  const existing = state.items.find(item => item.name.toLowerCase() === String(line.name || "").toLowerCase());
  if (existing) return existing;
  const item = {
    id: uid(),
    name: line.name || "Smart Bill Item",
    hsn: lineHsn(line, {}),
    gstRate: num(line.gstRate) || 18,
    saleRate: lineInclusiveUnitRate(line),
    purchaseRate: 0,
    openingStock: 0,
    minStock: 0
  };
  state.items.push(item);
  return item;
}

function showSmartBillReview(parsed, sourceMessage) {
  pendingSmartBillReview = { parsed: clone(parsed), sourceMessage };
  $("#chatBillSummary").innerHTML = renderSmartBillReview(parsed);
  $("#confirmSmartBillDraftBtn")?.addEventListener("click", confirmSmartBillReview);
  $("#correctSmartBillDraftBtn")?.addEventListener("click", focusSmartBillCorrection);
}

function confirmSmartBillReview() {
  if (!pendingSmartBillReview) return toast("Prepare Smart Bill details first");
  const missing = saleChatMissingDetails(missingSaleBillDetails(pendingSmartBillReview.parsed, pendingSmartBillReview.sourceMessage));
  if (missing.length) {
    const nextMissing = nextSaleMissingDetail(missing);
    appendChatBillMessage("assistant", buildMissingSaleQuestion(nextMissing, pendingSmartBillReview.parsed));
    $("#chatBillSummary").innerHTML = `<strong>Need 1 more detail</strong><span class="help-text">${escapeHtml(shortMissingDetailLabel(nextMissing))}</span>`;
    pendingSmartBillReview = null;
    return;
  }
  const draft = buildChatSaleDraft(pendingSmartBillReview.parsed, pendingSmartBillReview.sourceMessage);
  saveState();
  renderAll();
  pendingSmartBillReview = null;
  closeChatBillDialog();
  openEntry("sale", null, draft);
  toast("Sale draft ready. Review and save.");
}

function focusSmartBillCorrection() {
  $("#chatBillInput").focus();
  toast("Type the correction and send");
}

function renderSmartBillReview(parsed) {
  const profile = profileById(parsed.profileId || activeProfileId());
  const party = smartBillReviewParty(parsed);
  const lines = smartBillReviewLines(parsed);
  const calculated = calculateEntryTotals(lines, profile, party, "sale");
  const shipTo = smartBillShipTo(parsed, party);
  const invoiceNo = nextEntryNumber("sale", profile.id);
  const taxSplit = calculated.taxMode === "IGST"
    ? `<span>IGST</span><strong>${money(calculated.igst)}</strong>`
    : `<span>CGST</span><strong>${money(calculated.cgst)}</strong><span>SGST</span><strong>${money(calculated.sgst)}</strong>`;
  return `
    <section class="smart-review">
      <div class="smart-review-head">
        <div>
          <span>Review Before Saving</span>
          <strong>${escapeHtml(invoiceNo)}</strong>
        </div>
        <div>
          <span>Total</span>
          <strong>${money(calculated.total)}</strong>
        </div>
      </div>
      <div class="smart-review-parties">
        ${smartBillPartyCard("Seller", profile.businessName || profile.label, profile.gstin, profile.address || profile.state)}
        ${smartBillPartyCard("Buyer", party.name, party.gstin, party.address || party.place)}
      </div>
      <div class="smart-review-addresses">
        ${smartBillPartyCard("Bill To", party.name, party.gstin, party.address || party.place)}
        ${smartBillPartyCard("Ship To", shipTo.name, shipTo.gstin, shipTo.address || shipTo.place)}
      </div>
      <div class="smart-review-items">
        <table>
          <thead><tr><th>Item</th><th>HSN</th><th class="num">Qty</th><th class="num">Rate per quantity</th><th class="num">GST</th><th class="num">Amount</th></tr></thead>
          <tbody>
            ${lines.map(line => {
              const lineTotal = lineGrossAmount(line);
              return `<tr>
                <td>${escapeHtml(line.name || "Item")}</td>
                <td>${escapeHtml(lineHsn(line, {}))}</td>
                <td class="num">${formatQty(line.qty)}</td>
                <td class="num">${money(lineGrossRate(line))}</td>
                <td class="num">${num(line.gstRate)}%</td>
                <td class="num">${money(lineTotal)}</td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
      <div class="smart-review-totals">
        <span>Taxable</span><strong>${money(calculated.taxable)}</strong>
        ${taxSplit}
        <span>GST Total</span><strong>${money(calculated.gst)}</strong>
        <span>Grand Total</span><strong>${money(calculated.total)}</strong>
      </div>
      ${parsed.reviewMessages?.length ? `<div class="smart-review-notes">${parsed.reviewMessages.map(message => `<span>${escapeHtml(message)}</span>`).join("")}</div>` : ""}
      <div class="smart-review-actions">
        <button type="button" class="secondary-btn" id="correctSmartBillDraftBtn">Add Correction</button>
        <button type="button" class="primary-btn" id="confirmSmartBillDraftBtn">Create Draft</button>
      </div>
    </section>
  `;
}

function smartBillReviewParty(parsed) {
  const gstin = normalizeGstin(parsed.customerGstin);
  return {
    name: parsed.customerName || "Customer",
    gstin: gstin || "-",
    address: parsed.customerAddress || "",
    place: parsed.customerPlace || stateNameFromGstin(gstin) || ""
  };
}

function smartBillReviewLines(parsed) {
  const lines = Array.isArray(parsed.lines) ? parsed.lines : [];
  return lines.map(line => ({
    name: line.name || "Smart Bill Item",
    hsn: lineHsn(line, {}),
    qty: num(line.qty) || 1,
    rate: num(line.rate),
    grossRate: lineInclusiveUnitRate(line),
    gstRate: num(line.gstRate) || DEFAULT_SALE_GST_RATE
  }));
}

function smartBillShipTo(parsed, party) {
  const notes = String(parsed.notes || "");
  const shipNote = notes.match(/ship\s*to\s*[:\-]?\s*([\s\S]+)/i)?.[1]?.trim();
  return {
    name: parsed.shipToName || (shipNote ? "Ship To" : `${party.name} (same as Bill To)`),
    gstin: normalizeGstin(parsed.shipToGstin) || party.gstin,
    address: parsed.shipToAddress || shipNote || party.address || party.place,
    place: parsed.shipToPlace || party.place
  };
}

function smartBillPartyCard(title, name, gstin, address) {
  return `<div class="smart-party-card">
    <span>${escapeHtml(title)}</span>
    <strong>${escapeHtml(name || "-")}</strong>
    <p>GSTIN: ${escapeHtml(gstin || "-")}</p>
    <p>${escapeHtml(address || "-")}</p>
  </div>`;
}

async function handlePurchaseInvoiceUpload(event) {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;
  const appendToActive = event.currentTarget?.dataset?.purchaseImportAppend === "true";
  let batch = appendToActive ? purchaseImportBatchById(activePurchaseImportBatchId) : null;
  if (!batch || batch.status === "completed") batch = createPurchaseImportBatch();
  activePurchaseImportBatchId = batch.id;
  const documents = files.map(file => createPurchaseImportDocument(batch, file));
  documents.forEach((document, index) => {
    const file = files[index];
    purchaseImportFiles.set(document.id, file);
    purchaseUploadQueue.push({ batchId: batch.id, documentId: document.id, file });
  });
  batch.fileCount = purchaseImportDocuments(batch.id).length;
  batch.status = "extracting";
  touchPurchaseImportEntity(batch);
  activePurchaseImportDocumentId = documents[0]?.id || activePurchaseImportDocumentId;
  event.target.value = "";
  saveState({ skipCloud: true });
  queuePurchaseImportCloudSync(batch.id);
  openPurchaseImportInbox(batch.id);
  renderPurchaseImportInbox();
  processQueuedPurchaseInvoiceUpload();
}

function createPurchaseImportBatch() {
  const batch = entityWithLocalMeta({
    id: uid(),
    status: "extracting",
    fileCount: 0,
    approvedCount: 0,
    completedAt: "",
    label: ""
  });
  state.purchaseImportBatches.unshift(batch);
  return batch;
}

function createPurchaseImportDocument(batch, file) {
  const document = entityWithLocalMeta({
    id: uid(),
    batchId: batch.id,
    fileName: file.name || "Invoice",
    mimeType: file.type || "application/octet-stream",
    size: file.size || 0,
    fileHash: "",
    status: "queued",
    selected: false,
    parsed: normalizePurchaseImportParsedForState({ fileName: file.name }, file.name),
    validationErrors: [],
    validationWarnings: [],
    duplicatePurchaseId: "",
    approvedPurchaseId: "",
    error: ""
  });
  state.purchaseImportDocuments.push(document);
  return document;
}

function processQueuedPurchaseInvoiceUpload() {
  while (purchaseUploadWorkers < PURCHASE_IMPORT_CONCURRENCY && purchaseUploadQueue.length) {
    const job = purchaseUploadQueue.shift();
    purchaseUploadWorkers += 1;
    extractPurchaseImportDocument(job)
      .catch(error => console.error("Purchase import failed", error))
      .finally(() => {
        purchaseUploadWorkers -= 1;
        processQueuedPurchaseInvoiceUpload();
        if (!purchaseUploadWorkers && !purchaseUploadQueue.length) saveState();
      });
  }
}

async function extractPurchaseImportDocument({ batchId, documentId, file }) {
  const document = purchaseImportDocumentById(documentId);
  if (!document) return;
  document.status = "extracting";
  document.error = "";
  touchPurchaseImportEntity(document);
  updatePurchaseImportBatchProgress(batchId);
  saveState({ skipCloud: true });
  renderPurchaseImportInbox();
  try {
    const [fileHash, parsed] = await Promise.all([
      purchaseImportFileHash(file),
      extractPurchaseInvoiceParsedFromFile(file)
    ]);
    const currentDocument = purchaseImportDocumentById(documentId);
    if (!currentDocument) return;
    currentDocument.fileHash = fileHash;
    currentDocument.parsed = normalizePurchaseImportParsedForState(parsed, file.name);
    currentDocument.status = "ready";
    currentDocument.selected = true;
    currentDocument.error = "";
  } catch (error) {
    const currentDocument = purchaseImportDocumentById(documentId);
    if (!currentDocument) return;
    currentDocument.status = "failed";
    currentDocument.selected = false;
    currentDocument.error = String(error?.message || error || "Could not read this invoice");
  }
  touchPurchaseImportEntity(purchaseImportDocumentById(documentId));
  refreshPurchaseImportBatchValidation(batchId);
  updatePurchaseImportBatchProgress(batchId);
  saveState({ skipCloud: true });
  queuePurchaseImportCloudSync(batchId);
  renderPurchaseImportInbox();
}

async function extractPurchaseInvoiceParsedFromFile(file) {
  const attachment = await createPurchaseAttachment(file);
  let pdfText = "";
  if (file.type === "application/pdf") {
    try {
      pdfText = await extractPdfText(file);
    } catch (error) {
      console.warn("Local PDF text extraction unavailable", error);
    }
  }
  let parsed = pdfText ? parseSpecialPurchaseInvoiceText(pdfText, file.name) : null;
  if (!parsed) parsed = await extractPurchaseInvoiceWithCloud(file);
  if (!parsed && file.type === "application/pdf") {
    if (!pdfText.trim()) {
      parsed = buildManualReviewPurchase(file, "No readable text found in PDF. Please review and enter values manually.");
    } else {
      parsed = parsePurchaseInvoiceText(pdfText, file.name);
    }
  }
  if (!parsed) {
    parsed = buildManualReviewPurchase(file, "Image extraction needs the cloud invoice extractor. Please review and enter values manually.");
  }
  if (pdfText.trim()) parsed = applyPurchasePaymentAdjustments(parsed, pdfText);
  parsed = await enrichPurchasePincodes(parsed);
  parsed.fileName = parsed.fileName || file.name;
  parsed.attachments = [attachment];
  return parsed;
}

async function purchaseImportFileHash(file) {
  if (!crypto.subtle) return `${file.size || 0}-${file.lastModified || 0}-${file.name || "invoice"}`;
  const digest = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function purchaseImportBatchById(id) {
  return state.purchaseImportBatches.find(batch => batch.id === id) || null;
}

function purchaseImportDocumentById(id) {
  return state.purchaseImportDocuments.find(document => document.id === id) || null;
}

function purchaseImportDocuments(batchId) {
  return state.purchaseImportDocuments.filter(document => document.batchId === batchId);
}

function touchPurchaseImportEntity(entity) {
  if (!entity) return;
  entity.updatedAt = new Date().toISOString();
  entity.syncStatus = newLocalSyncStatus();
}

function updatePurchaseImportBatchProgress(batchId) {
  const batch = purchaseImportBatchById(batchId);
  if (!batch) return;
  const documents = purchaseImportDocuments(batchId);
  const extracting = documents.some(document => ["queued", "extracting"].includes(document.status));
  const approvedCount = documents.filter(document => document.status === "approved").length;
  const unresolved = documents.some(document => !["approved", "duplicate"].includes(document.status));
  batch.fileCount = documents.length;
  batch.approvedCount = approvedCount;
  batch.status = extracting ? "extracting" : approvedCount && unresolved ? "partial" : !unresolved && documents.length ? "completed" : "review";
  batch.completedAt = batch.status === "completed" ? (batch.completedAt || new Date().toISOString()) : "";
  touchPurchaseImportEntity(batch);
}

function queuePurchaseImportCloudSync(batchId) {
  if (!cloudReadyForSync() || !batchId) return;
  purchaseImportCloudSyncChain = purchaseImportCloudSyncChain
    .catch(() => false)
    .then(async () => {
      const batch = purchaseImportBatchById(batchId);
      if (!batch || !cloudReadyForSync()) return false;
      const syncedAt = new Date().toISOString();
      const userId = currentCloudUserId();
      const { error: batchError } = await cloudClient
        .from(CLOUD_ROW_TABLES.purchaseImportBatches)
        .upsert(cloudPurchaseImportBatchRow(cloudWorkspace.id, batch, syncedAt, userId), { onConflict: "workspace_id,id" });
      if (batchError) throw batchError;
      const rows = purchaseImportDocuments(batchId).map(document => (
        cloudPurchaseImportDocumentRow(cloudWorkspace.id, document, syncedAt, userId)
      ));
      if (rows.length) {
        const { error: documentError } = await cloudClient
          .from(CLOUD_ROW_TABLES.purchaseImportDocuments)
          .upsert(rows, { onConflict: "workspace_id,id" });
        if (documentError) throw documentError;
      }
      return true;
    })
    .catch(error => {
      console.warn("Purchase inbox cloud staging failed", error);
      return false;
    });
}

function refreshPurchaseImportBatchValidation(batchId) {
  const documents = purchaseImportDocuments(batchId);
  documents.forEach(document => {
    if (["queued", "extracting", "approving", "approved", "failed"].includes(document.status)) return;
    const previousStatus = document.status;
    const result = validatePurchaseImportDocument(document, documents);
    document.validationErrors = result.errors;
    document.validationWarnings = result.warnings;
    document.duplicatePurchaseId = result.duplicatePurchaseId;
    document.status = result.status;
    if (document.status !== "ready") document.selected = false;
    else if (previousStatus !== "ready") document.selected = true;
  });
}

function validatePurchaseImportDocument(document, batchDocuments = purchaseImportDocuments(document.batchId)) {
  const parsed = document.parsed || {};
  const errors = [];
  if (document.error) errors.push(document.error);
  const profiles = state.settings.profiles || [];
  const gstProfile = profiles.find(profile => normalizeGstin(profile.gstin) === normalizeGstin(parsed.buyerGstin));
  const selectedProfile = profiles.find(profile => profile.id === parsed.profileId);
  const profile = gstProfile || selectedProfile;
  if (gstProfile && parsed.profileId !== gstProfile.id) parsed.profileId = gstProfile.id;
  if (profile && !parsed.buyerGstin) parsed.buyerGstin = normalizeGstin(profile.gstin);
  if (!profile || !isValidGstin(parsed.buyerGstin || profile?.gstin)) {
    errors.push("Buyer GST must match one of the eight companies.");
  } else if (normalizeGstin(profile.gstin) !== normalizeGstin(parsed.buyerGstin)) {
    errors.push("Selected buyer company and buyer GSTIN do not match.");
  }
  if (!String(parsed.supplierName || "").trim() || /^imported supplier$/i.test(parsed.supplierName)) {
    errors.push("Supplier name is required.");
  }
  if (!isValidGstin(parsed.supplierGstin)) errors.push("Supplier GSTIN is required for B2B purchase.");
  if (isValidGstin(parsed.supplierGstin) && !extractPreferredPincode(parsed.supplierAddress || parsed.supplierPlace)) {
    errors.push("Supplier PIN is required.");
  }
  if (!String(parsed.invoiceNumber || "").trim() || isGeneratedPurchaseNumber(parsed.invoiceNumber)) {
    errors.push("Supplier invoice number is required.");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(parsed.invoiceDate || ""))) errors.push("Invoice date is required.");
  if (!parsed.lines?.length) errors.push("At least one purchase item is required.");
  (parsed.lines || []).forEach((line, index) => {
    const label = `Item ${index + 1}`;
    if (!String(line.name || "").trim() || /^imported purchase|imported item$/i.test(line.name)) errors.push(`${label} name is required.`);
    if (!normalizeLineHsn(line.hsn)) line.hsn = DEFAULT_SALE_HSN;
    if (num(line.qty) <= 0) errors.push(`${label} quantity is required.`);
    if (num(line.grossRate) <= 0) errors.push(`${label} rate per quantity is required.`);
  });
  const attachments = parsed.attachments || [];
  if (!attachments.length) errors.push("Invoice soft copy is required.");
  if (cloudReadyForSync() && attachments.some(attachment => attachment.status === "Cloud upload failed")) {
    errors.push("Invoice file cloud upload failed.");
  }

  const duplicate = purchaseImportExistingDuplicate(parsed);
  const documentIndex = batchDocuments.findIndex(row => row.id === document.id);
  const duplicateInBatch = batchDocuments.slice(0, Math.max(0, documentIndex)).find(candidate => (
    !["failed", "duplicate"].includes(candidate.status)
    && purchaseImportDuplicateKey(candidate.parsed) === purchaseImportDuplicateKey(parsed)
    && purchaseImportDuplicateKey(parsed)
  ) || (
    document.fileHash && candidate.fileHash && document.fileHash === candidate.fileHash
  ));
  const duplicatePurchaseId = duplicate?.id || "";
  if (duplicate || duplicateInBatch) {
    return {
      status: "duplicate",
      errors: uniqueMessages([
        ...errors,
        duplicate
          ? `Duplicate invoice: ${parsed.invoiceNumber} is already saved.`
          : `Duplicate invoice in this batch: ${duplicateInBatch.fileName}.`
      ]),
      warnings: [],
      duplicatePurchaseId
    };
  }

  const totals = purchaseImportCalculatedTotals(parsed);
  const warnings = uniqueMessages([
    ...purchaseImportCurrentExtractionWarnings(parsed),
    ...purchaseTaxReviewMessages(parsed.extractedTaxes, totals),
    ...attachments.filter(attachment => attachment.status === "Local only").map(() => "Invoice file is local only and is not available on another device.")
  ]);
  return {
    status: errors.length ? "needs-review" : "ready",
    errors: uniqueMessages(errors),
    warnings,
    duplicatePurchaseId: ""
  };
}

function purchaseImportCurrentExtractionWarnings(parsed = {}) {
  const invoiceNumberReady = parsed.invoiceNumber && !isGeneratedPurchaseNumber(parsed.invoiceNumber);
  const supplierPinReady = Boolean(extractPreferredPincode(parsed.supplierAddress || parsed.supplierPlace));
  return (parsed.reviewMessages || []).filter(message => {
    const text = String(message || "");
    if (/buyer gstin did not match/i.test(text) && profileByImportParsed(parsed)) return false;
    if (/supplier gstin (?:was not found|is required)/i.test(text) && isValidGstin(parsed.supplierGstin)) return false;
    if (/supplier invoice number (?:was not detected|is required)/i.test(text) && invoiceNumberReady) return false;
    if (/supplier pin|multiple saved supplier locations/i.test(text) && supplierPinReady) return false;
    return true;
  });
}

function profileByImportParsed(parsed = {}) {
  return state.settings.profiles.find(profile => (
    profile.id === parsed.profileId
    || normalizeGstin(profile.gstin) === normalizeGstin(parsed.buyerGstin)
  )) || null;
}

function purchaseImportDuplicateKey(parsed = {}) {
  const supplierGstin = normalizeGstin(parsed.supplierGstin);
  const invoiceNumber = normalizePurchaseInvoiceNumber(parsed.invoiceNumber);
  return supplierGstin && invoiceNumber ? `${supplierGstin}|${invoiceNumber}` : "";
}

function purchaseImportExistingDuplicate(parsed = {}) {
  const key = purchaseImportDuplicateKey(parsed);
  if (!key) return null;
  return state.purchases.find(purchase => {
    const party = partyById(purchase.partyId) || {};
    return `${normalizeGstin(purchase.sellerGstin || party.gstin)}|${normalizePurchaseInvoiceNumber(purchase.number)}` === key;
  }) || null;
}

function purchaseImportPreviewLines(parsed = {}) {
  return (parsed.lines || []).map(line => {
    const gstRate = line.gstRate === undefined || line.gstRate === null ? DEFAULT_SALE_GST_RATE : num(line.gstRate);
    const grossRate = num(line.grossRate) || inclusiveRateFromTaxable(line.rate, gstRate);
    return {
      itemId: "",
      itemName: line.name || "",
      hsn: normalizeLineHsn(line.hsn) || DEFAULT_SALE_HSN,
      qty: num(line.qty),
      grossRate,
      rate: num(line.rate) || taxableRateFromInclusive(grossRate, gstRate),
      gstRate,
      imeiNumbers: normalizeImeiNumbers(line.imeiNumbers || "")
    };
  });
}

function purchaseImportCalculatedTotals(parsed = {}) {
  const profile = profileByImportParsed(parsed) || { gstin: parsed.buyerGstin || "" };
  const supplier = { gstin: parsed.supplierGstin || "" };
  const calculated = calculateEntryTotals(purchaseImportPreviewLines(parsed), profile, supplier, "purchase");
  const roundOff = purchaseRoundOffForSource({
    roundOff: parsed.roundOff,
    extractedTaxes: parsed.extractedTaxes
  }, calculated);
  return {
    ...calculated,
    taxable: round2(calculated.taxable),
    cgst: round2(calculated.cgst),
    sgst: round2(calculated.sgst),
    igst: round2(calculated.igst),
    gst: round2(calculated.gst),
    roundOff,
    total: purchaseTotalWithRoundOff(calculated, roundOff)
  };
}

function openPurchaseImportInbox(batchId = "") {
  const batches = sortedPurchaseImportBatches();
  if (batchId && purchaseImportBatchById(batchId)) activePurchaseImportBatchId = batchId;
  if (!purchaseImportBatchById(activePurchaseImportBatchId)) {
    activePurchaseImportBatchId = batches.find(batch => batch.status !== "completed")?.id || batches[0]?.id || "";
  }
  const documents = purchaseImportDocuments(activePurchaseImportBatchId);
  if (!documents.some(document => document.id === activePurchaseImportDocumentId)) {
    activePurchaseImportDocumentId = documents.find(document => document.status !== "approved")?.id || documents[0]?.id || "";
  }
  renderPurchaseImportInbox();
  const dialog = $("#purchaseImportDialog");
  if (dialog && !dialog.open) dialog.showModal();
  if (window.lucide) lucide.createIcons();
}

function sortedPurchaseImportBatches() {
  return [...state.purchaseImportBatches].sort((left, right) => {
    const statusOrder = Number(left.status === "completed") - Number(right.status === "completed");
    if (statusOrder) return statusOrder;
    return new Date(right.updatedAt || right.createdAt || 0) - new Date(left.updatedAt || left.createdAt || 0);
  });
}

function purchaseImportBatchLabel(batch, documents = purchaseImportDocuments(batch.id)) {
  if (batch.label) return batch.label;
  const date = new Date(batch.createdAt || Date.now());
  const stamp = Number.isNaN(date.getTime())
    ? "Purchase import"
    : date.toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  return `${stamp} · ${documents.length} invoice${documents.length === 1 ? "" : "s"}`;
}

function renderPurchaseImportInbox() {
  const countBadge = $("#purchaseImportInboxCount");
  const unresolvedCount = state.purchaseImportDocuments.filter(document => !["approved", "duplicate"].includes(document.status)).length;
  if (countBadge) {
    countBadge.textContent = unresolvedCount;
    countBadge.hidden = !unresolvedCount;
  }
  const batchSelect = $("#purchaseImportBatchSelect");
  const list = $("#purchaseImportDocumentList");
  const panel = $("#purchaseImportReviewPanel");
  if (!batchSelect || !list || !panel) return;

  const batches = sortedPurchaseImportBatches();
  if (!purchaseImportBatchById(activePurchaseImportBatchId)) {
    activePurchaseImportBatchId = batches.find(batch => batch.status !== "completed")?.id || batches[0]?.id || "";
  }
  batchSelect.innerHTML = batches.length
    ? batches.map(batch => `<option value="${escapeHtml(batch.id)}" ${batch.id === activePurchaseImportBatchId ? "selected" : ""}>${escapeHtml(purchaseImportBatchLabel(batch))}</option>`).join("")
    : '<option value="">No import batches</option>';
  batchSelect.disabled = !batches.length;

  const batch = purchaseImportBatchById(activePurchaseImportBatchId);
  const documents = batch ? purchaseImportDocuments(batch.id) : [];
  if (!documents.some(document => document.id === activePurchaseImportDocumentId)) {
    activePurchaseImportDocumentId = documents.find(document => document.status !== "approved")?.id || documents[0]?.id || "";
  }
  const activeDocument = purchaseImportDocumentById(activePurchaseImportDocumentId);
  list.innerHTML = documents.length
    ? documents.map(document => renderPurchaseImportDocumentCard(document)).join("")
    : '<div class="purchase-import-empty"><div><i data-lucide="inbox"></i><strong>No invoices</strong></div></div>';
  panel.innerHTML = activeDocument ? renderPurchaseImportReview(activeDocument) : '<div class="purchase-import-empty"><div><i data-lucide="files"></i><strong>Select an invoice</strong></div></div>';
  renderPurchaseImportSummary(batch, documents);
  if (window.lucide) lucide.createIcons();
}

function renderPurchaseImportSummary(batch, documents = []) {
  const counts = {
    total: documents.length,
    processing: documents.filter(document => ["queued", "extracting", "approving"].includes(document.status)).length,
    ready: documents.filter(document => document.status === "ready").length,
    attention: documents.filter(document => ["needs-review", "duplicate", "failed"].includes(document.status)).length,
    approved: documents.filter(document => document.status === "approved").length
  };
  const stats = $("#purchaseImportStats");
  if (stats) {
    stats.innerHTML = [
      ["Invoices", counts.total],
      ["Processing", counts.processing],
      ["Ready", counts.ready],
      ["Attention", counts.attention],
      ["Approved", counts.approved]
    ].map(([label, value]) => `<div class="purchase-import-stat"><span>${label}</span><strong>${value}</strong></div>`).join("");
  }
  const ready = documents.filter(document => document.status === "ready");
  const selected = ready.filter(document => document.selected);
  const selectAll = $("#purchaseImportSelectAll");
  if (selectAll) {
    selectAll.disabled = !ready.length || purchaseImportApproving;
    selectAll.checked = Boolean(ready.length && selected.length === ready.length);
    selectAll.indeterminate = Boolean(selected.length && selected.length < ready.length);
  }
  const selection = $("#purchaseImportSelection");
  if (selection) selection.textContent = purchaseImportSelectionText(selected);
  const approve = $("#purchaseImportApproveBtn");
  if (approve) {
    approve.disabled = !selected.length || counts.processing > 0 || purchaseImportApproving;
    approve.innerHTML = purchaseImportApproving
      ? '<i data-lucide="loader-circle"></i><span>Saving...</span>'
      : `<i data-lucide="check-check"></i><span>Approve &amp; Save ${selected.length || ""}</span>`;
  }
  const discard = $("#purchaseImportDiscardBtn");
  if (discard) discard.disabled = !batch || counts.processing > 0 || counts.approved > 0 || purchaseImportApproving;

  const extractionDone = !counts.processing;
  const reviewDone = Boolean(documents.length && documents.every(document => ["ready", "duplicate", "approved"].includes(document.status)));
  const approveDone = Boolean(documents.length && documents.every(document => ["approved", "duplicate"].includes(document.status)));
  $$('[data-import-stage]').forEach(stage => {
    const name = stage.dataset.importStage;
    stage.classList.toggle("complete", name === "upload" ? extractionDone : name === "review" ? reviewDone : approveDone);
    stage.classList.toggle("active", name === "upload" ? !extractionDone : name === "review" ? extractionDone && !approveDone : approveDone);
  });
}

function purchaseImportSelectionText(documents = []) {
  if (!documents.length) return "0 selected";
  const byProfile = documents.reduce((map, document) => {
    const profile = profileByImportParsed(document.parsed || {});
    const label = profile?.label || profile?.businessName || "Unmatched";
    map.set(label, (map.get(label) || 0) + 1);
    return map;
  }, new Map());
  const firms = [...byProfile.entries()].map(([label, count]) => `${label} ${count}`).join(" · ");
  return `${documents.length} selected · ${firms}`;
}

function renderPurchaseImportDocumentCard(document) {
  const parsed = document.parsed || {};
  const profile = profileByImportParsed(parsed);
  const totals = purchaseImportCalculatedTotals(parsed);
  const selectable = document.status === "ready";
  const attentionCount = (document.validationErrors?.length || 0) + (document.validationWarnings?.length || 0);
  return `<article class="purchase-import-document ${document.id === activePurchaseImportDocumentId ? "active" : ""}" data-import-doc-id="${escapeHtml(document.id)}" tabindex="0">
    <input class="purchase-import-document-select" type="checkbox" aria-label="Select ${escapeHtml(document.fileName)}" data-import-select-id="${escapeHtml(document.id)}" ${document.selected ? "checked" : ""} ${selectable ? "" : "disabled"}>
    <div class="purchase-import-document-main">
      <strong>${escapeHtml(parsed.supplierName || document.fileName)}</strong>
      <span>${escapeHtml(parsed.invoiceNumber || "Invoice number missing")} · ${escapeHtml(formatInvoiceDate(parsed.invoiceDate) || "Date missing")}</span>
      <small>${escapeHtml(profile?.label || profile?.businessName || "Buyer GST unmatched")}${attentionCount ? ` · ${attentionCount} note${attentionCount === 1 ? "" : "s"}` : ""}</small>
    </div>
    <span class="purchase-import-status ${escapeHtml(document.status)}">${escapeHtml(purchaseImportStatusLabel(document.status))}</span>
    <div class="purchase-import-document-total"><span>${escapeHtml(document.fileName)}</span><strong>${money(totals.total)}</strong></div>
  </article>`;
}

function purchaseImportStatusLabel(status) {
  return {
    queued: "Queued",
    extracting: "Extracting",
    ready: "Ready",
    "needs-review": "Needs Review",
    duplicate: "Duplicate",
    failed: "Failed",
    approving: "Saving",
    approved: "Approved"
  }[status] || "Review";
}

function renderPurchaseImportReview(document) {
  if (["queued", "extracting", "approving"].includes(document.status)) {
    return `<div class="purchase-import-empty"><div><i data-lucide="loader-circle"></i><strong>${escapeHtml(purchaseImportStatusLabel(document.status))} ${escapeHtml(document.fileName)}</strong></div></div>`;
  }
  if (document.status === "failed") {
    const canRetry = purchaseImportFiles.has(document.id);
    return `<div class="purchase-import-empty"><div><i data-lucide="file-warning"></i><strong>Extraction failed</strong><p>${escapeHtml(document.error || "Could not read this invoice")}</p>${canRetry ? `<button class="primary-btn" type="button" data-import-retry="${escapeHtml(document.id)}"><i data-lucide="refresh-cw"></i><span>Retry</span></button>` : ""}</div></div>`;
  }
  if (document.status === "approved") {
    const parsed = document.parsed || {};
    return `<div class="purchase-import-empty"><div><i data-lucide="badge-check"></i><strong>${escapeHtml(parsed.invoiceNumber || document.fileName)} saved</strong><p>${escapeHtml(parsed.supplierName || "Supplier")} · ${money(purchaseImportCalculatedTotals(parsed).total)}</p><button class="secondary-btn" type="button" data-open-approved-purchase="${escapeHtml(document.approvedPurchaseId)}"><i data-lucide="receipt-text"></i><span>Open Purchase</span></button></div></div>`;
  }
  const parsed = document.parsed || {};
  const totals = purchaseImportCalculatedTotals(parsed);
  const supplierPin = extractPreferredPincode(parsed.supplierAddress || parsed.supplierPlace);
  const supplierMemory = resolveSupplierLocationMemory(parsed);
  const ewayDetails = purchaseImportEwayDetails(parsed);
  const errors = document.validationErrors || [];
  const warnings = document.validationWarnings || [];
  const attachment = parsed.attachments?.[0] || {};
  const nextDocument = purchaseImportNextReviewDocument(document.batchId, document.id);
  return `<form class="purchase-import-review-form" id="purchaseImportReviewForm" data-import-review-id="${escapeHtml(document.id)}">
    <div class="purchase-import-review-title">
      <div><h4>${escapeHtml(document.fileName)}</h4><p>${escapeHtml(attachment.status || "Attached")} · ${Math.max(1, Math.round(num(document.size) / 1024))} KB</p></div>
      <span class="purchase-import-status ${escapeHtml(document.status)}">${escapeHtml(purchaseImportStatusLabel(document.status))}</span>
    </div>
    <div class="purchase-import-fields">
      <label class="span-2 ${purchaseImportRequiredClass(errors, /buyer gst|selected buyer/i)}">Buyer Company<select name="profileId" required>${profileOptions(parsed.profileId || activeProfileId())}</select></label>
      <label class="${purchaseImportRequiredClass(errors, /supplier name/i)}">Supplier Name<input name="supplierName" value="${escapeHtml(parsed.supplierName)}" required></label>
      <label class="${purchaseImportRequiredClass(errors, /supplier gstin/i)}">Supplier GSTIN<input name="supplierGstin" maxlength="15" value="${escapeHtml(parsed.supplierGstin)}" required></label>
      <label class="${purchaseImportRequiredClass(errors, /invoice number/i)}">Invoice Number<input name="invoiceNumber" value="${escapeHtml(parsed.invoiceNumber)}" required></label>
      <label class="${purchaseImportRequiredClass(errors, /invoice date/i)}">Invoice Date<input name="invoiceDate" type="date" value="${escapeHtml(parsed.invoiceDate)}" required></label>
      <label class="${purchaseImportRequiredClass(errors, /supplier pin/i)}">Supplier PIN<input name="supplierPincode" inputmode="numeric" maxlength="6" value="${escapeHtml(supplierPin)}" required></label>
      ${renderPurchaseImportSupplierMemory(parsed, supplierMemory)}
      <label>Round Off / Adjustment<input name="roundOff" type="number" step="0.01" value="${escapeHtml(round2(parsed.roundOff))}"></label>
      <label class="span-2">Supplier Address<textarea name="supplierAddress" rows="3">${escapeHtml(parsed.supplierAddress)}</textarea></label>
    </div>
    ${renderPurchaseImportEwayFields(ewayDetails)}
    <div class="purchase-import-section-head"><h5>Items</h5><button class="secondary-btn" type="button" data-import-add-line><i data-lucide="plus"></i><span>Add Item</span></button></div>
    <div class="purchase-import-line-table">${(parsed.lines?.length ? parsed.lines : [purchaseImportBlankLine()]).map((line, index) => renderPurchaseImportLine(line, index, errors)).join("")}</div>
    ${renderPurchaseImportTotals(totals)}
    ${renderPurchaseImportMessages(errors, warnings)}
    <div class="purchase-import-review-actions"><button class="primary-btn" type="submit"><i data-lucide="${nextDocument ? "arrow-right" : "check"}"></i><span>${nextDocument ? "Save &amp; Review Next" : "Save Review"}</span></button></div>
  </form>`;
}

function purchaseImportNextReviewDocument(batchId, currentDocumentId) {
  const documents = purchaseImportDocuments(batchId);
  const currentIndex = documents.findIndex(document => document.id === currentDocumentId);
  if (currentIndex < 0) return null;
  return documents.slice(currentIndex + 1).find(document => (
    ["ready", "needs-review"].includes(document.status)
  )) || null;
}

function purchaseImportEwayDetails(parsed = {}, overrides = {}) {
  const profile = profileByImportParsed(parsed) || profileById(parsed.profileId || activeProfileId()) || {};
  const supplier = {
    name: parsed.supplierName || "Supplier",
    address: parsed.supplierAddress || "",
    place: parsed.supplierPlace || ""
  };
  const existing = normalizePurchaseEwayDetails({
    ...(parsed.ewayDetails || {}),
    fromPincode: parsed.ewayDetails?.fromPincode
      || extractPreferredPincode(parsed.supplierAddress || parsed.supplierPlace),
    toPincode: parsed.ewayDetails?.toPincode
      || extractPreferredPincode(parsed.buyerAddress || profile.address || parsed.buyerPlace),
    destinationPreset: parsed.ewayDetails?.destinationPreset || "buyer",
    dispatchFromAddress: parsed.ewayDetails?.dispatchFromAddress || parsed.supplierAddress || ""
  });
  const details = normalizePurchaseEwayDetails({ ...existing, ...overrides });
  const route = purchaseEwayRouteFromValues(profile, supplier, details);
  let distanceKm = details.distanceKm;
  let distanceSource = details.distanceSource;
  if (!distanceKm) {
    const samePinDistance = samePincodeDistanceKm(route);
    const fixedDistance = fixedEwayRouteDistance(route.fromPincode, route.toPincode);
    distanceKm = samePinDistance || fixedDistance || route.savedDistance || 0;
    distanceSource = samePinDistance
      ? "same-pincode"
      : fixedDistance
        ? "configured-route"
        : route.savedDistance
          ? "shared-cache"
          : "";
  }
  return normalizePurchaseEwayDetails({
    ...details,
    fromPincode: route.fromPincode,
    toPincode: route.toPincode,
    routeKey: route.routeKey,
    distanceKm,
    distanceSource,
    distanceConfirmed: Boolean(distanceKm) && distanceSource !== "local-estimate"
  });
}

function renderPurchaseImportEwayFields(details = {}) {
  const transType = details.transType || "1";
  const destinationPreset = details.destinationPreset || "buyer";
  const usesShipTo = ewayUsesShipTo(transType);
  const usesDispatchFrom = ewayUsesDispatchFrom(transType);
  return `<section class="purchase-import-eway">
    <div class="purchase-import-section-head"><h5>E-Way Details</h5></div>
    <div class="purchase-import-fields">
      <label>Transaction Type<select name="ewayTransType">
        <option value="1" ${transType === "1" ? "selected" : ""}>Regular</option>
        <option value="2" ${transType === "2" ? "selected" : ""}>Bill To - Ship To</option>
        <option value="3" ${transType === "3" ? "selected" : ""}>Bill From - Dispatch From</option>
        <option value="4" ${transType === "4" ? "selected" : ""}>Bill From/To - Dispatch/Ship</option>
      </select></label>
      <label>Vehicle No.<input name="ewayVehicleNo" value="${escapeHtml(details.vehicleNo || "")}" placeholder="AP03AB1234" autocapitalize="characters"></label>
      <label>Transport Distance KM<input name="ewayDistanceKm" type="number" min="0" step="1" value="${escapeHtml(details.distanceKm || "")}" placeholder="Auto"></label>
      <label data-import-eway-ship-to ${usesShipTo ? "" : "hidden"}>Destination Address<select name="ewayDestinationPreset">${ewayDestinationPresetOptions(destinationPreset)}</select></label>
      <label class="span-2" data-import-eway-dispatch-from ${usesDispatchFrom ? "" : "hidden"}>Dispatch From Address<textarea name="ewayDispatchFromAddress" rows="2">${escapeHtml(details.dispatchFromAddress || "")}</textarea></label>
      <label class="span-2" data-import-eway-custom-ship-to ${usesShipTo && destinationPreset === "custom" ? "" : "hidden"}>Custom Ship To Address<textarea name="ewayShipToAddress" rows="2">${escapeHtml(details.shipToAddress || "")}</textarea></label>
    </div>
  </section>`;
}

function renderPurchaseImportSupplierMemory(parsed = {}, memory = resolveSupplierLocationMemory(parsed)) {
  const locations = memory.locations || [];
  const supplierPin = extractPreferredPincode(parsed.supplierAddress || parsed.supplierPlace);
  const selectedId = parsed.supplierLocationId || memory.location?.id || "";
  const input = locations.length > 1
    ? `<label class="span-2 ${parsed.supplierLocationAmbiguous && !supplierPin ? "required-attention" : ""}">Saved Supplier Location<select name="supplierLocationId"><option value="">Select supplier or dispatch location</option>${locations.map(location => {
      const detail = [location.label, location.pincode, location.place].filter(Boolean).join(" · ");
      return `<option value="${escapeHtml(location.id)}" ${location.id === selectedId ? "selected" : ""}>${escapeHtml(detail)}</option>`;
    }).join("")}</select></label>`
    : `<input type="hidden" name="supplierLocationId" value="${escapeHtml(selectedId)}">`;
  let message = "";
  if (parsed.supplierPincodeSource === "supplier-master" && supplierPin) {
    message = "PIN restored from the shared supplier master.";
  } else if (supplierPin && isValidGstin(parsed.supplierGstin)) {
    message = "This supplier location will be remembered after approval.";
  } else if (locations.length > 1) {
    message = "Select a saved dispatch location or enter the PIN manually.";
  }
  return `${input}${message ? `<p class="purchase-import-memory-note span-2"><i data-lucide="map-pin-check"></i><span>${escapeHtml(message)}</span></p>` : ""}`;
}

function purchaseImportRequiredClass(errors = [], pattern) {
  return errors.some(message => pattern.test(message)) ? "required-attention" : "";
}

function purchaseImportBlankLine() {
  return { name: "", hsn: DEFAULT_SALE_HSN, qty: 1, rate: 0, grossRate: 0, gstRate: DEFAULT_SALE_GST_RATE, imeiNumbers: "" };
}

function renderPurchaseImportLine(line, index, errors = []) {
  return `<div class="purchase-import-line-grid" data-import-line-index="${index}">
    <label class="${purchaseImportRequiredClass(errors, new RegExp(`Item ${index + 1} name`, "i"))}">Item<input name="lineName" value="${escapeHtml(line.name || "")}" required></label>
    <label>HSN/SAC<input name="lineHsn" inputmode="numeric" value="${escapeHtml(normalizeLineHsn(line.hsn) || DEFAULT_SALE_HSN)}" required></label>
    <label class="${purchaseImportRequiredClass(errors, new RegExp(`Item ${index + 1} quantity`, "i"))}">Qty<input name="lineQty" type="number" min="0.01" step="0.01" value="${escapeHtml(num(line.qty))}" required></label>
    <label class="${purchaseImportRequiredClass(errors, new RegExp(`Item ${index + 1} rate`, "i"))}">Rate / Qty (GST Incl.)<input name="lineGrossRate" type="number" min="0" step="0.01" value="${escapeHtml(round2(num(line.grossRate) || inclusiveRateFromTaxable(line.rate, line.gstRate)))}" required></label>
    <label>GST %<input name="lineGstRate" type="number" min="0" step="0.01" value="${escapeHtml(num(line.gstRate))}" required></label>
    <button class="icon-btn" type="button" data-import-remove-line="${index}" title="Remove item"><i data-lucide="trash-2"></i></button>
    <label class="purchase-import-line-imei">IMEI Numbers<input name="lineImeiNumbers" value="${escapeHtml(normalizeImeiNumbers(line.imeiNumbers || ""))}" placeholder="Optional, comma separated"></label>
  </div>`;
}

function renderPurchaseImportTotals(totals = {}) {
  return `<div class="purchase-import-review-totals" id="purchaseImportReviewTotals">
    <div><span>Taxable</span><strong data-import-total="taxable">${money(totals.taxable)}</strong></div>
    <div><span>CGST</span><strong data-import-total="cgst">${money(totals.cgst)}</strong></div>
    <div><span>SGST</span><strong data-import-total="sgst">${money(totals.sgst)}</strong></div>
    <div><span>IGST</span><strong data-import-total="igst">${money(totals.igst)}</strong></div>
    <div><span>Round Off</span><strong data-import-total="roundOff">${money(totals.roundOff)}</strong></div>
    <div><span>Total</span><strong data-import-total="total">${money(totals.total)}</strong></div>
  </div>`;
}

function renderPurchaseImportMessages(errors = [], warnings = []) {
  const rows = [
    ...errors.map(message => ({ type: "error", message })),
    ...warnings.map(message => ({ type: "warning", message }))
  ];
  if (!rows.length) return '<div class="purchase-import-message-list"><div class="purchase-import-message"><i data-lucide="circle-check"></i><span>All required checks passed.</span></div></div>';
  return `<div class="purchase-import-message-list">${rows.map(row => `<div class="purchase-import-message ${row.type === "error" ? "error" : ""}"><i data-lucide="${row.type === "error" ? "circle-alert" : "triangle-alert"}"></i><span>${escapeHtml(row.message)}</span></div>`).join("")}</div>`;
}

function handlePurchaseImportBatchChange(event) {
  activePurchaseImportBatchId = event.target.value || "";
  activePurchaseImportDocumentId = purchaseImportDocuments(activePurchaseImportBatchId)[0]?.id || "";
  renderPurchaseImportInbox();
}

function handlePurchaseImportDocumentClick(event) {
  if (event.target.closest("[data-import-select-id]")) return;
  const card = event.target.closest("[data-import-doc-id]");
  if (!card) return;
  const nextDocumentId = card.dataset.importDocId || "";
  if (!nextDocumentId || nextDocumentId === activePurchaseImportDocumentId) return;
  persistActivePurchaseImportDraft();
  activePurchaseImportDocumentId = nextDocumentId;
  renderPurchaseImportInbox();
}

function handlePurchaseImportDocumentSelection(event) {
  const id = event.target.dataset.importSelectId;
  if (!id) return;
  const document = purchaseImportDocumentById(id);
  if (!document || document.status !== "ready") return;
  document.selected = event.target.checked;
  touchPurchaseImportEntity(document);
  saveState();
  renderPurchaseImportSummary(purchaseImportBatchById(document.batchId), purchaseImportDocuments(document.batchId));
  if (window.lucide) lucide.createIcons();
}

function toggleReadyPurchaseImports(event) {
  purchaseImportDocuments(activePurchaseImportBatchId).forEach(document => {
    if (document.status !== "ready") return;
    document.selected = event.target.checked;
    touchPurchaseImportEntity(document);
  });
  saveState();
  $$('[data-import-select-id]', $("#purchaseImportDocumentList")).forEach(input => {
    const document = purchaseImportDocumentById(input.dataset.importSelectId);
    if (document?.status === "ready") input.checked = document.selected;
  });
  renderPurchaseImportSummary(
    purchaseImportBatchById(activePurchaseImportBatchId),
    purchaseImportDocuments(activePurchaseImportBatchId)
  );
  if (window.lucide) lucide.createIcons();
}

function persistActivePurchaseImportDraft() {
  const form = $("#purchaseImportReviewForm");
  const document = purchaseImportDocumentById(form?.dataset.importReviewId);
  if (!form || !document || ["approved", "extracting", "approving"].includes(document.status)) return null;
  document.parsed = normalizePurchaseImportParsedForState(
    collectPurchaseImportReviewForm(form, document.parsed),
    document.fileName
  );
  document.error = "";
  document.status = "ready";
  refreshPurchaseImportBatchValidation(document.batchId);
  updatePurchaseImportBatchProgress(document.batchId);
  touchPurchaseImportEntity(document);
  saveState();
  return document;
}

function savePurchaseImportReview(event) {
  if (event.target.id !== "purchaseImportReviewForm") return;
  event.preventDefault();
  const document = purchaseImportDocumentById(event.target.dataset.importReviewId);
  if (!document) return;
  document.parsed = normalizePurchaseImportParsedForState(
    collectPurchaseImportReviewForm(event.target, document.parsed),
    document.fileName
  );
  document.error = "";
  if (!["approved", "extracting"].includes(document.status)) document.status = "ready";
  refreshPurchaseImportBatchValidation(document.batchId);
  if (document.status === "ready") document.selected = true;
  const nextDocument = document.status === "ready"
    ? purchaseImportNextReviewDocument(document.batchId, document.id)
    : null;
  updatePurchaseImportBatchProgress(document.batchId);
  touchPurchaseImportEntity(document);
  saveState();
  if (nextDocument) activePurchaseImportDocumentId = nextDocument.id;
  renderPurchaseImportInbox();
  toast(document.status === "ready"
    ? nextDocument ? "Invoice saved. Review the next invoice." : "Invoice review saved"
    : "Required details still need attention");
}

function collectPurchaseImportReviewForm(form, currentParsed = {}) {
  const profile = state.settings.profiles.find(row => row.id === form.elements.profileId?.value) || activeProfile();
  const supplierGstin = normalizeGstin(form.elements.supplierGstin?.value || "");
  const supplierName = form.elements.supplierName?.value.trim() || "";
  const supplierLocationId = form.elements.supplierLocationId?.value || "";
  const selectedSupplierLocation = supplierLocationsByGstin(supplierGstin).find(location => location.id === supplierLocationId) || null;
  const supplierPincode = normalizePincode(form.elements.supplierPincode?.value || "");
  const supplierAddress = addressWithUpdatedPincode(form.elements.supplierAddress?.value || "", supplierPincode);
  const supplierPlace = selectedSupplierLocation?.place || currentParsed.supplierPlace || stateNameFromGstin(supplierGstin) || "";
  const currentSupplierPincode = extractPreferredPincode(currentParsed.supplierAddress || currentParsed.supplierPlace);
  const supplierPincodeSource = selectedSupplierLocation
    ? "supplier-master"
    : supplierPincode && (supplierPincode !== currentSupplierPincode || supplierAddress !== currentParsed.supplierAddress)
      ? "manual"
      : (currentParsed.supplierPincodeSource || (supplierPincode ? "manual" : ""));
  const lines = $$("[data-import-line-index]", form).map(row => {
    const gstRate = num($("[name='lineGstRate']", row)?.value);
    const grossRate = num($("[name='lineGrossRate']", row)?.value);
    return {
      name: $("[name='lineName']", row)?.value.trim() || "",
      hsn: normalizeLineHsn($("[name='lineHsn']", row)?.value) || DEFAULT_SALE_HSN,
      qty: num($("[name='lineQty']", row)?.value),
      grossRate,
      rate: taxableRateFromInclusive(grossRate, gstRate),
      gstRate,
      imeiNumbers: normalizeImeiNumbers($("[name='lineImeiNumbers']", row)?.value || "")
    };
  });
  const currentEwayDetails = purchaseImportEwayDetails({
    ...currentParsed,
    profileId: profile.id,
    buyerAddress: profile.address || "",
    buyerPlace: profile.state || "",
    supplierName,
    supplierAddress,
    supplierPlace
  }, {
    ...(currentParsed.ewayDetails || {}),
    fromPincode: supplierPincode,
    toPincode: ""
  });
  const enteredDistance = Math.max(0, num(form.elements.ewayDistanceKm?.value));
  const distanceChanged = enteredDistance > 0 && enteredDistance !== num(currentEwayDetails.distanceKm);
  const ewayDetails = purchaseImportEwayDetails({
    ...currentParsed,
    profileId: profile.id,
    buyerAddress: profile.address || "",
    buyerPlace: profile.state || "",
    supplierName,
    supplierAddress,
    supplierPlace
  }, {
    ...currentEwayDetails,
    transType: form.elements.ewayTransType?.value || "1",
    vehicleNo: normalizeVehicleNumber(form.elements.ewayVehicleNo?.value || ""),
    distanceKm: enteredDistance,
    distanceSource: enteredDistance
      ? (distanceChanged ? "manual-confirmed" : currentEwayDetails.distanceSource)
      : "",
    distanceConfirmed: Boolean(enteredDistance),
    destinationPreset: form.elements.ewayDestinationPreset?.value || "buyer",
    dispatchFromAddress: form.elements.ewayDispatchFromAddress?.value.trim() || supplierAddress,
    shipToAddress: form.elements.ewayShipToAddress?.value.trim() || "",
    fromPincode: supplierPincode,
    toPincode: ""
  });
  return {
    ...currentParsed,
    profileId: profile.id,
    buyerName: profile.businessName || profile.label || "",
    buyerGstin: normalizeGstin(profile.gstin),
    buyerAddress: profile.address || "",
    buyerPlace: profile.state || "",
    supplierName,
    supplierGstin,
    supplierAddress,
    supplierPlace,
    supplierLocationId,
    supplierPincodeSource,
    supplierLocationAmbiguous: Boolean(!supplierPincode && supplierLocationsByGstin(supplierGstin).length > 1),
    invoiceNumber: form.elements.invoiceNumber?.value.trim() || "",
    invoiceDate: form.elements.invoiceDate?.value || "",
    roundOff: round2(form.elements.roundOff?.value),
    ewayDetails,
    lines
  };
}

function updatePurchaseImportReviewTotals(event) {
  const form = event.target.closest("#purchaseImportReviewForm");
  if (!form) return;
  const document = purchaseImportDocumentById(form.dataset.importReviewId);
  if (!document) return;
  const totals = purchaseImportCalculatedTotals(collectPurchaseImportReviewForm(form, document.parsed));
  Object.entries(totals).forEach(([key, value]) => {
    const target = $(`[data-import-total='${key}']`, form);
    if (target) target.textContent = money(value);
  });
}

function handlePurchaseImportReviewChange(event) {
  const form = event.target.closest("#purchaseImportReviewForm");
  const document = purchaseImportDocumentById(form?.dataset.importReviewId);
  if (!form || !document) return;
  if (["ewayTransType", "ewayDestinationPreset"].includes(event.target.name)) {
    updatePurchaseImportEwayVisibility(form);
    return;
  }
  if (event.target.name !== "supplierLocationId") return;
  const gstin = normalizeGstin(form.elements.supplierGstin?.value || document.parsed?.supplierGstin);
  const location = supplierLocationsByGstin(gstin).find(row => row.id === event.target.value);
  if (!location) return;
  const previousSupplierAddress = form.elements.supplierAddress.value.trim();
  const dispatchFromInput = form.elements.ewayDispatchFromAddress;
  form.elements.supplierPincode.value = location.pincode;
  form.elements.supplierAddress.value = location.address;
  if (dispatchFromInput && (!dispatchFromInput.value.trim() || dispatchFromInput.value.trim() === previousSupplierAddress)) {
    dispatchFromInput.value = location.address;
  }
  const note = $(".purchase-import-memory-note span", form);
  if (note) note.textContent = "PIN restored from the shared supplier master.";
}

function updatePurchaseImportEwayVisibility(form) {
  const transType = form.elements.ewayTransType?.value || "1";
  const destinationPreset = form.elements.ewayDestinationPreset?.value || "buyer";
  const shipToField = $("[data-import-eway-ship-to]", form);
  const dispatchFromField = $("[data-import-eway-dispatch-from]", form);
  const customShipToField = $("[data-import-eway-custom-ship-to]", form);
  if (shipToField) shipToField.hidden = !ewayUsesShipTo(transType);
  if (dispatchFromField) dispatchFromField.hidden = !ewayUsesDispatchFrom(transType);
  if (customShipToField) customShipToField.hidden = !ewayUsesShipTo(transType) || destinationPreset !== "custom";
}

function handlePurchaseImportReviewClick(event) {
  const retryId = event.target.closest("[data-import-retry]")?.dataset.importRetry;
  if (retryId) {
    retryPurchaseImportDocument(retryId);
    return;
  }
  const approvedPurchaseId = event.target.closest("[data-open-approved-purchase]")?.dataset.openApprovedPurchase;
  if (approvedPurchaseId) {
    const purchase = state.purchases.find(entry => entry.id === approvedPurchaseId);
    if (!purchase) return toast("Saved purchase was not found");
    $("#purchaseImportDialog")?.close();
    setActiveProfileId(purchase.profileId);
    showView("purchases");
    openEntry("purchase", purchase.id);
    return;
  }
  const form = event.target.closest("#purchaseImportReviewForm");
  if (!form) return;
  const document = purchaseImportDocumentById(form.dataset.importReviewId);
  if (!document) return;
  if (event.target.closest("[data-import-add-line]")) {
    const parsed = collectPurchaseImportReviewForm(form, document.parsed);
    parsed.lines.push(purchaseImportBlankLine());
    document.parsed = normalizePurchaseImportParsedForState(parsed, document.fileName);
    touchPurchaseImportEntity(document);
    saveState();
    renderPurchaseImportInbox();
    return;
  }
  const removeButton = event.target.closest("[data-import-remove-line]");
  if (removeButton) {
    const parsed = collectPurchaseImportReviewForm(form, document.parsed);
    parsed.lines.splice(num(removeButton.dataset.importRemoveLine), 1);
    if (!parsed.lines.length) parsed.lines.push(purchaseImportBlankLine());
    document.parsed = normalizePurchaseImportParsedForState(parsed, document.fileName);
    refreshPurchaseImportBatchValidation(document.batchId);
    touchPurchaseImportEntity(document);
    saveState();
    renderPurchaseImportInbox();
  }
}

function retryPurchaseImportDocument(documentId) {
  const document = purchaseImportDocumentById(documentId);
  const file = purchaseImportFiles.get(documentId);
  if (!document || !file) return toast("Select the original file again to retry extraction");
  document.status = "queued";
  document.error = "";
  document.selected = false;
  touchPurchaseImportEntity(document);
  purchaseUploadQueue.push({ batchId: document.batchId, documentId: document.id, file });
  updatePurchaseImportBatchProgress(document.batchId);
  saveState({ skipCloud: true });
  renderPurchaseImportInbox();
  processQueuedPurchaseInvoiceUpload();
}

async function approveSelectedPurchaseImports() {
  if (purchaseImportApproving) return;
  const batch = purchaseImportBatchById(activePurchaseImportBatchId);
  if (!batch) return;
  persistActivePurchaseImportDraft();
  refreshPurchaseImportBatchValidation(batch.id);
  const documents = purchaseImportDocuments(batch.id).filter(document => document.status === "ready" && document.selected);
  if (!documents.length) {
    renderPurchaseImportInbox();
    return toast("Select at least one ready invoice");
  }
  purchaseImportApproving = true;
  documents.forEach(document => { document.status = "approving"; });
  renderPurchaseImportInbox();
  const savedEntries = [];
  let failedCount = 0;
  for (const document of documents) {
    try {
      const duplicate = purchaseImportExistingDuplicate(document.parsed);
      if (duplicate) throw new Error(`Invoice ${document.parsed.invoiceNumber} is already saved`);
      const entry = createPurchaseEntryFromImportDocument(document);
      await rememberPurchaseEwayRoute(entry.ewayDetails);
      savedEntries.push(entry);
      document.status = "approved";
      document.selected = false;
      document.approvedPurchaseId = entry.id;
      document.error = "";
      touchPurchaseImportEntity(document);
    } catch (error) {
      failedCount += 1;
      document.status = "needs-review";
      document.selected = false;
      document.error = String(error?.message || error || "Could not save purchase");
      document.validationErrors = uniqueMessages([document.error, ...(document.validationErrors || [])]);
      touchPurchaseImportEntity(document);
    }
  }
  refreshPurchaseImportBatchValidation(batch.id);
  updatePurchaseImportBatchProgress(batch.id);
  saveState();
  renderAll();
  const canSyncNow = cloudReadyForSync();
  const synced = canSyncNow ? await syncCloudNow(false) : false;
  if (canSyncNow && !synced) {
    savedEntries.forEach(entry => markEntitySyncStatus(entry, SYNC_STATUS_FAILED));
    documents.filter(document => document.status === "approved").forEach(document => markEntitySyncStatus(document, SYNC_STATUS_FAILED));
    markEntitySyncStatus(batch, SYNC_STATUS_FAILED);
    saveState({ skipCloud: true });
  }
  purchaseImportApproving = false;
  renderAll();
  const savedText = `${savedEntries.length} purchase${savedEntries.length === 1 ? "" : "s"} saved`;
  if (failedCount) toast(`${savedText}. ${failedCount} needs review.`);
  else if (canSyncNow && !synced) toast(`${savedText} locally. Cloud sync failed${cloudFailureSuffix()}`);
  else toast(canSyncNow ? `${savedText} and synced` : savedText);
}

function createPurchaseEntryFromImportDocument(document) {
  const draft = buildPurchaseDraft(document.parsed, profileByImportParsed(document.parsed));
  const profile = state.settings.profiles.find(row => row.id === draft.profileId);
  const party = partyById(draft.partyId);
  if (!profile || !party) throw new Error("Buyer company or supplier master could not be created");
  const lines = draft.lines || [];
  if (!lines.length) throw new Error("At least one item is required");
  applyLineHsnToItems(lines);
  const calculated = calculateEntryTotals(lines, profile, party, "purchase");
  const roundOff = purchaseRoundOffForSource({
    roundOff: draft.roundOff,
    extractedTaxes: draft.extractedTaxes
  }, calculated);
  const reviewMessages = uniqueMessages([
    ...(draft.reviewMessages || []),
    ...calculated.reviewMessages,
    ...purchaseTaxReviewMessages(draft.extractedTaxes, calculated)
  ]);
  const entry = entityWithLocalMeta({
    id: uid(),
    date: draft.date,
    number: draft.number,
    profileId: profile.id,
    partyId: party.id,
    status: "Paid",
    paymentSourceId: "",
    paymentDate: "",
    paymentReference: "",
    notes: "",
    lines,
    ...calculated,
    roundOff,
    total: purchaseTotalWithRoundOff(calculated, roundOff),
    attachments: clone(draft.attachments || []),
    extractedTaxes: clone(draft.extractedTaxes || null),
    source: "purchase-upload-batch",
    rateIncludesGst: true,
    sellerGstin: normalizeGstin(party.gstin || draft.sellerGstin),
    buyerGstin: normalizeGstin(profile.gstin),
    ewayDetails: normalizePurchaseEwayDetails(draft.ewayDetails || {}),
    reviewMessages,
    reviewStatus: reviewMessages.length ? "Needs Review" : "Ready"
  });
  state.purchases.push(entry);
  profile.nextPurchaseNo = num(profile.nextPurchaseNo) + 1;
  entryMonthFilters.purchase = entryMonthKey(entry);
  return entry;
}

async function discardActivePurchaseImportBatch() {
  const batch = purchaseImportBatchById(activePurchaseImportBatchId);
  if (!batch) return;
  const documents = purchaseImportDocuments(batch.id);
  if (documents.some(document => document.status === "approved")) return toast("Approved batches cannot be discarded");
  if (!confirm(`Discard ${documents.length} uploaded invoice${documents.length === 1 ? "" : "s"}?`)) return;
  const storagePaths = documents.flatMap(document => document.parsed?.attachments || [])
    .filter(attachment => attachment.bucket === PURCHASE_ATTACHMENT_BUCKET && attachment.storagePath)
    .map(attachment => attachment.storagePath);
  purchaseUploadQueue = purchaseUploadQueue.filter(job => job.batchId !== batch.id);
  documents.forEach(document => purchaseImportFiles.delete(document.id));
  state.purchaseImportDocuments = state.purchaseImportDocuments.filter(document => document.batchId !== batch.id);
  state.purchaseImportBatches = state.purchaseImportBatches.filter(row => row.id !== batch.id);
  activePurchaseImportBatchId = "";
  activePurchaseImportDocumentId = "";
  saveState();
  renderPurchaseImportInbox();
  if (storagePaths.length && cloudClient && cloudSession) {
    const { error } = await cloudClient.storage.from(PURCHASE_ATTACHMENT_BUCKET).remove(storagePaths);
    if (error) console.warn("Could not remove discarded purchase files", error);
  }
  toast("Import batch discarded");
}

function applyPurchasePaymentAdjustments(parsed = {}, text = "") {
  const adjustment = purchasePaymentAdjustmentFromText(text);
  if (!adjustment) return parsed;
  const existingRoundOff = num(parsed.roundOff);
  const reviewMessages = uniqueMessages([
    ...(parsed.reviewMessages || []),
    `Payment adjustment detected: card cashback ${money(Math.abs(adjustment))} reduced the debited amount.`
  ]);
  return {
    ...parsed,
    roundOff: Math.abs(existingRoundOff) >= 0.01 ? existingRoundOff : adjustment,
    reviewMessages
  };
}

function purchasePaymentAdjustmentFromText(text = "") {
  const lines = String(text || "").split(/\n+/).map(line => line.trim()).filter(Boolean);
  const cashback = lines.reduce((sum, line) => {
    if (!/\b(?:card\s*)?cash\s*back\b|\bcashback\b/i.test(line)) return sum;
    return sum + purchaseAdjustmentAmountFromLine(line);
  }, 0);
  return cashback ? -round2(cashback) : 0;
}

function purchaseAdjustmentAmountFromLine(line = "") {
  const cleaned = String(line || "").replace(/,/g, "");
  const cashbackMatch = cleaned.match(/(?:card\s*)?cash\s*back|cashback/i);
  const scoped = cashbackMatch ? cleaned.slice(cashbackMatch.index) : cleaned;
  const amounts = scoped.match(/\d+(?:\.\d{1,2})?/g) || [];
  return amounts.length ? Number(amounts[amounts.length - 1]) : 0;
}

async function createPurchaseAttachment(file) {
  const attachment = {
    name: file.name,
    type: file.type || "application/octet-stream",
    size: file.size,
    uploadedAt: new Date().toISOString(),
    bucket: "",
    storagePath: "",
    status: "Local only"
  };
  if (!cloudClient || !cloudSession || !cloudWorkspace) return attachment;
  const safeName = file.name.replace(/[^A-Za-z0-9._-]/g, "-");
  const storagePath = `${cloudWorkspace.id}/${today()}/${Date.now()}-${safeName}`;
  const { error } = await cloudClient.storage
    .from(PURCHASE_ATTACHMENT_BUCKET)
    .upload(storagePath, file, { contentType: file.type || "application/octet-stream", upsert: false });
  if (error) {
    attachment.status = "Cloud upload failed";
    attachment.error = purchaseAttachmentUploadError(error);
    return attachment;
  }
  attachment.bucket = PURCHASE_ATTACHMENT_BUCKET;
  attachment.storagePath = storagePath;
  attachment.status = "Cloud stored";
  return attachment;
}

function purchaseAttachmentUploadError(error) {
  const message = String(error?.message || error || "");
  if (/row-level security|violates.*policy|permission/i.test(message)) {
    return "Storage permission needs update. Run the latest Supabase database setup.";
  }
  return message || "Could not store file in cloud.";
}

async function extractPurchaseInvoiceWithCloud(file) {
  if (!cloudClient || !cloudSession) return null;
  try {
    const base64 = await fileToBase64(file);
    const { data, error } = await cloudClient.functions.invoke("extract-purchase-invoice", {
      body: {
        fileName: file.name,
        mimeType: file.type || "application/octet-stream",
        base64,
        activeProfileId: activeProfileId(),
        profiles: state.settings.profiles
      }
    });
    if (error) throw error;
    return data?.invoice || data;
  } catch (error) {
    console.warn("Cloud purchase extractor unavailable", error);
    return null;
  }
}

async function enrichPurchasePincodes(parsed = {}) {
  const enriched = enrichPurchasePincodesFromMaster({ ...parsed });
  if (!purchaseNeedsPincodeHelp(enriched)) return enriched;
  if (enriched.supplierLocationAmbiguous) return enriched;
  const cloudResult = await resolvePurchasePincodesWithCloud(enriched);
  return applyPurchasePincodeResolution(enriched, cloudResult);
}

function enrichPurchasePincodesFromMaster(parsed = {}) {
  const supplierGstin = normalizeGstin(parsed.supplierGstin);
  const buyerGstin = normalizeGstin(parsed.buyerGstin || profileById(parsed.profileId)?.gstin);
  const supplierMemory = resolveSupplierLocationMemory(parsed);
  const buyerMaster = profileAddressContextByGstin(buyerGstin);
  const invoiceSupplierPin = extractPreferredPincode(parsed.supplierAddress) || extractPreferredPincode(parsed.supplierPlace);
  const buyerPin = extractPreferredPincode(parsed.buyerAddress) || extractPreferredPincode(parsed.buyerPlace) || buyerMaster.pincode;
  if (invoiceSupplierPin) {
    parsed.supplierPincodeSource = parsed.supplierPincodeSource || "invoice";
    parsed.supplierLocationId = parsed.supplierLocationId || supplierMemory.location?.id || "";
    parsed.supplierLocationAmbiguous = false;
  } else if (supplierMemory.location?.pincode) {
    parsed.supplierAddress = addressWithPincode(parsed.supplierAddress || supplierMemory.location.address, supplierMemory.location.pincode);
    parsed.supplierPlace = parsed.supplierPlace || supplierMemory.location.place || "";
    parsed.supplierLocationId = supplierMemory.location.id;
    parsed.supplierPincodeSource = "supplier-master";
    parsed.supplierLocationAmbiguous = false;
  } else if (supplierMemory.ambiguous) {
    parsed.supplierLocationId = "";
    parsed.supplierPincodeSource = "";
    parsed.supplierLocationAmbiguous = true;
    parsed.reviewMessages = uniqueMessages([
      ...(parsed.reviewMessages || []),
      "Multiple saved supplier locations found. Select the dispatch location or enter the supplier PIN."
    ]);
  }
  if (buyerPin && !extractPreferredPincode(parsed.buyerAddress)) {
    parsed.buyerAddress = addressWithPincode(parsed.buyerAddress || buyerMaster.address, buyerPin);
  }
  if (!String(parsed.buyerAddress || "").trim() && buyerMaster.address) parsed.buyerAddress = buyerMaster.address;
  if (!String(parsed.buyerPlace || "").trim() && buyerMaster.place) parsed.buyerPlace = buyerMaster.place;
  return parsed;
}

function supplierPartyByGstin(gstin) {
  const normalized = normalizeGstin(gstin);
  if (!normalized) return null;
  return state.parties.find(party => normalizeGstin(party.gstin) === normalized) || null;
}

function supplierLocationsForParty(party = {}) {
  const locations = normalizeSupplierLocations(party.supplierLocations || []);
  const mainPincode = normalizePincode(extractPreferredPincode(party.address || party.place));
  if (mainPincode) {
    const mainLocation = {
      id: `party-main-${String(party.id || normalizeGstin(party.gstin) || mainPincode).replace(/[^a-z0-9-]/gi, "-")}`,
      label: "Main Address",
      place: party.place || stateNameFromGstin(party.gstin) || "",
      address: addressWithUpdatedPincode(party.address || "", mainPincode),
      pincode: mainPincode,
      isDefault: !locations.some(location => location.isDefault),
      source: "party-master",
      verifiedAt: ""
    };
    const mainKey = supplierLocationMergeKey(mainLocation);
    if (!locations.some(location => supplierLocationMergeKey(location) === mainKey)) locations.unshift(mainLocation);
  }
  const seen = new Set();
  return normalizeSupplierLocations(locations).filter(location => {
    const key = supplierLocationMergeKey(location) || location.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function supplierLocationsByGstin(gstin) {
  return supplierLocationsForParty(supplierPartyByGstin(gstin) || {});
}

function resolveSupplierLocationMemory(parsed = {}) {
  const party = supplierPartyByGstin(parsed.supplierGstin);
  const locations = supplierLocationsForParty(party || {});
  if (!locations.length) return { party, locations, location: null, ambiguous: false };
  const selected = locations.find(location => location.id === parsed.supplierLocationId);
  if (selected) return { party, locations, location: selected, ambiguous: false };
  const invoicePincode = normalizePincode(extractPreferredPincode(parsed.supplierAddress || parsed.supplierPlace));
  const address = String(parsed.supplierAddress || "").trim();
  const pinMatches = invoicePincode ? locations.filter(location => location.pincode === invoicePincode) : [];
  if (pinMatches.length === 1) return { party, locations, location: pinMatches[0], ambiguous: false };
  const candidates = pinMatches.length ? pinMatches : locations;
  if (address) {
    const ranked = candidates.map(location => ({ location, score: supplierAddressMatchScore(address, location.address) }))
      .sort((left, right) => right.score - left.score);
    if (ranked[0]?.score >= 0.72 && (!ranked[1] || ranked[0].score - ranked[1].score >= 0.12)) {
      return { party, locations, location: ranked[0].location, ambiguous: false };
    }
  }
  const uniquePins = [...new Set(locations.map(location => location.pincode).filter(Boolean))];
  if (locations.length === 1 || uniquePins.length === 1) {
    return { party, locations, location: locations[0], ambiguous: false };
  }
  return { party, locations, location: null, ambiguous: uniquePins.length > 1 };
}

function normalizeSupplierAddressForMatch(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/\b\d{6}\b/g, " ")
    .replace(/\b(private|limited|pvt|ltd|india|gstin|pin|pincode)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function supplierAddressMatchScore(leftAddress = "", rightAddress = "") {
  const left = normalizeSupplierAddressForMatch(leftAddress);
  const right = normalizeSupplierAddressForMatch(rightAddress);
  if (!left || !right) return 0;
  if (left === right || left.includes(right) || right.includes(left)) return 1;
  const leftTokens = new Set(left.split(" ").filter(token => token.length >= 3));
  const rightTokens = new Set(right.split(" ").filter(token => token.length >= 3));
  const common = [...leftTokens].filter(token => rightTokens.has(token)).length;
  if (common < 3) return 0;
  return common / Math.min(leftTokens.size, rightTokens.size);
}

function purchaseNeedsPincodeHelp(parsed = {}) {
  const supplierHasGstin = isValidGstin(parsed.supplierGstin);
  const buyerProfile = profileById(parsed.profileId) || profileByGstin(parsed.buyerGstin) || {};
  const buyerHasGstin = isValidGstin(parsed.buyerGstin || buyerProfile.gstin);
  const supplierNeedsPin = supplierHasGstin && !extractPreferredPincode(parsed.supplierAddress);
  const buyerNeedsPin = buyerHasGstin && !extractPreferredPincode(parsed.buyerAddress || buyerProfile.address);
  return supplierNeedsPin || buyerNeedsPin;
}

async function resolvePurchasePincodesWithCloud(parsed = {}) {
  if (!cloudConfigured() || !cloudClient || !cloudSession) return null;
  try {
    const buyerProfile = profileById(parsed.profileId) || profileByGstin(parsed.buyerGstin) || activeProfile();
    const { data, error } = await cloudClient.functions.invoke(GSTIN_PINCODE_FUNCTION, {
      body: {
        supplier: purchasePincodeLookupPayload({
          name: parsed.supplierName,
          gstin: parsed.supplierGstin,
          address: parsed.supplierAddress,
          place: parsed.supplierPlace
        }),
        buyer: purchasePincodeLookupPayload({
          name: parsed.buyerName || buyerProfile.businessName || buyerProfile.label,
          gstin: parsed.buyerGstin || buyerProfile.gstin,
          address: parsed.buyerAddress || buyerProfile.address,
          place: parsed.buyerPlace || buyerProfile.state
        })
      }
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data || null;
  } catch (error) {
    console.warn("GSTIN pincode resolver unavailable", error);
    return null;
  }
}

function purchasePincodeLookupPayload(source = {}) {
  return {
    name: String(source.name || "").trim(),
    gstin: normalizeGstin(source.gstin),
    address: String(source.address || "").trim(),
    place: String(source.place || stateNameFromGstin(source.gstin) || "").trim()
  };
}

function applyPurchasePincodeResolution(parsed = {}, result = null) {
  if (!result) return parsed;
  const reviewMessages = [...(parsed.reviewMessages || [])];
  applyPartyPincodeResolution(parsed, "supplier", result.supplier || {}, reviewMessages);
  applyPartyPincodeResolution(parsed, "buyer", result.buyer || {}, reviewMessages);
  parsed.reviewMessages = uniqueMessages([...reviewMessages, ...(result.reviewMessages || [])]);
  return enrichPurchasePincodesFromMaster(parsed);
}

function applyPartyPincodeResolution(parsed, type, resolution = {}, reviewMessages = []) {
  const addressKey = `${type}Address`;
  const placeKey = `${type}Place`;
  const label = type === "supplier" ? "Supplier" : "Buyer";
  const pin = normalizePincode(resolution.pincode || resolution.pin || "");
  const existingPin = extractPreferredPincode(parsed[addressKey]);
  const confidence = resolution.confidence || "unknown";
  if (!existingPin && pin && confidence === "high") {
    parsed[addressKey] = addressWithPincode(resolution.address || parsed[addressKey], pin);
    if (!String(parsed[placeKey] || "").trim() && resolution.place) parsed[placeKey] = resolution.place;
    if (type === "supplier") {
      parsed.supplierPincodeSource = "gst-lookup";
      parsed.supplierLocationAmbiguous = false;
    }
    return;
  }
  if (!existingPin && pin) {
    reviewMessages.push(`${label} PIN ${pin} was suggested with ${confidence} confidence. Confirm and enter it before E-Way export.`);
  }
  if (!pin && !existingPin && resolution.reason) {
    reviewMessages.push(`${label} PIN could not be filled automatically: ${resolution.reason}`);
  }
}

function partyAddressContextByGstin(gstin) {
  const normalized = normalizeGstin(gstin);
  if (!normalized) return {};
  const party = state.parties.find(row => normalizeGstin(row.gstin) === normalized) || {};
  return addressContextFromRecord(party);
}

function profileAddressContextByGstin(gstin) {
  const profile = profileByGstin(gstin) || {};
  return addressContextFromRecord({
    name: profile.businessName || profile.label,
    gstin: profile.gstin,
    address: profile.address,
    place: profile.state
  });
}

function addressContextFromRecord(record = {}) {
  const address = String(record.address || "").trim();
  return {
    name: record.name || record.businessName || record.label || "",
    gstin: normalizeGstin(record.gstin),
    address,
    place: record.place || record.state || stateNameFromGstin(record.gstin) || "",
    pincode: extractPreferredPincode(address)
  };
}

function addressWithPincode(address = "", pincode = "") {
  const pin = normalizePincode(pincode);
  const cleaned = String(address || "").trim().replace(/\s*,\s*/g, ", ");
  if (!pin) return cleaned;
  if (extractPincode(cleaned)) return cleaned;
  return [cleaned, pin].filter(Boolean).join(", ");
}

function addressWithUpdatedPincode(address = "", pincode = "") {
  const pin = normalizePincode(pincode);
  const cleaned = String(address || "").trim().replace(/\s*,\s*/g, ", ");
  if (!pin) return cleaned;
  if (!cleaned) return pin;
  const matches = [...cleaned.matchAll(/\b\d{6}\b/g)];
  if (!matches.length) return [cleaned, pin].join(", ");
  const last = matches[matches.length - 1];
  return `${cleaned.slice(0, last.index)}${pin}${cleaned.slice(last.index + last[0].length)}`;
}

async function fileToBase64(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function buildManualReviewPurchase(file, message) {
  const profile = activeProfile();
  return {
    fileName: file.name,
    profileId: profile.id,
    supplierName: file.name.replace(/\.[^.]+$/i, ""),
    supplierGstin: "",
    invoiceNumber: nextEntryNumber("purchase", profile.id),
    invoiceDate: today(),
    taxable: 0,
    gst: 0,
    total: 0,
    roundOff: 0,
    extractedTaxes: { cgst: 0, sgst: 0, igst: 0, gst: 0 },
    reviewMessages: [message],
    lines: [{
      name: "Imported Purchase",
      hsn: DEFAULT_SALE_HSN,
      qty: 1,
      rate: 0,
      gstRate: 18
    }]
  };
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
  const special = parseSpecialPurchaseInvoiceText(cleaned, fileName);
  if (special) return special;
  const lines = cleaned.split("\n").map(line => line.trim()).filter(Boolean);
  const gstins = [...new Set((cleaned.match(/\b\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]\b/gi) || []).map(normalizeGstin))];
  const matchedProfile = gstins.map(profileByGstin).find(Boolean);
  const profile = matchedProfile || activeProfile();
  const buyerGstin = normalizeGstin(profile.gstin);
  const supplierGstin = gstins.find(gstin => gstin !== buyerGstin) || "";
  const supplierName = findSupplierName(lines, supplierGstin) || fileName.replace(/\.pdf$/i, "");
  const supplierAddress = findSupplierAddress(lines, supplierGstin);
  const detectedInvoiceNumber = findInvoiceNumber(lines);
  const invoiceNumber = detectedInvoiceNumber || nextEntryNumber("purchase", profile.id);
  const invoiceDate = findInvoiceDate(cleaned) || today();
  const amounts = findInvoiceAmounts(lines);
  const parsedLines = findItemLines(lines);
  const fallbackTaxable = amounts.taxable || Math.max(0, amounts.total - amounts.gst) || amounts.total;
  const roundOff = purchasePaymentAdjustmentFromText(cleaned);
  const expectedTax = taxModeFromGstins(supplierGstin, buyerGstin);
  const reviewMessages = uniqueMessages([
    matchedProfile ? "" : "Buyer GSTIN did not match one of your 8 GST profiles. Confirm the business GST before saving.",
    supplierGstin ? "" : "Supplier GSTIN was not found. Confirm supplier details before saving.",
    detectedInvoiceNumber ? "" : "Supplier invoice number was not detected. Replace the draft number before saving.",
    expectedTax.review,
    ...(expectedTax.mode === "IGST" && (amounts.cgst || amounts.sgst) ? ["Supplier and buyer GSTIN states differ, so IGST is expected. Uploaded invoice shows CGST/SGST."] : []),
    ...(expectedTax.mode === "CGST_SGST" && amounts.igst ? ["Supplier and buyer GSTIN states match, so CGST/SGST is expected. Uploaded invoice shows IGST."] : [])
  ]);
  return {
    fileName,
    profileId: profile.id,
    supplierName,
    supplierGstin,
    supplierAddress,
    supplierPlace: supplierAddress ? stateNameFromGstin(supplierGstin) : "",
    buyerGstin,
    invoiceNumber,
    invoiceDate,
    taxable: fallbackTaxable,
    gst: amounts.gst,
    total: amounts.total || fallbackTaxable + amounts.gst,
    roundOff,
    extractedTaxes: {
      taxable: fallbackTaxable,
      cgst: amounts.cgst,
      sgst: amounts.sgst,
      igst: amounts.igst,
      gst: amounts.gst,
      total: amounts.total || fallbackTaxable + amounts.gst
    },
    reviewMessages,
    lines: parsedLines.length ? parsedLines : [{
      name: "Imported Purchase",
      hsn: DEFAULT_SALE_HSN,
      qty: 1,
      rate: fallbackTaxable,
      gstRate: inferGstRate(fallbackTaxable, amounts.gst)
    }]
  };
}

function parseSpecialPurchaseInvoiceText(text, fileName) {
  if (isReliancePurchaseInvoice(text)) return parseReliancePurchaseInvoiceText(text, fileName);
  return null;
}

function isReliancePurchaseInvoice(text) {
  return /reliance/i.test(text)
    && /GSTN\s*#?:?\s*33AABCR1718E1ZW|Supply\s+State\s+GSTN\s+Number\s*:?\s*33AABCR1718E1ZW/i.test(text)
    && /Net\s+Sales\s+Value|GST\s+RECEIPT\s+SUMMARY/i.test(text);
}

function parseReliancePurchaseInvoiceText(text, fileName) {
  const cleaned = text.replace(/\r/g, "\n").replace(/[ \t]+/g, " ");
  const lines = cleaned.split("\n").map(line => line.trim()).filter(Boolean);
  const profile = profileByGstin(relianceBuyerGstin(cleaned)) || activeProfile();
  const buyerGstin = normalizeGstin(profile.gstin || relianceBuyerGstin(cleaned));
  const supplierGstin = normalizeGstin(
    cleaned.match(/Supply\s+State\s+GSTN\s+Number\s*:?\s*([0-9A-Z]{15})/i)?.[1]
    || cleaned.match(/GSTN\s*#?:?\s*([0-9A-Z]{15})/i)?.[1]
    || "33AABCR1718E1ZW"
  );
  const invoiceNumber = cleaned.match(/Tax\s+Invoice#\s*([A-Z0-9]+)/i)?.[1]
    || findInvoiceNumber(lines)
    || nextEntryNumber("purchase", profile.id);
  const relianceDate = cleaned.match(/\bDt\s*:\s*(\d{1,2}\/\d{1,2}\/\d{4})/i)?.[1] || "";
  const invoiceDate = relianceDate ? toDateInput(relianceDate) : (findInvoiceDate(cleaned) || today());
  const totalSummary = relianceTotalSummary(lines);
  const hsnSummaries = relianceHsnSummaries(lines);
  const itemDetails = relianceItemDetails(lines);
  const parsedLines = hsnSummaries.map(summary => {
    const item = itemDetails.find(detail => detail.hsn === summary.hsn) || {};
    const qty = num(item.qty) || 1;
    return {
      name: item.name || `Reliance item ${summary.hsn}`,
      hsn: summary.hsn,
      qty,
      rate: qty ? round2(summary.taxable / qty) : summary.taxable,
      grossRate: qty ? round2(summary.total / qty) : summary.total,
      gstRate: summary.gstRate || inferGstRate(summary.taxable, summary.tax),
      imeiNumbers: item.imeiNumbers || ""
    };
  });
  const taxable = totalSummary.taxable || round2(hsnSummaries.reduce((sum, row) => sum + row.taxable, 0));
  const gst = totalSummary.gst || round2(hsnSummaries.reduce((sum, row) => sum + row.tax, 0));
  const total = totalSummary.total || round2(hsnSummaries.reduce((sum, row) => sum + row.total, 0));
  const roundOff = purchasePaymentAdjustmentFromText(cleaned);
  return {
    fileName,
    profileId: profile.id,
    supplierName: "Reliance Retail Limited",
    supplierGstin,
    supplierAddress: "Reliance Corporate Park",
    supplierPlace: stateNameFromGstin(supplierGstin) || "Tamil Nadu",
    buyerName: profile.businessName || relianceBuyerName(lines) || profile.label || "",
    buyerGstin,
    buyerAddress: relianceBuyerAddress(lines),
    buyerPlace: profile.state || stateNameFromGstin(buyerGstin) || "",
    invoiceNumber,
    invoiceDate,
    taxable,
    gst,
    total,
    roundOff,
    extractedTaxes: {
      taxable,
      cgst: 0,
      sgst: 0,
      igst: gst,
      gst,
      total
    },
    reviewMessages: parsedLines.length ? [] : ["Reliance invoice detected, but item HSN summary was not fully readable. Review item values before saving."],
    lines: parsedLines.length ? parsedLines : [{
      name: "Reliance Purchase",
      hsn: DEFAULT_SALE_HSN,
      qty: 1,
      rate: taxable,
      grossRate: total,
      gstRate: inferGstRate(taxable, gst)
    }]
  };
}

function relianceBuyerGstin(text) {
  return normalizeGstin(text.match(/GSTIN\s+Number\s*:?\s*([0-9A-Z]{15})/i)?.[1] || "");
}

function relianceBuyerName(lines = []) {
  const index = lines.findIndex(line => /^Customer\s+Address\s*:?$/i.test(line));
  if (index < 0) return "";
  return lines[index + 1] || "";
}

function relianceBuyerAddress(lines = []) {
  const start = lines.findIndex(line => /^Customer\s+Address\s*:?$/i.test(line));
  if (start < 0) return "";
  const end = lines.findIndex((line, index) => index > start && /^Relationship\s+ID|^GSTIN\s+Number/i.test(line));
  return lines.slice(start + 2, end > start ? end : start + 12).join(", ");
}

function relianceTotalSummary(lines = []) {
  const result = { taxable: 0, gst: 0, total: 0 };
  for (const line of lines) {
    const match = line.replace(/,/g, "").match(/^TOTAL:\s*(\d+(?:\.\d{1,2})?)\s+(\d+(?:\.\d{1,2})?)\s+(\d+(?:\.\d{1,2})?)/i);
    if (!match) continue;
    result.taxable = Number(match[1]);
    result.gst = Number(match[2]);
    result.total = Number(match[3]);
    break;
  }
  if (!result.total) {
    result.total = Number(String(lines.find(line => /Net\s+Sales\s+Value/i.test(line)) || "").replace(/,/g, "").match(/(\d+(?:\.\d{1,2})?)\s*$/)?.[1] || 0);
  }
  return result;
}

function relianceHsnSummaries(lines = []) {
  const summaries = [];
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].replace(/,/g, "").match(/^(\d{4,8})\s+(\d+(?:\.\d{1,2})?)\s+(\d+(?:\.\d{1,2})?)\s+(\d+(?:\.\d{1,2})?)$/);
    if (!match) continue;
    const rateLine = lines.slice(index + 1, index + 4).find(line => /\bIGST\b|\bCGST\b|\bSGST\b/i.test(line)) || "";
    const gstRate = Number(rateLine.match(/(\d+(?:\.\d+)?)\s*%/)?.[1] || 18);
    summaries.push({
      hsn: match[1],
      taxable: Number(match[2]),
      tax: Number(match[3]),
      total: Number(match[4]),
      gstRate
    });
  }
  return summaries;
}

function relianceItemDetails(lines = []) {
  const details = [];
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].replace(/,/g, "").match(/^(.+?)\s+(\d+(?:\.\d+)?)\s*EA\s+(\d+(?:\.\d{1,2})?)$/i);
    if (!match || /items?\s+purchased/i.test(lines[index])) continue;
    const following = lines.slice(index + 1, index + 5).join(" ");
    const hsn = following.match(/\b(\d{8})\b/)?.[1] || "";
    if (!hsn) continue;
    const imeiNumbers = [...new Set((following.match(/\b\d{14,17}\b/g) || []).filter(value => value !== hsn))].join("\n");
    details.push({
      name: match[1].trim(),
      qty: Number(match[2]),
      listedAmount: Number(match[3]),
      hsn,
      imeiNumbers
    });
  }
  return details;
}

function findSupplierAddress(lines, supplierGstin = "") {
  const addressStart = lines.findIndex(line => /^(?:ho\s*)?address\s*:/i.test(line) && !/billed|shipped|customer|buyer/i.test(line));
  if (addressStart >= 0) return collectSupplierAddressBlock(lines, addressStart);
  const gstinIndex = supplierGstin ? lines.findIndex(line => line.includes(supplierGstin)) : -1;
  if (gstinIndex >= 0) {
    const start = Math.max(0, gstinIndex - 5);
    const candidate = collectSupplierAddressBlock(lines, start, gstinIndex);
    if (extractPreferredPincode(candidate)) return candidate;
  }
  const pincodeIndex = lines.findIndex((line, index) => index < 12 && /\b(?:pin\s*code|pincode|pin)\b|\b\d{6}\b/i.test(line));
  return pincodeIndex >= 0 ? collectSupplierAddressBlock(lines, Math.max(0, pincodeIndex - 2), Math.min(lines.length, pincodeIndex + 1)) : "";
}

function collectSupplierAddressBlock(lines = [], startIndex = 0, endIndex = 0) {
  const stop = endIndex || Math.min(lines.length, startIndex + 6);
  const parts = [];
  for (let index = startIndex; index < stop; index += 1) {
    const line = String(lines[index] || "").trim();
    if (!line) continue;
    if (index > startIndex && /^(?:phone|ho\s*phone|email|invoice|inv\s*no|bill|ship|billed|shipped|sales\s*person|state\s*:|name\s*:|gstn?\s*(?:no|number)?\s*:|ho\s*gst)\b/i.test(line)) break;
    const cleaned = line
      .replace(/^(?:ho\s*)?address\s*:\s*/i, "")
      .replace(/\s+/g, " ")
      .trim();
    if (cleaned) parts.push(cleaned);
    if (extractPreferredPincode(cleaned) && index > startIndex) break;
  }
  return parts.join(", ").replace(/\s*,\s*/g, ", ").replace(/(?:,\s*){2,}/g, ", ").trim();
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
  const numericDate = "(?:\\d{4}\\s*[\\/\\-.]\\s*\\d{1,2}\\s*[\\/\\-.]\\s*\\d{1,2}|\\d{1,2}\\s*[\\/\\-.]\\s*\\d{1,2}\\s*[\\/\\-.]\\s*\\d{2,4}|\\d{6}|\\d{8})";
  const namedDate = "(?:\\d{1,2}(?:st|nd|rd|th)?[\\s,\\/\\-.]+[A-Za-z]{3,9}[\\s,\\/\\-.]+\\d{2,4}|[A-Za-z]{3,9}[\\s,\\/\\-.]+\\d{1,2}(?:st|nd|rd|th)?(?:,)?[\\s,\\/\\-.]+\\d{2,4}|\\d{4}[\\s,\\/\\-.]+[A-Za-z]{3,9}[\\s,\\/\\-.]+\\d{1,2}|\\d{1,2}(?:st|nd|rd|th)?[A-Za-z]{3,9}\\d{2,4})";
  const dateToken = `(?:${numericDate}|${namedDate})`;
  const sanitized = String(text || "").replace(new RegExp(
    `\\b(?:ack(?:nowledg(?:e)?ment)?\\.?|irn|e-?way\\s*bill(?:\\s+generated)?|generated|valid\\s*(?:upto|until)|delivery\\s*note|dispatch(?:ed)?|document)\\s*(?:date|dt\\.?)(?:\\s*(?:&|\\/)\\s*time)?\\s*[:\\-]?\\s*${dateToken}`,
    "gi"
  ), " ");
  const patterns = [
    new RegExp(`\\b(?:tax\\s+)?invoice\\s*(?:date|dated)(?:\\s*(?:&|\\/)\\s*time)?\\s*[:\\-]?\\s*(${dateToken})`, "i"),
    new RegExp(`\\bdate\\s+of\\s+invoice(?:\\s*(?:&|\\/)\\s*time)?\\s*[:\\-]?\\s*(${dateToken})`, "i"),
    new RegExp(`\\bdated\\s*[:\\-]?\\s*(${dateToken})`, "i"),
    new RegExp(`\\b(?:date|dt\\.?)\\s*[:\\-]?\\s*(${dateToken})`, "i"),
    new RegExp(`\\b(${dateToken})\\b`, "i")
  ];
  for (const pattern of patterns) {
    const match = sanitized.match(pattern);
    const normalized = match ? toDateInput(match[1]) : "";
    if (normalized) return normalized;
  }
  return "";
}

function toDateInput(value) {
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

function invoiceMonthNumber(value) {
  const token = String(value || "").trim().toLowerCase().slice(0, 3);
  const index = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].indexOf(token);
  return index >= 0 ? index + 1 : 0;
}

function dateInputFromParts(yearValue, monthValue, dayValue) {
  if (!monthValue) return "";
  const yearText = String(yearValue || "");
  const year = Number(yearText.length === 2 ? `20${yearText}` : yearText);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (!year || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return "";
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function findInvoiceAmounts(lines) {
  const result = { taxable: 0, cgst: 0, sgst: 0, igst: 0, gst: 0, total: 0 };
  for (const line of lines) {
    const lower = line.toLowerCase();
    const amount = lastAmount(line);
    if (!amount) continue;
    if (/\bcgst\b|central\s+tax/.test(lower)) {
      result.cgst += amount;
      continue;
    }
    if (/\bsgst\b|state\s+tax/.test(lower)) {
      result.sgst += amount;
      continue;
    }
    if (/\bigst\b|integrated\s+tax/.test(lower)) {
      result.igst += amount;
      continue;
    }
    if (/taxable|sub\s*total|assessable/.test(lower)) result.taxable = amount;
    if (/(gst amount|total tax|tax amount)/.test(lower)) result.gst = Math.max(result.gst, amount);
    if (/(grand total|invoice total|net amount|total amount|amount payable|round off total)/.test(lower)) result.total = amount;
  }
  result.gst = result.gst || result.cgst + result.sgst + result.igst;
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

function buildPurchaseDraft(parsed, selectedProfileOverride = null) {
  const selectedProfile = selectedProfileOverride || activeProfile();
  const parsedProfile = state.settings.profiles.find(profile => profile.id === parsed.profileId);
  const parsedBuyerGstin = normalizeGstin(parsed.buyerGstin || parsedProfile?.gstin);
  const buyerProfile = parsedProfile || profileByGstin(parsedBuyerGstin) || selectedProfile;
  const buyerGstin = normalizeGstin(buyerProfile.gstin);
  const contextMessages = uniqueMessages([
    buyerProfile.id !== selectedProfile.id
      ? `Uploaded invoice buyer matched ${profileName(buyerProfile.id)}. Draft moved from selected company ${profileName(selectedProfile.id)} to the matched buyer GST.`
      : "",
    parsedBuyerGstin && buyerGstin && parsedBuyerGstin !== buyerGstin
      ? `Uploaded buyer GSTIN ${parsedBuyerGstin} differs from matched company GSTIN ${buyerGstin}. Confirm before saving.`
      : ""
  ]);
  const reviewMessages = uniqueMessages([...(parsed.reviewMessages || []), ...contextMessages]);
  const partyId = ensureImportedSupplier(parsed);
  const supplierInvoicePincode = normalizePincode(extractPreferredPincode(parsed.supplierAddress || parsed.supplierPlace));
  const lines = parsed.lines.map(line => {
    const item = ensureImportedItem(line);
    const gstRate = line.gstRate === undefined || line.gstRate === null ? DEFAULT_SALE_GST_RATE : num(line.gstRate);
    const inclusiveRate = num(line.grossRate) || inclusiveRateFromTaxable(line.rate, gstRate);
    const taxableRate = num(line.rate) || taxableRateFromInclusive(inclusiveRate, gstRate);
    return {
      itemId: item.id,
      itemName: item.name || line.name || "",
      qty: num(line.qty) || 1,
      rate: taxableRate,
      grossRate: inclusiveRate,
      gstRate,
      imeiNumbers: normalizeImeiNumbers(line.imeiNumbers || "")
    };
  });
  return {
    profileId: buyerProfile.id,
    date: parsed.invoiceDate,
    number: parsed.invoiceNumber,
    partyId,
    status: "Unpaid",
    notes: `Auto-filled from ${parsed.fileName}. Review values before saving.`,
    lines,
    attachments: clone(parsed.attachments || []),
    extractedTaxes: clone(parsed.extractedTaxes || null),
    ewayDetails: purchaseImportEwayDetails({
      ...parsed,
      profileId: buyerProfile.id,
      buyerAddress: buyerProfile.address || parsed.buyerAddress || "",
      buyerPlace: buyerProfile.state || parsed.buyerPlace || ""
    }, {
      ...(parsed.ewayDetails || {}),
      fromPincode: supplierInvoicePincode || parsed.ewayDetails?.fromPincode,
      dispatchFromAddress: parsed.ewayDetails?.dispatchFromAddress || parsed.supplierAddress || ""
    }),
    roundOff: round2(num(parsed.roundOff)),
    sellerGstin: parsed.supplierGstin || "",
    buyerGstin,
    reviewMessages,
    reviewStatus: reviewMessages.length ? "Needs Review" : "Ready",
    source: "purchase-upload"
  };
}

function ensureImportedSupplier(parsed) {
  const supplierName = parsed.supplierName || "Imported Supplier";
  const supplierGstin = normalizeGstin(parsed.supplierGstin);
  const existing = state.parties.find(party => (
    supplierGstin && normalizeGstin(party.gstin) === supplierGstin
  ) || String(party.name || "").toLowerCase() === supplierName.toLowerCase() || partyAliasMatch(party, supplierName).index >= 0);
  if (existing) {
    const before = cloudAuditComparable(existing);
    ensurePartyRole(existing, "Supplier");
    updateExistingImportedSupplier(existing, parsed, supplierGstin);
    rememberApprovedSupplierLocation(existing, parsed);
    if (cloudAuditComparable(existing) !== before) touchPartyMasterEntity(existing);
    return existing.id;
  }
  const party = entityWithLocalMeta({
    id: uid(),
    name: supplierName,
    type: "Supplier",
    gstin: supplierGstin,
    phone: "",
    place: parsed.supplierPlace || stateNameFromGstin(supplierGstin) || stateCodeFromGstin(supplierGstin) || "",
    address: parsed.supplierAddress || "",
    aliases: "",
    shippingAddresses: [],
    supplierLocations: []
  });
  rememberApprovedSupplierLocation(party, parsed);
  state.parties.push(normalizePartyForState(party));
  return party.id;
}

function updateExistingImportedSupplier(party, parsed, supplierGstin) {
  if (!normalizeGstin(party.gstin) && supplierGstin) party.gstin = supplierGstin;
  if (!String(party.address || "").trim() && parsed.supplierAddress) party.address = parsed.supplierAddress;
  if (!String(party.place || "").trim()) {
    party.place = parsed.supplierPlace || stateNameFromGstin(supplierGstin) || stateCodeFromGstin(supplierGstin) || "";
  }
  if (parsed.supplierName) appendPartyAlias(party, parsed.supplierName);
}

function rememberApprovedSupplierLocation(party, parsed = {}) {
  const pincode = normalizePincode(extractPreferredPincode(parsed.supplierAddress || parsed.supplierPlace));
  if (!party || !isValidGstin(parsed.supplierGstin || party.gstin) || !pincode) return false;
  const reviewedAddress = addressWithUpdatedPincode(parsed.supplierAddress || "", pincode);
  const partyAddressPincode = extractPreferredPincode(party.address || party.place);
  const canUsePartyAddress = !partyAddressPincode || partyAddressPincode === pincode;
  const address = normalizeSupplierAddressForMatch(reviewedAddress)
    ? reviewedAddress
    : addressWithUpdatedPincode(canUsePartyAddress ? party.address : "", pincode);
  const place = String(parsed.supplierPlace || party.place || stateNameFromGstin(party.gstin) || "").trim();
  const locations = supplierLocationsForParty(party).map(location => ({ ...location }));
  const selectedId = String(parsed.supplierLocationId || "");
  const addressKey = supplierLocationMergeKey({ address, pincode });
  let existing = locations.find(location => location.id === selectedId || supplierLocationMergeKey(location) === addressKey);
  if (!existing) {
    const samePin = locations.filter(location => location.pincode === pincode);
    const normalizedAddress = normalizeSupplierAddressForMatch(address);
    if (samePin.length === 1 && (!normalizedAddress || supplierAddressMatchScore(address, samePin[0].address) >= 0.72)) {
      existing = samePin[0];
    }
  }
  const now = new Date().toISOString();
  if (existing) {
    existing.address = normalizeSupplierAddressForMatch(address) ? address : (existing.address || address);
    existing.pincode = pincode;
    existing.place = place || existing.place;
    existing.source = parsed.supplierPincodeSource || existing.source || "invoice";
    existing.verifiedAt = now;
  } else {
    locations.push({
      id: selectedId || uid(),
      label: place || `PIN ${pincode}`,
      place,
      address,
      pincode,
      isDefault: !locations.some(location => location.isDefault),
      source: parsed.supplierPincodeSource || "invoice",
      verifiedAt: now
    });
  }
  party.supplierLocations = normalizeSupplierLocations(locations);
  if (!String(party.address || "").trim()) party.address = address;
  else if (!extractPreferredPincode(party.address) && party.supplierLocations.find(location => location.isDefault)?.pincode === pincode) {
    party.address = addressWithPincode(party.address, pincode);
  }
  if (!String(party.place || "").trim()) party.place = place;
  return true;
}

function touchPartyMasterEntity(party) {
  const now = new Date().toISOString();
  party.syncStatus = newLocalSyncStatus();
  party.createdAt = party.createdAt || now;
  party.updatedAt = now;
  party.createdBy = party.createdBy || currentCloudUserId() || "";
}

function appendPartyAlias(party, alias) {
  const cleaned = cleanPartyAlias(alias);
  if (!cleaned || normalizeForAlias(cleaned) === normalizeForAlias(party.name)) return;
  if (GENERIC_PARTY_ALIASES.has(normalizeForAlias(cleaned))) return;
  if (partyAliasConflict(cleaned, party.id)) return;
  const aliases = cleanPartyAliasList([...(partyAliasList(party) || []), cleaned]);
  party.aliases = aliases.join("\n");
}

function ensureImportedItem(line) {
  const hsn = normalizeLineHsn(line.hsn) || DEFAULT_SALE_HSN;
  const rawName = String(line.name || "Imported Purchase").trim() || "Imported Purchase";
  const name = normalizeImportedItemName(rawName);
  const existing = findImportedItemByNormalizedName(name, hsn);
  if (existing) {
    if (shouldRenameImportedItem(existing, name, hsn)) existing.name = name;
    return existing;
  }
  const gstRate = line.gstRate === undefined || line.gstRate === null ? DEFAULT_SALE_GST_RATE : num(line.gstRate);
  const inclusiveRate = num(line.grossRate) || inclusiveRateFromTaxable(line.rate, gstRate);
  const item = {
    id: uid(),
    name,
    hsn,
    gstRate,
    saleRate: inclusiveRate,
    purchaseRate: inclusiveRate,
    openingStock: 0,
    minStock: 0
  };
  state.items.push(item);
  return item;
}

function findImportedItemByNormalizedName(name, hsn) {
  const normalizedName = normalizeForAlias(name);
  return state.items.find(item => (
    normalizeLineHsn(item.hsn) === hsn
    && normalizeForAlias(item.name) === normalizedName
  )) || state.items.find(item => (
    normalizeLineHsn(item.hsn) === hsn
    && normalizeForAlias(normalizeImportedItemName(item.name)) === normalizedName
  ));
}

function shouldRenameImportedItem(item, cleanName, hsn) {
  if (!item || !cleanName || /^imported purchase|imported item$/i.test(cleanName)) return false;
  if (normalizeForAlias(item.name) === normalizeForAlias(cleanName)) return false;
  const conflictingItem = state.items.find(candidate => (
    candidate.id !== item.id
    && normalizeLineHsn(candidate.hsn) === hsn
    && normalizeForAlias(candidate.name) === normalizeForAlias(cleanName)
  ));
  return !conflictingItem && normalizeForAlias(normalizeImportedItemName(item.name)) === normalizeForAlias(cleanName);
}

function normalizeImportedItemName(value) {
  const cleaned = cleanImportedItemNameText(value);
  const appleName = normalizeAppleProductName(cleaned);
  if (appleName) return appleName;
  const generic = cleaned
    .replace(/\s*\([^)]*(?:color|colour|clr|sku|code|ean|imei|serial|batch|hsn|gb|tb)[^)]*\)\s*/gi, " ")
    .replace(/\s*\[[^\]]*(?:color|colour|clr|sku|code|ean|imei|serial|batch|hsn|gb|tb)[^\]]*\]\s*/gi, " ")
    .replace(/\s+\b(?:black|white|blue|green|pink|yellow|red|purple|silver|gold|graphite|midnight|starlight|natural|titanium|orange|teal|sage|lavender)\b\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  return generic || cleaned || "Imported Purchase";
}

function cleanImportedItemNameText(value) {
  return String(value || "")
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, "")
    .replace(/^[A-Z]{2,}\d{2,}\s*[-:]\s*/i, "")
    .replace(/\b(?:sku|item\s*code|product\s*code|model\s*code|code|ean|imei|serial|batch)\s*[:#-]?\s*[A-Z0-9/_-]{4,}\b/gi, " ")
    .replace(/\b(?:hsn|sac)\s*[:#-]?\s*\d{4,8}\b/gi, " ")
    .replace(/\b\d{14,17}\b/g, " ")
    .replace(/[|/]+/g, " ")
    .replace(/\s*[-:]+\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeAppleProductName(value) {
  const text = cleanImportedItemNameText(value);
  const lower = text.toLowerCase().replace(/\bapple\b/g, " ").replace(/\s+/g, " ").trim();
  if (!/\biphone\b|i\s*phone/i.test(lower)) return "";
  const compact = lower.replace(/i\s*phone/g, "iphone").replace(/iphone\s*(\d)/g, "iphone $1");
  const seriesMatch = compact.match(/\biphone\s*(se|x(?:r|s|s max)?|\d{1,2})\b/i);
  if (!seriesMatch) return "";
  const seriesRaw = seriesMatch[1].toUpperCase();
  const series = seriesRaw === "SE" ? "SE" : seriesRaw.replace(/^X([R|S].*)$/i, match => match.toUpperCase());
  const modelTail = compact.slice(seriesMatch.index);
  const variant = normalizeAppleVariant(modelTail);
  const storage = normalizeAppleStorage(compact);
  return ["iPhone", series, variant, storage].filter(Boolean).join(" ");
}

function normalizeAppleVariant(value) {
  const text = String(value || "").toLowerCase().replace(/pro\s*max|promax/g, "pro max");
  if (/\bpro max\b/.test(text)) return "Pro Max";
  if (/\bpro\b/.test(text)) return "Pro";
  if (/\bplus\b/.test(text)) return "Plus";
  if (/\bair\b/.test(text)) return "Air";
  if (/\bmini\b/.test(text)) return "Mini";
  return "";
}

function normalizeAppleStorage(value) {
  const text = String(value || "").toLowerCase();
  const match = text.match(/\b(64|128|256|512)\s*(?:gb|g)?\b|\b(1|2)\s*tb\b/);
  if (!match) return "";
  if (match[1]) return `${match[1]}GB`;
  return `${match[2]}TB`;
}

window.openEntry = openEntry;
window.deleteEntry = deleteEntry;
window.cancelEntry = cancelEntry;
window.openCreditNote = openCreditNote;
window.cancelCreditNote = cancelCreditNote;
window.showInvoice = showInvoice;
window.openItem = openItem;
window.deleteItem = deleteItem;
window.openParty = openParty;
window.deleteParty = deleteParty;
window.openPaymentSource = openPaymentSource;
window.selectReconciliationSource = selectReconciliationSource;
window.openReconciliationMatch = openReconciliationMatch;
window.acceptReconciliationSuggestion = acceptReconciliationSuggestion;
window.acceptReconciliationDifference = acceptReconciliationDifference;
window.unmatchReconciliationTransaction = unmatchReconciliationTransaction;
window.ignoreReconciliationTransaction = ignoreReconciliationTransaction;
window.restoreReconciliationTransaction = restoreReconciliationTransaction;

document.addEventListener("DOMContentLoaded", init);
