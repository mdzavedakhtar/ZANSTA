import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { activityService } from '@/services/activityService';
import { ActivityLogItem } from '@/types/cms';
import { Activity, FolderGit2, Users, MonitorPlay, Layers, Globe } from 'lucide-react';

export const AdminActivityPage: React.FC = () => {
  const [activities, setActivities] = useState<ActivityLogItem[]>([]);

  useEffect(() => {
    setActivities(activityService.getActivities());
  }, []);

  const getTypeIcon = (type: ActivityLogItem['type']) => {
    switch (type) {
      case 'project':
        return <FolderGit2 className="w-4 h-4 text-[#8B0D1A]" />;
      case 'team':
        return <Users className="w-4 h-4 text-[#8B0D1A]" />;
      case 'demo':
        return <MonitorPlay className="w-4 h-4 text-[#8B0D1A]" />;
      case 'service':
        return <Layers className="w-4 h-4 text-[#8B0D1A]" />;
      default:
        return <Globe className="w-4 h-4 text-[#8B0D1A]" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A]">
            <Activity className="w-4 h-4" />
          </div>
          <h1 className="text-2xl font-black text-[#F5F2ED] tracking-tight font-display">
            ADMIN ACTIVITY STREAM
          </h1>
        </div>
        <p className="text-xs text-[#F5F2ED]/55 font-sans">
          Real-time audit log of CMS content edits, project updates, team additions, and client demo events.
        </p>
      </div>

      <Card surfaceTier="100" className="p-6 space-y-4 border border-white/10">
        {activities.length === 0 ? (
          <div className="text-center py-12 text-xs font-mono text-[#F5F2ED]/40">
            No admin activity recorded yet.
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((act) => (
              <div
                key={act.id}
                className="flex items-start gap-4 p-3.5 rounded-xl bg-[#0E0E0E] border border-white/05 hover:border-white/10 transition-colors"
              >
                <Avatar name={act.user} size="sm" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#F5F2ED]">
                      <span className="font-bold text-[#F5F2ED]">{act.user}</span>{' '}
                      <span className="text-[#F5F2ED]/70">{act.action}</span>{' '}
                      <span className="font-semibold text-[#8B0D1A]">{act.target}</span>
                    </p>
                    <Badge variant="neutral" size="sm" className="font-mono text-[10px]">
                      {act.type.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-[10px] font-mono text-[#F5F2ED]/35">
                    {new Date(act.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
