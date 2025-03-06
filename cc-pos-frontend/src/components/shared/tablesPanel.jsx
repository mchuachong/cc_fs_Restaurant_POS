import React from 'react'
import TableCard from './tableCard.jsx'
import { tableStore } from '../../store/tablesStore.js'
import { useRef, useState} from 'react'
import { authAxios } from '../../utility/axios.js'
import { useEffect } from 'react'

function TablesPanel() {
    const {tables,fetchTables} = tableStore()
    const [tableName,setTableName] = useState("")
    const postTable = async() => {  
        if(tableName==""){return alert("Table name can't be blank")}
        else 
        if(tables.map(e=>e.table_name).includes(tableName)){
            alert("Duplicate table name")
        }else{
            try{
                const res = await authAxios.post('/api/tables',{table_name:tableName})
                window.location.reload()
            }
            catch(err){
                console.log(`error:${err}`)
                alert(err)
            }
        }
    }
    useEffect(()=>{
        fetchTables()
    },[])
    const handleOnAddTable = () => {
        addTableDialog.current?.showModal()
    }
    const addTableDialog = useRef()
    const handleOnCancel = () => {
        addTableDialog.current?.close()
        setTableName("")
    }
    const handleOnConfirm = (e) => {
        e.preventDefault()
        postTable()
    }
    const handleOnChangeName = (e) => {
        setTableName(e.target.value)
    }

  return (<div className='tablesPanel'>
        <dialog style={{width:"40rem",height:"18rem",borderRadius:"1rem",border:"1px solid red !important",backgroundColor:"var(--primary)"
        }} ref={addTableDialog}>
        <div className="addtableFormCont" >
            <form onSubmit={handleOnConfirm} style={{fontSize:"1.5rem"}}>
                <h1 className="nselect" style={{textAlign:"left",margin:".5rem 1rem ",color:"var(--accent)"}}>Add Table</h1>
                <div>
                <div>Table Name:</div>
                <input value={tableName} onChange={handleOnChangeName} className="formInput"></input>
                </div>
                <div className="buttons" style={{display:"grid",gridTemplateColumns:"1fr 1fr",justifyItems:"center",alignItems:"center",height:"4rem"}}>
                    <div onClick={handleOnCancel}className="addItemCancelBtn nselect">Cancel</div>
                    <div onClick={handleOnConfirm}className="addItemConfirmBtn nselect">Confirm</div>
                </div>
            </form>
            </div>
        </dialog>

    <div className="tableCardsCont center" style={{height:"90vh"}}>
    <div style={{backgroundColor:"var(--primary)",height:"85vh",width:'71vw',display:"grid",gridTemplateRows:"1fr 6fr",borderRadius:"2rem"}}>
    <div style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><div style={{color:"var(--accent)",fontSize:"2rem",marginLeft:"2rem"}}>Tables & Rooms</div><div className="new-order-btn nselect" onClick={handleOnAddTable} style={{height:"2rem",width:"10vw",fontSize:"1.5vw",marginRight:"2rem",borderRadius:"1rem"}}>Add Table</div></div>
    <div className="noScroll" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(12rem,1fr))",backgroundColor:"var(--secondary)",border:"1rem solid var(--primary)",borderTop:"0",borderRadius:" 0 0 2rem 2rem",overflow:"scroll"}}>
        {tables.map(e=>(<TableCard key={e.table_id} tableId={e.table_id} name={e.table_name} isAvailable={e.is_available} ordertoken={e.order_token}/>))}
    </div>
    </div>
    </div>
    </div>
  )
}

export default TablesPanel