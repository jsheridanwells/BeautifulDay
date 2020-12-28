import { Schema, model, Model, Document } from 'mongoose';

const ProfileSchema = new Schema({
  active: { type: Boolean, default: true },
  googleSubId: String
});

export interface Profile {
  active: boolean;
  googleSubId: string;
}

interface ProfileBaseDocument extends Profile, Document {  }
export interface ProfileDocument extends ProfileBaseDocument {  }
export interface ProfilePopulatedDocument extends ProfileBaseDocument {  }
export interface ProfileModel extends Model<ProfileDocument> {  }
export default model<ProfileDocument, ProfileModel>('Profile', ProfileSchema);

