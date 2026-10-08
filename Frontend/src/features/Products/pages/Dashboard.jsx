import React from 'react'
import { useProduct } from '../Hook/useProduct'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const {handleGetSellerProducts} = useProduct()
    const sellerProducts = useSelector(state=> state.product.sellerProducts)
    useEffect(()=>{
        handleGetSellerProducts()
    },[])

    console.log(sellerProducts);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard