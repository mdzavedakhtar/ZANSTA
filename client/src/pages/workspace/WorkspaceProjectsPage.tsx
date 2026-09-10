import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Plus, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const workspaceProjects = [
  { id: '1', name: 'CareSprint', category: 'Healthcare', status: 'Active', tasks: 14, repo: 'nexora/caresprint' },
  { id: '2', name: 'NeuroStack', category: 'AI Infrastructure', status: 'Active', tasks: 8, repo: 'nexora/neurostack' },
  { id: '3', name: 'InsightIQ', category: 'Analytics', status: 'Completed', tasks: 22, repo: 'nexora/insightiq' },
];

export const WorkspaceProjectsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F5F2ED] tracking-tight font-display">
            PROJECT WORKSPACES
          </h1>
          <p className="text-xs text-[#F5F2ED]/55">All internal and showcase software projects</p>
        </div>
        <Button size="sm" variant="glow" leftIcon={<Plus className="w-3.5 h-3.5" />}>
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {workspaceProjects.map((p) => (
          <Card key={p.id} surfaceTier="200" glowOnHover className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant={p.status === 'Active' ? 'crimson' : 'active'} size="sm">
                {p.status}
              </Badge>
              <span className="text-[10px] font-mono text-[#F5F2ED]/35">{p.category}</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#F5F2ED]">{p.name}</h3>
              <p className="text-xs text-[#F5F2ED]/55 font-mono mt-1">{p.repo}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-[#F5F2ED]/55">{p.tasks} active tasks</span>
              <Link to={`/projects/${p.name.toLowerCase()}`}>
                <Button size="sm" variant="outline" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                  Workspace
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
