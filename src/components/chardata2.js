import Select from "react-select";
import React, {useEffect, useState} from "react";
import BubbleChart from "./bubblechart";

const ChartData2 = ({data, param}) => {
    const [weekD, setWeekD] = useState(null);
    const [ops, setOps] = useState(null)
    const [xaxis, setX] = useState(null)
    const [yaxis, setY] = useState(null)
    useEffect(() => {
        const cate = setXaxis(data)
        const temp = []
        data.map(item => item.pop())
        cate.map(item => {
            temp.push({
                value:item,
                label:item
            })
        })
        setOps(temp)
    }, [])

    const handleChangeX = (selectedOption) => {
        setX(selectedOption)
    }
    const handleChangeY = (selectedOption) => {
        setY(selectedOption)
    }
    const handleFilter = () => {
        setWeekD(null)
        setcsvData(data, param)
    }

    const setXaxis = (data) =>{
        let cate = []
        data[0].map(item => {
            let ind = cate.findIndex(x => x === item['L2 Cluster'])
            if(ind < 0){
                cate.push(item['L2 Cluster'])
            }
        })
        return cate;
    }
    
    const setcsvData = (data, param) => {
        const dataPointspve = []
        const dataPointsnve = []
        data.map((csv, index) => {
            let ind = csv.findIndex( x => {
                if(x['L2 Cluster'] === xaxis.value && x['Sentiment'] === 'Positive'){
                    return true
                }
                return false
            })
            let ind2 = csv.findIndex( x => {
                if(x['L2 Cluster'] === yaxis.value && x['Sentiment'] === 'Positive'){
                    return true
                }
                return false
            })
            if(ind >= 0){
                if(ind2 >= 0){
                    dataPointspve.push({
                        x:Math.round(parseFloat(csv[ind][`${param}`])*100)/100,
                        y:Math.round(parseFloat(csv[ind2][`${param}`])*100)/100,
                        z:parseInt(csv[ind2]['L2 Review Count']) + parseInt(csv[ind]['L2 Review Count']),
                        name:`P${index + 1}+`,
                        val:`Product ${index + 1} Positive`,
                        
                    })
                }
                else{
                    dataPointspve.push({
                        x:Math.round(parseFloat(csv[ind][`${param}`])*100)/100,
                        y:0,
                        z:parseInt(csv[ind]['L2 Review Count']),
                        name:`P${index + 1}+`,
                        val:`Product ${index + 1} Positive`
                    })
                }
            }
            else{
                if(ind2 >= 0){
                    dataPointspve.push({
                        x:0,
                        y:Math.round(parseFloat(csv[ind2][`${param}`])*100)/100,
                        z:parseInt(csv[ind2]['L2 Review Count']),
                        name:`P${index + 1}+`,
                        val:`Product ${index + 1} Positive`
                    })
                }
            }
            let ind3 = csv.findIndex( x => {
                if(x['L2 Cluster'] === xaxis.value && x['Sentiment'] === 'Negative'){
                    return true
                }
                return false
            })
            let ind4 = csv.findIndex( x => {
                if(x['L2 Cluster'] === yaxis.value && x['Sentiment'] === 'Negative'){
                    return true
                }
                return false
            })
            if(ind3 >= 0){
                if(ind4 >= 0){
                    dataPointsnve.push({
                        x:Math.round(parseFloat(csv[ind3][`${param}`])*100)/100,
                        y:Math.round(parseFloat(csv[ind4][`${param}`])*100)/100,
                        z:parseInt(csv[ind3]['L2 Review Count']) + parseInt(csv[ind4]['L2 Review Count']),
                        name:`P${index + 1}-`,
                        val:`Product ${index + 1} Negative`
                    })
                }
                else{
                    dataPointsnve.push({
                        x:Math.round(parseFloat(csv[ind3][`${param}`])*100)/100,
                        y:0,
                        z:parseInt(csv[ind3]['L2 Review Count']),
                        name:`P${index + 1}-`,
                        val:`Product ${index + 1} Negative`
                    })
                }
            }
            else{
                if(ind4 >= 0){
                    dataPointsnve.push({
                        x:0,
                        y:Math.round(parseFloat(csv[ind4][`${param}`])*100)/100,
                        z:parseInt(csv[ind4]['L2 Review Count']),
                        name:`P${index + 1}-`,
                        val:`Product ${index + 1} Negative`
                    })
                }
            }
        })
        setWeekD({
            pointspve:dataPointspve,
            pointsnve:dataPointsnve,
            xval:xaxis.value,
            yval:yaxis.value
        })
    }
    return(
        <>
            {ops ? <div style={{display:"flex", width:"80%", marginTop:"10px"}}>
                <div style={{flexGrow:"2", marginRight:"10px"}}>
                    <label htmlFor="xaxis"> Select X-axis</label>
                    <Select 
                        options={ops}
                        value={xaxis}
                        id={"xaxis"}
                        onChange={handleChangeX}
                        />
                </div>
                <div style={{flexGrow:"2", marginRight:"10px"}}>
                    <label htmlFor="yaxis"> Select Y-axis</label>
                    <Select 
                        options={ops}
                        value={yaxis}
                        id={"yaxis"}
                        onChange={handleChangeY}
                        />
                </div>
                <div style={{alignSelf: "center"}}><button onClick={handleFilter}> Filter Chart</button></div>
            </div> : null }
            {weekD ? <BubbleChart data={weekD} params={param}/> : "Select Cluster to compare"}
        </>
    )
}

export default ChartData2