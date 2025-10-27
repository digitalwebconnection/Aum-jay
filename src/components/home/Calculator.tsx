// src/home/ROICalculatorSection.tsx
import React, { useMemo, useState } from "react";

type Audience = "Home & Societies" | "Commercial";

const AUDIENCES: Audience[] = ["Home & Societies", "Commercial"];

function inr(n: number) {
  if (!isFinite(n)) return "—";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)));
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function roundToHalf(n: number) {
  return Math.round(n * 2) / 2;
}

export default function Calculator() {
  // Audience affects defaults (price per kW, subsidy)
  const [aud, setAud] = useState<Audience>("Home & Societies");

  // Inputs
  const [monthlyBill, setMonthlyBill] = useState<number>(5000); // ₹
  const [tariff, setTariff] = useState<number>(9);              // ₹/kWh (editable)
  const [offset, setOffset] = useState<number>(80);             // % of bill covered by solar
  const [pricePerKW, setPricePerKW] = useState<number>(55000);  // ₹/kW EPC (editable)
  const [subsidy, setSubsidy] = useState<number>(78000);        // ₹ (editable)
  const [emi, setEmi] = useState<number>(0);                    // ₹/month (optional)

  // Auto-adjust defaults when audience changes
  React.useEffect(() => {
    if (aud === "Home & Societies") {
      setPricePerKW(55000); // typical residential turnkey (placeholder)
      if (subsidy === 0) setSubsidy(78000); // PM-Surya Ghar cap (editable)
    } else {
      setPricePerKW(45000); // indicative commercial EPC (placeholder)
      setSubsidy(0);
    }
  }, [aud]);

  // Derived calcs
  const calc = useMemo(() => {
    const safeTariff = tariff > 0 ? tariff : 9;
    const monthlyKWh = monthlyBill / safeTariff; // current consumption (kWh)
    const targetMonthlyKWh = monthlyKWh * (offset / 100);

    // Annual production per kW (PAN-India typical): 1400 kWh/yr (adjustable if needed)
    const annualPerKW = 1400;
    const recommendedKWRaw = (targetMonthlyKWh * 12) / annualPerKW;

    // sensible bounds
    const minKW = aud === "Commercial" ? 5 : 1;
    const maxKW = 500;
    const recommendedKW = clamp(roundToHalf(recommendedKWRaw), minKW, maxKW);

    const capex = recommendedKW * pricePerKW;
    const netCapex = Math.max(0, capex - subsidy);

    const grossMonthlySavings = (monthlyBill * offset) / 100; // ₹/month saved on bill
    const netMonthlySavings = Math.max(0, grossMonthlySavings - (emi || 0));

    const simplePaybackYears = grossMonthlySavings > 0 ? netCapex / (grossMonthlySavings * 12) : Infinity;

    // First-year ROI (no degradation, pre-tax): annual savings / netCapex
    const annualSavings = grossMonthlySavings * 12;
    const firstYearROI = netCapex > 0 ? (annualSavings / netCapex) * 100 : 0;

    return {
      monthlyKWh,
      targetMonthlyKWh,
      recommendedKW,
      capex,
      netCapex,
      grossMonthlySavings,
      netMonthlySavings,
      simplePaybackYears,
      firstYearROI,
    };
  }, [aud, monthlyBill, tariff, offset, pricePerKW, subsidy, emi]);

  return (
    <section id="roi" className="bg-slate-50 py-14 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-500 px-8 py-1 text-xs font-medium text-white">
            Instant ROI & Savings Estimator
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            See How Much You Can Save in Minutes.
          </h2>
          <p className="mt-3 text-sm md:text-lg text-slate-600">
            Enter your monthly bill and coverage goal. We’ll estimate system size, costs, and payback. Exact figures need a site survey.
          </p>
        </div>

        {/* Audience toggle */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {AUDIENCES.map((a) => (
            <button
              key={a}
              onClick={() => setAud(a)}
              className={[
                "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                a === aud
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
              ].join(" ")}
            >
              {a}
            </button>
          ))}
        </div>

        {/* Calculator */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Left: Inputs */}
          <div className="lg:col-span-5 ">
            <div className="rounded-2xl border-1 border-black/50 shadow-2xl bg-white p-6 ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Inputs</h3>

              {/* Quick presets */}

              <div className="mt-3 flex flex-wrap gap-2">
                {[3000, 5000, 8000, 12000, 20000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setMonthlyBill(v)}
                    className="rounded-full border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:border-slate-400"
                  >
                    ₹{inr(v)}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setMonthlyBill(5000);
                    setTariff(9);
                    setOffset(80);
                    setEmi(0);
                    setSubsidy(aud === "Home & Societies" ? 78000 : 0);
                    setPricePerKW(aud === "Home & Societies" ? 55000 : 45000);
                  }}
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:border-slate-400"
                >
                  Reset
                </button>
              </div>

              {/* Money inputs */}

              <div className="mt-5 grid gap-4">
                <LabeledNumber
                  label="Monthly electricity bill (₹)"
                  value={monthlyBill}
                  onChange={setMonthlyBill}
                  min={500}
                  step={100}
                />
                <LabeledNumber
                  label="Tariff (₹/kWh)"
                  value={tariff}
                  onChange={setTariff}
                  min={4}
                  max={20}
                  step={0.1}
                />

                {/* Offset slider */}

                <div>
                  <label className="flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>Solar coverage goal</span>
                    <span className="text-slate-500">{offset}%</span>
                  </label>
                  <input
                    type="range"
                    min={30}
                    max={95}
                    step={5}
                    value={offset}
                    onChange={(e) => setOffset(Number(e.target.value))}
                    className="mt-2 w-full accent-[#0db02b]"
                  />
                  <p className="mt-1 text-xs text-slate-500">What % of your bill should solar offset? (30–95%)</p>
                </div>

                {/* Price per kW */}

                <LabeledNumber
                  label={`Price per kW (₹/kW) — ${aud === "Home & Societies" ? "residential" : "commercial"} EPC`}
                  value={pricePerKW}
                  onChange={setPricePerKW}
                  min={30000}
                  max={90000}
                  step={500}
                />

                <LabeledNumber
                  label="Subsidy (₹) — optional"
                  value={subsidy}
                  onChange={setSubsidy}
                  min={0}
                  step={1000}
                />

                <LabeledNumber
                  label="EMI (₹/month) — optional"
                  value={emi}
                  onChange={setEmi}
                  min={0}
                  step={500}
                />
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Values are indicative and editable. Subsidy depends on scheme eligibility and state policy.
              </p>
            </div>
          </div>

          {/* Right: Results */}

          <div className="lg:col-span-7">
            <div className="rounded-2xl shadow-2xl bg-white p-6 ring-1 ring-slate-200 border-1 border-black/50">
              <h3 className="text-lg font-semibold text-slate-900">Results (estimate)</h3>

              {/* KPIs */}

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <KPI title="Recommended system size" value={`${calc.recommendedKW.toFixed(1)} kW`} hint="Rounded to nearest 0.5 kW" />
                <KPI title="Gross project cost" value={`₹ ${inr(calc.capex)}`} hint={`${aud === "Home & Societies" ? "Residential" : "Commercial"} EPC`} />
                <KPI title="Net cost after subsidy" value={`₹ ${inr(calc.netCapex)}`} hint="Capex – subsidy" />
                <KPI title="Monthly bill offset" value={`₹ ${inr(calc.grossMonthlySavings)}`} hint={`${offset}% of current bill`} />
                <KPI title="Net monthly savings" value={`₹ ${inr(calc.netMonthlySavings)}`} hint="After EMI (if any)" />
                <KPI
                  title="Simple payback"
                  value={isFinite(calc.simplePaybackYears) ? `${calc.simplePaybackYears.toFixed(1)} yrs` : "—"}
                  hint="Net cost / annual savings"
                />
              </div>

              {/* ROI bar */}

              <div className="mt-6 rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-900">Final design, cost & ROI subject to site survey and DISCOM approval.</p>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
                  <div
                    className="h-3 bg-[#0db02b]"
                    style={{ width: `${clamp(calc.firstYearROI, 0, 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-700">
                  ~ {calc.firstYearROI.toFixed(0)}% based on annual savings ÷ net cost.
                </p>
              </div>

              {/* Explainer */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Explain
                  title="How we estimated size"
                  points={[
                    `Your usage ≈ ${inr(calc.monthlyKWh)} kWh/month @ ₹${tariff}/kWh`,
                    `Target offset: ${offset}% → ${inr(calc.targetMonthlyKWh)} kWh/month by solar`,
                    "Annual output ~1400 kWh/kW ⇒ size rounded to 0.5 kW",
                  ]}
                />
                <Explain
                  title="What affects ROI"
                  points={[
                    "Tariff, irradiation & roof shading",
                    "Module/inverter efficiency & layout",
                    "Financing cost (EMI) & subsidy eligibility",
                  ]}
                />
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#book-survey"
                  className="inline-flex items-center justify-center rounded-xl bg-[#0db02b] px-5 py-3 text-[13px] md:text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  Get exact proposal → Book free survey.
                </a>
                <a
                  href="#b2b-proposal"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  Request Business Proposal
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- tiny subcomponents ---------- */

function LabeledNumber({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
      />
    </label>
  );
}

function KPI({ title, value, hint }: { title: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

function Explain({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}
