import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/css/main.css";
import initializeServiceWorkers from './pwa/initialiseServiceWorker';
import MainScreen from './reactStuff/MainScreen';
import StateManager from './reactStuff/stateManager';
import Categories from './data/catergories';
import { ColorConstants } from './data/catergoryColors';
import Records from './data/records';
import { Record } from './data/records';
import { v4 as uuid } from 'uuid';

//! commenting this to stop errors in dev
//! uncomment in production build
//initialise service workers
// initializeServiceWorkers();

// create temp categories
const categories = new Categories();
Object.keys(ColorConstants).forEach((key:string)=>{
  categories.addCategory(key, ColorConstants[key] as string);
})

//create temp records
const records = new Records();
(()=>{ //create fake records
  for (let index = 0; index < 20; index++) {
    //create record
    //choose random color
    const cache = Categories.instance!.cache;
    const categoryPicked = cache[Math.floor(Math.random()*(cache.length-1))]
    const record:Record = {
      amount: Number((Math.random()*50).toFixed(2)),
      id: uuid(),
      category: categoryPicked.name,
      color: categoryPicked.color
    }
    //push to categories
    records.cache.push(record);
  }
  console.log(records.cache)
})()


//initialise state manager
const stateManager = new StateManager();

// initialise react stuff
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainScreen></MainScreen>
  </React.StrictMode>,
)
