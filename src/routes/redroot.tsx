import { createFileRoute } from "@tanstack/react-router";
import { Github, Radar, Crosshair, Bug, FileText, Terminal, Network, Lock, Database, ShieldAlert, ExternalLink } from "lucide-react";
import frameworkImg from "@/assets/framework-bg.jpg";
import { SectionHeading } from "@/components/section-heading";
import { TerminalBlock, PromptLine } from "@/components/terminal-block";

export const Route = createFileRoute("/redroot")({
  head: () => ({
    meta: [
      { title: "RedRoot Framework — Offensive Security Toolkit" },
      { name: "description", content: "RedRoot — a unified offensive security framework covering recon, exploitation, post-exploit and reporting. Lite version open-sourced on GitHub." },
      { property: "og:title", content: "RedRoot Framework" },
      { property: "og:description", content: "Open-source offensive security framework." },
      { property: "og:image", content: "/og-redroot-framework.jpg" },
    ],
  }),
  component: FrameworkPage,
});

const features = [
  { icon: Radar, title: "Reconnaissance", body: "Passive & active recon — subdomain enumeration, OSINT, asset discovery." },
  { icon: Crosshair, title: "Scanning & Enumeration", body: "Port scanning, service fingerprinting, vulnerability identification." },
  { icon: Bug, title: "Exploitation Modules", body: "Curated exploits for common web, network, and service attack surfaces." },
  { icon: Lock, title: "Post-Exploitation", body: "Privilege escalation helpers, persistence, lateral movement playbooks." },
  { icon: Network, title: "Network Toolkit", body: "Sniffing, spoofing, MITM scaffolding, and traffic analysis." },
  { icon: Database, title: "Payload Generator", body: "Generate custom payloads for web, reverse-shell, and AV-evasion testing." },
  { icon: ShieldAlert, title: "Defensive Insights", body: "Each module ships with mitigation notes for the blue team." },
  { icon: FileText, title: "Auto Reporting", body: "Generate clean engagement reports straight out of the framework." },
];

function FrameworkPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={frameworkImg}
          alt=""
          loading="lazy"
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
            <Terminal className="h-3 w-3" /> v1.0 · Lite Edition · Open Source
          </div>
          <h1 className="mt-5 font-display text-4xl font-black tracking-tight md:text-6xl">
            The <span className="text-gradient">RedRoot</span> Framework
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            A unified offensive security framework that brings reconnaissance, exploitation, post-exploit
            tooling and reporting under one terminal. Built from years of red-team engagements and
            community-driven feedback.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/Agampreet-Singh/RedRoot-Lite"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow hover:glow"
            >
              <Github className="h-4 w-4" /> View on GitHub <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/Agampreet-Singh/RedRoot-Lite#readme"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-6 py-3 font-mono text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
            >
              Read the Docs
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="// purpose"
              title={<>Built for hackers, <span className="text-gradient">by a hacker</span>.</>}
              description="RedRoot exists because juggling 20+ disconnected tools during a pentest is painful. It unifies the offensive workflow so you can focus on the engagement, not the tooling."
            />
            <ul className="mt-6 space-y-3 font-mono text-sm text-muted-foreground">
              <li><span className="text-primary">▸</span> Modular architecture — drop in your own plugins.</li>
              <li><span className="text-primary">▸</span> CLI-first, scriptable, automation-friendly.</li>
              <li><span className="text-primary">▸</span> Educational mode — explains <em>why</em> each technique works.</li>
              <li><span className="text-primary">▸</span> Lab-safe defaults. No surprises in production.</li>
            </ul>
          </div>

          <TerminalBlock title="redroot@framework:~$ ./redroot --help">
            <div className="text-muted-foreground">
              <div><span className="text-primary">RedRoot</span> v1.0-lite — Offensive Security Framework</div>
              <div className="mt-3">Usage: <span className="text-foreground">redroot &lt;module&gt; [options]</span></div>
              <div className="mt-3">Modules:</div>
              <ul className="mt-1 space-y-0.5">
                <li>  <span className="text-primary">recon</span>      Passive &amp; active reconnaissance</li>
                <li>  <span className="text-primary">scan</span>       Port &amp; vulnerability scanning</li>
                <li>  <span className="text-primary">exploit</span>    Run exploit modules</li>
                <li>  <span className="text-primary">payload</span>    Generate custom payloads</li>
                <li>  <span className="text-primary">post</span>       Post-exploitation toolkit</li>
                <li>  <span className="text-primary">report</span>     Auto-generate engagement reports</li>
              </ul>
              <PromptLine>
                <span className="animate-blink">▌</span>
              </PromptLine>
            </div>
          </TerminalBlock>
        </div>
      </section>

      <section className="border-y border-border bg-terminal/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            align="center"
            eyebrow="// features"
            title={<>Everything you need, <span className="text-gradient">one stack</span>.</>}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/60 hover:glow-sm">
                <Icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 font-display text-base font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <SectionHeading
          align="center"
          eyebrow="// open source"
          title={<>Try the <span className="text-gradient">Lite Edition</span>.</>}
          description="The full RedRoot framework is private and used for advanced engagements. RedRoot-Lite open-sources most of the core capabilities so you can learn, contribute, and extend."
        />
        <a
          href="https://github.com/Agampreet-Singh/RedRoot-Lite"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow hover:glow"
        >
          <Github className="h-4 w-4" /> github.com/Agampreet-Singh/RedRoot-Lite
        </a>
      </section>
    </>
  );
}
