import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from './User.js';

export interface IInvitation extends Document {
  _id: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  email: string;
  role: UserRole;
  token: string;
  invitedBy: mongoose.Types.ObjectId;
  status: 'PENDING' | 'ACCEPTED' | 'EXPIRED';
  expiresAt: Date;
  createdAt: Date;
}

const InvitationSchema = new Schema<IInvitation>(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['OWNER', 'ADMIN', 'MEMBER', 'CLIENT'],
      default: 'MEMBER',
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'EXPIRED'],
      default: 'PENDING',
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Invitation = mongoose.model<IInvitation>('Invitation', InvitationSchema);
