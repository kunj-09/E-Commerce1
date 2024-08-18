import express from "express";
import {registerController , loginController ,testController,forgotPasswordController, updateProfileController, getOrdersController,  orderStatusController, getAllOrdersController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object           if separate file me routing karte hai toh ek router object lagta hai 
const router = express.Router()

/// Extra knowledge - we had followed MVC pattern (Model-View-Controller) pattern in backend separates data (Model), presentation (View), and logic (Controller) to enhance maintainability, scalability, and code organization in web applications. It promotes modular development by isolating concerns, making it easier to manage and extend applications over time.
// yeh function me req res nhi hai matlab yeh callBack function nhi hua samjo isme apan ne mvc pattern follow kiya hai 
//routing
//REGISTER || Method POST
router.post('/register', registerController)
//Login || Method POST
router.post('/login',loginController)

//Forgot Password || POST
router.post('/forgot-password',forgotPasswordController)

//test
router.get('/test',requireSignIn ,isAdmin ,testController) //  /test or testController ke bichme apan kitne bhi middleware pass kar sakte hai  -- ider apan ne requiresign or isAdmin yeh 2 middleware passs kiya hai 

//protected User route auth
router.get("/user-auth" , requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});   // ye wale route se rquest jayege woh true raha toh hi dashboard page me navigate hoga 
})

//protected Admin route auth
router.get("/admin-auth" , requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});   // ye wale route se rquest jayege woh true raha toh hi dashboard page me navigate hoga 
})

//update profile
router.put('/profile',requireSignIn,updateProfileController)

//orders
router.get('/orders',requireSignIn,getOrdersController)

//All orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)

//order status update 
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController)

export default router;