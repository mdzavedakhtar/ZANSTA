import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // All icons use off-white; crimson dot accent distinguishes type
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#F5F2ED]/80" />,
    error:   <AlertCircle  className="w-5 h-5 text-[#8B0D1A]" />,
    info:    <Info         className="w-5 h-5 text-[#F5F2ED]/60" />,
  };

  const accents = {
    success: 'border-l-[#F5F2ED]/30',
    error:   'border-l-[#8B0D1A]',
    info:    'border-l-[#F5F2ED]/15',
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={cn(
                'pointer-events-auto flex items-center gap-3 bg-[#0E0E0E] border border-[#F5F2ED]/12 border-l-4 px-4 py-3 rounded-xl shadow-2xl min-w-[280px] max-w-md',
                accents[t.type]
              )}
            >
              {icons[t.type]}
              <p className="text-sm font-medium text-[#F5F2ED]/90 flex-1">{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className="text-[#F5F2ED]/40 hover:text-[#F5F2ED] p-1 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
