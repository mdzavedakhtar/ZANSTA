import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useProjectStore, ProjectStatus, ProjectVisibility } from '@/store/useProjectStore';
import { useToast } from '@/components/ui/Toast';
import { Save, Trash2, Github, ExternalLink } from 'lucide-react';

export const ProjectSettingsPage: React.FC = () => {
  const { currentProject } = useProjectStore();
  const { toast } = useToast();

  const [name, setName] = useState(currentProject?.name || 'CareSprint');
  const [status, setStatus] = useState<ProjectStatus>(currentProject?.status || 'DEVELOPMENT');
  const [visibility, setVisibility] = useState<ProjectVisibility>(currentProject?.visibility || 'PUBLIC');
  const [repoUrl, setRepoUrl] = useState(currentProject?.repoUrl || 'https://github.com/zansta/caresprint');
  const [demoUrl, setDemoUrl] = useState(currentProject?.demoUrl || 'https://caresprint.example.com');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Project settings saved successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <Card surfaceTier="200" className="p-8 space-y-6">
        <h2 className="text-xl font-extrabold text-[#F5F2ED] font-display">PROJECT SETTINGS</h2>

        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Project Name" value={name} onChange={(e) => setName(e.target.value)} required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Project Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              options={[
                { value: 'PLANNING', label: 'PLANNING' },
                { value: 'DEVELOPMENT', label: 'DEVELOPMENT' },
                { value: 'TESTING', label: 'TESTING' },
                { value: 'COMPLETED', label: 'COMPLETED' },
              ]}
            />
            <Select
              label="Visibility Level"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as ProjectVisibility)}
              options={[
                { value: 'PRIVATE', label: 'PRIVATE' },
                { value: 'TEAM_ONLY', label: 'TEAM ONLY' },
                { value: 'PUBLIC', label: 'PUBLIC (Showcase)' },
              ]}
            />
          </div>

          <Input
            label="GitHub Repository URL"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            leftIcon={<Github className="w-4 h-4 text-[#F5F2ED]/35" />}
          />

          <Input
            label="Live Demo URL"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            leftIcon={<ExternalLink className="w-4 h-4 text-[#F5F2ED]/35" />}
          />

          <Button type="submit" size="md" variant="glow" leftIcon={<Save className="w-4 h-4" />}>
            Save Project Settings
          </Button>
        </form>
      </Card>

      <Card surfaceTier="100" className="p-6 border-[#8B0D1A]/30 bg-[#8B0D1A]/[0.02] space-y-3">
        <h3 className="text-sm font-bold text-[#8B0D1A]">Danger Zone</h3>
        <p className="text-xs text-[#F5F2ED]/55">Archive or permanently delete this project workspace.</p>
        <Button size="sm" variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>
          Delete Project
        </Button>
      </Card>
    </div>
  );
};
