"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Zap,
  MessageCircle,
  RefreshCw,
  Sun,
  // ** ATTRACTIVENESS ENHANCEMENT: Add check icon for success/completeness feel **
  CheckCircle,
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
  // ** ATTRACTIVENESS ENHANCEMENT: State for success message **
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      // ** ATTRACTIVENESS ENHANCEMENT: Use a better visual indicator than 'alert' for CAPTCHA failure (omitted for brevity, but a toast or error message state is better) **
      alert("Incorrect CAPTCHA. Please try again.");
      refreshCaptcha();
      return;
    }

    setIsSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      // ** ATTRACTIVENESS ENHANCEMENT: Set submission success state instead of an alert **
      setIsSubmitted(true);
      // Reset form data only, keep success message visible for a moment
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

      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);

    }, 1500);
  };

  return (
    <section
      id="contact"
      // ** ATTRACTIVENESS ENHANCEMENT: Deeper background, improved blending **
      className="relative py-20 md:py-32 flex items-center justify-center bg-gray-900 overflow-hidden min-h-screen"
    >
      {/* Animated Background Circles - ENHANCED COLORS AND SIZE */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} // ** Added rotation for more dynamism **
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          // ** Increased color intensity and size for more presence **
          className="absolute -top-40 -left-40 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl mix-blend-screen"
        ></motion.div>
        <motion.div
          animate={{ y: [0, 80, 0], x: [0, -80, 0] }} // ** More complex movement **
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          // ** Warm yellow/orange for 'solar' glow **
          className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-yellow-400 rounded-full opacity-10 blur-3xl mix-blend-screen"
        ></motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }} // ** Increased initial y offset **
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }} // ** Longer transition for smoother entry **
        // ** ENHANCED CARD STYLE: More pronounced border, shadow, and reduced background opacity for better contrast **
        className="relative w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-10 bg-white/95 backdrop-blur-lg border-2 border-green-300 rounded-3xl shadow-2xl shadow-green-900/40 p-8 md:p-14 transform hover:shadow-green-900/60 transition-shadow duration-300"
      >
        {/* LEFT SIDE: Content & Branding */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col justify-center space-y-8 p-4" // ** Added padding/space for better flow **
        >
          <div className="flex items-center gap-4">
            <Sun className="w-12 h-12 text-green-600 animate-spin-slow" /> {/* ** Added custom spin animation class ** */}
            <h2 className="text-5xl font-extrabold text-green-800 leading-snug tracking-tighter">
              Go Solar, Save More!
            </h2>
          </div>
          <p className="text-gray-700 text-xl font-light border-l-4 border-yellow-500 pl-4 italic">
            Get a personalized quote and take the first step toward **sustainable
            energy**. Our experts will reach out within 24 hours.
          </p>

          <ul className="space-y-4 text-gray-800 pt-4">
            <li className="flex items-center gap-3 text-lg font-medium">
              <Phone className="text-green-600 w-6 h-6 p-1 border border-green-300 rounded-full" /> **Call Us:** +91 98765 43210
            </li>
            <li className="flex items-center gap-3 text-lg font-medium">
              <Mail className="text-green-600 w-6 h-6 p-1 border border-green-300 rounded-full" /> **Email:** info@aumjayenergy.com
            </li>
            <li className="flex items-center gap-3 text-lg font-medium">
              <MapPin className="text-green-600 w-6 h-6 p-1 border border-green-300 rounded-full" /> **Serving:** Thane & Mumbai Region
            </li>
          </ul>

          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(16, 185, 129, 0.5)" }} // ** More visible shadow on hover **
            whileTap={{ scale: 0.98 }}
            className="mt-6 inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold text-lg rounded-full shadow-xl shadow-green-500/50 hover:from-green-700 hover:to-green-600 transition duration-300 cursor-pointer"
          >
            🌞 Start Your Solar Journey Today!
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-6"
        >
          <h3 className="text-3xl font-extrabold text-green-800 border-b-2 border-green-200 pb-2 mb-6">
            Get Your Free Solar Quote
          </h3>

          {/* Conditional Success Message */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg shadow-md font-semibold"
            >
              <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
              Thank you! Your quote request has been received. We’ll contact you soon!
            </motion.div>
          )}

          {/* Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <Field
              icon={<User className="text-green-600" />}
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
              label="Phone Number *"
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
              placeholder="Colaba, Mumbai"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
          </div>

          <Field
            icon={<MessageCircle className="text-green-600" />}
            label="Additional Questions or Comments"
            name="message"
            type="textarea"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your solar needs..."
          />

          {/* CAPTCHA - STYLING IMPROVED */}
          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4 shadow-inner">
            <div className="flex items-center justify-between mb-3">
              <label className="font-bold text-gray-700 text-base">
                Verify You’re Human *
              </label>
              <button
                type="button"
                onClick={refreshCaptcha}
                // ** ENHANCEMENT: Added transition and hover effect **
                className="text-green-700 hover:text-green-900 text-sm flex items-center gap-1 transition duration-200 hover:scale-105"
              >
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white border-2 border-green-400 rounded-md text-center py-2 font-mono text-2xl font-extrabold tracking-widest text-green-700 shadow-xl shadow-green-300/50 transform rotate-1"> {/* ** Added more visual style to CAPTCHA code ** */}
                {captchaCode}
              </div>
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
                // ** ENHANCEMENT: Improved focus style **
                className="flex-1 px-4 py-2 border-2 border-green-300 rounded-lg bg-green-50/60 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 uppercase transition duration-300"
                placeholder="Enter code"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(16, 185, 129, 0.7)" }} // ** More impactful hover effect **
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || isSubmitted}
            // ** ENHANCEMENT: More vibrant gradient and stronger shadow **
            className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white py-4 rounded-xl font-bold text-lg shadow-2xl shadow-green-500/50 hover:shadow-green-500/80 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "🚀 Get My Free Solar Quote"}
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

// === Reusable Components ===
// ** ATTRACTIVENESS ENHANCEMENT: Field components updated for better visual feedback **
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
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</span>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          placeholder={placeholder}
          required={required}
          // ** ENHANCEMENT: Added transition and better focus/hover states **
          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-green-200 bg-white/80 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none placeholder-gray-400 transition duration-300 hover:border-green-300 resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          // ** ENHANCEMENT: Added transition and better focus/hover states **
          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-green-200 bg-white/80 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none placeholder-gray-400 transition duration-300 hover:border-green-300"
        />
      )}
    </div>
  </div>
);

const SelectField = ({ icon, label, name, value, onChange, options }: any) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        // ** ENHANCEMENT: Added transition and better focus/hover states **
        className="w-full pl-10 pr-4 py-3 appearance-none rounded-lg border-2 border-green-200 bg-white/80 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none text-gray-700 transition duration-300 hover:border-green-300 cursor-pointer"
      >
        <option value="" disabled className="text-gray-400">Select an option</option> {/* ** Improved placeholder text ** */}
        {options.map((opt: string, i: number) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {/* ** ATTRACTIVENESS ENHANCEMENT: Custom dropdown arrow ** */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-600">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </div>
);

// ** ATTRACTIVENESS ENHANCEMENT: Add a small custom utility class for a slow sun spin **
// You would need to add this to your global CSS or Tailwind config:
// @keyframes spin-slow {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }
// .animate-spin-slow {
//   animation: spin-slow 20s linear infinite;
// }


export default ContactForm;