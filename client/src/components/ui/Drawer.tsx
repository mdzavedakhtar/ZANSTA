import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: 'right' | 'left';
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  position = 'right',
  children,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        drawerRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        if (e.key === 'Tab' && drawerRef.current) {
          const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;

          const firstEl = focusables[0];
          const lastEl = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  const slideVariants = {
    hidden: { x: position === 'right' ? '100%' : '-100%' },
    visible: { x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.div
            ref={drawerRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={title || 'Drawer'}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'fixed top-0 bottom-0 z-10 w-full max-w-md bg-[#0E0E0E] border-white/10 p-6 flex flex-col shadow-2xl outline-none',
              position === 'right' ? 'right-0 border-l' : 'left-0 border-r'
            )}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              {title && <h3 className="text-lg font-bold text-[#F5F2ED]">{title}</h3>}
              <button
                onClick={onClose}
                className="text-[#F5F2ED]/55 hover:text-[#F5F2ED] p-1 rounded-lg hover:bg-white/5 transition-colors ml-auto"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
