import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { demoService } from '@/services/demoService';
import { projectService } from '@/services/projectService';
import { CMSClientDemo, CMSProject } from '@/types/cms';
import {
  Lock,
  Eye,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Maximize2,
} from 'lucide-react';

export const ClientDemoPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  const [demoData, setDemoData] = useState<CMSClientDemo | null>(null);
  const [projectData, setProjectData] = useState<CMSProject | null>(null);
  const [isPasscodeVerified, setIsPasscodeVerified] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);

    const demo = demoService.getDemoByToken(token);
    if (demo) {
      setDemoData(demo);
      demoService.incrementViewCount(token);

      if (demo.projectId) {
        const proj = projectService.getProjectById(demo.projectId);
        if (proj) setProjectData(proj);
      }

      // If no passcode required, auto verify
      if (!demo.passcode || demo.passcode.trim() === '') {
        setIsPasscodeVerified(true);
      }
    }
    setIsLoading(false);
  }, [token]);

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !passcode) return;
    setPasscodeError(null);

    const valid = demoService.verifyPasscode(token, passcode);
    if (valid) {
      setIsPasscodeVerified(true);
    } else {
      setPasscodeError('Invalid passcode entered. Please check and try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F5F2ED] flex items-center justify-center font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#8B0D1A] border-t-transparent rounded-full animate-spin" />
          Authenticating client demo portal link...
        </div>
      </div>
    );
  }

  if (!demoData) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F5F2ED] flex items-center justify-center font-mono text-xs p-6 text-center">
        <div className="space-y-3">
          <p className="text-base font-bold">Demo Portal Link Invalid or Expired</p>
          <p className="text-xs text-[#F5F2ED]/55">Please contact your ZANSTA project manager for an active portal link.</p>
        </div>
      </div>
    );
  }

  // PASSCODE LOCK GATE SCREEN
  if (demoData.passcode && demoData.passcode.trim() !== '' && !isPasscodeVerified) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F5F2ED] flex items-center justify-center p-6 selection:bg-[#8B0D1A]/30 selection:text-[#F5F2ED] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B0D1A]/10 via-[#8B0D1A]/20 to-transparent blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md space-y-6 text-center relative z-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B0D1A]/20 to-[#8B0D1A]/20 border border-white/10 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-[#8B0D1A]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-[#F5F2ED] font-display">Passcode Protected Demo</h1>
            <p className="text-xs text-[#F5F2ED]/55 font-sans">
              Enter the access passcode provided by ZANSTA to view the portal for <span className="text-[#F5F2ED] font-semibold">{demoData.clientName}</span>.
            </p>
          </div>

          <Card surfaceTier="100" className="p-6 border border-white/10 text-left">
            <form onSubmit={handleVerifyPasscode} className="space-y-4">
              {passcodeError && (
                <div className="p-3 rounded-xl bg-[#8B0D1A]/10 border border-[#8B0D1A]/20 text-xs text-[#8B0D1A] font-mono">
                  {passcodeError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#F5F2ED]/80">Access Passcode</label>
                <input
                  type="password"
                  placeholder="Enter passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#121212] border border-white/10 rounded-xl text-sm text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono"
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                variant="glow"
                size="md"
                className="w-full text-xs font-bold"
              >
                Unlock Client Portal
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    );
  }

  const liveUrl = demoData.demoUrl || projectData?.liveUrl;
  const previewImage = demoData.previewImage || projectData?.thumbnail;

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F2ED] selection:bg-[#8B0D1A]/30 selection:text-[#F5F2ED]">
      {/* Top Header Bar */}
      <header className="border-b border-white/10 bg-[#0E0E0E]/80 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B0D1A]/20 to-[#8B0D1A]/20 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#8B0D1A]" />
            </div>
            <div>
              <span className="text-sm font-black text-[#F5F2ED] font-display tracking-wide">ZANSTA</span>
              <span className="text-[10px] font-mono text-[#8B0D1A] block">CLIENT DEMO PORTAL</span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#F5F2ED]/55">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              <Eye className="w-3.5 h-3.5 text-[#8B0D1A]" />
              <span>{demoData.viewCount || 1} Views</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Presentation View */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Banner Section */}
        <Card surfaceTier="100" className="p-8 relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#8B0D1A]/15 via-[#8B0D1A]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <Badge variant="crimson" size="sm">{projectData?.category || 'CLIENT DEMO'}</Badge>
              <Badge variant="active" size="sm" dot>Active Client Review</Badge>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-[#F5F2ED]">
                {demoData.title}
              </h1>
              <p className="text-sm md:text-base font-mono text-[#8B0D1A]">
                Client: {demoData.clientName}
              </p>
            </div>

            <p className="text-sm md:text-base text-[#F5F2ED]/80 font-sans leading-relaxed max-w-3xl">
              {demoData.description || projectData?.description}
            </p>

            {/* Launch Live Project CTA */}
            {liveUrl && (
              <div className="pt-2">
                <a href={liveUrl} target="_blank" rel="noreferrer">
                  <Button variant="glow" size="lg" rightIcon={<ExternalLink className="w-5 h-5" />}>
                    Launch Deployed Environment
                  </Button>
                </a>
              </div>
            )}
          </div>
        </Card>

        {/* Screenshot Visual Preview */}
        {previewImage && (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-[#F5F2ED] font-display">Portal Visual Showcase</h3>
            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video relative group max-w-4xl">
              <img src={previewImage} alt={demoData.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a href={previewImage} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-black/80 border border-white/20 text-[#F5F2ED] hover:text-[#8B0D1A]">
                  <Maximize2 className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tech Architecture Badges */}
        {projectData?.techStack && (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-[#F5F2ED] font-display">Technology Architecture</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {projectData.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#F5F2ED]/80">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
