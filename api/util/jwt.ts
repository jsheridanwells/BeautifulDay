import * as jwt from 'jsonwebtoken';
import appConfig from '../config/app.config'

export interface TokenObject {
  email: string;
  userId: string;
}

export interface TokenResponse {
  token: string;
}

export function createToken(tokenObj: TokenObject): TokenResponse {
  // TODO : expires is temporary for now
  const token = jwt.sign(tokenObj, appConfig.appSecret, { expiresIn: '1h' });
  return { token };
}


export async function verifyToken(token: string): Promise<string | null> {
  return new Promise<string | null>((res, rej) => {
    jwt.verify(token, appConfig.appSecret, (err, tokenObj) => {
      if (err) return rej(null);
      else
        return res((tokenObj as TokenObject).userId);
    });
  });
}
// export class TokenObject {
//   email: string | undefined;
//   _id: string | undefined;
//   constructor({ email, id }: { email: string, id: string }) {
//     this.email = email;
//     this._id = id;
//   }
// }

// export class TokenResponse {
//   token: string | undefined;
//   constructor({ token }: {token: string}) {
//     token = token;
//   }
// }

// export default class JwtHandler {
//   config = new AppConfig();
//   createToken(tokenObj: TokenObject): TokenResponse {
//     const token = jwt.sign(tokenObj, this.config.appSecret, )
//     return new TokenResponse({ token });
//   }

//   verifyToken() {

  // }
// }
