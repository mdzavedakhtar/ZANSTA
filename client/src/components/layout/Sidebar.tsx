import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderGit2,
  Users,
  Activity,
  Globe,
  Layers,
  MonitorPlay,
  MessageSquareQuote,
  Inbox,
  UserCheck,
  FileText,
  Send,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { Logo } from '../shared/Logo';
import { cn } from '@/lib/utils';
import { Avatar } from '../ui/Avatar';
import { useAuthStore } from '@/store/useAuthStore';

interface NavSection {
  title?: string;
  items: {
    label: string;
    path: string;
    icon: React.ElementType;
    badge?: number | string;
  }[];
}

const navSections: NavSection[] = [
  {
    items: [{ label: 'Overview', path: '/dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'WORKSPACE',
    items: [
      { label: 'Projects', path: '/admin/projects', icon: FolderGit2 },
      { label: 'Team', path: '/admin/team', icon: Users },
      { label: 'Activity', path: '/admin/activity', icon: Activity },
    ],
  },
  {
    title: 'CONTENT & LEADS',
    items: [
      { label: 'Landing Page', path: '/admin/landing', icon: Globe },
      { label: 'Services', path: '/admin/services', icon: Layers },
      { label: 'Client Demos', path: '/admin/demos', icon: MonitorPlay },
      { label: 'Reviews', path: '/admin/reviews', icon: MessageSquareQuote },
      { label: 'Demo Requests', path: '/admin/demo-requests', icon: Inbox },
      { label: 'Enquiries', path: '/admin/enquiries', icon: Send },
    ],
  },
  {
    title: 'AGENCY',
    items: [
      { label: 'Clients', path: '/agency/clients', icon: UserCheck },
      { label: 'Proposals', path: '/agency/proposals', icon: FileText },
    ],
  },
  {
    title: 'SETTINGS',
    items: [{ label: 'Workspace Settings', path: '/settings', icon: Settings }],
  },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={cn(
        'bg-[#0B0B0B] border-r border-[#F5F2ED]/08 flex flex-col justify-between transition-all duration-300 relative z-30 h-screen sticky top-0 shrink-0',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-7 bg-[#111111] border border-[#F5F2ED]/15 text-[#F5F2ED]/40 hover:text-[#F5F2ED] p-1 rounded-full shadow-lg transition-all z-40 cursor-pointer hover:border-[#8B0D1A]/50"
        aria-label="Toggle sidebar"
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Top Header */}
      <div className="overflow-y-auto custom-scrollbar flex-1">
        <div className="p-5 flex items-center justify-between border-b border-[#F5F2ED]/05 min-h-[72px]">
          <Logo size="md" showText={!collapsed} />
        </div>

        {/* Workspace Selector Pill */}
        <div className="p-3">
          <div
            className={cn(
              'bg-[#0E0E0E] border border-[#F5F2ED]/08 rounded-xl p-2.5 flex items-center gap-3 transition-colors',
              collapsed && 'justify-center'
            )}
          >
            {/* Crimson workspace icon */}
            <div className="w-7 h-7 rounded-lg bg-[#8B0D1A] flex items-center justify-center font-bold text-[#F5F2ED] text-xs shrink-0 shadow-[0_0_12px_rgba(139,13,26,0.40)]">
              Z
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <h4 className="text-xs font-bold text-[#F5F2ED] truncate">ZANSTA Admin CMS</h4>
                <p className="text-[10px] text-[#F5F2ED]/40 font-mono">Control Center</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="p-3 space-y-4">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {!collapsed && section.title && (
                <div className="px-3 text-[10px] font-mono font-bold text-[#F5F2ED]/35 uppercase tracking-wider mb-1">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'relative flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group',
                      isActive
                        ? 'text-[#F5F2ED] bg-[#8B0D1A]/15 font-semibold'
                        : 'text-[#F5F2ED]/50 hover:text-[#F5F2ED]/85 hover:bg-[#F5F2ED]/05',
                      collapsed && 'justify-center px-0'
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebarActiveIndicator"
                        className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#8B0D1A] rounded-r-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                    <Icon
                      className={cn(
                        'w-4 h-4 shrink-0 transition-colors',
                        isActive ? 'text-[#8B0D1A]' : 'text-[#F5F2ED]/40 group-hover:text-[#F5F2ED]/70'
                      )}
                    />
                    {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono bg-[#8B0D1A]/20 text-[#F5F2ED]/80 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom User Footer */}
      <div className="p-3 border-t border-[#F5F2ED]/05 space-y-2 shrink-0">
        {!collapsed && (
          <div className="p-2.5 rounded-xl bg-[#8B0D1A]/08 border border-[#8B0D1A]/20 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8B0D1A] shrink-0" />
            <div className="text-[11px]">
              <p className="font-semibold text-[#F5F2ED]/90">Agency CMS Active</p>
              <p className="text-[#F5F2ED]/45">Role: {user?.role || 'OWNER'}</p>
            </div>
          </div>
        )}

        <div className={cn('flex items-center justify-between p-2 rounded-xl bg-[#0E0E0E] border border-[#F5F2ED]/05', collapsed && 'flex-col gap-2')}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Avatar name={user?.name || 'MD Zaved Akhtar'} src={user?.avatar || '/zaved.jpg'} size="sm" status="online" />
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-[#F5F2ED]/90 truncate">{user?.name || 'MD Zaved Akhtar'}</p>
                <p className="text-[10px] text-[#F5F2ED]/40 truncate">{user?.email || 'mdzavedakhtar62@gmail.com'}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="text-[#F5F2ED]/35 hover:text-[#8B0D1A] p-1.5 rounded-lg hover:bg-[#8B0D1A]/10 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
