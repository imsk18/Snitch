import  express from "express"
import {authenticateSeller }from "../middleware/auth.middleware.js";
import { createProduct , getAllProducts, getProductDetails, getSellerProducts} from "../controllers/product.controller.js";
import multer from 'multer'
import { createProductValidator } from "../validator/product.validator.js";

const upload = multer({
    Storage:multer.memoryStorage(),
    limits:{
        fieldSize: 5 * 1024 * 1024
    }
}
    
)


const router = express.Router();
/**
 * post api/products/
 * protected
 * @des only seller can create product
 */
router.post("/",authenticateSeller,upload.array('images',7),createProductValidator,createProduct);


/**
 * get api/products/seller
 * @des only seller can see products
 */


router.get("/seller",authenticateSeller,getSellerProducts)

/**
 * route get api/products/
 * @des fetches all products 
 * 
 */
router.get("/",getAllProducts)


/**
 * @route get api/products/detail/:_id
 * @des fetched a product details by it's id
 */

router.get("/detail/:id",getProductDetails)
export default router;