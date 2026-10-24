import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "The RedRoot framework",
  description:
    "RedRoot: an offensive security framework covering recon, exploitation, post-exploitation and reporting. RedRoot-Lite is open source on GitHub.",
};

const REPO = "https://github.com/Agampreet-Singh/RedRoot-Lite";

const modules = [
  ["recon", "Reconnaissance", "Passive and active recon: subdomain enumeration, OSINT, asset discovery."],
  ["scan", "Scanning and enumeration", "Port scanning, service fingerprinting, vulnerability identification."],
  ["exploit", "Exploitation", "Curated exploits for common web, network and service attack surfaces."],
  ["post", "Post-exploitation", "Privilege escalation helpers, persistence and lateral movement playbooks."],
  ["net", "Network toolkit", "Sniffing, spoofing, MITM scaffolding and traffic analysis."],
  ["payload", "Payload generator", "Custom payloads for web, reverse shells and AV-evasion testing."],
  ["defend", "Defensive notes", "Every module ships with mitigation notes for the blue team."],
  ["report", "Reporting", "Generate a clean engagement report straight from the framework."],
] as const;

export default function FrameworkPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image src="/images/framework.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="wrap relative grid gap-12 pt-16 pb-20 md:pt-24 md:pb-28 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
          <p className="font-semibold text-red">RedRoot Mark-85, with an open-source Lite edition</p>
          <h1 className="display mt-4 max-w-3xl text-[2.6rem] sm:text-6xl lg:text-[4.4rem]">The RedRoot framework</h1>
          <p className="mt-6 max-w-xl text-lg text-mist">
            Reconnaissance, exploitation, post-exploitation and reporting in one terminal. Built from years of
            engagements so you can focus on the target, not on juggling twenty tools.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={REPO} target="_blank" rel="noreferrer noopener" className="btn btn-red">
              <Github className="h-4 w-4" /> RedRoot-Lite on GitHub
            </a>
            <a href={`${REPO}#readme`} target="_blank" rel="noreferrer noopener" className="btn btn-line-dark">
              Read the docs <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          </div>
          <Image
            src="/images/redroot-mark85.jpg"
            alt="RedRoot Mark-85 emblem"
            width={800}
            height={800}
            sizes="(min-width: 1024px) 30vw, 70vw"
            className="mx-auto w-full max-w-[22rem] rounded-full shadow-[0_0_80px_-10px_rgba(224,42,38,0.55)]"
          />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <h2 className="display-md text-3xl md:text-[2.75rem]">Built by a pentester, for pentesters</h2>
            <ul className="mt-8 space-y-3 text-lg">
              {[
                "Modular: drop in your own plugins",
                "CLI-first, scriptable and automation-friendly",
                "Educational mode explains why each technique works",
                "Lab-safe defaults, no surprises in production",
              ].map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 bg-red" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-[4px] border border-ink-line bg-[#0f1820] text-mist">
            <div className="border-b border-ink-line px-4 py-2.5 font-mono text-xs">redroot --help</div>
            <pre className="overflow-x-auto p-5 font-mono text-[0.82rem] leading-[1.75]">
              <span className="text-white">RedRoot v1.0-lite</span>{"\n"}
              {"\n"}Usage: <span className="text-white">redroot &lt;module&gt; [options]</span>{"\n\n"}Modules:{"\n"}
              {modules.slice(0, 6).map(([cmd, , body]) => (
                <span key={cmd}>
                  {"  "}<span className="text-red">{cmd.padEnd(9, " ")}</span>{body.split(":")[0].split(",")[0]}{"\n"}
                </span>
              ))}
            </pre>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-2 py-20 md:py-24">
        <div className="wrap">
          <h2 className="display-md text-3xl md:text-[2.75rem]">What's inside</h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map(([cmd, title, body]) => (
              <div key={cmd} className="border-t-2 border-ink pt-4">
                <h3 className="display-md text-lg">{title}</h3>
                <p className="mt-2 text-steel">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="wrap max-w-3xl">
          <h2 className="display-md text-3xl md:text-[2.75rem]">Try the Lite edition</h2>
          <p className="mt-4 text-lg text-steel">
            The full framework stays private for advanced engagements. RedRoot-Lite open-sources most of the core so
            you can learn from it, contribute and extend it.
          </p>
          <a href={REPO} target="_blank" rel="noreferrer noopener" className="btn btn-line-light mt-8">
            <Github className="h-4 w-4" /> View RedRoot-Lite on GitHub
          </a>
        </div>
      </section>
    </>
  );
}
