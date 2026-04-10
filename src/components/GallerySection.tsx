import { useState, useEffect, useRef, useCallback } from "react";

const BASE = "/images";

const images = [
  { src: `${BASE}/img6.png`, alt: "ICOONE procedure 1" },
  { src: `${BASE}/img7.png`, alt: "ICOONE procedure 2" },
  { src: `${BASE}/img8.png`, alt: "ICOONE procedure 3" },
  { src: `${BASE}/IMG_9652.JPG`, alt: "ICOONE procedure 4" },
];

const GallerySection = () => {
  const [active, setActive]     = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = images.length;

  const next = useCallback(() => setActive((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setActive((p) => (p - 1 + total) % total), [total]);

  // Auto-advance every 4 s
  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4000);
  };

  // Touch / mouse swipe
  const onDragStart = (clientX: number) => { startX.current = clientX; setDragging(true); };
  const onDragEnd   = (clientX: number) => {
    if (!dragging) return;
    const diff = startX.current - clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); resetTimer(); }
    setDragging(false);
  };

  return (
    <div id="gallery" className="bg-pink-mid py-7 md:py-11 overflow-hidden">
      {/* ── Desktop: 3-panel peek view ── */}
      <div className="hidden md:flex gap-6 px-16 items-center justify-center">
        {images.map((img, i) => {
          const offset = (i - active + total) % total;
          const isCenter = offset === 0;
          const isEdge   = offset === 1 || offset === total - 1;
          if (!isCenter && !isEdge) return null;
          return (
            <div
              key={i}
              onClick={() => { setActive(i); resetTimer(); }}
              className={`rounded-lg overflow-hidden cursor-pointer transition-all duration-500 flex-shrink-0 ${
                isCenter
                  ? "h-[340px] w-[420px] shadow-xl scale-100 opacity-100"
                  : "h-[260px] w-[300px] opacity-60 scale-95 hover:opacity-80"
              }`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover block" />
            </div>
          );
        })}
      </div>

      {/* ── Mobile: full-width swiper ── */}
      <div
        className="md:hidden relative select-none"
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseUp={(e) => onDragEnd(e.clientX)}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="w-full flex-shrink-0 h-[260px]">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover block" draggable={false} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Dots ── */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); resetTimer(); }}
            className={`rounded-full transition-all duration-300 ${
              i === active ? "w-6 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40"
            }`}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
