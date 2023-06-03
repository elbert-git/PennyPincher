import StateManager from "../stateManager";
import CalendarIcon from "./icons/calendarIcon";

export interface whiteButtonProps{
    imageUrl:string;
    screenIndex:number;
}

export default function WhiteBarButton(props:whiteButtonProps){
    //on click func
    const clickEvent = ()=>{
        new StateManager().states['focusedScreen'][1](props.screenIndex);
    }

    console.log(new StateManager().states);
    const currentFocusedScreenIndex = new StateManager().states['focusedScreen'][0];
    const isHighlighted = currentFocusedScreenIndex === props.screenIndex

    return <button className="whiteBarButton" onClick={clickEvent}>
        {/* <img className="svg" src={props.imageUrl} alt="" /> */}
        <CalendarIcon highlighed={isHighlighted}></CalendarIcon>
    </button>

}