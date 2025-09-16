import React, { useEffect, useRef, useState } from "react"
import { MessageCircle } from "lucide-react"

interface Product {
  id: string
  title: string
  description: string
  details: string
  subtitle: string
  image: string
}

const allProducts: Product[] = [
  {
    id: "inverter",
    title: "Inverter",
    description:
      "Waaree has developed a range of single and three-phase inverters with a focus on quality, reliability, and efficiency.",
    details:
      "The solar inverter helps convert the direct current (DC) from the solar panels into alternating current (AC), which is used by domestic and commercial appliances.",
    subtitle: "",
    image:
      "https://www.electrobeamsolar.com/assets/front/images/solar.webp",
  },
  {
    id: "panels",
    title: "Solar Panels",
    description:
      "High-efficiency monocrystalline and polycrystalline solar panels designed for maximum energy generation and durability.",
    details:
      "Our solar panels are manufactured using cutting-edge technology to ensure optimal performance in various weather conditions.",
    subtitle: "",
    image:
      "https://www.nextenergy.my/wp-content/uploads/2021/06/home-solar-system-malaysia.jpg",
  },
  {
    id: "battery",
    title: "Battery Storage",
    description:
      "Advanced lithium-ion battery systems for reliable energy storage and backup power solutions.",
    details:
      "Our battery storage systems provide seamless backup power during outages and help maximize solar energy utilization.",
    subtitle: "",
    image:
      "https://www.sunnova.com/-/media/Marketing-Components/Blog/sunnova-dealer/Hero.png",
  },
  {
    id: "pv-module",
    title: "PV Module",
    description:
      "High-performance photovoltaic modules with advanced cell technology for maximum energy conversion.",
    details:
      "Our PV modules feature cutting-edge PERC technology and anti-reflective glass coating for superior performance in all weather conditions.",
    subtitle: "",
    image: "https://greenhomesystems.com/wp-content/uploads/2023/09/blog-cover-photo-98.jpg",
  },
  {
    id: "waaree-prime",
    title: "Waaree Prime",
    description:
      "Premium solar solutions with industry-leading efficiency ratings and extended warranty coverage.",
    details:
      "Waaree Prime represents our flagship product line with the highest efficiency ratings and premium build quality.",
    subtitle: "",
    image:
      "https://waareeimages.s3.ap-south-1.amazonaws.com/A_solar_pumpinstalled_by_Waaree_Energies_in_operation_a759a9f5e1.webp",
  },
  {
    id: "micaee-export",
    title: "Micaee Export",
    description:
      "Export-quality solar products meeting international standards and certifications.",
    details:
      "Our export-grade products are designed to meet stringent international quality standards and certifications.",
    subtitle: "",
    image: "https://waaree.com/wp-content/uploads/2025/07/Solar-panels-online-scaled.jpg",
  },
]

export default function InteractiveProductShowcase(): React.ReactElement {
  const [activeProduct, setActiveProduct] = useState<Product>(allProducts[0])
  const [currentBg, setCurrentBg] = useState<string>(allProducts[0].image)
  const [nextBg, setNextBg] = useState<string | null>(null)
  const [isSwitching, setIsSwitching] = useState(false)

  const buttonContainerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Auto-scroll vertical buttons
  useEffect(() => {
    const container = buttonContainerRef.current
    if (!container) return

    let scrollDirection = 1
    const speed = 0.5

    const scroll = () => {
      if (!container) return
      container.scrollTop += scrollDirection * speed
      if (container.scrollTop + container.clientHeight >= container.scrollHeight)
        scrollDirection = -1
      if (container.scrollTop <= 0) scrollDirection = 1
      requestAnimationFrame(scroll)
    }

    scroll()
  }, [])

  // Auto-change background every 3s
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      const currentIndex = allProducts.findIndex((p) => p.id === activeProduct.id)
      const nextIndex = (currentIndex + 1) % allProducts.length
      const nextProduct = allProducts[nextIndex]

      setNextBg(nextProduct.image)
      setIsSwitching(true)
      setActiveProduct(nextProduct)

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => {
        setCurrentBg(nextProduct.image)
        setNextBg(null)
        setIsSwitching(false)
      }, 720) as any
    }, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [activeProduct])

  const handleProductChange = (product: Product) => {
    if (product.id === activeProduct.id) return
    setNextBg(product.image)
    setIsSwitching(true)
    setActiveProduct(product)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      setCurrentBg(product.image)
      setNextBg(null)
      setIsSwitching(false)
    }, 720) as any
  }

  return (
    <section className="relative h-[32rem] overflow-hidden text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-in-out ${
            isSwitching ? "scale-105 opacity-90" : "scale-100 opacity-100"
          }`}
          style={{ backgroundImage: `url(${currentBg})` }}
        />
        {nextBg && (
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
              isSwitching ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${nextBg})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* LEFT BUTTONS */}
      <div
        ref={buttonContainerRef}
        className="absolute top-1/2 -translate-y-1/3 left-6 z-30 flex flex-col gap-4 overflow-hidden h-96"
      >
        {allProducts.map((p) => (
          <button
            key={p.id}
            onClick={() => handleProductChange(p)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 whitespace-nowrap
              ${
                activeProduct.id === p.id
                  ? "bg-green-500 text-white shadow-lg scale-105"
                  : "bg-black/40 text-white/90 hover:bg-black/70"
              }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-20 flex items-center h-full px-6 md:px-50">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {activeProduct.title}
          </h2>
          <p className="text-lg md:text-xl mb-6 leading-relaxed">
            {activeProduct.description}
          </p>
          <p className="text-sm md:text-base mb-8 leading-relaxed">
            {activeProduct.details}
          </p>

          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-black/60 backdrop-blur-sm text-white border border-white/30 hover:bg-black/70 transition-all duration-300 rounded-md text-lg font-semibold">
              Explore More
            </button>
            <button className="px-6 py-3 bg-transparent border border-white/30 text-white/90 hover:bg-white/5 transition-all duration-300 rounded-md text-lg font-semibold flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Enquire
            </button>
          </div>
        </div>

        {/* Floating Subtitle */}
        <div className="absolute right-28 top-1/2 transform -translate-y-1/2 hidden md:block">
          <h3 className="text-2xl font-semibold">{activeProduct.subtitle}</h3>
        </div>
      </div>

      
    </section>
  )
}
