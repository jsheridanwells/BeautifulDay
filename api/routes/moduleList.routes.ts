import * as express from 'express';
import { Router } from 'express';
import { getModuleList } from '../util/seedModuleList';

export function moduleListRoutes(): Router {
  const router = express.Router();
  return router.get('/', async (req, res) => {
    const moduleList = await getModuleList();
   return res.send(moduleList);
  });
}
