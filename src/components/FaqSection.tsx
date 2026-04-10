import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const FaqSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: t("Какие проблемы помогает решить ICOONE?", "Ce probleme ajută să rezolve ICOONE?"),
      a: (
        <>
          <p>{t("Технология ICOONE стимулирует кожу и подкожные ткани, улучшая кровообращение и лимфоток. Процедура помогает при:", "Tehnologia ICOONE stimulează pielea și țesuturile subcutanate, îmbunătățind circulația sanguină și limfatică. Procedura ajută la:")}</p>
          <ul className="list-disc pl-4 mt-1.5 space-y-1">
            {[
              t("отёчности и задержке жидкости", "edem și retenție de lichide"),
              t("проявлениях целлюлита", "manifestări de celulită"),
              t("локальных жировых отложениях", "depozite locale de grăsime"),
              t("снижении упругости кожи", "scăderea elasticității pielii"),
              t("ухудшении качества кожи", "deteriorarea calității pielii"),
            ].map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </>
      ),
    },
    { q: t("Насколько болезненна процедура?", "Cât de dureroasă este procedura?"), a: <><p>{t("Процедура ICOONE проходит комфортно и не вызывает боли.", "Procedura ICOONE decurge confortabil și nu provoacă durere.")}</p><p>{t("Большинство клиентов описывают ощущения как приятный и расслабляющий массаж.", "Majoritatea clienților descriu senzațiile ca un masaj plăcut și relaxant.")}</p></> },
    { q: t("Виден ли результат после первой процедуры?", "Se vede rezultatul după prima procedură?"), a: <><p>{t("Да, в некоторых случаях результат заметен уже после первого сеанса.", "Da, în unele cazuri rezultatul este vizibil deja după prima ședință.")}</p><p>{t("Для выраженного и стойкого результата рекомендуется курс из 8–10 сеансов.", "Pentru un rezultat pronunțat și stabil, se recomandă un curs de 8–10 ședințe.")}</p></> },
    { q: t("Что нужно взять с собой на процедуру?", "Ce trebuie să aduceți la procedură?"), a: <><p>{t("Процедура проводится в специальном тонком костюме для аппаратного массажа.", "Procedura se efectuează într-un costum special subțire pentru masaj aparativ.")}</p><p>{t("При необходимости костюм можно приобрести в нашем центре.", "Dacă este necesar, costumul poate fi achiziționat în centrul nostru.")}</p></> },
    { q: t("Сколько процедур нужно для результата?", "Câte proceduri sunt necesare pentru rezultat?"), a: <><p>{t("Рекомендуемый курс — 8–10 процедур. Первые улучшения заметны уже после 2–3 сеансов.", "Cursul recomandat este de 8–10 proceduri.")}</p><p>{t("Для поддержания результата — 1–2 процедуры в месяц.", "Pentru menținerea rezultatului, se recomandă 1–2 proceduri pe lună.")}</p></> },
    {
      q: t("Есть ли противопоказания?", "Există contraindicații?"),
      a: (
        <>
          <p>{t("Основные противопоказания:", "Principalele contraindicații:")}</p>
          <ul className="list-disc pl-4 mt-1.5 space-y-1">
            {[
              t("беременность и период лактации", "sarcina și perioada de alăptare"),
              t("онкологические заболевания", "boli oncologice"),
              t("тромбоз и варикозное расширение вен", "tromboză și varice"),
              t("кожные заболевания в острой фазе", "boli de piele în faza acută"),
              t("воспалительные процессы", "procese inflamatorii"),
            ].map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </>
      ),
    },
  ];

  return (
    <section id="faq" className="bg-pink-bg py-12 md:py-20 px-5 md:px-16 text-center">
      <h2 className="rv text-[1.7rem] md:text-[2.9rem] font-black text-pink-deep mb-2">{t("Часто задаваемые вопросы", "Întrebări frecvente")}</h2>
      <p className="rv text-base text-muted-foreground mb-10">{t("Ответы на самые популярные вопросы о процедуре ICOONE", "Răspunsuri la cele mai frecvente întrebări despre procedura ICOONE")}</p>
      <div className="rv max-w-[760px] mx-auto flex flex-col gap-3 text-left">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-sm">
            <div
              className="flex justify-between items-center px-6 py-4 cursor-pointer font-bold text-[0.97rem] text-pink-deep select-none hover:bg-pink-bg transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span>{faq.q}</span>
              <span className={`text-xl text-pink-mid flex-shrink-0 ml-4 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}>+</span>
            </div>
            <div className="overflow-hidden transition-all duration-400" style={{ maxHeight: openIndex === i ? 600 : 0 }}>
              <div className="px-6 pb-5 pt-1.5 text-sm text-muted-foreground leading-relaxed space-y-2">{faq.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
