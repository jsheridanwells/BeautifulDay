import * as express from 'express';
import { Router, Request, Response } from 'express'
import { createHabit, listHabits } from '../services/habit.service';

export function habitRoutes(): Router {
  const router = express.Router();
  router.post('/', async (req: Request, res: Response) => {
    const profileId = req.user?.profileId;
    if (profileId) {
      const habitData = req.body;
      const result = await createHabit(habitData, profileId);
      return res.send(result);
    } else {
      return res.sendStatus(404).send();
    }
  });
  router.get('/', async (req: Request, res: Response) => {
    const profileId = req.user?.profileId as string;
    const habits = await listHabits(profileId);
    return res.send(habits);
  });
  router.put('/', async (req: Request, res: Response) => {
    res.send('[putted]');
  });
  router.delete('/', async (req: Request, res: Response) => {
    res.send('trashed!!!!');
  });
  return router;
}
