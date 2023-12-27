import Card from "../components/Card";
import { DataManager } from "../data/dataManager";
import RangeSlider from "../components/rangeSlider";

export default function Balance(){
  // todo calculate balance
  const balance = DataManager.cache!.budget.toFixed(2)
  return <Card>
    <div className="balance fillWidth flex">
      <div className="col1 flex flexGrow flexColumn flexJustifycenter">
        <h2 className="label"><strong>Balance</strong></h2>
        <RangeSlider value={30}></RangeSlider>
      </div>
      <div className="col2 flex flexAlignCenter flexJustifyCenter">
        <strong>{`$${balance}`}</strong>
      </div>
    </div>
  </Card>
}