import { NextResponse } from "next/server";
import { checkoutSignatureOk, fulfil } from "@/lib/razorpay";

export const runtime = "nodejs";
export const maxDuration = 30;

/** Called by the browser right after Razorpay Checkout reports success. */
export async function POST(req: Request) {
  let b: { orderId?: string; paymentId?: string; signature?: string };
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  const { orderId, paymentId, signature } = b;
  if (!orderId || !paymentId || !signature || !checkoutSignatureOk(orderId, paymentId, signature)) {
    return NextResponse.json({ ok: false, error: "Payment could not be verified." }, { status: 400 });
  }

  try {
    const r = await fulfil(paymentId, { orderId, source: "verify" });
    if (!r.ok) return NextResponse.json({ ok: false, error: r.reason }, { status: 409 });
    return NextResponse.json(r);
  } catch (err) {
    console.error("Verify failed", err);
    return NextResponse.json({ ok: false, error: "Could not confirm the payment yet." }, { status: 502 });
  }
}
