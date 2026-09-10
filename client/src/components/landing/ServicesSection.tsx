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
    <section id="services" className="py-28 bg-[#080808] border-b border-white/[0.06] relative selection:bg-[#8B0D1A]/30">
      <Container size="xl">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <Badge variant="crimson" size="md">AGENCY CAPABILITIES</Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-[#F5F2ED]">
            WHAT WE BUILD.
          </h2>
          <p className="text-[#F5F2ED]/55 text-sm sm:text-base font-sans">
            End-to-end digital engineering, design, and AI solutions tailored for high-growth startups and enterprises.
          </p>
        </ScrollReveal>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((s, idx) => {
            const Icon = s.icon;
            return (
              <ScrollReveal key={s.title} delay={idx * 0.05}>
                <div className="group relative bg-[#0E0E0E] hover:bg-[#121212] border border-white/10 hover:border-[#8B0D1A]/50 rounded-2xl p-6 transition-all duration-300 h-full flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_10px_30px_rgba(139,13,26,0.15)] hover:-translate-y-1">
                  {/* Subtle Background Glow */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#8B0D1A]/10 rounded-full blur-2xl group-hover:bg-[#8B0D1A]/20 transition-colors pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A] group-hover:scale-110 group-hover:bg-[#8B0D1A] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="neutral" size="sm" className="font-mono text-[10px]">
                        {s.tag}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#F5F2ED] font-display group-hover:text-[#8B0D1A] transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-xs text-[#F5F2ED]/60 mt-2 leading-relaxed font-sans">
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/05 flex items-center justify-between text-xs font-mono text-[#F5F2ED]/40 group-hover:text-[#8B0D1A] transition-colors mt-6">
                    <span>Explore Capability</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
