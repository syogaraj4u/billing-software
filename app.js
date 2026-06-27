const STORAGE_KEY = "billingSoftware.v1";
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
    bankDetails: {
      accountName: "Kala Nirvana",
      bankName: "ICICI Bank",
      branch: "Kupu Chandra Peta Branch",
      accountNumber: "757205000565",
      ifsc: "ICIC0007572"
    },
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
    bankDetails: {
      accountName: "Skanda Digitals",
      bankName: "ICICI Bank",
      branch: "KT Road Branch",
      accountNumber: "720905500069",
      ifsc: "ICIC0007209"
    },
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
    bankDetails: {
      accountName: "Khairanya Infotech",
      bankName: "ICICI Bank",
      branch: "Kupu Chandra Peta Branch",
      accountNumber: "757205000575",
      ifsc: "ICIC0007572"
    },
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
    bankDetails: {
      accountName: "LAKSHMI JEYAPANDI TRADERS",
      bankName: "ICICI Bank",
      branch: "Chennai - Rajaji Salai Branch",
      accountNumber: "793705000262",
      ifsc: "ICIC0007937"
    },
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
    bankDetails: {
      accountName: "SRI LAKSHMI DIGITALS",
      bankName: "ICICI Bank",
      branch: "Punganur Branch",
      accountNumber: "377105500333",
      ifsc: "ICIC0003771"
    },
    nextSaleNo: 1,
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
    }
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
let cloudClient = null;
let cloudSession = null;
let cloudWorkspaces = [];
let cloudWorkspace = null;
let cloudLoading = false;
let cloudSyncTimer = null;
let selectedPurchaseIds = new Set();
let entryDraftMeta = {};
let chatBillMessages = [];
let chatBillAttachments = [];
let chatBillPreparing = false;
let chatBillHistoryActive = false;
let pendingSmartBillReview = null;
let companySelectionOpen = true;
let companyPageTransitionTimer = null;
let currentInvoiceFileName = "invoice.pdf";
let currentInvoiceShareContext = null;
let partyAliasDraft = [];

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
  const existingEwayDefaults = value.settings.ewayDefaults || {};
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
    }
  };
  if (!profiles.some(profile => profile.id === value.settings.activeProfileId)) {
    value.settings.activeProfileId = profiles[0].id;
  }
  value.items = Array.isArray(value.items) ? value.items : [];
  value.parties = Array.isArray(value.parties) ? value.parties.map(normalizePartyForState) : [];
  mergeTallyBuyerMaster(value);
  value.sales = Array.isArray(value.sales) ? value.sales : [];
  value.purchases = Array.isArray(value.purchases) ? value.purchases : [];
  [...value.sales, ...value.purchases].forEach(entry => {
    if (!entry.profileId) entry.profileId = value.settings.activeProfileId;
  });
  value.sales.forEach(entry => normalizeEntryForState(entry, "sale"));
  value.purchases.forEach(entry => normalizeEntryForState(entry, "purchase"));
  return value;
}

