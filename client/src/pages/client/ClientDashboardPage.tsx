import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  FolderGit2,
  ExternalLink,
  CheckCircle2,
  Clock,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Code2
} from 'lucide-react';

export const ClientDashboardPage: React.FC = () => {
  const activeProjects = [
    {
      id: 'caresprint',
      name: 'CareSprint',
      tagline: 'Instant Telehealth & Encrypted Medical Records',
      progress: 85,
      status: 'DEVELOPMENT',
      latestBuild: 'v1.4.2-rc3',
      demoUrl: 'https://caresprint.example.com',
      pendingApprovals: 1,
      sprintMilestone: 'Phase 3: HIPAA 256-bit Encrypted Vault'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <Card surfaceTier="100" className="p-8 relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#8B0D1A]/15 via-[#8B0D1A]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8B0D1A]">
            <Sparkles className="w-4 h-4" /> CLIENT STAKEHOLDER PORTAL
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-display tracking-tight text-[#F5F2ED]">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0D1A] to-[#8B0D1A]/60">Dr. Arthur Pendelton</span>
          </h1>
          <p className="text-sm text-[#F5F2ED]/80 font-sans max-w-2xl">
            Track real-time build progress, review upcoming sprint milestones, inspect latest deployed releases, and submit feedback directly to your dedicated NEXORA engineering team.
          </p>
        </div>
      </Card>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <Card surfaceTier="100" className="p-5 space-y-2 border border-white/10">
          <span className="text-[#F5F2ED]/55">ACTIVE CLIENT PROJECTS</span>
          <p className="text-3xl font-black text-[#F5F2ED] font-display">1</p>
          <Badge variant="crimson" size="sm">CareSprint SaaS</Badge>
        </Card>

        <Card surfaceTier="100" className="p-5 space-y-2 border border-white/10">
          <span className="text-[#F5F2ED]/55">OVERALL BUILD PROGRESS</span>
          <p className="text-3xl font-black text-[#8B0D1A] font-display">85%</p>
          <ProgressBar value={85} color="crimson" showPercentage={false} />
        </Card>

        <Card surfaceTier="100" className="p-5 space-y-2 border border-white/10">
          <span className="text-[#F5F2ED]/55">PENDING APPROVALS</span>
          <p className="text-3xl font-black text-[#F5F2ED]/60 font-display">1</p>
          <p className="text-[11px] text-[#F5F2ED]/35 font-sans">Prescription PDF Spec</p>
        </Card>

        <Card surfaceTier="100" className="p-5 space-y-2 border border-white/10">
          <span className="text-[#F5F2ED]/55">LATEST DEPLOYED BUILD</span>
          <p className="text-xl font-bold text-[#F5F2ED]/70 font-mono">v1.4.2-rc3</p>
          <span className="text-[11px] text-[#F5F2ED]/35">Live 15m ago on Edge</span>
        </Card>
      </div>

      {/* Active Projects List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#F5F2ED] font-display">Active Projects</h2>
          <Link to="/client/projects" className="text-xs font-mono text-[#8B0D1A] hover:underline">
            View All →
          </Link>
        </div>

        {activeProjects.map((proj) => (
          <Card key={proj.id} surfaceTier="100" className="p-6 border border-white/10 space-y-6 hover:border-[#8B0D1A]/30 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-[#F5F2ED] font-display">{proj.name}</h3>
                  <Badge variant="crimson" size="sm" dot>{proj.status}</Badge>
                </div>
                <p className="text-xs font-mono text-[#8B0D1A]">{proj.tagline}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link to={`/client/projects/${proj.id}/feedback`}>
                  <Button variant="outline" size="sm" className="gap-2 text-xs border-white/10">
                    <MessageSquare className="w-3.5 h-3.5 text-[#F5F2ED]/60" /> Submit Feedback
                  </Button>
                </Link>

                <Link to={`/client/projects/${proj.id}`}>
                  <Button variant="glow" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Open Project Portal
                  </Button>
                </Link>
              </div>
            </div>

            {/* Build Progress & Current Sprint */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="space-y-2">
                <div className="flex justify-between text-[#F5F2ED]/80">
                  <span>Sprint Completion Progress</span>
                  <span className="text-[#8B0D1A] font-bold">{proj.progress}%</span>
                </div>
                <ProgressBar value={proj.progress} color="crimson" showPercentage={false} />
              </div>

              <div className="space-y-1">
                <span className="text-[#F5F2ED]/55 text-[11px]">ACTIVE SPRINT MILESTONE</span>
                <p className="text-sm font-bold text-[#F5F2ED] font-sans">{proj.sprintMilestone}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
