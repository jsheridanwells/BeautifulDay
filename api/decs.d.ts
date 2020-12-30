declare module 'livereload';
declare module 'swagger-ui-express';
declare module 'swagger.json';

declare namespace Express {
  export interface Request {
    user?: { googleSubId: string | null, profileId: string | null } | null
  }
}

declare type TokenPayload = {
  given_name: string;
  family_name: string;
  email: string;
  sub: string;
  picture: string;
}
