import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';
import { Building2, Briefcase, FileText, Users, Sparkles, Inbox } from 'lucide-react';

export const AgencyLayout: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/agency', label: 'Overview', icon: Building2 },
    { path: '/agency/services', label: 'Services', icon: Briefcase },
    { path: '/agency/requests', label: 'Inbound Requests', icon: Inbox },
    { path: '/agency/clients', label: 'Clients', icon: Users },
    { path: '/agency/proposals', label: 'Proposals', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F2ED] flex flex-col selection:bg-[#8B0D1A]/30 selection:text-[#F5F2ED]">
      {/* Top Agency Studio Header */}
      <header className="border-b border-white/10 bg-[#0E0E0E]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8B0D1A]/25 via-[#8B0D1A]/20 to-[#8B0D1A]/20/20 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#8B0D1A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-[#F5F2ED] font-display tracking-tight">NEXORA STUDIO</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">AGENCY PLATFORM</span>
              </div>
              <span className="text-[11px] font-mono text-[#F5F2ED]/55">High-End Digital Agency & Enterprise Software Studio</span>
            </div>
          </div>

          <nav className="flex items-center gap-2 font-mono text-xs overflow-x-auto custom-scrollbar">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8B0D1A]/20 to-[#8B0D1A]/20 text-[#F5F2ED] border border-[#8B0D1A]/40 shadow-[0_0_15px_rgba(0,240,255,0.15)] font-bold'
                      : 'text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#8B0D1A]" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Agency Outlet */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
