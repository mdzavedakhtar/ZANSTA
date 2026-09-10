import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkspace extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  owner: mongoose.Types.ObjectId;
  avatar?: string;
  settings: {
    customDomain?: string;
    allowMemberInvites: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceSchema = new Schema<IWorkspace>(
  {
    name: {
      type: String,
      required: [true, 'Workspace name is required'],
      trim: true,
      maxlength: [60, 'Workspace name cannot exceed 60 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    settings: {
      customDomain: { type: String, default: '' },
      allowMemberInvites: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export const Workspace = mongoose.model<IWorkspace>('Workspace', WorkspaceSchema);
