import { sql } from "../config/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

export const login = async(req,res) => {
    const {user_name,password} = req.body
    try{
        const userInfo = await sql`
        SELECT * FROM users WHERE user_name=${user_name}
        `
        if(!userInfo[0]){
            res.status(400).json({message:"user not found"})
        }else{
            const authorized = await bcrypt.compare(password,userInfo[0].password)
            if(!authorized){
                res.status(400).json({message:"wrong password"})
            }else{
                //login success
                const accessToken = jwt.sign(userInfo[0],process.env.ACCESSTOKENSECRET)
                res.status(200).json({...userInfo[0],accessToken:accessToken})
             
                
            }
            
        }
    }
    catch(error){
        console.log(error)
    }
}

export const addUser = async(req,res) => {
    const {user_name,password,user_image,shop_name} = req.body
    const hashedpwd = await bcrypt.hash(password,10)
    try{
    const newUser = await sql`
    INSERT INTO users (user_name,password,user_image,shop_name) VALUES (${user_name},${hashedpwd},${user_image},${shop_name}) RETURNING *
    `
    res.status(201).json({success:true,message:`user added`})
    }
    catch (error){
        res.status(400).json({success:false,message:"failed to create new user (username taken/server error)",error:error})
    }
}