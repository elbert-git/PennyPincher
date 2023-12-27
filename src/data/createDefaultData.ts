import { LogEntry, UserData } from "./dataInterfaces"
import { categories, Category } from "./constants";
import {v4 as uuid} from 'uuid';

function getTimestampInPastMonth(): number {
  const currentDate = new Date();
  // Get the current month and year
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  // Calculate the previous month
  currentMonth -= 1;
  if (currentMonth < 0) {
    currentMonth = 11; // December (0-based index)
    currentYear -= 1;
  }
  // Set the date to the 1st day of the previous month
  const previousMonthDate = new Date(currentYear, currentMonth, 1);
  // Get the timestamp for the 1st day of the previous month
  const timestamp = previousMonthDate.getTime();
  return timestamp;
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
        timeStamp:getTimestampInPastMonth(),
        categoryKey: category.key,
        categoryColor: category.color,
        id:uuid()
      }
      return logEntry
    })
  }
  return userData
}