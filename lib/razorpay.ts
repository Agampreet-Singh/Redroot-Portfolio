import crypto from "node:crypto";
import { consultation, inr, owner } from "@/lib/site";
import { esc, sendMail } from "@/lib/mail";

/** Server-only Razorpay helpers. Never import this file from a client component. */

const API = "https://api.razorpay.com/v1";

function creds() {
  const id = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!id || !secret) throw new Error("RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not set");
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
  if (!res.ok) throw new Error(`Razorpay ${res.status}: ${JSON.stringify(json)}`);
  return json as T;
}

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
  return rzp<Order>("/orders", {
    method: "POST",
    body: { amount: Math.round(amountRupees * 100), currency: "INR", receipt: receipt.slice(0, 40), notes },
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
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
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

async function sendConfirmationEmails(p: Payment, d: Notes) {
  const amount = inr(p.amount / 100);
  const when = new Date(p.created_at * 1000).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const isCourse = d.kind === "enrollment";
  const first = (d.name || "there").split(" ")[0];
  const receipt: [string, string][] = [
    ["Amount paid", amount],
    ["Payment ID", p.id],
    ["Paid on", `${when} IST`],
    ["Method", p.method?.toUpperCase() ?? "-"],
  ];

  const next = isCourse
    ? "You'll get your batch schedule and joining details by email within 48 hours."
    : `I'll email you the meeting link for your ${consultation.minutes}-minute session within 48 hours. If your preferred slot isn't free, I'll suggest the closest one.`;

  const details = rows(d, ["item", "plan", "batch", "level", "date", "time", "topic"]);

  let sentStudent = false;
  if (d.email) {
    sentStudent = await sendMail({
      to: d.email,
      replyTo: owner.email,
      idempotencyKey: `student-${p.id}`,
      subject: `Payment received: ${amount} | RedRoot`,
      text: [
        `Hi ${first},`,
        "",
        `Your payment of ${amount} was received. Thank you!`,
        "",
        ...receipt.map(([k, v]) => `${k}: ${v}`),
        ...details.map(([k, v]) => `${k}: ${v}`),
        "",
        next,
        "",
        `Questions? Just reply to this email.`,
        "",
        "Agampreet Singh (RedRoot)",
      ].join("\n"),
      html: wrap(
        "Payment received",
        `<p>Hi ${esc(first)},</p><p>Your payment of <b>${esc(amount)}</b> was received. Thank you!</p>
${table([...receipt, ...details])}
<p style="margin-top:18px">${esc(next)}</p>
<p>Questions? Just reply to this email.</p>
<p style="margin-top:22px">Agampreet Singh<br><span style="color:#56636f">RedRoot</span></p>`,
      ),
    });
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
