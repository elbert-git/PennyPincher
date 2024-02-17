import Balance from "./widgets/balance"
import Charts from "./widgets/charts"
import Records from "./widgets/Records"
import { useReducer } from "react"
import { DataManager } from "./data/dataManager"
import SettingsPopUp from "./widgets/settingsPopUp"
import { useState } from "react"

function customDispatch(){
  return {count:0}
}

export default function App(){
  // allow data manger to update state (react is stupid man)
  const [, dispatch] =useReducer(customDispatch, {count:0})
  DataManager.updateState = dispatch;

  // settings pop in
  const [popIn, setPopIn] = useState(false);

  return <div className="mainScroller">
    <Balance setPopIn={setPopIn}/> 
    <Charts/>
    <Records/>
    <SettingsPopUp popIn={popIn} setPopIn={setPopIn}></SettingsPopUp>
  </div>
}