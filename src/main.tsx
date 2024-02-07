import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './styles/css/main.css'
import { DataManager } from './data/dataManager.ts'
import PennyInputSystem from './pennyInput/PennyInput.ts'

// init data manager
DataManager.init();

document.body.innerHTML = `
  <!-- react root -->
  <div id="root"></div>
  <!-- input canvas -->
  <canvas id="inputBG" class="opacity fadeOut"></canvas>
  <!-- input ui -->
  <div id="inputUIRoot" class="inputUIRoot fillWidth fillHeight opacity fadeOut">
    <div id="upperUI" class="inputLabel">
      <div class="uiCard">
        <div id="amountLabel">$00.00</div>
        <div class="amountCategoryDisplayRoot">
          <div id="amountCategoryDisplay">category</div>
        </div>
      </div>
    </div>
    <div id="bottomButtons" class="bottomAnimateOut">
      <div class="cancelButtonContainer">
        <div class="uiCard interactive" id="uiCancelButton">Cancel</div>
      </div>
      <div class="bottomButtonsFlipper">
        <div class="side1 uiCard opacity">
          <div class="categoryLabel">Pick Categories</div>
          <div class="categoryPickerLabels">
            <div style="background-color:#ffbe76" class="categoryPill interactive">Food</div>
            <div style="background-color:#686de0" class="categoryPill interactive">Transportation</div>
            <div style="background-color:#ffe58d" class="categoryPill interactive">Utilities</div>
            <div style="background-color:#7ed6df" class="categoryPill interactive">Shelter</div>
            <div style="background-color:#f9ca24" class="categoryPill interactive">Recreation</div>
            <div style="background-color:#e056fd" class="categoryPill interactive">Personal</div>
            <div style="background-color:#eb4d4b" class="categoryPill interactive">Groceries</div>
            <div style="background-color:#be2edd" class="categoryPill interactive">Medical</div>
            <div style="background-color:#6ab04c" class="categoryPill interactive">Generosity</div>
          </div>
        </div>
        <div class="side2 opacity fadeOut flex flexJustifyCenter flexAlignCenter fillWidth">
          <div class="uiCard interactive" id="confirmButton">Confirm</div>
        </div>
      </div>
    </div>
  </div>
  <!-- touch canvas -->
  <div class="touchCanvasParent">
    <div id="touchCanvas">
      <div id="pennyButton" class="">
        <div id="pennyButtonVisual" class="pennyButtonVisual opacity interactive"></div>
      </div>
    </div>
  </div>
  <script type="module" src="/src/main.tsx"></script>
`

// ! testing reset data
window.addEventListener('keydown', (e)=>{
  if(e.key === 'm'){
    DataManager.clearData();
  }
})

//new pennyInput
new PennyInputSystem();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
