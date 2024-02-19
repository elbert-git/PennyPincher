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


// Format the price above to USD using the locale, style, and currency.
let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export function formatCurrency(num:number){
    return USDollar.format(num)
}

export function isValidNumber(str: string): boolean {
  // Use regex to match valid number patterns
  const numberRegex = /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?$/;
  return numberRegex.test(str);
}

export function downloadTextFile(text: string, filename: string) {
    // Create a Blob object from the text
    const blob = new Blob([text], { type: 'text/plain' });
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create a link element
    const link = document.createElement('a');
    // Set the link's href attribute to the URL of the Blob
    link.href = url;
    // Set the link's download attribute to the desired filename
    link.download = filename;
    // Append the link to the document body
    document.body.appendChild(link);
    // Programmatically click the link to trigger the download
    link.click();
    // Remove the link from the document body
    document.body.removeChild(link);
    // Revoke the URL to free up memory
    URL.revokeObjectURL(url);
}

export function getCurrentDateAsString(): string {
    const currentDate = new Date();
    // Extract day, month, and year components
    const day = currentDate.getDate().toString().padStart(2, '0'); // Pad single-digit days with a leading zero
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const year = currentDate.getFullYear();
    // Format the date as "dd-mm-yyyy"
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}