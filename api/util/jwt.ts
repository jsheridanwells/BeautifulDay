import * as jwt from 'jsonwebtoken';
import appConfig from '../config/app.config'

export interface TokenObject {
  profileId: string;
  googleSubId: string;
}
// export interface TokenObject {
//   email: string;
//   userId: string;
// }

export interface TokenResponse {
  givenName?: string
  familyName?: string;
  email?: string
  sub?: string;
  picture?: string;
  profileId?: any;
  token: string;
}

export function createToken(tokenObj: TokenObject): TokenResponse {
  const token = jwt.sign(tokenObj, appConfig.appSecret, { expiresIn: appConfig.tokenExpiration });
  return { token };
}


export async function verifyToken(token: string): Promise<TokenObject | null> {
  return new Promise<TokenObject | null>((res, rej) => {
    jwt.verify(token, appConfig.appSecret, (err, tokenObj) => {
      if (err) return rej(err);
      else {
        return res(tokenObj as TokenObject);
      }
    });
  });
}

