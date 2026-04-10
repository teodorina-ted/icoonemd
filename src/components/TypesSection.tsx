import { useLanguage } from "@/hooks/useLanguage";

const TypesSection = ({ onSelectService }: { onSelectService: (name: string) => void }) => {
  const { t } = useLanguage();

  const types = [
    { ru: "Расслабляющий массаж", ro: "Masaj relaxant", descRu: "Снимет напряжение и улучшит общее самочувствие.", descRo: "Elimină tensiunea și îmbunătățește starea generală de bine." },
    { ru: "Антицеллюлитный массаж", ro: "Masaj anticelulitic", descRu: "Поможет уменьшить проявления целлюлита и улучшить состояние кожи.", descRo: "Ajută la reducerea celulitei și îmbunătățirea aspectului pielii." },
    { ru: "Моделирующий массаж", ro: "Masaj modelator", descRu: "Улучшит контуры тела и поможет в борьбе с лишними объёмами.", descRo: "Îmbunătățește contururile corpului și ajută în lupta cu volumele în exces." },
    { ru: "Лимфодренажный массаж", ro: "Masaj limfodrenaj", descRu: "Улучшит лимфообращение и поможет уменьшить отёки.", descRo: "Îmbunătățește circulația limfatică și ajută la reducerea edemelor." },
    { ru: "Реабилитационный массаж", ro: "Masaj de reabilitare", descRu: "Поможет в восстановлении после физических нагрузок и травм.", descRo: "Ajută la recuperarea după efort fizic și traumatisme." },
    { ru: "Для улучшения кровообращения", ro: "Pentru îmbunătățirea circulației", descRu: "Стимулирует кровообращение и способствует общему оздоровлению организма.", descRo: "Stimulează circulația sanguină și contribuie la sănătatea generală a organismului." },
  ];

  const handleSelect = (typeName: string) => {
    onSelectService(typeName);
    setTimeout(() => {
      document.getElementById("lead-form-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <section id="types" className="bg-card py-12 md:py-20 px-5 md:px-16">
      <h2 className="rv text-center text-[1.7rem] md:text-[2.9rem] font-black text-pink-deep mb-12">
        {t("Виды массажа ICOONE.", "Tipuri de masaj ICOONE.")}
      </h2>
      <div className="rv grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-[1100px] mx-auto">
        {types.map((item, i) => {
          const name = t(item.ru, item.ro);
          return (
            <div key={i} className="bg-pink-bg rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col">
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <h3 className="text-lg font-extrabold text-pink-deep mb-2.5">{name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t(item.descRu, item.descRo)}</p>
                {/* Button pinned to bottom-right */}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleSelect(name)}
                    className="inline-flex items-center gap-1.5 bg-transparent text-pink-deep border-2 border-pink-deep px-4 py-2 rounded-full font-extrabold text-sm cursor-pointer hover:bg-pink-deep hover:text-white transition-all font-nunito"
                  >
                    {t("Узнать детали", "Află detalii")}
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <polyline points="6 3 11 8 6 13"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TypesSection;
