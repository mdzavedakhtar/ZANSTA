import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useProjectStore } from '@/store/useProjectStore';
import { useToast } from '@/components/ui/Toast';
import { FolderDown, Upload, FileText, Download, Trash2, Search, AlertCircle } from 'lucide-react';

const ALLOWED_EXTENSIONS = ['ZIP', 'PDF', 'DOCX', 'PPTX', 'PNG', 'JPG', 'WEBP', 'MP4', 'APK'];

export const ProjectFilesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { files, fetchFiles, uploadFile, deleteFile } = useProjectStore();
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSizeMB, setFileSizeMB] = useState('4.5');

  const projectId = id || 'caresprint';

  useEffect(() => {
    fetchFiles(projectId);
  }, [projectId]);

  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.extension.toLowerCase().includes(search.toLowerCase())
  );

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    const ext = fileName.split('.').pop()?.toUpperCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      toast(`Invalid file format .${ext}. Allowed formats: ${ALLOWED_EXTENSIONS.join(', ')}`, 'error');
      return;
    }

    try {
      const bytes = Math.round(parseFloat(fileSizeMB) * 1024 * 1024);
      await uploadFile(projectId, fileName, bytes);
      toast('File uploaded successfully!', 'success');
      setUploadModalOpen(false);
      setFileName('');
    } catch (error: any) {
      toast(error.message || 'Upload failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <FolderDown className="w-5 h-5 text-[#8B0D1A]" />
          <h2 className="text-xl font-extrabold text-[#F5F2ED] font-display">PROJECT FILE STORAGE</h2>
        </div>

        <Button
          size="sm"
          variant="glow"
          onClick={() => setUploadModalOpen(true)}
          leftIcon={<Upload className="w-3.5 h-3.5" />}
        >
          Upload Asset
        </Button>
      </div>

      {/* Allowed Types Banner */}
      <div className="p-3 bg-[#121212] border border-white/5 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <span className="text-[#F5F2ED]/55">SUPPORTED FORMATS:</span>
        <div className="flex flex-wrap gap-1.5">
          {ALLOWED_EXTENSIONS.map((ext) => (
            <Badge key={ext} variant="neutral" size="sm">
              .{ext.toLowerCase()}
            </Badge>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="w-full max-w-sm">
        <Input
          placeholder="Filter files by name or extension..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-[#F5F2ED]/35" />}
        />
      </div>

      {/* Files List */}
      <div className="space-y-3">
        {filteredFiles.length === 0 ? (
          <Card surfaceTier="100" className="p-8 text-center text-xs text-[#F5F2ED]/35 font-mono">
            No file assets matching query.
          </Card>
        ) : (
          filteredFiles.map((file) => (
            <Card key={file.id} surfaceTier="100" className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 flex items-center justify-center text-[#8B0D1A] shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-sm font-bold text-[#F5F2ED] font-mono truncate">{file.name}</h3>
                  <p className="text-[11px] text-[#F5F2ED]/35 font-mono truncate">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • Uploaded by {file.uploadedBy}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="crimson" size="sm">
                  {file.extension}
                </Badge>
                <a href={file.url} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="ghost" rightIcon={<Download className="w-3.5 h-3.5" />}>
                    Download
                  </Button>
                </a>
                <button
                  onClick={() => {
                    deleteFile(file.id);
                    toast('File deleted', 'info');
                  }}
                  className="p-1.5 text-[#F5F2ED]/35 hover:text-[#8B0D1A] hover:bg-[#8B0D1A]/10 rounded-lg transition-colors cursor-pointer"
                  title="Delete File"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* File Upload Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Project Asset"
        description="Supported file extensions: ZIP, PDF, DOCX, PPTX, PNG, JPG, WEBP, MP4, APK."
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4 pt-2">
          <Input
            label="File Name (with extension)"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="e.g. caresprint_mobile_build.apk"
            required
          />

          <Input
            label="Simulated File Size (MB)"
            type="number"
            value={fileSizeMB}
            onChange={(e) => setFileSizeMB(e.target.value)}
            placeholder="4.5"
            required
          />

          <Button type="submit" size="md" variant="glow" className="w-full">
            Confirm Upload
          </Button>
        </form>
      </Modal>
    </div>
  );
};
