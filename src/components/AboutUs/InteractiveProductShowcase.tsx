"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  details: string;
  subtitle: string;
  image: string;
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
      "https://cdn11.bigcommerce.com/s-unnwlv5df8/product_images/uploaded_images/inverter-price.jpg",
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
    image:
      "https://greenhomesystems.com/wp-content/uploads/2023/09/blog-cover-photo-98.jpg",
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
      "https://i0.wp.com/solarquarter.com/wp-content/uploads/2022/10/17-2.png?fit=1200%2C675&ssl=1",
  },
  {
    id: "Commercial & Product Supply",
    title: "Commercial & Product Supply",
    description:
      "Export-quality solar products meeting international standards and certifications.",
    details:
      "Our export-grade products are designed to meet stringent international quality standards and certifications.",
    subtitle: "",
    image:
      "https://waaree.com/wp-content/uploads/2025/07/Solar-panels-online-scaled.jpg",
  },
];

export default function InteractiveProductShowcase(): React.ReactElement {
  const [activeProduct, setActiveProduct] = useState<Product>(allProducts[0]);
  const [currentBg, setCurrentBg] = useState<string>(allProducts[0].image);
  const [nextBg, setNextBg] = useState<string | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);

  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Auto-scroll vertical buttons
  useEffect(() => {
    const container = buttonContainerRef.current;
    if (!container) return;
    let scrollDirection = 1;
    const speed = 0.5;
    let raf = 0;
    const scroll = () => {
      container.scrollTop += scrollDirection * speed;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight)
        scrollDirection = -1;
      if (container.scrollTop <= 0) scrollDirection = 1;
      raf = requestAnimationFrame(scroll);
    };
    scroll();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Auto-change background every 3s
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      const currentIndex = allProducts.findIndex((p) => p.id === activeProduct.id);
      const nextIndex = (currentIndex + 1) % allProducts.length;
      const nextProduct = allProducts[nextIndex];

      setNextBg(nextProduct.image);
      setIsSwitching(true);
      setActiveProduct(nextProduct);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setCurrentBg(nextProduct.image);
        setNextBg(null);
        setIsSwitching(false);
      }, 720) as any;
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeProduct]);

  const handleProductChange = (product: Product) => {
    if (product.id === activeProduct.id) return;
    setNextBg(product.image);
    setIsSwitching(true);
    setActiveProduct(product);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setCurrentBg(product.image);
      setNextBg(null);
      setIsSwitching(false);
    }, 720) as any;
  };

  return (
    /* SECTION holds the fixed background; content scrolls over it */
    <section
      className="relative h-[26rem] overflow-hidden text-white
                 bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${currentBg})` }}
    >
      {/* cross-fade overlay using another fixed background */}
      {nextBg && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out
                      bg-fixed bg-cover bg-center ${isSwitching ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url(${nextBg})` }}
        />
      )}
      {/* dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/75" />

      {/* LEFT BUTTONS (scroll inside box only) */}
      <div
        ref={buttonContainerRef}
        className="absolute top-1/2 left-6 z-30 hidden h-96 -translate-y-1/3 flex-col gap-4 overflow-y-auto md:flex
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {allProducts.map((p) => (
          <button
            key={p.id}
            onClick={() => handleProductChange(p)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap
              ${
                activeProduct.id === p.id
                  ? "bg-[#0DB02B] text-white shadow-lg scale-105"
                  : "bg-black/80 text-white/90 hover:bg-black/70"
              }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-20 md:ms-60 flex h-full items-center px-6 md:px-12">
        <div className="max-w-2xl">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            {activeProduct.title}
          </h2>
          <p className="mb-6 text-lg leading-relaxed md:text-xl">
            {activeProduct.description}
          </p>
          <p className="mb-8 text-sm leading-relaxed md:text-base">
            {activeProduct.details}
          </p>
          <div className="flex items-center gap-4">
            <button className="rounded-md border border-white/30 bg-black/60 px-6 py-3 text-[13px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70 md:text-lg">
              Explore More
            </button>
            <button className="flex items-center rounded-md border border-white/30 bg-transparent px-6 py-3 text-[13px] font-semibold text-white/90 transition-all duration-300 hover:bg-white/5 md:text-lg">
              <MessageCircle className="mr-2 h-5 w-5" />
              Enquire
            </button>
          </div>
        </div>

        {/* Floating Subtitle (optional) */}
        {activeProduct.subtitle && (
          <div className="absolute right-28 top-1/2 hidden -translate-y-1/2 md:block">
            <h3 className="text-2xl font-semibold">{activeProduct.subtitle}</h3>
          </div>
        )}
      </div>
    </section>
  );
}
