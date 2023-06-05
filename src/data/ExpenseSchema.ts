export interface SingleExpenseRecord{
    category:string;
    amount:number;
    timeStamp:string;
}

export interface ExpenseRecords{
    duration:string
    records:Array<SingleExpenseRecord>
}