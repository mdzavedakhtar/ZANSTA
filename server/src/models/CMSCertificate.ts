import mongoose, { Schema, Document } from 'mongoose';

export interface ICMSCertificate extends Document {
  id: string;
  title: string;
  issuer: string;
  certificateNumber: string;
  badgeText?: string;
  logoUrl: string;
  verificationUrl?: string;
  issuedDate?: string;
  description?: string;
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CMSCertificateSchema = new Schema<ICMSCertificate>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    certificateNumber: { type: String, required: true, trim: true },
    badgeText: { type: String, default: 'GOVT. VERIFIED' },
    logoUrl: { type: String, required: true },
    verificationUrl: { type: String, default: '' },
    issuedDate: { type: String, default: '' },
    description: { type: String, default: '' },
    isVisible: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 1, index: true },
  },
  { timestamps: true }
);

CMSCertificateSchema.index({ order: 1, createdAt: -1 });
CMSCertificateSchema.index({ isVisible: 1, order: 1 });

export const CMSCertificate = mongoose.model<ICMSCertificate>('CMSCertificate', CMSCertificateSchema);
