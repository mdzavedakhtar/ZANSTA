import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const imageSizes = {
    sm: 'h-8 w-auto',
    md: 'h-10 sm:h-11 w-auto',
    lg: 'h-13 sm:h-14 w-auto',
    xl: 'h-16 sm:h-20 w-auto',
  };

  return (
    <Link
      to="/"
      className={cn(
        'flex items-center justify-center group select-none transition-transform duration-200 hover:scale-[1.03]',
        className
      )}
    >
      <img
        src="/logo.png"
        alt="ZANSTA"
        className={cn(
          'w-auto object-contain transition-all duration-300 drop-shadow-[0_0_15px_rgba(139,13,26,0.35)] group-hover:drop-shadow-[0_0_25px_rgba(225,29,72,0.60)]',
          imageSizes[size]
        )}
      />
    </Link>
  );
};

