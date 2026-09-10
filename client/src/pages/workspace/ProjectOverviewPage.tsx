import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProjectStore } from '@/store/useProjectStore';
import { GenerateClientLinkModal } from '@/components/modals/GenerateClientLinkModal';
import { CheckSquare, GitCommit, Link2, Plus } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export const ProjectOverviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentProject, tasks } = useProjectStore();
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const projectId = id || currentProject?.slug || 'caresprint';
  const projectName = currentProject?.name || 'CareSprint';

  const completedTasks = tasks.filter((t) => t.status === 'DONE').length;
  const totalTasks = tasks.length || 5;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card surfaceTier="100" className="space-y-2">
          <span className="text-[11px] font-mono text-[#F5F2ED]/55">BUILD PROGRESS</span>
          <p className="text-3xl font-extrabold text-[#F5F2ED] font-mono">{progressPercent}%</p>
          <ProgressBar value={progressPercent} color="crimson" showPercentage={false} />
        </Card>

        <Card surfaceTier="100" className="space-y-2">
          <span className="text-[11px] font-mono text-[#F5F2ED]/55">ACTIVE SPRINT TASKS</span>
          <p className="text-3xl font-extrabold text-[#8B0D1A] font-mono">{totalTasks}</p>
          <p className="text-[11px] text-[#F5F2ED]/55 font-mono">{completedTasks} completed</p>
        </Card>

        <Card surfaceTier="100" className="space-y-2">
          <span className="text-[11px] font-mono text-[#F5F2ED]/55">PROJECT TEAM</span>
          <p className="text-3xl font-extrabold text-[#8B0D1A] font-mono">4</p>
          <p className="text-[11px] text-[#F5F2ED]/55 font-mono">2 online now</p>
        </Card>

        <Card surfaceTier="100" className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#F5F2ED]/55">CLIENT DEMO LINK</span>
            <Badge variant="active" size="sm">ACTIVE TOKEN</Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsClientModalOpen(true)}
            className="w-full text-xs font-mono gap-1 border-white/10 hover:border-[#8B0D1A]"
          >
            <Link2 className="w-3.5 h-3.5 text-[#8B0D1A]" /> Share Client Link
          </Button>
        </Card>
      </div>

      {/* Main Grid: Upcoming Tasks + Latest Commits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F5F2ED] font-display">UPCOMING SPRINT TASKS</h2>
            <Link to={`/projects/${projectId}/tasks`} className="text-xs text-[#8B0D1A] hover:underline font-mono">
              View Kanban Board →
            </Link>
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 4).map((t) => (
              <Card key={t.id} surfaceTier="200" className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-4 h-4 text-[#8B0D1A]" />
                  <div>
                    <h3 className="text-sm font-bold text-[#F5F2ED]">{t.title}</h3>
                    <p className="text-[11px] text-[#F5F2ED]/35 font-mono">Assigned to {t.assignee || 'MD Zaved Akhtar'}</p>
                  </div>
                </div>
                <Badge variant={t.status === 'DONE' ? 'active' : 'crimson'} size="sm">
                  {t.status}
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Latest Commits */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#F5F2ED] font-display flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-[#8B0D1A]" /> LATEST COMMITS
          </h2>

          <Card surfaceTier="200" className="p-4 space-y-3 font-mono text-xs">
            <div className="pb-2 border-b border-white/5 space-y-1">
              <span className="text-[#F5F2ED]/60">commit a8f912c</span>
              <p className="text-[#F5F2ED]/80">feat(auth): integrate RBAC authorization middleware</p>
              <span className="text-[10px] text-[#F5F2ED]/35">MD Zaved Akhtar • 10m ago</span>
            </div>
            <div className="pb-2 border-b border-white/5 space-y-1">
              <span className="text-[#F5F2ED]/60">commit 3b401e1</span>
              <p className="text-[#F5F2ED]/80">feat(socket): streaming activity logs</p>
              <span className="text-[10px] text-[#F5F2ED]/35">Aman Deep • 45m ago</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Generate Client Link Modal */}
      <GenerateClientLinkModal
        projectId={projectId}
        projectName={projectName}
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
      />
    </div>
  );
};
