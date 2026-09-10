import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ScrollReveal } from '../motion/ScrollReveal';
import { CheckSquare, Code2, Users, Rocket, Sparkles, GitCommit, Play, ExternalLink } from 'lucide-react';

const stages = [
  {
    id: 'plan',
    title: 'PLAN',
    subtitle: 'Linear-style task scoping & milestone tracking',
    icon: CheckSquare,
    color: '#8B0D1A',
  },
  {
    id: 'build',
    title: 'BUILD',
    subtitle: 'Repository sync & live commit streaming',
    icon: Code2,
    color: '#8B0D1A',
  },
  {
    id: 'collaborate',
    title: 'COLLABORATE',
    subtitle: 'Real-time Socket.IO activity & comment feed',
    icon: Users,
    color: '#14B8A6',
  },
  {
    id: 'ship',
    title: 'SHIP',
    subtitle: 'Automated deployment builds & version tags',
    icon: Rocket,
    color: '#F59E0B',
  },
  {
    id: 'showcase',
    title: 'SHOWCASE',
    subtitle: 'Public showcase & tokenized client demo link',
    icon: Sparkles,
    color: '#EC4899',
  },
];

export const WorkflowSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState('plan');

  const currentStage = stages.find((s) => s.id === activeStage) || stages[0];

  return (
    <section className="py-28 bg-[#080808] border-b border-white/[0.06] relative">
      <Container size="xl">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="crimson" size="md">THE NEXORA WORKFLOW ENGINE</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-[#F5F2ED]">
            FROM INITIAL SCOPE TO CLIENT DEMO.
          </h2>
          <p className="text-[#F5F2ED]/55 text-sm sm:text-base">
            Click through the 5 stages of the integrated NEXORA product lifecycle.
          </p>
        </ScrollReveal>

        {/* Stage Selector Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {stages.map((stg) => {
            const Icon = stg.icon;
            const isActive = activeStage === stg.id;
            return (
              <button
                key={stg.id}
                onClick={() => setActiveStage(stg.id)}
                className={`relative px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#161616] text-[#F5F2ED] border border-white/20 shadow-lg'
                    : 'bg-[#0E0E0E] text-[#F5F2ED]/55 border border-white/[0.06] hover:text-[#F5F2ED]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="workflowActiveStage"
                    className="absolute inset-0 rounded-xl border-2 border-[#8B0D1A]/60 shadow-[0_0_20px_rgba(0,240,255,0.2)] pointer-events-none"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4 shrink-0" style={{ color: isActive ? stg.color : undefined }} />
                <span>{stg.title}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Visual Display Stage Window */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <Card surfaceTier="200" className="p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#F5F2ED] font-display flex items-center gap-2">
                      <currentStage.icon className="w-5 h-5" style={{ color: currentStage.color }} />
                      STAGE {stages.findIndex((s) => s.id === activeStage) + 1}: {currentStage.title}
                    </h3>
                    <p className="text-xs text-[#F5F2ED]/55 mt-1">{currentStage.subtitle}</p>
                  </div>
                  <Badge variant="crimson" size="sm">ACTIVE STAGE</Badge>
                </div>

                {/* Stage Specific Mock Preview */}
                {activeStage === 'plan' && (
                  <div className="space-y-3 font-sans">
                    <div className="p-3 bg-[#121212] border border-white/[0.06] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#8B0D1A]" />
                        <span className="text-xs font-semibold text-[#F5F2ED]">Setup Mongoose schemas & JWT auth</span>
                      </div>
                      <Badge variant="crimson" size="sm">IN PROGRESS</Badge>
                    </div>
                    <div className="p-3 bg-[#121212] border border-white/[0.06] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#F5F2ED]/400" />
                        <span className="text-xs font-semibold text-[#F5F2ED]">Design dark mode tokens & responsive grid</span>
                      </div>
                      <Badge variant="active" size="sm">DONE</Badge>
                    </div>
                  </div>
                )}

                {activeStage === 'build' && (
                  <div className="p-4 bg-[#121212] border border-white/[0.06] rounded-xl space-y-2 font-mono text-xs text-[#F5F2ED]/80">
                    <div className="flex items-center gap-2 text-[#8B0D1A]">
                      <GitCommit className="w-4 h-4" />
                      <span>commit commit-e4f801 (branch: main)</span>
                    </div>
                    <p className="text-[#F5F2ED]/55 pl-6">feat(socket): add real-time project room broadcasts</p>
                  </div>
                )}

                {activeStage === 'collaborate' && (
                  <div className="space-y-2 text-xs font-sans">
                    <div className="p-3 bg-[#121212] border border-white/[0.06] rounded-xl flex items-center justify-between">
                      <span className="text-[#F5F2ED]">
                        <strong className="text-[#F5F2ED]">Rahul Sharma</strong> left a comment on Task #14
                      </span>
                      <span className="text-[10px] text-[#F5F2ED]/35 font-mono">2m ago</span>
                    </div>
                  </div>
                )}

                {activeStage === 'ship' && (
                  <div className="p-4 bg-[#121212] border border-white/[0.06] rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <Play className="w-4 h-4 text-[#F5F2ED]/70" />
                      <span className="font-mono text-[#F5F2ED]">v2.4.0 Production Build Deployed</span>
                    </div>
                    <Badge variant="active" size="sm">DEPLOYED</Badge>
                  </div>
                )}

                {activeStage === 'showcase' && (
                  <div className="p-4 bg-[#121212] border border-white/[0.06] rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-[#8B0D1A]" />
                      <span className="font-mono text-[#8B0D1A]">https://nexora.dev/demo/token_caresprint</span>
                    </div>
                    <Badge variant="crimson" size="sm">TOKEN VALID</Badge>
                  </div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};
