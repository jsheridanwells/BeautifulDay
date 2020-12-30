import * as mongoose from 'mongoose';
import { Schema, model, Model, Document } from 'mongoose';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

const HabitSchema = new Schema({
  profileId: mongoose.Schema.Types.ObjectId,
  name: String,
  frequency: { type: String, default: 'M;T;W;R;F;S;D' },
  startDate: { type: Date, default: getDefaultStartDate },
  endDate: { type: Date, default: getDefaultEndDate }
});

export interface Habit {
  profileId: string;
  name: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
}

interface HabitBaseDocument extends Habit, Document {  }
export interface HabitDocument extends HabitBaseDocument {  }
export interface HabitPopulatedDocument extends HabitBaseDocument {  }
export interface HabitModel extends Model<HabitDocument> {  }
export default model<HabitDocument, HabitModel>('Habit', HabitSchema);

function getDefaultStartDate(): Dayjs {
  return dayjs();
}

function getDefaultEndDate(): Dayjs {
  return dayjs().add(30, 'day');
}
