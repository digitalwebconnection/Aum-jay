"use client"
import { MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { Facebook, Twitter, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#13232f] text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Address Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">Address</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-green-400" />
              <span>123 Street, New York, USA</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-green-400" />
              <span>+012 345 67890</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-green-400" />
              <span>info@example.com</span>
            </li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="#" className="p-2 rounded-full border border-gray-400 hover:bg-green-500 transition">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 rounded-full border border-gray-400 hover:bg-green-500 transition">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2 rounded-full border border-gray-400 hover:bg-green-500 transition">
              <Youtube size={18} />
            </a>
            <a href="#" className="p-2 rounded-full border border-gray-400 hover:bg-green-500 transition">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-green-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-green-400">Contact Us</Link></li>
            <li><Link to="/services" className="hover:text-green-400">Our Services</Link></li>
            <li><Link to="/terms" className="hover:text-green-400">Terms & Condition</Link></li>
            <li><Link to="/support" className="hover:text-green-400">Support</Link></li>
          </ul>
        </div>

        {/* Project Gallery */}
        <div>
          <h3 className="text-white font-semibold mb-4">Project Gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            <img src="/images/solar1.jpg" alt="project" className="rounded-md" />
            <img src="/images/solar2.jpg" alt="project" className="rounded-md" />
            <img src="/images/solar3.jpg" alt="project" className="rounded-md" />
            <img src="/images/solar4.jpg" alt="project" className="rounded-md" />
            <img src="/images/solar5.jpg" alt="project" className="rounded-md" />
            <img src="/images/solar6.jpg" alt="project" className="rounded-md" />
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <p className="mb-4 text-sm">Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-l-md w-full text-gray-800 focus:outline-none"
            />
            <button className="bg-green-500 text-white px-4 rounded-r-md hover:bg-green-600 transition">
              SignUp
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© <span className="text-green-400">Your Site Name</span>, All Right Reserved.</p>
        <p>
          Designed By <a href="#" className="text-green-400">HTML Codex</a> | 
          Distributed By <a href="#" className="text-green-400">ThemeWagon</a>
        </p>
      </div>
      {/* CHAT BUTTON */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center text-lg font-semibold">
          <MessageCircle className="w-6 h-6 mr-2" />
          Chat With Us
        </button>
      </div>
    </footer>
  )
}
