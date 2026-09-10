import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Users } from 'lucide-react';

export const ProjectTeamPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-white/10">
        <h2 className="text-xl font-extrabold text-[#F5F2ED] font-display flex items-center gap-2">
          <Users className="w-5 h-5 text-[#8B0D1A]" /> ASSIGNED PROJECT MEMBERS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'MD Zaved Akhtar', email: 'mdzavedakhtar62@gmail.com', role: 'Project Lead', status: 'Active' },
          { name: 'Rahul Sharma', email: 'rahul@nexora.dev', role: 'Frontend Engineer', status: 'Active' },
          { name: 'Aman Deep', email: 'aman@nexora.dev', role: 'Backend Engineer', status: 'Active' },
        ].map((m) => (
          <Card key={m.email} surfaceTier="100" className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar name={m.name} size="md" status="online" />
              <div>
                <h3 className="text-sm font-bold text-[#F5F2ED]">{m.name}</h3>
                <p className="text-xs text-[#F5F2ED]/55 font-mono">{m.email}</p>
              </div>
            </div>
            <Badge variant="crimson" size="sm">
              {m.role}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};
