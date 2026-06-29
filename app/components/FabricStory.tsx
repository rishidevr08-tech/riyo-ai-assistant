"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "./TranslationContext";

const fabrics = [
  {
    id: 0,
    number: "01",
    name: "Premium Cotton",
    tagline: "Long-Staple Organic Yarns",
    description: "Exceptional luxury starts with long-staple organic cotton fibers. Spun into premium 240GSM yarns, they deliver unparalleled softness, natural breathability, and a structured fit that holds its shape over time.",
    specs: "Weight: 180 - 260 GSM | Combed Ring-Spun | Zero Twist"
  },
  {
    id: 1,
    number: "02",
    name: "French Terry",
    tagline: "Heavyweight Loopback Structure",
    description: "Our signature diagonal loopback French Terry is engineered at 420GSM for the ultimate luxury weight. It provides robust structural integrity, superior drape, and a soft, dry hand-feel that defines modern luxury streetwear.",
    specs: "Weight: 380 - 460 GSM | 100% Cotton | Diagonal Knit Pattern"
  },
  {
    id: 2,
    number: "03",
    name: "Heavy GSM",
    tagline: "Engineered Silhouette Control",
    description: "Designed for premium streetwear and custom silhouettes, our heavyweight developments range from 300GSM up to an extreme 500GSM. Built to deliver the perfect boxy drape, structured shoulder drop, and lifetime wear.",
    specs: "Weight: 300 - 500 GSM | Custom Boxy Fits | Pre-Shrunk Yarns"
  },
  {
    id: 3,
    number: "04",
    name: "Custom Blends",
    tagline: "Bespoke Textile Engineering",
    description: "Collaborate with our mills to develop unique fabric compositions. From silky soft Tencel and Modal blends to sustainable organic hemp and recycled performance fibers, we engineer custom drape, texture, and behavior.",
    specs: "Compositions: Custom | Eco-Certified | Technical Finishes"
  }
];

export default function FabricStory() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { t } = useTranslation();
  const fabricsData = t("fabrics") || fabrics;

  return (
    <section id="fabrics" className="bg-[#F5F0E8] py-[80px] px-8 md:px-16 lg:px-24 flex flex-col items-center justify-center border-t border-neutral-200/50 overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.12 }}
        className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center"
      >
        {/* SECTION HEADER */}
        <div className="max-w-4xl text-center mb-8">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="tracking-[6px] text-xs text-neutral-500 uppercase mb-4"
          >
            {t("fabricStoryLabel")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light text-neutral-900 tracking-wide"
          >
            {t("fabricStoryTitle")}
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-[1px] bg-neutral-400 mx-auto mt-6"
          />
        </div>

        {/* EDITORIAL SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full">
          
          {/* LEFT COLUMN: LARGE STICKY MACRO PHOTOGRAPHY WITH DYNAMIC KEN BURNS & OVERLAYS */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <div className="sticky top-28">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                data-cursor="view"
                className="relative aspect-[4/3] md:aspect-[3/2] lg:aspect-[2/3] w-full group overflow-hidden border border-neutral-300/40 shadow-sm"
              >
                {/* Continuous dynamic Ken Burns animation loop */}
                <motion.div
                  animate={{
                    scale: [1, 1.06, 1.02, 1.07, 1],
                    x: [0, -8, 5, -4, 0],
                    y: [0, 4, -8, 2, 0]
                  }}
                  transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src="/fabric_macro.png"
                    alt="Luxury Fabric Macro Close-up"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Elegant dark radial and linear overlays for legibility */}
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-1000 group-hover:bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                
                {/* FROM FIBER TO FASHION - OVERSIZED TYPOGRAPHY OVERLAY */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 z-10">
                  <div className="flex flex-col">
                    <span className="text-white/40 text-[9px] tracking-[6px] uppercase font-mono">
                      {t("fabricStorySubtitle")}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-start">
                    <h3 className="text-white/95 font-extralight text-4xl md:text-5xl tracking-[8px] uppercase leading-tight text-left">
                      From
                      <br />
                      Fiber
                      <br />
                      To
                      <br />
                      Fashion
                    </h3>
                    <div className="h-[1px] bg-white/20 w-16 mt-6" />
                    <p className="text-[10px] text-white/50 tracking-[3px] uppercase mt-4 font-mono">
                      Fashion Berg Mill Group
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE ACCORDION LIST */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            {fabricsData.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveTab(idx)}
                  data-cursor="enter"
                  className="border-b border-neutral-300 pb-6 transition-all duration-500 cursor-pointer group animate-fadeIn"
                >
                  {/* Header row */}
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-baseline space-x-6">
                      <span className={`text-[11px] font-mono tracking-wider transition-colors duration-500 ${isActive ? "text-neutral-800" : "text-neutral-400 group-hover:text-neutral-600"}`}>
                        {item.number}
                      </span>
                      <h3 className={`text-2xl md:text-3xl font-light tracking-wide transition-all duration-500 ${isActive ? "text-neutral-900 translate-x-1" : "text-neutral-400 group-hover:text-neutral-600"}`}>
                        {item.name}
                      </h3>
                    </div>
                    <span className={`text-xs tracking-wider transition-colors duration-500 hidden md:block ${isActive ? "text-neutral-700" : "text-neutral-400"}`}>
                      {item.tagline}
                    </span>
                  </div>

                  {/* Collapsible Content */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? 16 : 0
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden pr-4"
                  >
                    <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                      {item.description}
                    </p>
                    
                    {/* Technical Spec Tag */}
                    <div className="mt-4 inline-block bg-neutral-200/50 border border-neutral-300/40 px-4 py-2 text-[10px] md:text-xs font-mono tracking-wider text-neutral-700 uppercase">
                      {item.specs}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </motion.div>

    </section>
  );
}
