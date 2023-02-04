import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import variablePie from "highcharts/modules/variable-pie.js";
import exporting from "highcharts/modules/exporting";
exporting(Highcharts);
variablePie(Highcharts);

const DrillDownPieChart = ({data}) => {
    const [showSecondChart, setShowSecondChart] = useState(Array(data.length).fill(0));
    const [secondChartData, setSecondChartData] = useState([]);

    const pieChartClick = (e) => {
        const arr = Array(data.length).fill(0);
        if(e.point.s === 'Positive'){
            arr[2*(e.point.p )- 2] = 1
        }
        else{
            arr[2*(e.point.p )-1] = 1
        }
        setShowSecondChart(arr);
        console.log(data)
        const p = data.findIndex(x => (x['product'] === `P${e.point.p}` && x['sentiment'] === e.point.s))
        const l3 = data[p]['L2'].findIndex(x => x['name'] === e.point.name)
        console.log(data)
        setSecondChartData(data[p]['L2'][l3]['L3Data']);
    };
    const handleCloseClick = (e) => {
        console.log(e)
        setShowSecondChart(Array(data.length).fill(0))
        setSecondChartData([])
    }
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'variablepie'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
    }

    return(
        <>
        {data ? 
            data.map((item, index) => {
                return(
                <div key={index} className="piechartparent">
                    <div className="piechartchild">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{
                                ...options,
                                exporting: {
                                    enabled: false
                                },
                                plotOptions: {
                                    series: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: true,
                                            format: '<b>{point.name}</b>: {point.percentage: .1f} %'
                                        },
                                        point:{
                                            events:{
                                                click:(e) => pieChartClick(e)
                                            }
                                        }
                                    }
                                },
                                title: {
                                    enabled: true,
                                    text: `${item['product']} ${item['sentiment']}`,
                                    verticalAlign: 'bottom',
                                    align: 'center'
                                },
                                series:[{
                                    zMin: item['sentiment'] === "Negative" ?  0: 4,
                                    name:`${item['product']} ${item['sentiment']} L2 Cluster`,
                                    colorByPoint:true,
                                    data:item['L2']
                                }]
                            }}
                            allowChartUpdate = {true} 
                            />
                    </div>
                    {showSecondChart[index] ? <div className="piechartchild">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{
                                ...options,
                                exporting: {
                                    buttons: {
                                      customButton: {
                                        text: "Close",
                                        onclick: handleCloseClick
                                      }
                                    }
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: true,
                                            format: '<b>{point.name}</b>: {point.percentage: .1f} %'
                                        },
                                    }
                                },
                                title: {
                                    enabled: true,
                                    text: `${item['product']} ${item['sentiment']}`,
                                    verticalAlign: 'bottom',
                                    align: 'center'
                                },
                                series:[{
                                    zMin: item['sentiment'] === "Negative" ?  0: 4,
                                    name:`${item['product']} L3 Cluster`,
                                    colorByPoint:true,
                                    data:secondChartData
                                }]
                            }}
                            allowChartUpdate = {true} 
                            />
                    </div>:null}
                </div>
                )
            })
        : <div>
            loading
        </div>}
        </>
    )
}

export default DrillDownPieChart;