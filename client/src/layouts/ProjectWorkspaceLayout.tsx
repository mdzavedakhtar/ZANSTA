import React, { useEffect } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useProjectStore } from '@/store/useProjectStore';
import {
  LayoutDashboard,
  CheckSquare,
  FolderDown,
  Code2,
  Activity,
  Users,
  Settings,
  ExternalLink,
  Github,
} from 'lucide-react';

export const ProjectWorkspaceLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentProject, fetchProjectBySlug } = useProjectStore();

  useEffect(() => {
    if (id) {
      fetchProjectBySlug(id);
    }
  }, [id]);

  const projectId = id || currentProject?.slug || 'caresprint';

  const navItems = [
    { label: 'Overview', path: `/projects/${projectId}/overview`, icon: LayoutDashboard },
    { label: 'Tasks', path: `/projects/${projectId}/tasks`, icon: CheckSquare },
    { label: 'Files', path: `/projects/${projectId}/files`, icon: FolderDown },
    { label: 'Code', path: `/projects/${projectId}/code`, icon: Code2 },
    { label: 'Activity', path: `/projects/${projectId}/activity`, icon: Activity },
    { label: 'Team', path: `/projects/${projectId}/team`, icon: Users },
    { label: 'Settings', path: `/projects/${projectId}/settings`, icon: Settings },
  ];

  return (
    <div className="space-y-6">
      {/* Project Workspace Header Bar */}
      <div className="bg-[#0E0E0E] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-[#F5F2ED] font-display uppercase tracking-tight">
                {currentProject?.name || id || 'CareSprint'}
              </h1>
              <Badge variant="crimson" size="sm">
                {currentProject?.status || 'DEVELOPMENT'}
              </Badge>
              <Badge variant="neutral" size="sm">
                {currentProject?.visibility || 'TEAM_ONLY'}
              </Badge>
            </div>
            <p className="text-xs text-[#F5F2ED]/55 max-w-2xl leading-relaxed font-sans">
              {currentProject?.description || 'On-demand healthcare & telemedicine platform.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {currentProject?.repoUrl && (
              <a href={currentProject.repoUrl} target="_blank" rel="noreferrer">
                <Button size="sm" variant="secondary" leftIcon={<Github className="w-3.5 h-3.5" />}>
                  Repo
                </Button>
              </a>
            )}
            {currentProject?.demoUrl && (
              <a href={currentProject.demoUrl} target="_blank" rel="noreferrer">
                <Button size="sm" variant="glow" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                  Live Demo
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto pt-2 border-t border-white/5 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'text-[#F5F2ED] bg-white/10 font-semibold'
                      : 'text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="projectNavTabPill"
                        className="absolute inset-0 bg-white/10 border border-white/15 rounded-lg"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#8B0D1A]' : 'text-[#F5F2ED]/55'}`} />
                      <span>{item.label}</span>
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sub-route Content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};
