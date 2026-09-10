import mongoose, { Schema, Document } from 'mongoose';

export interface IGitHubConnection extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  accessToken: string;
  githubUsername: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GitHubConnectionSchema = new Schema<IGitHubConnection>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    githubUsername: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const GitHubConnection = mongoose.model<IGitHubConnection>('GitHubConnection', GitHubConnectionSchema);
