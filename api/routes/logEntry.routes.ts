import * as express from 'express';
import { Router, Request, Response } from 'express'
import { getEntries, addEntry } from '../services/logEntry.service';

export function logEntryRoutes(): Router {
  const router = express.Router({ mergeParams: true });
  router.get('/', async(req: Request, res: Response) => {
    try {
      const habitId = req.params.habitId;
      if (habitId) {
        const logEntries = await getEntries(habitId);
        res.send(logEntries);
      } else {
        res.sendStatus(404);
      }
    } catch (err){
      res.status(500).send(err);
    }
  });

  router.post('/', async (req: Request, res: Response) => {
    try {
      const habitId = req.params.habitId;
      const entry = req.body;
      const newEntry = await addEntry(entry, habitId);
      res.status(201).send(newEntry._id);
    } catch(err) {
      res.status(500).send(err);
    }
  });

  return router;
}

