"use client"

import React, { useState, useCallback, useEffect, useRef } from "react"
import { MapPin, Zap, X, ArrowRight, Gauge, Percent, Building2 } from "lucide-react"
import PopupExample from "../PopupExample"

/* -------------------- Brand -------------------- */
const BRAND = "#0DB02B"

/* -------------------- Types & Helpers -------------------- */
type CaseType = "Home" | "Society" | "Commercial"

type CaseStudy = {
  id: string
  title: string
  location: string
  type: CaseType
  sizeKW: number
  beforeBill: number        // ₹/month before solar
  afterBill: number         // ₹/month after solar
  beforeImg: string
  afterImg: string
  notes?: string[]
}

const INR = (n: number) =>
  `₹ ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)))}`

const pricePerKW = (t: CaseType) => (t === "Commercial" || t === "Society" ? 45000 : 55000)

/* -------------------- Demo Data (replace with yours) -------------------- */
const CASES: CaseStudy[] = [
  {
    id: "c1",
    title: "Bungalow Rooftop",
    location: "Thane (GB Road)",
    type: "Home",
    sizeKW: 6,
    beforeBill: 9500,
    afterBill: 1800,
    beforeImg:
      "https://www.propertycrow.com/photos/38/photo-405.jpeg",
    afterImg:
      "https://4.imimg.com/data4/OH/VL/MY-671351/2.jpg",
    notes: ["Rail-less mounting to preserve waterproofing", "Mono-PERC high-efficiency modules"],
  },
  {
    id: "c2",
    title: "Society Terrace Block A",
    location: "Mumbai (Andheri)",
    type: "Society",
    sizeKW: 50,
    beforeBill: 265000,
    afterBill: 85000,
    beforeImg:
      "https://files.propertywala.com/photos/7f/J303720119.front-view.89727l.jpg",
    afterImg:
      "https://solarizeindia.in/wp-content/uploads/2024/10/150-housing-societies-in-Dwarka-to-get-rooftop-solar-installations-FB-1200x628-compressed-1024x536.jpg",
    notes: ["Shared common-area loads offset", "AMC + app-based monitoring for RWA"],
  },
  {
    id: "c3",
    title: "Warehouse EPC",
    location: "Navi Mumbai",
    type: "Commercial",
    sizeKW: 100,
    beforeBill: 420000,
    afterBill: 120000,
    beforeImg:
      "https://www.itln.in/h-upload/2025/10/03/87082-mahindra-logistics-guwahati-multi-client-warehousing-facility.webp",
    afterImg:
      "https://www.shutterstock.com/image-photo/solar-energy-factory-warehouse-building-600nw-2517264391.jpg",
    notes: ["North-south stringing to minimise shading", "Net-metering with surge protection SOPs"],
  },
]

/* ============================================================= */

export default function CaseStudiesSection() {
  const [active, setActive] = useState<CaseStudy | null>(null)
  const [showPopup, setShowPopup] = useState(false);
  return (
    <section id="case-studies" className="relative bg-white py-7 sm:py-10">
      {/* Top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            Case Studies
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Before & After: real savings on real rooftops
          </h2>
          <p className="mt-3 text-sm md:text-lg text-slate-600">
            Photos, numbers, and payback—so you can see exactly how solar performs for homes,
            societies, and businesses.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((cs) => (
            <CaseCard key={cs.id} cs={cs} onOpen={() => setActive(cs)} />
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => setShowPopup(true)}
            className="shine-btn inline-flex items-center justify-center rounded-xl bg-[color:var(--brand)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            style={{ ["--brand" as any]: BRAND }}
          >
            Book Free Survey

          </button>
          <a
            href="#b2b-proposal"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:shadow-md"
          >
            Request Business Proposal
          </a>
        </div>
        {/* Popup */}
        {showPopup && <PopupExample onClose={() => setShowPopup(false)} />}
      </div>

      {/* Modal */}
      {active && <CaseModal cs={active} onClose={() => setActive(null)} />}

      {/* Local styles */}
      <style>{`
        @keyframes slide-up { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        .animate-slide-up { animation: slide-up .5s ease-out both }
      `}</style>
    </section>
  )
}

/* ===================== Card ===================== */

