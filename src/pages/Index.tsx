import { useState, useEffect } from "react";
import { LanguageProvider } from "@/hooks/useLanguage";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhatSection from "@/components/WhatSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import GallerySection from "@/components/GallerySection";
import TypesSection from "@/components/TypesSection";
import ProcedureSection from "@/components/ProcedureSection";
import PhotoBanner from "@/components/PhotoBanner";
import PricesSection from "@/components/PricesSection";
import WhySection from "@/components/WhySection";
import FaqSection from "@/components/FaqSection";
import ContactInfoSection from "@/components/ContactInfoSection";
import LeadFormSection from "@/components/LeadFormSection";
import ReviewsSection from "@/components/ReviewsSection";
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

  return (
    <LanguageProvider>
      <Navigation />
      <HeroSection />
      <WhatSection />
      <AdvantagesSection />
      <GallerySection />
      <TypesSection onSelectService={setSelectedService} />
      <ProcedureSection />
      <PhotoBanner />
      <PricesSection />
      <WhySection />
      <FaqSection />
      <ContactInfoSection />
      <LeadFormSection selectedService={selectedService} />
      <ReviewsSection />
      <FooterSection />
      <FloatingWhatsApp />
      <CookiePopup />
    </LanguageProvider>
  );
};

export default Index;
