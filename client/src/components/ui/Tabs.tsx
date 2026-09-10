import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 p-1 bg-[#0E0E0E] border border-[#F5F2ED]/10 rounded-xl select-none',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-4 py-2 text-xs font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer',
              isActive ? 'text-[#0B0B0B] font-semibold' : 'text-[#F5F2ED]/55 hover:text-[#F5F2ED]'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-[#F5F2ED] rounded-lg"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'px-1.5 py-0.5 text-[10px] rounded-full font-mono',
                    isActive ? 'bg-[#0B0B0B] text-[#F5F2ED]' : 'bg-[#F5F2ED]/10 text-[#F5F2ED]/55'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
