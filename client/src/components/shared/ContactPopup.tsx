import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, ArrowRight, X, PhoneCall } from 'lucide-react';

export const ContactPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show popup inside admin dashboard or workspace to avoid interfering with workflows
  const isAdminOrWorkspace =
    location.pathname.startsWith('/admin') || location.pathname.startsWith('/workspace');

  useEffect(() => {
    if (isAdminOrWorkspace) {
      setIsVisible(false);
      return;
    }

    // Initial popup after 4 seconds of page load
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Recurring trigger every 45 seconds if dismissed
    const interval = setInterval(() => {
      setIsVisible(true);
    }, 45000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isAdminOrWorkspace]);

  const handleOpenContact = () => {
    setIsVisible(false);
    if (location.pathname === '/') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/contact');
  };

  if (isAdminOrWorkspace) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="fixed bottom-6 right-4 sm:right-7 z-40 pointer-events-auto"
        >
          <div
            onClick={handleOpenContact}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#8B0D1A]/50 bg-[#0B0B0B]/95 px-4 py-3 shadow-[0_10px_30px_rgba(139,13,26,0.35)] backdrop-blur-xl transition-all duration-300 hover:border-[#8B0D1A] hover:shadow-[0_12px_40px_rgba(139,13,26,0.5)] flex items-center gap-3.5 pr-11"
          >
            {/* Ambient crimson glow */}
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#8B0D1A]/25 blur-xl pointer-events-none transition-all group-hover:bg-[#8B0D1A]/35" />

            {/* Left Pulsing Icon */}
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#8B0D1A]/40 bg-[#8B0D1A]/15 text-[#F5F2ED] transition-transform group-hover:scale-105 shadow-inner">
              <PhoneCall className="h-4 w-4 text-[#F5F2ED]" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8B0D1A]"></span>
              </span>
            </div>

            {/* Content: Only "Contact for Services" as requested */}
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-wide text-[#F5F2ED] font-display uppercase group-hover:text-white transition-colors">
                Contact for Services
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-[#E11D48] transition-transform group-hover:translate-x-1" />
            </div>

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-lg text-[#F5F2ED]/50 hover:text-[#F5F2ED] hover:bg-[#F5F2ED]/10 transition-colors"
              title="Close"
              aria-label="Close notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
