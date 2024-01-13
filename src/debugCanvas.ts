import PennyInput from './touchInput.ts'

export default class TouchInputDebugCanvas{
	elcanvas = document.getElementById('touchInputDebugCanvas') as HTMLCanvasElement;
	pennyInput:PennyInput
	ctx:CanvasRenderingContext2D;
	size = {x:0, y:0}
	constructor(_pennyInput:PennyInput){
		this.pennyInput = _pennyInput
		this.ctx = this.elcanvas.getContext('2d')!
		// start update loop
		setTimeout(this.update.bind(this), 1000/30)
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
	}
	resize(){
		this.size.x = document.documentElement.clientWidth
		this.size.y = document.documentElement.clientWidth
		this.elcanvas.width = this.size.x
		this.elcanvas.height = this.size.y
	}
	drawLine(p1,p2)
}
