import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ScrollReveal } from '../motion/ScrollReveal';
import { Users, FolderGit2, ShieldCheck, Building2, ArrowRight } from 'lucide-react';

const roadmapSteps = [
  {
    step: '01',
    title: 'INTERNAL TEAM WORKSPACE',
    desc: 'Private dev environment for engineers to scope tasks, sync repositories, and store project assets.',
    icon: Users,
    color: '#8B0D1A',
  },
  {
    step: '02',
    title: 'PRODUCT MANAGEMENT HUB',
    desc: 'Kanban tracking, commit streaming, real-time activity feed, and automated deployment logs.',
    icon: FolderGit2,
    color: '#8B0D1A',
  },
  {
    step: '03',
    title: 'CLIENT PORTAL & DEMOS',
    desc: 'Tokenized client demo links (`/demo/:token`), password security, and feedback collection.',
    icon: ShieldCheck,
    color: '#14B8A6',
  },
  {
    step: '04',
    title: 'FULL SOFTWARE AGENCY ENGINE',
    desc: 'Inbound project requests, automated proposal drafting, milestone invoicing, and agency service showcase.',
    icon: Building2,
    color: '#EC4899',
  },
];

export const AgencyVisionSection: React.FC = () => {
  return (
    <section className="py-28 bg-[#050505] border-b border-white/[0.06] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-80 bg-radial-gradient opacity-40 pointer-events-none" />

      <Container size="xl">
        <ScrollReveal className="text-center max-w-4xl mx-auto space-y-4 mb-16">
          <Badge variant="crimson" size="md">THE EVOLUTION OF ZANSTA</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F5F2ED] tracking-tight font-display">
            TRANSFORM YOUR DEV COLLECTIVE INTO A HIGH-MARGIN AGENCY.
          </h2>
          <p className="text-sm sm:text-base text-[#F5F2ED]/70 max-w-2xl mx-auto leading-relaxed">
            ZANSTA provides the architecture for your dev team to evolve into a full-scale client agency platform.
          </p>
        </ScrollReveal>

        {/* 4 Step Transformation Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {roadmapSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <ScrollReveal key={s.step} delay={idx * 0.15}>
                <Card surfaceTier="100" glowOnHover className="h-full space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#F5F2ED]/35">{s.step}</span>
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center" style={{ color: s.color }}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-[#F5F2ED] font-display leading-tight">{s.title}</h3>
                  <p className="text-xs text-[#F5F2ED]/55 leading-relaxed font-sans">{s.desc}</p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
