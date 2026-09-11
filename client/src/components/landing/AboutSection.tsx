import React from 'react';
import { Container } from '../ui/Container';
import { ScrollReveal } from '../motion/ScrollReveal';
import { Badge } from '../ui/Badge';
import { ArrowUpRight, Cpu, Sparkles, Shield, Code2, Zap } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-transparent border-b border-white/[0.06] relative overflow-hidden selection:bg-[#8B0D1A]/30">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B0D1A]/05 rounded-full blur-[140px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column — Editorial Typography Statement */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B0D1A]/10 border border-[#8B0D1A]/20 text-xs font-mono text-[#8B0D1A]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ABOUT ZANSTA</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#F5F2ED] leading-[1.1]">
                WE BUILD DIGITAL PRODUCTS THAT MOVE BUSINESSES FORWARD.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="space-y-4 text-[#F5F2ED]/70 font-sans text-base sm:text-lg leading-relaxed">
              <p>
                ZANSTA is a technology-driven digital product and software development agency. We design, develop, and deliver modern digital experiences for ambitious startups, enterprises, and market leaders worldwide.
              </p>
              <p className="text-sm sm:text-base text-[#F5F2ED]/55">
                By uniting elite product designers, full-stack architects, AI engineers, and digital strategists, we build scalable, high-performance, and revenue-focused software solutions engineered to scale without friction.
              </p>
            </ScrollReveal>

            {/* Core Capability Highlights Pill Grid */}
            <ScrollReveal delay={0.3}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/05">
                <div className="space-y-1">
                  <div className="text-xl font-extrabold text-[#F5F2ED] font-mono">100%</div>
                  <div className="text-xs text-[#F5F2ED]/60 font-mono">Custom Architecture</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-extrabold text-[#8B0D1A] font-mono">Sub-100ms</div>
                  <div className="text-xs text-[#F5F2ED]/60 font-mono">Real-time Latency</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-extrabold text-[#F5F2ED] font-mono">AI-Native</div>
                  <div className="text-xs text-[#F5F2ED]/60 font-mono">Agent Workflows</div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column — 3D Abstract Object Visual Element */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal delay={0.2} className="relative">
              {/* Outer Glassmorphic Frame with Perspective Depth */}
              <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-[#0E0E0E] to-[#080808] border border-white/10 p-8 flex flex-col justify-between overflow-hidden shadow-2xl group hover:border-[#8B0D1A]/40 transition-colors duration-500">
                {/* Background Rotating Cyber Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#8B0D1A_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

                {/* 3D Abstract Spinning Core */}
                <div className="relative z-10 flex-1 flex items-center justify-center">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    {/* Outer Glowing Ring */}
                    <div className="absolute inset-0 rounded-full border border-[#8B0D1A]/40 animate-[spin_12s_linear_infinite]" />
                    {/* Inner Dashed Ring */}
                    <div className="absolute inset-3 rounded-full border border-dashed border-white/20 animate-[spin_8s_linear_infinite_reverse]" />
                    {/* Glowing Core Orb */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8B0D1A] to-[#8B0D1A]/20 border border-white/20 shadow-[0_0_40px_rgba(139,13,26,0.5)] flex items-center justify-center transform rotate-45 group-hover:rotate-90 transition-transform duration-700">
                      <Cpu className="w-10 h-10 text-white -rotate-45 group-hover:-rotate-90 transition-transform duration-700" />
                    </div>
                  </div>
                </div>

                {/* Bottom Metadata Bar */}
                <div className="relative z-10 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#8B0D1A] animate-ping" />
                    <span className="text-xs font-mono text-[#F5F2ED]/80">ZANSTA Product Engine v2.6</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8B0D1A] uppercase tracking-wider">Operational</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
