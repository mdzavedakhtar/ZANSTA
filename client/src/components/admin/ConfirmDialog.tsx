import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
  isLoading = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-[#0E0E0E] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#F5F2ED]/40 hover:text-[#F5F2ED] p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A] shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="space-y-1 pt-1">
                <h3 className="text-lg font-bold text-[#F5F2ED] font-display">{title}</h3>
                <p className="text-xs text-[#F5F2ED]/60 leading-relaxed font-sans">{description}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/05">
              <Button size="sm" variant="ghost" onClick={onClose} disabled={isLoading}>
                {cancelLabel}
              </Button>
              <Button
                size="sm"
                variant="glow"
                isLoading={isLoading}
                onClick={onConfirm}
                className="bg-[#8B0D1A] hover:bg-[#8B0D1A]/90 text-white border-[#8B0D1A]"
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
