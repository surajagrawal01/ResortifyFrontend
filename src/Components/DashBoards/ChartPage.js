import { AgChartsReact } from "ag-charts-react";
import {useState,useEffect} from 'react'
import axios from 'axios'
export default function ChartPage(){
  const [chartOptions, setChartOptions] = useState({
    // Data: Data to be displayed in the chart
    data: [
      { id: "Jan", totalSum: 0 },
      { id: "Feb", totalSum: 0 },
      { id: "Mar", totalSum: 0 },
      { id: "Apr", totalSum: 0 },
      { id: "May", totalSum: 0 },
      { id: "Jun", totalSum: 0 },
      { id: "Jul", totalSum: 0 },
      { id: "Aug", totalSum: 0 },
      { id: "Sep", totalSum: 0 },
      { id: "Oct", totalSum: 0 },
      { id: "Nov", totalSum: 0 },
      { id: "Dec", totalSum: 0 },
    ],
    // Series: Defines which chart type and data to use
    series: [{ type: "bar", xKey: "id", yKey: "totalSum" }],
  });
  useEffect(()=>{
  (async()=>{
    try{

      const result = await axios.get(
        "https://resortifybackend.onrender.com/api/bookings/calculate",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setChartOptions({ data: result.data.result });
    }catch(err){
      console.log(err)
    }
    
  })();

  },[])
    return(
        <div style={{ flex: "1", height: "25%" }}>
          {console.log(chartOptions, 'chartOptions')}
          <AgChartsReact options={chartOptions} />
        </div>
    )
}