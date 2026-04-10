import { useLanguage } from "@/hooks/useLanguage";

const WhySection = () => {
  const { t } = useLanguage();

  const items = [
    { title: t("Итальянские технологии", "Tehnologie Italiană"), desc: t("Мировой стандарт аппаратного массажа.", "Standardul mondial în masajul regenerativ.") },
    { title: t("Экспертность", "Expertiză"), desc: t("Сертифицированные специалисты с медицинским подходом.", "Specialiști certificați cu abordare medicală.") },
    { title: t("Клеточная стимуляция", "Stimulare celulară"), desc: t("Уникальная микростимуляция для упругости и тонуса кожи.", "Microstimulare unică pentru fermitatea și tonusul pielii.") },
  ];

  return (
    <section id="why" className="rv bg-card py-12 md:py-20 px-5 md:px-16 text-center">
      <h2 className="text-[1.7rem] md:text-[2.9rem] font-black text-pink-deep">{t("Почему именно мы?", "De ce noi?")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-[900px] mx-auto mt-10">
        {items.map((item, i) => (
          <div key={i} className="bg-pink-bg rounded-lg p-8 shadow-md text-center">
            <h4 className="text-lg font-extrabold text-pink-deep mb-2">{item.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
