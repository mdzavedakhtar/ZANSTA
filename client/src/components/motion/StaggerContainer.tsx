import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
  children: React.ReactNode;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  staggerChildren = 0.08,
  delayChildren = 0,
  once = false, // Configured for bidirectional viewport replay
  amount = 0.2,
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