function normalizePartyForState(party) {
  return {
    id: party.id || uid(),
    name: party.name || "",
    type: party.type || "Customer",
    gstin: party.gstin || "",
    phone: party.phone || "",
    place: party.place || "",
    address: party.address || "",
    aliases: party.aliases || ""
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

function normalizeEntryForState(entry, kind) {
  entry.lines = Array.isArray(entry.lines) ? entry.lines : [];
  const calculated = basicTotals(entry.lines);
  entry.taxable = num(entry.taxable) || calculated.taxable;
  entry.cgst = num(entry.cgst);
  entry.sgst = num(entry.sgst);
  entry.igst = num(entry.igst);
  entry.gst = num(entry.gst) || entry.cgst + entry.sgst + entry.igst || calculated.gst;
  entry.total = num(entry.total) || entry.taxable + entry.gst;
  entry.taxMode = entry.taxMode || (entry.igst > 0 ? "IGST" : "CGST_SGST");
  entry.reviewMessages = Array.isArray(entry.reviewMessages) ? entry.reviewMessages : [];
  entry.reviewStatus = entry.reviewStatus || (entry.reviewMessages.length ? "Needs Review" : "Ready");
  entry.attachments = Array.isArray(entry.attachments) ? entry.attachments : [];
  if (kind === "purchase") entry.source = entry.source || "manual";
}

function saveState(options = {}) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

function activeEntries(kind) {
  return entryList(kind).filter(entry => entry.profileId === activeProfileId());
}

function entryPrefix(kind) {
  return kind === "sale" ? "SALE" : "PUR";
}

function nextEntryNumber(kind, profileId = state.settings.activeProfileId) {
  const key = kind === "sale" ? "nextSaleNo" : "nextPurchaseNo";
  const profile = profileById(profileId);
  return `${entryPrefix(kind)}-${String(profile[key] || 1).padStart(4, "0")}`;
}

function normalizeGstin(value) {
  return String(value || "").toUpperCase().replace(/[^0-9A-Z]/g, "");
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

function basicTotals(lines) {
  return lines.reduce((acc, line) => {
    const taxable = num(line.qty) * num(line.rate);
    const gst = taxable * num(line.gstRate) / 100;
    acc.taxable += taxable;
    acc.gst += gst;
    acc.total += taxable + gst;
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
    const taxable = num(line.qty) * num(line.rate);
    const gst = taxable * num(line.gstRate) / 100;
    acc.taxable += taxable;
    acc.gst += gst;
    if (mode === "IGST") acc.igst += gst;
    else {
      acc.cgst += gst / 2;
      acc.sgst += gst / 2;
    }
    acc.total += taxable + gst;
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
  state.sales.filter(entry => !profileId || entry.profileId === profileId).forEach(entry => entry.lines.forEach(line => {
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
  bindEvents();
  renderAll();
  registerServiceWorker();
  await initCloud();
  if (window.lucide) lucide.createIcons();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

function bindEvents() {
  $$(".nav-tab").forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));
  $$("[data-view-link]").forEach(button => button.addEventListener("click", () => showView(button.dataset.viewLink)));
  $("#newSaleBtn").addEventListener("click", () => openEntry("sale"));
  $("#chatBillBtn").addEventListener("click", openChatBillDialog);
  $("#newChatSaleBtn").addEventListener("click", openChatBillDialog);
  $("#newPurchaseBtn").addEventListener("click", () => openEntry("purchase"));
  $("#purchaseInvoiceInput").addEventListener("change", handlePurchaseInvoiceUpload);
  $("#ewayJsonBtn").addEventListener("click", exportSelectedEwayJson);
  $("#selectAllPurchases").addEventListener("change", toggleAllPurchases);
  $("#newItemBtn").addEventListener("click", () => openItem());
  $("#newPartyBtn").addEventListener("click", () => openParty());
  $("#addLineBtn").addEventListener("click", () => addLineRow());
  $("#entryForm").addEventListener("submit", saveEntry);
  $("#chatBillForm").addEventListener("submit", event => event.preventDefault());
  $("#closeChatBillBtn").addEventListener("click", closeChatBillDialog);
  $("#chatBillAttachmentInput").addEventListener("change", handleChatBillAttachmentInput);
  $("#chatBillInput").addEventListener("input", resizeChatBillInput);
  $("#chatBillInput").addEventListener("keydown", handleChatBillInputKeydown);
  $("#chatSampleBtn").addEventListener("click", fillChatBillSample);
  $("#prepareChatBillBtn").addEventListener("click", prepareChatBillDraft);
  $("#itemForm").addEventListener("submit", saveItem);
  $("#partyForm").addEventListener("submit", saveParty);
  $("#addPartyAliasBtn").addEventListener("click", addPartyAliasFromInput);
  $("#partyAliasInput").addEventListener("keydown", handlePartyAliasInputKeydown);
  $("#saveSettingsBtn").addEventListener("click", saveSettings);
  $("#changeCompanyBtn").addEventListener("click", openCompanySelector);
  $("#settingsForm").elements.profileId.addEventListener("change", renderSettings);
  $("#backupBtn").addEventListener("click", exportBackup);
  $("#restoreInput").addEventListener("change", importBackup);
  $("#appLoginForm").addEventListener("submit", signInToBillingApp);
  $("#cloudBtn").addEventListener("click", openCloudDialog);
  $("#openCloudSettingsBtn").addEventListener("click", openCloudDialog);
  $("#cloudForm").addEventListener("submit", event => event.preventDefault());
  $("#cloudSignInBtn").addEventListener("click", signInToCloud);
  $("#cloudSignOutBtn").addEventListener("click", signOutFromCloud);
  $("#cloudWorkspaceSelect").addEventListener("change", event => selectCloudWorkspace(event.target.value));
  $("#cloudNewWorkspaceBtn").addEventListener("click", () => createCloudWorkspace("New Workspace"));
  $("#cloudSyncNowBtn").addEventListener("click", () => syncCloudNow(true));
  $("#cloudSaveWorkspaceBtn").addEventListener("click", saveCloudWorkspaceSettings);
  $("#closeInvoiceBtn").addEventListener("click", () => $("#invoiceDialog").close());
  $("#printInvoiceBtn").addEventListener("click", printInvoice);
  $("#downloadInvoicePdfBtn").addEventListener("click", downloadInvoicePdf);
  $("#shareInvoiceWhatsappBtn").addEventListener("click", shareInvoiceToWhatsApp);
  $("#shareInvoicePdfBtn").addEventListener("click", shareInvoicePdf);
  $("#printReportBtn").addEventListener("click", () => window.print());
  window.addEventListener("afterprint", clearInvoicePrintMode);
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
    parties: "Parties",
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
  const locked = !cloudConfigured() || !cloudSession;
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
    const initials = companyInitials(profile.businessName || profile.label);
    return `
      <button class="company-card ${profile.id === activeId ? "selected" : ""}" type="button" data-profile-id="${profile.id}">
        <span class="company-initial">${escapeHtml(initials)}</span>
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

async function initCloud() {
  renderCloudUi();
  if (!cloudConfigured()) return;
  const config = cloudConfig();
  cloudClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  const { data, error } = await cloudClient.auth.getSession();
  if (error) {
    toast("Cloud session could not be loaded");
    return;
  }
  cloudSession = data.session;
  cloudClient.auth.onAuthStateChange(async (_event, session) => {
    cloudSession = session;
    if (session) {
      await loadCloudWorkspaces();
      renderAll();
    }
    else {
      cloudWorkspaces = [];
      cloudWorkspace = null;
      renderAll();
    }
  });
  if (cloudSession) await loadCloudWorkspaces();
  renderCloudUi();
}

function openCloudDialog() {
  renderCloudUi();
  $("#cloudDialog").showModal();
  if (window.lucide) lucide.createIcons();
}

function renderCloudUi() {
  const configured = cloudConfigured();
  const signedIn = Boolean(cloudSession);
  const email = cloudSession?.user?.email || "-";
  $("#appLoginFields").hidden = !configured || signedIn;
  $("#appLoginNotConfigured").hidden = configured;
  $("#cloudBtnText").textContent = !configured ? "Local" : signedIn ? (cloudWorkspace?.name || "Cloud") : "Sign in";
  $("#cloudModeLabel").textContent = !configured ? "Local browser storage" : signedIn ? "Cloud sync enabled" : "Cloud ready, not signed in";
  $("#cloudWorkspaceLabel").textContent = cloudWorkspace?.name || "Not connected";
  $("#cloudLastSyncLabel").textContent = cloudWorkspace?.updated_at ? new Date(cloudWorkspace.updated_at).toLocaleString("en-IN") : "-";
  $("#cloudNotConfigured").hidden = configured;
  $("#cloudSignedOut").hidden = !configured || signedIn;
  $("#cloudSignedIn").hidden = !configured || !signedIn;
  $("#cloudUserEmail").textContent = email;
  $("#cloudWorkspaceSelect").innerHTML = cloudWorkspaces.map(workspace => `
    <option value="${workspace.id}" ${workspace.id === cloudWorkspace?.id ? "selected" : ""}>${escapeHtml(workspace.name)}</option>
  `).join("");
  $("#cloudWorkspaceName").value = cloudWorkspace?.name || "";
  $("#cloudMemberEmails").value = (cloudWorkspace?.member_emails || []).join("\n");
  renderAppVisibility();
}

async function signInToBillingApp(event) {
  event.preventDefault();
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
  const workspace = cloudWorkspaces.find(row => row.id === savedId) || cloudWorkspaces[0];
  applyCloudWorkspace(workspace, "Cloud data loaded");
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
  cloudWorkspace = workspace;
  localStorage.setItem(CLOUD_SELECTED_WORKSPACE_KEY, workspace.id);
  state = normalizeState(clone(workspace.data || defaultState));
  saveState({ skipCloud: true });
  renderAll();
  if (message) toast(message);
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
    return;
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
    return;
  }
  cloudWorkspace = data;
  cloudWorkspaces = cloudWorkspaces.map(row => row.id === data.id ? data : row);
  renderCloudUi();
  if (showToast) toast("Cloud synced");
}

function renderDashboard() {
  const sales = activeEntries("sale");
  const purchases = activeEntries("purchase");
  const salesTotal = sales.reduce((sum, entry) => sum + entry.total, 0);
  const purchaseTotal = purchases.reduce((sum, entry) => sum + entry.total, 0);
  const stockValue = state.items.reduce((sum, item) => sum + stockForItem(item.id) * num(item.purchaseRate), 0);
  const receivable = sales.filter(entry => entry.status !== "Paid").reduce((sum, entry) => sum + entry.total, 0);
  $("#metricSales").textContent = money(salesTotal);
  $("#metricPurchases").textContent = money(purchaseTotal);
  $("#metricStock").textContent = money(stockValue);
  $("#metricReceivable").textContent = money(receivable);

  const combined = [
    ...sales.map(entry => ({ ...entry, kind: "Sale" })),
    ...purchases.map(entry => ({ ...entry, kind: "Purchase" }))
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
  const rows = activeEntries(kind).sort((a, b) => b.date.localeCompare(a.date)).map(entry => {
    const purchaseSelect = kind === "purchase" ? `
      <td><input class="purchase-select" type="checkbox" aria-label="Select ${escapeHtml(entry.number)}" data-purchase-id="${entry.id}" ${selectedPurchaseIds.has(entry.id) ? "checked" : ""}></td>
    ` : "";
    const reviewCell = kind === "purchase" ? `<td>${reviewBadge(entry)}</td>` : "";
    return `
    <tr>
      ${purchaseSelect}
      <td>${entry.date}</td>
      <td>${escapeHtml(entry.number)}</td>
      <td>${escapeHtml(profileName(entry.profileId))}</td>
      <td>${escapeHtml(partyName(entry.partyId))}</td>
      <td><span class="badge ${entry.status === "Unpaid" ? "warn" : ""}">${escapeHtml(entry.status)}</span></td>
      ${reviewCell}
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
  `;
  }).join("");
  const emptyColspan = kind === "sale" ? 9 : 11;
  $(kind === "sale" ? "#salesRows" : "#purchaseRows").innerHTML = rows || emptyRow(emptyColspan, kind === "sale" ? "No sales entries" : "No purchase entries");
  if (kind === "purchase") bindPurchaseSelectors();
}

function reviewBadge(entry) {
  const status = entry.reviewStatus || "Ready";
  const message = (entry.reviewMessages || []).join(" ");
  const className = status === "Needs Review" ? "warn" : "";
  const title = message ? ` title="${escapeHtml(message)}"` : "";
  return `<span class="badge ${className}"${title}>${escapeHtml(status)}</span>`;
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
  const ids = activeEntries("purchase").map(entry => entry.id);
  const selectedCount = ids.filter(id => selectedPurchaseIds.has(id)).length;
  control.checked = ids.length > 0 && selectedCount === ids.length;
  control.indeterminate = selectedCount > 0 && selectedCount < ids.length;
}

function toggleAllPurchases(event) {
  selectedPurchaseIds = event.target.checked ? new Set(activeEntries("purchase").map(entry => entry.id)) : new Set();
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
  $("#partyRows").innerHTML = state.parties.map(party => `
    <tr>
      <td>${escapeHtml(party.name)}</td>
      <td>${escapeHtml(party.type)}</td>
      <td>${escapeHtml(party.gstin)}</td>
      <td>${escapeHtml(partyAliasList(party).join(", "))}</td>
      <td>${escapeHtml(party.phone)}</td>
      <td>${escapeHtml(party.place)}</td>
      <td><div class="row-actions">
        <button class="mini-btn" title="Edit" onclick="openParty('${party.id}')"><i data-lucide="pencil"></i></button>
        <button class="mini-btn" title="Delete" onclick="deleteParty('${party.id}')"><i data-lucide="trash-2"></i></button>
      </div></td>
    </tr>
  `).join("") || emptyRow(7, "No parties");
}

function renderSettings() {
  const form = $("#settingsForm");
  form.elements.profileId.innerHTML = profileOptions(form.elements.profileId.value || state.settings.activeProfileId);
  const profile = profileById(form.elements.profileId.value);
  ["businessName", "legalName", "gstin", "phone", "email", "address", "state", "nextSaleNo", "nextPurchaseNo"].forEach(key => {
    form.elements[key].value = profile?.[key] ?? "";
  });
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
  entryDraftMeta = {
    attachments: clone(source?.attachments || []),
    reviewStatus: source?.reviewStatus || "Ready",
    reviewMessages: clone(source?.reviewMessages || []),
    source: source?.source || (draft ? "imported" : "manual"),
    extractedTaxes: clone(source?.extractedTaxes || null),
    sellerGstin: source?.sellerGstin || "",
    buyerGstin: source?.buyerGstin || ""
  };
  const form = $("#entryForm");
  form.reset();
  $("#entryKindLabel").textContent = kind === "sale" ? "Sales Entry" : "Purchase Entry";
  $("#entryDialogTitle").textContent = id ? "Edit Entry" : "New Entry";
  form.elements.date.value = source?.date || today();
  form.elements.number.value = source?.number || nextEntryNumber(kind, source?.profileId || state.settings.activeProfileId);
  form.elements.profileId.innerHTML = profileOptions(source?.profileId || state.settings.activeProfileId);
  form.elements.profileId.disabled = true;
  form.elements.profileId.onchange = () => {
    if (!editingEntryId) form.elements.number.value = nextEntryNumber(kind, form.elements.profileId.value);
    updateEntryTotals();
  };
  form.elements.status.value = source?.status || "Paid";
  form.elements.notes.value = source?.notes || "";
  form.elements.partyId.innerHTML = partyOptions(kind, source?.partyId);
  form.elements.partyId.onchange = updateEntryTotals;
  $("#purchaseReviewPanel").innerHTML = renderPurchaseUploadReview(kind, source);
  $("#lineRows").innerHTML = "";
  (source?.lines?.length ? source.lines : [blankLine(kind)]).forEach(line => addLineRow(line));
  updateEntryTotals();
  $("#entryDialog").showModal();
  if (window.lucide) lucide.createIcons();
}

function renderPurchaseUploadReview(kind, source) {
  if (kind !== "purchase" || !source || source.source !== "purchase-upload") return "";
  const profile = profileById(source.profileId || activeProfileId());
  const supplier = partyById(source.partyId) || {};
  const calculated = calculateEntryTotals(source.lines || [], profile, supplier, "purchase");
  const extracted = source.extractedTaxes || {};
  const messages = uniqueMessages([
    ...activePurchaseReviewMessages(source.reviewMessages || []),
    ...purchaseDuplicateReviewMessages(source, source.id || editingEntryId)
  ]);
  const attachments = source.attachments || [];
  return `<section class="purchase-review-panel">
    <div class="purchase-review-head">
      <div>
        <span>Purchase Upload Review</span>
        <strong>${escapeHtml(source.number || "-")}</strong>
      </div>
      <div>
        <span>${messages.length ? "Needs Review" : "Ready"}</span>
        <strong>${money(calculated.total)}</strong>
      </div>
    </div>
    <div class="purchase-review-grid">
      ${purchaseReviewCard("Supplier", supplier.name || "-", supplier.gstin || source.sellerGstin || "-", supplier.address || supplier.place || "-")}
      ${purchaseReviewCard("Buyer GST", profile.businessName || profile.label || "-", source.buyerGstin || profile.gstin || "-", profile.address || profile.state || "-")}
      ${purchaseReviewCard("Invoice", source.number || "-", formatInvoiceDate(source.date || today()), attachments.map(file => file.name).join(", ") || "-")}
    </div>
    <div class="purchase-review-totals">
      <span>Taxable</span><strong>${money(calculated.taxable)}</strong>
      <span>CGST</span><strong>${money(calculated.cgst)}</strong>
      <span>SGST</span><strong>${money(calculated.sgst)}</strong>
      <span>IGST</span><strong>${money(calculated.igst)}</strong>
      <span>GST</span><strong>${money(calculated.gst)}</strong>
      <span>Total</span><strong>${money(calculated.total)}</strong>
    </div>
    ${renderExtractedTaxReview(extracted)}
    ${messages.length ? `<div class="purchase-review-warnings">${messages.map(message => `<span>${escapeHtml(message)}</span>`).join("")}</div>` : ""}
  </section>`;
}

function purchaseReviewCard(title, main, detail, extra) {
  return `<div class="purchase-review-card">
    <span>${escapeHtml(title)}</span>
    <strong>${escapeHtml(main || "-")}</strong>
    <p>${escapeHtml(detail || "-")}</p>
    <p>${escapeHtml(extra || "-")}</p>
  </div>`;
}

function renderExtractedTaxReview(extracted = {}) {
  if (!Object.values(extracted).some(value => num(value))) return "";
  return `<div class="purchase-review-extracted">
    <span>Uploaded Tax</span>
    <strong>Taxable ${money(extracted.taxable)} | CGST ${money(extracted.cgst)} | SGST ${money(extracted.sgst)} | IGST ${money(extracted.igst)} | GST ${money(extracted.gst)} | Total ${money(extracted.total)}</strong>
  </div>`;
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
  $("#entryCgst").textContent = money(calculated.cgst);
  $("#entrySgst").textContent = money(calculated.sgst);
  $("#entryIgst").textContent = money(calculated.igst);
  $("#entryGst").textContent = money(calculated.gst);
  $("#entryTotal").textContent = money(calculated.total);
}

function uniqueMessages(messages) {
  return [...new Set(messages.map(message => String(message || "").trim()).filter(Boolean))];
}

function purchaseTaxReviewMessages(extractedTaxes, calculated) {
  if (!extractedTaxes) return [];
  const messages = [];
  const extractedCgst = num(extractedTaxes.cgst);
  const extractedSgst = num(extractedTaxes.sgst);
  const extractedIgst = num(extractedTaxes.igst);
  const extractedGst = num(extractedTaxes.gst) || extractedCgst + extractedSgst + extractedIgst;
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
  return messages;
}

function purchaseDuplicateReviewMessages(source, excludeId = "") {
  const duplicate = findDuplicatePurchaseInvoice(source, excludeId);
  return duplicate ? [duplicatePurchaseInvoiceMessage(duplicate)] : [];
}

function activePurchaseReviewMessages(messages) {
  return (messages || []).filter(message => !isDuplicatePurchaseWarning(message));
}

function isDuplicatePurchaseWarning(message) {
  return String(message || "").startsWith("Duplicate purchase invoice warning:");
}

function findDuplicatePurchaseInvoice(source, excludeId = "") {
  const invoiceNumber = normalizePurchaseInvoiceNumber(source?.number);
  if (!invoiceNumber) return null;
  const supplierKey = purchaseSupplierKey(source);
  if (!supplierKey) return null;
  return state.purchases.find(entry => {
    if (entry.id === excludeId) return false;
    if (normalizePurchaseInvoiceNumber(entry.number) !== invoiceNumber) return false;
    return purchaseSupplierKey(entry) === supplierKey;
  }) || null;
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

function saveEntry(event) {
  event.preventDefault();
  const form = $("#entryForm");
  const lines = collectLines();
  if (!lines.length) {
    toast("Add at least one item");
    return;
  }
  const profile = profileById(form.elements.profileId.value);
  const party = partyById(form.elements.partyId.value);
  const calculated = calculateEntryTotals(lines, profile, party, entryMode);
  const reviewMessages = uniqueMessages([
    ...calculated.reviewMessages,
    ...(entryMode === "purchase" ? activePurchaseReviewMessages(entryDraftMeta.reviewMessages) : (entryDraftMeta.reviewMessages || [])),
    ...(entryMode === "purchase" ? purchaseTaxReviewMessages(entryDraftMeta.extractedTaxes, calculated) : [])
  ]);
  const entry = {
    id: editingEntryId || uid(),
    date: form.elements.date.value,
    number: form.elements.number.value.trim(),
    profileId: form.elements.profileId.value,
    partyId: form.elements.partyId.value,
    status: form.elements.status.value,
    notes: form.elements.notes.value.trim(),
    lines,
    ...calculated,
    attachments: clone(entryDraftMeta.attachments || []),
    extractedTaxes: clone(entryDraftMeta.extractedTaxes || null),
    source: entryDraftMeta.source || "manual",
    sellerGstin: entryDraftMeta.sellerGstin || normalizeGstin(party?.gstin),
    buyerGstin: entryDraftMeta.buyerGstin || normalizeGstin(profile?.gstin),
    reviewMessages,
    reviewStatus: reviewMessages.length ? "Needs Review" : "Ready"
  };
  if (entryMode === "purchase") {
    const duplicate = findDuplicatePurchaseInvoice(entry, editingEntryId);
    if (duplicate) {
      const duplicateMessage = duplicatePurchaseInvoiceMessage(duplicate);
      entry.reviewMessages = uniqueMessages([...entry.reviewMessages, duplicateMessage]);
      entry.reviewStatus = "Needs Review";
      if (!confirm(`${duplicateMessage}\n\nSave this purchase anyway?`)) return;
    }
  }
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
  selectedPurchaseIds.delete(id);
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
  const party = {
    id: editingPartyId || uid(),
    name: form.elements.name.value.trim(),
    type: form.elements.type.value,
    gstin: form.elements.gstin.value.trim(),
    aliases: cleanPartyAliasList(form.elements.aliases.value).join("\n"),
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
  const totalQty = entry.lines.reduce((sum, line) => sum + num(line.qty), 0);
  const roundOff = round2(num(entry.total) - num(entry.taxable) - num(entry.gst));
  currentInvoiceFileName = invoicePdfFileName(entry, party);
  currentInvoiceShareContext = { entry, party, settings };
  $("#invoicePrintArea").innerHTML = `
    <div class="invoice-sheet modern-invoice">
      <div class="modern-invoice-head">
        <div class="invoice-title-block">
          <span class="invoice-kicker">Sales Bill</span>
          <h2>Tax Invoice</h2>
          <p>${escapeHtml(settings.businessName || settings.label || state.selectedOrg?.name || "Business")}</p>
        </div>
        <div class="modern-header-metrics">
          ${invoiceMetaCell("Invoice No.", entry.number, "Dated", formatInvoiceDate(entry.date))}
          ${invoiceMetaCell("e-Way Bill No.", entry.ewayBillNo || "-", "Place of Supply", party.place || stateNameFromGstin(party.gstin) || "-")}
        </div>
      </div>
      <div class="modern-party-grid">
        ${invoiceSellerBlock(settings)}
        ${invoicePartyBlock("Consignee (Ship to)", party)}
        ${invoicePartyBlock("Buyer (Bill to)", party)}
      </div>
      <div class="modern-meta-grid">
        ${invoiceMetaCell("Delivery Note", "-", "Reference No. & Date.", "-")}
        ${invoiceMetaCell("Other References", "-", "Buyer's Order No.", "-")}
        ${invoiceMetaCell("Dispatch Doc No.", "-", "Dispatched through", "-")}
        ${invoiceMetaCell("Destination", party.place || "-", "Terms of Delivery", "-")}
      </div>
      <table class="invoice-items-table">
        <thead>
          <tr>
            <th class="sl-col">Sl<br>No.</th>
            <th>Description of Goods</th>
            <th>HSN/SAC</th>
            <th class="num">Quantity</th>
            <th class="num">Rate<br><small>(Incl. of Tax)</small></th>
            <th class="num">Rate</th>
            <th>per</th>
            <th class="num">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${entry.lines.map((line, index) => {
            const item = state.items.find(row => row.id === line.itemId) || {};
            const taxable = num(line.qty) * num(line.rate);
            const inclusiveRate = num(line.rate) * (1 + num(line.gstRate) / 100);
            return `<tr>
              <td class="num">${index + 1}</td>
              <td class="item-name">${escapeHtml(item.name || itemName(line.itemId))}</td>
              <td>${escapeHtml(item.hsn || "")}</td>
              <td class="num strong">${formatQty(line.qty)}</td>
              <td class="num">${formatInvoiceMoney(inclusiveRate)}</td>
              <td class="num">${formatInvoiceMoney(line.rate)}</td>
              <td>Pcs</td>
              <td class="num strong">${formatInvoiceMoney(taxable)}</td>
            </tr>`;
          }).join("")}
          ${invoiceOutputTaxRows(entry, roundOff)}
          <tr class="invoice-total-row">
            <td></td>
            <td class="num">Total</td>
            <td></td>
            <td class="num strong">${formatQty(totalQty)}</td>
            <td></td>
            <td></td>
            <td></td>
            <td class="num grand-total">Rs. ${formatInvoiceMoney(entry.total)}</td>
          </tr>
        </tbody>
      </table>
      <div class="amount-words-row">
        <span>Amount Chargeable (in words)</span>
        <em>E. &amp; O.E</em>
        <strong>${escapeHtml(amountInWords(entry.total))}</strong>
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
  `;
  $("#invoiceDialog").showModal();
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
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: currentInvoiceFileName.replace(/\.pdf$/i, ""),
        text: "Invoice PDF",
        files: [file]
      });
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
    if (shouldUseNativeInvoiceShare() && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: currentInvoiceFileName.replace(/\.pdf$/i, ""),
        text: message,
        files: [file]
      });
      toast("Invoice ready to share on WhatsApp");
      return;
    }
    downloadBlob(blob, currentInvoiceFileName);
    openWhatsAppMessage(phone, message);
    toast("PDF downloaded. WhatsApp opened.");
  } catch (error) {
    if (error?.name !== "AbortError") {
      console.error(error);
      openWhatsAppMessage(phone, message);
      toast("WhatsApp opened. Attach PDF if needed.");
    }
  } finally {
    setInvoicePdfBusy(false);
  }
}

function invoiceWhatsAppMessage({ entry, party, settings }) {
  const sellerName = settings.businessName || settings.label || "Nirvana Solutions";
  const buyerName = party.name || "Customer";
  const amount = `${state.settings.currency || "Rs."} ${formatInvoiceMoney(entry.total)}`;
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

function shouldUseNativeInvoiceShare() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "")
    || (navigator.maxTouchPoints > 1 && window.innerWidth <= 900);
}

async function buildInvoicePdfBlob() {
  const sheet = $("#invoicePrintArea .modern-invoice");
  if (!sheet) throw new Error("Invoice is not open");
  if (!window.html2canvas || !window.jspdf?.jsPDF) throw new Error("PDF tools are still loading");
  const canvas = await html2canvas(sheet, {
    backgroundColor: "#ffffff",
    scale: Math.min(2, window.devicePixelRatio || 1.5),
    useCORS: true,
    scrollX: 0,
    scrollY: 0
  });
  const image = canvas.toDataURL("image/png");
  const pdf = new window.jspdf.jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 8;
  const contentWidth = pageWidth - margin * 2;
  const contentHeight = pageHeight - margin * 2;
  const imageHeight = canvas.height * contentWidth / canvas.width;
  let y = margin;
  let remainingHeight = imageHeight;
  while (remainingHeight > 0) {
    pdf.addImage(image, "PNG", margin, y, contentWidth, imageHeight);
    remainingHeight -= contentHeight;
    if (remainingHeight > 0) {
      pdf.addPage();
      y -= contentHeight;
    }
  }
  return pdf.output("blob");
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

function invoiceOutputTaxRows(entry, roundOff) {
  const rows = [];
  if (num(entry.igst)) rows.push(["Output IGST", entry.igst]);
  if (num(entry.cgst)) rows.push(["Output CGST", entry.cgst]);
  if (num(entry.sgst)) rows.push(["Output SGST", entry.sgst]);
  if (roundOff) rows.push(["Round Off", roundOff]);
  return rows.map(([label, amount]) => `<tr class="tax-line-row">
    <td></td><td class="tax-label">${escapeHtml(label)}</td><td></td><td></td><td></td><td></td><td></td>
    <td class="num strong">${formatInvoiceMoney(amount)}</td>
  </tr>`).join("");
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
    const taxable = num(line.qty) * num(line.rate);
    const existing = map.get(key) || { hsn, rate: num(line.gstRate), taxable: 0, tax: 0 };
    existing.taxable += taxable;
    existing.tax += taxable * num(line.gstRate) / 100;
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
  const sales = activeEntries("sale").filter(inRange);
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

function exportSelectedEwayJson() {
  const purchases = activeEntries("purchase").filter(entry => selectedPurchaseIds.has(entry.id));
  if (!purchases.length) return toast("Select purchase bills first");
  const reviewMeta = [];
  const billLists = purchases.map(entry => {
    const result = buildEwayBill(entry);
    if (result.reviewMessages.length) {
      reviewMeta.push({ docNo: entry.number, messages: result.reviewMessages });
    }
    return result.bill;
  });
  const payload = {
    version: EWAY_DOCUMENT_VERSION,
    billLists,
    reviewMeta
  };
  downloadJson(payload, `purchase-eway-${today()}.json`);
  toast(reviewMeta.length ? "E-way JSON downloaded with review notes" : "E-way JSON downloaded");
}

function buildEwayBill(entry) {
  const profile = profileById(entry.profileId);
  const supplier = partyById(entry.partyId) || {};
  const fromGstin = normalizeGstin(supplier.gstin);
  const toGstin = normalizeGstin(profile.gstin);
  const fromStateCode = Number(stateCodeFromGstin(fromGstin) || stateCodeFromGstin(entry.sellerGstin));
  const toStateCode = Number(stateCodeFromGstin(toGstin) || stateCodeFromGstin(entry.buyerGstin));
  const fromPincode = extractPincode(supplier.address || supplier.place);
  const toPincode = extractPincode(profile.address);
  const defaults = state.settings.ewayDefaults || {};
  const bill = {
    userGstin: toGstin,
    supplyType: "I",
    subSupplyType: 1,
    docType: "INV",
    docNo: entry.number,
    docDate: ewayDate(entry.date),
    transType: defaults.transType || "1",
    fromGstin: fromGstin || "URP",
    fromTrdName: supplier.name || partyName(entry.partyId),
    fromAddr1: supplier.address || supplier.place || "",
    fromAddr2: "",
    fromPlace: supplier.place || "",
    fromPincode,
    actFromStateCode: fromStateCode || 0,
    fromStateCode: fromStateCode || 0,
    toGstin,
    toTrdName: profile.businessName || profile.label,
    toAddr1: profile.address || "",
    toAddr2: "",
    toPlace: profile.state || "",
    toPincode,
    actToStateCode: toStateCode || 0,
    toStateCode: toStateCode || 0,
    totalValue: round2(entry.taxable),
    cgstValue: round2(entry.cgst),
    sgstValue: round2(entry.sgst),
    igstValue: round2(entry.igst),
    cessValue: 0,
    cessNonAdvolValue: 0,
    totInvValue: round2(entry.total),
    transMode: defaults.transMode || "1",
    transDistance: String(num(defaults.distanceKm) || 0),
    transporterName: "",
    transporterId: "",
    transDocNo: "",
    transDocDate: "",
    vehicleNo: defaults.vehicleNo || "",
    vehicleType: defaults.vehicleType || "R",
    itemList: entry.lines.map((line, index) => ewayItem(line, index + 1, entry.taxMode))
  };
  return { bill, reviewMessages: validateEwayBill(bill) };
}

function ewayItem(line, serialNo, taxMode) {
  const item = state.items.find(row => row.id === line.itemId) || {};
  const taxable = num(line.qty) * num(line.rate);
  const gstRate = num(line.gstRate);
  return {
    itemNo: serialNo,
    productName: item.name || itemName(line.itemId),
    productDesc: item.name || itemName(line.itemId),
    hsnCode: item.hsn || "",
    quantity: num(line.qty),
    qtyUnit: "NOS",
    taxableAmount: round2(taxable),
    sgstRate: taxMode === "IGST" ? 0 : gstRate / 2,
    cgstRate: taxMode === "IGST" ? 0 : gstRate / 2,
    igstRate: taxMode === "IGST" ? gstRate : 0,
    cessRate: 0
  };
}

function validateEwayBill(bill) {
  const messages = [];
  if (!bill.userGstin) messages.push("Buyer GSTIN missing.");
  if (!bill.fromGstin || bill.fromGstin === "URP") messages.push("Supplier GSTIN missing.");
  if (!bill.fromPincode) messages.push("Supplier pincode missing.");
  if (!bill.toPincode) messages.push("Buyer pincode missing.");
  if (!bill.vehicleNo) messages.push("Default vehicle number missing in Settings.");
  if (!bill.transDistance || bill.transDistance === "0") messages.push("Transport distance missing in Settings.");
  if (!bill.itemList.length) messages.push("No item lines found.");
  bill.itemList.forEach(item => {
    if (!item.hsnCode) messages.push(`${item.productName}: HSN missing.`);
    if (!item.quantity) messages.push(`${item.productName}: quantity missing.`);
  });
  return uniqueMessages(messages);
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
  if (window.matchMedia?.("(max-width: 820px)").matches) return;
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
    const typedMessage = chatBillMessages.filter(row => row.role === "user").map(row => row.rawText || "").join("\n").trim();
    const allAttachments = chatBillMessages.filter(row => row.role === "user").flatMap(row => row.attachments || []);
    const cloudResult = await parseSaleChatWithCloud(fullMessage, allAttachments);
    if (allAttachments.length && !cloudResult) {
      appendChatBillMessage("assistant", "I could not read the attached image now. Please sign in to Cloud and make sure the ChatGPT API function is deployed, or type the bill-to and ship-to details here.");
      if (!typedMessage) {
        $("#chatBillSummary").innerHTML = `<strong>Image reading unavailable</strong><span class="help-text">Type the address details or try again after Cloud is ready.</span>`;
        return;
      }
    }
    const sourceMessage = cloudResult ? fullMessage : (typedMessage || fullMessage);
    const parsed = applySaleChatDefaults(cloudResult?.draft || parseSaleChatLocal(sourceMessage), sourceMessage);
    const missing = cloudResult
      ? saleChatMissingDetails(cloudResult.ready ? (cloudResult.missingDetails || []) : (cloudResult.missingDetails?.length ? cloudResult.missingDetails : ["more sale bill details"]))
      : missingSaleBillDetails(parsed, fullMessage);
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
  if (!cloudClient || !cloudSession) return null;
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
    return data;
  } catch (error) {
    console.warn("Cloud sale parser unavailable", error);
    return null;
  }
}

function parseSaleChatLocal(message) {
  const explicitGstin = normalizeGstin(message.match(/\b\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]\b/i)?.[0] || "");
  const internalBuyer = extractInternalBuyerProfileFromMessage(message);
  const savedBuyer = internalBuyer ? null : extractBuyerPartyFromMessage(message, explicitGstin);
  const gstin = normalizeGstin(internalBuyer?.gstin || savedBuyer?.gstin || explicitGstin);
  const profile = activeProfile();
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
  if (!normalizeGstin(parsed.customerGstin)) missing.push("customer GSTIN");
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
  return message && !/\bgst\s*(rate|percentage|%)?\b|\b(payment\s*)?status\b|\bpaid\b|\bunpaid\b|\bpartial\b/i.test(message);
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

function extractInternalBuyerProfileFromMessage(message) {
  const explicit = extractProfileNearKeyword(message, ["bill to", "ship to", "buyer", "customer", "to"]);
  if (explicit) return explicit;
  const mentions = profileMentions(message);
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
  const draft = parsed || {};
  const explicitHsn = extractHsnCode(sourceMessage);
  const explicitGstRate = extractExplicitGstRate(sourceMessage);
  const lines = Array.isArray(draft.lines) ? draft.lines : [];
  const selectedProfileId = activeProfileId();
  const parsedProfile = state.settings.profiles.find(profile => profile.id === draft.profileId);
  const reviewMessages = uniqueMessages([
    ...(Array.isArray(draft.reviewMessages) ? draft.reviewMessages : []),
    parsedProfile && parsedProfile.id !== selectedProfileId
      ? `Chat mentioned seller ${profileName(parsedProfile.id)}, but selected company is ${profileName(selectedProfileId)}. Draft kept under selected company.`
      : ""
  ]);
  return {
    ...draft,
    profileId: selectedProfileId,
    status: draft.status || "Paid",
    reviewMessages,
    lines: lines.map(line => ({
      ...line,
      hsn: resolveSaleLineHsn(line, explicitHsn),
      gstRate: resolveSaleLineGstRate(line, explicitGstRate)
    }))
  };
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
              const taxable = num(line.qty) * num(line.rate);
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
  const file = files[0];
  if (!file) return;
  try {
    toast("Reading purchase invoice...");
    const attachment = await createPurchaseAttachment(file);
    let parsed = await extractPurchaseInvoiceWithCloud(file);
    if (!parsed && file.type === "application/pdf") {
      const text = await extractPdfText(file);
      if (!text.trim()) {
        parsed = buildManualReviewPurchase(file, "No readable text found in PDF. Please review and enter values manually.");
      } else {
        parsed = parsePurchaseInvoiceText(text, file.name);
      }
    }
    if (!parsed) {
      parsed = buildManualReviewPurchase(file, "Image extraction needs the cloud invoice extractor. Please review and enter values manually.");
    }
    parsed.attachments = [attachment];
    const draft = buildPurchaseDraft(parsed);
    saveState();
    renderAll();
    openEntry("purchase", null, draft);
    toast(files.length > 1 ? "First invoice opened. Upload the next after saving." : "Invoice details filled. Please review before saving.");
  } catch (error) {
    console.error(error);
    toast("Could not read this invoice");
  } finally {
    event.target.value = "";
  }
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
    attachment.error = error.message;
    return attachment;
  }
  attachment.bucket = PURCHASE_ATTACHMENT_BUCKET;
  attachment.storagePath = storagePath;
  attachment.status = "Cloud stored";
  return attachment;
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
  const lines = cleaned.split("\n").map(line => line.trim()).filter(Boolean);
  const gstins = [...new Set((cleaned.match(/\b\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]\b/gi) || []).map(normalizeGstin))];
  const matchedProfile = gstins.map(profileByGstin).find(Boolean);
  const profile = matchedProfile || activeProfile();
  const buyerGstin = normalizeGstin(profile.gstin);
  const supplierGstin = gstins.find(gstin => gstin !== buyerGstin) || "";
  const supplierName = findSupplierName(lines, supplierGstin) || fileName.replace(/\.pdf$/i, "");
  const invoiceNumber = findInvoiceNumber(lines) || nextEntryNumber("purchase", profile.id);
  const invoiceDate = findInvoiceDate(cleaned) || today();
  const amounts = findInvoiceAmounts(lines);
  const parsedLines = findItemLines(lines);
  const fallbackTaxable = amounts.taxable || Math.max(0, amounts.total - amounts.gst) || amounts.total;
  const expectedTax = taxModeFromGstins(supplierGstin, buyerGstin);
  const reviewMessages = uniqueMessages([
    matchedProfile ? "" : "Buyer GSTIN did not match one of your 8 GST profiles. Confirm the business GST before saving.",
    supplierGstin ? "" : "Supplier GSTIN was not found. Confirm supplier details before saving.",
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
  const selectedBuyerGstin = normalizeGstin(selectedProfile.gstin);
  const contextMessages = uniqueMessages([
    parsedProfile && parsedProfile.id !== selectedProfile.id
      ? `Uploaded invoice buyer matched ${profileName(parsedProfile.id)}, but selected company is ${profileName(selectedProfile.id)}. Draft kept under selected company.`
      : "",
    parsedBuyerGstin && selectedBuyerGstin && parsedBuyerGstin !== selectedBuyerGstin
      ? `Uploaded buyer GSTIN ${parsedBuyerGstin} differs from selected company GSTIN ${selectedBuyerGstin}. Confirm before saving.`
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
      gstRate: num(line.gstRate)
    };
  });
  return {
    profileId: selectedProfile.id,
    date: parsed.invoiceDate,
    number: parsed.invoiceNumber,
    partyId,
    status: "Unpaid",
    notes: `Auto-filled from ${parsed.fileName}. Review values before saving.`,
    lines,
    attachments: clone(parsed.attachments || []),
    extractedTaxes: clone(parsed.extractedTaxes || null),
    sellerGstin: parsed.supplierGstin || "",
    buyerGstin: selectedBuyerGstin,
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
    place: "",
    address: "",
    aliases: ""
  };
  state.parties.push(party);
  return party.id;
}

function updateExistingImportedSupplier(party, parsed, supplierGstin) {
  if (!normalizeGstin(party.gstin) && supplierGstin) party.gstin = supplierGstin;
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
window.showInvoice = showInvoice;
window.openItem = openItem;
window.deleteItem = deleteItem;
window.openParty = openParty;
window.deleteParty = deleteParty;

document.addEventListener("DOMContentLoaded", init);
