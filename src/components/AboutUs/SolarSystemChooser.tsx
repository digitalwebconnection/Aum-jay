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
    title: "5.5kW",
    subtitle: "Solar System",
    description:
      "High-efficiency panels ensuring maximum energy output",
    features: [
      "High Power Output",
      "Maximum Energy Savings",
      "Smart Hybrid Inverter",
      "Eco-Friendly Solution",
      "Low Maintenance Cost",
    ],
    cta: "Get Started",
  },
  {
    title: "10.5kW",
    subtitle: "Solar System",
    description:
      "Smart hybrid inverter for seamless power conversion",
    features: [
      "Durable Panel Design",
      "Government Subsidy Eligible",
      "Reliable Power Backup",
      "Clean Green Energy",
      "Long-Term Warranty",
    ],
    cta: "Get Started",
  },
  {
    title: "13.5kW",
    subtitle: "Solar System",
    description:
      "For power storage and nighttime usage",
    features: [
      "Eco-Friendly Solution",
      "Zero Noise Operation",
      "Bill-Free Future",
      "Compact Roof Design",
      "Weather Resistant Frame",
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
