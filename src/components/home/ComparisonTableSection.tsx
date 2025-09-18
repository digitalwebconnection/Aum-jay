// src/home/ComparisonTableSection.tsx
import React, { useMemo, useState, useEffect, useRef } from "react";

type Audience = "Home & Societies" | "Commercial & Dealers";

type Row = {
  label: string;
  aumjay: string; // what you offer
  others: string; // typical local installers
};

const HOME_ROWS: Row[] = [
  { label: "Panels & Inverters", aumjay: "ALMM/IEC components • Waaree-backed", others: "Mixed brands • Specs vary" },
  { label: "Design & Simulation", aumjay: "Site-specific yield & shadow analysis", others: "Generic kW sizing" },
  { label: "Subsidy Handling", aumjay: "End-to-end PM-Surya Ghar filing (12–40 days)", others: "Basic guidance only" },
  { label: "After-sales & Monitoring", aumjay: "App monitoring + AMC plans", others: "Install & forget" },
  { label: "Timeline Clarity", aumjay: "Milestone plan: survey → install → net-meter", others: "Uncertain dates" },
  { label: "Roof Space Optimization", aumjay: "High-efficiency mono-PERC + custom racking", others: "Standard layout" },
];

const BIZ_ROWS: Row[] = [
  { label: "Product Supply", aumjay: "Assured Waaree supply • Priority allocation", others: "Stock dependent • Delays common" },
  { label: "EPC Capability", aumjay: "Design simulation • On-ground SOPs", others: "Limited documentation" },
  { label: "Commercial Proposals", aumjay: "Structured LCOE/ROI with case studies", others: "One-page quote" },
  { label: "Dispatch & Logistics", aumjay: "24–72h TAT (stock dep.)", others: "Ad-hoc scheduling" },
  { label: "Warranty & SLAs", aumjay: "Waaree-routed claims • SLA tracking", others: "Installer-managed • No SLA" },
  { label: "Territory Support", aumjay: "Lead pass-through • Training & co-marketing", others: "None / on request" },
];

const AUDIENCES: Audience[] = ["Home & Societies", "Commercial & Dealers"];

/** Advantage scores (0..100) → 50 is neutral. >50 favors AUMJAY. */
const SCORE_HOME: Record<string, number> = {
  "Panels & Inverters": 85,
  "Design & Simulation": 80,
  "Subsidy Handling": 92,
  "After-sales & Monitoring": 78,
  "Timeline Clarity": 72,
  "Roof Space Optimization": 68,
};
const SCORE_BIZ: Record<string, number> = {
  "Product Supply": 86,
  "EPC Capability": 76,
  "Commercial Proposals": 82,
  "Dispatch & Logistics": 81,
  "Warranty & SLAs": 88,
  "Territory Support": 73,
};

const BRAND = "#0db02b";

/* ---------------------------------- Icons ---------------------------------- */
const Icon = {
  Check: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path d="m5 13 4 4L19 7" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  Cross: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path d="M6 6l12 12M18 6 6 18" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  Spark: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4" className="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Arrow: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path d="M5 12h14M13 6l6 6-6 6" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
};

