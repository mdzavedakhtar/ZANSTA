import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FolderDown, Upload, FileText, Download } from 'lucide-react';

const mockFiles = [
  { id: 'f1', name: 'caresprint_architecture_v2.pdf', size: '4.2 MB', type: 'PDF', uploader: 'MD Zaved Akhtar', date: '2026-02-10' },
  { id: 'f2', name: 'neurostack_dataset_sample.json', size: '1.8 MB', type: 'JSON', uploader: 'Aman Deep', date: '2026-02-12' },
  { id: 'f3', name: 'nexora_ui_kit_assets.zip', size: '18.5 MB', type: 'ZIP', uploader: 'Rahul Sharma', date: '2026-02-15' },
];

export const WorkspaceFilesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F5F2ED] tracking-tight font-display">
            PROJECT FILES & ASSETS
          </h1>
          <p className="text-xs text-[#F5F2ED]/55">Upload, download, and manage specs, ZIPs, PDFs, and wireframes</p>
        </div>
        <Button size="sm" variant="glow" leftIcon={<Upload className="w-3.5 h-3.5" />}>
          Upload File
        </Button>
      </div>

      <div className="space-y-3">
        {mockFiles.map((file) => (
          <Card key={file.id} surfaceTier="100" className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 flex items-center justify-center text-[#8B0D1A]">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#F5F2ED] font-mono">{file.name}</h3>
                <p className="text-[11px] text-[#F5F2ED]/35 font-mono">
                  {file.size} • Uploaded by {file.uploader} on {file.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="neutral" size="sm">
                {file.type}
              </Badge>
              <Button size="sm" variant="ghost" rightIcon={<Download className="w-3.5 h-3.5" />}>
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
