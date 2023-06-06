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
}