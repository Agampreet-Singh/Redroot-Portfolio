import type { Metadata } from "next";
import Link from "next/link";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { owner } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with RedRoot for collaborations, sponsorships, talks or general enquiries.",
};

const channels = [
  { Icon: Mail, label: "Email", handle: owner.email, href: `mailto:${owner.email}` },
  { Icon: Linkedin, label: "LinkedIn", handle: owner.name, href: owner.linkedin },
  { Icon: Github, label: "GitHub", handle: "Agampreet-Singh", href: owner.github },
  { Icon: Instagram, label: "Instagram", handle: "redr00t_cyber", href: owner.instagram },
];

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact" title="Let's talk">
        <p>
          For collaborations, sponsorships, talks or general questions, reach me on any of these. I usually reply
          within 48 hours (IST, UTC+5:30).
        </p>
      </PageHero>

      <section className="py-20 md:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <ul className="border-t-2 border-ink">
            {channels.map(({ Icon, label, handle, href }) => (
              <li key={label} className="border-b border-line">
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="group flex items-center gap-5 py-6"
                >
                  <Icon className="h-6 w-6 shrink-0 text-red" />
                  <span className="min-w-0">
                    <span className="block text-sm text-steel">{label}</span>
                    <span className="display-md block truncate text-xl group-hover:text-red sm:text-2xl">{handle}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <aside className="self-start rounded-[4px] bg-ink p-7 text-white md:p-9">
            <h2 className="display-md text-2xl">Looking to learn?</h2>
            <p className="mt-3 text-mist">
              For mentorship, a 1:1 session gets you a dedicated slot. For structured training, enroll in the
              course.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <Link href="/course" className="btn btn-red">Explore the course</Link>
              <Link href="/consultation" className="btn btn-line-dark">Book a 1:1 session</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
