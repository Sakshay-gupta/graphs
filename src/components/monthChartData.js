import React, { useEffect, useState } from "react";
import MonthChart from "./graphs/monthChart";
const timeStampMonth =  (date) => {
    const arr = ["None","Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let temp = date.split(' ');
    if(temp.length === 1){
        temp = date.split('/')
        //const ind = parseInt(months[1]);
        const newWeek = new Date(`${temp[2]}.${temp[0]}.01`)
        return newWeek.getTime();
    }
    else{
        const newWeek = new Date(`${temp[2]}.${temp[1]}.01`)
        return newWeek.getTime();
    }
}
const MonthChartData = ({data}) => {
    const [chartData, setData] = useState(null)
    useEffect(() => {
        const arr = setdateTime(data)
        console.log(arr)
        setSeriesData(arr)
    }, [])

    const setdateTime = (csv) => {
        const arr = []
        csv.map(item => {
            const temp = []
            item.map(row => {
                const time = timeStampMonth(row['Date'])
                temp.push({
                    date:time
                })
            })
            temp.sort((a, b) => a.date - b.date)
            arr.push(temp)
        })
        return arr
    }
    const setSeriesData = (data) => {
        const series1 = []
        const series2 = []
        let max = 0
        const month = []
        data.map((csv,ind) => {
            //let start = true
            const temp1 = []
            const temp2 = []
            let index = 1
            for(var i = 0; i < csv.length; i++){
                const date = csv[i]['date']
                let count = 1
                while(i < csv.length - 1 && csv[i + 1]['date'] === date){
                    count += 1;
                    i += 1
                }
                const realDate = new Date(date)
                temp1.push([realDate.getTime(), count])
                temp2.push([count])
                index += 1
            }
            max = temp1.length > max ? temp1.length : max
            series1.push({
                type:"line",
                name:`P${ind + 1}`,
                data: temp1,
            })
            series2.push({
                type:"line",
                name:`P${ind + 1}`,
                data: temp2,
            })
        })
        for(var i = 1; i <= max; i++){
            month.push(i > 11 ? `Year ${Math.round(i/12)}`: `Month ${i}`)
        }
        setData({
            s1:series1,
            s2:series2,
            mon:month
        })
    }
    return(
        <>
        {chartData ? <MonthChart data={chartData} /> : null}
        </>
    )
}

export default MonthChartData;
