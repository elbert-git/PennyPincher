import { createFakeUserData } from "./createDefaultData";
import { LogEntry, UserData } from "./dataInterfaces";
import { useReducer } from "react";

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
  static updateState:(newEntry:any)=>any = ()=>{const [, forceUpdate] = useReducer(x => x + 1, 0)};
  constructor(){}
  static init(){
    // load from disk
    const rawRead = localStorage.getItem(localStorageKey)
    if(rawRead){ // if data exists then load to cache
      DataManager.cache = JSON.parse(rawRead) as UserData
    }else{ // if data doesn't exist then add new default data and save it and load to cache
      DataManager.cache = createFakeUserData();
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
    console.log('from data manager', 'has saved entry')
    // add to cache
    const newCache = DataManager.cache;
    newCache!.logEntries.push(entry);
    // save cache 
    DataManager.SaveData(newCache!)
    // update react
    DataManager.updateState(DataManager.cache!.logEntries)
  }
}
