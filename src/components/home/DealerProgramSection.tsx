// src/home/DealerProgramSection.tsx
import React from "react";

/** Replace with your real WhatsApp deep link */
const WHATSAPP_LINK = "https://wa.me/919999999999?text=I%20want%20to%20apply%20as%20AUMJAY%20dealer";

type Tier = {
  id: string;
  name: string;
  tag: string;
  margin: string; // indicative margin range
  perks: string[];
  cta: string;
};

const TIERS: Tier[] = [
  {
    id: "tier-1",
    name: "Authorized Dealer",
    tag: "Entry",
    margin: "Up to 8–10%",
    perks: [
      "Assured Waaree supply (fast-moving SKUs)",
      "Lead pass-through in territory (shared)",
      "Basic co-branded marketing kit",
      "Tech + sales training (remote)",
      "Dispatch TAT 48–72h (stock dependent)",
    ],
    cta: "Apply as Dealer   ",
  },
  {
    id: "tier-2",
    name: "Preferred Partner",
    tag: "Growth",
    margin: "Up to 12–14%",
    perks: [
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
    margin: "Up to 15%+",
    perks: [
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
      <path d="m5 13 4 4L19 7" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <path d="M12 3 5 6v6c0 5.25 3.75 8.25 7 9 3.25-.75 7-3.75 7-9V6l-7-3Z" className="fill-current opacity-20"/>
      <path d="M9 12l2 2 4-4" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Truck: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <path d="M3 7h10v7H3zM13 10h5l3 4v3h-8z" className="fill-current opacity-20"/>
      <circle cx="7" cy="17" r="2" className="fill-current"/>
      <circle cx="17" cy="17" r="2" className="fill-current"/>
    </svg>
  ),
  Tag: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <path d="M10 3H5a2 2 0 0 0-2 2v5l8 8 7-7-8-8Z" className="fill-current opacity-20"/>
      <circle cx="7.5" cy="7.5" r="1.5" className="fill-current"/>
    </svg>
  ),
  Bolt: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <path d="M13 2 3 14h6l-2 8 10-12h-6l2-8Z" className="fill-current opacity-20"/>
    </svg>
  ),
  Medal: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <circle cx="12" cy="8" r="4" className="fill-current opacity-20"/>
      <path d="M8 12v8l4-2 4 2v-8" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
};

export default function DealerProgramSection() {
  return (
    <section id="dealer-program" className="relative bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            Dealer / Distributor Program
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Commercial & Product Supply — built for speed and margins
          </h2>
          <p className="mt-3 text-slate-600">
            Assured Waaree supply, EPC expertise, and territory-focused growth. Join our network to move stock faster and win bigger projects.
          </p>
        </div>

        {/* Highlights */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Feature icon={<Icon.Shield />} title="Assured Supply" text="ALMM/IEC components with priority allocation on demand." />
          <Feature icon={<Icon.Truck />} title="Fast Dispatch" text="24–72h TAT (stock dependent) with reliable logistics." />
          <Feature icon={<Icon.Tag />} title="Healthy Margins" text="Indicative margins + quarterly incentives on targets." />
          <Feature icon={<Icon.Bolt />} title="EPC Support" text="Design simulation, proposals & on-ground execution SOPs." />
        </div>

        {/* Tiers */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.id} className="relative rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">{t.tag}</span>
                <h3 className="text-xl font-semibold text-slate-900">{t.name}</h3>
              </div>
              <p className="text-sm text-slate-600">Indicative Margin</p>
              <p className="text-2xl font-bold text-[#0db02b]">{t.margin}</p>

              <ul className="mt-4 space-y-2">
                {t.perks.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 text-[#0db02b]"><Icon.Check /></span>
                    <span className="text-slate-700">{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#dealer-apply"
                  className="inline-flex items-center justify-center rounded-xl bg-[#0db02b] px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  {t.cta}
                </a>
                 
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:scale-[1.02] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  WhatsApp Supply Team
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Onboarding Steps */}
        <div className="mt-16 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <div className="flex items-center gap-2">
            <Icon.Medal />
            <h3 className="text-xl font-semibold text-slate-900">How onboarding works</h3>
          </div>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Step n="1" title="Apply / KYC" text="Share firm details, GST & references." />
            <Step n="2" title="Tier Fit" text="Margin + territory plan & MoQ agreement." />
            <Step n="3" title="Stock & Training" text="Opening order, demo kit, tech/sales training." />
            <Step n="4" title="Go-Live" text="Lead routing, campaigns & priority dispatch." />
          </ol>
        </div>

        {/* Requirements */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
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
                  <span className="mt-1 text-emerald-600"><Icon.Check /></span>
                  <span className="text-slate-700">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQs */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">FAQs</h3>
            <div className="mt-4 space-y-4">
              <Faq q="What’s the dispatch time?" a="24–72 hours depending on stock and location. Priority for Preferred/Exclusive tiers." />
              <Faq q="Do you provide marketing support?" a="Yes, co-branded creatives and local campaigns; higher tiers get co-funding." />
              <Faq q="Who handles warranty?" a="Warranty routing via our supply team with Waaree-backed process and SLAs." />
            </div>
          </div>
        </div>

        {/* Apply CTA */}
        <div id="dealer-apply" className="mt-12 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#0db02b] px-6 py-8 text-center text-white">
          <h3 className="text-2xl font-semibold">Ready to grow in your city?</h3>
          <p className="max-w-2xl text-emerald-50">
            Tell us your territory and current monthly volume. We’ll propose the best tier, margins, and stock plan for you.
          </p>
          <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:scale-[1.02]"
            >
              Apply on WhatsApp
            </a>
            <a
              href="#b2b-proposal"
              className="inline-flex items-center justify-center rounded-xl border border-black/80 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-white/10"
            >
              Request Business Proposal
            </a>
          </div>
          <p className="mt-2 text-xs text-emerald-50/80">
            Typical evaluation time: 2–5 business days after KYC submission.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- tiny subcomponents ---------- */

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
      <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-sm text-slate-600">{text}</p>
      </div>
    </div>
  );
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <li className="relative rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <span className="absolute -top-3 left-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0db02b] text-sm font-semibold text-white shadow">
        {n}
      </span>
      <p className="mt-2 text-sm font-semibold text-slate-900">{title}</p>
      <p className="text-sm text-slate-600">{text}</p>
    </li>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-left">
        <span className="text-sm font-semibold text-slate-900">{q}</span>
        <svg viewBox="0 0 24 24" className="h-5 w-5 transition group-open:rotate-180">
          <path d="M6 9l6 6 6-6" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </summary>
      <p className="mt-2 text-sm text-slate-600">{a}</p>
    </details>
  );
}
