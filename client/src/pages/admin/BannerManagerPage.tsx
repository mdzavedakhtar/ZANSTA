import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { bannerService } from '@/services/bannerService';
import { CMSBanner } from '@/types/cms';
import { useCmsLiveSync } from '@/hooks/useCmsLiveSync';
import {
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Flame,
  Zap,
} from 'lucide-react';

export const BannerManagerPage: React.FC = () => {
  const [banners, setBanners] = useState<CMSBanner[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<CMSBanner | null>(null);

  const loadBanners = async () => {
    setBanners(bannerService.getBanners());
    try {
      const fresh = await bannerService.fetchBanners();
      if (fresh) setBanners(fresh);
    } catch {
      // Silent
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  useCmsLiveSync('banner', () => {
    loadBanners();
  });

  const handleToggleVisibility = async (banner: CMSBanner) => {
    await bannerService.updateBanner(banner.id, { isVisible: !banner.isVisible });
    loadBanners();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    await bannerService.deleteBanner(deleteTarget.id);
    setDeleteTarget(null);
    loadBanners();
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= banners.length) return;

    const newBanners = [...banners];
    const temp = newBanners[index];
    newBanners[index] = newBanners[targetIndex];
    newBanners[targetIndex] = temp;

    setBanners(newBanners);
    await bannerService.reorderBanners(newBanners);
    loadBanners();
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 w-full">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#E11D48] shrink-0">
              <Megaphone className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#F5F2ED] tracking-tight font-display break-words flex items-center gap-2">
              PROMO OFFERS & POSTER BANNERS CMS
              <span className="px-2 py-0.5 rounded-full bg-[#8B0D1A]/20 text-[#F5F2ED] border border-[#8B0D1A]/40 text-[10px] font-mono">
                NAVBAR MODAL
              </span>
            </h1>
          </div>
          <p className="text-xs text-[#F5F2ED]/55 font-sans">
            Upload and manage promotional poster images, discounts, and announcements displayed in the navbar advertisement popup.
          </p>
        </div>

        <Link to="/admin/banners/new" className="w-full sm:w-auto shrink-0">
          <Button size="sm" variant="glow" leftIcon={<Plus className="w-4 h-4" />} className="w-full sm:w-auto justify-center bg-[#8B0D1A] text-white hover:bg-[#A01020]">
            + Add Poster Banner
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b, idx) => (
          <Card key={b.id} surfaceTier="100" className="p-5 space-y-4 border border-white/10 relative overflow-hidden group">
            {/* Landscape Poster Preview */}
            <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
              <img
                src={b.imageUrl}
                alt={b.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-[#8B0D1A] text-white font-mono text-[10px] font-bold shadow">
                  #{b.order !== undefined ? b.order : idx + 1}
                </span>
                {b.badgeText && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500 text-black font-mono text-[10px] font-extrabold flex items-center gap-1 shadow">
                    <Flame className="w-3 h-3" />
                    {b.badgeText}
                  </span>
                )}
                {b.discountText && (
                  <span className="px-2 py-0.5 rounded-md bg-[#8B0D1A] text-white font-mono text-[10px] font-extrabold shadow border border-red-400/30">
                    <Zap className="w-3 h-3 inline mr-0.5" />
                    {b.discountText}
                  </span>
                )}
              </div>

              <div className="absolute bottom-2.5 left-3 right-3 text-left">
                <h3 className="text-xs font-bold text-white font-display line-clamp-1 drop-shadow-md">{b.title}</h3>
                {b.subtitle && <p className="text-[10px] text-zinc-300 font-sans line-clamp-1">{b.subtitle}</p>}
              </div>
            </div>

            {/* Actions and sequence */}
            <div className="flex items-center justify-between pt-2 border-t border-white/08">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMoveOrder(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/05 hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveOrder(idx, 'down')}
                  disabled={idx === banners.length - 1}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/05 hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-zinc-400 ml-1">Seq #{idx + 1}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleToggleVisibility(b)}
                  className={`text-xs ${b.isVisible ? 'text-[#E11D48]' : 'text-zinc-500'}`}
                >
                  {b.isVisible ? <Eye className="w-3.5 h-3.5 mr-1 text-[#E11D48]" /> : <EyeOff className="w-3.5 h-3.5 mr-1" />}
                  {b.isVisible ? 'Visible' : 'Hidden'}
                </Button>

                <Link to={`/admin/banners/${b.id}/edit`}>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Edit className="w-3.5 h-3.5 mr-1 text-[#E11D48]" />
                    Edit
                  </Button>
                </Link>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setDeleteTarget(b)}
                  className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Promo Banner"
        description={`Are you sure you want to delete banner "${deleteTarget?.title}"? This will remove it from the navbar advertisement modal.`}
        confirmLabel="Delete Banner"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
