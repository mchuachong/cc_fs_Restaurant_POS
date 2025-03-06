import React from 'react'
import TableCard from './tableCard.jsx'
import { tableStore } from '../../store/tablesStore.js'
import { useRef, useState} from 'react'
import { authAxios } from '../../utility/axios.js'
import { useEffect } from 'react'
import { productsStore } from '../../store/productsStore.js'
import MenuCardMini from './menuCardMini.jsx'

function MenuPanel() {
    const {tables,fetchTables} = tableStore()
    const [tableName,setTableName] = useState("")
    const {products,fetchProducts} = productsStore()

    useEffect(()=>{
        fetchProducts()
    },[])
  return (<div className='tablesPanel'>
    <div className="tableCardsCont center" style={{height:"90vh"}}>
    <div style={{backgroundColor:"var(--primary)",height:"85vh",width:'71vw',display:"grid",gridTemplateRows:"1fr 6fr",borderRadius:"2rem"}}>
    <div style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><div style={{color:"var(--accent)",fontSize:"2rem",marginLeft:"2rem"}}>Menu</div></div>
    <div className="noScroll" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(12rem,2fr))",backgroundColor:"var(--secondary)",border:"1rem solid var(--primary)",borderTop:"0",borderRadius:" 0 0 2rem 2rem",overflow:"scroll"}}>
        {products.map(e=><MenuCardMini key={e.product_id} name={e.product_name} id={e.product_id} image={e.product_image} price={e.product_price}/>)}
    </div>
    </div>
    </div>
    </div>
  )
}

export default MenuPanel