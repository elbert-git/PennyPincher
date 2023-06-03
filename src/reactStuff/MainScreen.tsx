import MainCarousel from "./screens/mainCarousel"
import BottomBar from "./bottomBar/bottomBar"
import { useEffect, useState } from "react"
import StateManager from "./stateManager";

export default function MainScreen(){
    //create focused screen state
    const [focusedScreen, setFocusedScreen] = useState(1);

    //register with state manager
    useEffect(()=>{
        new StateManager().addState('focusedScreen', [focusedScreen, setFocusedScreen]);
    },[])


    return <div className="mainScreen">
        {/* main carousel */}
        <MainCarousel focusedScreenIndex={focusedScreen}></MainCarousel>
        {/* whitebar */}
        <BottomBar></BottomBar>
    </div>
}