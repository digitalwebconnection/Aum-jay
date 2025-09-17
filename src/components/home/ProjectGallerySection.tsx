// src/home/ProjectGallerySection.tsx
import { useMemo, useState } from "react";

type ProjectType = "Home" | "Society" | "Commercial";

type Project = {
  id: string;
  city: string;
  kw: number;
  type: ProjectType;
  img: string;        // put your /public path (e.g., "/g/thane-50.jpg")
  monthSaved?: number; // estimated ₹ saved / month (optional)
  caption?: string;    // optional custom caption
};

const PROJECTS: Project[] = [
  { id: "p1", city: "Thane", kw: 50, type: "Society", img: "https://5.imimg.com/data5/SELLER/Default/2023/8/338865678/GC/JS/AG/108236414/solar-roof-top-plants-residential-society.jpeg", monthSaved: 180000, caption: "Housing Society Rooftop" },
  { id: "p2", city: "Mumbai", kw: 12, type: "Home", img: "https://static.toiimg.com/thumb/msid-100601415,width-1280,height-720,resizemode-72/100601415.jpg", monthSaved: 9000, caption: "Bungalow – East-West optimized" },
  { id: "p3", city: "Navi Mumbai", kw: 80, type: "Commercial", img: "https://blog.feniceenergy.com/wp-content/uploads/2024/05/Cost-of-installing-solar-energy-in-schools.jpg", monthSaved: 235000, caption: "Warehouse EPC + Net Metering" },
  { id: "p4", city: "Pune", kw: 25, type: "Society", img: "https://5.imimg.com/data5/SELLER/Default/2022/12/WM/ZK/YE/48274905/rooftop-solar-power-plant.jpeg", monthSaved: 75000, caption: "Tower-TOP rail-less racking" },
  { id: "p5", city: "Thane", kw: 6, type: "Home", img: "https://sse-website.s3.ap-south-1.amazonaws.com/blog/seaworrd-3-min.png", monthSaved: 4800, caption: "Compact terrace layout" },
  { id: "p6", city: "Mumbai", kw: 100, type: "Commercial", img: "https://cdn-cabda.nitrocdn.com/SVdFqKwAXGPztepQaAFhkCIrtwXjYdmL/assets/images/optimized/rev-9b8f78b/visolindia.com/wp-content/uploads/2025/06/Solar-Panels-for-Industrial.jpg", monthSaved: 300000, caption: "Factory roof – PERC modules" },
];

const TYPES: Array<"All" | ProjectType> = ["All", "Home", "Society", "Commercial"];

function formatRupees(n?: number) {
  if (!n) return "";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

export default function ProjectGallerySection() {
  const [typeFilter, setTypeFilter] = useState<"All" | ProjectType>("All");
  const [active, setActive] = useState<Project | null>(null);

  const visible = useMemo(() => {
    return typeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === typeFilter);
  }, [typeFilter]);

  return (
    <section id="projects" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-[#0db02b]">
              Recent Work
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Project Gallery — labeled & location-first
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Real installations with clear captions so homeowners, societies and businesses can
              see what’s possible on their rooftops.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={[
                  "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                  t === typeFilter
                    ? "border-[#0db02b] bg-emerald-50 text-[#0db02b]"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 text-left transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              aria-label={`${p.city} • ${p.kw} kW ${p.type}`}
            >
              <div className="aspect-[4/3] w-full overflow-hidden  bg-black/80 opacity-600 transition ">
                {/* image */}
                <img
                  src={p.img}
                  alt={`${p.city} • ${p.kw} kW ${p.type}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>

              {/* label overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-white">
                    {p.city} • {p.kw} kW {p.type}
                  </p>
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/90 opacity-0 transition group-hover:opacity-100">
                    <path d="M5 12h14M13 6l6 6-6 6" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
                {p.caption && <p className="mt-0.5 line-clamp-1 text-xs text-white/80">{p.caption}</p>}
              </div>

              {/* top badges */}
              <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1">
                <span className="rounded-md bg-white/90 px-2 py-0.5 text-xs font-medium text-slate-800 shadow">
                  {p.type}
                </span>
                <span className="rounded-md bg-emerald-100/90 px-2 py-0.5 text-xs font-medium text-emerald-800 shadow">
                  {p.kw} kW
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Helper text */}
        {/* <p className="mt-4 text-center text-xs text-slate-500">
          Captions show location, capacity and site type. Tap a tile to view details.
        </p> */}

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#book-survey"
            className="inline-flex items-center justify-center rounded-xl bg-[#0db02b] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Book Free Survey
          </a>
          <a
            href="#b2b-proposal"
            className="inline-flex items-center justify-center rounded-xl border border-[#0db02b] bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:scale-[1.02] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Request Business Proposal
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
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
                <img
                  src={active.img}
                  alt={`${active.city} • ${active.kw} kW ${active.type}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                  Case Study
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">
                  {active.city} • {active.kw} kW {active.type}
                </h3>
                {active.caption && (
                  <p className="mt-2 text-slate-600">{active.caption}</p>
                )}

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
                      <dd className="text-lg font-bold text-emerald-800">
                        ₹ {formatRupees(active.monthSaved)}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#book-survey"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  >
                    Book Similar Project
                  </a>
                  <a
                    href="#b2b-proposal"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:scale-[1.02] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  >
                    Get EPC Proposal
                  </a>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Savings shown are indicative; actuals vary by tariff, irradiation & load profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
