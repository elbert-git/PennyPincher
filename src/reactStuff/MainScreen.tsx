import MainCarousel from "./screens/mainCarousel"
import BottomBar from "./bottomBar/bottomBar"
import { useEffect, useState } from "react"
import StateManager from "./stateManager";

export default function MainScreen(){
    //create focused screen state
    const [focusedScreen, setFocusedScreen] = useState(1);

    //create display budget number state
    // todo most like this has to be loaded in from user data cause user wants to save this ssetting
    const [budgetdisplay, setBudgetDisplay] = useState(false);

    //register with state manager
    useEffect(()=>{
        new StateManager().addState('focusedScreen', [focusedScreen, setFocusedScreen]);
        new StateManager().addState('budgetDisplay', [budgetdisplay, setBudgetDisplay]);
    },[])

    return <div className="mainScreen">
        {/* main carousel */}
        <MainCarousel focusedScreenIndex={focusedScreen}></MainCarousel>
        {/* whitebar */}
        <BottomBar></BottomBar>
    </div>
}