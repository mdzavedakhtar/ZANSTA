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
  const progressRef = useRef(0);
  const [uiProgress, setUiProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastThresholdRef = useRef(-1);

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

      progressRef.current = currentProgress;

      // Discrete milestone thresholds for UI commits:
      let threshold = 0;
      if (currentProgress >= 0.85) threshold = 0.85;
      else if (currentProgress >= 0.8) threshold = 0.8;
      else if (currentProgress >= 0.65) threshold = 0.65;
      else if (currentProgress >= 0.5) threshold = 0.5;

      if (threshold !== lastThresholdRef.current) {
        lastThresholdRef.current = threshold;
        setUiProgress(threshold);
      }

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
        animate={{ opacity: uiProgress > 0.85 ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed inset-0 z-[100] bg-[#050505] overflow-hidden select-none"
      >
        <NexoraScene progress={progressRef} mousePos={mousePos} isMobile={isMobile} />
        <IntroLogo progress={uiProgress} />
      </motion.div>
    </AnimatePresence>
  );
};
