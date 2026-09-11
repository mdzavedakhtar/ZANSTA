import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntroLogo } from './IntroLogo';
import { INTRO_CONFIG } from './introConfig';

interface NexoraIntroProps {
  onProgressUpdate?: (progress: number) => void;
  onComplete?: () => void;
  forceShow?: boolean;
}

export const NexoraIntro: React.FC<NexoraIntroProps> = ({
  onProgressUpdate,
  onComplete,
  forceShow = false,
}) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (forceShow) return true;
    if (typeof window !== 'undefined') {
      const hasSeen = sessionStorage.getItem('zansta_intro_seen');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (hasSeen || prefersReduced) {
        return false;
      }
    }
    return true;
  });

  const progressRef = useRef(0);
  const [uiProgress, setUiProgress] = useState(0);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastThresholdRef = useRef(-1);

  useEffect(() => {
    if (!isVisible) {
      onProgressUpdate?.(1);
      onComplete?.();
      return;
    }

    // Animation timeline loop
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const currentProgress = Math.min(1, elapsed / INTRO_CONFIG.totalDuration);

      progressRef.current = currentProgress;
      onProgressUpdate?.(currentProgress);

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
        onProgressUpdate?.(1);
        onComplete?.();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [forceShow, isVisible, onComplete, onProgressUpdate]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: uiProgress >= 0.8 ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed inset-0 z-[100] bg-transparent overflow-hidden select-none pointer-events-none"
      >
        <IntroLogo progress={uiProgress} isMobile={isMobile} />
      </motion.div>
    </AnimatePresence>
  );
};



