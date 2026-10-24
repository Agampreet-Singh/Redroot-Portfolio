"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, Mail, Smartphone } from "lucide-react";
import { inr, owner, payment } from "@/lib/site";

type Props = {
  heading: string;
  amount: number;
  amountLabel?: string; // e.g. "First instalment"
  planNote?: string;
  note: string; // shown in the UPI app
  emailSubject: string;
  details: [string, string][];
  onBack: () => void;
  backLabel: string;
};

export function PaymentStep({ heading, amount, amountLabel, planNote, note, emailSubject, details, onBack, backLabel }: Props) {
  const [copied, setCopied] = useState(false);
  const upiUri = `upi://pay?pa=${encodeURIComponent(payment.upiId)}&pn=${encodeURIComponent(
    payment.payeeName,
  )}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(note)}`;

  const name = details.find(([k]) => k === "Name")?.[1] ?? "";
  const body = [
    "Hi Agampreet,",
    "",
    "My payment screenshot is attached.",
    "",
    ...details.map(([k, v]) => `${k}: ${v || "-"}`),
    `Amount paid: ${inr(amount)}`,
    `Paid to UPI: ${payment.upiId}`,
    "",
    "(Attach your payment screenshot before sending.)",
    "",
    "Thanks,",
    name,
  ].join("\n");
  const mailto = `mailto:${owner.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(payment.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the ID is visible to copy by hand */
    }
  };

  return (
    <div className="rounded-[4px] border border-ink-line bg-ink-2 p-6 text-white md:p-8" aria-live="polite">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ok/15 text-ok">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="display-md text-2xl">{heading}</h3>
      </div>
      <p className="mt-3 max-w-xl text-mist">
        Two steps left: pay {inr(amount)} by UPI, then email your payment screenshot. Your seat is confirmed once
        the payment is verified.
      </p>
      {planNote && <p className="mt-2 max-w-xl text-white">{planNote}</p>}

      <ol className="mt-8 grid gap-6 md:grid-cols-2">
        <li className="rounded-[4px] border border-ink-line bg-ink p-5">
          <p className="font-semibold">1. Pay {inr(amount)} by UPI{amountLabel && <span className="font-normal text-mist"> ({amountLabel.toLowerCase()})</span>}</p>
          <div className="mt-4 flex flex-col items-start gap-4">
            <div className="shrink-0 rounded-[3px] bg-white p-2.5">
              <QRCodeSVG value={upiUri} size={148} level="M" aria-label={`UPI QR code for ${payment.upiId}`} />
            </div>
            <div className="w-full min-w-0">
              <p className="text-sm text-mist">Scan with any UPI app, or pay to this ID:</p>
              <div className="mt-2 flex items-center gap-2">
                <code className="min-w-0 flex-1 truncate rounded-[3px] border border-ink-line px-3 py-2 font-mono text-sm">
                  {payment.upiId}
                </code>
                <button
                  type="button"
                  onClick={copy}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] border border-ink-line hover:border-white"
                  aria-label="Copy UPI ID"
                >
                  {copied ? <Check className="h-4 w-4 text-ok" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <a href={upiUri} className="mt-3 inline-flex items-center gap-2 text-sm text-white underline underline-offset-4 sm:hidden">
                <Smartphone className="h-4 w-4" /> Open in UPI app
              </a>
            </div>
          </div>
        </li>
        <li className="flex flex-col rounded-[4px] border border-ink-line bg-ink p-5">
          <p className="font-semibold">2. Email your payment screenshot</p>
          <p className="mt-2 mb-5 text-sm text-mist">
            The email opens with your details filled in. Attach the screenshot and send it to{" "}
            <span className="text-white">{owner.email}</span>. You'll get a reply with next steps within 48 hours.
          </p>
          <a href={mailto} className="btn btn-red mt-5 self-start md:mt-auto">
            <Mail className="h-4 w-4" /> Email screenshot
          </a>
        </li>
      </ol>

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

      <button type="button" onClick={onBack} className="mt-6 text-sm text-mist underline underline-offset-4 hover:text-white">
        {backLabel}
      </button>
    </div>
  );
}

export function notify(kind: "enrollment" | "consultation", data: Record<string, string>) {
  // Fire-and-forget: emails you a copy if RESEND_API_KEY is configured on Vercel.
  fetch("/api/notify", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind, data }),
    keepalive: true,
  }).catch(() => {});
}
