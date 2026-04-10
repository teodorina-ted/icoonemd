import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";

const FooterSection = () => {
  const { t } = useLanguage();

  const socials = [
    {
      href: "https://www.instagram.com/effleure.touch",
      label: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
    },
    {
      href: "https://www.facebook.com/profile.php?id=61585761712189",
      label: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      href: "https://www.tiktok.com/@effleure.touch",
      label: "TikTok",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
    },
    {
      href: "https://wa.me/37368323861",
      label: "WhatsApp",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-gray-400 pt-[70px] px-5 md:px-16 relative">
      {/* Scroll to Top - Deep Wine Spot */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute -top-[22px] left-1/2 -translate-x-1/2 bg-[#832734] w-11 h-11 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:-translate-y-1 transition-transform z-[2]"
      >
        <span className="text-white text-lg font-black">↑</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_1fr] gap-8 md:gap-10 pb-12 border-b border-white/[0.08]">

        {/* Brand column - ICOONE with Light Pink Milky color */}
        <div>
          <div className="text-3xl font-black text-[#eabdc3] mb-3.5 tracking-wide uppercase">
            ICOONE
          </div>
          <p className="text-sm leading-relaxed text-gray-400 mb-5">
            {t(
              "Итальянская технология аппаратного массажа для красоты и здоровья вашего тела.",
              "Tehnologie italiană de masaj aparativ pentru frumusețea și sănătatea corpului dumneavoastră."
            )}
          </p>
          <div className="flex gap-3 flex-wrap">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="w-10 h-10 bg-white/[0.05] rounded-full flex items-center justify-center hover:bg-[#832734] hover:-translate-y-1 transition-all text-gray-400 hover:text-[#fff5f6]"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation - Auto Language */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4 opacity-50">
            {t("Навигация", "Navigare")}
          </h4>
          <ul className="flex flex-col gap-2.5">
            {[
              { href: "#what",      ru: "О ICOONE",       ro: "Despre ICOONE" },
              { href: "#advantages", ru: "Преимущества",    ro: "Avantaje" },
              { href: "#procedure",  ru: "Процедура",       ro: "Procedură" },
              { href: "#faq",        ru: "FAQ",             ro: "FAQ" },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-gray-400 hover:text-[#ff91a4] transition-colors">
                  {t(l.ru, l.ro)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Service column - Auto Language */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4 opacity-50">
            {t("Выберите нас", "Alegeți-ne")}
          </h4>
          <ul className="flex flex-col gap-2.5">
            {[
              { href: "#types",  ru: "Виды массажа", ro: "Tipuri de masaj" },
              { href: "#prices", ru: "Цены",          ro: "Prețuri" },
              { href: "#book",   ru: "Записаться",    ro: "Programare" },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-gray-400 hover:text-[#ff91a4] transition-colors">
                  {t(l.ru, l.ro)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts - Auto Language */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4 opacity-50">
            {t("Контакты", "Contacte")}
          </h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a
                href="https://maps.google.com/?q=Bucuresti+64+Chisinau"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-[#ff91a4] transition-colors"
              >
                {t("ул. Букурешть 64", "str. București 64")}
              </a>
            </li>
            <li>
              <a href="tel:+37368323861" className="text-sm text-gray-400 hover:text-[#ff91a4] transition-colors">
                +373 68 323 861
              </a>
            </li>
            <li>
              <a href="mailto:icoone.md@gmail.com" className="text-sm text-gray-400 hover:text-[#ff91a4] transition-colors">
                icoone.md@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal - Auto Switch Logic Applied Here */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 text-[11px] text-gray-500 gap-4 flex-wrap">
        <p>
          {t(
            "© 2026 ICOONE. Все права защищены. S.R.L. IDNO 1025606008701.",
            "© 2026 ICOONE. Toate drepturile rezervate. S.R.L. IDNO 1025606008701."
          )}
        </p>
        <div className="flex gap-6 flex-wrap">
          <Link to="/privacy" className="hover:text-[#fff5f6] transition-colors">
            {t("Политика конфиденциальности", "Politica de confidențialitate")}
          </Link>
          <Link to="/terms" className="hover:text-[#fff5f6] transition-colors">
            {t("Условия и положения", "Termeni și condiții")}
          </Link>
          <Link to="/cookies" className="hover:text-[#fff5f6] transition-colors">
            {t("Политика Cookie", "Politica Cookie")}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;