import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useProjectStore, ProjectStatus, ProjectVisibility } from '@/store/useProjectStore';
import { useToast } from '@/components/ui/Toast';
import { Plus, ArrowRight, FolderGit2, Github, ExternalLink } from 'lucide-react';

export const ProjectCreatePage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Full-Stack Web');
  const [techStackStr, setTechStackStr] = useState('React 18, TypeScript, Node.js, Express, MongoDB');
  const [status, setStatus] = useState<ProjectStatus>('DEVELOPMENT');
  const [visibility, setVisibility] = useState<ProjectVisibility>('TEAM_ONLY');
  const [repoUrl, setRepoUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');

  const { createProject, isLoading } = useProjectStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const techStack = techStackStr.split(',').map((t) => t.trim()).filter(Boolean);
      const proj = await createProject({
        name,
        description,
        category,
        techStack,
        status,
        visibility,
        repoUrl,
        demoUrl,
      });
      toast('Project created successfully!', 'success');
      navigate(`/projects/${proj.slug}/overview`);
    } catch (error: any) {
      toast(error.message || 'Failed to create project', 'error');
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="pb-6 border-b border-white/10">
        <Badge variant="crimson" size="md" className="mb-2">PROJECT WIZARD</Badge>
        <h1 className="text-2xl font-extrabold text-[#F5F2ED] tracking-tight font-display">
          CREATE NEW SOFTWARE PROJECT
        </h1>
        <p className="text-xs text-[#F5F2ED]/55">Initialize a new project workspace for your engineering team</p>
      </div>

      <Card surfaceTier="200" className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. CareSprint Healthcare"
              required
            />
            <Input
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Healthcare SaaS, AI Infrastructure"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-medium text-[#F5F2ED]/80">Project Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the problem, solution, and core features of this digital product..."
              className="w-full bg-[#0E0E0E] text-[#F5F2ED] text-sm rounded-lg border border-white/10 p-3.5 outline-none focus:border-[#8B0D1A]/50"
              required
            />
          </div>

          <Input
            label="Tech Stack (Comma separated)"
            value={techStackStr}
            onChange={(e) => setTechStackStr(e.target.value)}
            placeholder="React, TypeScript, Node.js, Socket.IO, MongoDB"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Initial Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              options={[
                { value: 'PLANNING', label: 'PLANNING (Initial Architecture Scoping)' },
                { value: 'DEVELOPMENT', label: 'DEVELOPMENT (Active Code & Sprints)' },
                { value: 'TESTING', label: 'TESTING (QA & Client Review)' },
                { value: 'COMPLETED', label: 'COMPLETED (Shipped & Showcase Ready)' },
              ]}
            />
            <Select
              label="Visibility Level"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as ProjectVisibility)}
              options={[
                { value: 'TEAM_ONLY', label: 'TEAM ONLY (Workspace Members)' },
                { value: 'PUBLIC', label: 'PUBLIC (Showcase Portfolio)' },
                { value: 'PRIVATE', label: 'PRIVATE (Owner & Admin Only)' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="GitHub Repository URL (Optional)"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/zansta/project"
              leftIcon={<Github className="w-4 h-4 text-[#F5F2ED]/35" />}
            />
            <Input
              label="Live Demo URL (Optional)"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://demo.example.com"
              leftIcon={<ExternalLink className="w-4 h-4 text-[#F5F2ED]/35" />}
            />
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => navigate('/projects')}>
              Cancel
            </Button>
            <Button type="submit" variant="glow" isLoading={isLoading} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Initialize Project Workspace
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
