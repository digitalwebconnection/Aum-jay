"use client"

import { Shield, TrendingUp, Award, Building } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Waaree brand palette
const BRAND = {
  green: "#19A844",
  deep: "#0F7F34",
  yellow: "#FFC527",
  dark: "#071B0F",
}

const highlights = [
  {
    icon: Shield,
    title: "25-Year Warranty",
    description: "Waaree Grade-A panels, performance backed for 25 years.",
    tint: "from-[rgba(25,168,68,0.14)] to-[rgba(255,197,39,0.12)]",
    iconColor: BRAND.green,
  },
  {
    icon: Award,
    title: "Waaree Certified",
    description: "Waaree Grade-A panels, performance backed for 25 years.",
    tint: "from-[rgba(255,197,39,0.18)] to-[rgba(25,168,68,0.08)]",
    iconColor: BRAND.green,
  },
  {
    icon: TrendingUp,
    title: "3–4 Year ROI",
    description: "Fastest payback with smart sizing & net-metering.",
    tint: "from-[rgba(25,168,68,0.14)] to-[rgba(255,197,39,0.12)]",
    iconColor: BRAND.green,
  },
  {
    icon: Building,
    title: "625 sq. ft. Showroom",
    description: "Local consultations + after - sales service in Thane & Mumbai,  Open on week 6 days for walk-ins & consultations.",
    tint: "from-[rgba(255,197,39,0.18)] to-[rgba(25,168,68,0.08)]",
    iconColor: BRAND.green,
  },
]

export default function HighlightsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Respect user motion preferences
    // const prefersReduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-14"
      id="about"
    >
      {/* Background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-40 animate-spin-slow-reverse"
        style={{ background: "radial-gradient(circle, rgba(25,168,68,0.20) 0%, transparent 60%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-28 w-[600px] h-[600px] rounded-full blur-3xl opacity-40 animate-spin-slow"
        style={{ background: "radial-gradient(circle, rgba(255,197,39,0.22) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Brand alignment header */}
        <div className={`text-center mb-4 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-5"}`} style={{ animationDelay: isVisible ? "0.2s" : "0s" }}>
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-semibold shadow"
            style={{ color: BRAND.dark, border: "1px solid green" }}
          >
            ✅ Brand Alignment with Waaree
          </span>
        </div>

        <h2 className={`text-2xl md:text-4xl font-extrabold text-center text-black mb-3 transition-colors duration-300 hover:text-[#0db02b] ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-5"}`} style={{ animationDelay: isVisible ? "0.4s" : "0s" }}>
          Why Choose AUMJAY + Waaree?
        </h2>
        <p className={`text-center text-[14px] md:text-lg text-black font-bold max-w-5xl mx-auto mb-12 transition-colors duration-300 hover:text-green-800 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-5"}`} style={{ animationDelay: isVisible ? "0.6s" : "0s" }}>
          Consistent Waaree palette reinforces brand equity. We spotlight the exact trust drivers customers look for: <br />
          <span className="font-semibold text-black/80"> 25-year warranty, Waaree certification, 3–4 year ROI, and a local 625 sq. ft. showroom.</span>
        </p>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {highlights.map((h, index) => {
            const Icon = h.icon
            return (
              <div
                key={h.title}
                className={`group  shadow-black relative overflow-hidden rounded-2xl p-6 shadow-lg border border-black/50
                            transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-2xl hover:scale-105
                            ${isVisible ? "animate-card-pop-in" : "opacity-0 scale-95"}`}
                style={{ animationDelay: isVisible ? `${0.2 + index * 0.1}s` : "0s", background: "white" }}
              >
                {/* Card gradient tint */}
                <div className={`absolute inset-0 bg-gradient-to-br ${h.tint} animate-gradient-shift opacity-80`} aria-hidden />
                {/* Shine sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0DB02B] to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-[2600ms] ease-out" aria-hidden />

                <div className="relative z-10 text-center  ">
                  <div className="mb-5 flex justify-center">
                    <div className="p-4 rounded-full bg-black/25 backdrop-blur-sm shadow-md animate-icon-bounce group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-10 h-10" style={{ color: h.iconColor }} aria-hidden />
                      <span className="sr-only">{h.title}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{h.title}</h3>
                  <p className="text-sm leading-relaxed">{h.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust ribbon */}
        <div className={`mt-10 ms-30 flex flex-wrap items-center justify-center gap-3 text-center ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-5"}`} style={{ animationDelay: isVisible ? "0.8s" : "0s" }}>
          <span className="inline-flex  items-center gap-2 px-5 py-1 rounded-full text-xs font-semibold"
            style={{ background: BRAND.deep, color: "white", border: "1px solid rgba(25,168,68,0.35)" }}>
            🏆 Authorized Waaree Franchise
          </span>
          <span className="text-black text-sm hidden sm:inline">•</span>
          <span className="inline-flex   items-center gap-2 px-5 py-1 rounded-full text-xs font-semibold"
            style={{ background: BRAND.yellow, color: "black", border: "1px solid rgba(205,197,39,0.35)" }}>
            Mumbai & Thane Service
          </span>
          <span className="text-black text-sm hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-2 px-5 py-1 rounded-full text-xs font-semibold"
            style={{ background: BRAND.deep, color: "white", border: "1px solid rgba(25,168,68,0.35)" }}>
            Backed by India’s #1 Solar Brand – Waaree Energies Ltd
          </span>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        @keyframes card-pop-in {
          0% { opacity: 0; transform: scale(0.95) translateY(20px); }
          60% { opacity: 1; transform: scale(1.02) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-card-pop-in { animation: card-pop-in 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 100s linear infinite; }

        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 100s linear infinite; }

        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-icon-bounce { animation: icon-bounce 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </section>
  )
}