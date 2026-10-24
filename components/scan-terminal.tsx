"use client";

import { useEffect, useRef, useState } from "react";
import { course } from "@/lib/site";

/**
 * The course syllabus rendered as a port scan. Lines reveal once,
 * the first time the terminal scrolls into view.
 */
export function ScanTerminal({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lines: { text: React.ReactNode; tone?: string }[] = [
    { text: <><span className="text-red">$</span> redroot scan --target you --course pentest-pro</>, tone: "text-white" },
    { text: "Starting RedRoot scan. 5 services found." },
    { text: "" },
    { text: <span className="text-white">PORT        STATE  SERVICE</span> },
    ...course.modules.map((m) => ({
      text: (
        <>
          {m.port.padEnd(12, " ")}
          <span className="text-ok">open</span>
          {"   "}
          <span className="text-white">{m.service}</span>
        </>
      ),
    })),
    { text: "" },
    { text: <>Scan complete. Enrollment <span className="text-red">open</span>.</> },
  ];

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-[4px] border border-ink-line bg-[#0f1820] ${run ? "scan-run" : ""} ${className}`}
      role="img"
      aria-label={`Course syllabus shown as a port scan: ${course.modules.map((m) => m.title).join(", ")}.`}
    >
      <div className="flex items-center gap-1.5 border-b border-ink-line px-4 py-2.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-red" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-line" />
        <span className="ml-3 font-mono text-xs text-mist">student@redroot: ~</span>
      </div>
      <pre aria-hidden className="overflow-x-auto p-5 font-mono text-[0.78rem] leading-[1.75] text-mist sm:text-[0.86rem]">
        {lines.map((l, i) => (
          <div key={i} className={`scan-line ${l.tone ?? ""}`} style={{ animationDelay: `${i * 140}ms` }}>
            {l.text || " "}
          </div>
        ))}
        <div className="scan-line" style={{ animationDelay: `${lines.length * 140}ms` }}>
          <span className="text-red">$</span> <span className="caret inline-block h-[1em] w-[0.55em] translate-y-[2px] bg-mist" />
        </div>
      </pre>
    </div>
  );
}
