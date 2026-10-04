import productModel from "../models/product.model.js";
import {uploadFile} from "../services/storage.service.js";

export async function createProduct(req,res){
    try{
    const {title,description,priceAmount,priceCurrency} = req.body

    const seller = req.user;


    const images = await Promise.all(req.files.map(async(file)=>{
        return await uploadFile({
            buffer:file.buffer,
            fileName: file.originalname
        })
    }))

   if (!req.files || !req.files.length) {
    return res.status(400).json({
        success: false,
        message: "At least one product image is required"
    });
}


    const product = await productModel.create({
        title,
        description,
        price:{
            amount:priceAmount,
            currency:priceCurrency || "INR"
        },
        images,
        seller: seller._id

    })

    res.status(201).json({
        message:"product create successfully",
        success:true,
        product
    })
}catch(error){
    return res.status(500).json({
        message:error.message,
        success:false
    })
}
}

export const getSellerProducts = async(req,res)=>{
    const seller = req.user
    // console.log(seller);
    const products = await productModel.find({seller: seller._id});

    if(products.length===0){
        return res.status(200).json({message:"no products"})
    }

    res.status(200).json({
        message:"product fetched successfully ",
        success:true,
        products
    })
}

