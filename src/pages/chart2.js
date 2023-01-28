import React, {useEffect, useState} from "react";
import HeaderChart from "../components/headerchart";
import ChartData2 from "../components/bubblechartdata";
import {useLocation} from 'react-router-dom'
const Chart2 = () => {
    const location = useLocation();
    const {chartData} = location.state
    const [param, setParam] = useState("L2 Rating (Review)")
    const changeRate = () => {
        setParam("L2 Rating (Review)")
    }
    const changeCount = () => {
        setParam("L2 Review Count")
    }
    
    return(<>
        <HeaderChart chartData={chartData}/>
        {/* <div style={{marginTop:"10px"}}>
            <input type="radio" id="rating" name="chart" defaultChecked onClick={changeRate}/>
            <label htmlFor="rating">Review Rating</label>

            <input type="radio" id="count" name="chart" onClick={changeCount}/>
            <label htmlFor="count">No. of Reviews</label>
        </div> */}
        <ChartData2 data={chartData} param={param}/>
    </>)
}

export default Chart2;