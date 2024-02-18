import { useRef } from "react"
import { DataManager } from "../data/dataManager"
import { isValidNumber } from "../mathUtilities";

export default function SettingsPopUp(props:{popIn:boolean, setPopIn:(b:boolean)=>any}){
  const budgetInput = useRef<any>()

  const setBudget = ()=>{
    const currentValue = budgetInput.current.value;
    if(isValidNumber(currentValue)){
      DataManager.cache!.budget = parseFloat(budgetInput.current.value);
      DataManager.SaveData(DataManager.cache!)
      DataManager.updateState();
    }else{
      alert("not a valid Number")
    }
  }

  const clearLogs = ()=>{
    const newData = DataManager.cache!;
    newData.logEntries = []
    DataManager.SaveData(newData)
    window.location.reload()
  }
  
  const exportLogs = ()=>{console.log("exporting logs is not done")}

  const togglePop = ()=>{
    props.setPopIn(false)
  }

  const bgClass = ()=>{
    if(props.popIn){
      return "popUpBg"
    }else{
      return "popUpBg popUpFadeOut"
    }
  }

  const sliderClass = ()=>{
    if(props.popIn){
      return "popUpSlider"
    }else{
      return "popUpSlider popUpSliderDown"
    }
  }

  return <div className="popUp">
   <div className={bgClass()} onClick={togglePop}></div> 
   <div className={sliderClass()}>
    <div className="card flex flexColumn flexAlignCenter settingsCard">
      <h1>Settings</h1>
      <div className="budgetSettings flex flexJustifyBetween fillWidth">
        <div className="setBudget">Set Budget</div>
        <span>
          $
          <input className="setBudgetInput" type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" ref={budgetInput}/>
        </span>
      </div>
      <button className="interactive" onClick={setBudget}>Set</button>
      <div className="divider"></div>
      <button className="interactive" onClick={clearLogs}>Clear Logs</button>
      <button className="interactive" onClick={exportLogs}>Export Logs</button>
    </div>
    <button className="interactive popUpReturnButton" onClick={()=>{props.setPopIn(false)}}>return</button>
   </div>
  </div>
}