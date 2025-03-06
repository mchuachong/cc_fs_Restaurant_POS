import {sql} from '../config/db.js'

export const getAllProducts = async (req,res) => {
   
    try{
        const products = await sql`
        SELECT * FROM products WHERE user_id = ${req.user.user_id}
        ORDER BY product_name ASC
        `
        console.log("Product Fetch Success")
        res.status(200).json({success:true, data: products})
    }
    catch{
        console.log("Failed to fetch products")
        res.status(500).json({success:false, message:"Server Error"})
    }
};

export const createProduct = async (req,res) => {
    const {product_name,product_image,product_price} = req.body
    if (!product_name||!product_image||!product_price) {
        return res.status(400).json({success:false, message:"All fields are required"})
    }
    try{
        const newProduct = await sql`
        INSERT INTO products (product_name,product_price,product_image,user_id) VALUES (${product_name},${product_price},${product_image},${req.user.user_id}) RETURNING *
        `
        console.log(`New Prododuct Added ${product_name}, ${product_price}`)
        res.status(201).json({success:true,data:newProduct[0]})
    }
    catch{
        console.log("Failed to get Product")
        res.status(500).json({success:false, message:"Server Error"})
    }
};

export const getOneProduct = async (req,res) => {
    const {id} = req.params;
    try {
    const product = await sql `
        SELECT * FROM products WHERE product_id = ${id}
    `
    console.log("Successfully Fetched Product");
    res.status(200).json({success:true,data:product[0]})
    }
    catch{
        console.log("Failed to Fetch Product")
        res.status(500).json({success:false, message:"Server Error"})
    }
};

export const editProduct = async (req,res) => {
    const {id} = req.params
    const {product_name,product_price,product_image} = req.body
    try{
    const product = await sql`
    UPDATE products SET product_name=${product_name},product_price=${product_price},product_image=${product_image} WHERE product_id=${id} RETURNING *
    `
    if(product.length === 0){
        return res.status(404).json({success:false,message:"Product Not Found"})
    }

    res.status(201).json({success:true,data:product[0]})

    }
    catch{
        console.log("Failed to Update Product")
        res.status(500).json({success:false,message:"Server Error"})
    }
};

export const deleteProduct = async (req,res) => {
    const {id} = req.params
    try{
    const deletedProduct = await sql`
    DELETE FROM products WHERE product_id = ${id} RETURNING *
    `
    if(deletedProduct.length === 0){
        return res.status(404).json({success:false,message:"Product Not Found"})
    }
    console.log("Successfully Deleted Product")
    res.status(200).json({success:true,data:deletedProduct[0]})
    }

    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"Server Error",error:error})
    }
};