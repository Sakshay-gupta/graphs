import { useEffect } from 'react'
import {useTable} from 'react-table'
const cols = [
    {   
        Header: "",
        accessor: "none",
    },
    {Header: "Month 1", accessor: "m1", Cell: (row) => {
        if(row.row.original.none !== 'Mean' && row.row.original.none !== 'Std Dev +' && row.row.original.none !== 'Std Dev -'){
            return (
                <div style={{ borderStyle:parseInt(row.row.original.m1) > row.rows[1].original.m1  ? "solid": "",borderColor: parseInt(row.row.original.m1) > row.rows[1].original.m1  ? 'green' : '' }}>
                  {row.row.original.m1}
                </div>
              );
        }
        else{
            return (
                <div>
                  {row.row.original.m1}
                </div>
              );
        }
      },},
    {Header: "Month 2", accessor: "m2", Cell: (row) => {
        if(row.row.original.none !== 'Mean' && row.row.original.none !== 'Std Dev +' && row.row.original.none !== 'Std Dev -'){
            return (
                <div style={{ borderStyle:parseInt(row.row.original.m2) > row.rows[1].original.m2  ? "solid": "",borderColor: parseInt(row.row.original.m2) > row.rows[1].original.m2  ? 'green' : '' }}>
                  {row.row.original.m2}
                </div>
              );
        }
        else{
            return (
                <div>
                  {row.row.original.m2}
                </div>
              );
        }
      },},
    {Header: "Month 6", accessor: "m6", Cell: (row) => {
        if(row.row.original.none !== 'Mean' && row.row.original.none !== 'Std Dev +' && row.row.original.none !== 'Std Dev -'){
            return (
                <div style={{ borderStyle:parseInt(row.row.original.m6) > row.rows[1].original.m6  ? "solid": "",borderColor: parseInt(row.row.original.m6) > row.rows[1].original.m6  ? 'green' : '' }}>
                  {row.row.original.m6}
                </div>
              );
        }
        else{
            return (
                <div >
                  {row.row.original.m6}
                </div>
              );
        }
      },},
    {Header: "Month 9", accessor: "m9", Cell: (row) => {
        if(row.row.original.none !== 'Mean' && row.row.original.none !== 'Std Dev +' && row.row.original.none !== 'Std Dev -'){
            return (
                <div style={{ borderStyle:parseInt(row.row.original.m9) > row.rows[1].original.m9  ? "solid": "",borderColor: parseInt(row.row.original.m9) > row.rows[1].original.m9  ? 'green' : '' }}>
                  {row.row.original.m9}
                </div>
              );
        }
        else{
            return (
                <div>
                  {row.row.original.m9}
                </div>
              );
        }
      },},
    {Header: "Month 12", accessor: "m12", Cell: (row) => {
        if(row.row.original.none !== 'Mean' && row.row.original.none !== 'Std Dev +' && row.row.original.none !== 'Std Dev -'){
            return (
                <div style={{ borderStyle:parseInt(row.row.original.m12) > row.rows[1].original.m12  ? "solid": "",borderColor: parseInt(row.row.original.m12) > row.rows[1].original.m12  ? 'green' : '' }}>
                  {row.row.original.m12}
                </div>
              );
        }
        else{
            return (
                <div>
                  {row.row.original.m12}
                </div>
              );
        }
      },},
    {Header: "Month 18", accessor: "m18", Cell: (row) => {
        if(row.row.original.none !== 'Mean' && row.row.original.none !== 'Std Dev +' && row.row.original.none !== 'Std Dev -'){
            return (
                <div style={{ borderStyle:parseInt(row.row.original.m18) > row.rows[1].original.m18  ? "solid": "",borderColor: parseInt(row.row.original.m18) > row.rows[1].original.m18  ? 'green' : '' }}>
                  {row.row.original.m18}
                </div>
              );
        }
        else{
            return (
                <div>
                  {row.row.original.m18}
                </div>
              );
        }
      },},
    {Header: "Month >18", accessor: "m20", Cell: (row) => {
        if(row.row.original.none !== 'Mean' && row.row.original.none !== 'Std Dev +' && row.row.original.none !== 'Std Dev -'){
            return (
                <div style={{ borderStyle:parseInt(row.row.original.m20) > row.rows[1].original.m20  ? "solid": "",borderColor: parseInt(row.row.original.m20) > row.rows[1].original.m20  ? 'green' : '' }}>
                  {row.row.original.m20}
                </div>
              );
        }
        else{
            return (
                <div>
                  {row.row.original.m20}
                </div>
              );
        }
      },}
]


const Table = ({table}) => {
    useEffect(() => {
        console.log(table)
        console.log(cols)
    }, [])
    // Use the state and functions returned from useTable to build your UI
    // const {
    //   getTableProps,
    //   getTableBodyProps,
    //   headerGroups,
    //   prepareRow,
    //   row, // Instead of using 'rows', we'll use page,
    //   // which has only the rows for the active page
  
    //   // The rest of these things are super handy, too ;)

    // } = useTable(
    //   {
    //     cols,
    //     tab
    //   },
    // )
    const {getTableProps,
           getTableBodyProps,
           headerGroups,
           prepareRow,
           rows
           ,} = useTable({
        columns:cols,
        data:table
    })
    // Render the UI for your table
    return (
      <>
        <div className={`nav-cont `}>
          <span className={`nav-elem-1 active`} >Overall</span>
          <span className={`nav-elem-2`} >Sephora</span>
          <span className={`nav-elem-3`} >Ultra</span>
          <span className={`nav-elem-4`} >Amazon</span>
          <span className={`nav-elem-4`} >Walmart</span>
        </div>
        <div className={`nav-cont `}>
          <span className={`nav-elem-1 active`} >All</span>
          <span className={`nav-elem-2`} >US</span>
          <span className={`nav-elem-3`} >EU</span>
          <span className={`nav-elem-4`} >Japan</span>
          <span className={`nav-elem-4`} >India</span>
          <span className={`nav-elem-4`} >South Korea</span>
          <span className={`nav-elem-4`} >Australia</span>
        </div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
                prepareRow(row)
                return(
                    <tr>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
          </tbody>
        </table>
      </>
    )
  }
  export default Table;