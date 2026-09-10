import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/motion/FadeIn';
import { ExternalLink, Github, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="pt-28 pb-20">
      <Container size="xl">
        <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-mono text-[#F5F2ED]/55 hover:text-[#8B0D1A] mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
        </Link>

        <FadeIn className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge variant="crimson" size="md">FEATURED CASE STUDY</Badge>
            <Badge variant="active" size="sm">LIVE PRODUCTION</Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-[#F5F2ED] uppercase">
            {slug || 'CARESPRINT'}
          </h1>
          <p className="text-lg text-[#F5F2ED]/80 max-w-3xl leading-relaxed">
            On-Demand Healthcare Platform providing real-time doctor appointments, WebRTC video consultations, encrypted medical records, and instant prescription downloads.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a href="https://demo.example.com" target="_blank" rel="noreferrer">
              <Button size="lg" variant="glow" rightIcon={<ExternalLink className="w-4 h-4" />}>
                Try Live Demo
              </Button>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Button size="lg" variant="secondary" leftIcon={<Github className="w-4 h-4" />}>
                View GitHub Repo
              </Button>
            </a>
          </div>
        </FadeIn>

        {/* Case Study Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-16">
          <div className="lg:col-span-2 space-y-8">
            <Card surfaceTier="200" className="space-y-4">
              <h3 className="text-xl font-bold text-[#F5F2ED]">Architecture & Overview</h3>
              <p className="text-sm text-[#F5F2ED]/55 leading-relaxed">
                CareSprint was engineered to handle thousands of concurrent video consultation sessions with sub-100ms signaling latency using Socket.IO and WebRTC mesh topology.
              </p>
              <div className="space-y-2 pt-2">
                {['Sub-100ms real-time chat & signaling', 'Razorpay Payment Gateway integration', 'HIPAA-compliant document storage', 'Multi-tenant hospital dashboard'].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-[#F5F2ED]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#8B0D1A]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card surfaceTier="300" className="space-y-4">
              <h4 className="text-xs font-mono uppercase text-[#F5F2ED]/55 font-bold">Tech Stack Specs</h4>
              <div className="flex flex-wrap gap-1.5">
                {['React 18', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Tailwind CSS'].map((t) => (
                  <Badge key={t} variant="crimson" size="sm">
                    {t}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
