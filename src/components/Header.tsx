"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/src/assets/logo.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  const toggleMenu = () => setMobileMenuOpen((v) => !v);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      window.requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const delta = y - lastYRef.current;

        setAtTop(y < 8);
        const threshold = 6;

        if (!mobileMenuOpen) {
          if (y > 64 && delta > threshold) setHidden(true);
          else if (delta < -threshold) setHidden(false);
        } else {
          setHidden(false);
        }

        lastYRef.current = y;
        tickingRef.current = false;
      });
      tickingRef.current = true;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "service" },
    { label: "Projects", id: "project" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed z-50 inset-x-0 top-0 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`backdrop-blur-md transition-all duration-500 ${
          atTop ? "bg-white/60" : "bg-white/90 shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div
              onClick={() => scrollToSection("home")}
              className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
            >
              <img src={logo} alt="Logo" className="h-14 w-auto drop-shadow-md" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-10 items-center font-medium">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-[#0DB02B] transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center px-6 py-2 bg-[#0DB02B] text-white font-semibold rounded-full hover:bg-green-700 transition"
              >
                Get A Quote <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-[#0DB02B] focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Dark Blur Background */}
              <motion.div
                className="fixed inset-0 bg-black/30  backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Slide Menu */}
              <motion.div
                className="fixed top-0  right-0 w-[75%] h-full   bg-white/90 backdrop-blur-xl shadow-xl z-50 flex flex-col "
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 22 }}
              >
                <div className="flex bg-white/90 border-l-1 border-black/50 justify-between  items-center p-3 ">
                  <img src={logo} alt="Logo" className="h-12 w-auto" />
                  <X
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-7 h-7 text-gray-600 cursor-pointer hover:text-[#0DB02B]"
                  />
                </div>
            
                <div className="flex  shadow-2xl border-black/50 border-l-1 border-b-1  rounded-bl-2xl  flex-col space-y-6 py-5 px-4  bg-white/90 font-semibold text-lg">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-900 hover:text-[#0DB02B] text-left"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}

                  <motion.button
                    onClick={() => scrollToSection("contact")}
                    className="mt-0 py-3 bg-[#0DB02B] text-white rounded-full text-center hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Get A Quote <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
