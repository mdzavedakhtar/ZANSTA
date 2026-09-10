import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-[#F5F2ED]/80 tracking-wide">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-[#F5F2ED]/40 pointer-events-none flex items-center">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full bg-[#0B0B0B] text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 text-sm rounded-lg border border-[#F5F2ED]/10 px-3.5 py-2.5 outline-none transition-all duration-200 focus:border-[#8B0D1A]/60 focus:ring-1 focus:ring-[#8B0D1A]/25 disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              // Error state: crimson border treatment
              error && 'border-[#8B0D1A]/60 focus:border-[#8B0D1A] focus:ring-[#8B0D1A]/30',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-[#F5F2ED]/40 flex items-center">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-[#F5F2ED]/70 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B0D1A] shrink-0" />
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs text-[#F5F2ED]/40">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
