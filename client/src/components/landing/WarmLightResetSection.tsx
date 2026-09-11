import React from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { Container } from '../ui/Container';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WarmLightResetSection: React.FC = () => {
  return (
    <section className="py-28 bg-transparent text-[#F5F2ED] relative overflow-hidden select-none border-y border-white/[0.06] selection:bg-[#8B0D1A]/30">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8B0D1A]/10 rounded-full blur-[140px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Statement Column */}
          <div className="lg:col-span-8 space-y-6">
            <ScrollReveal direction="up" once={true}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B0D1A]/10 border border-[#8B0D1A]/30 text-xs font-mono font-semibold uppercase tracking-widest text-[#8B0D1A]">
                <Sparkles className="w-3.5 h-3.5 text-[#8B0D1A]" />
                <span>Studio Philosophy</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="spatialDepth" delay={0.1} once={true}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-[#F5F2ED] leading-[1.08]">
                DIGITAL PRODUCTS ENGINEERED WITH RESTRAINT, SPEED &amp; PRECISION.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} once={true}>
              <p className="text-base sm:text-lg text-[#F5F2ED]/75 max-w-2xl leading-relaxed font-sans font-normal">
                We bridge the gap between creative direction and high-throughput software architecture. ZANSTA partners with ambitious founders and engineering teams to transform complex visions into production-grade digital realities.
              </p>
            </ScrollReveal>
          </div>

          {/* Action & Stats Column */}
          <div className="lg:col-span-4 space-y-8 bg-white/[0.03] border border-white/[0.08] p-8 rounded-3xl backdrop-blur-md shadow-2xl">
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#F5F2ED]/50">
                Core Capabilities
              </h3>
              <ul className="space-y-3 text-sm font-medium text-[#F5F2ED]/85 font-sans">
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

            <div className="pt-2">
              <Link
                to="/services"
                className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-[#8B0D1A] text-[#F5F2ED] hover:bg-[#A81124] transition-all duration-300 font-semibold text-xs tracking-wide uppercase shadow-lg shadow-[#8B0D1A]/25"
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

