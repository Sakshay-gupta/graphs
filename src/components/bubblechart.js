import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts' //core
import HC_more from 'highcharts/highcharts-more' //module
HC_more(Highcharts)

const BubbleChart = ({data, params}) => {
    useEffect(() => {
        console.log(data)
        setOptions1(prev => {
            return{
                ...prev,
                yAxis:{
                    // tickInterval:params === 'L2 Review Count' ? 100:1,
                    title:{
                        text:data['yval'],
                        style:{
                            color:"Black"
                        },
                    },
                    //offset: -150
                },
                xAxis:{
                    title:{
                        text:data['xval'],
                        style:{
                            color:"Black"
                        },
                    },
                    //offset: -150
                },
                series:[{
                    data:data['pointspve'],
                    colorByPoint:true,
                    tooltip: {
                        useHTML: true,
                        pointFormat: `{point.val}: ${data.xval}: {point.x} ${data.yval}: {point.y}`,
                        followPointer: true
                    },
                }]
            }
        })

        setOptions2(prev => {
            return{
                ...prev,
                yAxis:{
                    // tickInterval:params === 'L2 Review Count' ? 100:1,
    
                    title:{
                        text:data['yval'],
                        style:{
                            color:"Black"
                        },
                    },
                    //offset: -150
                },
                xAxis:{
                    title:{
                        text:data['xval'],
                        style:{
                            color:"Black"
                        },
                    },
                    //offset: -150
                },
                series:[{
                    data:data['pointsnve'],
                    colorByPoint:true,
                    tooltip: {
                        useHTML: true,
                        pointFormat: `{point.val}: ${data.xval}: {point.x} ${data.yval}: {point.y}`,
                        followPointer: true
                    },
                }]
            }
        })
    }, [data])
    const [options1, setOptions1] = useState({
        chart:{
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy',
            // marginTop:50,
            // marginBottom:50,
            // marginLeft:50,
            // marginRight:50,
        },
        legend: {
            enabled: false
        },
        title: {
            text: 'Positive'
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. {point.name}, Positive: {point.x}, Negative: {point.y}'
            }
        },
        yAxis:{
            opposite:false,
            gridLineWidth: 0,
        },
        plotOptions:{
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
    })
    const [options2, setOptions2] = useState({
        chart:{
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy',
            // marginTop:50,
            // marginBottom:50,
            // marginLeft:50,
            // marginRight:50,
        },
        legend: {
            enabled: false
        },
        title: {
            text: 'Negative'
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. {point.name}, Positive: {point.x}, Negative: {point.y}'
            }
        },
        yAxis:{
            opposite:false,
            gridLineWidth: 0,
        },
        plotOptions:{
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
    })
    return(
        <>
            {data ? <div style={{display:"flex", justifyContent:"space-around"}}>
                <HighchartsReact
                highcharts={Highcharts}
                options={options1}
                allowChartUpdate = {true} />
                <HighchartsReact
                highcharts={Highcharts}
                options={options2}
                allowChartUpdate = {true} />
                </div>
            : <div>
                loading
            </div>}
        </>
    ) 
}

export default BubbleChart;