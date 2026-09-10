import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { TechStackInput } from '@/components/admin/TechStackInput';
import { projectService } from '@/services/projectService';
import { CMSProject, ProjectCategory, ProjectStatus } from '@/types/cms';
import { ArrowLeft, Save, FolderGit2, Sparkles, AlertCircle } from 'lucide-react';

export const ProjectFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<Partial<CMSProject>>({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    thumbnail: '',
    gallery: [],
    techStack: ['React', 'Node.js'],
    category: 'SAAS',
    status: 'IN_PROGRESS',
    githubUrl: '',
    liveUrl: '',
    clientName: '',
    isClientProject: false,
    isFeatured: true,
    isVisible: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      const existing = projectService.getProjectById(id);
      if (existing) {
        setFormData(existing);
      } else {
        setError('Project not found.');
      }
    }
  }, [id, isEdit]);

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name?.trim()) {
      setError('Project name is required.');
      return;
    }
    if (!formData.shortDescription?.trim()) {
      setError('Short description is required.');
      return;
    }

    setIsSaving(true);
    if (isEdit && id) {
      projectService.updateProject(id, formData);
    } else {
      projectService.createProject(formData as any);
    }
    setIsSaving(false);
    navigate('/admin/projects');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="p-2 rounded-xl bg-[#0E0E0E] border border-white/10 text-[#F5F2ED]/60 hover:text-[#F5F2ED] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#F5F2ED] font-display">
              {isEdit ? 'EDIT PROJECT' : 'CREATE NEW PROJECT'}
            </h1>
            <p className="text-xs text-[#F5F2ED]/55 font-sans">
              {isEdit ? 'Update project details, showcase images, and visibility.' : 'Add a new project to your ZANSTA admin showcase.'}
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
            Primary Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Project Name *</label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. CareSprint Telemedicine"
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">URL Slug</label>
              <input
                type="text"
                value={formData.slug || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="caresprint"
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] font-mono placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Short Tagline / Summary *</label>
            <input
              type="text"
              required
              value={formData.shortDescription || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
              placeholder="Brief 1-sentence overview for portfolio cards..."
              className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Full Case Study Description</label>
            <textarea
              rows={4}
              value={formData.description || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed description of features, engineering architecture, and results..."
              className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A] font-sans"
            />
          </div>
        </Card>

        {/* Media & Gallery */}
        <Card surfaceTier="100" className="p-6 space-y-6 border border-white/10">
          <h2 className="text-sm font-bold text-[#F5F2ED] font-display uppercase tracking-wider border-b border-white/05 pb-3">
            Project Media Assets
          </h2>

          <MediaUploader
            label="Cover Thumbnail Image"
            value={formData.thumbnail || ''}
            onChange={(url) => setFormData((prev) => ({ ...prev, thumbnail: url }))}
            aspectRatio="wide"
          />
        </Card>

        {/* Tech Stack & Classification */}
        <Card surfaceTier="100" className="p-6 space-y-6 border border-white/10">
          <h2 className="text-sm font-bold text-[#F5F2ED] font-display uppercase tracking-wider border-b border-white/05 pb-3">
            Classification & Stack
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Project Category</label>
              <select
                value={formData.category || 'SAAS'}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as ProjectCategory }))}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
              >
                <option value="WEB APP">WEB APP</option>
                <option value="AI / ML">AI / ML</option>
                <option value="MOBILE">MOBILE</option>
                <option value="SAAS">SAAS</option>
                <option value="AGENCY">AGENCY</option>
                <option value="CLIENT PROJECT">CLIENT PROJECT</option>
                <option value="INTERNAL PRODUCT">INTERNAL PRODUCT</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Status</label>
              <select
                value={formData.status || 'IN_PROGRESS'}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as ProjectStatus }))}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
              >
                <option value="PLANNING">PLANNING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="LIVE">LIVE</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
          </div>

          <TechStackInput
            value={formData.techStack || []}
            onChange={(techs) => setFormData((prev) => ({ ...prev, techStack: techs }))}
          />
        </Card>

        {/* Links & Client Metadata */}
        <Card surfaceTier="100" className="p-6 space-y-6 border border-white/10">
          <h2 className="text-sm font-bold text-[#F5F2ED] font-display uppercase tracking-wider border-b border-white/05 pb-3">
            Links & Client Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Client Name</label>
              <input
                type="text"
                value={formData.clientName || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                placeholder="e.g. CareSprint Health Inc."
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Live Demo URL</label>
              <input
                type="url"
                value={formData.liveUrl || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, liveUrl: e.target.value }))}
                placeholder="https://example.com"
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] font-mono placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">GitHub Repository URL</label>
              <input
                type="url"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                placeholder="https://github.com/org/repo"
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] font-mono placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>
          </div>
        </Card>

        {/* Toggles */}
        <Card surfaceTier="100" className="p-6 space-y-4 border border-white/10">
          <h2 className="text-sm font-bold text-[#F5F2ED] font-display uppercase tracking-wider border-b border-white/05 pb-3">
            Visibility & Portfolio Settings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20 transition-colors">
              <span className="text-xs font-semibold text-[#F5F2ED]">Featured Project</span>
              <input
                type="checkbox"
                checked={Boolean(formData.isFeatured)}
                onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-4 h-4 accent-[#8B0D1A] rounded"
              />
            </label>

            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20 transition-colors">
              <span className="text-xs font-semibold text-[#F5F2ED]">Show on Public Site</span>
              <input
                type="checkbox"
                checked={Boolean(formData.isVisible)}
                onChange={(e) => setFormData((prev) => ({ ...prev, isVisible: e.target.checked }))}
                className="w-4 h-4 accent-[#8B0D1A] rounded"
              />
            </label>

            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20 transition-colors">
              <span className="text-xs font-semibold text-[#F5F2ED]">Is Client Project</span>
              <input
                type="checkbox"
                checked={Boolean(formData.isClientProject)}
                onChange={(e) => setFormData((prev) => ({ ...prev, isClientProject: e.target.checked }))}
                className="w-4 h-4 accent-[#8B0D1A] rounded"
              />
            </label>
          </div>
        </Card>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link to="/admin/projects">
            <Button size="md" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button size="md" variant="glow" type="submit" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            {isEdit ? 'Update Project' : 'Publish Project'}
          </Button>
        </div>
      </form>
    </div>
  );
};
