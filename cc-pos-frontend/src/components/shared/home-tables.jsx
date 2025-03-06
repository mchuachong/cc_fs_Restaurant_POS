import React, { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { tableStore } from '../../store/tablesStore';

const HomeTable = ({}) => {
    const {orders} = tableStore()
    let yData= orders.allOrders?orders.allOrders.map(e=>Number(new Date(e.date).toLocaleString("en-US",{hour12:false}).slice(10,12))):null
    let graphData = {}
    yData?yData.map(e=>{
          if(graphData[e]===undefined){
            graphData[e]=1
          }else{
            graphData[e]++
          }
        }):null
      console.log(Object.keys(graphData))
    return(
        <div style={{width:"800px", justifySelf:"center",height:"300px",backgroundColor:"var(--primary)",borderRadius:'1rem',display:"grid"}}>
            <LineChart
            xAxis={[{ 
                data: Object.keys(graphData),
                label:"Time (hrs)"
            }]}
            series={[
                {
                data: Object.values(graphData),
                label:"Customers"
                },
            ]}
            width={800}
            height={300}
            slotProps={{
                legend: {
                    labelStyle: {
                        fontSize: "1rem",
                        fill: 'var(--accent2)',}
                }
              }}
            sx={{
                ".MuiChartsAxis-root .MuiChartsAxis-line": {
                  stroke:"var(--accent2)",
                  color:"var(--accent2)"
                },
                ".MuiChartsAxis-tickLabel": {
                  stroke:"var(--accent2)",
                },
                ".MuiChartsAxis-tick":{
                    stroke:"var(--accent2)"
                },
                ".MuiChartsAxis-label":{
                    stroke:"var(--accent)"
                },
                ".MuiChartsAxis-top":{
                    stroke:"var(--accent)"
                }
             }}
            />
        </div>
    )
}

export default HomeTable