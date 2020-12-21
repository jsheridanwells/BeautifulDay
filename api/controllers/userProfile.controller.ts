import { getTokenForUser } from '../services/userProfile.service';
import { TokenResponse } from '../util/jwt';

export async function handleGoogleLogin(tokenPayload: TokenPayload): Promise<TokenResponse> {
  return await getTokenForUser(tokenPayload);
}
