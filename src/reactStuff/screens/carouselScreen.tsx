import {FC} from 'react';

interface Props{
   children:FC
}

export default function CarouselScreen(props:any){
    
    return <div className='carouselScreen'>
       {props.children} 
    </div>
}