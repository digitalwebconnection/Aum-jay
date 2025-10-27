"use client"
import React, { useEffect, useState } from "react"
import { Sun, Zap, ArrowRight, Globe2 } from "lucide-react"

// ---- Brand palette (Waaree-inspired)
const BRAND = {
  green: "#0DB02B",
  deep: "#0F7F34",
  yellow: "#FFC527",
  dark: "#071B0F",
  white: "#FFFFFF",
}

// ---- Background images (solar)
const bgImages = [
  "https://greenhomesystems.com/wp-content/uploads/2023/09/blog-cover-photo-98.jpg",
  "https://waaree.com/wp-content/uploads/2025/07/Solar-panels-online-scaled.jpg",
  "https://frontend-cdn.solarreviews.com/hero-placeholder.jpg",
]

// ---- TypeScript helper so CSS variables are allowed on `style`
type BrandCSSVars = React.CSSProperties & {
  ["--brand-green"]?: string
  ["--brand-deep"]?: string
  ["--brand-yellow"]?: string
  ["--brand-dark"]?: string
  ["--brand-white"]?: string
}

export default function HeroHm() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCurrent((p) => (p + 1) % bgImages.length), 5000)
    return () => clearInterval(id)
  }, [])

  const sectionStyle: BrandCSSVars = {
    "--brand-green": BRAND.green,
    "--brand-deep": BRAND.deep,
    "--brand-yellow": BRAND.yellow,
    "--brand-dark": BRAND.dark,
    "--brand-white": BRAND.white,
  }

  return (
    <>
      {/* ====== HERO ====== */}
      <section
        className="relative -mt-5 flex items-center justify-start overflow-hidden bg-[var(--brand-dark)] py-20 sm:py-24 lg:py-18"
        style={sectionStyle}
        id="home"
      >
        {/* Background Slideshow + Ken Burns */}
        <div className="absolute inset-0 z-0">
          {bgImages.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${i === current ? "opacity-100 animate-kenburns" : "opacity-0"
                }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          {/* Brand-tinted overlay to keep text legible */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(80% 90% at 20% 20%, rgba(25,168,68,0.28) 0%, rgba(7,27,15,0.6) 55%, rgba(7,27,15,0.88) 100%)",
            }}
          />
          {/* Premium grain texture */}
          <div className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-10">
            <div className="h-[200px] w-[200px] animate-grain bg-[radial-gradient(circle_at_30%_30%,rgba(255,197,39,0.08)_0,transparent_35%),radial-gradient(circle_at_70%_60%,rgba(25,168,68,0.06)_0,transparent_40%)]" />
          </div>
        </div>

        {/* Animated Solar Sun (glow + rotating rays) */}
        <SolarSun className="absolute -right-14 -top-28 z-30 h-[200px] w-[200px] opacity-50 md:-right-16 md:-top-24 md:h-[300px] md:w-[300px] lg:-right-24 lg:-top-28" />

        {/* Floating Energy Icon */}
        <div className="absolute right-6 top-80 z-30 animate-float md:right-34">
          <Zap
            className="h-10 w-10 md:h-12 md:w-12"
            style={{ color: BRAND.green, filter: "drop-shadow(0 0 5px rgba(25,168,68,0.35))" }}
          />
        </div>

        {/* Hero Content */}
        <div className="container relative z-40 mx-auto px-4 text-left lg:px-0">
          <div className="max-w-4xl animate-slide-up transition-all duration-1000">
            {/* Badge */}
            <p
              className="mb-6 inline-flex flex-col gap-0 rounded-full px-6 py-2 text-sm text-white shadow-lg animate-pulse-glow "
              style={{ background: BRAND.green }}
            >
              <span className="font-semibold text-md md:text-lg">
                🏆 Authorized Waaree Franchise
              </span>
              <span className=" text-[11px] md:text-[12px] opacity-90">
                Proud Waaree Franchise Partner – Thane & Mumbai Region
              </span>
            </p>

            {/* Heading */}
            <h1
              className="mb-6 bg-clip-text text-3xl font-extrabold text-transparent drop-shadow-lg md:text-6xl animate-gradient-x"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--brand-yellow) 0%, #FFE27A 25%, var(--brand-green) 50%, #9FBC09 75%, var(--brand-yellow) 100%)",
                WebkitTextStroke: "0.3px rgba(0,0,0,0.15)",
              }}
            >
              Trusted Solar Partner for Homes, Societies & Businesses
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-md text-base text-white/90 md:text-lg animate-fade-in">
              Save up to 90% on electricity bills with Waaree Certified Solar. Delivered locally by AUMJAY in Mumbai & Thane.
            </p>

            {/* CTAs */}
            <div className="mb-12 mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                className="rounded-lg px-4 md:px-8  shadow-black py-4 text-[15px] md:text-xl  shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ background: BRAND.green, color: BRAND.white }}
              >
                🔆 Book Free Home/Society Survey
              </button>
              <button className="rounded-lg border-2 bg-amber-50/70 border-[#9FBC09] px-4 md:px-8 py-4 shadow-green-800 text-[15px] md:text-xl font-semibold transition-all duration-300 hover:scale-105">
                Request Business Proposal
              </button>
            </div>

            {/* ===== Impact Links (NEW) ===== */}
            <div className="mt-6 grid gap-3 sm:auto-cols-fr sm:grid-flow-col">
              {/* Local Impact */}
              <a
                href="#local-impact"
                className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 backdrop-blur transition hover:bg-white/10"
              >
                <span className="inline-flex shrink-0 items-center justify-center rounded-md bg-emerald-500/20 p-2 ring-1 ring-emerald-400/30">
                  <Sun className="h-4 w-4 text-[#9FBC09]" />
                </span>
                <span className="flex-1">
                  <span className="font-semibold text-white text-md md:text-lg">AUMJAY Local Impact</span>
                  <span className="block text-xs text-white/80">
                    25+ Homes Powered | 1&nbsp;MW+ Pipeline Target (Mumbai &amp; Thane)
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 translate-x-0 text-emerald-300 transition group-hover:translate-x-1" />
              </a>

              {/* Nationwide Impact */}
              <a
                href="#nationwide-impact"
                className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 backdrop-blur transition hover:bg-white/10"
              >
                <span className="inline-flex shrink-0 items-center justify-center rounded-md bg-emerald-500/20 p-2 ring-1 ring-emerald-400/30">
                  <Globe2 className="h-4 w-4 text-[#9FBC09]" />
                </span>
                <span className="flex-1">
                  <span className="font-semibold text-white text-md md:text-lg">Waaree Nationwide Impact</span>
                  <span className="block text-xs text-white/80">
                    3200+ Homes Powered | 18500 kW Installed | 61000+ Trees Saved
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 translate-x-0 text-emerald-300 transition group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Keyframes (Ken Burns, Grain, Float, etc.) */}
        <style>{`
          @keyframes kenburns {
            0%   { transform: scale(1.1) translate(0, 0); }
            50%  { transform: scale(1.22) translate(-3%, -3%); }
            100% { transform: scale(1.1) translate(0, 0); }
          }
          .animate-kenburns { animation: kenburns 12s ease-in-out infinite; }

          @keyframes grainMove {
            0% { transform: translate(-10%, -10%); }
            100% { transform: translate(0%, 0%); }
          }
          .animate-grain { animation: grainMove 15s linear infinite alternate; }

          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50%      { transform: translateY(-12px) rotate(4deg); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }

          @keyframes slide-up {
            from { opacity: 0; transform: translateY(40px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up { animation: slide-up 1.1s ease-out forwards; }

          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fade-in 1.6s ease-in forwards; }
          .animate-fade-in-delay { animation: fade-in 2.3s ease-in forwards; }

          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 7s ease infinite; }

          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 8px rgba(255,197,39,0.55); }
            50%      { box-shadow: 0 0 16px rgba(255,197,39,0.9); }
          }
          .animate-pulse-glow { animation: pulse-glow 2s infinite alternate; }
        `}</style>
      </section>
    </>
  )
}

