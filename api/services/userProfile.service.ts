import UserModel from '../models/user.model';
import ProfileModel from '../models/profile.model';
import { createToken, TokenObject, TokenResponse } from '../util/jwt';

export async function getTokenForUser(tokenPayload: TokenPayload): Promise<TokenResponse> {
  let checkUser = await UserModel.findOne({ googleSubId: tokenPayload.sub });
  if (!checkUser) {
    checkUser = await createUserProfile(tokenPayload);
  }

  const tokenObj: TokenObject = {
    // @ts-ignore
    email: checkUser.email,
    // @ts-ignore
    userId: checkUser.googleSubId
  }

  const token = createToken(tokenObj);
  return token;
}

export async function getUserProfile(googleSubId: string): Promise<any | null> {
  return await UserModel.findOne({ googleSubId }).populate('profile');
}

async function createUserProfile(tokenPayload: TokenPayload): Promise<any> {
  const newProfile = new ProfileModel({  });
  await newProfile.save();
  const profileId = newProfile._id;
  const newUserProfile = new UserModel({
    givenName: tokenPayload.given_name,
    familyName: tokenPayload.family_name,
    email: tokenPayload.email,
    googleSubId: tokenPayload.sub,
    picture: tokenPayload.picture,
    profile: profileId
  })
  return await newUserProfile.save();
}
