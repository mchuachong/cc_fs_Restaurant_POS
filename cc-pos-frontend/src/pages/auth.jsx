import React from 'react'
import { useState,useRef } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router"
import Cookies from 'js-cookie'


let BASEURL = import.meta.env.MODE === "development" ? "http://localhost:3001" : ""

const Authentication = () => {
    const navigate = useNavigate()
    const [signInData,setSignInData] = useState({
        user_name:"",
        password:""
    })
    const [error,setError] = useState("")
    const handleOnSignIn = async (e) =>{
        e.preventDefault()
        
        try{console.log(signInData)
            const res = await axios.post(`${BASEURL}/api/auth/login`,signInData)
            console.log(res.data)
            Cookies.set("user_name",res.data.user_name)
            Cookies.set("shop_name",res.data.shop_name)
            Cookies.set("user_image",res.data.user_image)
            Cookies.set("access",res.data.access)
            Cookies.set("accesstoken",res.data.accessToken)
            Cookies.set("user_id",res.data.user_id)
            navigate('/')
            window.location.reload()

        }
        catch(error){
            console.log(error.response.data)
            setError(error.response.data.message)
        }
        
    }
    const handleOnChangeUsername = (e) => {
        setSignInData({...signInData,user_name:e.target.value})
        setError("")
    }
    const handleOnChangePassword = (e) => {
        setSignInData({...signInData,password:e.target.value})
        setError("")
    }
 
    return(
        <>
        {/* {console.log(JSON.parse(Cookies.get("userInfo")))} */}
      
        <div className='center' style={{backgroundImage:"linear-gradient(45deg,var(--primary),var(--secondary))",height:"100vh"}}>
            <div className='' style={{fontSize:"2rem",color:"var(--accent)",position:"absolute",left:"2rem",top:"2rem"}}>
                <div style={{textAlign:"left"}}>
                <h1 style={{fontSize:"inherit"}}>CC_POS WEBAPP</h1>
                <h1 style={{fontSize:"inherit"}}></h1>
                </div>
            </div>
            <form onSubmit={handleOnSignIn} className="center glass" style={{gridTemplateRows:"repeat(5,1fr)",height:"35rem",width:"25rem",backgroundColor:"var(--secondary)",borderRadius:"1rem",border:"1px solid var(--primary)"}}>
                <h1 className="" style={{textAlign:"left",width:"20rem",color:"var(--accent)"}}>Sign in:</h1>
                <div style={{display:"grid",fontSize:"1.5rem"}}>
                    <label>Username:</label>
                    <input onChange={handleOnChangeUsername} style={{height:"2rem",width:"19rem",backgroundColor:"var(--secondary)",borderColor:"var(--accent)",borderTop:"0",borderLeft:"0",borderRight:"0",fontSize:"1.5rem"}}></input>
                </div>
                <div style={{display:"grid",fontSize:"1.5rem"}}>
                    <label>Password:</label>
                    <input onChange={handleOnChangePassword} type="password" style={{height:"2rem",width:"19rem",backgroundColor:"var(--secondary)",borderColor:"var(--accent)",borderTop:"0",borderLeft:"0",borderRight:"0",fontSize:"1.5rem"}}></input>
                </div>
                <div className="" style={{width:"20rem",display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                    <div style={{textAlign:"left"}}>
                        <h2>Need an Account?</h2>
                        <h2 onClick={()=>{navigate('/auth/signup')}} className="registerBtn" style={{fontWeight:"300"}}>Register</h2>
                    </div>
                    <div className='center' style={{textAlign:"right",color:"var(--delete)"}}>
                        {error}
                        </div>
                </div>
                <div>
                    <button style={{width:"20rem",height:"3rem",fontSize:"1.5rem"}}>Sign In</button>
                </div>

            </form>
        </div>
        </>
    )
}

export default Authentication