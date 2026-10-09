import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { certificateService } from '@/services/certificateService';
import { CMSCertificate } from '@/types/cms';
import {
  ShieldCheck,
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Award,
  Link2,
  CheckCircle2,
} from 'lucide-react';

const PRESET_CERT_LOGOS = [
  {
    name: 'Government of India / MSME Emblem',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Government_of_India_logo.svg',
  },
  {
    name: 'Startup India Emblem',
    url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'ISO 9001:2015 Quality Badge',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: '256-Bit SSL Shield Badge',
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop',
  },
];

export const CertificateFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    certificateNumber: '',
    badgeText: '🇮🇳 GOVT. OF INDIA VERIFIED',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Government_of_India_logo.svg',
    verificationUrl: '',
    issuedDate: '',
    description: '',
    order: 1,
    isVisible: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      const cert = certificateService.getCertificateById(id);
      if (cert) {
        setFormData({
          title: cert.title,
          issuer: cert.issuer,
          certificateNumber: cert.certificateNumber,
          badgeText: cert.badgeText || '',
          logoUrl: cert.logoUrl,
          verificationUrl: cert.verificationUrl || '',
          issuedDate: cert.issuedDate || '',
          description: cert.description || '',
          order: cert.order || 1,
          isVisible: cert.isVisible,
        });
      }
    }
  }, [isEditing, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.issuer.trim() || !formData.certificateNumber.trim()) {
      setError('Title, Issuer, and Certificate Registration Number are required.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      if (isEditing && id) {
        await certificateService.updateCertificate(id, formData);
      } else {
        await certificateService.createCertificate(formData);
      }
      navigate('/admin/certificates');
    } catch (err: any) {
      setError(err?.message || 'Failed to save certificate');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-16 w-full max-w-4xl mx-auto overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link to="/admin/certificates">
            <Button size="sm" variant="ghost" className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#F5F2ED] font-display">
              {isEditing ? 'EDIT COMPANY CERTIFICATE' : 'ADD COMPANY CERTIFICATE'}
            </h1>
            <p className="text-xs text-[#F5F2ED]/55">
              Certificates and government registrations appear in the trust & credentials section of the public footer.
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
            <Award className="w-4 h-4 text-emerald-400" />
            Certificate & Government Registration Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                Certificate / Recognition Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. MSME UDYAM REGISTRATION VERIFIED"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                  Issuing Authority / Ministry *
                </label>
                <input
                  type="text"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  placeholder="e.g. Ministry of MSME, Govt. of India"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                  Registration / Certificate Number *
                </label>
                <input
                  type="text"
                  value={formData.certificateNumber}
                  onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                  placeholder="e.g. UDYAM-CG-02-0018924"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                  Badge Text / Verification Tag
                </label>
                <input
                  type="text"
                  value={formData.badgeText}
                  onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                  placeholder="e.g. 🇮🇳 GOVT. OF INDIA VERIFIED, ISO 9001:2015"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                  Issued Date
                </label>
                <input
                  type="text"
                  value={formData.issuedDate}
                  onChange={(e) => setFormData({ ...formData, issuedDate: e.target.value })}
                  placeholder="e.g. 2024-03-15 or March 2024"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                Verification Details / Description
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Officially registered and recognized Enterprise by the Government of India..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </Card>

        {/* Logo & Preview */}
        <Card surfaceTier="100" className="p-6 space-y-5 border border-white/10">
          <h2 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            Certificate Logo / Emblem
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                Logo / Emblem Image URL *
              </label>
              <input
                type="url"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-mono text-zinc-400">Quick Emblem Presets:</span>
              {PRESET_CERT_LOGOS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => setFormData({ ...formData, logoUrl: preset.url })}
                  className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/05 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-[11px] text-zinc-300 transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Live Render Preview */}
            {formData.logoUrl && (
              <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-emerald-500/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/15 p-1.5 flex items-center justify-center shrink-0">
                  <img src={formData.logoUrl} alt="Emblem" className="w-full h-full object-contain" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white truncate font-display">{formData.title || 'Certificate Title'}</span>
                    {formData.badgeText && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                        {formData.badgeText}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400">{formData.issuer || 'Issuing Authority'}</p>
                  <p className="text-xs font-mono text-emerald-400 font-bold">{formData.certificateNumber || 'REG-NUMBER'}</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Verification Link & Display Order */}
        <Card surfaceTier="100" className="p-6 space-y-5 border border-white/10">
          <h2 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <Link2 className="w-4 h-4 text-purple-400" />
            Verification Link & Order
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                Online Verification URL (Optional)
              </label>
              <input
                type="url"
                value={formData.verificationUrl}
                onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                placeholder="https://udyamregistration.gov.in"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                Display Order Sequence # (1, 2, 3...)
              </label>
              <input
                type="number"
                min="1"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isVisible}
                onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-950"
              />
              <span className="text-xs font-mono text-zinc-300 font-bold">
                Visible in Footer Verification Section
              </span>
            </label>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link to="/admin/certificates">
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
            className="bg-emerald-500 text-black hover:bg-emerald-400"
          >
            {submitting ? 'Saving Certificate...' : isEditing ? 'Save Changes' : 'Create Certificate'}
          </Button>
        </div>
      </form>
    </div>
  );
};
