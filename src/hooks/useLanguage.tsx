import React, { createContext, useContext, useState, useCallback } from "react";

type Lang = "ru" | "ro";

interface LangContextType {
  lang: Lang;
  toggle: () => void;
  t: (ru: string, ro: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "ru",
  toggle: () => {},
  t: (ru) => ru,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("ru");

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "ru" ? "ro" : "ru"));
  }, []);

  const t = useCallback(
    (ru: string, ro: string) => (lang === "ru" ? ru : ro),
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLanguage = () => useContext(LangContext);
