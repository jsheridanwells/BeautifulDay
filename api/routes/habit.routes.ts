import * as express from 'express';
import { Router, Request, Response } from 'express';
import { AppRequest } from '../types/AppRequest';
import { createHabit, listHabits, getHabitById } from '../services/habit.service';
import { logEntryRoutes } from './logEntry.routes';

export function habitRoutes(): Router {
  const router = express.Router();

  router.post('/', async (req: AppRequest, res: Response) => {
    try {
      const profileId = req.user?.profileId;
      if (profileId) {
        const habitData = req.body;
        const habit = await createHabit(habitData, profileId);
        res.status(201).send(habit._id);
      } else {
        res.status(404).send();
      }
    } catch(err) {
      res.status(500).send(err);
    }
  });

  router.get('/', async (req: AppRequest, res: Response) => {
    try {
      const profileId = req.user?.profileId as string;
      const habits = await listHabits(profileId);
      res.send(habits);
    } catch(err) {
      res.status(500).send(err);
    }
  });

  router.get('/:habitId', async (req: AppRequest, res: Response) => {
    try {
      const habitId = req.params.habitId;
      const profileId = req.user?.profileId as string;
      const habit = await getHabitById(habitId, profileId);
      if (habit) {
        res.send(habit);
      } else {
        res.sendStatus(404);
      }
    } catch(err) {
      res.status(500).send(err);
    }
  });

  router.use('/:habitId/logEntries', logEntryRoutes());

  return router;
}
