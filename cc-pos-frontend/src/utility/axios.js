import axios from "axios";
import Cookies from "js-cookie";

export const authAxios = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:3001" : "",
    headers:{Authorization: `Bearer ${Cookies.get("accesstoken")}`}
})