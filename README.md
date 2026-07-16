# Billing Software

Browser-based cloud billing software for purchase entry, sales entry, purchase order generation, 8 GST profiles, inventory, invoice printing, reports, purchase invoice upload, e-way JSON export, ChatGPT-assisted drafts, monthly email reports, and Supabase-backed multi-user sync.

## Features

- Sales entry
- Firm-specific credit notes with partial or full item returns
- Automatic linked purchase return for transactions between the 8 group firms
- Chat sale bill draft from simple customer/item text
- Purchase entry
- Purchase order generation without changing stock
- 8 GST business profiles
- Item master
- Party master
- Stock updates
- CGST, SGST and IGST split calculation
- Multi-invoice purchase inbox with concurrent extraction, buyer/seller GST review and bulk approval
- Purchase bill selection and e-way JSON export
- Purchase register CSV download for Excel
- GST reports
- Printable invoice format
- PWA support
- Supabase login and cloud workspace sync
- Share a workspace with staff by email
- Bank/card statement import and purchase/sale reconciliation
- Reviewed Tally XML import for masters, sales, purchases, credit notes, debit notes and cancellations
- Duplicate-safe Tally master and voucher exports
- Supabase Edge Function scaffolds for OpenAI extraction and month-end email

## GitHub Pages

This app is static HTML, CSS, and JavaScript, so it can run on GitHub Pages.

Publish from the `main` branch root folder.

## Cloud Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run the SQL from `supabase-schema.sql`.
4. Open Supabase Project Settings > API.
5. Copy the Project URL and anon public key into `cloud-config.js`.

```js
window.CLOUD_CONFIG = {
  supabaseUrl: "https://your-project.supabase.co",
  supabaseAnonKey: "your-anon-public-key"
};
```

6. Deploy the site again and refresh the browser.
7. Open the app, click Cloud, create an account, and create/sync a workspace.

## OpenAI, Google Maps and Email Setup

OpenAI calls must run in Supabase Edge Functions, not in browser JavaScript.

Deploy these functions from the `supabase/functions` folder:

- `parse-sale-chat`
- `extract-purchase-invoice`
- `estimate-eway-distance`
- `monthly-report`

Set these Supabase secrets:

```bash
supabase secrets set OPENAI_API_KEY=your-openai-key
supabase secrets set OPENAI_MODEL=your-selected-openai-model
supabase secrets set GOOGLE_MAPS_API_KEY=your-google-maps-key
# Optional preferred name for a Routes API-only restricted key:
# supabase secrets set GOOGLE_ROUTES_API_KEY=your-routes-key
supabase secrets set RESEND_API_KEY=your-resend-key
supabase secrets set REPORT_FROM_EMAIL=reports@yourdomain.com
```

The OpenAI model is intentionally configurable so you can change it later without editing the website.

The `estimate-eway-distance` function uses only Google Routes API for road distance between supplier and buyer/ship-to pincodes. Google keys must stay in Supabase secrets and should not be added to `cloud-config.js` or browser JavaScript.

Run `supabase/migrations/20260713161000_google_routes_safeguards.sql` before deploying the distance function. It adds a shared unordered PIN-pair cache, duplicate-request locks, and hard Google call limits of 60,000 per year, 5,000 per month, and 150 per day in the `Asia/Kolkata` timezone. Failed Google requests count because Google may still treat them as billable events, and the same PIN pair is not retried automatically after a failed attempt. Cached, same-PIN, configured, and manually confirmed distances do not count.

As a second protection layer, restrict the server key to Routes API in Google Cloud, configure the lowest practical Routes API quota, and add billing-budget alerts. The database hard limits remain authoritative because Google Cloud does not provide the app's calendar-year counter.

## Purchase Import Inbox

Run `supabase/migrations/20260716193000_purchase_import_inbox.sql` once, or rerun the complete `supabase-schema.sql`. This creates workspace-secured import batch and document tables so extracted invoice reviews are shared by every signed-in device.

Upload one or more purchase PDFs/images from Purchases. The app extracts two files at a time and keeps each result in the Invoice Inbox without changing purchases, stock, parties or items. The review stage checks the buyer against the eight GST firms, requires supplier GSTIN and PIN, applies the default `85171300` HSN, highlights tax differences, and blocks saved or same-batch duplicates. Ready invoices can be selected across different buyer companies and saved together; failed, incomplete and duplicate documents remain in the inbox for correction.

