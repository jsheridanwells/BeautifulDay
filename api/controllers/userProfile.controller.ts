import { getTokenForUser, getUserProfile } from '../services/userProfile.service';

export async function handleGoogleLogin(tokenAttributes: { envelope?: string, payload?: TokenPayload } | any): Promise<any> {
    return await getTokenForUser(tokenAttributes);
}

export async function handleUserProfileRequest(googleSubId: string): Promise<any> {
  return await getUserProfile(googleSubId);
}
