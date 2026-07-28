import userModel from "../models/user.model";
import { config } from "../config/config";
// import bcrypt from "bcrypt"
import jwt, { sign } from "jsonwebtoken";




async function sendTokenResponse(user,res){
    const token = jwt.sign({
       id: user._id
    },config.JWT_SECRET)
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

        // const token = 

    }catch(error){

        console.log(error);
        res.status(500).json({message:"server error !"})
        

    }
}