## Bank Reconciliation

Run `supabase/migrations/20260713180000_bank_reconciliation.sql` once, or rerun the complete `supabase-schema.sql`. This creates workspace-secured payment-source and bank-transaction tables and backfills any reconciliation data already stored in the workspace JSON.

In Banking, add or edit the company bank accounts and cards, then upload a CSV, XLS or XLSX statement for one selected account. Statement files are parsed in the browser. Only normalized transaction rows are synced to Supabase; the original statement file is not uploaded.

The app automatically matches a unique debit to a purchase and a unique credit to a sale when the date and amount are close. Ambiguous entries remain in Needs Review for manual confirmation. Books Missing shows bills without a statement match, Differences shows amount mismatches, and Due Payments estimates each configured credit card's statement-cycle debits less credits.

## Credit Notes

Run `supabase/migrations/20260716120000_credit_notes.sql` once, or rerun the complete `supabase-schema.sql`. The migration creates normalized credit-note, credit-note-item, purchase-return, and purchase-return-item tables and backfills any existing documents from workspace JSON.

Each firm has its own non-reusable credit-note sequence, such as `NS/CN/26-27/001` and `KN/CN/26-27/001`. A credit note can return all or part of an original sales invoice. Goods-return notes add the credited quantity back to seller stock; financial-only adjustments do not affect stock. When the buyer is one of the other group firms, the app creates and links the corresponding purchase return automatically.

## Tally Sync

Run `supabase/migrations/20260716163000_tally_sync.sql` once, or rerun the complete `supabase-schema.sql`. This adds workspace-secured Tally export/import history so duplicate protection is shared by all users and devices.

### From Tally to Billing

1. In Tally, export the required company masters and vouchers as XML.
2. In the billing app, select the matching GST company and open Tally Sync.
3. Under From Tally, select the XML file.
4. Review the party/item counts, sales, purchases, credit notes, debit notes, duplicates, skipped vouchers and warnings.
5. Apply Tally Data only after the review is correct.

The importer supports party and stock-item masters, sales, purchases, credit notes, debit notes/purchase returns and voucher cancellations. It preserves the Tally voucher number and date, prevents duplicate imports, enforces GSTIN and address requirements for B2B sales, applies the default `85171300` HSN rule, and creates linked internal purchases or purchase returns when a voucher is between two of the eight group firms. If the XML clearly identifies a different Tally company, the app blocks the import into the selected GST profile.

Imported entries, masters and sync history are saved through the normal local/cloud sync flow. The source XML file itself is not stored in Supabase; only its file name and the imported document metadata are retained.

### From Billing to Tally

Open Tally Sync for the selected GST company. Export Masters XML first, then export Vouchers XML for the required date range. Voucher files contain sales, purchases, credit notes, purchase returns, round-off entries and previously exported voucher cancellations. The app omits an already exported document unless Include previously exported is selected. Mark a download as Imported after Tally accepts it.

The company name, unit, godown, ledger names and voucher types are configurable separately for each GST profile. Tally-exported XML containing party ledgers and stock items can be reviewed before applying it to the shared party and item masters.

## Month-End Reports

In Settings, enter the email IDs under Monthly Report Email IDs.

The `monthly-report` Edge Function creates sales register, purchase register, GST summary and invoice soft-copy index CSV attachments for the selected month. It also tries to attach stored purchase invoice files from Supabase Storage when they are available within email size limits. A scheduled Supabase cron job can call the function at month end.

Example manual call body:

```json
{
  "month": "2026-06",
  "workspaceId": "your-workspace-id"
}
```

## Data Storage

When Supabase is configured and the user is signed in, data syncs to the selected cloud workspace. Staff can access the same workspace when their email is added in Cloud Workspace settings.

If Supabase is not configured or the user is signed out, the app still works with browser local storage.

Purchase invoice soft-copy uploads use the private `purchase-invoices` Supabase Storage bucket. If uploads show a row-level security or storage permission error, rerun the latest `supabase-schema.sql` in the Supabase SQL editor so the storage policies are refreshed.
