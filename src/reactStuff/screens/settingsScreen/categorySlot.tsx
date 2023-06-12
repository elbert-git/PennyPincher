export default function CategorySlot(props:{text:string, color:string}){
    const mainStyle = {
        backgroundColor: props.color
    }
    return <div className="categorySlot">
        <div style={mainStyle} className="main pillShape">
            {props.text}
        </div>
        <div className="accordion">
        </div>
    </div>
}