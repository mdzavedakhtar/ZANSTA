import React, { useRef, useState } from 'react';
import { Upload, X, RefreshCw, Image as ImageIcon, Eye, Link2, Sparkles, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { compressImage, CompressionResult } from '@/lib/imageCompressor';

interface MediaUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'avatar';
  className?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  value,
  onChange,
  label = 'Image Asset',
  helperText = 'Supports PNG, JPG, JPEG, WEBP (Auto-optimized to ~80KB)',
  aspectRatio = 'wide',
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compressionInfo, setCompressionInfo] = useState<CompressionResult | null>(null);
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[16/9]',
    avatar: 'w-24 h-24 rounded-full',
  }[aspectRatio];

  const handleFile = async (file: File) => {
    setError(null);
    if (!file.type.match(/^image\/(png|jpe?g|webp|gif|svg\+xml)$/)) {
      setError('Invalid file format. Please upload a valid image file (PNG, JPG, WEBP, SVG).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError('File size exceeds 15MB limit.');
      return;
    }

    setIsCompressing(true);
    try {
      const result = await compressImage(file, {
        maxWidth: 1400,
        maxHeight: 1400,
        quality: 0.8,
      });
      setCompressionInfo(result);
      onChange(result.dataUrl);
    } catch (err: any) {
      console.error('Image compression error:', err);
      setError('Failed to process image. Please try a different image or enter URL.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setIsUrlMode(false);
    setUrlInput('');
    setCompressionInfo(null);
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        {label && <label className="text-xs font-mono text-[#F5F2ED]/80 block">{label}</label>}
        <div className="flex items-center gap-2">
          {!value && (
            <button
              type="button"
              onClick={() => setIsUrlMode(!isUrlMode)}
              className="text-[11px] font-mono text-[#8B0D1A] hover:text-[#ff4d61] flex items-center gap-1 transition-colors"
            >
              <Link2 className="w-3 h-3" />
              <span>{isUrlMode ? 'Switch to Upload' : 'Paste Image URL'}</span>
            </button>
          )}
        </div>
      </div>

      {value ? (
        <div className="space-y-1.5">
          <div className={cn('relative rounded-xl overflow-hidden border border-white/15 bg-[#0E0E0E] group', aspectClasses)}>
            <img
              src={value}
              alt="Uploaded preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                title="View Image"
              >
                <Eye className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                title="Replace Image"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setCompressionInfo(null);
                }}
                className="p-2 rounded-lg bg-[#8B0D1A]/30 text-[#F5F2ED] hover:bg-[#8B0D1A]/50 transition-colors"
                title="Remove Image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {compressionInfo && (
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <Sparkles className="w-3 h-3" />
              <span>
                Compressed from {compressionInfo.originalSizeFormatted} to {compressionInfo.compressedSizeFormatted} ({compressionInfo.savingsPercent}% saved)
              </span>
            </div>
          )}
        </div>
      ) : isUrlMode ? (
        <form onSubmit={handleApplyUrl} className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://images.unsplash.com/... or image link"
            className="flex-1 px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A]"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#8B0D1A] hover:bg-[#a11120] text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            Apply
          </button>
        </form>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !isCompressing && fileInputRef.current?.click()}
          className={cn(
            'border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-[#0E0E0E]/50',
            isDragging ? 'border-[#8B0D1A] bg-[#8B0D1A]/10' : 'border-white/10 hover:border-white/25 hover:bg-[#0E0E0E]',
            isCompressing && 'opacity-70 pointer-events-none'
          )}
        >
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F5F2ED]/60 mb-2">
            {isCompressing ? <Loader2 className="w-5 h-5 animate-spin text-[#8B0D1A]" /> : <ImageIcon className="w-5 h-5" />}
          </div>
          <p className="text-xs font-semibold text-[#F5F2ED]">
            {isCompressing ? 'Compressing & optimizing image...' : 'Click to upload or drag & drop image'}
          </p>
          <p className="text-[10px] text-[#F5F2ED]/45 mt-1 font-mono">{helperText}</p>
        </div>
      )}

      {error && <p className="text-[11px] font-mono text-[#8B0D1A] mt-1">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
        className="hidden"
      />
    </div>
  );
};
