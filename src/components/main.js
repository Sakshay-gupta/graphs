import React, {useState}from "react";
import Papa from 'papaparse'
import LineChart from "./linechartdata";
import ChartData2 from "./temp";
class Main extends React.Component {
    constructor(){
        super();
        this.state = {
            file:[],
            data:[],
            load:true,
            param:"L2 Rating (Review)"
        }
    }

    handleOnChange = (e) => {
        if(e.target.files[0]){
            this.setState((prev) => ({
                file:[...prev.file, e.target.files[0]]
            }));
        }
    };
    handleOnDelete = () =>{
        this.setState({
            file:[],
            data:[],
            load:true,
        })
    }
    handleOnSubmit = () => {
        this.setState({
            load:true,
            data:[]
        }, () => {
            if (this.state.file.length) {
                const help = async () => {
                    await set()
                }
                help()
            }
        })
        const set = async () => {
            console.log(this.state.data)
            this.state.file.map((item) => {
                Papa.parse(item, {
                    complete:this.updateData,
                    header: true});
            })
        }
        // this.setState({
        //     load:false
        // })
    };
    updateData = (res) =>{
        this.setState(prev => ({
            load:false,
            data:[...prev.data, res.data]
        }), () => console.log(this.state.data))
    }
    changeRate = () => {
        //setParam("L3 Rating (Review)")
        this.setState({
            param:"L2 Rating (Review)"
        })
    }
    changeCount = () => {
        //setParam("L3 Review Count")
        this.setState({
            param:"L2 Review Count"
        })
    }
    render(){
        return(<div>
            <h3>Import csv file for Charts</h3>
            <input
                type={"file"}
                id={"csvFileInput"}
                accept={".csv"}
                onChange={(e) => {this.handleOnChange(e)}}
            />

            <button
                onClick={this.handleOnSubmit}
            >
                Create Chart
            </button>
            <button
                onClick={this.handleOnDelete}
            >
                Remove CSV Data
            </button>
            {this.state.file.length > 0 ? this.state.file.map((item, ind) => {
                return(<div key={ind}>
                    {item.name}
                </div>)
            }):<div>No files added</div>}
            <div style={{marginTop:"10px"}}>
                <input type="radio" id="rating" name="chart" defaultChecked onClick={this.changeRate}/>
                <label htmlFor="rating">Review Rating</label>

                <input type="radio" id="count" name="chart" onClick={this.changeCount}/>
                <label htmlFor="count">No. of Reviews</label>
            </div>
            {this.state.load ? "Select CSV to create Chart" : <LineChart data={this.state.data} param={this.state.param}/>}
            {/* {cols ? <SelectCol cols={cols} /> : null} */}
        </div>)
    }
}

export default Main;