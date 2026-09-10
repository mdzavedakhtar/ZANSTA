import React, { useRef, useState } from 'react';
import { Upload, X, RefreshCw, Image as ImageIcon, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

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
  helperText = 'Supports PNG, JPG, JPEG, WEBP (Max 5MB)',
  aspectRatio = 'wide',
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[16/9]',
    avatar: 'w-24 h-24 rounded-full',
  }[aspectRatio];

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.match(/^image\/(png|jpe?g|webp|gif|svg\+xml)$/)) {
      setError('Invalid file format. Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && <label className="text-xs font-mono text-[#F5F2ED]/80 block">{label}</label>}

      {value ? (
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
              onClick={() => onChange('')}
              className="p-2 rounded-lg bg-[#8B0D1A]/30 text-[#F5F2ED] hover:bg-[#8B0D1A]/50 transition-colors"
              title="Remove Image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-[#0E0E0E]/50',
            isDragging ? 'border-[#8B0D1A] bg-[#8B0D1A]/10' : 'border-white/10 hover:border-white/25 hover:bg-[#0E0E0E]'
          )}
        >
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F5F2ED]/60 mb-2">
            <ImageIcon className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-[#F5F2ED]">
            Click to upload or drag & drop image
          </p>
          <p className="text-[10px] text-[#F5F2ED]/45 mt-1 font-mono">{helperText}</p>
        </div>
      )}

      {error && <p className="text-[11px] font-mono text-[#8B0D1A] mt-1">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
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
