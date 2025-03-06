import { sql } from "../config/db.js";

export const getOrder = async(req,res) => {
    const {id} = req.params
    try{
    const orderList = await sql`
    SELECT * FROM orders JOIN products ON orders.product_id = products.product_id WHERE order_token=${id} ORDER BY product_name
    `
    res.status(200).json(orderList)
    console.log(req.body)
}
    catch (err){
        console.log(err)
        console.log(req.body)
        res.status(400).json({status:"failed",message:"failed to fetch orders"})
    }
}
export const createOrder = async(req,res) => {
    try{
    const createdOrder = await sql`
    INSERT INTO orders (order_token,product_id,user_id,date) VALUES (${req.body.order_token},${req.body.product_id},${req.body.user_id},${req.body.date}) RETURNING *
    `
    res.status(201).json({status:"success",created:createdOrder})
    }
    catch(err){
        console.log(err)
        console.log(req.body)
    res.status(400).json({status:"failed",message:err})
    }
}
export const editOrder = async(req,res) => {
    const {id} = req.params
    try{
    const editedOrder = await sql`
    UPDATE orders SET amount=amount+${req.body.operation} WHERE order_id=${id}
    `
    res.status(200).json({status:"success"})
    }catch(err){
        console.log(err)
        res.status(400).json({error:err})
    }
}
export const deleteOrder = async(req,res) => {
    const {id} = req.params
    try{
        const deletedOrder = await sql`
        DELETE FROM orders WHERE order_id=${id}
        `
        res.status(200).json({message:"deleted"})
    }catch(err){
        console.log(err)
        res.status(400).json({error:err})
    }
}
export const getAllOrders = async(req,res) => {
    const datenow = `${new Date().toLocaleDateString()} 00:00:00`
    try{
        const allOrders = await sql`
        SELECT o.date,o.amount,p.product_name,p.product_image,p.product_price FROM orders o JOIN products p ON o.product_id = p.product_id WHERE o.user_id=${req.user.user_id} AND o.created_at>${datenow} ORDER BY o.created_at DESC
        `
        res.status(200).json({allOrders})
    }
    catch(err){
        console.log(err)
        res.status(400).json({error:err})
    }
}