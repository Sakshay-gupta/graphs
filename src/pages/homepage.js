import React, {useState}from "react";
import Papa from 'papaparse'
import { useNavigate } from "react-router";
// import ChartData from "./chardata";
// import ChartData2 from "./temp";
class Homeclass extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file:[],
            data:[],
            load:true,
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
            this.state.file.map((item, ind) => {
                Papa.parse(item, {
                    complete:(res) => this.updateData(res, ind),
                    header: true});
            })
        }
    };
    updateData = (res, ind) =>{
        console.log(this.state.data.length)
        if(this.state.data.length === (this.state.file.length)){
            this.setState(prev => ({
                load:false,
                data:[...prev.data, res.data]
            }), () => {
                console.log(this.state.data)
                //sessionStorage.setItem('data', JSON.stringify(this.state.data))
                this.props.navi('/chart', {state:{chartData:this.state.data}})
            })
        }
        else{
            this.setState(prev => ({
                load:false,
                data:[...prev.data, res.data]
            }), () => {
                if(this.state.data.length === (this.state.file.length)){
                    this.props.navi('/chart', {state:{chartData:this.state.data}})
                }
            })
        }
    }
    render(){
        return(<div className="form-container">
            <label htmlFor="csvInput" className="form-label">Import csv file for Charts</label>
            <input
                type={"file"}
                id={"csvInput"}
                accept={".csv"}
                onChange={(e) => {this.handleOnChange(e)}}
            />
            {this.state.file.length > 0 ? this.state.file.map((item, ind) => {
                return(<div key={ind} style={{margin:"10px"}}>
                    {item.name}
                </div>)
            }):<div style={{marginTop:"10px"}}>No files added</div>}
            <button className="form-button"
                onClick={this.handleOnSubmit}
            >
                Create Chart
            </button>
            <button className="form-button"
                onClick={this.handleOnDelete}
            >
                Remove CSV Data
            </button>
        </div>)
    }
}

const Home = () => {
    const navigate = useNavigate()
    return(<><Homeclass navi={navigate}/></>)
}

export default Home;