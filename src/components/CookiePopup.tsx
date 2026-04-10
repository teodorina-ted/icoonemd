import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const CookiePopup = () => {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("icoone_cookies_accepted");
    if (!accepted) {
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem("icoone_cookies_accepted", accepted ? "true" : "false");
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-[99998]" />

      {/* Centered Popup Card */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999] w-[85%] max-w-[300px] animate-in fade-in zoom-in-95 duration-300">
        <div className="relative bg-white p-6 md:p-8 rounded-[40px] shadow-2xl border border-pink-50 flex flex-col items-center text-center">
          
          {/* Close "X" Button for non-language speakers */}
          <button 
            onClick={() => handleChoice(false)}
            className="absolute top-5 right-6 text-[#832734] opacity-40 hover:opacity-100 transition-opacity p-1"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="w-12 h-12 bg-[#fff5f6] rounded-full flex items-center justify-center mb-4">
             <span className="text-xl">🍪</span>
          </div>

          {/* Smaller Message Text */}
          <p className="text-[#832734] font-bold text-xs md:text-sm leading-relaxed mb-6 px-2">
            {t(
              "Мы используем куки для вашего удобства. Принимаете?", 
              "Utilizăm cookie-uri pentru o experiență mai bună. Acceptați?"
            )}
          </p>

          <div className="flex flex-col w-full gap-2">
            {/* Smaller, Premium Accept Button */}
            <button
              onClick={() => handleChoice(true)}
              className="w-full bg-[#832734] text-white py-2.5 rounded-full cursor-pointer font-black text-[11px] md:text-xs tracking-wider hover:opacity-90 transition-all active:scale-95 shadow-md"
            >
              {t("ДА, ПРИНИМАЮ", "DA, ACCEPT")}
            </button>

            {/* Subtler No Button */}
            <button
              onClick={() => handleChoice(false)}
              className="w-full bg-transparent text-[#832734] opacity-50 py-1.5 rounded-full cursor-pointer font-bold text-[10px] hover:opacity-80 transition-all"
            >
              {t("Нет, спасибо", "Nu, mulțumesc")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePopup;