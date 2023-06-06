import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react"
import Categories from "../../../data/catergories";

export default function PieChart(){
    const canvas = useRef<HTMLCanvasElement>(null);

    // create chart
    useEffect(()=>{
        try{
            if(canvas.current !== undefined){
                const element = canvas.current! as HTMLCanvasElement;
                new Chart(
                    canvas.current as any,
                    {
                        type:'pie',
                        data: {
                            labels: Categories.instance!.cache.map(elem => elem.name),
                            datasets:[{
                                label: 'Expense Distribution',
                                data: [3, 4, 5, 5, 2],
                                backgroundColor: Categories.instance!.cache.map(elem => elem.color),
                            }]
                        }
                    }
                );
            }
        }catch(error){
            // console.error(error)
        }
    },[])

    return <div className="pieChartRott">
        <canvas ref={canvas}></canvas>
    </div>
}