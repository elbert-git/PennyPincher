import WhiteBarButton from "./whiteBarButton";

const calendarImageUrl = "assets/bottomBar/calendarIcon.svg";
const calendarClickEvent = ()=>{console.log('click')};

export default function BottomBar(){
    return <div className="bottomBar">
        <img src="assets/bottomBar/bottomBar.svg" alt="" />
        <div className="buttonsWrapper">
            <WhiteBarButton imageUrl={calendarImageUrl} clickEvent={calendarClickEvent}></WhiteBarButton>
        </div>
    </div>
}