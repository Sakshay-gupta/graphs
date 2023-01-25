import Select from "react-select";
import React, {useEffect, useState} from "react";
import Linechart from "./linechart";

const ChartData = ({data, param, labels}) => {
    const [weekD, setWeekD] = useState(null);
    const [ops, setOps] = useState(null)
    const [xaxis, setX] = useState([])
    const [chartSeries, setCS] = useState(null);
    useEffect(() => {
        const temp = []
        data.map(item => item.pop())
        labels.map(item => {
            temp.push({
                value:item,
                label:item
            })
        })
        setOps(temp)
    }, [])
    useEffect(() => {
        console.log(param)
        setWeekD(null)
        const cate = setXaxis(data, xaxis)
        setcsvData(data, param, cate)
    }, [param])

    const setXaxis = (data, xval) =>{
        let temp1 = []
        let cate = []
        labels.map(item => {
            if(xval.length > 0){
                xval.map(item => {
                    let ind = temp1.findIndex(x => x === item.value)
                    if(ind < 0) temp1.push(item.value)
                })
            } 
            else{
                let ind = temp1.findIndex(x => x === item)
                if(ind < 0) temp1.push(item)
            }
        })
        if(param === "L2 Review Count"){
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
            temp.map(item => {
                cate.push(item['l2'])
            })
        }
        else {
            temp1.map(item => {
                cate.push(item)
            })
        }
        return cate;
    }
    const handleChange = (selectedOption) => {

        setX(selectedOption)
    }
    const handleRemove = () => {
        setWeekD(null)
        const cate = setXaxis(data, [])
        setcsvData(data, param, cate)
        setXaxis([])
    }
    const handleFilter = () => {
        setWeekD(null)
        const cate = setXaxis(data, xaxis)
        setcsvData(data, param, cate)
    }
    const setcsvData = (data, param, cate) => {
        let series = []
        let max = 0
        data.map((csv, index) => {
            const dataPoints = {
                pve:[],
                nve:[]
            }
            cate.map((item) => {
                let ind = csv.findIndex( x => {
                    if(x['L2 Cluster'] === item && x['Sentiment'] === 'Positive'){
                        return true
                    }
                    return false
                })
                if(ind >= 0){
                    max = csv[ind][`${param}`] > max ? parseInt(csv[ind][`${param}`]) + 1 : max
                    dataPoints.pve.push(parseFloat(csv[ind][`${param}`]))
                }
                else{
                    dataPoints.pve.push(null)
                }
                let ind2 = csv.findIndex( x => {
                    if(x['L2 Cluster'] === item && x['Sentiment'] === 'Negative'){
                        return true
                    }
                    return false
                })
                if(ind2 >= 0){
                    max = csv[ind2][`${param}`] > max ? parseInt(csv[ind2][`${param}`]) + 1 : max
                    dataPoints.nve.push(parseFloat(csv[ind2][`${param}`]) * -1)
                }else{
                    dataPoints.nve.push(null)
                }
            })
            series.push({
                type:"line",
                name:`Positive P${index + 1}`,
                data: dataPoints['pve'],
                tooltip:{
                    valueDecimals:2
                },
            })
            series.push({
                type:"line",
                name:`Negative P${index + 1}`,
                data: dataPoints['nve'],
                tooltip:{
                    valueDecimals:2
                },
            })
            console.log(dataPoints)
        })
        setCS(series)
        const pve = Array(cate.length).fill(max)
        const nve = Array(cate.length).fill(-max)
        setWeekD({
            l2:cate,
            tripve:pve,
            trinve:nve,
            maxi:max
        })
    }
    return(
        <>
            {ops ? <div style={{display:"flex", width:"50%"}}>
                <div style={{flexGrow:"3", marginRight:"10px"}}>
                    <Select 
                        isMulti={true}
                        options={ops}
                        value={xaxis}
                        onChange={handleChange}
                        closeMenuOnSelect={false}
                        />
                </div>
                <div style={{alignSelf: "center"}}><button onClick={handleFilter}> Filter Chart</button></div>
                {/* <div style={{alignSelf: "center"}}><button onClick={handleRemove}> Remove Filter</button></div> */}
            </div> : null }
            {weekD ? <Linechart data={weekD} chartS={chartSeries} params={param}/> : "Building"}
        </>
    )
}

export default ChartData