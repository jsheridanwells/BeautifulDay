import * as mongoose from 'mongoose';
import { Schema, model, Model, Document } from 'mongoose';
import { ProfileDocument } from './profile.model';

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  profilePicUrl: String,
  googleSubId: String,
  pelotonUsername: { type: String, default: null },
  profile:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
});

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  googleSubId: string;
  pelotonUsername: string;
  profile: ProfileDocument;
}

interface UserBaseDocument extends User, Document {  }
export interface UserDocument extends UserBaseDocument {  }
export interface UserPopulatedDocument extends UserBaseDocument {  }
export interface UserModel extends Model<UserDocument> {  }
export default model<UserDocument, UserModel>('User', UserSchema);

