import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req,res) =>{             //req res jo likha hota hai uska matlab woh callBack function hai
    try {
        const {name,email,password,phone,address,answer} = req.body  //destructuring kiya
        //validations
        if(!name){
            return res.send({message:'Name is Requuired'})
        }
        if(!email){
            return res.send({message:'Email is Requuired'})
        }
        if(!password){
            return res.send({message:'Password is Requuired'})
        }
        if(!phone){
            return res.send({message:'Phone is Requuired'})
        }
        if(!address){
            return res.send({message:'Address is Requuired'})
        }
        if(!answer){
          return res.send({message:'Answer is Requuired'})
      }
        //check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already Register please login',
            })
        }
        //register user 
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save();  //password- yeh key hai  AND  hashedPassword - yeh value hai Samjo 

        res.status(201).send({
            success:true,
            message:'User Register Successfully',
            user
        })
         
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
};
//POST LOGIN

export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {  //jsonwebtoken ese likhte hai 
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {                                    //yeh upper wale jesa hi ha user call kiya but isme yeh difference hai ke user ke ander kya dikhna choye woh specify kar diya apan because apan ko passwrd nhi dikhana hai 
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };
//forgotPasswordController
export const forgotPasswordController= async (req,res)=>{
  try {
    const {email,answer,newPassword} = req.body
  if(!email){
    res.status(400).send({message:'Email is required'})
  }
  if(!answer){
    res.status(400).send({message:'Answer is required'})
  }
  if(!newPassword){
    res.status(400).send({message:'New Password is required'})
  }
  //check    - email or answer check kar rahe ha -- sahi hai toh hi password reset karege!!
  const user = await userModel.findOne({email,answer});
  //validation
  if(!user){
    return res.status(404).send({
      success:false,
      message:"Wrong Email or Answer"
    })
  }
  const hashed = await hashPassword(newPassword);
  await userModel.findByIdAndUpdate(user._id,{password:hashed})
  res.status(200).send({
    success:true,
    message:"Password Reset Successsfully",
  })


  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Something went wrong',
      error
    })
  }
}

//test controller
export const testController=(req,res)=>{
    res.send('Protected Route')
}

// update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    // Password validation
    if (password && password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Hash password if provided
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // Update user profile
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,  // Corrected this line
      },
      { new: true }
    );

    // Send response
    res.status(200).send({
      success: true,
      message: 'Profile Updated Successfully',
      updatedUser,  // Corrected the variable name
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while Updating Profile',
      error: error.message,  // Added error details for debugging
    });
  }
};



//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });;
      if (!orders) {
        return res.status(404).send({
          success: false,
          message: "No orders found",
        });
      }
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};