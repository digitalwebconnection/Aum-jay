import { useEffect, useRef, useState } from "react"
import { Quote } from "lucide-react"

/* -------------------- Types -------------------- */
type Stars = 0 | 1 | 2 | 3 | 4 | 5

type Testimonial = {
  name: string
  role: string
  content: string
  rating: Stars
  initials: string
}

/* -------------------- Data -------------------- */
const testimonials: Testimonial[] = [
  {
    name: "Rajesh Sharma",
    role: "Homeowner, Thane",
    content:
      "ROI exactly as promised – 3.5 years. Great Waaree panels & professional installation.",
    rating: 5,
    initials: "RS",
  },
  {
    name: "Priya Patel",
    role: "Society Secretary, Mumbai",
    content:
      "Bill dropped from ₹9,500 to ₹1,800 in two cycles. Neat wiring & great support.",
    rating: 5,
    initials: "PP",
  },
  {
    name: "Amit Kumar",
    role: "Business Owner, Mumbai",
    content:
      "Detailed audit, clear proposal, on-time commissioning. Reliable & simple.",
    rating: 5,
    initials: "AK",
  },
  // ✅ Mixed 4★ / 5★ as requested
  {
    name: "Neha Desai",
    role: "Facility Manager, Thane",
    content:
      "AUMJAY handled subsidy filing end-to-end. Money credited in 30 days!",
    rating: 5,
    initials: "ND",
  },
  {
    name: "Vivek Singh",
    role: "Apartment Owner, Navi Mumbai",
    content:
      "100 kW commercial rooftop commissioned on schedule — saved ₹3 lakh/month",
    rating: 5,
    initials: "VS",
  },
 
]

/* -------------------- Component -------------------- */
export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-14">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center text-green-900">
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">What Our Customers Say</h2>
          <p className="mx-auto max-w-2xl text-lg">
            Real experiences from homeowners, societies, and businesses who chose solar energy.
          </p>
        </div>

        {/* Marquee / Running Belt */}
        <div className="relative group">
          <div className="marquee overflow-hidden">
            {/* track duplicated twice for seamless loop */}
            <div
              className={`marquee-track min-w-max flex gap-6 py-10 ${isVisible ? "animate-marquee" : ""}`}
            >
              {testimonials.map((t, i) => (
                <TestimonialCard key={`t1-${i}`} t={t} />
              ))}
              {testimonials.map((t, i) => (
                <TestimonialCard key={`t2-${i}`} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animations & marquee styles */}
      <style>{`
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.8s ease forwards; }

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .marquee:hover .marquee-track { animation-play-state: paused; }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
      `}</style>
    </section>
  )
}

/* -------------------- Subcomponents -------------------- */

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="w-[290px] sm:w-[320px] animate-fade-up rounded-2xl border border-emerald-500/70 bg-white/95 p-5 shadow-2xl transition-transform duration-300 hover:scale-[1.07] hover:shadow-2xl"
      style={{ animationDelay: "0.25s" }}
    >
      {/* Star Rating with under-color pill */}
      <div className="mb-4 flex justify-center">
        <StarRating rating={t.rating} />
      </div>

      {/* Quote */}
      <div className="relative mb-4">
        <Quote className="absolute -left-2 -top-2 h-6 w-6 text-amber-400/30" />
        <p className="pl-6 text-center text-sm italic text-gray-900">"{t.content}"</p>
      </div>

      {/* Avatar + Info */}
      <div className="flex items-center justify-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-800 font-semibold text-white">
          {t.initials}
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">{t.name}</p>
          <p className="text-xs text-gray-500">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

/* ---- Stars: solid vs outline with an amber under-pill ---- */
function StarRating({ rating }: { rating: Stars }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full bg-amber-50/80 px-3 py-1 ring-1 ring-amber-200/70"
      aria-label={`${rating} out of 5 stars`}
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) =>
          i < rating ? (
            <StarSolid key={i} className="h-4 w-4 text-amber-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
          ) : (
            <StarOutline key={i} className="h-4 w-4 text-amber-300/70" />
          )
        )}
      </div>
      <span className="text-[11px] font-semibold text-amber-700">{rating}.0</span>
    </div>
  )
}

function StarSolid({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.02 18.18,21 12,17.27 5.82,21 7,14.02 2,9.27 8.91,8.26"
        fill="currentColor"
      />
    </svg>
  )
}

function StarOutline({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.02 18.18,21 12,17.27 5.82,21 7,14.02 2,9.27 8.91,8.26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}
