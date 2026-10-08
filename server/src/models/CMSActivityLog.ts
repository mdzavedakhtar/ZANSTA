import mongoose, { Schema, Document } from 'mongoose';

export interface ICMSActivityLog extends Document {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  target: string;
  type: string;
}

const CMSActivityLogSchema = new Schema<ICMSActivityLog>(
  {
    id: { type: String, required: true, unique: true, index: true },
    timestamp: { type: Date, default: Date.now },
    user: { type: String, required: true },
    action: { type: String, required: true },
    target: { type: String, default: '' },
    type: { type: String, default: 'project' },
  },
  { timestamps: true }
);

export const CMSActivityLog = mongoose.model<ICMSActivityLog>('CMSActivityLog', CMSActivityLogSchema);
