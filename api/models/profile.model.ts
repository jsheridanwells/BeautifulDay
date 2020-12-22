import { Schema, model, Model, Document } from 'mongoose';

const ProfileSchema = new Schema({
  active: { type: Boolean, default: true },
  userId: String,
});

export interface Profile {
  active: boolean;
  userId: string;
}

interface ProfileBaseDocument extends Profile, Document {  }
export interface ProfileDocument extends ProfileBaseDocument {  }
export interface ProfilePopulatedDocument extends ProfileBaseDocument {  }
export interface ProfileModel extends Model<ProfileDocument> {  }
export default model<ProfileDocument, ProfileModel>('Profile', ProfileSchema);

