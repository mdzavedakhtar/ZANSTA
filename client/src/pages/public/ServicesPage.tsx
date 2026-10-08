import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FadeIn } from '@/components/motion/FadeIn';
import { serviceService } from '@/services/serviceService';
import { CMSService } from '@/types/cms';
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

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<CMSService[]>([]);

  useEffect(() => {
    // Initial sync read from cache
    const initial = serviceService.getServices().filter((s) => s.isVisible !== false);
    setServices(initial);

    // Live async fetch from backend API
    serviceService.fetchServices().then((list) => {
      if (list && list.length > 0) {
        const visibleList = list.filter((s) => s.isVisible !== false);
        setServices(visibleList);
      }
    });
  }, []);

  return (
    <div className="pt-28 pb-20">
      <SEO
        title="Software Engineering & Generative AI Services"
        description="Explore ZANSTA's engineering capabilities: full-stack web applications, autonomous generative AI systems, RAG document pipelines, and scalable cloud architectures."
        keywords="ZANSTA services, web engineering, generative AI tools development, full stack MERN, Next.js, Python, data analytics, custom software agency"
      />
      <Container size="xl">
        <FadeIn className="max-w-2xl space-y-4 mb-12">
          <Badge variant="crimson" size="md">ZANSTA AGENCY SERVICES</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight font-display text-[#F5F2ED]">
            WE BUILD & SHIP PRODUCTION SOFTWARE.
          </h1>
          <p className="text-[#F5F2ED]/55 text-sm">
            Leverage our specialized engineering team to design, build, and deploy your next-generation software products.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = (service.iconName && iconMap[service.iconName]) ? iconMap[service.iconName] : Code2;
            return (
              <Card key={service.id || service.name} glowOnHover className="space-y-4 flex flex-col justify-between overflow-hidden group">
                <div className="space-y-4">
                  {/* Service Image banner if available */}
                  {service.imageUrl && (
                    <div className="w-full h-44 rounded-xl overflow-hidden bg-black/40 border border-white/10 relative">
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {service.tag && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="crimson" size="sm">
                            {service.tag}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 flex items-center justify-center text-[#8B0D1A] shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#F5F2ED] font-display">{service.name}</h3>
                      {service.tag && !service.imageUrl && (
                        <span className="text-[10px] font-mono text-[#8B0D1A] uppercase tracking-wider">{service.tag}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#F5F2ED]/60 leading-relaxed font-sans line-clamp-3">
                    {service.shortDescription || service.fullDescription}
                  </p>

                  {/* Tech stack badges */}
                  {service.techStack && service.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {service.techStack.map((tech) => (
                        <Badge key={tech} variant="neutral" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B0D1A] hover:underline">
                    Request Proposal <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
};
