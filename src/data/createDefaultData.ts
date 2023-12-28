import { LogEntry, UserData } from "./dataInterfaces"
import { categories, Category } from "./constants";
import {v4 as uuid} from 'uuid';

function getRandomTimestampInPastMonth(): number {
  const currentDate = new Date();
  const currentTimestamp = currentDate.getTime();
  
  const pastMonth = currentDate.getMonth() - 1;
  const pastMonthDate = new Date(currentDate.getFullYear(), pastMonth, 1);
  
  const pastMonthTimestamp = pastMonthDate.getTime();
  const randomTimestamp = Math.floor(Math.random() * (currentTimestamp - pastMonthTimestamp)) + pastMonthTimestamp;
  
  return randomTimestamp;
}


export default function createNewUserData(budget=500){
  const userData:UserData = {
    budget:budget,
    logEntries: []
  }
  return userData
}

export function createFakeUserData(budget=500){
  // get random category
  const userData:UserData = {
    budget:budget,
    logEntries: Array(50).fill(0).map((val)=>{
      const categoryKeys = Object.keys(categories)
      const randomIndex = Math.floor(Math.random()*categoryKeys.length);
      const category:Category  = categories[categoryKeys[randomIndex]]
      val;
      const logEntry:LogEntry = {
        amount: Number((Math.random()*100).toFixed(2)),
        timeStamp:getRandomTimestampInPastMonth(),
        categoryKey: category.key,
        categoryColor: category.color,
        id:uuid()
      }
      return logEntry
    })
  }
  return userData
}