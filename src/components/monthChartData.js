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

const timeStamp = (date) => {
    const newWeek = new Date(`01-${date}`)
    return newWeek.getTime()
}
const MonthChartData = ({data}) => {
    const [chartData, setData] = useState(null)
    useEffect(() => {
        //const arr = setdateTime(data)
        console.log(data)
        setTempdata(data[0])
        //setSeriesData(arr)
    }, [])

    const setTempdata = (csv) => {
        const series1 = []
        const series2 = []
        const xaxis = []
        const p1 = []
        const p2 = []
        const p3 = []
        const p4 = []
        const p5 = []
        const p6 = []
        const p7 = []
        const p8 = []
        const p11 = []
        const p12 = []
        const p13 = []
        const p14 = []
        const p15 = []
        const p16 = []
        const p17 = []
        const p18 = []
        csv.map(item => {
            xaxis.push(timeStamp(item['Date']))
            p1.push([timeStamp(item['Date']), parseInt(item['P1']) === 0 ? null : parseInt(item['P1'])])
            p2.push([timeStamp(item['Date']), parseInt(item['P2']) === 0 ? null : parseInt(item['P2'])])
            p3.push([timeStamp(item['Date']), parseInt(item['P3']) === 0 ? null : parseInt(item['P3'])])
            p4.push([timeStamp(item['Date']), parseInt(item['P4']) === 0 ? null : parseInt(item['P4'])])
            p5.push([timeStamp(item['Date']), parseInt(item['P5']) === 0 ? null : parseInt(item['P5'])])
            p6.push([timeStamp(item['Date']), parseInt(item['P6']) === 0 ? null : parseInt(item['P6'])])
            p7.push([timeStamp(item['Date']), parseInt(item['P7']) === 0 ? null : parseInt(item['P7'])])
            p8.push([timeStamp(item['Date']), parseInt(item['P8']) === 0 ? null : parseInt(item['P8'])])
            if(parseInt(item['P1']) !== 0){
                p11.push(parseInt(item['P1']))
                //p11.push([timeStamp(item['Date']), parseInt(item['P1']) === 0 ? null : parseInt(item['P1'])])
            }
            if(parseInt(item['P2']) !== 0){
                p12.push(parseInt(item['P2']))
                //p12.push([timeStamp(item['Date']), parseInt(item['P2']) === 0 ? null : parseInt(item['P2'])])
            }
            if(parseInt(item['P3']) !== 0){
                p13.push(parseInt(item['P3']))
            }
            if(parseInt(item['P4']) !== 0){
                p14.push(parseInt(item['P4']))
                //p14.push([timeStamp(item['Date']), parseInt(item['P4']) === 0 ? null : parseInt(item['P4'])])
            }
            if(parseInt(item['P5']) !== 0){
                p15.push(parseInt(item['P5']))
                //p15.push([timeStamp(item['Date']), parseInt(item['P5']) === 0 ? null : parseInt(item['P5'])])
            }
            if(parseInt(item['P6']) !== 0){
                p16.push(parseInt(item['P6']))
                //p16.push([timeStamp(item['Date']), parseInt(item['P6']) === 0 ? null : parseInt(item['P6'])])
            }
            if(parseInt(item['P7']) !== 0){
                p17.push(parseInt(item['P7']))
                //p17.push([timeStamp(item['Date']), parseInt(item['P7']) === 0 ? null : parseInt(item['P7'])])
            }
            if(parseInt(item['P8']) !== 0){
                p18.push(parseInt(item['P8']))
                //p18.push([timeStamp(item['Date']), parseInt(item['P8']) === 0 ? null : parseInt(item['P8'])])
            }
        })
        series1.push({
            type:"line",
            name:'P1',
            data: p1,
        })  
        series1.push({
            type:"line",
            name:'P2',
            data: p2,
        })
        series1.push({
            type:"line",
            name:'P3',
            data: p3,
        })
        series1.push({
            type:"line",
            name:'P4',
            data: p4,
        })
        series1.push({
            type:"line",
            name:'P5',
            data: p5,
        })
        series1.push({
            type:"line",
            name:'P6',
            data: p6,
        })
        series1.push({
            type:"line",
            name:'P7',
            data: p7,
        })
        series1.push({
            type:"line",
            name:'P8',
            data: p8,
        })
        series2.push({
            type:"line",
            name:'P1',
            data: p12,
        })  
        series2.push({
            type:"line",
            name:'P2',
            data: p12,
        })
        series2.push({
            type:"line",
            name:'P3',
            data: p13,
        })
        series2.push({
            type:"line",
            name:'P4',
            data: p14,
        })
        series2.push({
            type:"line",
            name:'P5',
            data: p15,
        })
        series2.push({
            type:"line",
            name:'P6',
            data: p16,
        })
        series2.push({
            type:"line",
            name:'P7',
            data: p17,
        })
        series2.push({
            type:"line",
            name:'P8',
            data: p18,
        })
        const month = []
        for(var i = 1; i <= xaxis.length; i++){
            month.push(i > 11 ? `Y ${Math.round(i/12)}`: `M ${i}`)
        }
        setData({
            s1:series1,
            s2:series2,
            mon:month,
            xaxis:xaxis
        })
    }
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
            month.push(i > 11 ? `Y ${Math.round(i/12)}`: `M ${i}`)
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
