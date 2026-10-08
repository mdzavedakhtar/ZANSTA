import mongoose, { Schema, Document } from 'mongoose';

export interface IDemoRequest extends Document {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectInterest?: string;
  message?: string;
  contactMethod?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const DemoRequestSchema = new Schema<IDemoRequest>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    company: { type: String, default: '' },
    projectInterest: { type: String, default: '' },
    message: { type: String, default: '' },
    contactMethod: { type: String, default: 'email' },
    status: { type: String, enum: ['NEW', 'CONTACTED', 'SCHEDULED', 'ARCHIVED'], default: 'NEW' },
  },
  { timestamps: true }
);

DemoRequestSchema.index({ createdAt: -1 });
DemoRequestSchema.index({ status: 1, createdAt: -1 });
DemoRequestSchema.index({ email: 1 });

export const DemoRequest = mongoose.model<IDemoRequest>('DemoRequest', DemoRequestSchema);
