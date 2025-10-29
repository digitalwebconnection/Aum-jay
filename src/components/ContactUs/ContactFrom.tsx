"use client";
import React, {  useState } from "react";
import { Phone, Mail, MapPin, ArrowRight, Loader2, CheckCircle, Upload } from "lucide-react";


export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        customerType: "Home",
        bill: "",
        city: "",
        installType: "Rooftop",
        subject: "",
        message: "",
        file: null as File | null,
    });

    const [verified, setVerified] = useState(false);
    const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const isEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isPhone = (p: string) => /^(\+?91[-\s]?)?[6-9]\d{9}$/.test(p.replace(/\s|-/g, ""));

    const validate = () => {
        if (!form.name.trim()) return "Please enter your name.";
        if (!isEmail(form.email)) return "Enter a valid email address.";
        if (!isPhone(form.phone)) return "Enter a valid Indian phone number.";
        if (!form.city.trim()) return "Please enter your city or location.";
        if (!form.bill.trim()) return "Please enter your monthly electricity bill amount.";
        if (form.message.trim().length < 10) return "Please describe your requirements briefly.";
        if (!verified) return "Please complete verification.";
        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const err = validate();
        if (err) return setStatus({ ok: false, msg: err });
        setStatus(null);
        setSubmitting(true);
        try {
            await new Promise((res) => setTimeout(res, 1000)); // simulate
            setStatus({ ok: true, msg: "Thank you! Our solar consultant will contact you soon." });
            setForm({
                name: "",
                email: "",
                phone: "",
                customerType: "Home",
                bill: "",
                city: "",
                installType: "Rooftop",
                subject: "",
                message: "",
                file: null,
            });
            setVerified(false);
        } catch {
            setStatus({ ok: false, msg: "Something went wrong. Please try again." });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-green-50 py-16">
            <div className="max-w-7xl mx-auto grid gap-10 px-6 md:grid-cols-2 items-start">
                {/* LEFT INFO */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">Let’s Get You Started With Solar </h2>
                    <p className="text-gray-600">
                        Tell us a few details — our team will prepare a customized solar proposal including capacity, ROI,
                        and subsidy options for your location.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-1">
                        <Info icon={<Phone />} label="Phone" value="+91 9321508896" />
                        <Info icon={<Mail />} label="Email" value="info@aumjayrenewables.com" />
                        <Info icon={<MapPin />} label="Office" value="Mumbai, Maharashtra" />
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow">
                        <iframe
                            title="Aumjay Solar Map"
                            src="https://www.google.com/maps?q=Mumbai&output=embed"
                            className="w-full h-64"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* RIGHT FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/80 backdrop-blur-md border border-green-600/50 rounded-3xl p-8 shadow-2xl space-y-5"
                >
                    <h3 className="text-2xl font-semibold text-gray-900">Solar Installation Enquiry</h3>
                    <p className="text-sm text-gray-500 mb-4">We’ll call you within 24 hours with a quote.</p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field name="name" label="Full Name" value={form.name} onChange={handleChange} required />
                        <Field name="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field name="phone" label="Phone Number" value={form.phone} onChange={handleChange} required />
                        <Field name="city" label="City / Location" value={form.city} onChange={handleChange} required />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Select
                            name="customerType"
                            label="Customer Type"
                            value={form.customerType}
                            onChange={handleChange}
                            options={["Home", "Society", "Commercial", "Industrial"]}
                        />
                        <Select
                            name="installType"
                            label="Installation Type"
                            value={form.installType}
                            onChange={handleChange}
                            options={["Rooftop", "Ground Mount", "Carport", "Hybrid"]}
                        />
                    </div>

                    <Field
                        name="bill"
                        label="Monthly Electricity Bill (₹)"
                        value={form.bill}
                        onChange={handleChange}
                        required
                        placeholder="e.g., 5000"
                    />

                    <Field
                        name="message"
                        label="Message / Requirements"
                        textarea
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your site, load, or project requirements..."
                    />

                    {/* File Upload */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                            <Upload className="h-4 w-4 text-[#0DB02B]" /> Attach Electricity Bill / Site Photo (optional)
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setForm({ ...form, file: e.target.files ? e.target.files[0] : null })}
                            className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-full file:border-0 file:bg-[#0DB02B] file:px-4 file:py-2 file:text-white hover:file:bg-green-700"
                        />
                    </div>

                    {/* Captcha */}
                    <div className="mt-4">
                        <ClickCaptcha verified={verified} setVerified={setVerified} />
                    </div>

                    {status && (
                        <div
                            className={`text-sm px-3 py-2 rounded-xl ${status.ok
                                    ? "bg-green-50 text-green-700 border border-green-200"
                                    : "bg-red-50 text-red-700 border border-red-200"
                                }`}
                        >
                            {status.msg}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#0DB02B] text-white font-semibold py-3 text-sm hover:bg-green-700 transition-all shadow-md"
                    >
                        {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
                        {submitting ? "Submitting..." : "Request a Quote"}
                    </button>
                </form>
            </div>
        </main>
    );
}

/* ------- Subcomponents ------- */

function Field({ name, label, value, onChange, type = "text", textarea, placeholder, required }: any) {
    const base =
        "w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-[#0DB02B] focus:ring-2 focus:ring-[#0DB02B]/20";
    return (
        <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
            {textarea ? (
                <textarea
                    rows={5}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`${base} mt-1`}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`${base} mt-1`}
                />
            )}
        </label>
    );
}

function Select({ name, label, value, onChange, options }: any) {
    return (
        <label className="block text-sm font-medium text-gray-700">
            {label}
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#0DB02B] focus:ring-2 focus:ring-[#0DB02B]/20 outline-none"
            >
                {options.map((opt: string) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </label>
    );
}

function Info({ icon, label, value }: any) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-gray-500/80 bg-white p-4 shadow-xl">
            <div className="text-[#0DB02B]">{icon}</div>
            <div>
                <p className="text-xs font-semibold text-gray-500">{label}</p>
                <p className="text-sm text-gray-800">{value}</p>
            </div>
        </div>
    );
}

/* --- Modern Click Verification --- */
function ClickCaptcha({ verified, setVerified }: { verified: boolean; setVerified: (v: boolean) => void }) {
    const [progress, setProgress] = useState(0);

    function handleClick() {
        if (verified) return;
        const steps = 6;
        let p = 0;
        const timer = setInterval(() => {
            p += 100 / steps;
            setProgress(p);
            if (p >= 100) {
                clearInterval(timer);
                setTimeout(() => setVerified(true), 200);
            }
        }, 80);
    }

    return (
        <div
            onClick={handleClick}
            className="relative w-full h-11 rounded-full border border-gray-300 overflow-hidden cursor-pointer bg-gray-100"
        >
            <div
                className="absolute left-0 top-0 h-full bg-[#0DB02B] transition-all duration-300"
                style={{ width: verified ? "100%" : `${progress}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700">
                {verified ? (
                    <span className="flex items-center gap-1 text-white">
                        <CheckCircle className="h-4 w-4" /> Verified
                    </span>
                ) : (
                    "Click to Verify"
                )}
            </div>
        </div>
    );
}
