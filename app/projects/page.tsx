import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects and CVEs",
  description: "Security tools, frameworks and published CVEs by RedRoot.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero kicker="Projects" title="Tools I've built and bugs I've found">
        <p>Each one started with a real need on a real engagement.</p>
      </PageHero>

      <section className="py-20 md:py-24">
        <div className="wrap">
          <ul className="border-t-2 border-ink">
            {projects.map((p) => (
              <li key={p.name} className="border-b border-line">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group grid gap-3 py-8 transition-colors md:grid-cols-[14rem_1fr_auto] md:gap-10"
                >
                  <span className="text-sm text-steel md:pt-1.5">{p.tag}</span>
                  <span>
                    <span className="display-md block text-2xl group-hover:text-red md:text-3xl">{p.name}</span>
                    <span className="mt-2 block max-w-2xl text-steel">{p.body}</span>
                  </span>
                  <ArrowUpRight className="hidden h-6 w-6 text-steel transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red md:block" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
