"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sun,
  Home,
  Building2,
  Battery,
  ArrowRight,
} from "lucide-react"

interface PopupExampleProps {
  onClose: () => void
}

const SolarInquiryPopup: React.FC<PopupExampleProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    property: "",
    power: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [showThankYou, setShowThankYou] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "Required"
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate submission
    setShowThankYou(true)
    setTimeout(() => {
      setShowThankYou(false)
      onClose()
    }, 3000)
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* Thank You Popup */}
      {showThankYou && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute z-[1000] flex flex-col items-center justify-center bg-white rounded-3xl shadow-lg p-8 max-w-sm text-center"
        >
          <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
          <h3 className="text-2xl font-semibold text-green-700">Thank You!</h3>
          <p className="text-gray-600 mt-2">
            Your solar inquiry has been submitted successfully. Our team will contact you soon!
          </p>
        </motion.div>
      )}

      {/* Main Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-white via-green-50 to-yellow-50 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.25)] border border-green-100 overflow-hidden"
      >
        {/* Glow background circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-200/40 rounded-full blur-3xl animate-pulse" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-red-500 text-2xl transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sun className="w-12 h-12 text-yellow-500" />
          </motion.div>
          <h2 className="mt-3 text-3xl font-bold text-green-700">Go Solar Today</h2>
          <p className="text-gray-600 mt-2">
            Get a{" "}
            <span className="text-green-600 font-semibold">Free Solar Installation Quote</span> — fill out your details below!
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-green-500 w-5 h-5" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg border pl-10 p-3 bg-white/90 shadow-sm outline-none transition ${
                errors.name ? "border-red-400" : "focus:ring-2 focus:ring-green-400"
              }`}
            />
            {errors.name && <span className="text-red-500 text-xs absolute right-2 top-3">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-green-500 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border pl-10 p-3 bg-white/90 shadow-sm outline-none transition ${
                errors.email ? "border-red-400" : "focus:ring-2 focus:ring-green-400"
              }`}
            />
            {errors.email && <span className="text-red-500 text-xs absolute right-2 top-3">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 text-green-500 w-5 h-5" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full rounded-lg border pl-10 p-3 bg-white/90 shadow-sm outline-none transition ${
                errors.phone ? "border-red-400" : "focus:ring-2 focus:ring-green-400"
              }`}
            />
            {errors.phone && <span className="text-red-500 text-xs absolute right-2 top-3">{errors.phone}</span>}
          </div>

          {/* Address */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 text-green-500 w-5 h-5" />
            <textarea
              name="address"
              placeholder="Installation Address / Society Name"
              value={formData.address}
              onChange={handleChange}
              className={`w-full rounded-lg border pl-10 p-3 bg-white/90 shadow-sm outline-none transition min-h-[90px] ${
                errors.address ? "border-red-400" : "focus:ring-2 focus:ring-green-400"
              }`}
            />
            {errors.address && <span className="text-red-500 text-xs absolute right-2 top-3">{errors.address}</span>}
          </div>

          {/* Property Type */}
          <div className="grid grid-cols-2 gap-3">
            <label
              className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-green-50 transition ${
                formData.property === "residential" ? "border-green-500 bg-green-50" : ""
              }`}
            >
              <Home className="text-green-500 w-5 h-5" />
              <input
                type="radio"
                name="property"
                value="residential"
                checked={formData.property === "residential"}
                onChange={handleChange}
                className="accent-green-600"
              />
              <span className="text-gray-700 text-sm">Residential</span>
            </label>

            <label
              className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-green-50 transition ${
                formData.property === "commercial" ? "border-green-500 bg-green-50" : ""
              }`}
            >
              <Building2 className="text-green-500 w-5 h-5" />
              <input
                type="radio"
                name="property"
                value="commercial"
                checked={formData.property === "commercial"}
                onChange={handleChange}
                className="accent-green-600"
              />
              <span className="text-gray-700 text-sm">Commercial</span>
            </label>
          </div>
          {errors.property && <p className="text-red-500 text-xs -mt-2">{errors.property}</p>}

          {/* Power Requirement */}
          <div className="relative">
            <Battery className="absolute left-3 top-3.5 text-green-500 w-5 h-5" />
            <select
              name="power"
              value={formData.power}
              onChange={handleChange}
              className={`w-full rounded-lg border pl-10 p-3 bg-white/90 shadow-sm outline-none transition ${
                errors.power ? "border-red-400" : "focus:ring-2 focus:ring-green-400"
              }`}
            >
              <option value="">Select Power Requirement</option>
              <option>1-3 kW (Small Home)</option>
              <option>3-5 kW (Medium Home)</option>
              <option>5-10 kW (Large Home)</option>
              <option>10+ kW (Commercial)</option>
            </select>
            {errors.power && <span className="text-red-500 text-xs absolute right-2 top-3">{errors.power}</span>}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-3 w-full rounded-lg bg-green-600 py-3 text-white font-semibold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Submit Inquiry
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        {/* Bottom Note */}
        <p className="text-center text-gray-500 text-xs mt-4">
          💡 Our team will reach out within 24 hours for your free solar consultation.
        </p>
      </motion.div>
    </div>
  )
}

export default SolarInquiryPopup
