import React, { useEffect, useState } from "react";
import DrillDownPieChart from "../graphs/drilldownpiechart";

const DrillDownPie = ({data, labels}) =>{
    const [chartData, setData] = useState(null) 
    useEffect(() => {
        setPiechartData(data, labels)
    }, [labels])

    const setPiechartData = (data, labels) => {
        const series = []
        labels.map(item => {
            data.map((csv, index) => {
                const tempL3 = []
                let ind = csv.map((x, i) => (x['L2 Cluster'] === item && x['Sentiment'] === 'Positive') ? i : -1).filter(index => index !== -1);
                if(ind.length > 0){
                    ind.map(i => {
                        let ind2 = tempL3.findIndex(x => x['name'] === csv[i]['L3 Cluster'])
                        if(ind2 < 0){
                            tempL3.push({
                                name:csv[i]['L3 Cluster'],
                                z:Math.round(parseFloat(csv[i]['L3 Rating (Review)']) * 100)/100,
                                y:parseInt(csv[i]['L3 Review Count']),
                            })
                        }
                    })
                }
                let i = series.findIndex(x => (x['product'] === `P${index + 1}` && x['sentiment'] === 'Positive'))
                if(i < 0){
                    series.push({
                        product:`P${index + 1}`,
                        sentiment:"Positive",
                        L2:[{
                            name:item,
                            p:index + 1,
                            s:"Positive",
                            //count:parseInt(csv[ind[0]]['L2 Review Count']),
                            y:parseInt(csv[ind[0]]['L2 Review Count']),
                            //rate:Math.round(parseFloat(csv[ind[0]]['L2 Rating (Review)']) * 100)/100,
                            z:Math.round(parseFloat(csv[ind[0]]['L2 Rating (Review)']) * 100)/100,
                            L3Data:tempL3
                        }],
                    })
                }
                else{
                    series[i]['L2'].push({
                        name:item,
                        p:index + 1,
                        s:"Positive",
                        y:parseInt(csv[ind[0]]['L2 Review Count']),
                        //rate:Math.round(parseFloat(csv[ind[0]]['L2 Rating (Review)']) * 100)/100,
                        z:Math.round(parseFloat(csv[ind[0]]['L2 Rating (Review)']) * 100)/100,
                        L3Data:tempL3
                    })
                }
                const tempL3Neg = []
                let ind2 = csv.map((x, i) => (x['L2 Cluster'] === item && x['Sentiment'] === 'Negative') ? i : -1).filter(index => index !== -1);
                if(ind2.length > 0){
                    ind2.map(i => {
                        let ind3 = tempL3Neg.findIndex(x => x['name'] === csv[i]['L3 Cluster'])
                        if(ind3 < 0){
                            tempL3Neg.push({
                                name:csv[i]['L3 Cluster'],
                                z:Math.round(parseFloat(csv[i]['L3 Rating (Review)']) * 100)/100,
                                y:parseInt(csv[i]['L3 Review Count']),
                            })
                        }
                    })
                }
                let i2 = series.findIndex(x => (x['product'] === `P${index + 1}` && x['sentiment'] === 'Negative'))
                if(i2 < 0){
                    series.push({
                        product:`P${index + 1}`,
                        sentiment:"Negative",
                        L2:[{
                            name:item,
                            p:index + 1,
                            s:"Negative",
                            //count:parseInt(csv[ind[0]]['L2 Review Count']),
                            y:parseInt(csv[ind2[0]]['L2 Review Count']),
                            //rate:Math.round(parseFloat(csv[ind[0]]['L2 Rating (Review)']) * 100)/100,
                            z:Math.round(parseFloat(csv[ind2[0]]['L2 Rating (Review)']) * 100)/100,
                            L3Data:tempL3Neg
                        }],
                    })
                }
                else{
                    series[i2]['L2'].push({
                        name:item,
                        p:index + 1,
                        s:"Negative",
                        y:parseInt(csv[ind2[0]]['L2 Review Count']),
                        //rate:Math.round(parseFloat(csv[ind[0]]['L2 Rating (Review)']) * 100)/100,
                        z:Math.round(parseFloat(csv[ind2[0]]['L2 Rating (Review)']) * 100)/100,
                        L3Data:tempL3Neg
                    })
                }
            })
        })
        setData(series)
    }
    return(<>
            {chartData ? <DrillDownPieChart data={chartData}/> : "Loading"}
        </>)

}

export default DrillDownPie;