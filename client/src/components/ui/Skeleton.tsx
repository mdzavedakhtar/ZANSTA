import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-gradient-to-r from-[#121212] via-[#1A1A1A] to-[#121212]',
        className
      )}
      {...props}
    />
  );
};
