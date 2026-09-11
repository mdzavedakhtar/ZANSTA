import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLogoProps {
  progress: number;
  isMobile?: boolean;
}

export const IntroLogo: React.FC<IntroLogoProps> = ({ progress, isMobile = false }) => {
  // Timeline flags
  const showLogo = progress >= 0.5; // 2.0s out of 4.0s = 0.5
  const showTagline = progress >= 0.65; // 2.6s out of 4.0s = 0.65
  const isExiting = progress >= 0.8; // 3.2s out of 4.0s = 0.8

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-6 text-center">
      <AnimatePresence>
        {!isExiting && showLogo && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(16px)', scale: 0.9, y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 relative"
          >
            {/* Background Ambient Crimson Glow Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#8B0D1A]/25 rounded-full blur-[100px] pointer-events-none" />

            {/* Wordmark with Rich Crimson Red & Off-White Gradient */}
            <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F5F2ED] via-[#D92638] to-[#8B0D1A] select-none drop-shadow-[0_0_50px_rgba(139,13,26,0.8)]">
                ZANSTA
              </h1>
              {/* Crimson Signature Pulse Dot */}
              <span className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-[#8B0D1A] shadow-[0_0_20px_#8B0D1A] animate-pulse shrink-0" />
            </div>

            {/* Tagline Reveal */}
            {showTagline && (
              <motion.div
                initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#8B0D1A]/10 border border-[#8B0D1A]/30 backdrop-blur-md shadow-[0_0_25px_rgba(139,13,26,0.2)]"
              >
                <p className="text-xs sm:text-sm font-mono tracking-widest text-[#F5F2ED] uppercase select-none font-semibold">
                  BUILD TOGETHER. <span className="text-[#8B0D1A]">SHIP EXTRAORDINARY.</span>
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

