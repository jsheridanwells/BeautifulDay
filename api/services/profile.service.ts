import ProfileModel from '../models/profile.model';
import { createToken, TokenObject, TokenResponse } from '../util/jwt';

export async function getTokenForUser(tokenPayload: TokenPayload): Promise<TokenResponse> {
  let checkProfile = await ProfileModel.findOne({ googleSubId: tokenPayload.sub });
  if (!checkProfile) {
    checkProfile = await createProfile(tokenPayload.sub);
  }
  const tokenObj: TokenObject = {
    profileId: checkProfile._id,
    googleSubId: tokenPayload.sub
  };
  // const tokenObj: TokenObject = {
  //   email: tokenPayload.email,
  //   userId: tokenPayload.sub
  // }
  const token = createToken(tokenObj);
  const tokenResponse: TokenResponse = { ...createToken(tokenObj),
    givenName: tokenPayload.given_name,
    familyName: tokenPayload.given_name,
    email: tokenPayload.email,
    picture: tokenPayload.picture,
    profileId: checkProfile._id,
    token: token.token
  };
  return tokenResponse;
}

async function createProfile(googleSubId: string) {
  const profile = new ProfileModel({ googleSubId });
  return await profile.save();
}

