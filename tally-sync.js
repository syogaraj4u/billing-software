(function attachTallySync(global) {
  "use strict";

  const DEFAULT_HSN = "85171300";
  const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>';

  function defaultSettings(profile = {}) {
    const companyName = cleanText(profile.businessName || profile.legalName || profile.label || "Billing Company");
    return {
      companyName,
      unitName: "Pcs",
      godownName: "Main Location",
      salesLedger: "Sales - GST",
      purchaseLedger: "Purchase - GST",
      cgstLedger: "CGST",
      sgstLedger: "SGST",
      igstLedger: "IGST",
      roundOffLedger: "Round Off",
      salesVoucherType: "Sales",
      purchaseVoucherType: "Purchase",
      creditNoteVoucherType: "Credit Note",
      debitNoteVoucherType: "Debit Note"
    };
  }

  function normalizeSettings(value = {}, profile = {}) {
    const defaults = defaultSettings(profile);
    return Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => [
      key,
      cleanText(value?.[key]) || fallback
    ]));
  }

  function buildMastersXml({ profile = {}, parties = [], items = [], settings = {} } = {}) {
    const config = normalizeSettings(settings, profile);
    const messages = [
      unitMasterXml(config.unitName),
      coreLedgerXml(config.salesLedger, "Sales Accounts", "Applicable"),
      coreLedgerXml(config.purchaseLedger, "Purchase Accounts", "Applicable"),
      taxLedgerXml(config.cgstLedger, "Central Tax"),
      taxLedgerXml(config.sgstLedger, "State Tax"),
      taxLedgerXml(config.igstLedger, "Integrated Tax"),
      coreLedgerXml(config.roundOffLedger, "Indirect Expenses", "Not Applicable"),
      ...uniqueByName(parties).map(partyLedgerXml),
      ...uniqueByName(items).map(item => stockItemXml(item, config.unitName))
    ].filter(Boolean);
    return mastersEnvelope(messages, config.companyName);
  }

  function buildVouchersXml({ profile = {}, entries = [], settings = {} } = {}) {
    const config = normalizeSettings(settings, profile);
    const messages = entries.map(record => voucherMessageXml(record, config)).filter(Boolean);
    return voucherEnvelope(messages, config.companyName);
  }

  function mastersEnvelope(messages, companyName) {
    return [
      XML_HEADER,
      "<ENVELOPE>",
      "  <HEADER><TALLYREQUEST>Import Data</TALLYREQUEST></HEADER>",
      "  <BODY><IMPORTDATA>",
      "    <REQUESTDESC>",
      "      <REPORTNAME>All Masters</REPORTNAME>",
      `      <STATICVARIABLES><SVCURRENTCOMPANY>${xml(companyName)}</SVCURRENTCOMPANY></STATICVARIABLES>`,
      "    </REQUESTDESC>",
      "    <REQUESTDATA>",
      messages.map(indentMessage).join("\n"),
      "    </REQUESTDATA>",
      "  </IMPORTDATA></BODY>",
      "</ENVELOPE>"
    ].join("\n");
  }

  function voucherEnvelope(messages, companyName) {
    return [
      XML_HEADER,
      "<ENVELOPE>",
      "  <HEADER>",
      "    <VERSION>1</VERSION>",
      "    <TALLYREQUEST>Import</TALLYREQUEST>",
      "    <TYPE>Data</TYPE>",
      "    <ID>Vouchers</ID>",
      "  </HEADER>",
      "  <BODY>",
      "    <DESC><STATICVARIABLES>",
      `      <SVCURRENTCOMPANY>${xml(companyName)}</SVCURRENTCOMPANY>`,
      "    </STATICVARIABLES></DESC>",
      "    <DATA>",
      messages.map(indentMessage).join("\n"),
      "    </DATA>",
      "  </BODY>",
      "</ENVELOPE>"
    ].join("\n");
  }

  function indentMessage(value) {
    return String(value || "").split("\n").map(line => `      ${line}`).join("\n");
  }

  function unitMasterXml(unitName) {
    const name = cleanText(unitName) || "Pcs";
    return [
      '<TALLYMESSAGE xmlns:UDF="TallyUDF">',
      `  <UNIT NAME="${xmlAttr(name)}" ACTION="Create">`,
      `    <NAME>${xml(name)}</NAME>`,
      `    <ORIGINALNAME>${xml(name)}</ORIGINALNAME>`,
      "    <ISSIMPLEUNIT>Yes</ISSIMPLEUNIT>",
      "    <DECIMALPLACES>0</DECIMALPLACES>",
      "  </UNIT>",
      "</TALLYMESSAGE>"
    ].join("\n");
  }

  function coreLedgerXml(name, parent, gstApplicable) {
    const ledgerName = cleanText(name);
    if (!ledgerName) return "";
    return [
      '<TALLYMESSAGE xmlns:UDF="TallyUDF">',
      `  <LEDGER NAME="${xmlAttr(ledgerName)}" ACTION="Create">`,
      `    <NAME>${xml(ledgerName)}</NAME>`,
      `    <PARENT>${xml(parent)}</PARENT>`,
      `    <GSTAPPLICABLE>${xml(gstApplicable)}</GSTAPPLICABLE>`,
      "  </LEDGER>",
      "</TALLYMESSAGE>"
    ].join("\n");
  }

  function taxLedgerXml(name, dutyHead) {
    const ledgerName = cleanText(name);
    if (!ledgerName) return "";
    return [
      '<TALLYMESSAGE xmlns:UDF="TallyUDF">',
      `  <LEDGER NAME="${xmlAttr(ledgerName)}" ACTION="Create">`,
      `    <NAME>${xml(ledgerName)}</NAME>`,
      "    <PARENT>Duties &amp; Taxes</PARENT>",
      "    <TAXTYPE>GST</TAXTYPE>",
      `    <GSTDUTYHEAD>${xml(dutyHead)}</GSTDUTYHEAD>`,
      "    <GSTAPPLICABLE>Not Applicable</GSTAPPLICABLE>",
      "  </LEDGER>",
      "</TALLYMESSAGE>"
    ].join("\n");
  }

  function partyLedgerXml(party = {}) {
    const name = cleanText(party.name);
    if (!name) return "";
    const gstin = normalizeGstin(party.gstin);
    const state = cleanText(party.state || party.place || stateFromGstin(gstin));
    const pincode = normalizePincode(party.pincode || pincodeFromText(party.address));
    const parent = cleanText(party.tallyParent) || (/supplier|creditor/i.test(party.type || "") ? "Sundry Creditors" : "Sundry Debtors");
    const addresses = addressLines(party.address);
    const addressList = addresses.length
      ? ["    <ADDRESS.LIST TYPE=\"String\">", ...addresses.map(line => `      <ADDRESS>${xml(line)}</ADDRESS>`), "    </ADDRESS.LIST>"]
      : [];
    return [
      '<TALLYMESSAGE xmlns:UDF="TallyUDF">',
      `  <LEDGER NAME="${xmlAttr(name)}" ACTION="Create">`,
      `    <NAME>${xml(name)}</NAME>`,
      `    <PARENT>${xml(parent)}</PARENT>`,
      "    <ISBILLWISEON>Yes</ISBILLWISEON>",
      ...addressList,
      `    <MAILINGNAME.LIST TYPE="String"><MAILINGNAME>${xml(name)}</MAILINGNAME></MAILINGNAME.LIST>`,
      "    <COUNTRYNAME>India</COUNTRYNAME>",
      state ? `    <LEDSTATENAME>${xml(state)}</LEDSTATENAME>` : "",
      pincode ? `    <PINCODE>${xml(pincode)}</PINCODE>` : "",
      gstin ? `    <PARTYGSTIN>${xml(gstin)}</PARTYGSTIN>` : "",
      gstin ? "    <GSTREGISTRATIONTYPE>Regular</GSTREGISTRATIONTYPE>" : "    <GSTREGISTRATIONTYPE>Unregistered</GSTREGISTRATIONTYPE>",
      party.email ? `    <EMAIL>${xml(party.email)}</EMAIL>` : "",
      party.phone ? `    <LEDGERPHONE>${xml(party.phone)}</LEDGERPHONE>` : "",
      party.phone ? `    <LEDGERMOBILE>${xml(party.phone)}</LEDGERMOBILE>` : "",
      "  </LEDGER>",
      "</TALLYMESSAGE>"
    ].filter(Boolean).join("\n");
  }

  function stockItemXml(item = {}, unitName) {
    const name = cleanText(item.name);
    if (!name) return "";
    const hsn = normalizeHsn(item.hsn);
    const gstRate = clampRate(item.gstRate || 18);
    const halfRate = roundNumber(gstRate / 2);
    return [
      '<TALLYMESSAGE xmlns:UDF="TallyUDF">',
      `  <STOCKITEM NAME="${xmlAttr(name)}" ACTION="Create">`,
      `    <NAME>${xml(name)}</NAME>`,
      "    <PARENT>Primary</PARENT>",
      `    <BASEUNITS>${xml(unitName || "Pcs")}</BASEUNITS>`,
      "    <GSTAPPLICABLE>Applicable</GSTAPPLICABLE>",
      "    <GSTTYPEOFSUPPLY>Goods</GSTTYPEOFSUPPLY>",
      "    <HSNDETAILS.LIST>",
      "      <APPLICABLEFROM>20230401</APPLICABLEFROM>",
      `      <HSNCODE>${xml(hsn)}</HSNCODE>`,
      "    </HSNDETAILS.LIST>",
      "    <GSTDETAILS.LIST>",
      "      <APPLICABLEFROM>20230401</APPLICABLEFROM>",
      "      <CALCULATIONTYPE>On Value</CALCULATIONTYPE>",
      "      <TAXABILITY>Taxable</TAXABILITY>",
      "      <STATEWISEDETAILS.LIST>",
      "        <STATENAME>Any</STATENAME>",
      gstRate ? gstRateXml("Central Tax", halfRate) : "",
      gstRate ? gstRateXml("State Tax", halfRate) : "",
      gstRate ? gstRateXml("Integrated Tax", gstRate) : "",
      "      </STATEWISEDETAILS.LIST>",
      "    </GSTDETAILS.LIST>",
      "  </STOCKITEM>",
      "</TALLYMESSAGE>"
    ].filter(Boolean).join("\n");
  }

  function gstRateXml(head, rate) {
    return [
      "        <RATEDETAILS.LIST>",
      `          <GSTRATEDUTYHEAD>${xml(head)}</GSTRATEDUTYHEAD>`,
      "          <GSTRATEVALUATIONTYPE>Based on Value</GSTRATEVALUATIONTYPE>",
      `          <GSTRATE>${amount(rate)}</GSTRATE>`,
      "        </RATEDETAILS.LIST>"
    ].join("\n");
  }

  function voucherMessageXml(record = {}, settings) {
    const entry = record.entry || record;
    const kind = record.kind || entry.kind || "sale";
    if (!entry?.number || !entry?.date) return "";
    const voucherType = voucherTypeFor(kind, settings);
    if (record.operation === "cancel" || entry.cancelled || entry.status === "Cancelled") {
      return cancellationVoucherXml(entry, voucherType);
    }
    const partyName = cleanText(record.party?.name || entry.partyName);
    if (!partyName) return "";
    const direction = voucherDirection(kind);
    const lineAmounts = reconciledLineAmounts(entry.lines || [], entry.taxable);
    const taxable = roundNumber(lineAmounts.reduce((sum, value) => sum + value, 0));
    const cgst = Math.abs(roundNumber(entry.cgst));
    const sgst = Math.abs(roundNumber(entry.sgst));
    const igst = Math.abs(roundNumber(entry.igst));
    const total = Math.abs(roundNumber(entry.total || taxable + cgst + sgst + igst + Number(entry.roundOff || 0)));
    const derivedRoundOff = roundNumber(total - taxable - cgst - sgst - igst);
    const partyAmount = roundNumber(direction.party * total);
    const inventorySign = direction.inventory;
    const party = record.party || {};
    const gstin = normalizeGstin(party.gstin || entry.buyerGstin || entry.sellerGstin);
    const state = cleanText(party.state || party.place || stateFromGstin(gstin));
    const inventoryXml = (entry.lines || []).map((line, index) => inventoryEntryXml({
      line,
      taxable: lineAmounts[index] || 0,
      sign: inventorySign,
      ledgerName: kind === "sale" || kind === "creditNote" ? settings.salesLedger : settings.purchaseLedger,
      unitName: settings.unitName,
      godownName: settings.godownName
    })).filter(Boolean);
    const ledgerRows = [
      partyLedgerEntryXml(partyName, partyAmount, entry.number),
      cgst ? generalLedgerEntryXml(settings.cgstLedger, direction.tax * cgst) : "",
      sgst ? generalLedgerEntryXml(settings.sgstLedger, direction.tax * sgst) : "",
      igst ? generalLedgerEntryXml(settings.igstLedger, direction.tax * igst) : "",
      Math.abs(derivedRoundOff) >= 0.005 ? generalLedgerEntryXml(settings.roundOffLedger, direction.roundOff * derivedRoundOff) : ""
    ].filter(Boolean);
    return [
      '<TALLYMESSAGE xmlns:UDF="TallyUDF">',
      `  <VOUCHER VCHTYPE="${xmlAttr(voucherType)}" ACTION="Create" OBJVIEW="Invoice Voucher View">`,
      `    <DATE>${tallyDate(entry.date)}</DATE>`,
      `    <VOUCHERTYPENAME>${xml(voucherType)}</VOUCHERTYPENAME>`,
      `    <VOUCHERNUMBER>${xml(entry.number)}</VOUCHERNUMBER>`,
      `    <REFERENCE>${xml(entry.number)}</REFERENCE>`,
      "    <PERSISTEDVIEW>Invoice Voucher View</PERSISTEDVIEW>",
      "    <ISINVOICE>Yes</ISINVOICE>",
      `    <PARTYLEDGERNAME>${xml(partyName)}</PARTYLEDGERNAME>`,
      `    <BASICBASEPARTYNAME>${xml(partyName)}</BASICBASEPARTYNAME>`,
      gstin ? `    <PARTYGSTIN>${xml(gstin)}</PARTYGSTIN>` : "",
      state ? `    <PLACEOFSUPPLY>${xml(state)}</PLACEOFSUPPLY>` : "",
      `    <NARRATION>${xml(`Imported from Billing App - ${entry.number}`)}</NARRATION>`,
      ...ledgerRows.map(indentTwo),
      ...inventoryXml.map(indentTwo),
      "  </VOUCHER>",
      "</TALLYMESSAGE>"
    ].filter(Boolean).join("\n");
  }

  function cancellationVoucherXml(entry, voucherType) {
    return [
      '<TALLYMESSAGE xmlns:UDF="TallyUDF">',
      `  <VOUCHER DATE="${tallyDate(entry.date)}" TAGNAME="Voucher Number" TAGVALUE="${xmlAttr(entry.number)}" ACTION="Cancel" VCHTYPE="${xmlAttr(voucherType)}">`,
      `    <DATE>${tallyDate(entry.date)}</DATE>`,
      `    <VOUCHERTYPENAME>${xml(voucherType)}</VOUCHERTYPENAME>`,
      `    <VOUCHERNUMBER>${xml(entry.number)}</VOUCHERNUMBER>`,
      "    <NARRATION>Cancelled in Billing App</NARRATION>",
      "  </VOUCHER>",
      "</TALLYMESSAGE>"
    ].join("\n");
  }

  function voucherTypeFor(kind, settings) {
    if (kind === "purchase") return settings.purchaseVoucherType;
    if (kind === "creditNote") return settings.creditNoteVoucherType;
    if (kind === "purchaseReturn") return settings.debitNoteVoucherType;
    return settings.salesVoucherType;
  }

  function voucherDirection(kind) {
    if (kind === "purchase") return { party: 1, inventory: -1, tax: -1, roundOff: -1 };
    if (kind === "creditNote") return { party: 1, inventory: -1, tax: -1, roundOff: -1 };
    if (kind === "purchaseReturn") return { party: -1, inventory: 1, tax: 1, roundOff: 1 };
    return { party: -1, inventory: 1, tax: 1, roundOff: 1 };
  }

  function partyLedgerEntryXml(name, signedAmount, reference) {
    const positive = signedAmount < 0 ? "Yes" : "No";
    return [
      "<ALLLEDGERENTRIES.LIST>",
      `  <LEDGERNAME>${xml(name)}</LEDGERNAME>`,
      `  <ISDEEMEDPOSITIVE>${positive}</ISDEEMEDPOSITIVE>`,
      "  <ISPARTYLEDGER>Yes</ISPARTYLEDGER>",
      `  <ISLASTDEEMEDPOSITIVE>${positive}</ISLASTDEEMEDPOSITIVE>`,
      `  <AMOUNT>${amount(signedAmount)}</AMOUNT>`,
      "  <BILLALLOCATIONS.LIST>",
      `    <NAME>${xml(reference)}</NAME>`,
      "    <BILLTYPE>New Ref</BILLTYPE>",
      `    <AMOUNT>${amount(signedAmount)}</AMOUNT>`,
      "  </BILLALLOCATIONS.LIST>",
      "</ALLLEDGERENTRIES.LIST>"
    ].join("\n");
  }

  function generalLedgerEntryXml(name, signedAmount) {
    if (!cleanText(name) || Math.abs(signedAmount) < 0.005) return "";
    const positive = signedAmount < 0 ? "Yes" : "No";
    return [
      "<ALLLEDGERENTRIES.LIST>",
      `  <LEDGERNAME>${xml(name)}</LEDGERNAME>`,
      `  <ISDEEMEDPOSITIVE>${positive}</ISDEEMEDPOSITIVE>`,
      `  <ISLASTDEEMEDPOSITIVE>${positive}</ISLASTDEEMEDPOSITIVE>`,
      `  <AMOUNT>${amount(signedAmount)}</AMOUNT>`,
      "</ALLLEDGERENTRIES.LIST>"
    ].join("\n");
  }

  function inventoryEntryXml({ line = {}, taxable = 0, sign = 1, ledgerName, unitName, godownName }) {
    const name = cleanText(line.name || line.itemName || line.productName || "Mobile Phone");
    const qty = Math.abs(Number(line.qty || line.quantity || 0));
    if (!name || qty <= 0) return "";
    const signedAmount = roundNumber(sign * Math.abs(taxable));
    const positive = signedAmount < 0 ? "Yes" : "No";
    const rate = roundNumber(Math.abs(taxable) / qty);
    const quantity = `${plainNumber(qty)} ${cleanText(unitName) || "Pcs"}`;
    return [
      "<ALLINVENTORYENTRIES.LIST>",
      `  <STOCKITEMNAME>${xml(name)}</STOCKITEMNAME>`,
      `  <ISDEEMEDPOSITIVE>${positive}</ISDEEMEDPOSITIVE>`,
      `  <RATE>${amount(rate)}/${xml(unitName || "Pcs")}</RATE>`,
      `  <AMOUNT>${amount(signedAmount)}</AMOUNT>`,
      `  <ACTUALQTY>${xml(quantity)}</ACTUALQTY>`,
      `  <BILLEDQTY>${xml(quantity)}</BILLEDQTY>`,
      cleanText(godownName) ? "  <BATCHALLOCATIONS.LIST>" : "",
      cleanText(godownName) ? `    <GODOWNNAME>${xml(godownName)}</GODOWNNAME>` : "",
      cleanText(godownName) ? "    <BATCHNAME>Primary Batch</BATCHNAME>" : "",
      cleanText(godownName) ? `    <AMOUNT>${amount(signedAmount)}</AMOUNT>` : "",
      cleanText(godownName) ? `    <ACTUALQTY>${xml(quantity)}</ACTUALQTY>` : "",
      cleanText(godownName) ? `    <BILLEDQTY>${xml(quantity)}</BILLEDQTY>` : "",
      cleanText(godownName) ? "  </BATCHALLOCATIONS.LIST>" : "",
      "  <ACCOUNTINGALLOCATIONS.LIST>",
      `    <LEDGERNAME>${xml(ledgerName)}</LEDGERNAME>`,
      `    <ISDEEMEDPOSITIVE>${positive}</ISDEEMEDPOSITIVE>`,
      `    <AMOUNT>${amount(signedAmount)}</AMOUNT>`,
      "  </ACCOUNTINGALLOCATIONS.LIST>",
      "</ALLINVENTORYENTRIES.LIST>"
    ].filter(Boolean).join("\n");
  }

  function reconciledLineAmounts(lines = [], expectedTaxable) {
    const values = lines.map(line => {
      const direct = Number(line.taxable);
      if (Number.isFinite(direct) && direct !== 0) return Math.abs(roundNumber(direct));
      const qty = Math.abs(Number(line.qty || line.quantity || 0));
      const rate = Math.abs(Number(line.rate || line.taxableRate || 0));
      return roundNumber(qty * rate);
    });
    if (!values.length) return values;
    const target = Math.abs(roundNumber(expectedTaxable || values.reduce((sum, value) => sum + value, 0)));
    const difference = roundNumber(target - values.reduce((sum, value) => sum + value, 0));
    values[values.length - 1] = roundNumber(values[values.length - 1] + difference);
    return values;
  }

  function parseDataXml(text, options = {}) {
    if (typeof global.DOMParser !== "function") {
      return emptyImportResult("XML parsing is not available in this browser.");
    }
    const documentNode = new global.DOMParser().parseFromString(String(text || ""), "application/xml");
    const parserError = elementsNamed(documentNode, "PARSERERROR")[0];
    if (parserError) {
      return emptyImportResult(cleanText(parserError.textContent) || "Invalid Tally XML file.");
    }
    const parties = elementsNamed(documentNode, "LEDGER").map(parseLedgerElement).filter(Boolean);
    const items = elementsNamed(documentNode, "STOCKITEM").map(parseStockItemElement).filter(Boolean);
    const warnings = [];
    const config = normalizeSettings(options.settings || {}, options.profile || {});
    const voucherElements = elementsNamed(documentNode, "VOUCHER");
    const parsedVouchers = voucherElements
      .map(element => parseVoucherElement(element, config, options.profile || {}, warnings))
      .filter(Boolean);
    const vouchers = uniqueImportedVouchers(parsedVouchers);
    if (!parties.length && !items.length && !vouchers.length) {
      return {
        ...emptyImportResult("No supported masters or vouchers were found in this Tally XML file."),
        warnings
      };
    }
    return {
      companyName: cleanText(firstText(documentNode, ["SVCURRENTCOMPANY", "CMPNAME"])),
      parties: uniqueImportedParties(parties),
      items: uniqueByName(items),
      vouchers,
      skippedVoucherCount: Math.max(0, voucherElements.length - vouchers.length),
      warnings: uniqueText(warnings),
      errors: []
    };
  }

  function parseMastersXml(text) {
    const result = parseDataXml(text);
    return {
      parties: result.parties,
      items: result.items,
      errors: result.errors
    };
  }

  function emptyImportResult(error = "") {
    return {
      companyName: "",
      parties: [],
      items: [],
      vouchers: [],
      skippedVoucherCount: 0,
      warnings: [],
      errors: error ? [error] : []
    };
  }

  function parseVoucherElement(element, settings, profile, warnings) {
    const voucherType = cleanText(directFirstText(element, ["VOUCHERTYPENAME"]) || element.getAttribute("VCHTYPE"));
    const kind = voucherKind(voucherType, settings);
    const number = cleanText(directFirstText(element, ["VOUCHERNUMBER", "REFERENCE", "REFERENCENO"]));
    const date = parseTallyDate(directFirstText(element, ["DATE", "EFFECTIVEDATE"]));
    if (!kind) {
      if (voucherType && number) warnings.push(`${voucherType} voucher ${number} is not mapped and will be skipped.`);
      return null;
    }
    if (!number || !date) {
      warnings.push(`${voucherType || "Tally"} voucher is missing its number or date and will be skipped.`);
      return null;
    }

    const ledgerRows = directChildrenMatching(element, ["ALLLEDGERENTRIES.LIST", "LEDGERENTRIES.LIST"])
      .map(parseVoucherLedgerRow);
    const partyLedger = ledgerRows.find(row => row.isParty)
      || ledgerRows.find(row => normalizeName(row.name) === normalizeName(directFirstText(element, ["PARTYLEDGERNAME", "BASICBASEPARTYNAME"])));
    const partyName = cleanText(directFirstText(element, ["PARTYLEDGERNAME", "BASICBASEPARTYNAME"]) || partyLedger?.name);
    const partyGstin = normalizeGstin(directFirstText(element, ["PARTYGSTIN", "CONSIGNEEGSTIN", "BUYERGSTIN", "GSTIN"]));
    const partyAddress = voucherPartyAddress(element);
    const partyPincode = normalizePincode(directFirstText(element, ["BASICBUYERPINNUMBER", "CONSIGNEEPINNUMBER", "PINCODE"]) || pincodeFromText(partyAddress));
    const partyState = cleanText(directFirstText(element, ["PLACEOFSUPPLY", "STATENAME", "LEDSTATENAME"])) || stateFromGstin(partyGstin);
    const inventoryRows = voucherInventoryRows(element).map(parseVoucherInventoryRow).filter(Boolean);
    const taxRows = voucherTaxAmounts(ledgerRows, settings);
    let taxable = roundNumber(inventoryRows.reduce((sum, row) => sum + row.taxable, 0));
    if (!taxable) taxable = voucherTaxableFromLedgers(ledgerRows, settings, kind);
    const partyTotal = Math.abs(roundNumber(partyLedger?.amount));
    let cgst = taxRows.cgst;
    let sgst = taxRows.sgst;
    let igst = taxRows.igst;
    let gst = roundNumber(cgst + sgst + igst);
    let total = partyTotal || roundNumber(taxable + gst + taxRows.roundOff);
    if (!gst && total > taxable) {
      gst = Math.max(0, roundNumber(total - taxable - taxRows.roundOff));
      const sameState = String(profile?.gstin || "").slice(0, 2) && String(profile.gstin).slice(0, 2) === partyGstin.slice(0, 2);
      if (sameState) {
        cgst = roundNumber(gst / 2);
        sgst = roundNumber(gst - cgst);
      } else {
        igst = gst;
      }
    }
    if (!total) total = roundNumber(taxable + gst);
    const roundOff = roundNumber(total - taxable - gst);
    const lines = allocateVoucherTax(inventoryRows, gst);
    const cancelled = /^(yes|true|1)$/i.test(directFirstText(element, ["ISCANCELLED", "ISDELETED"]))
      || /cancel/i.test(element.getAttribute("ACTION") || "");
    const voucherWarnings = [];
    if (!partyName && !cancelled) voucherWarnings.push("Party ledger is missing.");
    if (!lines.length && !cancelled) voucherWarnings.push("Inventory item lines are missing.");
    if (!taxable && !cancelled) voucherWarnings.push("Taxable value is missing.");
    if (voucherWarnings.length) warnings.push(`${voucherType} ${number}: ${voucherWarnings.join(" ")}`);
    return {
      tallyId: cleanText(element.getAttribute("REMOTEID") || directFirstText(element, ["GUID", "MASTERID", "ALTERID"])),
      kind,
      voucherType,
      number,
      date,
      cancelled,
      partyName,
      partyGstin,
      partyAddress: appendPincode(partyAddress, partyPincode),
      partyPincode,
      partyState,
      lines,
      taxable,
      cgst,
      sgst,
      igst,
      gst,
      roundOff,
      total,
      narration: cleanText(directFirstText(element, ["NARRATION"])),
      warnings: voucherWarnings
    };
  }

  function voucherKind(voucherType, settings) {
    const value = normalizeName(voucherType);
    if (!value) return "";
    const configured = [
      ["creditNote", settings.creditNoteVoucherType],
      ["purchaseReturn", settings.debitNoteVoucherType],
      ["purchase", settings.purchaseVoucherType],
      ["sale", settings.salesVoucherType]
    ].find(([, name]) => normalizeName(name) === value);
    if (configured) return configured[0];
    if (/credit note|sales? return/.test(value)) return "creditNote";
    if (/debit note|purchase return/.test(value)) return "purchaseReturn";
    if (/purchase/.test(value)) return "purchase";
    if (/sales?/.test(value)) return "sale";
    return "";
  }

  function parseVoucherLedgerRow(element) {
    return {
      name: cleanText(directFirstText(element, ["LEDGERNAME"])),
      amount: parseTallyNumber(directFirstText(element, ["AMOUNT"])),
      isParty: /^(yes|true|1)$/i.test(directFirstText(element, ["ISPARTYLEDGER"]))
    };
  }

  function voucherInventoryRows(voucher) {
    for (const names of [
      ["ALLINVENTORYENTRIES.LIST"],
      ["INVENTORYENTRIES.LIST"],
      ["INVENTORYALLOCATIONS.LIST"]
    ]) {
      const rows = elementsMatching(voucher, names);
      if (rows.length) return rows;
    }
    return [];
  }

  function parseVoucherInventoryRow(element) {
    const name = cleanText(directFirstText(element, ["STOCKITEMNAME"]));
    const quantityText = directFirstText(element, ["BILLEDQTY", "ACTUALQTY"]);
    const qty = Math.abs(parseTallyNumber(quantityText));
    const taxable = Math.abs(roundNumber(parseTallyNumber(directFirstText(element, ["AMOUNT"]))));
    if (!name || !qty) return null;
    const directRates = elementsMatching(element, ["GSTRATE", "BASICRATEOFINVOICETAX"])
      .map(node => Math.abs(parseTallyNumber(node.textContent)))
      .filter(value => value > 0 && value <= 100);
    let gstRate = directRates.length ? Math.max(...directRates) : 0;
    if (gstRate > 0 && gstRate <= 14 && directRates.length >= 2) gstRate *= 2;
    return {
      itemName: name,
      hsn: normalizeHsn(firstText(element, ["HSNCODE", "GSTHSNCODE", "HSN"])),
      qty,
      unit: tallyUnit(quantityText) || tallyUnit(directFirstText(element, ["RATE"])) || "Pcs",
      taxable,
      rate: roundNumber(taxable / qty),
      grossRate: 0,
      gstRate: clampRate(gstRate)
    };
  }

  function voucherTaxAmounts(rows, settings) {
    const totals = { cgst: 0, sgst: 0, igst: 0, roundOff: 0 };
    rows.forEach(row => {
      const name = normalizeName(row.name);
      const value = Math.abs(roundNumber(row.amount));
      if (!name || !value) return;
      if (name === normalizeName(settings.cgstLedger) || /(^| )cgst( |$)|central tax/.test(name)) totals.cgst += value;
      else if (name === normalizeName(settings.sgstLedger) || /(^| )sgst( |$)|state tax/.test(name)) totals.sgst += value;
      else if (name === normalizeName(settings.igstLedger) || /(^| )igst( |$)|integrated tax/.test(name)) totals.igst += value;
      else if (name === normalizeName(settings.roundOffLedger) || /round(ing)? off/.test(name)) totals.roundOff += row.amount;
    });
    totals.cgst = roundNumber(totals.cgst);
    totals.sgst = roundNumber(totals.sgst);
    totals.igst = roundNumber(totals.igst);
    totals.roundOff = roundNumber(totals.roundOff);
    return totals;
  }

  function voucherTaxableFromLedgers(rows, settings, kind) {
    const configuredName = normalizeName(kind === "sale" || kind === "creditNote" ? settings.salesLedger : settings.purchaseLedger);
    const matched = rows.filter(row => {
      const name = normalizeName(row.name);
      if (configuredName && name === configuredName) return true;
      return kind === "sale" || kind === "creditNote" ? /(^| )sales?( |$)/.test(name) : /(^| )purchase( |$)/.test(name);
    });
    return roundNumber(matched.reduce((sum, row) => sum + Math.abs(row.amount), 0));
  }

  function allocateVoucherTax(rows, gstTotal) {
    const taxableTotal = rows.reduce((sum, row) => sum + row.taxable, 0);
    let allocated = 0;
    return rows.map((row, index) => {
      const lineGst = index === rows.length - 1
        ? roundNumber(gstTotal - allocated)
        : roundNumber(taxableTotal ? gstTotal * row.taxable / taxableTotal : 0);
      allocated = roundNumber(allocated + lineGst);
      const derivedRate = row.taxable ? roundNumber(lineGst * 100 / row.taxable) : 0;
      const gstRate = row.gstRate || nearestGstRate(derivedRate);
      return {
        ...row,
        gstRate,
        grossRate: roundNumber((row.taxable + lineGst) / row.qty)
      };
    });
  }

  function nearestGstRate(value) {
    const rates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 7.5, 12, 18, 28];
    const number = clampRate(value);
    return rates.reduce((closest, rate) => Math.abs(rate - number) < Math.abs(closest - number) ? rate : closest, rates[0]);
  }

  function voucherPartyAddress(element) {
    const values = ["BASICBUYERADDRESS", "ADDRESS", "CONSIGNEEADDRESS"]
      .flatMap(name => elementsNamed(element, name))
      .map(node => cleanText(node.textContent))
      .filter(Boolean);
    return uniqueText(values).slice(0, 6).join(", ");
  }

  function parseTallyDate(value) {
    const text = cleanText(value);
    const compact = text.replace(/\D/g, "");
    if (/^(19|20)\d{6}$/.test(compact)) return `${compact.slice(0, 4)}-${compact.slice(4, 6)}-${compact.slice(6, 8)}`;
    if (/^\d{8}$/.test(compact)) return `${compact.slice(4, 8)}-${compact.slice(2, 4)}-${compact.slice(0, 2)}`;
    const parsed = new Date(text);
    if (Number.isNaN(parsed.getTime())) return "";
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function parseTallyNumber(value) {
    const match = String(value || "").replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : 0;
  }

  function tallyUnit(value) {
    return cleanText(String(value || "").replace(/-?[\d,.]+/g, "").replace(/^\s*\/\s*/, ""))
      .split(/\s+/)[0]
      ?.replace(/[^A-Za-z]/g, "") || "";
  }

  function uniqueImportedVouchers(vouchers = []) {
    const seen = new Set();
    return vouchers.filter(voucher => {
      const key = [voucher.kind, normalizeName(voucher.number), voucher.date, voucher.tallyId].join("|");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function parseLedgerElement(element) {
    const name = cleanText(element.getAttribute("NAME") || directChildText(element, "NAME"));
    const parent = cleanText(directChildText(element, "PARENT"));
    const gstin = normalizeGstin(firstText(element, ["PARTYGSTIN", "GSTIN", "LEDGERGSTIN"]));
    const partyGroup = /sundry\s*(debtors|creditors)/i.test(parent);
    if (!name || (!gstin && !partyGroup)) return null;
    const address = elementsNamed(element, "ADDRESS").map(node => cleanText(node.textContent)).filter(Boolean).join(", ");
    const state = cleanText(firstText(element, ["LEDSTATENAME", "STATENAME"]));
    const pincode = normalizePincode(firstText(element, ["PINCODE"]) || pincodeFromText(address));
    return {
      name,
      type: /creditors/i.test(parent) ? "Supplier" : "Customer",
      gstin,
      phone: cleanText(firstText(element, ["LEDGERMOBILE", "LEDGERPHONE", "MOBILE", "PHONE"])),
      email: cleanText(firstText(element, ["EMAIL"])),
      place: state || stateFromGstin(gstin),
      state: state || stateFromGstin(gstin),
      pincode,
      address: appendPincode(address, pincode),
      tallyParent: parent
    };
  }

  function parseStockItemElement(element) {
    const name = cleanText(element.getAttribute("NAME") || directChildText(element, "NAME"));
    if (!name) return null;
    const hsn = normalizeHsn(firstText(element, ["HSNCODE", "GSTHSNCODE", "HSN"]));
    const rates = elementsNamed(element, "GSTRATE")
      .map(node => Number(cleanText(node.textContent)))
      .filter(value => Number.isFinite(value) && value >= 0 && value <= 100);
    let gstRate = rates.length ? Math.max(...rates) : 18;
    if (gstRate > 0 && gstRate <= 14 && rates.length >= 2) gstRate *= 2;
    return {
      name,
      hsn,
      gstRate: clampRate(gstRate || 18),
      unit: cleanText(firstText(element, ["BASEUNITS"])) || "Pcs",
      saleRate: 0,
      purchaseRate: 0
    };
  }

  function elementsNamed(root, name) {
    const wanted = String(name || "").toUpperCase();
    return Array.from(root?.getElementsByTagName?.("*") || []).filter(node => String(node.localName || node.nodeName || "").toUpperCase() === wanted);
  }

  function elementsMatching(root, names = []) {
    const wanted = new Set(names.map(name => String(name || "").toUpperCase()));
    return Array.from(root?.getElementsByTagName?.("*") || []).filter(node => wanted.has(elementName(node)));
  }

  function directChildrenMatching(element, names = []) {
    const wanted = new Set(names.map(name => String(name || "").toUpperCase()));
    return Array.from(element?.children || []).filter(node => wanted.has(elementName(node)));
  }

  function elementName(node) {
    return String(node?.localName || node?.nodeName || "").toUpperCase();
  }

  function directChildText(element, name) {
    const wanted = String(name || "").toUpperCase();
    const child = Array.from(element?.children || []).find(node => elementName(node) === wanted);
    return cleanText(child?.textContent);
  }

  function directFirstText(element, names = []) {
    for (const name of names) {
      const value = directChildText(element, name);
      if (value) return value;
    }
    return "";
  }

  function firstText(element, names = []) {
    for (const name of names) {
      const node = elementsNamed(element, name)[0];
      if (cleanText(node?.textContent)) return cleanText(node.textContent);
    }
    return "";
  }

  function uniqueImportedParties(parties = []) {
    const byKey = new Map();
    parties.forEach(party => {
      const key = party.gstin ? `gstin:${party.gstin}` : `name:${party.name.toLowerCase()}`;
      const existing = byKey.get(key);
      if (!existing) {
        byKey.set(key, party);
        return;
      }
      existing.type = existing.type === party.type ? existing.type : "Both";
      ["gstin", "phone", "email", "place", "state", "pincode", "address"].forEach(field => {
        if (!existing[field] && party[field]) existing[field] = party[field];
      });
    });
    return [...byKey.values()];
  }

  function uniqueByName(rows = []) {
    const seen = new Set();
    return rows.filter(row => {
      const key = cleanText(row?.name).toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function uniqueText(values = []) {
    const seen = new Set();
    return values.filter(value => {
      const key = cleanText(value).toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function normalizeName(value) {
    return cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function addressLines(value) {
    const text = cleanText(value);
    if (!text) return [];
    const source = String(value || "").split(/\n+/).map(cleanText).filter(Boolean);
    if (source.length > 1) return source.slice(0, 5);
    const chunks = text.split(/\s*,\s*/).filter(Boolean);
    if (chunks.length <= 2) return [text];
    const lines = [];
    for (let index = 0; index < chunks.length; index += 2) lines.push(chunks.slice(index, index + 2).join(", "));
    return lines.slice(0, 5);
  }

  function appendPincode(address, pincode) {
    if (!pincode || String(address || "").includes(pincode)) return cleanText(address);
    return [cleanText(address), pincode].filter(Boolean).join(", ");
  }

  function pincodeFromText(value) {
    return String(value || "").match(/\b[1-9]\d{5}\b/)?.[0] || "";
  }

  function normalizePincode(value) {
    return String(value || "").replace(/\D/g, "").match(/^[1-9]\d{5}$/)?.[0] || "";
  }

  function normalizeGstin(value) {
    const normalized = String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    return /^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z0-9]Z[A-Z0-9]$/.test(normalized) ? normalized : "";
  }

  function normalizeHsn(value) {
    const normalized = String(value || "").replace(/\D/g, "");
    return normalized && normalized !== "85176290" ? normalized : DEFAULT_HSN;
  }

  function stateFromGstin(gstin) {
    const stateNames = {
      "07": "Delhi", "09": "Uttar Pradesh", "23": "Madhya Pradesh", "24": "Gujarat",
      "27": "Maharashtra", "29": "Karnataka", "32": "Kerala", "33": "Tamil Nadu",
      "36": "Telangana", "37": "Andhra Pradesh"
    };
    return stateNames[String(gstin || "").slice(0, 2)] || "";
  }

  function tallyDate(value) {
    const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return match ? `${match[1]}${match[2]}${match[3]}` : String(value || "").replace(/\D/g, "").slice(0, 8);
  }

  function cleanText(value) {
    return String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();
  }

  function xml(value) {
    return cleanText(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"
    })[character]);
  }

  function xmlAttr(value) {
    return xml(value);
  }

  function amount(value) {
    const normalized = Math.abs(Number(value || 0)) < 0.000001 ? 0 : Number(value || 0);
    return normalized.toFixed(2);
  }

  function plainNumber(value) {
    const normalized = Number(value || 0);
    return Number.isInteger(normalized) ? String(normalized) : normalized.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
  }

  function roundNumber(value) {
    return Math.round((Number(value || 0) + Number.EPSILON) * 100) / 100;
  }

  function clampRate(value) {
    return Math.min(100, Math.max(0, roundNumber(value)));
  }

  function indentTwo(value) {
    return String(value || "").split("\n").map(line => `    ${line}`).join("\n");
  }

  global.TallySync = Object.freeze({
    DEFAULT_HSN,
    defaultSettings,
    normalizeSettings,
    buildMastersXml,
    buildVouchersXml,
    parseDataXml,
    parseMastersXml,
    tallyDate
  });
})(globalThis);
