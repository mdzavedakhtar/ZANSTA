import React from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/motion/FadeIn';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Project request submitted successfully! (Phase 1 Demo)');
  };

  return (
    <div className="pt-28 pb-20">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Side */}
          <FadeIn className="space-y-6">
            <Badge variant="crimson" size="md">START A PROJECT</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-[#F5F2ED]">
              LET'S BUILD SOMETHING REMARKABLE.
            </h1>
            <p className="text-[#F5F2ED]/55 text-sm leading-relaxed">
              Tell us about your project requirements, budget, and desired timeline. Our senior architecture team will review and respond within 24 hours.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-xs text-[#F5F2ED]/80">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#8B0D1A]">
                  <Mail className="w-4 h-4" />
                </div>
                <span>contact@zansta.dev</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#F5F2ED]/80">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#8B0D1A]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>San Francisco, CA & Remote Global</span>
              </div>
            </div>
          </FadeIn>

          {/* Form Side */}
          <FadeIn delay={0.2}>
            <Card surfaceTier="200" className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Your Full Name" placeholder="MD Zaved Akhtar" required />
                <Input label="Work Email" type="email" placeholder="mdzavedakhtar62@gmail.com" required />
                <Select
                  label="Project Type"
                  options={[
                    { value: 'web', label: 'Full-Stack Web App' },
                    { value: 'mobile', label: 'Mobile Application' },
                    { value: 'ai', label: 'AI Agent / Automation' },
                    { value: 'audit', label: 'Codebase Audit & Scaling' },
                  ]}
                />
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-medium text-[#F5F2ED]/80">Project Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your product vision, key features, and timeline..."
                    className="w-full bg-[#0E0E0E] text-[#F5F2ED] text-sm rounded-lg border border-white/10 p-3.5 outline-none focus:border-[#8B0D1A]/50"
                  />
                </div>

                <Button type="submit" size="lg" variant="glow" className="w-full" rightIcon={<Send className="w-4 h-4" />}>
                  Submit Project Request
                </Button>
              </form>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </div>
  );
};
