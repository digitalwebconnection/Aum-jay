// src/components/SectionFrame.tsx
import React from "react";

type Props = {
  id?: string;
  /** background tone */
  tone?: "solid" | "muted"; // solid=white, muted=slate-50
  /** add default vertical padding */
  pad?: boolean;
  /** draw soft top/bottom edges */
  edges?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

function Edge({ side }: { side: "top" | "bottom" }) {
  const isTop = side === "top";
  return (
    <>
      {/* soft gradient wash */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 h-10",
          isTop
            ? "top-0 bg-gradient-to-b from-emerald-100/40 to-transparent"
            : "bottom-0 bg-gradient-to-t from-emerald-100/40 to-transparent"
        )}
      />
      {/* wave shape matching muted bg */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0",
          isTop ? "-top-[1px]" : "-bottom-[1px] rotate-180",
          "text-slate-50"
        )}
      >
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="h-8 w-full">
          <path d="M0,48 C240,16 480,16 720,48 C960,80 1200,80 1440,48 L1440,0 L0,0 Z" fill="currentColor" />
        </svg>
      </div>
      {/* hairline gradient */}
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-x-0", isTop ? "top-0" : "bottom-0")}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
        </div>
      </div>
    </>
  );
}

export default function SectionFrame({
  id,
  tone = "solid",
  pad = true,
  edges = false,
  className,
  containerClassName,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden header-offset",
        tone === "muted" ? "bg-slate-50" : "bg-white",
        pad && "py-16 sm:py-24",
        className
      )}
    >
      {edges && <Edge side="top" />}

      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>

      {edges && <Edge side="bottom" />}
    </section>
  );
}
