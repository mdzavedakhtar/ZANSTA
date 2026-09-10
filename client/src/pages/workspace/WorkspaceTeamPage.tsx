import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/components/ui/Toast';
import { UserRole } from '@/types/auth';
import { UserPlus, Search, Copy, Trash2, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';

export const WorkspaceTeamPage: React.FC = () => {
  const { members, fetchMembers, createInvitation, updateRole, removeMember, isLoading } = useWorkspaceStore();
  const { user: currentUser } = useAuthStore();
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('MEMBER');
  const [generatedInviteUrl, setGeneratedInviteUrl] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const isOwnerOrAdmin = currentUser?.role === 'OWNER' || currentUser?.role === 'ADMIN';

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F5F2ED] tracking-tight font-display">
            TEAM MEMBERS & ROLES
          </h1>
          <p className="text-xs text-[#F5F2ED]/55">Manage member permissions, roles, and workspace invitations</p>
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
        {filteredMembers.map((m) => (
          <Card key={m.id} surfaceTier="100" className="flex items-center justify-between p-4 space-x-4">
            <div className="flex items-center gap-3.5 overflow-hidden">
              <Avatar name={m.name} size="md" status={m.status === 'Active' ? 'online' : 'offline'} />
              <div className="overflow-hidden">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#F5F2ED] truncate">{m.name}</h3>
                  {m.email === currentUser?.email && (
                    <span className="text-[10px] bg-[#8B0D1A]/15 text-[#8B0D1A] px-1.5 py-0.5 rounded font-mono">YOU</span>
                  )}
                </div>
                <p className="text-xs text-[#F5F2ED]/55 font-mono truncate">{m.email}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {m.skills?.slice(0, 2).map((s) => (
                    <span key={s} className="text-[9px] font-mono text-[#F5F2ED]/35 bg-white/5 px-1.5 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              {isOwnerOrAdmin && m.email !== currentUser?.email ? (
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

              {currentUser?.role === 'OWNER' && m.email !== currentUser?.email && (
                <button
                  onClick={() => removeMember(m.id)}
                  className="p-1.5 text-[#F5F2ED]/35 hover:text-[#8B0D1A] hover:bg-[#8B0D1A]/10 rounded-lg transition-colors cursor-pointer"
                  title="Remove Member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

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
