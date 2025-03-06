import { Outlet,Navigate } from "react-router-dom"
import Cookies from "js-cookie"

function PrivateRoutes() {
    let isLoggedIn = Cookies.get("user_name")
  return (
    isLoggedIn ? <Outlet/> : <Navigate to="/auth"/>
  )
}

export default PrivateRoutes