import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts' //core
import { Tooltip } from "../utils/tooltips";
import HC_more from 'highcharts/highcharts-more' //module
HC_more(Highcharts)

const BubbleChart = ({data, labels, params}) => {
    const {tooltips, help} = Tooltip()
    useEffect(() => {
        help(labels)
    }, [data])
    const options = {
        chart:{
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy',
        },
        legend: {
            enabled: false
        },
        plotOptions:{
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                },
            },
        },
    }
    return(
        <>
            {data && tooltips? <div className="piechartparent">
                {data.map((item, ind) => {
                    return(
                        <div key={ind} className="piechartchild">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                    ...options,
                                    title:{
                                        text:item['senti']
                                    },
                                    tooltip: {
                                        borderWidth: 0,
                                        backgroundColor: '#ffffff',
                                      useHTML: true,
                                      formatter: function() {
                                        let ind = tooltips.findIndex(x => x['l2'] === item['yval'])
                                        let ind2 = tooltips.findIndex(x => x['l2'] === item['xval'])
                                        let temp = []
                                        if(this.series.name === 'Positive'){
                                            for(var i = 0; i < (tooltips[ind].pos.length > 1 ? 1 : 0); i++){
                                                temp.push(tooltips[ind].pos[0])
                                            }
                                            for(var i = 0; i < (tooltips[ind2].pos.length > 1 ? 1 : 0); i++){
                                                temp.push(tooltips[ind2].pos[0])
                                            }
                                        }
                                        else if(this.series.name === 'Negative'){
                                            for(var i = 0; i < (tooltips[ind].neg.length > 1 ? 1 : 0); i++){
                                                temp.push(tooltips[ind].neg[0])
                                            }
                                            for(var i = 0; i < (tooltips[ind2].pos.length > 1 ? 1 : 0); i++){
                                                temp.push(tooltips[ind2].pos[0])
                                            }
                                        }
                                        return (`<div style="width: 200px"><div class="nav-cont" style="white-space: normal;font-weight: 100; font-size: medium; margin-bottom:10px">
                                                Top Reviews for ${item['yval']}
                                                </div> ${(temp[0] ? temp[0] : "")}
                                                <div class="nav-cont" style="white-space: normal;font-weight: 100; font-size: medium; margin-bottom:10px">
                                                Top Reviews for ${item['xval']}
                                                </div> ${(temp[1] ? temp[1] : "")}
                                                </div> `)
                                      },
                                      style: {
                                        pointerEvents: 'auto'
                                      }
                                    },
                                    yAxis:{
                                        opposite:false,
                                        gridLineWidth: 0,
                                        max:5,
                                        min:0,
                                        tickInterval:1,
                                        title:{
                                            text:item['yval'],
                                            style:{
                                                color:"Black"
                                            },
                                        },
                                    },
                                    xAxis:{
                                        max:5,
                                        min:0,
                                        tickInterval:1,
                                        title:{
                                            text:item['xval'],
                                            style:{
                                                color:"Black"
                                            },
                                        },
                                    },
                                    series:[{
                                        data:item['bubble'],
                                        colorByPoint:true,
                                        tooltip: {
                                            useHTML: true,
                                            pointFormat: `{point.val}: ${item.xval}: {point.x} ${item.yval}: {point.y} count: {point.z}`,
                                            followPointer: true
                                        },
                                        sizeBy:"area",
                                        name:item['senti'],
                                        zMin:item['senti'] === "Positive" ? 10: 0,
                                    }]
                                }}
                                allowChartUpdate = {true} />
                        </div>
                    )
                })}
                </div>
            : <div>
                loading
            </div>}
        </>
    ) 
}

export default BubbleChart;