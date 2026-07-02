const STORAGE_KEY = "billingSoftware.v1";
const LOCAL_STATE_BACKUP_KEY = "billingSoftware.localBackup.v1";
const GST_PROFILE_VERSION = "2026-06-24-official-8-gst";
const CLOUD_WORKSPACE_TABLE = "billing_cloud_workspaces";
const CLOUD_SELECTED_WORKSPACE_KEY = "billingSoftware.cloudWorkspaceId";
const PURCHASE_ATTACHMENT_BUCKET = "purchase-invoices";
const EWAY_DOCUMENT_VERSION = "1.0.0621";
const DEFAULT_SALE_HSN = "85171300";
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
  "600021-532222": 981
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
    bankDetails: {
      accountName: "Kala Nirvana",
      bankName: "ICICI Bank",
      branch: "Kupu Chandra Peta Branch",
      accountNumber: "757205000565",
      ifsc: "ICIC0007572"
    },
    nextSaleNo: 2,
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
    bankDetails: {
      accountName: "HARIHARA MOBILES",
      bankName: "ICICI Bank",
      branch: "Tirupati Branch",
      accountNumber: "630905039494",
      ifsc: "ICIC0006309"
    },
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
    bankDetails: {
      accountName: "Shiva Nandi Communications",
      bankName: "ICICI Bank",
      branch: "Tirupati Branch",
      accountNumber: "630905039332",
      ifsc: "ICIC0006309"
    },
    nextSaleNo: 5,
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
    bankDetails: {
      accountName: "Skanda Digitals",
      bankName: "ICICI Bank",
      branch: "KT Road Branch",
      accountNumber: "720905500069",
      ifsc: "ICIC0007209"
    },
    nextSaleNo: 8,
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
    bankDetails: {
      accountName: "Khairanya Infotech",
      bankName: "ICICI Bank",
      branch: "Kupu Chandra Peta Branch",
      accountNumber: "757205000575",
      ifsc: "ICIC0007572"
    },
    nextSaleNo: 3,
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
    bankDetails: {
      accountName: "LAKSHMI JEYAPANDI TRADERS",
      bankName: "ICICI Bank",
      branch: "Chennai - Rajaji Salai Branch",
      accountNumber: "793705000262",
      ifsc: "ICIC0007937"
    },
    nextSaleNo: 7,
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
    bankDetails: {
      accountName: "SRI LAKSHMI DIGITALS",
      bankName: "ICICI Bank",
      branch: "Punganur Branch",
      accountNumber: "377105500333",
      ifsc: "ICIC0003771"
    },
    nextSaleNo: 6,
    nextPurchaseNo: 1
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

const FIRM_LOGOS = {
  "gst-1": { initials: "NS", kind: "apex", primary: "#0f766e", accent: "#1e40af", ink: "#111827" },
  "gst-2": { initials: "KN", kind: "lotus", primary: "#9f1239", accent: "#b45309", ink: "#2b0f18" },
  "gst-3": { initials: "HM", kind: "device", primary: "#047857", accent: "#1d4ed8", ink: "#062e29" },
  "gst-4": { initials: "SN", kind: "wave", primary: "#3730a3", accent: "#c2410c", ink: "#111827" },
  "gst-5": { initials: "SD", kind: "grid", primary: "#0369a1", accent: "#0f766e", ink: "#111827" },
  "gst-6": { initials: "KI", kind: "node", primary: "#6d28d9", accent: "#0f766e", ink: "#111827" },
  "gst-7": { initials: "LJT", kind: "trade", primary: "#166534", accent: "#a16207", ink: "#111827" },
  "gst-8": { initials: "SLD", kind: "lens", primary: "#b91c1c", accent: "#ea580c", ink: "#111827" }
};

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
  purchases: []
};

let state = loadState();
let currentView = "dashboard";
let entryMode = "sale";
let editingEntryId = null;
let editingItemId = null;
let editingPartyId = null;
let deviceViewMode = "";
let activeReport = "summary";
let cloudClient = null;
let cloudSession = null;
let cloudWorkspaces = [];
let cloudWorkspace = null;
let cloudLoading = false;
let cloudSyncTimer = null;
let forgotPasswordMode = false;
let passwordRecoveryMode = false;
let selectedPurchaseIds = new Set();
let entryMonthFilters = {};
let purchaseUploadQueue = [];
let purchaseUploadBusy = false;
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

const COMPANY_PAGE_TRANSITION_MS = 460;

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
  if (!profiles.some(profile => profile.id === value.settings.activeProfileId)) {
    value.settings.activeProfileId = profiles[0].id;
  }
  value.items = (Array.isArray(value.items) ? value.items : []).filter(item => !isDefaultSampleProduct(item));
  value.parties = Array.isArray(value.parties) ? value.parties.map(normalizePartyForState) : [];
  mergeTallyBuyerMaster(value);
  value.sales = Array.isArray(value.sales) ? value.sales : [];
  value.purchases = Array.isArray(value.purchases) ? value.purchases : [];
  [...value.sales, ...value.purchases].forEach(entry => {
    if (!entry.profileId) entry.profileId = value.settings.activeProfileId;
  });
  value.sales.forEach(entry => normalizeEntryForState(entry, "sale", value.parties));
  value.purchases.forEach(entry => normalizeEntryForState(entry, "purchase", value.parties));
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
    changed = mergeByIdentity(merged.parties, local.parties, partyMergeKey) || changed;
    changed = mergeByIdentity(merged.items, local.items, itemMergeKey) || changed;
    changed = mergeByIdentity(merged.sales, local.sales, entryMergeKey) || changed;
    changed = mergeByIdentity(merged.purchases, local.purchases, entryMergeKey) || changed;
    mergeProfileCounters(merged.settings.profiles, local.settings.profiles);
  });
  return { state: normalizeState(merged), changed };
}

function mergeByIdentity(target = [], source = [], identityFn) {
  const ids = new Set(target.map(row => row?.id).filter(Boolean));
  const keys = new Set(target.map(identityFn).filter(Boolean));
  let changed = false;
  source.forEach(row => {
    const id = row?.id || "";
    const key = identityFn(row);
    if ((id && ids.has(id)) || (key && keys.has(key))) return;
    target.push(clone(row));
    if (id) ids.add(id);
    if (key) keys.add(key);
    changed = true;
  });
  return changed;
}

