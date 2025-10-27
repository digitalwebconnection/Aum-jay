"use client";
import React, { useEffect, useMemo, useState } from "react";
import PopupExample from "../PopupExample"; // ✅ Added import

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
  const [layout] = useState<"masonry" | "grid">("masonry");
  const [sortDesc, setSortDesc] = useState(true);
  const [active, setActive] = useState<Project | null>(null);

  // ✅ Popup state
  const [showPopup, setShowPopup] = useState(false);

  const counts = useMemo(() => {
    const c = { All: PROJECTS.length, Home: 0, Society: 0, Commercial: 0 } as Record<"All" | ProjectType, number>;
    PROJECTS.forEach((p) => (c[p.type] = (c[p.type] as number) + 1));
    return c;
  }, []);

  const filtered = useMemo(() => {
    const base = typeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.type === typeFilter);
    return [...base].sort((a, b) => (sortDesc ? b.kw - a.kw : a.kw - b.kw));
  }, [typeFilter, sortDesc]);

  const spotlight = filtered[0];

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

  const { ref: revealRef, seen } = useInViewOnce(0.1);

  return (
    <section id="project" className="relative max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border-2 bg-gray-200 px-5 py-1 text-sm font-medium" style={{ color: BRAND }}>
          Recent Work
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Real sites. Clear labels. Proof of savings.
        </h2>
        <p className="mt-2 max-w-4xl mx-auto text-[14px] md:text-lg text-slate-600">
          Browse installations across Home, Society and Commercial sites. Toggle layouts, filter by type, and open any project for details.
        </p>
      </div>

      {/* Controls */}
      <div
        className="sticky z-10 mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-500 bg-white/80 p-2 backdrop-blur supports-[backdrop-filter]:bg-white/60"
        style={{ top: "calc(var(--header-h, 88px) + 8px)" }}
      >
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "rounded-full border px-2 py-1.5 text-sm font-medium transition",
                t === typeFilter
                  ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)] text-[color:var(--brand)]"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
              )}
              style={{ ["--brand" as any]: BRAND, ["--brand-soft" as any]: "#dcfce7" }}
            >
              {t} <span className="ml-1 text-slate-500">({counts[t]})</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setSortDesc((s) => !s)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-400"
        >
          Sort: kW {sortDesc ? "↓" : "↑"}
        </button>
      </div>

      {/* Spotlight */}
      {spotlight && (
        <button
          onClick={() => setActive(spotlight)}
          ref={revealRef as any}
          className={cn(
            "group relative mb-6 grid w-full overflow-hidden rounded-2xl border border-slate-200 text-left shadow-sm transition",
            seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{ transition: "opacity 600ms ease, transform 600ms ease" }}
        >
          <div className="relative aspect-[21/9] w-full bg-slate-100">
            <img
              src={spotlight.img}
              alt={`${spotlight.city} • ${spotlight.kw} kW ${spotlight.type}`}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-base font-semibold text-white">
                  ⭐ Spotlight: {spotlight.city} • {spotlight.kw} kW {spotlight.type}
                </p>
              </div>
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
        {/* ✅ Open PopupExample */}
        <button
          onClick={() => setShowPopup(true)}
          className="inline-flex items-center justify-center rounded-xl bg-[color:var(--brand)] px-12 md:px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          style={{ ["--brand" as any]: BRAND }}
        >
          Book Free Survey
        </button>

        <a
          href="#b2b-proposal"
          className="inline-flex items-center justify-center rounded-xl border border-[color:var(--brand)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:scale-[1.02] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          style={{ ["--brand" as any]: BRAND }}
        >
          Request Business Proposal
        </a>
      </div>

      {/* ✅ PopupExample Modal */}
      {showPopup && <PopupExample onClose={() => setShowPopup(false)} />}

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/70 p-2 text-white shadow hover:bg-black"
            >
              ✕
            </button>

            <div className="grid gap-0 md:grid-cols-2">
              <div className="bg-slate-100">
                <img src={active.img} alt={`${active.city}`} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-slate-900">
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
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  {/* ✅ Lightbox button opens same popup */}
                  <button
                    onClick={() => setShowPopup(true)}
                    className="inline-flex items-center justify-center rounded-xl bg-[color:var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
                    style={{ ["--brand" as any]: BRAND }}
                  >
                    Book Similar Project
                  </button>

                  <a
                    href="#b2b-proposal"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
                  >
                    Get EPC Proposal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Card ---------- */
function Card({ p, onOpen, delay = 0, masonry = false }: { p: Project; onOpen: () => void; delay?: number; masonry?: boolean }) {
  return (
    <button
      onClick={onOpen}
      className={cn(
        "group relative mb-5 h-52 overflow-hidden rounded-2xl border border-slate-200 text-left shadow-sm transition hover:shadow-lg focus:outline-none",
        masonry ? "break-inside-avoid" : ""
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="reveal relative w-full overflow-hidden bg-black/80">
        <img src={p.img} alt={p.city} className="h-full w-full object-cover opacity-90 transition group-hover:scale-[1.03]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3">
          <p className="text-sm font-semibold text-white">{p.city} • {p.kw} kW {p.type}</p>
        </div>
      </div>
    </button>
  );
}
