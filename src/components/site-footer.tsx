import { Link } from "@tanstack/react-router";
import { Github, Mail, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-terminal">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="font-display text-xl font-bold tracking-wider">
            Red<span className="text-primary">Root</span>
          </div>
          <p className="mt-3 max-w-xs font-mono text-sm text-muted-foreground">
            // Cyber security content, frameworks &amp; mentorship.
          </p>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            <span className="text-primary">$</span> whoami → Agampreet Singh
          </p>
        </div>

        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-foreground">Navigate</h4>
          <ul className="mt-4 space-y-2 font-mono text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">/about</Link></li>
            <li><Link to="/redroot" className="hover:text-primary">/redroot</Link></li>
            <li><Link to="/projects" className="hover:text-primary">/projects</Link></li>
            <li><Link to="/consultation" className="hover:text-primary">/consultation</Link></li>
            <li><Link to="/contact" className="hover:text-primary">/contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-foreground">Connect</h4>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { Icon: Github, href: "https://github.com/Agampreet-Singh", label: "GitHub" },
              { Icon: Instagram, href: "https://www.instagram.com/redr00t_cyber/", label: "Instagram" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/agampreet-singh-6a9111220/", label: "LinkedIn" },
              { Icon: Mail, href: "mailto:th3redr00t@gmail.com", label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-all hover:border-primary hover:text-primary hover:glow-sm"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 font-mono text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} RedRoot. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
            system status: <span className="text-primary">SECURE</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
