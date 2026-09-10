import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  surfaceTier?: '100' | '200' | '300' | '400';
  hoverEffect?: boolean;
  glowOnHover?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  surfaceTier = '100',
  hoverEffect = true,
  glowOnHover = false,
  className,
  children,
  ...props
}) => {
  const tiers = {
    '100': 'bg-[#0B0B0B] border-[#F5F2ED]/[0.07]',
    '200': 'bg-[#0E0E0E] border-[#F5F2ED]/[0.08]',
    '300': 'bg-[#111111] border-[#F5F2ED]/[0.09]',
    '400': 'bg-[#141414] border-[#F5F2ED]/[0.10]',
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'rounded-xl border p-6 transition-all duration-300 relative overflow-hidden',
        tiers[surfaceTier],
        hoverEffect && 'hover:border-[#F5F2ED]/18',
        glowOnHover && 'hover:border-[#8B0D1A]/45 hover:shadow-[0_0_25px_-5px_rgba(139,13,26,0.20)]',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <div className={cn('mb-4 flex flex-col space-y-1.5', className)}>{children}</div>
);

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <h3 className={cn('text-lg font-semibold tracking-tight text-[#F5F2ED]', className)}>
    {children}
  </h3>
);

export const CardDescription: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <p className={cn('text-sm text-[#F5F2ED]/60 leading-relaxed', className)}>{children}</p>
);

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <div className={cn('', className)}>{children}</div>;

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <div className={cn('mt-6 pt-4 border-t border-[#F5F2ED]/05 flex items-center justify-between', className)}>
    {children}
  </div>
);
