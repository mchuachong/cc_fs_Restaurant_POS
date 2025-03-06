import React, { useEffect } from 'react'
import OrderListCard from './orderListCard'
import { currentTableFunc } from '../../store/currTableStore'
import { authAxios } from '../../utility/axios'
import Cookies from 'js-cookie'

function OrderPanel() {
    const {currentTableData,setCurrentTableData,display,setDisplay,currentTableOrders,setCurrentTableOrders,generate,setGenerate} =currentTableFunc()
    const putNewOrderId = async(e) => {
        try{
            console.log(e)
            const res = await authAxios.put(`/api/tables`,{order_token:e,table_id:currentTableData.table_id,user_id:Cookies.get('user_id')})
            console.log(res)
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }
    const switchUIBtn = () => {
        if(display==="tables"){
            return "Place Order"
        }else{
            return "Switch Table"
        }
    }
    const handleOnClickSwitch = () => {
        if(display==="tables"){
            if(currentTableData.table_id==""){
                alert("Select a Table")}
                else{
                    setNewOrderId()
                    setDisplay("menu")
                }
        }else{
            setDisplay("tables")
        }
    }
    const setNewOrderId = async() => {
        if(currentTableData.table_id!=""&&currentTableData.order_token==null){
            const randId = Math.floor(Math.random()*100000000)
            await setCurrentTableData({...currentTableData,order_token:randId})
            putNewOrderId(randId)
            
        }
    }
    const fetchOrders = async() => {
        try{
        const fetchedOrders = await authAxios.get(`/api/order/${currentTableData.order_token}`)
            setCurrentTableOrders(fetchedOrders.data)
    }catch(err){
        
            alert(err)
        }
    }
    const calcItems = () => {
        let total = 0
        currentTableOrders.map(e=>(total+=(Number(e.product_price)*e.amount)))
        return total.toFixed(2)
    }
    const countItems = () => {
        let count = 0
        currentTableOrders.map(e=>{count+=e.amount})
        return count
    }
    const handleOnClickCheckout = () => {
        calcItems()
        const popup=window.open("reciept","title")
        popup.document.write(`
            <div style="width:300">
            <h1 style="text-align:center">${Cookies.get("shop_name")}</h1>
            <h4 style="text-align:center">${new Date().toLocaleString()}</h4>
            <div style="display:grid; grid-template-columns:1fr 1fr; grid-template-rows:repeat(${currentTableOrders.length},30px);width:300px">
            ${currentTableOrders.map(e=>`<div>${e.product_name} x${e.amount}</div><div style="text-align:right">${(e.amount*e.product_price).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</div>`).join("")}
            <div style="font-weight:bold;margin-top:20px">Total:</div>
            <div style="text-align:right;font-weight:bold;margin-top:20px">${Number(calcItems()).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
            </div>
            </div>
            <div>
            `)
        popup.print()
        popup.close()
        clearTable()
    }
    const clearTable = async() => {
        console.log(currentTableData)
        try{
        const res = await authAxios.put(`/api/tables/${currentTableData.order_token}`)
        window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        if(!currentTableData.order_token){
            return 
        }else{
            fetchOrders()
        }
    },[currentTableData,generate])
  return (
    <div className="ordersListCont nselect" style={{height:"90vh",alignContent:'center'}}>
    <div style={{width:"23vw",height:"85vh",borderRadius:"2rem",display:'grid',gridTemplateRows:"1fr 5fr 1fr",overflow:"hidden"}}>
        <div style={{backgroundColor:"var(--primary)",fontSize:"2rem",color:"var(--accent)",display:"grid",alignItems:"center"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",alignItems:"center"}}>
                <span >{currentTableData.table_name||<div style={{fontSize:"1.5rem"}}>Select Table</div>}</span>
                <span >
                <div onClick={handleOnClickSwitch} className="new-order-btn center nselect" style={{marginRight:"1rem",width:"8rem",fontSize:"1.2rem",justifySelf:"end",height:"2rem"}}>{switchUIBtn()}</div>
                </span>                    
            </div>
        </div>
        <div className="noScroll" style={{border:"1rem solid var(--primary)",borderTop:"0",borderBottom:"0",overflow:"scroll"}}>
            {currentTableData.order_token==null?null
            :(currentTableOrders.map(e=><OrderListCard key={e.order_id} name={e.product_name} amount={e.amount} price={e.product_price} id={e.order_id}/>))}
        </div>
        <div style={{borderRadius:"0 0 2rem 2rem",backgroundColor:"var(--primary)",display:'grid',gridTemplateColumns:"1fr 1fr",alignItems:"center"}}>
            <div style={{textAlign:"left"}}>
                <div style={{marginLeft:"2rem",fontSize:"1rem",fontWeight:"light"}}>Items: {countItems()}</div>
                <div style={{marginLeft:"2rem",fontSize:"1.2rem",fontWeight:"bold"}}> Total: {calcItems()}</div>
            </div>
            <div className="center">
                <div onClick={handleOnClickCheckout} className="new-order-btn center nselect" style={{marginRight:"1rem",width:"8rem",fontSize:"1.2rem",justifySelf:"end",height:"2rem"}}>
                    Checkout
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default OrderPanel