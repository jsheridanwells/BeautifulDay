import * as express from 'express';
import { Router } from 'express';
import oAuthClient from '../util/googleOauth';
import { handleGoogleLogin } from '../controllers/userProfile.controller';

export function authRoutes(): Router {
  const router = express.Router();
  return router.post('/', async(req, res) => {
    await oAuthClient.verifyIdToken({
      idToken: req.body.idToken,
      audience: oAuthClient._clientId
    })
    .then((ticket): any => {
      return handleGoogleLogin(ticket.getPayload());
    })
    .then(response => res.send(response))
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
  });
}
