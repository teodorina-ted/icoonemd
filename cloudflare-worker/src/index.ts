/**
 * EFFLEURE · ICOONE Massage Chișinău
 * Cloudflare Worker — Production
 * ─────────────────────────────────────────────────────────────────────────────
 * Routes
 *   POST /submit-lead   →  validate → D1 insert → email + WA notify → GA4 event
 *   GET  /reviews       →  serve cached Google reviews from KV
 *   GET  /health        →  simple liveness check
 *   Cron (every 24 h)   →  refresh Google reviews into KV
 *
 * Env vars (set in Cloudflare dashboard → Workers → Settings → Variables)
 * ─────────────────────────────────────────────────────────────────────────────
 * TO_EMAIL          icoone.md@gmail.com
 * FROM_EMAIL        leads@icoonemassagechisinau.com
 * FROM_NAME         EFFLEURE Web
 * DKIM_KEY          (base64 private key – optional, improves deliverability)
 *
 * WA_TOKEN          WhatsApp Cloud API bearer token  (Meta Business)
 * WA_PHONE_ID       Meta Phone-Number ID
 * WA_RECIPIENT      37368323861  (no +)
 *
 * GA4_MEASUREMENT_ID   G-XXXXXXXXXX
 * GA4_API_SECRET       your Measurement Protocol API secret
 *
 * GOOGLE_PLACES_API_KEY   AIza…
 * GOOGLE_PLACE_ID         ChIJ…
 *
 * Bindings (wrangler.toml)
 *   DB   → D1 database  (effleure_db)
 *   KV   → KV namespace (effleure_kv)
 */

export interface Env {
  DB: D1Database;
  KV: KVNamespace;

  TO_EMAIL: string;
  FROM_EMAIL: string;
  FROM_NAME: string;
  DKIM_KEY?: string;

  WA_TOKEN?: string;
  WA_PHONE_ID?: string;
  WA_RECIPIENT?: string;

  GA4_MEASUREMENT_ID?: string;
  GA4_API_SECRET?: string;

  GOOGLE_PLACES_API_KEY?: string;
  GOOGLE_PLACE_ID?: string;
}

// ─── CORS ────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "https://icoonemassagechisinau.com",
  "https://www.icoonemassagechisinau.com",
];

