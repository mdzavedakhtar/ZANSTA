import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, MessageSquare, ArrowRight, X, PhoneCall, Zap } from 'lucide-react';

export const ContactPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show popup inside admin dashboard or workspace to avoid interfering with management
  const isAdminOrWorkspace = location.pathname.startsWith('/admin') || location.pathname.startsWith('/workspace');

  useEffect(() => {
    if (isAdminOrWorkspace) {
      setIsVisible(false);
      return;
    }

    // Initial popup after 4 seconds of page load
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Recurring trigger every 30 seconds
    const interval = setInterval(() => {
      setIsVisible(true);
    }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isAdminOrWorkspace]);

  const handleOpenContact = () => {
    setIsVisible(false);
    if (location.pathname === '/contact') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/contact');
    }
  };

  if (isAdminOrWorkspace) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          exit={{ opacity: 0, y: -20, scale: 0.9, x: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-96 pointer-events-auto"
        >
          <div
            onClick={handleOpenContact}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-cyan-500/40 bg-zinc-950/90 p-5 shadow-[0_10px_35px_rgba(0,240,255,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_15px_45px_rgba(0,240,255,0.35)]"
          >
            {/* Glowing ambient background accents */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/20 blur-2xl transition-all group-hover:bg-cyan-500/30" />
            <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl transition-all group-hover:bg-emerald-500/30" />

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
              className="absolute right-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white z-10"
              title="Close Popup"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            {/* Header Badge */}
            <div className="mb-2.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                ⚡ LIVE CONSULTATION
              </span>
              <span className="text-[10px] font-mono text-zinc-500">24/7 Response</span>
            </div>

            {/* Main Content */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-inner group-hover:scale-105 transition-transform">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="flex-1 pr-6">
                <h4 className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  CONTACT FOR SERVICES
                  <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                </h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Looking for custom web apps, AI systems, or SEO platforms? Let&apos;s build your vision.
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-3.5 flex items-center justify-between border-t border-zinc-800/80 pt-3">
              <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1">
                <PhoneCall className="h-3 w-3 text-cyan-400" />
                Free Architecture Audit
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-black shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all group-hover:bg-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]">
                Get In Touch
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
