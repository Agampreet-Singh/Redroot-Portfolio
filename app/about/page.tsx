import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { credentials, journey, owner } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Agampreet Singh (RedRoot): background, mission and experience in offensive security and education.",
};

const roles = [
  { years: "2020 to now", title: "Offensive security practitioner", body: "Real-world engagements across web, network and infrastructure." },
  { years: "2020 to now", title: "Cyber security educator", body: "Tutorials, courses and content for a global community of learners." },
  { years: "2019 to now", title: "CTF player and bug hunter", body: "Capture-the-flag competitions, responsible disclosure and published CVEs." },
];

const beliefs = [
  { title: "Mission", body: "Make offensive security learnable: turn the steep curve of ethical hacking into a clear path through tools, content and direct mentorship." },
  { title: "Vision", body: "Every developer, sysadmin and student able to think like an attacker, because the strongest defences are built by people who've studied the offence." },
  { title: "Approach", body: "Practical over theoretical. Real attack chains, real defences and real code, explained so anyone willing to do the work can follow." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero kicker="About" title="The person behind RedRoot">
        <p>
          I'm {owner.name}: penetration tester, author of the RedRoot framework, and an educator who believes the
          best way to defend a system is to understand exactly how it breaks.
        </p>
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="reticle mx-auto w-full max-w-md">
            <Image
              src="/images/agampreet.jpg"
              alt={owner.name}
              width={1200}
              height={1600}
              sizes="(min-width: 1024px) 35vw, 90vw"
              className="w-full rounded-[2px] object-cover"
            />
          </div>
          <div className="max-w-[38rem] text-lg leading-[1.7]">
            <p>
              I started as a curious teenager taking apart routers and reverse-engineering small apps. That
              curiosity turned into CTFs, then Hack The Box, then bug bounty, and eventually a full-time career in
              offensive security.
            </p>
            <p className="mt-5">
              Along the way I started sharing what I'd learned. Tutorials became a community of hundreds of
              thousands, and the scripts I kept rewriting on every engagement became the RedRoot framework.
            </p>
            <p className="mt-5">
              Today I still work in security, and I teach what I use on the job: the methodology, the tooling and
              the reporting that separate a professional penetration tester from someone running scanners.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6">
              {credentials.map((c) => (
                <div key={c.label}>
                  <dt className="text-sm text-steel">{c.label}</dt>
                  <dd className="display-md text-2xl">{c.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2 py-20">
        <div className="wrap grid gap-10 md:grid-cols-3">
          {beliefs.map((b) => (
            <div key={b.title} className="border-t-2 border-ink pt-5">
              <h2 className="display-md text-2xl">{b.title}</h2>
              <p className="mt-3 text-steel">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="display-md text-3xl md:text-[2.5rem]">Experience</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {roles.map((r) => (
                <li key={r.title} className="py-5">
                  <p className="text-sm text-steel">{r.years}</p>
                  <h3 className="display-md mt-1 text-xl">{r.title}</h3>
                  <p className="mt-1 text-steel">{r.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="display-md text-3xl md:text-[2.5rem]">Timeline</h2>
            <ol className="mt-8 border-l-2 border-ink">
              {journey.map((j) => (
                <li key={j.year} className="relative grid grid-cols-[4.5rem_1fr] gap-4 pb-5 pl-6 last:pb-0">
                  <span className={`absolute -left-[7px] top-[0.45em] h-3 w-3 ${j.year === "Now" ? "bg-red" : "bg-ink"}`} />
                  <span className="display-md text-lg">{j.year}</span>
                  <span className="text-steel">{j.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="display-md text-3xl">Learn the way I work.</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/course" className="btn btn-red">Explore the course</Link>
            <Link href="/consultation" className="btn btn-line-dark">Book a 1:1 session</Link>
          </div>
        </div>
      </section>
    </>
  );
}
