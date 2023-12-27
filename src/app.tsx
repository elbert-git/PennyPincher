import Balance from "./widgets/balance"
import Charts from "./widgets/charts"
import Records from "./widgets/Records"

export default function App(){
  return <div className="mainScroller">
    <Balance/> 
    <Charts/>
    <Records/>
  </div>
}