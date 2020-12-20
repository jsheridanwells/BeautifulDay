import { createOrGetUserProfile } from '../services/userProfile.service';

export async function handleGoogleLogin(tokenAttributes: { envelope?: string, payload?: TokenPayload } | any): Promise<any> {
  console.log('controller arg:', tokenAttributes);
  return await createOrGetUserProfile(tokenAttributes);
}
