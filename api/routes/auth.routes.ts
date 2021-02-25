import * as express from 'express';
import { Router, Request, Response } from 'express'
import oAuthClient from '../util/googleOauth';
import { getTokenForUser } from '../services/profile.service';
import { tick } from '@angular/core/testing';

export function authRoutes(): Router {
  const router = express.Router();
  return router.post('/', async(req: Request, res: Response) => {
    try {
      const ticket = await oAuthClient.verifyIdToken({
        idToken: req.body.idToken,
        audience: oAuthClient._clientId
      });
      // const tokenResponse = await getTokenForUser(ticket.getPayload() as TokenPayload);
      // if(tokenResponse) {
      //   return res.send(tokenResponse);
      // } else {
      //   return res.status(401).send();
      // }
      console.log('ticket? ', ticket);
      return res.send(ticket);
    } catch(err: any) {
      return res.status(500).send(err);
    }
  });
}
