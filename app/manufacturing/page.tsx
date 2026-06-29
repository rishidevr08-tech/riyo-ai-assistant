"use client";

import Header from "../components/Header";
import FinalCTA from "../components/FinalCTA";
import { motion } from "framer-motion";

const millSpecs = [
  {
    title: "Vertical Weaving & Spinning",
    detail: "Over 60 high-speed state-of-the-art circular knitting machines calibrated for heavyweight jersey, diagonal French terry loopbacks, and bespoke rib structures. Capable of yarn-dyeing and custom fiber blending directly at source.",
    metrics: ["Daily Output: 15,000 kg fabric", "Yarn counts: 16s, 20s, 24s, 30s, 40s", "Weave scope: Single Jersey, Interlock, Rib, Terry"]
  },
  {
    title: "Eco-Conscious Dye House",
    detail: "A modern closed-loop dyeing facility running organic reactive dyes that guarantee high color fastness and deep color saturation. 100% of post-dye industrial water undergoes specialized biological treatment before discharge.",
    metrics: ["Water recycle rate: 75%+", "Lab-dip matching: Spectrophotometer precision", "Standards: Reactive dyeing, Garment-dye, Acid-wash"]
  },
  {
    title: "Precision Cut & Assembly",
    detail: "Equipped with custom cutting tables and laser plotting machines to ensure absolute pattern tolerance within ±1mm. Assembly lines utilize specialized industrial overlock and flatlock stitchers to guarantee seam durability.",
    metrics: ["Daily Sewing Limit: 25,000 finished pieces", "Stitching types: Flatlock, 5-Thread Overlock, Twin-Needle", "QC Stations: 100% manual check post-steam press"]
  },
  {
    title: "High-Density Branding Studio",
    detail: "Equipped with advanced multi-head Japanese Tajima embroidery stations, custom embossing presses, and large-format automatic silk-screen printing lines optimized for high-density puff, water-based, and plastisol inks.",
    metrics: ["Tajima heads: 120 available", "Print techniques: Screen, DTG, Puff, Emboss, High-Density", "Embroidery threads: Polyester, Mercerized Cotton, Metallic"]
  }
];

const certifications = [
  { name: "GOTS Certified", org: "Global Organic Textile Standard", purpose: "Guarantees 100% organic cotton fibers traced from source crop through harvest and spinning, with strictly regulated environmental and social labor practices." },
  { name: "Oeko-Tex Standard 100", org: "Confidence in Textiles", purpose: "Certified free from over 100 known harmful chemical substances and irritants, verifying absolute fabric safety next to sensitive skin surfaces." },
  { name: "Amfori BSCI Audited", org: "Business Social Compliance", purpose: "Audited periodically for equitable wage structures, absolute safety measures, ethical workplace codes, and zero child or forced labor violations." }
];

export default function ManufacturingPage() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden pt-28">
      <Header />

      {/* MANUFACTURING HERO */}
      <section className="px-8 md:px-16 lg:px-24 py-16 md:py-24 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 pb-12">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[10px] md:text-xs font-mono tracking-[6px] text-white/40 uppercase mb-4"
            >
              Built to Scale
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-4xl md:text-6xl font-light tracking-wide uppercase leading-none font-serif"
            >
              Industrial
              <br />
              Craftsmanship
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-md text-sm text-white/60 font-light leading-relaxed"
          >
            Our manufacturing infrastructure is designed to bridge the gap between boutique design excellence and global volume procurement. We control 100% of our vertical process.
          </motion.p>
        </div>

        {/* Hero Banner Image */}
        <div className="w-full aspect-[21/9] overflow-hidden bg-neutral-900 mt-12 rounded-sm relative group">
          <img
            src="/fabric_macro.png"
            alt="Macro fabric construction"
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </section>

      {/* MILL SPECIFICATIONS GRID */}
      <section className="px-8 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto">
        <h2 className="text-[10px] font-mono tracking-[4px] text-white/40 uppercase mb-16 text-center">
          Mill Operations & Equipment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {millSpecs.map((spec, idx) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all duration-500 flex flex-col justify-start rounded-sm"
            >
              <div className="flex justify-between items-baseline mb-6 border-b border-white/10 pb-4">
                <h3 className="text-lg md:text-xl font-light tracking-[2px] uppercase text-white/90">
                  {spec.title}
                </h3>
                <span className="font-mono text-xs text-white/30">
                  / 0{idx + 1}
                </span>
              </div>
              
              <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light mb-8">
                {spec.detail}
              </p>

              <div className="mt-auto space-y-2 pt-4 border-t border-white/5">
                {spec.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="flex justify-between text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    <span>{metric.split(":")[0]}</span>
                    <span className="text-white/80 font-medium">{metric.split(":")[1]}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS & LABORATORY COMPLIANCE */}
      <section className="bg-[#0B0B0B] border-y border-white/10 py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] font-mono tracking-[4px] text-white/40 uppercase block mb-3">
              Certified Compliance
            </span>
            <h2 className="text-2.5xl md:text-3.5xl font-light tracking-wide uppercase text-white leading-snug">
              Uncompromising Standards in Sustainability & Safety
            </h2>
            <div className="w-12 h-[1px] bg-white/20 mt-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col border-l border-white/10 pl-6 py-2"
              >
                <h3 className="text-lg font-light tracking-wider text-white uppercase mb-1">
                  {cert.name}
                </h3>
                <span className="text-[9px] font-mono tracking-[3px] text-white/40 uppercase mb-4 block">
                  {cert.org}
                </span>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  {cert.purpose}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-[40px] w-full bg-gradient-to-b from-[#0B0B0B] to-[#000000] relative z-30" />
      <FinalCTA />
    </main>
  );
}
