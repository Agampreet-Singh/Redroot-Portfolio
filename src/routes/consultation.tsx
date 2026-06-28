import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, IndianRupee, CheckCircle2, ArrowRight, MessageSquare, User, Mail, Phone, ShieldCheck, Copy, Send } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — RedRoot" },
      { name: "description", content: "Book a 30-minute 1:1 cyber security career consultation with RedRoot for ₹299." },
      { property: "og:title", content: "Book a Consultation — RedRoot" },
      { property: "og:description", content: "1:1 cyber security career mentorship." },
    ],
  }),
  component: ConsultationPage,
});

const UPI_ID = "9354333175@pthdfc";
const SUPPORT_EMAIL = "th3redr00t@gmail.com";
const FEE = 299;

const includes = [
  "Personalized cyber security career roadmap",
  "Certification & learning path guidance (OSCP, CEH, etc.)",
  "Portfolio, GitHub & resume review",
  "Bug bounty & CTF strategy tips",
  "Honest answers about the industry",
];

type BookingDetails = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  topic: string;
  notes: string;
};

function ConsultationPage() {
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 hex-grid-bg opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="// 1:1 mentorship"
            title={<>Book a <span className="text-gradient">career consultation</span>.</>}
            description="A focused 30-minute call to answer your toughest questions about a career in cyber security and ethical hacking."
          />

          <div className="mt-10 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-sm">
              <Clock className="h-4 w-4 text-primary" /> 30 minutes
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-sm">
              <IndianRupee className="h-4 w-4 text-primary" /> ₹{FEE} per session
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-sm">
              <Calendar className="h-4 w-4 text-primary" /> Flexible scheduling
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-sm">
              <MessageSquare className="h-4 w-4 text-primary" /> Google Meet / Zoom
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* WHAT YOU GET */}
          <aside className="lg:col-span-2">
            <h3 className="font-display text-2xl font-bold">What&apos;s included</h3>
            <ul className="mt-6 space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-5">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
                <ShieldCheck className="h-4 w-4" /> How it works
              </div>
              <ol className="mt-3 space-y-2 font-mono text-sm text-muted-foreground">
                <li><span className="text-primary">01.</span> Submit the booking form →</li>
                <li><span className="text-primary">02.</span> Pay ₹{FEE} to the UPI ID shown</li>
                <li><span className="text-primary">03.</span> Send the payment screenshot via email</li>
                <li><span className="text-primary">04.</span> Receive a meeting link on your email</li>
              </ol>
            </div>
          </aside>

          {/* FORM */}
          <div className="lg:col-span-3">
            {booking ? (
              <BookingSuccess booking={booking} onReset={() => setBooking(null)} />
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  setBooking({
                    name: String(fd.get("name") ?? ""),
                    email: String(fd.get("email") ?? ""),
                    phone: String(fd.get("phone") ?? ""),
                    date: String(fd.get("date") ?? ""),
                    time: String(fd.get("time") ?? ""),
                    topic: String(fd.get("topic") ?? ""),
                    notes: String(fd.get("notes") ?? ""),
                  });
                }}
                className="rounded-xl border border-border bg-surface p-6 md:p-8"
              >
                <h3 className="font-display text-2xl font-bold">Booking details</h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  // all fields are required
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <FormField icon={User} label="Full name" name="name" placeholder="John Hacker" />
                  <FormField icon={Mail} type="email" label="Email" name="email" placeholder="you@domain.com" />
                  <FormField icon={Phone} type="tel" label="Phone number" name="phone" placeholder="+91 98765 43210" />
                  <FormField icon={Calendar} type="date" label="Preferred date" name="date" />
                  <FormField icon={Clock} type="time" label="Preferred time" name="time" />
                  <div className="flex flex-col">
                    <label className="mb-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Topic
                    </label>
                    <select
                      name="topic"
                      required
                      defaultValue="Career roadmap"
                      className="rounded-md border border-border bg-input px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    >
                      <option>Career roadmap</option>
                      <option>Certifications guidance</option>
                      <option>Bug bounty strategy</option>
                      <option>Portfolio / resume review</option>
                      <option>General mentorship</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5 flex flex-col">
                  <label className="mb-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Your questions (optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={4}
                    placeholder="Anything specific you'd like to discuss?"
                    className="rounded-md border border-border bg-input px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div className="mt-6 flex flex-col items-stretch gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Total
                    </div>
                    <div className="font-display text-2xl font-bold text-primary">₹{FEE} <span className="text-sm font-normal text-muted-foreground">/ 30 min</span></div>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow hover:glow"
                  >
                    Proceed to Payment <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function FormField({
  icon: Icon,
  label,
  name,
  type = "text",
  placeholder,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id={name}
          name={name}
          type={type}
          required
          placeholder={placeholder}
          className="w-full rounded-md border border-border bg-input py-2.5 pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
        />
      </div>
    </div>
  );
}

