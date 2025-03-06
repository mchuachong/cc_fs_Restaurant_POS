import { create } from "zustand";
import { authAxios } from "../utility/axios";

export const productsStore = create((set,get)=>({
    products:[],
    fetchProducts: async() => {
        set({loading:true});
        try{
           const res = await authAxios.get(`/api/products`)
           set({products:res.data.data})

        }
        catch{
            set({error:'Something went wrong fetchProducts'})
        }
        finally{
            set({loading:false})
        }
    }
}))
