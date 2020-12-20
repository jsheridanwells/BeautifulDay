import * as jwt from 'jsonwebtoken';
import { AppConfig } from '../config/app.config';

export class TokenObject {
  email: string | undefined;
  _id: string | undefined;
  constructor({ email, id }: { email: string, id: string }) {
    this.email = email;
    this._id = id;
  }
}

export class TokenResponse {
  token: string | undefined;
  constructor({ token }: {token: string}) {
    token = token;
  }
}

export default class JwtHandler {
  config = new AppConfig();
  createToken(tokenObj: TokenObject): TokenResponse {
    const token = jwt.sign(tokenObj, this.config.appSecret, )
    return new TokenResponse({ token });
  }

  verifyToken() {

  }
}
