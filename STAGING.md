# Staging Environment

Production and staging are published from the same GitHub Pages artifact:

- Production: `https://billing.nirvanasolutions.in/`
- Staging: `https://billing.nirvanasolutions.in/staging/`

The staging site reads code from the `staging` branch and must use a separate Supabase project. A red `STAGING` marker and `noindex` metadata make it harder to confuse with production.

## GitHub Setup

1. Open the repository **Settings > Environments**.
2. Create an environment named `staging`.
3. Add these environment secrets:

   - `STAGING_SUPABASE_URL`
   - `STAGING_SUPABASE_ANON_KEY`
   - `STAGING_SUPABASE_PROJECT_ID`
   - `STAGING_DATABASE_URL`
   - `SUPABASE_ACCESS_TOKEN`
   - `STAGING_TEST_EMAIL`
   - `STAGING_TEST_PASSWORD`

4. Add required reviewers to the `staging` environment if every deployment should need approval.
5. Open **Settings > Pages > Build and deployment** and select **GitHub Actions** as the source.
6. Protect `main` and require the `Billing quality gate / Logic, build and browser tests` check before merging.

`STAGING_DATABASE_URL` is the staging database connection string, including its password. Never use the production connection string for this secret.

## Staging Supabase

Create a new Supabase project with no production data. Configure its Auth URL settings with:

- Site URL: `https://billing.nirvanasolutions.in/staging/`
- Redirect URL: `https://billing.nirvanasolutions.in/staging/**`

Run **Deploy staging Supabase** once from GitHub Actions. It applies `supabase-schema.sql` and deploys all Edge Functions. Configure staging-only OpenAI, Google Routes and email secrets in that Supabase project.

Create a normal staging Auth user for `STAGING_TEST_EMAIL`. The live smoke test only signs in, opens each company, and checks the deployed UI; it does not create billing records.

## Release Flow

1. Commit new work to `staging`.
2. GitHub runs syntax, regression, native build, desktop browser and mobile browser tests.
3. Review the staging app using test data.
4. Merge the tested `staging` commit into `main`.
5. GitHub republishes production only after the same release gate passes.

The browser test cloud is a local deterministic fake. Automated tests never sign in to production or change production billing data.
