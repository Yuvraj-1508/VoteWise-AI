"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { TRANSLATIONS } from "@/lib/constants";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS.en;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  largeFont: boolean;
  setLargeFont: (val: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [highContrast, setHighContrast] = useState(false);
  const [largeFont, setLargeFont] = useState(false);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast]);

  useEffect(() => {
    if (largeFont) {
      document.documentElement.classList.add("large-font");
    } else {
      document.documentElement.classList.remove("large-font");
    }
  }, [largeFont]);

  return (
    <LanguageContext.Provider value={{ 
      language, setLanguage, t, 
      highContrast, setHighContrast, 
      largeFont, setLargeFont 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
