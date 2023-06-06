import { useEffect, useState } from "react";
import Categories from "../../../data/catergories";
import ScreenHeading from "../screenHeading"
import CategoryPill from "./categoryPill";
import StateManager from "../../stateManager";
import Records from "../../../data/records";
import ExpenseLine from "./expenseLine";

const tempPieChartStyle = {
    width: '100%',
    minHeight:'10rem',
    backgroundColor: 'blue',
};

const stateKey = 'categoriesFilter';

export default function ExpenseScreen(){
    //handle filter categories
    const [categoriesFiltered, setCategoriesFiltered] = useState(['']);
    new StateManager().addState(stateKey,[categoriesFiltered, setCategoriesFiltered])
    useEffect(()=>{
        // load filtered categories
        if(new StateManager().states[stateKey]){
            //create list of categories
            const categories = Categories.instance!.cache.map((categ)=>{return categ.name});
            //set the state to be all on
            setCategoriesFiltered(categories);
            new StateManager().updateState(stateKey , categories)
        }
    },[])
    const toggleCategoryFilter = (categoryName:string)=>{
        const activeCatergories = [...categoriesFiltered] as Array<string>;
        // if category is in activeCategories... take it out
        if(activeCatergories.includes(categoryName)){
           setCategoriesFiltered(activeCatergories.filter((elem)=>{return elem !== categoryName}));
           new StateManager().updateState(stateKey, activeCatergories.filter((elem)=>{return elem !== categoryName})) 
        }
        //else add it in
        else{
           activeCatergories.push(categoryName);
           setCategoriesFiltered(activeCatergories)
           new StateManager().updateState(stateKey, activeCatergories) 
        }
    }
    const isOn = (name:string)=>{
        const activeCategories = new StateManager().states['categoriesFilter'][0] as Array<string>;
        return  activeCategories.includes(name)
    }

    return <div className="expenseScreen screen">
        {/* heading */}
        <ScreenHeading text="Expense Records"></ScreenHeading>
        {/* pie chart */}
        <div style={tempPieChartStyle}></div>
        {/* categories */}
        <div className="categoriesSection">
            {Categories.instance!.cache.map((elem)=>{
                return <CategoryPill 
                isOn={isOn(elem.name)}
                category={elem}
                key={elem.name}
                clickFunc={toggleCategoryFilter}
                ></CategoryPill>
            })}
        </div>
        <div className="recordsSection">
            {Records.instance!.getRecordsWithTheseCategories(categoriesFiltered).map((elem)=>{
                return <ExpenseLine label={elem.category} color={elem.color} amount={elem.amount} key={elem.id}></ExpenseLine>
            })}
        </div>


    </div>
}