import React, { useRef, useState } from 'react';
import { FileText, Upload, X, Eye, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResumePreviewModal } from '@/components/shared/ResumePreviewModal';

interface FileUploaderProps {
  value?: string;
  fileName?: string;
  onChange: (url: string, name: string) => void;
  label?: string;
  helperText?: string;
  accept?: string;
  className?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  value,
  fileName,
  onChange,
  label = 'Resume / Document File',
  helperText = 'PDF, DOC, DOCX up to 10MB',
  accept = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFile = (file: File) => {
    setError(null);
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && <label className="text-xs font-mono text-[#F5F2ED]/80 block">{label}</label>}

      {value ? (
        <div className="p-3 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#ff4d61] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-[#F5F2ED] truncate">{fileName || 'Resume Document'}</p>
              <p className="text-[10px] text-[#F5F2ED]/45 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" /> Uploaded & Ready
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="p-2 rounded-lg bg-white/5 text-[#F5F2ED]/80 hover:text-[#F5F2ED] hover:bg-white/10 transition-colors text-xs flex items-center gap-1 cursor-pointer"
              title="View Resume Preview"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg bg-white/5 text-[#F5F2ED]/80 hover:text-[#F5F2ED] hover:bg-white/10 transition-colors text-xs cursor-pointer"
              title="Replace File"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange('', '')}
              className="p-2 rounded-lg bg-[#8B0D1A]/20 text-[#ff4d61] hover:bg-[#8B0D1A]/40 transition-colors cursor-pointer"
              title="Remove File"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/10 hover:border-white/25 rounded-xl p-4 flex items-center gap-3 cursor-pointer bg-[#0E0E0E]/50 hover:bg-[#0E0E0E] transition-all"
        >
          <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F5F2ED]/60 shrink-0">
            <Upload className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#F5F2ED]">Upload Resume / CV Document</p>
            <p className="text-[10px] font-mono text-[#F5F2ED]/45">{helperText}</p>
          </div>
        </div>
      )}

      {error && <p className="text-[11px] font-mono text-[#ff4d61]">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {/* In-App Resume Preview Modal */}
      {isPreviewOpen && value && (
        <ResumePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          resumeUrl={value}
          fileName={fileName || 'Resume_Document.pdf'}
        />
      )}
    </div>
  );
};
