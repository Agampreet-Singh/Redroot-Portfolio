import { createFileRoute } from "@tanstack/react-router";
import { Github, ExternalLink, Terminal, Shield, Search, Key, FileWarning, Wifi, Globe, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects & Tools — RedRoot" },
      { name: "description", content: "Open-source cyber security tools and projects built by RedRoot." },
      { property: "og:title", content: "Projects & Tools — RedRoot" },
      { property: "og:description", content: "Tools and projects by RedRoot." },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  { icon: Terminal, name: "RedRoot Mark 85", tag: "Framework", body: "This tool is very dangerous. Handing it over to you would mean handing myself over to you. And if I did that, then either I’d be your slave or a weapon. So, whatever it is you want, sir, you cannot have it.", link: "https://github.com/Agampreet-Singh/RedRoot-Lite" },
  { icon: Terminal, name: "RedRoot-Lite", tag: "Framework", body: "The open-source edition of the RedRoot offensive-security framework — recon, exploitation, payloads, reporting.", link: "https://github.com/Agampreet-Singh/RedRoot-Lite" },
  { icon: Search, name: "CVE-2025-53770", tag: "Common Vulnerability Exposure", body: "CVE-2025-53770 – Microsoft SharePoint Server 2019 Unauthenticated RCE via Deserialization", link: "https://github.com/Agampreet-Singh/CVE-2025-53770" },
  { icon: Key, name: "CVE-2024-25202", tag: "Common Vulnerability Exposure", body: "A vulnerability was found in PHPgurukul visitor management system 1.0. it has been rated as problemic. Affected by the issue is some unknown functionality of the file search bar that called search-result.php and search-visitor.php . The vulnerability is Cross-Site-Scripting (XSS).", link: "https://github.com/Agampreet-Singh/CVE-2024-25202" },
];

function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 hex-grid-bg opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="// projects"
            title={<>Tools I&apos;ve <span className="text-gradient">built &amp; shipped</span>.</>}
            description="A growing collection of open-source security tools — each born from a real need on a real engagement."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ icon: Icon, name, tag, body, link }) => (
            <a
              key={name}
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/60 hover:glow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-border bg-background px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {tag}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{body}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                {link.includes("github") ? <Github className="h-3.5 w-3.5" /> : <ExternalLink className="h-3.5 w-3.5" />}
                view project
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
