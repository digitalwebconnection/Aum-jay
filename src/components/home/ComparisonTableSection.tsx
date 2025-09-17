// src/home/ComparisonTableSection.tsx
import React, { useMemo, useState } from "react";

type Audience = "Home & Societies" | "Commercial & Dealers";

type Row = {
  label: string;
  aumjay: string;   // what you offer
  others: string;   // typical local installers
};

const HOME_ROWS: Row[] = [
  {
    label: "Panels & Inverters",
    aumjay: "ALMM/IEC components • Waaree-backed",
    others: "Mixed brands • Specs vary",
  },
  {
    label: "Design & Simulation",
    aumjay: "Site-specific yield & shadow analysis",
    others: "Generic kW sizing",
  },
  {
    label: "Subsidy Handling",
    aumjay: "End-to-end PM-Surya Ghar filing (12–40 days)",
    others: "Basic guidance only",
  },
  {
    label: "After-sales & Monitoring",
    aumjay: "App monitoring + AMC plans",
    others: "Install & forget",
  },
  {
    label: "Timeline Clarity",
    aumjay: "Milestone plan: survey → install → net-meter",
    others: "Uncertain dates",
  },
  {
    label: "Roof Space Optimization",
    aumjay: "High-efficiency mono-PERC + custom racking",
    others: "Standard layout",
  },
];

const BIZ_ROWS: Row[] = [
  {
    label: "Product Supply",
    aumjay: "Assured Waaree supply • Priority allocation",
    others: "Stock dependent • Delays common",
  },
  {
    label: "EPC Capability",
    aumjay: "Design simulation • On-ground SOPs",
    others: "Limited documentation",
  },
  {
    label: "Commercial Proposals",
    aumjay: "Structured LCOE/ROI with case studies",
    others: "One-page quote",
  },
  {
    label: "Dispatch & Logistics",
    aumjay: "24–72h TAT (stock dep.)",
    others: "Ad-hoc scheduling",
  },
  {
    label: "Warranty & SLAs",
    aumjay: "Waaree-routed claims • SLA tracking",
    others: "Installer-managed • No SLA",
  },
  {
    label: "Territory Support",
    aumjay: "Lead pass-through • Training & co-marketing",
    others: "None / on request",
  },
];

const AUDIENCES: Audience[] = ["Home & Societies", "Commercial & Dealers"];

const Icon = {
  Check: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
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
  Cross: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M6 6l12 12M18 6 6 18"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
};

function Good({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
      <span className="text-emerald-600">
        <Icon.Check />
      </span>
      {children}
    </span>
  );
}

function Bad({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700">
      <span className="text-rose-600">
        <Icon.Cross />
      </span>
      {children}
    </span>
  );
}

export default function ComparisonTableSection() {
  const [aud, setAud] = useState<Audience>("Home & Societies");
  const rows: Row[] = useMemo(() => (aud === "Home & Societies" ? HOME_ROWS : BIZ_ROWS), [aud]);

  return (
    <section id="comparison" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            Why AUMJAY vs Others
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Side-by-side comparison—what you actually get
          </h2>
          <p className="mt-3 text-slate-600">
            Transparent differences so you can decide with confidence.
          </p>
        </div>

        {/* Audience toggle */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {AUDIENCES.map((a) => (
            <button
              key={a}
              onClick={() => setAud(a)}
              className={[
                "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                a === aud
                  ? "border-[#0db02b] bg-black/10 text-[#0db02b]"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
              ].join(" ")}
            >
              {a}
            </button>
          ))}
        </div>

        {/* Table (desktop) */}
        <div className="mt-8 hidden overflow-hidden rounded-2xl ring-1 ring-slate-200 md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="w-1/3 px-5 py-4 font-semibold">What matters</th>
                <th className="w-1/3 px-5 py-4 font-semibold">AUMJAY</th>
                <th className="w-1/3 px-5 py-4 font-semibold">Local installers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((r, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-5 py-4 font-medium text-slate-900">{r.label}</td>
                  <td className="px-5 py-4">
                    <Good>{r.aumjay}</Good>
                  </td>
                  <td className="px-5 py-4">
                    <Bad>{r.others}</Bad>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards (mobile) */}
        <div className="mt-8 grid gap-4 md:hidden">
          {rows.map((r, idx) => (
            <div key={idx} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-900">{r.label}</p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-[#0db02b]">AUMJAY</p>
                  <div className="mt-1"><Good>{r.aumjay}</Good></div>
                </div>
                <div>
                  <p className="text-xs font-medium text-rose-700">Local installers</p>
                  <div className="mt-1"><Bad>{r.others}</Bad></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#book-survey"
            className="inline-flex items-center justify-center rounded-xl bg-[#0db02b] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
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
          Comparisons are indicative; specifications and service levels may vary by site and state policy.
        </p>
      </div>
    </section>
  );
}
