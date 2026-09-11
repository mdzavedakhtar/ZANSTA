import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar as FloatingNavbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { projectService } from '@/services/projectService';
import { CMSProject } from '@/types/cms';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const PublicProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<CMSProject[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    const list = projectService.getProjects({ isVisible: true });
    setProjects(list);
    window.scrollTo(0, 0);
  }, []);

  const categories = ['ALL', 'WEB APP', 'AI / ML', 'MOBILE', 'SAAS', 'CLIENT PROJECT'];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F2ED] selection:bg-[#8B0D1A]/30 selection:text-[#F5F2ED]">
      <FloatingNavbar />

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#8B0D1A]/15 via-[#8B0D1A]/20 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="space-y-6 text-center max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#8B0D1A]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ZANSTA AGENCY PORTFOLIO & CASE STUDIES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black font-display tracking-tight text-[#F5F2ED] leading-tight"
          >
            Engineered to Scale.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0D1A] via-white to-[#8B0D1A]">
              Shipped to Impact.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-[#F5F2ED]/55 font-sans leading-relaxed"
          >
            Explore real-world production web applications, autonomous AI gateways, and high-frequency platforms built by the ZANSTA developer ecosystem.
          </motion.p>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 pt-4 flex-wrap"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#8B0D1A] text-[#050505] shadow-[0_0_20px_rgba(139,13,26,0.4)] scale-105'
                    : 'bg-white/5 text-[#F5F2ED]/55 border border-white/10 hover:border-white/30 hover:text-[#F5F2ED]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Showcase Grid */}
      <section className="pb-32 px-6 max-w-7xl mx-auto space-y-12">
        {filteredProjects.length === 0 ? (
          <div className="p-16 text-center text-[#F5F2ED]/35 font-mono text-xs">
            No public projects found matching current category filter.
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                surfaceTier="100"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 border border-white/10 hover:border-[#8B0D1A]/40 transition-all duration-300 group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B0D1A]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#8B0D1A]/15 transition-all" />

                {/* Left Visual Preview */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video group-hover:scale-[1.01] transition-transform duration-500">
                    <img
                      src={project.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'}
                      alt={project.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <Badge variant="crimson" size="sm">
                        {project.category}
                      </Badge>
                      <Badge
                        variant={project.status === 'LIVE' || project.status === 'COMPLETED' ? 'active' : 'neutral'}
                        size="sm"
                        dot
                      >
                        {project.status}
                      </Badge>
                    </div>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-[#F5F2ED] hover:border-[#8B0D1A] hover:text-[#8B0D1A] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#8B0D1A]" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Details Content */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-[#F5F2ED] font-display tracking-tight group-hover:text-[#8B0D1A] transition-colors">
                        {project.name}
                      </h2>
                      {project.clientName && (
                        <p className="text-xs font-mono text-[#8B0D1A] font-semibold">
                          Client: {project.clientName}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-[#F5F2ED]/80 font-sans leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-[#F5F2ED]/55 uppercase tracking-wider block">
                        Tech Architecture Stack
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#F5F2ED]/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:border-white/30 transition-colors"
                          title="View Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <Link to={`/projects/${project.slug}`}>
                      <Button variant="glow" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        Case Study
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </section>

      <Footer />
    </div>
  );
};
