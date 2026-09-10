import React from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Activity } from 'lucide-react';

export const ProjectActivityPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-white/10">
        <h2 className="text-xl font-extrabold text-[#F5F2ED] font-display flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#8B0D1A]" /> PROJECT EVENT STREAM
        </h2>
      </div>

      <div className="space-y-3">
        {[
          { user: 'MD Zaved Akhtar', action: 'moved task "Implement WebRTC signaling" to IN_PROGRESS', time: '15m ago' },
          { user: 'Rahul Sharma', action: 'uploaded file caresprint_mobile_build.apk', time: '1h ago' },
          { user: 'Aman Deep', action: 'connected repository nexora/caresprint', time: '3h ago' },
        ].map((item, idx) => (
          <Card key={idx} surfaceTier="100" className="p-4 flex items-center gap-4">
            <Avatar name={item.user} size="sm" />
            <div>
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
