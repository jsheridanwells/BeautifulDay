import * as mongoose from 'mongoose';
import { Schema, model, MongooseDocument } from 'mongoose';

const ProfileSchema = new Schema({
  active: Boolean,
  userId: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default model('Profile', ProfileSchema);

// This way came from
// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
// it's REALLY complicated though, but i'm leaving this here for right now in case there are any
// other clues to be gleaned.
// import { Document, Model, model, Schema } from 'mongoose';

// const ProfileSchema = new Schema({
//   firstName: {
//     type: String,
//     required: true
//   }
// });

// export interface Profile {
//   firstName: string;
// }

// interface ProfileBaseDocument extends Profile, Document {  }

// export interface ProfileDocument extends ProfileBaseDocument {  }

// export interface ProflePopulatedDocument extends ProfileBaseDocument {  }

// export interface ProfileModel extends Model<ProfileDocument> {  }

// export default model<ProfileDocument, ProfileModel>('Profile', ProfileSchema);

