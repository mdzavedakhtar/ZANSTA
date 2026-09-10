import React, { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAgencyStore } from '@/store/useAgencyStore';
import { Inbox, CheckCircle2, Clock, FileText, ArrowRight } from 'lucide-react';

export const AgencyRequestsPage: React.FC = () => {
  const { projectRequests, isLoading, fetchProjectRequests, updateRequestStatus } = useAgencyStore();

  useEffect(() => {
    fetchProjectRequests();
  }, [fetchProjectRequests]);

  const handleStatusChange = async (id: string, status: string) => {
    await updateRequestStatus(id, status);
  };

  const statuses = ['NEW', 'REVIEWING', 'PROPOSAL', 'IN_PROGRESS', 'COMPLETED'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-[#F5F2ED] font-display">INBOUND PROJECT REQUESTS</h1>
          <p className="text-xs text-[#F5F2ED]/55 font-sans mt-1">
            Client project inquiries, scope briefs, and budget estimates.
          </p>
        </div>
        <Badge variant="crimson" size="md">{projectRequests.length} Total Leads</Badge>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-[#F5F2ED]/55 font-mono text-xs">Loading inbound requests...</div>
      ) : projectRequests.length === 0 ? (
        <div className="p-12 text-center text-[#F5F2ED]/35 font-mono text-xs">No project requests received yet.</div>
      ) : (
        <div className="space-y-4">
          {projectRequests.map((req) => (
            <Card key={req.id} surfaceTier="100" className="p-6 border border-white/10 space-y-4 hover:border-[#8B0D1A]/30 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-extrabold text-[#F5F2ED] font-display">{req.name}</h3>
                    {req.company && <span className="text-xs font-mono text-[#8B0D1A]">({req.company})</span>}
                    <Badge variant="crimson" size="sm">{req.projectType}</Badge>
                  </div>
                  <p className="text-xs font-mono text-[#F5F2ED]/55">Contact: {req.email}</p>
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-2 font-mono text-xs bg-[#121212] border border-white/10 rounded-xl px-3 py-1.5 shrink-0">
                  <span className="text-[#F5F2ED]/55">Lead Status:</span>
                  <select
                    value={req.status}
                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
                    className="bg-transparent text-[#F5F2ED] font-bold focus:outline-none cursor-pointer"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s} className="bg-[#121212] text-[#F5F2ED]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Request Description & Specs */}
              <div className="p-4 rounded-xl bg-[#121212] border border-white/5 space-y-2 text-xs font-sans">
                <p className="text-[#F5F2ED] leading-relaxed"><strong className="text-[#F5F2ED] font-mono">Project Overview:</strong> {req.description}</p>
                {req.requirements && (
                  <p className="text-[#F5F2ED]/55 leading-relaxed"><strong className="text-[#F5F2ED]/80 font-mono">Technical Requirements:</strong> {req.requirements}</p>
                )}
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-[#F5F2ED]/55 pt-2 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <span>Budget: <strong className="text-[#F5F2ED]/70">{req.budget}</strong></span>
                  <span>Timeline: <strong className="text-[#8B0D1A]">{req.timeline}</strong></span>
                </div>
                <span>Submitted: {new Date(req.createdAt).toLocaleDateString()}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
