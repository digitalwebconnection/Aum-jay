"use client";

import { useEffect, useMemo, useRef, useState } from "react";
// import { Dot } from "lucide-react";

/**
 * Partners + Testimonials page
 * - Sliding Icons: slow marquee of partner logos (Waaree, Polycab, Adani, ISO certifications)
 * - Testimonial Carousel: auto-scroll every ~5–6s with dot navigation
 *
 * TailwindCSS only. No external libs.
 * Replace image src paths with your assets (e.g. /logos/waaree.png, etc.)
 */
export default function Scroll() {
  const [prefersReducedMotion, setPRM] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPRM(mq.matches);
    const handler = () => setPRM(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return (
    <main className=" w-full bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Our Partners </h1>
          <p className="mt-2 text-slate-600">Trusted by leading brands and loved by homeowners & businesses.</p>
        </header>

        {/* Sliding Icons: Partner logos → slow marquee */}
        <section aria-label="Partner logos" className="relative">
          <div className="rounded-2xl  bg-white p-4 backdrop-blur">
            <div className={`group relative overflow-hidden`}>
              <Marquee prefersReducedMotion={prefersReducedMotion} />
            </div>
          </div>
        </section>
      </div>

      {/* Local styles for marquee keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 36s linear infinite;
        }
        .marquee-track.fast { animation-duration: 5s; }
        .marquee-track.slower { animation-duration: 42s; }
        .marquee-paused { animation-play-state: paused !important; }
      `}</style>
    </main>
  );
}

/* ------------------------------------- */
/*               Marquee                  */
/* ------------------------------------- */

function Marquee({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  // Replace these with actual brand images
  const logos: Array<{ src?: string; alt: string; text?: string }> = [
    { src: "https://www.epcworld.in/wp-content/uploads/2025/05/1473406729waree%20-%20final.jpg", alt: "Waaree" },
    { src: "https://companieslogo.com/img/orig/POLYCAB.NS_BIG-75d2f870.png?t=1729362040", alt: "Polycab" },
    { src: "https://i0.wp.com/solarquarter.com/wp-content/uploads/2019/10/Adani-Solar.png?fit=200%2C124&ssl=1", alt: "Adani Solar" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/ISO_9001-2015.svg/1200px-ISO_9001-2015.svg.png", alt: "ISO 9001" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq3nvPsX4c16iUN2F2LIxvu9Ru7D2iqHJTbRD5JAaDuFBgyWvqbYaA4o6YsWj0_L3OORI&usqp=CAU", alt: "ISO 14001" },
    { src: "https://5.imimg.com/data5/SELLER/Default/2023/8/333242435/WU/UE/UO/1883722/iso-45001-2018-occupational-health-and-safety.jpg", alt: "ISO 45001" },
  ];

  // Duplicate for seamless loop
  const sequence = useMemo(() => [...logos, ...logos], [logos]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHover, setIsHover] = useState(false);

  const paused = prefersReducedMotion || isHover;

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />

      <div className="flex w-[200%] items-center gap-10">
        <ul
          className={`marquee-track flex w-1/2 items-center gap-10 ${paused ? "marquee-paused" : ""}`}
          aria-hidden={false}
        >
          {sequence.slice(0, logos.length).map((item, idx) => (
            <li key={`a-${idx}`} className="shrink-0">
              <LogoBadge item={item} />
            </li>
          ))}
        </ul>
        <ul
          className={`marquee-track flex w-1/2 items-center gap-10 ${paused ? "marquee-paused" : ""}`}
          aria-hidden={true}
        >
          {sequence.slice(logos.length).map((item, idx) => (
            <li key={`b-${idx}`} className="shrink-0">
              <LogoBadge item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LogoBadge({ item }: { item: { src?: string; alt: string; text?: string } }) {
  return (
    <div className="flex h-16 w-36 items-center justify-center rounded-xl border border-black/5 bg-white p-3 shadow-sm">
      {item.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.src} alt={item.alt} className="max-h-full max-w-full object-contain" />
      ) : (
        <span className="text-sm font-semibold text-slate-700">{item.text ?? item.alt}</span>
      )}
    </div>
  );
}

