import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ExternalLink, ArrowLeft, Play, ShieldCheck, Sparkles } from 'lucide-react';

export const ClientProjectDemoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const demoUrl = 'https://caresprint.example.com';

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Link to={`/client/projects/${id || 'caresprint'}`} className="inline-flex items-center gap-2 text-xs font-mono text-[#F5F2ED]/55 hover:text-[#8B0D1A]">
          <ArrowLeft className="w-4 h-4" /> Back to Project Details
        </Link>

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#F5F2ED] font-display">LIVE PROJECT DEMO LAUNCHER</h1>
              <Badge variant="crimson" size="sm" dot>Deployed Environment</Badge>
            </div>
            <p className="text-xs text-[#F5F2ED]/55 font-sans mt-1">
              Inspect the live client build deployed on ZANSTA Edge Network.
            </p>
          </div>

          <a href={demoUrl} target="_blank" rel="noreferrer">
            <Button variant="glow" size="md" rightIcon={<ExternalLink className="w-4 h-4" />}>
              OPEN IN NEW TAB
            </Button>
          </a>
        </div>
      </div>

      {/* Embedded Sandbox Preview Container */}
      <Card surfaceTier="100" className="p-8 border border-white/10 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B0D1A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B0D1A]/20 to-[#8B0D1A]/20 border border-white/10 flex items-center justify-center mx-auto">
          <Play className="w-8 h-8 text-[#8B0D1A] fill-current" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h2 className="text-2xl font-black text-[#F5F2ED] font-display">CareSprint Staging Environment</h2>
          <p className="text-xs text-[#F5F2ED]/55 font-mono">
            Environment URL: <strong className="text-[#8B0D1A]">{demoUrl}</strong>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 max-w-xl mx-auto space-y-3 text-left font-mono text-xs">
          <div className="flex items-center gap-2 text-[#F5F2ED]/70 font-bold">
            <ShieldCheck className="w-4 h-4" /> SECURE EDGE ENVIRONMENT ACTIVE
          </div>
          <p className="text-[#F5F2ED]/80 font-sans text-xs leading-relaxed">
            This live demo is connected to real-time WebRTC media servers and staging database clusters. All interactions are isolated in a sandbox container.
          </p>
        </div>

        <div className="pt-2">
          <a href={demoUrl} target="_blank" rel="noreferrer">
            <Button variant="glow" size="lg" rightIcon={<ExternalLink className="w-5 h-5" />}>
              LAUNCH LIVE PROJECT NOW
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
};
