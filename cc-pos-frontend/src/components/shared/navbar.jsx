import React from 'react'
import { IoHome } from "react-icons/io5";
import { MdOutlineTableBar } from "react-icons/md";
import { MdRestaurantMenu } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import {useNavigate} from "react-router"
import { NavStateStore } from '../../store/uiStore';
import Cookies from 'js-cookie';

const NavBar = (props) => {
    const navigate = useNavigate();
    const {navState,setNavState} = NavStateStore();
    const handleOnLogout = () => {
        Cookies.remove("user_name")
        Cookies.remove("user_image")
        Cookies.remove("access")
        Cookies.remove("accessToken")
        Cookies.remove("shop_name")
        Cookies.remove("user_id")
        window.location.reload()
    }
    return(
        <div className={`navbar ${navState} nselect`}>
        <ul className='menu-ul'>
            <li onClick={()=>{navigate('/');setNavState("hidden")}} className='menu-li'><div className='li-name'>Home</div><div className='li-icon'><IoHome /></div></li>
            <li onClick={()=>{navigate('/menu');setNavState("hidden")}} className='menu-li'><div className='li-name'>Menu</div><div className='li-icon'><MdRestaurantMenu /></div></li>
            <li onClick={()=>{navigate('/tables');setNavState("hidden")}}className='menu-li'><div className='li-name'>Tables</div><div className='li-icon'><MdOutlineTableBar /></div></li>
            <li onClick={()=>{alert("Please wait for future updates!")}}className='menu-li'><div className='li-name'>Settings</div><div className='li-icon'><IoSettingsOutline /></div></li>
            <div></div>
            <li onClick={handleOnLogout} className='menu-li'><div className='li-name'>Log Out</div><div className='li-icon'><TbLogout /></div></li>
        </ul>
        </div>
    )
}

export default NavBar