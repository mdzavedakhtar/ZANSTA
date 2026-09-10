import React from 'react';
import { Lock, RefreshCw, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BrowserMockupProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
  showControls?: boolean;
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  url = 'https://nexora.dev/demo/token_caresprint_2026',
  children,
  className,
  showControls = true,
}) => {
  return (
    <div
      className={cn(
        'w-full bg-[#0E0E0E] border border-white/15 rounded-2xl shadow-2xl overflow-hidden relative border-glow-hover',
        className
      )}
    >
      {/* Top Window Bar */}
      <div className="bg-[#080808] border-b border-white/10 px-4 py-3 flex items-center justify-between gap-4">
        {/* Action Dots */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#8B0D1A]/80 hover:bg-[#8B0D1A] transition-colors" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" />
          <span className="w-3 h-3 rounded-full bg-[#8B0D1A]/80 hover:bg-[#8B0D1A] transition-colors" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-lg bg-[#121212] border border-white/10 rounded-lg px-3 py-1 flex items-center gap-2 text-xs font-mono text-[#F5F2ED]/80 mx-auto">
          <Lock className="w-3 h-3 text-[#8B0D1A] shrink-0" />
          <span className="truncate text-[#F5F2ED]/80">{url}</span>
        </div>

        {/* Right Icons */}
        {showControls && (
          <div className="flex items-center gap-2 text-[#F5F2ED]/55 shrink-0">
            <RefreshCw className="w-3.5 h-3.5 hover:text-[#F5F2ED] transition-colors cursor-pointer" />
            <a href={url} target="_blank" rel="noreferrer" className="hover:text-[#8B0D1A] transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Frame Content */}
      <div className="relative bg-[#050505] min-h-[320px]">{children}</div>
    </div>
  );
};
