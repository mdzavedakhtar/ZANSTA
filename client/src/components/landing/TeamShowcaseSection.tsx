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
    <section id="team" className="py-28 bg-[#080808] border-b border-white/[0.06] relative">
      <Container size="xl">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="crimson" size="md">ENGINEERING COLLECTIVE</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-[#F5F2ED]">
            MEET THE BUILDERS BEHIND ZANSTA
          </h2>
          <p className="text-[#F5F2ED]/55 text-sm sm:text-base">
            Engineers and motion architects dedicated to building serious software tools.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((m, idx) => (
            <ScrollReveal key={m.id} delay={idx * 0.15}>
              <Card
                surfaceTier="100"
                glowOnHover
                className="group relative space-y-5 h-full flex flex-col justify-between overflow-hidden"
                data-cursor-text="PROFILE"
              >
                <div className="space-y-4">
                  {/* Top Avatar & Name */}
                  <div className="flex items-center gap-4">
                    <Avatar name={m.name} src={m.photo} size="lg" status="online" className="group-hover:scale-105 transition-transform" />
                    <div>
                      <h3 className="text-lg font-bold text-[#F5F2ED] font-display group-hover:text-[#8B0D1A] transition-colors">
                        {m.name}
                      </h3>
                      <p className="text-xs font-mono text-[#8B0D1A] mt-0.5">{m.role}</p>
                      {m.experienceYears && (
                        <p className="text-[10px] font-mono text-[#F5F2ED]/40 mt-0.5">{m.experienceYears} Experience</p>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#F5F2ED]/55 leading-relaxed font-sans">{m.bio}</p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {m.techStack.map((skill) => (
                      <Badge key={skill} variant="neutral" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Bottom Social & Resume */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {m.github && (
                      <a
                        href={m.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-white/5 text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-white/10 transition-colors"
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
                        className="p-2 rounded-lg bg-white/5 text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-white/10 transition-colors"
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
                      className="text-[11px] font-mono text-[#8B0D1A] hover:underline flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" /> Resume PDF
                    </a>
                  ) : (
                    <div className="text-[10px] font-mono text-[#F5F2ED]/35">
                      ZANSTA Engineer
                    </div>
                  )}
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
