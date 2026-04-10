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
        // Hides menu slightly after scrolling past the hero
        setVisible(top > 60);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtered links: Only Despre, Prețuri, and Programare
  const links = [
    { href: "#what", ru: "О ICOONE", ro: "Despre ICOONE" },
    { href: "#prices", ru: "Цены", ro: "Prețuri" },
    { href: "#book", ru: "Записаться", ro: "Programare" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 md:px-11 py-3 md:py-3.5 transition-opacity duration-400"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      {/* Mobile hamburger */}
      <div
        className="md:hidden flex items-center justify-center w-[52px] h-10 rounded-2xl bg-white/50 backdrop-blur-[14px] border border-white/50 cursor-pointer text-muted-foreground font-bold"
        onClick={() => setMenuOpen(true)}
      >
        MENU
      </div>

      {/* Desktop nav links - Clean Pill Design */}
      <div className="hidden md:flex items-center gap-1.5 bg-white/60 backdrop-blur-[20px] rounded-full px-2 py-1.5 border border-white/60 shadow-md mx-auto">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="px-6 py-2.5 rounded-full text-[0.92rem] font-bold text-[#832734] hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            {t(l.ru, l.ro)}
          </a>
        ))}
      </div>

      {/* Language toggle - Pink Circle */}
      <div
        className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#832734] text-white flex items-center justify-center font-black text-xs md:text-sm cursor-pointer select-none ml-auto md:ml-0 shadow-lg hover:scale-105 transition-transform"
        onClick={toggle}
      >
        {lang.toUpperCase()}
      </div>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-[20px] flex flex-col items-center justify-center gap-8 z-[999] animate-in fade-in duration-300">
          <button
            className="absolute top-6 right-6 text-3xl text-[#832734] font-light"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-2xl font-black text-[#832734] py-2 tracking-tighter uppercase"
              onClick={() => setMenuOpen(false)}
            >
              {t(l.ru, l.ro)}
            </a>
          ))}
          <div 
            onClick={() => { toggle(); setMenuOpen(false); }}
            className="mt-4 px-6 py-2 border-2 border-[#832734] rounded-full text-[#832734] font-bold"
          >
            {lang === 'ro' ? 'РУССКИЙ' : 'ROMÂNĂ'}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;