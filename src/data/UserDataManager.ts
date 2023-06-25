import { ColorConstants } from "./catergoryColors";

const localStorageKey = 'pennyPincherData';

const createDefaultCategories = ()=>{
    return [
        {color: ColorConstants.red, label: "Health"},
        {color: ColorConstants.yellow, label: "Food"},
        {color: ColorConstants.orange, label: "Shopping"},
        {color: ColorConstants.green, label: "Groceries"},
        {color: ColorConstants.blue, label: "Utilities"},
        {color: ColorConstants.tael, label: "Housing"},
        {color: ColorConstants.pink, label: "Transportation"},
        {color: ColorConstants.grey, label: "Miscellaneous"},
    ]
}

interface UserData{
    categories:Array<{color:string, label:string}>,
    expenseRecords:Array<{label:string, color:string, amount:number}>,
    settings:{displayBudgetNumber:boolean}
}

export default class UserDataManager{
    //* initialisation
    static cache:UserData|null = null
    static init(){
        console.log('UserDataManager Initialised')
        //check for local storage
        const loadedFromStorage = localStorage.getItem(localStorageKey);
        // handle new user: no data loaded
        if(loadedFromStorage === null){
            console.log('creating new UserData')
            //create new user data
            const newUserData:UserData = {
                categories: createDefaultCategories(),
                expenseRecords: [],
                settings:{displayBudgetNumber:true}
            }
            //set cache
            UserDataManager.cache = newUserData;
            //write to local storage
            UserDataManager.saveCacheToLocal();
        }
        // handle returning user: loading existing data to cache
        else{
            console.log('userData loaded', loadedFromStorage);
            UserDataManager.cache = JSON.parse(loadedFromStorage);
        }
    }
    static saveCacheToLocal(){
        localStorage.setItem(localStorageKey, JSON.stringify(UserDataManager.cache))
    }
    // * debug data stuff
    static debug_flushUserData(){
        localStorage.removeItem(localStorageKey);
        console.log('userDataflushed');
    }
    static debug_createFakeUserData(){
        console.log('creating fake userData');
            const createdData:UserData = {
                categories: createDefaultCategories(),
                expenseRecords: [
                    {label: "Transportation", color:ColorConstants.red, amount:22.39},
                    {label: "Transportation", color:ColorConstants.red, amount:12.30},
                    {label: "Food", color:ColorConstants.green, amount:9.60},
                    {label: "Food", color:ColorConstants.green, amount:49.60},
                    {label: "Food", color:ColorConstants.green, amount:6.60},
                    {label: "Housing", color:ColorConstants.green, amount:666.60},
                    {label: "Utilities", color:ColorConstants.green, amount:128.60},
                    {label: "Miscellaneous", color:ColorConstants.green, amount:12.60},
                    {label: "Miscellaneous", color:ColorConstants.green, amount:1.32},
                    {label: "Miscellaneous", color:ColorConstants.green, amount:134.70},
                ],
                settings:{displayBudgetNumber:true}
            }
            // set cachse
            UserDataManager.cache = createdData;
            // save to local storage
            UserDataManager.saveCacheToLocal();
    }
    // * hanlding expense
    // todo getExpenseRecords
    // todo add to expense record
    // * hanlding categories
    // get categories
    // set categories
}