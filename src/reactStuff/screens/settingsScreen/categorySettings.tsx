import Categories from "../../../data/catergories"
import CategorySlot from "./categorySlot"

const addCategoryStyle = {
    backgroundColor: "rgb(167, 183, 198)"
}

export default function CategoriesSettings(){
    const localCategoriesCopy = new Categories().cache;

    return <div className="categoriesSettings jomhuria">
        <button style={addCategoryStyle} className="pillShape jomhuria clickable">+ Add Category</button>
        {localCategoriesCopy.map((category)=>{
            return <CategorySlot text={category.name} color={category.color}></CategorySlot>
        })}

    </div>
}