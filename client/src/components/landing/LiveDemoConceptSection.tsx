import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { BrowserMockup } from '../shared/BrowserMockup';
import { ScrollReveal } from '../motion/ScrollReveal';
import { ShieldCheck, MessageSquare, Play, Send, CheckCircle2 } from 'lucide-react';

export const LiveDemoConceptSection: React.FC = () => {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackText('');
    }, 3000);
  };

  return (
    <section className="py-28 bg-[#080808] border-b border-white/[0.06] relative">
      <Container size="xl">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="crimson" size="md">CLIENT DEMO SYSTEM</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-[#F5F2ED]">
            CLIENT PRESENTATION MODE
          </h2>
          <p className="text-[#F5F2ED]/55 text-sm sm:text-base">
            Share secure `/demo/:token` links with clients to present live project builds without exposing internal workspace controls.
          </p>
        </ScrollReveal>

        {/* Live Demo Browser Frame Mockup */}
        <ScrollReveal className="max-w-5xl mx-auto">
          <BrowserMockup url="https://nexora.dev/demo/token_caresprint_2026_client_v2">
            <div className="p-6 sm:p-10 space-y-8">
              {/* Header inside Client Demo */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-extrabold text-[#F5F2ED] font-display">CARESPRINT DEMO BUILD</h3>
                    <Badge variant="active" size="sm">CLIENT VERIFIED</Badge>
                  </div>
                  <p className="text-xs text-[#F5F2ED]/55 mt-1">Prepared for Acme Health Corp Client Review</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="crimson" size="sm">TOKEN EXPIRES IN 7 DAYS</Badge>
                </div>
              </div>

              {/* Interactive Preview Sandbox View */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 p-6 rounded-2xl bg-[#0E0E0E] border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold text-[#F5F2ED] flex items-center gap-2">
                    <Play className="w-4 h-4 text-[#8B0D1A]" /> Live Telemedicine Sandbox Preview
                  </h4>
                  <div className="h-48 rounded-xl bg-[#121212] border border-white/[0.06] flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" />
                    <span className="w-3 h-3 rounded-full bg-[#F5F2ED]/400 animate-ping" />
                    <p className="text-xs font-mono text-[#F5F2ED] font-semibold">WebRTC Video Consultation Engine Active</p>
                    <p className="text-[11px] text-[#F5F2ED]/35 font-mono">Simulated Latency: 42ms • FPS: 60</p>
                  </div>
                </div>

                {/* Client Feedback Input Box */}
                <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/10 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-[#F5F2ED] flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#8B0D1A]" /> Client Feedback
                    </h4>
                    <p className="text-xs text-[#F5F2ED]/55">Leave instant feedback for the engineering team.</p>
                  </div>

                  {feedbackSent ? (
                    <div className="p-4 rounded-xl bg-[#F5F2ED]/500/10 border border-emerald-500/30 text-[#F5F2ED]/70 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Feedback recorded to team activity feed!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSendFeedback} className="space-y-3">
                      <textarea
                        rows={3}
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="e.g., Looks great! Can we adjust doctor appointment button styling?"
                        className="w-full bg-[#121212] border border-white/10 text-xs text-[#F5F2ED] p-3 rounded-xl outline-none focus:border-[#8B0D1A]/50"
                      />
                      <Button type="submit" size="sm" variant="glow" className="w-full" rightIcon={<Send className="w-3.5 h-3.5" />}>
                        Submit Feedback
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </BrowserMockup>
        </ScrollReveal>
      </Container>
    </section>
  );
};
