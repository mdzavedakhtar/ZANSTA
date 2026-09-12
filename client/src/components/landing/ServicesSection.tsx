import React from 'react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { ScrollReveal } from '../motion/ScrollReveal';
import {
  Layout,
  Code2,
  Search,
  TrendingUp,
  Globe,
  Smartphone,
  BarChart3,
  Bot,
  Sparkles,
  Share2,
  Video,
  ArrowRight,
} from 'lucide-react';

interface ServiceItem {
  title: string;
  desc: string;
  icon: React.ElementType;
  tag: string;
}

const servicesList: ServiceItem[] = [
  {
    title: 'Frontend Design',
    desc: 'Pixel-perfect 2026 dark UI/UX design systems with fluid Framer Motion animations and magnetic interactions.',
    icon: Layout,
    tag: 'UI / UX',
  },
  {
    title: 'Full Stack Website Development',
    desc: 'Scalable MERN/Next.js web applications engineered with clean microservices and real-time WebSockets.',
    icon: Code2,
    tag: 'Full Stack',
  },
  {
    title: 'SEO Design & Optimization',
    desc: 'High-speed technical SEO architecture, structured metadata schema, and performance optimizations.',
    icon: Search,
    tag: 'Growth',
  },
  {
    title: 'Digital Marketing',
    desc: 'Data-driven acquisition campaigns, multi-channel performance marketing, and conversion rate optimization.',
    icon: TrendingUp,
    tag: 'Marketing',
  },
  {
    title: 'Website Development',
    desc: 'Ultra-fast marketing websites and landing pages optimized for maximum conversion and high engagement.',
    icon: Globe,
    tag: 'Web',
  },
  {
    title: 'App Development',
    desc: 'Cross-platform iOS & Android mobile applications built with React Native and native module performance.',
    icon: Smartphone,
    tag: 'Mobile',
  },
  {
    title: 'Data Analytics with Generative AI',
    desc: 'Real-time telemetry dashboards integrated with custom LLMs for automated business intelligence.',
    icon: BarChart3,
    tag: 'Analytics',
  },
  {
    title: 'Generative AI Tools Development',
    desc: 'Autonomous multi-agent engines, RAG vector database pipelines, and custom AI workflow automation.',
    icon: Bot,
    tag: 'AI / ML',
  },
  {
    title: 'Websites with AI Features',
    desc: 'Smart web apps embedded with intelligent search, dynamic personalization, and generative AI features.',
    icon: Sparkles,
    tag: 'AI Web',
  },
  {
    title: 'Social Media Handling',
    desc: 'Comprehensive brand positioning, content calendar strategy, and social growth management.',
    icon: Share2,
    tag: 'Social',
  },
  {
    title: 'Video Editing & Motion Graphics',
    desc: 'High-impact launch trailers, promo videos, and cinematic product animations engineered for social viral reach.',
    icon: Video,
    tag: 'Media',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-28 lg:py-36 bg-[#050508] border-b border-white/[0.08] relative">
      <Container size="xl">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-wider">
            AGENCY CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight font-display text-white">
            WHAT WE BUILD.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
            End-to-end digital engineering, design, and AI solutions tailored for high-growth startups and enterprises.
          </p>
        </ScrollReveal>

        {/* Codex 3-Column Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesList.map((s, idx) => {
            const Icon = s.icon;
            return (
              <ScrollReveal key={s.title} delay={idx * 0.05}>
                <div className="group relative bg-[#0c0d12] hover:bg-[#101118] border border-white/[0.08] hover:border-white/20 rounded-3xl p-6 md:p-8 transition-all duration-300 h-full flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1">
                  {/* Top Ambient Glow Preview Container */}
                  <div className="relative rounded-2xl bg-[#12131b] border border-white/[0.06] p-6 mb-6 overflow-hidden flex items-center justify-between min-h-[110px]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#4c1d95]/20 via-[#8B0D1A]/15 to-transparent blur-xl pointer-events-none" />
                    
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white relative z-10 group-hover:scale-110 transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="relative z-10 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300">
                      {s.tag}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2.5 flex-1">
                    <h3 className="text-xl font-semibold text-white font-display group-hover:text-white transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                      {s.desc}
                    </p>
                  </div>

                  {/* Bottom Codex White Pill Button */}
                  <div className="pt-6">
                    <button className="w-full py-3 px-4 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-md">
                      <span>Explore Capability</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
