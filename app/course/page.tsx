import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, Plus } from "lucide-react";
import { ScanTerminal } from "@/components/scan-terminal";
import { EnrollForm } from "@/components/forms";
import { course, inr, owner } from "@/lib/site";

export const metadata: Metadata = {
  title: "Professional Penetration Testing course",
  description:
    "Enroll in Professional Penetration Testing by RedRoot: an 18-month, hands-on course covering foundations, OSINT, network and Active Directory, web and API, wireless and AI penetration testing, Red Team operations and a career capstone.",
};

const faqs = [
  {
    q: "How do I pay?",
    a: `Pick a payment plan on the enrollment form, then pay securely through Razorpay: UPI (Google Pay, PhonePe, Paytm or any UPI app), cards or net banking. Your payment is confirmed on the spot and you get a receipt by email. Questions? Write to ${owner.email}.`,
  },
  {
    q: "Can I pay in instalments?",
    a: `Yes. Pay ${inr(course.plans[0].total)} in one go (save ${inr(course.plans[0].saving)}), pay ${inr(course.plans[1].firstPayment)} now and ${inr(course.plans[1].firstPayment)} after 9 months, or pay ${inr(course.plans[2].firstPayment)} a month for all ${course.months} months of the course (save ${inr(course.plans[2].saving)}). For instalments, you'll get an email reminder before each payment is due.`,
  },
  {
    q: "When is my seat confirmed?",
    a: "As soon as your payment goes through: you'll see a confirmation on screen and get a receipt by email with the full syllabus. Within 48 hours I'll email you to schedule your 30-minute placement interview, then send your batch schedule and joining details.",
  },
  {
    q: "Do I need prior experience?",
    a: "No. The course starts with a Foundations module. Before your batch starts you'll have a 30-minute one-on-one interview with me, where I'll ask about your current level and experience, and place you in the batch that fits you best.",
  },
  {
    q: "Is this legal?",
    a: "Yes. Every technique is taught for authorised testing only, practised in lab environments you own or have permission to attack.",
  },
];

