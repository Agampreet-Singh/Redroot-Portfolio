import { NextResponse } from "next/server";
import { createOrder, publicKeyId, type Notes } from "@/lib/razorpay";
import { course, priceFor, type PaymentKind } from "@/lib/site";

export const runtime = "nodejs";

const ALLOWED = ["name", "email", "phone", "level", "batch", "date", "time", "topic", "notes"] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { kind?: string; planId?: string; fields?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const kind = body.kind as PaymentKind;
  if (kind !== "enrollment" && kind !== "consultation") {
    return NextResponse.json({ error: "Unknown checkout" }, { status: 400 });
  }
  const price = priceFor(kind, body.planId);
  if (!price) return NextResponse.json({ error: "Unknown payment plan" }, { status: 400 });

  const f = body.fields ?? {};
  const notes: Notes = { kind, item: kind === "enrollment" ? course.title : "1:1 session" };
  for (const k of ALLOWED) {
    const v = String(f[k] ?? "").trim().slice(0, 250); // Razorpay note values max 256 chars
    if (v) notes[k] = v;
  }
  if ("plan" in price && price.plan) notes.plan = `${price.plan.name} (${price.plan.schedule})`;

  if (!notes.name || !notes.email || !EMAIL.test(notes.email)) {
    return NextResponse.json({ error: "Please enter your name and a valid email." }, { status: 400 });
  }

  try {
    const order = await createOrder(price.amount, `${kind}-${Date.now()}`, notes);
    return NextResponse.json({
      keyId: publicKeyId(),
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      description: price.label,
      prefill: { name: notes.name, email: notes.email, contact: notes.phone ?? "" },
    });
  } catch (err) {
    console.error("Order creation failed", err);
    return NextResponse.json({ error: "Payments are temporarily unavailable. Please try again shortly." }, { status: 502 });
  }
}
