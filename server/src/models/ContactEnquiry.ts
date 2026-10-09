import mongoose, { Schema, Document } from 'mongoose';

export interface IContactEnquiry extends Document {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterested?: string;
  budget?: string;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactEnquirySchema = new Schema<IContactEnquiry>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: '' },
    company: { type: String, default: '' },
    serviceInterested: { type: String, default: '' },
    budget: { type: String, default: '' },
    message: { type: String, required: true },
    status: { type: String, enum: ['NEW', 'IN_DISCUSSION', 'CLOSED', 'ARCHIVED'], default: 'NEW' },
  },
  { timestamps: true }
);

ContactEnquirySchema.index({ createdAt: -1 });
ContactEnquirySchema.index({ status: 1, createdAt: -1 });
ContactEnquirySchema.index({ email: 1 });
ContactEnquirySchema.index({ name: 'text', email: 'text', company: 'text', message: 'text' });

export const ContactEnquiry = mongoose.model<IContactEnquiry>('ContactEnquiry', ContactEnquirySchema);
