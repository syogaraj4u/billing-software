# Billing Software

Browser-based cloud billing software for purchase entry, sales entry, purchase order generation, 8 GST profiles, inventory, invoice printing, reports, purchase invoice upload, e-way JSON export, ChatGPT-assisted drafts, monthly email reports, and Supabase-backed multi-user sync.

## Features

- Sales entry
- Chat sale bill draft from simple customer/item text
- Purchase entry
- Purchase order generation without changing stock
- 8 GST business profiles
- Item master
- Party master
- Stock updates
- CGST, SGST and IGST split calculation
- Purchase invoice PDF/image upload with buyer/seller GST review
- Purchase bill selection and e-way JSON export
- Purchase register CSV download for Excel
- GST reports
- Printable invoice format
- PWA support
- Supabase login and cloud workspace sync
- Share a workspace with staff by email
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

## OpenAI and Email Setup

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
supabase secrets set RESEND_API_KEY=your-resend-key
supabase secrets set REPORT_FROM_EMAIL=reports@yourdomain.com
```

The OpenAI model is intentionally configurable so you can change it later without editing the website.

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
