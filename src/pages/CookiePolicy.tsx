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
        <h1 className="text-3xl font-black text-pink-deep mb-8">{t("Политика Cookie", "Politica Cookie")}</h1>
        <div className="prose prose-sm max-w-none text-foreground space-y-4">
          <p>{t("Дата вступления в силу: 1 января 2026 г.", "Data intrării în vigoare: 1 ianuarie 2026.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("1. Что такое Cookie", "1. Ce sunt cookie-urile")}</h2>
          <p>{t("Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении нашего сайта.", "Cookie-urile sunt fișiere text mici care sunt salvate pe dispozitivul dumneavoastră atunci când vizitați site-ul nostru.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("2. Какие Cookie мы используем", "2. Ce cookie-uri folosim")}</h2>
          <p>{t("Мы используем только технически необходимые Cookie для запоминания ваших настроек (например, выбор языка и согласие на использование Cookie).", "Folosim doar cookie-uri tehnic necesare pentru a reține setările dumneavoastră (de exemplu, alegerea limbii și consimțământul privind cookie-urile).")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("3. Управление Cookie", "3. Gestionarea cookie-urilor")}</h2>
          <p>{t("Вы можете удалить или заблокировать Cookie через настройки вашего браузера. Обратите внимание, что это может повлиять на работу сайта.", "Puteți șterge sau bloca cookie-urile prin setările browserului dumneavoastră. Rețineți că acest lucru poate afecta funcționarea site-ului.")}</p>
          <h2 className="text-xl font-bold text-pink-deep">{t("4. Контакты", "4. Contact")}</h2>
          <p>EFFLEURE S.R.L. · IDNO 1025606008701</p>
          <p>Email: icoone.md@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

const CookiePolicy = () => (
  <LanguageProvider>
    <Content />
  </LanguageProvider>
);

export default CookiePolicy;
