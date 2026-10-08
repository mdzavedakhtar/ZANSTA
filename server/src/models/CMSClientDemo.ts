import mongoose, { Schema, Document } from 'mongoose';

export interface ICMSClientDemo extends Document {
  id: string;
  projectId: string;
  projectName?: string;
  token: string;
  title: string;
  description: string;
  demoUrl: string;
  previewImage?: string;
  clientName: string;
  passcode?: string;
  visibility: string;
  status: string;
  isFeatured: boolean;
  viewCount: number;
  expirationDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CMSClientDemoSchema = new Schema<ICMSClientDemo>(
  {
    id: { type: String, required: true, unique: true, index: true },
    projectId: { type: String, default: '' },
    projectName: { type: String, default: '' },
    token: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    demoUrl: { type: String, default: '' },
    previewImage: { type: String, default: '' },
    clientName: { type: String, default: '' },
    passcode: { type: String, default: '' },
    visibility: { type: String, default: 'PUBLIC' },
    status: { type: String, default: 'LIVE' },
    isFeatured: { type: Boolean, default: false },
    viewCount: { type: Number, default: 0 },
    expirationDate: { type: Date },
  },
  { timestamps: true }
);

export const CMSClientDemo = mongoose.model<ICMSClientDemo>('CMSClientDemo', CMSClientDemoSchema);
