import WhiteBarButton from "./whiteBarButton";

// button props
const calendarImageUrl = "assets/bottomBar/calendarIcon.svg";
const settingsImageUrl = "assets/bottomBar/settingsIcon.svg";

export default function BottomBar(){
    return <div className="bottomBar">
        <img src="assets/bottomBar/bottomBar.svg" alt="" />
        <div className="buttonsWrapper">
            <WhiteBarButton screenIndex={0} imageUrl={calendarImageUrl} ></WhiteBarButton>
            <div></div>
            <WhiteBarButton screenIndex={2} imageUrl={settingsImageUrl} ></WhiteBarButton>
        </div>
    </div>
}