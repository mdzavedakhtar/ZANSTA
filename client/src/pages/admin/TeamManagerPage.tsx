import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { teamService } from '@/services/teamService';
import { CMSTeamMember } from '@/types/cms';
import {
  Users,
  UserPlus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  FileText,
  Github,
  Linkedin,
  Globe,
  Briefcase,
} from 'lucide-react';

export const TeamManagerPage: React.FC = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<CMSTeamMember[]>([]);
  const [search, setSearch] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState('ALL');
  const [deleteTarget, setDeleteTarget] = useState<CMSTeamMember | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadTeam = () => {
    const list = teamService.getTeamMembers({
      search,
      isVisible: visibilityFilter === 'ALL' ? undefined : visibilityFilter === 'VISIBLE',
    });
    setMembers(list);
  };

  useEffect(() => {
    loadTeam();
  }, [search, visibilityFilter]);

  const handleToggleFeatured = (member: CMSTeamMember) => {
    teamService.updateMember(member.id, { isFeatured: !member.isFeatured });
    loadTeam();
  };

  const handleToggleVisibility = (member: CMSTeamMember) => {
    teamService.updateMember(member.id, { isVisible: !member.isVisible });
    loadTeam();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    teamService.deleteMember(deleteTarget.id);
    setIsDeleting(false);
    setDeleteTarget(null);
    loadTeam();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A]">
              <Users className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-black text-[#F5F2ED] tracking-tight font-display">
              TEAM MANAGEMENT SYSTEM
            </h1>
          </div>
          <p className="text-xs text-[#F5F2ED]/55 font-sans">
            Manage agency team members, photos, roles, tech stacks, experience summaries, resumes, and public visibility.
          </p>
        </div>

        <Link to="/admin/team/new">
          <Button size="sm" variant="glow" leftIcon={<UserPlus className="w-4 h-4" />}>
            Add Team Member
          </Button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#F5F2ED]/35 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search member name, role, bio, tech stack..."
            className="w-full pl-10 pr-4 py-2 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A] font-sans"
          />
        </div>

        <select
          value={visibilityFilter}
          onChange={(e) => setVisibilityFilter(e.target.value)}
          className="px-3.5 py-2 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
        >
          <option value="ALL">All Team Members</option>
          <option value="VISIBLE">Visible on Landing Page</option>
          <option value="HIDDEN">Hidden from Public</option>
        </select>
      </div>

      {/* Team Cards Grid */}
      {members.length === 0 ? (
        <EmptyState
          icon={<Users className="w-8 h-8 text-[#8B0D1A]" />}
          title="No team members found"
          description="Add your agency builders or refine your search filters."
          actionLabel="Add Team Member"
          onAction={() => navigate('/admin/team/new')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m) => (
            <Card
              key={m.id}
              surfaceTier="100"
              glowOnHover
              className="group flex flex-col justify-between p-5 space-y-4 border border-white/10 relative"
            >
              <div className="space-y-4">
                {/* Avatar & Controls Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={m.name} src={m.photo} size="lg" status="online" />
                    <div>
                      <h3 className="text-base font-extrabold text-[#F5F2ED] font-display group-hover:text-[#8B0D1A] transition-colors">
                        {m.name}
                      </h3>
                      <p className="text-xs font-mono text-[#8B0D1A] mt-0.5">{m.role}</p>
                      {m.experienceYears && (
                        <p className="text-[10px] font-mono text-[#F5F2ED]/40 flex items-center gap-1 mt-0.5">
                          <Briefcase className="w-3 h-3 text-[#8B0D1A]/70" /> {m.experienceYears} Exp
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleFeatured(m)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        m.isFeatured
                          ? 'bg-[#8B0D1A]/80 border-[#8B0D1A] text-amber-300'
                          : 'bg-white/05 border-white/10 text-white/40 hover:text-white'
                      }`}
                      title={m.isFeatured ? 'Featured Team Member' : 'Mark Featured'}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => handleToggleVisibility(m)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        m.isVisible
                          ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400'
                          : 'bg-white/05 border-white/10 text-white/40 hover:text-white'
                      }`}
                      title={m.isVisible ? 'Visible on Public Site' : 'Hidden from Public'}
                    >
                      {m.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#F5F2ED]/60 leading-relaxed line-clamp-2 font-sans">{m.bio}</p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {m.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-white/05 border border-white/10 text-[10px] font-mono text-[#F5F2ED]/75"
                    >
                      {tech}
                    </span>
                  ))}
                  {m.techStack.length > 5 && (
                    <span className="px-2 py-0.5 rounded-md bg-white/05 border border-white/10 text-[10px] font-mono text-[#F5F2ED]/40">
                      +{m.techStack.length - 5}
                    </span>
                  )}
                </div>

                {/* Resume Status Badge */}
                {m.resumeUrl ? (
                  <a
                    href={m.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#8B0D1A]/10 border border-[#8B0D1A]/20 text-[11px] font-mono text-[#F5F2ED]/90 hover:bg-[#8B0D1A]/20 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#8B0D1A]" />
                    <span>View Resume PDF</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#F5F2ED]/30 italic">
                    No resume uploaded
                  </span>
                )}
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-white/05 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {m.github && (
                    <a href={m.github} target="_blank" rel="noreferrer" className="text-[#F5F2ED]/40 hover:text-white p-1">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noreferrer" className="text-[#F5F2ED]/40 hover:text-white p-1">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Link to={`/admin/team/${m.id}/edit`}>
                    <Button size="sm" variant="ghost" leftIcon={<Edit className="w-3.5 h-3.5 text-[#F5F2ED]/70" />}>
                      Edit Profile
                    </Button>
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(m)}
                    className="p-2 rounded-lg text-[#F5F2ED]/30 hover:text-[#8B0D1A] hover:bg-[#8B0D1A]/10 transition-colors"
                    title="Delete Member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Team Member?"
        description={`Are you sure you want to remove "${deleteTarget?.name}" from the public team showcase?`}
        confirmLabel="Delete Member"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  );
};
