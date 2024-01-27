import { Vec2 } from "../mathUtilities";
import { Lines } from "./newPennyInput"

export default class InputBGCanvas{
	elCanvas:HTMLCanvasElement = null!;
	lines:Lines = {horizontal:[],  vertical:[]}
	ctx:CanvasRenderingContext2D = null!;
	size:Vec2 = {x:0,y:0}
	constructor(_elCanvas:HTMLCanvasElement){
		this.elCanvas = _elCanvas
		this.ctx = this.elCanvas.getContext('2d')!
	}
	update(){
		// clear screen
		this.clearScreen()
		//for debug
		this.drawDebugLines()
	}
	clearScreen(){
		const ctx = this.ctx;
		//create gradient
		const grd = ctx.createLinearGradient(50,0,50, this.size.y)
		grd.addColorStop(0, '#FF9901')
		grd.addColorStop(1, '#FFBA01')
		//draw gradient
		ctx.beginPath();
		ctx.rect(0,0,this.size.x, this.size.y)
		ctx.fillStyle = grd
		ctx.fill();
	}
	resize(size:Vec2, lines:Lines){
		//update size
		this.size = size
		this.elCanvas.width = this.size.x
		this.elCanvas.height = this.size.y
		//update lines
		this.lines = lines
	}
	drawDebugLines(){
		// draw boundaries
		const verticalLines = this.lines.vertical
		const horizontalLines = this.lines.horizontal
		verticalLines.forEach((line)=>{
			const p1 = {x:line, y:0}
			const p2 = {x:line, y:this.size.y}
			const ctx = this.ctx;
			ctx.beginPath()
			ctx.moveTo(p1.x, p1.y)
			ctx.lineTo(p2.x, p2.y);
			ctx.strokeStyle = "red";
			ctx.stroke()
		})
		horizontalLines.forEach((line)=>{
			const p1 = {x:0, y:line}
			const p2 = {x:this.size.x, y:line}
			const ctx = this.ctx;
			ctx.beginPath()
			ctx.moveTo(p1.x, p1.y)
			ctx.lineTo(p2.x, p2.y);
			ctx.strokeStyle = "green";
			ctx.stroke()
		})
	}
}
