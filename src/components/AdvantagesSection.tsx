import { useLanguage } from "@/hooks/useLanguage";

const BASE = "/images";
// Use the central machine image from your screenshot (likely img4 or similar)
const machineImage = `${BASE}/img4.png`; // Update this if the machine image has a different name

const AdvantagesSection = () => {
  const { t } = useLanguage();

  // Unified list of advantages to ensure consistency between layouts
  const advantages = [
    { 
      title: t("Глубокая стимуляция тканей", "Stimulare profundă a țesuturilor"), 
      desc: t("Микро-ролики одновременно стимулируют тысячи точек кожи, улучшая микроциркуляцию.", "Micro-rolele stimulează simultan mii de puncte ale pielii, îmbunătățind microcirculația.") 
    },
    { 
      title: t("Улучшение лимфотока", "Îmbunătățirea drenajului limfatic"), 
      desc: t("Помогает уменьшить отёки и ускоряет выведение лишней жидкости.", "Ajută la reducerea edemelor și accelerează eliminarea lichidului în exces.") 
    },
    { 
      title: t("Моделирование фигуры", "Modelare corporală"), 
      desc: t("Процедура способствует уменьшению объёмов и повышению упругости кожи.", "Procedura contribuie la reducerea volumelor și la creșterea elasticității pielii.") 
    },
    { 
      title: t("Без боли и реабилитации", "Fără durere și recuperare"), 
      desc: t("Массаж проходит комфортно и не требует восстановления.", "Masajul se desfășoară confortabil și nu necesită recuperare.") 
    },
    { 
      title: t("Подходит для лица и тела", "Potrivit pentru față și corp"), 
      desc: t("Аппарат эффективно работает с различными зонами: лицо, живот, ноги, спина.", "Dispozitivul lucrează eficient cu diverse zone: față, abdomen, picioare, spate.") 
    },
    { 
      title: t("Естественное омоложение кожи", "Întinerire naturală a pielii"), 
      desc: t("Активирует процессы обновления и улучшает качество кожи.", "Activează procesele de reînnoire și îmbunătățește calitatea pielii.") 
    },
  ];

  // Helper to render the text content for each advantage
  const renderTextContent = (title: string, desc: string, i: number, alignRight: boolean) => (
    <div key={i} className={`rv d${i + 1} ${alignRight ? 'md:text-right' : 'md:text-left'} space-y-2.5`}>
      <h3 className="text-[#ff91a4] font-black text-2xl md:text-3xl leading-tight">
        {title}
      </h3>
      <p className="text-[#832734] font-medium text-[15px] md:text-base leading-relaxed opacity-90">
        {desc}
      </p>
    </div>
  );

  return (
    <section id="advantages" className="py-16 md:py-24 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="rv text-center text-4xl md:text-5xl font-black text-[#832734] mb-12 md:mb-20 tracking-tight">
          {t("Преимущества ICOONE.", "Avantajele ICOONE.")}
        </h2>

        {/* --- WEB LAYOUT (Screens larger than md: 768px) --- */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-x-12 lg:gap-x-20 items-center justify-items-center">
          
          {/* Left Column Text (Align Right) */}
          <div className="flex flex-col gap-16 order-1">
            {advantages.slice(0, 3).map((adv, i) => renderTextContent(adv.title, adv.desc, i, true))}
          </div>

          {/* Center Machine Image (Contained and naturally sized) */}
          <div className="rv order-2 w-auto max-w-[340px] lg:max-w-[420px] mx-auto px-4">
            <img 
              src={machineImage} 
              alt="ICOONE Machine" 
              className="w-full h-auto object-contain" // object-contain ensures the full machine is visible
            />
          </div>

          {/* Right Column Text (Align Left) */}
          <div className="flex flex-col gap-16 order-3">
            {advantages.slice(3, 6).map((adv, i) => renderTextContent(adv.title, adv.desc, i + 3, false))}
          </div>
        </div>

        {/* --- MOBILE LAYOUT (Screens smaller than md: 768px) --- */}
        {/* We hide the web grid and show a clean card grid without the image */}
        <div className="grid md:hidden grid-cols-1 gap-6">
          {advantages.map((adv, i) => (
            <div 
              key={i} 
              className={`rv d${i + 1} p-8 border border-pink-100 rounded-[40px] bg-[#fffafb] flex flex-col justify-center min-h-[260px]`}
            >
              <h3 className="text-[#ff91a4] font-black text-2xl mb-4 leading-tight">
                {adv.title}
              </h3>
              <p className="text-[#832734] font-medium text-[15px] leading-relaxed opacity-90">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AdvantagesSection;