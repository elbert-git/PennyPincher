let instance:StateManager|null = null;

interface States{
    [key:string]:Array<any> 
}

export default class StateManager{
    states:States = {};
    constructor(){
        if(instance){return instance}
        else{instance = this;}
    }
    addState(key:string, stateArray:any){
        // check if key exists 
        if(!( key in this.states )){
            this.states[key] = [...stateArray];
        }
    }
    updateState(key:string, value:any){
        //update state for react
        this.states[key][1](value);
        //update state in class
        this.states[key][0] = value;
    }
}