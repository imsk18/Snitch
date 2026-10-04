import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'
import userModel from '../models/user.model.js';


async function authenticateSeller(req,res,next){
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({message:"unauthorized "})
  }
  // console.log(token);

  try{

    const decoded = jwt.verify(token,config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if(!user){
      return res.status(401).json({message:"unauthorized"})
    }

    if(user.role !== "seller"){
      return res.status(403).json({message:"forbidden"})
    }

    req.user = user;
    next()

  }catch(err){
    console.log(err)
    return status(401).json({message:"unauthorized"})

  }

}
export default authenticateSeller