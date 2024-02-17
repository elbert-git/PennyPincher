import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './styles/css/main.css'
import { DataManager } from './data/dataManager.ts'
import PennyInputSystem from './pennyInput/PennyInput.ts'
import createBody from './setupBody.ts'

// init data manager
DataManager.init();

// create body
createBody();

// ! testing reset data
window.addEventListener('keydown', (e)=>{
  if(e.key === 'm'){
    DataManager.clearData();
  }
})

//new pennyInput
new PennyInputSystem();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
