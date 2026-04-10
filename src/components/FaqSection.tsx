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
    // Milky background #fffafb to match index.css
    <section id="faq" className="bg-[#fffafb] py-14 md:py-20 px-6 md:px-16 text-center">
      <div className="max-w-[780px] mx-auto">
        {/* Adjusted size: smaller, more elegant heading */}
        <h2 className="rv text-[1.5rem] md:text-[2.2rem] font-black text-[#832734] mb-2 uppercase tracking-tight">
          {t("Часто задаваемые вопросы", "Întrebări frecvente")}
        </h2>
        <p className="rv text-sm md:text-base text-[#832734] opacity-50 mb-10 font-medium">
          {t("Ответы на самые популярные вопросы о процедуре ICOONE", "Răspunsuri la cele mai frecvente întrebări despre procedura ICOONE")}
        </p>
        
        <div className="rv flex flex-col gap-3.5 text-left">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`group bg-white rounded-[28px] overflow-hidden transition-all duration-300 border border-transparent cursor-pointer hover:shadow-lg hover:-translate-y-0.5 ${
                openIndex === i ? "shadow-md border-[#ff91a4]/10" : "shadow-sm"
              }`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center px-6 py-4.5 md:px-8 md:py-5 select-none">
                <span className={`font-bold text-[0.95rem] md:text-lg transition-colors duration-300 ${
                  openIndex === i ? "text-[#832734]" : "text-[#832734]/80 group-hover:text-[#832734]"
                }`}>
                  {faq.q}
                </span>
                
                {/* Round Pink Spot for the + toggle */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4 ${
                  openIndex === i ? "bg-[#832734]" : "bg-[#fff5f6] group-hover:bg-[#ff91a4]/20"
                }`}>
                  <span className={`text-xl font-light leading-none transition-transform duration-300 ${
                    openIndex === i ? "text-white rotate-45" : "text-[#832734]"
                  }`}>
                    +
                  </span>
                </div>
              </div>
              
              <div 
                className="transition-all duration-500 ease-in-out overflow-hidden" 
                style={{ maxHeight: openIndex === i ? '500px' : '0px' }}
              >
                <div className="px-6 md:px-8 pb-6 pt-0 text-sm md:text-[0.95rem] text-[#832734] opacity-70 leading-relaxed space-y-2.5 font-medium">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;