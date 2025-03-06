import React, { useEffect, useState } from "react";
import Card from '../components/shared/card.jsx'
import { FaMoneyBillTrendUp } from "react-icons/fa6"
import { FaPeopleGroup } from "react-icons/fa6";
import OrderHistory from "../components/shared/order-history.jsx";
import HomeTable from "../components/shared/home-tables.jsx";
import Header from "../components/shared/header.jsx";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { tableStore } from "../store/tablesStore.js";

const Home = () => {
  const navigate = useNavigate();
  const {orders,fetchOrders,tables,fetchTables} = tableStore()
  const [xData,setXData] = useState()
  const [yData,setYData] = useState()

  useEffect(()=>{
    fetchOrders()
    fetchTables()
  },[])
  const calcAllOrders = () => {
    if(!orders.allOrders){return 0}
    let total = 0
    orders.allOrders.map(e=>total+=e.product_price*e.amount)
    return total.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})
  }


  // new Date(e.date).toLocaleString("en-US",{hour12:false}).slice(10,12)
  return (
    <div className="nselect">
      <Header/>
      <div className="home-cont">
       
        <div className="home-left">
        
        <div className='order-history noScroll' style={{border:"2px solid var(--primary)"}}>
        <p style={{color:"var(--accent)",textAlign:"left",marginLeft:"1rem",marginBottom:"0"}}>Orders Today</p>
          <div className="order-history-cont" style={{boder:'1px solid red'}}>
            {orders==undefined?null
            :(orders.allOrders?.map(e=>(<OrderHistory key={e.date} name={e.product_name} time={e.date} image={e.product_image} amount={e.amount}/>)))}
          </div>
        </div>
        </div>

        <div className="home-right">

          <div className="greeting">
            <div>
              <h1>Hi {Cookies.get("user_name")}!</h1>
              <h2>how are we doing today?</h2>
            </div>
            <div onClick={()=>{navigate('/tables')}} className="new-order-btn">+ New Order</div>
          </div>

        <div style={{display:"flex", justifyContent:"space-evenly"}}>
            <Card icon={<FaMoneyBillTrendUp />} title="Sales Today" value={calcAllOrders()}/>
            <Card icon={<FaPeopleGroup />} title="Ongoing Customers" value={tables.filter(e=>e.is_available===false).length}/>
        </div>

        <div>
        <HomeTable xData={xData} yData={yData}/>
        </div>
          
        </div>
      </div>
    </div>  
  );
};

export default Home;