function partyMergeKey(party = {}) {
  const gstin = normalizeGstin(party.gstin);
  if (gstin) return `gstin:${gstin}`;
  return `party:${normalizeMergeText(party.name)}:${normalizeMergeText(party.type)}`;
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

function mergeProfileCounters(targetProfiles = [], sourceProfiles = []) {
  sourceProfiles.forEach(source => {
    const target = targetProfiles.find(profile => profile.id === source.id);
    if (!target) return;
    target.nextSaleNo = Math.max(num(target.nextSaleNo), num(source.nextSaleNo));
    target.nextPurchaseNo = Math.max(num(target.nextPurchaseNo), num(source.nextPurchaseNo));
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
  return {
    id: party.id || uid(),
    name: party.name || "",
    type: party.type || "Customer",
    gstin: party.gstin || "",
    phone: party.phone || "",
    email: party.email || "",
    place: party.place || "",
    address: party.address || "",
    aliases: party.aliases || "",
    shippingAddresses: normalizeShippingAddresses(party.shippingAddresses || party.shipToAddresses || [])
  };
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

function normalizeEwayRouteDistances(value = {}) {
  return Object.fromEntries(Object.entries(value || {})
    .map(([key, distance]) => [String(key || "").trim(), Math.max(0, num(distance))])
    .filter(([key, distance]) => key && distance > 0));
}

function normalizeVehicleNumber(value = "") {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function normalizePurchaseEwayDetails(details = {}) {
  return {
    transType: ["1", "2", "3", "4"].includes(String(details.transType || "")) ? String(details.transType) : "1",
    transMode: ["1", "2", "3", "4"].includes(String(details.transMode || "")) ? String(details.transMode) : "1",
    vehicleNo: normalizeVehicleNumber(details.vehicleNo || ""),
    vehicleType: details.vehicleType === "O" ? "O" : "R",
    distanceKm: Math.max(0, num(details.distanceKm)),
    destinationPreset: String(details.destinationPreset || "").trim(),
    dispatchFromAddress: String(details.dispatchFromAddress || "").trim(),
    shipToAddress: String(details.shipToAddress || "").trim(),
    transporterName: String(details.transporterName || "").trim(),
    transporterId: normalizeGstin(details.transporterId || ""),
    transDocNo: String(details.transDocNo || "").trim(),
    transDocDate: String(details.transDocDate || "").trim(),
    fromPincode: String(details.fromPincode || "").trim(),
    toPincode: String(details.toPincode || "").trim(),
    routeKey: String(details.routeKey || "").trim()
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

function mergeTallyBuyerIntoParty(party, buyer) {
  party.type = party.type === "Supplier" ? "Both" : (party.type || "Customer");
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

function normalizeEntryForState(entry, kind, parties = []) {
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
  entry.rateIncludesGst = Boolean(entry.rateIncludesGst);
  if (kind === "sale") normalizeSaleAddressSnapshots(entry, parties);
  if (kind === "purchase") {
    entry.source = entry.source || "manual";
    entry.ewayDetails = normalizePurchaseEwayDetails(entry.ewayDetails || {});
    if (entry.roundOff) entry.total = round2(entry.taxable + entry.gst + entry.roundOff);
  }
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
  return `<span class="${escapeHtml(className)}" title="${escapeHtml(title)}">${firmLogoSvg(logo)}</span>`;
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
  const fontSize = initials.length > 2 ? 13 : 16;
  const base = `
    <rect x="5" y="5" width="54" height="54" rx="15" fill="#ffffff" stroke="#d1d5db" stroke-width="1.5"/>
    <path d="M6 46c15-11 32-14 52-8v21H6z" fill="${logo.primary}" opacity=".09"/>
    <path d="M11 50h42" fill="none" stroke="${logo.primary}" stroke-width="3" stroke-linecap="round"/>`;
  const mark = firmLogoMark(logo);
  const text = `<text x="32" y="38" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="800" fill="${logo.ink}" letter-spacing="0">${initials}</text>`;
  return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">${base}${mark}${text}</svg>`;
}

function firmLogoMark(logo) {
  switch (logo.kind) {
    case "lotus":
      return `
        <path d="M22 18c6 1 9 5 10 11-6-1-10-5-10-11z" fill="${logo.primary}" opacity=".9"/>
        <path d="M42 18c-6 1-9 5-10 11 6-1 10-5 10-11z" fill="${logo.accent}" opacity=".9"/>
        <path d="M32 16c4 4 5 8 0 13-5-5-4-9 0-13z" fill="${logo.primary}" opacity=".75"/>`;
    case "device":
      return `
        <rect x="22" y="13" width="20" height="25" rx="6" fill="none" stroke="${logo.primary}" stroke-width="3"/>
        <path d="M27 18h10M29 34h6" stroke="${logo.accent}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M45 22h6M48 19l3 3-3 3" fill="none" stroke="${logo.accent}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "wave":
      return `
        <path d="M17 23c8-7 22-7 30 0" fill="none" stroke="${logo.primary}" stroke-width="3" stroke-linecap="round"/>
        <path d="M23 28c5-4 13-4 18 0" fill="none" stroke="${logo.accent}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="32" cy="31" r="3" fill="${logo.ink}"/>`;
    case "grid":
      return `
        <rect x="19" y="15" width="6" height="6" rx="1.5" fill="${logo.primary}"/>
        <rect x="29" y="15" width="6" height="6" rx="1.5" fill="${logo.accent}"/>
        <rect x="39" y="15" width="6" height="6" rx="1.5" fill="${logo.primary}"/>
        <rect x="19" y="25" width="6" height="6" rx="1.5" fill="${logo.accent}"/>
        <rect x="29" y="25" width="6" height="6" rx="1.5" fill="${logo.primary}"/>
        <rect x="39" y="25" width="6" height="6" rx="1.5" fill="${logo.accent}"/>`;
    case "node":
      return `
        <path d="M21 27h22M32 17v20M21 27l-5-5M43 27l5-5" fill="none" stroke="${logo.accent}" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="21" cy="27" r="3" fill="${logo.primary}"/>
        <circle cx="43" cy="27" r="3" fill="${logo.primary}"/>
        <circle cx="32" cy="17" r="3" fill="${logo.ink}"/>`;
    case "trade":
      return `
        <path d="M18 24h28v12H18z" fill="none" stroke="${logo.primary}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M23 18h28v12" fill="none" stroke="${logo.accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18 18c6 1 10 4 12 10-7-1-11-4-12-10z" fill="${logo.primary}"/>`;
    case "lens":
      return `
        <circle cx="32" cy="25" r="12" fill="none" stroke="${logo.primary}" stroke-width="3"/>
        <path d="M32 13l6 11M44 23l-12 2M39 36l-7-11M24 36l8-11M20 23l12 2M25 14l7 11" fill="none" stroke="${logo.accent}" stroke-width="2.3" stroke-linecap="round"/>
        <circle cx="32" cy="25" r="3.5" fill="${logo.ink}"/>`;
    case "apex":
    default:
      return `
        <path d="M19 30l13-17 13 17" fill="none" stroke="${logo.primary}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M25 30l7-9 7 9" fill="none" stroke="${logo.accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
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
  return kind === "sale" ? state.sales : state.purchases;
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

function selectedEntryMonth(kind) {
  return entryMonthFilters[kind] || defaultEntryMonth(kind);
}

function monthFilteredEntries(kind) {
  const monthKey = selectedEntryMonth(kind);
  if (monthKey === ALL_MONTHS_KEY) return activeEntries(kind);
  return activeEntries(kind).filter(entry => entryMonthKey(entry) === monthKey);
}

function entryMonthOptions(kind) {
  const selected = selectedEntryMonth(kind);
  return [...new Set([ALL_MONTHS_KEY, selected, currentMonthKey(), ...activeEntries(kind).map(entryMonthKey)])]
    .filter(Boolean)
    .sort((a, b) => {
      if (a === ALL_MONTHS_KEY) return -1;
      if (b === ALL_MONTHS_KEY) return 1;
      return b.localeCompare(a);
    });
}

function renderEntryMonthFilter(kind) {
  const select = kind === "sale" ? $("#salesMonthFilter") : $("#purchaseMonthFilter");
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
  return activeEntries(kind).filter(entry => kind !== "sale" || !isCancelledEntry(entry));
}

function entryPrefix(kind) {
  return kind === "sale" ? "SALE" : "PUR";
}

function nextEntryNumber(kind, profileId = state.settings.activeProfileId) {
  if (kind === "sale") return nextSaleInvoiceNumber(profileId);
  const key = kind === "sale" ? "nextSaleNo" : "nextPurchaseNo";
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

function lineTaxableAmount(line = {}) {
  return round2(num(line.qty) * num(line.rate));
}

function lineGrossAmount(line = {}) {
  const grossRate = num(line.grossRate);
  if (grossRate && grossRate >= num(line.rate)) return round2(num(line.qty) * grossRate);
  const taxable = lineTaxableAmount(line);
  return round2(taxable + lineGstAmount(line));
}

function lineGstAmount(line = {}) {
  const taxable = lineTaxableAmount(line);
  const grossRate = num(line.grossRate);
  if (grossRate && grossRate >= num(line.rate)) return round2((num(line.qty) * grossRate) - taxable);
  return round2(taxable * num(line.gstRate) / 100);
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
  const sellerGstin = kind === "purchase" ? party?.gstin : profile?.gstin;
  const buyerGstin = kind === "purchase" ? profile?.gstin : party?.gstin;
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
  state.purchases.filter(entry => !profileId || entry.profileId === profileId).forEach(entry => entry.lines.forEach(line => {
    if (line.itemId === itemId) stock += num(line.qty);
  }));
  state.sales.filter(entry => (!profileId || entry.profileId === profileId) && !isCancelledEntry(entry)).forEach(entry => entry.lines.forEach(line => {
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
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
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
  $("#dashboardPurchaseEntryBtn").addEventListener("click", () => openEntry("purchase"));
  $("#newSaleBtn").addEventListener("click", () => openEntry("sale"));
  $("#salesMonthFilter").addEventListener("change", event => {
    entryMonthFilters.sale = event.target.value;
    renderEntries("sale");
  });
  bindIf("#chatBillBtn", "click", openChatBillDialog);
  bindIf("#newChatSaleBtn", "click", openChatBillDialog);
  $("#newPurchaseBtn").addEventListener("click", () => openEntry("purchase"));
  $("#purchaseMonthFilter").addEventListener("change", event => {
    entryMonthFilters.purchase = event.target.value;
    selectedPurchaseIds.clear();
    renderEntries("purchase");
  });
  $("#purchaseInvoiceInput").addEventListener("change", handlePurchaseInvoiceUpload);
  $("#ewayJsonBtn").addEventListener("click", exportSelectedEwayJson);
  $("#selectAllPurchases").addEventListener("change", toggleAllPurchases);
  $("#newItemBtn").addEventListener("click", () => openItem());
  $("#newPartyBtn").addEventListener("click", () => openParty(null, { type: "Customer", title: "New Party", saveLabel: "Save Party" }));
  $("#addLineBtn").addEventListener("click", () => addLineRow());
  $("#entryAddBuyerBtn").addEventListener("click", openBuyerFromEntry);
  $("#entryForm").addEventListener("submit", saveEntry);
  $("#entryForm").elements.shipToSame.addEventListener("change", updateSalesAddressPanel);
  $("#entryForm").elements.shipToAddressId.addEventListener("change", updateSalesAddressPanel);
  $("#entryForm").elements.rateIncludesGst.addEventListener("change", updateEntryTotals);
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
  $$(".segmented button").forEach(button => button.addEventListener("click", () => {
    activeReport = button.dataset.report;
    $$(".segmented button").forEach(item => item.classList.toggle("active", item === button));
    renderReport();
  }));
  window.addEventListener("popstate", closeChatBillOnBack);
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
    parties: "Party Master",
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
  renderEntries("purchase");
  renderItems();
  renderParties();
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
  state.settings.activeProfileId = profileId;
  entryMonthFilters = {
    sale: defaultEntryMonth("sale", profileId),
    purchase: defaultEntryMonth("purchase", profileId)
  };
  selectedPurchaseIds.clear();
  saveState();
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
  const { error } = await cloudClient.auth.signInWithPassword({ email, password });
  button.disabled = false;
  if (error) return toast(error.message);
  $("#cloudDialog")?.close();
  $("#appLoginPassword").value = "";
  $("#cloudPassword").value = "";
  toast("Logged in");
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
  cloudWorkspaces = data || [];
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
  const savedCounts = cloudWorkspaceCounts(savedWorkspace);
  const bestCounts = cloudWorkspaceCounts(bestWorkspace);
  const savedHasEntries = savedCounts.sales > 0 || savedCounts.purchases > 0;
  const bestHasEntries = bestCounts.sales > 0 || bestCounts.purchases > 0;
  return !savedHasEntries && bestHasEntries ? bestWorkspace : savedWorkspace;
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
  return (counts.purchases * 1000) + (counts.sales * 100) + (counts.parties * 10) + counts.items;
}

function cloudWorkspaceCounts(workspace = {}) {
  const data = workspace?.data || {};
  return {
    sales: Array.isArray(data.sales) ? data.sales.length : 0,
    purchases: Array.isArray(data.purchases) ? data.purchases.length : 0,
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

async function createCloudWorkspace(name) {
  if (!cloudClient || !cloudSession) return toast("Sign in to create a workspace");
  const { data, error } = await cloudClient
    .from(CLOUD_WORKSPACE_TABLE)
    .insert({
      owner_id: cloudSession.user.id,
      name,
      member_emails: [],
      data: clone(state)
    })
    .select("id,name,owner_id,member_emails,data,updated_at,created_at")
    .single();
  if (error) return toast(error.message);
  cloudWorkspaces = [data, ...cloudWorkspaces.filter(row => row.id !== data.id)];
  applyCloudWorkspace(data, "Cloud workspace created");
}

function applyCloudWorkspace(workspace, message) {
  const localBeforeCloud = normalizeState(clone(state || defaultState));
  const previousWorkspaceId = cloudWorkspace?.id || localStorage.getItem(CLOUD_SELECTED_WORKSPACE_KEY) || "";
  const canUseCurrentLocal = !previousWorkspaceId || previousWorkspaceId === workspace.id;
  const localBackup = readLocalStateBackup(workspace.id);
  if (canUseCurrentLocal) rememberLocalStateBackup(localBeforeCloud, workspace.id);
  const merged = mergeCloudStateWithLocalCandidates(workspace.data || defaultState, [localBackup, canUseCurrentLocal ? localBeforeCloud : null]);
  cloudWorkspace = workspace;
  localStorage.setItem(CLOUD_SELECTED_WORKSPACE_KEY, workspace.id);
  state = merged.state;
  saveState({ skipCloud: true, skipLocalBackup: true });
  renderAll();
  if (merged.changed) syncCloudNow(false);
  if (message) toast(merged.changed ? `${message}. Local saved entries kept.` : message);
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
  const { data, error } = await cloudClient
    .from(CLOUD_WORKSPACE_TABLE)
    .update({
      data: clone(state),
      updated_at: new Date().toISOString()
    })
    .eq("id", cloudWorkspace.id)
    .select("id,name,owner_id,member_emails,data,updated_at,created_at")
    .single();
  if (error) {
    if (showToast) toast(error.message);
    else toast("Cloud sync failed");
    return false;
  }
  cloudWorkspace = data;
  cloudWorkspaces = cloudWorkspaces.map(row => row.id === data.id ? data : row);
  renderCloudUi();
  if (showToast) toast("Cloud synced");
  return true;
}

function renderDashboard() {
  if (window.lucide) lucide.createIcons();
}

function renderEntries(kind) {
  renderEntryMonthFilter(kind);
  const entries = monthFilteredEntries(kind);
  const allEntries = activeEntries(kind);
  if (kind === "purchase") {
    const visibleIds = new Set(entries.map(entry => entry.id));
    selectedPurchaseIds = new Set([...selectedPurchaseIds].filter(id => visibleIds.has(id)));
  }
  const rows = entries.sort((a, b) => b.date.localeCompare(a.date)).map(entry => {
    const cancelled = isCancelledEntry(entry);
    const statusLabel = cancelled ? "Cancelled" : (entry.status || "-");
    const statusClass = cancelled ? "danger" : (entry.status === "Unpaid" ? "warn" : "");
    const purchaseSelect = kind === "purchase" ? `
      <td><input class="purchase-select" type="checkbox" aria-label="Select ${escapeHtml(entry.number)}" data-purchase-id="${entry.id}" ${selectedPurchaseIds.has(entry.id) ? "checked" : ""}></td>
    ` : "";
    const statusCell = kind === "purchase"
      ? `<td>${ewayReviewBadge(entry)}</td>`
      : `<td><span class="badge ${statusClass}">${escapeHtml(statusLabel)}</span></td>`;
    return `
    <tr class="${cancelled ? "cancelled-row" : ""}">
      ${purchaseSelect}
      <td>${entry.date}</td>
      <td>${escapeHtml(entry.number)}</td>
      <td>${escapeHtml(profileName(entry.profileId))}</td>
      <td>${escapeHtml(partyName(entry.partyId))}</td>
      ${statusCell}
      <td class="num">${money(entry.taxable)}</td>
      <td class="num">${money(entry.gst)}</td>
      <td class="num">${money(entry.total)}</td>
      <td>
        <div class="row-actions">
          ${kind === "sale" ? `<button class="mini-btn" title="Invoice" onclick="showInvoice('${entry.id}', '${kind}')"><i data-lucide="file-text"></i></button>` : ""}
          ${cancelled ? "" : `<button class="mini-btn" title="Edit" onclick="openEntry('${kind}', '${entry.id}')"><i data-lucide="pencil"></i></button>`}
          ${kind === "sale"
            ? (cancelled ? "" : `<button class="mini-btn danger-btn" title="Cancel Bill" onclick="cancelEntry('${kind}', '${entry.id}')"><i data-lucide="ban"></i></button>`)
            : `<button class="mini-btn" title="Delete" onclick="deleteEntry('${kind}', '${entry.id}')"><i data-lucide="trash-2"></i></button>`}
        </div>
      </td>
    </tr>
  `;
  }).join("");
  const emptyColspan = kind === "sale" ? 9 : 10;
  const emptyLabel = emptyEntriesLabel(kind, allEntries.length);
  const filterNote = entryMonthFilterNote(kind, entries.length, allEntries.length, emptyColspan);
  $(kind === "sale" ? "#salesRows" : "#purchaseRows").innerHTML = (rows || emptyRow(emptyColspan, emptyLabel)) + filterNote;
  if (kind === "purchase") bindPurchaseSelectors();
}

function emptyEntriesLabel(kind, activeCount = activeEntries(kind).length) {
  const label = kind === "sale" ? "sales entries" : "purchase entries";
  const selectedMonthLabel = monthLabel(selectedEntryMonth(kind));
  const totalAcrossCompanies = entryList(kind).length;
  if (!activeCount && totalAcrossCompanies > 0) {
    return `No ${label} under ${profileName(activeProfileId())}. ${totalAcrossCompanies} ${label} are saved under other GST companies. Select the correct GST company.`;
  }
  if (kind === "purchase" && !totalAcrossCompanies && cloudWorkspaces.length > 1) {
    const bestWorkspace = bestCloudWorkspace(cloudWorkspaces);
    const bestCounts = cloudWorkspaceCounts(bestWorkspace);
    if (bestWorkspace?.id && bestWorkspace.id !== cloudWorkspace?.id && bestCounts.purchases > 0) {
      return `No purchases in ${cloudWorkspace?.name || "this workspace"}. ${bestWorkspace.name || "another workspace"} has ${bestCounts.purchases} purchases. Open Cloud and select that workspace.`;
    }
  }
  return kind === "sale"
    ? `No sales entries for ${selectedMonthLabel}`
    : `No purchase entries for ${selectedMonthLabel}`;
}

function entryMonthFilterNote(kind, visibleCount, totalCount, colspan) {
  if (selectedEntryMonth(kind) === ALL_MONTHS_KEY || totalCount <= visibleCount) return "";
  const label = kind === "sale" ? "sales" : "purchases";
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
  const ids = monthFilteredEntries("purchase").map(entry => entry.id);
  const selectedCount = ids.filter(id => selectedPurchaseIds.has(id)).length;
  control.checked = ids.length > 0 && selectedCount === ids.length;
  control.indeterminate = selectedCount > 0 && selectedCount < ids.length;
}

function toggleAllPurchases(event) {
  selectedPurchaseIds = event.target.checked ? new Set(monthFilteredEntries("purchase").map(entry => entry.id)) : new Set();
  renderEntries("purchase");
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
  $("#partyRows").innerHTML = partyMasterRows().map(party => `
    <tr>
      <td>${escapeHtml(party.name)}</td>
      <td>${escapeHtml(party.type)}</td>
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
  `).join("") || emptyRow(9, "No parties added");
}

function partyMasterRows() {
  return [...state.parties].sort((a, b) => {
    const typeRank = partyTypeRank(a.type) - partyTypeRank(b.type);
    if (typeRank) return typeRank;
    return String(a.name || "").localeCompare(String(b.name || ""));
  });
}

function partyTypeRank(type) {
  if (type === "Customer") return 0;
  if (type === "Both") return 1;
  return 2;
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
  ["businessName", "legalName", "gstin", "phone", "email", "address", "state", "nextSaleNo", "nextPurchaseNo"].forEach(key => {
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

function partyOptions(kind, selected = "") {
  const wanted = kind === "sale" ? ["Customer", "Both"] : ["Supplier", "Both"];
  const choices = state.parties
    .filter(party => wanted.includes(party.type))
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
  if (!choices.length) {
    return `<option value="">${kind === "sale" ? "Add buyer first" : "Add supplier first"}</option>`;
  }
  return choices.map(party => `<option value="${party.id}" ${party.id === selected ? "selected" : ""}>${escapeHtml(party.name)}</option>`).join("");
}

function itemOptions(selected = "") {
  if (!state.items.length) return `<option value="">Add item first</option>`;
  return state.items.map(item => `<option value="${item.id}" ${item.id === selected ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("");
}

function openEntry(kind, id = null, draft = null) {
  entryMode = kind;
  editingEntryId = id;
  const entry = id ? entryList(kind).find(row => row.id === id) : null;
  const source = entry || draft;
  entryDraftMeta = {
    attachments: clone(source?.attachments || []),
    reviewStatus: source?.reviewStatus || "Ready",
    reviewMessages: clone(source?.reviewMessages || []),
    source: source?.source || (draft ? "imported" : "manual"),
    extractedTaxes: clone(source?.extractedTaxes || null),
    sellerGstin: source?.sellerGstin || "",
    buyerGstin: source?.buyerGstin || "",
    roundOff: num(source?.roundOff),
    purchaseReviewAccepted: Boolean(id && kind === "purchase"),
    purchaseReviewSignature: "",
    preserveInitialReviewAcceptance: Boolean(id && kind === "purchase")
  };
  const form = $("#entryForm");
  form.reset();
  $("#entryKindLabel").textContent = kind === "sale" ? "Sales Bill" : "Purchase Entry";
  $("#entryDialogTitle").textContent = id
    ? (kind === "purchase" ? "Edit Purchase" : "Edit Entry")
    : (kind === "sale" ? "New Sales Invoice" : "Purchase Review");
  $("#entryDialog").classList.toggle("sale-entry-dialog", kind === "sale");
  $("#entryDialog").classList.toggle("purchase-entry-dialog", kind === "purchase");
  $("#entryMetaLabel").textContent = kind === "sale" ? "Invoice Details" : "Editable Details";
  $("#entryMetaTitle").textContent = kind === "sale" ? "Check the basic details" : "Correct supplier, buyer GST, invoice number and date";
  $("#entryProfileLabelText").textContent = kind === "sale" ? "Business GST" : "Buyer GST";
  $("#lineEditorTitle").textContent = kind === "sale" ? "Items" : "Items from invoice";
  $("#lineEditorHint").textContent = kind === "sale" ? "" : "Edit item, quantity, rate, GST or IMEI before saving.";
  $("#saveEntryBtn span").textContent = kind === "sale" ? "Save Entry" : "Save Purchase";
  form.elements.date.value = source?.date || today();
  form.elements.date.oninput = updateEntryTotals;
  form.elements.number.value = kind === "sale"
    ? saleInvoiceNumberForDialog(source, source?.profileId || state.settings.activeProfileId)
    : (source?.number || nextEntryNumber(kind, source?.profileId || state.settings.activeProfileId));
  form.elements.number.readOnly = kind === "sale";
  form.elements.number.oninput = updateEntryTotals;
  form.elements.profileId.innerHTML = profileOptions(source?.profileId || state.settings.activeProfileId);
  form.elements.profileId.disabled = true;
  form.elements.profileId.onchange = () => {
    if (!editingEntryId) form.elements.number.value = nextEntryNumber(kind, form.elements.profileId.value);
    updateEntryTotals();
  };
  form.elements.status.value = source?.status || "Paid";
  $("#entryStatusLabel").hidden = true;
  $("#entryNotesLabel").hidden = true;
  form.elements.notes.value = kind === "sale" ? "" : (source?.notes || "");
  $("#entryPartyLabelText").textContent = kind === "sale" ? "Buyer" : "Supplier";
  $("#entryAddBuyerBtn").hidden = kind !== "sale";
  form.elements.partyId.innerHTML = partyOptions(kind, source?.partyId);
  form.elements.partyId.onchange = () => {
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
  form.elements.rateIncludesGst.checked = source ? Boolean(source.rateIncludesGst) : true;
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
  form.elements.ewayTransType.value = details.transType || "1";
  form.elements.ewayTransMode.value = details.transMode || "1";
  form.elements.ewayVehicleNoEntry.value = details.vehicleNo || "";
  form.elements.ewaySupplierPincodeEntry.value = details.fromPincode || "";
  form.elements.ewayDestinationPreset.innerHTML = ewayDestinationPresetOptions(details.destinationPreset);
  form.elements.ewayDestinationPreset.value = details.destinationPreset || (details.shipToAddress ? "custom" : "buyer");
  form.elements.ewayDispatchFromAddress.value = details.dispatchFromAddress || "";
  form.elements.ewayShipToAddress.value = details.shipToAddress || "";
  form.elements.ewayDistanceKmEntry.value = details.distanceKm || "";
  form.elements.ewayTransporterName.value = details.transporterName || "";
  form.elements.ewayTransporterId.value = details.transporterId || "";
  form.elements.ewayTransDocNo.value = details.transDocNo || "";
  form.elements.ewayTransDocDate.value = details.transDocDate || "";
  form.elements.ewayDistanceKmEntry.dataset.autoRouteKey = "";
  ["ewayTransType", "ewayTransMode", "ewayVehicleNoEntry", "ewaySupplierPincodeEntry", "ewayDestinationPreset", "ewayDispatchFromAddress", "ewayShipToAddress", "ewayTransporterName", "ewayTransporterId", "ewayTransDocNo", "ewayTransDocDate"].forEach(name => {
    form.elements[name].oninput = updatePurchaseEwayPanel;
    form.elements[name].onchange = updatePurchaseEwayPanel;
  });
  form.elements.ewayDistanceKmEntry.oninput = () => {
    form.elements.ewayDistanceKmEntry.dataset.autoRouteKey = "";
    updatePurchaseEwayPanel();
  };
  form.elements.ewayDistanceKmEntry.onchange = updatePurchaseEwayPanel;
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
  if (ewayUsesDispatchFrom(transType) && !form.elements.ewayDispatchFromAddress.value.trim()) {
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
  $("#ewayDistanceHint").textContent = ewayDistanceHint(refreshedRoute, form.elements.ewayDistanceKmEntry.value);
  updatePurchaseEwayRequiredHighlights(refreshedRoute, form);
}

function applyEwayDistanceSuggestion(route, form) {
  const distanceInput = form.elements.ewayDistanceKmEntry;
  const routeKey = ewayDistanceEstimateRouteKey(route);
  if (num(distanceInput.value) && distanceInput.dataset.autoRouteKey && distanceInput.dataset.autoRouteKey !== routeKey) {
    distanceInput.value = "";
    distanceInput.dataset.autoRouteKey = "";
  }
  if (num(distanceInput.value)) {
    clearTimeout(ewayDistanceEstimateTimer);
    return;
  }
  const samePinDistance = samePincodeDistanceKm(route);
  if (samePinDistance) {
    clearTimeout(ewayDistanceEstimateTimer);
    distanceInput.value = samePinDistance;
    distanceInput.dataset.autoRouteKey = routeKey;
    return;
  }
  const calculatedDistance = calculateEwayDistance(route.fromPincode, route.toPincode);
  if (calculatedDistance) {
    clearTimeout(ewayDistanceEstimateTimer);
    distanceInput.value = calculatedDistance;
    distanceInput.dataset.autoRouteKey = routeKey;
    return;
  }
  if (route.savedDistance) {
    clearTimeout(ewayDistanceEstimateTimer);
    distanceInput.value = route.savedDistance;
    distanceInput.dataset.autoRouteKey = routeKey;
    return;
  }
  scheduleEwayDistanceEstimate(route);
}

function samePincodeDistanceKm(route) {
  return route.fromPincode && route.toPincode && String(route.fromPincode) === String(route.toPincode) ? 2 : 0;
}

function calculateEwayDistance(fromPincode, toPincode) {
  const fromPin = Number(String(fromPincode || "").replace(/\D/g, ""));
  const toPin = Number(String(toPincode || "").replace(/\D/g, ""));
  if (!fromPin || !toPin) return 0;
  if (fromPin === toPin) return 2;
  const special = EWAY_SPECIAL_DISTANCE_KM[`${fromPin}-${toPin}`];
  if (special) return special;
  const coordA = EWAY_PINCODE_COORDS[fromPin];
  const coordB = EWAY_PINCODE_COORDS[toPin];
  if (coordA && coordB) return Math.round(haversineKm(coordA, coordB) * 1.18);
  return estimateDistanceFromPinCodes(fromPin, toPin);
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

function purchaseEwayRouteFromValues(profile = {}, supplier = {}, details = {}) {
  const transType = String(details.transType || "1");
  const destinationPreset = String(details.destinationPreset || "buyer");
  const selectedPreset = ewayUsesShipTo(transType) ? ewayPresetById(destinationPreset) : null;
  const defaultFromAddress = supplier.address || supplier.place || "";
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
  const defaultFromPincode = extractPincode(fromAddress);
  const fromPincode = normalizePincode(details.fromPincode) || defaultFromPincode;
  const billToPincode = extractPincode(billToAddress);
  const toPincode = selectedPreset ? String(selectedPreset.toPincode) : extractPincode(toAddress);
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
  return fromPincode && toPincode ? `${fromPincode}-${toPincode}` : "";
}

function savedEwayRouteDistance(routeKey) {
  return routeKey ? num(state.settings.ewayRouteDistances?.[routeKey]) : 0;
}

function ewayAddressPreview(title, name, address, pincode) {
  return `<span>${escapeHtml(title)}</span>
    <strong>${escapeHtml(name || "-")}</strong>
    <p>${escapeHtml(address || "-")}</p>
    <small>PIN: ${escapeHtml(pincode || "-")}</small>`;
}

function ewayDistanceHint(route, currentDistance) {
  if (samePincodeDistanceKm(route) && num(currentDistance) === 2) return "Same seller and buyer PIN, distance set to 2 KM.";
  if (num(currentDistance)) return route.routeKey ? `Distance saved for route ${route.routeKey}.` : "Distance entered.";
  if (route.savedDistance) return `Auto-filled saved route distance ${route.savedDistance} KM.`;
  if (ewayDistanceEstimateKey === ewayDistanceEstimateRouteKey(route)) return "Estimating distance with ChatGPT...";
  if (!route.fromPincode || !route.toPincode) return "Add supplier and buyer pincodes to remember route distance.";
  return "ChatGPT will estimate distance when Cloud is connected.";
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
  if (!key.replace(/\|/g, "").trim() || !route.fromAddress || !route.toAddress) return;
  ewayDistanceEstimateKey = key;
  clearTimeout(ewayDistanceEstimateTimer);
  ewayDistanceEstimateTimer = setTimeout(() => estimateEwayDistanceWithCloud(route, key), 700);
}

async function estimateEwayDistanceWithCloud(route, key) {
  const form = $("#entryForm");
  if (!form || entryMode !== "purchase" || num(form.elements.ewayDistanceKmEntry.value)) return;
  if (!cloudConfigured() || !cloudClient || !cloudSession) {
    if (ewayDistanceEstimateKey === key) $("#ewayDistanceHint").textContent = "Login to Cloud to estimate distance with ChatGPT.";
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
    form.elements.ewayDistanceKmEntry.value = distanceKm;
    form.elements.ewayDistanceKmEntry.dataset.autoRouteKey = key;
    $("#ewayDistanceHint").textContent = `ChatGPT estimated ${distanceKm} KM.`;
  } catch (error) {
    if (ewayDistanceEstimateKey === key) $("#ewayDistanceHint").textContent = "Distance estimate failed. Enter KM manually.";
    console.warn("E-way distance estimate unavailable", error);
  }
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
  return normalizePurchaseEwayDetails({
    transType,
    transMode,
    vehicleNo: form.elements.ewayVehicleNoEntry.value,
    vehicleType: "R",
    distanceKm: num(form.elements.ewayDistanceKmEntry.value) || route.savedDistance || calculateEwayDistance(route.fromPincode, route.toPincode),
    destinationPreset: form.elements.ewayDestinationPreset.value,
    dispatchFromAddress: form.elements.ewayDispatchFromAddress.value,
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

function rememberPurchaseEwayRoute(details = {}) {
  const normalized = normalizePurchaseEwayDetails(details);
  if (!normalized.routeKey || !normalized.distanceKm) return;
  state.settings.ewayRouteDistances = {
    ...(state.settings.ewayRouteDistances || {}),
    [normalized.routeKey]: normalized.distanceKm
  };
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
      ${purchaseReviewCard("Supplier", supplier.name || "-", `GSTIN: ${supplier.gstin || source.sellerGstin || "-"}`, supplier.address ? `Address: ${supplier.address}` : `Place: ${supplier.place || "-"}`)}
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
      <span>Round Off</span><strong>${money(roundOff)}</strong>
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
  return {
    id: editingEntryId || "",
    profileId: profile.id,
    date: form?.elements?.date?.value || today(),
    number: form?.elements?.number?.value?.trim() || "",
    partyId: form?.elements?.partyId?.value || "",
    lines,
    attachments: clone(entryDraftMeta.attachments || []),
    extractedTaxes: clone(entryDraftMeta.extractedTaxes || null),
    roundOff: num(entryDraftMeta.roundOff),
    sellerGstin: normalizeGstin(party.gstin || entryDraftMeta.sellerGstin),
    buyerGstin: normalizeGstin(profile.gstin || entryDraftMeta.buyerGstin),
    reviewMessages: clone(entryDraftMeta.reviewMessages || []),
    source: entryDraftMeta.source || "manual"
  };
}

function purchaseReviewCard(title, main, detail, extra) {
  return `<div class="purchase-review-card">
    <span>${escapeHtml(title)}</span>
    <strong>${escapeHtml(main || "-")}</strong>
    ${detail ? `<p>${escapeHtml(detail)}</p>` : ""}
    ${extra ? `<p>${escapeHtml(extra)}</p>` : ""}
  </div>`;
}

function purchaseRoundOffForSource(source = {}, calculated = {}) {
  const extractedTotal = num(source?.extractedTaxes?.total);
  if (extractedTotal) {
    const adjustment = round2(extractedTotal - num(calculated.total));
    return Math.abs(adjustment) <= 1 && Math.abs(adjustment) >= 0.01 ? adjustment : 0;
  }
  const explicitRoundOff = num(source?.roundOff);
  if (Math.abs(explicitRoundOff) >= 0.01) return round2(explicitRoundOff);
  const roundedAdjustment = round2(Math.round(num(calculated.total)) - num(calculated.total));
  return Math.abs(roundedAdjustment) >= 0.01 ? roundedAdjustment : 0;
}

function purchaseTotalWithRoundOff(calculated = {}, roundOff = 0) {
  return round2(num(calculated.total) + num(roundOff));
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
      <td data-label="Rate" class="num">${money(line.rate)}</td>
      <td data-label="GST" class="num">${num(line.gstRate)}%</td>
      <td data-label="Taxable" class="num">${money(lineTaxableAmount(line))}</td>
    </tr>`;
  }).join("");
  return `<div class="purchase-review-items">
    <span>Items detected from invoice</span>
    <table>
      <thead><tr><th>Item</th><th>HSN/SAC</th><th class="num">Qty</th><th class="num">Rate</th><th class="num">GST</th><th class="num">Taxable</th></tr></thead>
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
  return {
    itemId: item?.id || "",
    qty: 1,
    rate: kind === "sale" ? num(item?.saleRate) : num(item?.purchaseRate),
    gstRate: num(item?.gstRate),
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

function salesRatesIncludeGst() {
  return entryMode === "sale" && Boolean($("#entryForm")?.elements?.rateIncludesGst?.checked);
}

function lineInputRate(line = {}) {
  if (entryMode === "sale" && salesRatesIncludeGst() && num(line.grossRate)) return num(line.grossRate);
  return num(line.rate);
}

function lineInputHsn(line = {}) {
  const item = state.items.find(row => row.id === line.itemId) || {};
  return String(line.hsn || item.hsn || "").trim();
}

function normalizeLineRateForEntry(line = {}) {
  const rawRate = num(line.rate);
  if (entryMode === "sale" && salesRatesIncludeGst()) {
    return {
      ...line,
      grossRate: rawRate,
      rate: taxableRateFromInclusive(rawRate, line.gstRate)
    };
  }
  if (entryMode === "sale") {
    return {
      ...line,
      grossRate: rawRate
    };
  }
  return line;
}

function addLineRow(line = blankLine(entryMode)) {
  const row = document.createElement("div");
  row.className = "line-row";
  row.dataset.grossRate = num(line.grossRate) ? String(num(line.grossRate)) : "";
  row.dataset.taxableRate = num(line.rate) ? String(num(line.rate)) : "";
  row.innerHTML = `
    <label>Item<select class="line-item">${itemOptions(line.itemId)}</select></label>
    <label class="line-hsn-field">HSN/SAC<input class="line-hsn" inputmode="numeric" maxlength="8" value="${escapeHtml(lineInputHsn(line))}" placeholder="85171300"></label>
    <label>Qty<input class="line-qty" type="number" min="0" step="0.01" value="${num(line.qty)}"></label>
    <label>Rate<input class="line-rate" type="number" min="0" step="0.01" value="${lineInputRate(line)}"></label>
    <label>GST %<input class="line-gst" type="number" min="0" step="0.01" value="${num(line.gstRate)}"></label>
    <label>Amount<input class="line-amount" disabled></label>
    <button type="button" class="mini-btn" title="Remove"><i data-lucide="x"></i></button>
    <label class="line-imei-field">IMEI numbers<textarea class="line-imei" rows="2" placeholder="Optional: paste IMEI numbers">${escapeHtml(line.imeiNumbers || "")}</textarea></label>
  `;
  row.querySelector(".line-item").addEventListener("change", event => {
    const item = state.items.find(candidate => candidate.id === event.target.value);
    row.dataset.grossRate = "";
    row.dataset.taxableRate = "";
    row.querySelector(".line-hsn").value = String(item?.hsn || "");
    row.querySelector(".line-rate").value = entryMode === "sale" ? num(item?.saleRate) : num(item?.purchaseRate);
    row.querySelector(".line-gst").value = num(item?.gstRate);
    updateEntryTotals();
  });
  row.querySelector(".line-rate").addEventListener("input", () => {
    if (row.dataset.taxableRate && !amountsClose(row.querySelector(".line-rate").value, row.dataset.taxableRate, 0.001)) {
      row.dataset.grossRate = "";
      row.dataset.taxableRate = "";
    }
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
  const lines = $$(".line-row").map(row => ({
    itemId: row.querySelector(".line-item").value,
    hsn: normalizeLineHsn(row.querySelector(".line-hsn")?.value || ""),
    qty: num(row.querySelector(".line-qty").value),
    rate: num(row.querySelector(".line-rate").value),
    grossRate: purchaseGrossRateFromRow(row),
    gstRate: num(row.querySelector(".line-gst").value),
    imeiNumbers: normalizeImeiNumbers(row.querySelector(".line-imei")?.value || "")
  })).filter(line => line.itemId && line.qty > 0);
  return normalizeRates ? lines.map(normalizeLineRateForEntry) : lines;
}

function normalizeLineHsn(value) {
  return String(value || "").toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 8);
}

function lineHsn(line = {}, item = null) {
  const sourceItem = item || state.items.find(row => row.id === line.itemId) || {};
  return normalizeLineHsn(line.hsn || sourceItem.hsn || "");
}

function applyLineHsnToItems(lines = []) {
  lines.forEach(line => {
    const hsn = normalizeLineHsn(line.hsn);
    if (!hsn) return;
    const item = state.items.find(row => row.id === line.itemId);
    if (item && normalizeLineHsn(item.hsn) !== hsn) item.hsn = hsn;
  });
}

function purchaseGrossRateFromRow(row) {
  if (entryMode !== "purchase") return 0;
  const grossRate = num(row.dataset.grossRate);
  if (!grossRate) return 0;
  const taxableRate = num(row.dataset.taxableRate);
  const currentRate = num(row.querySelector(".line-rate").value);
  return taxableRate && amountsClose(currentRate, taxableRate, 0.001) ? grossRate : 0;
}

function updateEntryTotals() {
  const includeGst = salesRatesIncludeGst();
  $$(".line-row").forEach(row => {
    const qty = num(row.querySelector(".line-qty").value);
    const rawRate = num(row.querySelector(".line-rate").value);
    const gstRate = num(row.querySelector(".line-gst").value);
    const taxableRate = includeGst ? taxableRateFromInclusive(rawRate, gstRate) : rawRate;
    const taxable = qty * taxableRate;
    const grossRate = purchaseGrossRateFromRow(row);
    const amount = grossRate ? qty * grossRate : taxable + (taxable * gstRate / 100);
    row.querySelector(".line-amount").value = money(amount);
  });
  const calculated = totals(collectLines());
  const purchaseSource = entryMode === "purchase" ? currentPurchaseReviewSource(collectLines()) : null;
  const purchaseRoundOff = entryMode === "purchase" ? purchaseRoundOffForSource(purchaseSource, calculated) : 0;
  const payableTotal = entryMode === "purchase" ? purchaseTotalWithRoundOff(calculated, purchaseRoundOff) : calculated.total;
  $("#entryTaxable").textContent = money(calculated.taxable);
  $("#entryCgst").textContent = money(calculated.cgst);
  $("#entrySgst").textContent = money(calculated.sgst);
  $("#entryIgst").textContent = money(calculated.igst);
  $("#entryGst").textContent = money(calculated.gst);
  $("#entryRoundOffBlock").hidden = entryMode !== "purchase";
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
    setRequiredAttention(rateInput, num(rateInput?.value) <= 0, "Rate required");
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
  const entry = {
    id: editingEntryId || uid(),
    date: form.elements.date.value,
    number: entryNumber,
    profileId: form.elements.profileId.value,
    partyId: form.elements.partyId.value,
    status: form.elements.status.value,
    notes: entryMode === "sale" ? "" : form.elements.notes.value.trim(),
    lines,
    ...entryTotals,
    attachments: clone(entryDraftMeta.attachments || []),
    extractedTaxes: clone(entryDraftMeta.extractedTaxes || null),
    source: entryDraftMeta.source || "manual",
    rateIncludesGst: entryMode === "sale" ? salesRatesIncludeGst() : false,
    sellerGstin: normalizeGstin(entryMode === "purchase" ? (party?.gstin || entryDraftMeta.sellerGstin) : profile?.gstin),
    buyerGstin: normalizeGstin(entryMode === "purchase" ? profile?.gstin : (party?.gstin || entryDraftMeta.buyerGstin)),
    billToSnapshot: saleAddress?.billToSnapshot || null,
    shipToSnapshot: saleAddress?.shipToSnapshot || null,
    shipToSameAsBillTo: saleAddress?.shipToSameAsBillTo ?? true,
    shipToAddressId: saleAddress?.shipToAddressId || "",
    ewayDetails: purchaseEwayDetails,
    reviewMessages,
    reviewStatus: reviewMessages.length ? "Needs Review" : "Ready"
  };
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
  if (entryMode === "purchase") rememberPurchaseEwayRoute(entry.ewayDetails);
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
  } else if (index < 0) {
    savedProfile.nextPurchaseNo = num(savedProfile.nextPurchaseNo) + 1;
  }
  entryMonthFilters[entryMode] = entryMonthKey(entry);
  saveState();
  $("#entryDialog").close();
  renderAll();
  if (entryMode === "purchase") {
    const synced = await syncCloudNow(false);
    toast(synced ? "Purchase saved and synced" : "Purchase saved locally. Cloud sync failed");
    processQueuedPurchaseInvoiceUpload();
  } else {
    toast("Sale saved");
  }
}

function deleteEntry(kind, id) {
  if (kind === "sale") {
    cancelEntry(kind, id);
    return;
  }
  if (!confirm("Delete this entry?")) return;
  const key = kind === "sale" ? "sales" : "purchases";
  state[key] = state[key].filter(row => row.id !== id);
  selectedPurchaseIds.delete(id);
  saveState();
  renderAll();
  toast("Entry deleted");
}

function cancelEntry(kind, id) {
  if (kind !== "sale") {
    deleteEntry(kind, id);
    return;
  }
  const entry = state.sales.find(row => row.id === id);
  if (!entry) return toast("Sales bill not found");
  if (isCancelledEntry(entry)) return toast("Sales bill is already cancelled");
  if (!confirm(`Cancel sales bill ${entry.number}? This number will not be reused.`)) return;
  entry.cancelled = true;
  entry.cancelledAt = new Date().toISOString();
  entry.status = "Cancelled";
  const profile = profileById(entry.profileId);
  profile.nextSaleNo = nextSaleSequence(entry.profileId, state.sales);
  saveState();
  renderAll();
  toast(`Sales bill ${entry.number} cancelled`);
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
    form.elements[key].value = party?.[key] ?? (key === "type" ? (options.type || "Customer") : "");
  });
  form.elements.shippingAddresses.value = formatShippingAddressesForForm(party?.shippingAddresses || []);
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
  const type = form.elements.type.value;
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
  const party = {
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
      state.parties.find(row => row.id === editingPartyId)?.shippingAddresses || []
    )
  };
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

function selectSavedPartyInOpenEntry(party) {
  if (partyDialogContext?.source !== "entry-buyer" || !$("#entryDialog")?.open || entryMode !== "sale") return;
  const form = $("#entryForm");
  form.elements.partyId.innerHTML = partyOptions("sale", party.id);
  form.elements.partyId.value = party.id;
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
  state.settings.currency = form.elements.currency.value.trim() || "Rs.";
  state.settings.reportEmails = form.elements.reportEmails.value.trim();
  state.settings.ewayDefaults = {
    ...(state.settings.ewayDefaults || {}),
    vehicleNo: form.elements.ewayVehicleNo.value.trim().toUpperCase(),
    distanceKm: Math.max(0, num(form.elements.ewayDistanceKm.value))
  };
  state.settings.activeProfileId = profile.id;
  saveState();
  renderAll();
  toast("GST profile saved");
}

function showInvoice(id, kind) {
  const entry = entryList(kind).find(row => row.id === id);
  const party = state.parties.find(row => row.id === entry.partyId) || {};
  const settings = profileById(entry.profileId);
  const billTo = normalizeAddressSnapshot(entry.billToSnapshot || partyAddressSnapshot(party));
  const shipTo = normalizeAddressSnapshot(entry.shipToSnapshot || billTo);
  const totalQty = entry.lines.reduce((sum, line) => sum + num(line.qty), 0);
  const roundOff = invoiceRoundOff(entry);
  const payableTotal = invoicePayableTotal(entry);
  currentInvoiceFileName = invoicePdfFileName(entry, party);
  currentInvoiceShareContext = { entry, party, settings };
  $("#invoicePrintArea").innerHTML = `
    <div class="invoice-preview-frame">
      <div class="invoice-sheet modern-invoice">
      <div class="modern-invoice-head">
        <div class="invoice-brand-block">
          ${firmLogoMarkup(settings, "invoice-firm-logo")}
          <div class="invoice-title-block">
            <span class="invoice-kicker">Sales Bill</span>
            <h2>Tax Invoice</h2>
            <p>${escapeHtml(settings.businessName || settings.label || state.selectedOrg?.name || "Business")}</p>
          </div>
        </div>
        <div class="modern-header-metrics">
          ${invoiceMetaCell("Invoice No.", entry.number, "Dated", formatInvoiceDate(entry.date))}
        </div>
      </div>
      <div class="invoice-seller-strip">
        ${invoiceSellerBlock(settings)}
      </div>
      <div class="modern-party-grid">
        ${invoicePartyBlock("Buyer (Bill to)", billTo)}
        ${invoicePartyBlock("Consignee (Ship to)", shipTo)}
      </div>
      ${isCancelledEntry(entry) ? `<div class="invoice-cancelled-banner">CANCELLED</div>` : ""}
      <table class="invoice-items-table">
        <thead>
          <tr>
            <th class="sl-col">Sl<br>No.</th>
            <th>Description of Goods</th>
            <th>HSN/SAC</th>
            <th class="num">Quantity</th>
            <th class="num">Rate</th>
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
              <td>${escapeHtml(item.hsn || "")}</td>
              <td class="num strong">${formatQty(line.qty)}</td>
              <td class="num">${formatInvoiceMoney(line.rate)}</td>
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
        <span>Amount Chargeable (in words)</span>
        <em>E. &amp; O.E</em>
        <strong>${escapeHtml(amountInWords(payableTotal))}</strong>
      </div>
      ${invoiceTaxSummary(entry)}
      <div class="tax-words-row">
        <span>Tax Amount (in words) :</span>
        <strong>${escapeHtml(amountInWords(entry.gst))}</strong>
      </div>
      ${invoiceBankBlock(settings)}
      <div class="invoice-footer-grid">
        <div>
          <span>Declaration</span>
          <p>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
        </div>
        <div class="signature-box">
          <strong>for ${escapeHtml(settings.businessName || settings.label)}</strong>
          <span>Authorised Signatory</span>
        </div>
      </div>
      <p class="computer-note">This is a Computer Generated Invoice</p>
      </div>
    </div>
  `;
  $("#invoiceDialog").showModal();
  $("#invoicePrintArea").scrollTo({ top: 0, left: 0 });
  requestAnimationFrame(fitInvoicePreview);
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
  const sheet = printArea?.querySelector(".modern-invoice");
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
    toast("Invoice PDF downloaded");
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
      await shareNativeInvoiceFile(file, "Invoice PDF");
      toast("Invoice shared");
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
    toast("Open an invoice before sharing");
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
      toast("Invoice PDF shared");
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
  const buyerName = party.name || "Customer";
  const amount = `${state.settings.currency || "Rs."} ${formatInvoiceMoney(invoicePayableTotal(entry))}`;
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
  if (!currentInvoiceShareContext?.entry) throw new Error("Invoice is not open");
  const pdf = createInvoicePdfDocument();
  renderInvoiceVectorPdf(pdf, currentInvoiceShareContext);
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
    const pageIds = [];
    this.pages.forEach(commands => {
      const stream = commands.join("\n");
      const contentId = addObject(`<< /Length ${this.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
      const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${this.num(this.pageWidthPt)} ${this.num(this.pageHeightPt)}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R /F3 ${fontItalicId} 0 R >> >> /Contents ${contentId} 0 R >>`);
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
  const details = invoicePdfDetails(context);
  const layout = invoicePdfLayout(pdf);
  let y = renderInvoicePdfPageHeader(pdf, details, layout, false, true);
  y = renderInvoicePdfItems(pdf, details, layout, y);
  y = ensureInvoicePdfSpace(pdf, details, layout, y, 94, false);
  y = renderInvoicePdfTotals(pdf, details, layout, y);
  renderInvoicePdfFooters(pdf, layout);
}

function invoicePdfDetails({ entry, party, settings }) {
  const billTo = normalizeAddressSnapshot(entry.billToSnapshot || partyAddressSnapshot(party));
  const shipTo = normalizeAddressSnapshot(entry.shipToSnapshot || billTo);
  const totalQty = entry.lines.reduce((sum, line) => sum + num(line.qty), 0);
  return {
    entry,
    party,
    settings,
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
    { key: "rate", label: "Rate", x: margin + 90, w: 20, align: "right" },
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
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(15);
  pdf.text(pdfClean(details.sellerName), margin + 3, y + 7);
  pdf.setFontSize(13);
  pdf.text("TAX INVOICE", pageWidth - margin - 3, y + 7, { align: "right" });
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  const addressLines = pdfWrap(pdf, details.sellerAddress, 95, 2);
  pdf.text(addressLines, margin + 3, y + 13);
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
    drawInvoicePdfPartyBox(pdf, "Buyer (Bill to)", details.billTo, margin, y, boxWidth, boxHeight);
    drawInvoicePdfPartyBox(pdf, "Consignee (Ship to)", details.shipTo, margin + boxWidth + 4, y, boxWidth, boxHeight);
    y += boxHeight + 5;
  }
  return includeTableHeader ? renderInvoicePdfItemHeader(pdf, layout, y) : y;
}

function drawInvoicePdfMeta(pdf, details, x, y, w) {
  pdf.setDrawColor(170, 184, 184);
  pdf.rect(x, y, w, 18);
  pdf.line(x, y + 9, x + w, y + 9);
  pdf.line(x + w / 2, y, x + w / 2, y + 18);
  pdf.setFontSize(6.5);
  pdf.setFont("helvetica", "normal");
  pdf.text("Invoice No.", x + 2, y + 4);
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
    const row = invoicePdfLineRow(line, item, index);
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

function invoicePdfLineRow(line, item, index) {
  const imeis = imeiNumbersFromText(line.imeiNumbers);
  const description = [
    item.name || itemName(line.itemId),
    imeis.length ? `IMEI: ${[...new Set(imeis)].join(", ")}` : ""
  ].filter(Boolean).join("\n");
  return {
    sl: String(index + 1),
    description,
    hsn: item.hsn || "",
    qty: formatQty(line.qty),
    rate: formatInvoiceMoney(line.rate),
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
  pdf.text("Amount Chargeable (in words)", layout.margin, y);
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
  pdf.text("Bank Details", layout.margin + 2, y + 5);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  const bankLines = [
    `Bank: ${bank.bankName || "-"}`,
    `Account Name: ${bank.accountName || details.sellerName}`,
    `Branch: ${bank.branch || "-"}`,
    `A/c No.: ${bank.accountNumber || "-"}`,
    `IFSC: ${bank.ifsc || "-"}`
  ];
  pdf.text(bankLines.map(pdfClean), layout.margin + 2, y + 10);
  pdf.setFont("helvetica", "bold");
  pdf.text(`for ${pdfClean(details.sellerName)}`, rightX + rightWidth - 2, y + 6, { align: "right" });
  pdf.setFont("helvetica", "normal");
  pdf.text("Authorised Signatory", rightX + rightWidth - 2, y + 36, { align: "right" });
  y += 45;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  pdf.text("Declaration", layout.margin, y);
  pdf.setFont("helvetica", "normal");
  y += drawInvoicePdfWrapped(pdf, "We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.", layout.margin, y + 4, layout.contentWidth, 3.6);
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

function renderInvoicePdfFooters(pdf, layout) {
  const totalPages = pdf.getNumberOfPages();
  for (let pageNo = 1; pageNo <= totalPages; pageNo += 1) {
    pdf.setPage(pageNo);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.5);
    pdf.setTextColor(88, 105, 105);
    pdf.text("This is a Computer Generated Invoice", layout.pageWidth / 2, layout.pageHeight - 6, { align: "center" });
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
    const hsn = item.hsn || "NA";
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
  const purchases = activeEntries("purchase").filter(inRange);
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
    const rows = `<tr><td>${escapeHtml(profileName(profile.id))}</td><td class="num">${money(saleGst)}</td><td class="num">${money(purchaseGst)}</td><td class="num">${money(saleGst - purchaseGst)}</td></tr>`;
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
  const stockValue = state.items.reduce((sum, item) => sum + stockForItem(item.id) * num(item.purchaseRate), 0);
  const receivable = sales.filter(entry => entry.status !== "Paid").reduce((sum, entry) => sum + entry.total, 0);
  const low = state.items.map(item => ({ ...item, stock: stockForItem(item.id) })).filter(item => item.stock <= num(item.minStock));
  output.innerHTML = `<div class="report-grid">
    <div class="report-card"><span>Total Sales</span><strong>${money(salesTotal)}</strong></div>
    <div class="report-card"><span>Total Purchases</span><strong>${money(purchaseTotal)}</strong></div>
    <div class="report-card"><span>Stock Value</span><strong>${money(stockValue)}</strong></div>
    <div class="report-card"><span>Receivable</span><strong>${money(receivable)}</strong></div>
    <div class="report-card"><span>Gross Margin</span><strong>${money(salesTotal - purchaseTotal)}</strong></div>
  </div>
  <div class="table-wrap"><table><thead><tr><th>Date</th><th>Type</th><th>No.</th><th>GST</th><th>Party</th><th class="num">Total</th></tr></thead><tbody>
    ${[...sales.map(entry => ({ ...entry, kind: "Sale" })), ...purchases.map(entry => ({ ...entry, kind: "Purchase" }))]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(entry => `<tr><td>${entry.date}</td><td>${entry.kind}</td><td>${escapeHtml(entry.number)}</td><td>${escapeHtml(profileName(entry.profileId))}</td><td>${escapeHtml(partyName(entry.partyId))}</td><td class="num">${money(entry.total)}</td></tr>`)
      .join("") || emptyRow(6, "No entries in this period")}
  </tbody></table></div>
  <div class="table-wrap report-secondary-table"><table><thead><tr><th>Low Stock Item</th><th>HSN</th><th class="num">Stock</th><th class="num">Min</th></tr></thead><tbody>
    ${low.map(item => `<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.hsn)}</td><td class="num">${item.stock}</td><td class="num">${num(item.minStock)}</td></tr>`).join("") || emptyRow(4, "No low stock items")}
  </tbody></table></div>`;
}

function exportSelectedEwayJson() {
  const purchases = monthFilteredEntries("purchase").filter(entry => selectedPurchaseIds.has(entry.id));
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
  const pincode = Number(extractPincode(value)) || 0;
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
  const fromPincode = route.fromPincode || extractPincode(supplier.address || supplier.place);
  const toPincode = route.toPincode || extractPincode(profile.address);
  const fromParts = ewayAddressParts(route.fromAddress || supplier.address || supplier.place, null, supplier.place, fromStateCode);
  const toParts = ewayAddressParts(route.toAddress || profile.address, route.destinationPresetData, profile.state, toStateCode);
  const distanceKm = ewayDetails.distanceKm || savedEwayRouteDistance(route.routeKey) || calculateEwayDistance(fromPincode, toPincode);
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
    fromPincode: fromParts.pincode || Number(fromPincode) || 0,
    fromStateCode: fromStateCode || 0,
    actualFromStateCode: fromParts.actualStateCode || fromStateCode || 0,
    toGstin,
    toTrdName: profile.businessName || profile.label,
    toAddr1: toParts.addr1,
    toAddr2: toParts.addr2,
    toPlace: toParts.place,
    toPincode: toParts.pincode || Number(toPincode) || 0,
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
  const name = item.name || itemName(line.itemId);
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
  const rows = activeEntries("purchase")
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
  return state.parties.filter(party => wanted.includes(party.type));
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
      return {
        ...line,
        hsn: resolveSaleLineHsn(line, explicitHsn),
        rate: ratesIncludeGst ? taxableRateFromInclusive(line.rate, gstRate) : num(line.rate),
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
  return round2(inclusiveRate / (1 + taxRate / 100));
}

function resolveSaleLineHsn(line, explicitHsn = "") {
  const lineHsn = String(line?.hsn || "").trim();
  if (explicitHsn && (!lineHsn || lineHsn === DEFAULT_SALE_HSN)) return explicitHsn;
  return lineHsn || explicitHsn || inferHsnFromItemName(line?.name);
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
      qty: num(line.qty) || 1,
      rate: num(line.rate),
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
  const existing = customerParties().find(party => (
    normalizedGstin && normalizeGstin(party.gstin) === normalizedGstin
  ) || party.name.toLowerCase() === customerName.toLowerCase() || partyAliasMatch(party, customerName).index >= 0);
  if (existing) {
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
    hsn: line.hsn || "",
    gstRate: num(line.gstRate) || 18,
    saleRate: num(line.rate),
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
          <thead><tr><th>Item</th><th>HSN</th><th class="num">Qty</th><th class="num">Rate</th><th class="num">GST</th><th class="num">Amount</th></tr></thead>
          <tbody>
            ${lines.map(line => {
              const taxable = lineTaxableAmount(line);
              return `<tr>
                <td>${escapeHtml(line.name || "Item")}</td>
                <td>${escapeHtml(line.hsn || DEFAULT_SALE_HSN)}</td>
                <td class="num">${formatQty(line.qty)}</td>
                <td class="num">${money(line.rate)}</td>
                <td class="num">${num(line.gstRate)}%</td>
                <td class="num">${money(taxable)}</td>
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
    hsn: line.hsn || DEFAULT_SALE_HSN,
    qty: num(line.qty) || 1,
    rate: num(line.rate),
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
  purchaseUploadQueue.push(...files);
  event.target.value = "";
  await processQueuedPurchaseInvoiceUpload();
}

async function processQueuedPurchaseInvoiceUpload() {
  if (purchaseUploadBusy || $("#entryDialog")?.open || !purchaseUploadQueue.length) return;
  const file = purchaseUploadQueue.shift();
  try {
    purchaseUploadBusy = true;
    toast(`Reading ${file.name}...`);
    const draft = await buildPurchaseDraftFromFile(file);
    if (draft.profileId !== activeProfileId()) {
      state.settings.activeProfileId = draft.profileId;
    }
    saveState();
    renderAll();
    openEntry("purchase", null, draft);
    toast(purchaseUploadQueue.length ? "Invoice opened. Save it to review the next upload." : "Invoice details filled. Please review before saving.");
  } catch (error) {
    console.error(error);
    toast("Could not read this invoice");
  } finally {
    purchaseUploadBusy = false;
    if (!$("#entryDialog")?.open && purchaseUploadQueue.length) processQueuedPurchaseInvoiceUpload();
  }
}

async function buildPurchaseDraftFromFile(file) {
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
  parsed = await enrichPurchasePincodes(parsed);
  parsed.attachments = [attachment];
  return buildPurchaseDraft(parsed);
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
  const cloudResult = await resolvePurchasePincodesWithCloud(enriched);
  return applyPurchasePincodeResolution(enriched, cloudResult);
}

function enrichPurchasePincodesFromMaster(parsed = {}) {
  const supplierGstin = normalizeGstin(parsed.supplierGstin);
  const buyerGstin = normalizeGstin(parsed.buyerGstin || profileById(parsed.profileId)?.gstin);
  const supplierMaster = partyAddressContextByGstin(supplierGstin);
  const buyerMaster = profileAddressContextByGstin(buyerGstin);
  const supplierPin = extractPincode(parsed.supplierAddress) || supplierMaster.pincode;
  const buyerPin = extractPincode(parsed.buyerAddress) || buyerMaster.pincode;
  if (supplierPin && !extractPincode(parsed.supplierAddress)) {
    parsed.supplierAddress = addressWithPincode(parsed.supplierAddress || supplierMaster.address, supplierPin);
  }
  if (!String(parsed.supplierAddress || "").trim() && supplierMaster.address) parsed.supplierAddress = supplierMaster.address;
  if (!String(parsed.supplierPlace || "").trim() && supplierMaster.place) parsed.supplierPlace = supplierMaster.place;
  if (buyerPin && !extractPincode(parsed.buyerAddress)) {
    parsed.buyerAddress = addressWithPincode(parsed.buyerAddress || buyerMaster.address, buyerPin);
  }
  if (!String(parsed.buyerAddress || "").trim() && buyerMaster.address) parsed.buyerAddress = buyerMaster.address;
  if (!String(parsed.buyerPlace || "").trim() && buyerMaster.place) parsed.buyerPlace = buyerMaster.place;
  return parsed;
}

function purchaseNeedsPincodeHelp(parsed = {}) {
  const supplierHasGstin = isValidGstin(parsed.supplierGstin);
  const buyerProfile = profileById(parsed.profileId) || profileByGstin(parsed.buyerGstin) || {};
  const buyerHasGstin = isValidGstin(parsed.buyerGstin || buyerProfile.gstin);
  const supplierNeedsPin = supplierHasGstin && !extractPincode(parsed.supplierAddress);
  const buyerNeedsPin = buyerHasGstin && !extractPincode(parsed.buyerAddress || buyerProfile.address);
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
  const existingPin = extractPincode(parsed[addressKey]);
  const confidence = resolution.confidence || "unknown";
  if (!existingPin && pin && confidence === "high") {
    parsed[addressKey] = addressWithPincode(resolution.address || parsed[addressKey], pin);
    if (!String(parsed[placeKey] || "").trim() && resolution.place) parsed[placeKey] = resolution.place;
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
    pincode: extractPincode(address)
  };
}

function addressWithPincode(address = "", pincode = "") {
  const pin = normalizePincode(pincode);
  const cleaned = String(address || "").trim().replace(/\s*,\s*/g, ", ");
  if (!pin) return cleaned;
  if (extractPincode(cleaned)) return cleaned;
  return [cleaned, pin].filter(Boolean).join(", ");
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
    extractedTaxes: { cgst: 0, sgst: 0, igst: 0, gst: 0 },
    reviewMessages: [message],
    lines: [{
      name: "Imported Purchase",
      hsn: "",
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
  const detectedInvoiceNumber = findInvoiceNumber(lines);
  const invoiceNumber = detectedInvoiceNumber || nextEntryNumber("purchase", profile.id);
  const invoiceDate = findInvoiceDate(cleaned) || today();
  const amounts = findInvoiceAmounts(lines);
  const parsedLines = findItemLines(lines);
  const fallbackTaxable = amounts.taxable || Math.max(0, amounts.total - amounts.gst) || amounts.total;
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
    buyerGstin,
    invoiceNumber,
    invoiceDate,
    taxable: fallbackTaxable,
    gst: amounts.gst,
    total: amounts.total || fallbackTaxable + amounts.gst,
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
      hsn: "",
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

function buildPurchaseDraft(parsed) {
  const selectedProfile = activeProfile();
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
  const lines = parsed.lines.map(line => {
    const item = ensureImportedItem(line);
    return {
      itemId: item.id,
      qty: num(line.qty) || 1,
      rate: num(line.rate),
      grossRate: num(line.grossRate),
      gstRate: num(line.gstRate),
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
  const existing = supplierParties().find(party => (
    supplierGstin && normalizeGstin(party.gstin) === supplierGstin
  ) || party.name.toLowerCase() === supplierName.toLowerCase() || partyAliasMatch(party, supplierName).index >= 0);
  if (existing) {
    updateExistingImportedSupplier(existing, parsed, supplierGstin);
    return existing.id;
  }
  const party = {
    id: uid(),
    name: supplierName,
    type: "Supplier",
    gstin: supplierGstin,
    phone: "",
    place: parsed.supplierPlace || stateNameFromGstin(supplierGstin) || stateCodeFromGstin(supplierGstin) || "",
    address: parsed.supplierAddress || "",
    aliases: "",
    shippingAddresses: []
  };
  state.parties.push(party);
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

function appendPartyAlias(party, alias) {
  const cleaned = cleanPartyAlias(alias);
  if (!cleaned || normalizeForAlias(cleaned) === normalizeForAlias(party.name)) return;
  if (GENERIC_PARTY_ALIASES.has(normalizeForAlias(cleaned))) return;
  if (partyAliasConflict(cleaned, party.id)) return;
  const aliases = cleanPartyAliasList([...(partyAliasList(party) || []), cleaned]);
  party.aliases = aliases.join("\n");
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
window.cancelEntry = cancelEntry;
window.showInvoice = showInvoice;
window.openItem = openItem;
window.deleteItem = deleteItem;
window.openParty = openParty;
window.deleteParty = deleteParty;

document.addEventListener("DOMContentLoaded", init);
