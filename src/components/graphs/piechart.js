import React, { useEffect, useState } from "react";
import { Tooltip } from "../../utils/tooltips";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import variablePie from "highcharts/modules/variable-pie.js";
variablePie(Highcharts);

const arr = ['Product 1', 'product 2']



const PieChart = ({data, labels}) => {
    const {tooltips, help} = Tooltip()
    useEffect(() => {
        help(labels)
    }, [labels])
    const func = () => {
        console.log("jj")
    }
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'variablepie'
        },
        tooltip: {
            borderWidth: 0,
            backgroundColor: '#ffffff',
          useHTML: true,
          formatter: function() {
            let ind = tooltips.findIndex(x => x['l2'] === this.point.name)
            let temp = []
            if(this.series.name === 'Positive'){
                temp = tooltips[ind].pos.map(item => {
                    return item
                })
            }
            else{
                temp = tooltips[ind].neg.map(item => {
                    return item
                })
            }
            return (`<div style="width: 200px"><div class="nav-cont" style="white-space: normal;font-weight: 100; font-size: medium; margin-bottom:10px">
                    Top Reviews for ${this.point.name}</div> ${temp.join('')}</div> `)
                //     <div class="nav-cont" style="font-weight: 300; font-size: small; margin-bottom:10px">
                // <div style="font-weight: 200px; color:grey; display:flex;justify-content: space-between;">
                //     <div>Rating ${this.point.rate}</div>
                //     <div>20/02/2022</div> <button onClick={func}>J</button>
                // </div>
                // I liked The product
                // </div>
                // <div class="nav-cont" style="font-weight: 300; font-size: small; margin-bottom:10px">
                // <div style="font-weight: 200px; color:grey; display:flex;justify-content: space-between;">
                //     <div>Rating ${this.point.rate}</div>
                //     <div>20/12/2022</div>
                // </div>
                // Product is Good
                // </div>
          },
          style: {
            pointerEvents: 'auto'
          }
        },
        // tooltip: {
        //     pointFormat: '{series.name}:<br />Count: <b>{point.y}</b><br/>Rating: <b>{point.rate}</b>'
        // },
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

    return(
        <>
            {data && tooltips? 
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
                                            name:item['senti'],
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