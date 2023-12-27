import { LogEntry, UserData } from "./dataInterfaces"
import { categories, Category } from "./constants";
import {v4 as uuid} from 'uuid';

function getRandomTimestampPastYear(): number {
  const currentDate = new Date(); // Get the current date
  const currentTimestamp = currentDate.getTime(); // Get the current timestamp
  // Calculate the timestamp range for the past year (in milliseconds)
  const oneYearAgoTimestamp = currentTimestamp - (365 * 24 * 60 * 60 * 1000);
  // Generate a random timestamp within the past year
  const randomTimestamp = Math.floor(Math.random() * (currentTimestamp - oneYearAgoTimestamp)) + oneYearAgoTimestamp;
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
        timeStamp:getRandomTimestampPastYear(),
        categoryKey: category.key,
        categoryColor: category.color,
        id:uuid()
      }
      return logEntry
    })
  }
  return userData
}