import Link from "next/link";
import { Logo } from "./logo";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { owner } from "@/lib/site";

const social = [
  { Icon: Github, href: owner.github, label: "GitHub" },
  { Icon: Linkedin, href: owner.linkedin, label: "LinkedIn" },
  { Icon: Instagram, href: owner.instagram, label: "Instagram" },
  { Icon: Mail, href: `mailto:${owner.email}`, label: "Email" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-line bg-ink text-mist">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5 text-white">
            <Logo size={30} />
            <span className="display-md text-xl">RedRoot</span>
          </Link>
          <p className="mt-4 max-w-sm">
            Penetration testing training, the RedRoot framework and 1:1 career mentorship by {owner.name}.
          </p>
          <div className="mt-6 flex gap-2">
            {social.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-ink-line text-mist transition-colors hover:border-white hover:text-white"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-white">Learn</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link className="hover:text-white" href="/course">Professional Penetration Testing</Link></li>
            <li><Link className="hover:text-white" href="/course#enroll">Enroll in the course</Link></li>
            <li><Link className="hover:text-white" href="/consultation">Book a 1:1 session</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-white">RedRoot</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link className="hover:text-white" href="/about">About</Link></li>
            <li><Link className="hover:text-white" href="/redroot">The framework</Link></li>
            <li><Link className="hover:text-white" href="/projects">Projects and CVEs</Link></li>
            <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-line">
        <div className="wrap flex flex-col gap-2 py-6 text-sm sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} RedRoot. All rights reserved.</span>
          <span>All techniques are taught for authorised, legal testing only.</span>
        </div>
      </div>
    </footer>
  );
}
