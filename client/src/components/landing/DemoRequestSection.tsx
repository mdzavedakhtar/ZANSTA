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
    <section className="py-28 lg:py-36 bg-[#050508] border-b border-white/[0.08] relative">
      <Container size="lg">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-wider">
            DEMO EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight font-display text-white">
            WANT TO SEE IT IN ACTION?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
            Schedule a customized product demonstration or staging portal walkthrough with the ZANSTA core team.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="p-8 sm:p-12 bg-[#0c0d12] border border-white/[0.08] rounded-3xl relative overflow-hidden shadow-2xl">
            {/* Ambient Purple/Crimson Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#3b0764]/20 via-[#8B0D1A]/10 to-transparent blur-3xl pointer-events-none" />

            {isSuccess ? (
              <div className="py-12 text-center space-y-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-white font-display">Demo Request Received!</h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto font-sans leading-relaxed">
                  Thank you. Our project architect will reach out to you within 24 hours to schedule your personalized live demo.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="py-2.5 px-6 rounded-full bg-white/10 border border-white/15 text-white text-xs font-medium hover:bg-white/20 transition-all"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-300">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Alex Mercer"
                      className="w-full px-4 py-3 bg-[#13141f] border border-white/[0.08] focus:border-white/30 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-300">Work Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 bg-[#13141f] border border-white/[0.08] focus:border-white/30 rounded-xl text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-300">Company / Organization</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder="Horizon Labs Inc."
                      className="w-full px-4 py-3 bg-[#13141f] border border-white/[0.08] focus:border-white/30 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-300">Project / Capability Interest</label>
                    <select
                      value={formData.projectInterest}
                      onChange={(e) => setFormData((prev) => ({ ...prev, projectInterest: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#13141f] border border-white/[0.08] focus:border-white/30 rounded-xl text-xs text-white focus:outline-none font-mono cursor-pointer transition-all"
                    >
                      <option value="Full Stack Website Development">Full Stack Web App</option>
                      <option value="Generative AI Tools Development">Generative AI Engine</option>
                      <option value="App Development">Mobile App (iOS/Android)</option>
                      <option value="Frontend Design">Frontend UI/UX Systems</option>
                      <option value="Data Analytics with Generative AI">Data Analytics</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-300">Preferred Contact Method</label>
                  <div className="flex items-center gap-5 pt-1">
                    {(['email', 'phone', 'linkedin'] as const).map((method) => (
                      <label key={method} className="flex items-center gap-2 text-xs font-mono text-zinc-300 cursor-pointer">
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

                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-300">Message / Demo Focus</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your project timeline, goals, or specific system requirements..."
                    className="w-full px-4 py-3 bg-[#13141f] border border-white/[0.08] focus:border-white/30 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none font-sans transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-xl"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Request Demo Walkthrough'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
