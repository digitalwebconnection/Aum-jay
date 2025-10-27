"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  // Home,
  // Zap,
  MessageCircle,
  RefreshCw,
} from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    roofSize: "",
    energyUsage: "",
    message: "",
  });

  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [isSubmitting, setIsSubmitting] = useState(false);

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 6 })
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join("");
  }

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setCaptchaInput("");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (captchaInput.toUpperCase() !== captchaCode) {
      alert("Incorrect CAPTCHA. Please try again.");
      refreshCaptcha();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      alert("Thank you! We’ll contact you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        roofSize: "",
        energyUsage: "",
        message: "",
      });
      refreshCaptcha();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div id="contact" className="flex items-center justify-center h-full p-2 md:p-12 relative overflow-hidden  " style={{ backgroundImage: `url("https://cleanpower.org/wp-content/uploads/2021/01/solar-panels-los-angeles-california.jpg" ) ` }}>
      {/* Subtle Background Animation */}
      <div className="absolute h-full w-full inset-0 bg-black/75" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-3xl backdrop-blur-md bg-white/90 shadow-2xl rounded-3xl py-5 px-4 md:px-10 border border-green-100"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-center text-green-700 mb-2"
        >
          Get Your Free Solar Quote
        </motion.h2>
        <p className="text-gray-600 text-center mb-8">
          Fill out the form and our solar experts will contact you soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Field
              icon={<User className="text-green-600 " />}
              label="Full Name *"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Deshmukh Kulkarni"
              required
            />
            <Field
              icon={<Mail className="text-green-600" />}
              label="Email Address *"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Field
              icon={<Phone className="text-green-600" />}
              label="WhatsApp Number *"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9*********"
              required
            />
            <Field
              icon={<MapPin className="text-green-600" />}
              label="Property Address *"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Bandra, Mumbai, Maharashtra"
              required
            />
          </div>

          {/* <div className="grid md:grid-cols-2 gap-6">
            <SelectField
              icon={<Home className="text-green-600" />}
              label="Approx. Roof Size (sq ft)"
              name="roofSize"
              value={formData.roofSize}
              onChange={handleChange}
              options={[
                "Less than 1,000 sq ft",
                "1,000 - 2,000 sq ft",
                "2,000 - 3,000 sq ft",
                "More than 3,000 sq ft",
              ]}
            />
            <SelectField
              icon={<Zap className="text-green-600" />}
              label="Avg. Monthly Energy Usage (kWh)"
              name="energyUsage"
              value={formData.energyUsage}
              onChange={handleChange}
              options={[
                "Less than 500 kWh",
                "500 - 1,000 kWh",
                "1,000 - 1,500 kWh",
                "More than 1,500 kWh",
              ]}
            />
          </div> */}

          <Field
            icon={<MessageCircle className="text-green-600" />}
            label="Additional Questions or Comments"
            name="message"
            type="textarea"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your solar needs..."
          />

          {/* CAPTCHA */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <label className="font-medium text-gray-700">
                Verify You’re Human *
              </label>
              <button
                type="button"
                onClick={refreshCaptcha}
                className="text-green-700 hover:text-green-900 text-sm flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
            </div>
            <div className=" md:flex items-center gap-3">
              <div className="mb-4 md:mb-0 flex-1 bg-gradient-to-r from-green-100 to-green-200 border border-green-300 rounded-md text-center py-1 font-mono text-xl font-bold tracking-widest text-green-700 shadow-inner">
                {captchaCode}
              </div>
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
                className="flex-1 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 uppercase bg-gradient-to-r from-white to-green-50"
                placeholder="Enter code"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "🚀 Get My Free Solar Quote"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

// === Reusable Components ===
const Field = ({
  icon,
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
}: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-2.5">{icon}</span>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          placeholder={placeholder}
          required={required}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-white transition-all duration-300 shadow-inner"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-white transition-all duration-300 shadow-inner"
        />
      )}
    </div>
  </div>
);


// const SelectField = ({ icon, label, name, value, onChange, options }: any) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       {label}
//     </label>
//     <div className="relative">
//       <span className="absolute left-3 top-2.5">{icon}</span>
//       <select
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-white transition-all duration-300 shadow-inner"
//       >
//         <option value="">Select</option>
//         {options.map((opt: string, i: number) => (
//           <option key={i} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//     </div>
//   </div>
// );

export default ContactForm;
