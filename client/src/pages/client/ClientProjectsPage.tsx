import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { FolderGit2, ArrowRight, ExternalLink, MessageSquare } from 'lucide-react';

export const ClientProjectsPage: React.FC = () => {
  const projects = [
    {
      id: 'caresprint',
      name: 'CareSprint',
      category: 'Healthcare SaaS',
      description: 'On-demand healthcare platform providing real-time doctor appointments, WebRTC video consultations, encrypted patient records, and instant prescription downloads.',
      progress: 85,
      status: 'DEVELOPMENT',
      demoUrl: 'https://caresprint.example.com',
      techStack: ['React 18', 'Node.js', 'Socket.IO', 'MongoDB', 'Razorpay', 'WebRTC']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-[#F5F2ED] font-display">YOUR CLIENT PROJECTS</h1>
          <p className="text-xs text-[#F5F2ED]/55 font-sans mt-1">
            Projects engineered for your organization by ZANSTA development team.
          </p>
        </div>
        <Badge variant="crimson" size="md">1 Active Contract</Badge>
      </div>

      <div className="space-y-6">
        {projects.map((p) => (
          <Card key={p.id} surfaceTier="100" className="p-6 border border-white/10 space-y-6 hover:border-[#8B0D1A]/30 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-extrabold text-[#F5F2ED] font-display">{p.name}</h2>
                  <Badge variant="crimson" size="sm">{p.category}</Badge>
                  <Badge variant="active" size="sm" dot>{p.status}</Badge>
                </div>
                <p className="text-sm text-[#F5F2ED]/80 font-sans max-w-3xl pt-1">
                  {p.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link to={`/client/projects/${p.id}/feedback`}>
                  <Button variant="outline" size="sm" className="gap-2 text-xs border-white/10">
                    <MessageSquare className="w-3.5 h-3.5 text-[#F5F2ED]/60" /> Feedback
                  </Button>
                </Link>
                <Link to={`/client/projects/${p.id}`}>
                  <Button variant="glow" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    View Project
                  </Button>
                </Link>
              </div>
            </div>

            {/* Tech Badges & Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="space-y-2">
                <div className="flex justify-between text-[#F5F2ED]/80">
                  <span>Development Progress</span>
                  <span className="text-[#8B0D1A] font-bold">{p.progress}%</span>
                </div>
                <ProgressBar value={p.progress} color="crimson" showPercentage={false} />
              </div>

              <div className="space-y-2">
                <span className="text-[#F5F2ED]/55 text-[11px] block">TECH STACK ARCHITECTURE</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {p.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-[#F5F2ED]/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
