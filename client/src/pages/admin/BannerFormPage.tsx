import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { bannerService } from '@/services/bannerService';
import { CMSBanner } from '@/types/cms';
import {
  Megaphone,
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Flame,
  Tag,
  Link2,
  Sparkles,
  Layers,
} from 'lucide-react';

const PRESET_POSTERS = [
  {
    name: 'Cyber Launch Promo',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'AI & Neural Systems',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Modern Dark UI/UX',
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Cloud Infrastructure',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
  },
];

export const BannerFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    discountText: '25% OFF',
    badgeText: '🔥 HOT OFFER',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
    targetUrl: '/contact',
    ctaText: 'Claim Discount',
    order: 1,
    isVisible: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      const banner = bannerService.getBannerById(id);
      if (banner) {
        setFormData({
          title: banner.title,
          subtitle: banner.subtitle || '',
          discountText: banner.discountText || '',
          badgeText: banner.badgeText || '',
          imageUrl: banner.imageUrl,
          targetUrl: banner.targetUrl || '/contact',
          ctaText: banner.ctaText || 'Claim Discount',
          order: banner.order || 1,
          isVisible: banner.isVisible,
        });
      }
    }
  }, [isEditing, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.imageUrl.trim()) {
      setError('Title and Landscape Image URL are required.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      if (isEditing && id) {
        await bannerService.updateBanner(id, formData);
      } else {
        await bannerService.createBanner(formData);
      }
      navigate('/admin/banners');
    } catch (err: any) {
      setError(err?.message || 'Failed to save banner');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-16 w-full max-w-4xl mx-auto overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link to="/admin/banners">
            <Button size="sm" variant="ghost" className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#F5F2ED] font-display">
              {isEditing ? 'EDIT PROMO POSTER BANNER' : 'ADD NEW PROMO POSTER BANNER'}
            </h1>
            <p className="text-xs text-[#F5F2ED]/55">
              Landscape poster banners automatically cycle every 5 seconds in the top navigation bar.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card surfaceTier="100" className="p-6 space-y-5 border border-white/10">
          <h2 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-cyan-400" />
            Poster Banner Content & Headlines
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                Headline Title * (Landscape Banner Message)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. ⚡ SPECIAL LAUNCH OFFER: GET 25% OFF ON CUSTOM FULL-STACK PLATFORMS"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                Subtitle / Description
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. Limited Slots • Free Architecture & SEO Audit Included"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" />
                  Discount / Offer Text
                </label>
                <input
                  type="text"
                  value={formData.discountText}
                  onChange={(e) => setFormData({ ...formData, discountText: e.target.value })}
                  placeholder="e.g. 25% OFF, FLAT $500 DISCOUNT"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Badge Text
                </label>
                <input
                  type="text"
                  value={formData.badgeText}
                  onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                  placeholder="e.g. 🔥 HOT OFFER, ✨ SPECIAL DEAL"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Poster Image URL & Live Preview */}
        <Card surfaceTier="100" className="p-6 space-y-5 border border-white/10">
          <h2 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            Landscape Poster Image & Visual Preview
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                Poster Image URL (Landscape 16:9 / Wide format) *
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-mono text-zinc-400">Quick Presets:</span>
              {PRESET_POSTERS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                  className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/05 hover:bg-cyan-500/10 hover:border-cyan-500/30 text-[11px] text-zinc-300 transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Live Visual Preview Frame */}
            {formData.imageUrl && (
              <div className="mt-4 space-y-1.5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Live Banner Render Preview</span>
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-cyan-500/30 bg-zinc-950 shadow-xl">
                  <img
                    src={formData.imageUrl}
                    alt="Poster Preview"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex items-center p-6">
                    <div className="space-y-2 max-w-lg">
                      <div className="flex items-center gap-2">
                        {formData.badgeText && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500 text-black font-mono text-[10px] font-extrabold flex items-center gap-1 shadow">
                            <Flame className="w-3 h-3" />
                            {formData.badgeText}
                          </span>
                        )}
                        {formData.discountText && (
                          <span className="px-2 py-0.5 rounded-md bg-cyan-400 text-black font-mono text-[10px] font-extrabold shadow">
                            {formData.discountText}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-black text-white leading-tight line-clamp-2">{formData.title || 'Banner Title'}</h3>
                      {formData.subtitle && <p className="text-xs text-zinc-300 line-clamp-1">{formData.subtitle}</p>}
                      <div className="pt-1">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-500 text-black font-semibold text-xs shadow-md">
                          {formData.ctaText || 'Claim Offer'} →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Action Link & Order */}
        <Card surfaceTier="100" className="p-6 space-y-5 border border-white/10">
          <h2 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <Link2 className="w-4 h-4 text-purple-400" />
            Call-to-Action & Display Settings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                Target Action URL
              </label>
              <input
                type="text"
                value={formData.targetUrl}
                onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                placeholder="/contact or https://..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                CTA Button Text
              </label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                placeholder="Claim Discount"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                Order Sequence # (1, 2, 3...)
              </label>
              <input
                type="number"
                min="1"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isVisible}
                onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-zinc-950"
              />
              <span className="text-xs font-mono text-zinc-300 font-bold">
                Visible in Public Top Navbar Advertisement Carousel
              </span>
            </label>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link to="/admin/banners">
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            size="sm"
            variant="glow"
            disabled={submitting}
            leftIcon={<Save className="w-4 h-4" />}
            className="bg-cyan-500 text-black hover:bg-cyan-400"
          >
            {submitting ? 'Saving Poster...' : isEditing ? 'Save Changes' : 'Create Poster Banner'}
          </Button>
        </div>
      </form>
    </div>
  );
};
