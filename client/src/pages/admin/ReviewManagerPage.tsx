import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { reviewService } from '@/services/reviewService';
import { CMSReview } from '@/types/cms';
import {
  MessageSquareQuote,
  Plus,
  Search,
  Star,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Quote,
} from 'lucide-react';

export const ReviewManagerPage: React.FC = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<CMSReview[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<CMSReview | null>(null);

  const loadReviews = () => {
    setReviews(reviewService.getReviews());
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleFeatured = (review: CMSReview) => {
    reviewService.updateReview(review.id, { isFeatured: !review.isFeatured });
    loadReviews();
  };

  const handleToggleVisibility = (review: CMSReview) => {
    reviewService.updateReview(review.id, { isVisible: !review.isVisible });
    loadReviews();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    reviewService.deleteReview(deleteTarget.id);
    setDeleteTarget(null);
    loadReviews();
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A]">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-black text-[#F5F2ED] tracking-tight font-display">
              CLIENT REVIEWS & TESTIMONIALS CMS
            </h1>
          </div>
          <p className="text-xs text-[#F5F2ED]/55 font-sans">
            Manage client reviews, star ratings, project associations, and landing page showcase status.
          </p>
        </div>

        <Link to="/admin/reviews/new">
          <Button size="sm" variant="glow" leftIcon={<Plus className="w-4 h-4" />}>
            Add Review
          </Button>
        </Link>
      </div>

      {reviews.length === 0 ? (
        <EmptyState
          icon={<MessageSquareQuote className="w-8 h-8 text-[#8B0D1A]" />}
          title="No client reviews yet"
          description="Add your first client testimonial to display on the landing page."
          actionLabel="Add Review"
          onAction={() => navigate('/admin/reviews/new')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <Card key={r.id} surfaceTier="100" className="p-6 space-y-4 border border-white/10 relative">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar name={r.clientName} src={r.clientImage} size="md" />
                  <div>
                    <h3 className="text-base font-extrabold text-[#F5F2ED] font-display">{r.clientName}</h3>
                    <p className="text-xs font-mono text-[#8B0D1A] mt-0.5">
                      {r.clientRole} — {r.companyName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleFeatured(r)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      r.isFeatured ? 'bg-[#8B0D1A]/80 border-[#8B0D1A] text-amber-300' : 'bg-white/05 border-white/10 text-white/40'
                    }`}
                    title="Featured Review"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button
                    onClick={() => handleToggleVisibility(r)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      r.isVisible ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400' : 'bg-white/05 border-white/10 text-white/40'
                    }`}
                    title="Visible on Landing Page"
                  >
                    {r.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                {[...Array(r.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-[#F5F2ED]/40 ml-1">({r.rating}.0 / 5.0)</span>
              </div>

              <p className="text-xs text-[#F5F2ED]/70 italic leading-relaxed font-sans">
                "{r.reviewText}"
              </p>

              {r.projectName && (
                <div className="text-[11px] font-mono text-[#F5F2ED]/40 border-t border-white/05 pt-3">
                  Project Reference: <span className="text-[#F5F2ED]/80">{r.projectName}</span>
                </div>
              )}

              <div className="pt-3 border-t border-white/05 flex items-center justify-end gap-2">
                <Link to={`/admin/reviews/${r.id}/edit`}>
                  <Button size="sm" variant="ghost" leftIcon={<Edit className="w-3.5 h-3.5 text-[#F5F2ED]/70" />}>
                    Edit
                  </Button>
                </Link>
                <button
                  onClick={() => setDeleteTarget(r)}
                  className="p-2 rounded-xl text-[#F5F2ED]/30 hover:text-[#8B0D1A] hover:bg-[#8B0D1A]/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Client Review?"
        description={`Are you sure you want to remove the review from "${deleteTarget?.clientName}"?`}
        confirmLabel="Delete Review"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
