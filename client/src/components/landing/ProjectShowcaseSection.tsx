import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../motion/ScrollReveal';
import { ExternalLink, ArrowRight, Star, Quote } from 'lucide-react';
import { projectService } from '@/services/projectService';
import { CMSProject } from '@/types/cms';

export const ProjectShowcaseSection: React.FC = () => {
  const [projects, setProjects] = useState<CMSProject[]>([]);

  useEffect(() => {
    const list = projectService.getProjects({ isFeatured: true, isVisible: true });
    setProjects(list.length > 0 ? list : projectService.getProjects({ isVisible: true }));
  }, []);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-28 bg-[#050505] border-b border-white/[0.06] relative selection:bg-[#8B0D1A]/30">
      <Container size="xl">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <Badge variant="crimson" size="md">PORTFOLIO SHOWCASE</Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-[#F5F2ED]">
            SELECTED WORK.
          </h2>
          <p className="text-[#F5F2ED]/55 text-sm sm:text-base font-sans">
            High-performance applications and autonomous AI platforms engineered for market-leading clients.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <ScrollReveal key={p.id} delay={idx * 0.12}>
              <Card
                surfaceTier="100"
                glowOnHover
                className="group h-full flex flex-col justify-between space-y-6 border border-white/10 overflow-hidden relative"
              >
                <div className="space-y-4">
                  {/* Image Container with Parallax Zoom */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/05">
                    <img
                      src={p.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <Badge variant="crimson" size="sm">
                        {p.category}
                      </Badge>
                      <Badge variant={p.status === 'LIVE' || p.status === 'COMPLETED' ? 'active' : 'neutral'} size="sm">
                        {p.status}
                      </Badge>
                    </div>

                    {/* Star Rating Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-lg flex items-center gap-1 text-xs font-mono text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{p.clientRating || '5.0'}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-[#F5F2ED] tracking-tight font-display group-hover:text-[#8B0D1A] transition-colors">
                      {p.name}
                    </h3>
                    {p.clientName && (
                      <p className="text-xs font-mono text-[#8B0D1A] mt-1 font-semibold">
                        Client: {p.clientName}
                      </p>
                    )}
                    <p className="text-xs text-[#F5F2ED]/60 mt-2 leading-relaxed font-sans line-clamp-3">
                      {p.shortDescription}
                    </p>
                  </div>

                  {/* Review Quote Snippet */}
                  {p.clientReviewPreview && (
                    <div className="p-3 rounded-xl bg-white/05 border border-white/05 flex items-start gap-2 text-[11px] font-sans text-[#F5F2ED]/80 italic">
                      <Quote className="w-3.5 h-3.5 text-[#8B0D1A] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">"{p.clientReviewPreview}"</span>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.techStack.map((t) => (
                      <Badge key={t} variant="neutral" size="sm">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  <Link to={`/projects/${p.slug}`}>
                    <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      View Case Study
                    </Button>
                  </Link>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer">
                      <Button size="sm" variant="ghost" rightIcon={<ExternalLink className="w-3.5 h-3.5 text-[#8B0D1A]" />}>
                        Live Demo
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
