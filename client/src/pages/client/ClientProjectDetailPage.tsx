import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  ExternalLink,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Clock,
  GitCommit,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const ClientProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const project = {
    id: id || 'caresprint',
    name: 'CareSprint',
    tagline: 'Instant Telehealth & Encrypted Medical Vault',
    description: 'On-demand healthcare platform providing real-time doctor appointments, WebRTC video consultations, encrypted patient records, and instant prescription downloads.',
    progress: 85,
    status: 'DEVELOPMENT',
    demoUrl: 'https://caresprint.example.com',
    recentUpdates: [
      { msg: 'Implemented 256-bit client-side field encryption for laboratory PDF uploads', time: '2h ago', author: 'MD Zaved Akhtar' },
      { msg: 'Optimized WebRTC ICE server connection fallback time to sub-100ms', time: '1 day ago', author: 'Aman Deep' },
      { msg: 'Added doctor digital signature canvas and instant QR code prescription verifier', time: '2 days ago', author: 'Elena Rostova' }
    ],
    milestones: [
      { name: 'Phase 1: Architecture & Glassmorphic UI System', status: 'COMPLETED', date: '2026-02-01' },
      { name: 'Phase 2: 1080p HD WebRTC Video Stream Mesh', status: 'COMPLETED', date: '2026-02-20' },
      { name: 'Phase 3: HIPAA 256-bit Encrypted Vault', status: 'IN_PROGRESS', date: '2026-03-15' },
      { name: 'Phase 4: Pharmacy Prescription QR Verification', status: 'PLANNED', date: '2026-04-01' }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Link to="/client/projects" className="inline-flex items-center gap-2 text-xs font-mono text-[#F5F2ED]/55 hover:text-[#8B0D1A]">
          <ArrowLeft className="w-4 h-4" /> Back to Client Projects
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-[#F5F2ED] font-display">{project.name}</h1>
              <Badge variant="crimson" size="sm" dot>{project.status}</Badge>
            </div>
            <p className="text-sm font-mono text-[#8B0D1A]">{project.tagline}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to={`/client/projects/${project.id}/feedback`}>
              <Button variant="outline" size="sm" className="gap-2 text-xs border-white/10">
                <MessageSquare className="w-3.5 h-3.5 text-[#F5F2ED]/60" /> Submit Feedback
              </Button>
            </Link>

            <Link to={`/client/projects/${project.id}/demo`}>
              <Button variant="glow" size="sm" rightIcon={<ExternalLink className="w-4 h-4" />}>
                Launch Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress & Milestone Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Card */}
          <Card surfaceTier="100" className="p-6 border border-white/10 space-y-4">
            <div className="flex justify-between items-center text-sm font-mono">
              <span className="text-[#F5F2ED] font-bold">DEVELOPMENT SPRINT PROGRESS</span>
              <span className="text-[#8B0D1A] font-extrabold text-base">{project.progress}%</span>
            </div>
            <ProgressBar value={project.progress} color="crimson" showPercentage={false} />
            <p className="text-xs text-[#F5F2ED]/55 font-sans leading-relaxed">
              {project.description}
            </p>
          </Card>

          {/* Recent Build Updates Feed */}
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-[#F5F2ED] font-display flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-[#8B0D1A]" /> RECENT ENGINEERING UPDATES
            </h2>
            <div className="space-y-3">
              {project.recentUpdates.map((upd, idx) => (
                <Card key={idx} surfaceTier="100" className="p-4 border border-white/5 space-y-1 font-mono text-xs">
                  <div className="flex items-center justify-between text-[#F5F2ED]">
                    <span className="font-bold text-[#F5F2ED] font-sans text-sm">{upd.msg}</span>
                    <span className="text-[#F5F2ED]/35 shrink-0 text-[10px]">{upd.time}</span>
                  </div>
                  <span className="text-[11px] text-[#8B0D1A]">Committed by {upd.author}</span>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Milestone Roadmap Sidebar */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-[#F5F2ED] font-display flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" /> SPRINT MILESTONES
          </h2>

          <Card surfaceTier="100" className="p-6 border border-white/10 space-y-4">
            {project.milestones.map((m, idx) => (
              <div key={idx} className="space-y-1.5 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F5F2ED] font-sans">{m.name}</span>
                  <Badge
                    variant={m.status === 'COMPLETED' ? 'active' : m.status === 'IN_PROGRESS' ? 'crimson' : 'neutral'}
                    size="sm"
                  >
                    {m.status}
                  </Badge>
                </div>
                <p className="text-[11px] font-mono text-[#F5F2ED]/35">Target Date: {m.date}</p>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};
