# EFFLEURE Worker — Deployment Guide

## 1. Prerequisites
```bash
npm install -g wrangler
wrangler login          # authenticates with your Cloudflare account
```

## 2. Create D1 database
```bash
cd cloudflare-worker
wrangler d1 create effleure_db
# → Copy the database_id and paste it into wrangler.toml  [d1_databases] → database_id
```

## 3. Create KV namespace
```bash
wrangler kv:namespace create effleure_kv
# → Copy the id and paste it into wrangler.toml  [kv_namespaces] → id
```

## 4. Initialize D1 schema
```bash
wrangler d1 execute effleure_db --remote --file=schema.sql
```

## 5. Set secrets (never commit these to git)
```bash
wrangler secret put TO_EMAIL          # icoone.md@gmail.com
wrangler secret put WA_TOKEN          # Meta WhatsApp Cloud API token
wrangler secret put WA_PHONE_ID       # Meta Phone Number ID
wrangler secret put WA_RECIPIENT      # 37368323861
wrangler secret put GA4_MEASUREMENT_ID   # G-XXXXXXXXXX
wrangler secret put GA4_API_SECRET       # from GA4 → Admin → Data Streams → MP secret
wrangler secret put GOOGLE_PLACES_API_KEY
wrangler secret put GOOGLE_PLACE_ID      # ChIJ...
```

## 6. Deploy
```bash
wrangler deploy --env production
```
Worker is now live at `https://icoonemassagechisinau.com/api/*`

## 7. Update frontend
In `src/components/LeadFormSection.tsx`, change:
```ts
const WORKER_URL = "https://icoonemassagechisinau.com/api/submit-lead";
```

In `src/components/ReviewsSection.tsx`, change the fetch URL to:
```ts
const REVIEWS_URL = "https://icoonemassagechisinau.com/api/reviews";
```

## 8. WhatsApp Cloud API setup (Meta)
1. Go to https://developers.facebook.com → My Apps → Create App → Business
2. Add "WhatsApp" product
3. Under WhatsApp → API Setup: copy Phone Number ID and generate token
4. Add your phone number (+37368323861) as a recipient
5. Set `WA_TOKEN` and `WA_PHONE_ID` secrets as above

## 9. View leads in D1
```bash
wrangler d1 execute effleure_db --remote --command "SELECT * FROM leads ORDER BY created_at DESC LIMIT 20"
```

## Endpoints
| Method | Path           | Description                          |
|--------|----------------|--------------------------------------|
| POST   | /api/submit-lead | Submit lead form                   |
| GET    | /api/reviews   | Get cached Google reviews            |
| GET    | /api/health    | Health check                         |

## Cron
Reviews are refreshed every 24h automatically (midnight UTC).
Force a manual refresh:
```bash
wrangler d1 execute effleure_db --remote --command "SELECT 1"  # keep-alive
# Or trigger the scheduled event in the Cloudflare dashboard → Workers → Triggers
```
