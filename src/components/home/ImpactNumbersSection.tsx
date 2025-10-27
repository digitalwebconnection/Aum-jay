"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Shield,
  TrendingDown,
  Zap,
  Building2,
  Landmark,
  Banknote,
  ClipboardList,
  FileCheck,
  PlugZap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";

/** Stats: updated pipeline to 1 MW+ for scale perception */
const stats: Array<{
  icon: any;
  number: number;
  suffix: string;
  label: string;
  gradient: string;
}> = [
    {
      icon: Shield,
      number: 25,
      suffix: "+  (Mumbai & Thane) ",
      label: " Homes Powered  ",
      gradient: "bg-gradient-to-r from-green-400 to-green-600",
    },
    {
      icon: TrendingDown,
      number: 90,
      suffix: "%",
      label: "Up to 90% on Electricity Bills",
      gradient: "bg-gradient-to-r from-yellow-400 to-yellow-500",
    },
    {
      icon: Zap,
      number: 1,
      suffix: " MW+ (This Year)",
      label: "Pipeline Target (Mumbai & Thane)",
      gradient: "bg-gradient-to-r from-green-400 to-green-600",
    },
  ];

export default function ImpactNumbersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const [enableTilt, setEnableTilt] = useState(false); // 👈 turn off on touch devices

  // Detect fine pointer (mouse) only; touch devices get no tilt
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(pointer: fine)");
      setEnableTilt(mq.matches);
      const handler = (e: MediaQueryListEvent) => setEnableTilt(e.matches);
      // Use modern addEventListener if available, fallback to deprecated addListener
      if (mq.addEventListener) mq.addEventListener("change", handler);
      else mq.addListener?.(handler);
      return () => {
        if (mq.removeEventListener) mq.removeEventListener("change", handler);
        else mq.removeListener?.(handler);
      };
    }
  }, []);

  // Section scroll progress bar
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) return;
        setIsVisible(true);
        hasAnimatedRef.current = true;

        if (prefersReduced) {
          setAnimatedNumbers(stats.map((s) => s.number));
          return;
        }

        // Smooth count-up with requestAnimationFrame
        const duration = 1200; // a bit faster on mobile
        const start = performance.now();

        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          setAnimatedNumbers(stats.map((s) => Math.floor(eased * s.number)));
          if (p < 1) requestAnimationFrame(tick);
          else setAnimatedNumbers(stats.map((s) => s.number));
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 md:py-20 relative overflow-hidden bg-gray-50" id="service">
      {/* Top scroll progress for this section */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 h-1 w-full origin-left bg-gradient-to-r from-green-500 via-yellow-400 to-green-500"
        style={{ scaleX: progressX }}
      />

      {/* Aurora / animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-100 via-yellow-50 to-white animate-gradient" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-[22rem] w-[22rem] md:h-[38rem] md:w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.18),_transparent_55%)] blur-xl md:blur-2xl animate-blob" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-[18rem] w-[18rem] md:h-[30rem] md:w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.16),_transparent_55%)] blur-lg md:blur-2xl animate-blob-delayed" />
        {/* soft noise texture */}
        <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.015] md:opacity-[0.03] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <motion.div
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.005 }}
            className="relative rounded-2xl p-[1.2px] md:p-[1.5px] bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-400 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]"
          >
            <div className="rounded-2xl bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 p-4 md:p-6">
                <a href="#savings" className="border-[#0DB02B] border rounded-xl block">
                  <WhyItem icon={<TrendingDown className="w-5 h-5 text-yellow-600" />} title="90% Average Savings" desc="Smart sizing + net‑metering for bill cuts." />
                </a>
                <a href="#installations" className="border-[#0DB02B] border rounded-xl block">
                  <WhyItem icon={<Shield className="w-5 h-5 text-green-600" />} title="3200+ Installations" desc="Waaree‑grade performance assurance." />
                </a>
                <a href="#impact" className="border-[#0DB02B] border rounded-xl block">
                  <WhyItem icon={<Building2 className="w-5 h-5 text-green-700" />} title="CO₂ Offset = 50,000+ Trees" desc="Authorized Waaree franchise • Mumbai & Thane." />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl md:text-5xl font-extrabold mb-2 md:mb-3 drop-shadow-md leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-green-700 to-gray-900 bg-clip-text text-transparent animate-text-shine">
              Impact That Matches Our Ambition
            </span>
          </h2>
          <p className="text-gray-900 max-w-2xl  mb-2 text-sm md:text-xl mx-auto">
            Numbers that reflect real outcomes—and our scale target for this year.
          </p>
          <h4 className=" text-gray-800 ">1 MW+ installs by 2026 in Thane–Mumbai region</h4>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center" style={{ perspective: 900 }}>
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isVisible={isVisible} value={animatedNumbers[index]} enableTilt={enableTilt} />
          ))}
        </div>
        <p className="text-center mt-5 text-[#0db02b] font-semibold md:font-bold text-base md:text-lg px-3">
          Waaree Nationwide: 3200+ homes powered, 18,500+ kW installed.
        </p>

        {/* New value points teaser (no repetition): Subsidy & EPC */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          <TeaserCard title="40% Subsidy Guidance" desc="Clear, step‑by‑step support for PM Surya Ghar and DISCOM approvals." tone="from-yellow-300 to-white" badge="New Value" />
          <TeaserCard title="EPC Expertise" desc="MNRE‑compliant design, procurement, and on‑time commissioning." tone="from-green-500 to-white" badge="New Value" />
        </motion.div>

        {/* ---------------- 6. Subsidy & PM Surya Ghar ---------------- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-12 md:mt-16"
        >
          {/* Section Header */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-3 md:mb-4 ">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/50 bg-white px-3 py-1 text-xs font-semibold  ">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white" />
              <span>PM Surya Ghar Subsidy – Step-by-Step Assistance by Aumjay</span>
            </div>
          </div>

          {/* 3-up cards: 40% Subsidy / Scheme / We handle */}
          <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <InfoCard
              icon={<Banknote className="h-5 w-5 text-green-700" />}
              title="40% Subsidy Info"
              points={[
                "Central assistance up to 40% for eligible residential rooftop systems*",
                "Exact %/caps depend on category, size & scheme updates",
                "We validate eligibility before paperwork",
              ]}
            />
            <InfoCard
              icon={<Landmark className="h-5 w-5 text-amber-700" />}
              title="PM Surya Ghar Yojana"
              points={[
                "National portal based workflow (online application)",
                "Empanelled‑vendor installation + net‑metering",
                "Direct benefit transfer post‑commissioning",
              ]}
            />
            <InfoCard
              icon={<ClipboardList className="h-5 w-5 text-blue-700" />}
              title="What We Handle"
              points={[
                "Eligibility check & savings estimate",
                "Portal application & documentation",
                "Liaison with DISCOM till subsidy credit",
              ]}
            />
          </div>

          {/* >>> Premium Step-by-Step: Smart Process Tracker <<< */}
          <SmartProcessSection />

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700 transition-colors"
            >
              Get Subsidy Guidance <ArrowRight className="h-4 w-4" />
            </a>

          </div>
        </motion.section>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient { background-size: 200% 200%; animation: gradientShift 10s ease infinite; }

        @keyframes pulseSlow { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.08); opacity: 0.95; } }
        .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }

        @keyframes shine { 0% { transform: translateX(-120%) } 100% { transform: translateX(220%) } }
        .animate-shine { animation: shine 2.2s ease-in-out infinite; }

        @keyframes sheen { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-sheen { background-size: 300% 300%; animation: sheen 6s linear infinite; }

        /* Aurora blobs */
        @keyframes blobMove { 0%, 100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(2rem, -1rem, 0) scale(1.08); } }
        .animate-blob { animation: blobMove 16s ease-in-out infinite; filter: blur(28px); }
        .animate-blob-delayed { animation: blobMove 18s ease-in-out 1.2s infinite; filter: blur(24px); }

        /* Gradient text shine */
        @keyframes textShine { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-text-shine { background-size: 200% auto; animation: textShine 6s linear infinite; }
      `}</style>
    </section>
  );
}

/* -------------------- Small helpers -------------------- */
function WhyItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.95 }}
      whileHover={{ y: -2, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="relative rounded-xl p-4 md:p-4 bg-gradient-to-br from-white to-white/90 shadow-sm border border-black/5"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0" aria-hidden>{icon}</div>
        <div>
          <div className="font-semibold text-gray-900 text-sm md:text-base">{title}</div>
          <div className="text-xs md:text-sm text-gray-600">{desc}</div>
        </div>
      </div>
    </motion.div>
  );
}

function TeaserCard({
  title,
  desc,
  tone,
  badge,
}: {
  title: string;
  desc: string;
  tone: string;
  badge: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`group relative rounded-2xl p-5 md:p-6 bg-gradient-to-br ${tone} border border-black/5 shadow-sm transition-all`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-[conic-gradient(from_90deg,rgba(34,197,94,0.18),rgba(250,204,21,0.18),transparent_50%)]" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[10px] md:text-xs rounded-full bg-black border border-black/10 mb-2 md:mb-3">
          <span className="font-semibold text-white ">{badge}</span>
        </div>
        <div className="text-base md:text-lg font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-700 mt-1">{desc}</div>
      </div>
    </motion.div>
  );
}

function StatCard({
  stat,
  index,
  isVisible,
  value,
  enableTilt,
}: {
  stat: { icon: any; number: number; suffix: string; label: string; gradient: string };
  index: number;
  isVisible: boolean;
  value: number;
  enableTilt: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Conditional transforms only for tilt
  const tiltShadow = useTransform(rotateY, [-12, 12], [
    "0 10px 30px rgba(0,0,0,0.12)",
    "0 10px 30px rgba(0,0,0,0.18)",
  ]) as unknown as string;
  const iconX = useTransform(rotateY, [-12, 12], [-6, 6]);
  const iconY = useTransform(rotateX, [-12, 12], [-6, 6]);

  const onMouseMove = (e: React.MouseEvent) => {
    // Note: No need for `if (!enableTilt) return;` here, as the prop itself is conditional now.
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    rotateX.set((py - 0.5) * -14); // tilt up/down
    rotateY.set((px - 0.5) * 14); // tilt left/right
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const Icon = stat.icon;

  return (
    <motion.div
      ref={cardRef}
      // 👇 FIX: Conditionally apply mouse event handlers and style
      {...(enableTilt ? { onMouseMove, onMouseLeave, style: { rotateX, rotateY, transformStyle: "preserve-3d" as const } } : {})}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.18 }}
      className="group relative flex flex-col items-center space-y-3 md:space-y-4 will-change-transform"
      aria-label={stat.label}
    >
      {/* Icon */}
      <motion.div
        // 👇 FIX: Conditionally apply tilt styles
        style={enableTilt ? { x: iconX, y: iconY, boxShadow: tiltShadow as unknown as string } : undefined}
        initial={{ scale: 0.9, rotate: -6 }}
        animate={isVisible ? { scale: 1.0, rotate: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.18 }}
        className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full ${stat.gradient} text-white ring-4 ring-white/50 relative overflow-hidden shadow-xl`}
      >
        <Icon className="w-8 h-8 md:w-10 md:h-10 animate-pulse-slow drop-shadow-[0_6px_14px_rgba(0,0,0,0.25)]" />
        {/* subtle shine */}
        <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 bg-white/25 blur-md skew-x-[-12deg] animate-shine" />
        {/* ripple on hover */}
        <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 [mask-image:radial-gradient(circle_at_center,white,transparent_60%)] bg-white/10" />
      </motion.div>

      {/* Animated Number */}
      <motion.div
        key={value}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight shadow-2xl"
        // 👇 FIX: Conditionally apply tilt style
        style={enableTilt ? { transform: "translateZ(35px)" } : undefined}
      >
        {value.toLocaleString()}
        <span className="text-lg md:text-xl font-bold">{stat.suffix}</span>
      </motion.div>

      {/* Label */}
      <div className="text-base md:text-lg text-gray-700" style={enableTilt ? { transform: "translateZ(20px)" } : undefined}>
        {stat.label}
      </div>

      {/* Glow ring on hover (desktop only) */}
      {enableTilt && (
        <div className="pointer-events-none absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-[conic-gradient(from_90deg,rgba(34,197,94,0.25),rgba(250,204,21,0.25),transparent_50%)]" />
      )}
    </motion.div>
  );
}

