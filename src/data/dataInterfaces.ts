// interfaces
export interface UserData{
  budget:number;
  logEntries:Array<LogEntry>;
}

export interface LogEntry{
  amount:number;
  categoryKey:string;
  categoryColor:string;
  timeStamp:EpochTimeStamp;
  id:string
}