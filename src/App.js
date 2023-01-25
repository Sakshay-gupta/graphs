import React, { useEffect } from "react";
import Header from "./header";
import Main from "./components/main";
import Home from "./pages/homepage";
import Chart from "./pages/chart";
import Chart2 from "./pages/chart2";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/chart" element={<Chart />}/>
        <Route path="/chart2" element={<Chart2 />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;