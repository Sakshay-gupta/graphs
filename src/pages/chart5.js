import React, {useEffect, useState} from "react";
import HeaderChart from "../components/headerchart";
import { useLocation } from "react-router";
import DrillDownPie from "../components/chartsdata/drilldownpiedata";


const Chart5 = () => {
    const location = useLocation();
    const {chartData} = location.state
    const [labels, setLabels] = useState(null)
    useEffect(() => {
        setLabels(setXaxispre(chartData, 10))
    }, [])

    const setXaxispre = (data, sortBy) => {
        let temp1 = []
        let cate = []
        data[0].map(item => {
                let ind = temp1.findIndex(x => x === item['L2 Cluster'])
                if(ind < 0) temp1.push(item['L2 Cluster'])
        })
        let temp = []
        temp1.map(item => {
            let sum = 0
            data.map(item2 => {
                let ind = item2.findIndex(x => (x['L2 Cluster'] === item && x['Sentiment'] === 'Positive'))
                if(ind >= 0){
                    sum += parseInt(item2[ind]['L2 Review Count'])
                }
                let ind2 = item2.findIndex(x => (x['L2 Cluster'] === item && x['Sentiment'] === 'Negative'))
                if(ind2 >= 0){
                    sum += parseInt(item2[ind2]['L2 Review Count'])
                }
            })
            temp.push({
                l2:item,
                count:sum
            })
        })
        temp.sort((a, b) => b.count - a.count)
        for(var i = 0; i < (temp.length < sortBy ? temp.length : sortBy); i++){
            cate.push(temp[i]['l2'])
        }
        return cate;
    }
    return(<>
        <HeaderChart chartData={chartData}/>
        <div className="app_container">
            {labels ? <DrillDownPie data={chartData} labels={labels}/> : null}
        </div>
    </>)
}

export default Chart5;