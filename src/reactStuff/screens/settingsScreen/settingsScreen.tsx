import ScreenHeading from "../screenHeading"
import SubHeading from "../subHeading"
import BudgetDisplayToggle from "./budgetDisplayToggle"
import CategoriesSettings from "./categorySettings"

export default function SettingsScreen(){
    return <div className="settingsScreen">
        <ScreenHeading text="Settings"></ScreenHeading>
        <SubHeading text="Home Page"></SubHeading>
        <BudgetDisplayToggle></BudgetDisplayToggle>
        <SubHeading text="Categories"></SubHeading>
        <CategoriesSettings></CategoriesSettings>
    </div>
}