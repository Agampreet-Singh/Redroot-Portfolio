import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Sparkles, Briefcase, GraduationCap, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { TerminalBlock, PromptLine } from "@/components/terminal-block";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — RedRoot" },
      { name: "description", content: "About Agampreet Singh (RedRoot) — background, mission, vision and experience in cyber security and ethical hacking." },
      { property: "og:title", content: "About — RedRoot" },
      { property: "og:description", content: "Background, mission and experience of RedRoot." },
    ],
  }),
  component: AboutPage,
});

const experience = [
  { icon: Briefcase, title: "Offensive Security Practitioner", years: "2020 — now", body: "Real-world engagements covering web, network, and infra red-teaming." },
  { icon: GraduationCap, title: "Cyber Security Educator", years: "2020 — now", body: "Tutorials, courses, and content reaching a global audience of learners." },
  { icon: Trophy, title: "CTF Player & Bug Hunter", years: "2019 — now", body: "Capture-the-flag competitions, responsible disclosure, and bounty hunting." },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 hex-grid-bg opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="// about"
            title={<>The human <span className="text-gradient">behind RedRoot</span>.</>}
            description="I'm Agampreet Singh — a cyber security content creator, ethical hacker, and lifelong tinkerer who believes the best way to defend systems is to deeply understand how they break."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <TerminalBlock title="redroot@about:~$ cat background.md">
            <PromptLine>whoami</PromptLine>
            <p className="mt-2 text-muted-foreground">
              <span className="text-foreground">RedRoot</span> — content creator, framework author, mentor.
            </p>
            <PromptLine>cat origin.txt</PromptLine>
            <p className="mt-2 text-muted-foreground">
              Started as a curious teenager dismantling routers and reverse-engineering small apps. That
              curiosity grew into a career in offensive security, then into building tools to share what
              I&apos;d learned with the world.
            </p>
            <PromptLine>ls philosophy/</PromptLine>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li><span className="text-primary">→</span> respect the system</li>
              <li><span className="text-primary">→</span> protect the network</li>
              <li><span className="text-primary">→</span> teach the next hacker</li>
              <li><span className="text-primary">→</span> never stop learning <span className="animate-blink">▌</span></li>
            </ul>
          </TerminalBlock>

          <div className="grid gap-5">
            <div className="rounded-xl border border-border bg-surface p-7">
              <Target className="h-7 w-7 text-primary" />
              <h3 className="mt-3 font-display text-xl font-bold">Mission</h3>
              <p className="mt-2 text-muted-foreground">
                Democratize offensive security knowledge — turn the steep learning curve of ethical hacking
                into a clear, accessible path through tools, content, and direct mentorship.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-7">
              <Eye className="h-7 w-7 text-primary" />
              <h3 className="mt-3 font-display text-xl font-bold">Vision</h3>
              <p className="mt-2 text-muted-foreground">
                A world where every developer, sysadmin, and student can think like an attacker — because
                the strongest defenses are built by those who&apos;ve studied the offense.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-7">
              <Sparkles className="h-7 w-7 text-primary" />
              <h3 className="mt-3 font-display text-xl font-bold">Approach</h3>
              <p className="mt-2 text-muted-foreground">
                Practical over theoretical. Real attack chains, real defenses, real code — explained so
                that anyone willing to do the work can follow along.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-terminal/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            align="center"
            eyebrow="// experience"
            title={<>Years in the <span className="text-gradient">trenches</span>.</>}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {experience.map(({ icon: Icon, title, years, body }) => (
              <div key={title} className="rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/60 hover:glow-sm">
                <Icon className="h-7 w-7 text-primary" />
                <div className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">{years}</div>
                <h3 className="mt-1 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
