import { Link } from "react-router-dom"
import { useState } from "react"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"

// ✅ Import your logo image
import logo from "/src/assets/logo.png"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* ✅ Logo */}
          <div className="flex-shrink-0 -mt-6">
            <Link to="/">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-50 w-auto" // adjust size as needed
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 items-center">
            <Link to="/" className="text-gray-700 hover:text-[#0DB02B]">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-[#0DB02B]">About</Link>
            <Link to="/service" className="text-gray-700 hover:text-[#0DB02B]">Service</Link>

            {/* ✅ Project dropdown */}
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

            <Link to="/contact" className="flex items-center px-6 py-2  bg-[#0DB02B] text-white font-semibold rounded-full hover:bg-green-700 transition-colors">
              Get A Quote <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-[#0DB02B] focus:outline-none">
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

          {/* ✅ Mobile Project submenu */}
          <div className="border-t border-gray-100">
            <span className="block px-4 py-2 text-gray-700 font-semibold">Project</span>
            <Link to="/project/b2c" className="block pl-8 pr-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">B2C</Link>
            <Link to="/project/b2b" className="block pl-8 pr-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">B2B</Link>
          </div>

          <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#0DB02B]">Contact</Link>
          <Link to="/contact" className="block px-4 py-2 text-white bg-[#0DB02B] hover:bg-green-700 rounded mx-4 text-center">Get A Quote</Link>
        </div>
      )}
    </nav>
  )
}
