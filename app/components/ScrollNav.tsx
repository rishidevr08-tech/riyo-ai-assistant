"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "heritage", number: "01" },
  { id: "collections", number: "02" },
  { id: "fabrics", number: "03" },
  { id: "manufacturing", number: "04" },
  { id: "contact", number: "05" }
];

export default function ScrollNav() {
  const [activeSection, setActiveSection] = useState<string>("heritage");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col space-y-6 select-none mix-blend-difference">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <motion.div
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            animate={{ 
              opacity: isActive ? 0.4 : 0.08,
              x: isActive ? 4 : 0
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="cursor-pointer font-mono text-[12px] tracking-[0.2em] text-white select-none py-1"
          >
            {item.number}
          </motion.div>
        );
      })}
    </div>
  );
}
