import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

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
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'fixed top-0 bottom-0 z-10 w-full max-w-md bg-[#0E0E0E] border-white/10 p-6 flex flex-col shadow-2xl',
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
