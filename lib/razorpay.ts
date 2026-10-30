import crypto from "node:crypto";
import { consultation, course, inr, owner } from "@/lib/site";
import { esc, sendMail } from "@/lib/mail";

/** Server-only Razorpay helpers. Never import this file from a client component. */

const API = "https://api.razorpay.com/v1";

// Strips spaces, line breaks and quotes that often sneak in when pasting into Vercel.
const clean = (v?: string) => (v ?? "").trim().replace(/^["']|["']$/g, "").trim();

function creds() {
  const id = clean(process.env.RAZORPAY_KEY_ID);
  const secret = clean(process.env.RAZORPAY_KEY_SECRET);
  if (!id || !secret) {
    console.error("[razorpay] RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in this deployment's environment.");
    throw new RazorpayError(401, "Razorpay keys are not set");
  }
  return { id, secret };
}

async function rzp<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const { id, secret } = creds();
  const res = await fetch(`${API}${path}`, {
    method: init.method ?? "GET",
    headers: {
      Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
      "Content-Type": "application/json",
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (res.status === 401) {
    console.error(
      `[razorpay] Razorpay rejected the API keys (401). Key ID in use: ${id.slice(0, 13)}… (${
        id.startsWith("rzp_live_") ? "LIVE" : id.startsWith("rzp_test_") ? "TEST" : "UNKNOWN FORMAT"
      }), secret length: ${secret.length}. RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be a matching pair from the same mode; regenerate both if unsure.`,
    );
  }
  if (!res.ok) throw new RazorpayError(res.status, `Razorpay ${res.status}: ${JSON.stringify(json)}`);
  return json as T;
}

export class RazorpayError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/** Razorpay's minimum order amount is 100 paise (₹1). */
export const MIN_AMOUNT_PAISE = 100;

export type Notes = Record<string, string>;
export type Order = { id: string; amount: number; currency: string; status: string; notes: Notes | [] };
export type Payment = {
  id: string;
  amount: number;
  currency: string;
  status: "created" | "authorized" | "captured" | "refunded" | "failed";
  order_id: string;
  method: string;
  created_at: number;
  notes: Notes | [];
};

export const publicKeyId = () => creds().id;

export function createOrder(amountRupees: number, receipt: string, notes: Notes) {
  const amount = Math.round(amountRupees * 100);
  if (!Number.isInteger(amount) || amount < MIN_AMOUNT_PAISE) {
    throw new RazorpayError(400, `Amount must be at least ${MIN_AMOUNT_PAISE} paise`);
  }
  return rzp<Order>("/orders", {
    method: "POST",
    body: { amount, currency: "INR", receipt: receipt.slice(0, 40), notes },
  });
}

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

/** Signature Razorpay Checkout returns to the browser after a successful payment. */
export function checkoutSignatureOk(orderId: string, paymentId: string, signature: string) {
  const expected = crypto.createHmac("sha256", creds().secret).update(`${orderId}|${paymentId}`).digest("hex");
  return safeEqual(expected, signature);
}

/** Signature on webhook calls, made with the webhook secret you set in the Razorpay dashboard. */
export function webhookSignatureOk(rawBody: string, signature: string) {
  const secret = clean(process.env.RAZORPAY_WEBHOOK_SECRET);
  if (!secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return safeEqual(expected, signature);
}

const asNotes = (n: Notes | [] | undefined): Notes => (n && !Array.isArray(n) ? n : {});
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type FulfilResult =
  | { ok: true; paymentId: string; amount: number; email: string; emailed: boolean }
  | { ok: false; reason: string };

/**
 * Confirms a payment with Razorpay (never trusting the browser), captures it if needed,
 * and sends the confirmation emails once. Called by both /verify and the webhook, so a
 * student who closes the tab straight after paying still gets their email.
 */
export async function fulfil(paymentId: string, opts: { orderId?: string; source: "verify" | "webhook" }): Promise<FulfilResult> {
  let payment = await rzp<Payment>(`/payments/${encodeURIComponent(paymentId)}`);
  if (opts.orderId && payment.order_id !== opts.orderId) return { ok: false, reason: "Order mismatch" };

  if (payment.status === "authorized") {
    payment = await rzp<Payment>(`/payments/${payment.id}/capture`, {
      method: "POST",
      body: { amount: payment.amount, currency: payment.currency },
    }).catch(async () => rzp<Payment>(`/payments/${payment.id}`)); // already auto-captured
  }
  if (payment.status !== "captured") return { ok: false, reason: `Payment is ${payment.status}` };

  const order = await rzp<Order>(`/orders/${payment.order_id}`);
  if (order.amount !== payment.amount) return { ok: false, reason: "Amount mismatch" };

  const d = asNotes(order.notes);
  const result = { ok: true as const, paymentId: payment.id, amount: payment.amount / 100, email: d.email ?? "" };

  // Send the emails only once per payment (verify and webhook can both arrive).
  if (asNotes(payment.notes).mailed === "1") return { ...result, emailed: true };
  if (opts.source === "webhook") {
    await sleep(6000); // let the browser's /verify call go first
    const again = await rzp<Payment>(`/payments/${payment.id}`);
    if (asNotes(again.notes).mailed === "1") return { ...result, emailed: true };
  }

  let emailed = false;
  try {
    emailed = await sendConfirmationEmails(payment, d);
    if (emailed) {
      await rzp(`/payments/${payment.id}`, {
        method: "PATCH",
        body: { notes: { ...asNotes(payment.notes), mailed: "1" } },
      }).catch(() => {});
    }
  } catch (err) {
    console.error("Confirmation email failed", err);
  }
  return { ...result, emailed };
}

/* ---------------- emails ---------------- */

const LABELS: [string, string][] = [
  ["name", "Name"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["item", "For"],
  ["plan", "Payment plan"],
  ["level", "Experience"],
  ["batch", "Preferred batch"],
  ["date", "Preferred date"],
  ["time", "Preferred time (IST)"],
  ["topic", "Topic"],
  ["notes", "Notes"],
];

function rows(d: Notes, keys: string[]) {
  return LABELS.filter(([k]) => keys.includes(k) && d[k]).map(([k, label]) => [label, d[k]] as const);
}

function table(r: readonly (readonly [string, string])[]) {
  return `<table cellpadding="6" style="border-collapse:collapse;font-size:14px">${r
    .map(
      ([k, v]) =>
        `<tr><td style="color:#56636f;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="color:#15202b">${esc(v)}</td></tr>`,
    )
    .join("")}</table>`;
}

function wrap(title: string, inner: string) {
  return `<!doctype html><html><body style="margin:0;background:#eff1ee;font-family:Arial,Helvetica,sans-serif;color:#15202b">
<div style="max-width:560px;margin:0 auto;padding:28px 20px">
<div style="background:#fff;border:1px solid #cfd5d0;border-radius:6px;padding:28px">
<div style="font-size:13px;letter-spacing:.08em;color:#e02a26;font-weight:bold">REDROOT</div>
<h1 style="font-size:22px;margin:10px 0 16px">${esc(title)}</h1>${inner}
</div></div></body></html>`;
}

/** Where student replies go. Set REPLY_TO_EMAIL in Vercel to change it without editing code. */
const replyTo = () => process.env.REPLY_TO_EMAIL?.trim() || owner.email;

const P = (html: string, extra = "") => `<p style="margin:0 0 14px;line-height:1.6${extra}">${html}</p>`;
const box = (inner: string, color = "#e02a26") =>
  `<div style="border-left:3px solid ${color};background:#f6f7f5;padding:14px 16px;margin:18px 0;line-height:1.6">${inner}</div>`;

function syllabusHtml() {
  return course.modules
    .map((m, i) => {
      const certs = "certs" in m && m.certs ? `<div style="font-size:13px;margin-top:6px"><b>Prepares you for:</b> ${esc(m.certs)}</div>` : "";
      const outcome = m.outcome ? `<div style="margin-top:6px"><b>You will learn to:</b> ${esc(m.outcome)}</div>` : "";
      const topics = `<ul style="margin:8px 0 0;padding-left:18px">${m.topics.map((t) => `<li style="margin:3px 0">${esc(t)}</li>`).join("")}</ul>`;
      const extras = [
        m.handsOn && `<b>Hands-on:</b> ${esc(m.handsOn)}`,
        m.project && `<b>Module project:</b> ${esc(m.project)}`,
        "result" in m && m.result && `<b>Outcome:</b> ${esc(m.result)}`,
      ].filter(Boolean);
      return `<div style="border-top:1px solid #cfd5d0;padding:16px 0">
<div style="font-size:12px;color:#56636f;letter-spacing:.04em;text-transform:uppercase">${esc(m.months)}</div>
<div style="font-size:17px;font-weight:bold;margin-top:2px"><span style="color:#e02a26">Module ${i}:</span> ${esc(m.title)}</div>
<div style="color:#e02a26;font-style:italic;margin-top:4px">“${esc(m.tagline)}”</div>
<div style="color:#56636f;margin-top:6px">${esc(m.summary)}</div>${certs}${outcome}${topics}
${extras.length ? `<div style="margin-top:8px;font-size:14px">${extras.join("<br>")}</div>` : ""}
</div>`;
    })
    .join("");
}

function syllabusText() {
  return course.modules
    .map((m, i) => {
      const lines = [`MODULE ${i}: ${m.title.toUpperCase()} (${m.months})`, `"${m.tagline}"`, m.summary];
      if ("certs" in m && m.certs) lines.push(`Prepares you for: ${m.certs}`);
      if (m.outcome) lines.push(`You will learn to: ${m.outcome}`);
      lines.push(...m.topics.map((t) => `  - ${t}`));
      if (m.handsOn) lines.push(`Hands-on: ${m.handsOn}`);
      if (m.project) lines.push(`Module project: ${m.project}`);
      if ("result" in m && m.result) lines.push(`Outcome: ${m.result}`);
      return lines.join("\n");
    })
    .join("\n\n");
}

async function sendConfirmationEmails(p: Payment, d: Notes) {
  const amount = inr(p.amount / 100);
  const when = new Date(p.created_at * 1000).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const isCourse = d.kind === "enrollment";
  const first = (d.name || "there").split(" ")[0];
  const reply = replyTo();
  const receipt: (readonly [string, string])[] = [
    ["Amount paid", amount],
    ["Payment ID", p.id],
    ["Paid on", `${when} IST`],
    ["Method", p.method?.toUpperCase() ?? "-"],
  ];
  const sign = `<p style="margin-top:24px;line-height:1.5">Agampreet Singh<br><span style="color:#56636f">RedRoot</span></p>`;

  let subject: string, html: string, text: string;

  if (isCourse) {
    const details = rows(d, ["item", "plan", "batch", "level"]);
    subject = `Welcome to ${course.title}: payment received (${amount})`;
    html = wrap(
      `Welcome to ${course.title}!`,
      P(`Hi ${esc(first)},`) +
        P(`Your payment of <b>${esc(amount)}</b> was received and your seat is confirmed. Welcome aboard. From here on, you're learning real offensive security.`) +
        table([...receipt, ...details]) +
        box(
          `<b>Next step: your 30-minute placement interview</b><br>${esc(course.placementInterview)}<br><br>` +
            `I'll email you within <b>48 hours</b> to schedule it. After the interview, you'll receive your batch schedule and joining details.`,
        ) +
        `<h2 style="font-size:19px;margin:26px 0 4px">Your full syllabus</h2>` +
        P(`${course.modules.length} modules over ${course.months} months. ${esc(course.format)}.`, ";color:#56636f") +
        P(esc(course.intro)) +
        syllabusHtml() +
        `<div style="border-top:1px solid #cfd5d0;padding-top:16px"><b>What's included</b><ul style="margin:8px 0 0;padding-left:18px">${course.includes
          .map((x) => `<li style="margin:3px 0">${esc(x)}</li>`)
          .join("")}</ul></div>` +
        box(`<b>Any questions?</b> Just reply to this email and it comes straight to me at <a href="mailto:${esc(reply)}">${esc(reply)}</a>.`, "#3fb68b") +
        sign,
    );
    text = [
      `Hi ${first},`,
      "",
      `Your payment of ${amount} was received and your seat is confirmed. Welcome to ${course.title}!`,
      "",
      ...[...receipt, ...details].map(([k, v]) => `${k}: ${v}`),
      "",
      "NEXT STEP: YOUR 30-MINUTE PLACEMENT INTERVIEW",
      course.placementInterview,
      "I'll email you within 48 hours to schedule it. After the interview, you'll receive your batch schedule and joining details.",
      "",
      `YOUR FULL SYLLABUS: ${course.modules.length} modules over ${course.months} months`,
      course.intro,
      "",
      syllabusText(),
      "",
      "WHAT'S INCLUDED",
      ...course.includes.map((x) => `  - ${x}`),
      "",
      `Any questions? Just reply to this email (${reply}).`,
      "",
      "Agampreet Singh",
      "RedRoot",
    ].join("\n");
  } else {
    const session: (readonly [string, string])[] = [
      ["Session", `1:1 career consultation (${consultation.minutes} minutes)`],
      ["Platform", "Google Meet"],
      ...rows(d, ["topic", "date", "time"]),
    ];
    subject = `Your 1:1 session is booked: payment received (${amount})`;
    html = wrap(
      "Your 1:1 session is booked!",
      P(`Hi ${esc(first)},`) +
        P(`Your payment of <b>${esc(amount)}</b> was received and your ${consultation.minutes}-minute 1:1 session with Agampreet is booked.`) +
        table([...session, ...receipt]) +
        box(
          `<b>Meeting details</b><br>` +
            `📹 <b>Platform:</b> Google Meet<br>` +
            `🔗 <b>Meeting link:</b> will be shared with you by email within <b>48 hours</b>.<br>` +
            `If your preferred slot isn't available, I'll suggest the closest one.`,
        ) +
        P(`To get the most out of the session, note down your questions and keep your resume, portfolio or GitHub link handy.`) +
        box(`<b>Any questions?</b> Just reply to this email and it comes straight to me at <a href="mailto:${esc(reply)}">${esc(reply)}</a>.`, "#3fb68b") +
        sign,
    );
    text = [
      `Hi ${first},`,
      "",
      `Your payment of ${amount} was received and your ${consultation.minutes}-minute 1:1 session with Agampreet is booked.`,
      "",
      ...[...session, ...receipt].map(([k, v]) => `${k}: ${v}`),
      "",
      "MEETING DETAILS",
      "Platform: Google Meet",
      "Meeting link: will be shared with you by email within 48 hours.",
      "If your preferred slot isn't available, I'll suggest the closest one.",
      "",
      "To get the most out of the session, note down your questions and keep your resume, portfolio or GitHub link handy.",
      "",
      `Any questions? Just reply to this email (${reply}).`,
      "",
      "Agampreet Singh",
      "RedRoot",
    ].join("\n");
  }

  let sentStudent = false;
  if (d.email) {
    sentStudent = await sendMail({ to: d.email, replyTo: reply, idempotencyKey: `student-${p.id}`, subject, text, html });
  }

  const ownerTo = process.env.NOTIFY_EMAIL || owner.email;
  const all = rows(d, LABELS.map(([k]) => k));
  await sendMail({
    to: ownerTo,
    replyTo: d.email || undefined,
    idempotencyKey: `owner-${p.id}`,
    subject: `Paid ${amount}: ${isCourse ? "course enrollment" : "1:1 booking"} by ${d.name || "unknown"}`,
    text: [...receipt, ...all].map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: wrap(`New ${isCourse ? "enrollment" : "1:1 booking"}: ${amount} paid`, table([...receipt, ...all])),
  });

  return sentStudent;
}
