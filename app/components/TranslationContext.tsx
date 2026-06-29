"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "../translations/en";
import de from "../translations/de";
import fr from "../translations/fr";
import es from "../translations/es";
import it from "../translations/it";
import ar from "../translations/ar";

const translations = { en, de, fr, es, it, ar } as const;

export type Language = keyof typeof translations;

export interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <K extends keyof typeof en>(key: K) => typeof en[K];
  isRtl: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const cached = localStorage.getItem("fashionberg-language") as Language;
    if (cached && translations[cached]) {
      setLanguageState(cached);
    } else if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.split("-")[0] as Language;
      if (translations[browserLang]) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("fashionberg-language", lang);
  };

  const t = <K extends keyof typeof en>(key: K): typeof en[K] => {
    const catalog = translations[language] || translations["en"];
    return catalog[key] !== undefined ? catalog[key] : en[key];
  };

  const isRtl = language === "ar";

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
