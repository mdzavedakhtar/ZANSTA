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
    <section className="py-28 bg-[#080808] border-b border-white/[0.06] relative selection:bg-[#8B0D1A]/30 overflow-hidden">
      <Container size="xl">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="crimson" size="md">TESTIMONIALS & REVIEWS</Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-[#F5F2ED]">
            TRUSTED BY THE PEOPLE WE BUILD FOR.
          </h2>
          <p className="text-[#F5F2ED]/55 text-sm sm:text-base font-sans">
            Hear directly from founders, CTOs, and product directors who built their digital platforms with ZANSTA.
          </p>
        </ScrollReveal>

        {/* Carousel / Card Showcase */}
        <div className="max-w-4xl mx-auto relative">
          <ScrollReveal>
            <Card
              surfaceTier="100"
              className="p-8 sm:p-12 space-y-8 border border-white/10 relative overflow-hidden shadow-2xl bg-gradient-to-br from-[#0E0E0E] to-[#080808]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B0D1A]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/05 pb-6">
                <div className="flex items-center gap-1.5 text-amber-400">
                  {[...Array(reviews[activeIndex]?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                {reviews[activeIndex]?.projectName && (
                  <Badge variant="neutral" size="sm" className="font-mono text-xs">
                    Project: {reviews[activeIndex].projectName}
                  </Badge>
                )}
              </div>

              {/* Review Text */}
              <div className="space-y-4 relative z-10">
                <Quote className="w-10 h-10 text-[#8B0D1A]/30" />
                <p className="text-lg sm:text-2xl font-medium text-[#F5F2ED] font-sans leading-relaxed italic">
                  "{reviews[activeIndex]?.reviewText}"
                </p>
              </div>

              {/* Client Info & Carousel Navigation */}
              <div className="pt-6 border-t border-white/05 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar
                    name={reviews[activeIndex]?.clientName}
                    src={reviews[activeIndex]?.clientImage}
                    size="lg"
                  />
                  <div>
                    <h4 className="text-base font-bold text-[#F5F2ED] font-display">
                      {reviews[activeIndex]?.clientName}
                    </h4>
                    <p className="text-xs font-mono text-[#8B0D1A]">
                      {reviews[activeIndex]?.clientRole} — {reviews[activeIndex]?.companyName}
                    </p>
                  </div>
                </div>

                {reviews.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-2.5 rounded-xl bg-white/05 border border-white/10 text-[#F5F2ED]/70 hover:text-white hover:border-white/30 transition-colors"
                      aria-label="Previous Review"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono text-[#F5F2ED]/60">
                      {activeIndex + 1} / {reviews.length}
                    </span>
                    <button
                      onClick={handleNext}
                      className="p-2.5 rounded-xl bg-white/05 border border-white/10 text-[#F5F2ED]/70 hover:text-white hover:border-white/30 transition-colors"
                      aria-label="Next Review"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
};
