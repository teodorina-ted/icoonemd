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
        <h1 className="text-3xl font-black text-pink-deep mb-8">{t("Политика конфиденциальности", "Politica de confidențialitate")}</h1>
        <div className="prose prose-sm max-w-none text-foreground space-y-4">
          <p>{t("Дата вступления в силу: 1 января 2026 г.", "Data intrării în vigoare: 1 ianuarie 2026.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("1. Сбор данных", "1. Colectarea datelor")}</h2>
          <p>{t("Мы собираем только те персональные данные, которые вы предоставляете добровольно через форму обратной связи на нашем сайте: имя, номер телефона/email и текст сообщения.", "Colectăm doar datele personale pe care ni le furnizați voluntar prin formularul de contact de pe site: nume, număr de telefon/email și textul mesajului.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("2. Использование данных", "2. Utilizarea datelor")}</h2>
          <p>{t("Ваши данные используются исключительно для связи с вами по поводу записи на процедуру или ответа на ваш запрос.", "Datele dumneavoastră sunt utilizate exclusiv pentru a vă contacta în legătură cu programarea unei proceduri sau pentru a răspunde la solicitarea dumneavoastră.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("3. Хранение данных", "3. Stocarea datelor")}</h2>
          <p>{t("Данные хранятся в защищённой среде и не передаются третьим лицам, за исключением случаев, предусмотренных законодательством Республики Молдова.", "Datele sunt stocate într-un mediu securizat și nu sunt transmise terților, cu excepția cazurilor prevăzute de legislația Republicii Moldova.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("4. Ваши права", "4. Drepturile dumneavoastră")}</h2>
          <p>{t("Вы имеете право запросить удаление ваших данных, написав нам на icoone.md@gmail.com.", "Aveți dreptul de a solicita ștergerea datelor dumneavoastră, scriindu-ne la icoone.md@gmail.com.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("5. Контакты", "5. Contact")}</h2>
          <p>EFFLEURE S.R.L. · IDNO 1025606008701</p>
          <p>{t("ул. Букурешть 64, Кишинёв, Молдова", "str. București 64, Chișinău, Moldova")}</p>
          <p>Email: icoone.md@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicy = () => (
  <LanguageProvider>
    <Content />
  </LanguageProvider>
);

export default PrivacyPolicy;
