import HabitModel, { Habit, HabitDocument } from '../models/habit.model';

export async function createHabit(habitData: any, profileId: string): Promise<Habit> {
  console.log('create habit args', habitData, profileId);
  const habit = { ...habitData, profileId };
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

