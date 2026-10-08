import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { ScrollReveal } from '../motion/ScrollReveal';
import { Mail, Phone, MapPin, Send, CheckCircle2, Linkedin, Github } from 'lucide-react';
import { enquiryService } from '@/services/enquiryService';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceInterested: 'Full Stack Website Development',
    budget: '₹25,000 - ₹50,000',
    message: '',
  });

  const [customBudget, setCustomBudget] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const finalBudget =
      formData.budget === 'Other'
        ? customBudget.trim()
          ? customBudget.startsWith('₹')
            ? customBudget
            : `₹${customBudget}`
          : 'Custom Budget (₹)'
        : formData.budget;

    setIsSubmitting(true);
    await enquiryService.createEnquiry({
      ...formData,
      budget: finalBudget,
    });
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      serviceInterested: 'Full Stack Website Development',
      budget: '₹25,000 - ₹50,000',
      message: '',
    });
    setCustomBudget('');
  };

  return (
    <section id="contact" className="py-28 lg:py-36 bg-[#050508] border-b border-white/[0.08] relative">
      <Container size="xl">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-wider">
            GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight font-display text-white">
            LET'S BUILD SOMETHING GREAT.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
            Ready to engineer your next software breakthrough? Reach out to our team directly.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal className="space-y-6">
              <h3 className="text-2xl font-semibold text-white font-display">ZANSTA HEADQUARTERS</h3>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Our main engineering studio and client partnership hub.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0c0d12] border border-white/[0.08]">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-zinc-400 uppercase">Direct Email</p>
                    <a href="mailto:zanstacom@gmail.com" className="text-sm font-semibold text-white hover:text-white/80 transition-colors">
                      zanstacom@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0c0d12] border border-white/[0.08]">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block uppercase">Direct Hotlines</span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <a href="tel:+916202888431" className="text-sm font-semibold text-white hover:text-white/80 transition-colors font-mono">
                        +91 6202888431
                      </a>
                      <span className="text-zinc-600">•</span>
                      <a href="tel:+916287786639" className="text-sm font-semibold text-white hover:text-white/80 transition-colors font-mono">
                        +91 6287786639
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0c0d12] border border-white/[0.08]">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block uppercase">Studio Location</span>
                    <span className="text-sm font-semibold text-white">Bhilai, Kohka, Durg, Chhattisgarh 490023</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 flex items-center gap-3">
                <a href="https://www.linkedin.com/in/md-zaved-akhtar-22013828b" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://github.com/mdzavedakhtar" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
                <a href="mailto:zanstacom@gmail.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Professional Enquiry Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2}>
              <div className="p-8 sm:p-10 bg-[#0c0d12] border border-white/[0.08] rounded-3xl relative overflow-hidden shadow-2xl">
                {/* Ambient Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#3b0764]/20 via-[#8B0D1A]/10 to-transparent blur-3xl pointer-events-none" />

                {isSuccess ? (
                  <div className="py-12 text-center space-y-4 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white font-display">Enquiry Submitted!</h3>
                    <p className="text-sm text-zinc-400 max-w-md mx-auto font-sans leading-relaxed">
                      Thank you for contacting ZANSTA. Our lead architect will review your project scope and respond within 2-4 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="py-2.5 px-6 rounded-full bg-white/10 border border-white/15 text-white text-xs font-medium hover:bg-white/20 transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-300">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Your Name"
                          className="w-full px-4 py-3 bg-[#13141f] border border-white/[0.08] focus:border-white/30 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-300">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="you@company.com"
                          className="w-full px-4 py-3 bg-[#13141f] border border-white/[0.08] focus:border-white/30 rounded-xl text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-300">Phone Number (Optional)</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter your phone number"
                          className="w-full px-4 py-3 bg-[#13141f] border border-white/[0.08] focus:border-white/30 rounded-xl text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-300">Company / Startup</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                          placeholder="Company Name"
                          className="w-full px-4 py-3 bg-[#13141f] border border-white/[0.08] focus:border-white/30 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-300">Service Interested In</label>
                        <select
                          value={formData.serviceInterested}
                          onChange={(e) => setFormData((prev) => ({ ...prev, serviceInterested: e.target.value }))}
                          className="w-full px-4 py-3 bg-[#13141f] border border-white/[0.08] focus:border-white/30 rounded-xl text-xs text-white focus:outline-none font-mono cursor-pointer transition-all"
                        >
                          <option value="Full Stack Website Development">Full Stack Web App</option>
                          <option value="Generative AI Tools Development">Generative AI Engine</option>
                          <option value="Frontend Design">Frontend UI/UX Design</option>
                          <option value="App Development">Mobile App Development</option>
                          <option value="Data Analytics with Generative AI">Data Analytics AI</option>
                          <option value="SEO Design & Optimization">SEO &amp; Optimization</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-300">Estimated Budget Range (INR ₹)</label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                          className="w-full px-4 py-3 bg-[#13141f] border border-white/[0.08] focus:border-white/30 rounded-xl text-xs text-white focus:outline-none font-mono cursor-pointer transition-all"
                        >
                          <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                          <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                          <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                          <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000</option>
                          <option value="₹5,00,000+">₹5,00,000+</option>
                          <option value="Other">Other / Custom Budget (₹)</option>
                        </select>
                      </div>
                    </div>

                    {/* Dynamic Custom Budget Input Field if "Other" is selected */}
                    {formData.budget === 'Other' && (
                      <div className="space-y-2 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.12] transition-all">
                        <label className="text-xs font-mono text-zinc-300 flex items-center justify-between">
                          <span>Enter Your Custom Budget Amount *</span>
                          <span className="text-[10px] text-emerald-400 font-semibold uppercase font-mono">Indian Rupees (₹)</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400 font-mono font-bold">₹</span>
                          <input
                            type="text"
                            required
                            value={customBudget}
                            onChange={(e) => setCustomBudget(e.target.value)}
                            placeholder="e.g. 75,000 or 3,50,000"
                            className="w-full pl-9 pr-4 py-3 bg-[#13141f] border border-white/[0.12] focus:border-white/40 rounded-xl text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-300">Project Scope / Details *</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="Describe your project, timeline, target audience, and key technical requirements..."
                        className="w-full px-4 py-3 bg-[#13141f] border border-white/[0.08] focus:border-white/30 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none font-sans transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-xl"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Sending...' : 'Send Project Enquiry'}</span>
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
