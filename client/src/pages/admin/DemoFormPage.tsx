import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { demoService } from '@/services/demoService';
import { projectService } from '@/services/projectService';
import { CMSClientDemo, DemoStatus, DemoVisibility, CMSProject } from '@/types/cms';
import { ArrowLeft, Save, MonitorPlay, Lock, AlertCircle } from 'lucide-react';

export const DemoFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [projects, setProjects] = useState<CMSProject[]>([]);
  const [formData, setFormData] = useState<Partial<CMSClientDemo>>({
    projectId: '',
    projectName: '',
    title: '',
    description: '',
    demoUrl: '',
    previewImage: '',
    clientName: '',
    passcode: '',
    visibility: 'PRIVATE',
    status: 'LIVE',
    isFeatured: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const projList = projectService.getProjects();
    setProjects(projList);

    if (isEdit && id) {
      const existing = demoService.getDemoById(id);
      if (existing) {
        setFormData(existing);
      } else {
        setError('Client demo not found.');
      }
    }
  }, [id, isEdit]);

  const handleProjectSelect = (projId: string) => {
    const selected = projects.find((p) => p.id === projId);
    setFormData((prev) => ({
      ...prev,
      projectId: projId,
      projectName: selected?.name || '',
      clientName: prev.clientName || selected?.clientName || '',
      demoUrl: prev.demoUrl || selected?.liveUrl || '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title?.trim()) {
      setError('Demo title is required.');
      return;
    }
    if (!formData.clientName?.trim()) {
      setError('Client name is required.');
      return;
    }

    setIsSaving(true);
    if (isEdit && id) {
      demoService.updateDemo(id, formData);
    } else {
      demoService.createDemo(formData as any);
    }
    setIsSaving(false);
    navigate('/admin/demos');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/demos"
            className="p-2 rounded-xl bg-[#0E0E0E] border border-white/10 text-[#F5F2ED]/60 hover:text-[#F5F2ED] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#F5F2ED] font-display">
              {isEdit ? 'EDIT CLIENT DEMO' : 'CREATE CLIENT DEMO PORTAL'}
            </h1>
            <p className="text-xs text-[#F5F2ED]/55 font-sans">
              Configure project link, preview images, passcode protection, and status.
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
            Demo Portal Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Select Project (Optional)</label>
              <select
                value={formData.projectId || ''}
                onChange={(e) => handleProjectSelect(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
              >
                <option value="">-- Standalone Demo --</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Client Name *</label>
              <input
                type="text"
                required
                value={formData.clientName || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                placeholder="e.g. CareSprint Health Inc."
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Demo Title *</label>
            <input
              type="text"
              required
              value={formData.title || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. CareSprint Telemedicine Staging Portal"
              className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Deployed Live Demo URL</label>
            <input
              type="url"
              value={formData.demoUrl || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, demoUrl: e.target.value }))}
              placeholder="https://demo.example.com"
              className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] font-mono placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Description / Instructions</label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Instructions for the client reviewing this demo portal..."
              className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A] font-sans"
            />
          </div>
        </Card>

        {/* Security & Access Controls */}
        <Card surfaceTier="100" className="p-6 space-y-6 border border-white/10">
          <h2 className="text-sm font-bold text-[#F5F2ED] font-display uppercase tracking-wider border-b border-white/05 pb-3">
            Security & Passcode Protection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#8B0D1A]" /> Passcode Gate
              </label>
              <input
                type="text"
                value={formData.passcode || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, passcode: e.target.value }))}
                placeholder="Leave blank for public access"
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] font-mono placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Visibility</label>
              <select
                value={formData.visibility || 'PRIVATE'}
                onChange={(e) => setFormData((prev) => ({ ...prev, visibility: e.target.value as DemoVisibility }))}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
              >
                <option value="PRIVATE">PRIVATE (Token Required)</option>
                <option value="PUBLIC">PUBLIC</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Portal Status</label>
              <select
                value={formData.status || 'LIVE'}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as DemoStatus }))}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
              >
                <option value="LIVE">LIVE</option>
                <option value="DRAFT">DRAFT</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Media Preview */}
        <Card surfaceTier="100" className="p-6 space-y-4 border border-white/10">
          <MediaUploader
            label="Demo Preview Screenshot"
            value={formData.previewImage || ''}
            onChange={(url) => setFormData((prev) => ({ ...prev, previewImage: url }))}
            aspectRatio="wide"
          />
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link to="/admin/demos">
            <Button size="md" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button size="md" variant="glow" type="submit" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            {isEdit ? 'Update Client Demo' : 'Publish Client Demo'}
          </Button>
        </div>
      </form>
    </div>
  );
};
