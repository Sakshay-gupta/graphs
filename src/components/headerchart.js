import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const HeaderChart = (props) =>{
    const location = useLocation()
    console.log(props.chartData)
    return(
        <>
            <div>
                <div className="headerchart">
                    <Link to='/'>Re-Upload Data</Link>
                    <Link to='/chart' state={{ chartData:props.chartData }}>Detailed Chart</Link>
                    <Link to='/chart2' state={{ chartData:props.chartData }}>Comparison Chart</Link>
                    <Link to='/chart3' state={{ chartData:props.chartData }}>Pie Chart</Link>
                    <Link to='/chart4' state={{ chartData:props.chartData }}>Month Chart</Link>
                </div>
            </div>
        </>
    )
}

export default HeaderChart;