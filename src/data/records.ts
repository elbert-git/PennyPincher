import Categories from "./catergories";

export interface Record{
    category:string;
    color:string;
    amount:number;
    id:string;
}

export default class Records{
    static instance:Records|null = null;
    cache:Array<Record> = [];
    constructor(){
        if(Records.instance){return Records.instance}
        else{Records.instance = this};
    }
    getRecordsWithTheseCategories(includedCategories:Array<string>){
        return this.cache.filter(record => includedCategories.includes(record.category));
    }
    getRecordsForPie(){
        const returningTotal:{[key:string]:{amount:number, color:string}} = {}
        this.cache.forEach((record)=>{
            //if record category is in returningTotal just add to it
            if(returningTotal[record.category]){
                returningTotal[record.category].amount = returningTotal[record.category].amount + record.amount
            }
            //else create new catergory entry
            else{
                returningTotal[record.category] = {
                    amount: record.amount,
                    color:record.color
                }
            }
        })
        return returningTotal;
    }
}
