import React, { useState, useEffect } from 'react';
import { NexoraScene } from '../intro/NexoraScene';
import { NexoraIntro } from '../intro/NexoraIntro';

interface NexoraExperienceProps {
  children: React.ReactNode;
}

export const NexoraExperience: React.FC<NexoraExperienceProps> = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / totalScroll)));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F2ED] selection:bg-[#8B0D1A]/30 selection:text-[#F5F2ED]">
      {/* 3D Intro Opening Sequence */}
      <NexoraIntro onComplete={() => setIntroFinished(true)} />

      {/* Persistent 3D WebGL World Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <NexoraScene
          progress={introFinished ? 1 : 0.9}
          scrollProgress={scrollProgress}
          mousePos={mousePos}
          isMobile={isMobile}
        />
      </div>

      {/* Main Landing Page Content Overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
