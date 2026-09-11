import React from 'react';
import { NexoraExperience } from '@/components/experience/NexoraExperience';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProductStatementSection } from '@/components/landing/ProductStatementSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { ProjectShowcaseSection } from '@/components/landing/ProjectShowcaseSection';
import { TeamShowcaseSection } from '@/components/landing/TeamShowcaseSection';
import { ReviewsSection } from '@/components/landing/ReviewsSection';
import { DemoRequestSection } from '@/components/landing/DemoRequestSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { FinalCTASection } from '@/components/landing/FinalCTASection';

import { WarmLightResetSection } from '@/components/landing/WarmLightResetSection';

export const HomePage: React.FC = () => {
  return (
    <NexoraExperience>
      <div className="relative overflow-hidden text-[#F5F2ED]">
        {/* 1. HERO SECTION */}
        <HeroSection />

        {/* 1.5 PROJECT TICKER — MOVING RIGHT TO LEFT */}
        <ProductStatementSection />

        {/* 2. ABOUT ZANSTA */}
        <AboutSection />

        {/* 3. SERVICES — WHAT WE BUILD */}
        <ServicesSection />

        {/* 3.5 VISUAL RESET — STUDIO PHILOSOPHY (LIGHT SECTION) */}
        <WarmLightResetSection />

        {/* 4. SELECTED WORK / PROJECTS */}
        <ProjectShowcaseSection />

        {/* 5. THE PEOPLE BEHIND ZANSTA — TEAM */}
        <TeamShowcaseSection />

        {/* 6. CLIENT REVIEWS */}
        <ReviewsSection />

        {/* 7. PROJECT DEMO REQUEST */}
        <DemoRequestSection />

        {/* 8. CONTACT / LET'S BUILD TOGETHER */}
        <ContactSection />

        {/* 9. FINAL CTA (Footer rendered once by PublicLayout) */}
        <FinalCTASection />
      </div>
    </NexoraExperience>
  );
};
