import { useRef } from "react";

const BASE = "/images";

const images = [
  { src: `${BASE}/img6.png`, alt: "ICOONE 1" },
  { src: `${BASE}/img7.png`, alt: "ICOONE 2" },
  { src: `${BASE}/img8.png`, alt: "ICOONE 3" },
//  { src: `${BASE}/IMG_9652.JPG`, alt: "ICOONE 4" },
  { src: `${BASE}/img6.png`, alt: "ICOONE 5" },
  { src: `${BASE}/img7.png`, alt: "ICOONE 6" },
  { src: `${BASE}/img8.png`, alt: "ICOONE 7" },
];

const GallerySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    /* The Band - Deep Wine Background */
    <section 
      id="gallery" 
      className="bg-[#832734] py-3 md:py-4 overflow-hidden"
    >
      {/* Horizontal Ribbon 
          - Reduced 'gap-3' and 'px-3' for tighter margins
          - 'no-scrollbar' for the clean film-strip look 
      */}
      <div 
        ref={scrollRef}
        className="flex gap-3 px-3 overflow-x-auto snap-x snap-proximity no-scrollbar cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((img, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 snap-start"
          >
            {/* Bigger Squares
                - Desktop: 340px
                - Mobile: 240px 
                - Large rounded corners
            */}
            <div className="w-[240px] h-[240px] md:w-[340px] md:h-[340px] rounded-[30px] overflow-hidden shadow-2xl">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover block pointer-events-none hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default GallerySection;