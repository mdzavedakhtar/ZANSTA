import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectFile extends Document {
  _id: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  name: string;
  extension: string;
  size: number;
  url: string;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ProjectFileSchema = new Schema<IProjectFile>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    extension: {
      type: String,
      required: true,
      uppercase: true,
    },
    size: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const ProjectFile = mongoose.model<IProjectFile>('ProjectFile', ProjectFileSchema);