function corsHeaders(origin: string): HeadersInit {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function respond(body: unknown, status: number, origin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

// ─── Validation ──────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s\-().]{8,20}$/;

interface LeadPayload {
  name: string;
  email?: string;
  phone: string;
  message?: string;
  service?: string;
  gclid?: string;
}

function validateLead(raw: Record<string, unknown>): { ok: true; data: LeadPayload } | { ok: false; error: string } {
  const name = String(raw.name ?? "").trim();
  const email = String(raw.email ?? "").trim();
  const phone = String(raw.phone ?? raw.contact ?? "").trim();
  const message = String(raw.message ?? "").trim();
  const service = String(raw.service ?? "General").trim();
  const gclid = String(raw.gclid ?? "").trim();

  if (name.length < 2) return { ok: false, error: "Name too short" };
  if (email && !EMAIL_RE.test(email)) return { ok: false, error: "Invalid email" };
  if (!PHONE_RE.test(phone)) return { ok: false, error: "Invalid phone" };

  return { ok: true, data: { name, email: email || undefined, phone, message, service, gclid: gclid || undefined } };
}

// ─── D1: insert lead ─────────────────────────────────────────────────────────
async function insertLead(db: D1Database, d: LeadPayload): Promise<void> {
  await db
    .prepare(
      `INSERT INTO leads (name, email, phone, message, service, gclid, created_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
    )
    .bind(d.name, d.email ?? null, d.phone, d.message ?? null, d.service ?? "General", d.gclid ?? null)
    .run();
}

// ─── Email via MailChannels ───────────────────────────────────────────────────
async function sendEmail(env: Env, d: LeadPayload): Promise<void> {
  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:28px;background:#fff3f5;border-radius:14px;">
      <h2 style="color:#832734;margin:0 0 18px">🔥 Lead nou — ${d.service}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:7px 0;color:#888;width:110px;">Serviciu</td><td style="padding:7px 0;font-weight:700;color:#832734;">${d.service}</td></tr>
        <tr><td style="padding:7px 0;color:#888;">Nume</td><td style="padding:7px 0;">${d.name}</td></tr>
        <tr><td style="padding:7px 0;color:#888;">Telefon</td><td style="padding:7px 0;"><a href="tel:${d.phone}" style="color:#832734;">${d.phone}</a></td></tr>
        ${d.email ? `<tr><td style="padding:7px 0;color:#888;">Email</td><td style="padding:7px 0;">${d.email}</td></tr>` : ""}
        <tr><td style="padding:7px 0;color:#888;vertical-align:top;">Mesaj</td><td style="padding:7px 0;">${d.message || "—"}</td></tr>
        ${d.gclid ? `<tr><td style="padding:7px 0;color:#888;">GCLID</td><td style="padding:7px 0;font-size:11px;word-break:break-all;color:#aaa;">${d.gclid}</td></tr>` : ""}
      </table>
      <hr style="margin:22px 0;border:none;border-top:1px solid #f0c0c8;"/>
      <p style="color:#bbb;font-size:11px;margin:0;">icoonemassagechisinau.com · EFFLEURE S.R.L.</p>
    </div>`;

  const body = {
    personalizations: [
      {
        to: [{ email: env.TO_EMAIL || "icoone.md@gmail.com" }],
        ...(env.DKIM_KEY
          ? { dkim_domain: "icoonemassagechisinau.com", dkim_selector: "mailchannels", dkim_private_key: env.DKIM_KEY }
          : {}),
      },
    ],
    from: { email: env.FROM_EMAIL || "leads@icoonemassagechisinau.com", name: env.FROM_NAME || "EFFLEURE Web" },
    subject: `🔥 Lead nou: ${d.name} — ${d.service}`,
    content: [
      { type: "text/plain", value: `Lead: ${d.name} | ${d.phone} | ${d.service}\n${d.message || ""}` },
      { type: "text/html", value: html },
    ],
  };

  await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ─── WhatsApp Cloud API ───────────────────────────────────────────────────────
async function sendWhatsApp(env: Env, d: LeadPayload): Promise<void> {
  if (!env.WA_TOKEN || !env.WA_PHONE_ID || !env.WA_RECIPIENT) return;

  const text =
    `🔥 *LEAD NOU* — ${d.service}\n` +
    `👤 Nume: ${d.name}\n` +
    `📞 Telefon: ${d.phone}\n` +
    (d.email ? `📧 Email: ${d.email}\n` : "") +
    `💬 Mesaj: ${d.message || "—"}`;

  await fetch(`https://graph.facebook.com/v19.0/${env.WA_PHONE_ID}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.WA_TOKEN}`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: env.WA_RECIPIENT,
      type: "text",
      text: { body: text },
    }),
  });
}

// ─── GA4 Measurement Protocol (server-side conversion) ───────────────────────
async function fireGA4Event(env: Env, d: LeadPayload, clientIp: string): Promise<void> {
  if (!env.GA4_MEASUREMENT_ID || !env.GA4_API_SECRET) return;

  const payload = {
    client_id: d.gclid ?? `server_${Date.now()}`,
    events: [
      {
        name: "generate_lead",
        params: {
          currency: "MDL",
          value: 1100,               // avg procedure value
          source: "website_form",
          service: d.service,
          ...(d.gclid ? { gclid: d.gclid } : {}),
        },
      },
    ],
  };

  await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${env.GA4_MEASUREMENT_ID}&api_secret=${env.GA4_API_SECRET}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
}

// ─── Google Reviews background refresh ───────────────────────────────────────
async function refreshReviews(env: Env): Promise<void> {
  if (!env.GOOGLE_PLACES_API_KEY || !env.GOOGLE_PLACE_ID) return;

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${env.GOOGLE_PLACE_ID}` +
    `&fields=reviews,rating,user_ratings_total` +
    `&reviews_sort=newest` +
    `&language=ro` +
    `&key=${env.GOOGLE_PLACES_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) return;

  const data = (await res.json()) as {
    result?: {
      reviews?: { author_name: string; rating: number; text: string; relative_time_description: string }[];
      rating?: number;
      user_ratings_total?: number;
    };
  };

  const result = data.result;
  if (!result) return;

  // Keep only 4★ and 5★ reviews, newest first, max 10
  const filtered = (result.reviews ?? [])
    .filter((r) => r.rating >= 4)
    .slice(0, 10);

  const payload = {
    reviews: filtered,
    rating: result.rating ?? null,
    total: result.user_ratings_total ?? null,
    refreshed_at: new Date().toISOString(),
  };

  await env.KV.put("cached_reviews", JSON.stringify(payload), {
    expirationTtl: 60 * 60 * 26, // 26 h — a bit more than cron interval
  });
}

// ─── Route handlers ───────────────────────────────────────────────────────────
async function handleSubmitLead(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin") ?? "";

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return respond({ ok: false, error: "Bad request" }, 400, origin);
  }

  const validation = validateLead(raw);
  if (!validation.ok) {
    return respond({ ok: false, error: validation.error }, 422, origin);
  }

  const { data } = validation;
  const clientIp = request.headers.get("CF-Connecting-IP") ?? "";

  try {
    // All four run in parallel; individual failures are non-fatal
    await Promise.allSettled([
      insertLead(env.DB, data),
      sendEmail(env, data),
      sendWhatsApp(env, data),
      fireGA4Event(env, data, clientIp),
    ]);

    return respond({ ok: true }, 200, origin);
  } catch (err) {
    console.error("submit-lead error:", err);
    return respond({ ok: false, error: "Server error" }, 500, origin);
  }
}

async function handleGetReviews(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin") ?? "";

  const cached = await env.KV.get("cached_reviews");
  if (cached) {
    return new Response(cached, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
        ...corsHeaders(origin),
      },
    });
  }

  // KV empty → try a live fetch (first load / cold start)
  await refreshReviews(env).catch(() => null);
  const fresh = await env.KV.get("cached_reviews");

  return new Response(fresh ?? JSON.stringify({ reviews: [], rating: null, total: null }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
      ...corsHeaders(origin),
    },
  });
}

// ─── Main entry point ─────────────────────────────────────────────────────────
export default {
  // HTTP handler
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    const { pathname } = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (pathname === "/submit-lead" && request.method === "POST") {
      return handleSubmitLead(request, env);
    }

    if (pathname === "/reviews" && request.method === "GET") {
      return handleGetReviews(request, env);
    }

    if (pathname === "/health") {
      return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not found", { status: 404 });
  },

  // Cron handler — runs every 24 h
  async scheduled(_event: ScheduledEvent, env: Env): Promise<void> {
    await refreshReviews(env);
  },
};
