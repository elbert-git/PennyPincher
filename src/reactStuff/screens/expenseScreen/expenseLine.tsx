export default function ExpenseLine(props:{label:string, color:string, amount:number}){
    const style = {
        backgroundColor: props.color
    }
    return <div style={style} className="expenseLine jomhuria">
        <div>{props.label}</div>
        <div>${String(props.amount)}</div>
    </div>
}