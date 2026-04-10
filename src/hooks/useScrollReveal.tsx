import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        });
      },
      { threshold: 0.1 }
    );

    const targets = el.querySelectorAll(".rv");
    targets.forEach((t) => obs.observe(t));

    // Also observe the element itself if it has .rv
    if (el.classList.contains("rv")) obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return ref;
}
