import { useState, useEffect, FormEvent } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
  selectedService: string;
}

const WORKER_URL = "https://icoone-email-handler.v-fleure.workers.dev";

const ContactsSection = ({ selectedService }: Props) => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (selectedService && selectedService !== "General Inquiry") {
      setMsg(`Buna, doresc detalii despre masajul "${selectedService}".`);
    }
  }, [selectedService]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    setSending(true);

    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
    const trimmedMsg = msg.trim() || "Fără mesaj";
    const service = selectedService || "General";

    // 1. Send to Cloudflare Worker (email delivery)
    try {
      await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          contact: trimmedContact,
          message: trimmedMsg,
          service,
        }),
      });
    } catch {
      // Cloudflare failed silently — WhatsApp below still fires
    }

    // 2. Always open WhatsApp with pre-filled message
    const whatsappText = `🔥 LEAD NOU (${service}):\n👤 Nume: ${trimmedName}\n📞 Contact: ${trimmedContact}\n💬 Mesaj: ${trimmedMsg}`;
    window.open(`https://wa.me/37368323861?text=${encodeURIComponent(whatsappText)}`, "_blank");

    // 3. Reset form after both actions triggered
    setSent(true);
    setName("");
    setContact("");
    setMsg("");
    setSending(false);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contacts" className="bg-pink-bg py-12 md:py-20 px-5 md:px-16">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Contact info + Map */}
        <div className="rv bg-card rounded-2xl p-6 md:p-8 shadow-md flex flex-col gap-5">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-pink-mid mb-1.5">
              {t("Контактеле ноастре", "Contactele noastre").toUpperCase()}
            </div>
            <a href="tel:+37368323861" className="text-2xl md:text-3xl font-black text-pink-deep block mb-2">+373 68 323 861</a>
            <div className="text-base text-foreground">
              {t("Адрес", "Adresă")}: <span className="font-bold text-pink-deep">{t("Кишинёв, ул. Букурешть 64", "Chișinău, str. București 64")}</span>
            </div>
            <div className="text-base text-foreground mt-1">
              {t("Режим работы", "Program")}: <span className="font-bold text-pink-deep">{t("Пн–Сб: 09:00 – 18:00", "Lun–Sâ: 09:00 – 18:00")}</span>
            </div>
          </div>
          {/* Map */}
          <div className="rounded-xl overflow-hidden flex-1 min-h-[220px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.123456789!2d28.8322!3d47.0205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDAxJzEzLjgiTiAyOMKwNDknNTUuOSJF!5e0!3m2!1sen!2smd!4v123456789"
              title="ICOONE Location"
              className="w-full h-full border-none block min-h-[220px]"
            />
          </div>
        </div>

        {/* Right: Lead Form */}
        <div className="rv bg-card rounded-2xl p-6 md:p-8 shadow-md flex flex-col">
          <div id="lead-form-anchor" />
          <h2 className="text-xl md:text-2xl font-black text-pink-deep mb-6 text-center">
            {t("Отправьте заявку", "Trimite o cerere")}
          </h2>
          {sent && (
            <div className="bg-pink-bg text-pink-deep text-center font-bold py-3 px-4 rounded-xl mb-4">
              {t("Спасибо! Мы свяжемся с вами в ближайшее время.", "Mulțumim! Vă vom contacta în curând.")}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 flex-1">
            <input type="hidden" value={selectedService} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("Имя*", "Nume*")}
              required
              maxLength={100}
              className="w-full px-5 py-4 border-2 border-pink-bg rounded-2xl font-nunito text-base text-foreground bg-pink-bg outline-none focus:border-pink-deep focus:bg-card transition-colors"
            />
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={t("Телефон*", "Telefon*")}
              required
              maxLength={255}
              className="w-full px-5 py-4 border-2 border-pink-bg rounded-2xl font-nunito text-base text-foreground bg-pink-bg outline-none focus:border-pink-deep focus:bg-card transition-colors"
            />
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder={t("Сообщение", "Mesaj")}
              rows={4}
              maxLength={1000}
              className="w-full px-5 py-4 border-2 border-pink-bg rounded-2xl font-nunito text-base text-foreground bg-pink-bg outline-none focus:border-pink-deep focus:bg-card resize-y min-h-[100px] transition-colors"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-green-500 text-white border-none py-4 rounded-full font-nunito text-base font-black cursor-pointer hover:bg-green-600 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-auto"
            >
              {sending
                ? t("Отправка...", "Se trimite...")
                : t("Отправить", "Trimite")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
