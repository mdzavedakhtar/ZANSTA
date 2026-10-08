import mongoose, { Schema, Document } from 'mongoose';

export interface ICMSTeamMember extends Document {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  fullBio?: string;
  techStack: string[];
  experienceYears: string;
  experienceSummary?: string;
  location?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  resumeUrl?: string;
  resumeFileName?: string;
  isFeatured: boolean;
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CMSTeamMemberSchema = new Schema<ICSTeamMember>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    photo: { type: String, default: '' },
    bio: { type: String, default: '' },
    fullBio: { type: String, default: '' },
    techStack: { type: [String], default: [] },
    experienceYears: { type: String, default: '3+' },
    experienceSummary: { type: String, default: '' },
    location: { type: String, default: '' },
    email: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    portfolio: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    resumeFileName: { type: String, default: '' },
    isFeatured: { type: Boolean, default: true },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

type ICSTeamMember = ICMSTeamMember;
export const CMSTeamMember = mongoose.model<ICMSTeamMember>('CMSTeamMember', CMSTeamMemberSchema);
