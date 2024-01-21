import { lerpVec2, Vec2, rem } from "../mathUtilities"
import getXOffset from "./getXoffset";


let instance:PennyInput|null = null;
export default class PennyInput{
	elTouchCanvas!:HTMLElement;
	elCircle!:HTMLElement;
	size:Vec2 ={x:0, y:0}

	// states
	// circle states
	clicked:boolean = false;
	circlePosition:Vec2 = {x:0, y:0}
	circleRadius = rem(5);
	prevZone:Vec2 = {x:0, y:0}
	// pointer states
	pointerPos:Vec2 = {x:0, y:0};
	// pointer boundaries and zones
	horizontalLines:Array<number> = []
	verticalLines:Array<number> = []

	constructor(){
		if(instance){return instance}
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
			this.circlePosition = lerpVec2(this.circlePosition, this.getDefaultPosition(), 0.5);
		}
		// update circle element
		this.setCirclePos(this.circlePosition);
		// listen for cicrcle crossing boundaries
		this.listenForZoneChanges();
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
			y:this.size.y - rem(5)
		}
		return mid
	}
	setCirclePos(pos:Vec2){
		const halfRadius = this.circleRadius/2
		const xOffset = getXOffset();
		this.elCircle.setAttribute('style',`transition:0s; top: ${pos.y-halfRadius}px; left:${pos.x-halfRadius-xOffset}px`)
	}
	calculateZoneLines(){
		// --- generate horizontalLines
		// start from default position
		const defaultYPos = this.getDefaultPosition().y
		this.horizontalLines = []
		// add 10 lines
		for(let i = 0; i < 20; i++){
			this.horizontalLines.push(defaultYPos - (i+1)*rem(5))
		}
		// --- generate vertical lines1
		// get full size of the x
		const fullX = this.size.x
		// create first and last lines
		const edgeWidthInPx = rem(3)
		const firstLine = edgeWidthInPx
		const lastLine = fullX-edgeWidthInPx
		// create the other 2 lines in the middle
		const remainingX = this.size.x - edgeWidthInPx*2
		const middleZoneWidth = remainingX/3
		// combine it all in one array 
		const xOffset = getXOffset()
		this.verticalLines = [
			firstLine + xOffset,
			firstLine + middleZoneWidth + xOffset,
			firstLine + middleZoneWidth*2 + xOffset,
			lastLine + xOffset
		]
	}
	setClick(isDown:boolean){
		this.clicked = isDown
		this.pointerPos  = this.getDefaultPosition()
	}
	calculateCurrentZone(){
		const finalPos:Vec2 = {x:0, y:0}
		const allVerticalLines = [0, ...this.verticalLines, document.documentElement.clientWidth]
		// console.log(this.size.x, allVerticalLines, this.circlePosition.x)
		// check x zone
		for (let index = 0; index < allVerticalLines.length-1; index++) {
			if(this.circlePosition.x > allVerticalLines[index] && this.circlePosition.x < allVerticalLines[index+1]){
				finalPos.x = index
				break;
			}
		}
		// check y zone
		const allHorizontalLines = [this.size.y, ...this.horizontalLines, 0]
		for (let index = 0; index < allHorizontalLines.length-1; index++) {
			if(this.circlePosition.y < allHorizontalLines[index] && this.circlePosition.y > allHorizontalLines[index+1]){
				finalPos.y = index
				break;
			}
		}
		return finalPos;
	}
	listenForZoneChanges(){
		// get current zone
		const currentZone = this.calculateCurrentZone()
		// check for zone changes
		if(currentZone.y !== this.prevZone.y && this.clicked){
			this.onLinesCrossed(currentZone.y - this.prevZone.y, currentZone.x)
		}
		// save zone for next update
		this.prevZone = currentZone
	}
	onLinesCrossed(relativeY:number, xZone:number){
		console.log(relativeY, xZone)
	}
}
