import { create } from "zustand";
import { authAxios } from "../utility/axios";

export const tableStore = create((set,get)=>({
    tables:[],
    orders:[],
    fetchTables: async() => {
        try{
        const res = await authAxios.get(`api/tables`)
        set({tables:res.data.data})
        } catch(err){
        console.log(`error:${err}`)
        }
    },
    fetchOrders: async() => {
        try{
            const res = await authAxios.get(`/api/orders`)
            set({orders:res.data})
        }catch(err){
            console.log(err)
        }
    },
}))