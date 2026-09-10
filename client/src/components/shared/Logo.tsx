import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 'md', showText = true }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link to="/" className={cn('inline-flex items-center gap-2.5 group select-none', className)}>
      {/* Brand Icon Mark */}
      <div
        className={cn(
          'relative rounded-lg bg-[#0B0B0B] border border-[#F5F2ED]/12 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#8B0D1A]/60 group-hover:shadow-[0_0_20px_rgba(139,13,26,0.30)]',
          iconSizes[size]
        )}
      >
        {/* Crimson ambient inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B0D1A]/15 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4/5 h-4/5 text-[#F5F2ED] relative z-10 transition-all duration-300 group-hover:text-[#8B0D1A] group-hover:scale-110"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>

      {showText && (
        <span
          className={cn(
            'font-bold tracking-tight text-[#F5F2ED] font-display flex items-center',
            textSizes[size]
          )}
        >
          ZANSTA
          {/* Crimson pulse dot — brand signature */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B0D1A] ml-1 animate-pulse" />
        </span>
      )}
    </Link>
  );
};
