"use client"

import React, { useEffect, useState } from "react"
import { Sun, Zap, Shield } from "lucide-react"

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
        className="relative py-20 sm:py-24 lg:py-28 -mt-5 flex items-center justify-start overflow-hidden bg-[var(--brand-dark)]"
        style={sectionStyle}
      >
        {/* Background Slideshow + Ken Burns */}
        <div className="absolute inset-0 z-0">
          {bgImages.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                i === current ? "opacity-100 animate-kenburns" : "opacity-0"
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
          <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-30">
            <div className="w-[200%] h-[200%] animate-grain bg-[radial-gradient(circle_at_30%_30%,rgba(255,197,39,0.08)_0,transparent_35%),radial-gradient(circle_at_70%_60%,rgba(25,168,68,0.06)_0,transparent_40%)]" />
          </div>
        </div>

        {/* Animated Solar Sun (glow + rotating rays) */}
     <SolarSun className="absolute -top-20 -right-20 md:-top-24 md:-right-16 lg:-top-28 lg:-right-14 w-[200px] h-[200px] md:w-[300px] md:h-[300px] opacity-50 z-30" />

        {/* Floating Energy Icon */}
        <div className="absolute top-80 right-6 md:right-34 z-30 animate-float">
          <Zap
            className="w-10 h-10 md:w-12 md:h-12"
            style={{ color: BRAND.green, filter: "drop-shadow(0 0 5px rgba(25,168,68,0.35))" }}
          />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 lg:px-0 text-left relative z-40">
          <div className="max-w-4xl transition-all duration-1000 animate-slide-up">
            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 mb-6 px-3 py-1 text-sm  text-white rounded-full shadow-lg animate-pulse-glow"
              style={{ background: BRAND.green }}
            >
              🏆 Authorized Waaree Franchise
            </span>

            {/* Heading */}
            <h1
              className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--brand-yellow) 0%, #FFE27A 25%, var(--brand-green) 50%, #7CE39D 75%, var(--brand-yellow) 100%)",
                WebkitTextStroke: "0.3px rgba(0,0,0,0.15)",
              }}
            >
              Trusted Solar Partner for Homes, Societies & Businesses
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl animate-fade-in">
              Save up to 90% on electricity bills with India’s #1 solar brand — delivered locally by AUMJAY in Mumbai & Thane.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                className="text-lg px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ background: BRAND.green, color: BRAND.white }}
              >
                🔆 Book Free Home/Society Survey
              </button>
              <button
                className="text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border-amber-400 border-2 text-white"
              >
                📩 Request Business Proposal
              </button>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-6 text-sm text-white/90 animate-fade-in-delay">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" style={{ color: BRAND.yellow }} />
                <span>18500 - kW Installed</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: BRAND.green }} />
                <span>3200 - Households Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5" style={{ color: BRAND.yellow }} />
                <span>61000 - treesSaved</span>
              </div>
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
      <svg viewBox="0 0 512 512" className="w-full h-full">
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

