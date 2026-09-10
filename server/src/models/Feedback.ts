import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  _id: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId | string;
  clientName: string;
  clientEmail: string;
  message: string;
  status: 'NEW' | 'REVIEWING' | 'RESOLVED';
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    projectId: {
      type: Schema.Types.Mixed,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['NEW', 'REVIEWING', 'RESOLVED'],
      default: 'NEW',
    },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model<IFeedback>('Feedback', FeedbackSchema);
