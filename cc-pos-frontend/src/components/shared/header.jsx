import React from 'react'
import NavBar from './navbar'
import { GiHamburgerMenu } from "react-icons/gi";
import { NavStateStore } from '../../store/uiStore';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const {navState,setNavState} = NavStateStore();
    const navigate = useNavigate()

    const handleClick = () => {
        if(navState==="hidden"){
            setNavState("shown")
        }else{
            setNavState("hidden")
        }
    }

    return(
        <>
        <div className="header">
            <div className="menu-btn" onClick={handleClick} ><GiHamburgerMenu /></div>
            <div className='shop-info'>
            <div className='pad'><i className="fa-solid fa-mug-saucer"></i></div>
            <div onClick={()=>{navigate("/")}} className="clickable"style={{fontSize:'1.5rem',outline:"none"}}>{Cookies.get("shop_name")||`Dev`}</div>
            </div>
            <div></div>
            <div className='user-info-cont' style={{display:"flex"}}>
            <div><img style={{height:"2.2rem",width:"2.2rem",marginRight:".5rem",borderRadius:"100%",border:"2px solid var(--accent)"}} src={Cookies.get("user_image")}></img></div>
            <div className='user-info'>
                <div>{Cookies.get("user_name")||`Logged Out`}</div>
                <div><h2>admin</h2></div>
            </div>
            </div>
            
        </div>
        <div>
            <NavBar/>
        </div>
        </>
    )
}

export default Header