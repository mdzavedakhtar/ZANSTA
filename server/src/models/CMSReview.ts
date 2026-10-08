import mongoose, { Schema, Document } from 'mongoose';

export interface ICMSReview extends Document {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  clientImage?: string;
  rating: number;
  reviewText: string;
  projectId?: string;
  projectName?: string;
  isFeatured: boolean;
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CMSReviewSchema = new Schema<ICMSReview>(
  {
    id: { type: String, required: true, unique: true, index: true },
    clientName: { type: String, required: true, trim: true },
    clientRole: { type: String, default: '' },
    companyName: { type: String, default: '' },
    clientImage: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    reviewText: { type: String, required: true },
    projectId: { type: String, default: '' },
    projectName: { type: String, default: '' },
    isFeatured: { type: Boolean, default: true },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const CMSReview = mongoose.model<ICMSReview>('CMSReview', CMSReviewSchema);
