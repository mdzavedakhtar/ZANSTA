import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { usePublicProjectStore } from '@/store/usePublicProjectStore';
import {
  Link2,
  X,
  Copy,
  Check,
  Lock,
  Clock,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface ModalProps {
  projectId: string;
  projectName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const GenerateClientLinkModal: React.FC<ModalProps> = ({
  projectId,
  projectName,
  isOpen,
  onClose
}) => {
  const { generateClientLink } = usePublicProjectStore();

  const [passcode, setPasscode] = useState('');
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    const link = await generateClientLink(projectId, passcode, expiresInDays);
    setIsGenerating(false);
    if (link) {
      setGeneratedUrl(link.url);
    }
  };

  const handleCopy = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg bg-[#0E0E0E] border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl relative"
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-[#8B0D1A]" />
            <h3 className="text-lg font-extrabold text-[#F5F2ED] font-display">GENERATE CLIENT DEMO LINK</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!generatedUrl ? (
          <form onSubmit={handleGenerate} className="space-y-4">
            <p className="text-xs text-[#F5F2ED]/55 font-sans leading-relaxed">
              Create a secure presentation link for <strong className="text-[#F5F2ED]">{projectName}</strong>. Clients can view progress, feature highlights, and launch live demos without accessing internal workspace settings.
            </p>

            {/* Optional Passcode Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#F5F2ED]/60" /> Optional Access Passcode
              </label>
              <input
                type="text"
                placeholder="Leave blank for public link..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder-slate-500 focus:outline-none focus:border-[#8B0D1A] font-mono"
              />
            </div>

            {/* Expiration Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8B0D1A]" /> Link Expiration
              </label>
              <select
                value={expiresInDays}
                onChange={(e) => setExpiresInDays(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-mono cursor-pointer"
              >
                <option value={7} className="bg-[#121212] text-[#F5F2ED]">7 Days Expiry</option>
                <option value={30} className="bg-[#121212] text-[#F5F2ED]">30 Days Expiry</option>
                <option value={90} className="bg-[#121212] text-[#F5F2ED]">90 Days Expiry</option>
                <option value={0} className="bg-[#121212] text-[#F5F2ED]">Never Expire</option>
              </select>
            </div>

            <Button
              type="submit"
              variant="glow"
              size="md"
              isLoading={isGenerating}
              className="w-full text-xs font-bold"
            >
              Generate Shareable Link
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-[#8B0D1A]/10 border border-[#F5F2ED]/20/20 text-xs text-[#F5F2ED]/70 font-mono flex items-center gap-2">
              <Check className="w-4 h-4" /> Client link generated successfully!
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Shareable Client Link</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedUrl}
                  className="w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-xl text-xs text-[#8B0D1A] font-mono select-all focus:outline-none"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="shrink-0 text-xs gap-1"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-[#F5F2ED]/70" /> : <Copy className="w-3.5 h-3.5 text-[#8B0D1A]" />}
                  {isCopied ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a
                href={generatedUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-[#8B0D1A] hover:underline flex items-center gap-1"
              >
                Preview Link <ExternalLink className="w-3 h-3" />
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setGeneratedUrl(null)}
                className="text-xs"
              >
                Create Another
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
