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
    <section className="w-full bg-[#050508] border-y border-white/[0.08] relative overflow-hidden py-4 select-none">
      {/* Inject ticker keyframes */}
      <style dangerouslySetInnerHTML={{ __html: tickerStyles }} />

      {/* Ticker track — full-bleed */}
      <div className="w-full overflow-hidden relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

        {/* Ticker track */}
        <div className="flex whitespace-nowrap nexora-ticker-track">
          {projectNames.map((name, i) => (
            <TickerItem key={`a-${i}`} name={name} />
          ))}
          {projectNames.map((name, i) => (
            <TickerItem key={`b-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TickerItemProps {
  name: string;
}

const TickerItem: React.FC<TickerItemProps> = ({ name }) => (
  <span className="inline-flex items-center gap-6 px-8 group cursor-default">
    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#8B0D1A] transition-colors duration-300 shrink-0" />
    <span className="text-xs font-mono tracking-[0.18em] uppercase text-zinc-400 group-hover:text-white transition-colors duration-300 font-semibold">
      {name}
    </span>
  </span>
);
