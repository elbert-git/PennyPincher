import Card from "../components/Card";
import { DataManager } from "../data/dataManager";
import RangeSlider from "../components/rangeSlider";
import { formatCurrency } from "../mathUtilities";

function MenuButton(props:{setPopIn:(b:boolean)=>any}){
  const length = "2rem"
  const style = {
    height: length,
    width: length
  }
  return (
    <svg onClick={()=>{props.setPopIn(true)}} style={style} width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.1333 58H228.866" stroke="black" strokeWidth="36" strokeLinecap="round"/>
      <path d="M27.1333 128H228.866" stroke="black" strokeWidth="36" strokeLinecap="round"/>
      <path d="M27.1333 198H228.866" stroke="black" strokeWidth="36" strokeLinecap="round"/>
    </svg>
  )
}

function getBalance(){
  const budget = DataManager.cache!.budget;
  let balance = budget
  DataManager.cache!.logEntries.forEach((entry)=>{
    balance -= entry.amount
  })
  return balance
}

export default function Balance(props:{setPopIn:(b:boolean)=>void}){
  const budget = DataManager.cache!.budget;
  const balance = Math.max(getBalance(), 0);
  return <Card>
    <div className="balance fillWidth flex">
      <div className="col1 flex flexGrow flexColumn flexJustifycenter">
        <h2 className="label"><strong>Balance</strong></h2>
        <RangeSlider value={(balance/budget)*100}></RangeSlider>
      </div>
      <div className="col2 flex flexAlignCenter flexJustifyCenter">
        <strong>${formatCurrency(balance)}</strong>
      </div>
      <MenuButton setPopIn={props.setPopIn}></MenuButton>
    </div>
  </Card>
}