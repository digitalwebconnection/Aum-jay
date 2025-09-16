import { Link } from "react-router-dom"
import { useState } from "react"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-green-600">
              Aumjay Solar
            </Link>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600">About</Link>
            <Link to="/service" className="text-gray-700 hover:text-green-600">Service</Link>
            <Link to="/project" className="text-gray-700 hover:text-green-600">Project</Link>

            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-green-600 gap-1">
                Pages <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded-md py-2 w-40">
                <Link to="/pages" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">Pages</Link>
              </div>
            </div>

            <Link to="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>

            <Link to="/contact" className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors">
              Get A Quote <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-green-600 focus:outline-none">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">Home</Link>
          <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">About</Link>
          <Link to="/service" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">Service</Link>
          <Link to="/project" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">Project</Link>
          <Link to="/pages" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">Pages</Link>
          <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">Contact</Link>
          <Link to="/contact" className="block px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded mx-4 text-center">Get A Quote</Link>
        </div>
      )}
    </nav>
  )
}
