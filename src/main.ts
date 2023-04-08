import './style.css'

//em sizing 
const em = (size:number)=>{return size*16};


// get elements
const elCircle = document.getElementById('circle')!;
// const elCircleCanvas = document.getElementById('circleCanvas')!;

// circle position stuff
const circleRadius = (em(5))/2;


// handle click status
let circleIsClicked = false;
window.addEventListener('mouseup', ()=>{circleIsClicked = false;})
window.addEventListener('touchend', ()=>{circleIsClicked = false;})
elCircle.addEventListener('mousedown', ()=>{circleIsClicked = true;})
elCircle.addEventListener('touchstart', ()=>{circleIsClicked = true;})

// lerping
function lerp(a:number, b:number, t=0.5){
  return a + ((b-a)*t)
}

// track cursor position
const currentCirclePosition = {x: 0, y: 0};
const cursorPosition = {x: 0, y: 0};
window.addEventListener('mousemove', (e)=>{
  cursorPosition.x = e.pageX;
  cursorPosition.y = e.pageY;
})
window.addEventListener('touchmove', (e)=>{
  cursorPosition.x = e.touches[0].pageX;
  cursorPosition.y = e.touches[0].pageY;
})

// handle default circle position
const windowSize = {x: window.innerWidth, y: window.innerWidth};
function calculateWindowSize(){
  windowSize.x = window.innerWidth;
  windowSize.y = window.innerHeight;
}
calculateWindowSize();
window.addEventListener('resize', calculateWindowSize);
function getDefaultCirclePosition(){
  return {
    x: (windowSize.x/2) + em(0.5),
    y: windowSize.y - circleRadius - em(1)
  }
}


// processing circle position
function processCircle(){
  if(circleIsClicked){
    // lerp click to pointer position
    currentCirclePosition.x = lerp(currentCirclePosition.x, cursorPosition.x)
    currentCirclePosition.y = lerp(currentCirclePosition.y, cursorPosition.y)
    elCircle.setAttribute('style', `top: ${currentCirclePosition.y - circleRadius}px; left: ${currentCirclePosition.x - circleRadius}px;`)
  }else{
    const defaultPosition = getDefaultCirclePosition()
    currentCirclePosition.x = lerp(currentCirclePosition.x, defaultPosition.x)
    currentCirclePosition.y = lerp(currentCirclePosition.y, defaultPosition.y)
    elCircle.setAttribute('style', `top: ${currentCirclePosition.y - circleRadius}px; left: ${currentCirclePosition.x - circleRadius}px;`)
  }
}


// offset into number
function getCircleOffset(){
  const defaultPos = getDefaultCirclePosition();
  const offset = {
    x: currentCirclePosition.x - defaultPos.x,
    y: currentCirclePosition.y - defaultPos.y,
  }
  return offset
}
function offsetIntoDollarNumber(){
  const dollarOffset = -Math.floor(getCircleOffset().y * 0.05);
  return dollarOffset
}
const elDollarDiv = document.getElementById('dollarDiv');
function updateDollars(num:number){
  elDollarDiv!.innerHTML = `$${num.toString()}`
}
updateDollars(0)



const update = ()=>{
  processCircle();

  updateDollars(offsetIntoDollarNumber())
  

  requestAnimationFrame(update);
}
update();