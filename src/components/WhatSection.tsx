import { useLanguage } from "@/hooks/useLanguage";

const WhatSection = () => {
  const { t } = useLanguage();
  return (
    <section id="what" className="bg-pink-bg mt-4 py-12 md:py-20 px-5 md:px-16 text-center">
      <h2 className="rv text-[1.7rem] md:text-[2.9rem] font-black text-pink-deep mb-7">
        {t("Что такое массаж", "Ce este masajul")}{" "}
        <span className="text-pink-mid bg-card px-3 py-0.5 rounded-[10px] inline-block">ICOONE</span> ?
      </h2>
      <div className="rv d1 max-w-[800px] mx-auto text-[1.1rem] leading-[1.85] text-pink-deep text-left space-y-2">
        <p>{t("ICOONE — это инновационная технология аппаратного массажа, разработанная в Италии.", "ICOONE este o tehnologie inovatoare de masaj aparativ, dezvoltată în Italia.")}</p>
        <p className="font-bold">
          {t("Аппарат использует запатентованные микростимулирующие ролики, которые мягко воздействуют на кожу, мышцы и соединительные ткани.", "Dispozitivul utilizează role microstimulante brevetate, care acționează delicat asupra pielii, mușchilor și țesuturilor conjunctive.")}
        </p>
        <p>
          {t("Технология воздействует глубоко, но деликатно, поэтому подходит даже для чувствительных зон лица и тела.", "Tehnologia acționează profund, dar delicat, astfel încât este potrivită chiar și pentru zonele sensibile ale feței și corpului.")}
        </p>
      </div>
    </section>
  );
};

export default WhatSection;
