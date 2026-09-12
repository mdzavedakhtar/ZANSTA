import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { MagneticButton } from '../ui/MagneticButton';
import { Badge } from '../ui/Badge';
import { ScrollReveal } from '../motion/ScrollReveal';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-28 lg:py-36 bg-[#050508] relative overflow-hidden">
      {/* Background Soft Ambient Purple Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-[#3b0764]/20 via-[#8B0D1A]/15 to-[#1e1b4b]/20 blur-3xl opacity-60 pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <ScrollReveal className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-wider">
            START BUILDING TODAY
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight font-display text-white leading-tight">
            READY TO BUILD <br />
            <span className="text-[#8B0D1A]">
              SOMETHING REMARKABLE?
            </span>
          </h2>

          <p className="text-base sm:text-xl text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
            Join modern software engineering teams using ZANSTA to manage code, stream real-time updates, and showcase client work.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/dashboard">
              <button className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-xl flex items-center gap-2">
                <span>Enter Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-zinc-400" />
                <span>Start Project Request</span>
              </button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
