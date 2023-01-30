import React, { useEffect, useState } from "react";
import Header from "./header";
import Main from "./components/main";
import Home from "./pages/homepage";
import Chart from "./pages/chart";
import Chart2 from "./pages/chart2";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Chart3 from "./pages/chart3";
import Chart4 from "./pages/chart4";
function App() {
  const [data, setdata] = useState()
  const handledata = (chartdata) => {
    setdata(data)
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/chart" element={<Chart />}/>
        <Route path="/chart2" element={<Chart2 />}/>
        <Route path="/chart3" element={<Chart3 />}/>
        <Route path="/chart4" element={<Chart4 />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;