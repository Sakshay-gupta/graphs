import React from "react";
import { Link } from "react-router-dom";

const HeaderChart = () =>{
    return(
        <div>
            <div className="headerchart">
                <Link to='/'>Re-Upload Data</Link>
                <Link to='/chart'>Detailed Chart</Link>
                <Link to='/chart2'>Comparison Chart</Link>
                <Link to='/chart3'>Pie Chart</Link>
            </div>
        </div>
    )
}

export default HeaderChart;