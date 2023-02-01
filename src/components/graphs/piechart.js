import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import variablePie from "highcharts/modules/variable-pie.js";
variablePie(Highcharts);


const options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'variablepie'
    },
    tooltip: {
        pointFormat: '{series.name}:<br />Count: <b>{point.y}</b><br/>Rating: <b>{point.rate}</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
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
}
const PieChart = ({data}) => {

    return(
        <>
            {data ? 
                <div className="piechartparent">
                    {data.map((item, index) => {
                        return(
                            <div key={index} className="piechartchild">
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={{
                                        ...options,
                                        title: {
                                            enabled: true,
                                            text: item['chartname'],
                                            verticalAlign: 'bottom',
                                            align: 'center'
                                        },
                                        series:[{
                                            zMin:item['senti'] === 'Positive' ? 4 : 0,
                                            name:item['seriesname'],
                                            colorByPoint:true,
                                            data:item['data']
                                        }]
                                    }}
                                    allowChartUpdate = {true} 
                                    />
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

export default PieChart;