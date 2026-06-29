"use client";

import Header from "../components/Header";
import FinalCTA from "../components/FinalCTA";
import { motion } from "framer-motion";
import { useInquiry } from "../components/InquiryContext";

const collectionItems = [
  {
    id: "oversized-tees",
    name: "Oversized Tees",
    subtitle: "Premium Heavyweight Cotton",
    src: "/product_tees.png",
    description: "Engineered for an elegant boxy drape and heavy hand-feel. Ideal for contemporary streetwear brands seeking a structural silhouette that maintains shape after extensive wear and washing.",
    specs: {
      composition: "100% Organic Ring-Spun Cotton",
      weight: "240 GSM – 300 GSM Heavyweight Jersey",
      fit: "Drop-shoulder boxy fit with thick collar ribbing (2.2cm)",
      finishing: "Silicon pre-shrunk, soft enzyme washed",
      moq: "300 Pcs per style/color"
    },
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
    name: "Luxury Hoodies",
    subtitle: "French Terry Essentials",
    src: "/product_hoodies.png",
    description: "Crafted with loopback French terry knit, featuring double-lined hoods without drawcords for a clean, minimalist architectural aesthetic. Highly customizable for premium private label requirements.",
    specs: {
      composition: "100% Egyptian Cotton / Loopback Knit",
      weight: "400 GSM – 460 GSM Heavyweight Fleece",
      fit: "Relaxed slouchy drape, double-stitched kangaroo pocket",
      finishing: "Carbon-brushed finish for velvet hand-feel",
      moq: "300 Pcs per style/color"
    },
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
    name: "Mercerized Polos",
    subtitle: "Refined Everyday Luxury",
    src: "/product_polos.png",
    description: "Sophisticated corporate and lifestyle polos utilizing double-mercerized yarn for a subtle luxury sheen and exceptional breathability. Custom placket and knit collars are drafted to your specifications.",
    specs: {
      composition: "100% Long-Staple Pima Cotton",
      weight: "220 GSM – 280 GSM Fine Piqué Weave",
      fit: "Tailored luxury fit, genuine mother-of-pearl buttons",
      finishing: "Double mercerized for luster and color fastness",
      moq: "300 Pcs per style/color"
    },
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
    name: "Fleece Sweatshirts",
    subtitle: "Heavyweight Boxy Crewnecks",
    src: "/product_sweats.png",
    description: "Built for versatility and warmth, our heavy crewneck sweatshirts feature signature side rib panels and cross-grain knitting to eliminate vertical shrinkage during washing programs.",
    specs: {
      composition: "80% Organic Cotton, 20% Recycled Polyester Blend",
      weight: "360 GSM – 420 GSM Diagonal Loopback",
      fit: "Boxy retro fit, ribbed crewneck insert, reinforced seams",
      finishing: "Brushed interior for ultimate loft and insulation",
      moq: "300 Pcs per style/color"
    },
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
    name: "Bespoke Cut & Sew",
    subtitle: "End-to-End OEM Development",
    src: "/product_custom.png",
    description: "From custom technical specs to proprietary fabric milling, our design studio supports your brand's unique patterns, experimental washes, and complex embroidery/printing formats at institutional scale.",
    specs: {
      composition: "Unlimited bespoke fibers (Bamboo, Silk, Merino, Cotton)",
      weight: "160 GSM – 600 GSM custom fabrics",
      fit: "Fully custom pattern drafting & sample matching",
      finishing: "Garment-dyeing, acid-washing, heavy distressed treatments",
      moq: "500 Pcs per style/color"
    },
    fabrics: ["Bespoke Yarn Sourcing", "Recycled Blends", "Technical Fabrics"],
    gsms: ["Custom Range (120-600 GSM)"],
    sizes: ["Custom Size Chart (XS-5XL)"],
    colors: [
      { name: "Any Custom Color (PANTONE)", hex: "#CCCCCC" }
    ]
  }
];

