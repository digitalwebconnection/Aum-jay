import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Homeowner, Thane",
    content:
      "AUMJAY helped us save 80% on our electricity bills. The installation was smooth and the team was very professional.",
    rating: 5,
    initials: "RS",
  },
  {
    name: "Priya Patel",
    role: "Society Secretary, Mumbai",
    content:
      "Our housing society achieved 70% savings in just one year. Excellent service and support from the AUMJAY team.",
    rating: 5,
    initials: "PP",
  },
  {
    name: "Amit Kumar",
    role: "Business Owner, Mumbai",
    content:
      "The ROI was exactly as promised - 3.5 years. Great quality Waaree panels and professional installation.",
    rating: 5,
    initials: "AK",
  },
  // ✅ New reviews
  {
    name: "Neha Desai",
    role: "Facility Manager, Thane",
    content:
      "Detailed site audit, clear proposal, and on-time commissioning. Monitoring is simple and reliable.",
    rating: 5,
    initials: "ND",
  },
  {
    name: "Vivek Singh",
    role: "Apartment Owner, Navi Mumbai",
    content:
      "Bill dropped from ₹9,500 to under ₹1,800 in two cycles. Neat wiring and great after-sales support.",
    rating: 5,
    initials: "VS",
  },
  {
    name: "Sneha Iyer",
    role: "Operations Head, Andheri",
    content:
      "AUMJAY handled permissions, net-metering, and safety checks end-to-end. Zero hassle installation.",
    rating: 5,
    initials: "SI",
  },
]

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10 text-green-900">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Customers Say</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Real experiences from homeowners, societies, and businesses who chose solar energy.
          </p>
        </div>

        {/* Marquee / Running Belt */}
        <div className={`relative group`}>
          <div className="marquee overflow-hidden">
            {/* track duplicated twice for seamless loop */}
            <div
              className={`marquee-track flex gap-6 py-10 min-w-max ${isVisible ? "animate-marquee" : ""}`}
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
        /* entrance (kept from your version) */
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.8s ease forwards; }

        /* marquee */
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* because we duplicated content */
        }
        .animate-marquee {
          animation: marquee 30s linear infinite; /* adjust speed here */
        }
        /* pause on hover */
        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }

        /* optional float for subtle motion on cards */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
      `}</style>
    </section>
  )
}

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div
      className="w-[290px] sm:w-[320px] bg-white/90  shadow-2xl rounded-2xl border border-[#0DB02B] transition-transform duration-300 hover:scale-[1.09] hover:shadow-2xl p-5 animate-fade-up"
      style={{ animationDelay: "0.3s" }}
    >
      {/* Stars */}
      <div className="flex items-center gap-1 mb-3 justify-center">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 drop-shadow-sm" />
        ))}
      </div>

      {/* Quote */}
      <div className="relative mb-4">
        <Quote className="w-6 h-6 text-yellow-400/30 absolute -top-2 -left-2" />
        <p className="text-gray-900 italic pl-6 text-sm text-center">
          "{t.content}"
        </p>
      </div>

      {/* Avatar + Info */}
      <div className="flex items-center gap-3 justify-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold">
          {t.initials}
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
          <p className="text-xs text-gray-500">{t.role}</p>
        </div>
      </div>
    </div>
  )
}
