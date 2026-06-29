"use client";

import { motion, Variants } from "framer-motion";
import { useTranslation } from "./TranslationContext";

const capabilities = [
  { id: 1, name: "Precision Cutting", desc: "Computer-aided precision laser cutting and grading for absolute pattern accuracy and minimal material waste." },
  { id: 2, name: "Premium Printing", desc: "High-fidelity screen printing, digital direct-to-garment, discharge, and luxurious high-density puff print techniques." },
  { id: 3, name: "Embroidery Studio", desc: "High-density Japanese Tajima embroidery machinery for detailed, tight-stitch, and premium brand detailing." },
  { id: 4, name: "Garment Washing", desc: "Custom industrial garment washes, softening enzyme treatments, pigment dyeing, and vintage distressed processing." },
  { id: 5, name: "Retail Packing", desc: "Carefully steamed, folded, retail-flat-packed, and custom-brand-tagged, arriving boutique-ready at your distribution hubs." },
  { id: 6, name: "Global Export", desc: "Direct container logistics and customs clearing handling worldwide distribution to all major retail hubs." }
];

export default function Manufacturing() {
  const { t } = useTranslation();
  const capabilitiesData = t("capabilities") || capabilities;

  const stats = [
    { number: "100,000+", label: t("monthGarments") },
    { number: "250+", label: t("skilledWorkers") },
    { number: "40+", label: t("yearsExperience") },
    { number: "15+", label: t("countriesServed") }
  ];

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="manufacturing" className="bg-[#0B0B0B] text-white py-[80px] px-8 md:px-16 lg:px-24 flex flex-col items-center overflow-hidden">
      
      {/* SECTION LABEL */}
      <div className="max-w-4xl text-center mb-24 w-full flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="tracking-[8px] text-[10px] md:text-xs text-white/40 uppercase mb-4"
        >
          {t("factoryEngine")}
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-extralight tracking-[6px] md:tracking-[12px] uppercase mt-2 text-white"
        >
          {t("builtToScale")}
        </motion.h2>
        
        <div className="w-16 h-[1px] bg-white/20 mt-6" />
      </div>

      {/* STAGGERED CAPABILITIES GRID - TECHNICAL SCHEMATIC BLUES */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 w-full max-w-7xl border-b border-white/10 pb-14 mb-14"
      >
        {capabilitiesData.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ 
              y: -4, 
              borderColor: "rgba(255, 255, 255, 0.25)",
              backgroundColor: "rgba(23, 23, 23, 0.45)"
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col p-8 bg-neutral-950/45 border border-white/10 transition-all duration-500 rounded-sm relative group overflow-hidden cursor-pointer"
          >
            {/* Giant Faint Technical Number Stamp */}
            <div className="absolute right-4 bottom-[-10px] text-[120px] font-mono font-bold select-none pointer-events-none text-white/[0.02] tracking-tighter transition-all duration-1000 group-hover:text-white/[0.04] group-hover:scale-105 group-hover:translate-x-2">
              0{item.id}
            </div>

            {/* Minimal Index indicator */}
            <span className="text-[9px] font-mono tracking-[4px] text-white/30 mb-6 group-hover:text-white/60 transition-colors duration-500 uppercase">
              Capability 0{item.id}
            </span>

            {/* Prefixed Blueprint Title */}
            <h3 className="text-lg font-light tracking-[2px] mb-3 text-white uppercase group-hover:translate-x-1 transition-transform duration-500 font-mono">
              0{item.id} / {item.name}
            </h3>

            <p className="text-white/45 text-sm leading-relaxed font-light z-10 group-hover:text-white/60 transition-colors duration-500">
              {item.desc}
            </p>

            {/* Technical corner indicators for blueprint aesthetic */}
            <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-white/30 transition-colors duration-500" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/10 group-hover:border-white/30 transition-colors duration-500" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/10 group-hover:border-white/30 transition-colors duration-500" />
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/10 group-hover:border-white/30 transition-colors duration-500" />

            {/* Technical bottom expanding status line */}
            <div className="absolute bottom-0 left-0 right-full h-[1px] bg-white/20 transition-all duration-1000 group-hover:right-0" />
          </motion.div>
        ))}
      </motion.div>

      {/* FACTORY NUMBERS STATS - OVERSIZED TYPOGRAPHY GRID */}
      <div className="w-full max-w-7xl flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-white/40 tracking-[6px] text-[9px] md:text-[10px] uppercase font-mono mb-8 text-center"
        >
          {t("productionScaleInFigures")}
        </motion.p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 w-full">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-6 border-l border-white/10 text-center"
            >
              <span className="text-5xl md:text-7xl font-extralight text-white tracking-tighter">
                {stat.number}
              </span>
              <span className="tracking-[3px] text-[8px] md:text-[10px] text-white/40 uppercase mt-4 font-mono">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
