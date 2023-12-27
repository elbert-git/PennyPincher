import { DataManager } from "../data/dataManager"
import Card from "../components/Card";
import { useState } from "react";
import { categories } from "../data/constants";

function RecordEntry(props:{amount:number, categoryColor:string, categoryKey:string}){
  return <div className="recordEntry flex flexJustifyBetween" style={{backgroundColor:props.categoryColor}}>
    <div><strong>{props.categoryKey}</strong></div>
    <div><strong>{`$${props.amount}`}</strong></div>
  </div>
}

export default function Records(){
  const records = DataManager.cache!.logEntries;
  const allCats = Object.keys(categories)
  const [visibleCategories ,setVisibleCategories] = useState<Array<string>>(allCats)

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
      {records.filter(entry=>visibleCategories.includes(entry.categoryKey)).map((entry)=>{
        return <RecordEntry key={entry.id} amount={entry.amount} categoryColor={entry.categoryColor} categoryKey={entry.categoryKey}></RecordEntry>
      })}
    </Card>
  </div>
}