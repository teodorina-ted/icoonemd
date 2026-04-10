import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const Navigation = () => {
  const { lang, toggle, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const target = document.getElementById("what");
      if (target) {
        const top = target.getBoundingClientRect().top;
        setVisible(top > 60);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#what", ru: "О ICOONE", ro: "Despre ICOONE" },
    { href: "#why", ru: "Почему мы", ro: "De ce noi" },
    { href: "#types", ru: "Услуги", ro: "Servicii" },
    { href: "#prices", ru: "Цены", ro: "Prețuri" },
    { href: "#contacts", ru: "Контакты", ro: "Contacte" },
    { href: "#book", ru: "Записаться", ro: "Programare" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 md:px-11 py-3 md:py-3.5 transition-opacity duration-400"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      {/* Mobile hamburger */}
      <div
        className="md:hidden flex items-center justify-center w-[52px] h-10 rounded-2xl bg-white/50 backdrop-blur-[14px] border border-white/50 cursor-pointer text-muted-foreground"
        onClick={() => setMenuOpen(true)}
      >
        ☰
      </div>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-1.5 bg-white/60 backdrop-blur-[20px] rounded-full px-2 py-1.5 border border-white/60 shadow-md mx-auto">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="px-5 py-2.5 rounded-full text-[0.92rem] font-bold text-foreground hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            {t(l.ru, l.ro)}
          </a>
        ))}
      </div>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white/97 backdrop-blur-[20px] flex flex-col items-center justify-center gap-5 z-[999]">
          <button
            className="absolute top-5 right-5 text-2xl text-pink-mid bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xl font-extrabold text-pink-deep py-2.5"
              onClick={() => setMenuOpen(false)}
            >
              {t(l.ru, l.ro)}
            </a>
          ))}
        </div>
      )}

      {/* Language toggle */}
      <div
        className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-pink-deep text-primary-foreground flex items-center justify-center font-black text-xs md:text-sm cursor-pointer select-none ml-auto md:ml-0"
        onClick={toggle}
      >
        {lang.toUpperCase()}
      </div>
    </nav>
  );
};

export default Navigation;
