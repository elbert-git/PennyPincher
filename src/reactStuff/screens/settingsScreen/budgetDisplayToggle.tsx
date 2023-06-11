import StateManager from "../../stateManager"

export default function BudgetDisplayToggle(){

    const isOn = (()=>{
        if(new StateManager().states['budgetDisplay']){
            return new StateManager().states['budgetDisplay'][0];
        }else{
            return false;
        }
    })();

    const style = {
        left: isOn ? "1.185rem":"0rem",
        opacity: isOn ? "1":"0.5"
    }

    const onClick = ()=>{
        const currentState = new StateManager().states['budgetDisplay'][0]
        new StateManager().updateState('budgetDisplay', !currentState);
    }

    return <div className="budgetDisplayToggle">
        <div className="label jomhuria">Display Budget Number</div>
        <div className="toggleRoot" onClick={onClick}>
            <div className="toggleNob" style={style}></div>
        </div>
    </div>

}