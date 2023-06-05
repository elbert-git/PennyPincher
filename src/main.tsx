import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/css/main.css";
import initializeServiceWorkers from './pwa/initialiseServiceWorker';
import MainScreen from './reactStuff/MainScreen';
import StateManager from './reactStuff/stateManager';
import Categories from './data/catergories';
import { ColorConstants } from './data/catergoryColors';

//! commenting this to stop errors in dev
//! uncomment in production build
//initialise service workers
// initializeServiceWorkers();

// create temp categories
const categories = new Categories();
Object.keys(ColorConstants).forEach((key:string)=>{
  categories.addCategory(key, ColorConstants[key] as string);
})
console.log(categories.cache);


//initialise state manager
const stateManager = new StateManager();

// initialise react stuff
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainScreen></MainScreen>
  </React.StrictMode>,
)
