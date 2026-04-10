import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const BASE = "/images";

// Carousel images for the center panel
const carouselImages = [
  { src: `${BASE}/img4.png`, alt: "ICOONE procedure" },
  { src: `${BASE}/img5.png`, alt: "ICOONE result" },
  { src: `${BASE}/img6.png`, alt: "ICOONE body" },
  { src: `${BASE}/img7.png`, alt: "ICOONE treatment" },
  { src: `${BASE}/img8.png`, alt: "ICOONE session" },
];

const AdvantagesSection = () => {
  const { t } = useLanguage();
  const [imgIdx, setImgIdx] = useState(0);

  const leftItems = [
    { title: [t("Глубокая", "Stimulare"), t("стимуляция тканей", "profundă a țesuturilor")], desc: t("Микро-ролики одновременно стимулируют тысячи точек кожи, улучшая микроциркуляцию.", "Micro-rolele stimulează simultan mii de puncte ale pielii, îmbunătățind microcirculația.") },
    { title: [t("Улучшение", "Îmbunătățirea"), t("лимфотока", "drenajului limfatic")], desc: t("Помогает уменьшить отёки и ускоряет выведение лишней жидкости.", "Ajută la reducerea edemelor și accelerează eliminarea lichidului în exces.") },
    { title: [t("Моделирование", "Modelare"), t("фигуры", "corporală")], desc: t("Процедура способствует уменьшению объёмов и повышению упругости кожи.", "Procedura contribuie la reducerea volumelor și la creșterea elasticității pielii.") },
  ];
  const rightItems = [
    { title: [t("Без боли и", "Fără durere și"), t("реабилитации", "recuperare")], desc: t("Массаж проходит комфортно и не требует восстановления.", "Masajul se desfășoară confortabil și nu necesită recuperare.") },
    { title: [t("Подходит для", "Potrivit pentru"), t("лица и тела", "față și corp")], desc: t("Аппарат эффективно работает с различными зонами: лицо, живот, ноги, спина.", "Dispozitivul lucrează eficient cu diverse zone: față, abdomen, picioare, spate.") },
    { title: [t("Естественное", "Întinerire"), t("омоложение кожи", "naturală a pielii")], desc: t("Активирует процессы обновления и улучшает качество кожи.", "Activează procesele de reînnoire și îmbunătățește calitatea pielii.") },
  ];

  const renderItem = (item: { title: string[]; desc: string }, i: number) => (
    <div key={i} className={`rv d${i + 1}`}>
      <h3 className="text-xl md:text-3xl font-extrabold text-pink-mid leading-tight mb-2.5">
        {item.title[0]}<br />{item.title[1]}
      </h3>
      <p className="text-base text-pink-deep leading-relaxed">{item.desc}</p>
    </div>
  );

  return (
    <section id="advantages" className="bg-card py-12 md:py-20 px-5 md:px-24">
      <h2 className="rv text-center text-[1.7rem] md:text-[2.9rem] font-black text-pink-deep mb-9 md:mb-[70px]">
        {t("Преимущества ICOONE.", "Avantajele ICOONE.")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px_1fr] gap-8 md:gap-x-16 items-center max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-12 order-2 md:order-none">{leftItems.map(renderItem)}</div>

        {/* Center Carousel */}
        <div className="rv order-first md:order-none flex flex-col items-center max-w-[260px] md:max-w-none mx-auto w-full">
          <div className="relative rounded-3xl overflow-hidden w-full bg-pink-bg" style={{ aspectRatio: "3/4" }}>
            {carouselImages.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500"
                style={{ opacity: i === imgIdx ? 1 : 0 }}
              />
            ))}
            {/* Prev / Next overlay arrows */}
            <button
              onClick={() => setImgIdx((p) => (p - 1 + carouselImages.length) % carouselImages.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center hover:bg-white transition-colors z-10"
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-pink-deep">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button
              onClick={() => setImgIdx((p) => (p + 1) % carouselImages.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center hover:bg-white transition-colors z-10"
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-pink-deep">
                <polyline points="9 6 15 12 9 18"/>
              </svg>
            </button>
          </div>
          {/* Dots */}
          <div className="flex gap-2 mt-3">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`rounded-full transition-all ${i === imgIdx ? "w-5 h-2.5 bg-pink-deep" : "w-2.5 h-2.5 bg-pink-mid/40"}`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12 order-3 md:order-none">{rightItems.map(renderItem)}</div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
