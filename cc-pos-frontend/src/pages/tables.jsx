import React, { useEffect } from 'react'
import Header from '../components/shared/header'
import OrderPanel from '../components/shared/orderPanel'
import TablesPanel from '../components/shared/tablesPanel'
import MenuPanel from '../components/shared/menuPanel'
import { currentTableFunc } from '../store/currTableStore'


function Tables() {
const {display} =currentTableFunc()
  return ( 
    <>
    <Header/>

    <div style={{display:"grid",gridTemplateColumns:"3fr 1fr"}}>
        {display==="tables"?<TablesPanel/>:<MenuPanel/>}
        <OrderPanel/>
    </div>
    </>
  )
}

export default Tables