import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { serviceService } from '@/services/serviceService';
import { CMSService } from '@/types/cms';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Code2,
  Sparkles,
  Layout,
  Terminal,
} from 'lucide-react';

export const ServiceManagerPage: React.FC = () => {
  const [services, setServices] = useState<CMSService[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<CMSService | null>(null);

  const loadServices = () => {
    setServices(serviceService.getServices());
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleToggleVisibility = (svc: CMSService) => {
    serviceService.updateService(svc.id, { isVisible: !svc.isVisible });
    loadServices();
  };

  const handleToggleFeatured = (svc: CMSService) => {
    serviceService.updateService(svc.id, { isFeatured: !svc.isFeatured });
    loadServices();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    serviceService.deleteService(deleteTarget.id);
    setDeleteTarget(null);
    loadServices();
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A]">
              <Layers className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-black text-[#F5F2ED] tracking-tight font-display">
              AGENCY SERVICES CMS
            </h1>
          </div>
          <p className="text-xs text-[#F5F2ED]/55 font-sans">
            Manage ZANSTA agency service offerings, descriptions, tech stacks, and public presentation.
          </p>
        </div>

        <Link to="/admin/services/new">
          <Button size="sm" variant="glow" leftIcon={<Plus className="w-4 h-4" />}>
            Create Service
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <Card key={s.id} surfaceTier="100" className="p-6 space-y-4 border border-white/10 relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A]">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#F5F2ED] font-display">{s.name}</h3>
                  <p className="text-xs text-[#F5F2ED]/55 mt-0.5">{s.shortDescription}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleToggleFeatured(s)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    s.isFeatured ? 'bg-[#8B0D1A]/80 border-[#8B0D1A] text-amber-300' : 'bg-white/05 border-white/10 text-white/40'
                  }`}
                  title="Featured Service"
                >
                  <Star className="w-3.5 h-3.5 fill-current" />
                </button>
                <button
                  onClick={() => handleToggleVisibility(s)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    s.isVisible ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400' : 'bg-white/05 border-white/10 text-white/40'
                  }`}
                  title="Publicly Visible"
                >
                  {s.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <p className="text-xs text-[#F5F2ED]/70 leading-relaxed font-sans">{s.fullDescription}</p>

            <div className="flex flex-wrap gap-1 pt-1">
              {s.techStack.map((tech) => (
                <span key={tech} className="px-2 py-0.5 rounded-md bg-white/05 border border-white/10 text-[10px] font-mono text-[#F5F2ED]/80">
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-white/05 flex items-center justify-end gap-2">
              <Link to={`/admin/services/${s.id}/edit`}>
                <Button size="sm" variant="ghost" leftIcon={<Edit className="w-3.5 h-3.5 text-[#F5F2ED]/70" />}>
                  Edit
                </Button>
              </Link>
              <button
                onClick={() => setDeleteTarget(s)}
                className="p-2 rounded-xl text-[#F5F2ED]/30 hover:text-[#8B0D1A] hover:bg-[#8B0D1A]/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Service?"
        description={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        confirmLabel="Delete Service"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
