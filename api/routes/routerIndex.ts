import * as express from 'express';
import { Router } from 'express'
import { profileRoutes } from './profile.routes';
import { moduleListRoutes } from './moduleList.routes';
export function routerIndex(): Router {
    const router = express.Router();
    router.use('/', (req, res, next) => next(), requireUser);
    router.use('/profile', profileRoutes());
    router.use('/modulelist', moduleListRoutes());
    return router;
}

function requireUser(req, res, next) {
  if (req.user) {
      next();
  }
  else {
      res.sendStatus(401);
  }
}
