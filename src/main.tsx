import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './styles/css/main.css'
import { DataManager } from './data/dataManager'
import PennyInputSystem from './pennyInput/PennyInput'

// init data manager
DataManager.init();

// ! testing reset data
window.addEventListener('keydown', (e)=>{
  if(e.key === 'm'){
    DataManager.clearData();
  }
})

// penny pincher input system
new PennyInputSystem();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
