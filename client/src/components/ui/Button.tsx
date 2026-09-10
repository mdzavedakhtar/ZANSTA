import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0D1A] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0B0B0B] disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

    const variants = {
      // ── Primary: Off-White surface, Black text — highest CTA hierarchy
      primary: 'bg-[#F5F2ED] text-[#0B0B0B] hover:bg-white hover:shadow-[0_0_20px_rgba(245,242,237,0.20)] active:opacity-90',

      // ── Secondary: Dark surface, Off-White border & text
      secondary: 'bg-[#0E0E0E] text-[#F5F2ED] border border-[#F5F2ED]/12 hover:bg-[#111111] hover:border-[#F5F2ED]/22 active:bg-[#0B0B0B]',

      // ── Outline: Transparent, crimson on hover
      outline: 'bg-transparent text-[#F5F2ED]/80 border border-[#F5F2ED]/15 hover:border-[#8B0D1A]/60 hover:text-[#F5F2ED] hover:bg-[#8B0D1A]/08',

      // ── Ghost: No border, subtle hover
      ghost: 'bg-transparent text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-[#F5F2ED]/05 active:bg-[#F5F2ED]/10',

      // ── Glow (Primary CTA): Crimson background, Off-White text — brand CTA
      glow: 'bg-[#8B0D1A] text-[#F5F2ED] font-semibold hover:bg-[#A01020] hover:shadow-[0_0_25px_rgba(139,13,26,0.45)] active:opacity-90',

      // ── Danger: Crimson treatment for destructive actions
      danger: 'bg-[#8B0D1A]/12 text-[#F5F2ED]/80 border border-[#8B0D1A]/30 hover:bg-[#8B0D1A]/22 hover:border-[#8B0D1A]/50 hover:text-[#F5F2ED]',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-6 py-2.5 gap-2.5',
      xl: 'text-base px-8 py-3.5 gap-3 font-semibold rounded-xl',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={disabled || isLoading ? undefined : { scale: 1.015 }}
        whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
