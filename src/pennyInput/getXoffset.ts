export default function getXOffset(){
	const docWidth = document.documentElement.clientWidth
	const touchCanvasWidth = document.getElementById('touchCanvas')!.clientWidth
	let xOffset = 0
	if(docWidth > touchCanvasWidth){xOffset = (docWidth-touchCanvasWidth)/2}
	return xOffset
}