/* --------------------------------- Helpers --------------------------------- */
function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}
function useInViewOnce(threshold = 0.15) {
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

/* ------------------------------- UI Elements ------------------------------- */
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

/* ------------------------------ Advantage Meter ---------------------------- */
function AdvantageMeter({ pct }: { pct: number }) {
  // pct 0..100 (0 = Others win, 100 = AUMJAY win)
  const left = Math.max(0, Math.min(100, pct));
  const label = left >= 55 ? "AUMJAY advantage" : left <= 45 ? "Local advantage" : "Similar";
  return (
    <div className="mt-3">
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-slate-200 to-emerald-200">
        <div
          className="absolute -top-[6px] h-3.5 w-3.5 rounded-full border border-white bg-slate-900 shadow"
          style={{ left: `calc(${left}% - 7px)` }}
          aria-label={label}
          title={label}
        />
      </div>
      <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wide text-slate-500">
        <span>Local installers</span>
        <span>Neutral</span>
        <span className="text-emerald-700">AUMJAY</span>
      </div>
    </div>
  );
}

/* --------------------------------- Radar SVG ------------------------------- */
function RadarChart({
  labels,
  a,
  b,
  size = 320,
  brand = BRAND,
}: {
  labels: string[];
  a: number[]; // 0..1
  b: number[]; // 0..1
  size?: number;
  brand?: string;
}) {
  const N = labels.length;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size / 2) * 0.82;
  const step = (Math.PI * 2) / N;

  const pts = (vals: number[]) =>
    vals
      .map((v, i) => {
        const ang = -Math.PI / 2 + i * step;
        const x = cx + Math.cos(ang) * r * v;
        const y = cy + Math.sin(ang) * r * v;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  const rings = [0.35, 0.7, 1];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-md">
      {/* rings */}
      {rings.map((rv, i) => (
        <circle key={i} cx={cx} cy={cy} r={r * rv} className="fill-none stroke-slate-200" strokeWidth={1} />
      ))}
      {/* spokes */}
      {labels.map((_, i) => {
        const ang = -Math.PI / 2 + i * step;
        const x = cx + Math.cos(ang) * r;
        const y = cy + Math.sin(ang) * r;
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} className="stroke-slate-200" strokeWidth={1} />;
      })}
      {/* series: Others */}
      <polygon
        points={pts(b)}
        fill="#fecaca80"
        stroke="#ef4444"
        strokeWidth={1.5}
        style={{ filter: "drop-shadow(0 0 10px rgba(239,68,68,.15))" }}
      />
      {/* series: AUMJAY */}
      <polygon
        points={pts(a)}
        fill={`${brand}40`}
        stroke={brand}
        strokeWidth={2}
        style={{ filter: "drop-shadow(0 0 10px rgba(13,176,43,.2))" }}
      />
    </svg>
  );
}

