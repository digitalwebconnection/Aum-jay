"use client"

import { Sun, Battery, Zap, Home, Building2, Handshake, Shield, MapPin } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, type Variants } from "framer-motion"
import PopupExample from "../PopupExample"

/* ---------------------------- Content Data ---------------------------- */
const homeownerFeatures = [
  { icon: Sun, title: "Rooftop Solutions", description: "Maximize generation with site-audited, properly oriented arrays." },
  { icon: Battery, title: "Society Solar Plans", description: "Dedicated plans for common areas & lifts with net-metering." },
  { icon: Zap, title: "Subsidy Guidance", description: "End-to-end help with PM Surya Ghar & DISCOM processes." },
]

const businessFeatures = [
  { icon: Sun, title: "Business Solutions.", description: "Grade-A panels, inverters, cabling & BoS from top OEMs." },
  { icon: Battery, title: "EPC Services", description: "Engineering, Procurement & Commissioning with MNRE norms." },
  { icon: Handshake, title: "Dealer Partnerships", description: "Grow via franchise & channel programs with priority pricing." },
]

// const testimonials = [
//   { quote: "Bill down by ~85% within two months. Clean install & clear app monitoring.", name: "R. Mehta", role: "Homeowner", loc: "Thane" },
//   { quote: "Transparent proposal and on-time execution for our society’s common areas.", name: "A. Kulkarni", role: "Society Secretary", loc: "Powai" },
//   { quote: "Warehouse PV commissioned on schedule; great after-sales support.", name: "K. Shah", role: "Operations Head", loc: "Bhiwandi" },
// ]

/* ---------------------------- Motion Variants (typed) ---------------------------- */
/** Cubic-bezier equivalent of easeOut */
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

