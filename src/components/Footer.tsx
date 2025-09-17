"use client"

import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  MessageCircle,
  Facebook,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Instagram,
  ShieldCheck,
  BadgeCheck,
  Leaf,
  Building2,
  ChevronRight,
} from "lucide-react"

const BRAND = "#0DB02B"

export function Footer() {
  /* ---------------- Chat widget state ---------------- */
  const [chatOpen, setChatOpen] = useState(false)
  const [attention, setAttention] = useState(false)

  // Subtle nudge
  useEffect(() => {
    const t1 = setTimeout(() => setAttention(true), 2000)
    const t2 = setTimeout(() => setAttention(false), 6000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // 🔔 AUTO-OPEN: open chat after 5s (once per session)
  useEffect(() => {
    const key = "aj_auto_opened_chat"
    const already = typeof window !== "undefined" ? sessionStorage.getItem(key) : "1"
    const t = setTimeout(() => {
      if (!already) {
        setChatOpen(true)
        try { sessionStorage.setItem(key, "1") } catch {}
      }
    }, 5000)
    return () => clearTimeout(t)
  }, [])

  /* ---------------- Newsletter (client-only demo) ---------------- */
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState<null | "ok" | "err">(null)
  const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email])
  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!emailValid) { setSent("err"); return }
    // TODO: wire to backend (Mailchimp, Beehiiv, etc.)
    setSent("ok")
    setEmail("")
  }

  return (
    <footer className="relative overflow-hidden bg-[#0c1820] text-slate-300">
      {/* top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

      {/* Partner ribbon */}
      <div className="mx-auto max-w-7xl px-6 pb-6 pt-10">
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-emerald-200/90">
          {[
            ["ALMM Listed", <ShieldCheck key="s" className="h-3.5 w-3.5" />],
            ["IEC Certified", <BadgeCheck key="b" className="h-3.5 w-3.5" />],
            ["Waaree Supply", <Building2 key="w" className="h-3.5 w-3.5" />],
            ["Green Energy", <Leaf key="l" className="h-3.5 w-3.5" />],
          ].map(([t, icon], i) => (
            <span key={i} className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1">
              {icon}{t}
            </span>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid grid-cols-1 gap-15 md:grid-cols-4">
          {/* Brand + newsletter */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div
                className="grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--brand)] text-white shadow"
                style={{ ["--brand" as any]: BRAND }}
              >
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Powering Thane–Mumbai rooftops</h3>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm text-slate-400">
              ALMM/IEC components, Waaree-backed supply, and end-to-end EPC—from survey to net-metering.
              Transparent timelines, clean installs, real savings.
            </p>

            {/* Newsletter */}
            <form onSubmit={onSubmit} className="mt-5 rounded-2xl 5 p-2 backdrop-blur">
              <div className="flex overflow-hidden rounded-xl">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setSent(null) }}
                  placeholder="Enter your email for subsidy & ROI tips"
                  className="w-full px-3 py-3 text-sm text-white bg-amber-50 placeholder:text-black/80 focus:outline-none"
                  aria-label="Email"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap bg-[color:var(--brand)] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95"
                  style={{ ["--brand" as any]: BRAND }}
                >
                  Subscribe
                </button>
              </div>
              <div className="mt-2 text-xs">
                {sent === "ok" && <span className="text-emerald-300">Thanks! Check your inbox for a confirmation.</span>}
                {sent === "err" && <span className="text-rose-300">Please enter a valid email.</span>}
              </div>
            </form>

            {/* Social */}
            <div className="mt-5 flex gap-3">
              {[
                ["https://www.instagram.com/aumjay_renewables/", <Instagram key="i" className="h-4 w-4" />, "Instagram"],
                ["https://www.facebook.com/profile.php?id=61580450987888", <Facebook key="f" className="h-4 w-4" />, "Facebook"],
                ["https://www.linkedin.com/in/jaymin-pathak-042b34384/", <Linkedin key="l" className="h-4 w-4" />, "LinkedIn"],
                ["#", <Youtube key="y" className="h-4 w-4" />, "YouTube"],
              ].map(([href, icon, label], i) => (
                <a
                  key={i}
                  href={href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label as string}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:bg-green-800"
                >
                  {icon}
                  <span className="hidden sm:inline">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Visit us */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Visit Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-[color:var(--brand)]" style={{ ["--brand" as any]: BRAND }} />
                <a href="tel:+919321508896" className="hover:text-white">+91 9321508896</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-[color:var(--brand)]" style={{ ["--brand" as any]: BRAND }} />
                <a href="mailto:info@aumjayrenewables.com" className="hover:text-white">info@aumjayrenewables.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-[color:var(--brand)]" style={{ ["--brand" as any]: BRAND }} />
                <a
                  href="https://www.google.com/maps?q=Shop+No.+1,+Om+Sai+Plaza+CHSL,+Ghodbunder+Road,+Kasarvadavali,+Thane+West+-+6400615,+Maharashtra,+India"
                  target="_blank" rel="noopener noreferrer" className="hover:text-white"
                >
                  Shop No. 1, Om Sai Plaza CHSL, Ghodbunder Road, Kasarvadavali, Thane West – 6400615, Maharashtra
                </a>
              </li>
            </ul>

            <div className="mt-4 rounded-xl border border-white/10">
              <iframe
                title="AUMJAY Map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-40 w-117 rounded-xl"
                src="https://www.google.com/maps?q=Om%20Sai%20Plaza%20CHSL%20Kasarvadavali%20Thane&output=embed"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Quick Links</h4>
            <nav className="space-y-2 text-sm">
              {[
                ["/about", "About Us"],
                ["/contact", "Contact Us"],
                ["/services", "Our Services"],
                ["/support", "Support"],
                ["/terms", "Terms & Conditions"],
              ].map(([to, label]) => (
                <Link
                  key={to as string}
                  to={to as string}
                  className="group flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 transition group-hover:text-white" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl border-t border-white/30 px-6 py-4 text-xs text-slate-400">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p>
            © <span className="text-emerald-300">AUMJAY RENEWABLES</span>. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating chat widget */}
      <ChatWidget chatOpen={chatOpen} attention={attention} onToggle={() => setChatOpen(v => !v)} />

      {/* Local animations */}
      <style>{`
        @keyframes shine { from { transform: translateX(-120%) } to { transform: translateX(220%) } }
        .animate-shine { animation: shine 1.2s ease-in-out forwards }
        @keyframes ripple { 0%{ box-shadow:0 0 0 0 rgba(255,255,255,.35) } 80%{ box-shadow:0 0 0 18px rgba(255,255,255,0) } 100%{ box-shadow:0 0 0 0 rgba(255,255,255,0) } }
        .group-active\\:animate-ripple:active { animation: ripple .6s ease-out }
        @keyframes attention { 0%,100%{ transform:translateY(0) scale(1) } 50%{ transform:translateY(-3px) scale(1.03) } }
        .animate-attention { animation: attention 1.2s ease-in-out 0s 3 }
        .typing-dots { display:inline-flex; gap:2px }
        .typing-dots .dot { width:5px; height:5px; border-radius:9999px; background:#9CA3AF; animation: typing 1.2s infinite ease-in-out }
        .typing-dots .dot:nth-child(2){ animation-delay:.15s }
        .typing-dots .dot:nth-child(3){ animation-delay:.3s }
        @keyframes typing { 0%,60%,100%{ transform:translateY(0); opacity:.6 } 30%{ transform:translateY(-3px); opacity:1 } }
      `}</style>
    </footer>
  )
}

/* ===================== Chat widget ===================== */

function ChatWidget({
  chatOpen,
  attention,
  onToggle,
}: {
  chatOpen: boolean
  attention: boolean
  onToggle: () => void
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover (opens above the button) */}
      <div
        className={[
          "mb-3 w-[300px] sm:w-[340px] origin-bottom-right transition-all duration-300",
          chatOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-95 opacity-0",
        ].join(" ")}
        aria-hidden={!chatOpen}
      >
        <div className="relative">
          <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-black/10 bg-white/95" />
          <div className="rounded-2xl border border-black/10 bg-white/95 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--brand)] text-white"
                  style={{ ["--brand" as any]: BRAND }}
                >
                  <MessageCircle className="h-5 w-5" />
                </div>
                <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">AUMJAY Support</div>
                <div className="text-xs text-gray-500">Typically replies in a few minutes</div>
              </div>
            </div>

            {/* Greeting */}
            <div className="mt-4">
              <div className="inline-flex items-center rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-800 shadow-sm">
                <span className="mr-2">Hi! How can we help?</span>
                <span className="typing-dots">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a
                href="https://wa.me/919321508896?text=Hi%20AUMJAY%2C%20I%27m%20interested%20in%20your%20solar%20solutions."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--brand)] px-4 py-2.5 font-semibold text-white transition hover:brightness-95"
                style={{ ["--brand" as any]: BRAND }}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="tel:+919321508896"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 transition hover:bg-gray-50"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={onToggle}
        aria-expanded={chatOpen}
        aria-label="Chat with us on WhatsApp"
        className={[
          "group relative ms-40 flex items-center rounded-full px-6 py-3 text-lg font-semibold text-white",
          "bg-gradient-to-r from-[color:var(--brand)] via-emerald-600 to-[color:var(--brand)]",
          "shadow-[0_10px_30px_rgba(16,185,129,0.5)] transition-transform duration-300 hover:shadow-[0_14px_36px_rgba(16,185,129,0.6)]",
          attention ? "animate-attention" : "",
        ].join(" ")}
        style={{ ["--brand" as any]: BRAND }}
      >
        <span className="absolute inset-0 rounded-full ring-2 ring-white/10" />
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute -left-10 top-0 h-full w-10 translate-x-[-120%] rotate-12 bg-white/30 blur-md group-hover:animate-shine" />
        </span>
        <span className="group-active:animate-ripple pointer-events-none absolute inset-0 rounded-full" />

        <MessageCircle className="mr-2 h-6 w-6 drop-shadow" />
        <span className="drop-shadow">Chat With Us</span>

        <span className="ml-2 relative">
          <span className="absolute inset-0 rounded-full bg-white/40 blur-sm" />
          <span className="relative block h-2.5 w-2.5 rounded-full bg-white/90" />
        </span>
      </button>
    </div>
  )
}
