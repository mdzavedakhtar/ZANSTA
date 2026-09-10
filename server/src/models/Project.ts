import mongoose, { Schema, Document } from 'mongoose';

export type ProjectStatus = 'PLANNING' | 'DEVELOPMENT' | 'TESTING' | 'COMPLETED';
export type ProjectVisibility = 'PRIVATE' | 'TEAM_ONLY' | 'PUBLIC';

export interface IProject extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  category: string;
  techStack: string[];
  status: ProjectStatus;
  visibility: ProjectVisibility;
  repoUrl?: string;
  demoUrl?: string;
  logo?: string;
  coverImage?: string;
  screenshots: string[];
  owner: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      maxlength: [100, 'Project name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      default: 'Full-Stack Web',
    },
    techStack: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['PLANNING', 'DEVELOPMENT', 'TESTING', 'COMPLETED'],
      default: 'DEVELOPMENT',
    },
    visibility: {
      type: String,
      enum: ['PRIVATE', 'TEAM_ONLY', 'PUBLIC'],
      default: 'TEAM_ONLY',
    },
    repoUrl: {
      type: String,
      default: '',
    },
    demoUrl: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    screenshots: {
      type: [String],
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
