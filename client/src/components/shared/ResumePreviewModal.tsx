import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  CheckCircle2,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Code2,
} from 'lucide-react';
import { getDocumentBlob, openResumeDocument, downloadResumeDocument } from '@/lib/documentViewer';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl?: string;
  fileName?: string;
  memberName?: string;
  memberRole?: string;
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({
  isOpen,
  onClose,
  resumeUrl,
  fileName = 'Resume.pdf',
  memberName = 'MD Zaved Akhtar',
  memberRole = 'Full-Stack, AI & Data Analytics Engineer',
}) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pdf' | 'interactive'>('pdf');

  useEffect(() => {
    if (!resumeUrl || !isOpen) {
      setBlobUrl(null);
      return;
    }

    if (resumeUrl.startsWith('data:') || resumeUrl.startsWith('blob:')) {
      const doc = getDocumentBlob(resumeUrl);
      if (doc) {
        setBlobUrl(doc.blobUrl);
      } else {
        setBlobUrl(resumeUrl);
      }
    } else {
      setBlobUrl(resumeUrl);
    }
  }, [resumeUrl, isOpen]);

  if (!isOpen || !resumeUrl) return null;

  const displayTitle = memberName ? `${memberName}'s Resume` : fileName;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-5xl h-[90vh] bg-[#0b0c10] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Top Header Bar */}
          <div className="px-5 py-3.5 bg-[#12131a] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#8B0D1A]/20 border border-[#8B0D1A]/30 flex items-center justify-center text-[#ff4d61] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white truncate">{displayTitle}</h3>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                    <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED CV
                  </span>
                </div>
                {memberRole && (
                  <p className="text-xs text-[#F5F2ED]/50 font-mono truncate">{memberRole}</p>
                )}
              </div>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-black/40 border border-white/10 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeTab === 'pdf'
                    ? 'bg-[#8B0D1A] text-white shadow-md'
                    : 'text-[#F5F2ED]/60 hover:text-white'
                }`}
              >
                PDF View
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('interactive')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeTab === 'interactive'
                    ? 'bg-[#8B0D1A] text-white shadow-md'
                    : 'text-[#F5F2ED]/60 hover:text-white'
                }`}
              >
                Formatted CV
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => downloadResumeDocument(resumeUrl, fileName)}
                className="px-3.5 py-2 rounded-xl bg-[#8B0D1A] hover:bg-[#a31222] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-[#8B0D1A]/20 cursor-pointer"
                title="Download Resume PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>

              <button
                type="button"
                onClick={() => openResumeDocument(resumeUrl, fileName)}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Open in Dedicated Tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Full Tab</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Document Content Body */}
          <div className="flex-1 bg-[#14151d] relative overflow-y-auto custom-scrollbar">
            {activeTab === 'pdf' ? (
              <div className="w-full h-full relative">
                {blobUrl ? (
                  <object
                    data={`${blobUrl}#toolbar=1&navpanes=0`}
                    type="application/pdf"
                    className="w-full h-full min-h-[500px]"
                  >
                    <iframe
                      src={`${blobUrl}#toolbar=1&navpanes=0`}
                      className="w-full h-full border-0"
                      title={displayTitle}
                    />
                  </object>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                    <FileText className="w-12 h-12 text-[#8B0D1A]/60" />
                    <p className="text-sm text-[#F5F2ED]/60">Document is ready for download.</p>
                    <button
                      type="button"
                      onClick={() => downloadResumeDocument(resumeUrl, fileName)}
                      className="px-5 py-2.5 rounded-xl bg-[#8B0D1A] hover:bg-[#a31222] text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Download {fileName}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Rich Interactive CV View */
              <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 text-[#F5F2ED]">
                {/* CV Header */}
                <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
                      MD ZAVED AKHTAR
                    </h1>
                    <p className="text-sm text-[#ff4d61] font-mono mt-1 font-semibold">
                      Full-Stack, Generative AI & Data Analytics Engineer
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#F5F2ED]/70 font-mono">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <a href="mailto:mdzavedakhtar62@gmail.com" className="hover:text-white hover:underline">
                        mdzavedakhtar62@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <a href="tel:+916202888431" className="hover:text-white hover:underline">
                        +91 6202888431
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-primary-400" />
                      <span>Bhilai, Durg, Chhattisgarh 490023</span>
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#ff4d61] font-bold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" /> Professional Summary
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F5F2ED]/75 leading-relaxed bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    High-impact Full-Stack & Generative AI Engineer with 3+ years of experience engineering production-grade RAG document intelligence platforms, real-time WebSocket workspaces, and enterprise Next.js / MERN microservices. Proficient in Python, SQL, Power BI analytics, Vector databases (Pinecone, Neo4j), and high-converting modern web interfaces.
                  </p>
                </div>

                {/* Technical Skills */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#ff4d61] font-bold flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5" /> Core Technical Expertise
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white/[0.03] border border-white/05 rounded-xl p-3.5 space-y-2">
                      <h4 className="text-xs font-bold text-white font-mono">Full-Stack Web</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {['React 18', 'Next.js', 'Node.js', 'Express', 'TypeScript', 'TailwindCSS'].map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#F5F2ED]/70 border border-white/10">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/05 rounded-xl p-3.5 space-y-2">
                      <h4 className="text-xs font-bold text-white font-mono">Generative AI & RAG</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {['Generative AI', 'RAG Pipelines', 'LangChain', 'Pinecone', 'Neo4j', 'OpenAI/Gemini'].map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#F5F2ED]/70 border border-white/10">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/05 rounded-xl p-3.5 space-y-2">
                      <h4 className="text-xs font-bold text-white font-mono">Data Analytics & Cloud</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {['Python', 'SQL', 'MongoDB Atlas', 'Power BI', 'DAX', 'Docker', 'Azure AI'].map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#F5F2ED]/70 border border-white/10">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Projects */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#ff4d61] font-bold flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5" /> Featured Production Projects
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white/[0.02] border border-white/05 rounded-xl p-4 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-white">1. ZANSTA Platform - Next-Gen Workspace & Agency Engine</h4>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">LIVE</span>
                      </div>
                      <p className="text-xs text-[#F5F2ED]/65 leading-relaxed">
                        Engineered multi-tenant developer workspace with real-time Socket.IO sync, CMS CRUD, lead generation pipelines, and sub-50ms MongoDB query response.
                      </p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/05 rounded-xl p-4 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-white">2. CareSprint AI - Telehealth & RAG Medical Consultation Portal</h4>
                        <span className="text-[10px] font-mono text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded border border-primary-500/20">PRODUCTION</span>
                      </div>
                      <p className="text-xs text-[#F5F2ED]/65 leading-relaxed">
                        Architected WebRTC video consultation mesh with sub-100ms signaling latency, HIPAA-compliant AES-256 encrypted records, and AI document summary engine.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certifications & Education */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/[0.02] border border-white/05 rounded-xl p-4 space-y-2">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#ff4d61] font-bold flex items-center gap-2">
                      <Award className="w-3.5 h-3.5" /> Certifications
                    </h3>
                    <ul className="text-xs text-[#F5F2ED]/70 space-y-1.5">
                      <li>• Microsoft Certified: Azure AI Fundamentals (AI-900)</li>
                      <li>• Govt. of India MSME Udyam Verified Enterprise (UDYAM-CG-02-0018924)</li>
                      <li>• MSME Certified: Data Analytics & Full-Stack Application Specialist</li>
                    </ul>
                  </div>

                  <div className="bg-white/[0.02] border border-white/05 rounded-xl p-4 space-y-2">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#ff4d61] font-bold flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5" /> Education
                    </h3>
                    <div className="text-xs text-[#F5F2ED]/70 space-y-1">
                      <p className="font-semibold text-white">B.Tech in Computer Science & Engineering</p>
                      <p className="text-[11px] text-[#F5F2ED]/50">CSVTU University, Bhilai, Chhattisgarh</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
