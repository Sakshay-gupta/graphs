import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
const MonthChart = ({data}) => {
    const [options, setOptions] = useState({
        chart:{
            type:'line',
        },
        title: {
            text: "Monthly Number of reviews"
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
    })
    useEffect(() => {
        console.log(data)
    }, [])
    return(
        <>
        {data ? <div>
            {data.map((item, index) => {
                return(<div key={index} >
                <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                        ...options,
                        xAxis:{
                            categories:item['xaxis'],
                        },
                        series:[{
                            //zMin:item['senti'] === 'Positive' ? 0 : 0,
                            //name:item['seriesname'],
                            //colorByPoint:true,
                            data:item['data']
                        }]
                    }}
                    allowChartUpdate = {true} 
                    />
            </div>)
            })}
        </div> : null}
        </>
    )
}

export default MonthChart
