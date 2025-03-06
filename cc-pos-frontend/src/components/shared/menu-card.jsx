import React from 'react'
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useRef } from 'react';
import { useState } from 'react';
import { authAxios } from '../../utility/axios';

const MenuCard = ({product}) => {
const dialog = useRef();
const DeleteItem = async(product_id) => {
    try{
    const res = await authAxios.delete(`/api/products/${product_id}`)
    }
    catch(error){
        console.log("failed to delete item")
        console.log(error)
    }
}
const handleOnClickDelete = () => {
    console.log(product.product_id);
    DeleteItem(product.product_id);
    window.location.reload();
}
const EditItem = async(req) => {
    try{
        const res = await authAxios.put(`/api/products/${product.product_id}`,req)
        console.log(res)
    }
    catch(error){
        console.log("failed to edit item")
        console.log(error)
    }
}
const handleOnClickEdit = () => {
    dialog.current?.showModal()
}
const handleOnChangeName = (e) => {
    setFormData({...formData,product_name:e.target.value})
}
const handleOnChangePrice = (e) => {
    setFormData({...formData,product_price:e.target.value})
}
const handleOnChangeImage = (e) => {
    setFormData({...formData,product_image:e.target.value})
}
const handleOnCancel = () => {
    dialog.current?.close()
}
const handleOnConfirm = () => {
    EditItem(formData)
    window.location.reload()
}
const [formData,setFormData] = useState({
    product_name: product.product_name,
    product_price: product.product_price,
    product_image: product.product_image
})
return(
        <>
        <dialog style={{width:"40rem",height:"30rem",borderRadius:"1rem",border:"1px solid red !important",backgroundColor:"var(--primary)"}} ref={dialog}>
        <div className="addMenuFormCont" >
            <form onSubmit={handleOnConfirm} style={{fontSize:"1.5rem"}}>
                <h1 style={{textAlign:"left",margin:".5rem 1rem ",color:"var(--accent)"}}>{`Edit Item (${product.product_name})`}</h1>
                <div>
                <div>Item Name:</div>
                <input value={formData.product_name} onChange={handleOnChangeName} className="formInput"></input>
                </div>
                <div>
                <div>Item Price:</div>
                <input value={formData.product_price} onChange={handleOnChangePrice} className="formInput"></input>
                </div>
                <div>
                <div>Image Source:</div>
                <input value={formData.product_image} onChange={handleOnChangeImage} className="formInput"></input>
                </div>
                <div className="buttons" style={{display:"grid",gridTemplateColumns:"1fr 1fr",justifyItems:"center",alignItems:"center",height:"4rem"}}>
                    <div onClick={handleOnCancel}className="addItemCancelBtn">Cancel</div>
                    <div onClick={handleOnConfirm}className="addItemConfirmBtn">Confirm</div>
                </div>
            </form>
        </div>
    </dialog>

        <div style={{margin:"1rem 0",width:"12rem", height:"17rem",backgroundColor:"var(--primary)",borderRadius:'1rem',display:"grid",gridTemplateRows:"5fr 1fr 1fr 3fr",justifyContent:"center",alignItems:"center"}}>
           <div style={{margin:"0",width:"100%",height:'100%',display:"grid",placeItems:"center",overflow:"hidden"}}>
           <img draggable="false" style={{width:"80%",height:'80%'}} src={product.product_image} alt={product.product_name}></img>
           </div>
           <div style={{margin:"0",fontSize:"1.25rem"}}>{product.product_name}</div>
           <div style={{margin:"0",fontSize:"1rem"}}>{product.product_price}</div>
           <div className="menu-item-btn-cont" style={{display:"grid",gridTemplateColumns:"1fr 1fr",alignItems:"center",justifyItems:"center"}}>
            <div onClick={handleOnClickEdit} className="menu-edit-btn center"><BiEditAlt /></div>
            <div onClick={handleOnClickDelete} className="menu-delete-btn center"><MdOutlineDeleteForever /></div>
           </div>
        </div>
        </>
    )
}

export default MenuCard