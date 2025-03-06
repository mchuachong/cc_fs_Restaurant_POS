import { create } from "zustand";
import { authAxios } from "../utility/axios";

export const handleFormChange = create((set,get)=>({
    formData:{
        product_name:"",
        product_price:"",
        product_image:""},
    setFormData: (formData) => set({formData}),
    clearFormData: () => set({formData:{product_name:"",product_price:"",product_image:""}}),
    loading:false,
    postNewProduct: async(req) => {
        set({loading:true});
        try{
            const res = await authAxios.post(`/api/products`,req);
            console.log(res)
        }
        catch(error){
            console.log("error adding item")
            console.log(error)
        }
        finally{
        set({loading:false})
        }
    }
    

}))
