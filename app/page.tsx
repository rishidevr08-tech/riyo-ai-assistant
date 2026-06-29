"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BrandStory from "./components/BrandStory";
import { useTranslation } from "./components/TranslationContext";
import ProductUniverse from "./components/ProductUniverse";
import FabricStory from "./components/FabricStory";
import Manufacturing from "./components/Manufacturing";
import ClientTrust from "./components/ClientTrust";
import FinalCTA from "./components/FinalCTA";
import Header, { STORAGE_KEYS } from "./components/Header";
import FromSketchToShelf from "./components/FromSketchToShelf";
import WhoWeManufactureFor from "./components/WhoWeManufactureFor";
import GlobalReachStatement from "./components/GlobalReachStatement";
import CinematicTransition from "./components/CinematicTransition";

const generations = [
  {
    id: "purple-girl",
    title: "Purple Girl",
    quote: "Designed for every generation.",
    point: { x: "7.8%", y: "35%" },
    bubble: { x: "7.8%", y: "27%" }
  },
  {
    id: "teen-boy",
    title: "Teen Boy",
    quote: "Made to move. Made to express.",
    point: { x: "17.8%", y: "19%" },
    bubble: { x: "17.8%", y: "10%" }
  },
  {
    id: "yellow-guy",
    title: "Yellow Guy",
    quote: "Essentials that define you.",
    point: { x: "23.4%", y: "35%" },
    bubble: { x: "23.4%", y: "27%" }
  },
  {
    id: "teen-girl",
    title: "Teen Girl",
    quote: "Oversized today. Iconic tomorrow.",
    point: { x: "31.4%", y: "22%" },
    bubble: { x: "31.4%", y: "13%" }
  },
  {
    id: "stripe-girl",
    title: "Stripe Girl",
    quote: "Comfort in every single thread.",
    point: { x: "36.2%", y: "34%" },
    bubble: { x: "36.2%", y: "26%" }
  },
  {
    id: "grandpa",
    title: "Grandpa",
    quote: "Forty years of craftsmanship.",
    point: { x: "45.5%", y: "18%" },
    bubble: { x: "45.5%", y: "9%" }
  },
  {
    id: "beige-kid",
    title: "Beige Kid",
    quote: "Soft from day one.",
    point: { x: "44.6%", y: "49%" },
    bubble: { x: "44.6%", y: "41%" }
  },
  {
    id: "grandma",
    title: "Grandma",
    quote: "Elegance begins with comfort.",
    point: { x: "55.8%", y: "18%" },
    bubble: { x: "55.8%", y: "9%" }
  },
  {
    id: "blue-guy",
    title: "Blue Guy",
    quote: "Streetwear is our language.",
    point: { x: "61.2%", y: "39%" },
    bubble: { x: "61.2%", y: "31%" }
  },
  {
    id: "sleeveless-guy",
    title: "Sleeveless Guy",
    quote: "Built for life. Worn anywhere.",
    point: { x: "71.6%", y: "15%" },
    bubble: { x: "71.6%", y: "6%" }
  },
  {
    id: "crochet-girl",
    title: "Crochet Girl",
    quote: "Crafted for confidence.",
    point: { x: "74.8%", y: "41%" },
    bubble: { x: "74.8%", y: "33%" }
  },
  {
    id: "tracksuit-girl",
    title: "Tracksuit Girl",
    quote: "Performance meets style.",
    point: { x: "83.4%", y: "19%" },
    bubble: { x: "83.4%", y: "10%" }
  },
  {
    id: "printed-guy",
    title: "Printed Guy",
    quote: "Premium quality. Every time.",
    point: { x: "93.4%", y: "31%" },
    bubble: { x: "93.4%", y: "23%" }
  },
  {
    id: "floor-boy",
    title: "Floor Boy",
    quote: "Made for every little adventure.",
    point: { x: "27.5%", y: "61%" },
    bubble: { x: "27.5%", y: "53%" }
  },
  {
    id: "floor-baby",
    title: "Floor Baby",
    quote: "Loved in every little detail.",
    point: { x: "67.5%", y: "75%" },
    bubble: { x: "67.5%", y: "67%" }
  }
];


