import jwt from "jsonwebtoken";

export const Authenticator = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null){
        res.status(400).json({message:"invalid user"})
    }
    jwt.verify(token,process.env.ACCESSTOKENSECRET,(err,user)=>{
        if (err) return res.status(400).json({message:"Invalid Token"})
        req.user=user
        next();
    })
}