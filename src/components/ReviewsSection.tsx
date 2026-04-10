import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
}

interface ReviewsPayload {
  reviews: Review[];
  rating: number | null;
  total:   number | null;
}

const REVIEWS_URL = "https://icoonemassagechisinau.com/api/reviews";

const fallback: Review[] = [
  { author_name: "Maria T.",     rating: 5, text: "Am fost plăcut surprinsă de rezultate! După doar 3 ședințe am observat o diferență vizibilă. Atmosfera este foarte relaxantă." },
  { author_name: "Elena D.",     rating: 5, text: "Cel mai bun masaj din Chișinău! Personalul este foarte profesionist și atent. Recomand cu încredere." },
  { author_name: "Anastasia R.", rating: 5, text: "Procedura ICOONE este minunată. M-am simțit foarte bine, iar pielea arată vizibil mai bine după curs." },
  { author_name: "Irina M.",     rating: 5, text: "Foarte mulțumită de servicii! Echipa este prietenoasă, iar rezultatele sunt reale. Voi reveni cu siguranță!" },
  { author_name: "Natalia P.",   rating: 4, text: "Experiență excelentă, ambient plăcut și prețuri corecte. Recomand tuturor care vor să arate și să se simtă mai bine." },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < count ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
      </svg>
    ))}
  </div>
);

const ReviewsSection = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(fallback);
  const [avgRating, setAvgRating] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(REVIEWS_URL)
      .then((r) => r.json())
      .then((data: ReviewsPayload) => {
        if (data.reviews?.length) setReviews(data.reviews);
        if (data.rating)          setAvgRating(data.rating);
        if (data.total)           setTotalCount(data.total);
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  const total = reviews.length;
  const prev  = () => setCurrent((c) => (c - 1 + total) % total);
  const next  = () => setCurrent((c) => (c + 1) % total);

  return (
    <section id="reviews" className="bg-card py-12 md:py-20 px-5 md:px-16 text-center">
      <h2 className="rv text-[1.7rem] md:text-[2.9rem] font-black text-pink-deep mb-2">
        {t("Отзывы наших клиентов", "Recenziile clienților noștri")}
      </h2>
      <p className="rv text-base text-muted-foreground mb-6">
        {t("Узнайте, что говорят наши клиенты", "Aflați ce spun clienții noștri")}
      </p>

      {/* Google aggregate badge */}
      {avgRating && (
        <div className="rv flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-2 bg-pink-bg rounded-full px-5 py-2.5 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-black text-pink-deep text-lg">{avgRating.toFixed(1)}</span>
            <Stars count={Math.round(avgRating)} />
            {totalCount && <span className="text-xs text-muted-foreground ml-1">({totalCount})</span>}
          </div>
        </div>
      )}

      {/* Review card */}
      <div className="rv max-w-[700px] mx-auto">
        <div className="bg-background rounded-2xl shadow-md p-8 md:p-10 min-h-[220px] flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-pink-bg flex items-center justify-center text-2xl font-black text-pink-deep">
            {reviews[current].author_name[0]}
          </div>
          <Stars count={reviews[current].rating} />
          <p className="text-base text-muted-foreground leading-relaxed italic max-w-[500px]">
            "{reviews[current].text}"
          </p>
          <div className="font-bold text-pink-deep text-sm">{reviews[current].author_name}</div>
          {reviews[current].relative_time_description && (
            <div className="text-xs text-muted-foreground">{reviews[current].relative_time_description}</div>
          )}
        </div>

        <div className="flex items-center justify-center gap-6 mt-6">
          <button onClick={prev} className="w-10 h-10 rounded-full bg-pink-deep text-white flex items-center justify-center hover:-translate-y-0.5 transition-all font-bold text-lg" aria-label="Previous">‹</button>
          <span className="text-sm text-muted-foreground font-bold">{current + 1} / {total}</span>
          <button onClick={next} className="w-10 h-10 rounded-full bg-pink-deep text-white flex items-center justify-center hover:-translate-y-0.5 transition-all font-bold text-lg" aria-label="Next">›</button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-pink-deep scale-125" : "bg-pink-mid/40"}`}
              aria-label={`Review ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
