import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Code2, Users, Award, Github, Calendar, Zap } from "lucide-react";
import heroImg from "@/assets/hero-redroot.jpg";
import { SectionHeading } from "@/components/section-heading";
import { TerminalBlock, PromptLine } from "@/components/terminal-block";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RedRoot — Cyber Security Creator & Mentor" },
      { name: "description", content: "Cyber security content, the RedRoot framework, and 1:1 ethical hacking mentorship by Agampreet Singh." },
    ],
  }),
  component: HomePage,
});

const stats = [
  { value: "900K+", label: "Community Reach" },
  { value: "50+", label: "Private Tools" },
  { value: "5+", label: "Years in Cyber Security" },
  { value: "1K+", label: "Mentees Guided" },
];

const highlights = [
  {
    icon: Shield,
    title: "Ethical Hacking",
    body: "Offensive security tactics, vulnerability research, and red-team methodology built on real engagements.",
  },
  {
    icon: Code2,
    title: "RedRoot Framework",
    body: "A unified offensive-security toolkit — recon, exploitation, post-exploit and reporting in one stack.",
  },
  {
    icon: Users,
    title: "Mentorship",
    body: "1:1 career consultations for aspiring security engineers, hackers, and content creators.",
  },
  {
    icon: Award,
    title: "Public Contributions",
    body: "Open-source tools, write-ups, and educational content shared with the global security community.",
  },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hex-grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
              root@redroot — access granted
            </div>

            <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              That tool and I — we’re one.
              <br />
              <span className="text-gradient">I am RedRoot</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              I&apos;m <span className="text-foreground font-semibold">Agampreet Singh</span> — known on the
              internet as <span className="text-primary font-semibold">RedRoot</span>. Cyber security
              content creator, ethical hacker, and author of the RedRoot offensive-security framework.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/consultation"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow hover:glow"
              >
                <Calendar className="h-4 w-4" />
                Book a 1:1 Session
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/Agampreet-Singh/RedRoot-Lite"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-6 py-3 font-mono text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                <Github className="h-4 w-4" />
                RedRoot Lite
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-primary md:text-3xl">{s.value}</div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:200ms]">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-primary/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
              <img
                src={heroImg}
                alt="RedRoot cyber security creator portrait"
                width={1536}
                height={1536}
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TERMINAL JOURNEY */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="// journey"
              title={<>From curiosity to <span className="text-gradient">community</span>.</>}
              description="A self-taught path through CTFs, bug bounty, and content creation — translated into tools, talks, and mentorship for the next generation of hackers."
            />
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
              {["OSCP-mindset", "Bug Bounty", "Red Team", "Content Creator", "Open Source", "Educator"].map((t) => (
                <span key={t} className="rounded-md border border-border bg-surface px-3 py-1 text-muted-foreground">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <TerminalBlock title="redroot@journey:~$">
            <PromptLine>cat journey.log</PromptLine>
            <div className="mt-3 space-y-2 text-muted-foreground">
              <div><span className="text-primary">[2019]</span> Start learning cyber security and ethical hacking</div>
              <div><span className="text-primary">[2020]</span> Began publishing tutorials</div>
              <div><span className="text-primary">[2021]</span> Upgraded the Skills in Penetration Testing</div>
              <div><span className="text-primary">[2022]</span> Achieve Pro Hacker Rank in Hack The Box Platform</div>
              <div><span className="text-primary">[2023]</span> Started full time job as Cyber security professional</div>
              <div><span className="text-primary">[2024]</span> First Version of RedRoot Tool called Mark 1</div>
              <div><span className="text-primary">[now]</span> still hacking, still teaching and job. <span className="animate-blink">▌</span></div>
            </div>
          </TerminalBlock>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="border-y border-border bg-terminal/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            align="center"
            eyebrow="// what i do"
            title={<>Four roles, <span className="text-gradient">one mission</span>.</>}
            description="Securing the digital world through education, tooling, and mentorship."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/60 hover:glow-sm"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/30" />
                <Icon className="relative h-8 w-8 text-primary" />
                <h3 className="relative mt-4 font-display text-lg font-bold">{title}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-surface to-terminal p-10 md:p-14">
          <div className="absolute inset-0 hex-grid-bg opacity-20" />
          <div className="relative">
            <Zap className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
              Need a <span className="text-gradient">career roadmap</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Book a focused 30-minute 1:1 session. Career planning, certification advice, portfolio
              review, and real talk from the field.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 font-mono text-sm">
              <span className="rounded-md border border-border bg-background px-3 py-1.5">⏱ 30 min</span>
              <span className="rounded-md border border-border bg-background px-3 py-1.5">💸 ₹299 / session</span>
              <span className="rounded-md border border-border bg-background px-3 py-1.5">📅 Flexible slots</span>
            </div>
            <Link
              to="/consultation"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow hover:glow"
            >
              Book Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
