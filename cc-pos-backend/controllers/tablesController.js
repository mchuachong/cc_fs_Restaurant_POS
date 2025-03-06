import { sql } from "../config/db.js";

export const getAllTables = async(req,res) => {
    try{
        const allTables = await sql`
        SELECT * FROM tables WHERE user_id=${req.user.user_id} ORDER BY length(table_name),table_name`
        res.status(200).json({status:"success",data:allTables})

    }catch(err){
        console.log(err)
    }
}

export const addTable = async(req,res) => {
    try{
        const addedTable = await sql`INSERT INTO tables (table_name,user_id) VALUES (${req.body.table_name},${req.user.user_id})`
        res.status(201).json({message:"table added successfully"})
    }
    catch (err){
        res.status(400).json({message:`error: ${err}`})
    }
}

export const deleteTable = async(req,res) => {
    const {id} = req.params
    try{
        const deletedtable = await sql`
        DELETE FROM tables WHERE table_id=${id} RETURNING *
        `
        res.status(200).json({status:"deleted"})
        console.log("here")
    }
    catch(err){
        res.status(400).json({message:`error: ${err}`})
    }
}

export const addOrderToken = async(req,res) => {
    try{
        console.log(req.body)
        const createdToken = await sql`
        UPDATE tables SET order_token=${req.body.order_token}, is_available=${false} WHERE user_id=${req.body.user_id} AND table_id=${req.body.table_id}
        `
        res.status(200).json({status:"succes",message:"added orderId"})
    }
    catch(err){
        console.log(err)
        res.status(400).json({error:err})
    }
}

export const clearTable = async(req,res) => {
    const {id} = req.params
    try{
    const clearedTable = await sql`
    UPDATE tables SET order_token=null,is_available=true WHERE order_token=${id}
    `
    res.status(200).json({message:"success"})    
    }
    catch(err){
        console.log(err)
        res.status(400).json({error:err})
    }
}