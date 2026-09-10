import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { FileUploader } from '@/components/admin/FileUploader';
import { TechStackInput } from '@/components/admin/TechStackInput';
import { teamService } from '@/services/teamService';
import { CMSTeamMember } from '@/types/cms';
import { ArrowLeft, Save, Users, AlertCircle } from 'lucide-react';

export const TeamMemberFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<Partial<CMSTeamMember>>({
    name: '',
    role: '',
    photo: '',
    bio: '',
    fullBio: '',
    techStack: ['React', 'Node.js'],
    experienceYears: '3+',
    experienceSummary: '',
    location: '',
    email: '',
    github: '',
    linkedin: '',
    portfolio: '',
    resumeUrl: '',
    resumeFileName: '',
    isFeatured: true,
    isVisible: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      const existing = teamService.getMemberById(id);
      if (existing) {
        setFormData(existing);
      } else {
        setError('Team member not found.');
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name?.trim()) {
      setError('Full name is required.');
      return;
    }
    if (!formData.role?.trim()) {
      setError('Member role is required.');
      return;
    }

    setIsSaving(true);
    if (isEdit && id) {
      teamService.updateMember(id, formData);
    } else {
      teamService.createMember(formData as any);
    }
    setIsSaving(false);
    navigate('/admin/team');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/team"
            className="p-2 rounded-xl bg-[#0E0E0E] border border-white/10 text-[#F5F2ED]/60 hover:text-[#F5F2ED] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#F5F2ED] font-display">
              {isEdit ? 'EDIT TEAM MEMBER' : 'ADD TEAM MEMBER'}
            </h1>
            <p className="text-xs text-[#F5F2ED]/55 font-sans">
              {isEdit ? 'Update member photo, tech stack, experience summary, and resume.' : 'Add a new builder profile to your ZANSTA collective.'}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-[#8B0D1A]/10 border border-[#8B0D1A]/30 text-xs text-[#F5F2ED] flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-[#8B0D1A] shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card surfaceTier="100" className="p-6 space-y-6 border border-white/10">
          <h2 className="text-sm font-bold text-[#F5F2ED] font-display uppercase tracking-wider border-b border-white/05 pb-3">
            Profile Photo & Identity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <MediaUploader
              label="Profile Photo *"
              value={formData.photo || ''}
              onChange={(url) => setFormData((prev) => ({ ...prev, photo: url }))}
              aspectRatio="square"
            />

            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#F5F2ED]/80">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. MD Zaved Akhtar"
                    className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#F5F2ED]/80">Role / Position *</label>
                  <input
                    type="text"
                    required
                    value={formData.role || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                    placeholder="e.g. Lead Architect & Full Stack Engineer"
                    className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#F5F2ED]/80">Short Profile Bio *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.bio || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="Specializing in high-performance microservices and frontend motion architectures..."
                  className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A] font-sans"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Tech Stack & Experience */}
        <Card surfaceTier="100" className="p-6 space-y-6 border border-white/10">
          <h2 className="text-sm font-bold text-[#F5F2ED] font-display uppercase tracking-wider border-b border-white/05 pb-3">
            Skills, Stack & Experience
          </h2>

          <TechStackInput
            value={formData.techStack || []}
            onChange={(techs) => setFormData((prev) => ({ ...prev, techStack: techs }))}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Years of Experience</label>
              <select
                value={formData.experienceYears || '3+'}
                onChange={(e) => setFormData((prev) => ({ ...prev, experienceYears: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
              >
                <option value="1+">1+ Years</option>
                <option value="2+">2+ Years</option>
                <option value="3+">3+ Years</option>
                <option value="5+">5+ Years</option>
                <option value="8+">8+ Years</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Location (Optional)</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Delhi NCR, India"
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Experience Summary</label>
            <input
              type="text"
              value={formData.experienceSummary || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, experienceSummary: e.target.value }))}
              placeholder="e.g. Full-stack developer focused on scalable MERN applications..."
              className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
            />
          </div>
        </Card>

        {/* Resume & Social Links */}
        <Card surfaceTier="100" className="p-6 space-y-6 border border-white/10">
          <h2 className="text-sm font-bold text-[#F5F2ED] font-display uppercase tracking-wider border-b border-white/05 pb-3">
            Resume PDF & Social Profiles
          </h2>

          <FileUploader
            label="Team Member Resume Document (PDF / DOC)"
            value={formData.resumeUrl || ''}
            fileName={formData.resumeFileName || ''}
            onChange={(url, name) =>
              setFormData((prev) => ({ ...prev, resumeUrl: url, resumeFileName: name }))
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">GitHub URL</label>
              <input
                type="url"
                value={formData.github || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, github: e.target.value }))}
                placeholder="https://github.com/username"
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] font-mono placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, linkedin: e.target.value }))}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] font-mono placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Portfolio / Website</label>
              <input
                type="url"
                value={formData.portfolio || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, portfolio: e.target.value }))}
                placeholder="https://portfolio.dev"
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] font-mono placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>
          </div>
        </Card>

        {/* Visibility Toggles */}
        <Card surfaceTier="100" className="p-6 space-y-4 border border-white/10">
          <h2 className="text-sm font-bold text-[#F5F2ED] font-display uppercase tracking-wider border-b border-white/05 pb-3">
            Visibility & Featured Settings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20 transition-colors">
              <span className="text-xs font-semibold text-[#F5F2ED]">Featured Team Member</span>
              <input
                type="checkbox"
                checked={Boolean(formData.isFeatured)}
                onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-4 h-4 accent-[#8B0D1A] rounded"
              />
            </label>

            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20 transition-colors">
              <span className="text-xs font-semibold text-[#F5F2ED]">Show on Landing Page</span>
              <input
                type="checkbox"
                checked={Boolean(formData.isVisible)}
                onChange={(e) => setFormData((prev) => ({ ...prev, isVisible: e.target.checked }))}
                className="w-4 h-4 accent-[#8B0D1A] rounded"
              />
            </label>
          </div>
        </Card>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link to="/admin/team">
            <Button size="md" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button size="md" variant="glow" type="submit" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            {isEdit ? 'Update Member Profile' : 'Add Team Member'}
          </Button>
        </div>
      </form>
    </div>
  );
};
