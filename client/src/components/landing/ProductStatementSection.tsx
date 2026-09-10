import React, { useEffect, useState } from 'react';
import { projectService } from '@/services/projectService';
import { CMSProject } from '@/types/cms';

const tickerStyles = `
  @keyframes nexora-ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .nexora-ticker-track {
    animation: nexora-ticker 28s linear infinite;
    will-change: transform;
  }
  .nexora-ticker-track:hover {
    animation-play-state: paused;
  }
`;

export const ProductStatementSection: React.FC = () => {
  const [projectNames, setProjectNames] = useState<string[]>([]);

  useEffect(() => {
    const list = projectService.getProjects({ isVisible: true });
    const names = list.map((p) => p.name.toUpperCase());
    if (names.length > 0) {
      // Repeat names if array is small to ensure smooth infinite scroll
      let repeated = [...names];
      while (repeated.length < 9) {
        repeated = [...repeated, ...names];
      }
      setProjectNames(repeated);
    } else {
      setProjectNames(['CARESPRINT', 'NEUROSTACK', 'INSIGHT IQ']);
    }
  }, []);

  return (
    <section className="w-full bg-[#080808] border-b border-white/[0.06] relative overflow-hidden py-5">
      {/* Inject ticker keyframes */}
      <style dangerouslySetInnerHTML={{ __html: tickerStyles }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B0D1A]/30 to-transparent" />

      {/* Ticker track — full-bleed, overflow hidden */}
      <div className="w-full overflow-hidden relative select-none">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

        {/* Ticker track — duplicated for seamless loop */}
        <div className="flex whitespace-nowrap nexora-ticker-track">
          {/* First copy */}
          {projectNames.map((name, i) => (
            <TickerItem key={`a-${i}`} name={name} />
          ))}
          {/* Duplicate copy for seamless wrap */}
          {projectNames.map((name, i) => (
            <TickerItem key={`b-${i}`} name={name} />
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B0D1A]/30 to-transparent" />
    </section>
  );
};

interface TickerItemProps {
  name: string;
}

const TickerItem: React.FC<TickerItemProps> = ({ name }) => (
  <span className="inline-flex items-center gap-5 px-6 group cursor-default">
    {/* Separator dot */}
    <span className="w-1 h-1 rounded-full bg-[#8B0D1A]/40 group-hover:bg-[#8B0D1A] transition-colors duration-300 shrink-0" />
    {/* Project name */}
    <span className="text-sm font-bold font-display tracking-[0.12em] uppercase text-[#F5F2ED]/30 group-hover:text-[#F5F2ED]/70 transition-colors duration-300">
      {name}
    </span>
  </span>
);
