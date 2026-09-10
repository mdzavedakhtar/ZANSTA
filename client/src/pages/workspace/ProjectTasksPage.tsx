import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Avatar } from '@/components/ui/Avatar';
import { useProjectStore, TaskStatus, TaskPriority, TaskItem } from '@/store/useProjectStore';
import { useToast } from '@/components/ui/Toast';
import { MessageSquare, Plus, CheckSquare, ArrowRight, ChevronRight, ChevronLeft, User, AlertCircle } from 'lucide-react';
import { TaskCommentsModal } from '@/components/workspace/TaskCommentsModal';

const columns: { id: TaskStatus; label: string; color: string }[] = [
  { id: 'BACKLOG', label: 'BACKLOG', color: 'text-[#F5F2ED]/55' },
  { id: 'TODO', label: 'TODO', color: 'text-[#F5F2ED]' },
  { id: 'IN_PROGRESS', label: 'IN PROGRESS', color: 'text-[#8B0D1A]' },
  { id: 'REVIEW', label: 'REVIEW', color: 'text-[#8B0D1A]' },
  { id: 'DONE', label: 'DONE', color: 'text-[#F5F2ED]/70' },
];

export const ProjectTasksPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, fetchTasks, createTask, updateTaskStatus } = useProjectStore();
  const { toast } = useToast();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [selectedTaskTitle, setSelectedTaskTitle] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('MD Zaved Akhtar');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [status, setStatus] = useState<TaskStatus>('TODO');

  const projectId = id || 'caresprint';

  useEffect(() => {
    fetchTasks(projectId);
  }, [projectId]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createTask({
        projectId,
        title,
        description,
        assignee,
        priority,
        status,
      });
      toast('Task created!', 'success');
      setCreateModalOpen(false);
      setTitle('');
      setDescription('');
    } catch (error: any) {
      toast(error.message || 'Failed to create task', 'error');
    }
  };

  const handleMoveStatus = (task: TaskItem, direction: 'next' | 'prev') => {
    const colOrder: TaskStatus[] = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'];
    const currIdx = colOrder.indexOf(task.status);
    const targetIdx = direction === 'next' ? currIdx + 1 : currIdx - 1;
    if (targetIdx >= 0 && targetIdx < colOrder.length) {
      const newStatus = colOrder[targetIdx];
      updateTaskStatus(task.id, newStatus);
      toast(`Task moved to ${newStatus}`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-[#8B0D1A]" />
          <h2 className="text-xl font-extrabold text-[#F5F2ED] font-display">LINEAR-STYLE KANBAN BOARD</h2>
        </div>

        <Button
          size="sm"
          variant="glow"
          onClick={() => setCreateModalOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          New Task
        </Button>
      </div>

      {/* 5-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className="bg-[#0E0E0E] border border-white/10 rounded-2xl p-3 space-y-3 min-w-[220px]">
              {/* Column Header */}
              <div className="flex items-center justify-between px-2 py-1 border-b border-white/5 font-mono text-xs">
                <span className={`font-bold ${col.color}`}>{col.label}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-white/5 text-[#F5F2ED]/55 text-[10px]">
                  {colTasks.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="space-y-2 min-h-[160px]">
                {colTasks.length === 0 ? (
                  <div className="p-4 text-center text-[11px] font-mono text-[#F5F2ED]/30 border border-dashed border-white/5 rounded-xl">
                    Empty Column
                  </div>
                ) : (
                  colTasks.map((t) => (
                    <motion.div
                      key={t.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-[#121212] border border-white/10 rounded-xl space-y-2.5 hover:border-white/20 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-[#F5F2ED] leading-snug">{t.title}</h4>
                        <Badge
                          variant={
                            t.priority === 'URGENT'
                              ? 'crimson'
                              : t.priority === 'HIGH'
                              ? 'neutral'
                              : t.priority === 'MEDIUM'
                              ? 'crimson'
                              : 'neutral'
                          }
                          size="sm"
                        >
                          {t.priority}
                        </Badge>
                      </div>

                      {t.description && <p className="text-[11px] text-[#F5F2ED]/55 line-clamp-2">{t.description}</p>}

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#F5F2ED]/55">
                        <div className="flex items-center gap-1.5">
                          <Avatar name={t.assignee || 'Zaved'} size="xs" />
                          <span className="truncate max-w-[80px] font-mono">{t.assignee || 'Zaved'}</span>
                        </div>

                        {/* Comment & Quick Shift Controls */}
                        <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setSelectedTaskTitle(t.title);
                              setCommentsModalOpen(true);
                            }}
                            className="p-1 hover:text-[#8B0D1A] bg-white/5 rounded flex items-center gap-0.5 cursor-pointer"
                            title="Task Comments"
                          >
                            <MessageSquare className="w-3 h-3" />
                          </button>
                          {col.id !== 'BACKLOG' && (
                            <button
                              onClick={() => handleMoveStatus(t, 'prev')}
                              className="p-1 hover:text-[#F5F2ED] bg-white/5 rounded cursor-pointer"
                              title="Move Previous"
                            >
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                          )}
                          {col.id !== 'DONE' && (
                            <button
                              onClick={() => handleMoveStatus(t, 'next')}
                              className="p-1 hover:text-[#8B0D1A] bg-white/5 rounded cursor-pointer"
                              title="Move Next"
                            >
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Discussion Modal */}
      <TaskCommentsModal
        isOpen={commentsModalOpen}
        onClose={() => setCommentsModalOpen(false)}
        taskTitle={selectedTaskTitle}
      />

      {/* Quick Task Creation Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create Sprint Task"
        description="Add a new task item to the project Kanban board."
      >
        <form onSubmit={handleCreateTask} className="space-y-4 pt-2">
          <Input
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Implement WebRTC signaling gateway"
            required
          />

          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-medium text-[#F5F2ED]/80">Task Details</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide technical scope and requirements..."
              className="w-full bg-[#0E0E0E] text-[#F5F2ED] text-sm rounded-lg border border-white/10 p-3.5 outline-none focus:border-[#8B0D1A]/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Priority Level"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              options={[
                { value: 'LOW', label: 'LOW' },
                { value: 'MEDIUM', label: 'MEDIUM' },
                { value: 'HIGH', label: 'HIGH' },
                { value: 'URGENT', label: 'URGENT' },
              ]}
            />
            <Select
              label="Kanban Column Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              options={[
                { value: 'BACKLOG', label: 'BACKLOG' },
                { value: 'TODO', label: 'TODO' },
                { value: 'IN_PROGRESS', label: 'IN PROGRESS' },
                { value: 'REVIEW', label: 'REVIEW' },
                { value: 'DONE', label: 'DONE' },
              ]}
            />
          </div>

          <Input
            label="Assignee Name"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            placeholder="MD Zaved Akhtar"
          />

          <Button type="submit" size="md" variant="glow" className="w-full">
            Add Task to Kanban
          </Button>
        </form>
      </Modal>
    </div>
  );
};
