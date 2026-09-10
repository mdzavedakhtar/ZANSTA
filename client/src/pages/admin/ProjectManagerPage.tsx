import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { projectService } from '@/services/projectService';
import { CMSProject, ProjectCategory, ProjectStatus } from '@/types/cms';
import {
  FolderGit2,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  ExternalLink,
  Github,
  ArrowUpDown,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const ProjectManagerPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<CMSProject[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [deleteTarget, setDeleteTarget] = useState<CMSProject | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadProjects = () => {
    const list = projectService.getProjects({
      search,
      status: statusFilter,
      category: categoryFilter,
    });
    setProjects(list);
  };

  useEffect(() => {
    loadProjects();
  }, [search, statusFilter, categoryFilter]);

  const handleToggleFeatured = (project: CMSProject) => {
    projectService.updateProject(project.id, { isFeatured: !project.isFeatured });
    loadProjects();
  };

  const handleToggleVisibility = (project: CMSProject) => {
    projectService.updateProject(project.id, { isVisible: !project.isVisible });
    loadProjects();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    projectService.deleteProject(deleteTarget.id);
    setIsDeleting(false);
    setDeleteTarget(null);
    loadProjects();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A]">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-black text-[#F5F2ED] tracking-tight font-display">
              PROJECT MANAGEMENT SYSTEM
            </h1>
          </div>
          <p className="text-xs text-[#F5F2ED]/55 font-sans">
            Manage portfolio showcase projects, status, featured states, tech stack, and landing page visibility.
          </p>
        </div>

        <Link to="/admin/projects/new">
          <Button size="sm" variant="glow" leftIcon={<Plus className="w-4 h-4" />}>
            Create Project
          </Button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#F5F2ED]/35 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search project name, tech stack, client..."
            className="w-full pl-10 pr-4 py-2 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A] font-sans"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active (Live / In Progress)</option>
          <option value="PLANNING">Planning</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="LIVE">Live</option>
          <option value="ARCHIVED">Archived</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3.5 py-2 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
        >
          <option value="ALL">All Categories</option>
          <option value="WEB APP">Web App</option>
          <option value="AI / ML">AI / ML</option>
          <option value="MOBILE">Mobile</option>
          <option value="SAAS">SaaS</option>
          <option value="AGENCY">Agency</option>
          <option value="CLIENT PROJECT">Client Project</option>
          <option value="INTERNAL PRODUCT">Internal Product</option>
        </select>
      </div>

      {/* Projects List / Grid */}
      {projects.length === 0 ? (
        <EmptyState
          icon={<FolderGit2 className="w-8 h-8 text-[#8B0D1A]" />}
          title="No projects found"
          description="There are no projects matching your search criteria or filter selections."
          actionLabel="Create First Project"
          onAction={() => navigate('/admin/projects/new')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Card
              key={p.id}
              surfaceTier="100"
              glowOnHover
              className="group flex flex-col justify-between p-5 space-y-4 border border-white/10 relative overflow-hidden"
            >
              {/* Thumbnail & Badges Overlay */}
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/05">
                  <img
                    src={p.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <Badge variant={p.status === 'LIVE' || p.status === 'COMPLETED' ? 'active' : 'crimson'} size="sm">
                      {p.status}
                    </Badge>
                    <Badge variant="neutral" size="sm">
                      {p.category}
                    </Badge>
                  </div>

                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <button
                      onClick={() => handleToggleFeatured(p)}
                      className={`p-1.5 rounded-lg border backdrop-blur-md transition-colors ${
                        p.isFeatured
                          ? 'bg-[#8B0D1A]/80 border-[#8B0D1A] text-amber-300'
                          : 'bg-black/60 border-white/10 text-white/40 hover:text-white'
                      }`}
                      title={p.isFeatured ? 'Featured Project' : 'Mark Featured'}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => handleToggleVisibility(p)}
                      className={`p-1.5 rounded-lg border backdrop-blur-md transition-colors ${
                        p.isVisible
                          ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400'
                          : 'bg-black/60 border-white/10 text-white/40 hover:text-white'
                      }`}
                      title={p.isVisible ? 'Visible on Landing Page' : 'Hidden from Public'}
                    >
                      {p.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-[#F5F2ED] font-display group-hover:text-[#8B0D1A] transition-colors">
                    {p.name}
                  </h3>
                  {p.clientName && (
                    <p className="text-[11px] font-mono text-[#8B0D1A] mt-0.5">
                      Client: {p.clientName}
                    </p>
                  )}
                  <p className="text-xs text-[#F5F2ED]/60 mt-1.5 line-clamp-2 leading-relaxed font-sans">
                    {p.shortDescription}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {p.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-white/05 border border-white/10 text-[10px] font-mono text-[#F5F2ED]/70"
                    >
                      {tech}
                    </span>
                  ))}
                  {p.techStack.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-white/05 border border-white/10 text-[10px] font-mono text-[#F5F2ED]/40">
                      +{p.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-white/05 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Link to={`/admin/projects/${p.id}/edit`}>
                    <Button size="sm" variant="ghost" leftIcon={<Edit className="w-3.5 h-3.5 text-[#F5F2ED]/70" />}>
                      Edit
                    </Button>
                  </Link>
                  <Link to={`/projects/${p.slug}`} target="_blank">
                    <Button size="sm" variant="ghost" leftIcon={<ExternalLink className="w-3.5 h-3.5 text-[#8B0D1A]" />}>
                      Preview
                    </Button>
                  </Link>
                </div>

                <button
                  onClick={() => setDeleteTarget(p)}
                  className="p-2 rounded-lg text-[#F5F2ED]/30 hover:text-[#8B0D1A] hover:bg-[#8B0D1A]/10 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Project?"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This project and its landing-page showcase data will be removed.`}
        confirmLabel="Delete Project"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  );
};
