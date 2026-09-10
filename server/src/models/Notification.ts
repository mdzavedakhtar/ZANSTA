import mongoose, { Schema, Document } from 'mongoose';

export type NotificationType = 'TASK_ASSIGNMENT' | 'MENTION' | 'COMMENT' | 'PROJECT_UPDATE' | 'INVITATION' | 'FILE_UPLOAD' | 'CLIENT_FEEDBACK';

export interface INotification extends Document {
  _id: mongoose.Types.ObjectId;
  recipientId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    recipientId: { type: String, required: true },
    type: {
      type: String,
      enum: ['TASK_ASSIGNMENT', 'MENTION', 'COMMENT', 'PROJECT_UPDATE', 'INVITATION', 'FILE_UPLOAD', 'CLIENT_FEEDBACK'],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    link: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
