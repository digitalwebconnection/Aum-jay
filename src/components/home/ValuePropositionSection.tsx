"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, MapPin, Wrench, Award, Search } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * Premium animated version of your ValuePropositionSection
 * - Aurora background + subtle noise
 * - Staggered reveals
 * - 3D tilt hover on cards
 * - Gradient borders with sheen
 * - Micro-interactions on chips
 */

const benefits = [
  {
    icon: Award,
    title: "Authorized Waaree Franchise",
    description: "Official partnership with India's #1 solar brand",
  },
  {
    icon: MapPin,
    title: "Local Presence in Mumbai & Thane",
    description: "On-ground support and faster service delivery",
  },
  {
    icon: Wrench,
    title: "End-to-End Service",
    description: "Survey, installation, and after-sales support",
  },
  {
    icon: CheckCircle,
    title: "Backed by India's #1 Solar Brand",
    description: "Quality assurance and reliability you can trust",
  },
];

// Local SEO copy blocks
const localSeoPoints = [
  "Solar rooftop solutions for Thane, Mulund, Dombivli, Borivali housing societies.",
  "Commercial solar EPC in Mumbai & Thane with Waaree Certified panels.",
];

const serviceAreas = [
  "Thane",
  "Mulund",
  "Dombivli",
  "Borivali",
  "Mira Road",
  "Bhandup",
  "Kalyan",
  "Andheri",
];

export default function ValuePropositionSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 bg-gray-50 overflow-hidden">
      {/* Aurora + noise background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-yellow-50 to-white animate-bgShift" />
        <div className="absolute -top-20 -left-24 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.18),_transparent_55%)] blur-2xl animate-blob" />
        <div className="absolute -bottom-24 -right-16 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.18),_transparent_55%)] blur-2xl animate-blob-delayed" />
        <div className="absolute inset-0 mix-blend-multiply opacity-[0.03] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#0DB02B] text-white text-sm font-medium px-3 py-1 rounded-3xl mb-4 shadow-lg">
              Why Choose AUMJAY + Waaree
            </span>

            <h2 className="text-2xl md:text-4xl font-extrabold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent animate-textShine">
                Your Trusted Solar Energy Partner
              </span>
            </h2>
            <p className="text-[14px] md:text-lg text-gray-600 mb-8">
              We combine Waaree's industry-leading technology with our local expertise to deliver
              exceptional solar solutions tailored to your needs.
            </p>

            <motion.ul
              initial="hidden"
              animate={isVisible ? "show" : "hidden"}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
              className="space-y-4"
            >
              {benefits.map((benefit, index) => (
                <BenefitItem key={index} benefit={benefit} />
              ))}
            </motion.ul>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            {/* Showroom Card */}
            <ShowroomCard />

            {/* SEO & Localisation Card */}
            <SEOCard />
          </motion.div>
        </div>
      </div>

      {/* Optional JSON-LD for LocalBusiness; remove or adapt as needed */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "AUMJAY Renewables — Waaree Authorized Franchise",
            areaServed: [
              "Thane",
              "Mulund",
              "Dombivli",
              "Borivali",
              "Mira Road",
              "Bhandup",
              "Kalyan",
              "Andheri",
              "Mumbai",
            ],
            url: "https://example.com/",
            description:
              "Solar rooftop solutions for housing societies and commercial EPC across Mumbai & Thane with Waaree certified panels.",
            makesOffer: {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                serviceType: "Residential Rooftop Solar & Commercial EPC",
              },
            },
          }),
        }}
      />

      {/* Local styles for premium motion & visuals */}
      <style>{`
        @keyframes bgShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .animate-bgShift{ background-size:200% 200%; animation:bgShift 14s ease-in-out infinite; }
        @keyframes blobMove { 0%,100%{ transform:translate3d(0,0,0) scale(1)} 50%{ transform:translate3d(2rem,-1rem,0) scale(1.06)} }
        .animate-blob{ animation:blobMove 16s ease-in-out infinite; filter:blur(32px) }
        .animate-blob-delayed{ animation:blobMove 18s ease-in-out 1s infinite; filter:blur(28px) }
        @keyframes sheen { 0%{transform:translateX(-120%)} 100%{transform:translateX(220%)} }
        .animate-sheen{ animation: sheen 2.2s ease-in-out infinite; }
        @keyframes textShine { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .animate-textShine{ background-size:200% auto; animation:textShine 8s linear infinite; }
      `}</style>
    </section>
  );
}

