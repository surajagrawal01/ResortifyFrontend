import { AgChartsReact } from "ag-charts-react";
export default function ChartPage({chartOptions}){
    return(
        <div style={{ flex: "1", height: "25%" }}>
          {console.log(chartOptions, 'chartOptions')}
          <AgChartsReact options={chartOptions} />
        </div>
    )
}