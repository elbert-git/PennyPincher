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
window.addEventListener('mouseup', ()=>{circleIsClicked = false; yDelta = 0})
window.addEventListener('touchend', ()=>{circleIsClicked = false; yDelta = 0})
elCircle.addEventListener('mousedown', ()=>{circleIsClicked = true; moneyValue = 0})
elCircle.addEventListener('touchstart', ()=>{circleIsClicked = true; moneyValue = 0})

// lerping
function lerp(a:number, b:number, t=0.5){
  return a + ((b-a)*t)
}

// track cursor position and y delta
const currentCirclePosition = {x: 0, y: 0};
const cursorPosition = {x: 0, y: 0};
let yDelta = 0;
const previousCursorPosition = {x:0, y:0};
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

// x position into multiplier
const screenSpaceMultiplierRows = [0, 0, 0];
function updatesScreenSpaceMultiplierRows(){
  const screenWidth = windowSize.x/2;
  screenSpaceMultiplierRows[0] = screenWidth * (1/3);
  screenSpaceMultiplierRows[1] = screenWidth * (2/3);
  screenSpaceMultiplierRows[2] = screenWidth * (3/3);
}
updatesScreenSpaceMultiplierRows();
let multiplier = 0;
function xIntoMultiplier(){
  const relativeXPos = cursorPosition.x - (windowSize.x/2)
  const relativeXPosAbs = Math.abs(relativeXPos)
  let multiplierId = 0
  if(relativeXPosAbs < screenSpaceMultiplierRows[0]){multiplierId =  1}
  else if(relativeXPosAbs < screenSpaceMultiplierRows[1]){multiplierId =  2}
  else{multiplierId =  3}

  if(relativeXPos < 0){multiplierId *= -1}
  console.log(multiplierId);


  let finalMultiplier = 0
  switch(multiplierId){
    case 2: 
      finalMultiplier = 10;
      break;
    case 3: 
      finalMultiplier = 100;
      break;
    case -2: 
      finalMultiplier = 0.5;
      break;
    case -3: 
      finalMultiplier = 0.1;
      break;
    default: 
      finalMultiplier = 1      
      break;
  }

  return finalMultiplier;
}


// processing circle position
function processCircle(){
  // handle circle ui
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


  // calculate y delta
  yDelta = previousCursorPosition.y - cursorPosition.y;
  // save previous position
  previousCursorPosition.x = cursorPosition.x;
  previousCursorPosition.y = cursorPosition.y;
}


// offset into number
let moneyValue = 0
function updateMoneyValue(delta:number, multiplier=2){
  moneyValue += delta * multiplier;
  // update ui
  updateDollars(moneyValue)
}

// updateing dollar ui
const elDollarDiv = document.getElementById('dollarDiv');
function updateDollars(num:number){
  elDollarDiv!.innerHTML = `$${num.toString()}`
}
updateDollars(0)



const update = ()=>{
  processCircle();

  // process delta into number
  if(circleIsClicked){updateMoneyValue(yDelta, xIntoMultiplier())};


  requestAnimationFrame(update);
}
update();