import { charts } from "highcharts";
import React, {useEffect, useState} from "react";
import ColChart from "./colchart";
import Select from "react-select";
class ChartData2 extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            weekD:null,
            chartSeries:null
        }
    }
    static getDerivedStateFromProps(props, state){
        const setcsvData = (data, param) => {
            let temp1 = []
            let cate = []
            const series =[]
            data[0].map(item => {
                let ind = temp1.findIndex(x => x === item['L2 Cluster'])
                if(ind < 0) temp1.push(item['L2 Cluster'])
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
                console.log(temp)
            }
            else {
                temp1.map(item => {
                    cate.push(item)
                })
            }
            data.map(item => item.pop())
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
            })
            const pve = Array(cate.length).fill(max)
            const nve = Array(cate.length).fill(-max)      
            return {
                weekD:{
                    l2:cate,
                    tripve:pve,
                    trinve:nve
                },
                chartSeries:series
            }
        }
        return setcsvData(props.data, props.param)
    }
    
    render(){
        return(
        <>
            <div style={{width:"30%"}}>
                <Select/>
            </div>
            {this.state.weekD ? <ColChart data={this.state.weekD} chartS={this.state.chartSeries} params={this.props.param}/> : "Building"}
        </>
        )
    }
}

export default ChartData2