import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { demoRequestService } from '@/services/demoRequestService';
import { DemoRequest, DemoRequestStatus } from '@/types/cms';
import { MonitorPlay, Mail, Trash2, CheckCircle2, Clock } from 'lucide-react';

export const DemoRequestManagerPage: React.FC = () => {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<DemoRequest | null>(null);

  const loadRequests = () => {
    setRequests(demoRequestService.getRequests());
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleStatusChange = (id: string, newStatus: DemoRequestStatus) => {
    demoRequestService.updateStatus(id, newStatus);
    loadRequests();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    demoRequestService.deleteRequest(deleteTarget.id);
    setDeleteTarget(null);
    loadRequests();
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A]">
            <MonitorPlay className="w-4 h-4" />
          </div>
          <h1 className="text-2xl font-black text-[#F5F2ED] tracking-tight font-display">
            DEMO REQUEST LEADS MANAGER
          </h1>
        </div>
        <p className="text-xs text-[#F5F2ED]/55 font-sans">
          Manage live demo walkthrough requests submitted by potential clients from the landing page.
        </p>
      </div>

      {requests.length === 0 ? (
        <EmptyState
          icon={<MonitorPlay className="w-8 h-8 text-[#8B0D1A]" />}
          title="No demo requests received"
          description="Demo requests submitted via the landing page will appear here."
        />
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <Card key={r.id} surfaceTier="100" className="p-6 border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/05 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#F5F2ED] font-display">{r.name}</h3>
                    <Badge
                      variant={r.status === 'NEW' ? 'crimson' : r.status === 'CONTACTED' ? 'active' : 'neutral'}
                      size="sm"
                    >
                      {r.status}
                    </Badge>
                  </div>
                  <p className="text-xs font-mono text-[#8B0D1A]">
                    {r.email} {r.company ? `— ${r.company}` : ''}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={r.status}
                    onChange={(e) => handleStatusChange(r.id, e.target.value as DemoRequestStatus)}
                    className="px-3 py-1.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
                  >
                    <option value="NEW">Status: NEW</option>
                    <option value="CONTACTED">Status: CONTACTED</option>
                    <option value="SCHEDULED">Status: SCHEDULED</option>
                    <option value="ARCHIVED">Status: ARCHIVED</option>
                  </select>

                  <button
                    onClick={() => setDeleteTarget(r)}
                    className="p-2 rounded-xl text-[#F5F2ED]/30 hover:text-[#8B0D1A] hover:bg-[#8B0D1A]/10 transition-colors"
                    title="Delete Lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#F5F2ED]/70">
                <div>
                  <span className="text-[#F5F2ED]/40 block text-[10px]">Project / Capability Interest:</span>
                  <span className="font-semibold text-[#F5F2ED]">{r.projectInterest || 'General Demo'}</span>
                </div>
                <div>
                  <span className="text-[#F5F2ED]/40 block text-[10px]">Preferred Contact Method:</span>
                  <span className="capitalize text-[#8B0D1A] font-semibold">{r.contactMethod || 'Email'}</span>
                </div>
              </div>

              {r.message && (
                <div className="p-3 rounded-xl bg-white/05 border border-white/05 text-xs text-[#F5F2ED]/80 font-sans leading-relaxed">
                  <span className="text-[10px] font-mono text-[#F5F2ED]/40 block mb-1">Message Detail:</span>
                  "{r.message}"
                </div>
              )}

              <div className="text-[10px] font-mono text-[#F5F2ED]/35 flex items-center justify-between">
                <span>Submitted: {new Date(r.createdAt).toLocaleString()}</span>
                <a href={`mailto:${r.email}`} className="text-[#8B0D1A] hover:underline flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Reply via Email
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Demo Request?"
        description={`Are you sure you want to remove the demo request lead for "${deleteTarget?.name}"?`}
        confirmLabel="Delete Lead"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
