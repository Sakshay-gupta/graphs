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

    const setXaxis = (data) => {
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