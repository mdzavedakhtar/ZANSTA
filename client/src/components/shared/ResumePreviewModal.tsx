import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, Printer, CheckCircle2 } from 'lucide-react';
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
  memberName,
  memberRole,
}) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

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
          className="relative w-full max-w-5xl h-[90vh] bg-[#0c0d12] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Top Header Bar */}
          <div className="px-6 py-4 bg-[#12131a] border-b border-white/10 flex items-center justify-between gap-4 shrink-0">
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

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => downloadResumeDocument(resumeUrl, fileName)}
                className="px-3.5 py-2 rounded-xl bg-[#8B0D1A] hover:bg-[#a31222] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-[#8B0D1A]/20 cursor-pointer"
                title="Download Resume PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
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

          {/* Document Viewer Frame */}
          <div className="flex-1 bg-[#181920] relative">
            {blobUrl ? (
              <iframe
                src={`${blobUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title={displayTitle}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                <FileText className="w-12 h-12 text-[#8B0D1A]/60" />
                <p className="text-sm text-[#F5F2ED]/60">Document is ready for viewing.</p>
                <button
                  type="button"
                  onClick={() => downloadResumeDocument(resumeUrl, fileName)}
                  className="px-5 py-2.5 rounded-xl bg-[#8B0D1A] hover:bg-[#a31222] text-white text-xs font-bold transition-all"
                >
                  Download {fileName}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
