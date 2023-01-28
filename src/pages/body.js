import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./homepage";
import { useState } from "react";
import Chart from "./chart";
import Chart2 from "./chart2";
import { useNavigate } from "react-router-dom";
import Chart3 from "./chart3";
import Chart4 from "./chart4";
const Body = () => {
    const [data, setdata] = useState(null)
    const handleData = (data) => {
        setdata(data)
    }
    return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home handle={handleData} />}/>
        <Route path="/chart" element={<Chart />}/>
        <Route path="/chart2" element={<Chart2 />}/>
        <Route path="/chart3" element={<Chart3 />}/>
        <Route path="/chart4" element={<Chart4 />}/>
      </Routes>
    </BrowserRouter>
    )
}
export default Body