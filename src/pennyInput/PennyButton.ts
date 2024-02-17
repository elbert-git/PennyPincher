import { Vec2, lerpVec2, getXOffset, rem } from "../mathUtilities"
import { Lines } from "./PennyInput";
import PennyUI from "./pennyUI";

export default class PennyButton{
		static instance:PennyButton|null = null;
    // elements
    elCircle!:HTMLDivElement;
		elPennyButtonVisual!:HTMLDivElement;
    // key variables related to size
    size:Vec2 = {x:0,y:0}
    lines:Lines = {horizontal:[], vertical:[]}
    defaultButtonPosition:Vec2 = {x:0,y:0}
    // states
    isClicked = false;
    buttonPosition:Vec2 = {x:0,y:0}
		buttonRadius = rem(5/2);
    pointerPosition:Vec2 = {x:0,y:0}
		prevZone:Vec2 = {x:0, y:0}
		hasEnteredValue = false
    // callbacks
    onZoneChanged:(yChange:number, xZone:number)=>void = (yChange:number, xZone:number)=>{
			console.log(yChange, xZone)
    };

    constructor(){
			// singleton
			if(PennyButton.instance){return PennyButton.instance}
			PennyButton.instance = this;
			//get elements
			this.elCircle = document.getElementById("pennyButton") as HTMLDivElement;
			this.elPennyButtonVisual = document.getElementById("pennyButtonVisual") as HTMLDivElement;
			// click  events
			this.elCircle.addEventListener('mousedown', ()=>{this.setClick(true)});
			this.elCircle.addEventListener('touchstart', ()=>{this.setClick(true)});
			window.addEventListener('mouseup', ()=>{this.setClick(false)})
			window.addEventListener('touchend', ()=>{this.setClick(false)})
					// listening for cursor positions
			window.addEventListener('mousemove', (e)=>{this.pointerPosition = {x:e.clientX, y:e.clientY}})
			window.addEventListener('touchmove', (e)=>{this.pointerPosition = {x:e.touches[0].clientX, y:e.touches[0].clientY}})
			this.elCircle.addEventListener('touchmove', (e)=>{e.preventDefault()}, {passive:false})
    }
    update(){
		if(this.isClicked){ // go to finger position
			this.buttonPosition = this.pointerPosition;
		}else{ // go to defautl position
			this. buttonPosition = lerpVec2(this.buttonPosition, this.defaultButtonPosition, 0.5);
		}
		// update circle element
		this.setCirclePos(this.buttonPosition);
		// listen for cicrcle crossing boundaries
		this.listenForZoneChanges();
    }
	setCirclePos(pos:Vec2){
		const halfRadius = this.buttonRadius/2
		const xOffset = getXOffset();
		this.elCircle.setAttribute('style',`transition:0s; top: ${pos.y-halfRadius}px; left:${pos.x-this.buttonRadius-xOffset}px`)
	}
	resize(size:Vec2, defaultPosition:Vec2, lines:Lines){
			this.size = size;
			this.defaultButtonPosition = defaultPosition;
			this.lines = lines
	}
	setClick(b:boolean){
			// prevent click up if ui buttom is up
			if(new PennyUI().bottomUIisUp){return null}

			// set state
			this.isClicked = b;

			// prevent position jumps
			this.pointerPosition = this.defaultButtonPosition;
			this.buttonPosition = this.defaultButtonPosition;

			// handle click up
			if(b){ // on button down
				new PennyUI().toggleUI(b);
			}else{ // on button up
				//check what to do on button up
				if(this.hasEnteredValue){ // has entered value then bring bottom up
					new PennyUI().toggleBottom(true)
					// also fade the button out
					this.setVisible(false)
				}else{ // has entered value then animate whole ui out
					new PennyUI().toggleUI(false)
				}
				// reset has entered value
				this.hasEnteredValue = false
			}
	}
	setVisible(b:boolean){
		if(b){
			this.elPennyButtonVisual.classList.remove("fadeOut")
		}else{
			this.elPennyButtonVisual.classList.add("fadeOut")
		}
	}
	calculateCurrentZone(){
		const finalPos:Vec2 = {x:0, y:0}
		const allVerticalLines = [0, ...this.lines.vertical, document.documentElement.clientWidth]
		// console.log(this.size.x, allVerticalLines, this.circlePosition.x)
		// check x zone
		for (let index = 0; index < allVerticalLines.length-1; index++) {
			if(this.buttonPosition.x > allVerticalLines[index] && this.buttonPosition.x < allVerticalLines[index+1]){
				finalPos.x = index
				break;
			}
		}
		// check y zone
		const allHorizontalLines = [this.size.y, ...this.lines.horizontal, 0]
		for (let index = 0; index < allHorizontalLines.length-1; index++) {
			if(this.buttonPosition.y < allHorizontalLines[index] && this.buttonPosition.y > allHorizontalLines[index+1]){
				finalPos.y = index
				break;
			}
		}
		return finalPos;
	}
	listenForZoneChanges(){
		// get current zone
		const currentZone = this.calculateCurrentZone()
		// check if has entered value
		if((currentZone.y - this.prevZone.y) !== 0 && this.isClicked){this.hasEnteredValue = true};
		// check for zone changes
		if(currentZone.y !== this.prevZone.y && this.isClicked){
			this.onZoneChanged(currentZone.y - this.prevZone.y, currentZone.x)
		}
		// save zone for next update
		this.prevZone = currentZone
	}

	// call this to Disable
	// enableScroll(b:boolean) {}
}



