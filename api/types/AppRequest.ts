import { Request } from 'express';

export interface AppRequest extends Request {
  user?: { googleSubId: string | null, profileId: string | null } | null
}
  