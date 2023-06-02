import CarouselScreen from "./carouselScreen"
import WhiteScreenCard from "./whiteScreencard";
import {useEffect, useRef, useState} from 'react';

export default function MainCarousel(){
    // this component controls the scroll
    // it holds the state which screen is on and will animate to where the screen is
    const elScroller:any = useRef();

    const [slideState, setSlideState] = useState(0);

    useEffect(()=>{
        const scrollWidth = elScroller.current.clientWidth;
        //scroll to correct index position
        elScroller.current.scroll({
            left: scrollWidth * slideState,
            behavior: "smooth"
        })
    },[slideState])

    const handleKeyDown = (e:any)=>{
        setSlideState(slideState + 1)
    }

    return <div className="mainCarousel" ref={elScroller} onKeyDown={handleKeyDown} tabIndex={0}>
        <div className="carouselScroller">
            <CarouselScreen>
                <WhiteScreenCard></WhiteScreenCard>
            </CarouselScreen>
            <CarouselScreen>
                <div>hello</div>
            </CarouselScreen>
            <CarouselScreen>
                <WhiteScreenCard></WhiteScreenCard>
            </CarouselScreen>
        </div>
    </div>
}