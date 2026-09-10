import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { enquiryService } from '@/services/enquiryService';
import { ContactEnquiry, EnquiryStatus } from '@/types/cms';
import { Mail, Phone, Trash2, Send } from 'lucide-react';

export const EnquiryManagerPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<ContactEnquiry | null>(null);

  const loadEnquiries = () => {
    setEnquiries(enquiryService.getEnquiries());
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatusChange = (id: string, newStatus: EnquiryStatus) => {
    enquiryService.updateStatus(id, newStatus);
    loadEnquiries();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    enquiryService.deleteEnquiry(deleteTarget.id);
    setDeleteTarget(null);
    loadEnquiries();
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A]">
            <Send className="w-4 h-4" />
          </div>
          <h1 className="text-2xl font-black text-[#F5F2ED] tracking-tight font-display">
            PROJECT ENQUIRIES MANAGER
          </h1>
        </div>
        <p className="text-xs text-[#F5F2ED]/55 font-sans">
          Review and manage project enquiries, scopes, and budget ranges submitted from the landing page contact section.
        </p>
      </div>

      {enquiries.length === 0 ? (
        <EmptyState
          icon={<Send className="w-8 h-8 text-[#8B0D1A]" />}
          title="No project enquiries received"
          description="Project enquiries submitted via the landing page contact form will appear here."
        />
      ) : (
        <div className="space-y-4">
          {enquiries.map((e) => (
            <Card key={e.id} surfaceTier="100" className="p-6 border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/05 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#F5F2ED] font-display">{e.name}</h3>
                    <Badge
                      variant={e.status === 'NEW' ? 'crimson' : e.status === 'IN_DISCUSSION' ? 'active' : 'neutral'}
                      size="sm"
                    >
                      {e.status}
                    </Badge>
                  </div>
                  <p className="text-xs font-mono text-[#8B0D1A]">
                    {e.email} {e.phone ? `| ${e.phone}` : ''} {e.company ? `— ${e.company}` : ''}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={e.status}
                    onChange={(evt) => handleStatusChange(e.id, evt.target.value as EnquiryStatus)}
                    className="px-3 py-1.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
                  >
                    <option value="NEW">Status: NEW</option>
                    <option value="IN_DISCUSSION">Status: IN DISCUSSION</option>
                    <option value="CLOSED">Status: CLOSED</option>
                    <option value="ARCHIVED">Status: ARCHIVED</option>
                  </select>

                  <button
                    onClick={() => setDeleteTarget(e)}
                    className="p-2 rounded-xl text-[#F5F2ED]/30 hover:text-[#8B0D1A] hover:bg-[#8B0D1A]/10 transition-colors"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#F5F2ED]/70">
                <div>
                  <span className="text-[#F5F2ED]/40 block text-[10px]">Capability Offering Requested:</span>
                  <span className="font-semibold text-[#F5F2ED]">{e.serviceInterested || 'Full-Stack Development'}</span>
                </div>
                <div>
                  <span className="text-[#F5F2ED]/40 block text-[10px]">Estimated Budget:</span>
                  <span className="font-semibold text-emerald-400">{e.budget || 'Unspecified'}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/05 border border-white/05 text-xs text-[#F5F2ED]/80 font-sans leading-relaxed">
                <span className="text-[10px] font-mono text-[#F5F2ED]/40 block mb-1">Project Scope Message:</span>
                "{e.message}"
              </div>

              <div className="text-[10px] font-mono text-[#F5F2ED]/35 flex items-center justify-between">
                <span>Submitted: {new Date(e.createdAt).toLocaleString()}</span>
                <a href={`mailto:${e.email}`} className="text-[#8B0D1A] hover:underline flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Reply to Enquiry
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Contact Enquiry?"
        description={`Are you sure you want to delete the enquiry from "${deleteTarget?.name}"?`}
        confirmLabel="Delete Enquiry"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
