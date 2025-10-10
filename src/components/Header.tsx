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

        setAtTop(y < 8)

        const threshold = 6

        if (!mobileMenuOpen) {
          if (y > 64 && delta > threshold) {
            setHidden(true)
          } else if (delta < -threshold) {
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
    >
      <div
        className={[
          "backdrop-blur supports-backdrop-blur:bg-white/70",
          atTop ? "bg-white/80" : "bg-white shadow-md",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#home">
                <img src={logo} alt="Logo" className="h-16 w-auto" />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-12 items-center">
              <a href="#home" className="text-gray-700 hover:text-[#0DB02B]">Home</a>
              <a href="#about" className="text-gray-700 hover:text-[#0DB02B]">About</a>
              <a href="#service" className="text-gray-700 hover:text-[#0DB02B]">Service</a>

              {/* Project Dropdown */}
              <div className="relative group">
                <a href="#project"  className="flex items-center text-gray-700 hover:text-[#0DB02B] gap-1">
                  Project
                </a>
     
              </div>

              <a href="#contact" className="text-gray-700 hover:text-[#0DB02B]">Contact</a>

              <a
                href="#quote"
                className="flex items-center px-6 py-2 bg-[#0DB02B] text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
              >
                Get A Quote <ArrowRight className="w-5 h-5 ml-2" />
              </a>
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
          <div className="md:hidden bg-white shadow-lg pb-5">
            <a href="#home" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">Home</a>
            <a href="#about" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">About</a>
            <a href="#service" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">Service</a>

            <div className="border-t border-gray-100">
              <span className="block px-4 py-2 text-gray-700 font-semibold">Project</span>

            </div>

            <a href="#contact" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">Contact</a>
            <a href="#quote" className="block px-4 py-2 text-white bg-[#0DB02B] hover:bg-green-700 rounded mx-4 text-center">
              Get A Quote
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
