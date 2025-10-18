"use client";

import { useEffect, useMemo, useState } from "react";

/** Base loop duration (seconds). We’ll scale it on small screens */
const BASE_DURATION = 28; // faster than your 36s

export default function Scroll() {
  const [prefersReducedMotion, setPRM] = useState(false);
  const [isSmall, setIsSmall] = useState(false); // <640px

  useEffect(() => {
    const mqRM = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqSM = window.matchMedia("(max-width: 639px)");
    const setFlags = () => {
      setPRM(mqRM.matches);
      setIsSmall(mqSM.matches);
    };
    setFlags();
    mqRM.addEventListener?.("change", setFlags);
    mqSM.addEventListener?.("change", setFlags);
    return () => {
      mqRM.removeEventListener?.("change", setFlags);
      mqSM.removeEventListener?.("change", setFlags);
    };
  }, []);

  // shorter duration = faster scroll. On very small screens, we speed up a bit.
  const duration = prefersReducedMotion ? 0 : Math.max(10, BASE_DURATION - (isSmall ? 8 : 0));

  return (
    <main className="w-full bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-6">
        <header className="mb-6 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Our Partners
          </h1>
          <p className="mt-2 text-slate-600">
            Trusted by leading brands and loved by homeowners & businesses.
          </p>
        </header>

        {/* Marquee */}
        <section aria-label="Partner logos" className="relative">
          <div className="rounded-2xl bg-white p-3 sm:p-4 backdrop-blur">
            <div className="relative overflow-hidden">
              <Marquee prefersReducedMotion={prefersReducedMotion} duration={duration} />
              {/* edge fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-white to-transparent" />
            </div>
          </div>
        </section>
      </div>

      {/* Local CSS */}
      <style>{`
        @keyframes marqueeX {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
        .marquee-track {
          animation-name: marqueeX;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .marquee-paused { animation-play-state: paused !important; }
      `}</style>
    </main>
  );
}

/* ------------------------------------- */
/*               Marquee                  */
/* ------------------------------------- */

function Marquee({
  prefersReducedMotion,
  duration, // seconds
}: {
  prefersReducedMotion: boolean;
  duration: number;
}) {
  // Use stable logo sizes so layout doesn’t shift on mobile
  const logos: Array<{ src: string; alt: string; w?: number; h?: number }> = [
    { src: "https://www.epcworld.in/wp-content/uploads/2025/05/1473406729waree%20-%20final.jpg", alt: "Waaree" },
    { src: "https://companieslogo.com/img/orig/POLYCAB.NS_BIG-75d2f870.png?t=1729362040", alt: "Polycab" },
    { src: "https://i0.wp.com/solarquarter.com/wp-content/uploads/2019/10/Adani-Solar.png?fit=200%2C124&ssl=1", alt: "Adani Solar" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/ISO_9001-2015.svg/1200px-ISO_9001-2015.svg.png", alt: "ISO 9001" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq3nvPsX4c16iUN2F2LIxvu9Ru7D2iqHJTbRD5JAaDuFBgyWvqbYaA4o6YsWj0_L3OORI&usqp=CAU", alt: "ISO 14001" },
    { src: "https://5.imimg.com/data5/SELLER/Default/2023/8/333242435/WU/UE/UO/1883722/iso-45001-2018-occupational-health-and-safety.jpg", alt: "ISO 45001" },
  ];

  // We render TWO copies in one long row, then translate -50%.
  const sequence = useMemo(() => [...logos, ...logos], [logos]);

  // tighter gap & smaller badges on small screens
  return (
    <div className="relative">
      <div
        className={[
          "marquee-track flex items-center transform-gpu",
          prefersReducedMotion ? "marquee-paused" : "",
        ].join(" ")}
        style={{
          // smaller duration = faster
          animationDuration: `${Math.max(0.001, duration)}s`,
        }}
      >
        {/* one long row that’s >100% width due to content; no fixed w-[200%] needed */}
        <ul className="flex items-center gap-6 sm:gap-10 min-w-max">
          {sequence.map((item, idx) => (
            <li key={idx} className="shrink-0">
              <LogoBadge item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LogoBadge({ item }: { item: { src: string; alt: string } }) {
  return (
    <div
      className="
        flex items-center justify-center rounded-xl border border-black/5 bg-white shadow-sm
        h-12 w-28 px-2
        sm:h-16 sm:w-36 sm:px-3
      "
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        className="max-h-full max-w-full object-contain"
        // decoding hint for smoother mobile animations
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
