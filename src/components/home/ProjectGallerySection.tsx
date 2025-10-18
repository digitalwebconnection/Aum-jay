import React, { useEffect, useMemo, useState } from "react";

type ProjectType = "Home" | "Society" | "Commercial";
type Project = {
  id: string;
  city: string;
  kw: number;
  type: ProjectType;
  img: string;
  monthSaved?: number;
  caption?: string;
};

const BRAND = "#0db02b";

const PROJECTS: Project[] = [
  { id: "p1", city: "Thane", kw: 50, type: "Society", img: "https://5.imimg.com/data5/SELLER/Default/2023/8/338865678/GC/JS/AG/108236414/solar-roof-top-plants-residential-society.jpeg", monthSaved: 180000, caption: "Housing Society Rooftop" },
  { id: "p2", city: "Mumbai", kw: 12, type: "Home", img: "https://sse-website.s3.ap-south-1.amazonaws.com/blog/pune.jpeg", monthSaved: 9000, caption: "Bungalow – East-West optimized" },
  { id: "p3", city: "Navi Mumbai", kw: 80, type: "Commercial", img: "https://blog.feniceenergy.com/wp-content/uploads/2024/05/Cost-of-installing-solar-energy-in-schools.jpg", monthSaved: 235000, caption: "Warehouse EPC + Net Metering" },
  { id: "p4", city: "Pune", kw: 25, type: "Society", img: "https://5.imimg.com/data5/SELLER/Default/2022/12/WM/ZK/YE/48274905/rooftop-solar-power-plant.jpeg", monthSaved: 75000, caption: "Tower-TOP rail-less racking" },
  { id: "p5", city: "Thane", kw: 6, type: "Home", img: "https://bluebirdsolar.com/cdn/shop/articles/solar-systm-instllation-cost_b6186e7d-5879-4dcb-a5de-e7e7dbc818fa.jpg?v=1741857319", monthSaved: 4800, caption: "Compact terrace layout" },
  { id: "p6", city: "Mumbai", kw: 100, type: "Commercial", img: "https://cdn-cabda.nitrocdn.com/SVdFqKwAXGPztepQaAFhkCIrtwXjYdmL/assets/images/optimized/rev-9b8f78b/visolindia.com/wp-content/uploads/2025/06/Solar-Panels-for-Industrial.jpg", monthSaved: 300000, caption: "Factory roof – PERC modules" },
];

const TYPES: Array<"All" | ProjectType> = ["All", "Home", "Society", "Commercial"];

