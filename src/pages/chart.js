import React, {useEffect, useState} from "react";
import { useLocation } from "react-router";
import HeaderChart from "../components/headerchart";
import ChartData from "../components/linechartdata";
const Chart = () => {
    const location = useLocation()
    const {chartData} = location.state
    const [param, setParam] = useState("L2 Rating (Review)")
    const [labels, setLabels] = useState(null)
    useEffect(() => {
        setLabels(setXaxispre(chartData))
        console.log(chartData)
    }, [])

    const setXaxispre = (data) => {
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
        for(var i = 0; i < 10; i++){
            cate.push(temp[i]['l2'])
        }
        return cate;
    }
    const changeRate = () => {
        setParam("L2 Rating (Review)")
    }
    const changeCount = () => {
        setParam("L2 Review Count")
    }
    return(<>
        <HeaderChart chartData={chartData}/>
        <div className="app_container">
            <input type="radio" id="rating" name="chart" defaultChecked onClick={changeRate}/>
            <label htmlFor="rating">Review Rating</label>

            <input type="radio" id="count" name="chart" onClick={changeCount}/>
            <label htmlFor="count">No. of Reviews</label>
            {labels ? <ChartData data={chartData} labels={labels} param={param}/> : null}
        </div>
        
    </>)
}

export default Chart;