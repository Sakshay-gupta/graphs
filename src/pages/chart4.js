import React, {useEffect, useState} from "react";
import { useLocation } from "react-router";
import HeaderChart from "../components/headerchart";
import MonthChartData from "../components/monthChartData";
import Papa from 'papaparse'
const timeStampMonth =  (date) => {
    const arr = ["None","Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const temp = date.split(' ');
    const months = temp[0].split('-')
    const ind = parseInt(months[1]);
    if(ind < 10){
        const newWeek = new Date(`${months[0]}.0${ind}.01`)
        return newWeek.getTime();
    }
    else{
        const newWeek = new Date(`${months[0]}.${ind}.01`)
        return newWeek.getTime();
    }
}
const Chart4 = () => {
    const location = useLocation()
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const [file, setFile] = useState([])

    const handleOnChange = (e) => {
        setLoad(false)
        setData([])
        if(e.target.files[0]){
            setFile((prev) => {
                return [...prev, e.target.files[0]]
            });
        }
    }
    const handleOnSubmit = () => {
        setLoad(false)
        setData([])
        const set = async () => {
            file.map((item, ind) => {
                Papa.parse(item, {
                    complete:(res) => updateData(res, ind),
                    header: true});
            })
        }
        if (file.length) {
            const help = async () => {
                await set().then(() => {
                })
            }
            help()
        }
        
    };
    const updateData = (res, ind) =>{
        if(ind === file.length - 1){
            setData(prev => {
                return[...prev, res.data]
            })
            setLoad(true)
        }
        else{
            setData(prev => {
                return[...prev, res.data]
            })
        }
    }
    const setdateTime = (csv) => {
        const arr = []
        csv.map(item => {
            const temp = []
            item.map(row => {
                const time = timeStampMonth(row['Date'])
                temp.push({
                    l2:row['L2 Cluster'],
                    review:parseInt(row['L2 Review Count']),
                    date:time
                })
            })
            temp.sort((a, b) => a.date - b.date)
            arr.push(temp)
        })
        setData(arr)
    }

    const {chartData} = location.state

    return(<>
        <HeaderChart chartData={chartData}/>
        <div className="app_container">
        {load ? <MonthChartData data={data}/> : null}
        <div className="form-container">
            <label htmlFor="csvInput" className="form-label">Import csv file for Charts</label>
            <input
                type={"file"}
                id={"csvInput"}
                accept={".csv"}
                onChange={(e) => {handleOnChange(e)}}
            />
            {file.length > 0 ? file.map((item, ind) => {
                return(<div key={ind} style={{margin:"10px"}}>
                    {item.name}
                </div>)
            }):<div style={{marginTop:"10px"}}>No files added</div>}
            <button className="form-button"
                onClick={handleOnSubmit}
            >
                Create Chart
            </button>
        </div>
        </div>
    </>)
}

export default Chart4;