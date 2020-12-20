import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  profilePicUrl: String,
  googleSubId: String
});

export default model('User', UserSchema);

