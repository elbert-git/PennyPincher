import { Category } from "../../../data/catergories";

export default function CategoryPill(props:{isOn:boolean, category:Category, clickFunc:(input:string)=>void}){
    const style = {
        opacity: props.isOn ? 1 : 0.3,
        backgroundColor: props.category.color
    }

    const onClickHandler = ()=>{
        props.clickFunc(props.category.name);
    }

    return <div style={style} className="categoryPill clickable" onClick={onClickHandler}>
        <h4>{props.category.name}</h4>
    </div>
}