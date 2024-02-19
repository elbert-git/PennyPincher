export default function createBody(){
  document.body.innerHTML = `
    <!-- react root -->
    <div id="root"></div>
    <!-- input canvas -->
    <canvas id="inputBG" class="opacity fadeOut"></canvas>
    <!-- input ui -->
    <div id="inputUIRoot" class="inputUIRoot fillWidth fillHeight opacity fadeOut">
      <div id="upperUI" class="inputLabel">
        <div class="uiCard flex flexColumn flexAlignCenter">
          <input type="number" id="amountLabel"></input>
          <p class="editPrompt">tap to edit</p>
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
              <div style="background-color:#FFBE76" class="categoryPill interactive">Food</div>
              <div style="background-color:#9AAAFF" class="categoryPill interactive">Transportation</div>
              <div style="background-color:#ffe58d" class="categoryPill interactive">Utilities</div>
              <div style="background-color:#B6F8FF" class="categoryPill interactive">Shelter</div>
              <div style="background-color:#FFF175" class="categoryPill interactive">Recreation</div>
              <div style="background-color:#FFA8F1" class="categoryPill interactive">Personal</div>
              <div style="background-color:#FF9998" class="categoryPill interactive">Groceries</div>
              <div style="background-color:#D3A8FF" class="categoryPill interactive">Medical</div>
              <div style="background-color:#ABFF78" class="categoryPill interactive">Generosity</div>
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
          <div id="pennyButtonVisual" class="pennyButtonVisual opacity interactive">
            <svg width="100%" height="100%" viewBox="0 0 124 123" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M116.536 61.5065C116.536 91.5365 91.9739 115.973 61.5602 115.973C31.1465 115.973 6.58398 91.5365 6.58398 61.5065C6.58398 31.4764 31.1465 7.04004 61.5602 7.04004C91.9739 7.04004 116.536 31.4764 116.536 61.5065Z" fill="#F9CA24" stroke="#FF8700" stroke-width="13"/>
              <path d="M59.7964 35.8477V85.9542" stroke="#F0932B" stroke-width="13.2463" stroke-linecap="round"/>
              <path d="M84.8496 60.9014L34.7431 60.9014" stroke="#F0932B" stroke-width="13.2463" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  `
}