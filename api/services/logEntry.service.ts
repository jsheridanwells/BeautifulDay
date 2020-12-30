import LogEntryModel, { LogEntry, LogEntryDocument } from '../models/logEntry.model';

export async function getEntries(habitId: string): Promise<LogEntry[]> {
  return await LogEntryModel.find({ habitId });
}

export async function addEntry(entry: any, habitId: string): Promise<LogEntryDocument> {
  const newEntry = new LogEntryModel({ ...entry, habitId });
  await newEntry.save();
  return newEntry;
}
