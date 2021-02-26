import * as express from 'express';
import { Router, Request, Response, NextFunction } from 'express'
import { AppRequest } from '../types/AppRequest';
import { habitRoutes } from './habit.routes';

export function routerIndex(): Router {
    const router = express.Router();
    router.use('/', (req: AppRequest, res: Response, next: NextFunction) => next(), requireUser);
    router.use('/habits', habitRoutes());
    return router;
}

function requireUser(req: AppRequest, res: Response, next: NextFunction): void {
  if (req.user) {
    next();
  }
  else
    res.sendStatus(401);
}
