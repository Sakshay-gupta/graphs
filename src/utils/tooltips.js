import axios from "axios"
import Papa from 'papaparse'
import { useState } from "react"
function csvJSON(csvStr){
    var lines=csvStr.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}
//,{ responseType: 'blob',}
export const Tooltip = () => {
    const [tooltips, setToolTip] = useState(null)
    const send = async () => {
        const res = await axios.get('P4_L3_top_5_20230202v1.xlsx - Sheet1.csv')
        return res;
        const file = res.data
        return file.text().then((csvStr) => {
            const jsonObj1 = csvJSON(csvStr);
            return jsonObj1
        })
    }

    const help = async (labels) => {
        await send().then((res) => {
            const parsed = Papa.parse(res.data)
            const data = parsed.data
            const tools = []
            labels.map(item => {
                const temp =  data.map((x, i) => (x[8] === item && x[0] === 'Positive') ? i : -1).filter(index => index !== -1);
                const temp2 = []
                temp.map(i => {
                    temp2.push({
                        rate:parseInt(data[i][23]),
                        phrase:data[i][21],
                        date:(data[i][24].split(" ")[0]),
                    })
                })
                temp2.sort((a, b) => b.rate - a.rate)
                const pos = []
                for(var i = 0; i < (temp2.length > 3 ? 3 : temp2.length); i++){
                    const tool =`<div class="nav-cont" style="width: 200px; font-weight: 300; font-size: small; margin-bottom:10px">
                    <div style="font-weight: 200px; color:grey; display:flex;justify-content: space-between;">
                        <div>Rating ${temp2[i].rate}</div>
                        <div>${temp2[i].date}</div>
                    </div>
                    <div style="white-space: normal;">
                    ${temp2[i].phrase}
                    </div>
                    </div>`
                    pos.push(tool)
                }
                const temp3 =  data.map((x, i) => (x[8] === item && x[0] === 'Negative') ? i : -1).filter(index => index !== -1);
                const temp4 = []
                temp3.map(i => {
                    temp4.push({
                        rate:parseInt(data[i][23]),
                        phrase:data[i][21],
                        date:(data[i][24].split(" ")[0]),
                    })
                })
                temp4.sort((a, b) => b.rate - a.rate)
                const neg = []
                for(var i = 0; i < (temp4.length > 3 ? 3 : temp4.length); i++){
                    const tool =`<div class="nav-cont" style="width: 200px; font-weight: 300; font-size: small; margin-bottom:10px">
                    <div style="font-weight: 200px; color:grey; display:flex;justify-content: space-between;">
                        <div>Rating ${temp4[i].rate}</div>
                        <div>${temp4[i].date}</div>
                    </div>
                    <div style="white-space: normal;">
                    ${temp4[i].phrase}
                    </div>
                    </div>`
                    neg.push(tool)
                }

                tools.push({
                    l2:item,
                    pos:pos,
                    neg:neg
                })  
            })
            setToolTip(tools)
            return tools
        })
    }
    return{
        help,
        tooltips
    }
}