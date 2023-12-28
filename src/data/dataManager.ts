import { createFakeUserData } from "./createDefaultData";
import { LogEntry, UserData } from "./dataInterfaces";

// local storage key
export const localStorageKey = 'pennyPincher'

function formatTimestampToDDMM(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with zero if needed
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0, so add 1. Pad with zero if needed
  return `${day}/${month}`;
}


// main class
export class DataManager{
  static cache:UserData|null = null;
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
      const dateString = formatTimestampToDDMM(log.timeStamp);
      if(finalData[dateString]){finalData[dateString].push(log)}
      else{finalData[dateString] = [log]}
    })
    return finalData
  }
}