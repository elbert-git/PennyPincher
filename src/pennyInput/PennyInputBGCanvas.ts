import { Vec2, rem, getXOffset } from "../mathUtilities";
import { Lines } from "./PennyInput"

export default class PennyInputBGCanvas{
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
		// draw bg
		this.drawTracks();
		this.drawTreads();
    this.drawGradient();
		this.drawText();
		//for debug
		// this.drawDebugLines()
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
  drawTracks(){
    const verticalLines = this.lines.vertical;
    const gap = rem(0.5);
    const ctx = this.ctx!;
    const tinyWidth = verticalLines[0] - getXOffset() - gap
    const bigWidth = verticalLines[2] - verticalLines[1] - gap*2
    ctx.beginPath();
    // draw track 1
    ctx.rect(
      getXOffset(),
      0, 
      tinyWidth,
      this.size.y);
    // draw track 2
    ctx.rect(
      verticalLines[0] + gap, 
      0, 
      bigWidth,
      this.size.y);
    // draw track 3
    ctx.rect(
      verticalLines[1] + gap, 
      0, 
      bigWidth,
      this.size.y);
    // draw track 4
    ctx.rect(
      verticalLines[2] + gap, 
      0, 
      bigWidth,
      this.size.y);
    // draw track 5
    ctx.rect(
      verticalLines[3]+gap,
      0,
      tinyWidth,
      this.size.y);
    // fill
    ctx.fillStyle = '#f58700'
    ctx.fill();
    // draw vertical Lines
		verticalLines.forEach((line)=>{
			const p1 = {x:line, y:0}
			const p2 = {x:line, y:this.size.y}
      const ctx = this.elCanvas.getContext('2d')!;
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = 'black';
      ctx.stroke()
		})
  }
	drawTreads(){
		const horizontalLines = this.lines.horizontal;
    const verticalLines = this.lines.vertical;
    const gap = rem(0.5)*3;
    const ctx = this.elCanvas.getContext('2d')!;
    horizontalLines.forEach((height)=>{
      // draw line
      ctx.beginPath()
      ctx.moveTo(verticalLines[0] + gap ,height)
      ctx.lineTo(verticalLines[1] - gap ,height)
      ctx.stroke()
      // draw line
      ctx.beginPath()
      ctx.moveTo(verticalLines[1] + gap ,height)
      ctx.lineTo(verticalLines[2] - gap ,height)
      ctx.stroke()
      // draw line
      ctx.beginPath()
      ctx.moveTo(verticalLines[2] + gap ,height)
      ctx.lineTo(verticalLines[3] - gap ,height)
      ctx.stroke()
    })
	}
	drawText(){ 
    const fontSize = (document.documentElement.clientWidth > 500) ? rem(2.5) : rem(1.5)
		const gap = rem(0.5);
    const ctx = this.elCanvas.getContext('2d')!;
    const horizontalLines = this.lines.horizontal;
    const verticalLines = this.lines.vertical;
    const tinyWidth = verticalLines[0] - getXOffset() - gap
    const bigWidth = verticalLines[2] - verticalLines[1] - gap*2
    const x = verticalLines[1] + (verticalLines[2]-verticalLines[1])/2
    const y = horizontalLines[1] + (horizontalLines[1]-horizontalLines[0])/2
    ctx.font = `700 ${fontSize}px Jomhuria`
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    // draw first 3
    ctx.fillText('+1', x, y)
    ctx.fillText('+0.1', x-bigWidth-gap*2, y)
    ctx.fillText('+10', x+bigWidth+gap*2, y)
    // draw edges
    // ctx.rotate(90)
    ctx.translate(x, y);
    ctx.rotate(Math.PI/2)
    ctx.font = `700 ${rem(1)}px Jomhuria`
    const wholeWidth = Math.min(document.documentElement.clientWidth, 500);
    // ctx.fillText('+0.01', -gap/2, (bigWidth*2)-(tinyWidth/4))
    ctx.fillText('+0.01', 0, (wholeWidth/2)-(tinyWidth/2))
    ctx.fillText('+100', 0, ((wholeWidth/2)-(tinyWidth/2))*-1)
    ctx.rotate(-Math.PI/2)
    ctx.translate(-x, -y);
	}
  drawGradient(){
    const ctx = this.ctx;
    const horizontalLines = this.lines.horizontal;
    // Create gradient
    const grd = ctx.createLinearGradient(50, 0, 50, this.size.y);
    // calc middle transparent height
    const mid = horizontalLines[1]/this.size.y
    grd.addColorStop(0, "#FF9901");
    grd.addColorStop(0.2, "#FF9901");
    grd.addColorStop(mid, "rgba(255, 186, 1, 0)");
    grd.addColorStop(1, "#FFBA01");

    // gradient
    ctx.beginPath();
    ctx.rect(0,0,this.size.x, this.size.y);
    ctx.fillStyle = grd;
    ctx.fill();
  }
}
