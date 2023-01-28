import React, { useEffect, useState } from "react";
import MonthChart from "./graphs/monthChart";

const MonthChartData = ({data}) => {
    const [chartData, setData] = useState(null)
    useEffect(() => {
        setSeriesData(data)
    }, [])
    const setSeriesData = (data) => {
        const series = []
        data.map((csv,ind) => {
            //let start = true
            const temp = []
            const month = []
            let index = 1
            for(var i = 0; i < csv.length; i++){
                const date = csv[i]['date']
                let count = 1
                while(i < csv.length - 1 && csv[i + 1]['date'] === date){
                    count += 1;
                    i += 1
                }
                const realDate = new Date(date)
                temp.push([count])
                if(ind === 0){
                    month.push(`${realDate.getMonth() + 1}, ${realDate.getFullYear()}`)
                }
                else{
                    month.push(index > 11 ? `Year ${Math.round(index/12)}`: `Month ${index}`)
                }
                index += 1
            }
            series.push({
                data:temp,
                xaxis:month
            })
        })
        setData(series)
    }
    return(
        <>
        {chartData ? <MonthChart data={chartData} /> : null}
        </>
    )
}

export default MonthChartData;
