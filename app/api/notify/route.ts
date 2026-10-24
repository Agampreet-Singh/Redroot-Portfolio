import { NextResponse } from "next/server";

/**
 * Optional server-side copy of every enrollment / booking.
 * Set RESEND_API_KEY and NOTIFY_EMAIL in Vercel → Project → Settings → Environment Variables.
 * Without them this endpoint does nothing, and the site's email-the-screenshot flow still works.
 */
export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return new NextResponse(null, { status: 204 });

  let payload: { kind?: string; data?: Record<string, unknown> };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const kind = payload.kind === "enrollment" ? "Course enrollment" : "1:1 session booking";
  const entries = Object.entries(payload.data ?? {})
    .slice(0, 12)
    .map(([k, v]) => [String(k).slice(0, 40), String(v ?? "").slice(0, 2000)] as const);
  const name = entries.find(([k]) => k === "Name")?.[1] || "Unknown";
  const text = entries.map(([k, v]) => `${k}: ${v || "-"}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.NOTIFY_FROM || "RedRoot <onboarding@resend.dev>",
      to: [to],
      subject: `New ${kind.toLowerCase()}: ${name}`,
      text: `${kind} submitted on the website. Payment is not verified yet.\n\n${text}`,
    }),
  });

  return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : 502 });
}
