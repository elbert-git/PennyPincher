export default class MoneyValue{
  elLabel = document.getElementById('dollarDiv');
  rawValue = 0;
  moneyValue = 0;
  formatNumber = new Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'})
  constructor(){
    this.updateLabel(0);
  }
  updateLabel(num:number){
    this.rawValue = num;
    this.elLabel!.innerHTML = `$${this.rawValue.toString()}`;
  }
  updateLabelBy(num:number){
    console.log(`deducting by ${num.toString()}`);
    if(num === 0){return null}
    this.rawValue = this.rawValue + num;
    this.elLabel!.innerHTML = `${this.formatNumber.format(this.rawValue).toString()}`;
    return null;
  }
}