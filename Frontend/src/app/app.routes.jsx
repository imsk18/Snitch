import {createBrowserRouter} from "react-router"
import Register from "../features/auth/pages/Register"
import Login from "../features/auth/pages/Login"
import CreateProducts from "../features/Products/pages/CreateProducts"
import Dashboard from "../features/Products/pages/Dashboard"
import Home from "../features/Products/pages/Home"
import Protected from "../features/auth/components/Protected"
import ProductDetails from "../features/Products/pages/ProductDetails"


export const routes = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/product/:productId",
        element:<ProductDetails/>

    },
    {
        path:"/seller",
        children:[
            {
                path:"/seller/create-products",
                element:<CreateProducts/>
            },
            {
                path:"/seller/dashboard",
                element:<Protected role="seller"><Dashboard/></Protected>
            }
        ]
    }
])