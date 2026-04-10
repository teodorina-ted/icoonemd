import { useLanguage } from "@/hooks/useLanguage";

const PricesSection = () => {
  const { t } = useLanguage();

  const cards = [
    { tag: t("Разовая процедура", "Procedură unică"), dur: t("50 мин", "50 min"), desc: t("Полноценный сеанс аппаратного массажа", "Ședință completă de masaj aparativ"), price: "1 100 lei", per: t("за 1 процедуру", "pentru 1 procedură"), pkg: false },
    { tag: t("Пакет 6 процедур", "Pachet 6 proceduri"), dur: t("50 мин", "50 min"), desc: t("Максимальный результат и экономия", "Rezultat maxim și economie"), price: "6 200 lei", per: t("за 6 процедур", "pentru 6 proceduri"), pkg: true, economy: t("Экономия 400 лей", "Economie 400 lei") },
    { tag: t("Разовая процедура", "Procedură unică"), dur: t("30 мин", "30 min"), desc: t("Экспресс-процедура для поддержания результата", "Procedură express pentru menținerea rezultatului"), price: "690 lei", per: t("за 1 процедуру", "pentru 1 procedură"), pkg: false },
    { tag: t("Пакет 6 процедур", "Pachet 6 proceduri"), dur: t("30 мин", "30 min"), desc: t("Курс из 6 экспресс-процедур по 30 минут", "Curs de 6 proceduri express de câte 30 de minute"), price: "3 600 lei", per: t("за 6 процедур", "pentru 6 proceduri"), pkg: true, economy: t("Экономия 540 лей", "Economie 540 lei") },
  ];

  return (
    <section id="prices" className="bg-pink-bg py-12 md:py-20 px-5 md:px-16 text-center">
      <h2 className="rv text-[1.7rem] md:text-[2.9rem] font-black text-pink-deep mb-7">
        {t("Цены на массаж", "Prețuri pentru masaj")}{" "}
        <span className="text-pink-mid bg-card px-3 py-0.5 rounded-[10px] inline-block">ICOONE</span>
      </h2>
      <div className="rv grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-[1100px] mx-auto">
        {cards.map((c, i) => (
          <div key={i} className={`rounded-lg p-6 md:p-7 flex flex-col items-center gap-2.5 text-center shadow-md hover:-translate-y-1 transition-transform ${c.pkg ? "bg-pink-deep" : "bg-card"}`}>
            <div className={`text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full ${c.pkg ? "bg-white/20 text-white" : "text-pink-mid bg-pink-bg"}`}>
              {c.tag}
            </div>
            <div className={`text-3xl font-black ${c.pkg ? "text-white" : "text-pink-deep"}`}>{c.dur}</div>
            <div className={`text-sm leading-relaxed ${c.pkg ? "text-white/80" : "text-muted-foreground"}`}>{c.desc}</div>
            {c.economy && (
              <div className="text-xs font-bold bg-pink-mid text-white px-3 py-1 rounded-full">{c.economy}</div>
            )}
            <div className="mt-auto">
              <div className={`text-3xl font-black ${c.pkg ? "text-white" : "text-pink-deep"}`}>{c.price}</div>
              <div className={`text-xs ${c.pkg ? "text-white/70" : "text-muted-foreground"}`}>{c.per}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricesSection;
