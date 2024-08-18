import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { categoryContoller, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryContoller.js'

const router = express.Router()

//routes
//createCategory route
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//updateCategory
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController); //yeh wle route me id bhi pass kiya because id ke basis pe hi update karna hai na 

//getAll category
router.get('/get-category',categoryContoller)

//single category
router.get('/single-category/:slug',singleCategoryController) //isme slug se single category ko fetch karege 

//delete category 
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router