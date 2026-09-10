import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { demoService } from '@/services/demoService';
import { CMSClientDemo } from '@/types/cms';
import {
  MonitorPlay,
  Plus,
  Search,
  Lock,
  Eye,
  Copy,
  Check,
  Edit,
  Trash2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const DemoManagerPage: React.FC = () => {
  const navigate = useNavigate();
  const [demos, setDemos] = useState<CMSClientDemo[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CMSClientDemo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadDemos = () => {
    const list = demoService.getDemos({
      search,
      status: statusFilter,
    });
    setDemos(list);
  };

  useEffect(() => {
    loadDemos();
  }, [search, statusFilter]);

  const handleCopyLink = (token: string, id: string) => {
    const fullUrl = `${window.location.origin}/demo/${token}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerateToken = (id: string) => {
    demoService.regenerateToken(id);
    loadDemos();
  };

  const handleToggleStatus = (demo: CMSClientDemo) => {
    const nextStatus = demo.status === 'LIVE' ? 'ARCHIVED' : 'LIVE';
    demoService.updateDemo(demo.id, { status: nextStatus });
    loadDemos();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    demoService.deleteDemo(deleteTarget.id);
    setIsDeleting(false);
    setDeleteTarget(null);
    loadDemos();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A]">
              <MonitorPlay className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-black text-[#F5F2ED] tracking-tight font-display">
              CLIENT DEMO MANAGEMENT
            </h1>
          </div>
          <p className="text-xs text-[#F5F2ED]/55 font-sans">
            Create, secure, and monitor client demo portals with passcode locks and shareable links.
          </p>
        </div>

        <Link to="/admin/demos/new">
          <Button size="sm" variant="glow" leftIcon={<Plus className="w-4 h-4" />}>
            Create Client Demo
          </Button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#F5F2ED]/35 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search demo title, client name, project..."
            className="w-full pl-10 pr-4 py-2 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A] font-sans"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
        >
          <option value="ALL">All Demo Statuses</option>
          <option value="LIVE">Live Demos</option>
          <option value="DRAFT">Drafts</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {/* Demo Table / Cards */}
      {demos.length === 0 ? (
        <EmptyState
          icon={<MonitorPlay className="w-8 h-8 text-[#8B0D1A]" />}
          title="No client demos found"
          description="Create your first secure client portal demo environment."
          actionLabel="Create Demo"
          onAction={() => navigate('/admin/demos/new')}
        />
      ) : (
        <div className="space-y-4">
          {demos.map((d) => (
            <Card
              key={d.id}
              surfaceTier="100"
              glowOnHover
              className="p-5 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={d.status === 'LIVE' ? 'active' : 'crimson'} size="sm">
                    {d.status}
                  </Badge>
                  <Badge variant="neutral" size="sm">
                    {d.visibility}
                  </Badge>
                  {d.passcode && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 text-[#F5F2ED]/90 px-2 py-0.5 rounded-md">
                      <Lock className="w-3 h-3 text-[#8B0D1A]" /> Passcode Protected
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-[#F5F2ED]/40">
                    {d.viewCount || 0} Total Views
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#F5F2ED] font-display">
                    {d.title}
                  </h3>
                  <p className="text-xs font-mono text-[#8B0D1A] mt-0.5">
                    Client: {d.clientName} {d.projectName ? `(${d.projectName})` : ''}
                  </p>
                  <p className="text-xs text-[#F5F2ED]/60 mt-1 line-clamp-1 leading-relaxed font-sans">
                    {d.description}
                  </p>
                </div>
              </div>

              {/* Actions & Share Link */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopyLink(d.token, d.id)}
                  className="px-3 py-1.5 rounded-xl bg-white/05 border border-white/10 text-xs font-mono text-[#F5F2ED] hover:bg-white/10 flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === d.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied Link!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#8B0D1A]" />
                      <span>Copy Client Link</span>
                    </>
                  )}
                </button>

                <a
                  href={`/demo/${d.token}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white/05 border border-white/10 text-[#F5F2ED]/70 hover:text-white transition-colors"
                  title="Preview Client Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => handleRegenerateToken(d.id)}
                  className="p-2 rounded-xl bg-white/05 border border-white/10 text-[#F5F2ED]/70 hover:text-white transition-colors"
                  title="Regenerate Security Token"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <Link to={`/admin/demos/${d.id}/edit`}>
                  <Button size="sm" variant="ghost" leftIcon={<Edit className="w-3.5 h-3.5 text-[#F5F2ED]/70" />}>
                    Edit
                  </Button>
                </Link>

                <button
                  onClick={() => setDeleteTarget(d)}
                  className="p-2 rounded-xl text-[#F5F2ED]/30 hover:text-[#8B0D1A] hover:bg-[#8B0D1A]/10 transition-colors"
                  title="Delete Demo"
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
        title="Delete Client Demo?"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? The client portal link will no longer function.`}
        confirmLabel="Delete Demo"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  );
};
