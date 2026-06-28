import type { ReactNode } from "react";

export function TerminalBlock({
  title = "redroot@cyber:~$",
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`terminal-frame overflow-hidden ${className}`}>
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-destructive/70" />
          <span className="h-3 w-3 rounded-full bg-muted-foreground/40" />
          <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{title}</span>
        <span className="font-mono text-xs text-muted-foreground">bash</span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed text-foreground/90">
        {children}
      </div>
    </div>
  );
}

export function PromptLine({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="text-primary">$</span>
      <span>{children}</span>
    </div>
  );
}
