import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Tabs } from '@/components/ui/Tabs';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/components/ui/Toast';
import { Save, User, Shield, Github, Linkedin, Sparkles } from 'lucide-react';

export const WorkspaceSettingsPage: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuthStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  // Form state
  const [name, setName] = useState(user?.name || 'MD Zaved Akhtar');
  const [bio, setBio] = useState(user?.bio || 'Full-Stack, AI & Data Analytics Engineer');
  const [avatar, setAvatar] = useState(user?.avatar || '/zaved.jpg');
  const [skills, setSkills] = useState(user?.skills?.join(', ') || 'React, Next.js, Node.js, Python, SQL, Power BI, Generative AI, RAG');
  const [github, setGithub] = useState(user?.github || 'https://github.com/mdzavedakhtar');
  const [linkedin, setLinkedin] = useState(user?.linkedin || 'https://www.linkedin.com/in/md-zaved-akhtar-22013828b');

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const skillsArray = skills.split(',').map((s) => s.trim()).filter(Boolean);
      await updateProfile({
        name,
        bio,
        avatar,
        skills: skillsArray,
        github,
        linkedin,
      });
      toast('Profile updated successfully!', 'success');
    } catch (error: any) {
      toast(error.message || 'Failed to update profile', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F5F2ED] tracking-tight font-display">
            USER PROFILE & SETTINGS
          </h1>
          <p className="text-xs text-[#F5F2ED]/55">Manage profile identity, security, and workspace preferences</p>
        </div>
        <Badge variant="crimson" size="md">
          {user?.role || 'OWNER'} ROLE
        </Badge>
      </div>

      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'profile', label: 'My Profile', icon: <User className="w-3.5 h-3.5" /> },
          { id: 'security', label: 'Security & Auth', icon: <Shield className="w-3.5 h-3.5" /> },
        ]}
      />

      {activeTab === 'profile' && (
        <Card surfaceTier="200" className="p-8 space-y-6">
          <div className="flex items-center gap-5 pb-6 border-b border-white/5">
            <Avatar name={name} src={avatar} size="xl" status="online" />
            <div>
              <h3 className="text-lg font-bold text-[#F5F2ED]">{name}</h3>
              <p className="text-xs text-[#F5F2ED]/55 font-mono">{user?.email}</p>
              <Badge variant="crimson" size="sm" className="mt-2">
                VERIFIED DEVELOPER
              </Badge>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Avatar URL (Optional)"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-medium text-[#F5F2ED]/80">Bio & Developer Headline</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell your team about your expertise..."
                className="w-full bg-[#0E0E0E] text-[#F5F2ED] text-sm rounded-lg border border-white/10 p-3.5 outline-none focus:border-[#8B0D1A]/50"
              />
            </div>

            <Input
              label="Technical Skills (Comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="TypeScript, Node.js, React, Socket.IO"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="GitHub URL"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                leftIcon={<Github className="w-4 h-4 text-[#F5F2ED]/35" />}
              />
              <Input
                label="LinkedIn URL"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                leftIcon={<Linkedin className="w-4 h-4 text-[#F5F2ED]/35" />}
              />
            </div>

            <Button
              type="submit"
              size="md"
              variant="glow"
              isLoading={isLoading}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Profile Changes
            </Button>
          </form>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card surfaceTier="200" className="p-8 space-y-6">
          <h3 className="text-base font-bold text-[#F5F2ED]">Security & Authentication Standards</h3>
          <p className="text-xs text-[#F5F2ED]/55">
            NEXORA uses bcrypt salted hashing and 7-day JWT Bearer tokens to protect your session.
          </p>

          <div className="space-y-4 pt-2">
            <Input label="Current Password" type="password" placeholder="••••••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••••••" />
            <Button size="md" variant="secondary" leftIcon={<Shield className="w-4 h-4 text-[#8B0D1A]" />}>
              Update Password
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
