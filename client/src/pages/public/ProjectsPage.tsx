import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/motion/FadeIn';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { projectService } from '@/services/projectService';
import { CMSProject } from '@/types/cms';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<CMSProject[]>([]);

  useEffect(() => {
    const list = projectService.getProjects({ isVisible: true });
    setProjects(list);

    projectService.fetchProjects({ isVisible: true }).then((freshList) => {
      if (Array.isArray(freshList)) {
        setProjects(freshList);
      }
    });
  }, []);

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
          {projects.map((project) => (
            <Card key={project.id || project.slug} glowOnHover className="flex flex-col justify-between" data-cursor-text="EXPLORE">
              <div className="space-y-4">
                {project.thumbnail && (
                  <div className="aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/05 mb-2">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <Badge variant={project.status === 'COMPLETED' || project.status === 'LIVE' ? 'active' : 'crimson'} size="sm">
                    {project.status}
                  </Badge>
                  <span className="text-[11px] font-mono text-[#F5F2ED]/35">{project.category}</span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#F5F2ED] tracking-tight font-display">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#F5F2ED]/55 mt-1 leading-relaxed">
                    {project.shortDescription || project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((t) => (
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
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="ghost" rightIcon={<ExternalLink className="w-3.5 h-3.5 text-[#8B0D1A]" />}>
                      Live Demo
                    </Button>
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};
