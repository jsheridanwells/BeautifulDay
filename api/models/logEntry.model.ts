import * as mongoose from 'mongoose';
import { Schema, model, Model, Document } from 'mongoose';

const LogEntrySchema = new Schema({
  habitId: mongoose.Types.ObjectId,
  active: { type: Boolean, default: true },
  value: Number,
  entryDate: Date,
  note: { type: String, maxlength: 140 }
});

export interface LogEntry {
  habitId: string;
  active: boolean;
  value: number;
  entryDate: Date;
  note: string;
}

interface LogEntryBaseDocument extends LogEntry, Document {  }
export interface LogEntryDocument extends LogEntryBaseDocument {  }
export interface LogEntryPopulatedDocument extends LogEntryBaseDocument {  }
export interface LogEntryModel extends Model<LogEntryDocument> {  }
export default model<LogEntryDocument, LogEntryModel>('LogEntry', LogEntrySchema);
