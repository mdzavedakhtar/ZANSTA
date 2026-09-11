import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../motion/ScrollReveal';
import { Mail, Phone, MapPin, Send, CheckCircle2, Linkedin, Github, Twitter } from 'lucide-react';
import { enquiryService } from '@/services/enquiryService';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceInterested: 'Full Stack Website Development',
    budget: '$25,000 - $50,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    enquiryService.createEnquiry(formData);
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      serviceInterested: 'Full Stack Website Development',
      budget: '$25,000 - $50,000',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-28 bg-[#080808] border-b border-white/[0.06] relative selection:bg-[#8B0D1A]/30">
      <Container size="xl">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <Badge variant="crimson" size="md">GET IN TOUCH</Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-[#F5F2ED]">
            LET'S BUILD SOMETHING GREAT.
          </h2>
          <p className="text-[#F5F2ED]/55 text-sm sm:text-base font-sans">
            Ready to engineer your next software breakthrough? Reach out to our team directly.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal className="space-y-6">
              <h3 className="text-2xl font-bold text-[#F5F2ED] font-display">ZANSTA HEADQUARTERS</h3>
              <p className="text-sm text-[#F5F2ED]/55 font-sans leading-relaxed">
                Our main engineering studio and client partnership hub.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#8B0D1A]/10 border border-[#8B0D1A]/20 flex items-center justify-center text-[#8B0D1A] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-[#F5F2ED]/60 uppercase">Direct Email</p>
                    <a href="mailto:hello@zansta.dev" className="text-sm font-semibold text-[#F5F2ED] hover:text-[#8B0D1A] transition-colors">
                      hello@zansta.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0E0E0E] border border-white/05">
                  <div className="w-10 h-10 rounded-lg bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#F5F2ED]/60 block uppercase">Direct Hotline</span>
                    <a href="tel:+919876543210" className="text-sm font-semibold text-[#F5F2ED] hover:text-[#8B0D1A] transition-colors font-mono">
                      +91 (800) 987-6543
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0E0E0E] border border-white/05">
                  <div className="w-10 h-10 rounded-lg bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#F5F2ED]/60 block uppercase">Studio Location</span>
                    <span className="text-sm font-semibold text-[#F5F2ED]">Delhi NCR & Bangalore, India</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 flex items-center gap-3">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/05 border border-white/10 text-[#F5F2ED]/60 hover:text-white hover:border-white/30 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/05 border border-white/10 text-[#F5F2ED]/60 hover:text-white hover:border-white/30 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/05 border border-white/10 text-[#F5F2ED]/60 hover:text-white hover:border-white/30 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Professional Enquiry Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2}>
              <Card surfaceTier="100" className="p-8 border border-white/10 relative overflow-hidden shadow-2xl">
                {isSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#8B0D1A]/20 border border-[#8B0D1A]/40 flex items-center justify-center text-[#8B0D1A] mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#F5F2ED] font-display">Enquiry Submitted!</h3>
                    <p className="text-sm text-[#F5F2ED]/60 max-w-md mx-auto font-sans leading-relaxed">
                      Thank you for contacting ZANSTA. Our lead architect will review your project scope and respond within 12 hours.
                    </p>
                    <Button size="sm" variant="outline" onClick={() => setIsSuccess(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#F5F2ED]/80">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Your Name"
                          className="w-full px-4 py-3 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#F5F2ED]/80">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="you@company.com"
                          className="w-full px-4 py-3 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] font-mono placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#F5F2ED]/80">Phone Number (Optional)</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] font-mono placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#F5F2ED]/80">Company / Startup</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                          placeholder="Company Name"
                          className="w-full px-4 py-3 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#F5F2ED]/80">Service Interested In</label>
                        <select
                          value={formData.serviceInterested}
                          onChange={(e) => setFormData((prev) => ({ ...prev, serviceInterested: e.target.value }))}
                          className="w-full px-4 py-3 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
                        >
                          <option value="Full Stack Website Development">Full Stack Web App</option>
                          <option value="Generative AI Tools Development">Generative AI Engine</option>
                          <option value="Frontend Design">Frontend UI/UX Design</option>
                          <option value="App Development">Mobile App Development</option>
                          <option value="Data Analytics with Generative AI">Data Analytics AI</option>
                          <option value="SEO Design & Optimization">SEO & Optimization</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#F5F2ED]/80">Estimated Budget Range</label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                          className="w-full px-4 py-3 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
                        >
                          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                          <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                          <option value="$100,000+">$100,000+</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#F5F2ED]/80">Project Scope / Details *</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="Describe your project, timeline, target audience, and key technical requirements..."
                        className="w-full px-4 py-3 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A] font-sans"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="glow"
                      size="lg"
                      isLoading={isSubmitting}
                      leftIcon={<Send className="w-4 h-4" />}
                      className="w-full text-xs font-bold"
                    >
                      Send Project Enquiry
                    </Button>
                  </form>
                )}
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
