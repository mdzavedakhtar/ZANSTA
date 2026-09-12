import React, { useState } from 'react';
import { Search, Bell, Plus, Github, Menu } from 'lucide-react';
import { Button } from '../ui/Button';
import { NotificationDropdown } from './NotificationDropdown';
import { useNotificationStore } from '@/store/useNotificationStore';
import { Link } from 'react-router-dom';

export interface TopbarProps {
  onOpenCommandPalette: () => void;
  onToggleMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenCommandPalette, onToggleMobileMenu }) => {
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const { unreadCount } = useNotificationStore();

  return (
    <header className="h-16 border-b border-[#F5F2ED]/08 bg-[#0B0B0B]/90 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between sticky top-0 z-20 w-full max-w-full overflow-x-hidden gap-2">
      <div className="flex items-center gap-2 flex-1 max-w-sm">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl bg-[#0E0E0E] border border-[#F5F2ED]/10 text-[#F5F2ED]/60 hover:text-[#F5F2ED] hover:bg-[#F5F2ED]/05 transition-colors cursor-pointer shrink-0"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Search trigger (Cmd+K) */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 sm:gap-3 bg-[#0E0E0E] border border-[#F5F2ED]/10 text-[#F5F2ED]/45 hover:text-[#F5F2ED]/75 hover:border-[#F5F2ED]/18 px-3 py-2 rounded-xl text-xs flex-1 transition-all shadow-inner cursor-pointer min-w-0"
        >
          <Search className="w-3.5 h-3.5 text-[#F5F2ED]/30 shrink-0" />
          <span className="flex-1 text-left truncate">Search projects...</span>
          <kbd className="hidden sm:inline-block font-mono text-[10px] bg-[#F5F2ED]/08 px-1.5 py-0.5 rounded text-[#F5F2ED]/50 border border-[#F5F2ED]/10 shrink-0">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="hidden md:flex items-center gap-2 text-xs font-mono bg-[#F5F2ED]/05 border border-[#F5F2ED]/10 px-3 py-1.5 rounded-lg text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:border-[#F5F2ED]/18 transition-all"
        >
          <Github className="w-3.5 h-3.5 text-[#F5F2ED]/60" />
          <span>Connected</span>
        </a>

        {/* Real-time Notification Bell & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="relative p-2 rounded-lg bg-[#0E0E0E] border border-[#F5F2ED]/10 text-[#F5F2ED]/50 hover:text-[#F5F2ED] hover:bg-[#F5F2ED]/05 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8B0D1A] animate-ping" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8B0D1A]" />
              </>
            )}
          </button>

          <NotificationDropdown
            isOpen={notifDropdownOpen}
            onClose={() => setNotifDropdownOpen(false)}
          />
        </div>

        <Link to="/admin/projects/new">
          <Button size="sm" variant="glow" leftIcon={<Plus className="w-3.5 h-3.5" />}>
            <span className="hidden xs:inline">New Project</span>
            <span className="xs:hidden">New</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};
