import * as express from 'express';
import { Router, Request, Response } from 'express'
import oAuthClient from '../util/googleOauth';
import { handleGoogleLogin } from '../controllers/userProfile.controller';

export function authRoutes(): Router {
  const router = express.Router();
  return router.post('/', async(req: Request, res: Response) => {
    try {
      const ticket = await oAuthClient.verifyIdToken({
        idToken: req.body.idToken,
        audience: oAuthClient._clientId
      });
      const token = await handleGoogleLogin(ticket.getPayload() as TokenPayload);
      return res.send(token);
    } catch(err: any) {
      return res.status(401).send();
    }
  });
}
