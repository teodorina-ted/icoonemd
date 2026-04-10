import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";

const Content = () => {
  const { lang, toggle, t } = useLanguage();
  return (
    <div className="min-h-screen bg-background px-5 md:px-16 py-12">
      <div className="max-w-[800px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="text-pink-deep font-bold hover:underline">← {t("На главную", "Înapoi acasă")}</Link>
          <div
            onClick={toggle}
            className="w-10 h-10 rounded-full bg-pink-deep text-white flex items-center justify-center font-black text-sm cursor-pointer select-none"
          >
            {lang.toUpperCase()}
          </div>
        </div>
        <h1 className="text-3xl font-black text-pink-deep mb-8">{t("Условия и положения", "Termeni și condiții")}</h1>
        <div className="prose prose-sm max-w-none text-foreground space-y-4">
          <p>{t("Дата вступления в силу: 1 января 2026 г.", "Data intrării în vigoare: 1 ianuarie 2026.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("1. Общие положения", "1. Dispoziții generale")}</h2>
          <p>{t("Настоящие условия регулируют использование веб-сайта EFFLEURE и услуг, предлагаемых EFFLEURE S.R.L.", "Acești termeni reglementează utilizarea site-ului web EFFLEURE și a serviciilor oferite de EFFLEURE S.R.L.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("2. Услуги", "2. Servicii")}</h2>
          <p>{t("Мы предоставляем услуги аппаратного массажа ICOONE. Результаты могут варьироваться в зависимости от индивидуальных особенностей организма.", "Oferim servicii de masaj aparativ ICOONE. Rezultatele pot varia în funcție de caracteristicile individuale ale organismului.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("3. Запись и отмена", "3. Programare și anulare")}</h2>
          <p>{t("Запись на процедуру осуществляется через форму на сайте, по телефону или через WhatsApp. Отмена возможна не менее чем за 24 часа до назначенного времени.", "Programarea se face prin formularul de pe site, telefonic sau prin WhatsApp. Anularea este posibilă cu cel puțin 24 de ore înainte de ora stabilită.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("4. Оплата", "4. Plata")}</h2>
          <p>{t("Оплата производится на месте наличными или банковской картой. Цены указаны на сайте и могут быть изменены без предварительного уведомления.", "Plata se efectuează la fața locului, în numerar sau cu cardul bancar. Prețurile sunt afișate pe site și pot fi modificate fără notificare prealabilă.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("5. Ответственность", "5. Responsabilitate")}</h2>
          <p>{t("EFFLEURE S.R.L. не несёт ответственности за индивидуальные реакции на процедуры. Перед началом курса рекомендуется консультация со специалистом.", "EFFLEURE S.R.L. nu este responsabilă pentru reacțiile individuale la proceduri. Înainte de a începe un curs, se recomandă consultarea unui specialist.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("6. Контакты", "6. Contact")}</h2>
          <p>EFFLEURE S.R.L. · IDNO 1025606008701</p>
          <p>{t("ул. Букурешть 64, Кишинёв, Молдова", "str. București 64, Chișinău, Moldova")}</p>
          <p>Email: icoone.md@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

const TermsConditions = () => (
  <LanguageProvider>
    <Content />
  </LanguageProvider>
);

export default TermsConditions;
