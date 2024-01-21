import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './styles/css/main.css'
import { DataManager } from './data/dataManager.ts'
import PennyInput from './pennyInput/touchInput.ts'
import TouchInputDebugCanvas from './pennyInput/debugCanvas.ts'
import InputBG from './pennyInput/inputBG.ts'

// init data manager
DataManager.init();

// ! testing reset data
window.addEventListener('keydown', (e)=>{
  if(e.key === 'm'){
    DataManager.clearData();
  }
})

//start penny input
const pennyInput = new PennyInput(); pennyInput
// const debugCanvas = new TouchInputDebugCanvas(pennyInput); debugCanvas
const inputBG = new InputBG();



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

