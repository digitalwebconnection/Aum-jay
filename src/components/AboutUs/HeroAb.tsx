"use client";

import { motion } from "framer-motion";
import {  Sun } from "lucide-react";

export default function AboutHeroModern() {
  return (
    <>
      <section className="relative py-15 flex items-center justify-center overflow-hidden bg-black/50">
        {/* Background Image with Zoom Animation */}
        <motion.img
          src="https://waaree.com/wp-content/uploads/2024/03/TOP_Con_Technology_922ed15e22.jpg"
          alt="Solar panels installation"
          className="absolute inset-0 h-full w-full object-cover -z-10"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        />

        {/* Animated Overlay (Dynamic Solar Gradient) */}
        <div className="absolute inset-0 -z-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0DB02B]/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,197,39,0.15),transparent_60%)] animate-pulse-slow" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[#FFC527] uppercase tracking-widest text-sm font-semibold mb-4"
          >
            <Sun className="h-4 w-4" />
            <span>About Aumjay Solar</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Powering India’s Future with <br />
            <span className="bg-gradient-to-r from-[#0DB02B] via-[#FFC527] to-[#0DB02B] bg-clip-text text-transparent">
              Clean Solar Energy
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 text-base sm:text-lg text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Aumjay Solar is Mumbai’s trusted EPC company, delivering turnkey rooftop
            installations for homes, businesses, and industries. From design to commissioning —
            we make solar simple, efficient, and future-ready.
          </motion.p>

          {/* CTA Button */}
          {/* <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <a
            href="/contact"
            className="relative inline-flex items-center gap-2 rounded-full bg-[#0DB02B] px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:gap-3 hover:bg-[#0F7F34]"
          >
            Get a Quote
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </a>
        </motion.div> */}
        </motion.div>

        {/* Optional Decorative Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-4">
          <div className="grid items-center gap-8
           lg:grid-cols-2">

            {/* Image */}
            <div>
              <img
                src="https://i0.wp.com/www.ecomena.org/wp-content/uploads/2024/08/optimal-solar-system-size.jpg"
                alt="Solar Panel Installation Team"
                className="w-full rounded-2xl shadow-2xl object-cover h-85 "
              />
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#0DB02B]  to-[#0DB02B] bg-clip-text text-transparent sm:text-3xl">
                Empowering Clean Energy Solutions for Homes & Businesses
              </h2>

              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                At Aumjay Solar, we fuse cutting-edge technology with reliable execution to help clients
                harness solar power and reduce their energy bills. From concept to commissioning,
                our turnkey services deliver performance, durability and peace of mind.
              </p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <span
                    className=" h-7 w-7 flex-shrink-0  rounded-full bg-[#0DB02B] text-white grid place-items-center"
                  >
                    ✔
                  </span>
                  <span className="text-gray-700">
                    Tier-1 modules & bankable inverters for maximum reliability.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className=" h-7 w-7 flex-shrink-0 rounded-full bg-[#0DB02B] text-white grid place-items-center">
                    ✔
                  </span>
                  <span className="text-gray-700">
                    Full EPC: design, installation, permissions, and O&M under one roof.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className=" h-7 w-7 flex-shrink-0 rounded-full bg-[#0DB02B] text-white grid place-items-center">
                    ✔
                  </span>
                  <span className="text-gray-700">
                    Proven track-record across homes, commercial rooftops & industrial parks.
                  </span>
                </li>
              </ul>

            </div>

          </div>
        </div>
      </section>

    </>
  );
}

/* 🌀 Tailwind Add-on Animation */
<style >{`
  @keyframes pulse-slow {
    0%, 100% {
      opacity: 0.8;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
  }
  .animate-pulse-slow {
    animation: pulse-slow 8s ease-in-out infinite;
  }
`}</style>
