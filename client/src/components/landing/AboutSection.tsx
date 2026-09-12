import React from 'react';
import { Container } from '../ui/Container';
import { ScrollReveal } from '../motion/ScrollReveal';
import { Badge } from '../ui/Badge';
import { ArrowUpRight, Cpu, Sparkles, Shield, Code2, Zap } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-28 lg:py-36 bg-[#050508] border-b border-white/[0.08] relative overflow-hidden">
      {/* Background Soft Ambient Purple/Crimson Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#3b0764]/15 via-[#8B0D1A]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column — Editorial Typography Statement */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                <span>ABOUT ZANSTA</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white leading-[1.08]">
                WE BUILD DIGITAL PRODUCTS THAT MOVE BUSINESSES FORWARD.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="space-y-4 text-zinc-400 font-sans text-base sm:text-lg leading-relaxed">
              <p>
                ZANSTA is a technology-driven digital product and software development agency. We design, develop, and deliver modern digital experiences for ambitious startups, enterprises, and market leaders worldwide.
              </p>
              <p className="text-sm sm:text-base text-zinc-500">
                By uniting elite product designers, full-stack architects, AI engineers, and digital strategists, we build scalable, high-performance, and revenue-focused software solutions engineered to scale without friction.
              </p>
            </ScrollReveal>

            {/* Core Capability Highlights Pill Grid */}
            <ScrollReveal delay={0.3}>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
                <div className="space-y-1">
                  <div className="text-2xl font-semibold text-white font-mono tracking-tight">100%</div>
                  <div className="text-xs text-zinc-400 font-sans">Custom Architecture</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-semibold text-[#8B0D1A] font-mono tracking-tight">&lt;100ms</div>
                  <div className="text-xs text-zinc-400 font-sans">Real-time Latency</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-semibold text-white font-mono tracking-tight">AI-Native</div>
                  <div className="text-xs text-zinc-400 font-sans">Agent Workflows</div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column — Codex Ambient Glow Frame Showcase */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal delay={0.2} className="relative">
              {/* Codex Outer Container Frame */}
              <div className="relative aspect-square rounded-3xl bg-[#0c0d12] border border-white/[0.08] hover:border-white/20 p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 group">
                {/* Background Ambient Radial Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3b0764]/25 via-[#8B0D1A]/15 to-transparent blur-2xl pointer-events-none" />

                {/* 3D Abstract Spinning Core */}
                <div className="relative z-10 flex-1 flex items-center justify-center">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    {/* Outer Glowing Ring */}
                    <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/30 animate-[spin_12s_linear_infinite] transition-colors" />
                    {/* Inner Dashed Ring */}
                    <div className="absolute inset-3 rounded-full border border-dashed border-white/20 animate-[spin_8s_linear_infinite_reverse]" />
                    {/* Glowing Core Orb */}
                    <div className="w-20 h-20 rounded-2xl bg-[#141520] border border-white/20 shadow-[0_0_40px_rgba(139,13,26,0.35)] flex items-center justify-center transform rotate-45 group-hover:rotate-90 transition-transform duration-700">
                      <Cpu className="w-10 h-10 text-white -rotate-45 group-hover:-rotate-90 transition-transform duration-700" />
                    </div>
                  </div>
                </div>

                {/* Bottom Metadata Bar */}
                <div className="relative z-10 p-4 rounded-2xl bg-[#141520]/80 backdrop-blur-md border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#8B0D1A] animate-ping" />
                    <span className="text-xs font-mono text-zinc-300">ZANSTA Product Engine v2.6</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Operational</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
