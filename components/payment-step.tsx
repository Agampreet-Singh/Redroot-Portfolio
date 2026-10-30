"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Loader2, Lock, Mail } from "lucide-react";
import { inr, owner, payment, type PaymentKind } from "@/lib/site";

type Props = {
  heading: string;
  amount: number; // display only; the server sets the real price
  amountLabel?: string;
  planNote?: string;
  kind: PaymentKind;
  planId?: string;
  fields: Record<string, string>;
  details: [string, string][];
  onBack: () => void;
  backLabel: string;
};

type RazorpayResponse = { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string };
type RazorpayInstance = { open: () => void; on: (ev: string, cb: (r: { error?: { description?: string } }) => void) => void };
declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => RazorpayInstance;
  }
}

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadCheckout(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHECKOUT_SRC}"]`);
    const s = existing ?? document.createElement("script");
    s.addEventListener("load", () => resolve(true));
    s.addEventListener("error", () => resolve(false));
    if (!existing) {
      s.src = CHECKOUT_SRC;
      s.async = true;
      document.body.appendChild(s);
    }
  });
}

type State =
  | { s: "idle" }
  | { s: "opening" }
  | { s: "verifying" }
  | { s: "paid"; paymentId: string; amount: number; email: string; emailed: boolean }
  | { s: "error"; message: string };

export function PaymentStep({ heading, amount, amountLabel, planNote, kind, planId, fields, details, onBack, backLabel }: Props) {
  const [state, setState] = useState<State>({ s: "idle" });

  useEffect(() => {
    loadCheckout();
  }, []);

  const pay = async () => {
    setState({ s: "opening" });
    const [ready, orderRes] = await Promise.all([
      loadCheckout(),
      fetch("/api/payment/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind, planId, fields }),
      }).catch(() => null),
    ]);
    const order = await orderRes?.json().catch(() => null);
    if (!ready || !window.Razorpay) {
      return setState({ s: "error", message: "The payment window couldn't load. Check your connection and try again." });
    }
    if (!orderRes?.ok || !order?.orderId) {
      return setState({ s: "error", message: order?.error ?? "Couldn't start the payment. Please try again." });
    }

    const rzp = new window.Razorpay({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: payment.merchantName,
      description: order.description,
      prefill: order.prefill,
      theme: { color: payment.themeColor },
      modal: {
        confirm_close: true,
        ondismiss: () => setState((st) => (st.s === "opening" ? { s: "idle" } : st)),
      },
      handler: async (r: RazorpayResponse) => {
        setState({ s: "verifying" });
        try {
          const res = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ orderId: r.razorpay_order_id, paymentId: r.razorpay_payment_id, signature: r.razorpay_signature }),
          });
          const v = await res.json();
          if (!res.ok || !v.ok) throw new Error(v.error);
          setState({ s: "paid", paymentId: v.paymentId, amount: v.amount, email: v.email, emailed: v.emailed });
        } catch {
          setState({
            s: "error",
            message: `Your payment went through (ID ${r.razorpay_payment_id}) but we couldn't confirm it on our side yet. Please don't pay again. You'll get a confirmation email shortly; if not, write to ${owner.email} with this ID.`,
          });
        }
      },
    });
    rzp.on("payment.failed", (resp) => {
      setState({ s: "error", message: resp.error?.description ?? "The payment failed. No money was taken; please try again." });
    });
    rzp.open();
  };

  if (state.s === "paid") return <PaidCard {...state} details={details} />;

  const busy = state.s === "opening" || state.s === "verifying";

  return (
    <div className="rounded-[4px] border border-ink-line bg-ink-2 p-6 text-white md:p-8" aria-live="polite">
      <h3 className="display-md text-2xl">{heading}</h3>
      <p className="mt-3 max-w-xl text-mist">
        Last step: pay {inr(amount)}
        {amountLabel && ` (${amountLabel.toLowerCase()})`}. You'll see a confirmation here straight away and get a
        receipt by email.
      </p>
      {planNote && <p className="mt-2 max-w-xl text-white">{planNote}</p>}

      <div className="mt-8 rounded-[4px] border border-ink-line bg-ink p-5">
        <button type="button" onClick={pay} disabled={busy} className="btn btn-red w-full justify-center sm:w-auto disabled:opacity-70">
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> {state.s === "verifying" ? "Confirming payment…" : "Opening secure checkout…"}
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" /> Pay {inr(amount)} securely
            </>
          )}
        </button>
        <p className="mt-4 text-sm text-mist">
          UPI (QR or any UPI app), cards, net banking and wallets. Payments are processed securely by Razorpay.
        </p>
        {state.s === "error" && (
          <p role="alert" className="mt-4 flex gap-2 rounded-[3px] border border-red/50 bg-red/10 p-3 text-sm">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red" />
            <span>{state.message}</span>
          </p>
        )}
      </div>

      <DetailsList details={details} />

      <button type="button" onClick={onBack} disabled={busy} className="mt-6 text-sm text-mist underline underline-offset-4 hover:text-white">
        {backLabel}
      </button>
    </div>
  );
}

function PaidCard({ paymentId, amount, email, emailed, details }: { paymentId: string; amount: number; email: string; emailed: boolean; details: [string, string][] }) {
  return (
    <div className="rounded-[4px] border border-ok/40 bg-ink-2 p-6 text-white md:p-8" role="status" aria-live="polite">
      <div className="flex flex-col items-center text-center">
        <svg className="paid-tick h-20 w-20" viewBox="0 0 52 52" aria-hidden>
          <circle className="paid-tick-circle" cx="26" cy="26" r="24" fill="none" />
          <path className="paid-tick-check" fill="none" d="M15 27l7 7 15-16" />
        </svg>
        <h3 className="display-md mt-5 text-2xl">Payment received</h3>
        <p className="mt-2 text-3xl font-semibold text-ok">{inr(amount)}</p>
        <p className="mt-3 max-w-md text-mist">
          {emailed ? (
            <>
              A confirmation email is on its way to <span className="text-white">{email}</span>. Check your spam folder if
              you don't see it in a few minutes.
            </>
          ) : (
            <>
              You're all set. I'll be in touch at <span className="text-white">{email}</span> within 48 hours.
            </>
          )}
        </p>
        <p className="mt-4 font-mono text-xs text-mist">
          Payment ID: <span className="text-white select-all">{paymentId}</span>
        </p>
      </div>
      <DetailsList details={details} />
      <p className="mt-6 flex items-center gap-2 text-sm text-mist">
        <Mail className="h-4 w-4" /> Questions? Write to <a className="text-white underline underline-offset-4" href={`mailto:${owner.email}`}>{owner.email}</a>
      </p>
    </div>
  );
}

function DetailsList({ details }: { details: [string, string][] }) {
  return (
    <dl className="mt-8 grid gap-x-8 gap-y-2 border-t border-ink-line pt-6 text-sm sm:grid-cols-2">
      {details
        .filter(([, v]) => v)
        .map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <dt className="text-mist">{k}:</dt>
            <dd className="min-w-0 break-words">{v}</dd>
          </div>
        ))}
    </dl>
  );
}
