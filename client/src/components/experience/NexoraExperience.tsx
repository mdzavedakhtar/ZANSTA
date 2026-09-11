import React, { useState, useEffect, useCallback } from 'react';
import { NexoraScene } from '../intro/NexoraScene';
import { NexoraIntro } from '../intro/NexoraIntro';

interface NexoraExperienceProps {
  children: React.ReactNode;
}

interface ColorStop {
  offset: number;
  r: number;
  g: number;
  b: number;
  glowR: number;
  glowG: number;
  glowB: number;
  glowAlpha: number;
}

const COLOR_STOPS: ColorStop[] = [
  // 1. HERO SECTION (0.00 - 0.12) — Deep Black + Subtle Crimson Ambient Glow
  { offset: 0.00, r: 5,  g: 5,  b: 5,  glowR: 139, glowG: 13,  glowB: 26,  glowAlpha: 0.15 },
  // 2. PRODUCT STATEMENT (0.12 - 0.22) — Dark Obsidian Violet Tint
  { offset: 0.18, r: 8,  g: 7,  b: 12, glowR: 110, glowG: 18,  glowB: 40,  glowAlpha: 0.18 },
  // 3. ABOUT SECTION (0.22 - 0.38) — Deep Graphite & Slate Charcoal
  { offset: 0.32, r: 10, g: 10, b: 16, glowR: 45,  glowG: 35,  glowB: 70,  glowAlpha: 0.20 },
  // 4. SERVICES SECTION (0.38 - 0.52) — Dark Sapphire & Onyx Navy
  { offset: 0.46, r: 6,  g: 9,  b: 17, glowR: 20,  glowG: 45,  glowB: 80,  glowAlpha: 0.22 },
  // 5. STUDIO PHILOSOPHY (0.52 - 0.65) — Deep Burgundy & Warm Crimson Tint
  { offset: 0.60, r: 12, g: 7,  b: 9,  glowR: 139, glowG: 13,  glowB: 26,  glowAlpha: 0.22 },
  // 6. PROJECTS & TEAM (0.65 - 0.80) — Muted Graphite & Obsidian
  { offset: 0.75, r: 8,  g: 8,  b: 13, glowR: 35,  glowG: 40,  glowB: 65,  glowAlpha: 0.18 },
  // 7. REVIEWS & DEMO REQUEST (0.80 - 0.92) — Deep Crimson Obsidian Tint
  { offset: 0.88, r: 11, g: 6,  b: 8,  glowR: 139, glowG: 13,  glowB: 26,  glowAlpha: 0.24 },
  // 8. CONTACT & FOOTER (0.92 - 1.00) — Deep Black Return
  { offset: 1.00, r: 5,  g: 5,  b: 5,  glowR: 139, glowG: 13,  glowB: 26,  glowAlpha: 0.20 },
];

function getInterpolatedTheme(p: number) {
  const clamped = Math.min(1, Math.max(0, p));
  let lower = COLOR_STOPS[0];
  let upper = COLOR_STOPS[COLOR_STOPS.length - 1];

  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    if (clamped >= COLOR_STOPS[i].offset && clamped <= COLOR_STOPS[i + 1].offset) {
      lower = COLOR_STOPS[i];
      upper = COLOR_STOPS[i + 1];
      break;
    }
  }

  const range = upper.offset - lower.offset;
  const factor = range === 0 ? 0 : (clamped - lower.offset) / range;

  const r = Math.round(lower.r + (upper.r - lower.r) * factor);
  const g = Math.round(lower.g + (upper.g - lower.g) * factor);
  const b = Math.round(lower.b + (upper.b - lower.b) * factor);

  const glowR = Math.round(lower.glowR + (upper.glowR - lower.glowR) * factor);
  const glowG = Math.round(lower.glowG + (upper.glowG - lower.glowG) * factor);
  const glowB = Math.round(lower.glowB + (upper.glowB - lower.glowB) * factor);
  const glowAlpha = (lower.glowAlpha + (upper.glowAlpha - lower.glowAlpha) * factor).toFixed(3);

  return {
    bgStyle: `rgb(${r}, ${g}, ${b})`,
    glowStyle: `rgba(${glowR}, ${glowG}, ${glowB}, ${glowAlpha})`,
  };
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
  const [introFinished, setIntroFinished] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('zansta_intro_seen')) {
      return true;
    }
    return false;
  });
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleProgressUpdate = useCallback((p: number) => {
    setIntroProgress(p);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroFinished(true);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReduced);

    if (prefersReduced) {
      setIntroFinished(true);
      setIntroProgress(1);
      return;
    }

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

  const theme = getInterpolatedTheme(scrollProgress);

  return (
    <div
      className="relative min-h-screen text-[#F5F2ED] selection:bg-[#8B0D1A]/30 selection:text-[#F5F2ED] transition-colors duration-700 ease-out"
      style={{ backgroundColor: theme.bgStyle }}
    >
      {/* Dynamic Ambient Glow Backdrop */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at 50% ${25 + scrollProgress * 50}%, ${theme.glowStyle} 0%, transparent 65%)`,
        }}
        aria-hidden="true"
      />

      {/* 3D Intro Overlay Controls */}
      {!introFinished && (
        <NexoraIntro
          onProgressUpdate={handleProgressUpdate}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Single Persistent 3D WebGL World Canvas or Static Reduced Motion Fallback */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        {reducedMotion ? (
          <div className="absolute inset-0 flex items-center justify-center">
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

      {/* Main Landing Page Content Overlay with Seamless Cross-Fade */}
      <div
        className="relative z-10 transition-opacity duration-700 ease-out"
        style={{
          opacity: introFinished ? 1 : Math.max(0, (introProgress - 0.75) / 0.25),
          pointerEvents: introProgress < 0.85 ? 'none' : 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
};




