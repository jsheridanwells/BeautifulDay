import * as mongoose from 'mongoose';
import HabitModel, { Habit, HabitDocument } from '../models/habit.model';

export async function createHabit(habitData: any, profileId: string): Promise<HabitDocument> {
  const habit = { ...habitData, profileId };
  const newHabit = new HabitModel(habit);
  return await newHabit.save();
}

export async function listHabits(profileId: string): Promise<HabitDocument[]> {
  return await HabitModel.find({ profileId });
}

export async function getHabitById(habitId: string, profileId: string): Promise<HabitDocument | null> {
  if (mongoose.Types.ObjectId.isValid(habitId)) {
    return await HabitModel.findOne({ _id: habitId, profileId });
  } else {
    return null;
  }
}

// export async function editHabit(habit) {

// }

// export async function removeHabit(habit) {

// }

