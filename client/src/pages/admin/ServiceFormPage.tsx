import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TechStackInput } from '@/components/admin/TechStackInput';
import { serviceService } from '@/services/serviceService';
import { CMSService } from '@/types/cms';
import { ArrowLeft, Save, Image as ImageIcon, AlertCircle, Sparkles } from 'lucide-react';

export const ServiceFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<Partial<CMSService>>({
    name: '',
    shortDescription: '',
    fullDescription: '',
    imageUrl: '',
    tag: 'Web',
    iconName: 'Code2',
    techStack: ['React', 'Node.js'],
    isFeatured: true,
    isVisible: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      const existing = serviceService.getServiceById(id);
      if (existing) {
        setFormData(existing);
      } else {
        serviceService.fetchServices().then((list) => {
          const found = list.find((s) => s.id === id);
          if (found) setFormData(found);
          else setError('Service not found.');
        });
      }
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name?.trim()) {
      setError('Service name is required.');
      return;
    }

    setIsSaving(true);
    try {
      if (isEdit && id) {
        await serviceService.updateService(id, formData);
      } else {
        await serviceService.createService(formData as any);
      }
      navigate('/admin/services');
    } catch (err: any) {
      setError(err.message || 'Failed to save service');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/services"
            className="p-2 rounded-xl bg-[#0E0E0E] border border-white/10 text-[#F5F2ED]/60 hover:text-[#F5F2ED] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#F5F2ED] font-display">
              {isEdit ? 'EDIT AGENCY SERVICE' : 'CREATE AGENCY SERVICE'}
            </h1>
            <p className="text-xs text-[#F5F2ED]/55 font-sans">
              Configure ZANSTA agency capability offerings with custom frame images.
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Core Info */}
        <Card surfaceTier="100" className="p-6 space-y-6 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Service Title / Name *</label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Full Stack Website Development"
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-white/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Category Tag</label>
              <input
                type="text"
                value={formData.tag || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, tag: e.target.value }))}
                placeholder="e.g. UI / UX, Full Stack, AI / ML"
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Short Tagline Description</label>
            <input
              type="text"
              value={formData.shortDescription || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
              placeholder="1-sentence description displayed on landing card..."
              className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Service Image URL & Frame Preview */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-mono text-[#F5F2ED]/80 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-zinc-400" />
                <span>Service Card Header Image URL (Frame Fit)</span>
              </span>
              <span className="text-[10px] text-zinc-500">Aspect 16:9 / Banner Image</span>
            </label>
            <input
              type="url"
              value={formData.imageUrl || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="https://images.unsplash.com/... or /services/uiux.jpg"
              className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-white/30 font-mono"
            />

            {/* Live Frame Fit Preview */}
            <div className="p-4 rounded-2xl bg-[#090a0f] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Card Frame Fit Preview:</span>
                <span className="text-zinc-500">{formData.imageUrl ? 'Image Active' : 'Default Cyber Glow Frame'}</span>
              </div>
              
              <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-[#12131b] border border-white/[0.08] flex items-center justify-between p-6">
                {formData.imageUrl ? (
                  <>
                    <img
                      src={formData.imageUrl}
                      alt={formData.name || 'Preview'}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    {/* Dark gradient overlay to keep text legible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-black/40 to-transparent pointer-events-none" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#4c1d95]/20 via-[#8B0D1A]/15 to-transparent blur-xl pointer-events-none" />
                )}

                <div className="relative z-10 w-11 h-11 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>

                <span className="relative z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white font-medium shadow-sm">
                  {formData.tag || 'Service'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Full Capability Description</label>
            <textarea
              rows={4}
              value={formData.fullDescription || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, fullDescription: e.target.value }))}
              placeholder="Detailed description of service offering, architecture, and deliverables..."
              className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-white/30 font-sans"
            />
          </div>

          <TechStackInput
            value={formData.techStack || []}
            onChange={(techs) => setFormData((prev) => ({ ...prev, techStack: techs }))}
          />
        </Card>

        {/* Visibility & Settings */}
        <Card surfaceTier="100" className="p-6 space-y-4 border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer">
              <span className="text-xs font-semibold text-[#F5F2ED]">Featured Service</span>
              <input
                type="checkbox"
                checked={Boolean(formData.isFeatured)}
                onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-4 h-4 accent-white rounded"
              />
            </label>

            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer">
              <span className="text-xs font-semibold text-[#F5F2ED]">Show on Landing Page</span>
              <input
                type="checkbox"
                checked={Boolean(formData.isVisible)}
                onChange={(e) => setFormData((prev) => ({ ...prev, isVisible: e.target.checked }))}
                className="w-4 h-4 accent-white rounded"
              />
            </label>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-4 w-full">
          <Link to="/admin/services" className="w-full sm:w-auto">
            <Button size="md" variant="ghost" className="w-full sm:w-auto justify-center">
              Cancel
            </Button>
          </Link>
          <Button size="md" variant="glow" type="submit" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />} className="w-full sm:w-auto justify-center">
            {isEdit ? 'Update Service' : 'Publish Service'}
          </Button>
        </div>
      </form>
    </div>
  );
};
