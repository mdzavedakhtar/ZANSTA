import React, { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAgencyStore } from '@/store/useAgencyStore';
import { FileText, CheckCircle2, Clock, Layers, DollarSign } from 'lucide-react';

export const AgencyProposalsPage: React.FC = () => {
  const { agencyProposals, isLoading, fetchAgencyProposals } = useAgencyStore();

  useEffect(() => {
    fetchAgencyProposals();
  }, [fetchAgencyProposals]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-[#F5F2ED] font-display">AGENCY PROPOSALS & MILESTONES</h1>
          <p className="text-xs text-[#F5F2ED]/55 font-sans mt-1">
            Proposals, milestone roadmaps, contract deliverables, and billing placeholders.
          </p>
        </div>
        <Badge variant="crimson" size="md">{agencyProposals.length} Approved Proposals</Badge>
      </div>

      <div className="space-y-6">
        {agencyProposals.map((prop) => (
          <Card key={prop.id} surfaceTier="100" className="p-6 border border-white/10 space-y-6 hover:border-[#8B0D1A]/30 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-extrabold text-[#F5F2ED] font-display">{prop.title}</h2>
                  <Badge variant="active" size="sm" dot>{prop.status}</Badge>
                </div>
                <p className="text-xs font-mono text-[#8B0D1A]">Client Account: {prop.clientName}</p>
              </div>

              <div className="text-right font-mono text-xs shrink-0">
                <span className="text-[#F5F2ED]/55 block">Total Contract Value</span>
                <span className="text-2xl font-black text-[#F5F2ED]/70 font-display">{prop.value}</span>
              </div>
            </div>

            {/* Contract Deliverables Checklist */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-[#F5F2ED]/55 uppercase tracking-wider block">Contract Deliverables</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                {prop.deliverables.map((del, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#121212] border border-white/5 flex items-center gap-2 text-[#F5F2ED]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#8B0D1A] shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestone Roadmap */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[11px] font-mono text-[#F5F2ED]/55 uppercase tracking-wider block">Milestone Roadmap</span>
              <div className="space-y-2 font-mono text-xs">
                {prop.milestones.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="font-bold text-[#F5F2ED]">{m.phase}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[#F5F2ED]/55 text-[11px]">Due: {m.dueDate}</span>
                      <Badge
                        variant={m.status === 'COMPLETED' ? 'active' : m.status === 'IN_PROGRESS' ? 'crimson' : 'neutral'}
                        size="sm"
                      >
                        {m.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
