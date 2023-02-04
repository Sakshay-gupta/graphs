import React, { useEffect, useState } from "react";
import MonthChart from "./graphs/monthChart";
import ColPieChart from "./graphs/mcColPieChart";
import Select from "react-select";
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

const ops = [
    {
        label:"1 Month",
        value:1
    },
    {
        label:"3 Month",
        value:3
    },
    {
        label:"6 Month",
        value:6
    },
    {
        label:"9 Month",
        value:9,
    }
]
const MonthChartData = ({data}) => {
    const [chartData, setData] = useState(null)
    const [chartData2, setData2] = useState(null)
    useEffect(() => {
        //const arr = setdateTime(data)
        setTempdata(data[0])
        setColPiedata(data[0], 3)
        //setSeriesData(arr)
    }, [])
    const handleChangeSort = selectedOption => {
        setColPiedata(data[0], selectedOption.value)
    }
    const setColPiedata = (csv, j) => {
        const date = `01-${csv[csv.length - 1]['Date']}`
        const months = new Date(date).getTime();
        console.log(months)
        const series1 = []
        const series2 = []
        const p1 = []
        const p2 = []
        const p3 = []
        const p4 = []
        const p5 = []
        const p6 = []
        const p7 = []
        const p8 = []
        const xaxis = []
        const pie = Array(8).fill(0)
        for(let i = 0; i < j; i++){
            let c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0, c7 = 0, c8 = 0 
            console.log(i) 
            csv.map(item => {
                if(timeStamp(item['Date']) >= (months - (2756820436*(i))) && timeStamp(item['Date']) < (months - (2756820436*(i - 1)))){
                    c1 += parseInt(item['P1'])
                    c2 += parseInt(item['P2'])
                    c3 += parseInt(item['P3'])
                    c4 += parseInt(item['P4'])
                    c5 += parseInt(item['P5'])
                    c6 += parseInt(item['P6'])
                    c7 += parseInt(item['P7'])
                    c8 += parseInt(item['P8'])
                }
            })
            
            p1.push(c1)
            p2.push(c2)
            p3.push(c3)
            p4.push(c4)
            p5.push(c5)
            p6.push(c6)
            p7.push(c7)
            p8.push(c8)
            xaxis.push(`Month ${i + 1}`)
        }
        for(let i = 0; i < j; i++){
            pie[0] += p1[i]
            pie[1] += p2[i]
            pie[2] += p3[i]
            pie[3] += p4[i]
            pie[4] += p5[i]
            pie[5] += p6[i]
            pie[6] += p7[i]
            pie[7] += p8[i]
        }
        const temp = []
        pie.map((item, ind) => {
            temp.push({
                name:`Product ${ind + 1}`,
                y:item
            })
        })
        setData2({
            p1,
            p2,
            p3,
            p4,
            p5,
            p6,
            p7,
            p8,
            xaxis,
            pie:temp,
            title:`${j} Months Aggregate  PieChart`
        })
    }

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
    // const setSeriesData = (data) => {
    //     const series1 = []
    //     const series2 = []
    //     let max = 0
    //     const month = []
    //     data.map((csv,ind) => {
    //         //let start = true
    //         const temp1 = []
    //         const temp2 = []
    //         let index = 1
    //         for(var i = 0; i < csv.length; i++){
    //             const date = csv[i]['date']
    //             let count = 1
    //             while(i < csv.length - 1 && csv[i + 1]['date'] === date){
    //                 count += 1;
    //                 i += 1
    //             }
    //             const realDate = new Date(date)
    //             temp1.push([realDate.getTime(), count])
    //             temp2.push([count])
    //             index += 1
    //         }
    //         max = temp1.length > max ? temp1.length : max
    //         series1.push({
    //             type:"line",
    //             name:`P${ind + 1}`,
    //             data: temp1,
    //         })
    //         series2.push({
    //             type:"line",
    //             name:`P${ind + 1}`,
    //             data: temp2,
    //         })
    //     })
    //     for(var i = 1; i <= max; i++){
    //         month.push(i > 11 ? `Y ${Math.round(i/12)}`: `M ${i}`)
    //     }
    //     setData({
    //         s1:series1,
    //         s2:series2,
    //         mon:month
    //     })
    // }
    return(
        <>
        {chartData ? <MonthChart data={chartData} /> : null}
        <div style={{width:"30%", margin:"10px"}}><Select
            options={ops}
            onChange={handleChangeSort}
            />
        </div>
        {chartData2 ? <ColPieChart data={chartData2} /> : null}
        </>
    )
}

export default MonthChartData;
