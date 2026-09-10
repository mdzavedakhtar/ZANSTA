import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectRequest extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  company?: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  requirements?: string;
  status: 'NEW' | 'REVIEWING' | 'PROPOSAL' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectRequestSchema = new Schema<IProjectRequest>(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
    },
    projectType: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    timeline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['NEW', 'REVIEWING', 'PROPOSAL', 'IN_PROGRESS', 'COMPLETED'],
      default: 'NEW',
    },
  },
  { timestamps: true }
);

export const ProjectRequest = mongoose.model<IProjectRequest>('ProjectRequest', ProjectRequestSchema);