const stagger: Variants = {
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

/* ---------------------------- Component ---------------------------- */
export default function TwoPathsSection() {
  const [isVisible, setIsVisible] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const [showPopup, setShowPopup] = useState(false);

  // Trigger entrance animations once
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Testimonial auto-rotate


  return (
    <section
      ref={sectionRef}
      className="relative py-10 overflow-hidden bg-gradient-to-b from-green-50 via-white to-yellow-50"
    >
      {/* Decorative brand orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, rgba(25,168,68,0.22) 0%, transparent 60%)" }}
        initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: EASE_OUT }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-28 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, rgba(255,197,39,0.22) 0%, transparent 60%)" }}
        initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Trust / brand header */}
        <motion.div
          className="md:flex  items-center justify-center gap-3 mb-3"
          initial="hidden" animate={isVisible ? "show" : "hidden"} variants={stagger}
        >
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-3 my-2 md:my-0 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-300">
            🏆 Authorized Waaree Franchise
          </motion.span>
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300">
            <MapPin className="w-3.5 h-3.5" /> Mumbai & Thane
          </motion.span>
        </motion.div>

        <motion.h2
          className="text-center text-2xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-green-700 via-green-600 to-yellow-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 14 }}
          animate={isVisible ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } } : {}}
        >
          Choose Your Solar Journey
        </motion.h2>

        <motion.p
          className="text-center text-sm md:text-lg text-gray-700 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 8 }}
          animate={isVisible ? { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT, delay: 0.15 } } : {}}
        >
          Clearly segmented for <span className="font-semibold">Homeowners & Societies</span> and for{" "}
          <span className="font-semibold">Businesses & Dealers</span> — with the exact solutions you need.
        </motion.p>

        {/* Two Cards */}
        <motion.div
          className="space-y-12"
          initial="hidden" animate={isVisible ? "show" : "hidden"} variants={stagger}
        >
          {/* Homeowners & Societies */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-lg border border-black/5 overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div
                className="md:w-1/3 p-6 text-white flex flex-col justify-center items-center gap-3 bg-cover bg-center relative"
                style={{ backgroundImage: "url('https://images.theconversation.com/files/440570/original/file-20220113-23-cghsbp.jpg?ixlib=rb-4.1.0&rect=26%2C44%2C5933%2C2823&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip')" }}
              >
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <Home className="w-12 h-12 text-yellow-400" />
                  <h3 className="text-xl font-bold ">Homeowners & Societies</h3>
                  <div className="flex items-center gap-2 text-xs opacity-90">
                    <Shield className="w-4 h-4" /> 25-Year Warranty • Waaree Certified
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-6">
                <motion.div className="grid grid-cols-1   gap-5" variants={stagger}>
                  {homeownerFeatures.map((f) => {
                    const Icon = f.icon
                    return (
                      <motion.div
                        key={f.title}
                        variants={fadeUp}
                        whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(16,185,129,0.12)" }}
                        className="flex items-start  shadow-xl  shadow-black/30  gap-4 p-3 border-l-4 border-green-800 bg-white rounded-md  hover:bg-[#0DB02B] hover:text-white transition-all"
                      >
                        <div className="p-2 bg-green-100 rounded-full"><Icon className="w-6 h-6 text-green-600" /></div>
                        <div>
                          <h4 className="font-semibold text-sm md:text-lg">{f.title}</h4>
                          <p className="text-[12px] md:text-sm ">{f.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>

                <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
                  <a href="#" className="px-6 py-3 bg-[#0DB02B] text-white font-bold md:text-lg text-sm rounded-md hover:bg-green-600 transition-colors shadow-md hover:shadow-lg">
                    Explore Homeowner Plans
                  </a>
                  <button onClick={() => setShowPopup(true)} className="px-6 py-3 border md:text-lg text-sm border-yellow-400 font-semibold rounded-md hover:bg-green-50 transition-colors">
                    Book Free Survey
                  </button>
                </div>
              </div>
              {/* Popup */}
              {showPopup && <PopupExample onClose={() => setShowPopup(false)} />}

            </div>
          </motion.div>

          <p className=" text-center text-[#0Db02B] text-xl md:text-3xl font-semibold py-5 ">Earn up to 14% = ₹1.4L on ₹10L turnover.</p>

          {/* Businesses & Dealers */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-lg border border-black/5 overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="flex flex-col md:flex-row-reverse">
              <div
                className="md:w-1/3 p-6 text-white flex flex-col justify-center items-center gap-3 bg-cover bg-center relative"
                style={{ backgroundImage: "url('https://www.electrobeamsolar.com/assets/front/images/solar.webp')" }}
              >
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <Building2 className="w-12 h-12 text-green-800" />
                  <h3 className="text-xl font-bold">Businesses & Dealers</h3>
                  <div className="flex items-center gap-2 text-xs opacity-90">
                    <Shield className="w-4 h-4" /> EPC Expertise • Priority Supply
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-6">
                <motion.div className="grid grid-cols-1 gap-5" variants={stagger}>
                  {businessFeatures.map((f) => {
                    const Icon = f.icon
                    return (
                      <motion.div
                        key={f.title}
                        variants={fadeUp}
                        whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(250,204,21,0.14)" }}
                        className="flex items-start gap-4 p-4 border-l-4 border-yellow-400 bg-white rounded-md shadow-xl  shadow-black/30 hover:bg-yellow-200 transition-all"
                      >
                        <div className="p-2 bg-yellow-100 rounded-full"><Icon className="w-6 h-6 text-yellow-500" /></div>
                        <div>
                          <h4 className="font-semibold text-black text-sm md:text-lg">{f.title}</h4>
                          <p className="text-[12px] text-gray-600 md:text-sm ">{f.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>

                <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
                  <a href="#" className="px-6 py-3 md:text-lg text-sm bg-[#0DB02B] text-white font-bold rounded-md hover:bg-green-700 transition-colors shadow-md hover:shadow-lg">
                    Explore Business Solutions
                  </a>
                  <a href="#" className="px-6 py-3 md:text-lg text-sm border border-yellow-400  font-semibold rounded-md hover:bg-yellow-50 transition-colors">
                    Request Business Proposal
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>



      </div>
      {/* Subtle floating icons */}
      <Sun className="absolute top-10 left-10 w-20 h-20 text-yellow-400 opacity-20 animate-float-slow" />
      <Battery className="absolute bottom-20 right-10 w-16 h-16 text-[#0DB02B] opacity-30 animate-float-slow-reverse" />
      <Zap className="absolute top-1/3 right-20 w-14 h-14 text-yellow-500 opacity-15 animate-float-slow" />

      {/* Extra animations */}
      <style>{`
        @keyframes float-slow { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
        .animate-float-slow { animation: float-slow 11s ease-in-out infinite; }
        .animate-float-slow-reverse { animation: float-slow 13s ease-in-out infinite reverse; }
      `}</style>
    </section>
  )
}


