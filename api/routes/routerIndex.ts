import * as express from 'express';
import { Router } from 'express'
import { authRoutes } from './auth.routes';

export function routerIndex(): Router {
    const router = express.Router();
    // TODO : this is for all protected endpoints
    router.get('/', (req, res) => res.send('<h1>hi!</h1>'));
    router.use('/auth', authRoutes());
    return router;
}
