import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'crimson' | 'offwhite';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'crimson',
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const colors = {
    // Crimson: primary progress — brand-forward
    crimson:  'bg-[#8B0D1A]',
    // Off-white: secondary / completed
    offwhite: 'bg-[#F5F2ED]/70',
  };

  const glows = {
    crimson:  'shadow-[0_0_10px_rgba(139,13,26,0.40)]',
    offwhite: 'shadow-none',
  };

  return (
    <div className={cn('w-full flex flex-col space-y-1.5', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs text-[#F5F2ED]/70 font-medium">
          <span>{label}</span>
          {showPercentage && (
            <span className="font-mono text-[#F5F2ED]/50">{percentage}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-[#F5F2ED]/[0.06] border border-[#F5F2ED]/05 rounded-full h-1.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn('h-full rounded-full', colors[color], glows[color])}
        />
      </div>
    </div>
  );
};
