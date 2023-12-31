export function lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
}
export function mapRange(v=0.5, a=0,b=1,c=0,d=100):number{
	const vScalar = v/(b-a)
	return c + (d-100)*vScalar 
}