export default function CoursePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ink text-white">
        <div className="wrap grid gap-12 pt-14 pb-20 md:pt-20 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:pb-24">
          <div>
            <p className="font-semibold text-red">Course by {owner.alias}</p>
            <h1 className="display mt-4 text-[2.7rem] sm:text-6xl lg:text-[4.6rem]">
              Professional Penetration Testing
            </h1>
            <p className="mt-6 max-w-xl text-lg text-mist">
              From your first Linux command to a full Red Team operation: learn to hack networks, Active
              Directory, web apps and APIs, Wi-Fi and AI systems the way working penetration testers do.
            </p>
            <dl className="mt-9 grid max-w-xl grid-cols-3 border-y border-ink-line">
              {[
                ["Course fee", inr(course.price)],
                ["Duration", course.duration],
                ["Modules", String(course.modules.length)],
              ].map(([k, v], i) => (
                <div key={k} className={`py-4 ${i > 0 ? "border-l border-ink-line pl-4 sm:pl-6" : ""}`}>
                  <dt className="text-sm text-mist">{k}</dt>
                  <dd className="display-md mt-1 text-xl sm:text-2xl">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 max-w-xl text-mist">
              Pay in full for <span className="text-white">{inr(course.plans[0].total)}</span>, in two halves, or{" "}
              <span className="text-white">{inr(course.plans[2].firstPayment)} a month</span>. {course.format}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#enroll" className="btn btn-red">
                Enroll now <ArrowDown className="h-4 w-4" />
              </a>
              <a href="#syllabus" className="btn btn-line-dark">
                View syllabus
              </a>
            </div>
          </div>
          <ScanTerminal />
        </div>
      </section>

      {/* SYLLABUS */}
      <section id="syllabus" className="scroll-mt-16 py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="display-md text-3xl md:text-[2.75rem]">Syllabus</h2>
            <p className="mt-4 max-w-sm text-steel">
              {course.modules.length} modules over {course.months} months, in the order you'll take them. Every module
              ends with a hands-on project for your portfolio.
            </p>
          </div>
          <div>
          <p className="mb-8 max-w-2xl text-lg">{course.intro}</p>
          <ol className="border-t-2 border-ink">
            {course.modules.map((m, i) => (
              <li key={m.key} className="border-b border-line">
                <details className="group" open={i === 0}>
                  <summary className="grid cursor-pointer grid-cols-[2.5rem_1fr_auto] items-start gap-3 py-6 sm:grid-cols-[3.5rem_1fr_auto]">
                    <span className="display text-3xl text-red sm:text-4xl">{i}</span>
                    <span>
                      <span className="block font-mono text-xs uppercase tracking-wider text-steel">{m.months}</span>
                      <span className="display-md mt-1 block text-xl sm:text-2xl">{m.title}</span>
                      <span className="mt-2 block max-w-xl font-semibold text-red">“{m.tagline}”</span>
                      <span className="mt-2 block max-w-xl text-steel">{m.summary}</span>
                    </span>
                    <Plus className="chev mt-1.5 h-5 w-5 transition-transform" aria-hidden />
                  </summary>
                  <div className="pb-7 pl-[3.25rem] sm:pl-[4.25rem]">
                    {m.certs && (
                      <p className="mb-3 text-sm">
                        <span className="font-semibold">Prepares you for:</span> {m.certs}
                      </p>
                    )}
                    {m.outcome && (
                      <p className="mb-5 max-w-2xl">
                        <span className="font-semibold">You will learn to:</span> {m.outcome}
                      </p>
                    )}
                    <p className="text-sm font-semibold">Topics</p>
                    <ul className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
                      {m.topics.map((t) => (
                        <li key={t} className="flex gap-2.5 text-[0.975rem]">
                          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-red" />
                          {t}
                        </li>
                      ))}
                    </ul>
                    {(m.handsOn || m.project || ("result" in m && m.result)) && (
                      <div className="mt-5 space-y-2 border-l-2 border-red pl-4 text-[0.975rem]">
                        {m.handsOn && (
                          <p>
                            <span className="font-semibold">Hands-on:</span> {m.handsOn}
                          </p>
                        )}
                        {m.project && (
                          <p>
                            <span className="font-semibold">Module project:</span> {m.project}
                          </p>
                        )}
                        {"result" in m && m.result && (
                          <p>
                            <span className="font-semibold">Outcome:</span> {m.result}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="border-t border-line bg-paper-2 py-16 md:py-20">
        <div className="wrap grid gap-10 md:grid-cols-[1fr_2fr]">
          <h2 className="display-md text-3xl">What's included</h2>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {course.includes.map((x) => (
              <li key={x} className="border-t border-ink pt-3 text-lg">
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ENROLL */}
      <section id="enroll" className="scroll-mt-16 bg-ink py-20 text-white md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.7fr]">
          <div>
            <h2 className="display-md text-3xl md:text-[2.75rem]">Enroll in the course</h2>
            <p className="mt-4 max-w-sm text-mist">It takes about two minutes.</p>
            <ol className="mt-8 space-y-4">
              {[
                "Fill in your details",
                "Choose a payment plan and pay online",
                "Get an instant confirmation and the full syllabus by email",
                "30-minute placement interview with Agampreet",
                "Get your batch schedule and joining details",
              ].map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-line font-mono text-sm">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <EnrollForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="display-md text-3xl md:text-[2.75rem]">Questions</h2>
            <p className="mt-4 text-steel">
              Something else? <Link href="/contact" className="font-semibold text-ink underline decoration-red decoration-2 underline-offset-4">Get in touch</Link>.
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <div key={f.q} className="grid gap-2 py-6 md:grid-cols-[1fr_1.6fr] md:gap-8">
                <dt className="font-semibold">{f.q}</dt>
                <dd className="text-steel">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
