import React, { useEffect, useState } from 'react';
import { Container } from '../ui/Container';
import { Avatar } from '../ui/Avatar';
import { ScrollReveal } from '../motion/ScrollReveal';
import { Github, Linkedin, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { teamService } from '@/services/teamService';
import { CMSTeamMember } from '@/types/cms';
import { openResumeDocument } from '@/lib/documentViewer';
import { useCmsLiveSync } from '@/hooks/useCmsLiveSync';

export const TeamShowcaseSection: React.FC = () => {
  const [members, setMembers] = useState<CMSTeamMember[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadTeam = () => {
    const list = teamService.getTeamMembers({ isVisible: true });
    setMembers(list);

    teamService.fetchTeamMembers({ isVisible: true }).then((freshList) => {
      if (Array.isArray(freshList)) {
        setMembers(freshList);
      }
    });
  };

  useEffect(() => {
    loadTeam();
  }, []);

  useCmsLiveSync('team', () => {
    loadTeam();
  });

  if (members.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  const visibleMembers = members.length > 3
    ? [
        members[currentIndex % members.length],
        members[(currentIndex + 1) % members.length],
        members[(currentIndex + 2) % members.length],
      ]
    : members;

  return (
    <section id="team" className="py-28 lg:py-36 bg-[#050508] border-b border-white/[0.08] relative overflow-hidden">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal className="space-y-4 max-w-2xl">
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

          {/* Slider Controls if > 3 members */}
          {members.length > 3 && (
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-zinc-400 mr-2">
                ({currentIndex + 1}/{members.length})
              </span>
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/05 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Previous Engineers"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/05 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Next Engineers"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleMembers.map((m, idx) => (
            <div key={`${m.id}-${currentIndex}-${idx}`} className="transition-all duration-500 ease-out">
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
                    <button
                      type="button"
                      onClick={() => openResumeDocument(m.resumeUrl, m.resumeFileName || `${m.name}_Resume.pdf`)}
                      className="text-xs font-mono text-[#8B0D1A] hover:underline flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0"
                    >
                      <FileText className="w-3.5 h-3.5" /> Resume PDF
                    </button>
                  ) : (
                    <div className="text-[10px] font-mono text-zinc-400">
                      ZANSTA Engineer
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots if > 3 */}
        {members.length > 3 && (
          <div className="flex items-center justify-center gap-2 pt-10">
            {members.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Jump to team member ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex % members.length
                    ? 'w-8 bg-[#8B0D1A]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};
