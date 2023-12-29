import { useEffect, useRef } from "react";
import Card from "../components/Card";
import ReactSwipe from 'react-swipe'
import { PieChartCanvas, BarChartCanvas } from "../ChartCanvas";
import { DataManager } from "../data/dataManager";
import { categories } from "../data/constants";


const pieCanvas = new PieChartCanvas();
const barCanvas = new BarChartCanvas();

export default function Charts(){
  const elPieChart = useRef<HTMLCanvasElement|null>(null);
  const elBarChart = useRef<HTMLCanvasElement|null>(null);
  const cache = DataManager.cache;

  useEffect(()=>{
    // set canvas elements
    pieCanvas.setElement(elPieChart.current as HTMLCanvasElement)
    barCanvas.setElement(elBarChart.current as HTMLCanvasElement)
    // set set pie data
    const logs = cache!.logEntries;
    const pieDatas:{[index:string]:{amount:number, color:string}} = {};
    const allCats = Object.keys(categories);
    allCats.forEach((cat)=>{pieDatas[cat] = {amount:0, color: categories[cat].color}})
    for (let index = 0; index < logs.length; index++) {
      const log = logs[index];
      pieDatas[log.categoryKey].amount += log.amount 
    }
    pieCanvas.setData(pieDatas)
    // set bar chart data
    barCanvas.setData(DataManager.SortByDate())
  }, [elPieChart.current])

  return <Card>
    <ReactSwipe className="carousel">
      <div>
        <h2>Expense Breakdown</h2>
        <canvas className="chart" ref={elPieChart}></canvas>
      </div>
      <div>
        <h2>Balance Trajectory</h2>
        <div>(past 30 days)</div>
        <canvas className="chart" ref={elBarChart}></canvas>
      </div>
    </ReactSwipe>
  </Card>
}
