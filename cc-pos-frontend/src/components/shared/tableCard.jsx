import React from 'react'
import { FaCircle } from "react-icons/fa";
import { MdOutlineDeleteForever } from 'react-icons/md'
import { authAxios } from '../../utility/axios';
import { currentTableFunc } from '../../store/currTableStore';

function TableCard({name,isAvailable,ordertoken,tableId}) {
  const {currentTableData,setCurrentTableData,generate,setGenerate} = currentTableFunc()

  const handleOnClickCard = (e) =>{
    
    setCurrentTableData({
      table_id:tableId,
      table_name:name,
      is_available:isAvailable,
      order_token:ordertoken      
    })
    setGenerate(!generate)
   }

  const handleOnClickDelete = (e) => {
    e.stopPropagation()
    postDelete()
  } 
  const postDelete = async() =>{
    try
    {const res = await authAxios.delete(`/api/tables/${tableId}`)
    window.location.reload()}
    catch(error){
      alert(error)
    }
  }
  const availability = () => {
    if(isAvailable){
      return<p style={{display:"flex",alignItems:"center",backgroundColor:"var(--secondary)",padding:"0 1rem",borderRadius:"1rem"}}><FaCircle style={{color:"var(--delete)",fontSize:".75rem",marginRight:".5rem"}} /> Idle</p>
    }else{
      return<p style={{display:"flex",alignItems:"center",backgroundColor:"var(--secondary)",padding:"0 1rem",borderRadius:"1rem"}}><FaCircle style={{color:"green",fontSize:".75rem",marginRight:".5rem"}} /> Serving</p>
    }
  }
  return (
    <div>
              <div onClick={handleOnClickCard} className='clickable' style={{margin:"1rem",width:"11rem", height:"12rem",backgroundColor:"var(--primary)",borderRadius:'1rem',display:"grid",gridTemplateRows:"1fr 1fr 1fr",justifyContent:"center",alignItems:"center"}}>

                 <div style={{margin:"0",fontSize:"1.25rem",marginBottom:"-1.5rem"}}>{name}</div>
                 <div style={{margin:"0",fontSize:"1rem"}}>{availability()}</div>
                 <div className="menu-item-btn-cont" style={{display:"grid",alignItems:"center",justifyItems:"center"}}>
                  <div onClick={handleOnClickDelete} className="menu-delete-btn center "style={{marginBottom:"1rem"}}><MdOutlineDeleteForever /></div>
                 </div>
              </div>
    </div>
  )
}

export default TableCard