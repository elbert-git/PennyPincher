import { formatCurrency } from "../mathUtilities";
import PennyButton from "./PennyButton";
import { categories } from "../data/constants";
import { DataManager } from "../data/dataManager";
import { LogEntry } from "../data/dataInterfaces";
import {v4 as uuid} from 'uuid';

export default class PennyUI{
  static instance:PennyUI|null = null;
  elInputUIRoot = document.getElementById("inputUIRoot")!;
  elInputBg = document.getElementById("inputBG")!;
  elBottomButtons = document.getElementById("bottomButtons")!;
  elUpperUI = document.getElementById("upperUI")!;
  elCancelButton = document.getElementById("uiCancelButton");
  elMainLabel = document.getElementById("amountLabel");
  elMainCategoryLable = document.getElementById("amountCategoryDisplay");
  elConfirmButton = document.getElementById("confirmButton");
  // states
  currentNumber = 0;
  bottomUIisUp = false;
  currentCategory = ""
  constructor(){
    if(PennyUI.instance){return PennyUI.instance}
    PennyUI.instance = this;

    // events
    this.elCancelButton?.addEventListener("pointerup", ()=>{
      this.toggleUI(false);
      this.updateMainLabelByNumber(0);
      this.setCategory("")
    })
    for (let index = 0; index < 9; index++) {
      const categoryPills = document.getElementsByClassName("categoryPill");
      const allCats = Object.keys(categories)
      const pill = categoryPills[index]
      pill.addEventListener('pointerup', ()=>{new PennyUI().setCategory(categories[allCats[index]].key, categories[allCats[index]].color)})
    }
    this.setCategory("")
    this.elConfirmButton!.addEventListener("pointerup", ()=>{
      if(this.currentNumber > 0){
        // update the data manager with function
        const newEntry:LogEntry = {
          amount:this.currentNumber,
          categoryKey:this.currentCategory,
          categoryColor: categories[this.currentCategory].color,
          timeStamp: Date.now(),
          id:uuid()
        }
        DataManager.addEntry(newEntry)
        // reset ui
        this.toggleUI(false);
        this.updateMainLabelByNumber(0);
        this.setCategory("")
      }else{
        alert("not a valid number")
      }
    })

    // subscribe to penny button zone changes
    new PennyButton().onZoneChanged = this.updateMainLabel.bind(this)
  };
  toggleUI(b:boolean){
    if(b){
      // animate ui in
      this.elUpperUI.classList.remove("upperAnimateOut");
      // set opacity
      this.elInputUIRoot.classList.remove("fadeOut");
      this.elInputBg.classList.remove("fadeOut");
    }else{
      // return button vis
      new PennyButton().setVisible(true)
      // animate ui out
      this.elUpperUI.classList.add("upperAnimateOut");
      this.toggleBottom(false)
      // set opacity
      this.elInputUIRoot?.classList.add("fadeOut");
      this.elInputBg?.classList.add("fadeOut");
    }
  }
  toggleBottom(b:boolean){
    if(b){
      this.bottomUIisUp = true;
      this.elBottomButtons.classList.remove("bottomAnimateOut");
    }else{
      this.bottomUIisUp = false;
      this.elBottomButtons.classList.add("bottomAnimateOut");
    }
  }
  updateMainLabelByNumber(num:number){
    if(num<0){return null} // prevent negative values
    this.currentNumber = num
    this.elMainLabel!.innerText = `${formatCurrency(this.currentNumber)}`
  }
  updateMainLabel(yChange:number, xZone:number){
    // multiplier map
    const multiplier = [0.01, 0.10, 1, 10, 100]
    // update state
    this.currentNumber += yChange * multiplier[xZone]
    if(this.currentNumber < 0){this.currentNumber = 0} // prevent negative values
    // update ui
    this.elMainLabel!.innerText = `${formatCurrency(this.currentNumber)}`
    // play animation
    const element = document.getElementById("upperUI")!
    element.classList.remove("popAnim")
    element.offsetWidth
    element.classList.add("popAnim")
  }

  setCategory(category:string, color="white"){
    if(category !== ""){ // setting it to category
      // update state
      this.currentCategory = category
      // update label
      this.elMainCategoryLable!.innerText = category
      this.elMainCategoryLable!.setAttribute('style', `background-color:${color}`)
      // flip the ui to show confirm button
      document.getElementsByClassName('side1')[0].classList.add("fadeOut")
      document.getElementsByClassName('side2')[0].classList.remove("fadeOut")
    }else{ // setting it to null
      // update state
      this.currentCategory = category
      // update label
      this.elMainCategoryLable!.setAttribute('style', `background-color:${color}`)
      this.elMainCategoryLable!.innerText = category
      // flip the ui to show categories
      document.getElementsByClassName('side1')[0].classList.remove("fadeOut")
      document.getElementsByClassName('side2')[0].classList.add("fadeOut")
    }
  }
}