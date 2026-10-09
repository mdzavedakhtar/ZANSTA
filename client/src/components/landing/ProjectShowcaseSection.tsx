import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { ScrollReveal } from '../motion/ScrollReveal';
import { ExternalLink, ArrowRight, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectService } from '@/services/projectService';
import { CMSProject } from '@/types/cms';
import { useCmsLiveSync } from '@/hooks/useCmsLiveSync';

export const ProjectShowcaseSection: React.FC = () => {
  const [projects, setProjects] = useState<CMSProject[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const loadProjects = () => {
    const list = projectService.getProjects({ isFeatured: true, isVisible: true });
    setProjects(list.length > 0 ? list : projectService.getProjects({ isVisible: true }));

    projectService.fetchProjects({ isVisible: true }).then((freshList) => {
      if (Array.isArray(freshList)) {
        const featured = freshList.filter((p) => p.isFeatured && p.isVisible);
        setProjects(featured.length > 0 ? featured : freshList.filter((p) => p.isVisible));
      }
    });
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useCmsLiveSync('project', () => {
    loadProjects();
  });

  // 5-second automatic sliding effect
  useEffect(() => {
    if (projects.length <= 3 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [projects.length, isPaused]);

  if (projects.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Compute 3 visible cards in cyclical order if slider active
  const visibleProjects = projects.length > 3
    ? [
        projects[currentIndex % projects.length],
        projects[(currentIndex + 1) % projects.length],
        projects[(currentIndex + 2) % projects.length],
      ]
    : projects;

  return (
    <section
      id="projects"
      className="py-28 lg:py-36 bg-[#050508] border-b border-white/[0.08] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-wider">
              PORTFOLIO SHOWCASE
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight font-display text-white">
              SELECTED WORK.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
              High-performance applications and autonomous AI platforms engineered for market-leading clients.
            </p>
          </ScrollReveal>

          {/* Slider Controls if > 3 projects */}
          {projects.length > 3 && (
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-zinc-400 mr-2">
                Auto-Slide 5s ({currentIndex + 1}/{projects.length})
              </span>
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/05 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Previous Projects"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/05 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Next Projects"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Projects 3-Card Window */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((p, idx) => (
            <div key={`${p.id}-${currentIndex}-${idx}`} className="transition-all duration-500 ease-out">
              <div className="group h-full flex flex-col justify-between space-y-6 bg-[#0c0d12] border border-white/[0.08] hover:border-white/20 p-6 rounded-3xl overflow-hidden relative shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="space-y-4">
                  {/* Ambient Light Image Frame */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#12131b] border border-white/[0.06]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#3b0764]/20 via-[#8B0D1A]/10 to-transparent blur-md pointer-events-none" />
                    <img
                      src={p.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                        {p.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                        {p.status}
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute bottom-3 right-3 z-20 bg-black/80 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-mono text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{p.clientRating || '5.0'}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-white tracking-tight font-display group-hover:text-white transition-colors">
                      {p.name}
                    </h3>
                    {p.clientName && (
                      <p className="text-xs font-mono text-[#8B0D1A] mt-1 font-semibold">
                        Client: {p.clientName}
                      </p>
                    )}
                    <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed font-sans line-clamp-3">
                      {p.shortDescription}
                    </p>
                  </div>

                  {/* Review Snippet */}
                  {p.clientReviewPreview && (
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-2 text-[11px] font-sans text-zinc-300 italic">
                      <Quote className="w-3.5 h-3.5 text-[#8B0D1A] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">"{p.clientReviewPreview}"</span>
                    </div>
                  )}

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.techStack.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <Link to={`/projects/${p.slug}`}>
                    <button className="py-2.5 px-4 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-md cursor-pointer">
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer">
                      <button className="py-2.5 px-4 rounded-full bg-white/5 border border-white/10 text-white text-xs font-medium hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer">
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#8B0D1A]" />
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots if > 3 */}
        {projects.length > 3 && (
          <div className="flex items-center justify-center gap-2 pt-10">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Jump to project ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex % projects.length
                    ? 'w-8 bg-[#8B0D1A]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};
