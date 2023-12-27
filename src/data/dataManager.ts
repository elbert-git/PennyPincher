import { createFakeUserData } from "./createDefaultData";
import { UserData } from "./dataInterfaces";

// local storage key
export const localStorageKey = 'pennyPincher'

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
}