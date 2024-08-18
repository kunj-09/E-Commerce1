import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify'

export const createCategoryController=async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401),send({message:'Name is required'})
        }
        //category hai ke nhi check kiya 
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:'Category Already Exists'
            })
        }
        //category nhi hai toh create kiya samjo
        const category = await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'new category created',
            category,
        })

    } catch (error) {
        console.log(error)
        res.status(500).semd({
            success:false,
            error,
            message:'Error in Category'
        })
    }

}

//update category 
export const updateCategoryController = async(req,res)=>{
    try {
        const {name} =req.body
        const { id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true}) //id ke basis pe update hua -- object me jo change karna tha woh pass kiya -- or dusra object new:true kiya because yeh nhi karege toh jo update kiya hai woh changes nhi hoga samjo 
        res.status(200).send({
            success:true,
            category,
            message:'Category Updated Successfully'

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while updating category'
        })
    }
}
//getAll category
export const categoryContoller=async(req,res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:'All Categories List',
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting all Categories'
        })
        
    }
}

//single category
export const singleCategoryController = async(req,res)=>{
    try {
        const {slug} = req.params
        const category = await categoryModel.findOne({slug})
        res.status(200).send({
            success:true,
            message:'Get Single Category Successfully',
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting Single Categories'
        })
    }
}
//delete category
export const deleteCategoryController = async (req, res) => {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Categry Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };



