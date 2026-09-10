import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/motion/FadeIn';
import { Code, Smartphone, Bot, Rocket, Shield, ArrowRight } from 'lucide-react';

const agencyServices = [
  {
    icon: Code,
    title: 'Full-Stack Web Engineering',
    desc: 'High-scale SaaS platforms, React/Next.js architectures, complex backends.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Cross-platform React Native & native mobile applications.',
  },
  {
    icon: Bot,
    title: 'AI & Automation Solutions',
    desc: 'Custom LLM integrations, autonomous agentic workflows, vector search.',
  },
  {
    icon: Rocket,
    title: 'SaaS Product Architecture',
    desc: 'From MVP scoping to enterprise cloud scaling & performance tuning.',
  },
];

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20">
      <Container size="xl">
        <FadeIn className="max-w-2xl space-y-4 mb-12">
          <Badge variant="crimson" size="md">ZANSTA AGENCY SERVICES</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight font-display text-[#F5F2ED]">
            WE BUILD & SHIP PRODUCTION SOFTWARE.
          </h1>
          <p className="text-[#F5F2ED]/55 text-sm">
            Leverage our specialized engineering team to design, build, and deploy your next-generation software products.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agencyServices.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} glowOnHover className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 flex items-center justify-center text-[#8B0D1A]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#F5F2ED]">{service.title}</h3>
                <p className="text-sm text-[#F5F2ED]/55 leading-relaxed">{service.desc}</p>
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B0D1A]">
                  Request Proposal <ArrowRight className="w-3 h-3" />
                </Link>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
};
