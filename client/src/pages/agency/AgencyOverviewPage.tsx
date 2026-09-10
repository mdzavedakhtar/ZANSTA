import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAgencyStore } from '@/store/useAgencyStore';
import {
  Building2,
  Users,
  Inbox,
  FileText,
  TrendingUp,
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const AgencyOverviewPage: React.FC = () => {
  const { agencyClients, projectRequests, fetchAgencyClients, fetchProjectRequests } = useAgencyStore();

  useEffect(() => {
    fetchAgencyClients();
    fetchProjectRequests();
  }, [fetchAgencyClients, fetchProjectRequests]);

  const newLeadsCount = projectRequests.filter(r => r.status === 'NEW').length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <Card surfaceTier="100" className="p-8 relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#8B0D1A]/15 via-[#8B0D1A]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
            <Sparkles className="w-4 h-4 text-[#8B0D1A]" /> HIGH-END SOFTWARE STUDIO & AGENCY PLATFORM
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-[#F5F2ED]">
            NEXORA Studio Command Center
          </h1>
          <p className="text-sm md:text-base text-[#F5F2ED]/80 font-sans max-w-2xl">
            Manage enterprise client accounts, review inbound project leads, deploy milestone proposals, and scale your digital software agency operations.
          </p>
        </div>
      </Card>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <Card surfaceTier="100" className="p-5 space-y-2 border border-white/10">
          <span className="text-[#F5F2ED]/55">ACTIVE AGENCY CLIENTS</span>
          <p className="text-3xl font-black text-[#F5F2ED] font-display">{agencyClients.length || 2}</p>
          <p className="text-[11px] text-[#F5F2ED]/35 font-sans">Enterprise Accounts</p>
        </Card>

        <Card surfaceTier="100" className="p-5 space-y-2 border border-white/10">
          <span className="text-[#F5F2ED]/55">INBOUND PROJECT LEADS</span>
          <p className="text-3xl font-black text-[#8B0D1A] font-display">{projectRequests.length || 3}</p>
          <Badge variant="crimson" size="sm">{newLeadsCount} New Inquiries</Badge>
        </Card>

        <Card surfaceTier="100" className="p-5 space-y-2 border border-white/10">
          <span className="text-[#F5F2ED]/55">AGENCY REVENUE RUN-RATE</span>
          <p className="text-3xl font-black text-[#F5F2ED]/70 font-display">$113,000</p>
          <p className="text-[11px] text-[#F5F2ED]/35 font-sans">Q1 Total Contract Value</p>
        </Card>

        <Card surfaceTier="100" className="p-5 space-y-2 border border-white/10">
          <span className="text-[#F5F2ED]/55">SERVICES CATALOG</span>
          <p className="text-3xl font-black text-purple-400 font-display">6</p>
          <p className="text-[11px] text-[#F5F2ED]/35 font-sans">Full-Stack Capabilities</p>
        </Card>
      </div>

      {/* Main Grid: Inbound Leads + Active Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inbound Leads */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#F5F2ED] font-display flex items-center gap-2">
              <Inbox className="w-5 h-5 text-[#8B0D1A]" /> RECENT INBOUND PROJECT LEADS
            </h2>
            <Link to="/agency/requests" className="text-xs font-mono text-[#8B0D1A] hover:underline">
              View All Requests →
            </Link>
          </div>

          <div className="space-y-3">
            {projectRequests.slice(0, 3).map((req) => (
              <Card key={req.id} surfaceTier="100" className="p-4 border border-white/5 space-y-2 hover:border-[#8B0D1A]/30 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#F5F2ED] font-sans">{req.name}</h3>
                    <p className="text-[11px] font-mono text-[#F5F2ED]/55">{req.company || 'Private Client'} • {req.projectType}</p>
                  </div>
                  <Badge variant={req.status === 'NEW' ? 'crimson' : 'crimson'} size="sm">
                    {req.status}
                  </Badge>
                </div>
                <p className="text-xs text-[#F5F2ED]/80 font-sans line-clamp-2">{req.description}</p>
                <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/35">
                  <span>Budget: {req.budget}</span>
                  <span>Timeline: {req.timeline}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Active Client Roster */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#F5F2ED] font-display flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" /> ACTIVE CLIENT ACCOUNTS
            </h2>
            <Link to="/agency/clients" className="text-xs font-mono text-[#8B0D1A] hover:underline">
              Manage Clients →
            </Link>
          </div>

          <div className="space-y-3">
            {agencyClients.map((cli) => (
              <Card key={cli.id} surfaceTier="100" className="p-4 border border-white/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={cli.avatar} alt={cli.name} className="w-10 h-10 rounded-full border border-white/10 object-cover" />
                  <div>
                    <h3 className="text-sm font-bold text-[#F5F2ED] font-sans">{cli.name}</h3>
                    <p className="text-xs font-mono text-[#8B0D1A]">{cli.company}</p>
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-[#F5F2ED]/70 font-bold block">{cli.totalSpent}</span>
                  <span className="text-[10px] text-[#F5F2ED]/35">{cli.activeProjects.join(', ')}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
