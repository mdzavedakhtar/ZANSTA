import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { reviewService } from '@/services/reviewService';
import { projectService } from '@/services/projectService';
import { CMSReview, CMSProject } from '@/types/cms';
import { ArrowLeft, Save, Star, AlertCircle } from 'lucide-react';

export const ReviewFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [projects, setProjects] = useState<CMSProject[]>([]);
  const [formData, setFormData] = useState<Partial<CMSReview>>({
    clientName: '',
    clientRole: '',
    companyName: '',
    clientImage: '',
    rating: 5,
    reviewText: '',
    projectId: '',
    projectName: '',
    isFeatured: true,
    isVisible: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProjects(projectService.getProjects());

    if (isEdit && id) {
      const existing = reviewService.getReviewById(id);
      if (existing) {
        setFormData(existing);
      } else {
        setError('Review not found.');
      }
    }
  }, [id, isEdit]);

  const handleProjectSelect = (projId: string) => {
    const selected = projects.find((p) => p.id === projId);
    setFormData((prev) => ({
      ...prev,
      projectId: projId,
      projectName: selected?.name || '',
      companyName: prev.companyName || selected?.clientName || '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.clientName?.trim()) {
      setError('Client name is required.');
      return;
    }
    if (!formData.reviewText?.trim()) {
      setError('Review text is required.');
      return;
    }

    setIsSaving(true);
    if (isEdit && id) {
      reviewService.updateReview(id, formData);
    } else {
      reviewService.createReview(formData as any);
    }
    setIsSaving(false);
    navigate('/admin/reviews');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/reviews"
            className="p-2 rounded-xl bg-[#0E0E0E] border border-white/10 text-[#F5F2ED]/60 hover:text-[#F5F2ED] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#F5F2ED] font-display">
              {isEdit ? 'EDIT CLIENT REVIEW' : 'ADD CLIENT REVIEW'}
            </h1>
            <p className="text-xs text-[#F5F2ED]/55 font-sans">
              Add or edit client testimonials, star ratings, and project associations.
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
          <MediaUploader
            label="Client Profile Photo / Avatar"
            value={formData.clientImage || ''}
            onChange={(url) => setFormData((prev) => ({ ...prev, clientImage: url }))}
            aspectRatio="avatar"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Client Name *</label>
              <input
                type="text"
                required
                value={formData.clientName || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                placeholder="e.g. Dr. Marcus Vance"
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Role / Position</label>
              <input
                type="text"
                value={formData.clientRole || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, clientRole: e.target.value }))}
                placeholder="e.g. Chief Medical Officer"
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Company Name</label>
              <input
                type="text"
                value={formData.companyName || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                placeholder="e.g. CareSprint Health Inc."
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Star Rating (1 - 5)</label>
              <select
                value={formData.rating || 5}
                onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★☆</option>
                <option value={3}>3 Stars ★★★☆☆</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Associated Project (Optional)</label>
              <select
                value={formData.projectId || ''}
                onChange={(e) => handleProjectSelect(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
              >
                <option value="">-- General Agency Review --</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Review / Testimonial Text *</label>
            <textarea
              rows={4}
              required
              value={formData.reviewText || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, reviewText: e.target.value }))}
              placeholder="Detailed feedback from the client..."
              className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A] font-sans"
            />
          </div>
        </Card>

        <Card surfaceTier="100" className="p-6 space-y-4 border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer">
              <span className="text-xs font-semibold text-[#F5F2ED]">Featured Testimonial</span>
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
          <Link to="/admin/reviews">
            <Button size="md" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button size="md" variant="glow" type="submit" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            {isEdit ? 'Update Review' : 'Publish Review'}
          </Button>
        </div>
      </form>
    </div>
  );
};
