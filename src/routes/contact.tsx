import { createFileRoute } from "@tanstack/react-router";
import { Github, Mail, Twitter, Youtube, Instagram, Linkedin, MessageCircle, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { TerminalBlock, PromptLine } from "@/components/terminal-block";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RedRoot" },
      { name: "description", content: "Get in touch with RedRoot — social media, email, GitHub, and collaboration enquiries." },
      { property: "og:title", content: "Contact — RedRoot" },
      { property: "og:description", content: "Reach out to RedRoot." },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { Icon: Github, label: "GitHub", handle: "@Agampreet-Singh", href: "https://github.com/Agampreet-Singh" },
  { Icon: Mail, label: "Email", handle: "th3redr00t@gmail.com", href: "mailto:th3redr00t@gmail.com" },
  { Icon: Instagram, label: "Instagram", handle: "@redr00t_cyber", href: "https://www.instagram.com/redr00t_cyber/" },
  { Icon: Linkedin, label: "LinkedIn", handle: "Agampreet Singh", href: "https://www.linkedin.com/in/agampreet-singh-6a9111220/" },
];

function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 hex-grid-bg opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="// contact"
            title={<>Let&apos;s <span className="text-gradient">connect</span>.</>}
            description="For collaborations, sponsorships, talks, or general enquiries — pick your preferred channel below. For 1:1 mentorship, book a consultation instead."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {channels.map(({ Icon, label, handle, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/60 hover:glow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-sm font-bold">{label}</div>
                  <div className="truncate font-mono text-xs text-muted-foreground">{handle}</div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>

          <TerminalBlock title="redroot@contact:~$">
            <PromptLine>cat contact.txt</PromptLine>
            <div className="mt-3 space-y-2 text-muted-foreground">
              <div><span className="text-primary">name</span>: Agampreet Singh</div>
              <div><span className="text-primary">alias</span>: RedRoot</div>
              <div><span className="text-primary">role</span>: Cyber Security Content Creator</div>
              <div><span className="text-primary">email</span>: contact@redroot.dev</div>
              <div><span className="text-primary">github</span>: github.com/Agampreet-Singh</div>
              <div><span className="text-primary">timezone</span>: IST (UTC+5:30)</div>
              <div><span className="text-primary">response</span>: typically &lt; 48h</div>
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <PromptLine>echo &quot;PGP welcome · DMs open · No spam&quot;</PromptLine>
              <div className="mt-2 text-foreground">PGP welcome · DMs open · No spam <span className="animate-blink">▌</span></div>
            </div>
          </TerminalBlock>
        </div>
      </section>
    </>
  );
}
