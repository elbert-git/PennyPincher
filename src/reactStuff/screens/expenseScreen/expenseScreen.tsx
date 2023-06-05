import { useEffect, useState } from "react";
import Categories from "../../../data/catergories";
import ScreenHeading from "../screenHeading"
import CategoryPill from "./categoryPill";
import StateManager from "../../stateManager";

const tempPieChartStyle = {
    width: '100%',
    minHeight:'10rem',
    backgroundColor: 'blue',
};

export default function ExpenseScreen(){
    //handle filter categories
    const [categoriesFiltered, setCategoriesFiltered] = useState([]);
    new StateManager().addState('categoriesFilter',[categoriesFiltered, setCategoriesFiltered])
    useEffect(()=>{
        // load filtered categories
        if(new StateManager().states['categoriesFilter']){
            //create list of categories
            const categories = Categories.instance!.cache;
            //set the state to be all on
            new StateManager().updateState('categoriesFilter', categories)
        }
    },[])
    const toggleCategoryFilter = (categoryName:string)=>{
        const activeCatergories = [...categoriesFiltered];
        // if category 
    }

    return <div className="expenseScreen screen">
        {/* heading */}
        <ScreenHeading text="Expense Records"></ScreenHeading>
        {/* pie chart */}
        <div style={tempPieChartStyle}></div>
        {/* records */}
        <div className="categoriesSection">
            {Categories.instance!.cache.map((elem)=>{
                return <CategoryPill isOn category={elem} key={elem.name}></CategoryPill>
            })}
        </div>

    </div>
}