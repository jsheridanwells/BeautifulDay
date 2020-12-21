import { Schema, model, Model, Document } from 'mongoose';

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  profilePicUrl: String,
  googleSubId: String
});

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  googleSubId: string;
}

interface UserBaseDocument extends User, Document {  }
export interface UserDocument extends UserBaseDocument {  }
export interface UserPopulatedDocument extends UserBaseDocument {  }
export interface UserModel extends Model<UserDocument> {  }
export default model<UserDocument, UserModel>('User', UserSchema);

