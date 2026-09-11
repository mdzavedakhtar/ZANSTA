import React from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { Container } from '../ui/Container';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WarmLightResetSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#F5F2ED] text-[#0B0B0B] relative overflow-hidden select-none">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Statement Column */}
          <div className="lg:col-span-8 space-y-6">
            <ScrollReveal direction="up" once={true}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0B0B]/08 border border-[#0B0B0B]/15 text-xs font-mono font-semibold uppercase tracking-widest text-[#0B0B0B]/70">
                <span>Studio Philosophy</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="spatialDepth" delay={0.1} once={true}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tightest font-display text-[#0B0B0B] leading-[1.08]">
                DIGITAL PRODUCTS ENGINEERED WITH RESTRAINT, SPEED &amp; PRECISION.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} once={true}>
              <p className="text-base sm:text-lg text-[#0B0B0B]/75 max-w-2xl leading-relaxed font-sans font-normal">
                We bridge the gap between creative direction and high-throughput software architecture. ZANSTA partners with ambitious founders and engineering teams to transform complex visions into production-grade digital realities.
              </p>
            </ScrollReveal>
          </div>

          {/* Action & Stats Column */}
          <div className="lg:col-span-4 space-y-8 bg-[#0B0B0B]/04 border border-[#0B0B0B]/10 p-8 rounded-3xl backdrop-blur-sm">
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0B0B0B]/50">
                Core Capabilities
              </h3>
              <ul className="space-y-2 text-sm font-medium text-[#0B0B0B]/80 font-sans">
                <li className="flex items-center justify-between py-1 border-b border-[#0B0B0B]/08">
                  <span>Product Design &amp; Systems</span>
                  <span className="font-mono text-xs text-[#8B0D1A] font-bold">01</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-[#0B0B0B]/08">
                  <span>Frontend &amp; Web Architectures</span>
                  <span className="font-mono text-xs text-[#8B0D1A] font-bold">02</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-[#0B0B0B]/08">
                  <span>AI Agent Integration</span>
                  <span className="font-mono text-xs text-[#8B0D1A] font-bold">03</span>
                </li>
                <li className="flex items-center justify-between py-1">
                  <span>ZANSTA Team Workspace Engine</span>
                  <span className="font-mono text-xs text-[#8B0D1A] font-bold">04</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                to="/services"
                className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-[#0B0B0B] text-[#F5F2ED] hover:bg-[#8B0D1A] transition-colors duration-300 font-semibold text-xs tracking-wide uppercase"
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
