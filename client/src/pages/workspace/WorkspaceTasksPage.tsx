import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckSquare, Plus, Filter } from 'lucide-react';

const mockTasks = [
  { id: 't1', title: 'Implement Socket.IO activity gateway', status: 'IN_PROGRESS', priority: 'HIGH', assignee: 'Aman Deep' },
  { id: 't2', title: 'Design dark mode component system', status: 'DONE', priority: 'HIGH', assignee: 'Rahul Sharma' },
  { id: 't3', title: 'Connect GitHub OAuth & commit stream', status: 'TODO', priority: 'MEDIUM', assignee: 'MD Zaved Akhtar' },
];

export const WorkspaceTasksPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F5F2ED] tracking-tight font-display">
            TASK MANAGEMENT
          </h1>
          <p className="text-xs text-[#F5F2ED]/55">Linear-style PM system for active workspace sprints</p>
        </div>
        <Button size="sm" variant="glow" leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Create Task
        </Button>
      </div>

      <div className="space-y-3">
        {mockTasks.map((t) => (
          <Card key={t.id} surfaceTier="100" className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-4 h-4 text-[#8B0D1A]" />
              <div>
                <h3 className="text-sm font-bold text-[#F5F2ED]">{t.title}</h3>
                <p className="text-[11px] text-[#F5F2ED]/35 font-mono">Assigned to {t.assignee}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant={t.priority === 'HIGH' ? 'crimson' : 'crimson'} size="sm">
                {t.priority}
              </Badge>
              <Badge variant={t.status === 'DONE' ? 'active' : 'crimson'} size="sm">
                {t.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