let hasHydrated = false;

const quoteKeys: Record<string, string> = {
  "purple-girl": "spotlightQuote1",
  "teen-boy": "spotlightQuote2",
  "yellow-guy": "spotlightQuote3",
  "teen-girl": "spotlightQuote4",
  "stripe-girl": "spotlightQuote5",
  "grandpa": "spotlightQuote6",
  "beige-kid": "spotlightQuote7",
  "grandma": "spotlightQuote8",
  "blue-guy": "spotlightQuote9",
  "sleeveless-guy": "spotlightQuote10",
  "crochet-girl": "spotlightQuote11",
  "tracksuit-girl": "spotlightQuote12",
  "printed-guy": "spotlightQuote13",
  "floor-boy": "spotlightQuote14",
  "floor-baby": "spotlightQuote15",
};

function HomeContent() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section");

  const [isReady, setIsReady] = useState(() => {
    if (typeof window !== "undefined" && hasHydrated) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    hasHydrated = true;
    setIsReady(true);
  }, []);

  const [started, setStarted] = useState(() => {
    return typeof window !== "undefined" && (
      !!sectionParam || 
      !!window.location.hash || 
      sessionStorage.getItem(STORAGE_KEYS.ENTERED) === "true"
    );
  });
  const [showVideo, setShowVideo] = useState(false);
  const [showHome, setShowHome] = useState(() => {
    return typeof window !== "undefined" && (
      !!sectionParam || 
      !!window.location.hash || 
      sessionStorage.getItem(STORAGE_KEYS.VIDEO_COMPLETE) === "true"
    );
  });
  const [hideEntry, setHideEntry] = useState(() => {
    return typeof window !== "undefined" && (
      !!sectionParam || 
      !!window.location.hash || 
      sessionStorage.getItem(STORAGE_KEYS.ENTERED) === "true"
    );
  });
  const [activeGenId, setActiveGenId] = useState<string | null>(null);

  useEffect(() => {
    const handleHashNavigation = () => {
      if (typeof window !== "undefined") {
        const hashId = window.location.hash.substring(1);
        const targetId = sectionParam || hashId;

        if (targetId) {
          setStarted(true);
          setHideEntry(true);
          setShowVideo(false);
          setShowHome(true);

          sessionStorage.setItem(STORAGE_KEYS.ENTERED, "true");
          sessionStorage.setItem(STORAGE_KEYS.VIDEO_COMPLETE, "true");

          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);

          if (sectionParam) {
            window.history.replaceState(null, "", `/#${sectionParam}`);
          }
        }
      }
    };

    handleHashNavigation();

    window.addEventListener("hashchange", handleHashNavigation);
    return () => {
      window.removeEventListener("hashchange", handleHashNavigation);
    };
  }, [pathname, sectionParam]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime <= 0.8) {
        setShowHome(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem(STORAGE_KEYS.ENTERED, "true");
          sessionStorage.setItem(STORAGE_KEYS.VIDEO_COMPLETE, "true");
        }
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [showVideo]);

  const handleEnter = () => {
    setStarted(true);
    setShowVideo(true);

    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEYS.ENTERED, "true");
    }

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1;
        videoRef.current.play();
      }
    }, 100);
  };

  const handleVideoEnd = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEYS.VIDEO_COMPLETE, "true");
    }
    setTimeout(() => {
      setShowVideo(false);
    }, 300);
  };

  if (!isReady) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <main suppressHydrationWarning className="relative w-full min-h-screen bg-black overflow-x-hidden">

      {/* ENTRY SCREEN */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-700 ${hideEntry ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        <img
          src="/entry.jpg"
          className="w-full h-full object-cover object-[center_top]"
          alt=""
        />

        <div className="absolute inset-0 bg-black/20" />

        {/* UI */}
        <div
          className={`absolute inset-0 flex items-end justify-center pb-40 transition-all duration-1000 ${started
              ? "opacity-0 scale-110 blur-sm"
              : "opacity-100 scale-100"
            }`}
        >
          <button
            onClick={handleEnter}
            className="
              border border-white
              px-12 py-4
              tracking-[5px]
              text-white
              backdrop-blur-sm
              bg-black/10
              hover:bg-white
              hover:text-black
              transition-all duration-700
            "
          >
            {t("enterWorld")}
          </button>
        </div>
      </div>

      {/* VIDEO TRANSITION */}
      {showVideo && !showHome && (
        <video
          ref={videoRef}
          onPlaying={() => setHideEntry(true)}
          muted
          playsInline
          autoPlay
          onEnded={handleVideoEnd}
          className="fixed inset-0 w-full h-full object-cover z-30 animate-fadeIn"
        >
          <source src="/transition.mp4" type="video/mp4" />
        </video>
      )}

      {/* HOMEPAGE */}
      {showHome && (
        <div className="relative z-40 animate-fadeIn">
          <Header />
          {/* HERO - WITH INTERACTIVE LOOKBOOK HOTSPOTS */}
          <div className="relative w-full h-[70vh] md:h-[110vh] overflow-hidden bg-black select-none">
            <img
              src="/home.jpg"
              className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
              alt="Fashion Berg Multigenerational Portrait"
            />

            {/* Default Subtle dimming overlay */}
            <div className="absolute inset-0 bg-black/15 z-0" />

            {/* Dynamic Spotlight dimming overlay when hovered */}
            <div className={`absolute inset-0 bg-black/35 transition-opacity duration-700 z-10 ${activeGenId ? "opacity-100" : "opacity-0 pointer-events-none"}`} />

            {/* Soft Spotlight Glow behind hovered person */}
            <AnimatePresence>
              {activeGenId && (() => {
                const activeGen = generations.find((g) => g.id === activeGenId);
                if (!activeGen) return null;
                return (
                  <div
                    className="absolute pointer-events-none z-10"
                    style={{
                      left: activeGen.point.x,
                      top: activeGen.point.y,
                      transform: "translate(-50%, -50%)"
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                      className="w-[120px] h-[120px] relative"
                    >
                      <div className="absolute inset-0 rounded-full bg-white/[0.03] border border-white/5 blur-sm scale-125" />
                    </motion.div>
                  </div>
                );
              })()}
            </AnimatePresence>

            {/* Premium Dynamic SVG Connector Lines */}
            <AnimatePresence>
              {activeGenId && (() => {
                const activeChar = generations.find((g) => g.id === activeGenId);
                if (!activeChar) return null;
                return (
                  <svg className="absolute inset-0 w-full h-full z-15 pointer-events-none hidden md:block">
                    {/* Glowing thin connector line between bubble center and point */}
                    <motion.line
                      x1={activeChar.point.x}
                      y1={activeChar.bubble.y}
                      x2={activeChar.point.x}
                      y2={activeChar.point.y}
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ pathLength: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    {/* 6px white dot centered exactly on the point at the end of the line */}
                    <motion.circle
                      cx={activeChar.point.x}
                      cy={activeChar.point.y}
                      r="3"
                      fill="rgba(255, 255, 255, 0.85)"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.15, delay: 0.1 }}
                    />
                  </svg>
                );
              })()}
            </AnimatePresence>

            {/* Interactive Face Hotspots and Floating Speech Clouds */}
            <div className="absolute inset-0 w-full h-full z-20 pointer-events-none hidden md:block">
              {generations.map((gen) => {
                const isActive = activeGenId === gen.id;
                return (
                  <div key={gen.id}>
                    {/* 10px Dot (Default State) */}
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        left: gen.point.x,
                        top: gen.point.y,
                        transform: "translate(-50%, -50%)"
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 0.8 : 1.0,
                          opacity: isActive ? 0.7 : 0.15
                        }}
                        transition={{ duration: 0.2 }}
                        className="rounded-full w-[10px] h-[10px]"
                        style={{
                          background: "rgba(255, 255, 255, 0.85)",
                          boxShadow: "0 0 0 6px rgba(255, 255, 255, 0.08), 0 0 12px rgba(255, 255, 255, 0.03)"
                        }}
                      />
                    </div>

                    {/* Vertical Invisible Hover Bridge (spans from bubble to point + padding) */}
                    <div
                      onMouseEnter={() => setActiveGenId(gen.id)}
                      onMouseLeave={() => setActiveGenId(null)}
                      className="absolute pointer-events-auto cursor-pointer"
                      style={{
                        left: gen.point.x,
                        top: `calc(${gen.bubble.y} - 20px)`,
                        width: "60px",
                        height: `calc((${gen.point.y} - ${gen.bubble.y}) + 50px)`,
                        transform: "translateX(-50%)",
                        background: "transparent"
                      }}
                    />

                    {/* Speech Dialogue Bubble floating at custom bubble coordinates */}
                    <AnimatePresence>
                      {isActive && (
                        <div
                          className="absolute z-30 pointer-events-auto cursor-pointer select-none text-center"
                          style={{
                            left: gen.point.x,
                            top: gen.bubble.y,
                            transform: "translate(-50%, -50%)"
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            onMouseEnter={() => setActiveGenId(gen.id)}
                            onMouseLeave={() => setActiveGenId(null)}
                            className="px-[16px] py-[10px] rounded-[16px] shadow-2xl transition-all duration-300 flex items-center justify-center"
                            style={{
                              background: "rgba(255, 255, 255, 0.08)",
                              backdropFilter: "blur(16px)",
                              border: "1px solid rgba(255, 255, 255, 0.15)",
                              maxWidth: "200px",
                              width: "max-content"
                            }}
                          >
                            {/* Dialogue quote only, no labels or name tags */}
                            <p className="text-[14px] font-serif italic text-white leading-normal select-none">
                              "{t(quoteKeys[gen.id] as any) || gen.quote}"
                            </p>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <BrandStory />
          <FromSketchToShelf />
          {/* Subtle gradient divider: Heritage (Cream) to Collections (Black) */}
          <div className="h-[40px] w-full bg-gradient-to-b from-[#F5F0E8] to-[#000000] relative z-30 -mt-[40px] pointer-events-none" />

          <ProductUniverse />
          <CinematicTransition />
          {/* Subtle gradient divider: Cinematic Visual Pause (Black) to Fabrics (Cream) */}
          <div className="h-[40px] w-full bg-gradient-to-b from-[#000000] to-[#F5F0E8] relative z-30 -mt-[40px] pointer-events-none" />

          <FabricStory />
          {/* Subtle gradient divider: Fabrics (Cream) to Manufacturing (Dark Charcoal) */}
          <div className="h-[40px] w-full bg-gradient-to-b from-[#F5F0E8] to-[#0B0B0B] relative z-30 -mt-[40px] pointer-events-none" />

          <Manufacturing />
          <WhoWeManufactureFor />
          {/* Subtle gradient divider: Manufacturing (Dark Charcoal) to ClientTrust (Cream) */}
          <div className="h-[40px] w-full bg-gradient-to-b from-[#0B0B0B] to-[#F5F0E8] relative z-30 -mt-[40px] pointer-events-none" />

          <ClientTrust />
          <GlobalReachStatement />
          {/* Subtle gradient divider: ClientTrust (Cream) to Contact (Black) */}
          <div className="h-[40px] w-full bg-gradient-to-b from-[#F5F0E8] to-[#000000] relative z-30 -mt-[40px] pointer-events-none" />

          <FinalCTA />
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomeContent />
    </Suspense>
  );
}