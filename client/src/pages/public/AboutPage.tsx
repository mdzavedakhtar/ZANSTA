import React from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FadeIn } from '@/components/motion/FadeIn';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20">
      <Container size="xl">
        <FadeIn className="max-w-3xl space-y-6">
          <Badge variant="crimson" size="md">OUR STORY & VISION</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-[#F5F2ED]">
            REDEFINING TEAM WORKSPACES FOR MODERN SOFTWARE BUILDERS.
          </h1>
          <p className="text-[#F5F2ED]/55 text-base leading-relaxed">
            Software development teams spend half their day context-switching between disconnected tools: GitHub for code, Drive for files, Jira for tasks, Slack for messages, and separate client showcase links.
          </p>
          <p className="text-[#F5F2ED]/55 text-base leading-relaxed">
            ZANSTA unifies the end-to-end lifecycle into one sleek, dark-mode technical ecosystem — empowering developer teams to build together, ship together, and transform into full-scale agency powerhouses.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
          <Card surfaceTier="200" className="space-y-3">
            <h3 className="text-[#8B0D1A] font-mono text-sm font-bold">01. UNIFIED CONTEXT</h3>
            <p className="text-[#F5F2ED]/80 text-sm">Code, tasks, files, and client feedback reside in a single project boundary.</p>
          </Card>
          <Card surfaceTier="200" className="space-y-3">
            <h3 className="text-[#8B0D1A] font-mono text-sm font-bold">02. AGENCY READY</h3>
            <p className="text-[#F5F2ED]/80 text-sm">Evolve seamlessly from an internal dev team into a client-facing software agency.</p>
          </Card>
          <Card surfaceTier="200" className="space-y-3">
            <h3 className="text-[#F5F2ED]/70 font-mono text-sm font-bold">03. ZERO SLOWDOWN</h3>
            <p className="text-[#F5F2ED]/80 text-sm">Built for extreme speed, keyboard shortcuts, and real-time socket updates.</p>
          </Card>
        </div>
      </Container>
    </div>
  );
};
