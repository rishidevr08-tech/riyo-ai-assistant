"use client";

import { motion } from "framer-motion";
import { useTranslation } from "./TranslationContext";

const steps = [
  {
    number: "01",
    title: "CAD & Technical Design",
    description: "Translating brand blueprints, custom measurements, and raw creative mood boards into high-fidelity digital pattern templates and technical CAD packages."
  },
  {
    number: "02",
    title: "Precision Sampling",
    description: "Spinning initial fabric trial runs, executing lab-dips, and producing physical prototypes to audit garment drape, fit comfort, and shrink tolerance."
  },
  {
    number: "03",
    title: "Vertical Manufacturing",
    description: "Initiating automated sewing assemblies on our vertical lines, utilizing specialized overlock and flatlock stitchers to ensure lifetime seam strength."
  },
  {
    number: "04",
    title: "Laboratory Quality Control",
    description: "Running rigorous color-fastness, tensile strength, and multi-cycle wash audits alongside 100% hand inspections of finished stitch runs."
  },
  {
    number: "05",
    title: "Global Supply Chain Sourcing",
    description: "Consolidating freight, handling customs gates, and managing door-to-door transit through our key Düsseldorf and İzmir terminals directly to retail hubs."
  }
];

export default function FromSketchToShelf() {
  const { t } = useTranslation();
  const stepsData = t("steps") || steps;

  return (
    <section 
      id="process" 
      className="bg-[#F5F0E8] py-[80px] px-8 md:px-16 lg:px-24 border-t border-neutral-200/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start relative">
        
        {/* LEFT COLUMN: SCROLL STEP INDICATORS */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start">
          <div className="max-w-xl">
            <span className="text-[9px] font-mono tracking-[4px] text-neutral-400 uppercase block mb-3">
              {t("verticalProductionChain")}
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-wide uppercase text-neutral-900 leading-tight font-serif mb-12">
              {t("fromSketchToShelf")}
            </h2>
          </div>

          <div className="flex flex-col space-y-12 md:space-y-16">
            {stepsData.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0.2, x: 0 }}
                whileInView={{ opacity: 1, x: 12 }}
                viewport={{ once: false, amount: 0.7 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start select-none border-l-2 border-neutral-350/40 pl-6 focus:outline-none"
              >
                <span className="font-mono text-xs text-neutral-400 mr-6 pt-1 select-none">
                  {step.number}
                </span>
                
                <div className="flex flex-col">
                  <h3 className="text-lg md:text-xl font-light tracking-wide text-neutral-800 uppercase mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-light max-w-md">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY EDITORIAL IMAGE */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-28 self-stretch flex flex-col justify-center mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="w-full aspect-[4/5] relative overflow-hidden bg-neutral-200 rounded-sm border border-neutral-300/40 shadow-sm"
          >
            <img 
              src="/sketch_to_shelf_editorial.png" 
              alt="Fashion Berg Sketch to Shelf Design Atelier" 
              className="w-full h-full object-cover"
            />
            {/* Elegant luxury overlay to blend with the background color */}
            <div className="absolute inset-0 bg-neutral-900/5 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E8]/40 via-transparent to-transparent" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
