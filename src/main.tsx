import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/css/main.css";
import initializeServiceWorkers from './pwa/initialiseServiceWorker';
import MainScreen from './reactStuff/MainScreen';
import StateManager from './reactStuff/stateManager';

//initialise service workers
// initializeServiceWorkers();

//initialise state manager
const stateManager = new StateManager();

// initialise react stuff
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainScreen></MainScreen>
  </React.StrictMode>,
)
