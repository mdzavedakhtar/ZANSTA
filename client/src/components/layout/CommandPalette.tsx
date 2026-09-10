import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderGit2, Users, Settings, Plus, LayoutDashboard, ArrowRight } from 'lucide-react';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent toggles state
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const actions = [
    { label: 'Go to Workspace Dashboard', icon: LayoutDashboard, path: '/dashboard', group: 'Navigation' },
    { label: 'View All Showcase Projects', icon: FolderGit2, path: '/projects', group: 'Navigation' },
    { label: 'Manage Team Members', icon: Users, path: '/team', group: 'Navigation' },
    { label: 'Open Workspace Settings', icon: Settings, path: '/settings', group: 'Navigation' },
    { label: 'Create New Project', icon: Plus, path: '/projects', group: 'Actions' },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-xl bg-[#0E0E0E] border border-[#F5F2ED]/12 rounded-2xl shadow-2xl z-10 overflow-hidden"
          >
            {/* Search Input Box */}
            <div className="flex items-center px-4 border-b border-[#F5F2ED]/10 py-3">
              <Search className="w-5 h-5 text-[#F5F2ED]/35 mr-3" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search workspace..."
                className="w-full bg-transparent text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 text-sm outline-none font-sans"
              />
              <kbd className="font-mono text-[10px] bg-[#F5F2ED]/08 px-2 py-0.5 rounded text-[#F5F2ED]/40 border border-[#F5F2ED]/10">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#F5F2ED]/35 font-mono">
                  No commands matching "{query}"
                </div>
              ) : (
                filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleSelect(item.path)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-[#F5F2ED]/60 hover:text-[#F5F2ED] hover:bg-[#F5F2ED]/[0.06] transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-[#F5F2ED]/35 group-hover:text-[#8B0D1A] transition-colors" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F5F2ED]/25 group-hover:text-[#8B0D1A] transition-colors" />
                    </button>
                  );
                })
              )}
            </div>

            {/* Command Palette Footer */}
            <div className="px-4 py-2 bg-[#0B0B0B] border-t border-[#F5F2ED]/05 flex items-center justify-between text-[11px] text-[#F5F2ED]/30 font-mono">
              <span>ZANSTA Developer Command Palette</span>
              <span>Use ↑↓ to navigate, Enter to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
