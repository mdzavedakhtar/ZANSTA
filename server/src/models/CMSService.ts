import mongoose, { Schema, Document } from 'mongoose';

export interface ICMSService extends Document {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl?: string;
  tag?: string;
  iconName: string;
  techStack: string[];
  isFeatured: boolean;
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CMSServiceSchema = new Schema<ICMSService>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    shortDescription: { type: String, default: '' },
    fullDescription: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    tag: { type: String, default: '' },
    iconName: { type: String, default: 'Code2' },
    techStack: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: true },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

CMSServiceSchema.index({ order: 1, createdAt: -1 });
CMSServiceSchema.index({ isVisible: 1, isFeatured: 1 });
CMSServiceSchema.index({ name: 'text', shortDescription: 'text', fullDescription: 'text' });

export const CMSService = mongoose.model<ICMSService>('CMSService', CMSServiceSchema);
