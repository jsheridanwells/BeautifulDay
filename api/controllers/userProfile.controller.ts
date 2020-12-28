import { getTokenForUser } from '../services/userProfile.service';

export async function handleGoogleLogin(tokenAttributes: { envelope?: string, payload?: TokenPayload } | any): Promise<any> {
    return await getTokenForUser(tokenAttributes);
}

