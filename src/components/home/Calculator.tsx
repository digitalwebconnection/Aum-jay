import React, { useMemo, useState } from "react";
import { Calculator, Sun, Zap, Wallet, ArrowRight } from "lucide-react";

type Audience = "Home" | "Commercial";
const AUDIENCES: Audience[] = ["Home", "Commercial"];

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));

export default function ROICalculatorModern() {
  const [aud, setAud] = useState<Audience>("Home");
  const [monthlyBill, setMonthlyBill] = useState(5000);
  const [tariff, setTariff] = useState(9);
  const [offset, setOffset] = useState(80);
  const [pricePerKW, setPricePerKW] = useState(55000);
  const [subsidy, setSubsidy] = useState(78000);

  React.useEffect(() => {
    if (aud === "Home") {
      setPricePerKW(55000);
      setSubsidy(78000);
    } else {
      setPricePerKW(45000);
      setSubsidy(0);
    }
  }, [aud]);

  const calc = useMemo(() => {
    const monthlyKWh = monthlyBill / tariff;
    const targetMonthlyKWh = monthlyKWh * (offset / 100);
    const annualPerKW = 1400;
    const recommendedKW = Math.round((targetMonthlyKWh * 12) / annualPerKW);
    const capex = recommendedKW * pricePerKW;
    const netCapex = Math.max(0, capex - subsidy);
    const grossMonthlySavings = (monthlyBill * offset) / 100;
    const simplePaybackYears =
      grossMonthlySavings > 0
        ? netCapex / (grossMonthlySavings * 12)
        : Infinity;
    const annualSavings = grossMonthlySavings * 12;
    const firstYearROI = netCapex > 0 ? (annualSavings / netCapex) * 100 : 0;

    return {
      recommendedKW,
      capex,
      netCapex,
      grossMonthlySavings,
      simplePaybackYears,
      firstYearROI,
    };
  }, [aud, monthlyBill, tariff, offset, pricePerKW, subsidy]);

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50 to-white py-20">
      {/* background accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-[#0DB02B]/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 text-center">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0DB02B]/10 px-4 py-1 text-sm font-semibold text-[#0DB02B]">
            <Calculator className="h-4 w-4" />
            Solar ROI Calculator
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Estimate Your Solar Savings Instantly ⚡
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Find out your system size, project cost, and payback period in seconds.
            Real savings start when you go solar with <b>Aumjay Solar</b>.
          </p>
        </div>

        {/* toggle audience */}
        <div className="flex justify-center gap-3 mb-10">
          {AUDIENCES.map((a) => (
            <button
              key={a}
              onClick={() => setAud(a)}
              className={`rounded-full px-5 py-2 font-medium transition-all border ${
                aud === a
                  ? "bg-[#0DB02B] text-white shadow-lg"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#0DB02B]/50"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* LEFT - Inputs */}
          <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-slate-600/50 shadow-2xl p-6 text-left">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Your Details
            </h3>

            <InputField
              label="Monthly Electricity Bill (₹)"
              value={monthlyBill}
              onChange={setMonthlyBill}
              min={1000}
              step={500}
            />
            <InputField
              label="Tariff (₹ per unit)"
              value={tariff}
              onChange={setTariff}
              min={4}
              max={20}
              step={0.1}
            />
            <SliderField
              label="Solar Coverage Goal"
              value={offset}
              onChange={setOffset}
              min={30}
              max={100}
              step={5}
            />
            <InputField
              label="Price per kW (₹)"
              value={pricePerKW}
              onChange={setPricePerKW}
              min={40000}
              max={90000}
              step={500}
            />
            <InputField
              label="Subsidy (₹)"
              value={subsidy}
              onChange={setSubsidy}
              min={0}
              step={1000}
            />

            <p className="mt-3 text-xs text-slate-500">
              * Values are indicative. Actual costs vary by location and system configuration.
            </p>
          </div>

          {/* RIGHT - Results */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0DB02B]/90 to-green-700 text-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Estimated Results</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={<Sun className="h-5 w-5" />}
                label="Recommended Size"
                value={`${calc.recommendedKW} kW`}
              />
              <ResultCard
                icon={<Wallet className="h-5 w-5" />}
                label="Total Project Cost"
                value={`₹ ${formatINR(calc.capex)}`}
              />
              <ResultCard
                icon={<Zap className="h-5 w-5" />}
                label="Net Cost After Subsidy"
                value={`₹ ${formatINR(calc.netCapex)}`}
              />
              <ResultCard
                icon={<Calculator className="h-5 w-5" />}
                label="Payback Period"
                value={`${calc.simplePaybackYears.toFixed(1)} yrs`}
              />
              <ResultCard
                icon={<Wallet className="h-5 w-5" />}
                label="Monthly Savings"
                value={`₹ ${formatINR(calc.grossMonthlySavings)}`}
              />
              <ResultCard
                icon={<Zap className="h-5 w-5" />}
                label="ROI (First Year)"
                value={`${calc.firstYearROI.toFixed(1)} %`}
              />
            </div>

            <div className="mt-8 text-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0DB02B] shadow-md hover:bg-slate-100 transition"
              >
                Book Free Site Survey <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- small reusable subcomponents ---------- */
function InputField({
  label,
  value,
  onChange,
  ...props
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        {...props}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#0DB02B] focus:ring-2 focus:ring-[#0DB02B]/30"
      />
    </div>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm font-medium text-slate-700">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#0DB02B] mt-2"
      />
    </div>
  );
}

function ResultCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white/10 p-4 text-left shadow-inner">
      <div className="flex items-center gap-2 text-sm text-white/90">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}
