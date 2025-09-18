// src/home/DealerProgramSection.tsx
import React from "react";

/** Replace with your real WhatsApp deep link */
const WHATSAPP_LINK =
  "https://wa.me/919999999999?text=I%20want%20to%20apply%20as%20AUMJAY%20dealer";

type Tier = {
  id: string;
  name: string;
  tag: "Entry" | "Growth" | "Elite";
  margin: string; // e.g., "Up to 8–10%"
  perks: string[];
  cta: string;
};

const BRAND = "#0db02b";

const TIERS: Tier[] = [
  {
    id: "tier-1",
    name: "Authorized Dealer",
    tag: "Entry",
    margin: "8–10% margin",
    perks: [
      "Assured Waaree supply (fast-moving SKUs)",
      "Lead pass-through in territory (shared)",
      "Basic co-branded marketing kit",
      "Tech + sales training (remote)",
      "Dispatch TAT 48–72h (stock dependent)",
    ],
    cta: "Apply as Dealer",
  },
  {
    id: "tier-2",
    name: "Preferred Partner",
    tag: "Growth",
    margin: "12–14% margin",
    perks: [
        "(₹1.4L on ₹10L turnover)",
      "Priority allocation for high-demand SKUs",
      "Quarterly incentives on targets",
      "City/zone semi-exclusivity",
      "Joint EPC proposals (site design support)",
      "Dispatch TAT 24–48h (priority queue)",
    ],
    cta: "Request Program Deck",
  },
  {
    id: "tier-3",
    name: "Exclusive Distributor",
    tag: "Elite",
    margin: "Custom margins ",
    perks: [
        "Custom margins + zone exclusivity",
      "Territory exclusivity on MoQ",
      "Dedicated account & warranty routing",
      "Co-funded local campaigns",
      "On-site tech training & audits",
      "Reserved buffer stock (forecast based)",
    ],
    cta: "Talk to Supply Head",
  },
];

const Icon = {
  Check: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="m5 13 4 4L19 7"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  Arrow: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        className="stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  Medal: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <circle cx="12" cy="8" r="4" className="fill-current opacity-20" />
      <path
        d="M8 12v8l4-2 4 2v-8"
        className="stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.2 21l1.1-6.5L2.6 9.8l6.5-.9L12 3Z"
        className="fill-current"
      />
    </svg>
  ),
  Box: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M3 7 12 3l9 4-9 4-9-4Zm0 4 9 4 9-4m-9 4v6"
        className="stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  Truck: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M3 7h10v7H3zM13 10h5l3 4v3h-8z" className="fill-current opacity-20" />
      <circle cx="7" cy="17" r="2" className="fill-current" />
      <circle cx="17" cy="17" r="2" className="fill-current" />
    </svg>
  ),
};

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

/* -------- helpers -------- */
function maxPct(text: string) {
  const nums = (text.match(/\d+(\.\d+)?/g) || []).map(Number);
  return nums.length ? Math.max(...nums) : 10;
}

