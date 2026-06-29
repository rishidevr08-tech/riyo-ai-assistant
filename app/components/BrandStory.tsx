"use client";

import { motion } from "framer-motion";
import { useTranslation } from "./TranslationContext";

export default function BrandStory() {
  const { t } = useTranslation();

  return (
    <section id="heritage" className="bg-[#F5F0E8] flex flex-col items-center justify-start pt-[100px] pb-[60px] overflow-hidden">

      {/* TEXT & CREDIBILITY STATS WRAPPER - INTIMATE WIDTH */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-5xl text-center px-8 w-full flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="tracking-[0.4em] text-xs md:text-sm text-neutral-500 uppercase mb-2 font-light select-none block leading-relaxed"
        >
          {t("apparelForEveryGeneration")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="tracking-[0.3em] text-[9px] md:text-[10px] text-neutral-400 uppercase font-mono mb-6 select-none block"
        >
          {t("ageSegments")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-light text-neutral-900 tracking-wide mb-6 font-serif"
        >
          {t("craftingApparel")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed font-light"
        >
          {t("brandStoryDesc")}
        </motion.p>

        {/* LUXURY B2B CREDIBILITY STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-10 mb-2 w-full max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-3xl md:text-6xl font-extralight text-neutral-950 tracking-tight font-sans">40+</span>
            <span className="tracking-[3px] text-[8px] md:text-[10px] text-neutral-500 uppercase mt-2 font-mono">{t("years")}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center border-y md:border-y-0 md:border-x border-neutral-300/60 py-6 md:py-0 px-2 md:px-4"
          >
            <span className="text-3xl md:text-6xl font-extralight text-neutral-950 tracking-tight font-sans">500+</span>
            <span className="tracking-[3px] text-[8px] md:text-[10px] text-neutral-500 uppercase mt-2 font-mono">{t("clients")}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-3xl md:text-6xl font-extralight text-neutral-950 tracking-tight font-sans">10M+</span>
            <span className="tracking-[3px] text-[8px] md:text-[10px] text-neutral-500 uppercase mt-2 font-mono">{t("garments")}</span>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          data-cursor="enter"
          className="mt-8 border border-neutral-800 px-8 py-3.5 text-xs tracking-[3px] uppercase hover:bg-neutral-900 hover:text-white transition-all duration-500 text-neutral-900 font-medium"
        >
          {t("exploreCollections")}
        </motion.button>

        {/* EMOTIONAL luxury STATEMENT ABOVE THE IMAGE */}
        <div className="mt-16 mb-4 max-w-4xl text-center select-none">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-light text-neutral-900 tracking-[3px] leading-tight font-serif uppercase"
          >
            {t("fourDecadesCommitment")}
          </motion.h3>
        </div>
      </motion.div>

      {/* CAMPAIGN WIDESCREEN IMAGE WRAPPER - MAX-W-7XL EXPANDED */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-[1100px] px-8 w-full flex flex-col items-center mt-12 select-none"
      >
        <div className="w-full relative group overflow-hidden shadow-sm rounded-sm">
          <div className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] overflow-hidden">
            <motion.img
              src="/brand_story_campaign.png"
              alt="Fashion Berg Campaign"
              className="absolute inset-0 w-full h-full object-cover object-center"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Elegant dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent transition-opacity duration-1000 group-hover:opacity-95" />

            {/* ESTABLISHED 1981 (TOP LEFT) */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 select-none">
              <span className="text-white/40 tracking-[4px] text-[8px] md:text-[10px] uppercase font-mono">
                {t("establishedTitle")}
              </span>
            </div>

            {/* 40 YEARS OF CRAFTSMANSHIP (BOTTOM RIGHT) */}
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 select-none">
              <span className="text-white/45 tracking-[4px] text-[8px] md:text-[10px] uppercase font-mono">
                {t("craftsmanshipTitle")}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ELEGANT EST. 1981 SECTION DIVIDER */}
      <div className="max-w-5xl px-8 w-full flex flex-col items-center pt-16 select-none">
        <span className="tracking-[6px] text-[10px] text-neutral-500 uppercase font-mono mb-4">
          EST. 1981
        </span>
        <div className="flex items-center justify-center w-full max-w-md">
          <div className="h-[1px] bg-neutral-300 w-full" />
          <span className="mx-4 text-[10px] text-neutral-400 font-light select-none">◇</span>
          <div className="h-[1px] bg-neutral-300 w-full" />
        </div>
      </div>

    </section>
  );
}
