import HabitModel, { Habit, HabitDocument } from '../models/habit.model';

export async function createHabit(habitData: any, profileId: string): Promise<Habit> {
  const habit = { ...habitData, profileId };
  console.log('create habit args', habitData, profileId);
  const newHabit = new HabitModel(habit);
  return newHabit.save();
}

export async function listHabits(profileId: string): Promise<HabitDocument[]> {
  return await HabitModel.find({ profileId });
}

// export async function editHabit(habit) {

// }

// export async function removeHabit(habit) {

// }

