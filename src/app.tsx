import Balance from "./widgets/balance"
import Charts from "./widgets/charts"
import Records from "./widgets/Records"
import { useReducer } from "react"
import { DataManager } from "./data/dataManager"

function customDispatch(){
  return {count:0}
}

export default function App(){
  // allow data manger to update state (react is stupid man)
  const [, dispatch] =useReducer(customDispatch, {count:0})
  DataManager.updateState = dispatch;
  return <div className="mainScroller">
    <Balance/> 
    <Charts/>
    <Records/>
  </div>
}