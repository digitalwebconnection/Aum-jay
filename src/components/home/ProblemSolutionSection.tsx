"use client";

import React, { useState } from "react";
import PopupExample from "../PopupExample"; // ✅ make sure path is correct

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
      <path
        d="M6 2h12a1 1 0 0 1 1 1v18l-3-2-3 2-3-2-3 2V3a1 1 0 0 1 1-1Z"
        className="fill-current opacity-20"
      />
      <path
        d="M8 7h8M8 11h8M8 15h5"
        className="stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  Subsidy: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        d="M12 3v18M4 7h16M4 17h16"
        className="stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7" r="2.5" className="fill-current opacity-20" />
      <circle cx="12" cy="17" r="2.5" className="fill-current opacity-20" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        d="M12 3 5 6v6c0 5.25 3.75 8.25 7 9 3.25-.75 7-3.75 7-9V6l-7-3Z"
        className="fill-current opacity-20"
      />
      <path
        d="m9 12 2 2 4-4"
        className="stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Space: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="8"
        height="8"
        rx="1.5"
        className="fill-current opacity-20"
      />
      <rect
        x="13"
        y="13"
        width="8"
        height="8"
        rx="1.5"
        className="fill-current opacity-20"
      />
      <path
        d="M8 8l8 8"
        className="stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  Wrench: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        d="M21 7a5 5 0 0 1-7 4.58L7.59 18A2 2 0 1 1 6 16.41l6.42-6.42A5 5 0 1 1 21 7Z"
        className="fill-current opacity-20"
      />
      <circle
        cx="5"
        cy="19"
        r="2"
        className="stroke-current"
        strokeWidth="1.6"
        fill="none"
      />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="m5 13 4 4L19 7"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
};

/* ---- ITEMS ---- */
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
    solution:
      "We handle all PM Surya Ghar paperwork — subsidy in your bank within 12–40 days.",
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
    solution:
      "App-based monitoring + AMC plans keep your system worry-free.",
    tags: ["App monitoring", "AMC plans"],
  },
];

/* ---- useInView Hook ---- */
function useInView(threshold = 0.25) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

/* ---- Decorative Section Edge ---- */
function SectionEdge({ side }: { side: "top" | "bottom" }) {
  const isTop = side === "top";
  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 h-10 ${
          isTop
            ? "top-0 bg-gradient-to-b from-emerald-100/40 to-transparent"
            : "bottom-0 bg-gradient-to-t from-emerald-100/40 to-transparent"
        }`}
      />
    </>
  );
}

/* ---- Zigzag Row ---- */
function ZigRow({ item, index }: { item: Item; index: number }) {
  const even = index % 2 === 0;
  const { ref, inView } = useInView(0.3);

  return (
    <li ref={ref as any} className="relative">
      <div className="grid gap-3 md:grid-cols-[1fr_72px_1fr]">
        {/* Pain */}
        <div
          className={`rounded-2xl border p-5 md:p-6 transition-all duration-700 ${
            even
              ? "bg-rose-50/70 border-rose-500"
              : "bg-rose-50/40 border-rose-500/80"
          } ${inView ? "opacity-100" : "opacity-0 translate-x-6"}`}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-lg bg-white/70 p-2 ring-1 ring-rose-200">
              {item.icon}
            </span>
            <h3 className="text-base font-semibold text-slate-900">
              {item.title}
            </h3>
          </div>
          <span className="mt-3 inline-block rounded-md bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
            Pain
          </span>
          <p className="mt-2 text-slate-700">{item.pain}</p>
        </div>

        {/* Middle connector */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow ${
              inView ? "scale-100" : "scale-75"
            }`}
          >
            {index + 1}
          </span>
          <div className="relative mt-3 h-0.5 w-16 bg-emerald-500" />
        </div>

        {/* Solution */}
        <div
          className={`rounded-2xl border p-5 md:p-6 transition-all duration-700 ${
            even
              ? "bg-emerald-50/80 border-emerald-200"
              : "bg-emerald-50/60 border-emerald-500/80"
          } ${inView ? "opacity-100" : "opacity-0 translate-x-6"}`}
        >
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
            <Icon.Check /> Solution
          </span>
          <p className="mt-2 text-slate-900">{item.solution}</p>
          {item.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-emerald-200 bg-white/70 px-2.5 py-1 text-xs text-emerald-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

/* ---- MAIN COMPONENT ---- */
export default function ProblemSolutionSection() {
  const [mx, setMx] = React.useState(0.5);
  const [my, setMy] = React.useState(0.5);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section
      id="problem-solution"
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-14"
      onMouseMove={(e) => {
        const w = window.innerWidth || 1;
        const h = window.innerHeight || 1;
        setMx(e.clientX / w);
        setMy(e.clientY / h);
      }}
    >
      <SectionEdge side="top" />

      {/* Popup (conditionally rendered) */}
      {showPopup && <PopupExample onClose={() => setShowPopup(false)} />}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            Your problem <span className="opacity-60">→</span> Our solution
          </span>
          <h4 className="text-green-800 font-semibold text-xl">
            Designed for PM Surya Ghar Subsidy.
          </h4>
          <h2 className="mt-1 text-lg md:text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            We remove blockers from quote to net-metering
          </h2>

          <p className="mt-3 text-[14px] md:text-lg text-slate-600">
            AUMJAY combines Waaree supply, EPC design and end-to-end subsidy
            filing—so you save faster with zero guesswork.
          </p>
        </div>

        <div className="mt-12 md:grid md:grid-cols-[minmax(260px,320px)_1fr] md:gap-8">
          {/* Sidebar */}
          <aside className="mb-6 md:mb-0 md:sticky md:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                What this means for you
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>• Clear fix for each pain point</li>
                <li>• Transparent timelines (12–40 days)</li>
                <li>• Waaree-backed components & warranty</li>
                <li>• On-ground service & monitoring</li>
              </ul>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={() => setShowPopup(true)}
                  className="shine-btn inline-flex items-center justify-center rounded-xl bg-[#0DB02B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:scale-[1.02]"
                >
                  Book Free Survey
                </button>
                <a
                  href="#b2b-proposal"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-600 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-transform duration-150 hover:scale-[1.02]"
                >
                  Request Proposal
                </a>
              </div>
            </div>
          </aside>

          {/* Timeline */}
          <ol className="space-y-6">
            {ITEMS.map((item, idx) => (
              <ZigRow key={item.id} item={item} index={idx} />
            ))}
          </ol>
        </div>
      </div>

      <SectionEdge side="bottom" />
    </section>
  );
}
