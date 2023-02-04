import React, { useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'

const pieoptions = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Percentage Chart',
        align: 'left',
        verticalAlign: 'top',
    },
    yAxis: {
        min: 0,
        title: {
            text: '#Reviews'
        },
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    plotOptions: {
        series: {
            stacking: 'percent',
            dataLabels: {
                enabled: true
            }
        }
    },
    // chart: {
    //     plotBackgroundColor: null,
    //     plotBorderWidth: null,
    //     plotShadow: false,
    //     type: 'pie'
    // },
    // tooltip: {
    //     pointFormat: '{series.name}:<br />Count: <b>{point.y}</b><br/>'
    // },
    // accessibility: {
    //     point: {
    //         valueSuffix: '%'
    //     }
    // },
    // plotOptions: {
    //     pie: {
    //         allowPointSelect: true,
    //         cursor: 'pointer',
    //         dataLabels: {
    //             enabled: true,
    //             format: '<b>{point.name}</b>: {point.percentage: .1f} %'
    //         },
    //     }
    // },
}
const coloptions = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Stacked Chart',
        align: 'left',
        verticalAlign: 'top',
    },
    yAxis: {
        min: 0,
        title: {
            text: '#Reviews'
        },
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
}
const ColPieChart = ({data}) => {
    useEffect(() => {
        console.log(data)
    }, [])
    return(
        <>
            {data ? <div className="piechartparent">
                
                <div className="piechartchild">
                    <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                        ...coloptions,
                        xAxis:{
                            categories: data.xaxis
                        },
                        series:[
                            {
                                name:'P1',
                                data:data.p1
                            },
                            {
                                name:'P2',
                                data:data.p2
                            },
                            {
                                name:'P3',
                                data:data.p3
                            },
                            {
                                name:'P4',
                                data:data.p4
                            },
                            {
                                name:'P5',
                                data:data.p5
                            },
                            {
                                name:'P6',
                                data:data.p6
                            },
                            {
                                name:'P7',
                                data:data.p7
                            },
                            {
                                name:'P8',
                                data:data.p8
                            }
                        ]
                    }}
                    />
                </div>
                <div className="piechartchild">
                    <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                        ...pieoptions,
                        xAxis:{
                            categories: data.xaxis
                        },
                        series:[
                            {
                                name:'P1',
                                data:data.p1
                            },
                            {
                                name:'P2',
                                data:data.p2
                            },
                            {
                                name:'P3',
                                data:data.p3
                            },
                            {
                                name:'P4',
                                data:data.p4
                            },
                            {
                                name:'P5',
                                data:data.p5
                            },
                            {
                                name:'P6',
                                data:data.p6
                            },
                            {
                                name:'P7',
                                data:data.p7
                            },
                            {
                                name:'P8',
                                data:data.p8
                            }
                        ]
                    }}
                    />
                </div>
            </div>
            :null}
        </>
    )
}


export default ColPieChart;

// title: {
//     enabled: true,
//     text: data['title'],
//     verticalAlign: 'top',
//     align: 'left'
// },
// series:[{
//     zMin:0,
//     name:"#Reviews",
//     colorByPoint:true,
//     data:data['pie']
// }]