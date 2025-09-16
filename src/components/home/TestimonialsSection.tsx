import { useEffect, useRef, useState } from "react"
import { Star, Quote,  } from "lucide-react"

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
]

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-14  overflow-hidden"
    >
      {/* Animated Background Icons */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
       
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 text-green-900">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Real experiences from homeowners, societies, and businesses who chose solar energy.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`w-[300px] bg-white/90 shadow-xl rounded-2xl border border-black/50 transition-transform duration-300 hover:scale-105 hover:shadow-2xl p-5 ${
                isVisible ? "animate-fade-up opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-3 justify-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 drop-shadow-sm"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-4">
                <Quote className="w-6 h-6 text-yellow-400/30 absolute -top-2 -left-2" />
                <p className="text-gray-900 italic pl-6 text-sm text-center">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Avatar + Info */}
              <div className="flex items-center gap-3 justify-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease forwards;
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slow-reverse {
          animation: float-slow 8s ease-in-out infinite reverse;
        }
      `}</style>
    </section>
  )
}
