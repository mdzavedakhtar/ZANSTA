import React, { useEffect, useState } from 'react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { ScrollReveal } from '../motion/ScrollReveal';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { reviewService } from '@/services/reviewService';
import { CMSReview } from '@/types/cms';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CMSReview[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const list = reviewService.getReviews({ isVisible: true });
    setReviews(list);
  }, []);

  if (reviews.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-28 lg:py-36 bg-[#050508] border-b border-white/[0.08] relative overflow-hidden">
      <Container size="xl">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-wider">
            TESTIMONIALS & REVIEWS
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight font-display text-white">
            TRUSTED BY THE PEOPLE WE BUILD FOR.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
            Hear directly from founders, CTOs, and product directors who built their digital platforms with ZANSTA.
          </p>
        </ScrollReveal>

        {/* Carousel / Codex Card Showcase */}
        <div className="max-w-4xl mx-auto relative">
          <ScrollReveal>
            <div className="p-8 sm:p-14 space-y-8 bg-[#0c0d12] border border-white/[0.08] rounded-3xl relative overflow-hidden shadow-2xl">
              {/* Soft Ambient Radial Background Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#3b0764]/20 via-[#8B0D1A]/10 to-transparent blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 relative z-10">
                <div className="flex items-center gap-1.5 text-amber-400">
                  {[...Array(reviews[activeIndex]?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                {reviews[activeIndex]?.projectName && (
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                    Project: {reviews[activeIndex].projectName}
                  </span>
                )}
              </div>

              {/* Review Text */}
              <div className="space-y-4 relative z-10">
                <Quote className="w-10 h-10 text-white/20" />
                <p className="text-lg sm:text-2xl font-medium text-white font-sans leading-relaxed italic">
                  "{reviews[activeIndex]?.reviewText}"
                </p>
              </div>

              {/* Client Info & Carousel Controls */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  <Avatar
                    name={reviews[activeIndex]?.clientName}
                    src={reviews[activeIndex]?.clientImage}
                    size="lg"
                    className="border border-white/10"
                  />
                  <div>
                    <h4 className="text-base font-semibold text-white font-display">
                      {reviews[activeIndex]?.clientName}
                    </h4>
                    <p className="text-xs font-mono text-[#8B0D1A]">
                      {reviews[activeIndex]?.clientRole} — {reviews[activeIndex]?.companyName}
                    </p>
                  </div>
                </div>

                {reviews.length > 1 && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 transition-all flex items-center justify-center"
                      aria-label="Previous Review"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono text-zinc-400">
                      {activeIndex + 1} / {reviews.length}
                    </span>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 transition-all flex items-center justify-center"
                      aria-label="Next Review"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
};
