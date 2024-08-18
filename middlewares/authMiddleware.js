import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async(req,res,next)=>{    // yeh middleware me req,res and next bhi hota hai -- phele req jata hai phir next validate hota hai phir response jata hai (next se basically user ko authenticate kar rahe hai samjo) 
    try {
        const decode = JWT.verify(      //decode name ka eshi variable banaya hai and verify ek function hai JsonWebtoken ka  
            req.headers.authorization,  ///token headers me hota hai -> headers me authorization me hota hai token 
            process.env.JWT_SECRET )     ///decode(decrypt) karne ke liye key chaiye na - tohwoh apna env me tha toh likha -->iska syntax hai key likhna padta hai 
            req.user = decode;            // user ko decrypt kiya or isAdmin me usser check karna hai na isliye 
            next();                      // jese hi decode wala step ho jayega wese hi next ko call kiya 
           
         
    } catch (error) {
        console.log(error)
    }
}

//admin access
 export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);  // admin hai ke uske apan ne role ka input liya hai -- toh role bhi check karne ke liye user id toh chiye na isliye yeh kiya 

      if (user.role !== 1) {
        // return res.status(401).send({
        //   success: false,
        //   // message: "UnAuthorized Access",
        // });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };