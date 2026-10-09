import mongoose, { Schema, Document } from 'mongoose';

export interface ICMSBanner extends Document {
  id: string;
  title: string;
  subtitle?: string;
  discountText?: string;
  badgeText?: string;
  imageUrl: string;
  targetUrl?: string;
  ctaText?: string;
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CMSBannerSchema = new Schema<ICMSBanner>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '' },
    discountText: { type: String, default: 'SPECIAL OFFER' },
    badgeText: { type: String, default: '⚡ LIMITED TIME' },
    imageUrl: { type: String, required: true },
    targetUrl: { type: String, default: '/contact' },
    ctaText: { type: String, default: 'Claim Offer' },
    isVisible: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 1, index: true },
  },
  { timestamps: true }
);

CMSBannerSchema.index({ order: 1, createdAt: -1 });
CMSBannerSchema.index({ isVisible: 1, order: 1 });

export const CMSBanner = mongoose.model<ICMSBanner>('CMSBanner', CMSBannerSchema);
