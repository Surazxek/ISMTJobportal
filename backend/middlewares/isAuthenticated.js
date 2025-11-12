// import { request } from "express";
// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//     try {
//        const token = req.cookies.token;
//        if(!token){
//         return res.status(401).json({
//             message: "User not Authenticated",
//             success:false,
//         })
//        } 
//        const decode = await jwt.verify(token, process.env.SECRET_KEY);
//        if(!decode){
//         return res.status(401).json({
//             message: "Invalid Token",
//             success: false
//         })
//        }

//        req.id = decode.userId;
//        next()
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default isAuthenticated;



import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId;

    const user = await User.findById(req.id).select("role");
    if (!user) {
      return res.status(401).json({ message: "Invalid token user", success: false });
    }
    req.role = user.role;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token verification failed", success: false });
  }
};

export default isAuthenticated;