/* Reveal-once */
function useInViewOnce(threshold = 0.15) {
  const [seen, setSeen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

/* -------- main component -------- */
export default function DealerProgramSection() {
  const [activeId, setActiveId] = React.useState<string>(TIERS[1].id); // default to "Preferred Partner"
  const active = TIERS.find((t) => t.id === activeId)!;
 

  return (
    <section
      id="dealer-program"
      className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white py-16 sm:py-24"
    >
      {/* floating blobs / decorative */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-16 h-[22rem] w-[22rem] rounded-full bg-lime-300/20 blur-3xl" />

      {/* subtle grid pattern parallax */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridDealer" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridDealer)" className="text-slate-900" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            Dealer / Distributor Program
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Business & Dealer Program — <span className="text-emerald-700">faster stock, better margins</span>
          </h2>
          <p className="mt-3 text-slate-600">
            Choose your tier, see exact perks, and apply in minutes. Built for velocity from inquiry to dispatch.
          </p>
        </div>

        {/* Layout: sticky rail + detail */}
        <div className="mt-12 grid gap-8 md:grid-cols-[minmax(260px,320px)_1fr]">
          {/* Left sticky rail */}
          <aside className="md:sticky md:top-24">
            <div className="rounded-2xl mt-19 border border-slate-500 bg-white/80 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
              <p className="text-sm font-semibold text-slate-900">Why join AUMJAY</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">
                    <Icon.Box />
                  </span>
                  Assured Waaree supply (ALMM/IEC)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">
                    <Icon.Truck />
                  </span>
                  Priority dispatch (24–72h)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">
                    <Icon.Star />
                  </span>
                  Tiered incentives & exclusivity
                </li>
              </ul>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveId(t.id)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-xs font-semibold transition",
                      t.id === activeId
                        ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)] text-[color:var(--brand)]"
                        : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                    )}
                    style={
                      {
                        "--brand": BRAND,
                        "--brand-soft": "#dcfce7",
                      } as React.CSSProperties
                    }
                  >
                    {t.tag}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="shine-btn inline-flex items-center justify-center rounded-xl bg-[color:var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  style={{ ["--brand" as any]: BRAND }}
                >
                  Apply on WhatsApp
                </a>
                <a
                  href="#dealer-apply"
                  className="inline-flex items-center justify-center rounded-xl border border-green-400 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
                >
                  Request Business Proposal
                </a>
              </div>
            </div>
          </aside>

          {/* Right: Tier details + steps + FAQs */}
          <div className="space-y-8">
            <TierTabs activeId={activeId} setActiveId={setActiveId} />

            <TierPanel tier={active} />

            <OnboardingSteps />

            <FAQBlock />
          </div>
        </div>

        {/* Bottom CTA banner */}
        <div
          id="dealer-apply"
          className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-600 p-1"
        >
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-white/10 p-6 text-center text-white sm:flex-row sm:text-left">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-50/90">
                Dealer / Distributor Program
              </p>
              <h3 className="mt-1 text-2xl font-semibold">
                Ready to grow in your city?
              </h3>
              <p className="text-emerald-50 text-xl">
               Lock territory in Mumbai & Thane – Limited zones available.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="shine-btn inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:scale-[1.02]"
              >
                Apply on WhatsApp
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-xl border border-white/80 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Download Program Deck
              </a>
            </div>
          </div>
        </div>

       
      </div>

      {/* local styles for shine effect */}
      <style>{`
        .shine-btn { position: relative; overflow: hidden; }
        .shine-btn::after {
          content: ""; position: absolute; top: 0; left: -120%;
          width: 120%; height: 100%;
          background: linear-gradient(120deg, rgba(255,255,255,0) 20%, rgba(255,255,255,.45) 50%, rgba(255,255,255,0) 80%);
          transform: skewX(-20deg);
        }
        .shine-btn:hover::after { left: 120%; transition: left 700ms; }
      `}</style>
    </section>
  );
}

