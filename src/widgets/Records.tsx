import { DataManager } from "../data/dataManager"
import Card from "../components/Card";
import { useState, } from "react";
import { categories } from "../data/constants";
import { formatCurrency } from "../mathUtilities";

function RecordEntry(props:{amount:string, categoryColor:string, categoryKey:string, id:string, deleteEntry:(s:string)=>void}){
  return <div className="recordEntry flex flexJustifyBetween flexGrow" style={{backgroundColor:props.categoryColor}}>
    <div className="flex flexAlignCenter">
      <XIcon deleteEntry={props.deleteEntry} id={props.id}></XIcon>
      <div style={{marginLeft:"0.5rem"}}><strong>{props.categoryKey}</strong></div>
    </div>
    <div><strong>{`$${props.amount}`}</strong></div>
  </div>
}

function XIcon(props:{deleteEntry:(s:string)=>void, id:string}){
  return (
    <svg onClick={()=>{props.deleteEntry(props.id)}} className="interactive" height="1.25rem" viewBox="0 0 41 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.459 12.6426L28.459 28.6426" stroke="black" strokeWidth="4" strokeLinecap="round"/>
      <path d="M28.459 12.6426L12.459 28.6426" stroke="black" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="20.459" cy="20.6436" r="18.4053" stroke="black" strokeWidth="4"/>
    </svg>
  )
}


export default function Records(){
  // states
  const [records, ] = useState(DataManager.cache!.logEntries)
  const allCats = Object.keys(categories)
  const [visibleCategories ,setVisibleCategories] = useState<Array<string>>(allCats)

  const deleteEntry = (id:string)=>{
    // delete
    DataManager.deleteEntry(id);
    // udpate ui
    window.location.reload()
  }
  
  const toggleCategories = (key:string)=>{
    if(visibleCategories.includes(key)){
      const newState = visibleCategories.filter(currKey=>!(currKey===key))
      setVisibleCategories(newState)
    }
    else{
      const newState = [...visibleCategories, key]
      setVisibleCategories(newState);
    }
  }

  return <div className="records">
    <Card>
      <h2>Records</h2>
      {/* buttons */}
      <div className="flex flexJustifyCenter flexWrap fillWidth">
        {allCats.map((cat)=>{
          const color = categories[cat].color
          const isActive = visibleCategories.includes(cat);
          const style = {
            backgroundColor:color,
            border:'none',
            padding:'0.5rem',
            margin:'0.5rem',
            borderRadius:'1rem',
            transition:'0.3s',
            transform: isActive ? 'scale(1)':'scale(0.8)',
            opacity: isActive ? '1': '0.5'
          }
          return <button className="interactive" style={style} key={cat} onClick={()=>{toggleCategories(cat)}}>{cat}</button>
        })}
      </div>
      {/* entries */}
      {records.filter(entry=>visibleCategories.includes(entry.categoryKey)).reverse().map((entry)=>{
        return <RecordEntry key={entry.id} id={entry.id} amount={formatCurrency(entry.amount)} categoryColor={entry.categoryColor} categoryKey={entry.categoryKey} deleteEntry={deleteEntry}></RecordEntry>
      })}
    </Card>
  </div>
}