function CaseCard({ cs, onOpen }: { cs: CaseStudy; onOpen: () => void }) {

  const savings = cs.beforeBill - cs.afterBill
  const pct = (savings / cs.beforeBill) * 100
  const capex = cs.sizeKW * pricePerKW(cs.type)
  const payback = capex / (Math.max(1, savings) * 12)

  return (
    <article className="group relative  overflow-hidden rounded-2xl bg-white  border-1 border-black/40  shadow-xl  shadow-black/40 transition hover:-translate-y-0.5  hover:shadow-2xl">
      {/* Before/After slider - NEW implementation */}
      <CompareSlider before={cs.beforeImg} after={cs.afterImg} label={`${cs.location} • ${cs.sizeKW} kW`} />

      {/* Content */}
      <div className="p-5">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">{cs.type}</span>
          <span className="text-xs text-slate-500">{cs.location}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{cs.title}</h3>

        {/* Chips */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Chip title="Before" value={INR(cs.beforeBill)} />
          <Chip title="After" value={INR(cs.afterBill)} />
          <Chip title="Saved" value={`${Math.round(pct)}%`} accent />
        </div>

        {/* Bottom row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Zap className="h-4 w-4 text-emerald-600" />
            <span>{cs.sizeKW} kW</span>
            <span className="mx-1">•</span>
            <Gauge className="h-4 w-4 text-emerald-600" />
            <span>Payback ~ {payback.toFixed(1)} yrs</span>
          </div>
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900 transition hover:shadow-sm"
          >
            View case <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}

/* ===================== Compare Slider (Touch & Mouse Enabled) ===================== */

function CompareSlider({
  before,
  after,
  label,
}: {
  before: string
  after: string
  label?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(60) // %
  const [isDragging, setIsDragging] = useState(false)

  // Function to calculate the position based on event (mouse or touch)
  const calculatePosition = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const newPos = ((clientX - rect.left) / rect.width) * 100
      setPos(Math.min(100, Math.max(0, newPos)))
    }
  }

  // --- MOUSE HANDLERS ---
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    calculatePosition(e.clientX)
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      calculatePosition(e.clientX)
    },
    [isDragging]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // --- TOUCH HANDLERS ---
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    calculatePosition(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    // Prevent scrolling while dragging the slider
    e.preventDefault()
    calculatePosition(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Global event listeners for drag end (important for mouse dragging outside the box)
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // Apply style for dragging feedback
      style={{
        cursor: isDragging ? 'ew-resize' : 'grab',
      }}
    >
      {/* after image (base) */}
      <img src={after} alt="After solar" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />

      {/* before image (clipped) */}
      <img
        src={before}
        alt="Before solar"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}
        loading="lazy"
      />

      {/* center handle (pointer-events-none prevents it from blocking the drag start) */}
      <div
        className="absolute inset-y-0 z-20 pointer-events-none"
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <div className="h-full w-[3px] bg-white/80 mix-blend-overlay shadow-lg" />
        <div className="absolute top-1/2 -translate-y-1/2 -ml-3 h-8 w-6 rounded-full border-2 border-white bg-emerald-500 shadow-xl flex items-center justify-center">
          {/* Simple arrow icon for handle */}
          <ArrowRight className="h-3 w-3 rotate-45 text-white" />
        </div>
      </div>

      {/* label gradient */}
      {label && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-2 z-10">
          <p className="text-xs font-medium text-white">{label}</p>
        </div>
      )}
    </div>
  )
}

/* ===================== Modal ===================== */

function CaseModal({ cs, onClose }: { cs: CaseStudy; onClose: () => void }) {


  const savings = cs.beforeBill - cs.afterBill
  const pct = (savings / cs.beforeBill) * 100
  const capex = cs.sizeKW * pricePerKW(cs.type)
  const payback = capex / (Math.max(1, savings) * 12)

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-slide-up" // Added slide-up animation
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-30 rounded-full bg-black/70 p-2 text-white shadow transition hover:bg-black"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          <div className="bg-slate-100">
            <CompareSlider before={cs.beforeImg} after={cs.afterImg} />
          </div>
          <div className="p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Case Study</p>
            <h3 className="mt-1 text-2xl font-semibold text-slate-900">{cs.title}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="h-4 w-4 text-emerald-600" />
              {cs.location} • {cs.sizeKW} kW • {cs.type}
            </p>

            {/* KPIs */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <KPI title="Before bill" value={INR(cs.beforeBill)} />
              <KPI title="After bill" value={INR(cs.afterBill)} />
              <KPI title="Monthly saving" value={INR(savings)} icon={<Percent className="h-4 w-4" />} />
              <KPI title="Saving %" value={`${Math.round(pct)}%`} />
              <KPI title="Estimated capex" value={INR(capex)} icon={<Building2 className="h-4 w-4" />} />
              <KPI title="Payback (est.)" value={`${payback.toFixed(1)} yrs`} />
            </div>

            {/* Notes */}
            {cs.notes?.length ? (
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {cs.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            ) : null}

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#book-survey"
                className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:brightness-95"
                style={{ background: BRAND }}
              >
                Book Similar Project
              </a>
              <a
                href="#b2b-proposal"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:scale-[1.02] hover:shadow-md"
              >
                Get EPC Proposal
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Savings are indicative; actuals vary by tariff, irradiation, and load profile.
            </p>
          </div>
        </div>
      </div>

    </div>

  )
}

/* ===================== Tiny UI bits ===================== */

function Chip({ title, value, accent = false }: { title: string; value: string; accent?: boolean }) {
  return (
    <div
      className={[
        "rounded-lg px-2.5 py-2 text-xs ring-1",
        accent ? "bg-emerald-50 ring-emerald-200 text-emerald-800" : "bg-slate-50 ring-slate-200 text-slate-800",
      ].join(" ")}
    >
      <p className="text-[11px] uppercase tracking-wide opacity-70">{title}</p>
      <p className="mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  )
}

function KPI({ title, value, icon }: { title: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200">
      <p className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-slate-500">
        {icon} {title}
      </p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  )
}
