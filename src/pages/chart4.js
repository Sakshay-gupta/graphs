import React, {useEffect, useState} from "react";
import { useLocation } from "react-router";
import HeaderChart from "../components/headerchart";
import MonthChartData from "../components/monthChartData";
const timeStampMonth =  (date) => {
    const arr = ["None","Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const temp = date.split(' ');
    const months = temp[0].split('-')
    const ind = parseInt(months[1]);
    if(ind < 10){
        const newWeek = new Date(`${months[0]}.0${ind}.01`)
        return newWeek.getTime();
    }
    else{
        const newWeek = new Date(`${months[0]}.${ind}.01`)
        return newWeek.getTime();
    }
}
const Chart4 = () => {
    const location = useLocation()
    const [data, setData] = useState(null)
    //const [param, setParam] = useState("L2 Rating (Review)")
    useEffect(() => {
        const csv = chartData
        console.log(csv)
        setdateTime(csv)
    }, [])

    const setdateTime = (csv) => {
        const arr = []
        csv.map(item => {
            const temp = []
            item.map(row => {
                const time = timeStampMonth(row['Date'])
                temp.push({
                    l2:row['L2 Cluster'],
                    review:parseInt(row['L2 Review Count']),
                    date:time
                })
            })
            temp.sort((a, b) => a.date - b.date)
            arr.push(temp)
        })
        setData(arr)
    }

    const {chartData} = location.state

    return(<>
        <HeaderChart chartData={chartData}/>
        {data ? <MonthChartData data={data}/> : null}
    </>)
}

export default Chart4;