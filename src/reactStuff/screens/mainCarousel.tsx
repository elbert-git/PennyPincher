import CarouselScreen from "./carouselScreen"
import WhiteScreenCard from "./whiteScreencard";
import {useEffect, useRef, useState} from 'react';

interface MainCarouselProps{
    focusedScreenIndex:number
}

export default function MainCarousel(props:MainCarouselProps){
    // get main scrolling element
    const elScroller:any = useRef();

    //scroll on focused screen change
    useEffect(()=>{
        const scrollWidth = elScroller.current.clientWidth;
        //scroll to correct index position
        elScroller.current.scroll({
            left: scrollWidth * props.focusedScreenIndex,
            behavior: "smooth"
        })
    },[props.focusedScreenIndex])


    return <div className="mainCarousel" ref={elScroller} tabIndex={0}>
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