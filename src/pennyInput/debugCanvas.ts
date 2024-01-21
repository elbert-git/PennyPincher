import { Vec2 } from '../mathUtilities.ts';
import PennyInput from './touchInput.ts'

export default class TouchInputDebugCanvas{
	elcanvas = document.getElementById('touchInputDebugCanvas') as HTMLCanvasElement;
	pennyInput:PennyInput
	ctx:CanvasRenderingContext2D;
	size:Vec2 = {x:0, y:0}
	constructor(_pennyInput:PennyInput){
		this.pennyInput = _pennyInput
		this.ctx = this.elcanvas.getContext('2d')!
		// start update loop
		setInterval(this.update.bind(this), 1000/30)
		// canvas resize
		window.addEventListener('resize', this.resize.bind(this))
		this.resize()
	}
	update(){
		const ctx = this.ctx
		// clear screen
		ctx.beginPath();
		ctx.rect(0,0,this.size.x, this.size.y)
		ctx.fillStyle = 'rgba(0,0,0,0)'
		ctx.fill()
		// draw boundaries
		const verticalLines = this.pennyInput.verticalLines
		const horizontalLines = this.pennyInput.horizontalLines
		verticalLines.forEach((line)=>{
			const p1 = {x:line, y:0}
			const p2 = {x:line, y:this.size.y}
			this.drawLine(p1, p2, "red")
		})
		horizontalLines.forEach((line)=>{
			const p1 = {x:0, y:line}
			const p2 = {x:this.size.x, y:line}
			this.drawLine(p1, p2, "green")
		})
	}
	resize(){
		this.size.x = document.documentElement.clientWidth
		this.size.y = document.documentElement.clientHeight
		this.elcanvas.width = this.size.x
		this.elcanvas.height = this.size.y
	}
	drawLine(p1:Vec2,p2:Vec2, col="black"){
		const ctx = this.ctx;
		ctx.beginPath()
		ctx.moveTo(p1.x, p1.y)
		ctx.lineTo(p2.x, p2.y);
		ctx.strokeStyle = col;
		ctx.stroke()
	}
}
