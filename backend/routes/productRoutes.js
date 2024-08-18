import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductContoller, searchProductController, updateProductController } from '../controllers/productController.js';
import fromidable from 'express-formidable'       ///yeh package hai - apan ne productModel me photo liya hai or photo ko get karege toh normally woh string me aata hai isliye yeh package dala hai 


const router = express.Router();

//routes
//create product
router.post('/create-product', requireSignIn, isAdmin,fromidable(),createProductController)

//get products
router.get('/get-product',getProductController)

// single product
router.get('/get-product/:slug',getSingleProductController)

//get photo
router.get('/product-photo/:pid',productPhotoController)

//delete
router.delete('/delete-product/:pid',deleteProductController)

//update
router.put('/update-product/:pid', requireSignIn, isAdmin,fromidable(),updateProductController)

//filter product
router.post('/product-filters',productFiltersController)

//product count
router.get('/product-count',productCountController)

//product per page 
router.get('/product-list/:page',productListController)

//search product
router.get('/search/:keyword',searchProductController)

//similar product
router.get('/related-product/:pid/:cid',relatedProductContoller)

//category wise product
router.get('/product-category/:slug',productCategoryController)

//payment routes

//token

router.get('/braintree/token',braintreeTokenController)

//payments
router.post('/braintree/payment',requireSignIn,braintreePaymentController)


export default router;