/* ------------ Reusable blocks for Subsidy section ------------- */
function InfoCard({
  icon,
  title,
  points,
}: {
  icon: React.ReactNode;
  title: string;
  points: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -2 }}
      className="group relative rounded-2xl border border-black/50 bg-white p-4 md:p-5 shadow-xl"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="rounded-lg bg-gray-100 p-2">{icon}</div>
        <div className="font-semibold text-gray-900 text-sm md:text-base">{title}</div>
      </div>
      <ul className="mt-2 space-y-1.5 md:space-y-2 text-[13px] md:text-sm text-gray-700 list-disc pl-5">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-[conic-gradient(from_90deg,rgba(34,197,94,0.12),rgba(250,204,21,0.12),transparent_50%)]" />
    </motion.div>
  );
}

/* ===================== PREMIUM STEP TRACKER ===================== */
function SmartProcessSection() {
  const steps: StepSpec[] = [
    {
      key: "registration",
      title: "Registration",
      desc: "Create account on the national portal & submit basic details",
      duration: "≈ 10–20 mins",
      owner: "You (we assist)",
      icon: <FileCheck className="h-5 w-5" />,
      docs: [
        "Recent electricity bill",
        "Aadhaar / Photo ID",
        "Property / ownership proof",
        "Bank passbook (for DBT)",
      ],
    },
    {
      key: "discom",
      title: "DISCOM Approval",
      desc: "Feasibility / sanction based on load & site",
      duration: "≈ 3–7 days",
      owner: "DISCOM + We",
      icon: <ClipboardList className="h-5 w-5" />,
      docs: ["Application form (auto-filled)", "Site photos / load details"],
    },
    {
      key: "installation",
      title: "Installation",
      desc: "MNRE‑compliant install by empanelled vendor",
      duration: "≈ 1–2 days",
      owner: "We Do",
      icon: <PlugZap className="h-5 w-5" />,
      docs: ["Standard BOQ & layout", "Safety checklist"],
    },
    {
      key: "commissioning",
      title: "Commissioning",
      desc: "Net‑metering, testing & documentation",
      duration: "≈ 1–3 days",
      owner: "DISCOM + We",
      icon: <Shield className="h-5 w-5" />,
      docs: ["Test reports", "Commissioning certificate"],
    },
    {
      key: "benefit",
      title: "Benefit",
      desc: "DBT/credit processed to your bank account",
      duration: "≈ 7–30 days",
      owner: "Govt (DBT)",
      icon: <Banknote className="h-5 w-5" />,
      docs: ["Bank details verification", "Final invoice & photos"],
    },
  ];

  return (
    <div className="mt-8 rounded-2xl border border-black/5 bg-white/70 backdrop-blur p-5 md:p-6">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Step‑by‑Step Guide</h3>

        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] md:text-xs font-semibold shadow-sm">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white">
            <CheckCircle2 className="h-3 w-3" />
          </span>
          Typical timeline: <span className="text-gray-700">~ 12–40 days</span>
        </span>
      </div>
      <p className="mb-3 font-samibold">All installations MNRE-empanelled, ALMM & IEC certified.</p>
      <ProcessTracker steps={steps} />

      <p className="mt-3 text-[11px] md:text-xs text-gray-500">
        *Indicative; actual percentage, eligibility and timelines vary by scheme version, capacity and state policies.
      </p>
    </div>
  );
}

