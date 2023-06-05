import { Category } from "../../../data/catergories";

export default function CategoryPill(props:{isOn:boolean, category:Category}){
    const style = {
        opacity: props.isOn ? 1 : 0.3,
        backgroundColor: props.category.color
    }
    return <div style={style} className="categoryPill clickable">
        <h4>{props.category.name}</h4>
    </div>
}