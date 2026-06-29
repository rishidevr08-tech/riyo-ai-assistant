"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "./TranslationContext";

export default function FinalCTA() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="bg-black text-white pt-[180px] pb-[180px] px-8 md:px-16 lg:px-24 flex flex-col items-center overflow-hidden">
      
      {/* Viewport reveal animation container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.15 }}
        className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center"
      >
        {/* MAIN CTA CALLOUT */}
        <div className="max-w-4xl text-center flex flex-col items-center border-b border-white/10 pb-32 w-full">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="tracking-[8px] text-[10px] md:text-xs text-white/40 uppercase mb-6"
          >
            {t("directProcurementInquiries")}
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-light tracking-wide text-white leading-tight font-serif uppercase max-w-3xl"
          >
            {t("letsBuildCollection")}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-8"
          >
            {t("partnerBrandStoryDesc")}
          </motion.p>
          
          {/* BUTTON ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="block text-center bg-white text-black px-10 py-4 tracking-[3px] text-xs font-semibold uppercase hover:bg-neutral-200 transition-all duration-500 rounded-sm"
              >
                {t("requestCustomQuote")}
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/collections"
                className="block text-center border border-white/30 text-white px-10 py-4 tracking-[3px] text-xs uppercase hover:border-white hover:bg-white/5 transition-all duration-500 rounded-sm"
              >
                {t("exploreSourcingSpecs")}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* EDITORIAL LUXURY FOOTER - PURE WHITE SPACE ELEGANCE */}
        <div className="w-full mt-28 pt-16 flex flex-col justify-start text-white select-none">
          
          {/* ROW 1: BRAND LOGO & TAGLINE */}
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
            <div>
              <h4 className="text-3xl md:text-4xl font-extralight tracking-[8px] uppercase text-white leading-none">
                FASHION BERG
              </h4>
              <p className="text-[10px] md:text-xs text-white/40 tracking-[3px] uppercase mt-3 font-mono">
                {t("craftingApparel")}
              </p>
            </div>
            
            <div className="text-right md:text-right self-start md:self-auto font-mono text-[9px] md:text-[10px] tracking-[4px] text-white/50 uppercase">
              {t("footerLocations")}
            </div>
          </div>

          {/* ROW 2: LARGE EMAIL LINK & LINKS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-20">
            
            {/* HUGE EMAIL LINK */}
            <div className="lg:col-span-8 flex flex-col items-start justify-start">
              <span className="text-[9px] font-mono tracking-[4px] uppercase text-neutral-500 mb-4">
                {t("directProcurementInquiries")}
              </span>
              <a 
                href="mailto:hello@fashionberg.in"
                className="text-2xl md:text-5xl font-extralight tracking-wider text-white hover:text-white/70 transition-all duration-500 font-serif lowercase block border-b border-white/10 pb-4 w-full"
              >
                contact@fashionberg.in
              </a>
              <span className="text-[9px] font-mono tracking-[3px] text-neutral-500 uppercase mt-4 select-none">
                DUNS: 34-890-1284 <span className="mx-2 text-neutral-500">|</span> <a href="tel:+918870327777" className="text-neutral-400 hover:text-white transition-colors select-text">+91 8870327777</a>
              </span>
            </div>

            {/* QUICK LINKS */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8 text-[11px] font-mono tracking-wider text-white/40">
              <div className="flex flex-col space-y-3">
                <span className="text-white/75 text-[9px] tracking-[3px] uppercase select-none mb-1">Navigation</span>
                <Link href="/?section=heritage" className="hover:text-white transition-colors duration-300">{t("navHeritage")}</Link>
                <Link href="/collections" className="hover:text-white transition-colors duration-300">{t("navCollections")}</Link>
                <Link href="/?section=fabrics" className="hover:text-white transition-colors duration-300">{t("navFabrics")}</Link>
                <Link href="/manufacturing" className="hover:text-white transition-colors duration-300">{t("builtToScale")}</Link>
              </div>
              
              <div className="flex flex-col space-y-3">
                <span className="text-white/75 text-[9px] tracking-[3px] uppercase select-none mb-1">Capabilities</span>
                <Link href="/collections#oversized-tees" className="hover:text-white transition-colors duration-300">Heavy Cotton</Link>
                <Link href="/collections#hoodies" className="hover:text-white transition-colors duration-300">French Terry</Link>
                <Link href="/manufacturing" className="hover:text-white transition-colors duration-300">Japanese Tajima</Link>
                <Link href="/manufacturing" className="hover:text-white transition-colors duration-300">Custom Dyeing</Link>
              </div>
            </div>

          </div>

          {/* ROW 3: COPYRIGHT & COMPLIANCE */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 text-[9px] font-mono tracking-widest text-neutral-500 uppercase gap-4">
            <span>© {new Date().getFullYear()} FASHION BERG CO. {t("allRightsReserved")}</span>
            <span>{t("madeInIndia")}</span>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
