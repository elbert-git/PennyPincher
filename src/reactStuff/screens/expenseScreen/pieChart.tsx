import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react"
import Categories from "../../../data/catergories";
import Records from "../../../data/records";

export default function PieChart(){
    const canvas = useRef<HTMLCanvasElement>(null);

    // create chart
    useEffect(()=>{
        try{
            if(canvas.current !== undefined){
                const element = canvas.current! as HTMLCanvasElement;
                const recordDataForPie = Records.instance!.getRecordsForPie();
                //create label
                const labels = Object.keys(recordDataForPie);
                //create dataset
                const dataset = labels.map((key)=>{return recordDataForPie[key].amount})
                //create colors map
                const colors = labels.map((key)=>{return recordDataForPie[key].color})
                new Chart(
                    canvas.current as any,
                    {
                        type:'pie',
                        data: {
                            labels: labels,
                            datasets:[{
                                label: 'Amount',
                                data: dataset,
                                backgroundColor: colors
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