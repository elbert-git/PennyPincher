import WhiteBarButton from "./whiteBarButton";
import CalendarIcon from "./icons/calendarIcon";
import SettingsIcon from "./icons/settingsIcon";

export default function BottomBar(){
    return <div className="bottomBar">
        <img src="assets/bottomBar/bottomBar.svg" alt="" />
        <div className="buttonsWrapper">
            <WhiteBarButton screenIndex={0}>
                <CalendarIcon highlighed></CalendarIcon>
            </WhiteBarButton>
            <div></div>
            <WhiteBarButton screenIndex={2}>
                <SettingsIcon highlighed></SettingsIcon>
            </WhiteBarButton>
        </div>
    </div>
}