type StepSpec = {
  key: string;
  title: string;
  desc: string;
  duration: string;
  owner: "You (we assist)" | "We Do" | "DISCOM + We" | "Govt (DBT)";
  icon: React.ReactNode;
  docs?: string[];
};

function ProcessTracker({ steps }: { steps: StepSpec[] }) {
  const [active, setActive] = React.useState(0);
  const percent = ((active + 1) / steps.length) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
      {/* Left: vertical steps list */}
      <div className="md:col-span-5 relative">
        <ul className="space-y-3">
          {steps.map((s, idx) => {
            const state = idx < active ? "done" : idx === active ? "active" : "todo";
            return (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => setActive(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") setActive(Math.min(active + 1, steps.length - 1));
                    if (e.key === "ArrowUp") setActive(Math.max(active - 1, 0));
                  }}
                  className={[
                    "w-full text-left rounded-xl border border-black/5 bg-white px-4 py-3 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-green-500/60",
                    state === "active" ? "ring-1 ring-green-500/40" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    {/* Bullet / state */}
                    <span
                      className={[
                        "mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white",
                        state === "done"
                          ? "bg-green-600 text-white"
                          : state === "active"
                            ? "bg-yellow-400 text-gray-900"
                            : "bg-gray-200 text-gray-600",
                      ].join(" ")}
                    >
                      {state === "done" ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                    </span>

                    {/* Titles */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900">{s.title}</span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-700">
                          <ClockIcon />
                          {s.duration}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                          <OwnerDot owner={s.owner} />
                          {s.owner}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-700">{s.desc}</p>
                    </div>

                    {/* Icon */}
                    <span className="shrink-0 rounded-lg bg-gray-100 p-2 text-gray-800">{s.icon}</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right: active step details */}
      <div className="md:col-span-7">
        <div className="rounded-2xl border border-black/5 bg-white p-4 md:p-5 shadow-sm h-full">
          {/* Inline progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-[11px] md:text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{Math.round(percent)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-green-400 to-emerald-500 transition-[width] duration-500" style={{ width: `${percent}%` }} />
            </div>
          </div>

          {/* Active card */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-gray-100 p-2 text-gray-800">{steps[active].icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm md:text-base font-semibold text-gray-900">{steps[active].title}</h4>
                <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-700">
                  <ClockIcon />
                  {steps[active].duration}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <OwnerDot owner={steps[active].owner} />
                  {steps[active].owner}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-700">{steps[active].desc}</p>

              {/* Docs needed (toggle) */}
              {steps[active].docs?.length ? (
                <details className="mt-3 group">
                  <summary className="cursor-pointer select-none text-xs font-semibold text-gray-900 inline-flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                    Documents needed
                    <span className="text-gray-500 font-normal">(expand)</span>
                  </summary>
                  <ul className="mt-2 list-disc pl-5 text-[13px] md:text-sm text-gray-700 space-y-1">
                    {steps[active].docs!.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {/* Micro-CTA */}
              <div className="mt-4">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs md:text-sm text-white shadow hover:bg-green-700 transition-colors">
                  Get Help With This Step <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Keyboard hint */}
          <p className="mt-4 text-[10px] md:text-[11px] text-gray-500">Tip: Use ↑ / ↓ to navigate steps quickly.</p>

          <h2 className="mt-3 text-lg md:text-xl text-[#0DB02B] font-bold">Subsidy cap info</h2>
          <p className="text-sm">₹78,000 max for 3 kW</p>
          <p className="text-sm">₹1,18,000 max for 5 kW</p>
        </div>
      </div>
    </div>
  );
}

function OwnerDot({ owner }: { owner: StepSpec["owner"] }) {
  const color =
    owner === "We Do" ? "bg-emerald-600" : owner === "DISCOM + We" ? "bg-yellow-500" : owner === "Govt (DBT)" ? "bg-blue-600" : "bg-gray-700";
  return <span className={`inline-block h-2 w-2 rounded-full ${color}`} />;
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5v5l3 1.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}