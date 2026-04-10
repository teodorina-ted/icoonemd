import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const CookiePopup = () => {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("icoone_cookies_accepted")) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("icoone_cookies_accepted", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-card px-5 py-4 z-[10000] shadow-xl border-t border-pink-bg flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5">
      <p className="text-sm text-muted-foreground leading-relaxed text-center md:text-left">
        {t("Мы используем куки для вашего удобства.", "Folosim cookie-uri pentru o experiență mai bună.")}
      </p>
      <button
        onClick={accept}
        className="bg-pink-mid text-primary-foreground border-none px-6 py-2 rounded-[10px] cursor-pointer font-bold whitespace-nowrap font-nunito hover:bg-pink-deep transition-colors"
      >
        OK
      </button>
    </div>
  );
};

export default CookiePopup;
