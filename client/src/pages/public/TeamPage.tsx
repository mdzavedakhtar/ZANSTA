import React, { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { FadeIn } from '@/components/motion/FadeIn';
import { Github, Linkedin, FileText, Briefcase } from 'lucide-react';
import { teamService } from '@/services/teamService';
import { CMSTeamMember } from '@/types/cms';

export const TeamPage: React.FC = () => {
  const [members, setMembers] = useState<CMSTeamMember[]>([]);

  useEffect(() => {
    setMembers(teamService.getTeamMembers({ isVisible: true }));
  }, []);

  return (
    <div className="pt-28 pb-20">
      <Container size="xl">
        <FadeIn className="max-w-2xl space-y-4 mb-12">
          <Badge variant="crimson" size="md">ENGINEERING TEAM</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight font-display text-[#F5F2ED]">
            THE BUILDERS BEHIND ZANSTA.
          </h1>
          <p className="text-[#F5F2ED]/55 text-sm">
            A passionate collective of full-stack architects and visual designers engineering modern software tools.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((member) => (
            <Card key={member.id} glowOnHover className="space-y-4" data-cursor-text="PROFILE">
              <div className="flex items-center gap-4">
                <Avatar name={member.name} src={member.photo} size="lg" status="online" />
                <div>
                  <h3 className="text-base font-bold text-[#F5F2ED]">{member.name}</h3>
                  <p className="text-xs text-[#8B0D1A] font-medium">{member.role}</p>
                  {member.experienceYears && (
                    <p className="text-[10px] font-mono text-[#F5F2ED]/40 flex items-center gap-1 mt-0.5">
                      <Briefcase className="w-3 h-3 text-[#8B0D1A]" /> {member.experienceYears} Exp
                    </p>
                  )}
                </div>
              </div>

              <p className="text-xs text-[#F5F2ED]/60 leading-relaxed font-sans">{member.bio}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {member.techStack.map((s) => (
                  <Badge key={s} variant="neutral" size="sm">
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#F5F2ED]/55 hover:text-[#F5F2ED] p-1.5 rounded-lg bg-white/5"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#F5F2ED]/55 hover:text-[#F5F2ED] p-1.5 rounded-lg bg-white/5"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {member.resumeUrl && (
                  <a
                    href={member.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-[#8B0D1A] hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" /> View Resume
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
