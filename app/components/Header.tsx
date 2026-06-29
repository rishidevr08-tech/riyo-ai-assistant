"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation, Language } from "./TranslationContext";

export const STORAGE_KEYS = {
  ENTERED: "fashionberg-entered",
  VIDEO_COMPLETE: "fashionberg-video-complete",
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const { language, setLanguage, t, isRtl } = useTranslation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTouchStart = () => {
    if (typeof window === "undefined") return;
    longPressTimer.current = setTimeout(() => {
      sessionStorage.removeItem(STORAGE_KEYS.ENTERED);
      sessionStorage.removeItem(STORAGE_KEYS.VIDEO_COMPLETE);
      localStorage.removeItem(STORAGE_KEYS.ENTERED);
      localStorage.removeItem(STORAGE_KEYS.VIDEO_COMPLETE);
      window.location.href = "/";
    }, 3000);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (e.shiftKey) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(STORAGE_KEYS.ENTERED);
        sessionStorage.removeItem(STORAGE_KEYS.VIDEO_COMPLETE);
        localStorage.removeItem(STORAGE_KEYS.ENTERED);
        localStorage.removeItem(STORAGE_KEYS.VIDEO_COMPLETE);
        window.location.href = "/";
      }
      return;
    }

    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomepage = pathname === "/";

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isHomepage) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      // Update hash cleanly in URL without appending multiple hashes
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `/#${targetId}`);
      }
    } else {
      router.push(`/?section=${targetId}`);
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-6 md:py-8 px-8 md:px-16 lg:px-24 select-none ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-4 md:py-5" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO */}
          <div
            onClick={handleLogoClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="group flex flex-col cursor-pointer select-none"
            title="Shift + Click to replay brand experience"
          >
            <span className="text-sm md:text-base font-light tracking-[6px] text-white uppercase group-hover:text-white/80 transition-colors duration-300">
              FASHION BERG
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[7px] font-mono tracking-[3px] text-white/30 uppercase mt-0.5 select-none">
                Est. 1981
              </span>
              {process.env.NODE_ENV === "development" && (
                <span className="text-[7px] font-mono tracking-wider text-white/20 uppercase mt-0.5 select-none border border-white/10 px-1.5 py-0.5 rounded-[2px]">
                  Shift + Click → Replay Intro
                </span>
              )}
            </div>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-10 text-[10px] font-mono tracking-[3px] text-white/50 uppercase">
            <Link 
              href="/#heritage" 
              onClick={(e) => handleLinkClick(e, "heritage")}
              className={`hover:text-white transition-colors duration-300 ${isHomepage ? "text-white/40" : ""}`}
            >
              {t("navHeritage")}
            </Link>
            <Link 
              href="/collections" 
              className={`hover:text-white transition-colors duration-300 ${pathname === "/collections" ? "text-white font-semibold" : ""}`}
            >
              {t("navCollections")}
            </Link>
            <Link 
              href="/#fabrics" 
              onClick={(e) => handleLinkClick(e, "fabrics")}
              className="hover:text-white transition-colors duration-300"
            >
              {t("navFabrics")}
            </Link>
            <Link 
              href="/#manufacturing" 
              onClick={(e) => handleLinkClick(e, "manufacturing")}
              className="hover:text-white transition-colors duration-300"
            >
              {t("navManufacturing")}
            </Link>
            <Link 
              href="/contact" 
              className={`hover:text-white transition-colors duration-300 ${pathname === "/contact" ? "text-white font-semibold" : ""}`}
            >
              {t("navContact")}
            </Link>

            {/* Language Selector */}
            <div ref={dropdownRef} className="relative ml-2">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="hover:text-white transition-colors duration-300 flex items-center gap-1.5 focus:outline-none py-1"
                aria-haspopup="true"
                aria-expanded={langDropdownOpen}
              >
                <span>🌐</span> {language.toUpperCase()}
              </button>
              
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 py-2 w-32 bg-neutral-950/95 backdrop-blur-md border border-white/10 rounded-sm shadow-xl flex flex-col z-50"
                  >
                    {(["en", "de", "fr", "es", "it", "ar"] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLangDropdownOpen(false);
                        }}
                        className={`px-4 py-2 text-left text-[9px] tracking-wider transition-colors duration-200 hover:bg-white/5 hover:text-white w-full ${
                          language === lang ? "text-white font-semibold bg-white/5" : "text-white/60"
                        }`}
                      >
                        {lang === "ar" ? "AR (العربية)" : lang.toUpperCase()}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* MOBILE BURGER */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white flex flex-col space-y-1.5 p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className={`w-5 h-[1px] bg-white transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-[1px] bg-white transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-[1px] bg-white transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden cursor-pointer"
            />
            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-[400px] bg-neutral-950/95 backdrop-blur-2xl z-50 flex flex-col justify-between p-12 border-l border-white/10 lg:hidden shadow-2xl select-none animate-fadeIn"
            >
              {/* Header inside Menu */}
              <div className="flex justify-between items-center pb-8 border-b border-white/10">
                <span className="text-[10px] font-mono tracking-[4px] text-white/40 uppercase">
                  Menu
                </span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-white/70 p-2 text-xs font-mono tracking-widest uppercase focus:outline-none"
                >
                  [ Close ]
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-6 my-auto text-start text-xs font-mono tracking-[5px] text-white/50 uppercase">
                <Link 
                  href="/#heritage" 
                  onClick={(e) => handleLinkClick(e, "heritage")}
                  className={`text-xl font-light text-white tracking-[6px] hover:text-white/80 border-b border-white/5 pb-2 transition-all duration-300 ${pathname === "/" ? "text-white" : ""}`}
                >
                  {t("navHeritage")}
                </Link>
                <Link 
                  href="/collections" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-light text-white tracking-[6px] hover:text-white/80 border-b border-white/5 pb-2 transition-all duration-300 ${pathname === "/collections" ? "text-white font-semibold" : ""}`}
                >
                  {t("navCollections")}
                </Link>
                <Link 
                  href="/#fabrics" 
                  onClick={(e) => handleLinkClick(e, "fabrics")}
                  className="text-xl font-light text-white tracking-[6px] hover:text-white/80 border-b border-white/5 pb-2 transition-all duration-300"
                >
                  {t("navFabrics")}
                </Link>
                <Link 
                  href="/#manufacturing" 
                  onClick={(e) => handleLinkClick(e, "manufacturing")}
                  className="text-xl font-light text-white tracking-[6px] hover:text-white/80 border-b border-white/5 pb-2 transition-all duration-300"
                >
                  {t("navManufacturing")}
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-light text-white tracking-[6px] hover:text-white/80 border-b border-white/5 pb-2 transition-all duration-300 ${pathname === "/contact" ? "text-white font-semibold" : ""}`}
                >
                  {t("navContact")}
                </Link>

                {/* Mobile Language Selector */}
                <div className="pt-4 border-t border-white/5 flex flex-col space-y-3">
                  <span className="text-[9px] tracking-[3px] text-white/30 uppercase">Language</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(["en", "de", "fr", "es", "it", "ar"] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                        }}
                        className={`py-2 text-center text-[9px] tracking-wider border rounded-[2px] transition-all duration-300 ${
                          language === lang
                            ? "border-white text-white bg-white/5"
                            : "border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer inside Menu */}
              <div className="pt-8 border-t border-white/5 flex flex-col space-y-2 select-none text-[8px] font-mono text-white/30 tracking-widest uppercase">
                <span>© {new Date().getFullYear()} FASHION BERG CO.</span>
                <span>Procurement Desk Düsseldorf</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