function BookingSuccess({ booking, onReset }: { booking: BookingDetails; onReset: () => void }) {
  const [copied, setCopied] = useState(false);

  const upiUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent("RedRoot")}&am=${FEE}&cu=INR&tn=${encodeURIComponent("RedRoot Consultation - " + booking.name)}`;

  const subject = `Payment screenshot — RedRoot Consultation (${booking.name})`;
  const body = [
    "Hi RedRoot,",
    "",
    "Please find my payment screenshot attached for the consultation booking.",
    "",
    "— Booking details —",
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Preferred date: ${booking.date}`,
    `Preferred time: ${booking.time}`,
    `Topic: ${booking.topic}`,
    `Amount paid: ₹${FEE}`,
    `Paid to UPI: ${UPI_ID}`,
    "",
    booking.notes ? `Notes / questions:\n${booking.notes}` : "Notes / questions: —",
    "",
    "(Please attach the payment screenshot before sending.)",
    "",
    "Thanks,",
    booking.name,
  ].join("\n");

  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=1&data=${encodeURIComponent(upiUri)}`;

  return (
    <div className="rounded-xl border border-primary/40 bg-surface p-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold">Booking received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Pay ₹{FEE} using the UPI details below, then send your payment screenshot via email to confirm your slot.
        </p>
      </div>

      <div className="mt-7 grid gap-6 md:grid-cols-2">
        <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-background p-5">
          <img
            src={qrSrc}
            alt={`UPI QR code for ${UPI_ID}`}
            width={200}
            height={200}
            className="h-48 w-48 rounded bg-white p-2"
          />
          <div className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">// Scan to pay</div>
        </div>

        <div className="flex flex-col justify-center gap-4 rounded-xl border border-border bg-background p-5">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Amount</div>
            <div className="font-display text-2xl font-bold text-primary">₹{FEE}</div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">UPI ID</div>
            <div className="mt-1 flex items-center gap-2">
              <code className="flex-1 truncate rounded-md border border-border bg-surface px-3 py-2 font-mono text-sm text-foreground">
                {UPI_ID}
              </code>
              <button
                type="button"
                onClick={copyUpi}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs text-foreground hover:border-primary hover:text-primary"
              >
                <Copy className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <a
            href={upiUri}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-sm text-foreground hover:border-primary hover:text-primary"
          >
            Open in UPI app
          </a>
        </div>
      </div>

      <div className="mt-7 rounded-xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
          <ShieldCheck className="h-4 w-4" /> Final step — confirm your payment
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          After paying, click below to email your payment screenshot to{" "}
          <span className="font-mono text-foreground">{SUPPORT_EMAIL}</span>. Your booking details are pre-filled — just attach the screenshot and hit send.
        </p>
        <a
          href={mailto}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow hover:glow"
        >
          <Send className="h-4 w-4" /> Send payment screenshot
        </a>
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button
          onClick={onReset}
          className="rounded-md border border-border bg-surface px-5 py-2.5 font-mono text-sm text-foreground hover:border-primary hover:text-primary"
        >
          New booking
        </button>
        <Link
          to="/"
          className="rounded-md bg-surface px-5 py-2.5 font-mono text-sm text-foreground hover:text-primary"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
