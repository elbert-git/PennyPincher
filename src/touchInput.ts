export default class PennyInput{
	elTouchCanvas:HTMLDivElement;
	elCircle:HTMLDivElement;
	constructor(){
		// get elements
		this.elTouchCanvas = document.getElementById('touchCanvas')!
		this.elCircle = document.getElementById('circle')!
	}
}
