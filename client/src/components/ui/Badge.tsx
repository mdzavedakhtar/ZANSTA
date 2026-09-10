import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'crimson' | 'neutral' | 'active' | 'muted';
  size?: 'sm' | 'md';
  dot?: boolean;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  dot = false,
  className,
  children,
  ...props
}) => {
  const variants = {
    // Primary brand accent — for active/highlighted states
    crimson: 'bg-[#8B0D1A]/15 text-[#F5F2ED] border-[#8B0D1A]/40',
    // Important / active status
    active:  'bg-[#8B0D1A]/20 text-[#F5F2ED] border-[#8B0D1A]/50',
    // Standard / neutral
    neutral: 'bg-[#F5F2ED]/[0.06] text-[#F5F2ED] border-[#F5F2ED]/12',
    // Dimmed / inactive
    muted:   'bg-[#F5F2ED]/[0.04] text-[rgba(245,242,237,0.50)] border-[#F5F2ED]/08',
  };

  const dotColors = {
    crimson: 'bg-[#8B0D1A]',
    active:  'bg-[#8B0D1A]',
    neutral: 'bg-[#F5F2ED]/60',
    muted:   'bg-[#F5F2ED]/30',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 font-medium tracking-wider uppercase rounded-md',
    md: 'text-xs px-2.5 py-1 font-medium rounded-full',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border font-mono tracking-tight select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', dotColors[variant])} />}
      {children}
    </span>
  );
};
