import type { ReactNode } from "react";

export function PageHero({ kicker, title, children }: { kicker?: string; title: string; children?: ReactNode }) {
  return (
    <section className="bg-ink text-white">
      <div className="wrap pt-14 pb-16 md:pt-20 md:pb-20">
        {kicker && <p className="font-semibold text-red">{kicker}</p>}
        <h1 className="display mt-4 max-w-4xl text-[2.6rem] sm:text-6xl lg:text-[4.4rem]">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg text-mist">{children}</div>}
      </div>
    </section>
  );
}
