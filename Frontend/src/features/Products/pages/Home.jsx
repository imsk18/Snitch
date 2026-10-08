import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../Hook/useProduct'

const Home = () => {

    const {handleGetAllProducts} = useProduct()
    const products = useSelector(state=> state.product.products)

    useEffect(()=>{
      handleGetAllProducts();

    },[])
    console.log("all",products);

  return (
    <div>Home</div>
  )
}

export default Home