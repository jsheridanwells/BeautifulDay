import UserModel from '../models/user.model';
import { createToken, TokenObject, TokenResponse } from '../util/jwt';

export async function getTokenForUser(tokenPayload: TokenPayload): Promise<TokenResponse> {
  let checkUser = await UserModel.findOne({ googleSubId: tokenPayload.sub });

  if (!checkUser) {
    checkUser = new UserModel({
      firstName: tokenPayload.given_name,
      lastName: tokenPayload.family_name,
      email: tokenPayload.email,
      googleSubId: tokenPayload.sub
    });
    await checkUser.save();
  }

  const tokenObj: TokenObject = {
    email: checkUser.email,
    userId: checkUser.googleSubId
  }

  const token = createToken(tokenObj);
  return token;
}


