import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
// import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";





async function sendTokenResponse(user,res,message){
    const token = jwt.sign({
       id: user._id
    },
    config.JWT_SECRET,
    {expiresIn:"7d"}
)


res.cookie("token",token)

  res.status(200).json({
    message,
    success:true,
            user:{
                id:user._id,
                email:user.email,
                fullname:user.fullname,
                role:user.role
            },
            token
        })

}
  




export const  register = async (req,res)=>{
    const {email,contact,fullname,password} = req.body

    try{
        const isUserExist = await userModel.findOne({
            $or:[
                {email},
                {contact}
            ]
        })

        if(isUserExist){
            return res.status(400).json({message:"user already exist with this email or contact"})
        }

        const user = await userModel.create({
            email,
            contact,
            fullname,
            password

        })

        await sendTokenResponse(user,res,"user registered successfully")

      
        // const token = 

    }catch(error){

        console.log(error);
        res.status(500).json({message:"server error !"})
        

    }
}