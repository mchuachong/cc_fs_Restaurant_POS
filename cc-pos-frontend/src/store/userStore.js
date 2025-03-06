import { create } from "zustand";

export const UserDataHandler = create((set,get)=>({
    globalUserInfo:{
        user_name:"",
        user_image:"",
        shop_name:"",
        accessToken:"",
        access:""},
    setGlobalUserInfo: (globalUserInfo) => set({globalUserInfo})

}))

