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
        {data ? 
            <><div >
            <HighchartsReact
            highcharts={Highcharts}
            options={{
                ...options,
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                      day: "%e. %b",
                      month: "%b '%y",
                      year: "%Y"
                    }
                  },
                series:[...data['s1']]
            }}
            allowChartUpdate = {true} />
        </div>
        <div>
            <HighchartsReact
            highcharts={Highcharts}
            options={{
                ...options,
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
// {data ? <div style={{display:"flex", justifyContent:"space-around"}}>
//                 <HighchartsReact
//                 highcharts={Highcharts}
//                 options={options1}
//                 allowChartUpdate = {true} />
//                 <HighchartsReact
//                 highcharts={Highcharts}
//                 options={options2}
//                 allowChartUpdate = {true} />
//                 </div>
//             : <div>
//                 loading
//             </div>}
// {data.map((item, index) => {
//     return(<div key={index} >
//     <HighchartsReact
//         highcharts={Highcharts}
//         options={{
//             ...options,
//             xAxis:{
//                 categories:item['xaxis'],
//             },
//             series:[{
//                 //zMin:item['senti'] === 'Positive' ? 0 : 0,
//                 //name:item['seriesname'],
//                 //colorByPoint:true,
//                 data:item['data']
//             }]
//         }}
//         allowChartUpdate = {true} 
//         />
// </div>)
// })}