// src/home/ProblemSolutionSection.tsx
import React from "react";

type Item = {
  id: string;
  icon: React.ReactNode;
  title: string;
  pain: string;
  solution: string;
  tags?: string[];
};

const Icon = {
  Bill: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M6 2h12a1 1 0 0 1 1 1v18l-3-2-3 2-3-2-3 2V3a1 1 0 0 1 1-1Z" className="fill-current opacity-20" />
      <path d="M8 7h8M8 11h8M8 15h5" className="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Subsidy: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M12 3v18M4 7h16M4 17h16" className="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="7" r="2.5" className="fill-current opacity-20" />
      <circle cx="12" cy="17" r="2.5" className="fill-current opacity-20" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M12 3 5 6v6c0 5.25 3.75 8.25 7 9 3.25-.75 7-3.75 7-9V6l-7-3Z" className="fill-current opacity-20" />
      <path d="m9 12 2 2 4-4" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Space: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5" className="fill-current opacity-20" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" className="fill-current opacity-20" />
      <path d="M8 8l8 8" className="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Wrench: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M21 7a5 5 0 0 1-7 4.58L7.59 18A2 2 0 1 1 6 16.41l6.42-6.42A5 5 0 1 1 21 7Z" className="fill-current opacity-20" />
      <circle cx="5" cy="19" r="2" className="stroke-current" strokeWidth="1.6" fill="none" />
    </svg>
  ),
  Arrow: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="m5 13 4 4L19 7" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
};

const ITEMS: Item[] = [
  {
    id: "bills",
    icon: <Icon.Bill />,
    title: "High electricity bills",
    pain: "Monthly costs keep rising and hurting your budget.",
    solution: "Bills keep rising — we engineer solar to cut 60–90% instantly.",
    tags: ["High-efficiency mono-PERC", "Site-specific design"],
  },
  {
    id: "subsidy",
    icon: <Icon.Subsidy />,
    title: "Subsidy confusion",
    pain: "Paperwork and portal steps feel complex and time-consuming.",
    solution: "We handle all PM Surya Ghar paperwork — subsidy in your bank within 12–40 days.",
    tags: ["PM-Surya Ghar", "DISCOM coordination"],
  },
  {
    id: "vendors",
    icon: <Icon.Shield />,
    title: "Unreliable vendors",
    pain: "Mixed components and poor after-sales create risk.",
    solution: "Only Waaree-certified panels + 25-year warranty = zero risk.",
    tags: ["ALMM & IEC", "Waaree supply"],
  },
  {
    id: "space",
    icon: <Icon.Space />,
    title: "Limited terrace space + Maintenance",
    pain: "Small rooftops limit generation.",
    solution: "Custom racking & layouts maximize units per sq. ft.",
    tags: ["Yield simulation", "Custom racking"],
  },
  {
    id: "maintenance",
    icon: <Icon.Wrench />,
    title: "Maintenance & monitoring",
    pain: "Hard to track performance and schedule service.",
    solution: "App-based monitoring + AMC plans keep your system worry-free.",
    tags: ["App monitoring", "AMC plans"],
  },
];

/* ---------- tiny hook: reveal on scroll ---------- */
function useInView(threshold = 0.25) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ---------- decorative edges (top & bottom) ---------- */
function SectionEdge({ side }: { side: "top" | "bottom" }) {
  const isTop = side === "top";
  return (
    <>
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-0 h-10",
          isTop ? "top-0 bg-gradient-to-b from-emerald-100/40 to-transparent" : "bottom-0 bg-gradient-to-t from-emerald-100/40 to-transparent",
        ].join(" ")}
      />
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-0",
          isTop ? "-top-[1px]" : "-bottom-[1px] rotate-180",
          "text-slate-50",
        ].join(" ")}
      >
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="h-8 w-full">
          <path d="M0,48 C240,16 480,16 720,48 C960,80 1200,80 1440,48 L1440,0 L0,0 Z" fill="currentColor" />
        </svg>
      </div>
      <div aria-hidden="true" className={["pointer-events-none absolute inset-x-0", isTop ? "top-0" : "bottom-0"].join(" ")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
        </div>
      </div>
    </>
  );
}

