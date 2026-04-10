import { useState, useEffect, FormEvent } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
  selectedService: string;
}

const WORKER_URL = "https://icoone-email-handler.v-fleure.workers.dev";

const LeadFormSection = ({ selectedService }: Props) => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (selectedService && selectedService !== "General Inquiry") {
      setMsg(t(`Здравствуйте, я хочу узнать больше о процедуре "${selectedService}".`, 
               `Bună, doresc detalii despre masajul "${selectedService}".`));
    }
  }, [selectedService, t]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    setSending(true);
    setError(false);

    const payload = {
      name: name.trim(),
      contact: contact.trim(),
      message: msg.trim() || "Fără mesaj",
      service: selectedService || "General",
    };

    try {
      // 1. Încercăm trimiterea prin API
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("API Error");

      setSent(true);
      // Resetăm câmpurile doar la succes
      setName("");
      setContact("");
      setMsg("");
    } catch (err) {
      console.error("Submission failed:", err);
      setError(true); 
      // Chiar dacă eșuează email-ul, deschidem WhatsApp ca fallback
      const whatsappText = `🔥 LEAD NOU (${payload.service}):\n👤 Nume: ${payload.name}\n📞 Contact: ${payload.contact}\n💬 Mesaj: ${payload.message}`;
      window.open(`https://wa.me/37368323861?text=${encodeURIComponent(whatsappText)}`, "_blank");
    } finally {
      setSending(false);
      setTimeout(() => { setSent(false); setError(false); }, 6000);
    }
  };

  return (
    <section id="book" className="py-10 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="rv bg-white rounded-[35px] shadow-xl p-8 md:p-12 border border-pink-50">
          
          <h2 className="text-2xl md:text-3xl font-black text-[#832734] mb-8 text-center uppercase">
            {t("Записаться на процедуру", "Înscriere la procedură")}
          </h2>

          {/* Mesaj de Succes */}
          {sent && (
            <div className="bg-green-50 text-green-700 text-center font-bold py-4 px-6 rounded-2xl mb-6 border border-green-100">
              {t("Спасибо! Ваša заявка отправлена.", "Mulțumim! Cererea a fost trimisă.")}
            </div>
          )}

          {/* Mesaj de Eroare */}
          {error && (
            <div className="bg-red-50 text-[#832734] text-center font-bold py-4 px-6 rounded-2xl mb-6 border border-red-100">
              {t("Ошибка при отправке. Пожалуйста, позвоните нам: +373 68 323 861", "Eroare la trimitere. Vă rugăm să ne sunați: +373 68 323 861")}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t("Имя*", "Nume*")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-2xl bg-[#fff5f6] text-[#832734] font-bold outline-none border-2 border-transparent focus:border-[#ff91a4] transition-all"
              />
              <input
                type="text"
                placeholder={t("Телефон*", "Telefon*")}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-2xl bg-[#fff5f6] text-[#832734] font-bold outline-none border-2 border-transparent focus:border-[#ff91a4] transition-all"
              />
            </div>
            
            <textarea
              placeholder={t("Сообщение", "Mesaj")}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={3}
              className="w-full px-6 py-4 rounded-2xl bg-[#fff5f6] text-[#832734] font-bold outline-none border-2 border-transparent focus:border-[#ff91a4] transition-all resize-none"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#25D366] text-white py-4 rounded-full text-lg font-black hover:bg-[#128C7E] transition-all disabled:opacity-50"
            >
              {sending ? t("Отправка...", "Se trimite...") : t("ОТПRAVITI ЧЕРЕЗ WHATSAPP", "PROGRAMARE PRIN WHATSAPP")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;