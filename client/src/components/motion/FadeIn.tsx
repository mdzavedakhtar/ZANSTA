import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
  amount?: number;
  children: React.ReactNode;
}

export const FadeIn: React.FC<FadeInProps> = ({
  delay = 0,
  duration = 0.5,
  direction = 'up',
  once = false, // Configured for bidirectional viewport replay
  amount = 0.2,
  children,
  className,
  ...props
}) => {
  const directionOffset = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
