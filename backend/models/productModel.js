import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.ObjectId,         //Category Model already banaya hai -- toh yeh likhe ke usko link kiya smajao
        ref:"Category",                 //ref category model me export me "Category" likah ha woh hai ider samjo 
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    photo:{
        data:Buffer,
        contentType:String,
    },
    shipping:{
        type:Boolean
    },

},{timestamps:true})

export default mongoose.model("Products",productSchema);