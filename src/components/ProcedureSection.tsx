import { useState, useRef, useCallback, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const vids = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
  "/videos/video4.mp4",
];

const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    {direction === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 6 15 12 9 18" />}
  </svg>
);

const ProcedureSection = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Autoplay current video
  useEffect(() => {
    const v = videoRefs.current[current];
    if (v) {
      v.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  }, [current]);

  const changeVideo = useCallback(
    (dir: number) => {
      const cur = videoRefs.current[current];
      if (cur) { cur.pause(); cur.currentTime = 0; }
      const next = (current + dir + vids.length) % vids.length;
      setCurrent(next);
    },
    [current]
  );

  const goTo = useCallback(
    (i: number) => {
      const cur = videoRefs.current[current];
      if (cur) { cur.pause(); cur.currentTime = 0; }
      setCurrent(i);
    },
    [current]
  );

  const togglePlay = () => {
    const v = videoRefs.current[current];
    if (v) {
      if (v.paused) {
        v.play();
        setPlaying(true);
      } else {
        v.pause();
        setPlaying(false);
      }
    }
  };

  const steps = [
    t("Специалист определяет зоны воздействия.", "Specialistul determină zonele de acțiune."),
    t("На кожу воздействуют специальные ролики аппарата.", "Rolele speciale ale dispozitivului acționează asupra pielii."),
    t("Микростимуляция активирует кровообращение и лимфодренаж.", "Microstimularea activează circulația sanguină și drenajul limfatic."),
    t("Процедура длится примерно 30–60 минут.", "Procedura durează aproximativ 30–60 de minute."),
  ];

  return (
    <div id="procedure" className="bg-pink-bg py-10 md:py-[70px] px-4 md:px-16">
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-7 max-w-[1200px] mx-auto">
        {/* Desktop prev arrow */}
        <button onClick={() => changeVideo(-1)} className="hidden md:flex w-[46px] h-[46px] rounded-full bg-pink-deep text-white items-center justify-center flex-shrink-0 shadow-md hover:scale-110 transition-all border-none cursor-pointer">
          <ArrowIcon direction="left" />
        </button>

        {/* Video card */}
        <div className="relative w-full md:w-[420px] h-[360px] md:h-[560px] flex-shrink-0 rounded-lg overflow-hidden bg-dark">
          {vids.map((src, i) => (
            <video
              key={i}
              ref={(el) => { videoRefs.current[i] = el; }}
              src={src}
              loop
              muted
              playsInline
              onClick={togglePlay}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              style={{ display: i === current ? "block" : "none" }}
            />
          ))}
          {/* Play/Pause overlay */}
          <div onClick={togglePlay} className="absolute inset-0 flex items-center justify-center cursor-pointer z-[5]">
            {!playing ? (
              <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg">
                <circle cx="32" cy="32" r="30" fill="rgba(131,39,52,0.75)" />
                <polygon points="26,20 26,44 46,32" fill="white" />
              </svg>
            ) : (
              <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg opacity-0 hover:opacity-100 transition-opacity">
                <circle cx="32" cy="32" r="30" fill="rgba(131,39,52,0.75)" />
                <rect x="22" y="20" width="7" height="24" rx="2" fill="white" />
                <rect x="35" y="20" width="7" height="24" rx="2" fill="white" />
              </svg>
            )}
          </div>
          {/* Dots */}
          <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {vids.map((_, i) => (
              <div key={i} onClick={() => goTo(i)} className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${i === current ? "bg-pink-deep scale-125" : "bg-white/50"}`} />
            ))}
          </div>
        </div>

        {/* Mobile arrows */}
        <div className="flex md:hidden gap-4 justify-center">
          <button onClick={() => changeVideo(-1)} className="w-[46px] h-[46px] rounded-full bg-pink-deep text-white flex items-center justify-center shadow-md border-none cursor-pointer">
            <ArrowIcon direction="left" />
          </button>
          <button onClick={() => changeVideo(1)} className="w-[46px] h-[46px] rounded-full bg-pink-deep text-white flex items-center justify-center shadow-md border-none cursor-pointer">
            <ArrowIcon direction="right" />
          </button>
        </div>

        {/* Desktop next arrow */}
        <button onClick={() => changeVideo(1)} className="hidden md:flex w-[46px] h-[46px] rounded-full bg-pink-deep text-white items-center justify-center flex-shrink-0 shadow-md hover:scale-110 transition-all border-none cursor-pointer">
          <ArrowIcon direction="right" />
        </button>

        {/* Text */}
        <div className="flex-1 max-w-[500px] w-full">
          <div className="inline-block bg-pink-deep text-white text-lg font-extrabold px-5 py-2.5 rounded-full mb-5">
            {t("Как проходит процедура ?", "Cum decurge procedura ?")}
          </div>
          <p className="text-base text-pink-deep leading-relaxed mb-4">
            {t("Процедура проходит в комфортной и расслабляющей атмосфере.", "Procedura are loc într-o atmosferă confortabilă și relaxantă.")}
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-1.5">
            {steps.map((s, i) => (
              <li key={i} className="text-[0.97rem] text-pink-deep leading-relaxed">{s}</li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground italic mb-6 leading-relaxed">
            {t("Уже после первых сеансов кожа становится более гладкой, а тело — более подтянутым.", "Deja după primele ședințe pielea devine mai netedă, iar corpul — mai tonifiat.")}
          </p>
          <a href="#book" className="inline-block bg-pink-deep text-white px-8 py-3 rounded-full font-extrabold text-base hover:bg-pink-mid hover:-translate-y-0.5 transition-all">
            {t("Записаться", "Programează-te")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProcedureSection;
