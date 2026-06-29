"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useInquiry } from "./InquiryContext";

const products = [
  { 
    id: "oversized-tees", 
    name: "Oversized Tees", 
    src: "/product_tees.png", 
    number: "01", 
    sub: "Premium Heavyweight Cotton",
    details: ["Heavy Jersey Knit Structure", "240–300 GSM Custom Fit", "Available for Private Label Production"],
    fabrics: ["100% Organic Ring-Spun Cotton", "Premium Heavyweight Cotton Jersey", "Supima Cotton Blend"],
    gsms: ["240 GSM", "280 GSM", "300 GSM"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Off-White", hex: "#F3EFE9" },
      { name: "Jet Black", hex: "#1A1A1A" },
      { name: "Vintage Brown", hex: "#4A3E3D" },
      { name: "Sage Green", hex: "#7E8F7C" }
    ]
  },
  { 
    id: "hoodies", 
    name: "Hoodies", 
    src: "/product_hoodies.png", 
    number: "02", 
    sub: "French Terry Essentials",
    details: ["Diagonal Knit French Terry", "400–460 GSM Heavy Weight", "Bespoke Branding & Private Label Ready"],
    fabrics: ["100% French Terry Cotton", "Diagonal Knit Loopback Cotton", "Organic Terry Blend"],
    gsms: ["400 GSM", "420 GSM", "460 GSM"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Charcoal Gray", hex: "#3A3A3A" },
      { name: "Jet Black", hex: "#1A1A1A" },
      { name: "Sand", hex: "#E3DAC9" },
      { name: "Midnight Blue", hex: "#1E2A38" }
    ]
  },
  { 
    id: "polos", 
    name: "Polos", 
    src: "/product_polos.png", 
    number: "03", 
    sub: "Refined Everyday Wear",
    details: ["Premium Piqué Cotton Weave", "220–280 GSM Mercerized Yarn", "Custom Collar & Placket Development"],
    fabrics: ["Premium Piqué Cotton", "Mercerized Cotton Yarn", "Cotton-Silk Blend"],
    gsms: ["220 GSM", "240 GSM", "280 GSM"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Navy Blue", hex: "#1D2A44" },
      { name: "Burgundy", hex: "#5C1329" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Sage Green", hex: "#7E8F7C" }
    ]
  },
  { 
    id: "sweatshirts", 
    name: "Sweatshirts", 
    src: "/product_sweats.png", 
    number: "04", 
    sub: "Heavyweight Comfort",
    details: ["Diagonal Fleece Loopback", "360–420 GSM Boxy Silhouette", "Full Dyeing & Mill Blending Support"],
    fabrics: ["Diagonal Fleece Loopback", "Super-Soft Brushed Fleece", "Organic Fleece Cotton"],
    gsms: ["360 GSM", "380 GSM", "420 GSM"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Heather Gray", hex: "#B2B2B2" },
      { name: "Jet Black", hex: "#1A1A1A" },
      { name: "Olive Green", hex: "#4B5320" },
      { name: "Warm Taupe", hex: "#B38B6D" }
    ]
  },
  { 
    id: "custom", 
    name: "Custom Apparel", 
    src: "/product_custom.png", 
    number: "05", 
    sub: "Built For Your Brand",
    details: ["End-to-End Bespoke Development", "Tech Pack & Custom Pattern Drafting", "Full Volume OEM Mill Programs"],
    fabrics: ["Bespoke Yarn Sourcing", "Recycled Blends", "Technical Fabrics"],
    gsms: ["Custom Range (120-600 GSM)"],
    sizes: ["Custom Size Chart (XS-5XL)"],
    colors: [
      { name: "Any Custom Color (PANTONE)", hex: "#CCCCCC" }
    ]
  }
];

export default function ProductUniverse() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { openPanel } = useInquiry();

  return (
    <section 
      id="collections" 
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center items-start select-none"
    >
      
      {/* BACKGROUND IMAGE STACK - FULLSCREEN CROSSFADE WITH ELEGANT 600ms SLOW ZOOM */}
      <div className="absolute inset-0 w-full h-full z-0">
        {products.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: activeIndex === idx ? 1 : 0,
              scale: activeIndex === idx ? 1.00 : 1.03
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={item.src} 
              alt={item.name} 
              className="w-full h-full object-cover object-center"
            />
            {/* Ultra-luxe dark cinematic overlays */}
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* HEADER OVERLAY */}
      <div className="absolute top-12 left-0 right-0 z-20 flex flex-col items-center px-6">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-white/40 tracking-[10px] text-[10px] md:text-xs uppercase text-center font-light"
        >
          Product Universe
        </motion.p>
        <div className="w-12 h-[1px] bg-white/20 mt-4" />
      </div>

      {/* LEFT-SIDE DYNAMIC INTERACTIVE MENU */}
      <div className="relative z-20 w-full max-w-7xl px-8 md:px-16 lg:px-24 flex flex-col items-start justify-center">
        <div className="flex flex-col space-y-6 md:space-y-9">
          {products.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => openPanel(item, "sample")}
                className="group cursor-pointer flex flex-col items-start relative py-2"
              >
                {/* Horizontal Alignment Row */}
                <div className="flex items-center">
                  {/* Minimalist Index Indicator */}
                  <span className={`text-[10px] md:text-xs tracking-[4px] font-mono mr-6 text-white transition-opacity duration-500 ${isActive ? "opacity-90" : "opacity-25"}`}>
                    {item.number}
                  </span>
                  
                  {/* Category Text - slides up slightly when active */}
                  <span 
                    className={`tracking-[4px] md:tracking-[8px] uppercase transition-all duration-500 ease-[0.16,1,0.3,1] block leading-none ${
                      isActive 
                        ? "text-3xl md:text-7xl lg:text-[80px] xl:text-[96px] font-extralight text-white -translate-y-2" 
                        : "text-lg md:text-2xl font-extralight text-white/30 hover:text-white/50"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>

                {/* Subtext Metadata Animation - Fades in dynamically with B2B specifications */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: isActive ? "auto" : 0, 
                    opacity: isActive ? 0.95 : 0,
                    marginTop: isActive ? 12 : 0
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden pl-10 md:pl-12 flex flex-col space-y-1.5 border-l border-white/10"
                >
                  <span className="text-[10px] md:text-xs font-semibold text-white/80 tracking-[3px] uppercase font-mono block">
                    {item.sub}
                  </span>
                  {item.details.map((detail, dIdx) => (
                    <span 
                      key={dIdx}
                      className="text-[9px] md:text-[10px] font-extralight text-white/40 tracking-[2px] uppercase font-mono block"
                    >
                      {detail}
                    </span>
                  ))}
                  <div className="pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openPanel(item, "sample");
                      }}
                      className="inline-block text-[9px] font-mono tracking-[3px] text-white/60 hover:text-white underline uppercase transition-colors duration-300 cursor-pointer"
                    >
                      Request Spec Sample →
                    </button>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TALL LITERARY FADED BACKGROUND INDEX NUMBER */}
      <div className="absolute right-12 md:right-24 bottom-12 md:bottom-20 z-10 pointer-events-none select-none overflow-hidden hidden md:block">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 0.05, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[180px] md:text-[250px] lg:text-[340px] font-extralight font-mono text-white leading-none block select-none"
          >
            {products[activeIndex].number}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* BOTTOM FOOTER TRANSITION */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center">
        <motion.p
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/40 tracking-[6px] text-[9px] md:text-[10px] uppercase font-light cursor-default"
        >
          SCROLL TO EXPLORE THE FABRIC STORY ↓
        </motion.p>
      </div>

    </section>
  );
}