/* ---- Animated solar sun: glowing core + rotating rays + shimmer ring ---- */
function SolarSun({ className = "" }) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 512 512" className="h-full w-full">
        <defs>
          <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--brand-yellow)" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#FFE27A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--brand-yellow)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sunRay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-yellow)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--brand-green)" stopOpacity="0.0" />
          </linearGradient>
          <radialGradient id="ringMask" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#fff" stopOpacity="0" />
            <stop offset="86%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="ring">
            <rect width="100%" height="100%" fill="url(#ringMask)" />
          </mask>
        </defs>

        {/* Rotating rays */}
        <g className="origin-center animate-[spin_22s_linear_infinite]">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (360 / 24) * i
            return (
              <rect
                key={i}
                x={256 - 6}
                y={18}
                width={12}
                height={110}
                rx={6}
                fill="url(#sunRay)"
                transform={`rotate(${angle} 256 256)`}
                opacity={0.75}
              />
            )
          })}
        </g>

        {/* Glowing core */}
        <circle cx="256" cy="256" r="120" fill="url(#sunCore)" />

        {/* Shimmering ring */}
        <g mask="url(#ring)">
          <circle cx="256" cy="256" r="175" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={6} opacity={0.7} />
          <circle cx="256" cy="256" r="175" fill="none" stroke="var(--brand-yellow)" strokeWidth={6} className="animate-[spin_8s_linear_infinite]" />
        </g>
      </svg>
    </div>
  )
}
