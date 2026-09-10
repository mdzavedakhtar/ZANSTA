import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="text-xs font-medium text-[#F5F2ED]/80 tracking-wide">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full bg-[#0B0B0B] text-[#F5F2ED] text-sm rounded-lg border border-[#F5F2ED]/10 px-3.5 py-2.5 outline-none appearance-none transition-all duration-200 focus:border-[#8B0D1A]/60 focus:ring-1 focus:ring-[#8B0D1A]/25 disabled:opacity-50 pr-10 cursor-pointer',
              error && 'border-[#8B0D1A]/60 focus:border-[#8B0D1A]',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0E0E0E] text-[#F5F2ED]">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 w-4 h-4 text-[#F5F2ED]/40 pointer-events-none" />
        </div>
        {error && <p className="text-xs text-[#F5F2ED]/70 font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#8B0D1A] shrink-0" />{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
