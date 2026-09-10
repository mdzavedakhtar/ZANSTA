import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bell, Check } from 'lucide-react';

const mockNotifications = [
  { id: '1', title: 'Task Assigned', desc: 'Rahul assigned you to "Implement Auth Middleware"', time: '10m ago', unread: true },
  { id: '2', title: 'GitHub PR Merged', desc: 'Pull request #14 merged into main branch', time: '1h ago', unread: true },
  { id: '3', title: 'Client Feedback', desc: 'Acme Corp left feedback on CareSprint demo link', time: '3h ago', unread: false },
];

export const WorkspaceNotificationsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F5F2ED] tracking-tight font-display">
            NOTIFICATIONS
          </h1>
          <p className="text-xs text-[#F5F2ED]/55">Activity alerts, task assignments, and mentions</p>
        </div>
        <button className="text-xs text-[#8B0D1A] hover:underline font-mono flex items-center gap-1">
          <Check className="w-3.5 h-3.5" /> Mark all read
        </button>
      </div>

      <div className="space-y-3">
        {mockNotifications.map((n) => (
          <Card key={n.id} surfaceTier="100" className="p-4 flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 flex items-center justify-center text-[#8B0D1A] shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#F5F2ED]">{n.title}</h3>
                <span className="text-[10px] font-mono text-[#F5F2ED]/35">{n.time}</span>
              </div>
              <p className="text-xs text-[#F5F2ED]/55 mt-1">{n.desc}</p>
            </div>
            {n.unread && <span className="w-2 h-2 rounded-full bg-[#8B0D1A]" />}
          </Card>
        ))}
      </div>
    </div>
  );
};
