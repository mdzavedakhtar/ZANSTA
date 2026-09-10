import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { useWorkspaceStore, MemberItem } from '@/store/useWorkspaceStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/components/ui/Toast';
import { UserRole } from '@/types/auth';
import { UserPlus, Search, Copy, Trash2, Edit, Mail, CheckCircle2, ShieldAlert, Lock } from 'lucide-react';

export const WorkspaceTeamPage: React.FC = () => {
  const { members, fetchMembers, createInvitation, updateRole, updateMember, removeMember } = useWorkspaceStore();
  const { user: currentUser } = useAuthStore();
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('MEMBER');
  const [generatedInviteUrl, setGeneratedInviteUrl] = useState('');

  // Profile Edit & Delete states
  const [editingMember, setEditingMember] = useState<MemberItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState<UserRole>('MEMBER');
  const [editStatus, setEditStatus] = useState('Active');
  const [editSkills, setEditSkills] = useState('');

  const [deleteTarget, setDeleteTarget] = useState<MemberItem | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const isOwner = currentUser?.role === 'OWNER';
  const isOwnerOrAdmin = isOwner || currentUser?.role === 'ADMIN';

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createInvitation(inviteEmail, inviteRole);
      setGeneratedInviteUrl(res.inviteUrl);
      toast('Invitation token generated!', 'success');
    } catch (error: any) {
      toast(error.message || 'Failed to create invitation', 'error');
    }
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(generatedInviteUrl);
    toast('Invitation link copied to clipboard!', 'success');
  };

  const handleOpenEdit = (m: MemberItem) => {
    setEditingMember(m);
    setEditName(m.name);
    setEditEmail(m.email);
    setEditRole(m.role);
    setEditStatus(m.status || 'Active');
    setEditSkills((m.skills || []).join(', '));
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    try {
      const parsedSkills = editSkills
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      // Enforce: only OWNER can change role
      const finalRole = isOwner ? editRole : editingMember.role;

      await updateMember(editingMember.id, {
        name: editName,
        email: editEmail,
        role: finalRole,
        status: editStatus,
        skills: parsedSkills,
      });

      toast(`Profile updated for ${editName}!`, 'success');
      setEditingMember(null);
    } catch (error: any) {
      toast(error.message || 'Failed to update profile', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await removeMember(deleteTarget.id);
      toast(`${deleteTarget.name} has been removed`, 'success');
      setDeleteTarget(null);
    } catch (error: any) {
      toast(error.message || 'Failed to remove team member', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F5F2ED] tracking-tight font-display">
            TEAM MEMBERS & ROLES
          </h1>
          <p className="text-xs text-[#F5F2ED]/55">Manage team profiles, permissions, roles, and workspace invitations</p>
        </div>

        {isOwnerOrAdmin && (
          <Button
            size="sm"
            variant="glow"
            onClick={() => {
              setGeneratedInviteUrl('');
              setInviteEmail('');
              setInviteModalOpen(true);
            }}
            leftIcon={<UserPlus className="w-3.5 h-3.5" />}
          >
            Invite Member
          </Button>
        )}
      </div>

      {/* Search Input Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="w-full max-w-sm">
          <Input
            placeholder="Search members by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-[#F5F2ED]/35" />}
          />
        </div>
        <span className="text-xs font-mono text-[#F5F2ED]/55 font-semibold">
          {filteredMembers.length} Members Total
        </span>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMembers.map((m) => {
          const isSelf = currentUser?.email?.toLowerCase() === m.email?.toLowerCase();
          const canEditOrRemove = isOwner || isSelf;

          return (
            <Card key={m.id} surfaceTier="100" className="flex items-center justify-between p-4 space-x-4">
              <div className="flex items-center gap-3.5 overflow-hidden">
                <Avatar name={m.name} size="md" status={m.status === 'Active' ? 'online' : 'offline'} />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#F5F2ED] truncate">{m.name}</h3>
                    {isSelf && (
                      <span className="text-[10px] bg-[#8B0D1A]/15 text-[#8B0D1A] px-1.5 py-0.5 rounded font-mono">YOU</span>
                    )}
                  </div>
                  <p className="text-xs text-[#F5F2ED]/55 font-mono truncate">{m.email}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {m.skills?.slice(0, 3).map((s) => (
                      <span key={s} className="text-[9px] font-mono text-[#F5F2ED]/45 bg-white/5 px-1.5 py-0.5 rounded border border-white/05">
                        {s}
                      </span>
                    ))}
                    {(m.skills?.length || 0) > 3 && (
                      <span className="text-[9px] font-mono text-[#F5F2ED]/30">
                        +{(m.skills?.length || 0) - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {isOwner && !isSelf ? (
                  <Select
                    value={m.role}
                    onChange={(e) => updateRole(m.id, e.target.value as UserRole)}
                    options={[
                      { value: 'OWNER', label: 'OWNER' },
                      { value: 'ADMIN', label: 'ADMIN' },
                      { value: 'MEMBER', label: 'MEMBER' },
                      { value: 'CLIENT', label: 'CLIENT' },
                    ]}
                    className="py-1 text-xs font-mono"
                  />
                ) : (
                  <Badge
                    variant={
                      m.role === 'OWNER'
                        ? 'crimson'
                        : m.role === 'ADMIN'
                        ? 'crimson'
                        : m.role === 'CLIENT'
                        ? 'neutral'
                        : 'neutral'
                    }
                    size="sm"
                  >
                    {m.role}
                  </Badge>
                )}

                {/* Edit Profile Button - Only OWNER or Account Owner */}
                {canEditOrRemove && (
                  <button
                    onClick={() => handleOpenEdit(m)}
                    className="p-1.5 text-[#F5F2ED]/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    title={isSelf ? 'Edit My Profile' : 'Edit Member Profile'}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}

                {/* Remove Member Button - Only OWNER or Account Owner */}
                {canEditOrRemove && (
                  <button
                    onClick={() => setDeleteTarget(m)}
                    className="p-1.5 text-[#F5F2ED]/35 hover:text-[#8B0D1A] hover:bg-[#8B0D1A]/10 rounded-lg transition-colors cursor-pointer"
                    title={isSelf ? 'Leave Workspace / Remove My Account' : 'Remove Member'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Edit Member Profile Modal */}
      <Modal
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        title="Edit Team Member Profile"
        description={`Update information, status, and skills for ${editingMember?.name}`}
      >
        <form onSubmit={handleSaveEdit} className="space-y-4 pt-2">
          <Input
            label="Full Name *"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="e.g. MD Zaved Akhtar"
            required
          />

          <Input
            label="Email Address *"
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder="member@zansta.dev"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80 flex items-center justify-between">
                <span>Role Permission</span>
                {!isOwner && (
                  <span className="text-[10px] text-[#F5F2ED]/40 flex items-center gap-1 font-sans">
                    <Lock className="w-3 h-3 text-[#8B0D1A]" /> Only OWNER can change role
                  </span>
                )}
              </label>
              {isOwner ? (
                <Select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as UserRole)}
                  options={[
                    { value: 'OWNER', label: 'OWNER (Full workspace access)' },
                    { value: 'ADMIN', label: 'ADMIN (Manage projects & team)' },
                    { value: 'MEMBER', label: 'MEMBER (Contribute code & tasks)' },
                    { value: 'CLIENT', label: 'CLIENT (View live demos & feedback)' },
                  ]}
                />
              ) : (
                <div className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs font-mono text-[#F5F2ED]/60 flex items-center justify-between">
                  <span>{editingMember?.role}</span>
                  <Badge variant="neutral" size="sm">LOCKED</Badge>
                </div>
              )}
            </div>

            <Select
              label="Account Status"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Invited', label: 'Invited' },
                { value: 'Offline', label: 'Offline' },
                { value: 'On Leave', label: 'On Leave' },
              ]}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Skills & Tech Stack (comma separated)</label>
            <input
              type="text"
              value={editSkills}
              onChange={(e) => setEditSkills(e.target.value)}
              placeholder="React, Node.js, Python, Generative AI"
              className="w-full px-3.5 py-2 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <Button size="md" variant="ghost" type="button" onClick={() => setEditingMember(null)}>
              Cancel
            </Button>
            <Button size="md" variant="glow" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete / Remove Member Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title={
          deleteTarget?.email?.toLowerCase() === currentUser?.email?.toLowerCase()
            ? 'Remove My Account / Leave Workspace?'
            : 'Remove Team Member?'
        }
        description={
          deleteTarget?.email?.toLowerCase() === currentUser?.email?.toLowerCase()
            ? 'Are you sure you want to remove your account from this workspace?'
            : `Are you sure you want to remove ${deleteTarget?.name} (${deleteTarget?.email}) from this workspace?`
        }
      >
        <div className="space-y-4 pt-2">
          <div className="p-4 bg-[#8B0D1A]/10 border border-[#8B0D1A]/30 rounded-xl flex items-start gap-3 text-xs text-[#F5F2ED]/90">
            <ShieldAlert className="w-5 h-5 text-[#8B0D1A] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#F5F2ED]">This action cannot be undone.</p>
              <p className="mt-1 text-[#F5F2ED]/70">
                {deleteTarget?.email?.toLowerCase() === currentUser?.email?.toLowerCase()
                  ? 'You will lose access to workspace tasks, code repositories, and project updates.'
                  : 'The member will lose access to workspace tasks, code repositories, and project updates immediately.'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button size="md" variant="ghost" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button size="md" variant="glow" onClick={handleConfirmDelete} className="bg-[#8B0D1A] hover:bg-[#8B0D1A]/80 text-white">
              {deleteTarget?.email?.toLowerCase() === currentUser?.email?.toLowerCase()
                ? 'Remove My Account'
                : 'Remove Member'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Invite Member Modal */}
      <Modal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title="Invite Workspace Member"
        description="Generate a secure invitation link (/invite/:token) for a developer or client."
      >
        {generatedInviteUrl ? (
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-[#121212] border border-[#8B0D1A]/30 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8B0D1A]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Invitation Token Created!</span>
              </div>
              <p className="text-xs text-[#F5F2ED]/80 font-mono break-all bg-[#0E0E0E] p-2.5 rounded-lg border border-white/10">
                {generatedInviteUrl}
              </p>
            </div>

            <Button size="md" variant="glow" onClick={handleCopyInviteLink} className="w-full" leftIcon={<Copy className="w-4 h-4" />}>
              Copy Invitation Link
            </Button>
          </div>
        ) : (
          <form onSubmit={handleCreateInvite} className="space-y-4 pt-2">
            <Input
              label="Member Email Address"
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="developer@company.com"
              leftIcon={<Mail className="w-4 h-4 text-[#F5F2ED]/35" />}
              required
            />

            <Select
              label="Assign Role Permission"
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as UserRole)}
              options={[
                { value: 'ADMIN', label: 'ADMIN (Manage projects & team)' },
                { value: 'MEMBER', label: 'MEMBER (Contribute code & tasks)' },
                { value: 'CLIENT', label: 'CLIENT (View live demos & feedback)' },
              ]}
            />

            <Button type="submit" size="md" variant="glow" className="w-full">
              Generate Invitation Token
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
};
