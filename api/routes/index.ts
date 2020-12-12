import * as express from 'express';
import { Router } from 'express'

export function routerIndex(): Router {
    const router = express.Router();
    router.get('/', (req, res) => res.send('<h1>hi!</h1>'));
    return router;
};
