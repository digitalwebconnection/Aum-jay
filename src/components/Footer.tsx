"use client"

import { useEffect, useState } from "react"
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
} from "lucide-react"

export function Footer() {
  // ===== Chat widget state =====
  const [chatOpen, setChatOpen] = useState(false)
  const [attention, setAttention] = useState(false)

  // Subtle auto “attention” pulse after load
  useEffect(() => {
    const t1 = setTimeout(() => setAttention(true), 2500)
    const t2 = setTimeout(() => setAttention(false), 6000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <footer className="bg-[#13232f] text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Address Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">Address</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-[#0DB02B]" />
              <a href="tel:+919321508896" className="hover:text-[#0DB02B]">
                +91 9321508896
              </a>
            </li>

            <li className="flex items-center gap-2">
              <Mail size={18} className="text-[#0DB02B]" />
              <a
                href="mailto:info@aumjayrenewables.com"
                className="hover:text-[#0DB02B]"
              >
                info@aumjayrenewables.com
              </a>
            </li>

            <li className="flex items-center gap-2">
              <MapPin size={58} className="text-[#0DB02B] -ms-1 -mt-15" />
              <a
                href="https://www.google.com/maps?q=Shop+No.+1,+Om+Sai+Plaza+CHSL,+Ghodbunder+Road,+Kasarvadavali,+Thane+West+-+6400615,+Maharashtra,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0DB02B]"
              >
                Shop No. 1, Om Sai Plaza CHSL, Ghodbunder Road, Kasarvadavali,
                Thane West - 6400615, Maharashtra, India.
              </a>
            </li>
          </ul>

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.instagram.com/aumjay_renewables/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-400 hover:bg-[#0DB02B] transition"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61580450987888"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-400 hover:bg-[#0DB02B] transition"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/jaymin-pathak-042b34384/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-400 hover:bg-[#0DB02B] transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-400 hover:bg-[#0DB02B] transition"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:text-[#0DB02B]">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#0DB02B]">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#0DB02B]">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-[#0DB02B]">
                Terms &amp; Condition
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-[#0DB02B]">
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Project Gallery */}
        <div>
          <h3 className="text-white font-semibold mb-4">Project Gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgwpGKV-kITl6I_3NdsLbTHufViMokl66TOg&s"
              alt="project"
              className="rounded-md h-10 w-30"
            />
            <img
              src="https://waaree.com/wp-content/uploads/2024/04/5-Tips-to-Choose-the-Best-Solar-Company.png"
              alt="project"
              className="rounded-md h-10 w-30"
            />
            <img
              src="https://media.istockphoto.com/id/1405880267/photo/two-engineers-installing-solar-panels-on-roof.jpg?s=612x612&w=0&k=20&c=OvQDbJaTnMM4jPfIA3y5vrO88i98NZJRahZtnYFZCq0="
              alt="project"
              className="rounded-md h-10 w-30"
            />
            <img
              src="https://img-cdn.publive.online/fit-in/1200x675/saur-energy/media/post_attachments/2025/01/up-solar-projects-.jpg"
              alt="project"
              className="rounded-md h-10 w-30"
            />
            <img
              src="https://5.imimg.com/data5/SELLER/Default/2024/2/389144229/VE/TO/NC/118737618/ground-mounted-solar-power-project-500x500.jpg"
              alt="project"
              className="rounded-md h-10 w-30"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4_ixIFQTiZ6V7aYw_2qS3hh7xV1m8AmxvDQ&s"
              alt="project"
              className="rounded-md h-10 w-30"
            />
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <p className="mb-4 text-sm">
            Dolor amet sit justo amet elitr clita ipsum elitr est.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-l-md w-full text-gray-900 bg-gray-100 focus:outline-none"
            />
            <button className="bg-[#0DB02B] text-white px-4 rounded-r-md hover:bg-green-600 transition">
              SignUp
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>
          © <span className="text-[#0DB02B]">AUMJAY RENEWABLES</span>, All Right
          Reserved.
        </p>
      </div>

      {/* ===== CHAT WIDGET ===== */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Popover (shows upward) */}
        <div
          className={[
            "mb-3 w-[300px] sm:w-[340px] origin-bottom-right transition-all duration-300",
            chatOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2 pointer-events-none",
          ].join(" ")}
          aria-hidden={!chatOpen}
        >
          <div className="relative">
            {/* Arrow */}
            <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 bg-white/95 border-r border-b border-black/10" />
            {/* Card */}
            <div className="rounded-2xl bg-white/95 backdrop-blur border border-black/10 shadow-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-[#0DB02B] flex items-center justify-center text-white">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  {/* online dot */}
                  <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    AUMJAY Support
                  </div>
                  <div className="text-xs text-gray-500">
                    Typically replies in a few minutes
                  </div>
                </div>
              </div>

              {/* Typing / greeting bubble */}
              <div className="mt-4">
                <div className="inline-flex items-center px-3 py-2 rounded-2xl bg-gray-100 text-gray-800 text-sm shadow-sm">
                  <span className="mr-2">Hi! How can we help?</span>
                  <span className="typing-dots">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="https://wa.me/919321508896?text=Hi%20AUMJAY%2C%20I%27m%20interested%20in%20your%20solar%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 bg-[#0DB02B] text-white font-semibold hover:bg-green-600 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href="tel:+919321508896"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 border border-gray-300 text-gray-800 hover:bg-gray-50 transition"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating button */}
        <button
          onClick={() => setChatOpen((v) => !v)}
          aria-expanded={chatOpen}
          aria-label="Chat with us on WhatsApp"
          className={[
            "relative group",
            "px-6 py-3 rounded-full",
            "bg-gradient-to-r from-[#0DB02B] via-emerald-600 to-[#0DB02B]",
            "text-white font-semibold shadow-[0_10px_30px_rgba(16,185,129,0.5)]",
            "hover:shadow-[0_14px_36px_rgba(16,185,129,0.6)] transition-transform duration-300",
            "flex items-center text-lg ",
            attention ? "animate-attention" : "",
          ].join(" ")}
        >
          {/* glow ring */}
          <span className="absolute inset-0 rounded-full ring-2 ring-white/10" />
          {/* shine */}
          <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <span className="absolute -left-10 top-0 h-full w-10 bg-white/30 blur-md rotate-12 translate-x-[-120%] group-hover:animate-shine" />
          </span>
          {/* ripple on press */}
          <span className="absolute inset-0 rounded-full pointer-events-none group-active:animate-ripple" />

          <MessageCircle className="w-6 h-6 mr-2 drop-shadow" />
          <span className="drop-shadow">Chat With Us</span>

          {/* pulsing status dot */}
          <span className="ml-2 relative">
            <span className="absolute inset-0 rounded-full bg-white/40 blur-sm" />
            <span className="relative block h-2.5 w-2.5 rounded-full bg-white/90" />
          </span>
        </button>
      </div>

      {/* Animations (shine, ripple, attention, typing) */}
      <style>{`
        @keyframes shine {
          from { transform: translateX(-120%) }
          to   { transform: translateX(220%) }
        }
        .animate-shine { animation: shine 1.2s ease-in-out forwards; }

        @keyframes ripple {
          0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.35); }
          80%  { box-shadow: 0 0 0 18px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        .group-active\\:animate-ripple:active { animation: ripple 0.6s ease-out; }

        @keyframes attention {
          0%, 100% { transform: translateY(0) scale(1) }
          50% { transform: translateY(-3px) scale(1.03) }
        }
        .animate-attention { animation: attention 1.2s ease-in-out 0s 3; }

        /* typing dots */
        .typing-dots { display: inline-flex; gap: 2px; }
        .typing-dots .dot {
          width: 5px; height: 5px; border-radius: 9999px; background: #9CA3AF;
          animation: typing 1.2s infinite ease-in-out;
        }
        .typing-dots .dot:nth-child(2) { animation-delay: .15s }
        .typing-dots .dot:nth-child(3) { animation-delay: .3s }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: .6 }
          30% { transform: translateY(-3px); opacity: 1 }
        }
      `}</style>
    </footer>
  )
}
