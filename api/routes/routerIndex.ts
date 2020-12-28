import * as express from 'express';
import { Router } from 'express'
export function routerIndex(): Router {
    const router = express.Router();
    router.use('/', (req, res, next) => next(), requireUser);
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
