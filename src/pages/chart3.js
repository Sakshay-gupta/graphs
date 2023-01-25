import React, {useEffect, useState} from "react";
import HeaderChart from "../components/headerchart";
import PieChartData from "../components/piechartdata";
const Chart3 = () => {
    const [data, setData] = useState(JSON.parse(sessionStorage.getItem('data')))
    const [labels, setLabels] = useState(null)
    useEffect(() => {
        setLabels(setXaxispre(data))
        console.log(labels)
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
    return(<>
        <HeaderChart />
        {/* <div style={{marginTop:"10px"}}>
            <input type="radio" id="rating" name="chart" defaultChecked onClick={changeRate}/>
            <label htmlFor="rating">Review Rating</label>

            <input type="radio" id="count" name="chart" onClick={changeCount}/>
            <label htmlFor="count">No. of Reviews</label>
        </div> */}
        {labels ? <PieChartData data={data} labels={labels}/> : null}
    </>)
}

export default Chart3;