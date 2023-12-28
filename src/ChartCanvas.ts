import { LogEntry } from "./data/dataInterfaces";
import { DataManager } from "./data/dataManager";

function lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
}


export class ChartCanvas{
  element:HTMLCanvasElement|null = null;
  ctx:CanvasRenderingContext2D|null = null
  color = 'white'
  size = {x:0, y:0}
  constructor(){
    setInterval(this.update.bind(this), 1000);
    this.update();
  }
  setElement(el:HTMLCanvasElement){
    this.element = el;
    this.ctx = el.getContext('2d');
    this.resize();
  }
  update(){
    if(this.element && this.ctx){
      const ctx = this.ctx
      ctx.rect(0, 0, this.size.x, this.size.y);
      ctx.fillStyle = this.color;
      ctx.fill()
    }
  }
  resize(){
    this.size = {
      x: this.element!.clientWidth,
      y: this.element!.clientHeight
    }
    this.element!.width = this.size.x; this.element!.height = this.size.y
  }
}

interface PieChartData{
  [index:string]:{amount:number, color:string}
}

export class PieChartCanvas extends ChartCanvas{
  piesToDraw:Array<{angle:number, color:string}>|null = null
  constructor(){
    super();
  }
  setData(data:PieChartData){ // accepts object of key value paris
    // get total
    let totalAmount = 0
    const keys = Object.keys(data)
    for (let index = 0; index < keys.length; index++) {
      totalAmount += data[keys[index]].amount
    }
    // get all pies data
    this.piesToDraw = Object.keys(data).map((key)=>{return {
      key: key,
      angle: (data[key].amount/totalAmount)*(Math.PI*2),
      color: data[key].color
    }})
  }
  update(): void {
    super.update();
    // draw pies
    let currAngle = 0
    if(this.piesToDraw){
      for (let index = 0; index < this.piesToDraw.length; index++) {
        const pie:any = this.piesToDraw[index]
        const ctx = this.ctx!;
        const center = {x:this.size.x/2, y:this.size.y/2}
        ctx.beginPath();
        ctx.moveTo(center.x, center.y)
        ctx.arc(
          this.size.x/2,
          this.size.y/2,
          this.element!.clientHeight * 0.4,
          currAngle,
          pie.angle + currAngle,
        )
        ctx.lineTo(center.x, center.y)
        ctx!.fillStyle = pie.color;
        ctx!.fill()
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.stroke()
        currAngle += pie.angle;
      }
    }
  }
}

export class BarChartCanvas extends ChartCanvas{
  padding = 16;
  data:{[index:string]:Array<LogEntry>} = {}
  historyOfBalances:Array<number> = []
  constructor(){
    super();
  }
  update(): void {
    super.update();
    if(this.ctx){
      this.drawGraph()
      this.drawBars()
      this.drawTrajectory()
    }
  }
  setData(data:{[index:string]:Array<LogEntry>}){
    this.data = data
  }
  drawGraph(){
    const ctx = this.ctx!
    // draw graph
    ctx.beginPath();
    this.ctx!.lineWidth = 3;
    this.ctx!.lineCap = 'round'
    ctx.moveTo(this.padding, this.padding);
    ctx.lineTo(this.padding, this.size.y - this.padding)
    ctx.lineTo(this.size.x - this.padding, this.size.y - this.padding)
    ctx.stroke()
  }
  drawBars(){
      // prepare data set
      const dates = Object.keys(this.data)
      let prevBal = DataManager.cache!.budget
      const historyOfbalances = dates.map((date) => {
        // calcTotal 
        let total = 0
        const logs = this.data[date]
        for (let index = 0; index < logs.length; index++) {
          const log = logs[index]
          total += log.amount
        }
        const returning = prevBal - total
        prevBal = returning
        return returning
      })
      this.historyOfBalances = historyOfbalances
      // calculate middle positions ofbars
      const lengthOfBar = this.size.x - this.padding*2
      const arrOfBarPositions:Array<number> = []
      for (let index = 1; index < historyOfbalances.length + 1; index++) {
        const pos = lerp(0, lengthOfBar, (index/historyOfbalances.length))
        arrOfBarPositions.push(pos)
      }
      // start drawing bars
      const gap = 2;
      const widthOfBar = (lengthOfBar/arrOfBarPositions.length) - 2;
      const fullHeightOfBar = this.size.y - this.padding*2;
      arrOfBarPositions.forEach((pos, index)=>{
        // draw bars
        this.ctx?.beginPath();
        this.ctx!.rect(
          this.padding + pos - (widthOfBar/2),
          this.size.y-this.padding,
          widthOfBar,
          ((historyOfbalances[index])/(DataManager.cache!.budget)) * -fullHeightOfBar
        )
        this.ctx!.fillStyle = 'black';
        this.ctx!.fill();
      })
  }
  drawTrajectory(){

  }
}