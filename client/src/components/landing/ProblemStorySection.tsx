import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ScrollReveal } from '../motion/ScrollReveal';
import {
  XCircle,
  CheckCircle2,
  Github,
  HardDrive,
  MessageSquare,
  CheckSquare,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const ProblemStorySection: React.FC = () => {
  return (
    <section className="py-28 bg-[#050505] border-b border-white/[0.06] relative">
      <Container size="xl">
        <ScrollReveal className="max-w-3xl mx-auto space-y-4 mb-16" direction="spatialDepth">
          {/* Eyebrow */}
          <span className="inline-block text-[10px] font-mono uppercase tracking-[0.22em] text-[#8B0D1A] font-semibold">
            THE WAY WE BUILD
          </span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-[#F5F2ED]">
            BUILT BY TEAMS.
            <br />
            MADE TO SHIP.
          </h2>

          {/* Supporting paragraph */}
          <p className="text-[#F5F2ED]/55 text-sm sm:text-base leading-relaxed max-w-xl">
            Most teams run on 6 disconnected tools. NEXORA replaces the chaos with one
            workspace where code, tasks, files, and client delivery live together —
            so your team stays focused on building.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Before: Fragmented Stack */}
          <ScrollReveal delay={0.1} direction="spatialDepth" scale={0.9}>
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }} className="h-full">
              <Card surfaceTier="100" className="h-full space-y-6 border-rose-500/20 bg-rose-500/[0.02]">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-[#8B0D1A]" />
                    <h3 className="text-lg font-bold text-[#F5F2ED] font-display">Fragmented Tool Stack</h3>
                  </div>
                  <Badge variant="crimson" size="sm">HIGH FRICTION</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#121212] border border-white/[0.06] flex items-center gap-3">
                    <Github className="w-4 h-4 text-[#F5F2ED]/55 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#F5F2ED]">GitHub</p>
                      <p className="text-[10px] text-[#F5F2ED]/35">Code repositories &amp; PRs</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#121212] border border-white/[0.06] flex items-center gap-3">
                    <HardDrive className="w-4 h-4 text-[#F5F2ED]/55 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#F5F2ED]">Google Drive</p>
                      <p className="text-[10px] text-[#F5F2ED]/35">Scattered specs &amp; docs</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#121212] border border-white/[0.06] flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-[#F5F2ED]/55 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#F5F2ED]">Slack / Discord</p>
                      <p className="text-[10px] text-[#F5F2ED]/35">Lost context threads</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#121212] border border-white/[0.06] flex items-center gap-3">
                    <CheckSquare className="w-4 h-4 text-[#F5F2ED]/55 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#F5F2ED]">Trello / Jira</p>
                      <p className="text-[10px] text-[#F5F2ED]/35">Out-of-sync task boards</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#121212] border border-white/[0.06] flex items-center gap-3 sm:col-span-2">
                    <ExternalLink className="w-4 h-4 text-[#F5F2ED]/55 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#F5F2ED]">Ad-hoc Demo Links</p>
                      <p className="text-[10px] text-[#F5F2ED]/35">No client access control or feedback tracking</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </ScrollReveal>

          {/* After: NEXORA Unified Workspace */}
          <ScrollReveal delay={0.25} direction="spatialDepth" scale={0.9}>
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }} className="h-full">
              <Card
                surfaceTier="200"
                className="h-full space-y-6 border-[#8B0D1A]/30 bg-[#8B0D1A]/[0.03] shadow-[0_0_30px_rgba(139,13,26,0.08)]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#8B0D1A]" />
                    <h3 className="text-lg font-bold text-[#F5F2ED] font-display">NEXORA Unified Workspace</h3>
                  </div>
                  <Badge variant="crimson" size="sm">ZERO FRICTION</Badge>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#8B0D1A] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#F5F2ED]">One Project Boundary</p>
                      <p className="text-[#F5F2ED]/55 text-[11px] leading-relaxed mt-0.5">
                        Code commits, Kanban tasks, file uploads, activity logs, and client
                        demo links — all inside one workspace.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#8B0D1A] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#F5F2ED]">Real-Time Socket Stream</p>
                      <p className="text-[#F5F2ED]/55 text-[11px] leading-relaxed mt-0.5">
                        Task updates, comments, and member activity sync instantly across
                        the entire team — no manual refresh, no stale state.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#8B0D1A] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#F5F2ED]">Client Presentation Gateway</p>
                      <p className="text-[#F5F2ED]/55 text-[11px] leading-relaxed mt-0.5">
                        Generate secure <code className="text-[#8B0D1A]">/demo/:token</code> links so
                        clients can review live builds and leave feedback directly.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
};
