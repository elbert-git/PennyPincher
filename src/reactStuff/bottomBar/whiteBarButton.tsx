export interface whiteButtonProps{
    imageUrl:string;
    clickEvent:()=>void
}

export default function WhiteBarButton(props:whiteButtonProps){
    return <button className="whiteBarButton" onClick={props.clickEvent}>
        <img src={props.imageUrl} alt="" />
    </button>

}