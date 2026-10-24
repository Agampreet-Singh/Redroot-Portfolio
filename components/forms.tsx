"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { consultation, course, inr } from "@/lib/site";
import { PaymentStep, notify } from "./payment-step";

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  min?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
        {!required && <span className="font-normal text-mist"> (optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        className="field"
      />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: readonly string[] }) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <select id={name} name={name} required defaultValue={options[0]} className="field">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Notes({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="sm:col-span-2">
      <label htmlFor="notes" className="field-label">
        {label} <span className="font-normal text-mist">(optional)</span>
      </label>
      <textarea id="notes" name="notes" rows={4} placeholder={placeholder} className="field" />
    </div>
  );
}

const read = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

/* ---------- Course enrollment ---------- */

type PlanId = (typeof course.plans)[number]["id"];

const planPrice = (p: (typeof course.plans)[number]) =>
  p.id === "emi" ? `${inr(p.firstPayment)}/mo` : p.id === "half" ? `${inr(p.firstPayment)} × 2` : inr(p.firstPayment);

function PlanPicker({ value, onChange }: { value: PlanId; onChange: (id: PlanId) => void }) {
  return (
    <fieldset>
      <legend className="field-label">Payment plan</legend>
      <div className="grid gap-3 md:grid-cols-3">
        {course.plans.map((p) => {
          const on = value === p.id;
          return (
            <label
              key={p.id}
              className={`relative flex cursor-pointer flex-col rounded-[4px] border p-4 transition-colors ${
                on ? "border-red bg-red/10" : "border-ink-line bg-ink hover:border-mist"
              }`}
            >
              <input
                type="radio"
                name="plan"
                value={p.id}
                checked={on}
                onChange={() => onChange(p.id)}
                className="peer sr-only"
              />
              <span className="flex items-center justify-between gap-2">
                <span className="font-semibold">{p.name}</span>
                <span
                  aria-hidden
                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 ${
                    on ? "border-red" : "border-ink-line"
                  }`}
                >
                  {on && <span className="h-2 w-2 rounded-full bg-red" />}
                </span>
              </span>
              <span className="mt-3 flex flex-wrap items-baseline gap-x-2">
                <span className="display-md text-2xl">{planPrice(p)}</span>
                {p.saving > 0 && p.id === "full" && (
                  <span className="text-sm text-mist line-through">{inr(course.price)}</span>
                )}
              </span>
              <span className="mt-1 text-sm text-mist">{p.schedule}</span>
              <span className={`mt-3 text-sm font-semibold ${p.saving ? "text-ok" : "text-mist"}`}>
                {p.saving ? `Save ${inr(p.saving)}` : `Total ${inr(p.total)}, no discount`}
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-[4px] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red" />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function EnrollForm() {
  const [details, setDetails] = useState<[string, string][] | null>(null);
  const [planId, setPlanId] = useState<PlanId>("full");
  const plan = course.plans.find((p) => p.id === planId)!;

  if (details)
    return (
      <PaymentStep
        heading="Enrollment details saved"
        amount={plan.firstPayment}
        amountLabel={plan.firstLabel}
        planNote={`${plan.name}: ${plan.schedule}.`}
        note={`RedRoot course ${plan.id.toUpperCase()} ${details[0][1]}`.slice(0, 50)}
        emailSubject={`Course enrollment (${plan.name}): ${details[0][1]}`}
        details={details}
        onBack={() => setDetails(null)}
        backLabel="Edit enrollment details"
      />
    );

  return (
    <form
      className="rounded-[4px] border border-ink-line bg-ink-2 p-6 text-white md:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const d: [string, string][] = [
          ["Name", read(fd, "name")],
          ["Email", read(fd, "email")],
          ["Phone", read(fd, "phone")],
          ["Course", course.title],
          ["Payment plan", `${plan.name} (${plan.schedule})`],
          ["Paying now", `${inr(plan.firstPayment)} (${plan.firstLabel.toLowerCase()})`],
          ["Experience", read(fd, "level")],
          ["Preferred batch", read(fd, "batch")],
          ["Notes", read(fd, "notes")],
        ];
        notify("enrollment", Object.fromEntries(d));
        setDetails(d);
        e.currentTarget.closest("section")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <PlanPicker value={planId} onChange={setPlanId} />
      <div className="mt-7 grid gap-5 border-t border-ink-line pt-7 sm:grid-cols-2">
        <Field label="Full name" name="name" autoComplete="name" placeholder="Your name" />
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        <Field label="Phone or WhatsApp" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" />
        <Select label="Your experience" name="level" options={course.levels} />
        <div className="sm:col-span-2 sm:max-w-[calc(50%-0.625rem)]">
          <Select label="Preferred batch" name="batch" options={course.batches} />
        </div>
        <Notes label="Anything you'd like me to know" placeholder="Your background, goals, or questions about the course" />
      </div>
      <div className="mt-8 flex flex-col gap-4 border-t border-ink-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="block text-sm text-mist">Pay today</span>
          <span className="display-md text-3xl">{inr(plan.firstPayment)}</span>
          <span className="ml-2 text-mist">
            {plan.id === "full" ? "one-time, all 5 modules" : `of ${inr(plan.total)} total`}
          </span>
        </p>
        <button type="submit" className="btn btn-red">
          Continue to payment <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

/* ---------- 1:1 consultation ---------- */

export function BookingForm() {
  const [details, setDetails] = useState<[string, string][] | null>(null);
  const today = new Date().toISOString().slice(0, 10);

  if (details)
    return (
      <PaymentStep
        heading="Booking request saved"
        amount={consultation.fee}
        note={`RedRoot 1:1 ${details[0][1]}`.slice(0, 50)}
        emailSubject={`1:1 session booking (${details[0][1]})`}
        details={details}
        onBack={() => setDetails(null)}
        backLabel="Edit booking details"
      />
    );

  return (
    <form
      className="rounded-[4px] border border-ink-line bg-ink-2 p-6 text-white md:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const d: [string, string][] = [
          ["Name", read(fd, "name")],
          ["Email", read(fd, "email")],
          ["Phone", read(fd, "phone")],
          ["Preferred date", read(fd, "date")],
          ["Preferred time", read(fd, "time")],
          ["Topic", read(fd, "topic")],
          ["Notes", read(fd, "notes")],
        ];
        notify("consultation", Object.fromEntries(d));
        setDetails(d);
        e.currentTarget.closest("section")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" autoComplete="name" placeholder="Your name" />
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        <Field label="Phone or WhatsApp" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" />
        <Select label="Topic" name="topic" options={consultation.topics} />
        <Field label="Preferred date" name="date" type="date" min={today} />
        <Field label="Preferred time (IST)" name="time" type="time" />
        <Notes label="Your questions" placeholder="What would you like to cover in the session?" />
      </div>
      <div className="mt-8 flex flex-col gap-4 border-t border-ink-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="display-md text-3xl">{inr(consultation.fee)}</span>
          <span className="ml-2 text-mist">for {consultation.minutes} minutes</span>
        </p>
        <button type="submit" className="btn btn-red">
          Continue to payment <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
