import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TechStackInput } from '@/components/admin/TechStackInput';
import { serviceService } from '@/services/serviceService';
import { CMSService } from '@/types/cms';
import { ArrowLeft, Save, Layers, AlertCircle } from 'lucide-react';

export const ServiceFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<Partial<CMSService>>({
    name: '',
    shortDescription: '',
    fullDescription: '',
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
        setError('Service not found.');
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name?.trim()) {
      setError('Service name is required.');
      return;
    }

    setIsSaving(true);
    if (isEdit && id) {
      serviceService.updateService(id, formData);
    } else {
      serviceService.createService(formData as any);
    }
    setIsSaving(false);
    navigate('/admin/services');
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
              Configure ZANSTA agency capability offerings.
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
        <Card surfaceTier="100" className="p-6 space-y-6 border border-white/10">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Service Name *</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Full-Stack Development"
              className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Short Description</label>
            <input
              type="text"
              value={formData.shortDescription || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
              placeholder="1-sentence description..."
              className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Full Capability Description</label>
            <textarea
              rows={4}
              value={formData.fullDescription || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, fullDescription: e.target.value }))}
              placeholder="Detailed description of service offering..."
              className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A] font-sans"
            />
          </div>

          <TechStackInput
            value={formData.techStack || []}
            onChange={(techs) => setFormData((prev) => ({ ...prev, techStack: techs }))}
          />
        </Card>

        <Card surfaceTier="100" className="p-6 space-y-4 border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer">
              <span className="text-xs font-semibold text-[#F5F2ED]">Featured Service</span>
              <input
                type="checkbox"
                checked={Boolean(formData.isFeatured)}
                onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-4 h-4 accent-[#8B0D1A] rounded"
              />
            </label>

            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer">
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

        <div className="flex items-center justify-end gap-3 pt-4">
          <Link to="/admin/services">
            <Button size="md" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button size="md" variant="glow" type="submit" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            {isEdit ? 'Update Service' : 'Publish Service'}
          </Button>
        </div>
      </form>
    </div>
  );
};
