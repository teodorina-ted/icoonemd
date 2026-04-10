import { useLanguage } from "@/hooks/useLanguage";

const ContactInfoSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contacts" className="py-8 md:py-12 px-4 md:px-6">
      {/* Reduced max-width to 4xl for a more compact desktop look */}
      <div className="max-w-4xl mx-auto">
        <h2 className="rv text-center text-2xl md:text-3xl font-black text-[#832734] mb-6 md:mb-8 tracking-tight uppercase">
          {t("Контакты", "Contacte")}
        </h2>

        {/* Responsive container: stacks on mobile, side-by-side on desktop */}
        <div className="rv flex flex-col md:flex-row bg-white rounded-[25px] md:rounded-[35px] shadow-lg overflow-hidden border border-pink-50 max-h-none md:max-h-[450px]">
          
          {/* Left Side: Contact details */}
          <div className="w-full md:w-[45%] p-6 md:p-8 flex flex-col justify-center">
            <div className="space-y-6 md:space-y-8">
              
              {/* Address */}
              <div>
                <h4 className="text-[#832734] font-black text-lg mb-1 tracking-tight">
                  {t("Адрес", "Adresă")}
                </h4>
                <p className="text-[#ff91a4] text-base md:text-lg font-bold">
                  {t("улица Букурешть 64", "strada București 64")}
                </p>
              </div>

              {/* Phone */}
              <div>
                <h4 className="text-[#832734] font-black text-lg mb-1 tracking-tight">
                  {t("Телефон", "Telefon")}
                </h4>
                <a 
                  href="tel:+37368323861" 
                  className="text-[#832734] text-2xl md:text-3xl font-black block hover:opacity-80 transition-opacity"
                >
                  +373 68 323 861
                </a>
              </div>

              {/* Working Hours */}
              <div>
                <h4 className="text-[#832734] font-black text-lg mb-3 tracking-tight">
                  {t("Режим работы", "Program de lucru")}
                </h4>
                <div className="space-y-2">
                  {[
                    { day: t("Пн–Пт", "Lun–Vin"), hours: "09:00–20:00", isPink: true },
                    { day: t("Суббота", "Sâmbătă"), hours: "10:00–18:00", isPink: true },
                    { day: t("Воскресенье", "Duminică"), hours: t("Выходной", "Zi liberă"), isPink: false },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base font-bold ${
                        row.isPink ? "bg-[#fff5f6] text-[#832734]" : "text-[#832734] opacity-50"
                      }`}
                    >
                      <span>{row.day}</span>
                      <span>{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Map */}
          <div className="w-full md:w-[55%] h-[250px] md:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.155700201314!2d28.83182881561!3d47.0224213791501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c368d90479b%3A0xc3f8e6b36098670a!2sStrada%20Bucure%C8%99ti%2064%2C%20Chi%C8%99in%C4%83u%202012%2C%20Moldova!5e0!3m2!1sen!2s!4v1647425400000!5m2!1sen!2s"
              title="ICOONE Location"
              className="w-full h-full border-none block"
              allowFullScreen
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;