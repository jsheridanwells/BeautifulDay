import * as express from 'express';
import { Router, Request, Response, NextFunction } from 'express'
import { habitRoutes } from './habit.routes';

export function routerIndex(): Router {
    const router = express.Router();
    router.use('/', (req: Request, res: Response, next: NextFunction) => next(), requireUser);
    router.use('/habits', habitRoutes());
    return router;
}

function requireUser(req: Request, res: Response, next: NextFunction): void {
  if (req.user){
    console.log('user?', req.user);
    next();
  }
  else
    res.sendStatus(401);
}
