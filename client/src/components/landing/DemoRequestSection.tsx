import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../motion/ScrollReveal';
import { Send, CheckCircle2, MonitorPlay, Sparkles } from 'lucide-react';
import { demoRequestService } from '@/services/demoRequestService';

export const DemoRequestSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectInterest: 'Full Stack Website Development',
    message: '',
    contactMethod: 'email' as 'email' | 'phone' | 'linkedin',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    demoRequestService.createRequest(formData);
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: '',
      email: '',
      company: '',
      projectInterest: 'Full Stack Website Development',
      message: '',
      contactMethod: 'email',
    });
  };

  return (
    <section className="py-28 bg-[#050505] border-b border-white/[0.06] relative selection:bg-[#8B0D1A]/30">
      <Container size="lg">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="crimson" size="md">DEMO EXPERIENCE</Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-[#F5F2ED]">
            WANT TO SEE IT IN ACTION?
          </h2>
          <p className="text-[#F5F2ED]/55 text-sm sm:text-base font-sans">
            Schedule a customized product demonstration or staging portal walkthrough with the ZANSTA core team.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Card surfaceTier="100" className="p-8 sm:p-12 border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B0D1A]/10 rounded-full blur-3xl pointer-events-none" />

            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#8B0D1A]/20 border border-[#8B0D1A]/40 flex items-center justify-center text-[#8B0D1A] mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-[#F5F2ED] font-display">Demo Request Received!</h3>
                <p className="text-sm text-[#F5F2ED]/60 max-w-md mx-auto font-sans leading-relaxed">
                  Thank you. Our project architect will reach out to you within 24 hours to schedule your personalized live demo.
                </p>
                <Button size="sm" variant="outline" onClick={() => setIsSuccess(false)}>
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#F5F2ED]/80">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Alex Mercer"
                      className="w-full px-4 py-3 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#F5F2ED]/80">Work Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] font-mono placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#F5F2ED]/80">Company / Organization</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder="Horizon Labs Inc."
                      className="w-full px-4 py-3 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#F5F2ED]/80">Project / Capability Interest</label>
                    <select
                      value={formData.projectInterest}
                      onChange={(e) => setFormData((prev) => ({ ...prev, projectInterest: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
                    >
                      <option value="Full Stack Website Development">Full Stack Web App</option>
                      <option value="Generative AI Tools Development">Generative AI Engine</option>
                      <option value="App Development">Mobile App (iOS/Android)</option>
                      <option value="Frontend Design">Frontend UI/UX Systems</option>
                      <option value="Data Analytics with Generative AI">Data Analytics</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#F5F2ED]/80">Preferred Contact Method</label>
                  <div className="flex items-center gap-4 pt-1">
                    {(['email', 'phone', 'linkedin'] as const).map((method) => (
                      <label key={method} className="flex items-center gap-2 text-xs font-mono text-[#F5F2ED]/80 cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method}
                          checked={formData.contactMethod === method}
                          onChange={(e) => setFormData((prev) => ({ ...prev, contactMethod: e.target.value as any }))}
                          className="accent-[#8B0D1A]"
                        />
                        <span className="capitalize">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#F5F2ED]/80">Message / Demo Focus</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your project timeline, goals, or specific system requirements..."
                    className="w-full px-4 py-3 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A] font-sans"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    isLoading={isSubmitting}
                    leftIcon={<Send className="w-4 h-4" />}
                    className="w-full text-xs font-bold"
                  >
                    Request Demo Walkthrough
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </ScrollReveal>
      </Container>
    </section>
  );
};
