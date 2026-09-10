import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar as FloatingNavbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { usePublicProjectStore } from '@/store/usePublicProjectStore';
import {
  Code2,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Server,
  Database,
  Layers,
  ArrowLeft,
  Users,
  Maximize2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const ProjectCaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { activeCaseStudy, isLoading, fetchCaseStudyBySlug } = usePublicProjectStore();
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (slug) {
      fetchCaseStudyBySlug(slug);
    }
    window.scrollTo(0, 0);
  }, [slug, fetchCaseStudyBySlug]);

  // Set Dynamic SEO Metadata
  useEffect(() => {
    if (activeCaseStudy?.seo) {
      document.title = activeCaseStudy.seo.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', activeCaseStudy.seo.description);
      }
    }
  }, [activeCaseStudy]);

  if (isLoading || !activeCaseStudy) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F5F2ED] flex items-center justify-center font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#8B0D1A] border-t-transparent rounded-full animate-spin" />
          Loading case study presentation...
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem-solution', label: 'Problem & Solution' },
    { id: 'features', label: 'Features' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'gallery', label: 'Screenshots' },
    { id: 'team', label: 'Engineers' },
    { id: 'demo', label: 'Live Demo' }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F2ED] selection:bg-[#8B0D1A]/30 selection:text-[#F5F2ED]">
      <FloatingNavbar />

      {/* Case Study Hero Header */}
      <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-bl from-[#8B0D1A]/15 via-[#8B0D1A]/20 to-transparent rounded-full blur-[130px] pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#F5F2ED]/55 hover:text-[#8B0D1A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="crimson" size="md">
                  {activeCaseStudy.category}
                </Badge>
                <Badge
                  variant={activeCaseStudy.status === 'COMPLETED' ? 'active' : 'neutral'}
                  size="md"
                  dot
                >
                  {activeCaseStudy.status}
                </Badge>
                <span className="text-xs font-mono text-[#F5F2ED]/55">
                  {activeCaseStudy.progress}% Shipped
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-[#F5F2ED]">
                {activeCaseStudy.name}
              </h1>

              <p className="text-base md:text-xl font-mono text-[#8B0D1A]">
                {activeCaseStudy.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {activeCaseStudy.repoUrl && (
                <a
                  href={activeCaseStudy.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-xs font-mono text-[#F5F2ED]/80 hover:text-[#F5F2ED] flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" /> Repository
                </a>
              )}

              {activeCaseStudy.demoUrl && (
                <a
                  href={activeCaseStudy.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="glow" size="md" rightIcon={<ExternalLink className="w-4 h-4" />}>
                    Open Live Project
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Section Navigation */}
      <div className="sticky top-20 z-40 bg-[#050505]/90 backdrop-blur-xl border-y border-white/10 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono whitespace-nowrap transition-all ${
                activeSection === item.id
                  ? 'bg-[#8B0D1A]/15 text-[#8B0D1A] border border-[#8B0D1A]/40'
                  : 'text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Case Study Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">

        {/* SECTION 1: OVERVIEW */}
        <section id="overview" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#8B0D1A] uppercase tracking-wider">01 // EXECUTIVE SUMMARY</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#F5F2ED] font-display">System Overview</h2>
          </div>

          <Card surfaceTier="100" className="p-8 border border-white/10">
            <p className="text-base text-[#F5F2ED]/80 font-sans leading-relaxed">
              {activeCaseStudy.overview}
            </p>
          </Card>
        </section>

        {/* SECTION 2: PROBLEM & SOLUTION */}
        <section id="problem-solution" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#8B0D1A] uppercase tracking-wider">02 // THE CHALLENGE</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#F5F2ED] font-display">Problem & Engineered Solution</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card surfaceTier="100" className="p-8 border border-[#8B0D1A]/20 bg-[#8B0D1A]/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#8B0D1A]/10 text-[#8B0D1A] border border-[#8B0D1A]/20">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#F5F2ED] font-display">Core Industry Problem</h3>
              </div>
              <p className="text-sm text-[#F5F2ED]/80 font-sans leading-relaxed">
                {activeCaseStudy.problem}
              </p>
            </Card>

            <Card surfaceTier="100" className="p-8 border border-[#8B0D1A]/30 bg-[#8B0D1A]/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#8B0D1A]/10 text-[#8B0D1A] border border-[#8B0D1A]/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#F5F2ED] font-display">ZANSTA Architectural Solution</h3>
              </div>
              <p className="text-sm text-[#F5F2ED]/80 font-sans leading-relaxed">
                {activeCaseStudy.solution}
              </p>
            </Card>
          </div>
        </section>

        {/* SECTION 3: KEY FEATURES */}
        <section id="features" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#8B0D1A] uppercase tracking-wider">03 // CAPABILITIES</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#F5F2ED] font-display">Key Product Features</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activeCaseStudy.features?.map((feat, idx) => (
              <Card key={idx} surfaceTier="100" className="p-6 border border-white/10 space-y-3 hover:border-[#8B0D1A]/40 transition-colors">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#8B0D1A]" />
                  <h4 className="text-base font-bold text-[#F5F2ED] font-display">
                    {typeof feat === 'string' ? feat : feat.title}
                  </h4>
                </div>
                {typeof feat !== 'string' && (
                  <p className="text-xs text-[#F5F2ED]/55 font-sans leading-relaxed">
                    {feat.desc}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 4: ARCHITECTURE */}
        <section id="architecture" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#8B0D1A] uppercase tracking-wider">04 // SYSTEM SPECS</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#F5F2ED] font-display">Technology Architecture</h2>
          </div>

          <Card surfaceTier="100" className="p-8 border border-white/10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
              <div className="space-y-2 p-4 rounded-xl bg-[#121212] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-[#8B0D1A]">
                  <Code2 className="w-4 h-4" />
                  <span className="font-bold">FRONTEND</span>
                </div>
                <p className="text-[#F5F2ED]/80 font-sans">{activeCaseStudy.architecture?.frontend}</p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-[#121212] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-purple-400">
                  <Server className="w-4 h-4" />
                  <span className="font-bold">BACKEND</span>
                </div>
                <p className="text-[#F5F2ED]/80 font-sans">{activeCaseStudy.architecture?.backend}</p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-[#121212] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-[#F5F2ED]/70">
                  <Database className="w-4 h-4" />
                  <span className="font-bold">DATABASE</span>
                </div>
                <p className="text-[#F5F2ED]/80 font-sans">{activeCaseStudy.architecture?.database}</p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-[#121212] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-[#F5F2ED]/60">
                  <Layers className="w-4 h-4" />
                  <span className="font-bold">INFRASTRUCTURE</span>
                </div>
                <p className="text-[#F5F2ED]/80 font-sans">{activeCaseStudy.architecture?.infrastructure}</p>
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 5: SCREENSHOT GALLERY */}
        <section id="gallery" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#8B0D1A] uppercase tracking-wider">05 // VISUALS</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#F5F2ED] font-display">Interface Screenshots</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeCaseStudy.screenshots?.map((img, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden border border-white/10 aspect-video group relative">
                <img src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a href={img} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-black/80 border border-white/20 text-[#F5F2ED] hover:text-[#8B0D1A]">
                    <Maximize2 className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: TEAM */}
        <section id="team" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#8B0D1A] uppercase tracking-wider">06 // TEAM</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#F5F2ED] font-display">Assigned Engineers & Designers</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {activeCaseStudy.team?.map((member, idx) => (
              <Card key={idx} surfaceTier="100" className="p-6 text-center space-y-3 border border-white/10">
                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full border-2 border-[#8B0D1A]/30 mx-auto object-cover" />
                <div>
                  <h4 className="text-base font-bold text-[#F5F2ED] font-display">{member.name}</h4>
                  <p className="text-xs font-mono text-[#8B0D1A]">{member.role || 'Senior Engineer'}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 7: LIVE DEMO LAUNCHER */}
        <section id="demo" className="space-y-6 pb-12">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#8B0D1A] uppercase tracking-wider">07 // ENVIRONMENT</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#F5F2ED] font-display">Interactive Live Sandbox</h2>
          </div>

          <Card surfaceTier="100" className="p-8 border border-white/10 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B0D1A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="text-2xl font-black text-[#F5F2ED] font-display">Experience {activeCaseStudy.name} Live</h3>
              <p className="text-sm text-[#F5F2ED]/55 font-sans">
                Launch the deployed application environment in a standalone window or inspect the sandbox preview.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              {activeCaseStudy.demoUrl && (
                <a href={activeCaseStudy.demoUrl} target="_blank" rel="noreferrer">
                  <Button variant="glow" size="lg" rightIcon={<ExternalLink className="w-5 h-5" />}>
                    OPEN LIVE PROJECT
                  </Button>
                </a>
              )}
            </div>
          </Card>
        </section>

      </div>

      <Footer />
    </div>
  );
};
