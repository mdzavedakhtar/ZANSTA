import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/components/ui/Toast';
import { MessageSquare, Send, AtSign } from 'lucide-react';

export interface CommentItem {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  time: string;
}

export interface TaskCommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskTitle: string;
}

export const TaskCommentsModal: React.FC<TaskCommentsModalProps> = ({
  isOpen,
  onClose,
  taskTitle,
}) => {
  const { user } = useAuthStore();
  const { toast } = useToast();

  const [comments, setComments] = useState<CommentItem[]>([
    { id: 'c1', author: 'Rahul Sharma', text: 'Hey @Zaved, WebRTC video controls overlay is complete.', time: '20m ago' },
    { id: 'c2', author: 'Aman Deep', text: 'Signaling server endpoint running on port 5000.', time: '10m ago' },
  ]);

  const [text, setText] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment: CommentItem = {
      id: `c_${Date.now()}`,
      author: user?.name || 'MD Zaved Akhtar',
      avatar: user?.avatar,
      text,
      time: 'Just now',
    };

    setComments([...comments, newComment]);
    setText('');
    toast('Comment posted to task stream!', 'success');
  };

  const insertMention = (name: string) => {
    setText((prev) => `${prev} @${name} `);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Task Discussion & Mentions">
      <div className="space-y-6 flex flex-col h-full">
        {/* Task Header */}
        <div className="p-4 bg-[#121212] border border-white/10 rounded-xl space-y-1">
          <Badge variant="crimson" size="sm">TASK DISCUSSION</Badge>
          <h4 className="text-sm font-bold text-[#8B0D1A]">{taskTitle}</h4>
        </div>

        {/* Comments Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {comments.map((c) => (
            <div key={c.id} className="p-3 bg-[#121212] border border-white/5 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar name={c.author} src={c.avatar} size="xs" />
                  <span className="text-xs font-bold text-[#F5F2ED]">{c.author}</span>
                </div>
                <span className="text-[10px] font-mono text-[#F5F2ED]/35">{c.time}</span>
              </div>
              <p className="text-xs text-[#F5F2ED]/80 leading-relaxed font-sans pl-7">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Quick Mention Suggestions */}
        <div className="flex items-center gap-1.5 text-xs text-[#F5F2ED]/55 font-mono">
          <AtSign className="w-3.5 h-3.5 text-[#8B0D1A]" />
          <span>Mention:</span>
          {['Zaved', 'Rahul', 'Aman'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => insertMention(m)}
              className="text-[10px] font-mono px-2 py-1 rounded-lg bg-white/05 hover:bg-[#8B0D1A]/20 text-[#F5F2ED]/60 hover:text-[#F5F2ED] transition-colors border border-white/05 flex items-center gap-1 cursor-pointer"
            >
              <AtSign className="w-3 h-3 text-[#8B0D1A]" /> {m}
            </button>
          ))}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleAddComment} className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment or mention @Zaved..."
            className="w-full bg-[#121212] text-[#F5F2ED] text-xs rounded-xl border border-white/10 p-3 outline-none focus:border-[#8B0D1A]/50"
          />
          <Button type="submit" size="sm" variant="glow" className="w-full" rightIcon={<Send className="w-3.5 h-3.5" />}>
            Post Comment
          </Button>
        </form>
      </div>
    </Drawer>
  );
};
