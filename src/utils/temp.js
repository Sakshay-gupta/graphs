import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import variablePie from "highcharts/modules/variable-pie.js";
variablePie(Highcharts);

const DrillDownPieChart = ({data}) => {
    const [showSecondChart, setShowSecondChart] = useState(false);
    const [secondChartData, setSecondChartData] = useState([]);
    useEffect(() => {
        console.log(data)
    }, [data])

    const pieChartClick = (e) => {
        setShowSecondChart(true);
        const p = data.findIndex(x => x['product'] === 'P1')
        const l3 = data[p]['L2'].findIndex(x => x['name'] === e.point.name)
        console.log(data)
        setSecondChartData(data[p]['L2'][l3]['L3Data']);
    };
    const handleCloseClick = () => {
        console.log("clo")
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
                                    text: item['product'],
                                    verticalAlign: 'bottom',
                                    align: 'center'
                                },
                                series:[{
                                    zMin: 4,
                                    name:`${item['product']} L2 Cluster`,
                                    colorByPoint:true,
                                    data:item['L2']
                                }]
                            }}
                            allowChartUpdate = {true} 
                            />
                    </div>
                    {showSecondChart ? <div className="piechartchild">
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
                                    text: item['product'],
                                    verticalAlign: 'bottom',
                                    align: 'center'
                                },
                                series:[{
                                    zMin: 4,
                                    name:`${item['product']} L2 Cluster`,
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