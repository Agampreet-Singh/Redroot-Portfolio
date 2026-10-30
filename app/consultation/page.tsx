import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { BookingForm } from "@/components/forms";
import { consultation, course, inr } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a 1:1 session",
  description: `Book a ${consultation.minutes}-minute 1:1 cyber security career consultation with RedRoot for ${inr(consultation.fee)}.`,
};

export default function ConsultationPage() {
  return (
    <>
      <PageHero kicker="1:1 session" title="Book a career consultation">
        <p>
          A focused {consultation.minutes}-minute call on Google Meet or Zoom for your toughest questions about a
          career in cyber security. {inr(consultation.fee)} per session.
        </p>
      </PageHero>

      <section className="py-20 md:py-24">
        <div className="wrap grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="display-md text-3xl">What we can cover</h2>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {consultation.includes.map((x) => (
              <li key={x} className="flex gap-3 py-4 text-lg">
                <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 bg-red" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="book" className="scroll-mt-16 bg-ink py-20 text-white md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.7fr]">
          <div>
            <h2 className="display-md text-3xl md:text-[2.75rem]">Book your session</h2>
            <ol className="mt-8 space-y-4">
              {[
                "Pick a date, time and topic",
                `Pay ${inr(consultation.fee)} online (UPI, card or net banking)`,
                "Get an instant confirmation and email receipt",
                "Get your meeting link by email",
              ].map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-line font-mono text-sm">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-10 max-w-sm text-mist">
              Ready to go deeper?{" "}
              <Link href="/course" className="text-white underline decoration-red decoration-2 underline-offset-4">
                {course.title}
              </Link>{" "}
              covers {course.modules.length} modules end to end.
            </p>
          </div>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
