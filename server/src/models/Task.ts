import mongoose, { Schema, Document } from 'mongoose';

export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface ITask extends Document {
  _id: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  assignee?: mongoose.Types.ObjectId;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date;
  labels: string[];
  comments: {
    userId: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      default: '',
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
    },
    status: {
      type: String,
      enum: ['BACKLOG', 'TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'],
      default: 'TODO',
    },
    dueDate: Date,
    labels: {
      type: [String],
      default: [],
    },
    comments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>('Task', TaskSchema);
