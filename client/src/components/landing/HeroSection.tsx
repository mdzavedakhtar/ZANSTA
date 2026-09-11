import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { MagneticButton } from '../ui/MagneticButton';
import { Badge } from '../ui/Badge';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden border-b border-[#F5F2ED]/[0.06]">
      <Container size="xl" className="relative z-10 flex flex-col flex-1 justify-center py-32">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-8">

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge variant="crimson" dot size="md" className="shadow-[0_0_20px_rgba(139,13,26,0.20)]">
              ZANSTA 2.0 • DEVELOPER WORKSPACE ENGINE &amp; AGENCY HUB
            </Badge>
          </motion.div>

          {/* Spatial 3D Typography Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', z: -100 }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)', z: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tightest font-display text-[#F5F2ED] leading-[1.05]">
              BUILD TOGETHER. <br />
              <span className="text-[#8B0D1A]">
                SHIP EXTRAORDINARY.
              </span>
            </h1>
          </motion.div>

          {/* Supporting Copy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-base sm:text-xl text-[#F5F2ED]/60 max-w-2xl font-sans leading-relaxed">
              A collaborative workspace for ambitious software engineering teams to manage code, stream real-time updates, track tasks, and launch high-impact client showcases.
            </p>
          </motion.div>

          {/* Hero Magnetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Link to="/dashboard">
              <MagneticButton size="xl" variant="glow" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Enter Workspace
              </MagneticButton>
            </Link>
            <Link to="/projects">
              <Button size="xl" variant="secondary" leftIcon={<Terminal className="w-4 h-4 text-[#F5F2ED]/50" />}>
                Explore Projects
              </Button>
            </Link>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};
