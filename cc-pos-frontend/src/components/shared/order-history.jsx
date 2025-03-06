import React from 'react'
import { GrStatusGoodSmall } from "react-icons/gr";
import { currentTableFunc } from '../../store/currTableStore';

const OrderHistory = ({name,image,time,amount}) => {

    return(
        <div className="" style={{display:"grid",gridTemplateColumns:"4fr 2fr",gridTemplateRows:"3rem",alignItems:"center",borderRadius:"2rem",margin:".5rem",backgroundColor:"var(--secondary)"}}>
            <h1 style={{textAlign:"left",marginLeft:"1rem",fontSize:'1rem'}}>{`${name} (x${amount})`}</h1>
            <h2 style={{margin:'0',fontSize:'1rem'}}>{(new Date(time).toLocaleString()).slice(9,15)+(new Date(time).toLocaleString()).slice(18)}</h2>
        </div>
    )
}

export default OrderHistory