import React from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { Container } from '../ui/Container';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WarmLightResetSection: React.FC = () => {
  return (
    <section className="py-28 lg:py-36 bg-[#050508] text-white relative overflow-hidden border-y border-white/[0.08]">
      {/* Background Soft Ambient Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#3b0764]/20 via-[#8B0D1A]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Editorial Statement Column */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="up" once={true}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                <span>STUDIO PHILOSOPHY</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="spatialDepth" delay={0.1} once={true}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight font-display text-white leading-[1.08]">
                DIGITAL PRODUCTS ENGINEERED WITH RESTRAINT, SPEED &amp; PRECISION.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} once={true}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-sans font-normal">
                We bridge the gap between creative direction and high-throughput software architecture. ZANSTA partners with ambitious founders and engineering teams to transform complex visions into production-grade digital realities.
              </p>
            </ScrollReveal>
          </div>

          {/* Action & Stats Card Column — Codex Ambient Glow Container */}
          <div className="lg:col-span-5 bg-[#0c0d12] border border-white/[0.08] p-8 rounded-3xl shadow-2xl relative overflow-hidden space-y-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b]/30 via-[#8B0D1A]/10 to-transparent blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400">
                Core Capabilities
              </h3>
              <ul className="space-y-3.5 text-sm font-medium text-zinc-200 font-sans">
                <li className="flex items-center justify-between py-2 border-b border-white/[0.08]">
                  <span>Product Design &amp; Systems</span>
                  <span className="font-mono text-xs text-[#8B0D1A] font-bold">01</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-white/[0.08]">
                  <span>Frontend &amp; Web Architectures</span>
                  <span className="font-mono text-xs text-[#8B0D1A] font-bold">02</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-white/[0.08]">
                  <span>AI Agent Integration</span>
                  <span className="font-mono text-xs text-[#8B0D1A] font-bold">03</span>
                </li>
                <li className="flex items-center justify-between py-2">
                  <span>ZANSTA Team Workspace Engine</span>
                  <span className="font-mono text-xs text-[#8B0D1A] font-bold">04</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 relative z-10">
              <Link
                to="/services"
                className="w-full py-3.5 px-6 rounded-full bg-white text-black font-semibold text-xs tracking-wide uppercase hover:bg-zinc-200 transition-all duration-300 flex items-center justify-between shadow-lg"
              >
                <span>Explore Capabilities</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

