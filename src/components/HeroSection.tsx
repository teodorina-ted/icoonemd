import { useLanguage } from "@/hooks/useLanguage";

const BASE = "/images";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative mx-2 md:mx-3.5 rounded-[26px] overflow-hidden flex flex-col justify-between"
      style={{ height: "calc(100vh - 28px)", minHeight: 500, maxHeight: 820 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img src={`${BASE}/img1.png`} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)" }} />
      </div>

      <div className="absolute top-5 right-[310px] text-[2.6rem] font-black italic tracking-wider z-[1] pointer-events-none hidden md:block" style={{ color: "rgba(255,255,255,0.13)" }}>
        icoone
      </div>

      <div className="relative z-[2] pt-20 md:pt-[100px] px-5 md:px-11">
        <div className="inline-block bg-card text-pink-deep text-base md:text-lg font-extrabold px-5 py-2 rounded-[18px] mb-2.5 hero-tag">
          {t("Итальянская технология эстетики тела.", "Tehnologie italiană pentru estetica corpului.")}
        </div>
        <h1 className="text-[2.6rem] leading-[1.05] md:text-[4.9rem] font-black text-pink-deep hero-heading">
          {t("Аппаратный массаж", "Masaj aparativ")}<br />
          <span className="inline-block bg-card text-pink-mid text-[2.2rem] md:text-[3.8rem] font-black px-5 py-1.5 rounded-[20px] tracking-wide mt-3 hero-brand">
            ICOONE
          </span>
        </h1>
      </div>

      <div className="relative z-[2] w-full px-4 md:px-11 pb-6 md:pb-11 flex flex-col md:flex-row items-end justify-between gap-3 md:gap-6">
        {/* Left info card — visible on all screen sizes */}
        <a href="#what" className="flex-1 max-w-full md:max-w-[520px] bg-white/80 backdrop-blur-[20px] border border-white/95 rounded-lg p-3.5 md:p-5 flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-[68px] h-[56px] md:w-[90px] md:h-[72px] rounded-[14px] overflow-hidden flex-shrink-0">
            <img src={`${BASE}/img3.png`} alt="ICOONE" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm md:text-[1.05rem] font-extrabold text-pink-deep mb-1.5">
              {t("Узнайте о массаже ICOONE", "Aflați despre masajul ICOONE")}
            </h4>
            <p className="text-xs md:text-sm leading-relaxed text-muted-foreground">
              {t("Узнайте об инновационных технологиях, которые лежат в основе аппаратного массажа ICOONE.", "Aflați despre tehnologiile inovatoare care stau la baza masajului aparativ ICOONE.")}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-pink-deep flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2">
              <path d="M3 13L13 3M13 3H7M13 3V9" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </a>

        {/* Right ICOONE card — visible on desktop AND mobile */}
        <a href="#advantages" className="flex-shrink-0 w-full md:w-[260px] bg-pink-deep/90 backdrop-blur-[20px] rounded-[20px] p-5 hover:-translate-y-1 transition-transform flex md:flex-col gap-4 md:gap-0 items-center md:items-start">
          <div className="flex items-center justify-between w-full md:mb-2">
            <h3 className="text-[1.4rem] md:text-[1.6rem] font-black text-white">ICOONE.</h3>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M3 13L13 3M13 3H7M13 3V9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <p className="text-xs md:text-sm leading-relaxed text-white/85 hidden md:block mb-3">
            {t("Премиальная методика глубокой стимуляции кожи, мышц и подкожных тканей для безупречного силуэта, тонуса и ощущения полного обновления.", "Metodă premium de stimulare profundă a pielii, mușchilor și țesuturilor subcutanate pentru o siluetă impecabilă, tonus și senzația de reînnoire completă.")}
          </p>
          <div className="rounded-[14px] overflow-hidden md:h-[140px] h-[70px] w-[90px] md:w-full flex-shrink-0">
            <img src={`${BASE}/img2.png`} alt="ICOONE" className="w-full h-full object-cover" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
