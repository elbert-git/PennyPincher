import createNewUserData from "./createDefaultData";
import { LogEntry, UserData } from "./dataInterfaces";

// local storage key
export const localStorageKey = 'pennyPincher'

function convertEpochToDateString(epochTimestamp: number): string {
  const date = new Date(epochTimestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


// main class
export class DataManager{
  static cache:UserData|null = null;
  static updateState:any = ()=>{console.log('this isdefautl callback')};
  constructor(){}
  static init(){
    // load from disk
    const rawRead = localStorage.getItem(localStorageKey)
    if(rawRead){ // if data exists then load to cache
      DataManager.cache = JSON.parse(rawRead) as UserData
    }else{ // if data doesn't exist then add new default data and save it and load to cache
      DataManager.cache = createNewUserData();
      localStorage.setItem(localStorageKey, JSON.stringify(this.cache))
    }
  }
  static clearData(){
    // clear cache
    localStorage.removeItem(localStorageKey);
    console.log('clearing data');
  }
  static SaveData(userData:UserData){
    DataManager.cache = userData;
    localStorage.setItem(localStorageKey, JSON.stringify(this.cache))
  }
  static SortByDate(){
    const finalData:{[index:string]:Array<LogEntry>} = {}
    DataManager.cache?.logEntries.forEach((log)=>{
      const dateString = convertEpochToDateString(log.timeStamp);
      if(finalData[dateString]){finalData[dateString].push(log)}
      else{finalData[dateString] = [log]}
    })
    return finalData
  }
  static addEntry(entry:LogEntry){
    // add to cache
    const newCache = DataManager.cache;
    newCache!.logEntries.push(entry);
    // save cache 
    DataManager.SaveData(newCache!)
    // update react
    DataManager.updateState()
  }
  static exportRecordsAsCSV(){
    let finalData = "category,amount,date\n"
    DataManager.cache!.logEntries.forEach((entry)=>{
      // create timestamp 
      const dateString = formatDateFromEpochTimestamp(entry.timeStamp)
      // create new entry and add it to string
      const entryString = `${entry.categoryKey}, ${entry.amount}, ${dateString} \n`;
      finalData += entryString
    })
    return finalData
  }

  static deleteEntry(id:string){
    // remove entry
    const logs = DataManager.cache!.logEntries
    const newLogs = logs.filter((log)=>{return log.id !== id})
    // save cache
    DataManager.cache!.logEntries = newLogs
    DataManager.SaveData(DataManager.cache!)
  }
}


function formatDateFromEpochTimestamp(epochTimestampString:number):string {
    // Create a new Date object with the epoch timestamp
    const date = new Date(epochTimestampString);
    // Extract day, month, and year
    const day = date.getDate().toString().padStart(2, '0'); // Pad single-digit days with a leading zero
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const year = date.getFullYear();
    // Format the date as "dd/mm/yyyy"
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}
