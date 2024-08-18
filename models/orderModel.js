import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
 products : [{
    type : mongoose.ObjectId,
    ref: "Products",
 }],
 payment: {},
 buyer : {
    type : mongoose.ObjectId,
    ref: "users"
 },
 status : {
    type: String,
    default : 'Not Process',
    enum :["Not Process", "Processing", "Shipped", "deliverd", "cancel"], //yeh enum matlab select box jesa - matlab apan yeh sab chiz isme pass kar rahe ha so apan ko yeh sab chiz ka status(value) mill jayega thidParty app se samjo
    
 },
 
},{timestamps:true});

export default mongoose.model("Order", orderSchema);