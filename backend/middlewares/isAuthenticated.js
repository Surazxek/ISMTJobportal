import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const isAuthenticated = async (req, res, next) => {
  try {
    // Token from cookie or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided", success: false });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId;

    // Find user and attach role
    const user = await User.findById(req.id).select("role");
    if (!user) {
      return res.status(401).json({ message: "User not found", success: false });
    }

    req.role = user.role;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};

export default isAuthenticated;
