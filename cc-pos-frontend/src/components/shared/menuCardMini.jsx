import React from "react";
import { authAxios } from "../../utility/axios";
import { currentTableFunc } from "../../store/currTableStore";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import Cookies from "js-cookie";

function MenuCardMini({name,id,price,image}) {

  const {currentTableData,setCurrenTableData,generate,setGenerate,currentTableOrders} = currentTableFunc()

  const deleteOrder = async() => {
      try{
      const res = await authAxios.delete(`/api/order/${currentTableOrders.filter(e=>e.product_id===id)[0].order_id}`)
      }
      catch(err){
        console.log(err)
      }
    }
  const createNewOrder = async() =>{
    try{
    const timeStamp = new Date().toLocaleString()
    const res = await authAxios.post(`/api/order`,{order_token:currentTableData.order_token,product_id:id,user_id:Cookies.get("user_id"),date:timeStamp})
  }catch(err){
      console.log(err)
    }
  }
  const incrementOrder = async() => {
    try{
    const orderId = await currentTableOrders.filter(e=>e.product_id===id)[0].order_id
    const res = await authAxios.put(`/api/order/${currentTableOrders.filter(e=>e.product_id===id)[0].order_id}`,{operation:"+1"})
    }catch(err){
      console.log(err)
    }}

  const decrementOrder = async() => {
    try{
    const res = await authAxios.put(`/api/order/${currentTableOrders.filter(e=>e.product_id===id)[0].order_id}`,{operation:"-1"})
    console.log(res)}catch(err){
      console.log(err)
    }
  }
  
  const handleOnClickMinus = async() => {
    if(!currentTableOrders.map(e=>e.product_id).includes(id)){
      return alert("already zero why are you subtracting more?")
    }else{
      if(currentTableOrders.filter(e=>e.product_id===id)[0].amount>1){
        decrementOrder()
      }else{
        deleteOrder()
      }
    }
    setGenerate(!generate)
  }

  const handleOnClickAdd = async() => {
    if(currentTableOrders.map(e=>e.product_id).includes(id)){
      incrementOrder()
    }else{
      createNewOrder()
    }
    setGenerate(!generate)
  }
  const a =currentTableOrders.filter(e=>e.product_id===id)[0]?currentTableOrders.filter(e=>e.product_id===id)[0].amount:0
  return (
    <div className="nselect" >
      <div
        className=""
        style={{
          margin: "1rem",
          width: "11rem",
          height: "15rem",
          backgroundColor: "var(--primary)",
          borderRadius: "1rem",
          display: "grid",
          gridTemplateRows: "3fr 1fr 1fr",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="center" style={{overflow:"hidden",width:"9rem",height:"7rem",alignSelf:"center",justifySelf:"center",margin:"1rem"}}><img draggable="false" src={image} alt={name} style={{maxHeight:"7rem"}}></img></div>
        <div style={{ margin: "0", fontSize: "1rem" }}>
          <div>{name}</div>
          <div>{price}</div>
        </div>
        <div
          className="menu-item-btn-cont"
          style={{
            display: "grid",
            gridTemplateColumns:"1fr 1fr 1fr",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <div onClick={handleOnClickMinus}>< CiCircleMinus  className="menuMiniBtn center"/></div>
          <div style={{fontSize:"1.2rem",alignSelf:"center"}}>{a}</div>
          <div onClick={handleOnClickAdd}><CiCirclePlus className="menuMiniBtn center"/></div>
        </div>
      </div>
    </div>
  );
}

export default MenuCardMini;
