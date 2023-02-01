import React, { useEffect, useState } from "react";
import PieChart from "./graphs/piechart";
const PieChartData = ({data, labels}) =>{
    const [chartData, setData] = useState(null) 
    useEffect(() => {
        setPiechartData(data, labels)
    }, [])
    useEffect(() => {
        setPiechartData(data, labels)
    }, [labels])
    const setPiechartData = (data, labels) => {
        const series = []
        data.map((csv, index) => {
            const positive = []
            const negative = []
            labels.map(item => {
                let ind = csv.findIndex(x => (x['L2 Cluster'] === item && x['Sentiment'] === 'Positive'))
                if(ind >= 0){
                    positive.push({
                        name:item,
                        y:parseInt(csv[ind]['L2 Review Count']),
                        rate:Math.round(parseFloat(csv[ind]['L2 Rating (Review)']) * 100)/100,
                        z:Math.round(parseFloat(csv[ind]['L2 Rating (Review)']) * 100 * parseInt(csv[ind]['L2 Review Count']))/100
                    })
                }
                let ind2 = csv.findIndex(x => (x['L2 Cluster'] === item && x['Sentiment'] === 'Negative'))
                if(ind2 >= 0){
                    negative.push({
                        name:item,
                        y:parseInt(csv[ind2]['L2 Review Count']),
                        rate:Math.round(parseFloat(csv[ind2]['L2 Rating (Review)']) * 100)/100,
                        z:Math.round(parseFloat(csv[ind2]['L2 Rating (Review)']) * 100 * parseInt(csv[ind2]['L2 Review Count']))/100
                    })
                }
            })
            series.push({
                data:positive,
                chartname:`Positive P${index + 1}`,
                seriesname:`L2 Cluster P${index + 1}`,
                senti:"Positive"
            })
            series.push({
                data:negative,
                chartname:`Negative P${index + 1}`,
                seriesname:`L2 Cluster P${index + 1}`,
                senti:"Negative"
            })
        })
        console.log(series)
        setData(series)
    }
    return(
        <div>
            {chartData ? <PieChart data={chartData}/> : "Building"}
        </div>
    )
}

export default PieChartData;