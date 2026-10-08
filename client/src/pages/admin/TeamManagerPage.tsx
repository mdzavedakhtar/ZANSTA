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
import { ResumePreviewModal } from '@/components/shared/ResumePreviewModal';
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
  const [previewMember, setPreviewMember] = useState<CMSTeamMember | null>(null);

  const loadTeam = async () => {
    const list = teamService.getTeamMembers({
      search,
      isVisible: visibilityFilter === 'ALL' ? undefined : visibilityFilter === 'VISIBLE',
    });
    setMembers(list);

    try {
      const fresh = await teamService.fetchTeamMembers({
        search,
        isVisible: visibilityFilter === 'ALL' ? undefined : visibilityFilter === 'VISIBLE',
      });
      if (fresh) setMembers(fresh);
    } catch (e) {
      console.warn('Error fetching fresh team:', e);
    }
  };

  useEffect(() => {
    loadTeam();
  }, [search, visibilityFilter]);

  const handleToggleFeatured = async (member: CMSTeamMember) => {
    await teamService.updateMember(member.id, { isFeatured: !member.isFeatured });
    loadTeam();
  };

  const handleToggleVisibility = async (member: CMSTeamMember) => {
    await teamService.updateMember(member.id, { isVisible: !member.isVisible });
    loadTeam();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await teamService.deleteMember(deleteTarget.id);
      setDeleteTarget(null);
      loadTeam();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#F5F2ED] font-display flex items-center gap-2">
            <Users className="w-5 h-5 text-[#8B0D1A]" />
            Core Team & Collective CMS
          </h1>
          <p className="text-xs text-[#F5F2ED]/50 mt-1">
            Manage engineers, roles, experience, tech stacks, and uploaded resume documents.
          </p>
        </div>

        <Link to="/admin/team/new">
          <Button variant="primary" size="sm" leftIcon={<UserPlus className="w-4 h-4" />}>
            Add Engineer
          </Button>
        </Link>
      </div>

      {/* Filters & Search */}
      <Card surfaceTier="100" className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#F5F2ED]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role, skill..."
            className="w-full pl-9 pr-4 py-2 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['ALL', 'VISIBLE', 'HIDDEN'].map((tab) => (
            <button
              key={tab}
              onClick={() => setVisibilityFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                visibilityFilter === tab
                  ? 'bg-[#8B0D1A] text-white'
                  : 'bg-white/05 text-[#F5F2ED]/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {/* Grid of Team Cards */}
      {members.length === 0 ? (
        <EmptyState
          icon={<Users className="w-7 h-7" />}
          title="No team members found"
          description="Try adjusting your search criteria or add a new team member."
          actionLabel="Add Team Member"
          onAction={() => navigate('/admin/team/new')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((m) => (
            <Card
              key={m.id}
              surfaceTier="100"
              className="p-5 flex flex-col justify-between space-y-4 relative group border border-white/05 hover:border-white/15 transition-all"
            >
              <div className="space-y-3">
                {/* Header row with Avatar & actions */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={m.name} src={m.photo} size="lg" />
                    <div>
                      <h3 className="text-sm font-bold text-[#F5F2ED] font-display">{m.name}</h3>
                      <p className="text-xs font-mono text-[#8B0D1A] mt-0.5">{m.role}</p>
                      {m.experienceYears && (
                        <p className="text-[10px] font-mono text-[#F5F2ED]/40 flex items-center gap-1 mt-0.5">
                          <Briefcase className="w-3 h-3 text-[#8B0D1A]" /> {m.experienceYears} Experience
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleFeatured(m)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        m.isFeatured
                          ? 'text-amber-400 bg-amber-400/10'
                          : 'text-[#F5F2ED]/30 hover:text-amber-400 hover:bg-white/05'
                      }`}
                      title={m.isFeatured ? 'Featured on Home' : 'Mark as Featured'}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>

                    <button
                      onClick={() => handleToggleVisibility(m)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        m.isVisible
                          ? 'text-emerald-400 bg-emerald-400/10'
                          : 'text-[#F5F2ED]/30 hover:text-white hover:bg-white/05'
                      }`}
                      title={m.isVisible ? 'Visible publicly' : 'Hidden from public'}
                    >
                      {m.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-[#F5F2ED]/60 line-clamp-2 leading-relaxed">{m.bio}</p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
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
                  <button
                    type="button"
                    onClick={() => setPreviewMember(m)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#8B0D1A]/10 border border-[#8B0D1A]/20 text-[11px] font-mono text-[#ff4d61] hover:bg-[#8B0D1A]/20 transition-colors cursor-pointer text-left"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#ff4d61] shrink-0" />
                    <span className="truncate max-w-[150px]">{m.resumeFileName || 'View Resume PDF'}</span>
                  </button>
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
                    className="p-2 rounded-lg text-[#F5F2ED]/30 hover:text-[#8B0D1A] hover:bg-[#8B0D1A]/10 transition-colors cursor-pointer"
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

      {/* In-App Resume Preview Modal */}
      {previewMember && (
        <ResumePreviewModal
          isOpen={!!previewMember}
          onClose={() => setPreviewMember(null)}
          resumeUrl={previewMember.resumeUrl}
          fileName={previewMember.resumeFileName || `${previewMember.name}_Resume.pdf`}
          memberName={previewMember.name}
          memberRole={previewMember.role}
        />
      )}
    </div>
  );
};