/* -------------------- Components -------------------- */

function BenefitItem({
  benefit,
}: {
  benefit: { icon: React.ElementType; title: string; description: string };
}) {
  const Icon = benefit.icon;

  // 3D tilt effect
  const cardRef = useRef<HTMLLIElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const shadow = useTransform(rotateY, [-12, 12], [
    "0 10px 30px rgba(0,0,0,0.08)",
    "0 10px 30px rgba(0,0,0,0.18)",
  ]);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((py - 0.5) * -12);
    rotateY.set((px - 0.5) * 12);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.li
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.45 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative list-none"
    >
      <div className="relative rounded-xl p-[1.5px] bg-gradient-to-r from-yellow-300 via-emerald-400 to-yellow-300 shadow-[var(--shadow,0_8px_24px_rgba(0,0,0,0.08))]" style={{ boxShadow: shadow as unknown as string }}>
        <div className="rounded-xl bg-white/95">
          <div className="flex items-start gap-4 p-4">
            <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0" style={{ transform: "translateZ(30px)" }}>
              <Icon className="w-6 h-6 text-emerald-700" />
            </div>
            <div style={{ transform: "translateZ(24px)" }}>
              <h3 className="font-semibold text-sm md:text-lg text-gray-900">{benefit.title}</h3>
              <p className="text-sm text-gray-600 mt-0.5">{benefit.description}</p>
            </div>
          </div>
          {/* sheen */}
          <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 bg-white/30 blur-md skew-x-[-12deg] animate-sheen rounded-xl" />
        </div>
      </div>
    </motion.li>
  );
}

function ShowroomCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="bg-white h-60 rounded-2xl shadow-xl overflow-hidden relative"
    >
      {/* floating rings */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.18),_transparent_60%)]" />
      <div className="pointer-events-none absolute -left-14 -bottom-14 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.16),_transparent_60%)]" />

      <div className="h-full bg-gradient-to-br from-emerald-800/10 to-emerald-400/10 flex items-center justify-center">
        <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="text-center relative">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <MapPin className="w-12 h-12 text-emerald-700" />
          </div>
          <h3 className="text-md md:text-xl font-semibold mb-1">625 sq. ft. Showroom</h3>
          <p className="text-gray-600 text-[13px] md:text-lg">Visit our local showroom in Mumbai & Thane</p>

          {/* glow ring */}
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl blur-2xl opacity-70 bg-[conic-gradient(from_120deg,rgba(16,185,129,0.18),rgba(250,204,21,0.18),transparent_50%)]" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function SEOCard() {
  return (
    <motion.section
      aria-labelledby="seo-local-heading"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 }}
      className="mt-6 group rounded-2xl border border-black/50 bg-white shadow-xl overflow-hidden relative"
    >
      {/* gradient border glow on hover */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 k group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-[conic-gradient(from_120deg,rgba(16,185,129,0.18),rgba(250,204,21,0.18),transparent_80%)]" />

      <div className="relative flex items-center gap-2 border-b border-black/5 px-5 py-3">
        <div className="rounded-md bg-[#0DB02B] p-2">
          <Search className="h-5 w-5 text-white" />
        </div>
        <h3 id="seo-local-heading" className="text-base font-semibold text-gray-950">
          Localisation
        </h3>
      </div>

      <div className="relative px-5 pt-4 pb-5">
        <ul className="space-y-3 text-[12px] md:text-sm text-gray-900 list-disc pl-5">
          {localSeoPoints.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>

        {/* Area chips */}
        <div className="mt-4">
          <div className="text-xs font-medium text-gray-500 mb-2">Areas we serve</div>
          <div className="flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <AreaChip key={area} area={area} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function AreaChip({ area }: { area: string }) {
  return (
    <motion.span
      whileHover={{ y: -1, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-1 rounded-full border border-[#0DB02B] bg-gray-200 px-3 py-1 text-xs text-black shadow-sm"
    >
      <MapPin className="h-3.5 w-3.5" /> {area}
    </motion.span>
  );
}
