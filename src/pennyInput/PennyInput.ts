import { Vec2, rem, getXOffset } from "../mathUtilities"
import PennyButton from "./PennyButton";
import PennyInputBGCanvas from "./PennyInputBGCanvas";

export interface Lines{
	horizontal:Array<number>,
	vertical:Array<number>
}

export default class PennyInputSystem{
	static instance:PennyInputSystem|null = null
	//key variables
	size:Vec2 = {x:0, y:0}
	// todo key positions
	defaultPennyButtonPosition:Vec2 = {x:0, y:0}
	lines:Lines = {
		horizontal: [],
		vertical: []
	}
	// submodules
	inputBGCanvas:PennyInputBGCanvas = new PennyInputBGCanvas(document.getElementById('inputBG') as HTMLCanvasElement);
	pennyButton:PennyButton = new PennyButton(document.getElementById('pennyButton') as HTMLDivElement)
	
	constructor(){
		// singleton
		if(PennyInputSystem.instance){return PennyInputSystem.instance}
		//handle update
		setInterval(this.update.bind(this), 1000/20)
		//resize event
		window.addEventListener('resize', this.resize.bind(this))
		this.resize();
	}
	update(){
		//update submodules
		this.inputBGCanvas.update();
		this.pennyButton.update();
	}
	
	resize(){
		//update size
		this.size.x = document.documentElement.clientWidth
		this.size.y = document.documentElement.clientHeight
		//calculate key positions
		this.defaultPennyButtonPosition = {x:this.size.x/2, y: this.size.y-rem(5)}
		this.calculateLines()
		//update submodules
		this.inputBGCanvas.resize(this.size, this.lines);
		this.pennyButton.resize(this.size, this.defaultPennyButtonPosition, this.lines)
	}
	calculateLines(){
		// --- generate horizontalLines
		// start from default position
		const defaultYPos = this.defaultPennyButtonPosition.y
		this.lines.horizontal = []
		// add 10 lines
		for(let i = 0; i < 20; i++){
			this.lines.horizontal.push(defaultYPos - (i+1)*rem(5))
		}
		// --- generate vertical lines1
		// get full size of the x
		const fullX = this.size.x - getXOffset()*2;
		// create first and last lines
		const edgeWidthInPx = rem(3)
		const firstLine = edgeWidthInPx
		const lastLine = fullX-edgeWidthInPx
		// create the other 2 lines in the middle
		const remainingX = fullX - edgeWidthInPx*2
		const middleZoneWidth = remainingX/3
		// combine it all in one array 
		const xOffset = getXOffset()
		this.lines.vertical = [
			firstLine + xOffset,
			firstLine + middleZoneWidth + xOffset,
			firstLine + middleZoneWidth*2 + xOffset,
			lastLine + xOffset
		]
	}
}
