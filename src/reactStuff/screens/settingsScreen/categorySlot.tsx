import CategorySlotAccordion from "./catergorySlotAccordion"

export default function CategorySlot(props:{text:string, color:string}){
    const mainStyle = {
        backgroundColor: props.color
    }
    return <div className="categorySlot">
        <div style={mainStyle} className="pillShape">
            {props.text}
        </div>
        <div className="accordion">
            <CategorySlotAccordion></CategorySlotAccordion>
        </div>
    </div>
}