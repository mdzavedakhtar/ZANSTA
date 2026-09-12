import React, { useEffect, useState } from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { ScrollReveal } from '../motion/ScrollReveal';
import { Github, Linkedin, FileText } from 'lucide-react';
import { teamService } from '@/services/teamService';
import { CMSTeamMember } from '@/types/cms';

export const TeamShowcaseSection: React.FC = () => {
  const [members, setMembers] = useState<CMSTeamMember[]>([]);

  useEffect(() => {
    const list = teamService.getTeamMembers({ isVisible: true });
    setMembers(list);
  }, []);

  if (members.length === 0) return null;

  return (
    <section id="team" className="py-28 lg:py-36 bg-[#050508] border-b border-white/[0.08] relative">
      <Container size="xl">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-wider">
            ENGINEERING COLLECTIVE
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight font-display text-white">
            MEET THE BUILDERS BEHIND ZANSTA
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
            Engineers and motion architects dedicated to building serious software tools.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((m, idx) => (
            <ScrollReveal key={m.id} delay={idx * 0.15}>
              <div className="group relative space-y-6 h-full flex flex-col justify-between bg-[#0c0d12] border border-white/[0.08] hover:border-white/20 p-6 md:p-8 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#3b0764]/20 via-[#8B0D1A]/10 to-transparent blur-2xl pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Top Avatar & Name */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar name={m.name} src={m.photo} size="lg" status="online" className="group-hover:scale-105 transition-transform border border-white/10" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white font-display group-hover:text-white transition-colors">
                        {m.name}
                      </h3>
                      <p className="text-xs font-mono text-[#8B0D1A] mt-0.5">{m.role}</p>
                      {m.experienceYears && (
                        <p className="text-[10px] font-mono text-zinc-400 mt-0.5">{m.experienceYears} Experience</p>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{m.bio}</p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {m.techStack.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Social & Resume */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    {m.github && (
                      <a
                        href={m.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {m.linkedin && (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {m.resumeUrl ? (
                    <a
                      href={m.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-[#8B0D1A] hover:underline flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" /> Resume PDF
                    </a>
                  ) : (
                    <div className="text-[10px] font-mono text-zinc-400">
                      ZANSTA Engineer
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
