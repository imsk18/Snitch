import { createProduct,getSellerProducts,getAllProducts } from "../services/product.api";
import {useDispatch} from 'react-redux'
import { setSellerProducts,setProducts } from "../state/product.slice";

export const useProduct = ()=>{
const dispatch = useDispatch()

// async function handleCreateProduct(formData){
//     const data = await createProduct(formData)
//     return data.product
// }

async function handleCreateProduct(formData) {
    console.log("1. handleCreateProduct called");

    const data = await createProduct(formData);

    console.log("2. createProduct response:", data);

    return data.product;
}

async function handleGetSellerProducts(){
    const data = await getSellerProducts();

    dispatch(setSellerProducts(data.products))
    return data.products
}

//get all products
async function handleGetAllProducts(){
    try{
        const data = await getAllProducts()
        dispatch(setProducts(data.products))
        return data.products
    }catch(err){
        console.log(err);
    }
}

return {handleCreateProduct,handleGetSellerProducts,handleGetAllProducts}

}