/* --------------------------------- Main UI -------------------------------- */
export default function ComparisonTableSection() {
  const [aud, setAud] = useState<Audience>("Home & Societies");
  const [view, setView] = useState<"matrix" | "table">("matrix");

  const rows: Row[] = useMemo(() => (aud === "Home & Societies" ? HOME_ROWS : BIZ_ROWS), [aud]);
  const scores: Record<string, number> = aud === "Home & Societies" ? SCORE_HOME : SCORE_BIZ;

  // Radar values derived from advantage (A = pct, B = 1-pct)
  const radarLabels = rows.map((r) => r.label);
  const aVals = rows.map((r) => Math.max(0.15, Math.min(1, scores[r.label] / 100))); // keep a floor so it’s visible
  const bVals = rows.map((r) => Math.max(0.15, Math.min(1, 1 - scores[r.label] / 100)));

  const { ref: revealRef, seen } = useInViewOnce(0.1);

  return (
    <section id="comparison" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white py-16 sm:py-24">
      {/* subtle backdrop accents */}
      <div className="pointer-events-none absolute -top-20 -right-24 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-rose-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            Why AUMJAY vs Others
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Side-by-side clarity — made visual
          </h2>
          <p className="mt-3 text-slate-600">Pick your audience, choose a view, and see exactly where AUMJAY pulls ahead.</p>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* audience */}
          <div className="inline-flex gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            
            {AUDIENCES.map((a) => (
              <button
                key={a}
                onClick={() => setAud(a)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-semibold transition",
                  a === aud ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900"
                )}
              >
                {a}
              </button>
            ))}
          </div>
          {/* view */}
          <div className="inline-flex gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
       
            {(["matrix", "table"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-semibold transition",
                  view === v ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900"
                )}
                title={v === "matrix" ? "Visual matrix" : "Classic table"}
              >
                {v === "matrix" ? "Matrix View" : "Table View"}
              </button>
            ))}
          </div>
        </div>
 <p className="text-rose-500 font-semibold text-center mt-8"> Local = typical small EPC/contractor | <span className="text-[#0DB02B] font-semibold">AUMJAY = Waaree-backed franchise. </span> </p>
        {/* Radar + Key points */}
        <div
          ref={revealRef as any}
          className={cn(
            "mt-2 grid items-center gap-6 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 md:grid-cols-[minmax(260px,360px)_1fr]"
          )}
          style={{ opacity: seen ? 1 : 0, transform: `translateY(${seen ? 0 : 8}px)`, transition: "opacity 600ms ease, transform 600ms ease" }}
        >
   
          <div className="mx-auto w-full">
           
            <RadarChart labels={radarLabels} a={aVals} b={bVals} />
            <div className="mt-3 flex items-center justify-center gap-3 text-xs">
              <span className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-2 py-1 font-medium text-emerald-700">
                <span className="h-2 w-2 rounded-full" style={{ background: BRAND }} />
                AUMJAY
              </span>
              <span className="inline-flex items-center gap-2 rounded-md bg-rose-50 px-2 py-1 font-medium text-rose-700">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Local
              </span>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {rows.slice(0, 4).map((r) => (
              <li key={r.label} className="rounded-xl border border-emerald-600 bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-900">{r.label}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Good>{r.aumjay}</Good>
                  <span className="text-slate-400">/</span>
                  <Bad>{r.others}</Bad>
                </div>
                <AdvantageMeter pct={scores[r.label] ?? 50} />
              </li>
            ))}
          </ul>
        </div>

        {/* Matrix or Table */}
        {view === "matrix" ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((r, i) => (
              <div
                key={r.label}
                className="group relative overflow-hidden rounded-2xl border border-slate-500 bg-white p-5 shadow-sm transition hover:shadow-md"
                style={{ animation: "fadeUp 600ms ease forwards", animationDelay: `${i * 40}ms`, opacity: 0 }}
              >
                <div className="absolute -right-10 top-4 rotate-45 bg-[color:var(--brand)] px-10 py-1 text-[10px] font-semibold text-white shadow-lg"
                  style={{ ["--brand" as any]: BRAND, opacity: (scores[r.label] ?? 50) >= 70 ? 1 : 0.0, transition: "opacity 300ms" }}
                >
                  Strong win
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-emerald-600">
                    <Icon.Spark />
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">{r.label}</h3>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-emerald-700">AUMJAY</span>
                    <Good>{r.aumjay}</Good>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-rose-700">Local</span>
                    <Bad>{r.others}</Bad>
                  </div>
                </div>

                <AdvantageMeter pct={scores[r.label] ?? 50} />

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Advantage index</span>
                  <span className={cn("font-semibold", (scores[r.label] ?? 50) >= 55 ? "text-emerald-700" : (scores[r.label] ?? 50) <= 45 ? "text-rose-700" : "text-slate-600")}>
                    {(scores[r.label] ?? 50)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="w-1/3 px-5 py-4 font-semibold">What matters</th>
                  <th className="w-1/3 px-5 py-4 font-semibold">AUMJAY</th>
                  <th className="w-1/3 px-5 py-4 font-semibold">Local installers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {rows.map((r) => (
                  <tr key={r.label}>
                    <td className="px-5 py-4 font-medium text-slate-900">{r.label}</td>
                    <td className="px-5 py-4"><Good>{r.aumjay}</Good></td>
                    <td className="px-5 py-4"><Bad>{r.others}</Bad></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#book-survey"
            className="shine-btn inline-flex items-center justify-center rounded-xl bg-[color:var(--brand)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            style={{ ["--brand" as any]: BRAND }}
          >
            Book Free Survey <span className="ml-2 inline-block"><Icon.Arrow /></span>
          </a>
          <a
            href="#b2b-proposal"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:scale-[1.02] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Request Business Proposal
          </a>
        </div>

        
      </div>

      {/* local styles */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .shine-btn { position: relative; overflow: hidden; }
        .shine-btn::after {
          content: ""; position: absolute; top: 0; left: -120%;
          width: 120%; height: 100%;
          background: linear-gradient(120deg, rgba(255,255,255,0) 20%, rgba(255,255,255,.45) 50%, rgba(255,255,255,0) 80%);
          transform: skewX(-20deg);
        }
        .shine-btn:hover::after { left: 120%; transition: left 700ms; }
      `}</style>
    </section>
  );
}
