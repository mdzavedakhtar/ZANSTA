import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { Avatar } from '../ui/Avatar';
import { ScrollReveal } from '../motion/ScrollReveal';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Building2,
} from 'lucide-react';
import { reviewService } from '@/services/reviewService';
import { CMSReview } from '@/types/cms';
import { useCmsLiveSync } from '@/hooks/useCmsLiveSync';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CMSReview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const loadReviews = () => {
    const list = reviewService.getReviews({ isVisible: true });
    setReviews(list);

    reviewService.fetchReviews({ isVisible: true }).then((freshList) => {
      if (Array.isArray(freshList) && freshList.length > 0) {
        setReviews(freshList);
      }
    });
  };

  useEffect(() => {
    loadReviews();
  }, []);

  useCmsLiveSync('review', () => {
    loadReviews();
  });

  // Auto slide rotation every 6 seconds when not hovered
  useEffect(() => {
    if (reviews.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reviews.length, isPaused]);

  if (reviews.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Compute 3 items for desktop / tablet
  const visibleCount = Math.min(reviews.length, 3);
  const displayedReviews = Array.from({ length: visibleCount }, (_, i) => {
    return reviews[(currentIndex + i) % reviews.length];
  });

  return (
    <section
      id="reviews"
      className="py-24 lg:py-36 bg-[#050508] border-b border-white/[0.08] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft Ambient Radial Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#8B0D1A]/10 via-[#3b0764]/12 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B0D1A]/10 border border-[#8B0D1A]/35 text-xs font-mono text-[#F5F2ED] uppercase tracking-wider shadow-[0_0_15px_rgba(139,13,26,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>TESTIMONIALS & CLIENT SUCCESS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-[#F5F2ED] uppercase">
              TRUSTED BY THE PEOPLE WE BUILD FOR.
            </h2>
            <p className="text-[#F5F2ED]/60 text-sm sm:text-base font-sans leading-relaxed">
              Hear directly from founders, CTOs, and product leaders who scaled their digital platforms with ZANSTA.
            </p>
          </ScrollReveal>

          {/* Slider Arrow Controls */}
          {reviews.length > 1 && (
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-[#F5F2ED]/50 mr-1">
                {currentIndex + 1} / {reviews.length}
              </span>
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-[#0C0D14] hover:bg-[#8B0D1A] border border-white/10 hover:border-[#8B0D1A] text-[#F5F2ED] flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 group"
                aria-label="Previous Reviews"
                title="Previous Reviews"
              >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-[#0C0D14] hover:bg-[#8B0D1A] border border-white/10 hover:border-[#8B0D1A] text-[#F5F2ED] flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 group"
                aria-label="Next Reviews"
                title="Next Reviews"
              >
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
        </div>

        {/* 3-Card Grid Showcase with Sliding Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {displayedReviews.map((review, idx) => (
              <motion.div
                key={`${review.id}-${currentIndex}-${idx}`}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="h-full"
              >
                <div className="h-full flex flex-col justify-between bg-[#0C0D14] border border-white/[0.08] hover:border-[#8B0D1A]/50 p-6 sm:p-7 rounded-2xl relative overflow-hidden shadow-xl hover:shadow-[0_15px_40px_rgba(139,13,26,0.22)] transition-all duration-300 hover:-translate-y-1.5 group">
                  {/* Subtle top ambient red gradient */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#8B0D1A]/15 via-transparent to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-[#8B0D1A]/30 transition-all" />

                  <div className="space-y-4 relative z-10">
                    {/* Top Row: Stars + Project Tag */}
                    <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                      {/* 5 Golden Stars */}
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(review.rating || 5)].map((_, starIdx) => (
                          <Star key={starIdx} className="w-3.5 h-3.5 fill-current drop-shadow-sm" />
                        ))}
                      </div>

                      {/* Project Tag */}
                      {review.projectName && (
                        <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-[#F5F2ED]/70 truncate max-w-[150px]">
                          {review.projectName}
                        </span>
                      )}
                    </div>

                    {/* Quote Icon & Review Text */}
                    <div className="space-y-3 pt-1">
                      <Quote className="w-7 h-7 text-[#8B0D1A]/40 group-hover:text-[#8B0D1A] transition-colors" />
                      <p className="text-xs sm:text-sm font-sans leading-relaxed text-[#F5F2ED]/85 italic">
                        "{review.reviewText}"
                      </p>
                    </div>
                  </div>

                  {/* Client Info Footer */}
                  <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between gap-3 relative z-10 mt-6">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar
                        name={review.clientName}
                        src={review.clientImage}
                        size="md"
                        className="border border-[#8B0D1A]/30 group-hover:border-[#8B0D1A] transition-colors shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-[#F5F2ED] font-display truncate">
                          {review.clientName}
                        </h4>
                        <p className="text-[11px] font-mono text-[#FF4D61] truncate font-medium">
                          {review.clientRole}
                        </p>
                        <p className="text-[10px] font-sans text-[#F5F2ED]/50 truncate flex items-center gap-1 mt-0.5">
                          <Building2 className="w-2.5 h-2.5 shrink-0 text-[#F5F2ED]/40" />
                          {review.companyName}
                        </p>
                      </div>
                    </div>

                    {/* Verified Badge */}
                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400" title="Verified Client Project">
                        <ShieldCheck className="w-3 h-3" />
                        <span className="hidden sm:inline">Verified</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Dots Indicator */}
        {reviews.length > 1 && (
          <div className="flex items-center justify-center gap-2 pt-10">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Jump to review slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex % reviews.length
                    ? 'w-8 bg-[#8B0D1A] shadow-[0_0_10px_rgba(139,13,26,0.8)]'
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
