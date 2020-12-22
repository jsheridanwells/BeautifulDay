declare module 'livereload';
declare module 'swagger-ui-express';
declare module 'swagger.json';

declare namespace Express {
  export interface Request {
    user?: { email: string, googleSubId: string } | null
  }
}
