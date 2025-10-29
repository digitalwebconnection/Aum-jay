
import React from "react";
import { Home, Building2, Factory, Wrench, ClipboardCheck, Bolt } from "lucide-react";

const ServicesHero: React.FC = () => {
  const services = [
    { label: "Residential", icon: Home },
    { label: "Commercial", icon: Building2 },
    { label: "Industrial", icon: Factory },
    { label: "O&M / AMC", icon: Wrench },
    { label: "Net Metering", icon: ClipboardCheck },
    { label: "Energy Audit", icon: Bolt },
  ];

  return (
    <section className="relative py-15 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://waaree.com/wp-content/uploads/2025/07/Solar-panels-online-scaled.jpg"
          alt="Solar panels installation"
          className="h-full w-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl text-center px-4 text-white">
        <p className="uppercase tracking-widest text-sm font-semibold text-orange-400 mb-2">
          Our Services
        </p>

        <h1 className="text-4xl sm:text-5xl max-w-5xl mx-auto font-extrabold leading-tight">
         <span className=" text-[#0DB02B]"> Powering Homes, Businesses & Industries </span>  with Solar Excellence
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-200">
          Aumjay Solar delivers end-to-end solar EPC solutions — from design to installation and maintenance.
          <br /> Trusted by homeowners, commercial spaces, and industries across India.
        </p>

        {/* Service Chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {services.map((s, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm backdrop-blur-sm hover:bg-[#0DB02B]/20 transition"
            >
              <s.icon className="h-4 w-4 text-[#0DB02B]" />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
