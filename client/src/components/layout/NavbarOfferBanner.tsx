import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { bannerService } from '@/services/bannerService';
import { CMSBanner } from '@/types/cms';
import { useCmsLiveSync } from '@/hooks/useCmsLiveSync';
import {
  Flame,
  Tag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  X,
  Megaphone,
} from 'lucide-react';

export const NavbarOfferBanner: React.FC = () => {
  const [banners, setBanners] = useState<CMSBanner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const loadBanners = async () => {
    const local = bannerService.getBanners({ isVisible: true });
    setBanners(local);
    try {
      const fresh = await bannerService.fetchBanners({ isVisible: true });
      if (fresh && fresh.length > 0) setBanners(fresh);
    } catch (e) {
      console.warn('NavbarOfferBanner refresh notice:', e);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  // Live real-time sync when superadmin changes posters
  useCmsLiveSync('banner', () => {
    loadBanners();
  });

  // 5-second automatic rotation
  useEffect(() => {
    if (banners.length <= 1 || isPaused || isCollapsed) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [banners.length, isPaused, isCollapsed]);

  if (banners.length === 0 || isCollapsed) return null;

  const currentBanner = banners[currentIndex % banners.length];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleBannerClick = () => {
    if (currentBanner?.targetUrl) {
      if (currentBanner.targetUrl.startsWith('http')) {
        window.open(currentBanner.targetUrl, '_blank');
      } else {
        navigate(currentBanner.targetUrl);
      }
    }
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden rounded-2xl mb-2.5 border border-cyan-500/30 bg-zinc-950/90 shadow-[0_4px_25px_rgba(0,240,255,0.15)] backdrop-blur-xl transition-all"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner.id || currentIndex}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -25 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          onClick={handleBannerClick}
          className="relative flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-2 sm:py-2.5 cursor-pointer group"
        >
          {/* Landscape Poster Background with cyber tint */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              src={currentBanner.imageUrl}
              alt={currentBanner.title}
              className="w-full h-full object-cover object-center opacity-25 filter blur-[1px] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
          </div>

          {/* Left: Badges + Landscape Thumbnail + Title */}
          <div className="flex items-center gap-3 min-w-0 flex-1 z-10">
            {/* Landscape Mini Poster Image */}
            <div className="hidden sm:block relative w-16 h-10 rounded-lg overflow-hidden border border-cyan-500/40 shrink-0 shadow-md">
              <img
                src={currentBanner.imageUrl}
                alt="Banner Poster"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay" />
            </div>

            {/* Badges & Content */}
            <div className="space-y-0.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {currentBanner.badgeText && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300 shadow-sm">
                    <Flame className="w-2.5 h-2.5 text-amber-400" />
                    {currentBanner.badgeText}
                  </span>
                )}
                {currentBanner.discountText && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 text-[10px] font-mono font-extrabold text-cyan-300 shadow-sm">
                    <Zap className="w-2.5 h-2.5 text-cyan-400" />
                    {currentBanner.discountText}
                  </span>
                )}
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                  Auto-switch 5s
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight font-display truncate group-hover:text-cyan-300 transition-colors">
                  {currentBanner.title}
                </h4>
              </div>
              {currentBanner.subtitle && (
                <p className="hidden md:block text-[11px] text-zinc-400 font-sans truncate">
                  {currentBanner.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right: CTA Button & Slide Controls */}
          <div className="flex items-center gap-2 shrink-0 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold shadow-inner group-hover:bg-cyan-500 group-hover:text-black transition-all">
              {currentBanner.ctaText || 'Claim Offer'}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>

            {/* Slider Navigation Chevrons */}
            {banners.length > 1 && (
              <div className="flex items-center gap-1 ml-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1 rounded-md bg-zinc-900/80 border border-zinc-700/60 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  title="Previous Offer"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1 rounded-md bg-zinc-900/80 border border-zinc-700/60 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  title="Next Offer"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Close / Collapse button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(true);
              }}
              className="p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors ml-1"
              title="Hide Offer Bar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
          {banners.map((b, idx) => (
            <button
              key={b.id || idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`h-1 rounded-full transition-all ${
                idx === currentIndex % banners.length
                  ? 'w-6 bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]'
                  : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
