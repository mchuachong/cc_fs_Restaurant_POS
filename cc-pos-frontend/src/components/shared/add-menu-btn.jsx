import React from 'react'
import { useRef } from 'react'
import {handleFormChange} from '../../store/newProductStore.js'

function AddMenuBtn() {
    const {formData,setFormData,clearFormData,postNewProduct,loading} = handleFormChange();
    const dialog = useRef();

    const handleOnclick= () => {
        dialog.current?.showModal();
    }
    const handleOnCancel= () => {
        dialog.current?.close()
        clearFormData()
    }
    const handleOnConfirm= () => {
        console.log(formData)
        postNewProduct(formData)
        window.location.reload()
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
  return (
    <>
    <dialog style={{width:"40rem",height:"30rem",borderRadius:"1rem",border:"1px solid red !important",backgroundColor:"var(--primary)"
        }} ref={dialog}>
        <div className="addMenuFormCont" >
            <form onSubmit={handleOnConfirm} style={{fontSize:"1.5rem"}}>
                <h1 style={{textAlign:"left",margin:".5rem 1rem ",color:"var(--accent)"}}>Add Item</h1>
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

    <div onClick={handleOnclick} className="center addMenuBtn" style={{margin:"2rem",height:"3rem",width:"80%",borderRadius:"1.5rem",fontSize:"1.5vw",justifySelf:"center"}}>Add Menu</div>
    </>
  )
}

export default AddMenuBtn