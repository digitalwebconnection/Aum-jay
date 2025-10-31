"use client";

type Plan = {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  cta: string;
};

const PLANS: Plan[] = [
  {
    title: "10.5kW",
    subtitle: "Solar System",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    features: [
      "Browse Verified Listings",
      "Save Favorite Properties",
      "Get Price Trends & Insights",
      "Basic Property Alerts",
      "Connect With Limited Agents",
    ],
    cta: "Get Started",
  },
  {
    title: "10.5kW",
    subtitle: "Solar System",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    features: [
      "Browse Verified Listings",
      "Save Favorite Properties",
      "Get Price Trends & Insights",
      "Basic Property Alerts",
      "Connect With Limited Agents",
    ],
    cta: "Get Started",
  },
  {
    title: "10.5kW",
    subtitle: "Solar System",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    features: [
      "Browse Verified Listings",
      "Save Favorite Properties",
      "Get Price Trends & Insights",
      "Basic Property Alerts",
      "Connect With Limited Agents",
    ],
    cta: "Get Started",
  },
];

export default function SolarSystemChooser() {
  return (
    <section className="py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
          Let’s Choose Suitable Solar System For Your Home
        </h2>

        {/* Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <Card key={idx} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Subcomponents ---------------- */

function Card({ plan }: { plan: Plan }) {
  return (
    // Outer gradient stroke (like the screenshot)
    <div className="rounded-2xl bg-gradient-to-b from-green-500  to-amber-400 p-[2px]">
      {/* Inner white panel */}
      <div className="flex h-full flex-col rounded-2xl bg-white  p-6 shadow-sm hover:shadow-md transition-shadow">
        {/* Title block */}
        <div className="text-center">
          <h3 className="text-2xl font-bold ">{plan.title}</h3>
          <p className="mt-1 text-xl font-bold text-blue-950">
            {plan.subtitle}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-gray-900">
            {plan.description}
          </p>
        </div>

        {/* Features */}
        <ul className="mt-5 space-y-2 text-center">
          {plan.features.map((f, i) => (
            <li
              key={i}
              className="text-[14px] font-semibold text-green-700"
            >
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-6">
          <button
            className="mx-auto block w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white tracking-wide
                        focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {plan.cta.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}
