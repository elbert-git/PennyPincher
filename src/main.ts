import MoneyValue from './moneyValue';
import './style.css'

//em sizing 
const em = (size:number)=>{return size*16};

// money value stuff
const moneyValue = new MoneyValue();

// get elements
const elCircle = document.getElementById('circle')!;
// const elCircleCanvas = document.getElementById('circleCanvas')!;

// circle position stuff
const circleRadius = (em(5))/2;


// handle click status
let circleIsClicked = false;
window.addEventListener('mouseup', ()=>{circleIsClicked = false; yDelta = 0})
window.addEventListener('touchend', ()=>{circleIsClicked = false; yDelta = 0})
elCircle.addEventListener('mousedown', ()=>{
  circleIsClicked = true;
  moneyValue.updateLabel(0)
  currentCirclePosition = getDefaultCirclePosition();
  cursorPosition = getDefaultCirclePosition();
})
elCircle.addEventListener('touchstart', ()=>{
  circleIsClicked = true;
  moneyValue.updateLabel(0)
  currentCirclePosition = getDefaultCirclePosition();
  cursorPosition = getDefaultCirclePosition();
})

// lerping
function lerp(a:number, b:number, t=0.5){
  return a + ((b-a)*t)
}

// track cursor position and y delta
let currentCirclePosition = {x: 0, y: 0};
const relativeCirclePosition = {x: 0, y: 0};
let cursorPosition = {x: 0, y: 0};
let yDelta = 0;
const previousCursorPosition = {x:0, y:0};
window.addEventListener('mousemove', (e)=>{
  cursorPosition.x = e.pageX;
  cursorPosition.y = e.pageY;

  // get relative position
  const CircleCenterDefaultPosition = {
    x: (windowSize.x/2),
    y: (windowSize.y - em(1) - circleRadius)
  }
  relativeCirclePosition.x = currentCirclePosition.x - CircleCenterDefaultPosition.x;
  relativeCirclePosition.y = -(currentCirclePosition.y - CircleCenterDefaultPosition.y);
})
window.addEventListener('touchmove', (e)=>{
  cursorPosition.x = e.touches[0].pageX;
  cursorPosition.y = e.touches[0].pageY;

  // get relative position
  const CircleCenterDefaultPosition = {
    x: (windowSize.x/2),
    y: (windowSize.y - em(1) - circleRadius)
  }
  relativeCirclePosition.x = currentCirclePosition.x - CircleCenterDefaultPosition.x;
  relativeCirclePosition.y = -(currentCirclePosition.y - CircleCenterDefaultPosition.y);
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
currentCirclePosition = getDefaultCirclePosition();
cursorPosition = getDefaultCirclePosition();



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

  // // calculate y delta
  // yDelta = previousCursorPosition.y - cursorPosition.y;
  // // save previous position
  // previousCursorPosition.x = cursorPosition.x;
  // previousCursorPosition.y = cursorPosition.y;
}

// threshold processing
const yThresholds = [
  100,
  200,
  300,
  400,
  500,
  600,
  700, 
  800,
  900,
];
let prevYThreshold = 0;
function getCurrentYThreshold(){
  for (let index = 0; index < yThresholds.length; index++) {
    if(relativeCirclePosition.y < yThresholds[index]){
      return index;
    }
  }
  return yThresholds.length - 1;
}
function didWeCrossYThreshold(){
  const yThreshold = getCurrentYThreshold()
  if(prevYThreshold !== yThreshold){
    console.log('crossed!');

    moneyValue.updateLabelBy(xThresholdToMultiplier(getCurrentXThreshold()) * (yThreshold > prevYThreshold ? 1 : -1));
    // save current threshold
    prevYThreshold = getCurrentYThreshold()!;
  }
}

const xThresholds = [
  -300,
  -200,
  -100,
  100,
  200,
  300
];
let prevXThreshold = 3;
function getCurrentXThreshold(){
  // console.log(relativeCirclePosition.x);
  for (let index = 0; index < xThresholds.length; index++) {

    // console.log('comparing', `position x: ${relativeCirclePosition.x} smaller than` , `current compare ${xThresholds[index]}`)
    // console.log(`result is ${relativeCirclePosition.x < xThresholds[index]}`)
    
    if(relativeCirclePosition.x < xThresholds[index]){
      // console.log(index, xThresholds[index],  relativeCirclePosition.x);
      return index;
    }
  }
  return xThresholds.length - 1;
}
function didWeCrossXThreshold(){
  if(prevXThreshold !== getCurrentXThreshold()){
    console.log('crossed!');
    // save current threshold
    prevXThreshold = getCurrentXThreshold()!;
  }
}
function xThresholdToMultiplier(xThresholdIndex:number){
  switch(xThresholdIndex-1){
    case 0:
      return 0.01
      break;
    case 1:
      return 0.10
      break;
    case 2:
      return 1
      break;
    case 3:
      return 10
      break;
    case 4:
      return 100
      break;
    case 5:
      return 1000
      break;
    default:
      return 0
      break;
  }
}




const update = ()=>{
  processCircle();


  // process delta into number
  if(circleIsClicked){
    didWeCrossYThreshold();
    didWeCrossXThreshold();
    // console.log(relativeCirclePosition.y);
  };


  requestAnimationFrame(update);
}
update();