import React, { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAgencyStore } from '@/store/useAgencyStore';
import { Users, Building2, DollarSign, CheckCircle2 } from 'lucide-react';

export const AgencyClientsPage: React.FC = () => {
  const { agencyClients, isLoading, fetchAgencyClients } = useAgencyStore();

  useEffect(() => {
    fetchAgencyClients();
  }, [fetchAgencyClients]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-[#F5F2ED] font-display">AGENCY CLIENT ACCOUNTS</h1>
          <p className="text-xs text-[#F5F2ED]/55 font-sans mt-1">
            Enterprise clients, active software contracts, and total billing history.
          </p>
        </div>
        <Badge variant="crimson" size="md">{agencyClients.length} Active Accounts</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agencyClients.map((cli) => (
          <Card key={cli.id} surfaceTier="100" className="p-6 border border-white/10 space-y-4 hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={cli.avatar} alt={cli.name} className="w-12 h-12 rounded-2xl border border-white/10 object-cover shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-[#F5F2ED] font-display">{cli.name}</h3>
                  <p className="text-xs font-mono text-[#8B0D1A]">{cli.company}</p>
                </div>
              </div>
              <Badge variant="active" size="sm" dot>{cli.status}</Badge>
            </div>

            <div className="p-3 rounded-xl bg-[#121212] border border-white/5 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-[#F5F2ED]/55">
                <span>Client Email:</span>
                <span className="text-[#F5F2ED]">{cli.email}</span>
              </div>
              <div className="flex justify-between text-[#F5F2ED]/55">
                <span>Contract Joined:</span>
                <span className="text-[#F5F2ED]/80">{cli.joinedDate}</span>
              </div>
              <div className="flex justify-between text-[#F5F2ED]/55">
                <span>Total Contract Value:</span>
                <span className="text-[#F5F2ED]/70 font-bold">{cli.totalSpent}</span>
              </div>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <span className="text-[#F5F2ED]/55 text-[11px]">ACTIVE ASSIGNED PROJECTS</span>
              <div className="flex items-center gap-1.5">
                {cli.activeProjects.map((p) => (
                  <span key={p} className="px-2.5 py-1 rounded bg-[#8B0D1A]/10 text-[#8B0D1A] border border-[#8B0D1A]/25 font-bold">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
