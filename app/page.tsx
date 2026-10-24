import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github } from "lucide-react";
import { ScanTerminal } from "@/components/scan-terminal";
import { consultation, course, credentials, inr, journey, owner, projects } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ink text-white">
        <div className="wrap grid gap-14 pt-14 pb-20 md:pt-20 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16 lg:pb-24">
          <div>
            <p className="text-mist">{owner.name}, penetration tester and educator</p>
            <h1 className="display mt-5 text-[3.4rem] sm:text-[5rem] lg:text-[6.4rem]">
              I am <span className="block">RedRoot.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-mist md:text-xl">
              I teach people to break into networks, web apps, Wi-Fi and AI systems the way professional
              penetration testers do, legally and methodically.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/course" className="btn btn-red">
                Explore the course <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/consultation" className="btn btn-line-dark">
                Book a 1:1 session
              </Link>
            </div>
          </div>

          <figure className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="reticle">
              <Image
                src="/images/agampreet.jpg"
                alt="Agampreet Singh at his desk"
                width={1200}
                height={1600}
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="aspect-[4/4.4] w-full rounded-[2px] object-cover object-[60%_30%]"
              />
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink-line pt-5">
              {credentials.map((c) => (
                <div key={c.label}>
                  <dt className="text-sm text-mist">{c.label}</dt>
                  <dd className="display-md mt-0.5 text-xl">{c.value}</dd>
                </div>
              ))}
            </dl>
          </figure>
        </div>
      </section>

      {/* TWO WAYS */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <h2 className="display-md max-w-2xl text-3xl md:text-[2.75rem]">Two ways to learn with me</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <article className="flex flex-col rounded-[4px] bg-ink p-7 text-white md:p-10">
              <p className="text-sm font-semibold text-red">Course</p>
              <h3 className="display-md mt-2 text-3xl md:text-4xl">{course.title}</h3>
              <p className="mt-4 max-w-xl text-mist">
                Five modules that take you from your first scan to a full Red Team engagement.
              </p>
              <ol className="mt-7 grid gap-x-8 sm:grid-cols-2">
                {course.modules.map((m, i) => (
                  <li key={m.key} className="flex gap-3 border-t border-ink-line py-3">
                    <span className="font-mono text-sm text-red">{i + 1}</span>
                    <span>{m.title}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-mist">
                  <span className="display-md text-2xl text-white">{inr(course.plans[0].firstPayment)}</span> one-time, or{" "}
                  <span className="text-white">{inr(course.plans[2].firstPayment)}/month</span>
                </p>
                <Link href="/course" className="btn btn-red">
                  See the full syllabus <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>

            <article className="flex flex-col rounded-[4px] border border-line bg-white p-7 md:p-10">
              <p className="text-sm font-semibold text-red">1:1 session</p>
              <h3 className="display-md mt-2 text-3xl">Career consultation</h3>
              <p className="mt-4 text-steel">
                A focused {consultation.minutes}-minute call on your roadmap, certifications, portfolio or bug bounty
                strategy.
              </p>
              <ul className="mt-6 space-y-2 text-[0.975rem]">
                {consultation.includes.slice(0, 3).map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-red" />
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <p className="mb-4">
                  <span className="display-md text-2xl">{inr(consultation.fee)}</span>
                  <span className="text-steel"> for {consultation.minutes} min on Google Meet or Zoom</span>
                </p>
                <Link href="/consultation" className="btn btn-line-light w-full sm:w-auto">
                  Book a session
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SYLLABUS AS A SCAN */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <h2 className="display-md text-3xl md:text-[2.75rem]">Every attack surface a pentester is hired to test</h2>
            <p className="mt-5 max-w-lg text-mist">
              Clients don't hire you to know one tool. They hire you to assess their network, their web apps, their
              wireless, and now their AI. The course covers each of them, then puts it all together in Red Team
              exercises.
            </p>
            <Link href="/course#syllabus" className="mt-8 inline-flex items-center gap-2 font-semibold underline decoration-red decoration-2 underline-offset-[6px] hover:text-mist">
              Read what each module covers
            </Link>
          </div>
          <ScanTerminal />
        </div>
      </section>

      {/* JOURNEY */}
      <section className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="display-md text-3xl md:text-[2.75rem]">From curiosity to the classroom</h2>
            <p className="mt-5 max-w-md text-steel">
              Self-taught through CTFs, Hack The Box and bug bounty, then into full-time security work. Everything
              I teach comes from that path.
            </p>
            <Link href="/about" className="mt-7 inline-flex font-semibold underline decoration-red decoration-2 underline-offset-[6px]">
              More about me
            </Link>
          </div>
          <ol className="border-l-2 border-ink">
            {journey.map((j) => (
              <li key={j.year} className="relative grid grid-cols-[4.5rem_1fr] gap-4 pb-6 pl-6 last:pb-0">
                <span className={`absolute -left-[7px] top-[0.45em] h-3 w-3 ${j.year === "Now" ? "bg-red" : "bg-ink"}`} />
                <span className="display-md text-lg">{j.year}</span>
                <span className="text-steel">{j.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WORK */}
      <section className="border-t border-line bg-paper-2 py-20 md:py-24">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="display-md text-3xl md:text-[2.75rem]">Tools and research</h2>
            <Link href="/projects" className="font-semibold underline decoration-red decoration-2 underline-offset-[6px]">
              All projects
            </Link>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line md:grid-cols-2">
            {projects.slice(1).concat(projects[0]).slice(0, 4).map((p) => (
              <a key={p.name} href={p.link} target="_blank" rel="noreferrer noopener" className="group bg-paper p-6 transition-colors hover:bg-white md:p-8">
                <p className="text-sm text-steel">{p.tag}</p>
                <h3 className="display-md mt-1 flex items-center gap-2 text-xl">
                  {p.name}
                  <Github className="h-4 w-4 text-steel opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="mt-2 text-steel">{p.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red text-white">
        <div className="wrap flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <h2 className="display text-4xl md:text-6xl">Your first engagement starts here.</h2>
            <p className="mt-4 max-w-xl text-white/85">
              Enroll in {course.title}, or book a 1:1 session if you're still deciding where to start.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link href="/course#enroll" className="btn bg-white text-ink hover:bg-paper">
              Enroll now
            </Link>
            <Link href="/consultation" className="btn border border-white/60 hover:border-white">
              Book a 1:1 session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
