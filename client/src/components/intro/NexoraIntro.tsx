import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NexoraScene } from './NexoraScene';
import { IntroLogo } from './IntroLogo';
import { INTRO_CONFIG } from './introConfig';

interface NexoraIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const NexoraIntro: React.FC<NexoraIntroProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if intro has already run in this session
    const hasSeen = sessionStorage.getItem('zansta_intro_seen');
    if (hasSeen && !forceShow) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && !forceShow) {
      sessionStorage.setItem('zansta_intro_seen', 'true');
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Detect mobile viewport
    setIsMobile(window.innerWidth < 768);

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation timeline loop
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const currentProgress = Math.min(1, elapsed / INTRO_CONFIG.totalDuration);

      setProgress(currentProgress);

      if (currentProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        sessionStorage.setItem('zansta_intro_seen', 'true');
        setIsVisible(false);
        onComplete?.();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [forceShow, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: progress > 0.85 ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed inset-0 z-[100] bg-[#050505] overflow-hidden select-none"
      >
        <NexoraScene progress={progress} mousePos={mousePos} isMobile={isMobile} />
        <IntroLogo progress={progress} />
      </motion.div>
    </AnimatePresence>
  );
};
