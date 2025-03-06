import React from 'react'
import { MdOutlineDeleteForever } from "react-icons/md";
import { authAxios } from '../../utility/axios';
import { currentTableFunc } from '../../store/currTableStore';

function OrderListCard({name,price,amount,id}) {
  const {generate,setGenerate} =currentTableFunc()
  const deleteOrder = async() => {
    try{
    console.log(id)
    const res = await authAxios.delete(`/api/order/${id}`)
    console.log(res)
    }
    catch(err){
      console.log(err)
    }
  }
  const handleOnDelete = () => {
    deleteOrder()
    setGenerate(!generate)
  }
  return (
    <div className="nselect" style={{height:"4rem",width:"95%",margin:".5rem",backgroundColor:"var(--primary)",justifySelf:"center",display:"grid",gridTemplateColumns:"5fr 1fr"}}>
      <div style={{display:"grid",alignItems:"center",textAlign:"left",marginLeft:"1rem"}}>
      <div>{`${name} (x${amount})`}</div>
      <div style={{fontWeight:"lighter",marginTop:"-1rem"}}>{price}</div>
      </div>
      {/* Buttons */}
      <div style={{display:"grid",justifyContent:"end",alignItems:"center"}}>
        <div onClick={handleOnDelete} className="menu-delete-btn center" style={{marginRight:"1rem",width:"2.5rem",height:"2.5rem",fontSize:"1.5rem"}}><MdOutlineDeleteForever /></div>
      </div>
    </div>
  )
}

export default OrderListCard