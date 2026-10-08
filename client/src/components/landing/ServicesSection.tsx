import React, { useEffect, useState } from 'react';
import { Container } from '../ui/Container';
import { ScrollReveal } from '../motion/ScrollReveal';
import { serviceService } from '@/services/serviceService';
import { CMSService } from '@/types/cms';
import { useCmsLiveSync } from '@/hooks/useCmsLiveSync';
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

const iconMap: Record<string, React.ElementType> = {
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
};

const defaultServicesDisplay: Partial<CMSService>[] = [
  {
    name: 'Frontend Design',
    shortDescription: 'Pixel-perfect 2026 dark UI/UX design systems with fluid Framer Motion animations and magnetic interactions.',
    iconName: 'Layout',
    tag: 'UI / UX',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    isVisible: true,
  },
  {
    name: 'Full Stack Website Development',
    shortDescription: 'Scalable MERN/Next.js web applications engineered with clean microservices and real-time WebSockets.',
    iconName: 'Code2',
    tag: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    isVisible: true,
  },
  {
    name: 'SEO Design & Optimization',
    shortDescription: 'High-speed technical SEO architecture, structured metadata schema, and performance optimizations.',
    iconName: 'Search',
    tag: 'Growth',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    isVisible: true,
  },
  {
    name: 'Digital Marketing',
    shortDescription: 'Data-driven acquisition campaigns, multi-channel performance marketing, and conversion rate optimization.',
    iconName: 'TrendingUp',
    tag: 'Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=800&auto=format&fit=crop',
    isVisible: true,
  },
  {
    name: 'Website Development',
    shortDescription: 'Ultra-fast marketing websites and landing pages optimized for maximum conversion and high engagement.',
    iconName: 'Globe',
    tag: 'Web',
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
    isVisible: true,
  },
  {
    name: 'App Development',
    shortDescription: 'Cross-platform iOS & Android mobile applications built with React Native and native module performance.',
    iconName: 'Smartphone',
    tag: 'Mobile',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    isVisible: true,
  },
  {
    name: 'Data Analytics with Generative AI',
    shortDescription: 'Real-time telemetry dashboards integrated with custom LLMs for automated business intelligence.',
    iconName: 'BarChart3',
    tag: 'Analytics',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    isVisible: true,
  },
  {
    name: 'Generative AI Tools Development',
    shortDescription: 'Autonomous multi-agent engines, RAG vector database pipelines, and custom AI workflow automation.',
    iconName: 'Bot',
    tag: 'AI / ML',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    isVisible: true,
  },
  {
    name: 'Websites with AI Features',
    shortDescription: 'Smart web apps embedded with intelligent search, dynamic personalization, and generative AI features.',
    iconName: 'Sparkles',
    tag: 'AI Web',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    isVisible: true,
  },
];

export const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Partial<CMSService>[]>(() => {
    const cached = serviceService.getServices().filter((s) => s.isVisible);
    return cached.length > 0 ? cached : defaultServicesDisplay;
  });

  const loadServices = () => {
    serviceService.fetchServices().then((list) => {
      if (list && list.length > 0) {
        const visibleList = list.filter((s) => s.isVisible);
        if (visibleList.length > 0) setServices(visibleList);
      }
    });
  };

  useEffect(() => {
    loadServices();
  }, []);

  useCmsLiveSync('service', () => {
    loadServices();
  });

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

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

        {/* Codex 3-Column Card Grid Layout with Live Image Frame Fit */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, idx) => {
            const Icon = (s.iconName && iconMap[s.iconName]) || Code2;
            const tag = s.tag || 'Engineering';

            return (
              <ScrollReveal key={s.id || s.name || idx} delay={idx * 0.04}>
                <div className="group relative bg-[#0c0d12] hover:bg-[#101118] border border-white/[0.08] hover:border-white/20 rounded-3xl p-6 md:p-8 transition-all duration-300 h-full flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1">
                  {/* Top Image Frame / Ambient Header */}
                  <div className="relative rounded-2xl bg-[#12131b] border border-white/[0.08] mb-6 overflow-hidden flex items-center justify-between min-h-[140px] h-40 group-hover:border-white/20 transition-all">
                    {s.imageUrl ? (
                      <>
                        <img
                          src={s.imageUrl}
                          alt={s.name || 'Service Image'}
                          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        {/* Smooth gradient overlay to ensure contrast and readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-black/40 to-transparent pointer-events-none" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#4c1d95]/20 via-[#8B0D1A]/15 to-transparent blur-xl pointer-events-none" />
                    )}

                    {/* Frame Controls & Badges */}
                    <div className="relative z-10 w-11 h-11 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white m-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="relative z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white m-4 shadow-sm font-medium">
                      {tag}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2.5 flex-1">
                    <h3 className="text-xl font-semibold text-white font-display group-hover:text-white transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                      {s.shortDescription || s.fullDescription}
                    </p>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-6">
                    <button
                      onClick={scrollToContact}
                      className="w-full py-3 px-4 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
                    >
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
