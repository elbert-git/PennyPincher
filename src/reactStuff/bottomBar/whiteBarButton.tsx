import { useEffect } from "react";
import StateManager from "../stateManager";


export default function WhiteBarButton(props:any){
    //on click func
    const clickEvent = ()=>{
        new StateManager().updateState('focusedScreen', props.screenIndex)
    }

    //handle button state
    let className = "whiteBarButton";
    const stateManager = new StateManager();
    if(stateManager.states['focusedScreen']){
        if(stateManager.states['focusedScreen'][0] === props.screenIndex){
            className = 'whiteBarButton glow'
        }
    }


    return <button className={className} onClick={clickEvent}>
        {props.children}
    </button>

}