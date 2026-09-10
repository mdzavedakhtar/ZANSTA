import mongoose, { Schema, Document } from 'mongoose';

export interface IClientLink extends Document {
  _id: mongoose.Types.ObjectId;
  token: string;
  projectId: mongoose.Types.ObjectId;
  passcode?: string;
  expiresAt?: Date;
  viewCount: number;
  createdById: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ClientLinkSchema = new Schema<IClientLink>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    passcode: {
      type: String,
      default: '',
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    createdById: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const ClientLink = mongoose.model<IClientLink>('ClientLink', ClientLinkSchema);
