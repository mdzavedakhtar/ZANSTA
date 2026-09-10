import React from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  className,
}) => {
  if (orientation === 'vertical') {
    return <div className={cn('w-px h-full bg-white/10 shrink-0', className)} />;
  }

  if (label) {
    return (
      <div className={cn('flex items-center my-6', className)}>
        <div className="flex-1 h-px bg-white/10" />
        <span className="px-3 text-xs text-[#F5F2ED]/35 uppercase tracking-widest font-mono">
          {label}
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
    );
  }

  return <div className={cn('w-full h-px bg-white/10 my-4', className)} />;
};
