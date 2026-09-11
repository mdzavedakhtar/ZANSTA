import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { ProgressBar } from '../ui/ProgressBar';
import { ScrollReveal } from '../motion/ScrollReveal';
import {
  Users,
  Kanban,
  Github,
  FolderDown,
  ExternalLink,
  Activity,
  CheckSquare,
  Sparkles,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export const FeaturesGridSection: React.FC = () => {
  return (
    <section className="py-28 bg-[#050505] border-b border-white/[0.06] relative overflow-hidden">
      <Container size="xl">
        <ScrollReveal className="max-w-3xl mx-auto space-y-4 mb-16" direction="spatialDepth">
          <Badge variant="crimson" size="md">PLATFORM CAPABILITIES</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-[#F5F2ED]">
            BUILT FOR THE WAY
            <br />
            TEAMS BUILD.
          </h2>
          <p className="text-[#F5F2ED]/55 text-sm sm:text-base">
            Every tool required to run high-output engineering teams and agency portals.
          </p>
        </ScrollReveal>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1: Team Workspace */}
          <ScrollReveal delay={0.05} direction="spatialDepth" scale={0.93}>
            <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="h-full">
              <Card surfaceTier="100" glowOnHover className="h-full space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 flex items-center justify-center text-[#8B0D1A]">
                    <Users className="w-4 h-4" />
                  </div>
                  <Badge variant="crimson" size="sm">TEAM WORKSPACE</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#F5F2ED] font-display">Centralized Team Workspace</h3>
                  <p className="text-xs text-[#F5F2ED]/55 mt-1 leading-relaxed">
                    Manage member roles (`OWNER`, `ADMIN`, `MEMBER`, `CLIENT`), invites, and active presence.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    <Avatar name="MD Zaved Akhtar" src="/zaved.jpg" size="sm" status="online" />
                    <Avatar name="Rahul Sharma" size="sm" status="online" />
                    <Avatar name="Aman Deep" size="sm" status="busy" />
                  </div>
                  <span className="text-[11px] font-mono text-[#F5F2ED]/55 ml-2">+5 members active</span>
                </div>
              </Card>
            </motion.div>
          </ScrollReveal>

          {/* Card 2: Project PM */}
          <ScrollReveal delay={0.1} direction="spatialDepth" scale={0.93}>
            <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="h-full">
              <Card surfaceTier="100" glowOnHover className="h-full space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 flex items-center justify-center text-[#F5F2ED]">
                    <Kanban className="w-4 h-4" />
                  </div>
                  <Badge variant="crimson" size="sm">PROJECT MANAGEMENT</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#F5F2ED] font-display">Linear-Style Project Hub</h3>
                  <p className="text-xs text-[#F5F2ED]/55 mt-1 leading-relaxed">
                    Fast Kanban and List views with optimistic UI updates and custom workflow labels.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#121212] border border-white/[0.06] space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#F5F2ED]/55">
                    <span>IN PROGRESS</span>
                    <span className="text-[#8B0D1A]">3 TASKS</span>
                  </div>
                  <div className="p-2 rounded bg-[#161616] text-[11px] text-[#F5F2ED] font-medium">
                    Implement Socket.IO sync
                  </div>
                </div>
              </Card>
            </motion.div>
          </ScrollReveal>

          {/* Card 3: GitHub Sync */}
          <ScrollReveal delay={0.15} direction="spatialDepth" scale={0.93}>
            <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="h-full">
              <Card surfaceTier="100" glowOnHover className="h-full space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
                    <Github className="w-4 h-4" />
                  </div>
                  <Badge variant="neutral" size="sm">GITHUB SYNC</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#F5F2ED] font-display">GitHub API Integration</h3>
                  <p className="text-xs text-[#F5F2ED]/55 mt-1 leading-relaxed">
                    Stream commits, pull requests, issues, and contributor graphs directly into projects.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#121212] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400">main @ a9d20c</span>
                  <span className="text-[#F5F2ED]/35 text-[10px]">Synced 2m ago</span>
                </div>
              </Card>
            </motion.div>
          </ScrollReveal>

          {/* Card 4: File Management */}
          <ScrollReveal delay={0.2} direction="spatialDepth" scale={0.93}>
            <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="h-full">
              <Card surfaceTier="100" glowOnHover className="h-full space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 flex items-center justify-center text-[#8B0D1A]">
                    <FolderDown className="w-4 h-4" />
                  </div>
                  <Badge variant="neutral" size="sm">FILE ASSETS</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#F5F2ED] font-display">Project File Storage</h3>
                  <p className="text-xs text-[#F5F2ED]/55 mt-1 leading-relaxed">
                    Upload, preview, and download specs, ZIPs, PDFs, APKs, and wireframe assets.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-[#F5F2ED]/80">
                    architecture.pdf
                  </span>
                  <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-[#F5F2ED]/80">
                    demo.zip
                  </span>
                </div>
              </Card>
            </motion.div>
          </ScrollReveal>

          {/* Card 5: Live Demo */}
          <ScrollReveal delay={0.25} direction="spatialDepth" scale={0.93}>
            <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="h-full">
              <Card surfaceTier="100" glowOnHover className="h-full space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 flex items-center justify-center text-[#8B0D1A]">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <Badge variant="crimson" size="sm">LIVE DEMO</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#F5F2ED] font-display">Live Project URL Sandbox</h3>
                  <p className="text-xs text-[#F5F2ED]/55 mt-1 leading-relaxed">
                    Display deployed project URLs safely inside an embedded interactive viewport.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#121212] border border-white/[0.06] flex items-center gap-2 text-xs font-mono text-[#8B0D1A]">
                  <span className="w-2 h-2 rounded-full bg-[#8B0D1A] animate-pulse" />
                  <span className="truncate">https://caresprint.example.com</span>
                </div>
              </Card>
            </motion.div>
          </ScrollReveal>

          {/* Card 6: Activity Stream */}
          <ScrollReveal delay={0.3} direction="spatialDepth" scale={0.93}>
            <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="h-full">
              <Card surfaceTier="100" glowOnHover className="h-full space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F2ED]/[0.05] border border-emerald-500/25 flex items-center justify-center text-[#F5F2ED]/70">
                    <Activity className="w-4 h-4" />
                  </div>
                  <Badge variant="active" size="sm">ACTIVITY STREAM</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#F5F2ED] font-display">Real-Time Audit Trail</h3>
                  <p className="text-xs text-[#F5F2ED]/55 mt-1 leading-relaxed">
                    Automatic event logs for task updates, commits, file uploads, and member joins.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#121212] border border-white/[0.06] text-[11px] text-[#F5F2ED]/80">
                  <strong className="text-[#F5F2ED]">Aman</strong> uploaded project documentation
                </div>
              </Card>
            </motion.div>
          </ScrollReveal>

          {/* Card 7: Task Engine */}
          <ScrollReveal delay={0.35} direction="spatialDepth" scale={0.93}>
            <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="h-full">
              <Card surfaceTier="100" glowOnHover className="h-full space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 flex items-center justify-center text-[#F5F2ED]">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <Badge variant="crimson" size="sm">TASK ENGINE</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#F5F2ED] font-display">Lightweight PM Engine</h3>
                  <p className="text-xs text-[#F5F2ED]/55 mt-1 leading-relaxed">
                    Assignees, priorities, labels, due dates, and inline comment threads.
                  </p>
                </div>

                <ProgressBar value={75} showPercentage color="crimson" />
              </Card>
            </motion.div>
          </ScrollReveal>

          {/* Card 8: Showcase Hub */}
          <ScrollReveal delay={0.4} direction="spatialDepth" scale={0.93}>
            <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="h-full">
              <Card surfaceTier="100" glowOnHover className="h-full space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-[#8B0D1A]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <Badge variant="crimson" size="sm">SHOWCASE HUB</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#F5F2ED] font-display">Public Case Study Hub</h3>
                  <p className="text-xs text-[#F5F2ED]/55 mt-1 leading-relaxed">
                    Turn completed team projects into high-converting public portfolio showcases.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#121212] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#F5F2ED]/80">Public Showcase</span>
                  <span className="text-[#F5F2ED]/70">SEO READY</span>
                </div>
              </Card>
            </motion.div>
          </ScrollReveal>

          {/* Card 9: Client Portal */}
          <ScrollReveal delay={0.45} direction="spatialDepth" scale={0.93}>
            <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="h-full">
              <Card surfaceTier="100" glowOnHover className="h-full space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 flex items-center justify-center text-[#8B0D1A]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <Badge variant="crimson" size="sm">CLIENT PORTAL</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#F5F2ED] font-display">Client Presentation Links</h3>
                  <p className="text-xs text-[#F5F2ED]/55 mt-1 leading-relaxed">
                    Generate secure <code className="text-[#8B0D1A]">/demo/:token</code> links with password protection &amp; analytics.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#121212] border border-white/[0.06] text-[11px] font-mono text-[#8B0D1A] truncate">
                  /demo/token_abc123_secured
                </div>
              </Card>
            </motion.div>
          </ScrollReveal>

          {/* Card 10: Agency Workflow — full-width banner */}
          <ScrollReveal delay={0.5} direction="spatialDepth" scale={0.93} className="md:col-span-2 lg:col-span-3">
            <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.3 }}>
              <Card
                surfaceTier="200"
                glowOnHover
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-[#8B0D1A]/5 via-[#8B0D1A]/2 to-transparent border-[#8B0D1A]/20 shadow-[0_10px_35px_rgba(139,13,26,0.08)]"
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 flex items-center justify-center text-[#8B0D1A]">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <Badge variant="crimson" size="sm">AGENCY WORKFLOW</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-[#F5F2ED] font-display">From Team Workspace to Software Agency</h3>
                  <p className="text-xs text-[#F5F2ED]/80 leading-relaxed">
                    Receive inbound project requests, issue proposals, manage client milestones, and present
                    agency work directly inside ZANSTA.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                  <span className="px-3 py-2 rounded-xl bg-[#0E0E0E] border border-white/10 text-[#F5F2ED]/80">
                    NEW REQUEST
                  </span>
                  <span className="text-[#F5F2ED]/35">→</span>
                  <span className="px-3 py-2 rounded-xl bg-[#0E0E0E] border border-white/10 text-[#8B0D1A]">
                    PROPOSAL
                  </span>
                  <span className="text-[#F5F2ED]/35">→</span>
                  <span className="px-3 py-2 rounded-xl bg-[#0E0E0E] border border-white/10 text-[#F5F2ED]/70">
                    IN PROGRESS
                  </span>
                </div>
              </Card>
            </motion.div>
          </ScrollReveal>

        </div>
      </Container>
    </section>
  );
};
