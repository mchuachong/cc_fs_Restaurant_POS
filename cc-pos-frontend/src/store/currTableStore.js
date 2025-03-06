import { create } from "zustand";

export const currentTableFunc = create((set,get)=>({
    currentTableData:{
        table_name:"",
        is_available:true,
        order_token:null,
        table_id:""
    },
    currentTableOrders:[],
    display:"tables",
    generate:false,
    setDisplay: (display) => set({display}),
    setCurrentTableData: (currentTableData) => set({currentTableData}),
    setCurrentTableOrders: (currentTableOrders) => set({currentTableOrders}),
    setGenerate: (generate) => set({generate})
}))