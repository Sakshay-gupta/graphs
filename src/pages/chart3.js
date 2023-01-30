import React, {useEffect, useState} from "react";
import HeaderChart from "../components/headerchart";
import PieChartData from "../components/piechartdata";
import { useLocation } from "react-router";
import Select from "react-select";


const ops = [
    {
        label:"Top 5",
        value:5
    },
    {
        label:"Top 10",
        value:10
    },
    {
        label:"Top 15",
        value:15
    },
    {
        label:"Top 20",
        value:20,
    }
]
const Chart3 = () => {
    const location = useLocation();
    const {chartData} = location.state
    const [labels, setLabels] = useState(null)
    const [sortBy, setSort] = useState(10)
    //const [flow, setFlow] = useState(false)
    useEffect(() => {
        setLabels(setXaxispre(chartData, 10))
        console.log(labels)
    }, [])
    const handleChangeSort = selectedOption => {
        console.log(selectedOption.value)
        const temp = setXaxispre(chartData, selectedOption.value)
        setLabels(temp)
        
    }
    // const handleFilter = () => {
    //     setFlow(false)
    //     console.log(sortBy)
    //     setLabels(setXaxispre(chartData, sortBy))
    //     console.log(labels)
    // }

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
        console.log(temp)
        for(var i = 0; i < (temp.length < sortBy ? temp.length : sortBy); i++){
            cate.push(temp[i]['l2'])
        }
        console.log(cate)
        return cate;
    }
    return(<>
        <HeaderChart chartData={chartData}/>
        {/* <div style={{marginTop:"10px"}}>
            <input type="radio" id="rating" name="chart" defaultChecked onClick={changeRate}/>
            <label htmlFor="rating">Review Rating</label>

            <input type="radio" id="count" name="chart" onClick={changeCount}/>
            <label htmlFor="count">No. of Reviews</label>
        </div> */}
        <div className="app_container">
        <div style={{display:"flex", marginBottom:"10px"}}>
            <div style={{width:"40%"}}>
                <Select
                    options={ops}
                    onChange={handleChangeSort}
                    />
            </div>
        </div>
        {labels ? <PieChartData data={chartData} labels={labels}/> : null}
        </div>
    </>)
}

export default Chart3;