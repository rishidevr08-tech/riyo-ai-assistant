"use client";

import { motion } from "framer-motion";
import { useTranslation } from "./TranslationContext";

const globalMills = [
  {
    location: "Chennai",
    specialty: "Yarn Spinning & Heavy Circular Knitting",
    description: "Our primary agricultural cotton spinning and heavy loopback knitting hub. Calibrated to construct robust, high-weight organic jersey and structured French terrys from the raw crop level.",
    metrics: [
      "Mill Output: 15,000 Kg Daily Spun Yarns",
      "Fiber Certifications: GOTS Organic Standard",
      "Yarn Weight Range: 180 GSM – 500 GSM custom"
    ]
  },
  {
    location: "Tirupur",
    specialty: "Fine Mercerizing & Custom Plackets Studio",
    description: "Sophisticated boutique mills centered in tirupur. Calibrated for double-mercerized fine yarn lusters, technical collar rib engineering, and high-fashion placket stitching profiles.",
    metrics: [
      "Assembly Tolerance: Precision ±1mm Seam Limits",
      "Trim Sourcing: Genuine Mother-of-Pearl & Corozo",
      "Finishing lines: Soft Enzyme & Carbon Brushed"
    ]
  },
  {
    location: "Coimbatore",
    specialty: "Sustainable Dye Laboratories & Wash Labs",
    description: "High-end wash and reactive dyeing facilities centered in kalapatti. Implementing eco-certified pigment dyes, zero-waste chemistry, and closed-loop water treatment programs.",
    metrics: [
      "Chemical Standard: Oeko-Tex 100 Non-toxic",
      "Mill Recycle SLA: 75%+ Post-Process Water",
      "Wash Formats: Garment-Dye, Vintage Acid, Soft Wash"
    ]
  },
  {
    location: "Theni",
    specialty: "Technical Active & Volume Assembly Lines",
    description: "Enterprise-grade automated manufacturing lines optimized for high-performance stretch stitchings, technical synthetics blends, bonded functional seams, and expedited container gates.",
    metrics: [
      "Sewing Lines: 25,000 Finished Pieces Daily Limit",
      "Equipment: Automatic Multi-needle Flatlocks",
      "Logistics: Bonded Customs Warehousing storage"
    ]
  }
];

export default function ClientTrust() {
  const { t } = useTranslation();
  const globalMillsData = t("globalMills") || globalMills;

  return (
    <section className="bg-[#F5F0E8] py-[80px] px-8 md:px-16 lg:px-24 flex flex-col items-center justify-center border-t border-neutral-200/50 overflow-hidden">
      
      {/* Staggered viewport reveal wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.12 }}
        className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center animate-fadeIn"
      >
        {/* SECTION HEADER */}
        <div className="max-w-4xl text-center mb-16 w-full flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="tracking-[6px] text-[10px] md:text-xs text-neutral-500 uppercase mb-4"
          >
            {t("globalMillFootprint")}
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-light tracking-wide text-neutral-900 uppercase text-center max-w-3xl leading-snug font-serif"
          >
            {t("globalManufacturingNetwork")}
          </motion.h2>
          
          <div className="w-12 h-[1px] bg-neutral-400 mt-6" />
        </div>

        {/* LUXURY EDITORIAL 4-CARD NETWORK GRID - ONE LOCATION PER CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 w-full max-w-6xl">
          {globalMillsData.map((mill, idx) => (
            <motion.div
              key={mill.location}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col border-l border-neutral-300 pl-8 py-4 relative group select-none"
            >
              {/* Header row */}
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-[9px] font-mono tracking-[4px] text-neutral-450 uppercase">
                  {mill.specialty}
                </span>
                <span className="text-neutral-300 group-hover:text-neutral-500 transition-colors duration-500 font-mono text-[10px]">
                  / 0{idx + 1}
                </span>
              </div>

              {/* Large Serif Title */}
              <h3 className="text-3xl md:text-4.5xl font-extralight tracking-wide text-neutral-800 uppercase group-hover:text-neutral-950 transition-colors duration-500 font-serif leading-none mb-6">
                {mill.location}
              </h3>
              
              {/* Technical Description */}
              <p className="text-xs md:text-sm text-neutral-600 font-light leading-relaxed mb-8 group-hover:text-neutral-800 transition-colors duration-500">
                {mill.description}
              </p>
              
              {/* Direct Metrics Block */}
              <div className="mt-auto border-t border-neutral-300/60 pt-5 flex flex-col space-y-2">
                {mill.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="flex justify-between text-[9px] md:text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    <span>{metric.split(":")[0]}</span>
                    <span className="font-semibold text-neutral-700">{metric.split(":")[1]}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
