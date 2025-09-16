import { useEffect, useRef, useState } from "react"
import { Sun, Phone, Mail, Shield, TrendingUp, Award } from "lucide-react"

export default function BottomCTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-14 overflow-hidden"
    >
      {/* Background Image with parallax effect */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center scale-105 animate-parallax"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/thumbnails/024/712/158/small/sunset-sky-reflects-solar-panel-sustainable-power-generation-generative-ai-photo.jpg')",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black/80 -z-5"></div>

      {/* Floating Icons */}
      <div className="absolute inset-0 -z-10">
        <Sun className="absolute top-16 left-10 w-16 h-16 text-yellow-300 opacity-20 animate-float-slow" />
        <Shield className="absolute bottom-20 right-16 w-14 h-14 text-green-400 opacity-15 animate-float-slow delay-300" />
        <TrendingUp className="absolute top-1/3 right-10 w-12 h-12 text-yellow-300 opacity-10 animate-float-slow delay-500" />
      </div>

      {/* Content */}
      <div
        className={`container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Left Content */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center relative">
              <span className="absolute inset-0 bg-yellow-200/40 blur-xl animate-ping rounded-full" />
              <Sun className="w-8 h-8 text-green-600 relative z-10" />
            </div>
            <h2 className="text-3xl md:text-3xl font-bold leading-tight text-white drop-shadow-lg">
              AUMJAY – Delivering Waaree Solar,
              <br />
              Locally in Mumbai & Thane
            </h2>
          </div>
          <p className="text-lg text-white/90 mb-8 max-w-xl drop-shadow-sm">
            Ready to start your solar journey? Get a free consultation and
            discover how much you can save on electricity bills.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center text-lg px-8 py-2 bg-green-600 hover:bg-green-700 text-white relative overflow-hidden group rounded-xl shadow-lg shadow-green-500/30 hover:scale-105 transition-transform duration-300">
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              <Phone className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Book Free Survey</span>
            </button>

            <button className="flex items-center justify-center text-lg px-8 py-2 border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-black relative overflow-hidden group rounded-xl shadow-lg shadow-yellow-400/40 hover:scale-105 transition-transform duration-300">
              <span className="absolute inset-0 bg-yellow-200/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              <Mail className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Request Business Proposal</span>
            </button>
          </div>
        </div>

        {/* Right Side Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in delay-500">
          {[
            { icon: Shield, title: "25-Year Warranty" },
            { icon: TrendingUp, title: "3–4 Year ROI" },
            { icon: Award, title: "Waaree Certified" },
            { icon: Sun, title: "Trusted Local Partner" },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl hover:shadow-yellow-400/50 transition-transform hover:-translate-y-2 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 via-transparent to-yellow-200/30 opacity-0 group-hover:opacity-100 animate-shimmer" />
                <Icon className="w-8 h-8 text-green-600 mb-3 relative z-10" />
                <h3 className="font-semibold text-green-800 relative z-10">{item.title}</h3>
              </div>
            )
          })}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        /* Floating icons */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        /* Parallax bg */
        @keyframes parallax {
          0%, 100% { transform: scale(1.05) translateY(0px); }
          50% { transform: scale(1.08) translateY(-15px); }
        }
        .animate-parallax {
          animation: parallax 20s ease-in-out infinite;
        }

        /* Pulse */
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
        .animate-ping {
          animation: pulse 4s ease-in-out infinite;
        }

        /* Shimmer sweep */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }

        /* Fade in */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1.2s ease forwards;
        }
      `}</style>
    </section>
  )
}
