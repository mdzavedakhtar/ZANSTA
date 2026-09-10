import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '@/store/useNotificationStore';
import { Bell, Check, CheckCheck, MessageSquare, CheckSquare, FileText, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'MENTION':
      case 'COMMENT':
        return <MessageSquare className="w-4 h-4 text-[#F5F2ED]/70" />;
      case 'TASK_ASSIGNMENT':
        return <CheckSquare className="w-4 h-4 text-[#8B0D1A]" />;
      case 'FILE_UPLOAD':
        return <FileText className="w-4 h-4 text-[#F5F2ED]/60" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#F5F2ED]/50" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="relative">
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={onClose} />

          {/* Panel Box */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-[#0E0E0E] border border-[#F5F2ED]/12 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Top Header */}
            <div className="px-4 py-3 bg-[#0B0B0B] border-b border-[#F5F2ED]/08 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#8B0D1A]" />
                <h3 className="text-xs font-bold text-[#F5F2ED] font-mono uppercase">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] bg-[#8B0D1A]/20 text-[#F5F2ED]/80 rounded-full font-mono font-bold">
                    {unreadCount} new
                  </span>
                )}
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={() => markAllAsRead()}
                  className="text-[11px] font-mono text-[#F5F2ED]/50 hover:text-[#8B0D1A] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-[#F5F2ED]/35">
                  No notifications
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={cn(
                      'p-3.5 flex items-start gap-3 transition-colors cursor-pointer hover:bg-[#F5F2ED]/[0.03]',
                      !n.read ? 'bg-[#8B0D1A]/[0.04]' : 'bg-transparent opacity-60'
                    )}
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#F5F2ED]/[0.05] border border-[#F5F2ED]/10 flex items-center justify-center shrink-0">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-[#F5F2ED] truncate">{n.title}</h4>
                        <span className="text-[10px] font-mono text-[#F5F2ED]/35 shrink-0 ml-2">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#F5F2ED]/50 mt-0.5 leading-snug line-clamp-2">{n.message}</p>
                    </div>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-[#8B0D1A] shrink-0 mt-1" />}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-2.5 bg-[#0B0B0B] border-t border-[#F5F2ED]/05 text-center text-[10px] font-mono text-[#F5F2ED]/30">
              Real-time Socket.IO Stream Active
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
