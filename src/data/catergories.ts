export class Category{
    color = "#000000";
    name:string = ""
    constructor(name:string, color:string){
        this.color = color;
        this.name = name;
    }
}

export default class Categories  {
    static instance:Categories|null = null;
    cache:Array<Category> = []
    constructor(){
        if(!Categories.instance){
            console.log("categories created");
            Categories.instance = this;
        }else{
            return Categories.instance;
        }
    }

    addCategory(name:string, color:string){
        this.cache.push(new Category(name, color));
    }
    deleteCategory(name:string){
        this.cache = this.cache.filter((elem)=>{elem.name !== name})
    }
    changeColor(name:string, newColor:string){
        for (let index = 0; index < this.cache.length; index++) {
            if(this.cache[index].name === name){
                this.cache[index].color = newColor;
                break;
            }
        }
    }
    changeName(oldName:string, newName:string){
        for (let index = 0; index < this.cache.length; index++) {
            if(this.cache[index].name === oldName){
                this.cache[index].name = newName;
                break;
            }
        }
    }
}