import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { certificateService } from '@/services/certificateService';
import { CMSCertificate } from '@/types/cms';
import { useCmsLiveSync } from '@/hooks/useCmsLiveSync';
import {
  ShieldCheck,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Award,
  CheckCircle2,
} from 'lucide-react';

export const CertificateManagerPage: React.FC = () => {
  const [certificates, setCertificates] = useState<CMSCertificate[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<CMSCertificate | null>(null);

  const loadCertificates = async () => {
    setCertificates(certificateService.getCertificates());
    try {
      const fresh = await certificateService.fetchCertificates();
      if (fresh) setCertificates(fresh);
    } catch (e) {
      console.warn('Error fetching fresh certificates:', e);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  useCmsLiveSync('certificate', () => {
    loadCertificates();
  });

  const handleToggleVisibility = async (cert: CMSCertificate) => {
    await certificateService.updateCertificate(cert.id, { isVisible: !cert.isVisible });
    loadCertificates();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    await certificateService.deleteCertificate(deleteTarget.id);
    setDeleteTarget(null);
    loadCertificates();
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= certificates.length) return;

    const newCerts = [...certificates];
    const temp = newCerts[index];
    newCerts[index] = newCerts[targetIndex];
    newCerts[targetIndex] = temp;

    setCertificates(newCerts);
    await certificateService.reorderCertificates(newCerts);
    loadCertificates();
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 w-full">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#F5F2ED] tracking-tight font-display break-words flex items-center gap-2">
              COMPANY CERTIFICATES & MSME UDYAM CMS
            </h1>
          </div>
          <p className="text-xs text-[#F5F2ED]/55 font-sans">
            Manage government MSME Udyam registration certificates, ISO certifications, and trust badges displayed at the bottom of the public footer.
          </p>
        </div>

        <Link to="/admin/certificates/new" className="w-full sm:w-auto shrink-0">
          <Button size="sm" variant="glow" leftIcon={<Plus className="w-4 h-4" />} className="w-full sm:w-auto justify-center bg-emerald-500 text-black hover:bg-emerald-400">
            + Add Certificate
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((c, idx) => (
          <Card key={c.id} surfaceTier="100" className="p-5 space-y-4 border border-white/10 relative overflow-hidden group">
            {/* Header info */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 border border-white/15 flex items-center justify-center p-1 shrink-0">
                  <img src={c.logoUrl} alt={c.title} className="w-full h-full object-contain" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#8B0D1A] text-white font-mono text-[10px] font-bold shadow">
                      #{c.order !== undefined ? c.order : idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-white font-display line-clamp-1">{c.title}</h3>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans line-clamp-1">{c.issuer}</p>
                </div>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/05 space-y-1.5 text-xs font-mono text-zinc-300">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-[11px]">Registration No:</span>
                <span className="font-bold text-emerald-400">{c.certificateNumber}</span>
              </div>
              {c.badgeText && (
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-[11px]">Status Badge:</span>
                  <span className="text-amber-300 font-semibold">{c.badgeText}</span>
                </div>
              )}
              {c.description && (
                <p className="text-[11px] text-zinc-400 font-sans pt-1 line-clamp-2 border-t border-white/05">
                  {c.description}
                </p>
              )}
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
                  disabled={idx === certificates.length - 1}
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
                  onClick={() => handleToggleVisibility(c)}
                  className={`text-xs ${c.isVisible ? 'text-emerald-400' : 'text-zinc-500'}`}
                >
                  {c.isVisible ? <Eye className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 mr-1" />}
                  {c.isVisible ? 'Visible' : 'Hidden'}
                </Button>

                <Link to={`/admin/certificates/${c.id}/edit`}>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Edit className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                    Edit
                  </Button>
                </Link>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setDeleteTarget(c)}
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
        title="Delete Certificate"
        description={`Are you sure you want to delete certificate "${deleteTarget?.title}"? This will remove it from the footer verification credentials section.`}
        confirmLabel="Delete Certificate"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
