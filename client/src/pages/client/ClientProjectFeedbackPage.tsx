import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAgencyStore } from '@/store/useAgencyStore';
import { MessageSquare, ArrowLeft, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const ClientProjectFeedbackPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = id || 'caresprint';
  const { feedbacks, isLoading, fetchFeedback, submitFeedback } = useAgencyStore();

  const [message, setMessage] = useState('');
  const [clientName, setClientName] = useState('Dr. Arthur Pendelton');
  const [clientEmail, setClientEmail] = useState('arthur@telehealth.com');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    fetchFeedback(projectId);
  }, [projectId, fetchFeedback]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSubmitting(true);
    const success = await submitFeedback(projectId, clientName, clientEmail, message);
    setIsSubmitting(false);
    if (success) {
      setMessage('');
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <Link to={`/client/projects/${projectId}`} className="inline-flex items-center gap-2 text-xs font-mono text-[#F5F2ED]/55 hover:text-[#8B0D1A]">
          <ArrowLeft className="w-4 h-4" /> Back to Project Overview
        </Link>

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h1 className="text-2xl font-black text-[#F5F2ED] font-display">SUBMIT CLIENT FEEDBACK</h1>
            <p className="text-xs text-[#F5F2ED]/55 font-sans mt-1">
              Send comments, feature requests, or build approvals directly to the NEXORA engineering leads.
            </p>
          </div>
          <Badge variant="crimson" size="md" className="gap-1">
            <MessageSquare className="w-3.5 h-3.5" /> CareSprint
          </Badge>
        </div>
      </div>

      {/* Feedback Submission Form */}
      <Card surfaceTier="100" className="p-6 border border-white/10 space-y-4">
        {successMsg && (
          <div className="p-3 rounded-xl bg-[#8B0D1A]/10 border border-[#F5F2ED]/20/20 text-xs text-[#F5F2ED]/70 font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Feedback submitted successfully! The engineering team has been notified.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Your Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Email Address</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F2ED]/80">Feedback / Request Message</label>
            <textarea
              rows={4}
              placeholder="Describe your feedback, feature adjustment, or sprint approval notes..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-[#121212] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder-slate-500 focus:outline-none focus:border-[#8B0D1A]"
              required
            />
          </div>

          <Button
            type="submit"
            variant="glow"
            size="md"
            isLoading={isSubmitting}
            rightIcon={<Send className="w-4 h-4" />}
            className="text-xs font-bold"
          >
            Submit Feedback
          </Button>
        </form>
      </Card>

      {/* Feedback History Timeline */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-[#F5F2ED] font-display">Feedback History Timeline</h2>

        {isLoading ? (
          <div className="p-8 text-center text-[#F5F2ED]/55 font-mono text-xs">Loading feedback history...</div>
        ) : feedbacks.length === 0 ? (
          <div className="p-8 text-center text-[#F5F2ED]/35 font-mono text-xs">No feedback submitted yet.</div>
        ) : (
          <div className="space-y-3">
            {feedbacks.map((fb) => (
              <Card key={fb.id} surfaceTier="100" className="p-4 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#F5F2ED] font-sans">{fb.clientName}</span>
                    <Badge
                      variant={fb.status === 'RESOLVED' ? 'active' : fb.status === 'REVIEWING' ? 'crimson' : 'neutral'}
                      size="sm"
                    >
                      {fb.status}
                    </Badge>
                  </div>
                  <span className="text-[10px] font-mono text-[#F5F2ED]/35">{new Date(fb.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-[#F5F2ED]/80 font-sans leading-relaxed">{fb.message}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
