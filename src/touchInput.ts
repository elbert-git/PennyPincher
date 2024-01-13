import { lerp } from "./mathUtilities"

// !! this is very stupid way to handle x offset
// because position is relative to the document but we want relative to the touch canvas
function getXOffset(){
	const docWidth = document.documentElement.clientWidth
	const touchCanvasWidth = document.getElementById('touchCanvas')!.clientWidth
	let xOffset = 0
	if(docWidth > touchCanvasWidth){xOffset = (docWidth-touchCanvasWidth)/2}
	return xOffset
}

// helper functions
interface Vec2{
	x:number, y:number
}
function rem(num=1){
	return num*16
}
function lerpVec2(a:Vec2, b:Vec2, t:number):Vec2{
	return {
		x:lerp(a.x, b.x, t),
		y:lerp(a.y, b.y, t)
	}
}


export default class PennyInput{
	elTouchCanvas:HTMLElement;
	elCircle:HTMLElement;
	size:Vec2 ={x:0, y:0}

	// states
	// circle states
	clicked:boolean = false;
	circlePosition:Vec2 = {x:0, y:0}
	circleRadius = rem(3);
	// pointer states
	pointerPos:Vec2 = {x:0, y:0};

	// pointer boundaries and zones
	horizontalLines:Array<number> = []
	verticalLines:Array<number> = []

	constructor(){
		// get elements
		this.elTouchCanvas = document.getElementById('touchCanvas')!
		this.elCircle = document.getElementById('circle')!

		// --- events
		// on resize
		window.addEventListener('resize', ()=>{this.resize();})
		this.resize();
		// track cursor position
		window.addEventListener('mousemove', (e)=>{this.pointerPos = {x:e.clientX, y:e.clientY}})
		window.addEventListener('touchmove', (e)=>{this.pointerPos = {x:e.touches[0].clientX, y:e.touches[0].clientY}})
		// clicking state down
		this.elCircle.addEventListener('mousedown', ()=>{this.setClick(true)});
		this.elCircle.addEventListener('touchstart', ()=>{this.setClick(true)});
		// clicking state up
		window.addEventListener('mouseup', ()=>{this.setClick(false)})
		window.addEventListener('touchend', ()=>{this.setClick(false)})

		// update
		setInterval(this.update.bind(this), 1000/20);
		this.update();
	}
	update(){
		if(this.clicked){ // go to finger position
			this.circlePosition = this.pointerPos;
		}else{ // go to defautl position
			this.circlePosition = lerpVec2(this.circlePosition, this.getDefaultPosition(), 0.8);
		}
		// update circle element
		this.setCirclePos(this.circlePosition);
	}
	resize(){
		this.size = {
			x:this.elTouchCanvas.clientWidth,
			y:this.elTouchCanvas.clientHeight
		}
		this.calculateZoneLines();
	}
	getDefaultPosition(){
		const mid:Vec2 = {
			x:this.size.x/2 + getXOffset(), // again this is a stupid fix
			y:this.size.y - rem(3)
		}
		return mid
	}
	setCirclePos(pos:Vec2){
		const halfRadius = this.circleRadius/2
		const xOffset = getXOffset();
		this.elCircle.setAttribute('style',`top: ${pos.y-halfRadius}px; left:${pos.x-halfRadius-xOffset}px`)
	}
	calculateZoneLines(){
		// --- generate horizontalLines
		// start from default position
		const defaultYPos = this.getDefaultPosition().y
		this.horizontalLines = [defaultYPos];
		// add 10 lines
		for(let i = 0; i < 10; i++){
			this.horizontalLines.push(defaultYPos + (i+1)*rem(1))
		}
		// --- generate vertical lines1
		// get full size of the x
		const fullX = this.size.x
		// create first and last lines
		const edgeWidthInPx = rem(1)
		const firstLine = edgeWidthInPx
		const lastLine = fullX-edgeWidthInPx
		// create the other 2 lines in the middle
		const remainingX = this.size.x - edgeWidthInPx*2
		const middleZoneWidth = remainingX/3
		// combine it all in one array 
		this.verticalLines = [
			firstLine,
			firstLine + middleZoneWidth,
			firstLine + middleZoneWidth*2,
			lastLine
		]
		// ! temp logging
		console.log(this.horizontalLines)
		console.log(this.verticalLines)
	}
	setClick(isDown:boolean){
		this.clicked = isDown
		this.pointerPos  = this.getDefaultPosition()
	}
}
