"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "./TranslationContext";

const sectors = [
  {
    title: "Fashion Brands",
    scope: "Contemporary Designer Labels",
    description: "Couture-grade pattern mapping, sample corrections, and meticulous assembly lines tailored to modern runway specifications.",
    moq: "MOQ: 300 Pcs"
  },
  {
    title: "Streetwear Labels",
    scope: "Heavyweight Silhouette Runs",
    description: "Bespoke high-density loops (380–500 GSM), raw fleece washes, and pigment dye formats engineered for structural shapes.",
    moq: "MOQ: 300 Pcs"
  },
  {
    title: "Corporate Apparel",
    scope: "Premium Identity Programs",
    description: "Vertical spinning of mercerized piqué yarns, high-durability polo knits, and fine shirting stable under industrial laundering.",
    moq: "MOQ: 500 Pcs"
  },
  {
    title: "Startup Clothing",
    scope: "Bespoke guided launches",
    description: "Low initial thresholds combined with dedicated CAD consultations, white label libraries, and full mill-matching guides.",
    moq: "MOQ: 100 Pcs"
  },
  {
    title: "Private Label",
    scope: "Silhouettes Allocation",
    description: "Immediate allocation of our pre-engineered fitting blocks, customized with your woven brand tags and customized trim profiles.",
    moq: "MOQ: 200 Pcs"
  },
  {
    title: "Retail Chains",
    scope: "Scaled Enterprise Spinning",
    description: "High-volume automated circular knitting, periodic lab wash auditing, bonded customs hubs, and bulk logistics contracts.",
    moq: "MOQ: 1,000 Pcs"
  }
];

const moqAmounts = ["300 Pcs", "300 Pcs", "500 Pcs", "100 Pcs", "200 Pcs", "1,000 Pcs"];

export default function WhoWeManufactureFor() {
  const { t } = useTranslation();
  const sectorsData = t("sectors") || sectors;

  return (
    <section 
      id="partners" 
      className="bg-[#0B0B0B] text-white py-[80px] px-8 md:px-16 lg:px-24 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center select-none">
        
        {/* SECTION HEADER */}
        <div className="max-w-4xl text-center mb-16 w-full flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="tracking-[8px] text-[10px] md:text-xs text-white/40 uppercase mb-4"
          >
            {t("targetSectors")}
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-light tracking-wide text-white uppercase text-center max-w-3xl leading-snug font-serif"
          >
            {t("whoWeManufactureFor")}
          </motion.h2>
          
          <div className="w-12 h-[1px] bg-white/20 mt-6" />
        </div>

        {/* 2X3 GRID OF HIGH-HIERARCHY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20 w-full max-w-7xl">
          {sectorsData.map((sector, idx) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="flex flex-col border-l border-white/10 pl-8 py-4 relative group"
            >
              {/* Sector Meta Index */}
              <div className="flex justify-between items-baseline mb-4 select-none">
                <span className="text-[9px] font-mono tracking-[4px] text-white/30 uppercase">
                  {sector.scope}
                </span>
                <span className="text-white/10 group-hover:text-white/40 transition-colors duration-500 font-mono text-[10px]">
                  / 0{idx + 1}
                </span>
              </div>

              {/* Large Serif Title */}
              <h3 className="text-2xl md:text-3.5xl font-extralight tracking-wide text-white uppercase group-hover:text-white/90 transition-colors duration-500 font-serif leading-none mb-6">
                {sector.title}
              </h3>
              
              {/* Extremely Reduced Body Text */}
              <p className="text-xs md:text-sm text-white/50 font-light leading-relaxed mb-8 group-hover:text-white/70 transition-colors duration-500 max-w-sm">
                {sector.description}
              </p>
              
              {/* MoQ Tag and RFQ Inquiry */}
              <div className="mt-auto pt-4 flex justify-between items-center text-[10px] font-mono text-white/30 uppercase tracking-widest border-t border-white/5">
                <span>{t("moq")}: {moqAmounts[idx]}</span>
                <Link 
                  href={`/contact?sector=${sector.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-white/20 group-hover:text-white hover:underline transition-all duration-300"
                >
                  {t("inquireLink")}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
