"use client";

import { motion } from "framer-motion";

export default function CinematicTransition() {
  return (
    <section className="relative w-full h-[70vh] md:h-[75vh] overflow-hidden bg-black select-none">
      
      {/* FULL-BLEED BACKGROUND WITH SLOW DYNAMIC ZOOM */}
      <div className="absolute inset-0 w-full h-full z-0">
        <motion.img
          src="/fabric_macro.png"
          alt="Luxury Fabric Close-up Details"
          className="w-full h-full object-cover object-center"
          animate={{ scale: [1.02, 1.05, 1.02] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Rich cinematic overlays for deep visual depth */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      </div>

      {/* CENTERED MASSIVE TYPOGRAPHIC STATEMENTS */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[9px] md:text-[10px] font-mono tracking-[8px] text-white/40 uppercase mb-4"
        >
          Material Philosophy
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-[8px] md:tracking-[16px] font-serif uppercase text-white leading-tight max-w-4xl"
        >
          Precision In
          <br />
          Every Thread
        </motion.h2>
        
        <div className="w-16 h-[1px] bg-white/20 mt-8" />
      </div>

    </section>
  );
}