/* ---------- Tier Tabs (mobile/desktop) ---------- */
function TierTabs({
  activeId,
  setActiveId,
}: {
  activeId: string;
  setActiveId: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
        Choose your tier
      </div>
      <div className="inline-flex gap-2 rounded-xl border border-slate-200 bg-white p-1">
        {TIERS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveId(t.id)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-semibold transition",
              t.id === activeId ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900"
            )}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Tier Panel w/ margin gauge ---------- */
function TierPanel({ tier }: { tier: Tier }) {
  const { ref, seen } = useInViewOnce(0.2);
  const pct = maxPct(tier.margin); // 10, 14, 15...
  const angle = Math.min(100, pct) * 3.6; // percentage to degrees (0–360)

  return (
    <div
      ref={ref as any}
      className={cn(
        "reveal grid items-start gap-6 rounded-2xl border border-slate-500 bg-white/70 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 md:grid-cols-[minmax(260px,300px)_1fr]"
      )}
      style={{ animation: "fadeUp 600ms ease forwards", opacity: 0 }}
    >
      {/* left: gauge + tag */}
      <div className="relative">
        <div className="absolute -right-4 -top-4 rotate-12 rounded-md bg-[color:var(--brand)] px-2 py-1 text-[10px] font-semibold text-white shadow"
          style={{ ["--brand" as any]: BRAND }}
        >
          {tier.tag}
        </div>

        {/* conic gauge */}
        <div className="mx-auto grid place-items-center">
          <div
            className="relative h-40 w-40 rounded-full"
            style={{
              background: `conic-gradient(${BRAND} ${seen ? angle : 0}deg, #e5e7eb 0deg)`,
              transition: "background 900ms ease",
            }}
            aria-label={`Margin gauge ${pct}%`}
          >
            <div className="absolute inset-3 rounded-full bg-white ring-1 ring-slate-200" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="text-xs text-center text-slate-800 mt-5">keep % margin <br /> example.</span>
              <span className="text-xs font-bold text-slate-900 mb-5">{tier.margin}</span>
            </div>
          </div>
        </div>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
        >
          Chat Supply Team <Icon.Arrow />
        </a>
      </div>

      {/* right: content */}
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
            {tier.tag}
          </span>
          <h3 className="text-xl font-semibold text-slate-900">{tier.name}</h3>
        </div>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {tier.perks.map((p, i) => (
            <li key={i} className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200">
              <span className="mt-0.5 text-emerald-600">
                <Icon.Check />
              </span>
              <span className="text-slate-700">{p}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="#dealer-apply"
            className="shine-btn inline-flex items-center justify-center rounded-xl bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            style={{ ["--brand" as any]: BRAND }}
          >
            {tier.cta}
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
          >
            WhatsApp Supply Team
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

/* ---------- Onboarding Steps (horizontal cards) ---------- */
function OnboardingSteps() {
  return (
    <div className="rounded-2xl border border-slate-400 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-emerald-700">
          <Icon.Medal />
        </span>
        <h3 className="text-xl font-semibold text-slate-900">How onboarding works</h3>
      </div>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Step n="1" title="Apply / KYC" text="Share firm details, GST & references." />
        <Step n="2" title="Tier Fit" text="Margin + territory plan & MoQ agreement." />
        <Step n="3" title="Stock & Training" text="Opening order, demo kit, tech/sales training." />
        <Step n="4" title="Go-Live" text="Lead routing, campaigns & priority dispatch." />
      </ol>
    </div>
  );
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <li className="relative rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <span className="absolute -top-3 left-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--brand)] text-sm font-semibold text-white shadow"
        style={{ ["--brand" as any]: BRAND }}
      >
        {n}
      </span>
      <p className="mt-2 text-sm font-semibold text-slate-900">{title}</p>
      <p className="text-sm text-slate-600">{text}</p>
    </li>
  );
}

/* ---------- FAQ ---------- */
function FAQBlock() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-400 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Program Requirements</h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            "Minimum order quantity (monthly/quarterly)",
            "GST + KYC documentation",
            "Basic inventory area or storefront",
            "Demo kit for local demos",
            "Quarterly forecast & stock planning",
            "Adherence to branding guidelines",
          ].map((r, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 text-emerald-600">
                <Icon.Check />
              </span>
              <span className="text-slate-700">{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-400 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">FAQs</h3>
        <div className="mt-4 space-y-4">
          <Faq q="What’s the dispatch time?" a="24–72 hours depending on stock and location. Priority for Preferred/Exclusive tiers." />
          <Faq q="Do you provide marketing support?" a="Yes, co-branded creatives and local campaigns; higher tiers get co-funding." />
          <Faq q="Who handles warranty?" a="Warranty handled through Waaree’s 25-year backed process." />
        </div>
      </div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-left">
        <span className="text-sm font-semibold text-slate-900">{q}</span>
        <svg viewBox="0 0 24 24" className="h-5 w-5 transition group-open:rotate-180">
          <path
            d="M6 9l6 6 6-6"
            className="stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </summary>
      <p className="mt-2 text-sm text-slate-600">{a}</p>
    </details>
  );
}
