import { useState, useEffect, FormEvent } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
  selectedService: string;
}

const WORKER_URL = "https://icoonemassagechisinau.com/api/submit-lead";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s\-(). ]{8,20}$/;

function getGclid(): string {
  try { return new URLSearchParams(window.location.search).get("gclid") ?? ""; }
  catch { return ""; }
}

const LeadFormSection = ({ selectedService }: Props) => {
  const { t } = useLanguage();
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [msg,     setMsg]     = useState("");
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState(false);
  const [nameErr,  setNameErr]  = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  useEffect(() => {
    if (selectedService && selectedService !== "General Inquiry") {
      setMsg(t(
        `Здравствуйте, хочу узнать подробнее о массаже "${selectedService}".`,
        `Bună ziua, doresc detalii despre masajul "${selectedService}".`
      ));
    }
  }, [selectedService]);

  const validate = (): boolean => {
    let ok = true;
    if (name.trim().length < 2) { setNameErr(t("Миним 2 символа", "Minim 2 caractere")); ok = false; } else setNameErr("");
    if (!phone.trim()) { setPhoneErr(t("Обязательное поле", "Câmp obligatoriu")); ok = false; }
    else if (!PHONE_RE.test(phone.trim())) { setPhoneErr(t("Номер некорректен", "Număr incorect")); ok = false; }
    else setPhoneErr("");
    if (email.trim() && !EMAIL_RE.test(email.trim())) { setEmailErr(t("Email некорректен", "Email incorect")); ok = false; } else setEmailErr("");
    return ok;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true); setError(false);
    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(), email: email.trim() || undefined,
          phone: phone.trim(), message: msg.trim() || t("Без сообщения", "Fără mesaj"),
          service: selectedService || "General", gclid: getGclid(),
        }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const json = await res.json() as { ok: boolean };
      if (!json.ok) throw new Error("nok");
      setSent(true); setName(""); setEmail(""); setPhone(""); setMsg("");
      setTimeout(() => setSent(false), 8000);
    } catch { setError(true); }
    finally { setSending(false); }
  };

  const fieldCls = (err: string) =>
    `w-full px-5 py-3.5 rounded-xl font-nunito text-base text-foreground bg-card outline-none transition-shadow border ${
      err ? "border-red-400 focus:ring-2 focus:ring-red-300" : "border-transparent focus:ring-2 focus:ring-pink-deep/30"
    }`;

  return (
    <section id="book" className="bg-card py-12 md:py-20 px-5 md:px-16">
      <div className="max-w-[580px] mx-auto">
        <h2 className="rv text-center text-[1.7rem] md:text-[2.9rem] font-black text-pink-deep mb-3">
          {t("Записаться на процедуру", "Programează-te la procedură")}
        </h2>
        <p className="rv text-center text-base text-muted-foreground mb-8">
          {t("Оставьте заявку, и мы свяжемся с вами в ближайшее время", "Lăsați o cerere și vă vom contacta cât mai curând")}
        </p>
        <div className="rv bg-pink-bg rounded-2xl p-6 md:p-10 shadow-sm">
          <div id="lead-form-anchor" />
          {sent && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-center font-bold py-4 px-4 rounded-xl mb-6 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              {t("Спасибо! Мы свяжемся с вами в ближайшее время.", "Mulțumim! Vă vom contacta în curând.")}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-center py-3 px-4 rounded-xl mb-6 text-sm font-semibold">
              Eroare la trimitere. Vă rugăm să ne sunați: +373 68 323 861
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <input type="hidden" value={selectedService} />
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-pink-mid mb-1.5">{t("Имя *", "Nume *")}</label>
              <input type="text" value={name} onChange={(e) => { setName(e.target.value); if (nameErr) setNameErr(""); }}
                placeholder={t("Ваше имя", "Numele dumneavoastră")} maxLength={100} className={fieldCls(nameErr)} />
              {nameErr && <p className="text-red-500 text-xs mt-1 ml-1">{nameErr}</p>}
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-pink-mid mb-1.5">{t("Telefon *", "Telefon *")}</label>
              <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); if (phoneErr) setPhoneErr(""); }}
                placeholder="+373 XX XXX XXX" maxLength={20} className={fieldCls(phoneErr)} />
              {phoneErr && <p className="text-red-500 text-xs mt-1 ml-1">{phoneErr}</p>}
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-pink-mid mb-1.5">{t("Email (опционально)", "Email (opțional)")}</label>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (emailErr) setEmailErr(""); }}
                placeholder="example@email.com" maxLength={255} className={fieldCls(emailErr)} />
              {emailErr && <p className="text-red-500 text-xs mt-1 ml-1">{emailErr}</p>}
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-pink-mid mb-1.5">{t("Сообщение", "Mesaj")}</label>
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)}
                placeholder={t("Ваш вопрос или пожелание", "Întrebarea sau dorința dumneavoastră")}
                rows={3} maxLength={1000}
                className="w-full px-5 py-3.5 rounded-xl font-nunito text-base text-foreground bg-card outline-none focus:ring-2 focus:ring-pink-deep/30 resize-none transition-shadow border border-transparent" />
            </div>
            <button type="submit" disabled={sending}
              className="w-full bg-pink-deep text-white border-none py-4 rounded-full font-nunito text-base font-black cursor-pointer hover:bg-pink-mid hover:-translate-y-0.5 transition-all disabled:opacity-60 mt-1 shadow-sm">
              {sending ? t("Отправка...", "Se trimite...") : t("Отправить заявку", "Trimite cererea")}
            </button>
            <p className="text-xs text-center text-muted-foreground -mt-2">
              {t("Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности", "Apăsând butonul, acceptați politica de confidențialitate")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;
