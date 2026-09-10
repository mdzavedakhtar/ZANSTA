import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  _id: mongoose.Types.ObjectId;
  workspaceId?: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
  userName: string;
  userAvatar?: string;
  action: string;
  target?: string;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace' },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    userName: { type: String, required: true },
    userAvatar: { type: String, default: '' },
    action: { type: String, required: true },
    target: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
