import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { CommandPalette } from '../components/layout/CommandPalette';
import { CustomCursor } from '../components/shared/CustomCursor';
import { ToastProvider } from '../components/ui/Toast';

export const WorkspaceLayout: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#050505] text-[#F5F2ED] flex selection:bg-[#8B0D1A]/20 selection:text-[#8B0D1A] relative overflow-x-hidden w-full max-w-full">
        <CustomCursor />
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
          <Topbar
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
          />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto overflow-x-hidden">
            <Outlet />
          </main>
        </div>
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />
      </div>
    </ToastProvider>
  );
};