/* ---------- row (animated zig-zag pain → solution) ---------- */
function ZigRow({ item, index }: { item: Item; index: number }) {
  const even = index % 2 === 0;
  const { ref, inView } = useInView(0.3);

  return (
    <li ref={ref as any} className="relative">
      <div className="grid gap-3 md:grid-cols-[1fr_72px_1fr]">
        {/* Pain card */}
        <div
          className={[
            "rounded-2xl border p-5 md:p-6 transition-all duration-700",
            even ? "bg-rose-50/70 border-rose-200" : "bg-rose-50/40 border-rose-200/80",
            inView ? "opacity-100 translate-x-0" : even ? "opacity-0 -translate-x-6" : "opacity-0 translate-x-6",
          ].join(" ")}
          style={{ transitionDelay: "40ms" }}
        >
          <div className="flex items-center gap-3">
            <span
              className={[
                "inline-flex items-center justify-center rounded-lg bg-white/70 p-2 ring-1 transition-all",
                even ? "ring-rose-200" : "ring-rose-300",
                inView ? "scale-100" : "scale-90",
              ].join(" ")}
              style={{ transitionDuration: "600ms" }}
            >
              {item.icon}
            </span>
            <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
          </div>
          <span className="mt-3 inline-block rounded-md bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">Pain</span>
          <p className="mt-2 text-slate-700">{item.pain}</p>
        </div>

        {/* connector with draw animation */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <span
            className={[
              "inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow transition-all duration-500",
              inView ? "scale-100 rotate-0" : "scale-75 -rotate-6",
            ].join(" ")}
          >
            {index + 1}
          </span>
          <div className="relative mt-3 h-0.5 w-16 overflow-hidden rounded">
            <div
              className="absolute inset-y-0 left-0 h-full bg-slate-300"
              style={{ width: "100%" }}
            />
            <div
              className="absolute inset-y-0 left-0 h-full bg-emerald-600 transition-all duration-[900ms]"
              style={{ width: inView ? "100%" : "0%" }}
            />
          </div>
          <svg viewBox="0 0 18 12" className="mt-1 h-3 w-4 text-emerald-600" aria-hidden="true">
            <path d="M0 6h10" stroke="currentColor" strokeWidth="2" />
            <path d="M10 1l7 5-7 5" fill="currentColor" />
          </svg>
        </div>

        {/* Solution card */}
        <div
          className={[
            "rounded-2xl border p-5 md:p-6 transition-all duration-700",
            even ? "bg-emerald-50/80 border-emerald-200" : "bg-emerald-50/60 border-emerald-200/80",
            inView ? "opacity-100 translate-x-0" : even ? "opacity-0 translate-x-6" : "opacity-0 -translate-x-6",
          ].join(" ")}
          style={{ transitionDelay: "140ms" }}
        >
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
            <Icon.Check /> Solution
          </span>
          <p className="mt-2 text-slate-900">{item.solution}</p>

          {!!item.tags?.length && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span key={t} className="rounded-full border border-emerald-200 bg-white/70 px-2.5 py-1 text-xs text-emerald-700">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile connector */}
      <div className="md:hidden mt-2 mb-4 flex items-center justify-center">
        <span
          className={[
            "mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow transition-all duration-500",
            inView ? "scale-100 rotate-0" : "scale-75 -rotate-6",
          ].join(" ")}
        >
          {index + 1}
        </span>
        <div className="relative h-0.5 w-24 overflow-hidden rounded">
          <div className="absolute inset-y-0 left-0 h-full bg-slate-300" style={{ width: "100%" }} />
          <div
            className="absolute inset-y-0 left-0 h-full bg-emerald-600 transition-all duration-[900ms]"
            style={{ width: inView ? "100%" : "0%" }}
          />
        </div>
      </div>
    </li>
  );
}

export default function ProblemSolutionSection() {
  const [mx, setMx] = React.useState(0.5);
  const [my, setMy] = React.useState(0.5);

  return (
    <section
      id="problem-solution"
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-24"
      onMouseMove={(e) => {
        const w = window.innerWidth || 1;
        const h = window.innerHeight || 1;
        setMx(e.clientX / w);
        setMy(e.clientY / h);
      }}
    >
      {/* decorative edges */}
      <SectionEdge side="top" />

      {/* floating blobs */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-64 w-64 rounded-full bg-emerald-300/25 blur-3xl animate-float1" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-rose-300/25 blur-3xl animate-float2" />

      {/* parallax grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ transform: `translate(${(mx - 0.5) * 12}px, ${(my - 0.5) * 12}px)` }}
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-slate-900" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            Your problem <span className="opacity-60">→</span> Our solution
          </span>
          <h2 className="mt-4 text-lg md:text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            We remove blockers from quote to net-metering
          </h2>
          <p className="mt-3 text-[14px] md:text-lg text-slate-600">
            AUMJAY combines Waaree supply, EPC design and end-to-end subsidy filing—so you save faster with zero guesswork.
          </p>
        </div>

        {/* Sticky intro + animated timeline */}
        <div className="mt-12 md:grid md:grid-cols-[minmax(260px,320px)_1fr] md:gap-8">
          {/* Left sticky intro */}
          <aside className="mb-6 md:mb-0 md:sticky md:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">What this means for you</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>• Clear fix for each pain point</li>
                <li>• Transparent timelines (12–40 days)</li>
                <li>• Waaree-backed components & warranty</li>
                <li>• On-ground service & monitoring</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">Pain</span>
                <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">Solution</span>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <a
                  href="#book-survey"
                  className="shine-btn inline-flex items-center justify-center rounded-xl bg-[#0DB02B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  Book Free Survey
                </a>
                <a
                  href="#b2b-proposal"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  Request Proposal
                </a>
              </div>
            </div>
          </aside>

          {/* Right timeline list */}
          <ol className="space-y-6">
            {ITEMS.map((item, idx) => (
              <ZigRow key={item.id} item={item} index={idx} />
            ))}
          </ol>
        </div>

        {/* CTA strip (bottom) */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#book-survey"
            className="shine-btn inline-flex items-center justify-center rounded-xl bg-[#0DB02B] px-5 py-3 text-xs md:text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            See exact savings → Book a free survey
          </a>
          <a
            href="#b2b-proposal"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs md:text-sm font-semibold text-slate-900 shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Get EPC / Dealer proposal
          </a>
        </div>

     
      </div>

      <SectionEdge side="bottom" />

      {/* local keyframes (no Tailwind config needed) */}
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes floatY2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
        }
        .animate-float1 { animation: floatY 9s ease-in-out infinite; }
        .animate-float2 { animation: floatY2 11s ease-in-out infinite; }

        /* button shine */
        .shine-btn {
          position: relative;
          overflow: hidden;
        }
        .shine-btn::after {
          content: "";
          position: absolute;
          top: 0; left: -120%;
          width: 120%; height: 100%;
          background: linear-gradient(120deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 80%);
          transform: skewX(-20deg);
        }
        .shine-btn:hover::after {
          left: 120%;
          transition: left 700ms;
        }
      `}</style>
    </section>
  );
}