export default function CollectionsPage() {
  const { openPanel } = useInquiry();

  return (
    <main className="bg-[#F5F0E8] text-neutral-900 min-h-screen overflow-x-hidden pt-28">
      <Header />

      {/* HERO INTRO */}
      <section className="px-8 md:px-16 lg:px-24 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="border-b border-neutral-300/60 pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[10px] md:text-xs font-mono tracking-[6px] text-neutral-500 uppercase mb-4"
            >
              The B2B Catalog
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-4xl md:text-6xl font-light tracking-wide uppercase leading-none font-serif"
            >
              Core
              <br />
              Silhouettes
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-md text-sm text-neutral-600 font-light leading-relaxed"
          >
            Explore our pre-calibrated luxury garments, each crafted from our signature vertically-integrated Turkish mills. Available for private label, white label inventory allocation, and high-volume OEM programs.
          </motion.div>
        </div>
      </section>

      {/* DYNAMIC LIST */}
      <section className="px-8 md:px-16 lg:px-24 py-12 max-w-7xl mx-auto flex flex-col space-y-32">
        {collectionItems.map((item, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div 
              key={item.id}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Product Visual */}
              <div 
                onClick={() => openPanel(item, "sample")}
                className="w-full lg:w-1/2 aspect-[4/5] relative overflow-hidden bg-neutral-200 group rounded-sm shadow-sm cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/5" />
              </div>

              {/* Product Specifications & Details */}
              <div className="w-full lg:w-1/2 flex flex-col justify-start">
                <span className="text-[10px] font-mono tracking-[4px] text-neutral-400 uppercase mb-2 block">
                  / 0{idx + 1} SILHOUETTE
                </span>
                <h2 className="text-2xl md:text-3.5xl font-light tracking-wide text-neutral-800 uppercase mb-2">
                  {item.name}
                </h2>
                <h3 className="text-[11px] font-mono tracking-[3px] text-neutral-500 uppercase mb-6">
                  {item.subtitle}
                </h3>
                
                <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed mb-8">
                  {item.description}
                </p>

                {/* Technical Specs Accordion Panel */}
                <div className="border-t border-neutral-300/60 pt-6 flex flex-col space-y-3.5 mb-8">
                  <div className="flex justify-between items-baseline gap-4 text-xs">
                    <span className="font-mono text-neutral-400 uppercase tracking-wider">Composition</span>
                    <span className="text-neutral-800 text-right font-light">{item.specs.composition}</span>
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-xs">
                    <span className="font-mono text-neutral-400 uppercase tracking-wider">Fabric Weight</span>
                    <span className="text-neutral-800 text-right font-light">{item.specs.weight}</span>
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-xs">
                    <span className="font-mono text-neutral-400 uppercase tracking-wider">Fit Profile</span>
                    <span className="text-neutral-800 text-right font-light">{item.specs.fit}</span>
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-xs">
                    <span className="font-mono text-neutral-400 uppercase tracking-wider">Treatment</span>
                    <span className="text-neutral-800 text-right font-light">{item.specs.finishing}</span>
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-xs border-t border-neutral-300/30 pt-3">
                    <span className="font-mono text-neutral-500 uppercase tracking-wider font-semibold">Min. Order (MOQ)</span>
                    <span className="text-neutral-900 text-right font-mono font-semibold tracking-wider">{item.specs.moq}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => openPanel(item, "sample")}
                    className="inline-block bg-neutral-900 text-white text-xs font-semibold tracking-[3px] uppercase px-8 py-3.5 hover:bg-neutral-800 transition-colors duration-300 rounded-sm shadow-sm cursor-pointer"
                  >
                    Request Sample Spec
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <div className="h-[40px] w-full bg-gradient-to-b from-[#F5F0E8] to-[#000000] relative z-30" />
      <FinalCTA />
    </main>
  );
}
