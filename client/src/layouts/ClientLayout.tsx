import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sparkles, LayoutDashboard, FolderGit2, MessageSquare } from 'lucide-react';

export const ClientLayout: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/client', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/client/projects', label: 'Projects', icon: FolderGit2 },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F2ED] flex flex-col selection:bg-[#8B0D1A]/30 selection:text-[#F5F2ED]">
      {/* Top Client Header */}
      <header className="border-b border-white/10 bg-[#0E0E0E]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B0D1A]/20 to-[#8B0D1A]/20 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#8B0D1A]" />
            </div>
            <div>
              <span className="text-sm font-black text-[#F5F2ED] font-display tracking-wide">ZANSTA</span>
              <span className="text-[10px] font-mono text-[#8B0D1A] block">CLIENT PORTAL HUB</span>
            </div>
          </div>

          <nav className="flex items-center gap-2 font-mono text-xs">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#8B0D1A]/15 text-[#8B0D1A] border border-[#8B0D1A]/30'
                      : 'text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
