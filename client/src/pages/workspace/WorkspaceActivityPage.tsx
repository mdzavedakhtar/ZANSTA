import React from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Activity } from 'lucide-react';

const mockActivities = [
  { id: 'a1', user: 'MD Zaved Akhtar', action: 'merged PR #42 in CareSprint', time: '10m ago' },
  { id: 'a2', user: 'Rahul Sharma', action: 'updated UI design tokens and custom cursor', time: '35m ago' },
  { id: 'a3', user: 'Aman Deep', action: 'connected MongoDB cluster and Socket.IO gateway', time: '1h ago' },
  { id: 'a4', user: 'Acme Client User', action: 'viewed CareSprint Live Demo via /demo/token_caresprint', time: '2h ago' },
];

export const WorkspaceActivityPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-6 border-b border-white/10">
        <h1 className="text-2xl font-extrabold text-[#F5F2ED] tracking-tight font-display flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#8B0D1A]" /> REAL-TIME WORKSPACE AUDIT LOG
        </h1>
        <p className="text-xs text-[#F5F2ED]/55">Complete activity trail across all projects, members, and client views</p>
      </div>

      <div className="space-y-3">
        {mockActivities.map((item) => (
          <Card key={item.id} surfaceTier="100" className="p-4 flex items-center gap-4">
            <Avatar name={item.user} size="sm" />
            <div className="flex-1">
              <p className="text-xs text-[#F5F2ED]">
                <span className="font-bold text-[#F5F2ED]">{item.user}</span> {item.action}
              </p>
              <span className="text-[10px] font-mono text-[#F5F2ED]/35">{item.time}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
