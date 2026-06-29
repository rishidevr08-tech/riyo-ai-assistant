"use client";

import { motion } from "framer-motion";
import { useTranslation } from "./TranslationContext";

export default function GlobalReachStatement() {
  const { t } = useTranslation();

  return (
    <section 
      id="reach" 
      className="bg-[#F5F0E8] py-[80px] px-8 md:px-16 lg:px-24 flex flex-col items-center justify-center border-t border-neutral-200/50 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.15 }}
        className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center select-none"
      >
        
        {/* UPPERCASE SUBTLE HEADER */}
        <span className="text-[10px] font-mono tracking-[8px] text-neutral-400 uppercase block mb-10">
          {t("globalAuthority")}
        </span>

        {/* CLIMACTIC TYPOGRAPHIC STATEMENT - COMMANDING THE VIEWPORT */}
        <h2 className="text-4xl md:text-7xl lg:text-[90px] font-extralight tracking-[4px] md:tracking-[8px] uppercase text-neutral-900 leading-[1.1] font-serif max-w-6xl mb-10 select-none">
          {t("fortyYearsApparelCraftsmanship")}
        </h2>

        {/* HUGE MINIMAL B2B STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 w-full max-w-5xl border-y border-neutral-300/40 py-10 mb-14">
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl lg:text-8xl font-extralight text-neutral-950 tracking-tight font-sans">
              10M+
            </span>
            <span className="tracking-[4px] text-[10px] md:text-xs text-neutral-500 uppercase mt-4 font-mono font-medium">
              {t("garments")}
            </span>
          </div>

          <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-neutral-300/50 py-12 md:py-0 px-4">
            <span className="text-5xl md:text-7xl lg:text-8xl font-extralight text-neutral-950 tracking-tight font-sans">
              500+
            </span>
            <span className="tracking-[4px] text-[10px] md:text-xs text-neutral-500 uppercase mt-4 font-mono font-medium">
              {t("clients")}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl lg:text-8xl font-extralight text-neutral-950 tracking-tight font-sans">
              15+
            </span>
            <span className="tracking-[4px] text-[10px] md:text-xs text-neutral-500 uppercase mt-4 font-mono font-medium">
              {t("countriesServed")}
            </span>
          </div>
        </div>

        {/* CLOSING CORE SIGNATURE */}
        <div className="max-w-3xl flex flex-col items-center">
          <p className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[3px] leading-relaxed text-neutral-950 font-serif italic">
            {t("builtInIndiaWornWorldwide")}
          </p>
          <div className="w-16 h-[1px] bg-neutral-400 mt-10" />
        </div>

      </motion.div>
    </section>
  );
}
