import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useAgencyStore } from '@/store/useAgencyStore';
import { Sparkles, X, CheckCircle2, Send, Building2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectType?: string;
}

export const ProjectRequestModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  initialProjectType = 'Web Development'
}) => {
  const { submitProjectRequest } = useAgencyStore();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialProjectType || 'Web Development');
  const [budget, setBudget] = useState('$15k-$50k');
  const [timeline, setTimeline] = useState('1-2 Months');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !description) return;

    setIsSubmitting(true);
    const success = await submitProjectRequest({
      name,
      company,
      email,
      projectType,
      budget,
      timeline,
      description,
      requirements
    });
    setIsSubmitting(false);

    if (success) {
      setSubmittedSuccess(true);
    }
  };

  const projectTypes = [
    'Web Development',
    'Mobile Development',
    'AI Solutions',
    'SaaS Development',
    'UI/UX Design',
    'Automation & DevOps'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-xl bg-[#0E0E0E] border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl relative my-8"
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8B0D1A]" />
            <h3 className="text-lg font-extrabold text-[#F5F2ED] font-display">START A PROJECT WITH ZANSTA</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="space-y-4 text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#8B0D1A]/10 border border-[#F5F2ED]/20/20 text-[#F5F2ED]/70 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-[#F5F2ED] font-display">Inquiry Received!</h4>
              <p className="text-xs text-[#F5F2ED]/80 font-sans max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to ZANSTA. An agency partner will review your project brief and deliver a tailored proposal within 24 hours.
              </p>
            </div>
            <Button variant="glow" size="md" onClick={onClose} className="text-xs">
              Close Window
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#F5F2ED]/80">Your Full Name *</label>
                <input
                  type="text"
                  placeholder="MD Zaved Akhtar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#F5F2ED]/80">Company / Organization</label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#F5F2ED]/80">Email Address *</label>
                <input
                  type="email"
                  placeholder="sahil@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#F5F2ED]/80">Project Type *</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] cursor-pointer"
                >
                  {projectTypes.map((t) => (
                    <option key={t} value={t} className="bg-[#121212] text-[#F5F2ED]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#F5F2ED]/80">Target Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] cursor-pointer"
                >
                  <option value="$5k-$15k" className="bg-[#121212] text-[#F5F2ED]">$5,000 - $15,000</option>
                  <option value="$15k-$50k" className="bg-[#121212] text-[#F5F2ED]">$15,000 - $50,000</option>
                  <option value="$50k+" className="bg-[#121212] text-[#F5F2ED]">$50,000+</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#F5F2ED]/80">Expected Timeline</label>
                <input
                  type="text"
                  placeholder="e.g. 1-2 Months"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[#F5F2ED]/80">Project Description *</label>
              <textarea
                rows={3}
                placeholder="Describe your vision, core features, target users, and key objectives..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-[#121212] border border-white/10 rounded-xl text-[#F5F2ED] placeholder-slate-500 focus:outline-none focus:border-[#8B0D1A] font-sans"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#F5F2ED]/80">Technical Requirements (Optional)</label>
              <input
                type="text"
                placeholder="e.g. React 18, WebRTC, HIPAA encryption, Stripe"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>

            <Button
              type="submit"
              variant="glow"
              size="md"
              isLoading={isSubmitting}
              rightIcon={<Send className="w-4 h-4" />}
              className="w-full font-bold pt-2"
            >
              Submit Project Inquiry
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
