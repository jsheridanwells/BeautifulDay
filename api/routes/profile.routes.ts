import * as express from 'express';
import { Router } from 'express';
import { handleUserProfileRequest } from '../controllers/userProfile.controller';

export function profileRoutes(): Router {
  const router = express.Router();
  return router.get('/', async(req, res) => {
    try {
      const googleSubId = req.user?.googleSubId;
      const profile = await handleUserProfileRequest(googleSubId as string);
      return res.send(profile);
    } catch (err: any) {
      return res.status(500).send();
    }
  });
}
