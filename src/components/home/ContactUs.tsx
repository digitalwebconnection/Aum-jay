// src/sections/ContactSection.tsx
import { useEffect, useMemo, useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  Building2,
} from "lucide-react"

// ----- Types -----
type Status =
  | { type: ""; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string }

type Snack = {
  open: boolean
  type: "success" | "error"
  message: string
}



export default function ContactSection() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<Status>({ type: "", message: "" })
  const [snack, setSnack] = useState<Snack>({ open: false, type: "success", message: "" })

  const showSnack = (type: Snack["type"], message: string) => {
    setSnack({ open: true, type, message })
  }

  useEffect(() => {
    if (!snack.open) return
    const t = setTimeout(() => setSnack((s) => ({ ...s, open: false })), 3500)
    return () => clearTimeout(t)
  }, [snack.open])

  const snackIcon = useMemo(
    () => (snack.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />),
    [snack.type]
  )

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus({ type: "", message: "" })

    const form = e.currentTarget
    const formData = new FormData(form)

    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()
    if (!name || !email || !message) {
      const msg = "Please fill in your name, email, and message."
      setStatus({ type: "error", message: msg })
      showSnack("error", msg)
      return
    }

    if (String(formData.get("company_website") ?? "")) {
      const msg = "Thanks! We’ll get back to you shortly."
      setStatus({ type: "success", message: msg })
      showSnack("success", msg)
      form.reset()
      return
    }

    setLoading(true)
    try {
      const accessKey = "bf117321-9395-49d6-8d5d-7e32d1ff934e"
      formData.append("access_key", accessKey)
      formData.append("subject", "Aum-Jay: New Contact Form Enquiry")

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (!res.ok) throw new Error(`Submission failed (${res.status}). Please try again.`)

      const data = await res.json()

      if (data.success) {
        const msg = "Thanks! Your message has been sent. We’ll reach out soon."
        setStatus({ type: "success", message: msg })
        showSnack("success", msg)
        form.reset()
      } else {
        throw new Error(data.message || "Submission failed. Please try again.")
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again."
      setStatus({ type: "error", message: msg })
      showSnack("error", msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-24 bg-gradient-to-br from-white via-[#f6fff8] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center text-sm font-medium px-3 py-1 rounded-full bg-[#e6fcef] text-[#0DB02B]">
            We usually reply within a few hours
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Let’s build something great together
          </h2>
          <p className="mt-3 text-gray-600">
            Tell us about your project, budget, and timelines. Our team will get back with a clear next step — no fluff, just solutions.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6">
            <InfoCard icon={<Mail className="w-5 h-5" />} title="Email" lines={["hello@aumjay.com"]} href="mailto:hello@aumjay.com" />
            <InfoCard icon={<Phone className="w-5 h-5" />} title="Phone / WhatsApp" lines={["+91 98765 43210"]} href="tel:+919876543210" />
            <InfoCard icon={<MapPin className="w-5 h-5" />} title="Office" lines={["Aum-Jay, Ahmedabad, India"]} href="https://maps.google.com?q=Aum-Jay, Ahmedabad" target="_blank" />

            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <iframe
                title="Aum-Jay Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.680420398674!2d72.5713625!3d23.0225055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f57f0f9b17%3A0x4e1b2e4b9a6c0f3a!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-56"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="p-6 sm:p-8">
              <Form onSubmit={onSubmit} loading={loading} status={status} />
            </div>
          </div>
        </div>
      </div>

      <Snackbar open={snack.open} type={snack.type} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
        <div className="flex items-center gap-2">
          {snackIcon}
          <span>{snack.message}</span>
        </div>
      </Snackbar>
    </section>
  )
}

function InfoCard({ icon, title, lines = [], href, target }: { icon: React.ReactNode, title: string, lines?: string[], href?: string, target?: React.HTMLAttributeAnchorTarget }) {
  return (
    <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow">
      <div className="mt-1 inline-flex items-center justify-center rounded-xl p-2 bg-[#e6fcef] text-[#0DB02B]">
        {icon}
      </div>
      <div>
        <div className="font-semibold text-gray-900">{title}</div>
        {lines.map((l, i) => (
          <div key={i} className="text-gray-600">{l}</div>
        ))}
        <span className="mt-1 inline-flex items-center text-sm font-medium text-[#0DB02B]">
          {target === "_blank" ? "Open map" : "Contact"} <Send className="w-4 h-4 ml-1" />
        </span>
      </div>
    </a>
  )
}

function Form({ onSubmit, loading, status }: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void, loading: boolean, status: Status }) {
  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />

      <Field label="Full Name" name="name" required placeholder="Your name" autoComplete="name" icon={<Building2 className="w-4 h-4" />} />
      <Field type="email" label="Email" name="email" required placeholder="you@company.com" autoComplete="email" icon={<Mail className="w-4 h-4" />} />
      <Field label="Phone" name="phone" placeholder="+91 98xxxxxxx" autoComplete="tel" pattern="^[0-9+\-\s()]{6,}$" icon={<Phone className="w-4 h-4" />} />

      <div>
        <Label required>Message</Label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Briefly describe your goals, scope, and timeline…"
          className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 text-sm shadow-sm focus:outline-none focus:border-[#0DB02B] focus:ring-2 focus:ring-[#0DB02B]/30 px-4 py-3 transition duration-200 ease-in-out"
        />
      </div>

      <div className="flex items-start gap-3">
        <input id="consent" name="consent" type="checkbox" className="mt-1 rounded border-gray-300 text-[#0DB02B] focus:ring-[#0DB02B]" />
        <label htmlFor="consent" className="text-sm text-gray-600">
          I agree to be contacted by the Aum-Jay team about my enquiry.
        </label>
      </div>

      {status.type === "success" && (
        <p role="status" aria-live="polite" className="flex items-center gap-2 text-sm rounded-xl bg-green-50 border border-green-200 text-green-700 px-3 py-2">
          <CheckCircle2 className="w-4 h-4" /> {status.message}
        </p>
      )}
      {status.type === "error" && (
        <p role="alert" aria-live="assertive" className="flex items-center gap-2 text-sm rounded-xl bg-red-50 border border-red-200 text-red-700 px-3 py-2">
          <XCircle className="w-4 h-4" /> {status.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#0DB02B] to-[#00a11b] hover:from-[#00a11b] hover:to-[#0DB02B] shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? "Sending…" : "Send Message"}
        </button>

        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline text-[#0DB02B]">
          Prefer WhatsApp? Chat with us →
        </a>
      </div>

      <input type="hidden" name="source" value="Aum-Jay Contact Section" />
    </form>
  )
}

function Field({ label, name, type = "text", placeholder, required, icon, autoComplete, pattern }: any) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <div className="mt-2 relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          pattern={pattern}
          className={`w-full rounded-lg border border-gray-300 bg-gray-50 text-sm shadow-sm focus:outline-none focus:border-[#0DB02B] focus:ring-2 focus:ring-[#0DB02B]/30 px-4 py-3 transition duration-200 ease-in-out ${icon ? "pl-10" : ""}`}
        />
      </div>
    </div>
  )
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="text-sm font-medium text-gray-700">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  )
}

function Snackbar({ open, type, onClose, children }: { open: boolean; type: Snack["type"]; onClose: () => void; children: React.ReactNode }) {
  const base = type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
  const ring = type === "success" ? "ring-green-300" : "ring-red-300"

  return (
    <div role="status" aria-live="polite" className={`pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:px-6 lg:px-8 transition ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className={`pointer-events-auto max-w-lg w-full rounded-xl shadow-lg ring-1 ${ring} ${base}`}>
        <div className="p-3 flex items-start gap-3">
          <div className="flex-1 text-sm">{children}</div>
          <button type="button" aria-label="Close" onClick={onClose} className="inline-flex items-center justify-center rounded-md p-1 hover:opacity-80">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
