"use client"

import React from "react"
import { Clock, FileCheck2, Wrench, HelpCircle, ChevronDown } from "lucide-react"

const BRAND = "#0DB02B"

type Faq = { q: string; a: string }
const FAQS: Faq[] = [
  { q: "How long does subsidy take?", a: "Typically 12–40 days after commissioning, depending on DISCOM processing and site readiness." },
  { q: "Do I need to visit the DISCOM office?", a: "No. AUMJAY handles all documentation and portal submissions on your behalf." },
  { q: "What about maintenance?", a: "We provide app-based performance monitoring and optional AMC service for scheduled upkeep." },
  { q: "Do you provide EMI/loan support?", a: " Yes, via partner banks." },
  { q: "What’s covered under AMC?", a: "Panel cleaning, app monitoring, and preventive service." },
]

export default function FAQSection() {
  return (
    <section id="faq" className="relative bg-white py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#9FBC09] px-12 py-1 text-lg font-medium text-white">
            FAQs
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Answers to common solar questions
          </h2>
          <p className="mt-3 md:text-lg text-sm text-slate-600">
            Straightforward, no-jargon answers about subsidies, DISCOM steps, and ongoing maintenance.
          </p>
        </div>

        {/* Instant answers */}
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
          <Chip icon={<Clock className="h-4 w-4" />} title="Subsidy Timeline" value="12–40 days*" />
          <Chip icon={<FileCheck2 className="h-4 w-4" />} title="DISCOM Visits" value="Not required" />
          <Chip icon={<Wrench className="h-4 w-4" />} title="After-sales" value="App + AMC" />
        </div>

        {/* Accordion */}
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {FAQS.map((f, i) => (
            <details key={i} className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-start gap-3 p-5 text-left hover:bg-slate-50">
                <span
                  className="mt-0.5 inline-grid h-6 w-6 place-items-center rounded-md text-white shadow"
                  style={{ background: BRAND }}
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </span>
                <p className="flex-1 text-sm font-semibold text-slate-900">{f.q}</p>
                <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-slate-500 transition group-open:rotate-180" />
              </summary>

              {/* ANSWER rendered once (below), not in summary */}
              <div className="px-14 pb-5 text-sm text-slate-600 hidden group-open:block animate-fade-in">
                {f.a}
              </div>
            </details>
          ))}
        </div>


      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 text-white">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="h-8 w-full">
          <path d="M0,48 C240,16 480,16 720,48 C960,80 1200,80 1440,48 L1440,0 L0,0 Z" fill="currentColor" />
        </svg>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        .animate-fade-in { animation: fade-in .25s ease-out both }
      `}</style>
    </section>
  )
}

/* ------------ tiny subcomponents ------------ */

function Chip({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
      <div className="rounded-lg bg-emerald-100 p-1.5 text-emerald-700">{icon}</div>
      <div className="leading-tight">
        <p className="text-xs text-emerald-800">{title}</p>
        <p className="text-sm font-semibold text-emerald-900">{value}</p>
      </div>
    </div>
  )
}
