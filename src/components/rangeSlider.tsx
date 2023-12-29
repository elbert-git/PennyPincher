export default function RangeSlider(props:{value:number}){

  return <div style={{width:'90%', height:'4px', backgroundColor:'#b0b0b0'}}>
    <div style={{height:'4px', width:`${props.value}%`, backgroundColor:'black'}}></div>
  </div>
}
