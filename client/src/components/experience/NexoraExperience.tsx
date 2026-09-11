import React, { useState, useEffect, useCallback } from 'react';
import { NexoraScene } from '../intro/NexoraScene';
import { NexoraIntro } from '../intro/NexoraIntro';

interface NexoraExperienceProps {
  children: React.ReactNode;
}

export const NexoraExperience: React.FC<NexoraExperienceProps> = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [introProgress, setIntroProgress] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('zansta_intro_seen')) {
      return 1;
    }
    return 0;
  });
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleProgressUpdate = useCallback((p: number) => {
    setIntroProgress(p);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReduced);

    if (prefersReduced) return;

    let scrollRafId: number | null = null;
    let mouseRafId: number | null = null;

    const handleScroll = () => {
      if (scrollRafId !== null) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null;
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
          setScrollProgress(Math.min(1, Math.max(0, window.scrollY / totalScroll)));
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || mouseRafId !== null) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      mouseRafId = requestAnimationFrame(() => {
        mouseRafId = null;
        const x = (clientX / window.innerWidth) * 2 - 1;
        const y = -(clientY / window.innerHeight) * 2 + 1;
        setMousePos({ x, y });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      if (mouseRafId) cancelAnimationFrame(mouseRafId);
    };
  }, [isMobile]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F2ED] selection:bg-[#8B0D1A]/30 selection:text-[#F5F2ED]">
      {/* 3D Intro Overlay Controls */}
      <NexoraIntro onProgressUpdate={handleProgressUpdate} />

      {/* Single Persistent 3D WebGL World Canvas or Static Reduced Motion Fallback */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        {reducedMotion ? (
          <div className="absolute inset-0 bg-[#050505] flex items-center justify-center">
            <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#8B0D1A]/15 via-[#8B0D1A]/05 to-transparent blur-3xl opacity-50" />
          </div>
        ) : (
          <NexoraScene
            progress={introProgress}
            scrollProgress={scrollProgress}
            mousePos={mousePos}
            isMobile={isMobile}
          />
        )}
      </div>

      {/* Main Landing Page Content Overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

