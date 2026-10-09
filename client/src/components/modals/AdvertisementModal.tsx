import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { bannerService } from '@/services/bannerService';
import { CMSBanner } from '@/types/cms';
import { useCmsLiveSync } from '@/hooks/useCmsLiveSync';
import {
  Flame,
  Zap,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface AdvertisementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvertisementModal: React.FC<AdvertisementModalProps> = ({ isOpen, onClose }) => {
  const [banners, setBanners] = useState<CMSBanner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const loadBanners = async () => {
    const local = bannerService.getBanners({ isVisible: true });
    setBanners(local);
    try {
      const fresh = await bannerService.fetchBanners({ isVisible: true });
      if (fresh && fresh.length > 0) setBanners(fresh);
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadBanners();
    }
  }, [isOpen]);

  useCmsLiveSync('banner', () => {
    loadBanners();
  });

  // Auto rotation every 5 seconds when modal is open and not paused
  useEffect(() => {
    if (!isOpen || banners.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, banners.length, isPaused]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentBanner = banners[currentIndex % Math.max(banners.length, 1)];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleBannerAction = () => {
    onClose();
    if (currentBanner?.targetUrl) {
      if (currentBanner.targetUrl.startsWith('http')) {
        window.open(currentBanner.targetUrl, '_blank');
      } else {
        navigate(currentBanner.targetUrl);
      }
    } else {
      navigate('/contact');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-[#0B0B0B] border border-[#8B0D1A]/45 shadow-[0_20px_60px_rgba(139,13,26,0.4)] text-[#F5F2ED] z-10"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F5F2ED]/10 bg-[#0E0E0E]/90">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B0D1A]"></span>
              </span>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#F5F2ED]/90 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                Featured Announcement & Offers
              </span>
              {banners.length > 1 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8B0D1A]/20 border border-[#8B0D1A]/40 text-[#F5F2ED]/80">
                  {currentIndex + 1} / {banners.length}
                </span>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#F5F2ED]/50 hover:text-[#F5F2ED] hover:bg-[#F5F2ED]/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Poster Content */}
          {currentBanner ? (
            <div className="relative">
              {/* Poster Landscape Image Container */}
              <div className="relative w-full h-56 sm:h-72 overflow-hidden bg-[#050505] group">
                <img
                  src={currentBanner.imageUrl}
                  alt={currentBanner.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Brand gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#8B0D1A]/25 via-transparent to-transparent" />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  {currentBanner.badgeText && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#8B0D1A] px-3 py-1 text-xs font-mono font-bold text-white shadow-lg border border-red-400/30">
                      <Flame className="w-3 h-3 text-amber-300" />
                      {currentBanner.badgeText}
                    </span>
                  )}
                  {currentBanner.discountText && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#141414]/90 border border-[#8B0D1A]/50 px-3 py-1 text-xs font-mono font-extrabold text-[#F5F2ED] shadow-md backdrop-blur-md">
                      <Zap className="w-3 h-3 text-[#E11D48]" />
                      {currentBanner.discountText}
                    </span>
                  )}
                </div>

                {/* Left / Right Carousel Switch Buttons */}
                {banners.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-[#8B0D1A] text-[#F5F2ED] border border-white/10 hover:border-[#8B0D1A] transition-all backdrop-blur-sm z-10"
                      title="Previous Poster"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-[#8B0D1A] text-[#F5F2ED] border border-white/10 hover:border-[#8B0D1A] transition-all backdrop-blur-sm z-10"
                      title="Next Poster"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Text Information & CTA */}
              <div className="p-5 sm:p-6 space-y-4 bg-[#0B0B0B]">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#F5F2ED] tracking-tight font-display leading-snug">
                    {currentBanner.title}
                  </h3>
                  {currentBanner.subtitle && (
                    <p className="mt-1.5 text-xs sm:text-sm text-[#F5F2ED]/65 font-sans leading-relaxed">
                      {currentBanner.subtitle}
                    </p>
                  )}
                </div>

                {/* Footer Controls & CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#F5F2ED]/10">
                  {/* Slide Selector Indicator Dots */}
                  {banners.length > 1 ? (
                    <div className="flex items-center gap-1.5">
                      {banners.map((b, idx) => (
                        <button
                          key={b.id || idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === currentIndex % banners.length
                              ? 'w-7 bg-[#8B0D1A] shadow-[0_0_10px_rgba(139,13,26,0.8)]'
                              : 'w-2 bg-white/20 hover:bg-white/40'
                          }`}
                          title={`Poster ${idx + 1}`}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-[#F5F2ED]/40 font-mono">Verified ZANSTA Release</span>
                  )}

                  {/* Primary Action Button */}
                  <button
                    onClick={handleBannerAction}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B0D1A] hover:bg-[#A01020] text-[#F5F2ED] text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(139,13,26,0.45)] hover:shadow-[0_0_25px_rgba(139,13,26,0.65)] transition-all cursor-pointer group"
                  >
                    <span>{currentBanner.ctaText || 'Claim Offer'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center space-y-3">
              <p className="text-sm text-[#F5F2ED]/60">No active advertisements at the moment.</p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/contact');
                }}
                className="px-4 py-2 rounded-lg bg-[#8B0D1A] text-white text-xs font-semibold"
              >
                Contact for Services
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
