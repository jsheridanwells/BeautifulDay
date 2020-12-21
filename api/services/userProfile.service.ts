import ProfileModel from '../models/profile.model';
import UserModel from '../models/user.model';
import { createToken, TokenObject } from '../util/jwt';

export async function createOrGetUserProfile(tokenAttributes: any): Promise<any> {
  const user = new UserModel({
    firstName: tokenAttributes.given_name,
    lastName: tokenAttributes.family_name,
    email: tokenAttributes.email,
    googleSubId: tokenAttributes.sub
  });
  return await user.save()
  .then(res => {
    const profile = new ProfileModel({ user: res });
    return profile.save();
  })
  .then(profile => {
    const tokenObj: TokenObject = {
      email: profile.user.email,
      userId: profile.user._id
    }
    return createToken(tokenObj);
  })
  .catch(err => err);
}

