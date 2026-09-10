import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Inbox, Plus } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <Card surfaceTier="100" className={`p-12 text-center space-y-4 border border-white/10 ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F5F2ED]/55 mx-auto">
        {icon || <Inbox className="w-7 h-7" />}
      </div>
      <div className="space-y-1.5 max-w-sm mx-auto">
        <h3 className="text-lg font-bold text-[#F5F2ED] font-display">{title}</h3>
        <p className="text-xs text-[#F5F2ED]/55 font-sans leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <div className="pt-2">
          <Button
            variant="glow"
            size="sm"
            onClick={onAction}
            leftIcon={<Plus className="w-4 h-4" />}
            className="text-xs font-bold"
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </Card>
  );
};
