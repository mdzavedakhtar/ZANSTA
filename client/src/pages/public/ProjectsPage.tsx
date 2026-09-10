import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/motion/FadeIn';
import { ExternalLink, ArrowRight, Github } from 'lucide-react';

const sampleProjects = [
  {
    slug: 'caresprint',
    name: 'CARESPRINT',
    tagline: 'On-Demand Healthcare & Telemedicine Platform',
    category: 'Healthcare SaaS',
    tech: ['React', 'Node.js', 'Socket.IO', 'MongoDB', 'Razorpay'],
    status: 'COMPLETED',
    demoUrl: 'https://caresprint.example.com',
  },
  {
    slug: 'neurostack',
    name: 'NEUROSTACK',
    tagline: 'Autonomous AI Agent Workflow Engine',
    category: 'AI Platform',
    tech: ['TypeScript', 'Python', 'Vector DB', 'FastAPI', 'Tailwind'],
    status: 'IN_PROGRESS',
    demoUrl: 'https://neurostack.example.com',
  },
  {
    slug: 'insightiq',
    name: 'INSIGHT IQ',
    tagline: 'Real-time Financial Analytics & Reporting Hub',
    category: 'Fintech SaaS',
    tech: ['Next.js', 'Express', 'Redis', 'Chart.js', 'PostgreSQL'],
    status: 'COMPLETED',
    demoUrl: 'https://insightiq.example.com',
  },
];

export const ProjectsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20">
      <Container size="xl">
        <FadeIn className="max-w-2xl space-y-4 mb-12">
          <Badge variant="crimson" size="md">SHOWCASE HUB</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight font-display text-[#F5F2ED]">
            PROJECT SHOWCASE & CLIENT PORTFOLIO
          </h1>
          <p className="text-[#F5F2ED]/55 text-sm">
            High-performance applications built and shipped inside the ZANSTA workspace engine.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleProjects.map((project) => (
            <Card key={project.slug} glowOnHover className="flex flex-col justify-between" data-cursor-text="EXPLORE">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={project.status === 'COMPLETED' ? 'active' : 'crimson'} size="sm">
                    {project.status}
                  </Badge>
                  <span className="text-[11px] font-mono text-[#F5F2ED]/35">{project.category}</span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#F5F2ED] tracking-tight font-display">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#F5F2ED]/55 mt-1 leading-relaxed">{project.tagline}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="neutral" size="sm">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <Link to={`/projects/${project.slug}`}>
                  <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Case Study
                  </Button>
                </Link>
                <a href={project.demoUrl} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="ghost" rightIcon={<ExternalLink className="w-3.5 h-3.5 text-[#8B0D1A]" />}>
                    Demo
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};
