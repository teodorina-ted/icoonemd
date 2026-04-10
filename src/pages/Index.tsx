import { useState, useEffect } from "react";
import { LanguageProvider } from "@/hooks/useLanguage";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhatSection from "@/components/WhatSection";
import PhotoBanner from "@/components/PhotoBanner";
import AdvantagesSection from "@/components/AdvantagesSection";
import TypesSection from "@/components/TypesSection";
import ProcedureSection from "@/components/ProcedureSection";
import PricesSection from "@/components/PricesSection";
import WhySection from "@/components/WhySection";
import GallerySection from "@/components/GallerySection";
import LeadFormSection from "@/components/LeadFormSection";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSection from "@/components/FaqSection";
import ContactInfoSection from "@/components/ContactInfoSection";
import FooterSection from "@/components/FooterSection";
import CookiePopup from "@/components/CookiePopup";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  const [selectedService, setSelectedService] = useState("General Inquiry");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Background style constants
  const bgMilky = "bg-[#fdfcfb]"; 
  const bgPink = "bg-[#fff5f6]";

  return (
    <LanguageProvider>
      <div className="min-h-screen selection:bg-pink-100 overflow-x-hidden">
        {/* 1. Navigation */}
        <Navigation />

        {/* 2. Hero Section - Pink */}
        <div className={bgPink}>
          <HeroSection />
        </div>

        {/* 3. What Section (Red Card) - Milky */}
        <div className={bgMilky}>
          <WhatSection />
        </div>

        {/* 4. Photo/Video Banner - Pink */}
        <div className={bgPink}>
          <PhotoBanner />
        </div>

        {/* 5. Advantages Section - Milky */}
        <div className={bgMilky}>
          <AdvantagesSection />
        </div>

        {/* 7. Procedure Section - Pink */}
        <div className={bgPink}>
          <ProcedureSection />
        </div>

        {/* 6. Types Section - Milky */}
        <div className={bgMilky}>
          <TypesSection onSelectService={setSelectedService} />
        </div>

        {/* Image 5 Banner */}
        <div className="w-full overflow-hidden max-h-[420px]">
          <img 
            src="/images/img5.png" 
            alt="ICOONE banner" 
            className="w-full h-full object-cover block" 
          />
        </div>

        {/* 8. Prices Section - Milky */}
        <div className={bgMilky}>
          <PricesSection />
        </div>

        {/* 10. Contact Info Section (Map) - Milky */}
        <div className={bgMilky}>
          <ContactInfoSection />
        </div>

        {/* 11. Gallery Section - Pink */}
        <div className={bgPink}>
          <GallerySection />
        </div>

        {/* 12. Lead Form Section (Записаться на процедуру) - Milky */}
        <div className={`${bgMilky} py-10 md:py-20`}>
          <div className="max-w-screen-2xl mx-auto px-4 md:px-10 transition-all duration-500 hover:scale-[1.01]">
            <LeadFormSection selectedService={selectedService} />
          </div>
        </div>

        {/* 13. Reviews Section - Pink */}
        <div className={`${bgPink} py-10 md:py-20`}>
          <div className="max-w-screen-2xl mx-auto px-4 md:px-10">
            <ReviewsSection />
          </div>
        </div>

        {/* 14. FAQ Section - Milky */}
        <div className={bgMilky}>
          <FaqSection />
        </div>

        {/* 15. Footer */}
        <FooterSection />

        <FloatingWhatsApp />
        <CookiePopup />
      </div>
    </LanguageProvider>
  );
};

export default Index;