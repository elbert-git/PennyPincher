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
        // todo need ot get category names based on data only
        const categoryNames = Categories.instance!.cache.map(elem => elem.name);
        const totals:Array<number> = new Array(categoryNames.length).fill(0);
        //create returning array
        //for each record. add to the correct tally
        this.cache.forEach((record)=>{
            const index = categoryNames.indexOf(record.category);
            if()
        })
    }
}
