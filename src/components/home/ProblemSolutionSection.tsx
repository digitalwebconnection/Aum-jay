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
      <rect x="3" y="3" width="8" height="8" rx="1.5" className="fill-current opacity-20" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" className="fill-current opacity-20" />
      <path d="M8 8l8 8" className="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Wrench: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        d="M21 7a5 5 0 0 1-7 4.58L7.59 18A2 2 0 1 1 6 16.41l6.42-6.42A5 5 0 1 1 21 7Z"
        className="fill-current opacity-20"
      />
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
    solution:
      "Rooftop solar engineered to offset 60–90% of your bill for homes & housing societies.",
    tags: ["High-efficiency mono-PERC", "Site-specific design"],
  },
  {
    id: "subsidy",
    icon: <Icon.Subsidy />,
    title: "Subsidy confusion",
    pain: "Paperwork and portal steps feel complex and time-consuming.",
    solution:
      "Hand-held PM-Surya Ghar process—filing to installation with clear 12–40 day milestones.",
    tags: ["PM-Surya Ghar", "DISCOM coordination"],
  },
  {
    id: "vendors",
    icon: <Icon.Shield />,
    title: "Unreliable vendors",
    pain: "Mixed components and poor after-sales create risk.",
    solution:
      "ALMM/IEC components, Waaree-backed warranty, and on-ground service SOPs you can trust.",
    tags: ["ALMM & IEC", "Waaree supply"],
  },
  {
    id: "space",
    icon: <Icon.Space />,
    title: "Limited terrace space",
    pain: "Small rooftops limit generation.",
    solution:
      "Optimized layouts and custom racking to maximize kWh per sq.ft without clutter.",
    tags: ["Yield simulation", "Custom racking"],
  },
  {
    id: "maintenance",
    icon: <Icon.Wrench />,
    title: "Maintenance & monitoring",
    pain: "Hard to track performance and schedule service.",
    solution:
      "App-based monitoring with quarterly/annual AMC plans for predictable upkeep.",
    tags: ["App monitoring", "AMC plans"],
  },
];

export default function ProblemSolutionSection() {
  return (
    <section id="problem-solution" className="relative bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            Your problem
            <span className="opacity-60">→</span>
            Our solution
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Solar that solves real-world issues
          </h2>
          <p className="mt-3 text-slate-600">
            From high bills to subsidy confusion, we engineer, file, and service end-to-end—so you save faster with zero guesswork.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <article
              key={it.id}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">{it.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900">{it.title}</h3>
              </div>

              <div className="mt-4 flex items-start gap-3 text-slate-600">
                <span className="mt-1 inline-block rounded-md bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700">
                  Pain
                </span>
                <p className="flex-1 leading-relaxed">{it.pain}</p>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                  <Icon.Check /> Solution
                </span>
                <p className="flex-1 text-slate-900">{it.solution}</p>
              </div>

              {it.tags && it.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Decorative arrow on hover */}
              <div className="pointer-events-none absolute right-4 top-4 translate-x-2 text-emerald-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                <Icon.Arrow />
              </div>
            </article>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#book-survey"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Book Free Survey
          </a>
          <a
            href="#b2b-proposal"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Request Business Proposal
          </a>
        </div>

        {/* Fine print */}
        <p className="mt-4 text-center text-xs text-slate-500">
          Timelines shown (12–40 days) are indicative and depend on site readiness & DISCOM processing.
        </p>
      </div>
    </section>
  );
}
