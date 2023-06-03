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
}