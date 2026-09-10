import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface TechStackInputProps {
  value: string[];
  onChange: (techs: string[]) => void;
  label?: string;
  placeholder?: string;
}

export const TechStackInput: React.FC<TechStackInputProps> = ({
  value,
  onChange,
  label = 'Tech Stack',
  placeholder = 'Add technology (e.g. React, Node.js) and press Enter...',
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (!value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (tech: string) => {
    onChange(value.filter((t) => t !== tech));
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-mono text-[#F5F2ED]/80 block">{label}</label>}

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3.5 py-2 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder:text-[#F5F2ED]/30 focus:outline-none focus:border-[#8B0D1A] font-sans"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-2 bg-[#8B0D1A]/20 border border-[#8B0D1A]/40 text-[#F5F2ED] hover:bg-[#8B0D1A]/40 rounded-xl text-xs font-medium flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-[#8B0D1A]" />
          <span>Add</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1 min-h-[32px]">
        {value.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/05 border border-white/10 text-xs font-mono text-[#F5F2ED]/85 group"
          >
            <span>{tech}</span>
            <button
              type="button"
              onClick={() => handleRemove(tech)}
              className="text-[#F5F2ED]/40 hover:text-[#8B0D1A] transition-colors ml-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {value.length === 0 && (
          <span className="text-[11px] font-mono text-[#F5F2ED]/30 italic">No technology tags added yet.</span>
        )}
      </div>
    </div>
  );
};