function inr(n?: number) {
  if (!n) return "";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

/* Reveal-once hook for section items */
function useInViewOnce(threshold = 0.15) {
  const [seen, setSeen] = useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
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

export default function ProjectGallerySection() {
  const [typeFilter, setTypeFilter] = useState<"All" | ProjectType>("All");
  const [layout,] = useState<"masonry" | "grid">("masonry");
  const [sortDesc, setSortDesc] = useState(true);
  const [active, setActive] = useState<Project | null>(null);

  const counts = useMemo(() => {
    const c = { All: PROJECTS.length, Home: 0, Society: 0, Commercial: 0 } as Record<"All" | ProjectType, number>;
    PROJECTS.forEach((p) => (c[p.type] = (c[p.type] as number) + 1));
    return c;
  }, []);

  const filtered = useMemo(() => {
    const base = typeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.type === typeFilter);
    return [...base].sort((a, b) => (sortDesc ? b.kw - a.kw : a.kw - b.kw));
  }, [typeFilter, sortDesc]);

  // Spotlight = largest kW in current filter
  const spotlight = filtered[0];

  // Keyboard nav for lightbox
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!active) return;
      const idx = filtered.findIndex((p) => p.id === active.id);
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive(filtered[(idx + 1) % filtered.length]);
      if (e.key === "ArrowLeft") setActive(filtered[(idx - 1 + filtered.length) % filtered.length]);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, filtered]);

  // Reveal-once for the gallery block
  const { ref: revealRef, seen } = useInViewOnce(0.1);

  return (
    <section id="project" className="relative max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full  border-2 bg-gray-200 px-5 py-1 text-sm font-medium" style={{ color: BRAND }}>
          Recent Work
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Real sites. Clear labels. Proof of savings.
        </h2>
        <p className="mt-2 max-w-4xl mx-auto text-[14px]  md:text-lg text-slate-600">
          Browse installations across Home, Society and Commercial sites. Toggle layouts, filter by type, and open any project for details.
        </p>
      </div>

      {/* Sticky controls */}
      <div
        className="sticky z-10 -mx-2 mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-500 bg-white/80 p-2 backdrop-blur supports-[backdrop-filter]:bg-white/60"
        style={{ top: "calc(var(--header-h, 88px) + 8px)" }}
      >
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                t === typeFilter
                  ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)] text-[color:var(--brand)]"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
              )}
              style={
                {
                  "--brand": BRAND,
                  "--brand-soft": "#dcfce7",
                } as React.CSSProperties
              }
            >
              {t} <span className="ml-1 text-slate-500">({counts[t]})</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSortDesc((s) => !s)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-400"
            title="Sort by capacity"
          >
            Sort: kW {sortDesc ? "↓" : "↑"}
          </button>
          <div className="h-6 w-px bg-slate-200" />
          {/* <div className="inline-flex rounded-lg border border-slate-300 p-1">
            <button
              onClick={() => setLayout("masonry")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm",
                layout === "masonry" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900"
              )}
              title="Masonry layout"
            >
              Masonry
            </button>
            <button
              onClick={() => setLayout("grid")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm",
                layout === "grid" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900"
              )}
              title="Grid layout"
            >
              Grid
            </button>
          </div> */}
        </div>
      </div>

      {/* Spotlight */}
      {spotlight && (
        <button
          onClick={() => setActive(spotlight)}
          className={cn(
            "group relative mb-6 grid w-full overflow-hidden rounded-2xl border border-slate-200 text-left shadow-sm transition",
            seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          ref={revealRef as any}
          style={{ transition: "opacity 600ms ease, transform 600ms ease" }}
          aria-label={`Spotlight ${spotlight.city} ${spotlight.kw}kW ${spotlight.type}`}
        >
          <div className="relative aspect-[21/9] w-full h-90 bg-slate-100">
            <img
              src={spotlight.img}
              alt={`${spotlight.city} • ${spotlight.kw} kW ${spotlight.type}`}
              className="h-90 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            {/* bottom overlay */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-base font-semibold text-white">
                  ⭐ Spotlight: {spotlight.city} • {spotlight.kw} kW {spotlight.type}
                </p>
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/90 opacity-0 transition group-hover:opacity-100">
                  <path d="M5 12h14M13 6l6 6-6 6" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              {spotlight.caption && <p className="mt-0.5 line-clamp-1 text-xs text-white/80">{spotlight.caption}</p>}
            </div>

            {/* diagonal ribbon */}
            <div className="absolute -right-10 top-4 rotate-45 bg-[color:var(--brand)] px-10 py-1 text-xs font-semibold text-white shadow-lg" style={{ ["--brand" as any]: BRAND }}>
              Top Capacity
            </div>

            {/* badges */}
            <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-md bg-white/90 px-2 py-0.5 text-xs font-medium text-slate-800 shadow">{spotlight.type}</span>
              <span className="rounded-md bg-emerald-100/90 px-2 py-0.5 text-xs font-medium text-emerald-800 shadow">{spotlight.kw} kW</span>
              {spotlight.monthSaved ? (
                <span className="rounded-md bg-white/90 px-2 py-0.5 text-xs font-medium text-slate-800 shadow">
                  ₹ {inr(spotlight.monthSaved)}/mo saved
                </span>
              ) : null}
            </div>
          </div>
        </button>
      )}

      {/* Gallery */}
      {layout === "masonry" ? (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((p, i) => (
            <Card key={p.id} p={p} onOpen={() => setActive(p)} delay={i * 40} masonry />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Card key={p.id} p={p} onOpen={() => setActive(p)} delay={i * 40} />
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="#book-survey"
          className="inline-flex items-center justify-center rounded-xl bg-[color:var(--brand)] px-12 md:px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          style={{ ["--brand" as any]: BRAND }}
        >
          Book Free Survey
        </a>
        <a
          href="#b2b-proposal"
          className="inline-flex items-center justify-center rounded-xl border border-[color:var(--brand)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:scale-[1.02] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          style={{ ["--brand" as any]: BRAND }}
        >
          Request Business Proposal
        </a>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/70 p-2 text-white shadow transition hover:bg-black"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5">
                <path d="M6 6l12 12M18 6L6 18" className="stroke-current" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="grid gap-0 md:grid-cols-2">
              <div className="bg-slate-100">
                <img src={active.img} alt={`${active.city} • ${active.kw} kW ${active.type}`} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wide" style={{ color: BRAND }}>
                  Case Study
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">
                  {active.city} • {active.kw} kW {active.type}
                </h3>
                {active.caption && <p className="mt-2 text-slate-600">{active.caption}</p>}

                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <dt className="text-slate-500">Capacity</dt>
                    <dd className="font-semibold text-slate-900">{active.kw} kW</dd>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <dt className="text-slate-500">Site Type</dt>
                    <dd className="font-semibold text-slate-900">{active.type}</dd>
                  </div>
                  {typeof active.monthSaved === "number" && (
                    <div className="col-span-2 rounded-lg bg-emerald-50 p-3">
                      <dt className="text-emerald-700">Estimated Monthly Savings</dt>
                      <dd className="text-lg font-bold text-emerald-800">₹ {inr(active.monthSaved)}</dd>
                    </div>
                  )}
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#book-survey"
                    className="inline-flex items-center justify-center rounded-xl bg-[color:var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                    style={{ ["--brand" as any]: BRAND }}
                  >
                    Book Similar Project
                  </a>
                  <a
                    href="#b2b-proposal"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  >
                    Get EPC Proposal
                  </a>
                </div>
                <p className="mt-3 text-xs text-slate-500">Savings shown are indicative; actuals vary by tariff, irradiation & load profile.</p>
              </div>
            </div>

            {/* lightbox next/prev */}
            <LightboxNav
              all={filtered}
              active={active}
              onPrev={() => {
                const idx = filtered.findIndex((p) => p.id === active.id);
                setActive(filtered[(idx - 1 + filtered.length) % filtered.length]);
              }}
              onNext={() => {
                const idx = filtered.findIndex((p) => p.id === active.id);
                setActive(filtered[(idx + 1) % filtered.length]);
              }}
            />
          </div>
        </div>
      )}

      {/* local keyframes (no Tailwind config needed) */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .reveal { animation: fadeUp 600ms ease forwards; }
      `}</style>
    </section>
  );
}

/* ---------- Card ---------- */
function Card({
  p,
  onOpen,
  delay = 0,
  masonry = false,
}: {
  p: Project;
  onOpen: () => void;
  delay?: number;
  masonry?: boolean;
}) {
  return (
    <button
      onClick={onOpen}
      className={cn(
        "group relative mb-5 h-52 overflow-hidden rounded-2xl border border-slate-200 text-left shadow-sm transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600",
        masonry ? "break-inside-avoid" : ""
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="reveal relative w-full overflow-hidden bg-black/80">
        <img
          src={p.img}
          alt={`${p.city} • ${p.kw} kW ${p.type}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03] opacity-90"
        />

        {/* overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-white">
              {p.city} • {p.kw} kW {p.type}
            </p>
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/90 opacity-0 transition group-hover:opacity-100">
              <path d="M5 12h14M13 6l6 6-6 6" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          {p.caption && <p className="mt-0.5 line-clamp-1 text-xs text-white/80">{p.caption}</p>}
        </div>

        {/* top badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1">
          <span className="rounded-md bg-white/90 px-2 py-0.5 text-xs font-medium text-slate-800 shadow">{p.type}</span>
          <span className="rounded-md bg-emerald-100/90 px-2 py-0.5 text-xs font-medium text-emerald-800 shadow">{p.kw} kW</span>
          {p.monthSaved ? (
            <span className="rounded-md bg-white/90 px-2 py-0.5 text-xs font-medium text-slate-800 shadow">₹ {inr(p.monthSaved)}/mo</span>
          ) : null}
        </div>
      </div>
    </button>
  );
}

/* ---------- Lightbox arrows ---------- */
function LightboxNav({
  all,
  active,
  onPrev,
  onNext,
}: {
  all: Project[];
  active: Project;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (!active) return null;
  const idx = all.findIndex((p) => p.id === active.id);
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];

  return (
    <>
      <button
        aria-label="Previous"
        onClick={onPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white shadow hover:bg-black"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path d="M15 6l-6 6 6 6" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </button>
      <button
        aria-label="Next"
        onClick={onNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white shadow hover:bg-black"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path d="M9 6l6 6-6 6" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </button>
      {/* thumb rail */}
      <div className="mt-1 hidden gap-2 border-t border-slate-200 bg-white/80 p-3 sm:flex">
        {[prev, active, next].map((p) => (
          <div key={p.id} className={cn("flex items-center gap-2 rounded-lg border px-2 py-1", p.id === active.id ? "border-slate-300 bg-slate-50" : "border-transparent")}>
            <img src={p.img} alt="" className="h-8 w-10 rounded object-cover" />
            <span className="text-xs text-slate-700">{p.city} • {p.kw}kW</span>
          </div>
        ))}
      </div>
    </>
  );
}
