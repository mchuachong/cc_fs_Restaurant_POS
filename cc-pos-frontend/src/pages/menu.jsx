import React from 'react'
import { productsStore } from '../store/productsStore'
import { useEffect } from 'react';
import MenuCard from '../components/shared/menu-card';
import { useState } from 'react';
import AddMenuBtn from '../components/shared/add-menu-btn';
import Header from '../components/shared/header';


const Menu = () => {

const {products,fetchProducts} = productsStore();

   useEffect(()=>{
        fetchProducts()
    },[])

    return(
        <>
        <Header/>
        <div style={{display:"grid",alignItems:"center",justifyContent:"center",height:'90vh'}}>
            <div style={{height:'85vh',width:'98vw',backgroundColor:'var(--primary)',borderRadius:'1rem',display:"grid",gridTemplateColumns:"1fr 4fr",alignItems:"center",justifyItems:"center"}}>

                <div style={{borderRadius:"2rem",width:"calc(100% - 1rem)",height:"calc(100% - 2rem)",backgroundColor:"var(--secondary)",justifySelf:"end"}}>
                    <AddMenuBtn/>
                </div>
                <div style={{borderRadius:"2rem",width:"calc(100% - 2rem)",height:"calc(100% - 2rem)",backgroundColor:"var(--secondary)",display:"grid",gridTemplateRows:"1fr 6fr",alignItems:"end"}}>
                    <div className="searchBar center" style={{backgroundColor:"var(--primary)",border:"3px solid var(--secondary)",borderRadius:"2rem 2rem 0 0"}}>
                        <div style={{height:"2rem",width:"50%",backgroundColor:"var(--secondary)",borderRadius:"1rem"}}>

                        </div>
                    </div>
                    <div className="menu-list-cont" style={{height:"31rem",width:"calc(100% - 2rem)",justifySelf:"center",display:"grid",gridTemplateColumns:'repeat(auto-fit,minmax(12rem,1fr))',justifyItems:"center",overflow:"scroll"}}>
                    {products.map(e=>(
                        <MenuCard key={e.product_id} product={e}/>
                    ))}
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

export default Menu