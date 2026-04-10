import { useLanguage } from "@/hooks/useLanguage";

const ContactInfoSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contacts" className="bg-pink-bg py-12 md:py-20 px-5 md:px-16">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="rv text-center text-[1.7rem] md:text-[2.9rem] font-black text-pink-deep mb-10">
          {t("Контакты", "Contacte")}
        </h2>
        <div className="rv grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Contact info */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6">

            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-pink-mid mb-1">
                {t("Адрес", "Adresă")}
              </div>
              <a
                href="https://maps.google.com/?q=Strada+Bucuresti+64+Chisinau+Moldova"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-pink-deep hover:text-pink-mid transition-colors"
              >
                {t("Кишинёв, ул. Букурешть 64", "Chișinău, str. București 64")}
              </a>
            </div>

            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-pink-mid mb-1">
                {t("Телефон", "Telefon")}
              </div>
              <a href="tel:+37368323861" className="text-2xl md:text-3xl font-black text-pink-deep block hover:text-pink-mid transition-colors">
                +373 68 323 861
              </a>
              <p className="text-sm text-muted-foreground mt-1">
                {t("Ответим на все вопросы и запишем вас", "Răspundem la toate întrebările și vă programăm")}
              </p>
            </div>

            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-pink-mid mb-3">
                {t("Режим работы", "Program de lucru")}
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { day: t("Пн–Пт", "Lun–Vin"), hours: "09:00–20:00", closed: false },
                  { day: t("Суббота", "Sâmbătă"), hours: "10:00–18:00", closed: false },
                  { day: t("Воскресенье", "Duminică"), hours: t("Выходной", "Zi liberă"), closed: true },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center px-4 py-2.5 rounded-lg bg-pink-bg text-sm"
                  >
                    <span className="font-semibold text-foreground">{row.day}</span>
                    <span className={row.closed ? "font-black text-pink-deep" : "font-semibold text-foreground"}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Google Map */}
          <div className="rv bg-card rounded-2xl overflow-hidden shadow-sm min-h-[380px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.2758!2d28.83220!3d47.02050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c3628b769a1%3A0x37d1d6305749dd3a!2sStrada%20Bucure%C8%99ti%2064%2C%20Chi%C8%99in%C4%83u%2C%20Moldova!5e0!3m2!1sru!2smd!4v1712750000000"
              title="ICOONE EFFLEURE Location"
              className="w-full h-full border-none block"
              style={{ minHeight: "380px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
