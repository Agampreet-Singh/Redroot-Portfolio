import { NextResponse } from "next/server";
import { fulfil, webhookSignatureOk } from "@/lib/razorpay";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * Razorpay → your site, server to server. Backup for when the student closes the tab
 * right after paying: they still get the confirmation email.
 * Set it up in Razorpay Dashboard → Accounts & Settings → Webhooks:
 *   URL: https://<your-domain>/api/payment/webhook   Events: payment.captured
 */
export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get("x-razorpay-signature") ?? "";
  if (!webhookSignatureOk(raw, sig)) return new NextResponse("Bad signature", { status: 400 });

  let event: { event?: string; payload?: { payment?: { entity?: { id?: string; order_id?: string } } } };
  try {
    event = JSON.parse(raw);
  } catch {
    return new NextResponse("Bad JSON", { status: 400 });
  }

  const p = event.payload?.payment?.entity;
  if ((event.event === "payment.captured" || event.event === "payment.authorized") && p?.id) {
    try {
      await fulfil(p.id, { orderId: p.order_id, source: "webhook" });
    } catch (err) {
      console.error("Webhook fulfil failed", err);
      return new NextResponse("Retry later", { status: 500 }); // Razorpay retries
    }
  }
  return NextResponse.json({ ok: true });
}
