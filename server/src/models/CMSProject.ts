import mongoose, { Schema, Document } from 'mongoose';

export interface ICMSProject extends Document {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  gallery: string[];
  techStack: string[];
  category: string;
  status: string;
  githubUrl?: string;
  liveUrl?: string;
  clientName?: string;
  clientRating?: number;
  clientReviewPreview?: string;
  isClientProject: boolean;
  isFeatured: boolean;
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CMSProjectSchema = new Schema<ICMSProject>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    gallery: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    category: { type: String, default: 'WEB APP' },
    status: { type: String, default: 'LIVE' },
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    clientName: { type: String, default: '' },
    clientRating: { type: Number, default: 5 },
    clientReviewPreview: { type: String, default: '' },
    isClientProject: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: true },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// High-speed compound and search indexing
CMSProjectSchema.index({ order: 1, createdAt: -1 });
CMSProjectSchema.index({ isVisible: 1, isFeatured: 1 });
CMSProjectSchema.index({ status: 1, category: 1 });
CMSProjectSchema.index({
  name: 'text',
  shortDescription: 'text',
  description: 'text',
  clientName: 'text',
});

export const CMSProject = mongoose.model<ICMSProject>('CMSProject', CMSProjectSchema);
