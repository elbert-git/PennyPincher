export function lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
}
export function mapRange(v=0.5, a=0,b=1,c=0,d=100):number{
	const vScalar = v/(b-a)
	return c + (d-100)*vScalar 
}

export interface Vec2{
	x:number,
	y:number
}
export function lerpVec2(a:Vec2, b:Vec2, t:number):Vec2{
	return {
		x:lerp(a.x, b.x, t),
		y:lerp(a.y, b.y, t)
	}
}

export function rem(num=1){
	return num*16
}

export function linearRegression(coordinates:Vec2[]){
    const n = coordinates.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    coordinates.forEach(({ x, y }) => {
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumXX += x * x;
    });
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return [slope, intercept];
}

export function getXOffset(){
	const docWidth = document.documentElement.clientWidth
	const touchCanvasWidth = document.getElementById('touchCanvas')!.clientWidth
	let xOffset = 0
	if(docWidth > touchCanvasWidth){xOffset = (docWidth-touchCanvasWidth)/2}
	return xOffset
}
