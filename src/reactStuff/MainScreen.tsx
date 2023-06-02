import MainCarousel from "./screens/mainCarousel"
import BottomBar from "./bottomBar/bottomBar"

export default function MainScreen(){
    return <div className="mainScreen">
        {/* main carousel */}
        <MainCarousel></MainCarousel>
        {/* whitebar */}
        <BottomBar></BottomBar>
    </div>
}