import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

let BASEURL = import.meta.env.MODE === "development" ? "http://localhost:3001" : ""

function SignupPage() {
const navigate = useNavigate();
const [errMsg,setErrMsg] = useState("")
const [signUpData,setSignUpData] = useState({
    user_name:"",
    password:"",
    shop_name:"",
    user_image:""
})
const handleOnChangeUsername = (e) => {
    setSignUpData({...signUpData,user_name:e.target.value})
    setErrMsg("")
}
const handleOnChangePassword = (e) => {
    setSignUpData({...signUpData,password:e.target.value})
    setErrMsg("")
}
const handleOnChangeShop = (e) => {
    setSignUpData({...signUpData,shop_name:e.target.value})
    setErrMsg("")
}
const handleOnChangeImage = (e) => {
    setSignUpData({...signUpData,user_image:e.target.value})
    setErrMsg("")
}
const handleOnSignUp = async(e) => {
    e.preventDefault()
    try{
    const res = await axios.post(`${BASEURL}/api/auth/signup`,signUpData)
    navigate('/auth/')}
    catch (error) {
        setErrMsg(error.response.data.message)
    }
}

  return (
    <>
        <div className='center' style={{backgroundImage:"linear-gradient(45deg,var(--primary),var(--secondary))",height:"100vh"}}>
            <div className='' style={{fontSize:"2rem",color:"var(--accent)",position:"absolute",left:"2rem",top:"2rem"}}>
                <div style={{textAlign:"left"}}>
                <h1 style={{fontSize:"inherit"}}>CC_POS WEBAPP</h1>
                <h1 style={{fontSize:"inherit"}}></h1>
                </div>
            </div>
            <form onSubmit={handleOnSignUp} className="center glass" style={{gridTemplateRows:"repeat(7,1fr)",height:"40rem",width:"30rem",backgroundColor:"var(--secondary)",borderRadius:"1rem",border:"1px solid var(--primary)"}}>
                <h1 className="" style={{textAlign:"left",width:"24rem",color:"var(--accent)"}}>Sign up:</h1>
                <div style={{display:"grid",fontSize:"1.5rem"}}>
                    <label>Username:</label>
                    <input value={signUpData.user_name} onChange={handleOnChangeUsername} style={{height:"2rem",width:"24rem",backgroundColor:"var(--secondary)",borderColor:"var(--accent)",borderTop:"0",borderLeft:"0",borderRight:"0",fontSize:"1.5rem"}}></input>
                </div>
                <div style={{display:"grid",fontSize:"1.5rem"}}>
                    <label>Password:</label>
                    <input value={signUpData.password}  onChange={handleOnChangePassword} type="password" style={{height:"2rem",width:"24rem",backgroundColor:"var(--secondary)",borderColor:"var(--accent)",borderTop:"0",borderLeft:"0",borderRight:"0",fontSize:"1.5rem"}}></input>
                </div>
                <div style={{display:"grid",fontSize:"1.5rem"}}>
                    <label>Shop Name:</label>
                    <input value={signUpData.shop_name}  onChange={handleOnChangeShop}  style={{height:"2rem",width:"24rem",backgroundColor:"var(--secondary)",borderColor:"var(--accent)",borderTop:"0",borderLeft:"0",borderRight:"0",fontSize:"1.5rem"}}></input>
                </div>
                <div style={{display:"grid",fontSize:"1.5rem"}}>
                    <label>Image Url:</label>
                    <input value={signUpData.user_image}  onChange={handleOnChangeImage}  style={{height:"2rem",width:"24rem",backgroundColor:"var(--secondary)",borderColor:"var(--accent)",borderTop:"0",borderLeft:"0",borderRight:"0",fontSize:"1.5rem"}}></input>
                </div>
                <div className="center" style={{width:"20rem"}}>
                    <div className='center' style={{color:"var(--delete)"}}>
                       {errMsg}
                        </div>
                </div>
                <div>
                    <button style={{width:"20rem",height:"3rem",fontSize:"1.5rem",marginTop:"-2rem"}}>Sign Up</button>
                </div>

            </form>
        </div>
        </>
  )
}

export default SignupPage