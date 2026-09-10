import React from 'react';
import { motion } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'spatialDepth' | 'scaleBlur';
  once?: boolean;
  amount?: number;
  scale?: number;
  blurPx?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  delay = 0,
  direction = 'spatialDepth',
  once = false, // Configured for bidirectional viewport replay
  amount = 0.2, // 20% viewport entry threshold
  scale = 0.92,
  blurPx = 8,
}) => {
  const getInitialState = () => {
    switch (direction) {
      case 'spatialDepth':
        return { opacity: 0, scale, filter: `blur(${blurPx}px)`, y: 20 };
      case 'scaleBlur':
        return { opacity: 0, scale: 0.88, filter: `blur(${blurPx}px)` };
      case 'up':
        return { opacity: 0, y: 35, filter: 'blur(4px)' };
      case 'down':
        return { opacity: 0, y: -35, filter: 'blur(4px)' };
      case 'left':
        return { opacity: 0, x: 35, filter: 'blur(4px)' };
      case 'right':
        return { opacity: 0, x: -35, filter: 'blur(4px)' };
      default:
        return { opacity: 0, scale, filter: `blur(${blurPx}px)` };
    }
  };

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

