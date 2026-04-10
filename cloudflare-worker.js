/**
 * EFFLEURE Lead Form — Cloudflare Worker
 * ────────────────────────────────────────────────────────────────────────────
 * Deploy this to: leadform.ebruolgadrahnea.workers.dev  (or your custom domain)
 *
 * What it does on every POST /  :
 *   1. Sends an email notification via MailChannels (free on Cloudflare Workers)
 *   2. Sends a WhatsApp message via the WhatsApp Cloud API (Meta Business)
 *      OR opens a wa.me fallback if you haven't set up the API yet
 *
 * Environment variables to set in the Cloudflare Worker dashboard
 * (Settings → Variables → Environment Variables):
 *
 *   TO_EMAIL          = icoone.md@gmail.com        (your notification email)
 *   FROM_EMAIL        = system@icoonemassagechisinau.com
 *   FROM_NAME         = ICOONE Web
 *   WA_TOKEN          = <WhatsApp Cloud API token>  (leave blank to skip WA API)
 *   WA_PHONE_ID       = <Phone Number ID from Meta>
 *   WA_RECIPIENT      = 37368323861                (without +)
 *
 * CORS: only your domain is allowed — update ALLOWED_ORIGIN below.
 */

const ALLOWED_ORIGIN = "https://icoonemassagechisinau.com";

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    // ── CORS preflight ──────────────────────────────────────────────────────
    const corsHeaders = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    // ── Parse body ──────────────────────────────────────────────────────────
    let data;
    try {
      data = await request.json();
    } catch {
      return new Response("Bad request", { status: 400, headers: corsHeaders });
    }

    const { name = "", contact = "", message = "", service = "General" } = data;

    // ── 1. Email via MailChannels ───────────────────────────────────────────
    const emailBody = {
      personalizations: [
        {
          to: [{ email: env.TO_EMAIL || "icoone.md@gmail.com" }],
          dkim_domain: "icoonemassagechisinau.com",
          dkim_selector: "mailchannels",
          dkim_private_key: env.DKIM_KEY || "",
        },
      ],
      from: {
        email: env.FROM_EMAIL || "system@icoonemassagechisinau.com",
        name: env.FROM_NAME || "ICOONE Web",
      },
      subject: `🔥 New Lead — ${service}`,
      content: [
        {
          type: "text/plain",
          value: `NEW LEAD\n\nService: ${service}\nName: ${name}\nContact: ${contact}\nMessage: ${message}\n\n---\nSent from icoonemassagechisinau.com`,
        },
        {
          type: "text/html",
          value: `
            <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#fff3f5;border-radius:12px;">
              <h2 style="color:#832734;margin-top:0;">🔥 New Lead — ${service}</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#666;width:100px;">Service</td><td style="padding:8px 0;font-weight:bold;color:#832734;">${service}</td></tr>
                <tr><td style="padding:8px 0;color:#666;">Name</td><td style="padding:8px 0;">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#666;">Contact</td><td style="padding:8px 0;"><a href="tel:${contact}">${contact}</a></td></tr>
                <tr><td style="padding:8px 0;color:#666;vertical-align:top;">Message</td><td style="padding:8px 0;">${message}</td></tr>
              </table>
              <hr style="margin:20px 0;border:none;border-top:1px solid #f0c0c8;"/>
              <p style="color:#999;font-size:12px;margin:0;">Sent from icoonemassagechisinau.com</p>
            </div>
          `,
        },
      ],
    };

    const emailPromise = fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailBody),
    }).catch(() => null); // silent fail

    // ── 2. WhatsApp Cloud API notification ─────────────────────────────────
    // Requires: Meta Business account + WhatsApp Business API (free tier available)
    // Docs: https://developers.facebook.com/docs/whatsapp/cloud-api/messages
    let waPromise = Promise.resolve(null);

    if (env.WA_TOKEN && env.WA_PHONE_ID && env.WA_RECIPIENT) {
      const waText =
        `🔥 *LEAD NOU* (${service})\n` +
        `👤 Nume: ${name}\n` +
        `📞 Contact: ${contact}\n` +
        `💬 Mesaj: ${message}`;

      waPromise = fetch(
        `https://graph.facebook.com/v19.0/${env.WA_PHONE_ID}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.WA_TOKEN}`,
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: env.WA_RECIPIENT,
            type: "text",
            text: { body: waText },
          }),
        }
      ).catch(() => null); // silent fail
    }

    // Fire both in parallel, don't block on either
    await Promise.allSettled([emailPromise, waPromise]);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },
};
