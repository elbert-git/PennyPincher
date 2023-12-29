import { LogEntry } from "./data/dataInterfaces";
import { DataManager } from "./data/dataManager";

function lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
}
function mapRange(v=0.5, a=0,b=1,c=0,d=100):number{
	const vScalar = v/(b-a)
	return c + (d-100)*vScalar 
}

interface Coordinate {
    x: number;
    y: number;
}
function linearRegression(coordinates: Coordinate[]){
    const n = coordinates.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    coordinates.forEach(({ x, y }) => {
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumXX += x * x;
    });
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return [slope, intercept];
}

export class ChartCanvas{
  element:HTMLCanvasElement|null = null;
  ctx:CanvasRenderingContext2D|null = null
  color = 'white'
  size = {x:0, y:0}
  constructor(){
  }
  setElement(el:HTMLCanvasElement){
    this.element = el;
    this.ctx = el.getContext('2d');
    this.resize();
		this.update()
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
		this.update()
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
		this.update()
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
  data:{[index:string]:Array<LogEntry>|null} = {}
  historyOfBalances:Array<number|null> = []
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
		// filter by the past 30 days
		const dateKeys = Object.keys(data).sort();
		const datesPast30Days:{[index:string]:Array<LogEntry>|null} = {}
		for(let i=0; i < 30; i++){
			const reverseIndex = dateKeys.length - 1 - i
			if(data[dateKeys[reverseIndex]]){
				datesPast30Days[dateKeys[reverseIndex]] = data[dateKeys[reverseIndex]]
			}else{
				datesPast30Days[(3000+i).toString()] = null
			}
		}
		//update data
    this.data = datesPast30Days
		this.update()
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
      const dates = Object.keys(this.data).sort()
      let prevBal = DataManager.cache!.budget
      const historyOfbalances = dates.map((date) => {
        // calcTotal 
        let total = 0
				let returning:number|null = null
				if(this.data[date]){
					const logs = this.data[date]
					for (let index = 0; index < logs!.length; index++) {
						const log = logs![index]
						total += log.amount
					}
					returning = prevBal - total
					prevBal = returning
				}
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
      // const gap = 2;
      const widthOfBar = (lengthOfBar/arrOfBarPositions.length) - 2;
      const fullHeightOfBar = this.size.y - this.padding*2;
      arrOfBarPositions.forEach((pos, index)=>{
        // draw bars
        this.ctx?.beginPath();
        this.ctx!.rect(
          this.padding + pos - (widthOfBar/2),
          this.size.y-this.padding,
          widthOfBar,
          ((historyOfbalances[index]!)/(DataManager.cache!.budget)) * -fullHeightOfBar
        )
        this.ctx!.fillStyle = 'black';
        this.ctx!.fill();
      })
  }
  drawTrajectory(){
		// --- convert history of all balances into cartesian points
      const lengthOfBar = this.size.x - this.padding*2
			const historyOfBalances = this.historyOfBalances
      const arrOfBarXPositions:Array<number> = []
      const fullHeightOfBar = this.size.y - this.padding*2;
      for (let index = 1; index < historyOfBalances.length + 1; index++) {
        const pos = lerp(0, lengthOfBar, (index/historyOfBalances.length))
        arrOfBarXPositions.push(pos)
      }
			const arrOfBarPositions = arrOfBarXPositions.map((x, index)=>{
				if(historyOfBalances[index]){
					const y = this.size.y - this.padding - ((historyOfBalances[index]!/DataManager.cache!.budget)*(fullHeightOfBar))
					return {x: x+this.padding, y:y}
				}else{
					return null
				}
			})
		// --- calculate linear regression
		const availablePositions = arrOfBarPositions.filter(e=>e!==null)
		const [m, b] = linearRegression(availablePositions as Array<{x:number,y:number}>);
		// --- create 2 cartesian points for line
		const pointsToDraw = [
			{x:0, y: b},
			{x: this.size.x, y:(this.size.x*m)+b}
		]
		// --- use ctx to draw line
		this.ctx!.beginPath()
		this.ctx!.moveTo(pointsToDraw[0].x, pointsToDraw[0].y)
		this.ctx!.lineTo(pointsToDraw[1].x, pointsToDraw[1].y)
		this.ctx!.setLineDash([10])
		this.ctx!.strokeStyle = 'rgba(0,0,0,0.3)'
		this.ctx!.stroke()
		this.ctx!.setLineDash([])
		this.ctx!.strokeStyle = 'rgba(0,0,0,1)'
  }
}
