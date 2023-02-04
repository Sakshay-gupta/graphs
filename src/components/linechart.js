import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock"
import { Tooltip } from "../utils/tooltips";

const LineChart = ({data, labels, chartS, params}) => {
    const {tooltips, help} = Tooltip()
    useEffect(() => {
        help(labels)
    }, [data])
    const options = {
        chart:{
            marginTop:50,
            marginBottom:50,
        },
        plotOptions:{
            column:{
                grouping:false
            }
        },
    }
    return(
        <>
            {data && tooltips ? <HighchartsReact
                highcharts={Highcharts}
                options={{
                    ...options,
                    yAxis:{
                        // tickInterval:params === 'L2 Review Count' ? 100:1,
                        title:{
                            text:params === 'L2 Review Count' ? "#Review Count" : "#Rating",
                            style:{
                                color:"Black"
                            },
                        },
                        opposite:false,
                        gridLineWidth: 0,
                    },
                    title:{
                        text: params === 'L2 Review Count' ? "Number of Reviews" : "Review Rating"
                    },
                    xAxis:{
                        categories:data['l2'],
                        offset: -150
                    },
                    tooltip: {
                        borderWidth: 0,
                        backgroundColor: '#ffffff',
                      useHTML: true,
                      formatter: function() {
                        let ind = tooltips.findIndex(x => x['l2'] === this.point.name)
                        let temp = []
                        const senti = this.series.name.split(" ")
                        if(senti[0] === 'Positive'){
                            temp = tooltips[ind].pos.map(item => {
                                return item
                            })
                        }
                        else{
                            temp = tooltips[ind].neg.map(item => {
                                return item
                            })
                        }
                        return (`<div style="width: 200px"><div class="nav-cont" style="white-space: normal;font-weight: 100; font-size: medium; margin-bottom:10px">
                                Top Reviews for ${this.point.name}</div> ${temp.join('')}</div> `)
                      },
                      style: {
                        pointerEvents: 'auto'
                      }
                    },
                    series:[{
                        type:"column",
                        data:data['tripve'],
                        pointWidth:2,
                        enableMouseTracking: false,
                        color:'grey',
                        showInLegend: false,
                        animation: false
                    },{
                        type:"line",
                        data:data['tripve'],
                        marker:{
                            symbol:'triangle'
                        },
                        pointWidth:1,
                        enableMouseTracking: false,
                        color:'green',
                        showInLegend: false,
                        animation: false,
                        lineWidth: 0
                    },{
                        type:"column",
                        data:data['trinve'],
                        pointWidth:2,
                        enableMouseTracking: false,
                        color:'grey',
                        showInLegend: false,
                        animation: false
                    },{
                        type:"line",
                        data:data['trinve'],
                        marker:{
                            symbol:'triangle-down'
                        },
                        pointWidth:1,
                        enableMouseTracking: false,
                        color:'red',
                        showInLegend: false,
                        animation: false,
                        lineWidth: 0
                    },...chartS]
                }}
                allowChartUpdate = {true} />
            : <div>
                loading
            </div>}
        </>
    ) 
}

export default LineChart;