import nodemailer from "nodemailer";

/**
 * Sends one email. Two ways to configure it (set one in Vercel env vars):
 *
 *  A) Gmail (easiest, no domain needed): GMAIL_USER + GMAIL_APP_PASSWORD
 *     Mail goes out from your own Gmail address.
 *  B) Resend: RESEND_API_KEY + MAIL_FROM on a domain you verified in Resend.
 *
 * Returns false (and sends nothing) when neither is configured.
 */
type Mail = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  /** Used by Resend to drop accidental duplicates for 24h. */
  idempotencyKey?: string;
};

const fromName = () => process.env.MAIL_FROM_NAME || "RedRoot";

export function mailConfigured() {
  return Boolean(
    (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) ||
      (process.env.RESEND_API_KEY && process.env.MAIL_FROM),
  );
}

let transport: nodemailer.Transporter | null = null;

export async function sendMail(m: Mail): Promise<boolean> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    transport ??= nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: gmailUser, pass: gmailPass.replace(/\s+/g, "") },
    });
    await transport.sendMail({
      from: `"${fromName()}" <${gmailUser}>`,
      to: m.to,
      subject: m.subject,
      text: m.text,
      html: m.html,
      replyTo: m.replyTo,
    });
    return true;
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (key && from) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        ...(m.idempotencyKey ? { "Idempotency-Key": m.idempotencyKey } : {}),
      },
      body: JSON.stringify({
        from,
        to: [m.to],
        subject: m.subject,
        text: m.text,
        html: m.html,
        ...(m.replyTo ? { reply_to: m.replyTo } : {}),
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return true;
  }

  return false;
}

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
