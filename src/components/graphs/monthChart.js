import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts/highstock'
const MonthChart = ({data}) => {
    const [options, setOptions] = useState({
        chart:{
            type:'line',
        },
        title: {
            text: "Monthly #Reviews"
        },
        xAxis:{
            labels: {
                formatter: function() {
                    if (this.index % 5) { // even numbers only
                        return this.value;
                    } else {
                        return false;
                    }
                }
            }
        },
        yAxis:{
            title:{
                text:"#Reviews",
                style:{
                    color:"Black"
                },
            },
            opposite:false
        },
        legend:{
            enabled:true,
            layout:'horizontal',
            align:'center',
            verticalAlign:'top',
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            }
        },
    })
    useEffect(() => {
        console.log(data)
    }, [])
    return(
        <>
        {data ? 
            <><div >
            <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={{
                ...options,
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                      day: "%e. %b",
                      month: "%b '%y",
                      year: "%Y"
                    },
                    
                  },
                series:[...data['s1']]
            }}
            allowChartUpdate = {true} />
        </div>
        <div>
            <HighchartsReact
            highcharts={Highcharts}
            //constructorType={'stockChart'}
            options={{
                ...options,
                chart:{
                    zoomType: 'x',
                },
                xAxis:{
                    categories:data['mon'],
                },
                series:[...data['s2']]
            }}
            allowChartUpdate = {true} />
        </div></>
        : null}
        </>
    )
}

export default MonthChart