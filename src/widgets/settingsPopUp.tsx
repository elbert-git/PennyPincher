import { useEffect, useRef, useState } from "react"
import { DataManager } from "../data/dataManager"
import { downloadTextFile, isValidNumber, getCurrentDateAsString } from "../mathUtilities";

export default function SettingsPopUp(props:{popIn:boolean, setPopIn:(b:boolean)=>any}){
  const budgetInput = useRef<any>()
  const [clearLogCount, setClearLogCount] = useState(5);

  // set budget input
  useEffect(()=>{
    budgetInput.current.value = DataManager.cache!.budget
  }, [budgetInput.current])

  const setBudget = ()=>{
    const currentValue = budgetInput.current.value;
    if(isValidNumber(currentValue)){
      // update datamanager
      DataManager.cache!.budget = parseFloat(budgetInput.current.value);
      DataManager.SaveData(DataManager.cache!)
      DataManager.updateState();
      // pop down
      props.setPopIn(false)
    }else{
      alert("not a valid Number")
    }
  }

  const clearLogs = ()=>{
    if(clearLogCount <= 0){
      const newData = DataManager.cache!;
      newData.logEntries = []
      DataManager.SaveData(newData)
      window.location.reload()
    }else{
      setClearLogCount(clearLogCount-1)
    }
  }
  
  const exportLogs = ()=>{
    const csv = DataManager.exportRecordsAsCSV();
    console.log(csv);
    downloadTextFile(csv, `PennyPincherRecords_${getCurrentDateAsString()}.csv`)
    console.log("exporting logs is not done")
  }

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
      {clearLogCount === 5 ? <button className="interactive" onClick={clearLogs}>Clear Logs</button> : <button className="interactive" onClick={clearLogs}>Press {clearLogCount+1} more times</button>}
      <button className="interactive" onClick={exportLogs}>Export Logs</button>
    </div>
    <button className="interactive popUpReturnButton" onClick={()=>{props.setPopIn(false)}}>return</button>
   </div>
  </div>
}