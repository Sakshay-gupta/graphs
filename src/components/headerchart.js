import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const HeaderChart = (props) =>{
    const location = useLocation()
    return(
        <>
            <div>
                <div className="app_container">
                    <div className={`nav-cont`}>
                        <Link className={`nav-elem-1 `} to='/'>Re-Upload Data</Link>
                        <Link className={`nav-elem-2 ${location.pathname === '/chart' ? "active" : ""}`} to='/chart' state={{ chartData:props.chartData }}>Detailed Chart</Link>
                        <Link className={`nav-elem-3 ${location.pathname === '/chart2' ? "active" : ""}`} to='/chart2' state={{ chartData:props.chartData }}>Comparison Chart</Link>
                        <Link className={`nav-elem-3 ${location.pathname === '/chart3' ? "active" : ""}`} to='/chart3' state={{ chartData:props.chartData }}>Pie Chart</Link>
                        <Link className={`nav-elem-4 ${location.pathname === '/chart4' ? "active" : ""}`} to='/chart4' state={{ chartData:props.chartData }}>Month Chart</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderChart;