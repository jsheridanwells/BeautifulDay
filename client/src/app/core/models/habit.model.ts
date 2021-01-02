export interface HabitModel {
  _id: string;
  frequency: string;
  logEntries: any[]; // TODO : make a log entry type
  startDate: Date;
  endDate?: Date;
  name: string;
  measurement: any[] // TODO : make a type for this
}
