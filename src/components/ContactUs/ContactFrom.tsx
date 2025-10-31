"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, User, IndianRupee, Home, Send } from "lucide-react";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        city: "",
        bill: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setForm({ name: "", phone: "", email: "", city: "", bill: "", message: "" });
    };


    const contactCards = [
        {
            icon: <Phone className="h-8 w-8 text-green-600" />,
            title: "Call Us",
            value: "+91 9321508896",
            href: "tel:+919321508896",
            bg: "from-green-700/90 to-green-500/90",
        },
        {
            icon: <Mail className="h-8 w-8 text-yellow-500" />,
            title: "Email Us",
            value: "info@aumjayrenewables.com",
            href: "mailto:info@aumjayrenewables.com",
            bg: "from-yellow-700/90 to-yellow-500/90",
        },
        {
            icon: <MapPin className="h-8 w-8 text-blue-500" />,
            title: "Our Location",
            value: "Mumbai, Maharashtra",
            bg: "from-blue-700/90 to-blue-400/90",
        },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-green-50 text-gray-800">
            {/* ---------- TOP SECTION ---------- */}
            <section className="relative py-20 px-6 md:px-16 overflow-hidden">
                {/* 🌞 Solar Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-yellow-50 to-white -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-5xl max-w-3xl mx-auto font-bold mb-10 ">
                        Talk About How We Can Help
                        You Reduce Your Energy
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {contactCards.map((card, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.07, y: -5 }}
                                className={`group relative bg-gradient-to-br ${card.bg} rounded-2xl shadow-xl shadow-black/30 border border-gray-800/20 p-8 flex flex-col items-center text-center transition-all duration-300`}
                            >
                                <div className="bg-gray-900  shadow-md shadow-black/50 rounded-full p-4 mb-4 group-hover:shadow-xl transition">
                                    {card.icon}
                                </div>
                                <p className="font-semibold text-lg text-gray-800 mb-1">{card.title}</p>
                                {card.href ? (
                                    <a
                                        href={card.href}
                                        className="text-white font-medium hover:underline"
                                    >
                                        {card.value}
                                    </a>
                                ) : (
                                    <span className="text-white font-medium">{card.value}</span>
                                )}
                                {/* glowing background accent */}
                                <div className="absolute inset-0 bg-gradient-to-t from-green-100/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ---------- MIDDLE SECTION (CONTACT FORM) ---------- */}
            <section className="py-16 px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-white/30 rounded-3xl shadow-2xl shadow-black/50 border-gray-900/20 border-2 p-8 md:p-12"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-8">
                        Get in Touch with Us
                    </h3>

                    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
                        <FormInput
                            label="First Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your First name"
                            icon={<User className="h-4 w-4 text-green-600" />}
                            required
                        />
                        <FormInput
                            label="Last Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your Last name"
                            icon={<User className="h-4 w-4 text-green-600" />}
                            required
                        />
                        <FormInput
                            label="Phone Number"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 XXXXX XXXXX"
                            icon={<Phone className="h-4 w-4 text-green-600" />}
                            required
                        />
                        <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            icon={<Mail className="h-4 w-4 text-green-600" />}
                            required
                        />
                        <FormInput
                            label="City"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="e.g., Mumbai"
                            icon={<Home className="h-4 w-4 text-green-600" />}
                            required
                        />
                        <FormInput
                            label="Monthly Bill Amount (₹)"
                            name="bill"
                            value={form.bill}
                            onChange={handleChange}
                            placeholder="e.g., 5000"
                            icon={<IndianRupee className="h-4 w-4 text-green-600" />}
                            required
                        />
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Message (optional)
                            </label>
                            <textarea
                                name="message"
                                rows={4}
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Your message here..."
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:border-green-400"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="md:col-span-2 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            <Send className="h-4 w-4" />
                            Submit
                        </motion.button>

                        {submitted && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="md:col-span-2 mt-4 text-center text-green-700 font-medium bg-green-50 border border-green-200 rounded-lg py-2"
                            >
                                ✅ Thank you! We’ll get back to you shortly.
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </section>

            {/* ---------- BOTTOM SECTION (MAP) ---------- */}
            <section className="pb-16 px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto text-center"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">
                        Visit Our Office
                    </h3>
                    <div className="overflow-hidden rounded-xl shadow-lg border border-green-200">
                        <iframe
                            title="Aumjay Renewables Office"
                            src="https://www.google.com/maps?q=Mumbai,+Maharashtra&output=embed"
                            loading="lazy"
                            className="w-full h-[300px]"
                        />
                    </div>
                </motion.div>
            </section>
        </main>
    );
}

/* ------------------- Subcomponent ------------------- */
function FormInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    icon,
    required,
}: any) {
    return (
        <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-400 focus-within:border-green-400">
                {icon}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="w-full outline-none text-sm bg-transparent"
                />
            </div>
        </label>
    );
}
