import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock"

const LineChart = ({data, chartS, params}) => {
    useEffect(() => {
        setOptions(prev => {
            return{
                ...prev,
                yAxis:{
                    // tickInterval:params === 'L2 Review Count' ? 100:1,
                    title:{
                        text:params === 'L2 Review Count' ? "#Review Count" : "#Rating",
                        style:{
                            color:"Black"
                        },
                    },
                },
                title:{
                    text: params === 'L2 Review Count' ? "Number of Reviews" : "Review Rating"
                },
                xAxis:{
                    categories:data['l2'],
                    offset: -150
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
            }
        })

    }, [data])
    const [options, setOptions] = useState({
        chart:{
            marginTop:50,
            marginBottom:50,
        },
        xAxis:{
            categories:data['l2'],
            offset: -150
        },
        yAxis:{
            title:{
                text:"#Rating",
                style:{
                    color:"Black"
                },
            },
            opposite:false,
            gridLineWidth: 0,
        },
        plotOptions:{
            column:{
                grouping:false
            }
        },
    })
    return(
        <>
            {data ? <HighchartsReact
                highcharts={Highcharts}
                options={options}
                allowChartUpdate = {true} />
            : <div>
                loading
            </div>}
        </>
    ) 
}

export default LineChart;