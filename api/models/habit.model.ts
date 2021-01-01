import * as mongoose from 'mongoose';
import { Schema, model, Model, Document } from 'mongoose';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { LogEntry } from './logEntry.model';

export enum NumericTypes {
  quantity = 'quantity',
  percentage = 'percentage',
  timespan = 'timespan',
  binary = 'binary',
}

export enum GoalTypes {
  dailyMax = 'dailyMax',
  dailyMin = 'dailyMin',
  futureDate = 'futureDate'
}

const HabitSchema = new Schema({
  profileId: mongoose.Schema.Types.ObjectId,
  name: String,
  frequency: { type: String, default: 'M;T;W;R;F;S;D' },
  startDate: { type: Date, default: getDefaultStartDate },
  endDate: Date,
  measurement: [{
    unit: String,
    numericType: { type: String, enum: Object.values(NumericTypes), default: NumericTypes.quantity },
    visible: Boolean,
    goal: Number,
    goalType: { type: String, enum: Object.values(GoalTypes), default: GoalTypes.futureDate },
    goalDate: Date
  }],
  logEntries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LogEntry'
    }
  ]
});

export interface Habit {
  profileId: string;
  name: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  measurement: Measurement;
  logEntries: LogEntry[];
}

export interface Measurement {
  unit: string;
  numericType: NumericTypes;
  visible: boolean;
  goal: number;
  goalType: GoalTypes;
  goalDate?: Date;
}

interface HabitBaseDocument extends Habit, Document {  }
export interface HabitDocument extends HabitBaseDocument {  }
export interface HabitPopulatedDocument extends HabitBaseDocument {  }
export interface HabitModel extends Model<HabitDocument> {  }
export default model<HabitDocument, HabitModel>('Habit', HabitSchema);

// helper function to return fresh Dayjs object for schemas
function getDefaultStartDate(): Dayjs {
  return dayjs();
}

