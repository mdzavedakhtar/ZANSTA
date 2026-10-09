import React from 'react';
import { Container } from '../ui/Container';
import { ScrollReveal } from '../motion/ScrollReveal';
import {
  Sparkles,
  Zap,
  Cpu,
  ShieldCheck,
  Layers,
  Activity,
  ArrowUpRight,
  Workflow,
  Server,
  Terminal,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 lg:py-36 bg-[#050508] border-b border-white/[0.08] relative overflow-hidden">
      {/* Background Ambient Crimson & Violet Radial Glows */}
      <div className="absolute top-1/3 -left-48 w-[550px] h-[550px] bg-gradient-to-tr from-[#8B0D1A]/18 via-[#3b0764]/12 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#8B0D1A]/12 via-transparent to-transparent rounded-full blur-[130px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column — Editorial Typography & Mission Statement */}
          <div className="lg:col-span-6 space-y-7">
            {/* Eyebrow Badge */}
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#8B0D1A]/10 border border-[#8B0D1A]/35 text-xs font-mono text-[#F5F2ED] uppercase tracking-wider shadow-[0_0_15px_rgba(139,13,26,0.15)]">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B0D1A]"></span>
                </span>
                <span className="font-semibold">ABOUT ZANSTA · ADVANCED PRODUCT ENGINEERING</span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold font-display tracking-tight text-[#F5F2ED] leading-[1.12] uppercase">
                WE BUILD DIGITAL PRODUCTS THAT{' '}
                <span className="bg-gradient-to-r from-[#F5F2ED] via-[#FF4D61] to-[#8B0D1A] bg-clip-text text-transparent drop-shadow-sm">
                  MOVE BUSINESSES FORWARD.
                </span>
              </h2>
            </ScrollReveal>

            {/* Description Paragraphs */}
            <ScrollReveal delay={0.2} className="space-y-4 text-[#F5F2ED]/70 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                ZANSTA is a high-velocity digital product and software development agency. We architect, design, and engineer mission-critical web platforms, AI systems, and cloud infrastructure for ambitious startups, enterprises, and market leaders.
              </p>
              <p className="text-xs sm:text-sm text-[#F5F2ED]/50 leading-relaxed">
                By uniting elite product designers, full-stack architects, AI engineers, and DevOps specialists, we eliminate technical friction and build revenue-generating software that scales reliably.
              </p>
            </ScrollReveal>

            {/* Engineering Pillars Chips */}
            <ScrollReveal delay={0.25}>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { icon: Zap, label: 'MERN & Next.js Core' },
                  { icon: Cpu, label: 'Agentic AI & Vector RAG' },
                  { icon: Server, label: 'Distributed Microservices' },
                  { icon: ShieldCheck, label: 'Enterprise Cloud Security' },
                ].map((chip) => {
                  const Icon = chip.icon;
                  return (
                    <div
                      key={chip.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#8B0D1A]/50 hover:bg-[#8B0D1A]/10 text-xs font-mono text-[#F5F2ED]/80 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#E11D48]" />
                      <span>{chip.label}</span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Key Metric Highlights */}
            <ScrollReveal delay={0.3}>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-white/[0.08]">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#8B0D1A]/40 transition-colors">
                  <div className="text-xl sm:text-2xl font-black text-[#F5F2ED] font-mono tracking-tight">
                    100%
                  </div>
                  <div className="text-[11px] text-[#F5F2ED]/55 font-sans mt-0.5">
                    Custom Architecture
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#8B0D1A]/40 transition-colors">
                  <div className="text-xl sm:text-2xl font-black text-[#FF4D61] font-mono tracking-tight">
                    &lt;100ms
                  </div>
                  <div className="text-[11px] text-[#F5F2ED]/55 font-sans mt-0.5">
                    Global Edge Latency
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#8B0D1A]/40 transition-colors">
                  <div className="text-xl sm:text-2xl font-black text-[#F5F2ED] font-mono tracking-tight">
                    AI-Native
                  </div>
                  <div className="text-[11px] text-[#F5F2ED]/55 font-sans mt-0.5">
                    Agent Workflows
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column — Content-Related Interactive Product Engineering Showcase */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal delay={0.2} className="relative">
              {/* Outer Decorative Glowing Backdrop */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#8B0D1A]/40 via-[#8B0D1A]/10 to-[#3b0764]/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Main Showcase Card Frame */}
              <div className="relative rounded-3xl bg-[#090A0E] border border-white/10 hover:border-[#8B0D1A]/60 overflow-hidden shadow-2xl transition-all duration-500 group">
                
                {/* Top Terminal / Status Bar */}
                <div className="px-5 py-3.5 bg-[#0E0F16] border-b border-white/[0.08] flex items-center justify-between z-20 relative">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-xs font-mono text-[#F5F2ED]/60 ml-2 font-medium">
                      zansta-core-engine://architecture.v4.2
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ONLINE
                    </span>
                  </div>
                </div>

                {/* High-Tech Architecture Visual Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#050508]">
                  <img
                    src="/about-product-architecture.jpg"
                    alt="ZANSTA Digital Product Architecture and Core Engine"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle dark gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0E] via-transparent to-transparent opacity-80" />

                  {/* Floating Hologram HUD Badge (Top Left) */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-[#8B0D1A]/50 shadow-lg flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-[#E11D48] animate-pulse" />
                      <span className="text-[11px] font-mono font-bold text-[#F5F2ED]">
                        Neural Mesh: Active
                      </span>
                    </div>
                  </div>

                  {/* Floating Hologram HUD Badge (Top Right) */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#F5F2ED]/70" />
                      <span className="text-[11px] font-mono text-[#F5F2ED]/90">
                        99.99% Reliability
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Metadata & Feature Bar */}
                <div className="p-4 sm:p-5 bg-[#0C0D14] border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#8B0D1A]/15 border border-[#8B0D1A]/35 flex items-center justify-center text-[#E11D48] shrink-0">
                      <Workflow className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#F5F2ED] font-display uppercase tracking-wider">
                        ZANSTA Real-Time Core Platform
                      </h4>
                      <p className="text-[10px] font-mono text-[#F5F2ED]/50 mt-0.5">
                        High-concurrency microservices & GenAI orchestration
                      </p>
                    </div>
                  </div>

                  <a
                    href="#services"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-[#8B0D1A] border border-white/10 hover:border-[#8B0D1A] text-xs font-mono text-[#F5F2ED] transition-all group/btn"
                  >
                    <span>View Stack</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </Container>
    </section>
  );
};
