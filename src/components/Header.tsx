import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import logo from "/src/assets/logo.png"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [atTop, setAtTop] = useState(true)

  const lastYRef = useRef(0)
  const tickingRef = useRef(false)

  const toggleMenu = () => setMobileMenuOpen((v) => !v)

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return
      window.requestAnimationFrame(() => {
        const y = window.scrollY || 0
        const lastY = lastYRef.current
        const delta = y - lastY

        // Solid background when scrolled
        setAtTop(y < 8)

        // Only toggle when scrolled a bit to avoid jitter
        const threshold = 6

        // If menu is open, keep header visible
        if (!mobileMenuOpen) {
          if (y > 64 && delta > threshold) {
            // scrolling down
            setHidden(true)
          } else if (delta < -threshold) {
            // scrolling up
            setHidden(false)
          }
        } else {
          setHidden(false)
        }

        lastYRef.current = y
        tickingRef.current = false
      })
      tickingRef.current = true
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [mobileMenuOpen])

  return (
    <nav
      className={[
        "fixed z-50 inset-x-0 top-0 transition-transform duration-300 will-change-transform",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
      aria-hidden={false}
    >
      <div
        className={[
          "backdrop-blur supports-backdrop-blur:bg-white/70",
          "bg-white",
          atTop ? "bg-white/80" : "bg-white shadow-md",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img src={logo} alt="Logo" className="h-16 w-auto" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-12 items-center">
              <Link to="/" className="text-gray-700 hover:text-[#0DB02B]">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-[#0DB02B]">About</Link>
              <Link to="/service" className="text-gray-700 hover:text-[#0DB02B]">Service</Link>

              {/* Project dropdown */}
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-[#0DB02B] gap-1">
                  Project <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded-md py-2 w-40">
                  <Link to="/project/b2c" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">B2C</Link>
                  <Link to="/project/b2b" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">B2B</Link>
                </div>
              </div>

              <Link to="/contact" className="text-gray-700 hover:text-[#0DB02B]">Contact</Link>

              <Link
                to="/contact"
                className="flex items-center px-6 py-2 bg-[#0DB02B] text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
              >
                Get A Quote <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-[#0DB02B] focus:outline-none"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">Home</Link>
            <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">About</Link>
            <Link to="/service" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">Service</Link>

            <div className="border-t border-gray-100">
              <span className="block px-4 py-2 text-gray-700 font-semibold">Project</span>
              <Link to="/project/b2c" className="block pl-8 pr-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">B2C</Link>
              <Link to="/project/b2b" className="block pl-8 pr-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">B2B</Link>
            </div>

            <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">Contact</Link>
            <Link to="/contact" className="block px-4 py-2 text-white bg-[#0DB02B] hover:bg-green-700 rounded mx-4 text-center">
              Get A Quote
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
