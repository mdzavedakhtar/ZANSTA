import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { MagneticButton } from '../ui/MagneticButton';
import { Badge } from '../ui/Badge';
import { ScrollReveal } from '../motion/ScrollReveal';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-32 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-radial-gradient opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <ScrollReveal className="text-center max-w-4xl mx-auto space-y-8">
          <Badge variant="crimson" size="md">START BUILDING TODAY</Badge>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tightest font-display text-[#F5F2ED] leading-tight">
            READY TO BUILD <br />
            <span className="text-[#8B0D1A]">
              SOMETHING REMARKABLE?
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[#F5F2ED]/60 font-sans max-w-2xl mx-auto leading-relaxed">
            Join modern software engineering teams using ZANSTA to manage code, stream real-time updates, and showcase client work.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/dashboard">
              <MagneticButton size="xl" variant="glow" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Enter Workspace
              </MagneticButton>
            </Link>
            <Link to="/contact">
              <Button size="xl" variant="secondary" leftIcon={<Sparkles className="w-4 h-4 text-[#F5F2ED]/50" />}>
                Start Project Request
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
